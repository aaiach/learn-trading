// Game: drag the DAX close and hit target payoffs on the book's ODAX call (§3.3.3.1, Eurex ODAX box).
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Minus, Plus, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { ODAX, OdaxAxes, odaxPayoff, odaxX, odaxY } from "../illus/u33b.tsx";
import { clamp } from "../../../util.ts";
import "./u33b.css";

type Round = { goal: string; hint: string; ok: (d: number) => boolean; answer: number };

const ROUNDS: Round[] = [
  { goal: "Make the call pay €1,500.", hint: "5 × (close − 6,200) = 1,500", ok: (d) => Math.abs(odaxPayoff(d) - 1500) <= 10, answer: 6500 },
  { goal: "Pick a close where the call expires worthless.", hint: "No exercise at or below the strike", ok: (d) => d <= ODAX.strike, answer: 6150 },
  { goal: "Find the break-even close: the payoff just covers the €130 you paid.", hint: "5 × (close − 6,200) = 130 (derived)", ok: (d) => Math.abs(d - 6226) <= 2, answer: 6226 },
  { goal: "Make a profit of €500 after the €130 you paid.", hint: "payoff − 130 = 500", ok: (d) => Math.abs(odaxPayoff(d) - 130 - 500) <= 10, answer: 6326 },
];

const fmt = (n: number) => n.toLocaleString("en-US");
const toDax = (x: number) => Math.round(ODAX.dmin + ((x - 64) / 316) * (ODAX.dmax - ODAX.dmin));

export function OdaxGame({ onDone }: GameProps) {
  const [r, setR] = useState(0);
  const [dax, setDax] = useState(5900);
  const [locked, setLocked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const svg = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const round = ROUNDS[r];
  const pay = odaxPayoff(dax);
  const profit = pay - ODAX.mult * ODAX.premium;

  const set = (d: number) => locked === null && setDax(clamp(Math.round(d), ODAX.dmin, ODAX.dmax));
  const fromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const el = svg.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    set(toDax(x));
  };
  const lock = () => {
    if (locked !== null) return;
    const ok = round.ok(dax);
    setLocked(ok);
    if (ok) setScore((s) => s + 1);
  };
  const next = () => {
    if (locked === null) return;
    if (r + 1 >= ROUNDS.length) {
      onDone({ score, max: ROUNDS.length });
      return;
    }
    setR(r + 1);
    setLocked(null);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        set(dax + (e.shiftKey ? 10 : 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation();
        set(dax - (e.shiftKey ? 10 : 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (locked === null) lock();
        else next();
      }
    };
    // capture phase, so the lesson player's arrow and Enter keys don't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const x = odaxX(dax);
  return (
    <div className="odax">
      <div className="odax-goal">
        <span className="odax-round">
          Round {r + 1}/{ROUNDS.length}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p key={r} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
            {round.goal}
          </motion.p>
        </AnimatePresence>
      </div>
      <svg
        ref={svg}
        viewBox="0 0 400 256"
        className="stage odax-chart"
        role="slider"
        aria-label="DAX close at expiration"
        aria-valuemin={ODAX.dmin}
        aria-valuemax={ODAX.dmax}
        aria-valuenow={dax}
        tabIndex={0}
        onPointerDown={(e) => {
          if (locked !== null) return;
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromPointer(e);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <rect width={400} height={256} rx={16} fill="var(--scene-bg)" className="odax-bg" />
        <OdaxAxes />
        <path d={`M${odaxX(ODAX.dmin)},${odaxY(0)} L${odaxX(6200)},${odaxY(0)} L${odaxX(ODAX.dmax)},${odaxY(odaxPayoff(ODAX.dmax))}`} fill="none" stroke="var(--ink)" strokeWidth={2.6} strokeLinejoin="round" />
        {locked === false && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <line x1={odaxX(round.answer)} x2={odaxX(round.answer)} y1={34} y2={odaxY(0)} stroke="var(--good)" strokeWidth={2} strokeDasharray="4 4" />
            <text x={odaxX(round.answer)} y={30} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800, fill: "var(--good)" }}>
              {r === 1 ? "≤ 6,200" : fmt(round.answer)}
            </text>
          </motion.g>
        )}
        {/* the handle follows the pointer exactly: no easing */}
        <line x1={x} x2={x} y1={40} y2={odaxY(0) + 6} stroke="var(--prac)" strokeWidth={2.5} />
        <circle cx={x} cy={odaxY(pay)} r={6.5} fill="var(--prac)" stroke="var(--scene-bg)" strokeWidth={2.5} />
        <rect x={x - 26} y={odaxY(0) + 6} width={52} height={22} rx={11} fill="var(--prac)" />
        <text x={x} y={odaxY(0) + 21} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800, fill: "#fff" }}>
          {fmt(dax)}
        </text>
      </svg>
      <div className="odax-read">
        <span>
          Payoff <strong>€{fmt(pay)}</strong>
        </span>
        <span>
          After the €130 <strong className={profit > 0 ? "pos" : profit < 0 ? "neg" : ""}>{profit >= 0 ? "+" : "−"}€{fmt(Math.abs(profit))}</strong>
        </span>
      </div>
      <div className="odax-nudge">
        <button type="button" onClick={() => set(dax - 10)} disabled={locked !== null} aria-label="DAX minus 10">
          <Minus size={14} />
          10
        </button>
        <button type="button" onClick={() => set(dax - 1)} disabled={locked !== null} aria-label="DAX minus 1">
          <Minus size={14} />1
        </button>
        <button type="button" onClick={() => set(dax + 1)} disabled={locked !== null} aria-label="DAX plus 1">
          <Plus size={14} />1
        </button>
        <button type="button" onClick={() => set(dax + 10)} disabled={locked !== null} aria-label="DAX plus 10">
          <Plus size={14} />
          10
        </button>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {locked === null ? (
          <motion.button key="lock" type="button" className="odax-go" onClick={lock} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            Lock in {fmt(dax)} <Kbd>Enter</Kbd>
          </motion.button>
        ) : (
          <motion.div key="fb" className={`odax-fb ${locked ? "ok" : "ko"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <span>
              {locked ? <Check size={16} strokeWidth={3} /> : <X size={16} strokeWidth={3} />} {locked ? "Right." : "Not quite."} {round.hint}.
            </span>
            <button type="button" onClick={next}>
              {r + 1 >= ROUNDS.length ? "Finish" : "Next round"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
