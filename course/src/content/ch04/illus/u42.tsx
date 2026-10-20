// "See it" scenes for 4.2 Some Important Terms
import { motion } from "motion/react";
import { UserRound } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { Ladder, ladderY, type Lvl } from "./kit.tsx";

const box = (x: number, y: number, w = 104, h = 56): Box => ({ x, y, w, h });

// ── Reading a quote: APWR 36.80 bid, 36.85 offered, 500 × 400 (box p. 71) ───
function Side({ x, side, price, size, lit, showSize, sub }: { x: number; side: "bid" | "ask"; price: string; size: string; lit: boolean; showSize: boolean; sub: string }) {
  const c = toneVar(side);
  return (
    <motion.g initial={false} animate={{ opacity: lit ? 1 : 0.45 }} transition={{ duration: 0.3 }}>
      <motion.rect
        x={x - 78}
        y={66}
        width={156}
        height={96}
        rx={16}
        initial={false}
        animate={{ strokeWidth: lit ? 2.5 : 1.25 }}
        fill={lit ? toneSoft(side) : "var(--node)"}
        stroke={lit ? c : "var(--node-line)"}
      />
      <text x={x} y={92} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.1em" }} fill={c}>
        {side === "bid" ? "BID" : "OFFER (ASK)"}
      </text>
      <text x={x} y={128} textAnchor="middle" className="sc-num" style={{ fontSize: 30, fontWeight: 800 }} fill="var(--ink)">
        {price}
      </text>
      <text x={x} y={150} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 700 }} fill="var(--ink-3)">
        {sub}
      </text>
      <motion.g initial={false} animate={{ opacity: showSize ? 1 : 0, y: showSize ? 0 : -6 }} transition={spring.soft}>
        <rect x={x - 54} y={176} width={108} height={30} rx={15} fill={toneSoft(side)} stroke={c} strokeWidth={1.5} />
        <text x={x} y={196} textAnchor="middle" className="sc-token" fill={c}>
          size {size}
        </text>
      </motion.g>
    </motion.g>
  );
}

export function QuoteRead({ beat }: BeatProps) {
  return (
    <Stage h={232} label="Reading a quote: bid, offer and sizes">
      <Txt x={200} y={36} size={15} weight={800}>
        APWR · Nasdaq dealers
      </Txt>
      <Side x={110} side="bid" price="36.80" size="500" lit={beat === 0 || beat === 1 || beat === 3} showSize={beat >= 3} sub={beat >= 1 ? "they buy · you sell" : "willing to buy"} />
      <Side x={290} side="ask" price="36.85" size="400" lit={beat === 0 || beat === 2 || beat === 3} showSize={beat >= 3} sub={beat >= 2 ? "they sell · you buy" : "willing to sell"} />
      <Txt x={200} y={222} size={13} weight={800} tone="neutral" show={beat >= 3} delay={0.3}>
        written “500 × 400”
      </Txt>
    </Stage>
  );
}

// ── Finding the market in a book (Figure 4-2 prices; sizes are ours) ────────
const BOOK: Lvl[] = [
  { p: 32, ask: 600 },
  { p: 31, ask: 300 },
  { p: 30, ask: 900 },
  { p: 29, ask: 400 },
  { p: 28, ask: 500 },
  { p: 27 },
  { p: 26, bid: 700 },
  { p: 25, bid: 300 },
  { p: 24, bid: 1000 },
  { p: 23, bid: 400 },
  { p: 22, bid: 600 },
];

export function BookBBO({ beat }: BeatProps) {
  const Y = 50;
  const RH = 19.5;
  const hl = beat === 1 ? [26] : beat === 2 ? [28] : beat === 3 ? [27] : beat === 4 ? [26, 28] : [];
  return (
    <Stage h={262} label="A book of bids and offers, with the best bid, best offer and spread">
      <Ladder
        levels={BOOK}
        y={Y}
        rowH={RH}
        fmtP={(p) => String(p)}
        hl={hl}
        hlTone={beat === 3 ? "idea" : "see"}
        band={beat >= 3}
        barMax={92}
        marks={[
          { p: 26, label: "best bid", side: "bid", show: beat === 1 || beat === 4 },
          { p: 28, label: "best offer", side: "ask", show: beat === 2 || beat === 4 },
        ]}
      />
      <Txt x={244} y={ladderY(BOOK, 27, Y, RH) + 4.5} size={12} weight={800} tone="idea" show={beat === 3} anchor="start" className="halo">
        spread = 2
      </Txt>
    </Stage>
  );
}

// ── The NBBO: best bid and offer across markets (our numbers) ───────────────
const MKTS = [
  { name: "Market A", bid: "40.10", ask: "40.20", x: 72 },
  { name: "Market B", bid: "40.12", ask: "40.22", x: 200 },
  { name: "Market C", bid: "40.08", ask: "40.19", x: 328 },
];

export function NBBOScene({ beat }: BeatProps) {
  const top = 64;
  const nb = { x: 200, y: 184 };
  return (
    <Stage h={250} label="The national best bid and offer combines the best prices from every market">
      {MKTS.map((m, i) => {
        const bidLit = beat >= 1 && i === 1;
        const askLit = beat >= 2 && i === 2;
        return (
          <g key={m.name}>
            <rect x={m.x - 56} y={top - 34} width={112} height={84} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
            <text x={m.x} y={top - 14} textAnchor="middle" className="sc-label">
              {m.name}
            </text>
            <motion.rect x={m.x - 48} y={top - 3} width={96} height={22} rx={6} initial={false} animate={{ opacity: bidLit ? 1 : 0 }} fill={toneSoft("bid")} stroke={toneVar("bid")} strokeWidth={1.5} />
            <text x={m.x - 40} y={top + 12} className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar("bid")}>
              BID
            </text>
            <text x={m.x + 40} y={top + 12} textAnchor="end" className="sc-num" style={{ fontSize: 13.5, fontWeight: 800 }} fill="var(--ink)">
              {m.bid}
            </text>
            <motion.rect x={m.x - 48} y={top + 21} width={96} height={22} rx={6} initial={false} animate={{ opacity: askLit ? 1 : 0 }} fill={toneSoft("ask")} stroke={toneVar("ask")} strokeWidth={1.5} />
            <text x={m.x - 40} y={top + 36} className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar("ask")}>
              OFFER
            </text>
            <text x={m.x + 40} y={top + 36} textAnchor="end" className="sc-num" style={{ fontSize: 13.5, fontWeight: 800 }} fill="var(--ink)">
              {m.ask}
            </text>
          </g>
        );
      })}
      <motion.g initial={false} animate={{ opacity: beat >= 1 ? 1 : 0.35 }} transition={{ duration: 0.3 }}>
        <rect x={nb.x - 108} y={nb.y - 34} width={216} height={70} rx={14} fill={beat >= 3 ? toneSoft("see") : "var(--node)"} stroke={beat >= 3 ? toneVar("see") : "var(--node-line)"} strokeWidth={beat >= 3 ? 2 : 1.25} />
        <text x={nb.x} y={nb.y - 14} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: "0.08em" }} fill={beat >= 3 ? toneVar("see") : "var(--ink-3)"}>
          NBBO
        </text>
        <text x={nb.x - 52} y={nb.y + 16} textAnchor="middle" className="sc-num" style={{ fontSize: 17, fontWeight: 800 }} fill={toneVar("bid")} opacity={beat >= 1 ? 1 : 0.25}>
          {beat >= 1 ? "40.12" : "—"}
        </text>
        <text x={nb.x} y={nb.y + 16} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 700 }} fill="var(--ink-3)">
          /
        </text>
        <text x={nb.x + 52} y={nb.y + 16} textAnchor="middle" className="sc-num" style={{ fontSize: 17, fontWeight: 800 }} fill={toneVar("ask")} opacity={beat >= 2 ? 1 : 0.25}>
          {beat >= 2 ? "40.19" : "—"}
        </text>
      </motion.g>
      <Token from={[200, top + 52]} to={[nb.x - 52, nb.y - 40]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="40.12" tone="bid" absorb />
      <Token from={[328, top + 52]} to={[nb.x + 52, nb.y - 40]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="40.19" tone="ask" absorb />
      <Txt x={200} y={238} size={12} weight={800} tone="see" show={beat >= 3} delay={0.2}>
        highest bid anywhere · lowest offer anywhere
      </Txt>
    </Stage>
  );
}

// ── Joe offers liquidity, Sue takes it (p. 70) ──────────────────────────────
const IBM0: Lvl[] = [
  { p: 100.2, ask: 300 },
  { p: 100.1, ask: 200 },
  { p: 100.05 },
  { p: 100.0 },
  { p: 99.95, bid: 200 },
];
const withJoe = (n: number): Lvl[] => IBM0.map((l) => (l.p === 100.0 ? { ...l, bid: n } : l));

export function JoeSue({ beat }: BeatProps) {
  const LY = 112;
  const RH = 24;
  const joe = box(70, 46, 108, 52);
  const sue = box(330, 46, 108, 52);
  const levels = beat === 0 ? withJoe(100) : beat === 1 ? withJoe(100) : withJoe(0);
  const rowY = ladderY(IBM0, 100.0, LY, RH);
  return (
    <Stage h={256} label="Joe's bid offers liquidity; Sue takes it">
      <Node {...joe} icon={UserRound} label="Joe" sub={beat >= 3 ? "offered liquidity" : "wants to buy"} hl={beat <= 1 || beat === 3} tone="see" />
      <Node {...sue} icon={UserRound} label="Sue" sub={beat >= 3 ? "took liquidity" : "wants to sell now"} show={beat >= 2} hl={beat >= 2} tone="prac" />
      <Ladder levels={levels} y={LY} rowH={RH} barMax={70} maxSize={300} hl={beat === 1 ? [100.0] : []} marks={[{ p: 100.0, label: "Joe", side: "bid", show: beat === 0 }]} />
      <Token from={[joe.x, joe.y + 32]} to={[150, rowY]} bend={-14} at={1} show={beat === 0} label="bid 100 × 100" tone="bid" absorb />
      <Token from={[sue.x, sue.y + 32]} to={[150, rowY]} bend={18} at={beat >= 2 ? 1 : 0} show={beat === 2} label="sell 100" tone="ask" absorb duration={1.1} />
      <Ping x={200} y={rowY} trigger={beat === 2 ? "trade" : "none"} tone="see" r={26} />
      <Txt x={200} y={244} size={12.5} weight={800} tone="neutral" show={beat === 1} delay={0.2}>
        stands until: filled · expires at the close · canceled
      </Txt>
      <Txt x={200} y={244} size={13} weight={800} tone="see" show={beat >= 2} delay={beat === 2 ? 1.0 : 0}>
        trade: 100 IBM at 100.00
      </Txt>
    </Stage>
  );
}

// ── Liquid or not: the same sell order in two books (our numbers) ───────────
const DEEP0: Lvl[] = [
  { p: 50.02, ask: 500 },
  { p: 50.01, ask: 700 },
  { p: 50.0, bid: 800 },
  { p: 49.99, bid: 600 },
  { p: 49.98, bid: 900 },
];
const THIN0: Lvl[] = [
  { p: 50.4, ask: 100 },
  { p: 50.0, bid: 100 },
  { p: 49.8, bid: 100 },
  { p: 49.5, bid: 200 },
];

export function LiquidThin({ beat }: BeatProps) {
  const deep = beat >= 1 ? DEEP0.map((l) => (l.p === 50.0 ? { ...l, bid: 500 } : l)) : DEEP0;
  const thin = beat >= 2 ? THIN0.map((l) => (l.p === 50.0 || l.p === 49.8 ? { ...l, bid: 0 } : l.p === 49.5 ? { ...l, bid: 100 } : l)) : THIN0;
  const Y = 84;
  const RH = 26;
  return (
    <Stage h={244} label="A market sell order in a liquid book and in a thin book">
      <Txt x={100} y={30} size={11.5} weight={800} tone={beat === 1 ? "see" : "neutral"} className="caps">
        LIQUID
      </Txt>
      <Txt x={300} y={30} size={11.5} weight={800} tone={beat === 2 ? "prac" : "neutral"} className="caps">
        THIN
      </Txt>
      <line x1={200} x2={200} y1={22} y2={222} stroke="var(--line)" strokeWidth={1} />
      <Ladder levels={deep} x={100} y={Y} rowH={RH} priceW={48} barMax={34} maxSize={900} headers={false} dim={beat === 2} />
      <Ladder levels={thin} x={300} y={Y} rowH={RH} priceW={48} barMax={34} maxSize={900} headers={false} dim={beat === 1} hl={beat === 2 ? [50.0, 49.8, 49.5] : []} hlTone="prac" />
      <Txt x={100} y={52} size={12} weight={750} tone="neutral" show={beat === 0}>
        spread 1¢
      </Txt>
      <Txt x={300} y={52} size={12} weight={750} tone="neutral" show={beat === 0}>
        spread 40¢
      </Txt>
      <Txt x={100} y={226} size={12.5} weight={800} tone="see" show={beat === 1 || beat === 3} delay={beat === 1 ? 0.5 : 0}>
        sell 300: all at 50.00
      </Txt>
      <Txt x={300} y={226} size={12.5} weight={800} tone="prac" show={beat >= 2} delay={beat === 2 ? 0.5 : 0}>
        sell 300: down to 49.50
      </Txt>
    </Stage>
  );
}

// ── Agency orders first at the same price (p. 70; our numbers) ──────────────
export function Precedence({ beat }: BeatProps) {
  const PX = 272;
  const filled = beat >= 2;
  const chip = (y: number, label: string, sub: string, agency: boolean, done: boolean) => (
    <g>
      <rect
        x={20}
        y={y - 21}
        width={200}
        height={42}
        rx={12}
        fill={done ? toneSoft("see") : agency ? toneSoft("bid") : "var(--node)"}
        stroke={done ? toneVar("see") : toneVar("bid")}
        strokeWidth={done ? 2 : 1.5}
        style={{ transition: "fill 0.3s, stroke 0.3s" }}
      />
      <text x={34} y={y - 3} className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink)">
        {label}
      </text>
      <text x={34} y={y + 13} className="sc-txt" style={{ fontSize: 11.5, fontWeight: 650 }} fill={done ? toneVar("see") : "var(--ink-3)"}>
        {sub}
      </text>
      <text x={208} y={y + 5} textAnchor="end" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill={done ? toneVar("see") : toneVar("bid")}>
        {done ? "✓" : "200"}
      </text>
    </g>
  );
  return (
    <Stage h={232} label="At the same price, the agency order fills before the proprietary order">
      <Txt x={20} y={34} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        TWO BIDS AT THE SAME PRICE
      </Txt>
      <rect x={PX - 34} y={64} width={68} height={112} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <text x={PX} y={126} textAnchor="middle" className="sc-num" style={{ fontSize: 16, fontWeight: 800 }} fill="var(--ink)">
        50.00
      </text>
      {chip(92, "Client's order", filled ? "agency: filled, 200 shares" : "agency order", true, filled)}
      {chip(150, "Broker's own order", filled ? "proprietary: still waiting" : "proprietary order", false, false)}
      <Token from={[352, 40]} to={[348, 120]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="sell 200" tone="ask" />
      <Token from={[348, 120]} to={[150, 92]} bend={-16} at={beat >= 2 ? 1 : 0} show={beat === 2} label="sell 200" tone="ask" absorb duration={0.9} />
      <Txt x={200} y={212} size={12.5} weight={800} tone="see" show={filled} delay={0.9}>
        the agency order fills first
      </Txt>
    </Stage>
  );
}

// ── An order's life: submitted → pending → working → filled (p. 71) ─────────
const STAGES = [
  { label: "Submitted", sub: "to the broker", x: 52 },
  { label: "Pending", sub: "being checked", x: 150 },
  { label: "Working", sub: "accepted", x: 248 },
  { label: "Filled", sub: "or canceled", x: 346 },
];

export function Lifecycle({ beat }: BeatProps) {
  const Y = 86;
  const at = Math.min(beat, 3);
  return (
    <Stage h={232} label="An order goes from submitted to pending to working to filled">
      {STAGES.map((s, i) => (
        <Node key={s.label} x={s.x} y={Y} w={88} h={54} label={s.label} sub={s.sub} hl={i === at} dim={i > at} tone={i === 3 ? "see" : "prac"} />
      ))}
      {STAGES.slice(0, 3).map((s, i) => {
        const [from, to] = between(box(s.x, Y, 88, 54), box(STAGES[i + 1].x, Y, 88, 54), 0, 3);
        return <line key={i} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} stroke="var(--line-strong)" strokeWidth={2} strokeDasharray="3 4" />;
      })}
      <motion.g initial={false} animate={{ x: STAGES[at].x }} transition={{ ...spring.travel }}>
        <rect x={-30} y={Y - 58} width={60} height={24} rx={12} fill={toneSoft("bid")} stroke={toneVar("bid")} strokeWidth={1.5} />
        <text y={Y - 41.5} textAnchor="middle" className="sc-token" fill={toneVar("bid")}>
          order
        </text>
      </motion.g>
      {/* pending: the broker's checks */}
      {[
        { t: "account authorized to trade?", d: 0.2 },
        { t: "short sale: shares borrowable?", d: 0.55 },
      ].map((c, i) => (
        <motion.g key={c.t} initial={false} animate={{ opacity: beat === 1 ? 1 : 0, y: beat === 1 ? 0 : 6 }} transition={{ ...spring.soft, delay: beat === 1 ? c.d : 0 }}>
          <rect x={60} y={138 + i * 34} width={246} height={26} rx={13} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
          <text x={74} y={155.5 + i * 34} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 700 }} fill="var(--ink-2)">
            {c.t}
          </text>
          <motion.text x={294} y={156 + i * 34} textAnchor="end" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill={toneVar("see")} initial={false} animate={{ opacity: beat === 1 ? 1 : 0 }} transition={{ delay: beat === 1 ? c.d + 0.5 : 0 }}>
            ✓
          </motion.text>
        </motion.g>
      ))}
      <Txt x={248} y={160} size={12.5} weight={750} tone="prac" show={beat === 2} delay={0.4}>
        accepted, waiting to fill
      </Txt>
      <motion.g initial={false} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 3 ? 0.5 : 0, ease: EASE_OUT }}>
        <text x={328} y={160} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("see")}>
          at its trade price
        </text>
      </motion.g>
    </Stage>
  );
}
