// "See it" scenes for 4.7 Tick-Sensitive Orders.
// Upticks are blue, downticks pink: green and red stay reserved for right/wrong.
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Edge, Stage, Txt, toneVar, type SceneTone } from "../../../scene/index.tsx";
import { EASE_IN_OUT, spring } from "../../../motion/tokens.ts";
import { PriceChart, chartX, chartY } from "./kit.tsx";

export const UP_TONE: SceneTone = "def";
export const DOWN_TONE: SceneTone = "game";

// ── The book's Coca-Cola tape (box "Tick Examples") ─────────────────────────
const KO = [56.08, 56.05, 56.05, 56.05, 56.05, 56.07];
const KO_SHOWN = [2, 3, 3, 5, 6];
const KO_LABEL: { text: string; tone: SceneTone; ref: number; refLabel: string }[] = [
  { text: "56.05 < 56.08 · DOWNTICK", tone: DOWN_TONE, ref: 0, refLabel: "last price" },
  { text: "56.05 = 56.05 · ZERO TICK", tone: "neutral", ref: 1, refLabel: "last price" },
  { text: "last different 56.08 was higher · ZERO DOWNTICK", tone: DOWN_TONE, ref: 0, refLabel: "last different price" },
  { text: "still below 56.08 · ZERO DOWNTICK", tone: DOWN_TONE, ref: 0, refLabel: "last different price" },
  { text: "56.07 > 56.05 · UPTICK", tone: UP_TONE, ref: 4, refLabel: "last price" },
];
const chipX = (i: number) => 40 + i * 64;
const koY = (p: number) => 84 - ((p - 56.04) / 0.05) * 44;

export function KoTape({ beat }: BeatProps) {
  const n = KO_SHOWN[beat];
  const now = n - 1;
  const lab = KO_LABEL[beat];
  return (
    <Stage h={214} label="Coca-Cola trade prints classified as upticks, downticks and zero ticks">
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        KO TRADES, OLDEST → NEWEST
      </Txt>
      {/* the price path above the tape */}
      {KO.map((p, i) =>
        i === 0 ? null : (
          <motion.line
            key={`seg${i}`}
            x1={chipX(i - 1)}
            y1={koY(KO[i - 1])}
            x2={chipX(i)}
            y2={koY(p)}
            stroke="var(--ink-3)"
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: i < n ? 0.7 : 0 }}
            transition={{ duration: 0.3 }}
          />
        ),
      )}
      {KO.map((p, i) => (
        <motion.circle
          key={`dot${i}`}
          cx={chipX(i)}
          cy={koY(p)}
          r={i === now ? 6 : 4.5}
          fill={i === now ? toneVar(lab.tone) : "var(--ink-3)"}
          initial={{ opacity: 0 }}
          animate={{ opacity: i < n ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      ))}
      {/* the tape */}
      {KO.map((p, i) => {
        const on = i < n;
        const isNow = i === now;
        const isRef = i === lab.ref && !isNow;
        const c = isNow ? toneVar(lab.tone) : isRef ? "var(--ink-2)" : "var(--node-line)";
        return (
          <motion.g key={`chip${i}`} initial={{ opacity: 0, x: chipX(i) + 18, y: 160 }} animate={{ opacity: on ? 1 : 0, x: on ? chipX(i) : chipX(i) + 18, y: 160 }} transition={spring.soft}>
            <rect x={-28} y={-15} width={56} height={30} rx={9} fill={isNow ? "var(--surface)" : "var(--node)"} stroke={c} strokeWidth={isNow || isRef ? 2.25 : 1.25} />
            <text y={5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: isNow ? 800 : 650 }} fill="var(--ink)">
              {p.toFixed(2)}
            </text>
          </motion.g>
        );
      })}
      <Edge
        key={`cmp${beat}`}
        from={[chipX(now), 142]}
        to={[chipX(lab.ref), 142]}
        bend={now - lab.ref > 1 ? -16 : -9}
        tone={lab.tone === "neutral" ? "neutral" : lab.tone}
        label={lab.refLabel}
        labelDy={now - lab.ref > 1 ? -12 : -9}
      />
      {KO_LABEL.map((l, k) => (
        <Txt key={k} x={200} y={202} size={13} weight={800} tone={l.tone === "neutral" ? undefined : l.tone} show={k === beat} delay={0.25}>
          {l.text}
        </Txt>
      ))}
    </Stage>
  );
}

// ── The book's American Skiing buy downtick order (box "Tick-Sensitive Order Example") ──
// the trailing point is never revealed: it only keeps the last trade away from the right edge
const SKI = [1.01, 1.02, 1.02, 1.03, 1.03, 1.02, 1.02];
const SKI_UPTO = [2, 2, 2, 4, 5];
const SKI_CEIL: (number | null)[] = [null, 1.01, 1.01, 1.02, 1.02];
const SKI_LO = 0.995;
const SKI_HI = 1.04;

export function SkiChart({ beat }: BeatProps) {
  const ceil = SKI_CEIL[beat];
  const y = chartY(ceil ?? 1.01, SKI_LO, SKI_HI);
  return (
    <Stage h={232} label="A buy downtick order for SKI: the highest price it can pay rises with the market">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="bid" className="caps">
        BUY DOWNTICK ORDER · SKI
      </Txt>
      <PriceChart
        pts={SKI}
        upto={SKI_UPTO[beat]}
        lo={SKI_LO}
        hi={SKI_HI}
        ticks={[1.0, 1.01, 1.02, 1.03, 1.04]}
        fmtP={(p) => p.toFixed(2)}
        tone="see"
        y0={40}
        marks={[
          { i: 2, label: "zero uptick", tone: "neutral", show: beat <= 2 },
          { i: 4, label: "1.03", tone: "neutral", show: beat === 3 },
          { i: 5, label: "you buy 1.02", tone: "bid", show: beat >= 4, below: true },
        ]}
      >
        <motion.g initial={false} animate={{ opacity: ceil === null ? 0 : 1, y }} transition={{ y: { duration: 0.6, ease: EASE_IN_OUT }, opacity: { duration: 0.3 } }}>
          <line x1={52} x2={380} y1={0} y2={0} stroke={toneVar("bid")} strokeWidth={2} strokeDasharray="6 5" />
        </motion.g>
        {/* legend for the dashed line, in the header row */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: ceil === null ? 0 : 1 }} transition={{ duration: 0.3 }}>
          <line x1={212} x2={230} y1={18} y2={18} stroke={toneVar("bid")} strokeWidth={2} strokeDasharray="5 3" />
          <text x={380} y={22} textAnchor="end" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("bid")}>
            {`most you can pay: ${(ceil ?? 1.01).toFixed(2)}`}
          </text>
        </motion.g>
        <motion.text
          x={chartX(SKI, 2)}
          y={chartY(1.01, SKI_LO, SKI_HI, 40) + 20}
          textAnchor="middle"
          className="sc-txt"
          style={{ fontSize: 11.5, fontWeight: 800 }}
          fill="var(--ink-3)"
          initial={{ opacity: 0 }}
          animate={{ opacity: beat === 2 ? 1 : 0 }}
          transition={{ duration: 0.3, delay: beat === 2 ? 0.3 : 0 }}
        >
          broker holds the order…
        </motion.text>
      </PriceChart>
    </Stage>
  );
}

// ── A buy downtick order is a buy limit that follows prices up (our numbers) ──
const DL = [20.1, 20.12, 20.15, 20.15, 20.18, 20.16];
// one unrevealed point after the last, so the chart leaves room on the right
const DL_PTS = [...DL, 20.16];
// limit: just below the first price; raised when price rises, left alone when it falls
const DL_LIMIT = DL.reduce<number[]>((acc, p, i) => {
  if (i === 0) acc.push(+(p - 0.01).toFixed(2));
  else acc.push(p > DL[i - 1] ? +(p - 0.01).toFixed(2) : acc[i - 1]);
  return acc;
}, []);
const DL_UPTO = [0, 4, 5, 5];
const DL_LO = 20.06;
const DL_HI = 20.21;

export function DynamicLimit({ beat }: BeatProps) {
  const upto = DL_UPTO[beat];
  const X = (i: number) => chartX(DL_PTS, i);
  const Y = (p: number) => chartY(p, DL_LO, DL_HI, 40);
  const step = X(1) - X(0);
  let d = `M${X(0)},${Y(DL_LIMIT[0])}`;
  DL_LIMIT.forEach((l, i) => {
    d += ` H${X(i)} V${Y(l)}`;
    if (i === DL.length - 1) d += ` H${X(i) + step * 0.4}`;
  });
  const raised = DL_LIMIT.map((l, i) => i > 0 && l > DL_LIMIT[i - 1]);
  return (
    <Stage h={232} label="A buy limit price that rises with the market and never falls">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        PRICE AND YOUR EFFECTIVE BUY LIMIT
      </Txt>
      <PriceChart
        pts={DL_PTS}
        upto={upto}
        lo={DL_LO}
        hi={DL_HI}
        ticks={[20.08, 20.12, 20.16, 20.2]}
        fmtP={(p) => p.toFixed(2)}
        tone="see"
        y0={40}
        marks={[{ i: 5, label: "can trade: 20.16", tone: "bid", show: beat === 2, below: true }]}
      >
        <clipPath id="dl-clip">
          <motion.rect x={0} y={0} height={240} initial={false} animate={{ width: X(upto) + (upto === DL.length - 1 ? step * 0.4 + 4 : 4) }} transition={{ duration: 0.6, ease: EASE_IN_OUT }} />
        </clipPath>
        <path d={d} fill="none" stroke={toneVar("bid")} strokeWidth={2.25} strokeDasharray="5 4" clipPath="url(#dl-clip)" />
        <Txt x={X(0) + 6} y={Y(DL_LIMIT[0]) + 17} anchor="start" size={11.5} weight={800} tone="bid">
          buy limit
        </Txt>
        {DL_LIMIT.map((l, i) =>
          raised[i] ? (
            <Txt key={i} x={X(i)} y={Y(l) - 8} size={15} weight={800} tone="prac" show={beat === 3} delay={0.15 * i}>
              ↻
            </Txt>
          ) : null,
        )}
        <Txt x={216} y={222} size={11.5} weight={800} tone="prac" show={beat === 3}>
          ↻ = cancel and resubmit by hand
        </Txt>
      </PriceChart>
    </Stage>
  );
}
