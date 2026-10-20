// "See it" scenes for 4.4 Limit Orders, part A (4.4 and 4.4.1, pp. 73–74).
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { type Pt, type SceneTone, Stage, Token, Txt, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT } from "../../../motion/tokens.ts";
import { Ladder, type Lvl, ladderY } from "./kit.tsx";

const hide = () => "";
const whole = (p: number) => String(p);

/** Full-width row highlights drawn under a Ladder (the kit's own highlight is only as wide as the bars). */
function Bands({ levels, on, y0, rh, tone = "see" }: { levels: Lvl[]; on: number[]; y0: number; rh: number; tone?: SceneTone }) {
  return (
    <g>
      {levels.map((l, i) => (
        <motion.rect
          key={l.p}
          x={14}
          y={y0 + i * rh - rh / 2 + 1}
          width={372}
          height={rh - 2}
          rx={7}
          fill={toneSoft(tone)}
          stroke={toneVar(tone)}
          strokeWidth={1.5}
          initial={false}
          animate={{ opacity: on.includes(l.p) ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        />
      ))}
    </g>
  );
}

/** A row label pinned to the stage edge on the bid (left) or offer (right) side, clear of the bars. */
function EdgeLabel({ levels, p, side, text, show, y0, rh, tone }: { levels: Lvl[]; p: number; side: "bid" | "ask"; text: string; show: boolean; y0: number; rh: number; tone?: SceneTone }) {
  return (
    <motion.text
      x={side === "bid" ? 24 : 376}
      y={ladderY(levels, p, y0, rh) + 4.5}
      textAnchor={side === "bid" ? "start" : "end"}
      className="sc-txt"
      style={{ fontSize: 11.5, fontWeight: 800 }}
      fill={toneVar(tone ?? side)}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, delay: show ? 0.15 : 0 }}
    >
      {text}
    </motion.text>
  );
}

// ── 4.4: trade on arrival, or stand in the book ─────────────────────────────
// Figure 4-1 (Island ECN, Cisco, 28 Jan 2002), top of the book with sizes added up per price.
const CSCO: Lvl[] = [
  { p: 19.8, ask: 900 },
  { p: 19.79, ask: 100 },
  { p: 19.78, ask: 100 },
  { p: 19.77 },
  { p: 19.76, ask: 327 },
  { p: 19.75 },
  { p: 19.74, bid: 292 },
  { p: 19.73, bid: 200 },
];

export function BookArrival({ beat }: BeatProps) {
  const Y0 = 64;
  const RH = 24;
  const yOf = (p: number) => ladderY(CSCO, p, Y0, RH);
  const filled = beat >= 3;
  const stood = beat >= 5;
  const levels = CSCO.map((l) => (l.p === 19.76 && filled ? { ...l, ask: 27 } : l.p === 19.73 && stood ? { ...l, bid: 700 } : l));
  const on = beat === 1 ? [19.74, 19.76] : beat === 2 || beat === 3 ? [19.76] : beat >= 4 ? [19.73] : [];
  const lab = { levels: CSCO, y0: Y0, rh: RH };
  const slot: Pt = [104, 264];
  return (
    <Stage h={286} label="Island ECN limit order book for Cisco: one new buy order trades at once, another stands in the book">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        FIGURE 4-1 · ISLAND ECN · CISCO · 28 JAN 2002
      </Txt>
      <Bands levels={CSCO} on={on} y0={Y0} rh={RH} />
      <Ladder levels={levels} y={Y0} rowH={RH} maxSize={900} />
      <EdgeLabel {...lab} p={19.74} side="bid" text="best bid" show={beat === 1} />
      <EdgeLabel {...lab} p={19.76} side="ask" text="best offer" show={beat === 1} />
      <EdgeLabel {...lab} p={19.76} side="ask" text="300 sold" tone="see" show={beat === 3} />
      <EdgeLabel {...lab} p={19.73} side="ask" text="+500 bid, waiting" tone="bid" show={beat === 5} />
      <Txt x={250} y={268} anchor="start" size={11.5} weight={700} tone="neutral" show={beat >= 2}>
        new orders: ours
      </Txt>
      <Token from={slot} to={[256, yOf(19.76)]} at={beat >= 3 ? 1 : 0} show={beat === 2 || beat === 3} absorb label="BUY 300 · 19.77" tone="bid" />
      <Token from={slot} to={[150, yOf(19.73)]} at={beat >= 5 ? 1 : 0} show={beat >= 4} absorb label="BUY 500 · 19.73" tone="bid" />
    </Stage>
  );
}

// ── 4.4.1: Figure 4-2, the market and its neighbourhood ─────────────────────
const F42: Lvl[] = [
  { p: 31, ask: 300 },
  { p: 30, ask: 500 },
  { p: 29, ask: 200 },
  { p: 28, ask: 400 },
  { p: 27 },
  { p: 26, bid: 300 },
  { p: 25, bid: 600 },
  { p: 24, bid: 200 },
  { p: 23, bid: 500 },
];

export function Figure42({ beat }: BeatProps) {
  const on = beat === 1 || beat === 2 ? [26, 28] : beat === 3 ? [27] : beat === 4 ? [31, 30, 29, 25, 24, 23] : beat === 5 ? [31, 23] : [];
  const lab = { levels: F42, y0: 64, rh: 22 };
  return (
    <Stage h={262} label="Figure 4-2: a book that is 26 bid, offered at 28, and the names of each zone">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        FIGURE 4-2 · 26 BID, OFFERED AT 28
      </Txt>
      <Bands levels={F42} on={on} y0={64} rh={22} />
      <Ladder levels={F42} y={64} rowH={22} maxSize={600} barMax={60} fmtP={whole} fmtS={hide} />
      <EdgeLabel {...lab} p={26} side="bid" text="best bid" show={beat === 1} />
      <EdgeLabel {...lab} p={28} side="ask" text="best offer" show={beat === 1} />
      <EdgeLabel {...lab} p={26} side="bid" text="at the market" show={beat === 2} />
      <EdgeLabel {...lab} p={28} side="ask" text="at the market" show={beat === 2} />
      <EdgeLabel {...lab} p={27} side="ask" text="inside the market" tone="see" show={beat === 3} />
      <EdgeLabel {...lab} p={29} side="ask" text="behind the market" show={beat === 4} />
      <EdgeLabel {...lab} p={24} side="bid" text="behind the market" show={beat === 4} />
      <EdgeLabel {...lab} p={31} side="ask" text="far away" show={beat === 5} />
      <EdgeLabel {...lab} p={23} side="bid" text="far away" show={beat === 5} />
    </Stage>
  );
}

// ── 4.4.1: Table 4-1, one price, two names ──────────────────────────────────
const T41_BOOK: Lvl[] = [
  { p: 30, ask: 500 },
  { p: 29, ask: 300 },
  { p: 28, ask: 400 },
  { p: 27 },
  { p: 26, bid: 300 },
  { p: 25, bid: 600 },
  { p: 24, bid: 200 },
];
const PROBE = [29, 28, 27, 26, 25];
const WHERE = ["Above the best offer", "At the best offer", "Between the best bid and best offer", "At the best bid", "Below the best bid"];
const BUY_T = ["Marketable", "Marketable", "In the market", "At the market", "Behind the market"];
const SELL_T = ["Behind the market", "At the market", "In the market", "Marketable", "Marketable"];

function TermBox({ x, title, tone, terms, now }: { x: number; title: string; tone: "bid" | "ask"; terms: string[]; now: string }) {
  const c = toneVar(tone);
  return (
    <g>
      <rect x={x - 84} y={14} width={168} height={58} rx={12} fill="var(--node)" stroke={c} strokeWidth={1.75} />
      <text x={x} y={34} textAnchor="middle" className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }} fill={c}>
        {title}
      </text>
      {[...new Set(terms)].map((t) => (
        <motion.text
          key={t}
          x={x}
          y={57}
          textAnchor="middle"
          className="sc-txt"
          style={{ fontSize: 15, fontWeight: 800 }}
          fill="var(--ink)"
          initial={false}
          animate={{ opacity: t === now ? 1 : 0, y: t === now ? 0 : 4 }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          {t}
        </motion.text>
      ))}
    </g>
  );
}

export function Table41({ beat }: BeatProps) {
  const b = Math.min(beat, PROBE.length - 1);
  return (
    <Stage h={280} label="Table 4-1: the same limit price gets one name for a buy order and another for a sell order">
      <TermBox x={104} title="A BUY ORDER HERE IS" tone="bid" terms={BUY_T} now={BUY_T[b]} />
      <TermBox x={296} title="A SELL ORDER HERE IS" tone="ask" terms={SELL_T} now={SELL_T[b]} />
      {WHERE.map((w, i) => (
        <Txt key={w} x={200} y={94} size={12} weight={750} tone="see" show={i === b}>
          {w}
        </Txt>
      ))}
      <Bands levels={T41_BOOK} on={[PROBE[b]]} y0={130} rh={23} />
      <Ladder levels={T41_BOOK} y={130} rowH={23} maxSize={600} barMax={80} fmtP={whole} fmtS={hide} />
    </Stage>
  );
}

// ── 4.4.1: aggressiveness, buy side then sell side ──────────────────────────
const AGG_BOOK: Lvl[] = T41_BOOK;
type Zone = { rows: number[]; label: string };
const BUY_Z: Zone[] = [
  { rows: [30, 29, 28], label: "1 Marketable" },
  { rows: [27], label: "2 New market" },
  { rows: [26], label: "3 At the market" },
  { rows: [25, 24], label: "4 Behind" },
];
const SELL_Z: Zone[] = [
  { rows: [26, 25, 24], label: "1 Marketable" },
  { rows: [27], label: "2 New market" },
  { rows: [28], label: "3 At the market" },
  { rows: [30, 29], label: "4 Behind" },
];

function ZoneMark({ z, side, show, strong, y0, rh }: { z: Zone; side: "bid" | "ask"; show: boolean; strong: boolean; y0: number; rh: number }) {
  const ys = z.rows.map((p) => ladderY(AGG_BOOK, p, y0, rh));
  const top = Math.min(...ys) - rh / 2 + 4;
  const bot = Math.max(...ys) + rh / 2 - 4;
  const bx = side === "bid" ? 114 : 286;
  const tx = side === "bid" ? bx - 8 : bx + 8;
  const c = toneVar(side);
  const tick = side === "bid" ? 5 : -5;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
      <path d={`M${bx + tick},${top} L${bx},${top} L${bx},${bot} L${bx + tick},${bot}`} fill="none" stroke={c} strokeWidth={2} strokeLinejoin="round" />
      <text x={tx} y={(top + bot) / 2 + 4} textAnchor={side === "bid" ? "end" : "start"} className="sc-txt" style={{ fontSize: 11.5, fontWeight: strong ? 850 : 700 }} fill={c}>
        {z.label}
      </text>
    </motion.g>
  );
}

export function AggressiveScale({ beat }: BeatProps) {
  const Y0 = 64;
  const RH = 24;
  const sell = beat >= 4;
  return (
    <Stage h={248} label="Aggressiveness of limit orders: for buys a higher limit is more aggressive, for sells a lower one">
      {["BUY: THE HIGHER THE LIMIT, THE MORE AGGRESSIVE", "SELL: THE LOWER THE LIMIT, THE MORE AGGRESSIVE"].map((t, i) => (
        <Txt key={t} x={200} y={24} size={11} weight={800} tone={i ? "ask" : "bid"} className="caps" show={sell === !!i}>
          {t}
        </Txt>
      ))}
      <Ladder levels={AGG_BOOK} y={Y0} rowH={RH} maxSize={600} barMax={36} fmtP={whole} fmtS={hide} headers={false} />
      {BUY_Z.map((z, i) => (
        <ZoneMark key={`b${i}`} z={z} side="bid" show={!sell && beat >= i} strong={!sell && beat === i} y0={Y0} rh={RH} />
      ))}
      {SELL_Z.map((z, i) => (
        <ZoneMark key={`s${i}`} z={z} side="ask" show={sell} strong={i === 0} y0={Y0} rh={RH} />
      ))}
      <Txt x={200} y={238} size={11.5} weight={700} tone="neutral">
        26 bid, offered at 28 (sizes are ours)
      </Txt>
    </Stage>
  );
}

// ── 4.4.1: market order vs marketable limit order ───────────────────────────
const SW: Lvl[] = [
  { p: 31, ask: 400 },
  { p: 30, ask: 300 },
  { p: 29, ask: 200 },
  { p: 28, ask: 200 },
  { p: 27, bid: 300 },
  { p: 26, bid: 500 },
  { p: 25, bid: 400 },
];
const swAt = (beat: number): Lvl[] =>
  SW.map((l) => {
    if (beat === 1) return l.p === 28 || l.p === 29 ? { p: l.p, ask: 0 } : l.p === 30 ? { ...l, ask: 100 } : l;
    if (beat === 3) return l.p === 28 || l.p === 29 ? { p: l.p, ask: 0 } : l;
    if (beat >= 4) return l.p === 28 ? { p: 28, ask: 0 } : l.p === 29 ? { p: 29, ask: 0, bid: 200 } : l;
    return l;
  });

export function LimitVsMarket({ beat }: BeatProps) {
  const Y0 = 64;
  const RH = 24;
  const limitLineY = ladderY(SW, 29, Y0, RH) - RH / 2;
  const on = beat === 1 ? [28, 29, 30] : beat === 3 ? [28, 29] : beat >= 4 ? [29] : [];
  const titles = ["TWO BUYERS, 600 SHARES EACH (OUR NUMBERS)", "MARKET ORDER · BUY 600", "MARKETABLE LIMIT · BUY 600 AT 29", "MARKETABLE LIMIT · BUY 600 AT 29", "MARKETABLE LIMIT · BUY 600 AT 29"];
  return (
    <Stage h={262} label="A market order buys through 28, 29 and 30; a marketable limit order at 29 stops at its limit and the rest stands as a bid">
      {[...new Set(titles)].map((t) => (
        <Txt key={t} x={200} y={24} size={11} weight={800} tone={t.startsWith("MARKET ORDER") ? "prac" : t.startsWith("MARKETABLE") ? "bid" : "neutral"} className="caps" show={titles[beat] === t}>
          {t}
        </Txt>
      ))}
      <Bands levels={SW} on={on} y0={Y0} rh={RH} />
      <Ladder levels={swAt(beat)} y={Y0} rowH={RH} maxSize={600} fmtP={whole} />
      <EdgeLabel levels={SW} y0={Y0} rh={RH} p={29} side="ask" text="new best bid" tone="bid" show={beat >= 4} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 2 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <line x1={232} x2={372} y1={limitLineY} y2={limitLineY} stroke={toneVar("bid")} strokeWidth={2} strokeDasharray="6 5" />
        <text x={372} y={limitLineY - 5} textAnchor="end" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("bid")}>
          limit 29
        </text>
      </motion.g>
      <Txt x={200} y={236} size={12.5} weight={750} show={beat === 1}>
        Filled 600, paying up to 30 · average 29.00
      </Txt>
      <Txt x={200} y={236} size={12.5} weight={750} show={beat === 3}>
        Filled 400 at 28 and 29, then it stops
      </Txt>
      <Txt x={200} y={236} size={12.5} weight={750} show={beat >= 4}>
        200 left: they stand as the best bid, 29
      </Txt>
    </Stage>
  );
}
