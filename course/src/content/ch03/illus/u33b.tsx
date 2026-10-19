// "See it" scenes for 3.3.3–3.3.5: derivative, insurance, gambling and hybrid contracts.
import { AnimatePresence, motion } from "motion/react";
import { Banknote, Factory, FileText, Flame, House, Landmark, Repeat, ScrollText, Sprout, TrendingUp, User, UserRound, Wheat } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Stage, Token, Txt, between, toneVar, type SceneTone } from "../../../scene/index.tsx";
import { EASE_IN_OUT } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 112, h = 58): Box => ({ x, y, w, h });
/** Lane just above / below a box row, for tokens flying centre to centre. */
const top = (b: Box) => b.y - b.h / 2 - 18;
const bot = (b: Box) => b.y + b.h / 2 + 18;

/** A discrete value that steps (slides) to its new value instead of counting. */
function StepText({ x, y, value, size = 22, tone }: { x: number; y: number; value: string; size?: number; tone?: SceneTone }) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.g
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
      >
        <text x={x} y={y} textAnchor="middle" className="sc-num" style={{ fontSize: size, fontWeight: 800, fill: tone ? toneVar(tone) : "var(--ink)" }}>
          {value}
        </text>
      </motion.g>
    </AnimatePresence>
  );
}

function Caps({ x = 16, y = 26, show = true, children, anchor = "start" }: { x?: number; y?: number; show?: boolean; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <Txt x={x} y={y} anchor={anchor} size={11} weight={800} tone="neutral" show={show} className="caps">
      {children}
    </Txt>
  );
}

// ── Zero net supply: every sale that creates a contract makes one long and one short ──
const POS = [
  { ann: -1, ben: 1, cara: 0, dan: 0 },
  { ann: -1, ben: 1, cara: -2, dan: 2 },
  { ann: -1, ben: 0, cara: -1, dan: 2 },
  { ann: -1, ben: 0, cara: -1, dan: 2 },
];
const posLabel = (n: number) => (n > 0 ? `long ${n}` : n < 0 ? `short ${-n}` : "flat");

export function ZeroNetSupply({ beat }: BeatProps) {
  const b = Math.min(beat, 3);
  const p = POS[b];
  const vals = Object.values(p);
  const longs = vals.filter((v) => v > 0).reduce((s, v) => s + v, 0);
  const shorts = -vals.filter((v) => v < 0).reduce((s, v) => s + v, 0);
  const ann = box(80, 120, 120, 56);
  const ben = box(320, 120, 120, 56);
  const cara = box(80, 210, 120, 56);
  const dan = box(320, 210, 120, 56);
  const tone = (n: number): SceneTone => (n > 0 ? "good" : n < 0 ? "bad" : "neutral");
  const diag = between(ben, cara, 0, 4);
  return (
    <Stage h={252} label="Zero net supply: total long positions minus total short positions is always zero">
      <rect x={16} y={8} width={368} height={58} rx={14} fill="var(--surface)" stroke="var(--line)" />
      <Caps x={76} y={26} anchor="middle">LONGS</Caps>
      <Caps x={200} y={26} anchor="middle">SHORTS</Caps>
      <Caps x={322} y={26} anchor="middle">LONGS − SHORTS</Caps>
      <StepText x={76} y={54} value={String(longs)} tone="good" />
      <StepText x={200} y={54} value={String(shorts)} tone="bad" />
      <StepText x={322} y={54} value="0" />
      <motion.rect
        x={262}
        y={12}
        width={120}
        height={50}
        rx={11}
        fill="none"
        stroke="var(--good)"
        strokeWidth={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: b === 3 ? 1 : 0 }}
      />
      <Node {...ann} icon={UserRound} label="Ann" sub={posLabel(p.ann)} tone={tone(p.ann)} hl={b === 0} dim={b === 1 || b === 2} />
      <Node {...ben} icon={UserRound} label="Ben" sub={posLabel(p.ben)} tone={tone(p.ben)} hl={b === 0 || b === 2} dim={b === 1} />
      <Node {...cara} icon={UserRound} label="Cara" sub={posLabel(p.cara)} tone={tone(p.cara)} show={b >= 1} hl={b === 1 || b === 2} />
      <Node {...dan} icon={UserRound} label="Dan" sub={posLabel(p.dan)} tone={tone(p.dan)} show={b >= 1} hl={b === 1} dim={b === 2} />
      <Token from={[ann.x, top(ann)]} to={[ben.x, top(ben)]} bend={10} at={1} show={b === 0} label="1 contract" icon={FileText} tone="prac" absorb />
      <Token from={[cara.x, bot(cara) - 2]} to={[dan.x, bot(dan) - 2]} bend={-10} at={b >= 1 ? 1 : 0} show={b === 1} label="2 contracts" icon={FileText} tone="prac" absorb />
      <Token from={diag[0]} to={diag[1]} at={b >= 2 ? 1 : 0} show={b === 2} label="1 contract" icon={FileText} tone="prac" absorb />
    </Stage>
  );
}

// ── Physical vs cash settlement ─────────────────────────────────────────────
export function Settlement({ beat }: BeatProps) {
  const seller = box(80, 124, 112, 58);
  const buyer = box(320, 124, 112, 58);
  const T = top(seller);
  const B = bot(seller);
  const heads = ["PHYSICAL SETTLEMENT", "CASH SETTLEMENT · ON PAPER", "CASH SETTLEMENT · IN PRACTICE", "FUTURES · THE VALUE FELL"];
  const fell = beat >= 3;
  return (
    <Stage h={248} label="Physical settlement versus cash settlement">
      {heads.map((h, i) => (
        <Caps key={h} show={Math.min(beat, 3) === i}>
          {h}
        </Caps>
      ))}
      <Node {...seller} icon={Sprout} label="Seller" sub={beat === 2 ? "pays $1,000" : beat >= 3 ? "gets $1,000" : "short the contract"} hl={beat >= 2} tone={beat === 2 ? "bad" : "good"} />
      <Node {...buyer} icon={UserRound} label="Buyer" sub={beat === 2 ? "gets $1,000" : beat >= 3 ? "pays $1,000" : "long the contract"} hl={beat >= 2} tone={beat === 2 ? "good" : "bad"} />
      {/* physical: goods one way, the full agreed price the other, at the same time */}
      <Token from={[seller.x, T]} to={[buyer.x, T]} bend={10} at={1} show={beat === 0} label="wheat" icon={Wheat} tone="asset" absorb />
      <Token from={[buyer.x, B]} to={[seller.x, B]} bend={10} at={1} show={beat === 0} label="$4,000" icon={Banknote} tone="cash" absorb />
      {/* cash settled, as written: value one way, price the other */}
      <Token from={[seller.x, T]} to={[buyer.x, T]} bend={10} at={beat >= 1 ? 1 : 0} show={beat === 1} label="value $5,000" tone="asset" absorb />
      <Token from={[buyer.x, B]} to={[seller.x, B]} bend={10} at={beat >= 1 ? 1 : 0} show={beat === 1} label="price $4,000" tone="cash" absorb />
      {/* in practice: only the difference moves */}
      <Token from={[seller.x, T]} to={[buyer.x, T]} bend={14} at={beat >= 2 ? 1 : 0} show={beat === 2} label="$1,000" icon={Banknote} tone="cash" absorb />
      <Token from={[buyer.x, B]} to={[seller.x, B]} bend={14} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="$1,000" icon={Banknote} tone="cash" absorb />
      <Txt x={200} y={T - 26} size={12.5} weight={750} tone="good" show={beat === 2} delay={0.9} className="halo">
        $5,000 − $4,000 = $1,000
      </Txt>
      <Txt x={200} y={B + 28} size={12.5} weight={750} tone="bad" show={fell} delay={0.9} className="halo">
        $3,000 − $4,000 = −$1,000
      </Txt>
      <Txt x={16} y={222} anchor="start" size={11.5} weight={650} tone="neutral">
        1,000 bushels · agreed price $4,000
      </Txt>
      <Txt x={16} y={238} anchor="start" size={11.5} weight={650} tone="neutral">
        {`worth ${fell ? "$3,000" : "$5,000"} at settlement · illustrative numbers`}
      </Txt>
    </Stage>
  );
}

// ── The book's tomato forward ───────────────────────────────────────────────
export function TomatoForward({ beat }: BeatProps) {
  const farmer = box(76, 160, 116, 60);
  const proc = box(322, 160, 128, 60);
  const deal = box(200, 70, 168, 54);
  const heads = ["SPRING · AGREE A FIXED PRICE", "HARVEST · DELIVER AND PAY", "RESULT · BOTH PRICES FIXED"];
  const goods = between(farmer, proc, -14, 4);
  const cash = between(proc, farmer, -14, 4);
  return (
    <Stage h={240} label="A tomato forward contract between a farmer and a food processor">
      {heads.map((h, i) => (
        <Caps key={h} show={Math.min(beat, 2) === i}>
          {h}
        </Caps>
      ))}
      <Edge from={between(farmer, deal, 0, 4)[0]} to={between(farmer, deal, 0, 4)[1]} arrow={false} dashed show={beat !== 1} />
      <Edge from={between(proc, deal, 0, 4)[0]} to={between(proc, deal, 0, 4)[1]} arrow={false} dashed show={beat !== 1} />
      <Node {...deal} icon={FileText} label="Forward" sub="fixed price, later delivery" tone="prac" hl={beat !== 1} dim={beat === 1} />
      <Node {...farmer} icon={Sprout} label="Farmer" sub={beat === 0 ? "no tomatoes yet" : beat === 1 ? "delivers" : "price fixed"} hl={beat === 2} tone="good" />
      <Node {...proc} icon={Factory} label="Food processor" sub={beat === 0 ? "needs tomatoes" : beat === 1 ? "pays" : "cost fixed"} hl={beat === 2} tone="good" />
      <Token from={goods[0]} to={goods[1]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="tomatoes" tone="asset" absorb />
      <Token from={cash[0]} to={cash[1]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="fixed price" icon={Banknote} tone="cash" absorb />
    </Stage>
  );
}

// ── Futures: the clearinghouse in the middle lets you offset with anyone ────
export function FuturesOffset({ beat }: BeatProps) {
  const ann = box(76, 60, 112, 56);
  const bob = box(324, 60, 112, 56);
  const ch = box(200, 150, 150, 58);
  const cara = box(76, 240, 112, 56);
  const fwd = beat === 0;
  const annCh = between(ann, ch, 0, 4);
  const chBob = between(ch, bob, 0, 4);
  const chCara = between(ch, cara, 0, 4);
  return (
    <Stage h={280} label="Futures traders trade through a clearinghouse and can offset with anyone">
      <Caps show={fwd}>FORWARD · DIRECT</Caps>
      <Caps show={!fwd}>FUTURES · THROUGH THE CLEARINGHOUSE</Caps>
      <Node {...ann} icon={UserRound} label="Ann" sub={beat >= 2 ? "flat" : "long 1"} tone={beat >= 2 ? "neutral" : "good"} hl={beat === 2} dim={beat === 3} />
      <Node {...bob} icon={UserRound} label="Bob" sub="short 1" tone="bad" hl={fwd || beat === 3} />
      <Edge from={between(ann, bob, 0, 4)[0]} to={between(ann, bob, 0, 4)[1]} arrow={false} show={fwd} label="forward" labelDy={-10} />
      <Txt x={bob.x} y={bob.y + 50} size={12.5} weight={750} tone="bad" show={fwd} className="halo">
        will Bob perform?
      </Txt>
      <Node {...ch} icon={Landmark} label="Clearinghouse" sub="guarantees both sides" show={!fwd} tone="see" hl={beat === 1} />
      <Edge from={annCh[0]} to={annCh[1]} arrow={false} show={beat === 1 || beat === 2} />
      <Edge from={chBob[0]} to={chBob[1]} arrow={false} show={!fwd} />
      <Edge from={chCara[0]} to={chCara[1]} arrow={false} show={beat >= 2} />
      <Txt x={ch.x + 92} y={ch.y + 46} size={11} weight={700} tone="neutral" show={beat === 1} className="halo">
        buyer to every seller
      </Txt>
      <Txt x={ch.x + 92} y={ch.y + 60} size={11} weight={700} tone="neutral" show={beat === 1} className="halo">
        seller to every buyer
      </Txt>
      <Node {...cara} icon={UserRound} label="Cara" sub="long 1" show={beat >= 2} tone="good" hl={beat === 3} />
      <Token from={annCh[0]} to={annCh[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="sells 1" icon={FileText} tone="prac" absorb />
      <Token from={chCara[0]} to={chCara[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="1 contract" icon={FileText} tone="prac" absorb delay={0.9} />
      <Txt x={ch.x + 96} y={cara.y + 4} size={12.5} weight={750} tone="good" show={beat === 3} className="halo">
        Ann is out without Bob
      </Txt>
    </Stage>
  );
}

// ── ODAX call payoff (Eurex ODAX box, p. 42) ────────────────────────────────
export const ODAX = { mult: 5, strike: 6200, premium: 26, dmin: 5800, dmax: 6700, emin: -400, emax: 2600 };
export const odaxPayoff = (dax: number) => ODAX.mult * Math.max(0, dax - ODAX.strike);
export const odaxX = (d: number) => 64 + ((d - ODAX.dmin) / (ODAX.dmax - ODAX.dmin)) * 316;
export const odaxY = (e: number) => 214 - ((e - ODAX.emin) / (ODAX.emax - ODAX.emin)) * 180;

export function OdaxAxes() {
  return (
    <g>
      {[0, 1000, 2000].map((e) => (
        <g key={e}>
          <line x1={64} x2={380} y1={odaxY(e)} y2={odaxY(e)} className={e === 0 ? "sc-axis" : "sc-grid"} />
          <text x={58} y={odaxY(e) + 4} textAnchor="end" className="sc-tick">
            €{e.toLocaleString("en-US")}
          </text>
        </g>
      ))}
      {[5900, 6200, 6500].map((d) => (
        <text key={d} x={odaxX(d)} y={232} textAnchor="middle" className="sc-tick">
          {d.toLocaleString("en-US")}
        </text>
      ))}
      <text x={380} y={248} textAnchor="end" className="sc-tick">
        DAX at expiration →
      </text>
      <line x1={odaxX(6200)} x2={odaxX(6200)} y1={34} y2={odaxY(0)} stroke="var(--ink-3)" strokeDasharray="3 4" />
      <text x={odaxX(6200) + 6} y={66} className="sc-tick">
        strike
      </text>
    </g>
  );
}

function Draw({ d, show, tone = "ink", dashed, width = 2.6 }: { d: string; show: boolean; tone?: string; dashed?: boolean; width?: number }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={tone === "ink" ? "var(--ink)" : toneVar(tone as SceneTone)}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "5 5" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ pathLength: { duration: 0.9, ease: EASE_IN_OUT }, opacity: { duration: 0.2 } }}
    />
  );
}

const P = (d: number, e: number) => `${odaxX(d).toFixed(1)},${odaxY(e).toFixed(1)}`;

export function OdaxCall({ beat }: BeatProps) {
  const be = ODAX.strike + ODAX.premium; // 6,226: 5 × 26 points of payoff covers the €130 paid
  return (
    <Stage h={256} label="Payoff of an ODAX call with strike 6,200">
      <OdaxAxes />
      <rect x={70} y={8} width={214} height={44} rx={10} fill="var(--surface)" stroke="var(--line)" />
      <text x={82} y={26} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800, fill: "var(--ink)" }}>
        1 call · strike 6,200 · price 26.00
      </text>
      <text x={82} y={43} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 650, fill: "var(--ink-2)" }}>
        €5 per point → you pay €130
      </text>
      {/* DAX today */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat === 0 ? 1 : 0 }}>
        <path d={`M${odaxX(5900)},${odaxY(0) + 2} l-6,10 h12 z`} fill="var(--def)" />
        <text x={odaxX(5900)} y={odaxY(0) - 10} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 750, fill: "var(--def)" }}>
          DAX 5,900 in June 2001
        </text>
      </motion.g>
      <Draw d={`M${P(5800, 0)} L${P(6200, 0)}`} show={beat >= 2} tone={beat === 2 ? "bad" : "ink"} width={beat === 2 ? 3.4 : 2.6} />
      <Draw d={`M${P(6200, 0)} L${P(6500, 1500)}`} show={beat >= 1} />
      <Draw d={`M${P(6500, 1500)} L${P(6700, 2500)}`} show={beat >= 3} />
      {/* the book's example point */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat === 1 || beat === 3 ? 1 : 0 }} transition={{ delay: beat === 1 ? 0.8 : 0 }}>
        <line x1={odaxX(6500)} x2={odaxX(6500)} y1={odaxY(0)} y2={odaxY(1500)} stroke="var(--good)" strokeDasharray="3 3" />
        <circle cx={odaxX(6500)} cy={odaxY(1500)} r={5.5} fill="var(--good)" stroke="var(--scene-bg)" strokeWidth={2} />
        <text x={odaxX(6500) - 10} y={odaxY(1500) - 4} textAnchor="end" className="sc-txt halo" style={{ fontSize: 12.5, fontWeight: 800, fill: "var(--good)" }}>
          €1,500
        </text>
      </motion.g>
      <Txt x={odaxX(6500) - 26} y={odaxY(1500) + 17} anchor="end" size={12} weight={700} tone="neutral" show={beat === 1} delay={0.8} className="halo">
        5 × (6,500 − 6,200)
      </Txt>
      <Txt x={odaxX(6000)} y={odaxY(0) - 12} size={12} weight={750} tone="bad" show={beat === 2} delay={0.6} className="halo">
        not exercised: worth €0
      </Txt>
      {/* net of the premium (derived) */}
      <Draw d={`M${P(5800, -130)} L${P(6200, -130)} L${P(6700, 2370)}`} show={beat >= 3} tone="prac" dashed width={2} />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 3 ? 1 : 0 }} transition={{ delay: beat >= 3 ? 0.9 : 0 }}>
        <circle cx={odaxX(be)} cy={odaxY(0)} r={4.5} fill="var(--prac)" stroke="var(--scene-bg)" strokeWidth={2} />
        <text x={odaxX(5900)} y={odaxY(-130) + 15} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 12, fontWeight: 750, fill: "var(--prac)" }}>
          after the €130 paid
        </text>
        <text x={odaxX(be) + 8} y={odaxY(0) + 16} className="sc-txt halo" style={{ fontSize: 12, fontWeight: 750, fill: "var(--prac)" }}>
          break-even 6,226 (derived)
        </text>
      </motion.g>
    </Stage>
  );
}

// ── Interest rate swap: fixed one way, floating the other, on each date ─────
const FLOAT = [4.0, 5.5, 6.5];

export function RateSwap({ beat }: BeatProps) {
  const a = box(84, 86, 124, 58);
  const b = box(316, 86, 124, 58);
  const fixedLeg = between(a, b, -14, 4);
  const floatLeg = between(b, a, -14, 4);
  const rowY = (k: number) => 194 + k * 20;
  return (
    <Stage h={262} label="An interest rate swap: fixed-rate payments exchanged for floating-rate payments">
      <Node {...a} icon={UserRound} label="Trader A" sub="pays fixed" tone="def" hl={beat >= 1} />
      <Node {...b} icon={UserRound} label="Trader B" sub="pays floating" tone="idea" hl={beat >= 1} />
      <Edge from={fixedLeg[0]} to={fixedLeg[1]} tone="def" label="fixed" labelDy={-20} />
      <Edge from={floatLeg[0]} to={floatLeg[1]} tone="idea" label="floating" labelDy={28} />
      {FLOAT.map((f, k) => (
        <g key={k}>
          <Token from={fixedLeg[0]} to={fixedLeg[1]} at={beat >= k + 1 ? 1 : 0} show={beat === k + 1} label="5.0%" tone="def" absorb />
          <Token from={floatLeg[0]} to={floatLeg[1]} at={beat >= k + 1 ? 1 : 0} show={beat === k + 1} label={`${f.toFixed(1)}%`} tone="idea" absorb />
        </g>
      ))}
      <rect x={16} y={160} width={368} height={86} rx={12} fill="var(--surface)" stroke="var(--line)" />
      <Caps x={56} y={178} anchor="middle">DATE</Caps>
      <Caps x={190} y={178} anchor="middle">A PAYS · FIXED</Caps>
      <Caps x={318} y={178} anchor="middle">B PAYS · FLOATING</Caps>
      <Txt x={200} y={rowY(0) + 10} size={12} weight={700} tone="neutral" show={beat === 0}>
        fixed rate negotiated · floating set by a formula
      </Txt>
      {FLOAT.map((f, k) => (
        <g key={k}>
          <Txt x={56} y={rowY(k)} size={13} weight={700} tone="neutral" show={beat >= k + 1} delay={0.8}>
            {String(k + 1)}
          </Txt>
          <Txt x={190} y={rowY(k)} size={13} weight={800} tone="def" show={beat >= k + 1} delay={0.8}>
            5.0%
          </Txt>
          <Txt x={318} y={rowY(k)} size={13} weight={800} tone="idea" show={beat >= k + 1} delay={0.8}>
            {`${f.toFixed(1)}%`}
          </Txt>
        </g>
      ))}
      <Txt x={384} y={256} anchor="end" size={10.5} weight={600} tone="neutral">
        illustrative rates
      </Txt>
    </Stage>
  );
}

// ── Same contract, different reasons: insurance or gambling ─────────────────
export function InsureOrGamble({ beat }: BeatProps) {
  const contract = box(200, 62, 184, 60);
  const left = box(86, 176, 132, 60);
  const right = box(314, 176, 132, 60);
  const fire = beat < 3;
  const eL = between(contract, left, 0, 4);
  const eR = between(contract, right, 0, 4);
  return (
    <Stage h={246} label="The same contract is insurance for a hedger and gambling for someone with no stake">
      <Node {...contract} icon={Flame} label="Fire contract" sub="pays if the building burns" tone="prac" show={fire} hl />
      <Node {...contract} icon={Wheat} label="Wheat futures" sub="value set by future prices" tone="prac" show={!fire} hl />
      <Edge from={eL[0]} to={eL[1]} show={beat >= 1} label="buys" labelDy={-6} />
      <Edge from={eR[0]} to={eR[1]} show={beat >= 2} label="buys" labelDy={-6} />
      <Node {...left} icon={House} label="Owner" sub="owns the building" show={beat >= 1 && fire} dim={beat === 2} hl={beat === 1} tone="def" />
      <Node {...left} icon={Sprout} label="Farmer" sub="grows wheat" show={!fire} hl tone="def" />
      <Node {...right} icon={User} label="Stranger" sub="no stake in it" show={beat >= 2 && fire} hl={beat === 2} tone="game" />
      <Node {...right} icon={User} label="Speculator" sub="no wheat at all" show={!fire} hl tone="game" />
      <Txt x={left.x} y={226} size={11.5} weight={800} tone="def" show={beat >= 1} className="caps">
        INSURANCE · HEDGER
      </Txt>
      <Txt x={right.x} y={226} size={11.5} weight={800} tone="game" show={beat >= 2} className="caps">
        GAMBLING · FOR FUN
      </Txt>
    </Stage>
  );
}

// ── A convertible bond = straight bond + option to exchange it for stock ────
export function Convertible({ beat }: BeatProps) {
  const joined = beat >= 2;
  const bond = box(joined ? 141 : 104, 106, 118, 64);
  const opt = box(joined ? 259 : 296, 106, 118, 64);
  const stock = box(200, 222, 112, 50);
  return (
    <Stage h={256} label="A convertible bond combines a straight bond with an option to exchange it for stock">
      <motion.rect
        x={72}
        y={64}
        width={256}
        height={84}
        rx={18}
        fill="none"
        stroke="var(--prac)"
        strokeWidth={2}
        strokeDasharray="6 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: joined ? 1 : 0 }}
        transition={{ delay: joined ? 0.45 : 0, duration: 0.3 }}
      />
      <Txt x={200} y={52} size={13.5} weight={800} tone="prac" show={joined} delay={0.5}>
        Convertible bond
      </Txt>
      <Node {...bond} icon={ScrollText} label="Straight bond" sub="coupons + principal" tone="def" hl />
      <Node {...opt} icon={Repeat} label="Option" sub="swap it for stock" tone="idea" hl show={beat >= 1} />
      <motion.g initial={false} animate={{ x: joined ? 37 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }}>
        <Txt x={104} y={164} size={11.5} weight={800} tone="def" className="caps">
          FINANCIAL ASSET
        </Txt>
      </motion.g>
      <motion.g initial={false} animate={{ x: joined ? -37 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 32 }}>
        <Txt x={296} y={164} size={11.5} weight={800} tone="idea" show={beat >= 1} className="caps">
          DERIVATIVE
        </Txt>
      </motion.g>
      <Node {...stock} icon={TrendingUp} label="Stock" show={beat >= 3} tone="good" hl />
      <Edge from={[stock.x + 58, stock.y - 8]} to={[330, 128]} bend={-16} dashed show={beat >= 3} tone="idea" label="depends on" labelAt={0.5} labelDy={6} />
      <Token from={[bond.x - 30, bond.y + 40]} to={[stock.x - 64, stock.y]} bend={22} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="exchange" tone="good" absorb />
    </Stage>
  );
}
