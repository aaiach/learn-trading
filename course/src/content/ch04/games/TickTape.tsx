// Game: label each new trade print as an uptick, downtick, zero uptick or zero downtick (§4.7).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Check, Flame, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import "./u47.css";

export type Tick = "up" | "down" | "zup" | "zdown";

const LABEL: Record<Tick, string> = { up: "Uptick", down: "Downtick", zup: "Zero uptick", zdown: "Zero downtick" };
const ORDER: Tick[] = ["up", "down", "zup", "zdown"];
const N = 14;
const SECONDS = 60;
const SHOW = 5;

/** Classify print i of `ps` against the prices before it (the book's definitions, §4.7). */
export function classify(ps: number[], i: number): { tick: Tick; ref: number } {
  const p = ps[i];
  if (p > ps[i - 1]) return { tick: "up", ref: i - 1 };
  if (p < ps[i - 1]) return { tick: "down", ref: i - 1 };
  let j = i - 1;
  while (j > 0 && ps[j] === p) j--;
  return { tick: ps[j] > p ? "zdown" : "zup", ref: j };
}

function explain(ps: number[], i: number): string {
  const { tick, ref } = classify(ps, i);
  const p = ps[i].toFixed(2);
  const r = ps[ref].toFixed(2);
  if (tick === "up") return `${p} is above the last price, ${r}.`;
  if (tick === "down") return `${p} is below the last price, ${r}.`;
  return `Same as the last price. The last different price, ${r}, was ${tick === "zdown" ? "higher" : "lower"}.`;
}

/** Two different opening prints, then N prints with plenty of zero ticks; every label appears at least twice. */
function makeTape(): number[] {
  for (let tries = 0; tries < 80; tries++) {
    const base = 20 + Math.floor(Math.random() * 60);
    let c = Math.round(Math.random() * 80) + 10; // cents
    const ps = [+(base + c / 100).toFixed(2)];
    c += Math.random() < 0.5 ? 2 : -2;
    ps.push(+(base + c / 100).toFixed(2));
    let zeros = 0;
    while (ps.length < N + 2) {
      const r = Math.random();
      let m = r < 0.4 && zeros < 3 ? 0 : r < 0.7 ? 1 : 2;
      if (m) m *= Math.random() < 0.5 ? 1 : -1;
      zeros = m === 0 ? zeros + 1 : 0;
      c = Math.min(99, Math.max(1, c + m));
      ps.push(+(base + c / 100).toFixed(2));
    }
    const counts: Record<Tick, number> = { up: 0, down: 0, zup: 0, zdown: 0 };
    for (let i = 2; i < ps.length; i++) counts[classify(ps, i).tick]++;
    if (ORDER.every((t) => counts[t] >= 2)) return ps;
  }
  return [56.08, 56.05, 56.05, 56.05, 56.07, 56.07, 56.06, 56.06, 56.08, 56.08, 56.1, 56.09, 56.09, 56.11, 56.11, 56.1];
}

const Glyph = ({ t }: { t: Tick }) => (
  <span className={`tt-glyph tt-${t}`} aria-hidden>
    {t === "zup" || t === "zdown" ? <b>0</b> : null}
    {t === "up" || t === "zup" ? <ArrowUp size={15} strokeWidth={3} /> : <ArrowDown size={15} strokeWidth={3} />}
  </span>
);

export function TickTape({ onDone }: GameProps) {
  const tape = useMemo(makeTape, []);
  const [i, setI] = useState(2); // index of the print being labelled
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [fb, setFb] = useState<{ ok: boolean; pick: Tick } | null>(null);
  const [left, setLeft] = useState(SECONDS);
  const deadline = useRef(Date.now() + SECONDS * 1000);
  const finished = useRef(false);
  const done = i >= tape.length || left <= 0;
  const cur = Math.min(i, tape.length - 1);
  const truth = classify(tape, cur);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => setLeft(Math.max(0, (deadline.current - Date.now()) / 1000)), 100);
    return () => clearInterval(t);
  }, [done]);

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const id = setTimeout(() => onDone({ score, max: N }), 700);
    return () => clearTimeout(id);
  }, [done, score, onDone]);

  const pick = (t: Tick) => {
    if (fb || done) return;
    const ok = t === truth.tick;
    setFb({ ok, pick: t });
    if (ok) {
      setScore((s) => s + 1);
      setStreak((s) => {
        setBest((b) => Math.max(b, s + 1));
        return s + 1;
      });
    } else setStreak(0);
    setTimeout(
      () => {
        setFb(null);
        setI((x) => x + 1);
      },
      ok ? 650 : 1900,
    );
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        pick(ORDER[Number(e.key) - 1]);
      }
    };
    // capture phase, so the lesson player doesn't also see the key
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  // the visible window of the tape: the last few prints up to the current one
  const from = Math.max(0, cur - SHOW + 1);
  const shown = tape.slice(from, cur + 1).map((_, k) => from + k);
  const answered = (j: number) => j < cur || (j === cur && !!fb);

  return (
    <div className="tt">
      <div className="tt-top">
        <span className="tt-score" aria-label={`${score} right`}>
          <Check size={15} strokeWidth={3} /> {score}
        </span>
        <div className="tt-time" aria-label={`${Math.ceil(left)} seconds left`}>
          <motion.div className="tt-time-fill" animate={{ width: `${(100 * left) / SECONDS}%` }} transition={{ duration: 0.1, ease: "linear" }} />
        </div>
        <AnimatePresence>
          {streak >= 2 && (
            <motion.span key="streak" className="tt-streak" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} title={`${streak} right in a row`}>
              <Flame size={14} /> {streak}
            </motion.span>
          )}
        </AnimatePresence>
        <span className="tt-count">
          {Math.min(i - 1, N)}/{N}
        </span>
      </div>

      <div className="tt-tape" aria-live="polite">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((j) => {
            const isCur = j === cur && !done;
            const t = j >= 2 ? classify(tape, j).tick : null;
            const isRef = !!fb && j === truth.ref && (truth.tick === "zup" || truth.tick === "zdown");
            return (
              <motion.div
                key={j}
                layout
                className={`tt-chip${isCur ? " now" : ""}${isRef ? " ref" : ""}${answered(j) && t ? ` tt-${t}` : ""}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: j < cur - SHOW + 2 && !isCur ? 0.55 : 1, x: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.18, ease: EASE_OUT } }}
                transition={spring.soft}
              >
                <span className="tt-price">{tape[j].toFixed(2)}</span>
                <span className="tt-tag">{isCur && !fb ? "?" : answered(j) && t ? <Glyph t={t} /> : ""}</span>
                {isRef && <span className="tt-ref">last different</span>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="tt-fb-wrap">
        <AnimatePresence mode="wait" initial={false}>
          {fb ? (
            <motion.p key={`fb${i}`} className={`tt-fb ${fb.ok ? "ok" : "ko"}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              {fb.ok ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
              <span>
                <strong>{LABEL[truth.tick]}.</strong> {explain(tape, cur)}
              </span>
            </motion.p>
          ) : done ? (
            <motion.p key="end" className="tt-fb" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {left <= 0 && i < tape.length ? "Time!" : "Tape done!"} Best streak: {best}
            </motion.p>
          ) : (
            <motion.p key={`ask${i}`} className="tt-fb muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
              What is the newest print on?
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="tt-btns">
        {ORDER.map((t, k) => {
          const st = fb ? (t === truth.tick ? "right" : t === fb.pick ? "wrong" : "") : "";
          return (
            <motion.button
              key={t}
              type="button"
              className={`tt-btn ${st}`}
              onClick={() => pick(t)}
              disabled={done}
              animate={st === "wrong" ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Glyph t={t} />
              {LABEL[t]}
              <Kbd>{k + 1}</Kbd>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
