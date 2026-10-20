// Game: predict what four kinds of £5 sell order do on a price path, then run the tape (§4.6, Table 4-2).
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Play, X } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd } from "../../../ds/ui.tsx";
import { Ping, toneVar, type SceneTone } from "../../../scene/index.tsx";
import { PriceChart, chartX, chartY } from "../illus/kit.tsx";
import { LevelTags } from "../illus/u45.tsx";
import "./u46.css";

type Kind = "limit" | "stop" | "stoplimit" | "mit";
type Outcome = "none" | "atleast" | "below";
type Round = { name: string; note: string; pts: number[]; orders: [Kind, Kind] };

const ORDER: Record<Kind, { name: string; terms: string; short: string; tone: SceneTone }> = {
  limit: { name: "Standing limit sell", terms: "limit £5", short: "Limit", tone: "idea" },
  stop: { name: "Market stop sell", terms: "stop £5", short: "Stop", tone: "prac" },
  stoplimit: { name: "Limit-stop sell", terms: "stop £5 · limit £5", short: "Limit-stop", tone: "game" },
  mit: { name: "Market-if-touched sell", terms: "touch £5", short: "MIT", tone: "see" },
};

// Our numbers. Stop and limit-stop orders start above £5 (they wait for a fall); limit and MIT orders
// start below £5 (they wait for a rise), as in Table 4-2.
const ROUNDS: Round[] = [
  { name: "Slow slide", note: "Price drifts down through £5.", pts: [5.4, 5.3, 5.2, 5.1, 5.0, 4.9, 4.8], orders: ["stop", "stoplimit"] },
  { name: "Bad news", note: "Price gaps from £5.15 to £4.70.", pts: [5.4, 5.3, 5.15, 4.7, 4.6, 4.55], orders: ["stop", "stoplimit"] },
  { name: "Touch and bounce", note: "Price dips to £5 and rebounds.", pts: [5.4, 5.25, 5.1, 5.0, 5.15, 5.3], orders: ["stop", "stoplimit"] },
  { name: "Gap, then recovery", note: "Price gaps under £5, then climbs back.", pts: [5.4, 5.2, 4.75, 4.85, 4.95, 5.05, 5.15], orders: ["stop", "stoplimit"] },
  { name: "Slow climb", note: "Price rises steadily through £5.", pts: [4.6, 4.7, 4.8, 4.9, 5.0, 5.1], orders: ["limit", "mit"] },
  { name: "Brief touch", note: "Price touches £5 once, then falls back.", pts: [4.6, 4.8, 4.95, 5.0, 4.9, 4.75], orders: ["limit", "mit"] },
  { name: "Close, no touch", note: "Price rises to £4.98, then fades.", pts: [4.6, 4.75, 4.9, 4.98, 4.85, 4.7], orders: ["limit", "mit"] },
];

const LEVEL = 5;
type Sim = { trig?: number; fill?: number; price?: number; outcome: Outcome };

/** Activated stop and MIT orders are market orders: they sell at the next trade. Orders with a £5 limit sell at £5. */
function simulate(kind: Kind, pts: number[]): Sim {
  const after = (from: number, ok: (p: number) => boolean) => pts.findIndex((p, i) => i > from && ok(p));
  if (kind === "limit") {
    const i = after(0, (p) => p >= LEVEL);
    return i < 0 ? { outcome: "none" } : { trig: i, fill: i, price: LEVEL, outcome: "atleast" };
  }
  const trig = after(0, (p) => (kind === "mit" ? p >= LEVEL : p <= LEVEL));
  if (trig < 0) return { outcome: "none" };
  if (kind === "stoplimit") {
    const j = after(trig, (p) => p >= LEVEL);
    return j < 0 ? { trig, outcome: "none" } : { trig, fill: j, price: LEVEL, outcome: "atleast" };
  }
  const fill = Math.min(trig + 1, pts.length - 1);
  const price = pts[fill];
  return { trig, fill, price, outcome: price >= LEVEL ? "atleast" : "below" };
}

const gbp = (p: number) => `£${p.toFixed(2)}`;

function explain(kind: Kind, pts: number[], s: Sim): string {
  const t = s.trig !== undefined ? gbp(pts[s.trig]) : "";
  switch (kind) {
    case "limit":
      return s.fill !== undefined ? "Price rose to £5, so your offer at £5 traded." : "Price never reached £5: the limit order is still waiting.";
    case "mit":
      return s.fill !== undefined
        ? `Price touched £5: the MIT became a market order and sold at the next trade, ${gbp(s.price!)}.`
        : "No touch, no trade.";
    case "stop":
      return `Price fell to ${t}: the stop became a market order and sold at the next trade, ${gbp(s.price!)}.`;
    case "stoplimit":
      return s.fill !== undefined
        ? `Triggered at ${t}; it sold at its £5 limit when price traded at ${gbp(pts[s.fill])}.`
        : `Triggered at ${t}, but price never traded at £5 or more again: no sale.`;
  }
}

const CHOICES: { v: Outcome; label: string }[] = [
  { v: "none", label: "No trade" },
  { v: "atleast", label: "Sells ≥ £5" },
  { v: "below", label: "Sells < £5" },
];
const G = { lo: 4.4, hi: 5.6, y0: 24, y1: 188 };
const gy = (p: number) => chartY(p, G.lo, G.hi, G.y0, G.y1);

export function TriggerLab({ onDone }: GameProps) {
  const reduce = useReducedMotion();
  const [r, setR] = useState(0);
  const [pred, setPred] = useState<(Outcome | null)[]>([null, null]);
  const [phase, setPhase] = useState<"predict" | "run" | "done">("predict");
  const [k, setK] = useState(0);
  const [score, setScore] = useState(0);
  const timer = useRef<number | null>(null);
  const head = useRef<HTMLDivElement>(null);
  const goBtn = useRef<HTMLButtonElement>(null);
  const round = ROUNDS[r];
  const n = round.pts.length;
  const sims = round.orders.map((o) => simulate(o, round.pts));
  const ready = pred[0] !== null && pred[1] !== null;

  const run = () => {
    if (!ready || phase !== "predict") return;
    setPhase("run");
    if (reduce) {
      setK(n - 1);
      return;
    }
    setK(0);
  };

  // step the tape forward one trade at a time
  useEffect(() => {
    if (phase !== "run") return;
    if (k >= n - 1) {
      timer.current = window.setTimeout(() => {
        setPhase("done");
        setScore((s) => s + sims.filter((sim, i) => sim.outcome === pred[i]).length);
      }, 450);
    } else {
      timer.current = window.setTimeout(() => setK((x) => x + 1), 560);
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
    // sims and pred are fixed while the tape runs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, k, n]);

  // on a phone the verdicts sit below the fold: bring them (and the Next button) into view
  useEffect(() => {
    if (phase === "done") goBtn.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
    if (phase === "predict" && r > 0) head.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [phase, r, reduce]);

  const next = () => {
    if (phase !== "done") return;
    if (r + 1 >= ROUNDS.length) {
      onDone({ score, max: ROUNDS.length * 2 });
      return;
    }
    setR(r + 1);
    setPred([null, null]);
    setPhase("predict");
    setK(0);
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (phase === "predict") run();
        else if (phase === "done") next();
        return;
      }
      const d = Number(e.key);
      if (phase === "predict" && d >= 1 && d <= 6) {
        e.preventDefault();
        e.stopPropagation();
        const card = d <= 3 ? 0 : 1;
        const v = CHOICES[(d - 1) % 3].v;
        setPred((p) => (card === 0 ? [v, p[1]] : [p[0], v]));
      }
    };
    // capture phase, so the lesson player's Enter doesn't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const shown = phase === "predict" ? 0 : k;
  const ghost = round.pts.map((p, i) => `${i ? "L" : "M"}${chartX(round.pts, i).toFixed(1)},${gy(p).toFixed(1)}`).join(" ");

  return (
    <div className="tlab">
      <div className="tlab-head" ref={head}>
        <span className="tlab-round">
          Round {r + 1}/{ROUNDS.length} · {round.name}
        </span>
        <span className="tlab-score" aria-label={`${score} correct`}>
          <Check size={14} strokeWidth={3} /> {score}
        </span>
      </div>
      <p className="tlab-note">{round.note}</p>

      <svg viewBox="0 0 400 206" className="stage tlab-chart" role="img" aria-label={`Price path: ${round.pts.map(gbp).join(", ")}`}>
        <rect width={400} height={206} rx={16} fill="var(--scene-bg)" />
        <path d={ghost} fill="none" stroke="var(--ink-3)" strokeWidth={1.6} strokeDasharray="3 5" opacity={0.7} />
        <PriceChart
          key={r}
          pts={round.pts}
          upto={shown}
          lo={G.lo}
          hi={G.hi}
          y0={G.y0}
          y1={G.y1}
          ticks={[4.5, 5, 5.5]}
          fmtP={gbp}
          levels={[{ p: LEVEL, label: "", tone: "neutral" }]}
          dot={phase !== "predict"}
        >
          <LevelTags tags={[{ y: gy(LEVEL), label: "£5", tone: "neutral" }]} />
          {round.orders.map((o, oi) => {
            const s = sims[oi];
            const c = toneVar(ORDER[o].tone);
            const trigOn = s.trig !== undefined && phase !== "predict" && k >= s.trig && o !== "limit";
            const fillOn = s.fill !== undefined && phase !== "predict" && k >= s.fill;
            const fx = s.fill !== undefined ? chartX(round.pts, s.fill) : 0;
            const fy = s.price !== undefined ? gy(s.price) : 0;
            const above = oi === 0;
            return (
              <g key={o}>
                {trigOn && s.trig !== undefined && (
                  <>
                    <Ping x={chartX(round.pts, s.trig)} y={gy(round.pts[s.trig])} trigger={`${r}-${o}`} tone={ORDER[o].tone} r={16} />
                    <motion.circle
                      cx={chartX(round.pts, s.trig)}
                      cy={gy(round.pts[s.trig])}
                      r={8 + oi * 4}
                      fill="none"
                      stroke={c}
                      strokeWidth={2}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                    />
                  </>
                )}
                {fillOn && (
                  <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${fx}px ${fy}px` }}>
                    <circle cx={fx} cy={fy} r={6} fill={c} stroke="var(--scene-bg)" strokeWidth={2} />
                    <text
                      x={fx}
                      y={fy + (above ? -12 : 21)}
                      textAnchor={fx > 330 ? "end" : "middle"}
                      className="sc-txt halo"
                      style={{ fontSize: 11.5, fontWeight: 800 }}
                      fill={c}
                    >
                      {ORDER[o].short} {gbp(s.price!)}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
        </PriceChart>
      </svg>

      <div className="tlab-cards">
        {round.orders.map((o, oi) => {
          const s = sims[oi];
          const right = phase === "done" ? s.outcome === pred[oi] : null;
          const live =
            phase === "predict"
              ? null
              : s.fill !== undefined && k >= s.fill
                ? `sold ${gbp(s.price!)}`
                : s.trig !== undefined && k >= s.trig && o !== "limit"
                  ? "triggered"
                  : phase === "done"
                    ? "no trade"
                    : "waiting";
          return (
            <div key={`${r}-${o}`} className={`tlab-card t-${ORDER[o].tone}`}>
              <div className="tlab-card-top">
                <span className="tlab-dot" />
                <span className="tlab-name">
                  {ORDER[o].name}
                  <small>{ORDER[o].terms}</small>
                </span>
                {live && <span className="tlab-live">{live}</span>}
              </div>
              <div className="tlab-choices" role="radiogroup" aria-label={`Prediction for the ${ORDER[o].name}`}>
                {CHOICES.map((ch, ci) => {
                  const picked = pred[oi] === ch.v;
                  const truth = phase === "done" && s.outcome === ch.v;
                  return (
                    <button
                      key={ch.v}
                      type="button"
                      role="radio"
                      aria-checked={picked}
                      disabled={phase !== "predict"}
                      className={`tlab-choice${picked ? " on" : ""}${truth ? " truth" : ""}${phase === "done" && picked && !truth ? " miss" : ""}`}
                      onClick={() => setPred((p) => (oi === 0 ? [ch.v, p[1]] : [p[0], ch.v]))}
                    >
                      {ch.label}
                      <span className="tlab-key">{oi * 3 + ci + 1}</span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence initial={false}>
                {phase === "done" && (
                  <motion.p
                    className={`tlab-why ${right ? "ok" : "ko"}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {right ? <Check size={15} strokeWidth={3} /> : <X size={15} strokeWidth={3} />}
                    <span>{explain(o, round.pts, s)}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="tlab-rule">Triggered stops and MITs are market orders: they sell at the next trade. Orders with a £5 limit sell at £5.</p>

      {phase === "done" ? (
        <button type="button" className="tlab-go next" onClick={next} ref={goBtn}>
          {r + 1 >= ROUNDS.length ? "Finish" : "Next round"} <Kbd>Enter</Kbd>
        </button>
      ) : (
        <button type="button" className="tlab-go" onClick={run} disabled={!ready || phase === "run"}>
          <Play size={16} /> {phase === "run" ? "Running…" : ready ? "Run the tape" : "Predict both orders"} {ready && phase === "predict" && <Kbd>Enter</Kbd>}
        </button>
      )}
    </div>
  );
}
