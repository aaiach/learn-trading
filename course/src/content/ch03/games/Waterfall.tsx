// Game: a CMO waterfall. Predict which tranches are paid in full, then pour the cash (§3.3.2.1).
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { shuffle } from "../../../util.ts";
import { EASE_OUT } from "../../../motion/tokens.ts";
import "./u33a.css";

const TR = [
  { name: "Tranche A", cap: 30 },
  { name: "Tranche B", cap: 25 },
  { name: "Tranche C", cap: 25 },
  { name: "Z tranche", cap: 20 },
];

function fills(paid: number) {
  let left = paid;
  return TR.map((t) => {
    const got = Math.min(t.cap, Math.max(0, left));
    left -= got;
    return got;
  });
}

export function Waterfall({ onDone }: GameProps) {
  const rounds = useMemo(() => shuffle([100, 92, 81, 64, 47, 28]).slice(0, 5), []);
  const [r, setR] = useState(0);
  const [sel, setSel] = useState<number[]>([]);
  const [poured, setPoured] = useState(false);
  const [score, setScore] = useState(0);
  const paid = rounds[r];
  const f = fills(paid);
  const full = TR.map((t, i) => f[i] === t.cap);
  const right = poured && TR.every((_, i) => full[i] === sel.includes(i));

  const toggle = (i: number) => {
    if (poured) return;
    setSel((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
  };
  const pour = () => {
    if (poured) return;
    setPoured(true);
    if (TR.every((_, i) => full[i] === sel.includes(i))) setScore((s) => s + 1);
  };
  const next = () => {
    if (!poured) return;
    if (r + 1 >= rounds.length) {
      onDone({ score, max: rounds.length });
      return;
    }
    setR(r + 1);
    setSel([]);
    setPoured(false);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-4]$/.test(e.key)) toggle(Number(e.key) - 1);
      if (e.key === " " || e.key === "p" || e.key === "P") {
        e.preventDefault();
        if (poured) next();
        else pour();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  });

  return (
    <div className="wf">
      <p className="wf-q">
        Round {r + 1}/{rounds.length}: borrowers paid <strong>${paid}</strong> of the $100 owed. Tap every tranche that gets{" "}
        <strong>paid in full</strong>, then pour.
      </p>
      <div className="wf-rows">
        {TR.map((t, i) => {
          const picked = sel.includes(i);
          const st = poured ? (full[i] === picked ? "ok" : "ko") : picked ? "picked" : "";
          return (
            <button key={t.name} type="button" className={`wf-row ${st}`} onClick={() => toggle(i)} aria-pressed={picked}>
              <span className="wf-name">
                <Kbd>{i + 1}</Kbd> {t.name}
              </span>
              <span className="wf-tank" style={{ width: `${(100 * t.cap) / 30}%` }}>
                <motion.span
                  className="wf-fill"
                  initial={false}
                  animate={{ width: poured ? `${(100 * f[i]) / t.cap}%` : "0%" }}
                  transition={{ duration: poured ? 0.5 : 0.2, ease: EASE_OUT, delay: poured ? i * 0.4 : 0 }}
                />
              </span>
              <span className="wf-val">
                {poured ? `$${f[i]}/${t.cap}` : picked ? "full?" : `owed $${t.cap}`}
                {poured && (full[i] === picked ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />)}
              </span>
            </button>
          );
        })}
      </div>
      <div className="wf-foot">
        <span className="wf-score">
          {score} correct{poured ? (right ? " · right!" : " · not quite") : ""}
        </span>
        {poured ? (
          <button type="button" className="wf-go" onClick={next}>
            {r + 1 >= rounds.length ? "Finish" : "Next round"} <Kbd>Space</Kbd>
          </button>
        ) : (
          <button type="button" className="wf-go" onClick={pour}>
            Pour the cash <Kbd>Space</Kbd>
          </button>
        )}
      </div>
    </div>
  );
}
