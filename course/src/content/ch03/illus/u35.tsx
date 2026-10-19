// "See it" scenes for 3.5 Market Regulation and 3.7 Some Points to Remember
import { motion } from "motion/react";
import {
  Award,
  Banknote,
  Building2,
  Calculator,
  Eye,
  Factory,
  FileText,
  Gavel,
  Landmark,
  Layers,
  MessagesSquare,
  Scale,
  ScrollText,
  ShieldCheck,
  Sprout,
  Store,
  TreeDeciduous,
  UserRound,
  Users,
} from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Bar, Edge, Node, Num, Stage, Token, Txt, between } from "../../../scene/index.tsx";
import { EASE_IN_OUT } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 112, h = 58): Box => ({ x, y, w, h });

/** A short thick bar drawn across the middle of a segment: "blocked here". */
function Wall({ from, to, show }: { from: readonly [number, number]; to: readonly [number, number]; show: boolean }) {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const px = (-dy / len) * 16;
  const py = (dx / len) * 16;
  return (
    <motion.line
      x1={mx - px}
      y1={my - py}
      x2={mx + px}
      y2={my + py}
      stroke="var(--bad)"
      strokeWidth={6}
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.35, delay: show ? 0.6 : 0, ease: EASE_IN_OUT }}
    />
  );
}

// ── 3.5: rules that help, rules that hinder ────────────────────────────────
export function RegGoals({ beat }: BeatProps) {
  const trader = box(70, 172, 112, 58);
  const market = box(330, 172, 112, 58);
  const top = box(200, 58, 136, 58);
  const TOP = trader.y - trader.h / 2 - 18;
  const BOT = trader.y + trader.h / 2 + 18;
  const block = between(top, trader, 0, 4);
  return (
    <Stage h={250} label="Good rules help traders trade; other rules protect favoured traders or tax trading">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="good" show={beat === 0} className="caps">
        GOOD RULES
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="bad" show={beat === 1} className="caps">
        PRIVILEGE: PROTECTION FROM COMPETITION
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="bad" show={beat === 2} className="caps">
        A TAX ON TRADING
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="bad" show={beat === 3} className="caps">
        THE RESULT
      </Txt>
      {/* beat 0: three things good rules ensure */}
      <Node x={72} y={66} w={118} h={58} icon={MessagesSquare} label="Clear talk" sub="communicate" show={beat === 0} hl tone="good" />
      <Node x={200} y={66} w={118} h={58} icon={ShieldCheck} label="No fraud" sub="honest dealing" show={beat === 0} hl tone="good" />
      <Node x={328} y={66} w={118} h={58} icon={Eye} label="As it appears" sub="no surprises" show={beat === 0} hl tone="good" />
      {/* beat 1: a newcomer kept out */}
      <Node {...top} icon={Store} label="Newcomer" sub="new market" show={beat === 1} tone="bad" hl />
      <Edge from={block[0]} to={block[1]} tone="bad" dashed show={beat === 1} />
      <Wall from={block[0]} to={block[1]} show={beat === 1} />
      {/* beat 2: the treasury takes a cut of each trade */}
      <Node {...top} icon={Landmark} label="Treasury" sub="national" show={beat === 2} tone="bad" hl />
      <Token from={[200, TOP]} to={[200, top.y + 36]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="tax" icon={Banknote} tone="bad" absorb delay={0.7} />
      {/* the market row */}
      <Node {...trader} icon={UserRound} label="Trader" sub="wants to trade" hl={beat === 1} tone="see" dim={beat === 3} />
      <Node {...market} icon={Users} label="Incumbent" sub="market" dim={beat === 3} />
      <Edge from={between(trader, market, 0, 6)[0]} to={between(trader, market, 0, 6)[1]} arrow={false} tone={beat === 3 ? "bad" : "neutral"} dashed={beat === 3} />
      <Token from={[trader.x, TOP]} to={[market.x, TOP]} bend={10} at={1} show={beat === 0} label="cash" icon={Banknote} tone="cash" absorb />
      <Token from={[market.x, BOT]} to={[trader.x, BOT]} bend={8} at={1} show={beat === 0} label="shares" icon={Layers} tone="asset" absorb />
      <Token from={[trader.x, TOP]} to={[market.x, TOP]} bend={10} at={beat >= 2 ? 1 : 0} show={beat === 2} label="cash" icon={Banknote} tone="cash" absorb />
      <Token from={[market.x, BOT]} to={[trader.x, BOT]} bend={8} at={beat >= 2 ? 1 : 0} show={beat === 2} label="shares" icon={Layers} tone="asset" absorb />
      <Token from={[trader.x, TOP]} to={[200, TOP - 6]} bend={6} at={beat >= 3 ? 1 : 0} show={beat === 3} label="trade?" tone="bad" absorb />
      <Txt x={200} y={64} size={14} weight={800} tone="bad" show={beat === 3} delay={0.6}>
        fewer trades that
      </Txt>
      <Txt x={200} y={84} size={14} weight={800} tone="bad" show={beat === 3} delay={0.6}>
        would help both sides
      </Txt>
    </Stage>
  );
}

// ── 3.5.1: who writes and enforces the rules ───────────────────────────────
export function Delegation({ beat }: BeatProps) {
  const leg = box(104, 44, 136, 56);
  const mkts = box(104, 226, 136, 56);
  const agency = box(300, 130, 136, 56);
  const courts = box(300, 226, 136, 56);
  const lm = between(leg, mkts, 0, 4);
  const la = between(leg, agency, 0, 4);
  const am = between(agency, mkts, 0, 4);
  const ac = between(agency, courts, 0, 4);
  return (
    <Stage h={264} label="Legislatures pass laws and delegate rule-writing and enforcement to agencies">
      <Node {...leg} icon={Landmark} label="Legislature" sub="enacts laws" hl={beat <= 1} tone="idea" dim={beat >= 3} />
      <Node {...mkts} icon={Users} label="Markets" sub="traders, exchanges" />
      <Edge from={lm[0]} to={lm[1]} label="laws" labelDy={0} labelAt={0.42} />
      <Token from={lm[0]} to={lm[1]} at={1} show={beat === 0} label="law" icon={FileText} tone="idea" absorb />
      <Node {...agency} icon={Building2} label="Agency" sub={beat === 4 ? "vague mandate" : "public or private"} show={beat >= 1} hl={beat >= 2} tone={beat === 4 ? "bad" : "idea"} />
      <Edge from={la[0]} to={la[1]} show={beat >= 1} label="delegates" labelDy={-8} />
      <Token from={la[0]} to={la[1]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="powers" icon={ScrollText} tone="idea" absorb />
      <Edge from={am[0]} to={am[1]} show={beat >= 2} label="regulations" labelDy={-8} labelAt={0.55} />
      <Token from={am[0]} to={am[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="force of law" icon={ScrollText} tone="idea" absorb />
      <Node {...courts} icon={Gavel} label="Courts" sub="proceedings" show={beat >= 3} hl={beat === 3} tone="idea" />
      <Edge from={ac[0]} to={ac[1]} show={beat >= 3} label="enforce" labelDy={0} />
    </Stage>
  );
}

// ── 3.5.1.1: SEC and CFTC split the markets ────────────────────────────────
const SEC_ITEMS: [string, number][] = [
  ["stocks", 0],
  ["bonds", 0],
  ["warrants", 0],
  ["trust units", 0],
  ["equity options", 1],
  ["cash index options", 1],
];
const CFTC_ITEMS = ["spot", "forwards", "futures"];
const SLOT = (i: number) => 46 + i * 28;

export function Jurisdiction({ beat }: BeatProps) {
  const merged = beat >= 3;
  const sec = box(merged ? 200 : 100, 250, 156, 60);
  const cftc = box(merged ? 200 : 300, 250, 156, 60);
  return (
    <Stage h={290} label="The SEC regulates securities and equity options; the CFTC regulates commodity spot, forward and futures markets">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" show={!merged} className="caps">
        UNITED STATES · TWO AGENCIES
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" show={merged} className="caps">
        MOST COUNTRIES · ONE AGENCY
      </Txt>
      {SEC_ITEMS.map(([label, k], i) => (
        <Token
          key={label}
          from={[200, 30]}
          to={[100, SLOT(i)]}
          bend={6}
          at={beat >= k ? 1 : 0}
          show={beat >= k && !merged}
          label={label}
          tone="def"
          delay={(k === 0 ? i : i - 4) * 0.2}
        />
      ))}
      {CFTC_ITEMS.map((label, i) => (
        <Token key={label} from={[200, 30]} to={[300, SLOT(i)]} bend={-6} at={beat >= 2 ? 1 : 0} show={beat >= 2 && !merged} label={label} tone="prac" delay={i * 0.2} />
      ))}
      <Node {...sec} icon={Landmark} label="SEC" sub="securities" hl={beat <= 1} tone="def" show={!merged} />
      <Node {...cftc} icon={Building2} label="CFTC" sub="commodities" hl={beat === 2} tone="prac" show={!merged} />
      <Node x={200} y={250} w={190} h={60} icon={Landmark} label="One agency" sub="securities + commodities" show={merged} hl tone="idea" />
      <Txt x={200} y={150} size={13} weight={750} tone="neutral" show={merged} delay={0.4}>
        many people propose this for the U.S.
      </Txt>
    </Stage>
  );
}

// ── 3.5.1.1: what the agencies can do ──────────────────────────────────────
export function Powers({ beat }: BeatProps) {
  const agency = box(200, 132, 132, 60);
  const regs = box(78, 40, 132, 54);
  const hear = box(322, 40, 132, 54);
  const doj = box(322, 224, 132, 54);
  const inv = box(78, 224, 132, 54);
  const e = (a: Box, b: Box) => between(a, b, 0, 4);
  return (
    <Stage h={262} label="The SEC and CFTC write regulations, hold hearings, refer cases to the Department of Justice and publish information">
      <Node {...agency} icon={Landmark} label="SEC / CFTC" sub="federal agencies" hl tone="def" />
      <Node {...regs} icon={ScrollText} label="Write rules" sub="interpret the laws" show={beat >= 0} hl={beat === 0} dim={beat > 0} tone="def" />
      <Edge from={e(agency, regs)[0]} to={e(agency, regs)[1]} show />
      <Token from={e(agency, regs)[0]} to={e(agency, regs)[1]} at={1} show={beat === 0} label="rules" icon={FileText} tone="def" absorb />
      <Node {...hear} icon={Gavel} label="Hearings" sub="enforce the rules" show={beat >= 1} hl={beat === 1} dim={beat > 1} tone="def" />
      <Edge from={e(agency, hear)[0]} to={e(agency, hear)[1]} show={beat >= 1} />
      <Node {...doj} icon={Scale} label="Justice Dept." sub="prosecutes in court" show={beat >= 2} hl={beat === 2} dim={beat > 2} tone="def" />
      <Edge from={e(agency, doj)[0]} to={e(agency, doj)[1]} show={beat >= 2} />
      <Node {...inv} icon={Users} label="Investors" sub="read EDGAR" show={beat >= 3} hl={beat === 3} tone="def" />
      <Edge from={e(agency, inv)[0]} to={e(agency, inv)[1]} show={beat >= 3} />
      <Token from={e(agency, inv)[0]} to={e(agency, inv)[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="reports" icon={FileText} tone="def" absorb />
    </Stage>
  );
}

// ── 3.5.1.1 box "The SEC Mission": objectives that pull apart ──────────────
export function MissionTradeoffs({ beat }: BeatProps) {
  const base = 206;
  const before = 62;
  const objectives: [string, string | undefined][] = [
    ["Investors", "protection"],
    ["Efficiency", undefined],
    ["Competition", undefined],
    ["Capital", "formation"],
  ];
  const hl = beat === 1 ? [0, 1] : beat === 2 ? [0] : beat === 0 ? [0, 1, 2, 3] : [];
  const up = beat === 1 ? 108 : beat >= 2 ? 104 : before;
  const down = beat === 1 ? 26 : beat >= 2 ? 30 : before;
  return (
    <Stage h={250} label="The SEC's objectives can conflict: a rule can help one and hurt another">
      {objectives.map(([label, sub], i) => (
        <Node key={label} x={52 + i * 99} y={36} w={94} h={50} label={label} sub={sub} hl={hl.includes(i)} dim={!hl.includes(i)} tone="idea" />
      ))}
      <Txt x={200} y={88} size={13} weight={800} show={beat === 1} className="halo">
        Rule: ban insider trading
      </Txt>
      <Txt x={200} y={88} size={13} weight={800} show={beat === 2} className="halo">
        Rule: protect small investors
      </Txt>
      <Txt x={200} y={88} size={13} weight={800} tone="bad" show={beat === 3} className="halo">
        No guidance: regulators decide
      </Txt>
      <motion.line x1={80} x2={320} y1={base - before} y2={base - before} stroke="var(--ink-3)" strokeDasharray="4 4" initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 ? 0.7 : 0 }} />
      <Txt x={326} y={base - before + 4} anchor="start" size={11} weight={700} tone="neutral" show={beat >= 1}>
        before
      </Txt>
      <Bar x={140} base={base} w={52} h={up} tone="good" show={beat >= 1} />
      <Bar x={260} base={base} w={52} h={down} tone="bad" show={beat >= 1} />
      <line x1={80} x2={320} y1={base} y2={base} className="sc-axis" />
      <Txt x={140} y={base + 18} size={12} weight={750} tone="good" show={beat === 1}>
        investor protection
      </Txt>
      <Txt x={260} y={base + 18} size={12} weight={750} tone="bad" show={beat === 1}>
        informative prices
      </Txt>
      <Txt x={140} y={base + 18} size={12} weight={750} tone="good" show={beat >= 2}>
        small investors
      </Txt>
      <Txt x={260} y={base + 18} size={12} weight={750} tone="bad" show={beat >= 2}>
        large investors
      </Txt>
    </Stage>
  );
}

// ── 3.5.1.1 box "Regulatory Competition": the Shad-Johnson accord ──────────
function Strike({ x, y, w, show }: { x: number; y: number; w: number; show: boolean }) {
  return (
    <motion.line
      x1={x - w / 2 + 8}
      x2={x + w / 2 - 8}
      y1={y}
      y2={y}
      stroke="var(--bad)"
      strokeWidth={3}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: show ? 1 : 0 }}
      transition={{ duration: 0.4, delay: show ? 0.5 : 0, ease: EASE_IN_OUT }}
    />
  );
}

export function ShadJohnson({ beat }: BeatProps) {
  const sec = box(96, 226, 150, 56);
  const cftc = box(304, 226, 150, 56);
  const contested = box(200, 112, 150, 44);
  const SEC_TOP: [number, number] = [sec.x, sec.y - 40];
  const CFTC_TOP: [number, number] = [cftc.x, cftc.y - 40];
  const banned = beat >= 3;
  const allowed = beat >= 4;
  return (
    <Stage h={264} label="The 1982 Shad-Johnson accord split equity derivatives between the SEC and the CFTC">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" show={beat === 0} className="caps">
        BEFORE 1982 · A TURF WAR
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" show={beat >= 1 && beat <= 3} className="caps">
        1982 · SHAD-JOHNSON ACCORD
      </Txt>
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="good" show={allowed} className="caps">
        2000 · COMMODITY FUTURES MODERNIZATION ACT
      </Txt>
      {/* beat 0: both agencies reach for stock options */}
      <Node {...contested} label="Stock options" show={beat === 0} hl tone="idea" />
      <Edge from={between(sec, contested, 0, 4)[0]} to={between(sec, contested, 0, 4)[1]} tone="def" dashed show={beat === 0} />
      <Edge from={between(cftc, contested, 0, 4)[0]} to={between(cftc, contested, 0, 4)[1]} tone="prac" dashed show={beat === 0} />
      {/* beat 1: options on stocks and cash-settled index options → SEC */}
      <Token from={[sec.x, 62]} to={SEC_TOP} at={beat >= 1 ? 1 : 0} show={beat === 1} label="stock options" tone="def" absorb />
      <Token from={[sec.x, 108]} to={SEC_TOP} at={beat >= 1 ? 1 : 0} show={beat === 1} label="cash index options" tone="def" absorb delay={0.3} />
      {/* beat 2: broad index futures and options on them → CFTC */}
      <Token from={[cftc.x, 62]} to={CFTC_TOP} at={beat >= 2 ? 1 : 0} show={beat === 2} label="broad index futures" tone="prac" absorb />
      <Token from={[cftc.x, 108]} to={CFTC_TOP} at={beat >= 2 ? 1 : 0} show={beat === 2} label="options on them" tone="prac" absorb delay={0.3} />
      {/* beats 3–4: single-stock and narrow-index futures, banned then permitted */}
      <Node x={200} y={96} w={180} h={40} label="Single-stock futures" show={banned} hl tone={allowed ? "good" : "bad"} />
      <Node x={200} y={146} w={180} h={40} label="Narrow-index futures" show={banned} hl tone={allowed ? "good" : "bad"} />
      <Strike x={200} y={96} w={180} show={banned && !allowed} />
      <Strike x={200} y={146} w={180} show={banned && !allowed} />
      <Txt x={200} y={184} size={12.5} weight={800} tone={allowed ? "good" : "bad"} show={banned} className="halo">
        {allowed ? "now permitted" : "no one may trade them"}
      </Txt>
      <Node {...sec} icon={Landmark} label="SEC" sub={beat >= 1 ? "stock + index options" : "securities side"} hl={beat === 1} tone="def" />
      <Node {...cftc} icon={Building2} label="CFTC" sub={beat >= 2 ? "index futures + options" : "futures side"} hl={beat === 2} tone="prac" />
    </Stage>
  );
}

// ── 3.5.1.2: three kinds of SROs and how their rules get teeth ─────────────
export function SROTypes({ beat }: BeatProps) {
  const exch = box(72, 50, 118, 58);
  const ch = box(200, 50, 118, 58);
  const assoc = box(328, 50, 118, 58);
  const approve = beat >= 4;
  const members = box(approve ? 104 : 200, 208, 150, 58);
  const agency = box(300, 208, 150, 58);
  const e = (a: Box) => between(a, members, 0, 4);
  return (
    <Stage h={256} label="Exchanges, clearinghouses and trader associations regulate their members; the SEC or CFTC approves their rules">
      <Node {...exch} icon={Building2} label="Exchange" sub="trading practices" show hl={beat === 0} dim={beat > 0 && !approve} tone="idea" />
      <Node {...ch} icon={ShieldCheck} label="Clearinghouse" sub="capital, reporting" show={beat >= 1} hl={beat === 1} dim={beat > 1 && !approve} tone="idea" />
      <Node {...assoc} icon={Users} label="Trader assoc." sub="NASD, NFA" show={beat >= 2} hl={beat === 2} dim={beat > 2 && !approve} tone="idea" />
      <Edge from={e(exch)[0]} to={e(exch)[1]} show={beat < 4} label="trading rules" labelDy={-4} labelAt={0.45} />
      <Edge from={e(ch)[0]} to={e(ch)[1]} show={beat >= 1 && beat < 4} label="capital" labelDy={0} labelAt={0.45} />
      <Edge from={e(assoc)[0]} to={e(assoc)[1]} show={beat >= 2 && beat < 4} label="conduct" labelDy={-4} labelAt={0.45} />
      <Node {...members} icon={UserRound} label="Members" sub="brokers, dealers…" hl={beat === 3} tone={beat === 3 ? "bad" : "neutral"} />
      <Token from={[members.x + 80, members.y]} to={[392, members.y]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="expelled" tone="bad" absorb />
      <Txt x={200} y={142} size={12.5} weight={800} tone="bad" show={beat === 3} className="halo">
        comply, or be expelled or sued
      </Txt>
      <Node {...agency} icon={Landmark} label="SEC / CFTC" sub="approves rules" show={approve} hl tone="def" />
      <Token from={[200, 90]} to={[agency.x, agency.y - 40]} at={approve ? 1 : 0} show={approve} label="rules" icon={ScrollText} tone="idea" absorb />
      <Txt x={300} y={166} size={12} weight={800} tone="good" show={approve} delay={1.1} className="halo">
        if in the public interest
      </Txt>
    </Stage>
  );
}

// ── 3.5.1.2 box "The Buttonwood Tree Agreement": a timeline ────────────────
const yx = (year: number) => 50 + ((year - 1792) * 300) / 207;

export function Buttonwood({ beat }: BeatProps) {
  const LINE = 128;
  const x1975 = yx(1975);
  const x1999 = yx(1999);
  return (
    <Stage h={236} label="The NYSE began with a 1792 agreement on minimum commissions; it stopped regulating commissions in 1975 and repealed Rule 390 in 1999">
      <line x1={30} x2={372} y1={LINE} y2={LINE} className="sc-axis" strokeWidth={2} />
      <motion.line
        x1={yx(1792)}
        x2={x1975}
        y1={LINE}
        y2={LINE}
        stroke="var(--idea)"
        strokeWidth={4}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: beat >= 1 ? 1 : 0 }}
        transition={{ duration: 1.1, ease: EASE_IN_OUT }}
      />
      <motion.circle
        cy={LINE}
        r={7}
        fill="var(--idea)"
        stroke="var(--scene-bg)"
        strokeWidth={2}
        initial={{ cx: yx(1792) }}
        animate={{ cx: beat >= 2 ? x1999 : beat >= 1 ? x1975 : yx(1792) }}
        transition={{ duration: beat >= 2 ? 0.6 : 1.1, ease: EASE_IN_OUT }}
      />
      <Txt x={yx(1792)} y={LINE + 24} size={12} weight={800}>
        1792
      </Txt>
      <Txt x={x1975 - 4} y={LINE + 24} anchor="end" size={12} weight={800} show={beat >= 1}>
        1975
      </Txt>
      <Txt x={x1999 + 2} y={LINE + 24} anchor="start" size={12} weight={800} show={beat >= 2}>
        1999
      </Txt>
      <Txt x={(yx(1792) + x1975) / 2} y={LINE - 12} size={12.5} weight={800} tone="idea" show={beat >= 1} delay={0.8} className="halo">
        183 years
      </Txt>
      <Node x={112} y={56} w={168} h={66} icon={TreeDeciduous} label="24 brokers" sub="≥ 0.25% commission" hl={beat === 0} dim={beat > 0} tone="idea" />
      <Node x={298} y={56} w={156} h={66} icon={Banknote} label="1975" sub="commissions freed" show={beat >= 1} hl={beat === 1} dim={beat > 1} tone="idea" />
      <Node x={286} y={198} w={180} h={52} label="December 1999" sub="Rule 390 repealed" show={beat >= 2} hl={beat === 2} tone="idea" />
    </Stage>
  );
}

// ── 3.5.1.2 box "Crying Over Onion Futures" ────────────────────────────────
const ONION = "M40,96 L70,58 L100,128 L130,40 L160,138 L190,68 L220,146 L250,44 L280,118 L310,58 L340,132 L362,88";

export function OnionBan({ beat }: BeatProps) {
  const farm = box(78, 204, 118, 58);
  const right = box(322, 204, 118, 58);
  const fut = box(200, 82, 176, 52);
  const TOP = farm.y - farm.h / 2 - 18;
  const BOT = farm.y + farm.h / 2 + 16;
  return (
    <Stage h={252} label="Volatile onion futures were banned in 1958; farmers and processors now use forward contracts">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" show={beat === 0} className="caps">
        ONION FUTURES, 1950s · SHAPE ILLUSTRATIVE
      </Txt>
      <motion.path
        d={ONION}
        fill="none"
        stroke="var(--bad)"
        strokeWidth={2.6}
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: beat === 0 ? 1 : beat === 1 ? 0.25 : 0 }}
        transition={{ pathLength: { duration: 1.4, ease: EASE_IN_OUT }, opacity: { duration: 0.3 } }}
      />
      <Node {...farm} icon={Sprout} label="Farmers" sub={beat === 3 ? "grow onions" : "& local dealers"} show={beat >= 1} hl={beat === 1} tone="see" />
      <Node {...right} icon={Landmark} label="Congress" sub="senators" show={beat === 1 || beat === 2} hl={beat === 2} tone="see" />
      <Token from={[farm.x, TOP]} to={[right.x, TOP]} bend={10} at={beat >= 1 ? 1 : 0} show={beat === 1} label="complaints" icon={FileText} tone="bad" absorb />
      <Node {...fut} icon={Building2} label="Onion futures" sub="board of trade" show={beat >= 2} hl tone="bad" dim={beat === 3} />
      <Strike x={fut.x} y={fut.y} w={fut.w} show={beat >= 2} />
      <Edge from={between(right, fut, 0, 4)[0]} to={between(right, fut, 0, 4)[1]} tone="bad" show={beat === 2} label="1958 ban" labelDy={-6} />
      <Node {...right} icon={Factory} label="Processors" sub="use onions" show={beat === 3} hl tone="see" />
      <Token from={[farm.x, TOP]} to={[right.x, TOP]} bend={10} at={beat >= 3 ? 1 : 0} show={beat === 3} label="onions" tone="asset" absorb />
      <Token from={[right.x, BOT]} to={[farm.x, BOT]} bend={6} at={beat >= 3 ? 1 : 0} show={beat === 3} label="fixed price" icon={Banknote} tone="cash" absorb />
      <Edge from={between(farm, right, 8, 6)[0]} to={between(farm, right, 8, 6)[1]} arrow={false} tone="see" show={beat === 3} />
      <Txt x={200} y={198} size={12.5} weight={800} tone="see" show={beat === 3} className="halo">
        forward contract
      </Txt>
    </Stage>
  );
}

// ── 3.5.1.3: private regulators and whom they regulate ─────────────────────
export function PrivateRegs({ beat }: BeatProps) {
  const rows: { reg: [string, string]; who: [string, string]; edge: string; y: number; icon: typeof Landmark; dashed?: boolean }[] = [
    { reg: ["FASB", "accounting board"], who: ["Firms", "report accounts"], edge: "accounting", y: 46, icon: Calculator },
    { reg: ["AIMR", "analysts' body"], who: ["Managers", "report results"], edge: "voluntary", y: 128, icon: Award, dashed: true },
    { reg: ["Insurers", "of brokers' clients"], who: ["Brokers", "buy the policies"], edge: "risk limits", y: 210, icon: ShieldCheck },
  ];
  return (
    <Stage h={252} label="FASB, AIMR and brokers' insurers set standards for firms, investment managers and brokers">
      {rows.map((r, i) => {
        const a = box(84, r.y, 128, 54);
        const b = box(316, r.y, 128, 54);
        const [f, t] = between(a, b, 0, 4);
        const on = beat >= i;
        return (
          <g key={r.reg[0]}>
            <Node {...a} icon={r.icon} label={r.reg[0]} sub={r.reg[1]} show={on} hl={beat === i || beat === 3} dim={on && beat !== i && beat !== 3} tone="idea" />
            <Node {...b} icon={i === 0 ? Building2 : i === 1 ? Users : Store} label={r.who[0]} sub={r.who[1]} show={on} dim={on && beat !== i && beat !== 3} />
            <Edge from={f} to={t} show={on} dashed={r.dashed} tone="idea" label={r.edge} labelDy={-7} />
            <Token from={f} to={t} at={on ? 1 : 0} show={beat === i} label="rules" icon={ScrollText} tone="idea" absorb />
          </g>
        );
      })}
      <Txt x={84} y={90} size={11} weight={750} tone="def" show={beat === 0} delay={0.9} className="halo">
        SEC recognizes it since 1973
      </Txt>
    </Stage>
  );
}

// ── 3.5.2 box "Unintended Consequences": Brazil's transaction tax ──────────
const reais = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(1)} bn reais/day` : `${Math.round(v)} m reais/day`);

export function BrazilTax({ beat }: BeatProps) {
  const inst = box(200, 44, 156, 56);
  const sp = box(92, 140, 144, 56);
  const ny = box(308, 140, 144, 56);
  const base = 248;
  const spVol = beat >= 3 ? 350 : 1200;
  const toSp = between(inst, sp, 0, 4);
  const toNy = between(inst, ny, 0, 4);
  const taxed = beat >= 1 && beat < 4;
  return (
    <Stage h={256} label="Brazil's 0.38% transaction tax pushed trading in Brazilian stocks to New York ADRs">
      <Node {...inst} icon={Users} label="Institutions" sub="big traders" />
      <Node {...sp} icon={Building2} label="São Paulo" sub="Bovespa" hl={beat === 1 || beat === 3} tone={beat === 4 ? "good" : "bad"} />
      <Node {...ny} icon={Landmark} label="New York" sub="Brazilian ADRs" show={beat >= 2} hl={beat === 2} tone="def" />
      <Edge from={toSp[0]} to={toSp[1]} tone={taxed ? "bad" : "neutral"} dashed={beat === 2 || beat === 3} />
      <Txt x={(toSp[0][0] + toSp[1][0]) / 2 - 14} y={(toSp[0][1] + toSp[1][1]) / 2 + 4} anchor="end" size={12.5} weight={800} tone="bad" show={taxed} className="halo">
        0.38% tax
      </Txt>
      <Txt x={(toSp[0][0] + toSp[1][0]) / 2 - 14} y={(toSp[0][1] + toSp[1][1]) / 2 + 4} anchor="end" size={12} weight={800} tone="good" show={beat === 4} className="halo">
        stocks exempt
      </Txt>
      <Token from={toSp[0]} to={toSp[1]} at={1} show={beat === 0} label="orders" icon={FileText} tone="def" absorb />
      <Edge from={toNy[0]} to={toNy[1]} tone="def" show={beat >= 2} />
      <Token from={toNy[0]} to={toNy[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="orders" icon={FileText} tone="def" absorb />
      <line x1={30} x2={370} y1={base} y2={base} className="sc-axis" />
      <Bar x={70} base={base} w={40} h={(spVol / 1200) * 72} tone="bad" />
      <Num value={spVol} x={98} y={base - 8} anchor="start" size={13} weight={800} format={reais} />
      <Bar x={286} base={base} w={40} h={46} tone="def" show={beat >= 2} delay={0.6} />
      <Txt x={314} y={base - 8} anchor="start" size={11} weight={700} tone="neutral" show={beat >= 2}>
        illustrative
      </Txt>
    </Stage>
  );
}

// ── 3.7: who regulates, in layers ──────────────────────────────────────────
export function RegLayers({ beat }: BeatProps) {
  const layer = (y: number) => ({ x: 158, y, w: 276, h: 54 });
  return (
    <Stage h={258} label="Legislatures provide the framework, SROs the details, governmental agencies oversight; private regulators set standards">
      <Node {...layer(44)} icon={Landmark} label="Legislatures" sub="the regulatory framework" hl={beat === 0} dim={beat !== 0 && beat < 4} tone="idea" />
      <Node {...layer(196)} icon={Users} label="SROs" sub="the details" show={beat >= 1} hl={beat === 1} dim={beat !== 1 && beat < 4} tone="idea" />
      <Node {...layer(120)} icon={Eye} label="Governmental agencies" sub="oversight" show={beat >= 2} hl={beat === 2} dim={beat !== 2 && beat < 4} tone="idea" />
      <Node x={350} y={120} w={86} h={206} icon={Award} label="Private" sub="standards" show={beat >= 3} hl={beat === 3} dim={beat !== 3 && beat < 4} tone="idea" />
      <line x1={20} x2={380} y1={240} y2={240} className="sc-axis" strokeWidth={2} />
      <Txt x={20} y={252} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        THE MARKETS
      </Txt>
    </Stage>
  );
}
