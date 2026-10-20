import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Play, Trophy, X } from "lucide-react";
import type { ClassifyStep, GameResult, GameStep, MatchStep } from "../../content/types.ts";
import { BookQuote, Button, Card, Kbd, Rich } from "../../ds/ui.tsx";
import { practiceVerb } from "../../ds/kinds.ts";
import { Swap } from "../../motion/AutoHeight.tsx";
import { EASE_OUT, spring } from "../../motion/tokens.ts";
import { shuffle } from "../../util.ts";
import { CheckMark } from "./Questions.tsx";

export type ActivityResult = GameResult & { missed: string[] };

// ── Sort one card at a time into buckets ────────────────────────────────────
export function ClassifyView({ step, onDone, refText }: { step: ClassifyStep; onDone: (r: ActivityResult) => void; refText?: string }) {
  const order = useMemo(() => shuffle(step.items.map((_, i) => i)), [step]);
  const [pos, setPos] = useState(0);
  const [counts, setCounts] = useState(() => step.buckets.map(() => 0));
  const [wrong, setWrong] = useState<{ picked: number } | null>(null);
  const [missed, setMissed] = useState<string[]>([]);
  const [flash, setFlash] = useState<{ b: number; ok: boolean; n: number } | null>(null);
  const [exitTo, setExitTo] = useState(0);
  const done = pos >= order.length;
  const item = done ? null : step.items[order[pos]];
  const n = step.buckets.length;
  const cols = n === 4 ? 2 : n;

  const pick = (b: number) => {
    if (!item || wrong) return;
    const ok = b === item.bucket;
    setFlash({ b, ok, n: Date.now() });
    if (ok) {
      const col = b % cols;
      setExitTo(cols === 1 ? 0 : (col - (cols - 1) / 2) * (cols === 2 ? 150 : 120));
      setCounts((c) => c.map((v, i) => (i === b ? v + 1 : v)));
      setPos((p) => p + 1);
    } else {
      setWrong({ picked: b });
      setMissed((m) => [...m, item.text]);
    }
  };
  const next = () => {
    if (!item || !wrong) return;
    setCounts((c) => c.map((v, i) => (i === item.bucket ? v + 1 : v)));
    setWrong(null);
    setExitTo(0);
    setPos((p) => p + 1);
  };

  useEffect(() => {
    if (done) onDone({ score: step.items.length - missed.length, max: step.items.length, missed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (/^[1-9]$/.test(e.key) && !wrong) {
        const b = Number(e.key) - 1;
        if (b < n) pick(b);
      }
      if (e.key === "Enter" && wrong) {
        e.preventDefault();
        e.stopPropagation();
        next();
      }
    };
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  return (
    <Card tone="prac" verb={practiceVerb(step)} refText={refText}>
      <div className="cls-head">
        <h2 className="prompt">
          <Rich text={step.q} />
        </h2>
        <span className="cls-count">
          {Math.min(pos + 1, order.length)} / {order.length}
        </span>
      </div>
      <div className="cls-stage">
        <AnimatePresence mode="popLayout" custom={exitTo}>
          {item ? (
            <motion.div
              key={order[pos]}
              className={`cls-card ${wrong ? "wrong" : ""}`}
              custom={exitTo}
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={wrong ? { opacity: 1, y: 0, scale: 1, x: [0, -7, 7, -4, 0] } : { opacity: 1, y: 0, scale: 1, x: 0 }}
              variants={{ out: (dx: number) => ({ opacity: 0, x: dx, y: 70, scale: 0.55, transition: { duration: 0.38, ease: EASE_OUT } }) }}
              exit="out"
              transition={{ ...spring.soft, x: { duration: 0.34 } }}
            >
              <Rich text={item.text} />
            </motion.div>
          ) : (
            <motion.div key="done" className="cls-done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <CheckMark size={28} />
              <span>
                {step.items.length - missed.length} of {step.items.length} sorted right
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="buckets" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {step.buckets.map((b, i) => {
          const isTarget = wrong && item && i === item.bucket;
          const isPicked = wrong && i === wrong.picked;
          const f = flash && flash.b === i ? flash : null;
          return (
            <motion.button
              key={b}
              type="button"
              className={`bucket ${isTarget ? "target" : ""} ${isPicked ? "picked-wrong" : ""}`}
              onClick={() => pick(i)}
              disabled={done || !!wrong}
              animate={f ? { y: f.ok ? [0, 4, 0] : 0 } : { y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bucket-key">{i + 1}</span>
              <span className="bucket-name">{b}</span>
              <motion.span key={counts[i]} className="bucket-n" initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                {counts[i]}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
      <Swap k={wrong ? `w${pos}` : done ? "done" : "none"}>
        {wrong && item ? (
          <div className="cls-why">
            <p>
              <X size={16} strokeWidth={3} className="ico-bad" /> It goes in <strong>{step.buckets[item.bucket]}</strong>.{" "}
              {item.why && <Rich text={item.why} />}
            </p>
            <Button variant="soft" onClick={next}>
              Next <ArrowRight size={16} /> <Kbd>Enter</Kbd>
            </Button>
          </div>
        ) : done ? (
          <BookQuote cite={step.cite} size="sm" />
        ) : (
          <p className="hint">
            Tap a box
            <span className="kbd-hint">
              , or press <Kbd>1</Kbd>–<Kbd>{n}</Kbd>
            </span>
          </p>
        )}
      </Swap>
    </Card>
  );
}

// ── Match pairs ─────────────────────────────────────────────────────────────
export function MatchView({ step, onDone, refText }: { step: MatchStep; onDone: (r: ActivityResult) => void; refText?: string }) {
  const right = useMemo(() => shuffle(step.pairs.map((_, i) => i)), [step]);
  const [selL, setSelL] = useState<number | null>(null);
  const [selR, setSelR] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [bad, setBad] = useState<{ l: number; r: number; n: number } | null>(null);
  const [missed, setMissed] = useState<string[]>([]);
  const done = matched.length === step.pairs.length;

  useEffect(() => {
    if (selL === null || selR === null) return;
    if (selL === selR) setMatched((m) => [...m, selL]);
    else {
      setBad({ l: selL, r: selR, n: Date.now() });
      setMissed((m) => (m.includes(step.pairs[selL][0]) ? m : [...m, step.pairs[selL][0]]));
    }
    setSelL(null);
    setSelR(null);
  }, [selL, selR, step]);

  useEffect(() => {
    if (done) onDone({ score: Math.max(0, step.pairs.length - missed.length), max: step.pairs.length, missed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  const cell = (side: "l" | "r", i: number, text: string) => {
    const isM = matched.includes(i);
    const sel = side === "l" ? selL === i : selR === i;
    const isBad = !isM && bad && (side === "l" ? bad.l === i : bad.r === i);
    return (
      <motion.button
        key={`${side}${i}${isBad ? bad.n : ""}`}
        type="button"
        className={`m-cell ${sel ? "sel" : ""} ${isM ? "matched" : ""} ${isBad ? "bad" : ""}`}
        disabled={isM}
        onClick={() => (side === "l" ? setSelL(sel ? null : i) : setSelR(sel ? null : i))}
        animate={isBad ? { x: [0, -6, 6, -3, 0] } : { x: 0 }}
        transition={{ duration: 0.32 }}
        layout
      >
        <Rich text={text} />
        {isM && <CheckMark size={16} />}
      </motion.button>
    );
  };

  return (
    <Card tone="prac" verb={practiceVerb(step)} refText={refText}>
      <h2 className="prompt">
        <Rich text={step.q} />
      </h2>
      <div className="match">
        {step.pairs.map((p, i) => [cell("l", i, p[0]), cell("r", right[i], step.pairs[right[i]][1])])}
      </div>
      <Swap k={done ? "done" : "go"}>
        {done ? <BookQuote cite={step.cite} size="sm" /> : <p className="hint">Tap a term, then its match.</p>}
      </Swap>
    </Card>
  );
}

// ── Game wrapper ────────────────────────────────────────────────────────────
export function GameView({ step, onDone }: { step: GameStep; onDone: (r: ActivityResult) => void }) {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [res, setRes] = useState<GameResult | null>(null);
  const G = step.game;
  return (
    <Card tone="game">
      <h2 className="title title-sm">{step.title}</h2>
      <Swap k={phase}>
        {phase === "intro" && (
          <div className="game-intro">
            <p className="lead">
              <Rich text={step.brief} />
            </p>
            <Button variant="cta" onClick={() => setPhase("play")} autoFocus>
              <Play size={16} /> Start
            </Button>
          </div>
        )}
        {phase === "play" && (
          <G
            onDone={(r) => {
              setRes(r);
              setPhase("done");
              onDone({ ...r, missed: [] });
            }}
          />
        )}
        {phase === "done" && res && (
          <div className="game-done">
            <motion.div
              className="game-trophy"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={spring.soft}
            >
              <Trophy size={30} />
            </motion.div>
            <p className="game-score">
              {res.score} <span>/ {res.max}</span>
            </p>
            <Button variant="ghost" onClick={() => setPhase("play")}>
              Play again
            </Button>
          </div>
        )}
      </Swap>
    </Card>
  );
}
