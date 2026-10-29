// "See it" scenes for 5.3 Execution Systems and 5.3.1 Quote-driven Dealer Markets (pp. 92–94).
import { motion } from "motion/react";
import { Cpu, Handshake, Landmark, ListOrdered, Monitor, Radio, Store, UserRound, Users } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Num, Ping, Stage, Token, Txt, between, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 112, h = 56): Box => ({ x, y, w, h });
const money = (v: number) => `${v < 0 ? "−" : "+"}$${Math.abs(Math.round(v))}`;

// ── Three ways to match a buyer and a seller, then a hybrid (§5.3) ──────────
export function ThreeWays({ beat }: BeatProps) {
  const buyer = box(72, 60, 112, 56);
  const seller = box(328, 60, 112, 56);
  const mid = box(200, 182, 116, 54);
  const hy = beat === 4;
  // in the hybrid beat the three mechanisms sit side by side
  const dealerAt = hy ? box(76, 190, 112, 54) : mid;
  const bookAt = hy ? box(200, 190, 112, 54) : mid;
  const brokerAt = hy ? box(324, 190, 112, 54) : mid;
  const sIn = between(seller, mid, 0, 6, 40);
  const bOut = between(mid, buyer, 0, 40, 6);
  const bIn = between(buyer, mid, 0, 6, 40);
  const askE = between(buyer, mid, 0, 6, 6);
  const searchE = between(mid, seller, 0, 6, 6);
  return (
    <Stage h={252} label="Three ways a market can match a buyer to a seller">
      <Node {...buyer} icon={UserRound} label="Buyer" sub="wants to buy" tone="bid" hl={beat === 0} dim={hy} />
      <Node {...seller} icon={UserRound} label="Seller" sub="wants to sell" tone="ask" hl={beat === 0} dim={hy} />
      <Txt x={200} y={192} size={30} weight={800} tone="neutral" show={beat === 0}>
        ?
      </Txt>
      <Txt x={200} y={126} size={13} weight={800} tone="see" show={hy} className="caps halo">
        HYBRID: SOME OF EACH
      </Txt>

      {/* quote-driven: the dealer buys from the seller, later sells to the buyer */}
      <Edge from={sIn[0]} to={between(seller, mid)[1]} show={beat === 1} />
      <Edge from={between(mid, buyer)[0]} to={bOut[1]} show={beat === 1} />
      <Token from={sIn[0]} to={sIn[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="shares" tone="asset" absorb />
      <Token from={bOut[0]} to={bOut[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="shares" tone="asset" delay={1.1} absorb />

      {/* order-driven: both orders go to the book, rules match them */}
      <Edge from={bIn[0]} to={between(buyer, mid)[1]} show={beat === 2} tone="bid" />
      <Edge from={sIn[0]} to={between(seller, mid)[1]} show={beat === 2} tone="ask" />
      <Token from={bIn[0]} to={bIn[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="buy order" tone="bid" absorb />
      <Token from={sIn[0]} to={sIn[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="sell order" tone="ask" absorb />
      <Ping x={mid.x} y={mid.y} trigger={beat === 2 ? "match" : "none"} r={48} />
      <Txt x={200} y={130} size={12.5} weight={800} tone="see" show={beat === 2} delay={1.1} className="halo">
        rules match them
      </Txt>

      {/* brokered: the broker searches for the other side */}
      <Edge from={askE[0]} to={askE[1]} show={beat === 3} tone="bid" label="asks" labelDy={-10} />
      <Edge from={searchE[0]} to={searchE[1]} show={beat === 3} dashed tone="see" label="searches" labelDy={-10} />
      <Ping x={seller.x} y={seller.y} trigger={beat === 3 ? "found" : "none"} r={44} />

      <Node {...dealerAt} icon={Store} label="Dealer" sub="quote-driven" show={beat === 1 || hy} hl={beat === 1} tone="see" />
      <Node {...bookAt} icon={ListOrdered} label="Order book" sub="order-driven" show={beat === 2 || hy} hl={beat === 2} tone="see" />
      <Node {...brokerAt} icon={Handshake} label="Broker" sub="brokered" show={beat === 3 || hy} hl={beat === 3} tone="see" />
    </Stage>
  );
}

// ── Barbara buys, Saul sells: two trades through a dealer (§5.3.1, p. 92) ───
export function BarbaraSaul({ beat }: BeatProps) {
  const barbara = box(72, 62, 116, 58);
  const saul = box(328, 62, 116, 58);
  const dealer = box(200, 186, 136, 60);
  const inv = beat === 1 ? "100 shares" : "0 shares";
  const sd = (o: number) => between(saul, dealer, o, 6, 46);
  const ds = (o: number) => between(dealer, saul, o, 40, 6);
  const db = (o: number) => between(dealer, barbara, o, 46, 6);
  const bd = (o: number) => between(barbara, dealer, o, 6, 40);
  const direct = between(barbara, saul, 0, 8, 8);
  return (
    <Stage h={256} label="Barbara and Saul trade through a dealer, not with each other">
      <Node {...barbara} icon={UserRound} label="Barbara" sub="wants to buy" tone="bid" hl={beat === 2} dim={beat === 1} />
      <Node {...saul} icon={UserRound} label="Saul" sub="wants to sell" tone="ask" hl={beat === 1} dim={beat === 2} />
      <Node {...dealer} icon={Store} label="Dealer" sub={`inventory: ${inv}`} tone="see" hl={beat === 1 || beat === 2} dim={beat === 0} />

      {/* the direct trade a pure quote-driven market doesn't allow */}
      <Edge from={direct[0]} to={direct[1]} dashed arrow={false} show={beat === 0 || beat === 3} />
      <Txt x={200} y={44} size={12.5} weight={800} tone="neutral" show={beat === 0 || beat === 3} className="halo">
        ✕ no direct trade
      </Txt>

      <Edge from={between(saul, dealer)[0]} to={between(saul, dealer)[1]} show={beat >= 1} arrow={false} tone={beat === 1 ? "see" : "neutral"} />
      <Edge from={between(dealer, barbara)[0]} to={between(dealer, barbara)[1]} show={beat >= 2} arrow={false} tone={beat === 2 ? "see" : "neutral"} />
      {/* trade 1: Saul's shares go into the dealer's inventory, cash goes back (at the same time) */}
      <Token from={sd(-12)[0]} to={sd(-12)[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="100 sh" tone="asset" absorb />
      <Token from={ds(-12)[0]} to={ds(-12)[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="cash" tone="cash" absorb />
      {/* trade 2: the dealer sells from inventory to Barbara */}
      <Token from={db(12)[0]} to={db(12)[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="100 sh" tone="asset" absorb />
      <Token from={bd(12)[0]} to={bd(12)[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="cash" tone="cash" absorb />

      <Txt x={300} y={136} size={12.5} weight={800} tone="see" show={beat === 3} className="halo">
        trade 1
      </Txt>
      <Txt x={100} y={136} size={12.5} weight={800} tone="see" show={beat === 3} className="halo">
        trade 2
      </Txt>
    </Stage>
  );
}

// ── Not pure: a Nasdaq dealer brokers a trade between public traders (p. 93) ─
export function DealerBrokers({ beat }: BeatProps) {
  const buyer = box(72, 62, 120, 58);
  const seller = box(328, 62, 120, 58);
  const dealer = box(200, 190, 148, 60);
  const direct = (o: number) => between(seller, buyer, o, 6, 6);
  const back = (o: number) => between(buyer, seller, o, 6, 6);
  const sub = beat === 0 ? "not involved" : beat === 1 ? "brokers the trade" : "supplies most liquidity";
  return (
    <Stage h={256} label="Public traders trade with each other, and a dealer arranges it">
      <Node {...buyer} icon={UserRound} label="Public buyer" tone="bid" hl={beat < 2} dim={beat === 2} />
      <Node {...seller} icon={UserRound} label="Public seller" tone="ask" hl={beat < 2} dim={beat === 2} />
      <Node {...dealer} icon={beat === 1 ? Handshake : Store} label="Dealer" sub={sub} tone="see" hl={beat >= 1} dim={beat === 0} />

      <Edge from={direct(0)[0]} to={direct(0)[1]} arrow={false} show />
      <Token from={direct(-12)[0]} to={direct(-12)[1]} at={beat <= 1 ? 1 : 0} show={beat <= 1} label="shares" tone="asset" absorb />
      <Token from={back(-12)[0]} to={back(-12)[1]} at={beat <= 1 ? 1 : 0} show={beat <= 1} label="cash" tone="cash" absorb />

      <Edge from={between(dealer, buyer)[0]} to={between(dealer, buyer)[1]} dashed show={beat >= 1} tone="see" arrow={false} />
      <Edge from={between(dealer, seller)[0]} to={between(dealer, seller)[1]} dashed show={beat >= 1} tone="see" arrow={false} />
      <Txt x={200} y={128} size={12.5} weight={800} tone="see" show={beat === 1} className="halo">
        dealer arranges it
      </Txt>
      <Txt x={200} y={128} size={12.5} weight={800} tone="see" show={beat === 2} className="halo">
        still quote-driven
      </Txt>
    </Stage>
  );
}

// ── Dealers and customers choose each other (p. 93) ─────────────────────────
export function DealerChooses({ beat }: BeatProps) {
  const fund = box(68, 52, 124, 52);
  const fresh = box(68, 131, 124, 52);
  const informed = box(68, 210, 124, 52);
  const broker = box(205, 131, 92, 52);
  const dA = box(336, 62, 112, 56);
  const dB = box(336, 192, 112, 56);
  const e = (a: Box, b: Box) => between(a, b, 0, 6, 6);
  return (
    <Stage h={262} label="Customers choose dealers, and dealers choose customers">
      <Node {...fund} icon={UserRound} label="Fund" sub="good credit" tone="see" hl={beat <= 1} dim={beat >= 2} />
      <Node {...fresh} icon={UserRound} label="New trader" sub="no credit line" tone="see" hl={beat === 2} dim={beat !== 2} />
      <Node {...informed} icon={UserRound} label="Informed trader" sub="knows more" tone="see" hl={beat === 3} dim={beat !== 3} />
      <Node {...broker} icon={Handshake} label="Broker" sub="guarantees" tone="see" show={beat === 2} hl />
      <Node {...dA} icon={Store} label="Dealer A" sub="20.00 – 20.10" dim={beat >= 1} />
      <Node {...dB} icon={Store} label="Dealer B" sub="20.02 – 20.08" tone="see" hl />

      <Edge from={e(fund, dA)[0]} to={e(fund, dA)[1]} dashed show={beat === 0} arrow={false} />
      <Edge from={e(fund, dB)[0]} to={e(fund, dB)[1]} show={beat <= 1} tone="see" label={beat === 0 ? "better quote" : "trades"} labelAt={0.62} labelDy={-6} />
      <Edge from={e(fresh, broker)[0]} to={e(fresh, broker)[1]} show={beat === 2} tone="see" />
      <Edge from={e(broker, dB)[0]} to={e(broker, dB)[1]} show={beat === 2} tone="see" />
      <Edge from={e(informed, dB)[0]} to={e(informed, dB)[1]} dashed show={beat === 3} tone="neutral" arrow={false} label="avoided" labelAt={0.5} labelDy={-8} />
      <Txt x={336} y={135} size={12} weight={800} tone="see" show={beat === 1} className="halo">
        checks credit
      </Txt>
    </Stage>
  );
}

// ── Interdealer broker: dealers trade with rivals anonymously (p. 93) ───────
export function InterdealerBroker({ beat }: BeatProps) {
  const a = box(72, 62, 116, 56);
  const b = box(328, 62, 116, 56);
  const idb = box(200, 186, 168, 56);
  const aIn = between(a, idb, 0, 6, 46);
  const bIn = between(b, idb, 0, 6, 46);
  const aOut = between(idb, a, 0, 46, 6);
  const bOut = between(idb, b, 0, 46, 6);
  const direct = between(a, b, 0, 8, 8);
  return (
    <Stage h={256} label="Two rival dealers trade through an interdealer broker without learning each other's names">
      <Node {...a} icon={Store} label="Dealer A" sub="wants to sell" tone="ask" hl={beat === 0} />
      <Node {...b} icon={Store} label="Dealer B" sub="a rival, buying" tone="bid" dim={beat === 0} />
      <Node {...idb} icon={Handshake} label="Interdealer broker" tone="see" hl={beat >= 1} dim={beat === 0} />

      <Edge from={direct[0]} to={direct[1]} dashed arrow={false} show={beat === 0} />
      <Txt x={200} y={44} size={12.5} weight={800} tone="neutral" show={beat === 0} className="halo">
        reveals A's trade
      </Txt>

      <Edge from={between(a, idb)[0]} to={between(a, idb)[1]} arrow={false} show={beat >= 1} tone="see" />
      <Edge from={between(b, idb)[0]} to={between(b, idb)[1]} arrow={false} show={beat >= 1} tone="see" />
      <Token from={aIn[0]} to={aIn[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="sell" tone="ask" absorb />
      <Token from={bIn[0]} to={bIn[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="buy" tone="bid" absorb />
      <Ping x={idb.x} y={idb.y} trigger={beat === 1 ? "match" : "none"} r={50} />
      <Token from={aOut[0]} to={aOut[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="filled" tone="see" absorb />
      <Token from={bOut[0]} to={bOut[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="filled" tone="see" absorb />
      <Txt x={a.x} y={a.y - 40} size={12} weight={800} tone="see" show={beat === 2} delay={1} className="halo">
        buyer: unknown
      </Txt>
      <Txt x={b.x} y={b.y - 40} size={12} weight={800} tone="see" show={beat === 2} delay={1} className="halo">
        seller: unknown
      </Txt>
    </Stage>
  );
}

// ── Dealer networks: telephone, then proprietary systems (p. 93) ────────────
const EXAMPLES = [
  { x: 105, y: 72, label: "Nasdaq", sub: "a dealer association", icon: Users },
  { x: 295, y: 72, label: "London SE", sub: "an exchange", icon: Landmark },
  { x: 105, y: 184, label: "eSpeed", sub: "a broker", icon: Handshake },
  { x: 295, y: 184, label: "Reuters 3000", sub: "a data vendor", icon: Radio },
];

export function DealerNetwork({ beat }: BeatProps) {
  const ds = [box(78, 58, 104, 50), box(322, 58, 104, 50), box(78, 194, 104, 50), box(322, 194, 104, 50)];
  const hub = box(200, 126, 124, 62);
  const ring: [number, number][] = [
    [0, 1],
    [1, 3],
    [3, 2],
    [2, 0],
  ];
  return (
    <Stage h={252} label="Dealer markets: telephone networks, structured systems, and who organizes them">
      {ring.map(([i, j]) => {
        const [p, q] = between(ds[i], ds[j], 0, 8, 8);
        return <Edge key={`r${i}${j}`} from={p} to={q} dashed arrow={false} show={beat === 0} label={i === 0 && j === 1 ? "telephone" : undefined} />;
      })}
      {ds.map((d, i) => {
        const [p, q] = between(d, hub, 0, 6, 6);
        return <Edge key={`s${i}`} from={p} to={q} arrow={false} tone="see" show={beat === 1} />;
      })}
      {ds.map((d, i) => (
        <Node key={i} {...d} icon={Store} label="Dealer" show={beat < 2} hl={beat === 0} tone="see" />
      ))}
      <Node {...hub} icon={Monitor} label="Data system" sub="proprietary" tone="see" show={beat === 1} hl />
      {EXAMPLES.map((x) => (
        <Node key={x.label} x={x.x} y={x.y} w={172} h={60} icon={x.icon} label={x.label} sub={x.sub} tone="see" show={beat === 2} hl />
      ))}
    </Stage>
  );
}

// ── A balanced book earns the vigorish whoever wins (box p. 93) ─────────────
export function BalancedBook({ beat }: BeatProps) {
  const a = box(72, 60, 120, 56);
  const b = box(328, 60, 120, 56);
  const bk = box(200, 182, 136, 60);
  const aIn = between(a, bk, -10, 6, 46);
  const bIn = between(b, bk, 10, 6, 46);
  const aOut = between(bk, a, 10, 46, 6);
  const sub = beat === 0 ? "holds $22" : "keeps $1";
  return (
    <Stage h={262} label="A bookie with equal bets on both sides earns the vigorish whoever wins">
      <Node {...a} icon={UserRound} label="Bets team A" sub={beat >= 1 ? "wins $10" : "risks $11"} tone="see" hl={beat === 1} dim={beat === 2} />
      <Node {...b} icon={UserRound} label="Bets team B" sub={beat >= 1 ? "loses $11" : "risks $11"} tone="see" dim={beat >= 1} />
      <Node {...bk} icon={Store} label="Bookie" sub={sub} tone="see" hl />

      <Edge from={between(a, bk)[0]} to={between(a, bk)[1]} arrow={false} tone={beat <= 1 ? "see" : "neutral"} />
      <Edge from={between(b, bk)[0]} to={between(b, bk)[1]} arrow={false} tone={beat === 0 ? "see" : "neutral"} />
      <Token from={aIn[0]} to={aIn[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="$11" tone="cash" absorb />
      <Token from={bIn[0]} to={bIn[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="$11" tone="cash" absorb />
      <Token from={aOut[0]} to={aOut[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="$21" tone="cash" absorb />

      <Txt x={200} y={112} size={12.5} weight={800} tone="see" show={beat === 2} className="caps halo">
        A WINS: +$1
      </Txt>
      <Txt x={200} y={134} size={12.5} weight={800} tone="see" show={beat === 2} className="caps halo">
        B WINS: +$1
      </Txt>
      <Num x={200} y={246} size={14} value={beat >= 1 ? 1 : 0} format={(v) => `bookie's profit: $${v.toFixed(0)}`} tone="see" />
    </Stage>
  );
}

// ── Laying off a lopsided book (box p. 93; our numbers) ─────────────────────
const BASE = 138;
const K = 2.6;

function PnlBar({ x, v, label }: { x: number; v: number; label: string }) {
  const h = Math.abs(v) * K;
  const ly = v >= 0 ? BASE - h - 8 : BASE + h + 18;
  return (
    <g>
      <motion.rect
        x={x - 22}
        width={44}
        rx={5}
        initial={false}
        animate={{ y: v >= 0 ? BASE - h : BASE, height: Math.max(2, h) }}
        transition={spring.fill}
        fill={toneVar("see")}
        opacity={0.9}
      />
      <motion.g initial={false} animate={{ y: ly }} transition={spring.fill}>
        <Num x={x} y={0} size={14} value={v} format={money} />
      </motion.g>
      <text x={x} y={232} textAnchor="middle" className="sc-sub">
        {label}
      </text>
    </g>
  );
}

export function LayOff({ beat }: BeatProps) {
  const bk = box(300, 66, 140, 58);
  const other = box(300, 194, 140, 58);
  const lay = between(bk, other, 0, 6, 6);
  const tok = between(bk, other, 0, 6, 40);
  const off = beat >= 1;
  return (
    <Stage h={262} label="A bookie lays off part of a lopsided book with another bookie">
      <Txt x={110} y={28} size={11} weight={800} tone="neutral" className="caps">
        BOOKIE'S RESULT
      </Txt>
      <line x1={24} x2={196} y1={BASE} y2={BASE} className="sc-axis" />
      <PnlBar x={70} v={off ? 1 : -19} label="if A wins" />
      <PnlBar x={150} v={off ? 1 : 23} label="if B wins" />

      <Node {...bk} icon={Store} label="Bookie" sub="$30 on A · $10 on B" tone="see" hl={beat === 0} />
      <Node {...other} icon={Store} label="Other bookie" sub={beat === 2 ? "earns the vig" : "takes the bet"} dim={beat === 0} hl={beat === 2} tone="see" />
      <Edge from={lay[0]} to={lay[1]} show={off} tone="see" />
      <Token from={tok[0]} to={tok[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="$20 on A" tone="cash" absorb />
      <Txt x={292} y={141} anchor="end" size={12} weight={800} tone="see" show={off} className="halo">
        lay off
      </Txt>
      <Txt x={300} y={252} size={12} weight={700} tone="neutral" show={beat === 2}>
        balanced $40 book: +$2
      </Txt>
    </Stage>
  );
}

// ── Exchanges, brokerages and ECNs converge (box p. 94) ─────────────────────
const ROW = [84, 140, 196];

export function Scorecard({ beat }: BeatProps) {
  return (
    <Stage h={262} label="Exchanges and brokerages grow alike once both run order-matching systems">
      <Txt x={36} y={34} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        ← EXCHANGE
      </Txt>
      <Txt x={364} y={34} anchor="end" size={11} weight={800} tone="neutral" className="caps">
        BROKER →
      </Txt>
      {ROW.map((y) => (
        <line key={y} x1={36} x2={364} y1={y} y2={y} stroke="var(--line)" strokeWidth={1.5} strokeDasharray="3 6" />
      ))}

      <motion.line
        x1={200}
        x2={200}
        y1={54}
        y2={238}
        stroke={toneVar("neutral")}
        strokeWidth={1.75}
        strokeDasharray="5 5"
        initial={false}
        animate={{ opacity: beat === 4 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      />
      <Token from={[92, ROW[0]]} to={[166, ROW[0]]} at={beat >= 1 ? 1 : 0} label="Exchange" icon={Landmark} tone="def" />
      <Txt x={92} y={ROW[0] + 28} size={12} weight={700} tone="neutral" show={beat === 0} className="halo">
        members arrange trades
      </Txt>
      <Txt x={166} y={ROW[0] + 28} size={12} weight={800} tone="def" show={beat >= 1} delay={0.5} className="halo">
        + order matching
      </Txt>

      <Token from={[200, ROW[1]]} to={[200, ROW[1]]} at={1} show={beat >= 3} label="ECN" icon={Cpu} tone="see" />
      <Txt x={200} y={ROW[1] + 28} size={12} weight={800} tone="see" show={beat >= 3} className="halo">
        for-profit company
      </Txt>

      <Token from={[306, ROW[2]]} to={[234, ROW[2]]} at={beat >= 2 ? 1 : 0} label="Brokerage" icon={Handshake} tone="idea" />
      <Txt x={306} y={ROW[2] + 28} size={12} weight={700} tone="neutral" show={beat <= 1} className="halo">
        trades for its clients
      </Txt>
      <Txt x={234} y={ROW[2] + 28} size={12} weight={800} tone="idea" show={beat >= 2} delay={0.5} className="halo">
        + order matching
      </Txt>

      <Txt x={200} y={254} size={12} weight={800} tone="neutral" show={beat === 4}>
        the line regulators draw
      </Txt>
    </Stage>
  );
}
