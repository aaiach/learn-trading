// "See it" scenes for 3.2 Trade Facilitators
import { Banknote, Briefcase, Building2, FileText, Landmark, Layers, MonitorSmartphone, Network, Cpu, Store, Scale, ShieldCheck, ShieldAlert, Gem, Archive, PiggyBank, User, UserRound, Users, UserCog } from "lucide-react";
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { type Box, Edge, Node, Num, Stage, Token, Txt, between } from "../../../scene/index.tsx";

const box = (x: number, y: number, w = 112, h = 56): Box => ({ x, y, w, h });
const edge = (a: Box, b: Box, offset = 0) => {
  const [from, to] = between(a, b, offset, 4);
  return { from, to };
};
/** Centre-to-centre flight for tokens that are absorbed on arrival (reads better than a short hop across a gap). */
const fly = (a: Box, b: Box, dx = 0, dy = 0) => ({ from: [a.x + dx, a.y + dy] as const, to: [b.x + dx, b.y + dy] as const });

// ── 3.2.1 An exchange is a forum ────────────────────────────────────────────
export function ExchangeForum({ beat }: BeatProps) {
  const ex = box(200, 124, 132, 70);
  const dealer = box(68, 46, 116, 54);
  const broker = box(332, 46, 116, 54);
  const buyside = box(68, 204, 116, 54);
  const nonmember = box(332, 204, 116, 54);
  const matching = beat >= 3;
  return (
    <Stage h={244} label="An exchange is a forum where members meet to arrange trades">
      <Edge {...edge(dealer, ex)} show tone="neutral" arrow={false} />
      <Edge {...edge(broker, ex)} show tone="neutral" arrow={false} />
      <Edge {...edge(buyside, ex)} show tone="neutral" arrow={false} />
      <Edge {...edge(nonmember, broker)} show={beat >= 1} dashed tone="prac" label="asks a member" labelDy={4} />
      <Node {...ex} icon={Building2} label="Exchange" sub="trading floor" show={beat <= 1} hl tone="see" />
      <Node {...ex} icon={MonitorSmartphone} label="Exchange" sub={matching ? "matches orders" : "electronic network"} show={beat >= 2} hl tone="see" />
      <Node {...dealer} icon={Store} label="Dealer" sub="member" dim={beat === 1 || matching} />
      <Node {...broker} icon={Briefcase} label="Broker" sub="member-broker" hl={beat === 1} tone="see" dim={matching} />
      <Node {...buyside} icon={User} label="Buy-side" sub="member" dim={beat === 1} />
      <Node {...nonmember} icon={UserRound} label="Nonmember" sub="can't trade here" show={beat >= 1} dim={beat !== 1} />
      <Token {...fly(nonmember, broker)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="order" icon={FileText} tone="prac" absorb />
      <Token {...fly(broker, ex)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="order" icon={FileText} tone="prac" absorb delay={1.1} />
      <Token {...fly(buyside, ex)} at={matching ? 1 : 0} show={matching} label="buy 100" tone="good" absorb />
      <Token {...fly(dealer, ex)} at={matching ? 1 : 0} show={matching} label="sell 100" tone="bad" absorb />
      <Txt x={200} y={180} size={12.5} weight={800} tone="see" show={matching} delay={1.1} className="halo">
        matched by the rules
      </Txt>
    </Stage>
  );
}

// ── 3.2.1 Who owns the exchange, and trading away from it ───────────────────
export function ExchangeOwnership({ beat }: BeatProps) {
  const ex = box(200, 124, 136, 64);
  const m = [box(76, 38, 100, 44), box(200, 38, 100, 44), box(324, 38, 100, 44)];
  const ecn = box(70, 206, 116, 50);
  const brokerage = box(330, 206, 116, 50);
  const holders = box(106, 40, 132, 58);
  const mgmt = box(294, 40, 132, 58);
  const dealer = box(92, 124, 120, 60);
  const client = box(308, 124, 120, 60);
  const TOP = dealer.y - dealer.h / 2 - 18;
  const BOT = dealer.y + dealer.h / 2 + 18;
  const otc = beat >= 3;
  return (
    <Stage h={240} label="From member-owned exchanges to corporate ownership, and trading over the counter">
      {m.map((b, i) => (
        <g key={i}>
          <Node {...b} icon={Users} label="Members" show={beat <= 1} dim={beat === 1} />
          <Edge {...edge(b, ex)} show={beat <= 1} dashed tone="neutral" label={i === 1 ? "own & control" : undefined} labelDy={4} />
        </g>
      ))}
      <Node {...ex} icon={Building2} label="Exchange" sub={beat === 0 ? "member-owned" : beat === 1 ? "slow to innovate" : "corporate"} show={!otc} hl={beat !== 1} tone="see" />
      <Node {...ecn} icon={Network} label="ECNs" sub="order-driven" show={beat === 1} hl tone="prac" />
      <Node {...brokerage} icon={Briefcase} label="Brokerages" sub="arrange trades" show={beat === 1} hl tone="prac" />
      <Edge {...edge(ecn, ex)} show={beat === 1} dashed tone="prac" arrow={false} />
      <Txt x={200} y={204} size={12} weight={800} tone="prac" show={beat === 1} delay={0.4}>
        compete
      </Txt>
      <Edge {...edge(brokerage, ex)} show={beat === 1} dashed tone="prac" arrow={false} />
      <Node {...holders} icon={Landmark} label="Shareholders" sub="own it" show={beat === 2} hl tone="def" />
      <Node {...mgmt} icon={UserCog} label="Management" sub="runs it" show={beat === 2} hl tone="def" />
      <Edge {...edge(holders, ex)} show={beat === 2} tone="def" />
      <Edge {...edge(mgmt, ex)} show={beat === 2} tone="def" />
      <Txt x={200} y={214} size={12} weight={700} tone="neutral" show={beat === 2} delay={0.4}>
        Nasdaq · CME · Stockholm · Toronto · Deutsche Börse
      </Txt>
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" show={otc} className="caps">
        OVER THE COUNTER · NO EXCHANGE
      </Txt>
      <Node {...dealer} icon={Store} label="Dealer" sub="bond dealer" show={otc} hl tone="see" />
      <Node {...client} icon={UserRound} label="Client" sub="buys a bond" show={otc} />
      <Edge {...edge(dealer, client)} show={otc} dashed tone="neutral" arrow={false} label="phone" labelDy={-6} />
      <Token from={[dealer.x, TOP]} to={[client.x, TOP]} bend={10} at={otc ? 1 : 0} show={otc} label="bond" icon={Layers} tone="asset" absorb />
      <Token from={[client.x, BOT]} to={[dealer.x, BOT]} bend={10} at={otc ? 1 : 0} show={otc} label="cash" icon={Banknote} tone="cash" absorb />
    </Stage>
  );
}

// ── 3.2.2.1 Clearing: compare the two records ───────────────────────────────
type Row = { label: string; value: string; alt?: string };

function Ticket({ x, y, title, rows, show, dim, side, altOn }: { x: number; y: number; title: string; rows: Row[]; show: boolean; dim?: boolean; side: 1 | -1; altOn?: boolean }) {
  const w = 148;
  const h = 132;
  return (
    <motion.g
      initial={{ opacity: 0, x: side * 30 }}
      animate={{ opacity: show ? (dim ? 0.3 : 1) : 0, x: show ? 0 : side * 30 }}
      transition={{ ...spring.soft, opacity: { duration: 0.3 } }}
    >
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={12} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <text x={x} y={y - h / 2 + 20} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800, fill: "var(--ink-3)" }}>
        {title}
      </text>
      {rows.map((r, i) => {
        const ry = y - h / 2 + 46 + i * 24;
        return (
          <g key={r.label}>
            <text x={x - w / 2 + 12} y={ry} className="sc-txt" style={{ fontSize: 11.5, fontWeight: 600, fill: "var(--ink-3)" }}>
              {r.label}
            </text>
            <motion.text
              x={x + w / 2 - 12}
              y={ry}
              textAnchor="end"
              className="sc-txt"
              style={{ fontSize: 12.5, fontWeight: 800, fill: "var(--ink)" }}
              animate={{ opacity: r.alt && altOn ? 0 : 1 }}
            >
              {r.value}
            </motion.text>
            {r.alt && (
              <motion.text
                x={x + w / 2 - 12}
                y={ry}
                textAnchor="end"
                className="sc-txt"
                style={{ fontSize: 12.5, fontWeight: 800, fill: "var(--bad)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: altOn ? 1 : 0 }}
              >
                {r.alt}
              </motion.text>
            )}
          </g>
        );
      })}
    </motion.g>
  );
}

function Mark({ x, y, ok, show, delay }: { x: number; y: number; ok: boolean; show: boolean; delay: number }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.2, delay: show ? delay : 0 }}>
      <circle cx={x} cy={y} r={10} fill={ok ? "var(--good)" : "var(--bad)"} />
      {ok ? (
        <path d={`M${x - 4.5},${y + 0.5} l3,3 l6,-6.5`} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d={`M${x - 4},${y - 4} l8,8 M${x + 4},${y - 4} l-8,8`} fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
      )}
    </motion.g>
  );
}

function Badge({ x, y, text, tone, show, delay = 0 }: { x: number; y: number; text: string; tone: "good" | "bad"; show: boolean; delay?: number }) {
  const w = text.length * 7.6 + 28;
  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 6 }}
      transition={{ duration: 0.3, ease: EASE_OUT, delay: show ? delay : 0 }}
    >
      <rect x={x - w / 2} y={y - 14} width={w} height={28} rx={14} fill={`var(--${tone}-soft)`} stroke={`var(--${tone})`} strokeWidth={1.5} />
      <text x={x} y={y + 4.5} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 12, fontWeight: 800, fill: `var(--${tone}-ink)` }}>
        {text}
      </text>
    </motion.g>
  );
}

export function ClearingMatch({ beat }: BeatProps) {
  const ty = 140;
  const buyer: Row[] = [
    { label: "Bought", value: "XYZ" },
    { label: "Shares", value: "1,000" },
    { label: "Price", value: "$20.10" },
    { label: "From", value: "Dealer D" },
  ];
  const seller: Row[] = [
    { label: "Sold", value: "XYZ" },
    { label: "Shares", value: "1,000" },
    { label: "Price", value: "$20.10", alt: "$20.01" },
    { label: "To", value: "Broker B" },
  ];
  const auto = beat >= 4;
  const compare = beat >= 2 && !auto;
  const mismatch = beat === 3;
  const agent = box(200, 30, 180, 42);
  const sys = box(200, 92, 190, 60);
  const recA = box(108, 196, 150, 44);
  const recB = box(292, 196, 150, 44);
  return (
    <Stage h={250} label="A clearing agent compares the buyer's and the seller's records">
      <Txt x={384} y={244} anchor="end" size={10.5} weight={600} tone="neutral">
        illustrative trade
      </Txt>
      <Node {...agent} label="Clearing agent" sub="e.g. NSCC" show={beat >= 1 && !auto} hl tone="see" />
      <Edge from={[88, ty - 70]} to={[agent.x - 60, agent.y + 24]} bend={-10} show={beat >= 1 && !auto} tone="see" />
      <Edge from={[312, ty - 70]} to={[agent.x + 60, agent.y + 24]} bend={10} show={beat >= 1 && !auto} tone="see" />
      <Ticket x={88} y={ty} title="Buyer's record" rows={buyer} show={!auto} side={-1} />
      <Ticket x={312} y={ty} title="Seller's record" rows={seller} show={!auto} side={1} altOn={mismatch} />
      {buyer.map((_, i) => (
        <Mark key={i} x={200} y={ty - 66 + 46 + i * 24 - 4} ok={!(mismatch && i === 2)} show={compare} delay={mismatch ? 0.2 : 0.3 + i * 0.25} />
      ))}
      <Badge x={200} y={ty + 84} text="Cleared" tone="good" show={beat === 2} delay={1.4} />
      <Badge x={200} y={ty + 84} text="DK · out-trade" tone="bad" show={mismatch} delay={0.6} />
      <Node {...sys} icon={Cpu} label="Order-matching system" sub="writes both sides" show={auto} hl tone="see" />
      <Node {...recA} label="Buyer: XYZ 1,000" sub="@ $20.10" show={auto} />
      <Node {...recB} label="Seller: XYZ 1,000" sub="@ $20.10" show={auto} />
      <Edge {...edge(sys, recA)} show={auto} tone="see" />
      <Edge {...edge(sys, recB)} show={auto} tone="see" />
      <Badge x={200} y={238} text="Always matched" tone="good" show={auto} delay={0.9} />
    </Stage>
  );
}

// ── 3.2.2.2 A settlement agent swaps cash for securities ────────────────────
export function SettlementAgent({ beat }: BeatProps) {
  const buyer = box(58, 108, 100, 58);
  const agent = box(200, 108, 144, 62);
  const seller = box(342, 108, 100, 58);
  const TOP = buyer.y - 29 - 20;
  const BOT = buyer.y + 29 + 20;
  return (
    <Stage h={196} label="A settlement agent collects cash and securities, then swaps them">
      <Node {...buyer} icon={UserRound} label="Buyer" sub={beat >= 2 ? "gets the shares" : "owes cash"} hl={beat === 2} tone="good" />
      <Node {...agent} icon={Scale} label="Settlement agent" sub={beat === 0 ? "collects" : beat === 1 ? "holds both" : "delivers"} hl tone="see" />
      <Node {...seller} icon={Store} label="Seller" sub={beat >= 2 ? "gets the cash" : "owes shares"} hl={beat === 2} tone="good" />
      {/* both sides perform at once */}
      <Token from={[buyer.x, TOP]} to={[agent.x, TOP]} bend={10} at={1} show={beat === 0} label="cash" icon={Banknote} tone="cash" absorb />
      <Token from={[seller.x, TOP]} to={[agent.x, TOP]} bend={-10} at={1} show={beat === 0} label="shares" icon={Layers} tone="asset" absorb />
      {/* held until both have performed */}
      <Token from={[agent.x - 40, BOT]} to={[agent.x - 40, BOT]} at={1} show={beat === 1} label="cash" icon={Banknote} tone="cash" delay={0.15} />
      <Token from={[agent.x + 44, BOT]} to={[agent.x + 44, BOT]} at={1} show={beat === 1} label="shares" icon={Layers} tone="asset" delay={0.3} />
      <Txt x={200} y={36} size={12.5} weight={800} tone="good" show={beat === 1} delay={0.5} className="halo">
        both sides have performed
      </Txt>
      {/* then the swap, also at once */}
      <Token from={[agent.x, BOT]} to={[seller.x, BOT]} bend={-10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="cash" icon={Banknote} tone="cash" absorb />
      <Token from={[agent.x, BOT]} to={[buyer.x, BOT]} bend={10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="shares" icon={Layers} tone="asset" absorb />
    </Stage>
  );
}

// ── 3.2.2.2 Net settlement: many trades, one position ───────────────────────
export function NetSettlement({ beat }: BeatProps) {
  const rows = [
    { text: "Buy 500 XYZ @ $20.00", sh: "+500", cash: "−$10,000" },
    { text: "Sell 200 XYZ @ $21.00", sh: "−200", cash: "+$4,200" },
    { text: "Buy 100 XYZ @ $20.50", sh: "+100", cash: "−$2,050" },
  ];
  const SX = 238;
  const MX = 336;
  const rowY = (i: number) => 66 + i * 36;
  const NET = 194;
  const agent = box(300, 244, 168, 40);
  const net = beat >= 3;
  return (
    <Stage h={272} label="Net settlement turns three trades into one share position and one money position">
      <Txt x={20} y={34} anchor="start" size={10.5} weight={800} tone="neutral" className="caps">TRADE</Txt>
      <Txt x={SX} y={34} size={10.5} weight={800} tone="neutral" className="caps">SHARES</Txt>
      <Txt x={MX} y={34} size={10.5} weight={800} tone="neutral" className="caps">MONEY</Txt>
      {rows.map((r, i) => (
        <g key={r.text}>
          <Txt x={20} y={rowY(i) + 5} anchor="start" size={13} weight={650}>
            {r.text}
          </Txt>
          <Token from={[SX, rowY(i)]} to={[SX, NET]} at={beat >= 1 ? 1 : 0} label={r.sh} tone="asset" absorb delay={i * 0.12} />
          <Token from={[MX, rowY(i)]} to={[MX, NET]} at={beat >= 2 ? 1 : 0} label={r.cash} tone="cash" absorb delay={i * 0.12} />
        </g>
      ))}
      <line x1={16} x2={384} y1={166} y2={166} stroke="var(--line-strong)" />
      <Txt x={20} y={NET + 5} anchor="start" size={13} weight={800}>
        Net for the day
      </Txt>
      <Token from={[SX, NET]} to={[SX, NET]} at={1} show={beat >= 1} label="+400" icon={Layers} tone="asset" delay={beat === 1 ? 1 : 0} />
      <Token from={[MX, NET]} to={[MX, NET]} at={1} show={beat >= 2} label="−$7,850" icon={Banknote} tone="cash" delay={beat === 2 ? 1 : 0} />
      <Txt x={20} y={250} anchor="start" size={12.5} weight={800} tone={net ? "good" : "bad"} className="halo">
        {net ? "2 transfers" : "6 transfers"}
      </Txt>
      <Txt x={20} y={264} anchor="start" size={10.5} weight={600} tone="neutral">
        {net ? "one delivery, one payment" : "3 deliveries + 3 payments"}
      </Txt>
      <Node {...agent} label="Settlement agent" show={net} hl tone="see" />
      <Token from={[SX, NET]} to={[agent.x - 40, agent.y]} at={net ? 1 : 0} show={net} label="+400" icon={Layers} tone="asset" absorb />
      <Token from={[MX, NET]} to={[agent.x + 40, agent.y]} at={net ? 1 : 0} show={net} label="−$7,850" icon={Banknote} tone="cash" absorb delay={0.15} />
      <Txt x={384} y={16} anchor="end" size={10.5} weight={600} tone="neutral">
        illustrative trades
      </Txt>
    </Stage>
  );
}

// ── 3.2.2.2 When does a trade settle? ───────────────────────────────────────
function Pin({ x, y, up, label, sub, tone, show, dim, dashed }: { x: number; y: number; up: boolean; label: string; sub?: string; tone: string; show: boolean; dim?: boolean; dashed?: boolean }) {
  const c = `var(--${tone})`;
  const ty = up ? y - 34 : y + 44;
  return (
    <motion.g
      initial={{ opacity: 0, x }}
      animate={{ opacity: show ? (dim ? 0.3 : 1) : 0, x }}
      transition={{ x: spring.travel, opacity: { duration: 0.3 } }}
    >
      <line x1={0} x2={0} y1={y} y2={up ? y - 20 : y} stroke={c} strokeWidth={2} strokeDasharray={dashed ? "3 3" : undefined} />
      <circle cx={0} cy={y} r={6} fill={dashed ? "var(--scene-bg)" : c} stroke={c} strokeWidth={2} />
      <text x={0} y={ty} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 12.5, fontWeight: 800, fill: c }}>
        {label}
      </text>
      {sub && (
        <text x={0} y={ty + 14} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 10.5, fontWeight: 650, fill: "var(--ink-3)" }}>
          {sub}
        </text>
      )}
    </motion.g>
  );
}

export function SettleTimeline({ beat }: BeatProps) {
  const AX = 118;
  const dx = (d: number) => 50 + d * 60;
  const hist = beat >= 3;
  return (
    <Stage h={200} label="Normal-way settlement is three business days after the trade; cash settlement is the same day">
      <line x1={30} x2={386} y1={AX} y2={AX} stroke="var(--line-strong)" strokeWidth={2} />
      {[0, 1, 2, 3, 4, 5].map((d) => (
        <g key={d}>
          <line x1={dx(d)} x2={dx(d)} y1={AX - 5} y2={AX + 5} stroke="var(--line-strong)" strokeWidth={2} />
          <text x={dx(d)} y={AX + 22} textAnchor="middle" className="sc-tick" style={{ fontSize: 12, fontWeight: 700 }}>
            {d === 0 ? "T" : `T+${d}`}
          </text>
        </g>
      ))}
      <Txt x={386} y={AX + 42} anchor="end" size={10.5} weight={600} tone="neutral">
        business days after the trade
      </Txt>
      <Pin x={dx(0)} y={AX} up label="trade" sub="terms agreed" tone="ink" show={!hist} dim={beat === 2} />
      {/* normal-way settlement slides from the trade date to T+3 */}
      <Pin x={beat >= 1 ? dx(3) : dx(0)} y={AX} up label="normal-way" sub="T+3" tone="see" show={beat >= 1 && !hist} dim={beat === 2} />
      <motion.path
        d={`M${dx(0)},${AX - 58} L${dx(3)},${AX - 58}`}
        stroke="var(--see)"
        strokeWidth={1.5}
        strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: beat === 1 ? 1 : 0, opacity: beat === 1 ? 1 : 0 }}
        transition={{ duration: 0.8, delay: beat === 1 ? 0.4 : 0 }}
      />
      <Txt x={(dx(0) + dx(3)) / 2} y={AX - 64} size={11.5} weight={750} tone="see" show={beat === 1} delay={0.8} className="halo">
        3 business days
      </Txt>
      <Pin x={dx(0)} y={AX} up={false} label="cash settlement" sub="same day" tone="prac" show={beat === 2} />
      {/* history from the box */}
      <Pin x={dx(5)} y={AX} up label="T+5" sub="until June 1995" tone="today" show={hist} />
      <Pin x={dx(3)} y={AX} up label="T+3" sub="in the book" tone="see" show={hist} />
      <Pin x={dx(1)} y={AX} up label="T+1" sub="planned, June 2005" tone="def" show={hist} dashed />
    </Stage>
  );
}

// ── 3.2.2.3 The clearinghouse: buyer to every seller, seller to every buyer ─
export function ClearinghouseHub({ beat }: BeatProps) {
  const buyer = box(58, 124, 100, 58);
  const ch = box(200, 124, 116, 66);
  const seller = box(342, 124, 100, 58);
  const extras = [box(58, 38, 100, 46), box(58, 210, 100, 46), box(342, 38, 100, 46), box(342, 210, 100, 46)];
  const member = box(330, 214, 128, 58);
  const direct = beat === 0;
  const hub = beat >= 1;
  const fail = beat >= 3;
  const TOP = buyer.y - 29 - 18;
  return (
    <Stage h={256} label="A clearinghouse becomes the counterparty to every trader">
      <Edge {...edge(buyer, seller)} show={direct} tone="neutral" arrow={false} label="one contract" labelDy={-10} />
      <Txt x={200} y={176} size={12} weight={700} tone="neutral" show={direct} delay={0.4}>
        each side must trust the other
      </Txt>
      <Edge {...edge(buyer, ch)} show={hub} tone="see" arrow={false} />
      <Edge {...edge(ch, seller)} show={hub} tone="see" arrow={false} />
      {extras.map((b, i) => (
        <g key={i}>
          <Node {...b} icon={UserRound} label={i < 2 ? "Buyer" : "Seller"} show={beat === 2} />
          <Edge {...edge(b, ch)} show={beat === 2} tone="see" arrow={false} />
        </g>
      ))}
      <Node {...buyer} icon={UserRound} label="Buyer" sub="long" />
      <Node {...seller} icon={UserRound} label="Seller" sub={fail ? "fails to settle" : "short"} hl={fail} tone="bad" />
      <Node {...ch} icon={ShieldCheck} label="Clearinghouse" sub="issuer & guarantor" show={hub} hl tone="see" />
      <Txt x={110} y={72} size={11.5} weight={750} tone="see" show={beat === 1} delay={0.5} className="halo">
        seller to the buyer
      </Txt>
      <Txt x={290} y={72} size={11.5} weight={750} tone="see" show={beat === 1} delay={0.5} className="halo">
        buyer to the seller
      </Txt>
      <Node {...member} icon={ShieldAlert} label="Clearing member" sub="guarantees" show={fail} hl tone="prac" />
      <Token from={[member.x, member.y]} to={[ch.x, ch.y]} at={fail ? 1 : 0} show={fail} label="settles" icon={Banknote} tone="cash" absorb />
      <Token from={[ch.x, TOP]} to={[buyer.x, TOP]} bend={10} at={fail ? 1 : 0} show={fail} label="performs" tone="see" absorb delay={1.1} />
      <Txt x={16} y={244} anchor="start" size={11} weight={700} tone="neutral" show={fail} delay={1.4}>
        member fails too? other members pay
      </Txt>
    </Stage>
  );
}

// ── Variation margin: Brad and Sharon (box, p. 42) ──────────────────────────
export function VariationMargin({ beat }: BeatProps) {
  const brad = box(62, 132, 108, 60);
  const ch = box(200, 132, 120, 64);
  const sharon = box(338, 132, 108, 60);
  const TOP = brad.y - 30 - 18;
  const BOT = brad.y + 30 + 18;
  const price = beat >= 1 ? 4.55 : 4.5;
  const paid = beat >= 2;
  const expiry = beat >= 3;
  const money = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "") + "$" + Math.abs(Math.round(v)).toLocaleString("en-US");
  return (
    <Stage h={258} label="Variation margin: after silver rises 5 cents, Sharon pays $250 and Brad receives $250 at the same time">
      <Txt x={200} y={24} size={10.5} weight={800} tone="neutral" className="caps">
        SILVER FUTURES · 5,000 OZ
      </Txt>
      <Num value={price} x={200} y={52} size={22} format={(v) => `$${v.toFixed(2)}`} />
      <Txt x={262} y={50} anchor="start" size={13} weight={800} tone="good" show={beat >= 1}>
        +5¢
      </Txt>
      <Edge {...edge(brad, ch)} show tone="neutral" arrow={false} />
      <Edge {...edge(ch, sharon)} show tone="neutral" arrow={false} />
      <Node {...brad} icon={UserRound} label="Brad" sub="bought · long" hl={beat === 2 || beat === 4} tone="good" dim={beat === 1} />
      <Node {...ch} icon={ShieldCheck} label="Clearing House" sub="NYMEX" hl tone="see" />
      <Node {...sharon} icon={UserRound} label="Sharon" sub="sold · short" hl={beat === 2 || beat === 4} tone={beat === 2 ? "bad" : "good"} dim={beat === 1} />
      {/* the day's loss and gain move at the same moment */}
      <Token from={[sharon.x, TOP]} to={[ch.x, TOP]} bend={-10} at={paid ? 1 : 0} show={paid && !expiry} label="$250" icon={Banknote} tone="cash" absorb />
      <Token from={[ch.x, TOP]} to={[brad.x, TOP]} bend={-10} at={paid ? 1 : 0} show={paid && !expiry} label="$250" icon={Banknote} tone="cash" absorb />
      {/* expiry: silver one way, $4.55 an ounce the other */}
      <Token from={[sharon.x, TOP]} to={[brad.x, TOP]} bend={-16} at={expiry ? 1 : 0} show={beat === 3} label="silver" icon={Gem} tone="asset" absorb />
      <Token from={[brad.x, BOT]} to={[sharon.x, BOT]} bend={-16} at={expiry ? 1 : 0} show={beat === 3} label="$4.55 / oz" icon={Banknote} tone="cash" absorb />
      <Num value={paid ? 250 : 0} x={brad.x} y={214} size={17} format={money} tone={paid ? "good" : undefined} />
      <Num value={paid ? -250 : 0} x={sharon.x} y={214} size={17} format={money} tone={paid ? "bad" : undefined} />
      <Txt x={brad.x} y={230} size={10.5} weight={650} tone="neutral">
        variation margin
      </Txt>
      <Txt x={sharon.x} y={230} size={10.5} weight={650} tone="neutral">
        variation margin
      </Txt>
      <Txt x={200} y={214} size={12} weight={700} tone="neutral" show={beat === 1} delay={0.4}>
        5,000 × $0.05 = $250
      </Txt>
      <Txt x={brad.x} y={250} size={11.5} weight={800} tone="good" show={beat === 4}>
        net $4.50 / oz
      </Txt>
      <Txt x={sharon.x} y={250} size={11.5} weight={800} tone="good" show={beat === 4}>
        net $4.50 / oz
      </Txt>
      <Txt x={200} y={250} size={11.5} weight={700} tone="neutral" show={beat === 4} delay={0.3}>
        the agreed price
      </Txt>
    </Stage>
  );
}

// ── 3.2.2.4 Depositories: DTCC, DTC and NSCC ────────────────────────────────
export function Depository({ beat }: BeatProps) {
  const dtcc = box(200, 38, 176, 48);
  const dtc = box(104, 130, 144, 58);
  const nscc = box(296, 130, 144, 58);
  const parts = box(104, 222, 156, 48);
  const TOP = dtc.y - 29 - 18;
  const BOT = dtc.y + 29 + 18;
  const stp = beat >= 3;
  return (
    <Stage h={256} label="The DTC holds assets and delivers them to the NSCC for settlement">
      <Node {...dtcc} label="DTCC" sub="parent company" hl={beat === 0} tone="def" dim={beat === 2} />
      <Edge {...edge(dtcc, dtc)} show tone="neutral" />
      <Txt x={200} y={96} size={11.5} weight={750} tone="neutral" show={beat === 0} delay={0.3}>
        two subsidiaries
      </Txt>
      <Edge {...edge(dtcc, nscc)} show tone="neutral" />
      <Node {...dtc} icon={Archive} label="DTC" sub="depository" hl={beat >= 1} tone="def" />
      <Node {...nscc} icon={Scale} label="NSCC" sub="clears & settles" hl={beat === 0 || beat >= 2} tone="def" dim={beat === 1} />
      <Node {...parts} icon={Users} label="Participants" sub="and their clients" show={beat >= 1} dim={beat === 2} />
      <Edge {...edge(parts, dtc)} show={beat >= 1} tone={stp ? "see" : "neutral"} />
      <Txt x={114} y={183} anchor="start" size={11} weight={700} tone="neutral" show={beat >= 1} className="halo">
        hold assets at
      </Txt>
      <Txt x={290} y={226} size={12.5} weight={800} tone="def" show={beat === 1} delay={0.5}>
        nearly $20 trillion
      </Txt>
      <Txt x={290} y={242} size={10.5} weight={600} tone="neutral" show={beat === 1} delay={0.5}>
        held by the DTC (book's figure)
      </Txt>
      <Token from={[parts.x + 60, parts.y]} to={[dtc.x + 40, dtc.y]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="instruction" icon={FileText} tone="prac" absorb />
      <Token from={[dtc.x, TOP]} to={[nscc.x, TOP]} bend={10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="securities" icon={Layers} tone="asset" absorb delay={1} />
      <Token from={[dtc.x, BOT]} to={[nscc.x, BOT]} bend={-10} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="cash" icon={Banknote} tone="cash" absorb delay={1} />
      <Edge {...edge(dtc, nscc)} show={stp} tone="see" />
      <Badge x={290} y={226} text="Straight-through" tone="good" show={stp} delay={0.4} />
      <Txt x={290} y={250} size={10.5} weight={650} tone="neutral" show={stp} delay={0.6}>
        fully automated
      </Txt>
    </Stage>
  );
}

// ── Box: A Typical Set of Relationships (p. 37) ─────────────────────────────
type Who = "fund" | "cust" | "adv" | "trader" | "broker" | "dealer" | "nscc" | "dtc";
const FIRST: Record<Who, number> = { fund: 0, cust: 0, adv: 1, trader: 2, broker: 2, dealer: 3, nscc: 4, dtc: 5 };
const ACTIVE: Who[][] = [
  ["fund", "cust"],
  ["fund", "adv"],
  ["adv", "trader", "broker"],
  ["broker", "dealer"],
  ["dealer", "broker", "nscc"],
  ["cust", "dtc", "nscc"],
  ["dtc", "nscc"],
];

export function TradeLifecycle({ beat }: BeatProps) {
  const b = Math.min(beat, ACTIVE.length - 1);
  const B: Record<Who, Box> = {
    fund: box(68, 44, 110, 52),
    adv: box(200, 44, 110, 52),
    trader: box(332, 44, 110, 52),
    cust: box(68, 150, 110, 52),
    dealer: box(200, 150, 110, 52),
    broker: box(332, 150, 110, 52),
    dtc: box(68, 256, 110, 52),
    nscc: box(200, 256, 110, 52),
  };
  const node = (k: Who, label: string, sub: string, icon: typeof Store) => (
    <Node {...B[k]} icon={icon} label={label} sub={sub} show={b >= FIRST[k]} dim={!ACTIVE[b].includes(k)} hl={ACTIVE[b].includes(k)} tone="see" />
  );
  const R1 = 98; // lane between rows 1 and 2
  const R2 = 204; // lane between rows 2 and 3
  const R3T = 214;
  const R3B = 298;
  const at = (n: number) => (b >= n ? 1 : 0) as 0 | 1;
  return (
    <Stage h={316} label="One pension-fund purchase of Cisco shares, from the custodian to the depository">
      {/* the path of the trade so far: current step in colour, earlier steps in grey */}
      {(
        [
          [0, "fund", "cust"],
          [1, "fund", "adv"],
          [2, "adv", "trader"],
          [2, "trader", "broker"],
          [3, "broker", "dealer"],
          [4, "dealer", "nscc"],
          [4, "broker", "nscc"],
          [5, "cust", "dtc"],
          [6, "dtc", "nscc"],
        ] as [number, Who, Who][]
      ).map(([n, a, z]) => (
        <Edge key={`${a}-${z}`} {...edge(B[a], B[z])} show={b >= n} tone={b === n ? "see" : "neutral"} width={b === n ? 2.4 : 1.5} />
      ))}
      {node("fund", "Pension fund", "sponsor", Landmark)}
      {node("adv", "Adviser", "manager", Briefcase)}
      {node("trader", "Trader", "buy-side", User)}
      {node("cust", "Custodian", "bank", PiggyBank)}
      {node("dealer", "Dealer", "inventory", Store)}
      {node("broker", "Broker", "for the fund", Briefcase)}
      {node("dtc", "DTC", "depository", Archive)}
      {node("nscc", "NSCC", "clears & settles", Scale)}
      {/* 0: money into the custodian */}
      <Token from={[B.fund.x, B.fund.y]} to={[B.cust.x, B.cust.y]} at={at(0)} show={b === 0} label="money" icon={Banknote} tone="cash" absorb />
      {/* 1: the adviser hears there is money to invest */}
      <Token from={[B.fund.x, R1]} to={[B.adv.x, R1]} bend={8} at={at(1)} show={b === 1} label="funds ready" tone="def" absorb />
      {/* 2: the order goes down the chain */}
      <Token from={[B.adv.x, R1]} to={[B.trader.x, R1]} bend={8} at={at(2)} show={b === 2} label="buy 30,000" icon={FileText} tone="prac" absorb />
      <Token from={[B.trader.x, B.trader.y]} to={[B.broker.x, B.broker.y]} at={at(2)} show={b === 2} label="order" icon={FileText} tone="prac" absorb delay={1.2} />
      {/* 3: the broker calls a dealer */}
      <Token from={[B.broker.x, R2]} to={[B.dealer.x, R2]} bend={-8} at={at(3)} show={b === 3} label="trade" tone="prac" absorb />
      {/* 4: both report to NSCC, at the same time */}
      <Token from={[B.dealer.x, B.dealer.y]} to={[B.nscc.x, B.nscc.y]} at={at(4)} show={b === 4} label="report" icon={FileText} tone="see" absorb />
      <Token from={[B.broker.x, B.broker.y]} to={[B.nscc.x + 40, B.nscc.y]} at={at(4)} show={b === 4} label="report" icon={FileText} tone="see" absorb />
      {/* 5: three days later, money to the fund's DTC account */}
      <Token from={[B.cust.x, B.cust.y]} to={[B.dtc.x, B.dtc.y]} at={at(5)} show={b === 5} label="money" icon={Banknote} tone="cash" absorb />
      <Txt x={300} y={250} size={12.5} weight={800} tone="see" show={b === 5} className="halo">
        T+3
      </Txt>
      {/* 6: the DTC pays and receives the shares, together */}
      <Token from={[B.dtc.x, R3T]} to={[B.nscc.x, R3T]} bend={8} at={at(6)} show={b === 6} label="money" icon={Banknote} tone="cash" absorb />
      <Token from={[B.nscc.x, R3B]} to={[B.dtc.x, R3B]} bend={8} at={at(6)} show={b === 6} label="30,000 CSCO" icon={Layers} tone="asset" absorb />
    </Stage>
  );
}
