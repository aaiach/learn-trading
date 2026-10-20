// "See it" scenes for 4.8 Market-Not-Held Orders.
import { motion } from "motion/react";
import { Gavel, Handshake } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { Node, Num, Stage, Token, Txt, toneVar } from "../../../scene/index.tsx";
import { spring } from "../../../motion/tokens.ts";
import { Ladder, PriceChart, chartY, ladderY, type Lvl } from "./kit.tsx";

// ── A held market order versus a not-held order that waits (our numbers) ────
// the trailing point is never revealed: it keeps the last fill away from the right edge
const ASK = [20.05, 20.03, 20.02, 20.04, 20.08, 20.12, 20.15, 20.15];
const HN_UPTO = [0, 0, 3, 6, 6];

export function HeldVsNotHeld({ beat }: BeatProps) {
  const notHeld = beat >= 2;
  return (
    <Stage h={232} label="A held market order fills at once; a not-held order waits and the price moves away">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps" show={!notHeld}>
        STANDARD MARKET ORDER · BUY
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps" show={notHeld}>
        MARKET-NOT-HELD ORDER · BUY
      </Txt>
      <Txt x={380} y={22} anchor="end" size={11} weight={700} tone="neutral">
        best offer over time
      </Txt>
      <PriceChart
        pts={ASK}
        upto={HN_UPTO[beat]}
        lo={19.99}
        hi={20.17}
        ticks={[20.0, 20.05, 20.1, 20.15]}
        fmtP={(p) => p.toFixed(2)}
        tone="ask"
        y0={44}
        levels={[{ p: 20.01, label: "broker's bid 20.01", tone: "bid", show: notHeld }]}
        marks={[
          { i: 2, label: "20.02: just missed", tone: "neutral", show: notHeld, below: true },
          { i: 6, label: "pays 20.15", tone: "bid", show: beat >= 3 },
        ]}
      />
      <Txt x={64} y={chartY(20.05, 19.99, 20.17, 44) - 12} anchor="start" size={11.5} weight={800} tone="bid" show={!notHeld} delay={0.35}>
        buys now: 20.05
      </Txt>
      <Node x={160} y={84} w={156} h={50} label="Held" sub="broker accountable" icon={Gavel} tone="def" hl show={beat === 1} />
      <Node x={160} y={84} w={156} h={50} label="Not held" sub="no claim on the broker" icon={Handshake} tone="idea" hl show={beat === 4} />
    </Stage>
  );
}

// ── Working a large order: slices instead of a sweep (our numbers) ──────────
const BOOK: Lvl[] = [
  { p: 20.07, ask: 4000 },
  { p: 20.06, ask: 3000 },
  { p: 20.05, ask: 3500 },
  { p: 20.04, ask: 2500 },
  { p: 20.03, ask: 3000 },
  { p: 20.02, ask: 2000 },
  { p: 20.01, ask: 2000 },
];
const set = (ch: Record<string, number>): Lvl[] => BOOK.map((l) => (String(l.p) in ch ? { ...l, ask: ch[String(l.p)] } : l));
const WL_LEVELS: Lvl[][] = [
  BOOK,
  BOOK.map((l) => ({ ...l, ask: 0 })),
  set({ "20.01": 0 }),
  set({ "20.01": 500 }),
  set({ "20.01": 1500, "20.02": 2500 }),
];
const WL_FILLED = [0, 0, 2000, 4000, 20000];
const WL_AVG = [0, 0, 20.01, 20.01, 20.015];
const LX = 232;
const LY = 58;

export function WorkLarge({ beat }: BeatProps) {
  const filled = WL_FILLED[beat];
  const what = beat === 1;
  return (
    <Stage h={234} label="A large order swept through the book at once, versus worked in small slices">
      {/* the parent order */}
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        NOT-HELD ORDER
      </Txt>
      <Txt x={16} y={52} anchor="start" size={20} weight={800}>
        Buy 20,000
      </Txt>
      <rect x={16} y={66} width={136} height={12} rx={6} fill="var(--scene-grid)" />
      <motion.rect
        x={16}
        y={66}
        height={12}
        rx={6}
        initial={false}
        animate={{ width: what ? 136 : (136 * filled) / 20000, opacity: what ? 0.45 : 1 }}
        fill={toneVar(what ? "prac" : "bid")}
        transition={spring.fill}
      />
      <g style={{ opacity: what ? 0 : 1, transition: "opacity 0.3s" }}>
        <Txt x={16} y={100} anchor="start" size={11.5} weight={700} tone="neutral">
          filled
        </Txt>
        <Num x={16} y={120} anchor="start" size={16} value={filled} format={(v) => Math.round(v).toLocaleString("en-US")} />
        <Txt x={16} y={146} anchor="start" size={11.5} weight={700} tone="neutral">
          average price
        </Txt>
        <Num x={16} y={166} anchor="start" size={16} value={WL_AVG[beat]} format={(v) => (v ? v.toFixed(3) : "—")} />
      </g>
      <Txt x={16} y={104} anchor="start" size={12.5} weight={800} tone="prac" show={what}>
        If shown all at once:
      </Txt>
      <Txt x={16} y={124} anchor="start" size={12.5} weight={700} tone="prac" show={what}>
        sweeps 7 price levels,
      </Txt>
      <Txt x={16} y={142} anchor="start" size={12.5} weight={700} tone="prac" show={what}>
        last fill at 20.07
      </Txt>

      {/* the offers */}
      <text x={LX} y={LY - 20} textAnchor="middle" className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }} fill="var(--ink-3)">
        PRICE
      </text>
      <text x={LX + 38} y={LY - 20} className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }} fill={toneVar("ask")}>
        OFFERS
      </text>
      <Ladder
        levels={WL_LEVELS[beat]}
        x={LX}
        y={LY}
        maxSize={4000}
        barMax={74}
        headers={false}
        band={false}
        hl={beat === 2 || beat === 3 ? [20.01] : []}
        hlTone="bid"
        marks={[
          { p: 20.07, label: "price jumps", side: "ask", tone: "prac", show: what },
          { p: 20.01, label: "refilled", side: "ask", tone: "neutral", show: beat === 3 },
        ]}
      />
      {what && <Token key="sweep" from={[150, 72]} to={[LX + 52, ladderY(BOOK, 20.07, LY)]} at={1} absorb label="20,000" tone="prac" />}
      {(beat === 2 || beat === 3) && <Token key={`slice${beat}`} from={[150, 72]} to={[LX + 52, ladderY(BOOK, 20.01, LY)]} at={1} absorb label="2,000" tone="bid" />}
    </Stage>
  );
}
