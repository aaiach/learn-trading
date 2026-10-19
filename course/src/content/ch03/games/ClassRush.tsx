// Game: sort trading instruments into the classes of Table 3-3 against the clock (§3.3).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { spring, EASE_OUT } from "../../../motion/tokens.ts";
import "./u33a.css";

const CLASSES = ["Real assets", "Financial assets", "Derivative contracts", "Insurance contracts", "Hybrid instruments", "Gambling contracts"];

// Every pairing comes from Table 3-3 (p. 38).
const ITEMS: [string, number][] = [
  ["Spot commodities", 0],
  ["Intellectual properties", 0],
  ["Real estate", 0],
  ["Pollution emission rights", 0],
  ["Stocks", 1],
  ["Bonds", 1],
  ["Trust units", 1],
  ["Currencies", 1],
  ["Futures contracts", 2],
  ["Forward contracts", 2],
  ["Options", 2],
  ["Swaps", 2],
  ["Insurance policies", 3],
  ["Reinsurance contracts", 3],
  ["Index linked bonds", 4],
  ["Convertible bonds", 4],
  ["A bet placed with a bookie", 5],
];

const N = 12;
const SECONDS = 50;

export function ClassRush({ onDone }: GameProps) {
  const deck = useMemo(() => shuffle(ITEMS).slice(0, N), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; pick: number } | null>(null);
  const [left, setLeft] = useState(SECONDS);
  const deadline = useRef(Date.now() + SECONDS * 1000);
  const finished = useRef(false);
  const done = i >= deck.length || left <= 0;

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setLeft(Math.max(0, (deadline.current - Date.now()) / 1000)), 100);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: deck.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, deck.length, onDone]);

  const pick = (c: number) => {
    if (fb || done) return;
    const ok = c === deck[i][1];
    if (ok) setScore((s) => s + 1);
    setFb({ ok, pick: c });
    setTimeout(
      () => {
        setFb(null);
        setI((x) => x + 1);
      },
      ok ? 420 : 1200,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-6]$/.test(e.key)) pick(Number(e.key) - 1);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  const item = deck[Math.min(i, deck.length - 1)];
  return (
    <div className="rush">
      <div className="rush-top">
        <span className="rush-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="rush-time" aria-label={`${Math.ceil(left)} seconds left`}>
          <motion.div className="rush-time-fill" animate={{ width: `${(100 * left) / SECONDS}%` }} transition={{ duration: 0.1, ease: "linear" }} />
        </div>
        <span className="rush-count">
          {Math.min(i + 1, deck.length)}/{deck.length}
        </span>
      </div>
      <div className="rush-stage">
        <AnimatePresence mode="popLayout" initial={false}>
          {!done && (
            <motion.div
              key={i}
              className={`rush-card ${fb ? (fb.ok ? "ok" : "ko") : ""}`}
              initial={{ opacity: 0, y: 14 }}
              animate={fb && !fb.ok ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -14, transition: { duration: 0.18, ease: EASE_OUT } }}
              transition={{ ...spring.soft, x: { duration: 0.32 } }}
            >
              {item[0]}
              {fb && !fb.ok && <small>→ {CLASSES[item[1]]}</small>}
            </motion.div>
          )}
          {done && (
            <motion.div key="end" className="rush-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {left <= 0 && i < deck.length ? "Time!" : "Done!"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="rush-btns">
        {CLASSES.map((c, k) => {
          const st = fb ? (k === item[1] ? "right" : k === fb.pick ? "wrong" : "") : "";
          return (
            <button key={c} type="button" className={`rush-btn ${st}`} onClick={() => pick(k)} disabled={done}>
              <Kbd>{k + 1}</Kbd>
              {c}
              {st === "wrong" && <X size={14} strokeWidth={3} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
