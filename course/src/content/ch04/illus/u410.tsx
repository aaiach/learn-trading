// "See it" scenes for 4.10 Quantity Instructions.
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Node, Ping, Stage, Token, Txt, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

// ── Same sellers, three buy orders: plain, all-or-none, minimum-or-none ─────
const OFFERS = [300, 500, 1000];
const LANES = [
  { name: "Plain limit", sub: "any size", fills: [[300], [300, 500], [300, 500, 200]], why: ["", "", ""] },
  { name: "All-or-none", sub: "1,000 at once", fills: [[], [], [1000]], why: ["not all at once", "not all at once", ""] },
  { name: "Min. 400", sub: "each trade ≥ 400", fills: [[], [500], [500, 500]], why: ["300 < 400", "", ""] },
];
const BX = 136;
const BW = 236;
const per = BW / 1000;
const laneY = (i: number) => 104 + i * 54;
const fmt = (n: number) => n.toLocaleString("en-US");

export function ThreeLanes({ beat }: BeatProps) {
  const k = beat - 1; // index of the current seller, -1 before the first
  return (
    <Stage h={268} label="The same sellers meet a plain limit order, an all-or-none order and a minimum-or-none order">
      {OFFERS.map((o, i) => (
        <Node key={o} x={200} y={34} w={176} h={40} label={`A seller offers ${fmt(o)}`} tone="ask" hl show={k === i} />
      ))}
      <Txt x={200} y={40} size={13} weight={750} tone="neutral" show={beat === 0}>
        Each buyer wants 1,000 at $20
      </Txt>
      <Txt x={200} y={40} size={13} weight={800} tone="see" show={beat >= 4}>
        Same 1,000 shares, different trade counts
      </Txt>
      {LANES.map((l, i) => {
        const y = laneY(i);
        const segs = k >= 0 ? l.fills[Math.min(k, 2)] : [];
        const trades = l.fills[2].length;
        let acc = 0;
        return (
          <g key={l.name}>
            <text x={14} y={y - 2} className="sc-label" style={{ fontSize: 13 }}>
              {l.name}
            </text>
            <motion.text
              x={14}
              y={y + 14}
              className="sc-sub"
              initial={false}
              animate={{ opacity: beat >= 4 ? 0 : 1 }}
              transition={{ duration: 0.25 }}
            >
              {l.sub}
            </motion.text>
            <motion.text
              x={14}
              y={y + 14}
              className="sc-sub"
              style={{ fontWeight: 800, fill: toneVar("see") }}
              initial={false}
              animate={{ opacity: beat >= 4 ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
            >
              {trades} {trades === 1 ? "trade" : "trades"}
            </motion.text>
            <rect x={BX} y={y - 11} width={BW} height={22} rx={7} fill="var(--scene-grid)" opacity={0.75} />
            {l.fills[2].map((q, j) => {
              const x = BX + acc * per;
              acc += q;
              const on = j < segs.length;
              return (
                <g key={j}>
                  <motion.rect
                    x={x + 1}
                    y={y - 10}
                    height={20}
                    rx={6}
                    fill={toneVar("bid")}
                    initial={false}
                    animate={{ width: on ? q * per - 2 : 0, opacity: on ? (j % 2 ? 0.7 : 1) : 0 }}
                    transition={{ ...spring.fill, delay: on && j === segs.length - 1 && k <= 2 ? 0.55 : 0 }}
                  />
                  <motion.text
                    x={x + (q * per) / 2}
                    y={y + 4.5}
                    textAnchor="middle"
                    className="sc-num"
                    style={{ fontSize: 11.5, fontWeight: 800, fill: "#fff" }}
                    initial={false}
                    animate={{ opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.25, delay: on && j === segs.length - 1 && k <= 2 ? 0.8 : 0 }}
                  >
                    {fmt(q)}
                  </motion.text>
                </g>
              );
            })}
            {OFFERS.map((o, j) => (
              <Txt key={o} x={BX + BW} y={y + 27} anchor="end" size={11} weight={750} tone="neutral" show={k === j && !!l.why[j]} delay={0.35}>
                {`passes on ${fmt(o)}: ${l.why[j]}`}
              </Txt>
            ))}
          </g>
        );
      })}
      {/* the fills that happen at the current seller travel down in parallel */}
      {OFFERS.map((_, j) =>
        LANES.map((l, i) => {
          const before = j === 0 ? 0 : l.fills[j - 1].reduce((a, b) => a + b, 0);
          const now = l.fills[j].reduce((a, b) => a + b, 0);
          const q = now - before;
          if (!q) return null;
          const end = BX + (before + q / 2) * per;
          return (
            <Token key={`${j}-${i}`} from={[200, 58]} to={[end, laneY(i)]} at={k >= j ? 1 : 0} show={k === j} absorb label={fmt(q)} tone="ask" />
          );
        }),
      )}
    </Stage>
  );
}

// ── Harry's all-or-nothing day order through one session ────────────────────
const T0 = 40;
const T1 = 360;
const tX = (h: number) => T0 + ((h - 9.5) / 6.5) * (T1 - T0);
const BIDS = [
  { h: 10, label: "41.10 × 5,000", sub: "too small", ok: false },
  { h: 13, label: "41.00 × 10,000", sub: "price too low", ok: false },
  { h: 15, label: "41.06 × 9,000", sub: "all 7,600 trade", ok: true },
];

export function HarryDay({ beat }: BeatProps) {
  const Y = 182;
  const now = beat === 0 ? tX(9.5) : tX(BIDS[Math.min(beat, 3) - 1].h);
  return (
    <Stage h={252} label="Harry's all-or-nothing day order to sell 7,600 shares at 41.05 or better meets three buyers during the day">
      <Node x={200} y={34} w={300} h={48} label="Sell 7,600 XOM, limit 41.05" sub="day order · all-or-nothing" tone="see" hl />
      <line x1={T0} x2={T1} y1={Y} y2={Y} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
      {[9.5, 16].map((h) => (
        <g key={h}>
          <line x1={tX(h)} x2={tX(h)} y1={Y - 6} y2={Y + 6} className="sc-axis" />
          <text x={tX(h)} y={Y + 38} textAnchor={h === 16 ? "end" : "start"} className="sc-tick" style={{ fontWeight: 750 }}>
            {h === 16 ? "16:00 close: expires" : "9:30 open"}
          </text>
        </g>
      ))}
      {BIDS.map((b, i) => {
        const x = [70, 196, 328][i];
        const on = beat >= i + 1;
        return (
          <g key={b.h}>
            <Node x={x} y={112} w={116} h={50} label={b.label} sub={on ? b.sub : "buyer"} tone={b.ok ? "see" : "neutral"} hl={beat === i + 1} show={on} dim={on && beat > i + 1} />
            <motion.line
              x1={tX(b.h)}
              x2={tX(b.h)}
              y1={139}
              y2={Y - 6}
              stroke={b.ok ? toneVar("see") : "var(--line-strong)"}
              strokeWidth={1.5}
              strokeDasharray="3 4"
              initial={false}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <text x={tX(b.h)} y={Y + 20} textAnchor="middle" className="sc-tick">
              {on ? `${b.h}:00` : ""}
            </text>
          </g>
        );
      })}
      <motion.circle r={6} cy={Y} fill="var(--ink)" initial={false} animate={{ cx: now }} transition={{ duration: 0.6, ease: EASE_OUT }} />
      {beat >= 3 && <Ping x={tX(15)} y={112} trigger="harry-fill" tone="see" r={44} />}
      <Txt x={200} y={244} size={12.5} weight={800} tone="see" show={beat >= 3} delay={0.4}>
        One trade: 7,600 at 41.06
      </Txt>
    </Stage>
  );
}
