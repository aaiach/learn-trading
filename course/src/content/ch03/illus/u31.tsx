// "See it" scenes for 3.1 Who Are the Players?
import { motion } from "motion/react";
import {
  Banknote,
  Briefcase,
  CalendarClock,
  Dice5,
  Droplets,
  FileText,
  Hourglass,
  Landmark,
  Layers,
  PiggyBank,
  ShieldCheck,
  Store,
  User,
  Users,
  UserRound,
  HeartHandshake,
  Euro,
  DollarSign,
} from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Stage, Token, Txt, Num, between, tokenWidth, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT } from "../../../motion/tokens.ts";
import { signedMoney } from "../../../util.ts";

const box = (x: number, y: number, w = 112, h = 58): Box => ({ x, y, w, h });
const pt = (b: Box): [number, number] => [b.x, b.y];

// ── Proprietary vs agency trading ───────────────────────────────────────────
export function PropVsAgency({ beat }: BeatProps) {
  const row2 = beat >= 2;
  // the proprietary row sits centred until the agency row arrives, then moves up to make room
  const y1 = row2 ? 66 : 116;
  const trader = box(82, y1, 116, 60);
  const market = box(318, y1, 116, 60);
  const client = box(66, 206, 104, 58);
  const broker = box(200, 206, 104, 58);
  const mkt2 = box(334, 206, 104, 58);
  const LANE = client.y - client.h / 2 - 18; // just above the agency row
  const cashW = tokenWidth("cash", true);
  const shW = tokenWidth("shares", true);
  const cash = between(trader, market, -16, 4, cashW / 2 + 4);
  const shares = between(market, trader, -16, 4, shW / 2 + 4);
  return (
    <Stage h={252} label="Proprietary trading versus agency trading">
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        PROPRIETARY TRADING
      </Txt>
      <Node {...trader} icon={User} label="Trader" sub="own account" hl={beat === 1} dim={row2} tone="see" />
      <Node {...market} icon={Users} label="Market" sub="other traders" dim={row2} />
      <Token from={cash[0]} to={cash[1]} at={1} show={!row2} label="cash" icon={Banknote} tone="cash" />
      <Token from={shares[0]} to={shares[1]} at={1} show={!row2} label="shares" icon={Layers} tone="asset" delay={0.15} />
      <Txt x={82} y={y1 + 52} size={12.5} weight={750} tone="good" show={beat === 1} className="halo">
        gains and losses are hers
      </Txt>

      <Txt x={16} y={128} anchor="start" size={11} weight={800} tone="neutral" show={row2} className="caps">
        AGENCY TRADING
      </Txt>
      <Node {...client} icon={UserRound} label="Client" sub={beat >= 3 ? "owns the shares" : "the investor"} show={row2} hl={beat === 3} tone="see" />
      <Node {...broker} icon={Briefcase} label="Broker" sub={beat >= 4 ? "earns a fee" : "an agent"} show={row2} hl={beat === 4} tone="see" />
      <Node {...mkt2} icon={Users} label="Market" sub="other traders" show={row2} />
      <Edge {...edgeProps(client, broker)} show={row2} />
      <Edge {...edgeProps(broker, mkt2)} show={row2} />
      <Token from={[client.x, LANE]} to={[broker.x, LANE]} bend={10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="order" icon={FileText} tone="prac" absorb />
      <Token from={[broker.x, LANE]} to={[mkt2.x, LANE]} bend={10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="order" icon={FileText} tone="prac" absorb delay={0.95} />
      <Token from={[mkt2.x, LANE]} to={[client.x, LANE]} bend={-22} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="shares" icon={Layers} tone="asset" absorb />
      <Token from={[client.x, LANE]} to={[broker.x, LANE]} bend={10} at={beat >= 4 ? 1 : 0} show={beat >= 4} label="fee" icon={Banknote} tone="cash" absorb />
    </Stage>
  );
}

function edgeProps(a: Box, b: Box) {
  const [from, to] = between(a, b, 0, 4);
  return { from, to };
}

// ── Long and short on a price chart ─────────────────────────────────────────
const X0 = 50;
const X1 = 384;
const Y0 = 200;
const Y1 = 34;
const PMIN = 34;
const PMAX = 60;
const TICKS = 24;
const xt = (t: number) => X0 + ((X1 - X0) * t) / TICKS;
const yp = (p: number) => Y0 - ((p - PMIN) / (PMAX - PMIN)) * (Y0 - Y1);

function series(f: (t: number) => number, a: number, b: number) {
  const pts: string[] = [];
  for (let t = a; t <= b + 1e-9; t += 0.5) pts.push(`${xt(t).toFixed(1)},${yp(f(t)).toFixed(1)}`);
  return `M${pts.join(" L")}`;
}

const wig = (t: number) => 0.55 * Math.sin(t * 1.9) + 0.35 * Math.sin(t * 3.7 + 1);
const ramp = (t: number, a: number, b: number, pa: number, pb: number) => pa + ((pb - pa) * (t - a)) / (b - a);

function Axes() {
  return (
    <g>
      {[35, 40, 45, 50, 55, 60].map((p) => (
        <g key={p}>
          <line x1={X0} x2={X1} y1={yp(p)} y2={yp(p)} className="sc-grid" />
          <text x={X0 - 8} y={yp(p) + 4} textAnchor="end" className="sc-tick">
            ${p}
          </text>
        </g>
      ))}
      <line x1={X0} x2={X1} y1={Y0} y2={Y0} className="sc-axis" />
      <text x={X1} y={Y0 + 16} textAnchor="end" className="sc-tick">
        time →
      </text>
    </g>
  );
}

function Seg({ d, show, tone = "ink", dashed }: { d: string; show: boolean; tone?: string; dashed?: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={tone === "ink" ? "var(--ink)" : toneVar(tone as "bad")}
      strokeWidth={2.4}
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeDasharray={dashed ? "5 5" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ pathLength: { duration: 1, ease: EASE_IN_OUT }, opacity: { duration: 0.2 } }}
    />
  );
}

function Marker({ t, p, kind, label, show }: { t: number; p: number; kind: "buy" | "sell"; label: string; show: boolean }) {
  const x = xt(t);
  const y = yp(p);
  const up = kind === "buy";
  const c = up ? "var(--good)" : "var(--bad)";
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.25, delay: show ? 0.2 : 0 }}>
      <circle cx={x} cy={y} r={5} fill={c} stroke="var(--scene-bg)" strokeWidth={2} />
      <path d={up ? `M${x},${y + 10} l-6,10 h12 z` : `M${x},${y - 10} l-6,-10 h12 z`} fill={c} />
      <text x={x} y={up ? y + 36 : y - 26} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 12.5, fontWeight: 800, fill: c }}>
        {label}
      </text>
    </motion.g>
  );
}

function Readout({ pos, pnl, realized, show = true }: { pos: string; pnl: number; realized: boolean; show?: boolean }) {
  const w = pos.length * 8 + 22;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }}>
      <rect x={X0 + 6} y={8} width={w} height={22} rx={11} fill="var(--surface)" stroke="var(--line-strong)" />
      <text x={X0 + 6 + w / 2} y={23} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800, fill: "var(--ink)" }}>
        {pos}
      </text>
      <text x={X1 - 84} y={24} textAnchor="end" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 700, fill: "var(--ink-3)" }}>
        {realized ? "P&L" : "open P&L"}
      </text>
      <Num value={pnl} x={X1} y={25} anchor="end" size={17} format={(v) => signedMoney(Math.round(v))} tone={pnl > 0 ? "good" : pnl < 0 ? "bad" : undefined} />
    </motion.g>
  );
}

const longPrice = (t: number) => (t <= 6 ? 40 + wig(t) * 0.6 - wig(6) * 0.6 * (t / 6) : t <= 18 ? ramp(t, 6, 18, 40, 52) + wig(t) * 0.5 * Math.sin(((t - 6) / 12) * Math.PI) : 52 + wig(t) * 0.5 - wig(18) * 0.5);
const shortPrice = (t: number) => (t <= 6 ? 52 + wig(t) * 0.6 - wig(6) * 0.6 * (t / 6) : t <= 18 ? ramp(t, 6, 18, 52, 40) + wig(t) * 0.5 * Math.sin(((t - 6) / 12) * Math.PI) : 40 + wig(t) * 0.5 - wig(18) * 0.5);
const shortBad = (t: number) => ramp(t, 6, 18, 52, 58) + wig(t + 3) * 0.5 * Math.sin(((t - 6) / 12) * Math.PI);

export function LongChart({ beat }: BeatProps) {
  const pnl = beat === 0 ? 0 : 1200;
  return (
    <Stage h={236} label="Price chart of a long position: buy at 40, sell at 52">
      <Axes />
      <motion.polygon
        points={`${xt(6)},${yp(40)} ${Array.from({ length: 25 }, (_, i) => 6 + i / 2)
          .map((t) => `${xt(t).toFixed(1)},${yp(longPrice(t)).toFixed(1)}`)
          .join(" ")} ${xt(18)},${yp(40)}`}
        fill="var(--good-soft)"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 1 ? 0.9 : 0 }}
        transition={{ duration: 0.5, delay: beat >= 1 ? 0.7 : 0 }}
      />
      <motion.line
        x1={xt(6)}
        x2={xt(beat >= 2 ? 18 : TICKS)}
        y1={yp(40)}
        y2={yp(40)}
        stroke="var(--good)"
        strokeDasharray="4 4"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 0 ? 0.8 : 0 }}
      />
      <Seg d={series(longPrice, 0, 6)} show />
      <Seg d={series(longPrice, 6, 18)} show={beat >= 1} />
      <Seg d={series(longPrice, 18, 24)} show={beat >= 2} />
      <Marker t={6} p={40} kind="buy" label="Buy $40" show />
      <Marker t={18} p={52} kind="sell" label="Sell $52" show={beat >= 2} />
      <Readout pos={beat >= 2 ? "FLAT" : "LONG 100"} pnl={pnl} realized={beat >= 2} />
    </Stage>
  );
}

export function ShortChart({ beat }: BeatProps) {
  const pnl = beat === 0 ? 0 : beat === 3 ? -600 : 1200;
  return (
    <Stage h={236} label="Price chart of a short position: sell at 52, buy back at 40">
      <Axes />
      <motion.polygon
        points={`${xt(6)},${yp(52)} ${Array.from({ length: 25 }, (_, i) => 6 + i / 2)
          .map((t) => `${xt(t).toFixed(1)},${yp(shortPrice(t)).toFixed(1)}`)
          .join(" ")} ${xt(18)},${yp(52)}`}
        fill="var(--good-soft)"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 1 && beat < 3 ? 0.9 : 0 }}
        transition={{ duration: 0.5, delay: beat === 1 ? 0.7 : 0 }}
      />
      <motion.line x1={xt(6)} x2={xt(TICKS)} y1={yp(52)} y2={yp(52)} stroke="var(--bad)" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} />
      <Seg d={series(shortPrice, 0, 6)} show />
      <Seg d={series(shortPrice, 6, 18)} show={beat >= 1 && beat < 3} />
      <Seg d={series(shortPrice, 18, 24)} show={beat === 2} />
      <Seg d={series(shortBad, 6, 18)} show={beat === 3} tone="bad" dashed />
      <Marker t={6} p={52} kind="sell" label="Sell short $52" show />
      <Marker t={18} p={40} kind="buy" label="Buy back $40" show={beat === 2} />
      <Txt x={xt(18)} y={yp(58) - 12} size={12.5} weight={800} tone="bad" show={beat === 3} className="halo">
        price rises to $58
      </Txt>
      <Readout pos={beat === 2 ? "FLAT" : "SHORT 100"} pnl={pnl} realized={beat === 2} />
    </Stage>
  );
}

// ── Buy side and sell side ──────────────────────────────────────────────────
export function BuySellSides({ beat }: BeatProps) {
  const buy = box(92, 118, 132, 76);
  const sell = box(308, 118, 132, 76);
  const top: [[number, number], [number, number]] = [
    [sell.x - 30, sell.y - 44],
    [buy.x + 30, buy.y - 44],
  ];
  const bot: [[number, number], [number, number]] = [
    [buy.x + 30, buy.y + 44],
    [sell.x - 30, sell.y + 44],
  ];
  return (
    <Stage h={236} label="The sell side sells liquidity to the buy side, which pays for it">
      <Node {...buy} icon={Users} label="Buy side" sub="investors, hedgers…" tone="def" hl={beat === 1 || beat === 2} />
      <Node {...sell} icon={Store} label="Sell side" sub="dealers, brokers" tone="def" hl={beat === 1 || beat === 2} />
      <Edge from={top[0]} to={top[1]} bend={22} tone="see" show={beat >= 1} label="liquidity" labelDy={-10} />
      <Token from={top[0]} to={top[1]} bend={22} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="liquidity" icon={Droplets} tone="see" absorb />
      <Edge from={bot[0]} to={bot[1]} bend={22} tone="cash" show={beat >= 2} label="pays a price" labelDy={20} />
      <Token from={bot[0]} to={bot[1]} bend={22} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="$" icon={Banknote} tone="cash" absorb />
      <Edge from={[buy.x + 72, buy.y - 8]} to={[sell.x - 72, sell.y - 8]} tone="neutral" show={beat >= 3} />
      <Edge from={[sell.x - 72, sell.y + 8]} to={[buy.x + 72, buy.y + 8]} tone="neutral" show={beat >= 3} />
      <Txt x={200} y={buy.y + 30} size={11.5} weight={750} tone="neutral" show={beat >= 3} className="halo">
        both buy & sell
      </Txt>
      <Txt x={200} y={buy.y + 44} size={11.5} weight={750} tone="neutral" show={beat >= 3} className="halo">
        securities
      </Txt>
    </Stage>
  );
}

// ── Table 3-1: why the buy side trades ──────────────────────────────────────
export function BuySideTypes({ beat }: BeatProps) {
  const today = box(88, 158, 112, 56);
  const future = box(312, 158, 112, 56);
  const types = [
    { name: "Investors", why: "move wealth from the present to the future" },
    { name: "Borrowers", why: "move wealth from the future to the present" },
    { name: "Hedgers", why: "reduce business operating risk" },
    { name: "Asset exchangers", why: "acquire an asset they value more" },
    { name: "Gamblers", why: "entertain themselves" },
  ];
  const zig = "M60,150 L100,120 L140,180 L180,110 L220,190 L260,125 L300,170 L340,140";
  const flat = "M60,150 L100,150 L140,150 L180,150 L220,150 L260,150 L300,150 L340,150";
  const usd = box(96, 158, 104, 54);
  const eur = box(304, 158, 104, 54);
  return (
    <Stage h={236} label="Why each type of buy-side trader trades (Table 3-1)">
      {types.map((t, i) => (
        <g key={t.name}>
          <Txt x={200} y={40} size={20} weight={800} show={beat === i}>
            {t.name}
          </Txt>
          <Txt x={200} y={66} size={13.5} weight={600} tone="neutral" show={beat === i}>
            {`to ${t.why}`}
          </Txt>
        </g>
      ))}
      {/* Investors and borrowers share a timeline */}
      <Node {...today} icon={CalendarClock} label="Today" sub={beat === 1 ? "spend now" : "income now"} show={beat <= 1} hl={beat === 1} tone="def" />
      <Node {...future} icon={Hourglass} label="Future" sub={beat === 1 ? "repay later" : "spend later"} show={beat <= 1} hl={beat === 0} tone="def" />
      <Edge {...edgeProps(today, future)} show={beat <= 1} tone="neutral" dashed label="time" labelDy={-10} />
      <Token from={[today.x, today.y - 46]} to={[future.x, future.y - 46]} bend={-10} at={beat >= 0 ? 1 : 0} show={beat === 0} label="wealth" icon={PiggyBank} tone="cash" />
      <Token from={[future.x, future.y - 46]} to={[today.x, today.y - 46]} bend={10} at={beat >= 1 ? 1 : 0} show={beat === 1} label="wealth" icon={PiggyBank} tone="cash" />
      {/* Hedgers: risk flattens */}
      <motion.path
        d={beat >= 2 ? flat : zig}
        fill="none"
        stroke={beat >= 2 ? "var(--good)" : "var(--bad)"}
        strokeWidth={2.6}
        strokeLinejoin="round"
        initial={{ opacity: 0, d: zig }}
        animate={{ opacity: beat === 2 ? 1 : 0, d: beat >= 2 ? flat : zig }}
        transition={{ d: { duration: 1, ease: EASE_IN_OUT, delay: 0.4 }, opacity: { duration: 0.25 } }}
      />
      <Node x={372} y={150} w={56} h={50} icon={ShieldCheck} label="" show={beat === 2} tone="good" hl />
      <Txt x={200} y={214} size={12} weight={700} tone="neutral" show={beat === 2}>
        futures · forwards · swaps
      </Txt>
      {/* Asset exchangers: a simultaneous swap */}
      <Node {...usd} icon={DollarSign} label="Dollars" show={beat === 3} />
      <Node {...eur} icon={Euro} label="Euros" show={beat === 3} />
      <Token from={[usd.x + 30, usd.y - 42]} to={[eur.x - 30, eur.y - 42]} bend={-8} at={beat >= 3 ? 1 : 0} show={beat === 3} label="$" tone="cash" absorb />
      <Token from={[eur.x - 30, eur.y + 42]} to={[usd.x + 30, usd.y + 42]} bend={-8} at={beat >= 3 ? 1 : 0} show={beat === 3} label="€" tone="asset" absorb />
      {/* Gamblers */}
      <Node x={200} y={152} w={120} h={70} icon={Dice5} label="A bet" sub="for fun" show={beat === 4} tone="game" hl />
    </Stage>
  );
}

// ── Sponsor → adviser → buy-side trader ─────────────────────────────────────
export function BuySideChain({ beat }: BeatProps) {
  const sponsor = box(100, 50, 132, 56);
  const benef = box(300, 50, 132, 56);
  const adviser = box(100, 142, 132, 56);
  const trader = box(100, 234, 132, 56);
  const broker = box(300, 234, 132, 56);
  const e = (a: Box, b: Box) => between(a, b, 0, 4);
  return (
    <Stage h={272} label="Who works for whom on the buy side">
      <Token from={[sponsor.x, -20]} to={[sponsor.x, sponsor.y - 34]} at={1} show={beat === 0} label="funds" icon={Banknote} tone="cash" absorb />
      <Node {...sponsor} icon={Landmark} label="Sponsor" sub="pension fund, trust…" hl={beat === 0} tone="def" />
      <Node {...adviser} icon={Briefcase} label="Adviser" sub="portfolio manager" show={beat >= 1} hl={beat === 1} tone="def" />
      <Edge from={e(sponsor, adviser)[0]} to={e(sponsor, adviser)[1]} show={beat >= 1} label="hires" labelAt={0.5} labelDy={4} />
      <Node {...trader} icon={User} label="Buy-side trader" sub="works for the adviser" show={beat >= 2} hl={beat === 2} tone="def" />
      <Edge from={e(adviser, trader)[0]} to={e(adviser, trader)[1]} show={beat >= 2} label="employs" labelDy={4} />
      <Token from={[adviser.x + 74, adviser.y]} to={[trader.x + 74, trader.y - 20]} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="buy 30,000" icon={FileText} tone="prac" absorb />
      <Node {...broker} icon={Store} label="Broker" sub="arranges the trade" show={beat >= 3} hl={beat === 3} tone="def" />
      <Edge from={e(trader, broker)[0]} to={e(trader, broker)[1]} show={beat >= 3} label="order" labelDy={-8} />
      <Token from={e(trader, broker)[0]} to={e(trader, broker)[1]} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="order" icon={FileText} tone="prac" absorb />
      <Node {...benef} icon={HeartHandshake} label="Beneficiaries" sub="ultimately benefit" show={beat >= 4} hl={beat === 4} tone="def" />
      <Edge from={e(sponsor, benef)[0]} to={e(sponsor, benef)[1]} show={beat >= 4} dashed label="for" labelDy={-8} />
    </Stage>
  );
}

// ── Dealer vs broker ────────────────────────────────────────────────────────
export function DealerVsBroker({ beat }: BeatProps) {
  const a = box(64, 132, 100, 58);
  const mid = box(200, 132, 104, 62);
  const b = box(336, 132, 100, 58);
  const dealer = beat <= 1;
  const TOP = a.y - a.h / 2 - 18;
  const BOT = a.y + a.h / 2 + 18;
  return (
    <Stage h={236} label="A dealer trades with clients; a broker finds them a counterpart">
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" show={dealer} className="caps">
        DEALER · TRADES WITH YOU
      </Txt>
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" show={!dealer} className="caps">
        BROKER · FINDS SOMEONE FOR YOU
      </Txt>
      <Txt x={384} y={226} anchor="end" size={10.5} weight={600} tone="neutral">
        illustrative prices
      </Txt>
      <Node {...a} icon={UserRound} label="Seller A" sub="wants to sell" />
      <Node {...b} icon={UserRound} label="Buyer B" sub="wants to buy" />
      <Node {...mid} icon={Store} label="Dealer" sub={beat === 0 ? "inventory 100" : "inventory 0"} show={dealer} hl tone="see" />
      <Node {...mid} icon={Briefcase} label="Broker" sub={beat >= 3 ? "earns fees" : "an agent"} show={!dealer} hl tone="see" />
      {/* Dealer: two separate trades; in each, shares go over the top and cash underneath at the same time */}
      <Token from={[a.x, TOP]} to={[mid.x, TOP]} bend={8} at={1} show={beat === 0} label="100 sh" icon={Layers} tone="asset" absorb />
      <Token from={[mid.x, BOT]} to={[a.x, BOT]} bend={8} at={1} show={beat === 0} label="$20.00" tone="cash" absorb />
      <Token from={[mid.x, TOP]} to={[b.x, TOP]} bend={8} at={beat >= 1 ? 1 : 0} show={beat === 1} label="100 sh" icon={Layers} tone="asset" absorb />
      <Token from={[b.x, BOT]} to={[mid.x, BOT]} bend={8} at={beat >= 1 ? 1 : 0} show={beat === 1} label="$20.10" tone="cash" absorb />
      <Txt x={200} y={56} size={13} weight={800} tone="good" show={beat === 1} delay={1.1} className="halo">
        keeps $0.10 a share
      </Txt>
      {/* Broker: one trade, straight between the clients, over and under the broker */}
      <Token from={[a.x, TOP]} to={[b.x, TOP]} bend={20} at={beat >= 2 ? 1 : 0} show={beat === 2} label="100 sh" icon={Layers} tone="asset" absorb />
      <Token from={[b.x, BOT]} to={[a.x, BOT]} bend={20} at={beat >= 2 ? 1 : 0} show={beat === 2} label="$20.05" tone="cash" absorb />
      <Token from={[a.x, TOP]} to={[mid.x, TOP]} bend={8} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="fee" tone="cash" absorb />
      <Token from={[b.x, TOP]} to={[mid.x, TOP]} bend={-8} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="fee" tone="cash" absorb />
      <Txt x={200} y={56} size={13} weight={800} tone="good" show={beat === 3} delay={1} className="halo">
        commission from each client
      </Txt>
    </Stage>
  );
}

export { pt };
