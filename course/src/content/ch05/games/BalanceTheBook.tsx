// Game: you are the bookie (box "Bookies Are Dealers", p. 93). Bets come in lopsided; lay off part of the
// heavy side with another bookie so you earn the same whichever team wins. Our numbers: every bet risks
// $11 to win $10 (the book's "1 dollar for a 10-dollar bet"), and the other bookie offers the same terms.
// Laying off L on team A: +L if A wins, −1.1·L if B wins. The outcomes match when L = (bets on A) − (bets on B).
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { shuffle } from "../../../util.ts";
import "./u53a.css";

const ROUNDS = 8;
const STEP = 10;
const MAX_LAY = 80;
const TEAMS: [string, string][] = shuffle([
  ["Hawks", "Bears"],
  ["Lions", "Sharks"],
  ["Comets", "Rockets"],
  ["Wolves", "Eagles"],
  ["Tigers", "Owls"],
  ["Pirates", "Knights"],
  ["Falcons", "Bulls"],
  ["Rams", "Foxes"],
]);

type Round = { teams: [string, string]; a: number; b: number };

function makeRounds(): Round[] {
  const rounds: Round[] = [];
  // one balanced book (lay off nothing), the rest lopsided, heavy side random
  const balancedAt = 3 + Math.floor(Math.random() * 4);
  for (let i = 0; i < ROUNDS; i++) {
    const light = 10 * (1 + Math.floor(Math.random() * 4));
    const gap = i === balancedAt ? 0 : 10 * (1 + Math.floor(Math.random() * (i < 2 ? 3 : 6)));
    const heavyA = Math.random() < 0.5;
    rounds.push({ teams: TEAMS[i % TEAMS.length], a: heavyA ? light + gap : light, b: heavyA ? light : light + gap });
  }
  return rounds;
}

/** The bookie's result if A wins and if B wins, after laying off `lay` (positive: on A, negative: on B). */
function outcomes(a: number, b: number, lay: number) {
  const onA = Math.max(0, lay);
  const onB = Math.max(0, -lay);
  return {
    ifA: 1.1 * b - a + onA - 1.1 * onB,
    ifB: 1.1 * a - b - 1.1 * onA + onB,
  };
}

const usd = (v: number) => {
  const r = Math.round(v * 10) / 10;
  const s = Number.isInteger(r) ? String(Math.abs(r)) : Math.abs(r).toFixed(1);
  return `${r < 0 ? "−" : r > 0 ? "+" : ""}$${s}`;
};

export function BalanceTheBook({ onDone }: GameProps) {
  const rounds = useMemo(makeRounds, []);
  const [i, setI] = useState(0);
  const [lay, setLay] = useState(0);
  const [score, setScore] = useState(0);
  const [placed, setPlaced] = useState<{ ok: boolean } | null>(null);
  const finished = useRef(false);
  const done = i >= ROUNDS;
  const r = rounds[Math.min(i, ROUNDS - 1)];
  const [A, B] = r.teams;
  const before = outcomes(r.a, r.b, 0);
  const after = outcomes(r.a, r.b, lay);
  const right = r.a - r.b;
  const shown = placed ? after : before;
  const big = Math.max(30, Math.abs(before.ifA), Math.abs(before.ifB));

  useEffect(() => {
    if (!done || finished.current) return;
    finished.current = true;
    const t = setTimeout(() => onDone({ score, max: ROUNDS }), 500);
    return () => clearTimeout(t);
  }, [done, score, onDone]);

  const nudge = (d: number) => {
    if (placed || done) return;
    setLay((x) => Math.max(-MAX_LAY, Math.min(MAX_LAY, x + d * STEP)));
  };

  const place = () => {
    if (placed || done) return;
    const ok = lay === right;
    if (ok) setScore((s) => s + 1);
    setPlaced({ ok });
    setTimeout(
      () => {
        setPlaced(null);
        setLay(0);
        setI((x) => x + 1);
      },
      ok ? 1900 : 3600,
    );
  };

  useEffect(() => {
    if (done) return;
    const on = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "ArrowLeft" || k === "-") nudge(-1);
      else if (k === "ArrowRight" || k === "+" || k === "=") nudge(1);
      else if (k === "Enter") place();
      else return;
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const layText = lay === 0 ? "Lay off nothing" : `Lay off $${Math.abs(lay)} on ${lay > 0 ? A : B}`;
  const rightText = right === 0 ? "nothing: the book is already balanced" : `$${Math.abs(right)} on ${right > 0 ? A : B}`;

  return (
    <div className="btb">
      <div className="btb-top">
        <span className="btb-round">
          Game {Math.min(i + 1, ROUNDS)} / {ROUNDS}
        </span>
        <span className="btb-score">
          <Check size={15} strokeWidth={3} /> {score}
        </span>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={i}
          className="btb-book"
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -28, transition: { duration: 0.16, ease: EASE_OUT } }}
          transition={spring.soft}
        >
          <p className="btb-head">Your book</p>
          {[
            { team: A, amt: r.a },
            { team: B, amt: r.b },
          ].map(({ team, amt }) => (
            <div key={team} className="btb-bet">
              <span className="btb-team">{team}</span>
              <span className="btb-track">
                <motion.span className="btb-fill" initial={false} animate={{ width: `${(100 * amt) / 120}%` }} transition={spring.fill} />
              </span>
              <strong>${amt}</strong>
            </div>
          ))}
          <p className="btb-rule">Every bet risks $11 to win $10. So does a lay-off bet with the other bookie.</p>
        </motion.div>
      </AnimatePresence>

      <div className="btb-out" aria-live="polite">
        <p className="btb-head">{placed ? "After your lay-off" : "Your result right now"}</p>
        {[
          { label: `If ${A} win`, v: shown.ifA },
          { label: `If ${B} win`, v: shown.ifB },
        ].map(({ label, v }) => (
          <div key={label} className="btb-res">
            <span className="btb-res-label">{label}</span>
            <span className="btb-axis">
              <motion.span
                className={`btb-pnl ${v < 0 ? "neg" : "pos"}`}
                initial={false}
                animate={{ width: `${Math.min(50, (50 * Math.abs(v)) / big)}%`, left: v < 0 ? `${50 - Math.min(50, (50 * Math.abs(v)) / big)}%` : "50%" }}
                transition={spring.fill}
              />
            </span>
            <strong className="btb-val">{usd(v)}</strong>
          </div>
        ))}
      </div>

      <motion.div className="btb-ctl" animate={placed && !placed.ok ? { x: [0, -7, 7, -4, 0] } : { x: 0 }} transition={{ duration: 0.32 }}>
        <button type="button" className="btb-step" onClick={() => nudge(-1)} disabled={!!placed || done} aria-label={`$10 more on ${B}`}>
          <Minus size={18} strokeWidth={2.6} />
        </button>
        <span className={`btb-lay ${placed ? (placed.ok ? "ok" : "ko") : ""}`}>{layText}</span>
        <button type="button" className="btb-step" onClick={() => nudge(1)} disabled={!!placed || done} aria-label={`$10 more on ${A}`}>
          <Plus size={18} strokeWidth={2.6} />
        </button>
      </motion.div>
      <p className="btb-keys">
        <Kbd>←</Kbd> more on {B} · more on {A} <Kbd>→</Kbd>
      </p>

      <div className="btb-msg">
        <AnimatePresence mode="wait" initial={false}>
          {placed ? (
            <motion.p key={`m${i}`} className={placed.ok ? "ok" : "ko"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {placed.ok ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />}
              {placed.ok
                ? ` Balanced: ${usd(after.ifA)} whoever wins.`
                : ` The right lay-off was ${rightText}: lay off the difference between the two sides.`}
            </motion.p>
          ) : (
            <motion.p key={`h${i}`} className="btb-hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Make both results equal.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button type="button" className="btb-place" onClick={place} disabled={!!placed || done}>
        Place lay-off <Kbd>Enter</Kbd>
      </button>
    </div>
  );
}
