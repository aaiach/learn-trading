// Game: guess each class's share of U.S. capital wealth, then see Table 3-4 (§3.4.1).
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Button, Kbd } from "../../../ds/ui.tsx";
import { spring } from "../../../motion/tokens.ts";
import "./u34.css";

const ROWS = [
  { name: "Common stocks", truth: 20 },
  { name: "Real estate", truth: 50 },
  { name: "Government bonds", truth: 10 },
  { name: "Derivative contracts", truth: 0 },
];
const CLOSE = 7;

export function WealthGuess({ onDone }: GameProps) {
  const [guess, setGuess] = useState(() => ROWS.map(() => 25));
  const [shown, setShown] = useState(false);
  const score = ROWS.filter((r, i) => Math.abs(guess[i] - r.truth) <= CLOSE).length;

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      e.stopPropagation();
      if (!shown) setShown(true);
      else onDone({ score, max: ROWS.length });
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  }, [shown, score, onDone]);

  return (
    <div className="wg">
      <p className="wg-lead">What share of U.S. capital wealth is in each class?</p>
      {ROWS.map((r, i) => {
        const off = Math.abs(guess[i] - r.truth);
        const ok = off <= CLOSE;
        return (
          <div key={r.name} className="wg-row">
            <div className="wg-head">
              <span className="wg-name">{r.name}</span>
              <span className="wg-val">{guess[i]}%</span>
            </div>
            {!shown ? (
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={guess[i]}
                aria-label={`${r.name}: your guess`}
                className="wg-range"
                onChange={(e) => setGuess((g) => g.map((v, k) => (k === i ? Number(e.target.value) : v)))}
              />
            ) : (
              <div className="wg-track">
                <motion.div
                  className="wg-truth"
                  initial={{ width: 0 }}
                  animate={{ width: `${r.truth}%` }}
                  transition={{ ...spring.fill, delay: 0.15 * i }}
                />
                <span className="wg-pin" style={{ left: `${guess[i]}%` }} aria-hidden />
                <motion.span
                  className={`wg-off ${ok ? "ok" : "ko"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + 0.15 * i }}
                >
                  {ok ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />} {r.truth}% · off by {off}
                </motion.span>
              </div>
            )}
          </div>
        );
      })}
      {!shown ? (
        <Button variant="cta" onClick={() => setShown(true)}>
          Reveal Table 3-4 <Kbd>Enter</Kbd>
        </Button>
      ) : (
        <div className="wg-end">
          <p>
            <strong>
              {score} of {ROWS.length}
            </strong>{" "}
            within {CLOSE} points. The bar is the book’s figure; the pin is your guess.
          </p>
          <Button variant="cta" onClick={() => onDone({ score, max: ROWS.length })}>
            Finish <Kbd>Enter</Kbd>
          </Button>
        </div>
      )}
    </div>
  );
}
