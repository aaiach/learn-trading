// Scene toolkit for "See it" illustrations.
// Colours on motion.* elements go in SVG attributes (fill=, stroke=), never in `style`:
// Motion keeps style values it can't animate (var(--x)) and silently ignores later changes.
// Scenes are beat-driven: derive every prop from `beat`, keep elements mounted, and let motion
// animate the difference. Going back a beat plays the move in reverse.
// Standard canvas: 400 units wide. Labels ≥ 13 units so they stay readable at phone width.
import { useEffect, useId, useMemo, useRef, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { EASE_IN_OUT, EASE_OUT, spring } from "../motion/tokens.ts";

export type Pt = readonly [number, number];
export type SceneTone =
  | "def"
  | "idea"
  | "book"
  | "see"
  | "prac"
  | "game"
  | "good"
  | "bad"
  | "cash"
  | "asset"
  | "neutral";

const toneVar = (t: SceneTone = "neutral") =>
  t === "neutral" ? "var(--ink-3)" : t === "cash" ? "var(--cash)" : t === "asset" ? "var(--asset)" : `var(--${t})`;
const toneSoft = (t: SceneTone = "neutral") =>
  t === "neutral" ? "var(--surface-2)" : t === "cash" ? "var(--good-soft)" : t === "asset" ? "var(--def-soft)" : `var(--${t}-soft)`;

// ── Geometry ────────────────────────────────────────────────────────────────
export function quadAt(a: Pt, b: Pt, bend: number, t: number): Pt {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  // control point sits `bend` units to the left of the travel direction (negative = right)
  const cx = mx + (dy / len) * bend * 2;
  const cy = my - (dx / len) * bend * 2;
  const u = 1 - t;
  return [u * u * a[0] + 2 * u * t * cx + t * t * b[0], u * u * a[1] + 2 * u * t * cy + t * t * b[1]];
}

export function quadPath(a: Pt, b: Pt, bend = 0): string {
  if (!bend) return `M${a[0]},${a[1]} L${b[0]},${b[1]}`;
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (dy / len) * bend * 2;
  const cy = my - (dx / len) * bend * 2;
  return `M${a[0]},${a[1]} Q${cx},${cy} ${b[0]},${b[1]}`;
}

export type Box = { x: number; y: number; w: number; h: number };

/** Point where the ray from the box centre towards `toward` leaves the box (plus a gap). */
export function exitPoint(box: Box, toward: Pt, gap = 6): Pt {
  const dx = toward[0] - box.x;
  const dy = toward[1] - box.y;
  if (!dx && !dy) return [box.x, box.y];
  const sx = dx ? box.w / 2 / Math.abs(dx) : Infinity;
  const sy = dy ? box.h / 2 / Math.abs(dy) : Infinity;
  const s = Math.min(sx, sy);
  const len = Math.hypot(dx, dy);
  return [box.x + dx * s + (dx / len) * gap, box.y + dy * s + (dy / len) * gap];
}

function edgeDist(box: Box, dx: number, dy: number) {
  const sx = dx ? box.w / 2 / Math.abs(dx) : Infinity;
  const sy = dy ? box.h / 2 / Math.abs(dy) : Infinity;
  return Math.min(sx, sy);
}

/**
 * A straight segment from box `a` to box `b`, shifted sideways by `offset` (a "lane", so two
 * flows between the same boxes don't overlap) and trimmed so it starts/ends `pad` units outside
 * the boxes. For tokens that should rest beside a box, use pad = tokenWidth / 2 + 4.
 */
export function between(a: Box, b: Box, offset = 0, padA = 6, padB = padA): [Pt, Pt] {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy * offset;
  const py = ux * offset;
  const ta = edgeDist(a, ux, uy) + padA;
  const tb = edgeDist(b, ux, uy) + padB;
  return [
    [a.x + px + ux * ta, a.y + py + uy * ta],
    [b.x + px - ux * tb, b.y + py - uy * tb],
  ];
}

/** Endpoints for an edge between two boxes, trimmed to their borders. */
export function link(a: Box, b: Box, bend = 0, gap = 6): [Pt, Pt] {
  const mid = quadAt([a.x, a.y], [b.x, b.y], bend, 0.5);
  return [exitPoint(a, bend ? mid : [b.x, b.y], gap), exitPoint(b, bend ? mid : [a.x, a.y], gap)];
}

// ── Stage ───────────────────────────────────────────────────────────────────
export function Stage({
  w = 400,
  h = 240,
  label,
  children,
}: {
  w?: number;
  h?: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <svg className="stage" viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="var(--scene-grid)" />
        </pattern>
      </defs>
      <rect width={w} height={h} rx="16" fill="var(--scene-bg)" />
      <rect width={w} height={h} rx="16" fill="url(#dots)" />
      {children}
    </svg>
  );
}

// ── Node ────────────────────────────────────────────────────────────────────
export type NodeProps = {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  icon?: LucideIcon;
  tone?: SceneTone;
  /** Visible at all. */
  show?: boolean;
  /** Pushed back while another part of the scene is speaking. */
  dim?: boolean;
  /** Emphasised: tinted fill and coloured border. */
  hl?: boolean;
};

export function Node({ x, y, w = 112, h = 62, label, sub, icon: Icon, tone = "neutral", show = true, dim, hl }: NodeProps) {
  const c = toneVar(tone);
  const hasIcon = !!Icon;
  const labelY = hasIcon ? (sub ? 8 : 13) : sub ? -2 : 5;
  return (
    <motion.g
      initial={{ opacity: 0, x, y: y + 6 }}
      animate={{ opacity: show ? (dim ? 0.32 : 1) : 0, x, y: show ? y : y + 6 }}
      transition={{ ...spring.soft, opacity: { duration: 0.3, ease: EASE_OUT } }}
      style={{ pointerEvents: show ? "auto" : "none" }}
    >
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={12}
        className="sc-node"
        style={{ fill: hl ? toneSoft(tone) : "var(--node)", stroke: hl ? c : "var(--node-line)", strokeWidth: hl ? 2 : 1.25 }}
      />
      {Icon && (
        <g transform={`translate(-10, ${sub ? -24 : -20})`} style={{ color: c }}>
          <Icon width={20} height={20} strokeWidth={2.2} />
        </g>
      )}
      <text y={labelY} textAnchor="middle" className="sc-label">
        {label}
      </text>
      {sub && (
        <text y={labelY + 15} textAnchor="middle" className="sc-sub">
          {sub}
        </text>
      )}
    </motion.g>
  );
}

// ── Edge ────────────────────────────────────────────────────────────────────
export function Edge({
  from,
  to,
  bend = 0,
  tone = "neutral",
  show = true,
  dashed,
  arrow = true,
  label,
  labelAt = 0.5,
  labelDy = -8,
  width = 2,
}: {
  from: Pt;
  to: Pt;
  bend?: number;
  tone?: SceneTone;
  show?: boolean;
  dashed?: boolean;
  arrow?: boolean;
  label?: string;
  labelAt?: number;
  labelDy?: number;
  width?: number;
}) {
  const d = quadPath(from, to, bend);
  const maskId = `em${useId().replace(/:/g, "")}`;
  const c = toneVar(tone);
  const end = quadAt(from, to, bend, 1);
  const pre = quadAt(from, to, bend, 0.94);
  const ang = (Math.atan2(end[1] - pre[1], end[0] - pre[0]) * 180) / Math.PI;
  const lp = quadAt(from, to, bend, labelAt);
  return (
    <g style={{ pointerEvents: "none" }}>
      {dashed ? (
        // pathLength drawing replaces the dash pattern, so a dashed edge is revealed through a drawn mask
        <>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <motion.path
              d={d}
              fill="none"
              stroke="#fff"
              strokeWidth={width + 6}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{ duration: 0.55, ease: EASE_IN_OUT }}
            />
          </mask>
          <motion.path
            d={d}
            fill="none"
            stroke={c}
            strokeWidth={width}
            strokeLinecap="round"
            strokeDasharray="5 6"
            mask={`url(#${maskId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </>
      ) : (
        <motion.path
          d={d}
          fill="none"
          stroke={c}
          strokeWidth={width}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
          transition={{ pathLength: { duration: 0.55, ease: EASE_IN_OUT }, opacity: { duration: 0.2 } }}
        />
      )}
      {arrow && (
        <motion.path
          d="M-7,-5 L0,0 L-7,5"
          fill="none"
          stroke={c}
          strokeWidth={width}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${end[0]},${end[1]}) rotate(${ang})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.2, delay: show ? 0.45 : 0 }}
        />
      )}
      {label && (
        <motion.text
          x={lp[0]}
          y={lp[1] + labelDy}
          textAnchor="middle"
          className="sc-edge-label"
          fill={c}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: 0.25, delay: show ? 0.35 : 0 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
}

// ── Token: a chip that travels along an edge ────────────────────────────────
export function tokenWidth(label: string, icon: boolean) {
  return Math.round(label.length * 7.4 + (icon ? 30 : 18));
}

export function Token({
  from,
  to,
  bend = 0,
  at,
  show = true,
  label,
  icon: Icon,
  tone = "cash",
  delay = 0,
  duration,
  absorb,
}: {
  from: Pt;
  to: Pt;
  bend?: number;
  /** 0 = at `from`, 1 = at `to`. Changing it makes the token travel the path. */
  at: 0 | 1;
  /** Fade out on arrival, as if absorbed by the destination (use when it would cover a label). */
  absorb?: boolean;
  show?: boolean;
  label: string;
  icon?: LucideIcon;
  tone?: SceneTone;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const pts = useMemo(() => Array.from({ length: 21 }, (_, i) => quadAt(from, to, bend, i / 20)), [from, to, bend]);
  const len = useMemo(() => Math.hypot(to[0] - from[0], to[1] - from[1]), [from, to]);
  // Travel forward along the path; travel back only if it had arrived; otherwise just sit at `from`.
  const arrived = useRef(false);
  const back = at === 0 && arrived.current;
  useEffect(() => {
    arrived.current = at === 1;
  }, [at]);
  const frames = useMemo(() => (at ? pts : back ? [...pts].reverse() : [pts[0]]), [at, back, pts]);
  const w = tokenWidth(label, !!Icon);
  const c = toneVar(tone);
  const t = duration ?? 0.45 + len / 420;
  return (
    <motion.g
      initial={{ x: from[0], y: from[1], opacity: 0 }}
      animate={{
        x: reduce ? frames[frames.length - 1][0] : frames.map((p) => p[0]),
        y: reduce ? frames[frames.length - 1][1] : frames.map((p) => p[1]),
        opacity: !show ? 0 : absorb && at === 1 ? (reduce ? 0 : [0, 1, 1, 0]) : 1,
      }}
      transition={{
        x: { duration: t, ease: EASE_IN_OUT, delay },
        y: { duration: t, ease: EASE_IN_OUT, delay },
        opacity:
          absorb && at === 1 && show && !reduce
            ? { duration: t + 0.35, times: [0, 0.06, 0.82, 1], delay }
            : { duration: 0.2, delay: show ? delay : 0 },
      }}
      style={{ pointerEvents: "none" }}
    >
      <rect x={-w / 2} y={-13} width={w} height={26} rx={13} style={{ fill: toneSoft(tone), stroke: c }} strokeWidth={1.5} />
      {Icon && (
        <g transform={`translate(${-w / 2 + 8}, -8)`} style={{ color: c }}>
          <Icon width={16} height={16} strokeWidth={2.4} />
        </g>
      )}
      <text x={Icon ? 9 : 0} y={4.5} textAnchor="middle" className="sc-token" style={{ fill: c }}>
        {label}
      </text>
    </motion.g>
  );
}

// ── Text that fades between values ──────────────────────────────────────────
export function Txt({
  x,
  y,
  children,
  show = true,
  size = 14,
  weight = 600,
  anchor = "middle",
  tone,
  className = "",
  delay = 0,
}: {
  x: number;
  y: number;
  children: ReactNode;
  show?: boolean;
  size?: number;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  tone?: SceneTone;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      className={`sc-txt ${className}`}
      fill={tone ? toneVar(tone) : "var(--ink)"}
      style={{ fontSize: size, fontWeight: weight }}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, delay: show ? delay : 0 }}
    >
      {children}
    </motion.text>
  );
}

/** A number that counts to its new value. Use only for continuous quantities (money, %, prices). */
export function Num({
  value,
  format = (v) => String(Math.round(v)),
  x,
  y,
  size = 16,
  weight = 700,
  anchor = "middle",
  tone,
}: {
  value: number;
  format?: (v: number) => string;
  x: number;
  y: number;
  size?: number;
  weight?: number;
  anchor?: "start" | "middle" | "end";
  tone?: SceneTone;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, format);
  const reduce = useReducedMotion();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (reduce) {
      mv.set(value);
      return;
    }
    const c = animate(mv, value, { duration: 0.7, ease: EASE_OUT });
    return () => c.stop();
  }, [value, mv, reduce]);
  return (
    <motion.text
      x={x}
      y={y}
      textAnchor={anchor}
      className="sc-num"
      fill={tone ? toneVar(tone) : "var(--ink)"}
      style={{ fontSize: size, fontWeight: weight }}
    >
      {text}
    </motion.text>
  );
}

/** A vertical bar that grows from a baseline. */
export function Bar({
  x,
  base,
  w,
  h,
  tone = "def",
  show = true,
  delay = 0,
}: {
  x: number;
  base: number;
  w: number;
  h: number;
  tone?: SceneTone;
  show?: boolean;
  delay?: number;
}) {
  const hh = show ? Math.max(0, h) : 0;
  return (
    <motion.rect
      x={x - w / 2}
      width={w}
      rx={Math.min(5, w / 2)}
      initial={{ height: 0, y: base }}
      animate={{ height: hh, y: base - hh }}
      transition={{ ...spring.fill, delay }}
      fill={toneVar(tone)}
    />
  );
}

/** A ring that expands once when `trigger` changes, to say "this just happened here". */
export function Ping({ x, y, trigger, tone = "see", r = 30 }: { x: number; y: number; trigger: number | string; tone?: SceneTone; r?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.circle
      key={String(trigger)}
      cx={x}
      cy={y}
      fill="none"
      stroke={toneVar(tone)}
      strokeWidth={2}
      initial={{ r: r * 0.6, opacity: 0.8 }}
      animate={{ r: r * 1.5, opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      style={{ pointerEvents: "none" }}
    />
  );
}

export { toneVar, toneSoft };
