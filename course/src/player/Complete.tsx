import { motion } from "motion/react";
import { Clock, Star, Target, Zap } from "lucide-react";
import { Button, Kbd } from "../ds/ui.tsx";
import { EASE_OUT, spring } from "../motion/tokens.ts";
import type { RunResult } from "./Player.tsx";
import { useEffect } from "react";
import { CountUp } from "../motion/CountUp.tsx";

export const PASS = 0.8;

export function starsFor(r: RunResult): number {
  if (!r.questions) return 3;
  const acc = r.firstTry / r.questions;
  return acc >= 0.999 ? 3 : acc >= 0.75 ? 2 : 1;
}

export function Complete({
  title,
  mode,
  result,
  onDone,
}: {
  title: string;
  mode: "lesson" | "check";
  result: RunResult;
  onDone: () => void;
}) {
  const acc = result.questions ? Math.round((100 * result.firstTry) / result.questions) : 100;
  const stars = starsFor(result);
  const passed = acc / 100 >= PASS;
  const secs = Math.round(result.ms / 1000);
  const good = mode === "lesson" || passed;

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onDone();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [onDone]);

  return (
    <div className="complete">
      <div className="col complete-col">
        <svg viewBox="0 0 120 120" width="112" height="112" className={`complete-badge ${good ? "good" : "bad"}`} aria-hidden>
          <motion.circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0, rotate: -90 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: EASE_OUT }}
            style={{ originX: "50%", originY: "50%" }}
          />
          {good ? (
            <motion.path
              d="M38 62l15 15 30-32"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: EASE_OUT }}
            />
          ) : (
            <motion.path
              d="M60 36v30M60 82v2"
              fill="none"
              stroke="currentColor"
              strokeWidth="9"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6, duration: 0.4, ease: EASE_OUT }}
            />
          )}
        </svg>
        <motion.h1 className="complete-title" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {mode === "lesson" ? "Lesson complete" : passed ? "Checkpoint passed" : "Not yet — 80% to pass"}
        </motion.h1>
        <p className="complete-sub">{title}</p>
        {mode === "lesson" && (
          <div className="stars" aria-label={`${stars} of 3 stars`}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={`star ${i < stars ? "on" : ""}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.15, ...spring.ui }}
              >
                <Star size={34} fill="currentColor" />
              </motion.span>
            ))}
          </div>
        )}
        <div className="tiles">
          <motion.div className="tile t-xp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <span className="tile-label">
              <Zap size={14} /> XP
            </span>
            <CountUp value={result.xp} delay={1.2} className="tile-val" />
          </motion.div>
          <motion.div className="tile t-acc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <span className="tile-label">
              <Target size={14} /> {mode === "lesson" ? "First try" : "Score"}
            </span>
            <CountUp value={acc} delay={1.3} className="tile-val" suffix="%" />
          </motion.div>
          <motion.div className="tile t-time" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
            <span className="tile-label">
              <Clock size={14} /> Time
            </span>
            <span className="tile-val">
              {Math.floor(secs / 60)}:{String(secs % 60).padStart(2, "0")}
            </span>
          </motion.div>
        </div>
      </div>
      <footer className="p-foot">
        <div className="col p-foot-row">
          <span />
          <Button variant="cta" onClick={onDone} className="btn-wide" autoFocus>
            Continue <Kbd>Enter</Kbd>
          </Button>
        </div>
      </footer>
    </div>
  );
}
