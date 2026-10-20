// Game (4.4.3–4.4.4): buy 500 shares before the closing bell. Leave your limit bid, move it, or take
// the offer. Market moods are hidden until the bell: execution uncertainty, chasing, ex post regret.
// Prices are in cents and illustrative ("our numbers").
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, ChevronDown, ChevronUp, Zap } from "lucide-react";
import type { GameProps } from "../../types.ts";
import { Kbd, Rich } from "../../../ds/ui.tsx";
import { clamp, shuffle } from "../../../util.ts";
import { spring } from "../../../motion/tokens.ts";
import "./u44b.css";

type Mood = "up" | "down" | "choppy";
const MOODS: Record<Mood, { name: string; drift: number; vol: number; sell: number; note: string }> = {
  up: { name: "drifting up", drift: 0.9, vol: 1.3, sell: 0.16, note: "Prices kept rising: every second of waiting cost money." },
  down: { name: "drifting down", drift: -0.9, vol: 1.3, sell: 0.5, note: "Prices kept falling: patient bids filled cheaply, then kept losing value." },
  choppy: { name: "choppy", drift: 0, vol: 2.3, sell: 0.34, note: "No trend, only noise: a bid at the market had a fair chance to fill." },
};
const TICKS = 16; // seconds until the bell
const SIZE = 500;
const BID0 = 4805;
const ASK0 = 4810;
const ROUNDS = 3;

type Path = { bid: number[]; ask: number[]; sells: number[] };
type Fill = { k: number; px: number; qty: number; how: "limit" | "take" };
type St = { phase: "ready" | "live" | "done"; k: number; my: number; hist: number[]; rem: number; fills: Fill[]; ups: number };

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makePath(mood: Mood, seed: number): Path {
  const r = rng(seed);
  const m = MOODS[mood];
  const bid = [BID0];
  const ask = [ASK0];
  const sells = [0];
  for (let k = 1; k <= TICKS; k++) {
    const g = (r() + r() + r() - 1.5) * 1.4; // roughly normal
    const b = bid[k - 1] + Math.round(m.drift + g * m.vol);
    bid.push(b);
    ask.push(b + 4 + Math.floor(r() * 3));
    sells.push(r() < m.sell ? 100 * (1 + Math.floor(r() * 3)) : 0);
  }
  return { bid, ask, sells };
}

const fresh = (): St => ({ phase: "ready", k: 0, my: BID0, hist: [BID0], rem: SIZE, fills: [], ups: 0 });

/** One second passes: the market moves, then your standing bid may trade. */
function tick(s: St, P: Path): St {
  if (s.phase !== "live") return s;
  const k = s.k + 1;
  let rem = s.rem;
  const fills = [...s.fills];
  if (s.my >= P.ask[k]) {
    // the market fell through your bid: sellers hit it at your limit price
    fills.push({ k, px: s.my, qty: rem, how: "limit" });
    rem = 0;
  } else if (s.my >= P.bid[k] && P.sells[k] > 0) {
    // a market sell order arrives; alone at the top you get all of it, sharing the bid only part
    const q = Math.min(rem, s.my > P.bid[k] ? P.sells[k] : Math.max(100, P.sells[k] - 100));
    fills.push({ k, px: s.my, qty: q, how: "limit" });
    rem -= q;
  }
  return { ...s, k, rem, fills, hist: [...s.hist, s.my], phase: rem === 0 || k >= TICKS ? "done" : "live" };
}

function take(s: St, P: Path): St {
  if (s.phase !== "live" || !s.rem) return s;
  return { ...s, rem: 0, fills: [...s.fills, { k: s.k, px: P.ask[s.k], qty: s.rem, how: "take" }], phase: "done" };
}

function move(s: St, P: Path, d: number): St {
  if (s.phase !== "live") return s;
  const my = clamp(s.my + d, BID0 - 30, BID0 + 40);
  const next = { ...s, my, ups: s.ups + (d > 0 ? 1 : 0) };
  // a bid at or above the offer is marketable: it buys at once, at the offer
  return my >= P.ask[s.k] ? take(next, P) : next;
}

const px = (c: number) => (c / 100).toFixed(2);

function result(s: St, P: Path, mood: Mood) {
  const bought = s.fills.reduce((a, f) => a + f.qty, 0);
  const avg = bought ? s.fills.reduce((a, f) => a + f.px * f.qty, 0) / bought : 0;
  const saved = ASK0 - avg; // cents per share vs the starting offer
  const usedLimit = s.fills.some((f) => f.how === "limit");
  const lastBid = P.bid[TICKS];
  let pts = 0;
  let why: string;
  if (s.rem > 0) {
    why = `The bell rang with **${s.rem} shares** unbought: **execution uncertainty**. A trader who must buy should bid aggressively or take the offer.`;
  } else {
    pts = saved >= 3 ? 3 : saved >= 0 ? 2 : saved >= -5 ? 1 : 0;
    if (!usedLimit && s.fills[0].k <= 1) why = "You took the offer at once: a **certain fill**, paid for with the spread.";
    else if (s.ups >= 3 && avg > ASK0) why = "You **chased the price**, like Jill with GM: you paid more than the offer you started with.";
    else if (usedLimit && lastBid < avg - 2) why = "Your bid filled, then the market kept falling: **ex post regret**. Filled, but worth less soon after.";
    else if (!usedLimit)
      why = avg < ASK0 ? "You waited, then took a **cheaper offer**: the market came to you this time." : "You waited, then took the offer **after the market moved away**: waiting cost you.";
    else if (avg < ASK0) why = "Patience paid: your limit order bought **below the starting offer**.";
    else why = "Filled at about what a market order would have paid at the start.";
  }
  return { bought, avg, saved, pts, why, note: MOODS[mood].note, mood: MOODS[mood].name };
}

// ── Chart ───────────────────────────────────────────────────────────────────
const LO = BID0 - 17;
const HI = BID0 + 21;
const X = (k: number) => 46 + (k / TICKS) * 336;
const Y = (c: number) => 150 - ((clamp(c, LO, HI) - LO) / (HI - LO)) * 128;
const line = (vals: number[]) => vals.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");

function Chart({ P, s }: { P: Path; s: St }) {
  const upto = s.phase === "done" ? TICKS : s.k;
  const bid = P.bid.slice(0, upto + 1);
  const ask = P.ask.slice(0, upto + 1);
  const band = `${line(ask)} ${bid
    .map((v, i) => [i, v] as const)
    .reverse()
    .map(([i, v]) => `L${X(i).toFixed(1)},${Y(v).toFixed(1)}`)
    .join(" ")} Z`;
  const myPts = s.hist.map((v, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
  const myEnd = s.hist.length - 1;
  return (
    <svg viewBox="0 0 400 172" className="stage btb-chart" role="img" aria-label="Best bid, best offer and your bid over time">
      <rect width={400} height={172} rx={16} fill="var(--scene-bg)" />
      {[4790, 4800, 4810, 4820].map((t) => (
        <g key={t}>
          <line x1={46} x2={382} y1={Y(t)} y2={Y(t)} className="sc-grid" />
          <text x={40} y={Y(t) + 4} textAnchor="end" className="sc-tick">
            {px(t)}
          </text>
        </g>
      ))}
      <line x1={X(TICKS)} x2={X(TICKS)} y1={14} y2={156} stroke="var(--line-strong)" strokeDasharray="3 4" />
      <text x={X(TICKS)} y={168} textAnchor="middle" className="sc-tick">
        bell
      </text>
      <path d={band} fill="var(--surface-2)" opacity={0.9} />
      <path d={line(ask)} fill="none" stroke="var(--ask)" strokeWidth={2.2} strokeLinejoin="round" />
      <path d={line(bid)} fill="none" stroke="var(--bid)" strokeWidth={2.2} strokeLinejoin="round" />
      {s.phase !== "ready" && (
        <path d={myPts} fill="none" stroke="var(--game)" strokeWidth={2.4} strokeDasharray="5 4" strokeLinejoin="round" />
      )}
      {s.phase !== "ready" && s.rem > 0 && (
        <motion.circle r={5} fill="var(--game)" stroke="var(--scene-bg)" strokeWidth={2} initial={false} animate={{ cx: X(myEnd), cy: Y(s.my) }} transition={spring.ui} />
      )}
      {s.fills.map((f, i) => (
        <motion.g key={i} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring.ui} style={{ originX: `${X(f.k)}px`, originY: `${Y(f.px)}px` }}>
          <circle cx={X(f.k)} cy={Y(f.px)} r={6.5} fill="var(--game)" stroke="var(--scene-bg)" strokeWidth={2} />
        </motion.g>
      ))}
    </svg>
  );
}

// ── Game ────────────────────────────────────────────────────────────────────
export function BeatTheBell({ onDone }: GameProps) {
  const moods = useMemo(() => shuffle<Mood>(["up", "down", "choppy"]), []);
  const seed = useMemo(() => Math.floor(Math.random() * 1e9), []);
  const [r, setR] = useState(0);
  const [s, setS] = useState<St>(fresh);
  const [total, setTotal] = useState(0);
  const P = useMemo(() => makePath(moods[r], seed + r * 7919), [moods, r, seed]);
  const res = s.phase === "done" ? result(s, P, moods[r]) : null;

  // the clock: one market move per second while the round is live
  useEffect(() => {
    if (s.phase !== "live") return;
    const t = setTimeout(() => setS((x) => tick(x, P)), 1000);
    return () => clearTimeout(t);
  }, [s, P]);

  const start = () => setS({ ...fresh(), phase: "live" });
  const next = () => {
    if (!res) return;
    const sum = total + res.pts;
    if (r + 1 >= ROUNDS) {
      onDone({ score: sum, max: ROUNDS * 3 });
      return;
    }
    setTotal(sum);
    setR(r + 1);
    setS(fresh());
  };

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        if (s.phase === "ready") start();
        else if (s.phase === "done") next();
      } else if (s.phase === "live" && (k === "ArrowUp" || k === "ArrowDown" || k === "m" || k === "M")) {
        e.preventDefault();
        e.stopPropagation();
        if (k === "ArrowUp") setS((x) => move(x, P, 1));
        else if (k === "ArrowDown") setS((x) => move(x, P, -1));
        else setS((x) => take(x, P));
      } else if (k === "ArrowLeft" || k === "ArrowRight") {
        e.stopPropagation();
      }
    };
    // capture phase, so the lesson player's arrow and Enter keys don't also fire
    window.addEventListener("keydown", on, true);
    return () => window.removeEventListener("keydown", on, true);
  });

  const left = TICKS - s.k;
  const bought = SIZE - s.rem;
  const bestBid = s.phase === "live" && s.rem > 0 ? Math.max(P.bid[s.k], s.my) : P.bid[s.k];
  return (
    <div className="btb">
      <div className="btb-top">
        <span className="btb-round">
          Round {r + 1}/{ROUNDS}
        </span>
        <span className={`btb-bell${s.phase === "live" && left <= 5 ? " hot" : ""}`}>
          <Bell size={14} strokeWidth={2.6} /> {s.phase === "done" ? "Closed" : `${left}s to the bell`}
        </span>
        <span className="btb-got">
          Bought <strong>{bought}</strong>/{SIZE}
        </span>
      </div>
      <Chart P={P} s={s} />
      <div className="btb-quote" aria-live="polite">
        <span className="q-bid">
          <small>Best bid</small>
          {px(bestBid)}
        </span>
        <span className="q-my">
          <small>Your bid</small>
          {s.rem > 0 ? px(s.my) : "filled"}
        </span>
        <span className="q-ask">
          <small>Best offer</small>
          {px(P.ask[s.k])}
        </span>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {s.phase === "ready" && (
          <motion.div key="ready" className="btb-ready" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <p>
              Buy <strong>500 shares</strong> before the bell ({TICKS} s). Your bid starts at the best bid. Raise or lower it, or take the offer to buy at once.
            </p>
            <button type="button" className="btb-go" onClick={start} autoFocus>
              Start round {r + 1} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
        {s.phase === "live" && (
          <motion.div key="live" className="btb-ctrl" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="btb-nudge">
              <button type="button" onClick={() => setS((x) => move(x, P, -1))} aria-label="Lower your bid by 1 cent">
                <ChevronDown size={18} strokeWidth={2.6} /> 1¢
              </button>
              <button type="button" onClick={() => setS((x) => move(x, P, 1))} aria-label="Raise your bid by 1 cent">
                <ChevronUp size={18} strokeWidth={2.6} /> 1¢
              </button>
            </div>
            <button type="button" className="btb-take" onClick={() => setS((x) => take(x, P))}>
              <Zap size={16} /> Take the offer · {px(P.ask[s.k])} <Kbd>M</Kbd>
            </button>
          </motion.div>
        )}
        {s.phase === "done" && res && (
          <motion.div key="done" className={`btb-res ${res.pts >= 2 ? "ok" : "ko"}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="btb-res-head">
              <strong>{res.bought === SIZE ? `Average ${px(res.avg)}` : res.bought ? `Only ${res.bought} of ${SIZE} bought` : "Not filled"}</strong>
              <span className="btb-pts">
                +{res.pts} pt{res.pts === 1 ? "" : "s"}
              </span>
            </div>
            {res.bought === SIZE && (
              <p className="btb-vs">
                Starting offer {px(ASK0)}: {res.saved >= 0 ? "saved" : "paid"} <strong>{Math.abs(res.saved).toFixed(1)}¢</strong> a share {res.saved >= 0 ? "" : "more"}
              </p>
            )}
            <p>
              <Rich text={res.why} />
            </p>
            <p className="btb-mood">
              This market was <strong>{res.mood}</strong>. {res.note}
            </p>
            <button type="button" className="btb-go" onClick={next}>
              {r + 1 >= ROUNDS ? "Finish" : "Next round"} <Kbd>Enter</Kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
