// "See it" scenes for 5.4.4 Transparency and 5.4.5 Order Routing Systems (pp. 101–106).
// Same rules as src/scene: every prop derives from `beat`, elements stay mounted, colours in SVG attributes.
import { motion } from "motion/react";
import { Eye, EyeOff, Handshake, Landmark, Monitor, Store, UserRound, Users } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, type SceneTone, Bar, Edge, Node, Num, Ping, Stage, Token, Txt, between, link, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 112, h = 62): Box => ({ x, y, w, h });
const fade = { duration: 0.3, ease: EASE_OUT };

/** A small rounded tag (not a travelling token): fades in place. */
function Tag({ x, y, label, tone = "neutral", show = true, w }: { x: number; y: number; label: string; tone?: SceneTone; show?: boolean; w?: number }) {
  const ww = w ?? Math.round(label.length * 7 + 20);
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={fade}>
      <rect x={x - ww / 2} y={y - 12} width={ww} height={24} rx={12} fill={toneSoft(tone)} stroke={toneVar(tone)} strokeWidth={1.25} />
      <text x={x} y={y + 4.5} textAnchor="middle" className="sc-token" fill={toneVar(tone)}>
        {label}
      </text>
    </motion.g>
  );
}

// ── Ex ante and ex post: what reaches the public, and when (p. 101) ─────────
export function ExAnteExPost({ beat }: BeatProps) {
  const mkt = box(80, 112, 116, 62);
  const pub = box(320, 112, 116, 62);
  const up = between(mkt, pub, -16, 8, 8);
  const low = between(mkt, pub, 16, 8, 8);
  const quotesOn = beat === 1 || beat === 2;
  const tradesOn = beat === 2 || beat === 3;
  const mktLabel = beat === 3 ? "Futures pit" : beat === 4 ? "OTC bonds" : "Market";
  const pubSub = ["sees ?", "sees quotes", "quotes + trades", "trades only", "sees nothing"][beat] ?? "";
  return (
    <Stage h={244} label="Quotes reported before a trade, trades reported after it">
      <Node {...mkt} icon={Landmark} label={mktLabel} sub="knows it all" tone="see" hl={beat === 0 || beat >= 3} />
      <Node {...pub} icon={Monitor} label="Public" sub={pubSub} tone="see" hl={beat >= 1 && beat <= 3} dim={beat === 0 || beat === 4} />

      <Edge from={up[0]} to={up[1]} tone="see" show={quotesOn} />
      <Edge from={low[0]} to={low[1]} tone="idea" show={tradesOn} />
      <Txt x={200} y={70} size={12} weight={800} tone="see" show={quotesOn}>
        ex ante · pre-trade
      </Txt>
      <Txt x={200} y={70} size={12} weight={750} tone="neutral" show={beat === 3}>
        quotes don’t stand long
      </Txt>
      <Txt x={200} y={164} size={12} weight={800} tone="idea" show={tradesOn}>
        ex post · post-trade
      </Txt>
      <Txt x={200} y={117} size={13} weight={800} tone="neutral" show={beat === 4} className="halo">
        nothing reported
      </Txt>

      <Token from={up[0]} to={up[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="quote" tone="see" absorb />
      <Token from={low[0]} to={low[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="trade" tone="idea" absorb />
      <Token from={low[0]} to={low[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="new price" tone="idea" absorb />

      {/* the time of the trade */}
      <motion.line x1={40} x2={194} y1={204} y2={204} strokeWidth={3} strokeLinecap="round" initial={false} animate={{ opacity: quotesOn ? 1 : 0.25 }} stroke={toneVar(quotesOn ? "see" : "neutral")} />
      <motion.line x1={206} x2={360} y1={204} y2={204} strokeWidth={3} strokeLinecap="round" initial={false} animate={{ opacity: tradesOn ? 1 : 0.25 }} stroke={toneVar(tradesOn ? "idea" : "neutral")} />
      <circle cx={200} cy={204} r={6} fill="var(--node)" stroke="var(--ink-3)" strokeWidth={2} />
      <text x={200} y={190} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }}>
        the trade
      </text>
      <text x={40} y={226} textAnchor="start" className="sc-sub">
        before: quotes, orders
      </text>
      <text x={360} y={226} textAnchor="end" className="sc-sub">
        after: trades
      </text>
    </Stage>
  );
}

// ── Opaque, top of the book, market by price (p. 101) ───────────────────────
const BOOK: { p: number; bid?: number; ask?: number }[] = [
  { p: 20.25, ask: 600 },
  { p: 20.2, ask: 300 },
  { p: 20.15, ask: 500 },
  { p: 20.1, bid: 400 },
  { p: 20.05, bid: 800 },
  { p: 20.0, bid: 300 },
];

export function TopOfBook({ beat }: BeatProps) {
  const X = 200;
  const Y0 = 82;
  const RH = 28;
  const PW = 64;
  const BM = 104;
  const left = X - PW / 2;
  const right = X + PW / 2;
  const titles = ["INSIDE THE MARKET: THE WHOLE BOOK", "PUBLIC SCREEN · OPAQUE", "PUBLIC SCREEN · TOP OF THE BOOK", "PUBLIC SCREEN · MARKET BY PRICE"];
  return (
    <Stage h={268} label="The same order book as an opaque market, top of the book, and market by price">
      {titles.map((t, i) => (
        <Txt key={t} x={X} y={28} size={11.5} weight={850} tone={i === 0 ? "neutral" : "see"} show={beat === i} className="caps">
          {t}
        </Txt>
      ))}
      <g className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }}>
        <text x={left - 6} y={Y0 - 24} textAnchor="end" fill={toneVar("bid")}>
          BIDS
        </text>
        <text x={X} y={Y0 - 24} textAnchor="middle" fill="var(--ink-3)">
          PRICE
        </text>
        <text x={right + 6} y={Y0 - 24} textAnchor="start" fill={toneVar("ask")}>
          OFFERS
        </text>
      </g>
      {BOOK.map((r, i) => {
        const cy = Y0 + i * RH;
        const best = r.p === 20.15 || r.p === 20.1;
        const op = beat === 1 ? 0.1 : beat === 2 ? (best ? 1 : 0.1) : 1;
        const bw = ((r.bid ?? 0) / 800) * BM;
        const aw = ((r.ask ?? 0) / 800) * BM;
        return (
          <g key={r.p}>
            <motion.rect
              x={left - BM - 40}
              y={cy - RH / 2 + 1}
              width={PW + 2 * BM + 80}
              height={RH - 2}
              rx={7}
              fill={toneSoft("see")}
              stroke={toneVar("see")}
              strokeWidth={1.25}
              initial={false}
              animate={{ opacity: beat === 2 && best ? 1 : 0 }}
              transition={fade}
            />
            <motion.g initial={false} animate={{ opacity: op }} transition={fade}>
              {r.bid ? <rect x={left - 4 - bw} y={cy - RH / 2 + 5} width={bw} height={RH - 10} rx={4} fill={toneVar("bid")} opacity={0.9} /> : null}
              {r.ask ? <rect x={right + 4} y={cy - RH / 2 + 5} width={aw} height={RH - 10} rx={4} fill={toneVar("ask")} opacity={0.9} /> : null}
              <text x={X} y={cy + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: best ? 800 : 650 }} fill="var(--ink)">
                {r.p.toFixed(2)}
              </text>
              {r.bid ? (
                <text x={left - 10 - bw} y={cy + 4.5} textAnchor="end" className="sc-num" style={{ fontSize: 12, fontWeight: 750 }} fill={toneVar("bid")}>
                  {r.bid}
                </text>
              ) : null}
              {r.ask ? (
                <text x={right + 10 + aw} y={cy + 4.5} textAnchor="start" className="sc-num" style={{ fontSize: 12, fontWeight: 750 }} fill={toneVar("ask")}>
                  {r.ask}
                </text>
              ) : null}
            </motion.g>
          </g>
        );
      })}
      <Txt x={X} y={Y0 + 2.5 * RH + 5} size={15} weight={800} tone="neutral" show={beat === 1} className="halo">
        nothing reported
      </Txt>
      <Txt x={X} y={Y0 + 5 * RH + 36} size={12} weight={750} tone="see" show={beat === 3}>
        an open limit order book
      </Txt>
    </Stage>
  );
}

// ── Table 5-7 as a map: are quotes reported? are trades? (p. 102) ──────────
const CELLS = [
  { x: 165, y: 107, cap: "transparent" },
  { x: 311, y: 107, cap: "ex post only" },
  { x: 165, y: 197, cap: "ex ante only" },
  { x: 311, y: 197, cap: "opaque" },
];
const MAP_MKTS = [
  { label: "U.S. stocks", cell: 0, beat: 1 },
  { label: "U.S. futures", cell: 1, beat: 2 },
  { label: "Currencies (FX)", cell: 2, beat: 3 },
  { label: "OTC bonds", cell: 3, beat: 4 },
];

export function TransparencyMap({ beat }: BeatProps) {
  const x0 = 92;
  const xm = 238;
  const x1 = 384;
  const y0 = 62;
  const ym = 152;
  const y1 = 242;
  const active = MAP_MKTS.find((m) => m.beat === beat)?.cell ?? -1;
  return (
    <Stage h={256} label="Markets sorted by whether they report quotes and trades">
      <g className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.07em" }} fill="var(--ink-3)">
        <text x={(x0 + xm) / 2} y={50} textAnchor="middle">
          QUOTES REPORTED
        </text>
        <text x={(xm + x1) / 2} y={50} textAnchor="middle">
          NO QUOTES
        </text>
        <text x={50} y={103} textAnchor="middle">
          TRADES
        </text>
        <text x={50} y={118} textAnchor="middle">
          REPORTED
        </text>
        <text x={50} y={193} textAnchor="middle">
          NO TRADE
        </text>
        <text x={50} y={208} textAnchor="middle">
          REPORTS
        </text>
      </g>
      {CELLS.map((c, i) => (
        <motion.rect
          key={c.cap}
          x={c.x - 71}
          y={c.y - 43}
          width={142}
          height={86}
          rx={10}
          fill={toneSoft("see")}
          initial={false}
          animate={{ opacity: active === i ? 1 : 0 }}
          transition={fade}
        />
      ))}
      <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} rx={12} fill="none" stroke="var(--line-strong)" strokeWidth={1.25} />
      <line x1={xm} x2={xm} y1={y0} y2={y1} stroke="var(--line-strong)" strokeWidth={1.25} />
      <line x1={x0} x2={x1} y1={ym} y2={ym} stroke="var(--line-strong)" strokeWidth={1.25} />
      {CELLS.map((c, i) => (
        <text key={c.cap} x={c.x} y={c.y - 24} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }} fill={active === i ? toneVar("see") : "var(--ink-3)"}>
          {c.cap}
        </text>
      ))}
      {MAP_MKTS.map((m) => {
        const c = CELLS[m.cell];
        return <Node key={m.label} x={c.x} y={c.y + 12} w={126} h={34} label={m.label} show={beat >= m.beat} hl={beat === m.beat} tone="see" />;
      })}
    </Stage>
  );
}

// ── Why opacity pays dealers (box "Transparency and Dealer Profitability", p. 101) ──
export function DealerMargin({ beat }: BeatProps) {
  const cust = box(72, 62, 116, 58);
  const deal = box(328, 62, 116, 58);
  const ask = between(cust, deal, -10, 8, 8);
  const quote = between(deal, cust, -10, 8, 8);
  const spread = beat <= 1 ? 0.02 : 0.25;
  const screen = ["", "market: 20.10 – 20.12", "nothing reported", "nothing reported"][beat] ?? "";
  return (
    <Stage h={250} label="A dealer quotes a tight price when the customer can see the market, a wide one when not">
      <Node {...cust} icon={UserRound} label="Customer" sub={beat === 1 ? "sees the market" : beat >= 2 ? "in the dark" : "wants a price"} tone="see" hl={beat <= 2} dim={beat === 3} />
      <Node {...deal} icon={Store} label="Dealer" sub={["quotes a price", "20.10 – 20.12", "20.00 – 20.25", "20.00 – 20.25"][beat] ?? ""} tone="idea" hl={beat === 3} />
      <Edge from={ask[0]} to={ask[1]} tone="see" />
      <Edge from={quote[0]} to={quote[1]} tone="idea" show={beat >= 1} />
      <Token from={ask[0]} to={ask[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="price?" tone="see" absorb />
      <Token from={quote[0]} to={quote[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="20.10–20.12" tone="idea" absorb />
      <Token from={quote[0]} to={quote[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="20.00–20.25" tone="idea" absorb />

      <rect x={96} y={112} width={208} height={58} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <text x={200} y={132} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
        CUSTOMER’S SCREEN
      </text>
      {["market: 20.10 – 20.12", "nothing reported"].map((s) => (
        <Txt key={s} x={200} y={155} size={13.5} weight={800} tone={s.startsWith("market") ? "see" : "neutral"} show={screen === s}>
          {s}
        </Txt>
      ))}

      <motion.g initial={false} animate={{ opacity: beat >= 1 ? 1 : 0 }} transition={fade}>
        <text x={200} y={196} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
          DEALER’S SPREAD
        </text>
        <Num value={spread} x={200} y={222} size={20} format={(v) => `$${v.toFixed(2)}`} tone={beat >= 2 ? "idea" : "see"} />
      </motion.g>
      <Txt x={200} y={244} size={12} weight={800} tone="idea" show={beat === 3}>
        opacity pays the dealer
      </Txt>
    </Stage>
  );
}

// ── Who favors transparency (p. 101) ────────────────────────────────────────
export function TugOfWar({ beat }: BeatProps) {
  const lo = box(86, 150, 128, 62);
  const hi = box(314, 150, 128, 62);
  const kx = beat === 0 ? 116 : 284;
  return (
    <Stage h={256} label="Less-informed traders favor transparency, well-informed traders oppose it">
      <Txt x={200} y={30} size={11} weight={850} tone="neutral" className="caps">
        TRANSPARENCY
      </Txt>
      <line x1={96} x2={304} y1={60} y2={60} stroke="var(--line-strong)" strokeWidth={4} strokeLinecap="round" />
      <motion.line x1={96} y1={60} y2={60} stroke={toneVar("see")} strokeWidth={4} strokeLinecap="round" initial={false} animate={{ x2: kx }} transition={spring.travel} />
      <motion.circle cy={60} r={10} fill="var(--node)" stroke={toneVar("see")} strokeWidth={3} initial={false} animate={{ cx: kx }} transition={spring.travel} />
      <text x={96} y={84} textAnchor="middle" className="sc-sub">
        low
      </text>
      <text x={304} y={84} textAnchor="middle" className="sc-sub">
        high
      </text>

      <Node {...lo} icon={EyeOff} label="Knows little" sub="about the market" tone="see" hl={beat === 1 || beat === 3} dim={beat === 2} />
      <Node {...hi} icon={Eye} label="Knows a lot" sub="about the market" tone="prac" hl={beat === 2 || beat === 3} dim={beat === 1} />
      <Txt x={lo.x} y={202} size={12.5} weight={800} tone="see" show={beat >= 1}>
        sees more: favors it
      </Txt>
      <Txt x={hi.x} y={202} size={12.5} weight={800} tone="prac" show={beat >= 2}>
        reveals more: opposes it
      </Txt>
      <Txt x={200} y={238} size={12.5} weight={800} tone="idea" show={beat === 3}>
        everyone: see others, hide yourself
      </Txt>
    </Stage>
  );
}

// ── The first half of the information matters most (p. 101) ────────────────
export function FirstHalf({ beat }: BeatProps) {
  const base = 196;
  return (
    <Stage h={252} label="The first half of market information is worth much more than the second half">
      <Txt x={200} y={28} size={11} weight={850} tone="neutral" className="caps">
        WHAT A TRADER LEARNS
      </Txt>
      <line x1={70} x2={330} y1={base} y2={base} className="sc-axis" />
      <Bar x={140} base={base} w={76} h={124} tone="see" show={beat >= 1} />
      <Bar x={260} base={base} w={76} h={28} tone="neutral" show={beat >= 2} />
      <Txt x={140} y={base - 132} size={12.5} weight={800} tone="see" show={beat >= 1}>
        most of the value
      </Txt>
      <Txt x={260} y={base - 36} size={12.5} weight={800} tone="neutral" show={beat >= 2}>
        a little more
      </Txt>
      <Txt x={200} y={118} size={13} weight={750} tone="neutral" show={beat === 0}>
        a flood of data, much of it redundant
      </Txt>
      <text x={140} y={base + 20} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }}>
        first half
      </text>
      <text x={260} y={base + 20} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }}>
        second half
      </text>
      <text x={200} y={base + 40} textAnchor="middle" className="sc-sub">
        of the information
      </text>
    </Stage>
  );
}

// ── Who routes orders to whom (p. 102) ──────────────────────────────────────
export function RoutingMap({ beat }: BeatProps) {
  const C = box(50, 150, 88, 54);
  const B = box(200, 80, 88, 54);
  const D = box(200, 220, 88, 54);
  const E = box(350, 80, 88, 54);
  const E2 = box(350, 220, 88, 54);
  const cb = link(C, B);
  const cd = link(C, D);
  const bd = link(B, D);
  const be = link(B, E);
  const ee = link(E, E2);
  // trade reports come back to the customer over the top of the network
  const rep: [readonly [number, number], readonly [number, number]] = [
    [E.x - 10, E.y - E.h / 2 - 6],
    [C.x, C.y - C.h / 2 - 6],
  ];
  const on = (k: number) => beat === k;
  const act: Record<string, number[]> = { C: [0, 3, 4], B: [0, 1, 3], D: [0, 1], E: [1, 2, 4], E2: [2] };
  const dim = (k: string) => !act[k].includes(beat);
  return (
    <Stage h={262} label="Order-routing systems carry orders, cancellations and trade reports">
      <Edge from={cb[0]} to={cb[1]} tone="see" />
      <Edge from={cd[0]} to={cd[1]} tone="see" />
      <Edge from={bd[0]} to={bd[1]} tone="see" show={beat >= 1} />
      <Edge from={be[0]} to={be[1]} tone="see" show={beat >= 1} />
      <Edge from={ee[0]} to={ee[1]} tone="see" show={beat >= 2} />
      <Edge from={rep[0]} to={rep[1]} bend={-62} tone="idea" dashed show={beat === 4} label="trade report" labelDy={16} />

      <Node {...C} icon={UserRound} label="Customer" tone="see" hl={on(0) || on(3) || on(4)} dim={dim("C")} />
      <Node {...B} icon={Handshake} label="Broker" tone="see" hl={on(1)} dim={dim("B")} />
      <Node {...D} icon={Store} label="Dealer" tone="see" dim={dim("D")} />
      <Node {...E} icon={Landmark} label="Exchange" tone="see" hl={on(2) || on(4)} dim={dim("E")} />
      <Node {...E2} icon={Landmark} label="Exchange 2" tone="see" dim={dim("E2")} />

      <Token from={cb[0]} to={cb[1]} at={on(0) ? 1 : 0} show={on(0)} label="order" tone="see" absorb />
      <Token from={cd[0]} to={cd[1]} at={on(0) ? 1 : 0} show={on(0)} label="order" tone="see" absorb />
      <Token from={bd[0]} to={bd[1]} at={on(1) ? 1 : 0} show={on(1)} label="order" tone="see" absorb />
      <Token from={be[0]} to={be[1]} at={on(1) ? 1 : 0} show={on(1)} label="order" tone="see" absorb />
      <Token from={ee[0]} to={ee[1]} at={on(2) ? 1 : 0} show={on(2)} label="order" tone="see" absorb />
      <Token from={cb[0]} to={cb[1]} at={on(3) ? 1 : 0} show={on(3)} label="cancel" tone="neutral" absorb />
      <Token from={rep[0]} to={rep[1]} bend={-62} at={on(4) ? 1 : 0} show={on(4)} label="filled" tone="idea" duration={1.4} absorb />
    </Stage>
  );
}

// ── Electronic or telephone? (p. 103) ───────────────────────────────────────
export function PhoneOrScreen({ beat }: BeatProps) {
  const T = box(56, 120, 96, 62);
  const B = box(344, 120, 96, 62);
  const up: [readonly [number, number], readonly [number, number]] = [
    [110, 104],
    [290, 104],
  ];
  const lo: [readonly [number, number], readonly [number, number]] = [
    [110, 136],
    [290, 136],
  ];
  const centre = ["fast · accurate · cheap", "slower; can be misheard", "special? use the phone", "online: lower commission"];
  const tones: SceneTone[] = ["see", "prac", "neutral", "see"];
  return (
    <Stage h={214} label="Standard orders travel electronically; special instructions go by telephone">
      <Node {...T} icon={UserRound} label="Trader" tone="see" hl />
      <Node {...B} icon={Handshake} label="Broker" tone="see" />
      <Edge from={up[0]} to={up[1]} bend={24} tone="see" label="electronic" labelDy={-10} />
      <Edge from={lo[0]} to={lo[1]} bend={-24} tone="prac" label="telephone" labelDy={22} />
      {centre.map((s, i) => (
        <Txt key={s} x={200} y={124} size={12} weight={800} tone={tones[i]} show={beat === i}>
          {s}
        </Txt>
      ))}
      <Token from={up[0]} to={up[1]} bend={24} at={beat === 0 ? 1 : 0} show={beat === 0} label="buy 100" tone="see" duration={0.6} absorb />
      <Token from={lo[0]} to={lo[1]} bend={-24} at={beat === 1 ? 1 : 0} show={beat === 1} label="buy 100" tone="prac" duration={1.8} absorb />
      <Token from={lo[0]} to={lo[1]} bend={-24} at={beat === 2 ? 1 : 0} show={beat === 2} label="special" tone="prac" duration={1.8} absorb />
      <Token from={up[0]} to={up[1]} bend={24} at={beat === 3 ? 1 : 0} show={beat === 3} label="online" tone="see" duration={0.6} absorb />
      <Txt x={B.x} y={172} size={12} weight={800} tone="prac" show={beat === 1} delay={1.6}>
        heard “1,000”
      </Txt>
    </Stage>
  );
}

// ── The floor trader's head start (box "Floor Trader Advantages", p. 104) ───
export function LatencyRace({ beat }: BeatProps) {
  const F = box(88, 96, 124, 62);
  const O = box(312, 96, 124, 62);
  const data = between(F, O, -14, 8, 8);
  const order = between(O, F, -14, 8, 8);
  const x0 = 50;
  const s = 26; // units per second on the time line
  const seg = (a: number, b: number, show: boolean, tone: SceneTone, dashed = false) => (
    <motion.line
      x1={x0 + a * s}
      y1={192}
      y2={192}
      stroke={toneVar(tone)}
      strokeWidth={5}
      strokeLinecap="round"
      strokeDasharray={dashed ? "4 7" : undefined}
      initial={false}
      animate={{ x2: show ? x0 + b * s : x0 + a * s, opacity: show ? 1 : 0 }}
      transition={spring.fill}
    />
  );
  return (
    <Stage h={234} label="Floor traders see and act before off-floor traders">
      <Node {...F} icon={Users} label="Floor trader" sub="sees who trades" tone="see" hl={beat === 0 || beat === 2} />
      <Node {...O} icon={Monitor} label="Off-floor trader" sub="at a desk" tone="idea" hl={beat === 1} dim={beat === 0} />
      <Ping x={F.x} y={F.y} trigger={beat === 0 ? "news" : "none"} tone="see" r={46} />
      <Edge from={data[0]} to={data[1]} tone="see" label="data" labelDy={-10} show={beat >= 1} />
      <Edge from={order[0]} to={order[1]} tone="idea" label="order" labelDy={22} show={beat >= 2} />
      <Token from={data[0]} to={data[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="news" tone="see" duration={1.2} absorb />
      <Token from={order[0]} to={order[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="order" tone="idea" duration={1.4} absorb />
      <Token from={order[0]} to={order[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="runner" tone="neutral" duration={2.6} absorb />
      <Txt x={F.x} y={146} size={12} weight={800} tone="prac" show={beat >= 2} delay={beat === 2 ? 0.3 : 0} className="halo">
        already traded
      </Txt>

      <line x1={x0} x2={360} y1={192} y2={192} stroke="var(--line)" strokeWidth={5} strokeLinecap="round" />
      {seg(0, 3, beat >= 1, "see")}
      {seg(3, 8, beat >= 2, "idea")}
      {seg(8, 11.8, beat >= 3, "neutral", true)}
      <circle cx={x0} cy={192} r={5} fill={toneVar("see")} />
      <Txt x={x0 + 1.5 * s} y={178} size={11.5} weight={800} tone="see" show={beat >= 1}>
        data &lt; 3 s
      </Txt>
      <Txt x={x0 + 5.5 * s} y={178} size={11.5} weight={800} tone="idea" show={beat >= 2}>
        order &lt; 5 s
      </Txt>
      <Txt x={x0 + 9.9 * s} y={178} size={11.5} weight={800} tone="neutral" show={beat >= 3}>
        runner: longer
      </Txt>
      <text x={x0} y={214} textAnchor="middle" className="sc-tick">
        now
      </text>
      <motion.text x={x0 + 3 * s} y={214} textAnchor="middle" className="sc-tick" initial={false} animate={{ opacity: beat >= 1 ? 1 : 0 }}>
        +3 s
      </motion.text>
      <motion.text x={x0 + 8 * s} y={214} textAnchor="middle" className="sc-tick" initial={false} animate={{ opacity: beat >= 2 ? 1 : 0 }}>
        +8 s
      </motion.text>
    </Stage>
  );
}

// ── The telegraph consolidates markets (box p. 105) ─────────────────────────
const CITIES = [
  { k: "A", x: 200, y: 128, p: "20.10" },
  { k: "B", x: 66, y: 48, p: "20.40" },
  { k: "C", x: 334, y: 48, p: "19.70" },
  { k: "D", x: 66, y: 208, p: "20.60" },
  { k: "E", x: 334, y: 208, p: "19.90" },
];

export function Consolidation({ beat }: BeatProps) {
  const boxes = CITIES.map((c) => box(c.x, c.y, 104, 54));
  const hub = boxes[0];
  const fate = ["", "quits trading", "combines", "quits trading", "combines"];
  return (
    <Stage h={248} label="Telegraph lines send orders to the best market; smaller markets close or combine">
      {boxes.slice(1).map((b, i) => {
        const [a, z] = link(b, hub);
        return (
          <g key={i}>
            <Edge from={a} to={z} tone="neutral" dashed arrow={false} show={beat >= 1} />
            <Token from={a} to={z} at={beat === 2 ? 1 : 0} show={beat === 2} label="order" tone="see" absorb delay={i * 0.12} />
          </g>
        );
      })}
      {CITIES.map((c, i) => {
        const sub = i === 0 ? (beat === 3 ? "most liquid" : beat === 2 ? "best market" : c.p) : beat === 3 ? fate[i] : c.p;
        return (
          <Node
            key={c.k}
            {...boxes[i]}
            icon={Landmark}
            label={`City ${c.k}`}
            sub={sub}
            tone="see"
            hl={i === 0 ? beat === 0 || beat >= 2 : beat === 0}
            dim={i > 0 && beat === 3}
          />
        );
      })}
    </Stage>
  );
}

// ── Nasdaq Level I, II and III (box p. 105) ─────────────────────────────────
const DEALERS = [
  { d: "Dealer A", bid: "20.10", ask: "20.20" },
  { d: "Dealer B", bid: "20.12", ask: "20.22" },
  { d: "Dealer C", bid: "20.08", ask: "20.18" },
  { d: "Dealer D", bid: "20.11", ask: "20.19" },
];
const ACTIONS = ["quote", "route", "execute", "message"];

export function NasdaqLevels({ beat }: BeatProps) {
  const titles = ["FOUR DEALERS QUOTE ONE STOCK", "LEVEL I · THE INSIDE QUOTE", "LEVEL II · EVERY DEALER’S QUOTE", "LEVEL III · SEE AND ACT"];
  const rowsOp = beat === 1 ? 0.12 : 1;
  const RY = 150;
  const RH = 24;
  return (
    <Stage h={300} label="Nasdaq Level I shows the inside quote, Level II every dealer quote, Level III adds trading tools">
      {titles.map((t, i) => (
        <Txt key={t} x={200} y={28} size={11.5} weight={850} tone={i === 0 ? "neutral" : "see"} show={beat === i} className="caps">
          {t}
        </Txt>
      ))}
      <motion.g initial={false} animate={{ opacity: beat >= 1 ? 1 : 0 }} transition={fade}>
        <rect x={70} y={44} width={260} height={56} rx={12} fill="var(--node)" stroke={beat === 1 ? toneVar("see") : "var(--node-line)"} strokeWidth={beat === 1 ? 2 : 1.25} />
        <text x={135} y={64} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }}>
          inside bid
        </text>
        <text x={265} y={64} textAnchor="middle" className="sc-sub" style={{ fontWeight: 800 }}>
          inside ask
        </text>
        <text x={135} y={88} textAnchor="middle" className="sc-num" style={{ fontSize: 18, fontWeight: 800 }} fill={toneVar("bid")}>
          20.12
        </text>
        <text x={265} y={88} textAnchor="middle" className="sc-num" style={{ fontSize: 18, fontWeight: 800 }} fill={toneVar("ask")}>
          20.18
        </text>
      </motion.g>

      <g className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }} fill="var(--ink-3)">
        <text x={110} y={RY - 22} textAnchor="middle">
          DEALER
        </text>
        <text x={215} y={RY - 22} textAnchor="middle" fill={toneVar("bid")}>
          BID
        </text>
        <text x={305} y={RY - 22} textAnchor="middle" fill={toneVar("ask")}>
          ASK
        </text>
      </g>
      {DEALERS.map((r, i) => {
        const y = RY + i * RH;
        const insideBid = r.bid === "20.12";
        const insideAsk = r.ask === "20.18";
        return (
          <motion.g key={r.d} initial={false} animate={{ opacity: rowsOp }} transition={fade}>
            {i > 0 && <line x1={60} x2={340} y1={y - RH / 2} y2={y - RH / 2} stroke="var(--line)" strokeWidth={1} />}
            <motion.rect x={180} y={y - 10} width={70} height={20} rx={6} fill={toneSoft("bid")} initial={false} animate={{ opacity: insideBid && beat >= 1 ? 1 : 0 }} />
            <motion.rect x={270} y={y - 10} width={70} height={20} rx={6} fill={toneSoft("ask")} initial={false} animate={{ opacity: insideAsk && beat >= 1 ? 1 : 0 }} />
            <text x={110} y={y + 4.5} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 700 }} fill="var(--ink)">
              {r.d}
            </text>
            <text x={215} y={y + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: insideBid ? 850 : 650 }} fill={toneVar("bid")}>
              {r.bid}
            </text>
            <text x={305} y={y + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: insideAsk ? 850 : 650 }} fill={toneVar("ask")}>
              {r.ask}
            </text>
          </motion.g>
        );
      })}
      <Txt x={200} y={RY + 1.5 * RH + 5} size={13} weight={800} tone="neutral" show={beat === 1} className="halo">
        dealer quotes hidden
      </Txt>
      {ACTIONS.map((a, i) => (
        <Tag key={a} x={80 + i * 80} y={256} label={a} tone="see" show={beat === 3} w={70} />
      ))}
      <Txt x={200} y={289} size={11.5} weight={750} tone="neutral" show={beat === 3}>
        registered market makers only
      </Txt>
    </Stage>
  );
}
