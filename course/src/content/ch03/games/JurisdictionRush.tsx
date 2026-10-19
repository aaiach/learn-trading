// Game: who regulates it, the SEC or the CFTC? (§3.5.1.1 and the Shad-Johnson accord box)
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Landmark } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { shuffle } from "../../../util.ts";
import "./u35.css";

const CARDS: [string, 0 | 1][] = [
  ["Common stocks", 0],
  ["Corporate bonds", 0],
  ["Warrants", 0],
  ["Trust units", 0],
  ["Investment company shares", 0],
  ["Options on a single stock", 0],
  ["Cash-settled index options", 0],
  ["Wheat futures", 1],
  ["Commodity forward contracts", 1],
  ["Spot commodity trades", 1],
  ["Futures on a broad stock index", 1],
  ["Options on stock index futures", 1],
];
const AGENCIES = ["SEC", "CFTC"];
const TOTAL_MS = 30_000;
const PENALTY_MS = 2_000;

export function JurisdictionRush({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(CARDS), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [miss, setMiss] = useState<number | null>(null);
  const [dir, setDir] = useState(0);
  const [left, setLeft] = useState(TOTAL_MS);
  const deadline = useRef(Date.now() + TOTAL_MS);
  const finished = useRef(false);
  const over = i >= deck.length || left <= 0;

  useEffect(() => {
    if (over) return;
    const t = setInterval(() => setLeft(Math.max(0, deadline.current - Date.now())), 100);
    return () => clearInterval(t);
  }, [over]);

  useEffect(() => {
    if (!over || finished.current) return;
    finished.current = true;
    const t = setTimeout(() => onDone({ score, max: deck.length }), 700);
    return () => clearTimeout(t);
  }, [over, score, deck.length, onDone]);

  const pick = (a: 0 | 1) => {
    if (over || miss !== null) return;
    const right = deck[i][1];
    if (a === right) {
      setScore((s) => s + 1);
      setDir(a === 0 ? -1 : 1);
      setI((x) => x + 1);
    } else {
      deadline.current -= PENALTY_MS;
      setMiss(right);
      setTimeout(() => {
        setMiss(null);
        setDir(right === 0 ? -1 : 1);
        setI((x) => x + 1);
      }, 900);
    }
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "1" || k === "s") pick(0);
      if (k === "2" || k === "c") pick(1);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const card = deck[i];
  return (
    <div className="jr">
      <div className="jr-top">
        <div className="jr-time" aria-label={`${Math.ceil(left / 1000)} seconds left`}>
          <motion.div className="jr-time-fill" animate={{ width: `${(100 * left) / TOTAL_MS}%` }} transition={{ duration: 0.1, ease: "linear" }} />
        </div>
        <span className="jr-score">
          {score}/{deck.length}
        </span>
      </div>
      <div className="jr-stage">
        <AnimatePresence mode="popLayout" custom={dir}>
          {card && !over ? (
            <motion.div
              key={card[0]}
              className={`jr-card ${miss !== null ? "miss" : ""}`}
              custom={dir}
              initial={{ opacity: 0, y: 16 }}
              animate={miss !== null ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
              variants={{ out: (d: number) => ({ opacity: 0, x: 150 * d, y: 50, scale: 0.6, transition: { duration: 0.34, ease: EASE_OUT } }) }}
              exit="out"
              transition={{ ...spring.soft, x: { duration: 0.34 } }}
            >
              {card[0]}
              {miss !== null && <span className="jr-fix">→ {AGENCIES[miss]}</span>}
            </motion.div>
          ) : (
            <motion.p key="end" className="jr-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {left <= 0 ? "Time!" : "All sorted!"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="jr-btns">
        <button type="button" className={`jr-btn sec ${miss === 0 ? "hint" : ""}`} onClick={() => pick(0)} disabled={over}>
          <Landmark size={18} /> SEC <Kbd>1</Kbd>
        </button>
        <button type="button" className={`jr-btn cftc ${miss === 1 ? "hint" : ""}`} onClick={() => pick(1)} disabled={over}>
          <Building2 size={18} /> CFTC <Kbd>2</Kbd>
        </button>
      </div>
      <p className="jr-note">A wrong answer costs 2 seconds.</p>
    </div>
  );
}
