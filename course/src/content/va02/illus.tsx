// "See it" scenes for Valuation, Chapter 2: Finance in a Nutshell. Lily and Nate's numbers come from the text and
// Exhibit 2.4–2.5; the lines of Exhibits 2.1–2.3 are read off the book's charts.
import { motion } from "motion/react";
import type { BeatProps } from "../types.ts";
import { type Box, Bar, Edge, Node, Num, Ping, Stage, Token, Txt, between, toneSoft, toneVar, type SceneTone } from "../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../motion/tokens.ts";

const box = (x: number, y: number, w = 132, h = 60): Box => ({ x, y, w, h });
const money = (k: number) => `$${Math.round(k).toLocaleString("en-US")}k`;

// ── Lily's Dresses in 2020: $10M in, $1.8M out, 18% vs 10%, 28% back in, $1.30M cash flow ─
const CAP = box(86, 62);
const PROFIT = box(314, 62);
const OWNERS = box(314, 192);

export function LilyStart({ beat }: BeatProps) {
  const base = 226;
  const k = 5; // units per percentage point
  const earn = between(CAP, PROFIT, -10);
  const back = between(PROFIT, CAP, -10);
  const out = between(PROFIT, OWNERS);
  const bars = beat >= 1 && beat <= 2;
  return (
    <Stage h={250} label="Lily's Dresses: capital, profit, return on capital and cash flow">
      <Node {...CAP} label="Invested capital" sub="$10 million" tone="def" hl={beat === 0 || beat === 3} dim={beat === 4} />
      <Node {...PROFIT} label="Profit after tax" sub="$1.8 million" tone="def" show={beat >= 1} hl={beat === 1} />
      <Node {...OWNERS} label="Cash flow" sub={beat >= 4 ? "$1.30 million" : "to the owners"} tone="see" show={beat >= 3} hl={beat === 4} dim={beat === 3} />
      <Edge from={earn[0]} to={earn[1]} show={beat >= 1} tone="def" label="earns" labelDy={-9} />
      <Token from={earn[0]} to={earn[1]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="$1.8M" tone="def" absorb />
      <Edge from={back[0]} to={back[1]} show={beat >= 3} tone="prac" label="to grow 5% a year" labelDy={22} />
      <Token from={back[0]} to={back[1]} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="28% of profit" tone="prac" absorb />
      <Edge from={out[0]} to={out[1]} show={beat >= 4} tone="see" />
      <Token from={out[0]} to={out[1]} at={beat >= 4 ? 1 : 0} show={beat >= 4} label="72% of profit" tone="see" absorb />
      {/* ROIC against the cost of capital */}
      <motion.g initial={false} animate={{ opacity: bars ? 1 : beat > 2 ? 0.25 : 0 }} transition={{ duration: 0.3 }}>
        <Bar x={70} base={base} w={34} h={18 * k} tone="def" show={beat >= 1} />
        <Bar x={150} base={base} w={34} h={10 * k} tone="neutral" show={beat >= 1} delay={0.1} />
        <Txt x={70} y={base - 18 * k - 8} size={14} weight={800} tone="def" show={beat >= 1}>
          ROIC 18%
        </Txt>
        <Txt x={150} y={base - 10 * k - 8} size={14} weight={800} tone="neutral" show={beat >= 1}>
          10%
        </Txt>
        <Txt x={150} y={base + 16} size={13} tone="neutral" show={beat >= 1}>
          cost of capital
        </Txt>
        <motion.line
          x1={46}
          x2={174}
          y1={base - 10 * k}
          y2={base - 10 * k}
          stroke={toneVar("neutral")}
          strokeWidth={1.5}
          strokeDasharray="5 5"
          initial={{ opacity: 0 }}
          animate={{ opacity: beat === 2 ? 1 : 0 }}
        />
        <motion.rect
          x={53}
          width={34}
          y={base - 18 * k}
          height={8 * k}
          rx={5}
          fill="none"
          stroke={toneVar("idea")}
          strokeWidth={2.5}
          initial={{ opacity: 0 }}
          animate={{ opacity: beat === 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <Txt x={200} y={base - 14 * k + 5} size={14} weight={800} tone="idea" anchor="start" show={beat === 2} delay={0.2}>
          +8 points
        </Txt>
      </motion.g>
    </Stage>
  );
}

// ── Line charts (Exhibits 2.1–2.3) ──────────────────────────────────────────
type Series = { name: string; pts: number[]; tone: SceneTone; dashed?: boolean; drawn?: boolean };
type Frame = { title: string; hi: number; ticks: number[]; fmt: (v: number) => string };

const X0 = 62;
const X1 = 292;
const Y0 = 50;
const Y1 = 196;
const YEARS = ["2020", "’21", "’22", "’23", "’24", "’25"];
const cx = (i: number) => X0 + (i / (YEARS.length - 1)) * (X1 - X0);
const cy = (v: number, hi: number) => Y1 - (v / hi) * (Y1 - Y0);
const pathOf = (pts: number[], hi: number) => pts.map((v, i) => `${i ? "L" : "M"}${cx(i).toFixed(1)},${cy(v, hi).toFixed(1)}`).join(" ");

function Lines({ frame, series, frames }: { frame: number; series: Series[][]; frames: Frame[] }) {
  const f = frames[frame];
  const all = [...new Set(frames.flatMap((x) => x.ticks.map((t) => `${frames.indexOf(x)}:${t}`)))];
  return (
    <g>
      {frames.map((fr, fi) => (
        <Txt key={fr.title} x={X0 - 30} y={30} size={13} weight={800} anchor="start" show={fi === frame}>
          {fr.title}
        </Txt>
      ))}
      <line x1={X0} x2={X0} y1={Y0 - 10} y2={Y1} className="sc-axis" />
      <line x1={X0} x2={X1} y1={Y1} y2={Y1} className="sc-axis" />
      {all.map((key) => {
        const [fi, t] = key.split(":").map(Number);
        const fr = frames[fi];
        const on = fi === frame;
        return (
          <motion.g key={key} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }}>
            {t > 0 && <line x1={X0} x2={X1} y1={cy(t, fr.hi)} y2={cy(t, fr.hi)} className="sc-grid" />}
            <text x={X0 - 8} y={cy(t, fr.hi) + 4} textAnchor="end" className="sc-tick">
              {fr.fmt(t)}
            </text>
          </motion.g>
        );
      })}
      {YEARS.map((y, i) => (
        <text key={y} x={cx(i)} y={Y1 + 18} textAnchor="middle" className="sc-tick">
          {y}
        </text>
      ))}
      {series[frame].map((s, i) => {
        const end = s.pts[s.pts.length - 1];
        return (
          <g key={i}>
            <motion.path
              fill="none"
              stroke={toneVar(s.tone)}
              strokeWidth={2.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? "7 6" : undefined}
              initial={false}
              animate={{ d: pathOf(s.pts, f.hi), opacity: s.drawn === false ? 0 : 1 }}
              transition={{ d: { duration: 0.7, ease: EASE_IN_OUT }, opacity: { duration: 0.35 } }}
            />
            <motion.text
              x={X1 + 8}
              className="sc-txt"
              fill={toneVar(s.tone)}
              style={{ fontSize: 13, fontWeight: 800 }}
              initial={false}
              animate={{ y: cy(end, f.hi) + 4, opacity: s.drawn === false ? 0 : 1 }}
              transition={{ y: { duration: 0.7, ease: EASE_IN_OUT }, opacity: { duration: 0.35 } }}
            >
              {s.name}
            </motion.text>
          </g>
        );
      })}
    </g>
  );
}

// Exhibit 2.1 (profit) and 2.2 (ROIC, cash flow), values read off the charts.
const LILY = {
  profit: [1800, 1910, 2020, 2130, 2240, 2350],
  roic: [18, 18, 18, 18, 18, 18],
  cash: [1250, 1340, 1430, 1520, 1610, 1700],
};
const LOGAN = {
  profit: [1800, 1980, 2160, 2340, 2520, 2700],
  roic: [18, 17.3, 16.6, 15.9, 15.2, 14.5],
  cash: [500, 500, 480, 450, 400, 350],
};
const K = (v: number) => (v ? `${v / 1000}k` : "0");
const LL_FRAMES: Frame[] = [
  { title: "After-tax operating profit, $", hi: 3000, ticks: [0, 1000, 2000, 3000], fmt: K },
  { title: "Return on invested capital, %", hi: 20, ticks: [0, 10, 20], fmt: String },
  { title: "Cash flow, $", hi: 2000, ticks: [0, 1000, 2000], fmt: K },
];

export function LilyLogan({ beat }: BeatProps) {
  const metric = (["profit", "roic", "cash"] as const)[Math.min(beat, 2)];
  const s = (name: string, pts: number[], tone: SceneTone): Series => ({ name, pts, tone });
  const series = [0, 1, 2].map(() => [s("Logan", LOGAN[metric], "idea"), s("Lily", LILY[metric], "def")]);
  return (
    <Stage h={232} label="Lily's Dresses against Logan's Stores: profit, ROIC and cash flow, 2020 to 2025">
      <Lines frame={Math.min(beat, 2)} series={series} frames={LL_FRAMES} />
    </Stage>
  );
}

// Exhibit 2.3: cash flow, base case against the Emporium expansion.
const BASE = [1300, 1370, 1440, 1510, 1580, 1650];
const EXPAND = [650, 800, 1150, 1500, 1800, 2000];
const EMP_FRAME: Frame[] = [{ title: "Cash flow, $", hi: 2000, ticks: [0, 1000, 2000], fmt: K }];

function Dcf({ y, label, tone, show, hl }: { y: number; label: string; tone: SceneTone; show: boolean; hl: boolean }) {
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0, x: show ? 0 : -6 }} transition={spring.soft}>
      <rect x={302} y={y - 14} width={92} height={28} rx={14} fill={toneSoft(tone)} stroke={toneVar(tone)} strokeWidth={hl ? 2.2 : 1.4} />
      <text x={348} y={y + 5} textAnchor="middle" className="sc-token" fill={toneVar(tone)}>
        {label}
      </text>
    </motion.g>
  );
}

export function Emporium({ beat }: BeatProps) {
  const hi = 2000;
  const lean = [...EXPAND.slice(0, 4).map((v, i) => `${cx(i)},${cy(v, hi)}`), ...BASE.slice(0, 4).map((v, i) => `${cx(i)},${cy(v, hi)}`).reverse()].join(" ");
  const series: Series[][] = [
    [
      { name: "", pts: BASE, tone: "neutral", dashed: true },
      { name: "", pts: EXPAND, tone: "def", drawn: beat >= 1 },
    ],
  ];
  return (
    <Stage h={232} label="Lily's Emporium: cash flow dips for four years, then overtakes; DCF $53 million against $62 million">
      <motion.polygon points={lean} fill={toneSoft("prac")} initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 ? 0.9 : 0 }} transition={{ duration: 0.4, delay: beat === 1 ? 0.4 : 0 }} />
      <Lines frame={0} series={series} frames={EMP_FRAME} />
      <Txt x={cx(1.2)} y={cy(1150, hi) + 6} size={13} tone="prac" show={beat === 1} delay={0.6}>
        lean years
      </Txt>
      {/* legend column: each case, then its DCF value */}
      <Txt x={348} y={48} size={13} weight={800} tone="def" show={beat >= 1}>
        Emporium
      </Txt>
      <Dcf y={70} label="DCF $62M" tone="def" show={beat >= 3} hl={beat === 3} />
      <Txt x={348} y={112} size={13} weight={800} tone="neutral">
        Base case
      </Txt>
      <Dcf y={134} label="DCF $53M" tone="neutral" show={beat >= 2} hl={beat === 2} />
      <Ping x={348} y={70} trigger={beat === 3 ? "on" : "off"} tone="def" r={24} />
    </Stage>
  );
}

// ── Economic profit = (ROIC − cost of capital) × invested capital (Exhibit 2.4) ─
export function EconomicProfit({ beat }: BeatProps) {
  const x0 = 64;
  const x1 = 360;
  const y1 = 196;
  const y0 = 36;
  const X = (k: number) => x0 + (k / 12000) * (x1 - x0);
  const Y = (pct: number) => y1 - (pct / 20) * (y1 - y0);
  const cap = beat >= 1 ? 9500 : 12000;
  const roic = beat >= 1 ? 19 : 18;
  const ep = beat >= 1 ? 855 : 960;
  const T = { duration: 0.7, ease: EASE_IN_OUT };
  return (
    <Stage h={240} label="Economic profit as a rectangle: spread over the cost of capital times invested capital">
      <line x1={x0} x2={x0} y1={y0 - 6} y2={y1} className="sc-axis" />
      <line x1={x0} x2={x1 + 10} y1={y1} y2={y1} className="sc-axis" />
      {[0, 10, 20].map((t) => (
        <text key={t} x={x0 - 8} y={Y(t) + 4} textAnchor="end" className="sc-tick">
          {t}%
        </text>
      ))}
      {/* what the capital must earn: the cost of capital */}
      <motion.rect x={x0} y={Y(10)} height={Y(0) - Y(10)} fill={toneSoft("neutral")} stroke={toneVar("neutral")} strokeWidth={1} initial={false} animate={{ width: X(cap) - x0 }} transition={T} />
      <Txt x={x0 + 12} y={Y(5) + 5} size={13} tone="neutral" anchor="start">
        cost of capital 10%
      </Txt>
      {/* what it earns above that: economic profit */}
      <motion.rect
        x={x0}
        fill={toneSoft("def")}
        stroke={toneVar("def")}
        strokeWidth={2}
        initial={false}
        animate={{ width: X(cap) - x0, y: Y(roic), height: Y(10) - Y(roic) }}
        transition={T}
      />
      <Txt x={x0 + 12} y={Y(roic) - 8} size={13} weight={800} tone="def" anchor="start">
        {`ROIC ${roic}%`}
      </Txt>
      <Txt x={x0 + 12} y={Y(14) + 4} size={13} weight={800} tone="def" anchor="start">
        Economic profit
      </Txt>
      <Num value={ep} format={money} x={x0 + 130} y={Y(14) + 5} size={16} tone="def" anchor="start" />
      {/* the 14% stores Lily wanted to close */}
      <motion.rect
        x={X(9500)}
        y={Y(14)}
        width={X(12000) - X(9500)}
        height={Y(10) - Y(14)}
        rx={3}
        fill="none"
        stroke={toneVar("prac")}
        strokeWidth={2}
        strokeDasharray="6 5"
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      <Txt x={X(9500) + 6} y={Y(10) + 18} size={13} weight={800} tone="prac" anchor="start" show={beat >= 2} delay={0.2}>
        14% stores
      </Txt>
      <Txt x={X(9500) + 6} y={Y(10) + 34} size={13} tone="prac" anchor="start" show={beat >= 2} delay={0.3}>
        still &gt; 10%
      </Txt>
      <Txt x={x0} y={y1 + 20} size={13} anchor="start" tone="neutral">
        invested capital
      </Txt>
      <Num value={cap} format={money} x={x1} y={y1 + 20} size={14} anchor="end" />
    </Stage>
  );
}

// ── Exhibit 2.5: DCF = invested capital + present value of economic profit ───
export function SameAnswer({ beat }: BeatProps) {
  const base = 206;
  const s = 150 / 61911;
  const h = (k: number) => k * s;
  return (
    <Stage h={240} label="DCF value and economic-profit value side by side: both $61,911 thousand">
      <line x1={40} x2={360} y1={base} y2={base} className="sc-axis" />
      <Bar x={110} base={base} w={70} h={h(61911)} tone="def" />
      <Txt x={110} y={base - h(61911) - 10} size={14} weight={800} tone="def">
        $61,911k
      </Txt>
      <Txt x={110} y={base + 20} size={13} tone="neutral">
        DCF
      </Txt>
      <Bar x={270} base={base} w={70} h={h(22220)} tone="neutral" show={beat >= 1} />
      <Bar x={270} base={base - h(22220)} w={70} h={h(39691)} tone="see" show={beat >= 2} />
      <Txt x={318} y={base - h(22220) / 2 + 5} size={13} anchor="start" show={beat >= 1}>
        capital
      </Txt>
      <Txt x={318} y={base - h(22220) - h(39691) / 2 + 5} size={13} anchor="start" tone="see" show={beat >= 2} delay={0.3}>
        + PV of EP
      </Txt>
      <Txt x={270} y={base - h(22220) / 2 + 5} size={13} weight={800} show={beat >= 1}>
        22,220
      </Txt>
      <Txt x={270} y={base - h(22220) - h(39691) / 2 + 5} size={13} weight={800} show={beat >= 2} delay={0.3}>
        39,691
      </Txt>
      <Txt x={270} y={base + 20} size={13} tone="neutral">
        Economic profit
      </Txt>
      <motion.line
        x1={70}
        x2={310}
        y1={base - h(61911)}
        y2={base - h(61911)}
        stroke={toneVar("idea")}
        strokeWidth={2}
        strokeDasharray="6 5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: beat >= 3 ? 1 : 0, opacity: beat >= 3 ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <Txt x={270} y={base - h(61911) - 10} size={14} weight={800} tone="idea" show={beat >= 3} delay={0.3}>
        $61,911k
      </Txt>
    </Stage>
  );
}

// ── Going public: $7 of capital, $20 of value, $32 in five years ────────────
export function SharePath({ beat }: BeatProps) {
  const x0 = 120;
  const x1 = 296;
  const y1 = 206;
  const y0 = 30;
  const P = (d: number) => y1 - (d / 40) * (y1 - y0);
  const T = (yr: number) => x0 + (yr / 5) * (x1 - x0);
  const grow = [0, 1, 2, 3, 4, 5].map((yr) => `${yr ? "L" : "M"}${T(yr).toFixed(1)},${P(20 * 1.1 ** yr).toFixed(1)}`).join(" ");
  const fan = (end: number) => `M${T(0)},${P(20)} Q${T(3)},${P(20 + (end - 20) * 0.45)} ${T(5)},${P(end)}`;
  return (
    <Stage h={232} label="A share: $7 of invested capital, $20 of intrinsic value, $32 five years later">
      <line x1={x0} x2={x0} y1={y0} y2={y1} className="sc-axis" />
      <line x1={x0} x2={x1 + 6} y1={y1} y2={y1} className="sc-axis" />
      <text x={x0} y={y1 + 18} textAnchor="middle" className="sc-tick">
        today
      </text>
      <text x={x1} y={y1 + 18} textAnchor="middle" className="sc-tick">
        in 5 years
      </text>
      {/* capital per share */}
      <motion.line x1={x0 - 10} x2={x0 + 10} y1={P(7)} y2={P(7)} stroke={toneVar("neutral")} strokeWidth={3} strokeLinecap="round" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
      <Txt x={x0 - 16} y={P(7) + 5} size={13} weight={800} tone="neutral" anchor="end">
        capital $7
      </Txt>
      {/* intrinsic value, and the premium over capital */}
      <motion.circle cx={x0} cy={P(20)} r={6} fill={toneVar("def")} stroke="var(--scene-bg)" strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 ? 1 : 0 }} />
      <Txt x={x0 - 16} y={P(20) + 5} size={13} weight={800} tone="def" anchor="end" show={beat >= 1}>
        value $20
      </Txt>
      <motion.path
        d={`M${x0 + 14},${P(20) + 4} L${x0 + 20},${P(20) + 4} L${x0 + 20},${P(7) - 4} L${x0 + 14},${P(7) - 4}`}
        fill="none"
        stroke={toneVar("idea")}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: beat === 1 ? 1 : 0, opacity: beat === 1 ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      />
      <Txt x={x0 + 28} y={P(13.5) + 5} size={13} weight={800} tone="idea" anchor="start" show={beat === 1} delay={0.3}>
        $13 premium
      </Txt>
      {/* as expected: 10% a year */}
      {/* a round cap shows even at pathLength 0, so the line also fades */}
      <motion.path
        d={grow}
        fill="none"
        stroke={toneVar("def")}
        strokeWidth={2.8}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: beat >= 2 ? 1 : 0, opacity: beat >= 2 ? 1 : 0 }}
        transition={{ pathLength: { duration: 0.8, ease: EASE_IN_OUT }, opacity: { duration: 0.15 } }}
      />
      <motion.circle cx={x1} cy={P(32)} r={6} fill={toneVar("def")} stroke="var(--scene-bg)" strokeWidth={2.5} initial={{ opacity: 0 }} animate={{ opacity: beat >= 2 ? 1 : 0 }} transition={{ delay: beat === 2 ? 0.7 : 0 }} />
      <Txt x={x1 + 12} y={P(32) + 5} size={13} weight={800} tone="def" anchor="start" show={beat >= 2} delay={0.7}>
        $32
      </Txt>
      <Txt x={T(2.4)} y={P(26) - 14} size={13} weight={800} tone="def" show={beat === 3}>
        10% a year
      </Txt>
      {/* better or worse than expected */}
      {[
        { end: 38, label: "beat: > 10%", tone: "see" as const },
        { end: 25, label: "miss: < 10%", tone: "prac" as const },
      ].map((f) => (
        <g key={f.label}>
          <motion.path d={fan(f.end)} fill="none" stroke={toneVar(f.tone)} strokeWidth={2.2} strokeDasharray="6 5" initial={{ opacity: 0 }} animate={{ opacity: beat >= 4 ? 1 : 0 }} transition={{ duration: 0.4 }} />
          <Txt x={x1 + 12} y={P(f.end) + 5} size={13} weight={800} tone={f.tone} anchor="start" show={beat >= 4} delay={0.2}>
            {f.label}
          </Txt>
        </g>
      ))}
    </Stage>
  );
}
