// Chapter 4 scene kit, shared by every unit: an order-book ladder and a price chart.
// Same rules as src/scene: derive props from `beat`, keep elements mounted, colours in SVG attributes.
// Bids are blue (tone "bid"), offers orange (tone "ask"); green/red stay reserved for right/wrong.
import { useId, type ReactNode } from "react";
import { motion } from "motion/react";
import { type SceneTone, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";

// ── Order-book ladder ───────────────────────────────────────────────────────
/** One price level: size bid (buy orders) and/or size offered (sell orders) at that price. */
export type Lvl = { p: number; bid?: number; ask?: number };

export type LadderMark = {
  p: number;
  /** Short text beside the row, e.g. "best bid", "Joe 100". */
  label: string;
  side: "bid" | "ask";
  tone?: SceneTone;
  show?: boolean;
};

/**
 * A vertical price ladder: prices in the middle, bid sizes as blue bars to the left, offered sizes as
 * orange bars to the right. Rows are keyed by price, so changing `levels` (sizes shrinking as an order
 * fills, a new level appearing) animates in place. Pass `levels` sorted from highest to lowest price.
 */
export function Ladder({
  levels,
  x = 200,
  y = 46,
  rowH = 24,
  priceW = 64,
  barMax = 104,
  maxSize,
  fmtP = (p) => p.toFixed(2),
  fmtS = (s) => s.toLocaleString("en-US"),
  hl = [],
  hlTone = "see",
  dim = false,
  marks = [],
  headers = true,
  band = true,
}: {
  levels: Lvl[];
  /** Centre of the price column. */
  x?: number;
  /** Centre of the first (highest) row. */
  y?: number;
  rowH?: number;
  priceW?: number;
  /** Width of a bar at `maxSize`. */
  barMax?: number;
  /** Size that fills a whole bar (defaults to the largest size shown). */
  maxSize?: number;
  fmtP?: (p: number) => string;
  fmtS?: (s: number) => string;
  /** Prices whose rows are highlighted. */
  hl?: number[];
  hlTone?: SceneTone;
  /** Push the whole ladder back while something else speaks. */
  dim?: boolean;
  marks?: LadderMark[];
  headers?: boolean;
  /** Tint the empty rows between the best bid and the best offer (the spread). */
  band?: boolean;
}) {
  const max = maxSize ?? Math.max(1, ...levels.map((l) => Math.max(l.bid ?? 0, l.ask ?? 0)));
  const left = x - priceW / 2;
  const right = x + priceW / 2;
  const bestBid = Math.max(...levels.filter((l) => (l.bid ?? 0) > 0).map((l) => l.p));
  const bestAsk = Math.min(...levels.filter((l) => (l.ask ?? 0) > 0).map((l) => l.p));
  const w = (s?: number) => (s && s > 0 ? Math.max(3, (s / max) * barMax) : 0);
  return (
    <motion.g animate={{ opacity: dim ? 0.32 : 1 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
      {headers && (
        <g className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }}>
          <text x={left - 6} y={y - rowH / 2 - 8} textAnchor="end" fill={toneVar("bid")}>
            BIDS
          </text>
          <text x={x} y={y - rowH / 2 - 8} textAnchor="middle" fill="var(--ink-3)">
            PRICE
          </text>
          <text x={right + 6} y={y - rowH / 2 - 8} textAnchor="start" fill={toneVar("ask")}>
            OFFERS
          </text>
        </g>
      )}
      {levels.map((l, i) => {
        const cy = y + i * rowH;
        const inSpread = band && Number.isFinite(bestBid) && Number.isFinite(bestAsk) && l.p > bestBid && l.p < bestAsk;
        const lit = hl.includes(l.p);
        const bw = w(l.bid);
        const aw = w(l.ask);
        return (
          <motion.g key={l.p} initial={false} animate={{ y: cy }} transition={spring.soft}>
            <motion.rect
              x={left - barMax - 8}
              y={-rowH / 2 + 1}
              width={priceW + 2 * barMax + 16}
              height={rowH - 2}
              rx={6}
              initial={false}
              animate={{ opacity: lit ? 1 : inSpread ? 0.55 : 0 }}
              fill={lit ? toneSoft(hlTone) : "var(--surface-2)"}
              stroke={lit ? toneVar(hlTone) : "none"}
              strokeWidth={1.5}
              transition={{ duration: 0.3 }}
            />
            <motion.rect
              y={-rowH / 2 + 4}
              height={rowH - 8}
              rx={4}
              fill={toneVar("bid")}
              initial={false}
              animate={{ x: left - 4 - bw, width: bw, opacity: bw ? 0.9 : 0 }}
              transition={spring.fill}
            />
            <motion.rect
              x={right + 4}
              y={-rowH / 2 + 4}
              height={rowH - 8}
              rx={4}
              fill={toneVar("ask")}
              initial={false}
              animate={{ width: aw, opacity: aw ? 0.9 : 0 }}
              transition={spring.fill}
            />
            <text y={4.5} x={x} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: l.p === bestBid || l.p === bestAsk ? 800 : 650 }} fill="var(--ink)">
              {fmtP(l.p)}
            </text>
            <motion.text
              y={4.5}
              textAnchor="end"
              className="sc-num"
              style={{ fontSize: 12, fontWeight: 750 }}
              fill={toneVar("bid")}
              initial={false}
              animate={{ x: left - 10 - bw, opacity: bw ? 1 : 0 }}
              transition={spring.fill}
            >
              {l.bid ? fmtS(l.bid) : ""}
            </motion.text>
            <motion.text
              y={4.5}
              textAnchor="start"
              className="sc-num"
              style={{ fontSize: 12, fontWeight: 750 }}
              fill={toneVar("ask")}
              initial={false}
              animate={{ x: right + 10 + aw, opacity: aw ? 1 : 0 }}
              transition={spring.fill}
            >
              {l.ask ? fmtS(l.ask) : ""}
            </motion.text>
          </motion.g>
        );
      })}
      {marks.map((m) => {
        const i = levels.findIndex((l) => l.p === m.p);
        if (i < 0) return null;
        const cy = y + i * rowH + 4.5;
        const tone = m.tone ?? m.side;
        // sit just past the size number on that side (about 7 units per character at 12px)
        const size = m.side === "bid" ? levels[i].bid : levels[i].ask;
        const off = 10 + w(size) + (size ? fmtS(size).length * 7.2 + 10 : 0);
        return (
          <motion.text
            key={`${m.side}${m.p}${m.label}`}
            initial={{ opacity: 0, x: m.side === "bid" ? left - off : right + off }}
            animate={{ opacity: m.show === false ? 0 : 1, x: m.side === "bid" ? left - off : right + off }}
            y={cy}
            textAnchor={m.side === "bid" ? "end" : "start"}
            className="sc-txt halo"
            style={{ fontSize: 11.5, fontWeight: 800 }}
            fill={toneVar(tone)}
            transition={{ opacity: { duration: 0.3 }, x: spring.fill }}
          >
            {m.label}
          </motion.text>
        );
      })}
    </motion.g>
  );
}

/** Y coordinate of a price row, for placing tokens or arrows next to a Ladder with the same props. */
export function ladderY(levels: Lvl[], p: number, y = 46, rowH = 24) {
  const i = levels.findIndex((l) => l.p === p);
  return y + Math.max(0, i) * rowH;
}

// ── Price chart ─────────────────────────────────────────────────────────────
export type ChartLevel = { p: number; label: string; tone?: SceneTone; show?: boolean; dashed?: boolean };
export type ChartMark = { i: number; label: string; tone?: SceneTone; show?: boolean; below?: boolean };

/**
 * A price path revealed up to point `upto` (an index into `pts`), with horizontal levels (limit, stop,
 * touch prices) and labelled marks. Moving `upto` forward draws the line on; moving it back erases it.
 */
export function PriceChart({
  pts,
  upto,
  lo,
  hi,
  ticks = [],
  x0 = 52,
  x1 = 380,
  y0 = 30,
  y1 = 196,
  levels = [],
  marks = [],
  fmtP = (p) => String(p),
  tone = "def",
  dot = true,
  children,
}: {
  pts: number[];
  upto: number;
  lo: number;
  hi: number;
  /** Prices labelled on the left axis. */
  ticks?: number[];
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  levels?: ChartLevel[];
  marks?: ChartMark[];
  fmtP?: (p: number) => string;
  tone?: SceneTone;
  dot?: boolean;
  /** Extra SVG drawn above the path (use chartX/chartY with the same props to place it). */
  children?: ReactNode;
}) {
  const clip = `pc${useId().replace(/:/g, "")}`;
  const X = (i: number) => x0 + (pts.length > 1 ? (i / (pts.length - 1)) * (x1 - x0) : 0);
  const Y = (p: number) => y1 - ((p - lo) / (hi - lo)) * (y1 - y0);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(p).toFixed(1)}`).join(" ");
  const k = Math.max(0, Math.min(pts.length - 1, upto));
  return (
    <g>
      <line x1={x0} x2={x0} y1={y0 - 8} y2={y1 + 6} className="sc-axis" />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={x0} x2={x1} y1={Y(t)} y2={Y(t)} className="sc-grid" />
          <text x={x0 - 8} y={Y(t) + 4} textAnchor="end" className="sc-tick">
            {fmtP(t)}
          </text>
        </g>
      ))}
      {levels.map((l) => (
        <motion.g key={`${l.label}${l.p}`} initial={{ opacity: 0 }} animate={{ opacity: l.show === false ? 0 : 1 }} transition={{ duration: 0.3 }}>
          <line x1={x0} x2={x1} y1={Y(l.p)} y2={Y(l.p)} stroke={toneVar(l.tone ?? "prac")} strokeWidth={1.75} strokeDasharray={l.dashed === false ? undefined : "6 5"} />
          <text x={x1} y={Y(l.p) - 6} textAnchor="end" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar(l.tone ?? "prac")}>
            {l.label}
          </text>
        </motion.g>
      ))}
      <clipPath id={clip}>
        <motion.rect x={x0 - 4} y={0} height={y1 + 40} initial={false} animate={{ width: X(k) - x0 + 8 }} transition={{ duration: 0.6, ease: EASE_IN_OUT }} />
      </clipPath>
      <path d={d} fill="none" stroke={toneVar(tone)} strokeWidth={2.6} strokeLinejoin="round" strokeLinecap="round" clipPath={`url(#${clip})`} />
      {marks.map((m) => (
        <motion.g key={`${m.i}${m.label}`} initial={{ opacity: 0 }} animate={{ opacity: m.show === false ? 0 : 1 }} transition={{ duration: 0.3, delay: m.show === false ? 0 : 0.35 }}>
          <circle cx={X(m.i)} cy={Y(pts[m.i])} r={5} fill={toneVar(m.tone ?? "prac")} stroke="var(--scene-bg)" strokeWidth={2} />
          <text x={X(m.i)} y={Y(pts[m.i]) + (m.below ? 20 : -11)} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar(m.tone ?? "prac")}>
            {m.label}
          </text>
        </motion.g>
      ))}
      {dot && (
        <motion.circle
          r={6}
          fill={toneVar(tone)}
          stroke="var(--scene-bg)"
          strokeWidth={2.5}
          initial={false}
          animate={{ cx: X(k), cy: Y(pts[k]) }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        />
      )}
      {children}
    </g>
  );
}

export const chartX = (pts: number[], i: number, x0 = 52, x1 = 380) => x0 + (pts.length > 1 ? (i / (pts.length - 1)) * (x1 - x0) : 0);
export const chartY = (p: number, lo: number, hi: number, y0 = 30, y1 = 196) => y1 - ((p - lo) / (hi - lo)) * (y1 - y0);
