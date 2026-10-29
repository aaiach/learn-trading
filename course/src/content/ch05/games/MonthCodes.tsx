// Game: the twelve futures delivery-month codes (Table 5-3) and reading futures symbols the book's way:
// commodity code + year digit + month letter (LC2Z, E72H, p. 99).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd, Rich } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u54a.css";

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const FUTURES_CODES = ["F", "G", "H", "J", "K", "M", "N", "Q", "U", "V", "X", "Z"];
// The twelve codes in order, kept on one line (no-break spaces).
const SEQ = FUTURES_CODES.join("\u00a0");
const COMMODITIES = [
  { code: "LC", name: "live cattle" },
  { code: "E7", name: "E-mini Euro FX" },
];

type Round = { prompt: string; sym?: string; options: string[]; answer: number; why: string; months: number[]; mono?: boolean };

const near = (m: number, d: number) => (m + d + 12) % 12;
const pickOthers = (m: number) => shuffle([near(m, 1), near(m, -1), near(m, 2), near(m, 5), near(m, -4)]).slice(0, 3);
const ordered = (right: string, wrong: string[]): { options: string[]; answer: number } => {
  const options = shuffle([right, ...wrong]);
  return { options, answer: options.indexOf(right) };
};

function makeRounds(): Round[] {
  const ms = shuffle([...Array(12).keys()]);
  const out: Round[] = [];
  // which letter is month m?
  for (const m of ms.slice(0, 3)) {
    out.push({
      prompt: `Which letter is the delivery-month code for **${MONTH_NAMES[m]}**?`,
      ...ordered(FUTURES_CODES[m], pickOthers(m).map((x) => FUTURES_CODES[x])),
      why: `${MONTH_NAMES[m]} is ${FUTURES_CODES[m]}. January to December, the codes run ${SEQ}.`,
      months: [m],
      mono: true,
    });
  }
  // which month is letter c?
  for (const m of ms.slice(3, 6)) {
    out.push({
      prompt: `Code **${FUTURES_CODES[m]}** is which delivery month?`,
      ...ordered(MONTH_NAMES[m], pickOthers(m).map((x) => MONTH_NAMES[x])),
      why: `${FUTURES_CODES[m]} is ${MONTH_NAMES[m]}, code number ${m + 1} in ${SEQ}.`,
      months: [m],
    });
  }
  // decode a symbol (year digit first, as in the book)
  for (const [k, m] of ms.slice(6, 8).entries()) {
    const com = COMMODITIES[k % 2];
    const other = COMMODITIES[(k + 1) % 2];
    const y = 1 + Math.floor(Math.random() * 7);
    const name = (mm: number, yy: number, c = com) => `${MONTH_NAMES[mm]} 200${yy} ${c.name}`;
    out.push({
      prompt: "Decode this futures symbol (year digit, then month letter):",
      sym: `${com.code}${y}${FUTURES_CODES[m]}`,
      ...ordered(name(m, y), [name(near(m, 1), y), name(m, y + 1), name(m, y, other)]),
      why: `${com.code} = ${com.name}, ${y} = 200${y}, ${FUTURES_CODES[m]} = ${MONTH_NAMES[m]}.`,
      months: [m],
    });
  }
  // build a symbol
  for (const [k, m] of ms.slice(8, 10).entries()) {
    const com = COMMODITIES[(k + 1) % 2];
    const y = 1 + Math.floor(Math.random() * 7);
    const sym = (mm: number, yy: number) => `${com.code}${yy}${FUTURES_CODES[mm]}`;
    out.push({
      prompt: `Write the symbol for the **${MONTH_NAMES[m]} 200${y} ${com.name}** contract (year digit first):`,
      ...ordered(sym(m, y), [sym(near(m, 1), y), sym(near(m, -1), y), sym(m, y + 1)]),
      why: `${com.code} (${com.name}) + ${y} (200${y}) + ${FUTURES_CODES[m]} (${MONTH_NAMES[m]}) = ${sym(m, y)}.`,
      months: [m],
      mono: true,
    });
  }
  return out;
}

export function MonthCodes({ onDone }: GameProps) {
  const rounds = useMemo(makeRounds, []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const [learned, setLearned] = useState<number[]>([]);
  const finished = useRef(false);
  const done = i >= rounds.length;
  const r = rounds[Math.min(i, rounds.length - 1)];

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: rounds.length }), 500);
    return () => clearTimeout(id);
  }, [done, score, rounds.length, onDone]);

  const choose = (k: number) => {
    if (pick !== null || done) return;
    const ok = k === r.answer;
    setPick(k);
    if (ok) {
      setScore((s) => s + 1);
      setLearned((l) => [...new Set([...l, ...r.months])]);
    }
    setTimeout(
      () => {
        setPick(null);
        setI((x) => x + 1);
      },
      ok ? 800 : 2400,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        choose(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const wrong = pick !== null && pick !== r.answer;
  return (
    <div className="g54">
      <div className="g54-top">
        <span className="g54-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <span className="g54-count">
          {Math.min(i + 1, rounds.length)}/{rounds.length}
        </span>
      </div>

      <div className="mc-strip" aria-label="Month codes you have answered correctly">
        {FUTURES_CODES.map((code, m) => {
          const on = learned.includes(m);
          return (
            <span key={code} className={`mc-cell ${on ? "on" : ""}`}>
              <b>{on ? code : "?"}</b>
              <small>{MONTH_NAMES[m].slice(0, 3)}</small>
            </span>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        {!done ? (
          <motion.div
            key={i}
            className="g54-card"
            initial={{ opacity: 0, y: 12 }}
            animate={wrong ? { opacity: 1, y: 0, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.16, ease: EASE_OUT } }}
            transition={{ ...spring.soft, x: { duration: 0.32 } }}
          >
            {r.sym && (
              <div className="g54-sym" aria-label={`Symbol ${r.sym}`}>
                {r.sym.split("").map((ch, k) => (
                  <span key={k}>{ch}</span>
                ))}
              </div>
            )}
            <p className="g54-q">
              <Rich text={r.prompt} />
            </p>
            <div className="g54-opts">
              {r.options.map((o, k) => {
                const st = pick === null ? "" : k === r.answer ? "right" : k === pick ? "wrong" : "off";
                return (
                  <button key={o} type="button" className={`g54-opt ${st} ${r.mono ? "mono" : ""}`} onClick={() => choose(k)} disabled={pick !== null}>
                    <Kbd>{String(k + 1)}</Kbd>
                    <span>{o}</span>
                  </button>
                );
              })}
            </div>
            {wrong && <p className="g54-why">{r.why}</p>}
          </motion.div>
        ) : (
          <motion.div key="end" className="g54-card g54-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Done! {learned.length} month codes lit up.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
