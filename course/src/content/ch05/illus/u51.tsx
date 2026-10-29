// "See it" scenes for 5.1 Overview, with the chapter opening (pp. 89–91).
import { motion } from "motion/react";
import { Cpu, Handshake, Landmark, ListOrdered, Monitor, Phone, Radio, Store, UserRound, Users } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Num, Ping, Stage, Token, Txt, between, quadPath, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 104, h = 52): Box => ({ x, y, w, h });
const fadeT = { duration: 0.3, ease: EASE_OUT };

// ── What a market's structure decides (p. 89) ───────────────────────────────
type RowState = "off" | "on" | "now";
const RULES = [
  { k: "WHO", v: "can trade", beat: 0 },
  { k: "WHAT", v: "they can trade", beat: 0 },
  { k: "WHEN", v: "they can trade", beat: 1 },
  { k: "WHERE", v: "they can trade", beat: 1 },
  { k: "HOW", v: "they can trade", beat: 1 },
];
const SEES = ["orders", "quotes", "trades", "when they see it", "who sees it"];

function Row({ x, y, k, v, state }: { x: number; y: number; k?: string; v: string; state: RowState }) {
  return (
    <motion.g initial={false} animate={{ opacity: state === "off" ? 0.28 : state === "on" ? 0.62 : 1 }} transition={fadeT}>
      <motion.rect
        x={x}
        y={y - 12}
        width={166}
        height={24}
        rx={8}
        initial={false}
        animate={{ opacity: state === "now" ? 1 : 0 }}
        transition={fadeT}
        fill={toneSoft("def")}
        stroke={toneVar("def")}
        strokeWidth={1.25}
      />
      {k && (
        <text x={x + 10} y={y + 4.5} className="sc-txt" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.05em" }} fill={state === "now" ? toneVar("def") : "var(--ink)"}>
          {k}
        </text>
      )}
      <text x={x + (k ? 62 : 12)} y={y + 4.5} className="sc-txt" style={{ fontSize: 13, fontWeight: 650 }} fill="var(--ink)">
        {v}
      </text>
    </motion.g>
  );
}

export function RuleCard({ beat }: BeatProps) {
  const ruleState = (b: number): RowState => (beat === 3 ? "on" : beat === b ? "now" : beat > b ? "on" : "off");
  const seeState: RowState = beat === 2 ? "now" : beat === 3 ? "on" : "off";
  const chain = [box(70, 238, 112, 40), box(200, 238, 100, 40), box(330, 238, 112, 40)];
  return (
    <Stage h={272} label="What a market's structure decides">
      <motion.g initial={false} animate={{ opacity: beat === 3 ? 0.4 : 1 }} transition={fadeT}>
        <Txt x={20} y={28} anchor="start" size={11} weight={800} tone="neutral" className="caps">
          THE RULES DECIDE
        </Txt>
        <Txt x={214} y={28} anchor="start" size={11} weight={800} tone="neutral" className="caps">
          WHAT TRADERS CAN SEE
        </Txt>
        <rect x={12} y={40} width={182} height={164} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
        <rect x={206} y={40} width={182} height={164} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
        {RULES.map((r, i) => (
          <Row key={r.k} x={20} y={62 + i * 30} k={r.k} v={r.v} state={ruleState(r.beat)} />
        ))}
        {SEES.map((v, i) => (
          <Row key={v} x={214} y={62 + i * 30} v={v} state={seeState} />
        ))}
      </motion.g>
      <Node {...chain[0]} label="Knowledge" show={beat === 3} tone="see" hl />
      <Node {...chain[1]} label="Power" show={beat === 3} tone="see" hl />
      <Node {...chain[2]} label="Who profits" show={beat === 3} tone="see" hl />
      {[0, 1].map((i) => {
        const [a, b] = between(chain[i], chain[i + 1], 0, 4, 6);
        return <Edge key={i} from={a} to={b} show={beat === 3} tone="see" />;
      })}
    </Stage>
  );
}

// ── One order, two structures (pp. 89, 5.1) ─────────────────────────────────
export function TwoMarkets({ beat }: BeatProps) {
  const you = box(200, 42, 112, 52);
  const others = box(344, 42, 92, 52);
  const cont = box(96, 150, 164, 58);
  const call = box(304, 150, 164, 58);
  const toCont = between(you, cont, 0, 6, 26);
  const toCall = between(you, call, 0, 6, 26);
  const fromOthers = between(others, call, 0, 6, 26);
  const waiting = beat >= 2 ? 4 : 1;
  const status = (x: number, tone: "see" | "neutral") => (
    <rect x={x - 85} y={196} width={170} height={30} rx={15} fill={tone === "see" ? toneSoft("see") : "var(--surface-2)"} stroke={tone === "see" ? toneVar("see") : "var(--node-line)"} strokeWidth={1.25} />
  );
  return (
    <Stage h={244} label="The same order in a continuous market and in a call market">
      <Node {...you} icon={UserRound} label="You" sub="buy 100" tone="bid" hl={beat === 0} dim={beat >= 2} />
      <Node {...others} icon={Users} label="Others" sub="more orders" dim={beat !== 2} />
      <Node {...cont} icon={Landmark} label="Continuous" sub="trades any time" tone="see" hl={beat === 1} dim={beat >= 2} />
      <Node {...call} icon={Landmark} label="Call market" sub="trades when called" tone="see" hl={beat === 3} />
      <Token from={toCont[0]} to={toCont[1]} at={1} label="buy 100" tone="bid" absorb />
      <Token from={toCall[0]} to={toCall[1]} at={1} label="buy 100" tone="bid" absorb />
      <Token from={fromOthers[0]} to={fromOthers[1]} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="+3" tone="neutral" absorb />
      <Ping x={cont.x} y={cont.y} trigger={beat === 1 ? "trade" : "none"} tone="see" r={56} />
      <Ping x={call.x} y={call.y} trigger={beat === 3 ? "call" : "none"} tone="see" r={56} />

      <motion.g initial={false} animate={{ opacity: beat >= 2 ? 0.45 : 1 }} transition={fadeT}>
        {status(cont.x, beat >= 1 ? "see" : "neutral")}
        <Txt x={cont.x} y={215} size={12} weight={750} tone="ask" show={beat === 0}>
          a seller waits: sell 100
        </Txt>
        <Txt x={cont.x} y={215} size={12} weight={800} tone="see" show={beat >= 1} delay={0.2}>
          ✓ traded at once
        </Txt>
      </motion.g>
      {status(call.x, beat === 3 ? "see" : "neutral")}
      <Txt x={call.x} y={215} size={12} weight={750} show={beat === 0} tone="neutral">
        no trades until the call
      </Txt>
      <Txt x={call.x} y={215} size={12} weight={750} show={beat === 1 || beat === 2}>
        {`${waiting} order${waiting > 1 ? "s" : ""} waiting`}
      </Txt>
      <Txt x={call.x} y={215} size={12} weight={800} tone="see" show={beat === 3} delay={0.15}>
        called: all trade at once
      </Txt>
    </Stage>
  );
}

// ── Physically convened or distributed access (p. 90) ───────────────────────
const PIT = { x: 116, y: 98 };
const POST = { x: 292, y: 98 };
const SCREENS = [110, 200, 290];
const OFFICES = [box(72, 214, 104, 50), box(200, 214, 104, 50), box(328, 214, 104, 50)];

function octagon(cx: number, cy: number, r: number) {
  return Array.from({ length: 8 }, (_, i) => {
    const a = ((i + 0.5) * Math.PI) / 4;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

function dotAt(i: number, beat: number): [number, number] {
  if (beat === 1) {
    const o = OFFICES[Math.floor(i / 4)];
    return [o.x - 27 + (i % 4) * 18, 176];
  }
  if (beat === 3) {
    const s = SCREENS[Math.floor(i / 4)];
    return [s - 27 + (i % 4) * 18, 130];
  }
  if (beat === 2) {
    const a = (i / 12) * 2 * Math.PI - Math.PI / 2;
    return [PIT.x + 54 * Math.cos(a), PIT.y + 48 * Math.sin(a)];
  }
  if (i < 8) {
    const a = (i / 8) * 2 * Math.PI - Math.PI / 2;
    return [PIT.x + 54 * Math.cos(a), PIT.y + 48 * Math.sin(a)];
  }
  const a = ((i - 8) / 4) * 2 * Math.PI - Math.PI / 4;
  return [POST.x + 36 * Math.cos(a), POST.y + 34 * Math.sin(a)];
}

export function FloorOrOffice({ beat }: BeatProps) {
  const floor = beat !== 1;
  const sys = box(200, 86, 132, 56);
  return (
    <Stage h={252} label="Traders on a trading floor, or in their offices">
      {/* the trading floor */}
      <motion.g initial={false} animate={{ opacity: floor ? 1 : 0.12 }} transition={fadeT}>
        <rect x={14} y={14} width={372} height={160} rx={14} fill="var(--surface-2)" stroke="var(--node-line)" strokeWidth={1.25} />
        <text x={26} y={34} className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
          TRADING FLOOR
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ opacity: beat === 0 || beat === 2 ? 1 : 0 }} transition={fadeT}>
        <polygon points={octagon(PIT.x, PIT.y, 38)} fill={beat === 2 ? toneSoft("see") : "var(--node)"} stroke={beat === 2 ? toneVar("see") : "var(--node-line)"} strokeWidth={1.5} />
        <polygon points={octagon(PIT.x, PIT.y, 24)} fill="none" stroke="var(--node-line)" strokeWidth={1.25} />
        <polygon points={octagon(PIT.x, PIT.y, 11)} fill="none" stroke="var(--node-line)" strokeWidth={1.25} />
      </motion.g>
      <Txt x={PIT.x} y={166} size={12.5} weight={750} show={beat === 0}>
        futures pit
      </Txt>
      <Txt x={PIT.x} y={166} size={12.5} weight={800} tone="see" show={beat === 2}>
        CBOT corn pit
      </Txt>
      <motion.g initial={false} animate={{ opacity: beat === 0 ? 1 : 0 }} transition={fadeT}>
        <circle cx={POST.x} cy={POST.y} r={20} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.5} />
        <circle cx={POST.x} cy={POST.y} r={6} fill="var(--node-line)" />
      </motion.g>
      <Txt x={POST.x} y={166} size={12.5} weight={750} show={beat === 0}>
        stock post
      </Txt>
      {SCREENS.map((x) => (
        <motion.g key={x} initial={false} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={fadeT}>
          <g transform={`translate(${x - 16}, ${76})`} style={{ color: toneVar("see") }}>
            <Monitor width={32} height={32} strokeWidth={2} />
          </g>
        </motion.g>
      ))}
      <Txt x={200} y={160} size={12.5} weight={800} tone="see" show={beat === 3}>
        screens, but on the floor
      </Txt>

      {/* distributed access: a screen-based system and offices */}
      <Node {...sys} icon={Cpu} label="Trading system" sub="screen-based" show={beat === 1} tone="see" hl />
      {OFFICES.map((o, i) => {
        const [a, b] = between(o, sys, 0, 30, 6);
        return <Edge key={i} from={a} to={b} show={beat === 1} tone="see" arrow={false} />;
      })}
      {OFFICES.map((o, i) => (
        <Node
          key={i}
          {...o}
          icon={i === 0 ? Phone : Monitor}
          label={i === 0 && beat === 2 ? "Phone trade" : "Office"}
          sub={i === 0 ? (beat === 2 ? "off the floor" : "telephone") : "screen"}
          show={beat === 1 || (beat === 2 && i === 0)}
        />
      ))}
      <Txt x={OFFICES[0].x + 62} y={219} size={12.5} weight={800} tone="prac" show={beat === 2} anchor="start">
        ✕ not allowed
      </Txt>

      {/* the traders: they move between the floor and their offices */}
      {Array.from({ length: 12 }, (_, i) => {
        const [x, y] = dotAt(i, beat);
        return (
          <motion.circle
            key={i}
            r={6}
            initial={false}
            animate={{ cx: x, cy: y }}
            transition={{ ...spring.travel, delay: i * 0.02 }}
            fill={toneVar("def")}
            stroke="var(--node)"
            strokeWidth={1.5}
          />
        );
      })}
    </Stage>
  );
}

// ── Three ways to arrange a trade (p. 90) ───────────────────────────────────
function Arc({ from, to, bend, show, delay, label }: { from: [number, number]; to: [number, number]; bend: number; show: boolean; delay: number; label: string }) {
  const d = quadPath(from, to, bend);
  const peak = (from[1] + to[1]) / 2 - bend;
  return (
    <g style={{ pointerEvents: "none" }}>
      <motion.path
        d={d}
        fill="none"
        stroke={toneVar("see")}
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
        transition={{ pathLength: { duration: 0.6, ease: EASE_IN_OUT, delay: show ? delay : 0 }, opacity: { duration: 0.2, delay: show ? delay : 0 } }}
      />
      <Txt x={(from[0] + to[0]) / 2} y={peak - 6} size={12.5} weight={800} tone="see" show={show} delay={show ? delay + 0.4 : 0}>
        {label}
      </Txt>
    </g>
  );
}

export function ThreeWays({ beat }: BeatProps) {
  const buyer = box(52, 130, 88, 56);
  const seller = box(348, 130, 88, 56);
  const mid = box(200, 130, 104, 60);
  const bIn = between(buyer, mid, 0, 6, 6);
  const sIn = between(seller, mid, 0, 6, 6);
  const arcFrom: [number, number] = [buyer.x, buyer.y - 34];
  const arcTo: [number, number] = [seller.x, seller.y - 34];
  return (
    <Stage h={196} label="Quote-driven, order-driven and brokered trading">
      <Node {...buyer} icon={UserRound} label="Buyer" tone="bid" hl />
      <Node {...seller} icon={UserRound} label="Seller" sub={beat === 2 ? "no public order" : undefined} tone="ask" hl={beat !== 2} />
      <Node {...mid} icon={Store} label="Dealer" sub="trades with each" show={beat === 0} tone="see" hl />
      <Node {...mid} icon={Cpu} label="Rules" sub="match + price" show={beat === 1} tone="see" hl />
      <Node {...mid} icon={Handshake} label="Broker" sub="searches" show={beat === 2} tone="see" hl />

      {/* quote-driven: two trades, each with the dealer */}
      <Edge from={bIn[0]} to={bIn[1]} show={beat === 0} arrow={false} tone="see" label="trade" labelDy={-10} />
      <Edge from={sIn[0]} to={sIn[1]} show={beat === 0} arrow={false} tone="see" label="trade" labelDy={-10} />
      {/* order-driven: both orders go to the rules, which pair them and set the price */}
      <Token from={bIn[0]} to={bIn[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="buy" tone="bid" absorb />
      <Token from={sIn[0]} to={sIn[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="sell" tone="ask" absorb />
      <Arc from={arcFrom} to={arcTo} bend={44} show={beat === 1} delay={1.0} label="buyer trades with seller" />
      {/* brokered: the buyer asks, the broker searches, the two meet */}
      <Token from={bIn[0]} to={bIn[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="order" tone="bid" absorb />
      <Edge from={sIn[1]} to={sIn[0]} show={beat === 2} dashed tone="see" label="search" labelDy={-10} />
      <Arc from={arcFrom} to={arcTo} bend={44} show={beat === 2} delay={1.2} label="broker introduces them" />
    </Stage>
  );
}

// ── Where market information flows (p. 90) ──────────────────────────────────
export function InfoFlow({ beat }: BeatProps) {
  const cust = box(50, 44, 88);
  const brok = box(200, 44, 88);
  const mkt = box(350, 44, 88);
  const pub = box(56, 194, 100);
  const book = box(200, 194, 96);
  const trd = box(344, 194, 100);
  const cb = between(cust, brok, -7);
  const bm = between(brok, mkt, -7);
  const mb = between(mkt, brok, -7);
  const bc = between(brok, cust, -7);
  const mt = between(mkt, trd, 0);
  const mbook = between(mkt, book, 0);
  const mp1 = between(mkt, pub, -9);
  const mp2 = between(mkt, pub, 9);
  const route = beat <= 1;
  return (
    <Stage h={236} label="Order routing, order presentation, order books and market data">
      <Node {...cust} icon={UserRound} label="Customer" dim={!route} />
      <Node {...brok} icon={Handshake} label="Broker" dim={!route} />
      <Node {...mkt} icon={Landmark} label="Market" tone="see" hl />
      <Node {...trd} icon={Users} label="Traders" sub="see the orders" dim={beat !== 2} tone="see" hl={beat === 2} />
      <Node {...book} icon={ListOrdered} label="Order book" sub={beat >= 3 ? "1 open order" : "empty"} dim={beat !== 3} tone="see" hl={beat === 3} />
      <Node {...pub} icon={Radio} label="Public" sub="trades, quotes" dim={beat !== 4} tone="see" hl={beat === 4} />

      <Edge from={cb[0]} to={cb[1]} show tone={route ? "see" : "neutral"} />
      <Edge from={bm[0]} to={bm[1]} show tone={route ? "see" : "neutral"} />
      <Edge from={mb[0]} to={mb[1]} show={beat >= 1} tone={route ? "see" : "neutral"} dashed />
      <Edge from={bc[0]} to={bc[1]} show={beat >= 1} tone={route ? "see" : "neutral"} dashed />
      <Edge from={mt[0]} to={mt[1]} show={beat >= 2} tone={beat === 2 ? "see" : "neutral"} />
      <Edge from={mbook[0]} to={mbook[1]} show={beat >= 3} tone={beat === 3 ? "see" : "neutral"} />
      <Edge from={mp1[0]} to={mp1[1]} show={beat >= 4} tone="see" />

      <Token from={cb[0]} to={cb[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="order" tone="bid" absorb />
      <Token from={bm[0]} to={bm[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="order" tone="bid" delay={0.9} absorb />
      <Token from={mb[0]} to={mb[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="filled" tone="see" absorb />
      <Token from={bc[0]} to={bc[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="filled" tone="see" delay={0.9} absorb />
      <Token from={mt[0]} to={mt[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="orders" tone="neutral" absorb />
      <Token from={mbook[0]} to={mbook[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="open order" tone="bid" absorb />
      <Token from={mp1[0]} to={mp1[1]} at={beat === 4 ? 1 : 0} show={beat === 4} label="trades" tone="neutral" absorb />
      <Token from={mp2[0]} to={mp2[1]} at={beat === 4 ? 1 : 0} show={beat === 4} label="quotes" tone="neutral" absorb />
    </Stage>
  );
}

// ── The price grid (pp. 90, 5.1) ────────────────────────────────────────────
const GX0 = 40;
const GSTEP = 53;
const gx = (cents: number) => GX0 + (cents / 5) * GSTEP; // cents above 20.00

export function PriceGrid({ beat }: BeatProps) {
  const off = gx(7);
  return (
    <Stage h={226} label="Allowed prices sit on a grid set by the minimum price increment">
      <motion.g initial={false} animate={{ opacity: beat === 2 ? 0.35 : 1 }} transition={fadeT}>
        <Txt x={20} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
          MINIMUM PRICE INCREMENT: 0.05
        </Txt>
        <line x1={GX0 - 12} x2={gx(30) + 12} y1={86} y2={86} stroke="var(--line-strong)" strokeWidth={2} />
        {Array.from({ length: 7 }, (_, i) => {
          const near = beat === 1 && (i === 1 || i === 2);
          return (
            <g key={i}>
              <motion.circle
                cx={gx(i * 5)}
                cy={86}
                initial={false}
                animate={{ r: near ? 8 : 5.5 }}
                transition={spring.ui}
                fill={near ? toneSoft("see") : "var(--node)"}
                stroke={near ? toneVar("see") : toneVar("def")}
                strokeWidth={2}
              />
              <text x={gx(i * 5)} y={114} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: near ? 800 : 650 }} fill={near ? toneVar("see") : "var(--ink-2)"}>
                {(20 + i * 0.05).toFixed(2)}
              </text>
            </g>
          );
        })}
        <Txt x={gx(5)} y={66} size={13} weight={800} tone="see" show={beat === 1} delay={0.35}>
          ✓
        </Txt>
        <Txt x={gx(10)} y={66} size={13} weight={800} tone="see" show={beat === 1} delay={0.35}>
          ✓
        </Txt>
        {/* an off-grid order */}
        <motion.g initial={false} animate={{ opacity: beat === 1 ? 1 : 0, y: beat === 1 ? 0 : -10 }} transition={spring.soft}>
          <line x1={off} x2={off} y1={128} y2={94} stroke={toneVar("prac")} strokeWidth={2} strokeDasharray="3 4" />
          <rect x={off - 50} y={130} width={100} height={26} rx={13} fill={toneSoft("prac")} stroke={toneVar("prac")} strokeWidth={1.5} />
          <text x={off} y={147.5} textAnchor="middle" className="sc-token" fill={toneVar("prac")}>
            ✕ limit 20.07
          </text>
        </motion.g>
        <Txt x={off + 62} y={147.5} size={12.5} weight={700} anchor="start" show={beat === 1} delay={0.3}>
          not a multiple of 0.05
        </Txt>
      </motion.g>

      {/* the same increment as a fraction of price */}
      {[
        { label: "0.05 on a $20 price", v: 0.25, d: 2, y: 168 },
        { label: "0.05 on a $2 price", v: 2.5, d: 1, y: 202 },
      ].map((r) => (
        <g key={r.y}>
          <Txt x={20} y={r.y - 6} anchor="start" size={12.5} weight={700} show={beat === 2}>
            {r.label}
          </Txt>
          <motion.rect
            x={170}
            y={r.y - 18}
            height={16}
            rx={5}
            initial={false}
            animate={{ width: beat === 2 ? Math.max(4, (r.v / 2.5) * 150) : 0, opacity: beat === 2 ? 1 : 0 }}
            transition={spring.fill}
            fill={toneVar("def")}
          />
          <motion.g initial={false} animate={{ opacity: beat === 2 ? 1 : 0 }} transition={fadeT}>
            <Num x={380} y={r.y - 5} anchor="end" size={14} value={beat === 2 ? r.v : 0} format={(v) => `${v.toFixed(r.d)}%`} />
          </motion.g>
        </g>
      ))}
    </Stage>
  );
}

// ── Price clustering, and stepping just above the crowd (p. 91, box) ────────
const CLUSTER = [
  { p: "19.97", n: 1 },
  { p: "19.98", n: 2 },
  { p: "19.99", n: 1 },
  { p: "20.00", n: 7 },
  { p: "20.01", n: 0 },
  { p: "20.02", n: 1 },
  { p: "20.03", n: 0 },
];
const CX0 = 62;
const CSTEP = 46;
const BASE = 196;
const BLOCK = 18;

export function Clustering({ beat }: BeatProps) {
  const youX = CX0 + 4 * CSTEP;
  const youTop = BASE - BLOCK + 3;
  const filled = beat >= 2;
  return (
    <Stage h={232} label="Buy orders cluster on a round number; a clever buyer bids just above it">
      <Txt x={20} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        LIMIT BUY ORDERS AT EACH PRICE
      </Txt>
      <line x1={36} x2={364} y1={BASE + 1} y2={BASE + 1} stroke="var(--line-strong)" strokeWidth={1.5} />
      {CLUSTER.map((c, i) => {
        const x = CX0 + i * CSTEP;
        const round = c.p === "20.00";
        return (
          <g key={c.p}>
            {Array.from({ length: c.n }, (_, k) => (
              <motion.rect
                key={k}
                x={x - 15}
                y={BASE - (k + 1) * BLOCK + 3}
                width={30}
                height={BLOCK - 3}
                rx={4}
                initial={{ opacity: 0 }}
                animate={{ opacity: round && beat >= 1 ? 0.55 : 0.9 }}
                transition={{ duration: 0.25, delay: beat === 0 ? k * 0.05 : 0 }}
                fill={toneVar("bid")}
              />
            ))}
            <text x={x} y={BASE + 18} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: round ? 800 : 600 }} fill={round ? "var(--ink)" : "var(--ink-3)"}>
              {c.p}
            </text>
          </g>
        );
      })}
      <Txt x={CX0 + 3 * CSTEP} y={BASE - 7 * BLOCK - 6} size={12.5} weight={800} tone="bid" show={beat === 0}>
        the crowd
      </Txt>
      {/* your bid, one cent above the round number */}
      <motion.rect
        x={youX - 15}
        y={youTop}
        width={30}
        height={BLOCK - 3}
        rx={4}
        initial={false}
        animate={{ opacity: beat === 0 ? 0 : filled ? 0.35 : 1 }}
        transition={fadeT}
        fill={toneVar("see")}
      />
      <Txt x={youX} y={youTop - 10} size={12.5} weight={800} tone="see" show={beat >= 1}>
        you
      </Txt>
      <Txt x={youX - 14} y={youTop - 32} size={12.5} weight={800} tone="see" show={filled} delay={1.0} anchor="start">
        ✓ trades first
      </Txt>
      <Token from={[372, 48]} to={[youX + 30, youTop - 2]} at={filled ? 1 : 0} show={filled} label="sell" tone="ask" absorb />
    </Stage>
  );
}
