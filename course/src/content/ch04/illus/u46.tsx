// "See it" scenes for 4.6 Market-If-Touched Orders.
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Ping, Stage, toneSoft, toneVar, type SceneTone } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT } from "../../../motion/tokens.ts";
import { PriceChart, chartX, chartY } from "./kit.tsx";
import { LevelTags, StatusPill } from "./u45.tsx";

// ── Buy stop above, buy MIT below (our numbers) ────────────────────────────
const SM = [50, 50.4, 50.8, 51.3, 51.7, 52.1, 51.4, 50.4, 49.3, 48.4, 47.9, 48.5, 49.2];
const S = { lo: 46.5, hi: 53.5, y0: 40, y1: 204 };

export function StopVsMit({ beat }: BeatProps) {
  const upto = [0, 5, 10, 12][beat] ?? 12;
  const y = (p: number) => chartY(p, S.lo, S.hi, S.y0, S.y1);
  return (
    <Stage h={226} label="A buy stop above the market buys after a rise; a buy market-if-touched order below the market buys after a fall">
      <PriceChart
        pts={SM}
        upto={upto}
        lo={S.lo}
        hi={S.hi}
        y0={S.y0}
        y1={S.y1}
        ticks={[48, 50, 52]}
        levels={[
          { p: 52, label: "", tone: "prac" },
          { p: 48, label: " ", tone: "see" },
        ]}
        marks={[
          { i: 5, label: beat >= 3 ? "stop buys the rise" : "stop buys", tone: "prac", show: beat >= 1 },
          { i: 10, label: beat >= 3 ? "MIT buys the dip" : "MIT buys", tone: "see", show: beat >= 2, below: true },
        ]}
      >
        <LevelTags
          tags={[
            { y: y(52), label: "buy stop 52", tone: "prac" },
            { y: y(48), label: "buy MIT 48", tone: "see" },
          ]}
        />
        {beat === 1 && <Ping x={chartX(SM, 5)} y={y(52.1)} trigger="stop" tone="prac" r={20} />}
        {beat === 2 && <Ping x={chartX(SM, 10)} y={y(47.9)} trigger="mit" tone="see" r={20} />}
      </PriceChart>
    </Stage>
  );
}

// ── Limit vs MIT at the same price (our numbers and assumption) ─────────────
const MV = [49.3, 48.9, 48.5, 48.2, 48.0, 48.35, 48.7, 49.1];
const M = { lo: 47.4, hi: 49.8, y0: 62, y1: 206 };

export function MitVsLimit({ beat }: BeatProps) {
  const upto = [1, 4, 4, 7, 7][beat] ?? 7;
  const y = (p: number) => chartY(p, M.lo, M.hi, M.y0, M.y1);
  const limit = beat === 0 ? "LIMIT BUY 48 · waiting" : beat < 3 ? "LIMIT · others first" : "LIMIT · not filled";
  const mit = beat === 0 ? "MIT BUY 48 · waiting" : beat === 1 ? "MIT · touched!" : "MIT · bought 48.10";
  const limitTone: SceneTone = beat >= 3 ? "idea" : "neutral";
  const mitTone: SceneTone = beat === 0 ? "neutral" : "see";
  const fx = chartX(MV, 4.45);
  return (
    <Stage h={228} label="A limit buy and a market-if-touched buy both at 48: price touches 48 briefly; the MIT buys at 48.10, the limit order misses">
      <StatusPill x={14} y={22} w={180} text={limit} tone={limitTone} />
      <StatusPill x={206} y={22} w={180} text={mit} tone={mitTone} />
      <PriceChart
        pts={MV}
        upto={upto}
        lo={M.lo}
        hi={M.hi}
        y0={M.y0}
        y1={M.y1}
        ticks={[48, 49]}
        fmtP={(p) => p.toFixed(2)}
        levels={[{ p: 48, label: "", tone: "see" }]}
      >
        <LevelTags tags={[{ y: y(48), label: "limit 48 · MIT 48", tone: "see" }]} />
        {beat === 1 && <Ping x={chartX(MV, 4)} y={y(48)} trigger="touch" tone="see" r={18} />}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat === 1 || beat === 2 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 1 ? 0.5 : 0 }}>
          <text x={chartX(MV, 4)} y={y(48) + 22} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11, fontWeight: 700 }} fill="var(--ink-3)">
            a few shares, to earlier bids
          </text>
        </motion.g>
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 2 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 2 ? 0.3 : 0 }}>
          <circle cx={fx} cy={y(48.1)} r={5} fill={toneVar("see")} stroke="var(--scene-bg)" strokeWidth={2} />
          <text x={fx + 9} y={y(48.1) - 9} className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("see")}>
            MIT bought 48.10
          </text>
        </motion.g>
      </PriceChart>
    </Stage>
  );
}

// ── Table 4-2: four sell orders at £5 ───────────────────────────────────────
type Col = { title: [string, string]; above: boolean; tone: SceneTone; result: [string, string]; usage: string };
const COLS: Col[] = [
  { title: ["Standing", "limit sell"], above: false, tone: "idea", result: ["at £5", "or better"], usage: "Common" },
  { title: ["Market", "stop sell"], above: true, tone: "prac", result: ["whatever the", "market bears"], usage: "Occasional" },
  { title: ["Limit-stop", "sell"], above: true, tone: "game", result: ["then only at", "£5 or better"], usage: "Rare" },
  { title: ["Market-if-", "touched sell"], above: false, tone: "see", result: ["whatever the", "market bears"], usage: "Very rare" },
];
const FIVE = 116;
const XS = [54, 152, 250, 348];

export function FourAtFive({ beat }: BeatProps) {
  return (
    <Stage h={248} label="Table 4-2: standing limit, market stop, limit-stop and market-if-touched sell orders, all at 5 pounds">
      <line x1={10} x2={390} y1={FIVE} y2={FIVE} stroke="var(--ink-3)" strokeWidth={1.5} strokeDasharray="6 5" />
      <text x={12} y={FIVE - 6} className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill="var(--ink-2)">
        £5
      </text>
      {COLS.map((col, i) => {
        const cx = XS[i];
        const on = beat >= i;
        const now = beat === i || beat >= 4;
        const c = toneVar(col.tone);
        const y0 = col.above ? 72 : 160;
        const yHit = col.above ? FIVE - 7 : FIVE + 7;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on ? (now ? 1 : 0.45) : 0.14 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
            <text x={cx} y={22} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 800 }} fill="var(--ink)">
              {col.title[0]}
            </text>
            <text x={cx} y={37} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 800 }} fill="var(--ink)">
              {col.title[1]}
            </text>
            <text x={cx} y={col.above ? 58 : 182} textAnchor="middle" className="sc-txt" style={{ fontSize: 10.5, fontWeight: 700 }} fill="var(--ink-3)">
              {col.above ? "starts above" : "starts below"}
            </text>
            <motion.path
              d={`M${cx},${y0} L${cx},${yHit}`}
              stroke={c}
              strokeWidth={2.4}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: on ? 1 : 0 }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT, delay: on && beat === i ? 0.2 : 0 }}
            />
            <motion.circle
              cx={cx}
              r={6}
              fill={c}
              stroke="var(--scene-bg)"
              strokeWidth={2}
              initial={false}
              animate={{ cy: on ? (col.above ? FIVE - 1 : FIVE + 1) : y0 }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT, delay: on && beat === i ? 0.2 : 0 }}
            />
            <text x={cx + 9} y={(y0 + FIVE) / 2 + 4} className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800 }} fill={c}>
              {col.above ? "falls" : "rises"}
            </text>
            {beat === i && <Ping x={cx} y={FIVE} trigger={`hit${i}`} tone={col.tone} r={16} />}
            <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.3, delay: on && beat === i ? 0.7 : 0 }}>
              <rect x={cx - 46} y={194} width={92} height={34} rx={9} fill={toneSoft(col.tone)} stroke={c} strokeWidth={1.25} />
              <text x={cx} y={208} textAnchor="middle" className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800 }} fill={c}>
                {col.result[0]}
              </text>
              <text x={cx} y={221} textAnchor="middle" className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800 }} fill={c}>
                {col.result[1]}
              </text>
            </motion.g>
            <motion.text
              x={cx}
              y={242}
              textAnchor="middle"
              className="sc-txt caps"
              style={{ fontSize: 10, fontWeight: 800 }}
              fill="var(--ink-2)"
              initial={false}
              animate={{ opacity: beat >= 4 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: beat >= 4 ? 0.15 * i : 0 }}
            >
              {col.usage.toUpperCase()}
            </motion.text>
          </motion.g>
        );
      })}
    </Stage>
  );
}
