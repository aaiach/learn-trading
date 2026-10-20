// "See it" scenes for 4.3 Market Orders.
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Edge, Node, Num, Ping, Stage, Token, Txt, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT } from "../../../motion/tokens.ts";
import { Ladder, type Lvl, ladderY } from "./kit.tsx";

const NOTE = (y: number, text = "Deeper levels: our numbers") => (
  <Txt x={16} y={y} anchor="start" size={11} weight={650} tone="neutral">
    {text}
  </Txt>
);

// ── 4.3: a small market buy meets the best offer (APWR box, p. 71) ──────────
const APWR_Y = 58;
const APWR_ROW = 26;
const apwr = (beat: number): Lvl[] => [
  { p: 36.95, ask: 600 },
  { p: 36.9, ask: 300 },
  { p: 36.85, ask: beat >= 2 ? 200 : 400 },
  { p: 36.8, bid: beat >= 3 ? 400 : 500 },
  { p: 36.75, bid: 700 },
  { p: 36.7, bid: 300 },
];

export function MarketBuyApwr({ beat }: BeatProps) {
  const levels = apwr(beat);
  const yAsk = ladderY(levels, 36.85, APWR_Y, APWR_ROW);
  const yBid = ladderY(levels, 36.8, APWR_Y, APWR_ROW);
  return (
    <Stage h={250} label="A market buy order for 200 APWR fills at the best offer, 36.85">
      <Ladder
        levels={levels}
        y={APWR_Y}
        rowH={APWR_ROW}
        maxSize={900}
        hl={beat === 0 ? [] : beat <= 2 ? [36.85] : [36.8]}
        marks={[
          { p: 36.85, label: "best offer", side: "ask", show: beat === 0 },
          { p: 36.8, label: "best bid", side: "bid", show: beat === 0 },
        ]}
      />
      <Token from={[300, 232]} to={[300, yAsk]} at={beat >= 1 ? 1 : 0} show={beat >= 1 && beat <= 2} absorb label="BUY 200 · MKT" tone="bid" />
      <Token from={[100, 232]} to={[100, yBid]} at={beat >= 3 ? 1 : 0} show={beat >= 3} absorb label="SELL 100 · MKT" tone="ask" />
      {beat === 2 && <Ping x={290} y={yAsk} trigger="fill-buy" tone="bid" r={22} />}
      {beat === 3 && <Ping x={110} y={yBid} trigger="fill-sell" tone="ask" r={22} />}
      <Txt x={200} y={236} size={13.5} weight={800} show={beat === 2} tone="bid">
        Bill buys 200 @ 36.85
      </Txt>
      <Txt x={200} y={236} size={13.5} weight={800} show={beat === 3} tone="ask">
        A small sell gets 36.80
      </Txt>
      {NOTE(20, "Levels beyond the quote: our numbers")}
    </Stage>
  );
}

// ── 4.3.1: Amy's round trip pays the spread ─────────────────────────────────
const AY = (p: number) => 150 - (p - 100) * 50; // 102 → 50, 101 → 100, 100 → 150
const AMY = { x: 62, y: 100, w: 92, h: 52 };

export function AmyRoundTrip({ beat }: BeatProps) {
  const pnl = beat >= 3 ? -2 : 0;
  const lineX0 = 128;
  const lineX1 = 300;
  return (
    <Stage h={232} label="Amy buys at the 102 offer and sells at the 100 bid, losing the 2-point spread">
      {/* the quote */}
      <line x1={lineX0} x2={lineX1} y1={AY(102)} y2={AY(102)} stroke={toneVar("ask")} strokeWidth={3} strokeLinecap="round" />
      <line x1={lineX0} x2={lineX1} y1={AY(100)} y2={AY(100)} stroke={toneVar("bid")} strokeWidth={3} strokeLinecap="round" />
      <Txt x={lineX1 + 10} y={AY(102) + 5} anchor="start" size={13.5} weight={800} tone="ask">
        offer 102
      </Txt>
      <Txt x={lineX1 + 10} y={AY(100) + 5} anchor="start" size={13.5} weight={800} tone="bid">
        bid 100
      </Txt>
      {/* midpoint */}
      <motion.line
        x1={lineX0}
        x2={lineX1}
        y1={AY(101)}
        y2={AY(101)}
        stroke="var(--ink-3)"
        strokeWidth={2}
        strokeDasharray="5 6"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 4 ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      />
      <Txt x={lineX1 + 10} y={AY(101) + 5} anchor="start" size={13.5} weight={800} show={beat >= 4}>
        value 101
      </Txt>
      <Node {...AMY} label="Amy" sub="market orders" tone="def" hl={beat === 1 || beat === 2} />
      <Token from={[AMY.x + 52, AMY.y - 10]} to={[180, AY(102)]} at={beat >= 1 ? 1 : 0} show={beat >= 1} absorb label="BUY" tone="bid" />
      <Token from={[AMY.x + 52, AMY.y + 10]} to={[240, AY(100)]} at={beat >= 2 ? 1 : 0} show={beat >= 2} absorb label="SELL" tone="ask" />
      {/* fills */}
      <motion.circle cx={180} cy={AY(102)} r={6} fill={toneVar("ask")} stroke="var(--scene-bg)" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 ? 1 : 0 }} transition={{ delay: beat === 1 ? 0.8 : 0 }} />
      <motion.circle cx={240} cy={AY(100)} r={6} fill={toneVar("bid")} stroke="var(--scene-bg)" strokeWidth={2} initial={{ opacity: 0 }} animate={{ opacity: beat >= 2 ? 1 : 0 }} transition={{ delay: beat === 2 ? 0.8 : 0 }} />
      <Txt x={180} y={AY(102) - 12} size={12.5} weight={800} show={beat >= 1} delay={beat === 1 ? 0.8 : 0} className="halo">
        paid 102
      </Txt>
      <Txt x={240} y={AY(100) + 24} size={12.5} weight={800} show={beat >= 2} delay={beat === 2 ? 0.8 : 0} className="halo">
        got 100
      </Txt>
      {/* the whole spread, then two halves */}
      <Bracket x={150} y1={AY(102)} y2={AY(100)} show={beat === 3} label="−2" />
      <Bracket x={208} y1={AY(102)} y2={AY(101)} show={beat >= 4} label="1" />
      <Bracket x={268} y1={AY(101)} y2={AY(100)} show={beat >= 4} label="1" />
      <Txt x={36} y={190} anchor="start" size={12} weight={750} tone="neutral">
        AMY'S ROUND TRIP
      </Txt>
      <Num x={36} y={214} anchor="start" size={20} value={pnl} format={(v) => (v < -0.05 ? `−${Math.abs(v).toFixed(0)}` : "0")} tone={beat >= 3 ? "ask" : undefined} />
    </Stage>
  );
}

function Bracket({ x, y1, y2, show, label }: { x: number; y1: number; y2: number; show: boolean; label: string }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, delay: show ? 0.15 : 0 }}>
      <path d={`M${x - 5},${y1 + 3} L${x},${y1 + 3} L${x},${y2 - 3} L${x - 5},${y2 - 3}`} fill="none" stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" />
      <text x={x + 7} y={(y1 + y2) / 2 + 5} className="sc-txt halo" style={{ fontSize: 14, fontWeight: 800 }} fill="var(--ink)">
        {label}
      </text>
    </motion.g>
  );
}

// ── 4.3.2: the specialist steps in front of the bid (ANN box, p. 72) ────────
const ANN_Y = 54;
const ANN_ROW = 26;
const ANN_X = 250;
const ann = (beat: number): Lvl[] => [
  { p: 23.5, ask: 800 },
  { p: 23.45, ask: 1000 },
  { p: 23.4 },
  { p: 23.38, bid: beat >= 2 ? 300 : undefined },
  { p: 23.35, bid: 500 },
  { p: 23.3, bid: 600 },
];
const TOM = { x: 58, y: 206, w: 100, h: 46 };
const SPEC = { x: 58, y: 86, w: 100, h: 46 };

export function AnnImprove({ beat }: BeatProps) {
  const levels = ann(beat);
  const y38 = ladderY(levels, 23.38, ANN_Y, ANN_ROW);
  const y35 = ladderY(levels, 23.35, ANN_Y, ANN_ROW);
  return (
    <Stage h={240} label="The ANN specialist buys Tom's 300 shares at 23.38, 3 cents better than the 23.35 bid">
      <Ladder
        levels={levels}
        x={ANN_X}
        y={ANN_Y}
        rowH={ANN_ROW}
        barMax={100}
        maxSize={2000}
        hl={beat === 0 ? [23.45, 23.35] : beat === 1 ? [23.35] : beat === 2 ? [23.38] : []}
        marks={[{ p: 23.35, label: "public bids first", side: "bid", tone: "def", show: beat === 3 }]}
      />
      <Node {...TOM} label="Tom" sub="sell 300 · market" tone="ask" show={beat >= 1} hl={beat === 1 || beat === 2} />
      <Node {...SPEC} label="Specialist" sub="NYSE dealer" tone="def" show={beat >= 2} hl={beat === 2} />
      <Edge from={[TOM.x + 26, TOM.y - 25]} to={[136, y35 + 4]} tone="ask" dashed show={beat === 1} />
      <Edge from={[TOM.x + 48, TOM.y - 14]} to={[150, y38 + 6]} tone="ask" show={beat === 2} />
      <Edge from={[SPEC.x + 48, SPEC.y + 10]} to={[150, y38 - 6]} tone="def" show={beat === 2} />
      {beat === 2 && <Ping x={ANN_X} y={y38} trigger="ann-fill" tone="see" r={24} />}
      <Txt x={ANN_X} y={228} size={13.5} weight={800} show={beat === 2} tone="see">
        Tom sells at 23.38: 3¢ better
      </Txt>
      {NOTE(22, "Outer levels: our numbers")}
    </Stage>
  );
}

// ── 4.3.3: Martha's first broker walks up the book (p. 72) ──────────────────
const OJ_Y = 50;
const OJ_ROW = 25;
const OJ_X = 274;
const OJ_FILLS = [
  { p: 84.25, q: 20 },
  { p: 84.4, q: 30 },
  { p: 84.7, q: 150 },
];
const oj = (beat: number): Lvl[] => [
  { p: 85.0, ask: 120 },
  { p: 84.85, ask: 100 },
  { p: 84.7, ask: beat >= 3 ? 0 : 150 },
  { p: 84.4, ask: beat >= 2 ? 0 : 30 },
  { p: 84.25, ask: beat >= 1 ? 0 : 20 },
  { p: 84.2, bid: 40 },
  { p: 84.1, bid: 60 },
];
const cents = (v: number) => `${v.toFixed(2)}¢`;

export function MarthaWalk({ beat }: BeatProps) {
  const levels = oj(beat);
  const done = OJ_FILLS.slice(0, Math.min(3, beat));
  const qty = done.reduce((s, f) => s + f.q, 0);
  const avg = qty ? done.reduce((s, f) => s + f.p * f.q, 0) / qty : 0;
  const cur = beat >= 1 && beat <= 3 ? OJ_FILLS[beat - 1] : null;
  return (
    <Stage h={244} label="A market buy for 200 contracts takes 20 at 84.25, 30 at 84.40 and 150 at 84.70">
      <Ladder
        levels={levels}
        x={OJ_X}
        y={OJ_Y}
        rowH={OJ_ROW}
        priceW={58}
        barMax={64}
        maxSize={200}
        fmtP={(p) => p.toFixed(2)}
        hl={beat === 0 ? [84.25, 84.2] : cur ? [cur.p] : beat === 4 ? [84.85] : []}
        hlTone={beat === 4 ? "def" : "see"}
        marks={[{ p: 84.85, label: "new offer", side: "bid", tone: "def", show: beat === 4 }]}
      />
      {cur && <Ping key={beat} x={OJ_X + 50} y={ladderY(levels, cur.p, OJ_Y, OJ_ROW)} trigger={`oj${beat}`} tone="bid" r={20} />}
      {/* the broker's ticket */}
      <rect x={12} y={40} width={132} height={176} rx={14} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <Txt x={25} y={62} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        BUY 200 · MARKET
      </Txt>
      <Txt x={25} y={84} anchor="start" size={12.5} weight={650} tone="neutral">
        still to buy
      </Txt>
      <Num x={131} y={84} anchor="end" size={15} value={200 - qty} />
      {OJ_FILLS.map((f, i) => (
        <Txt key={f.p} x={25} y={110 + i * 22} anchor="start" size={13} weight={750} show={beat > i} tone="bid">
          {`${f.q} @ ${cents(f.p)}`}
        </Txt>
      ))}
      <line x1={25} x2={131} y1={168} y2={168} stroke="var(--line)" strokeWidth={1} />
      <Txt x={25} y={190} anchor="start" size={12.5} weight={650} tone="neutral">
        average
      </Txt>
      <Num x={131} y={190} anchor="end" size={15} value={avg} format={(v) => (v ? cents(v) : "–")} />
      <Txt x={25} y={208} anchor="start" size={11.5} weight={800} show={beat === 4} tone="def">
        last fill +0.45¢
      </Txt>
      {NOTE(232, "Untouched levels: our numbers")}
    </Stage>
  );
}

// ── 4.3.4: the quote moves while the order is in flight ─────────────────────
const IF_Y = 56;
const IF_ROW = 26;
const IF_X = 262;
const inflight = (beat: number): Lvl[] => [
  { p: 50.12, ask: 500 },
  { p: 50.08, ask: beat >= 2 ? 0 : 300 },
  { p: 50.05, ask: beat >= 1 ? 0 : 200 },
  { p: 50.0, bid: 300 },
  { p: 49.95, bid: 500 },
];
const YOU = { x: 74, y: 120, w: 112, h: 52 };

export function InFlight({ beat }: BeatProps) {
  const levels = inflight(beat);
  const y05 = ladderY(levels, 50.05, IF_Y, IF_ROW);
  const y08 = ladderY(levels, 50.08, IF_Y, IF_ROW);
  return (
    <Stage h={232} label="A market buy expected to pay 50.05 fills at 50.08 because the quote changed before it arrived">
      <Ladder
        levels={levels}
        x={IF_X}
        y={IF_Y}
        rowH={IF_ROW}
        priceW={58}
        barMax={64}
        maxSize={900}
        hl={beat <= 1 ? [] : beat === 2 ? [50.08] : [50.12]}
        hlTone={beat === 3 ? "def" : "see"}
        marks={[
          { p: 50.05, label: "you expect", side: "bid", tone: "def", show: beat === 0 },
          { p: 50.08, label: "new best offer", side: "bid", tone: "def", show: beat === 1 },
        ]}
      />
      <Node {...YOU} label="You" sub="buy 300 · market" tone="bid" hl={beat <= 2} dim={beat === 3} />
      {/* someone else gets there first */}
      <Token from={[IF_X + 66, 222]} to={[IF_X + 66, y05]} at={beat >= 1 ? 1 : 0} show={beat === 1} absorb label="OTHER BUYER" tone="neutral" />
      {/* your order arrives late */}
      <Token from={[YOU.x + 58, YOU.y]} to={[IF_X + 40, y08]} at={beat >= 2 ? 1 : 0} show={beat === 2} absorb label="BUY 300" tone="bid" delay={0.1} />
      {beat === 1 && <Ping x={IF_X + 50} y={y05} trigger="gone" tone="neutral" r={20} />}
      {beat === 2 && <Ping x={IF_X + 50} y={y08} trigger="late" tone="bid" r={20} />}
      <Txt x={18} y={190} anchor="start" size={13.5} weight={800} show={beat === 2} tone="ask">
        filled at 50.08: 3¢ worse
      </Txt>
      <Txt x={18} y={190} anchor="start" size={13} weight={800} show={beat === 3} tone="def">
        more size → pay 50.12 too
      </Txt>
      {NOTE(222, "Our numbers")}
    </Stage>
  );
}
