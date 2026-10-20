// "See it" scenes for 4.5 Stop Orders.
import { motion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Ping, Stage, Token, Txt, toneSoft, toneVar, type SceneTone } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { Ladder, PriceChart, chartX, chartY, ladderY, type Lvl } from "./kit.tsx";

/** A small status pill drawn in SVG; cross-fades its text when `text` changes. */
export function StatusPill({ x, y, text, tone = "neutral", w = 190 }: { x: number; y: number; text: string; tone?: SceneTone; w?: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y - 13}
        width={w}
        height={26}
        rx={13}
        fill={tone === "neutral" ? "var(--surface)" : toneSoft(tone)}
        stroke={tone === "neutral" ? "var(--line-strong)" : toneVar(tone)}
        strokeWidth={1.5}
        className="sc-node"
      />
      <motion.text
        key={text}
        x={x + w / 2}
        y={y + 4.5}
        textAnchor="middle"
        className="sc-txt"
        style={{ fontSize: 12, fontWeight: 800 }}
        fill={tone === "neutral" ? "var(--ink-2)" : toneVar(tone)}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      >
        {text}
      </motion.text>
    </g>
  );
}

/** Level labels drawn at the left end of a PriceChart line, where our paths start far from the level. */
export function LevelTags({ tags, x0 = 52 }: { tags: { y: number; label: string; tone: SceneTone; show?: boolean }[]; x0?: number }) {
  return (
    <>
      {tags.map((g) => (
        <motion.text
          key={g.label}
          x={x0 + 6}
          y={g.y - 6}
          className="sc-txt halo"
          style={{ fontSize: 11.5, fontWeight: 800 }}
          fill={toneVar(g.tone)}
          initial={{ opacity: 0 }}
          animate={{ opacity: g.show === false ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {g.label}
        </motion.text>
      ))}
    </>
  );
}

// ── A sell stop wakes up (our price path) ───────────────────────────────────
const WAKE = [80, 79.2, 77.6, 78.1, 76, 74.4, 72.6, 71.2, 69.6, 70.8, 72.4, 73.5];
const W = { lo: 66, hi: 82, y0: 56, y1: 200 };

export function StopWakes({ beat }: BeatProps) {
  const upto = [2, 7, 8, 11][beat] ?? 11;
  const fired = beat >= 2;
  const px = chartX(WAKE, 8);
  const py = chartY(WAKE[8], W.lo, W.hi, W.y0, W.y1);
  return (
    <Stage h={222} label="A sell stop at 70 waits below the market, activates when price falls to 70, and stays valid when price climbs back">
      <StatusPill
        x={105}
        y={22}
        text={beat < 2 ? "SELL STOP 70 · waiting" : beat === 2 ? "ACTIVE → market sell" : "SOLD · still valid"}
        tone={beat < 2 ? "neutral" : beat === 2 ? "prac" : "see"}
      />
      <PriceChart
        pts={WAKE}
        upto={upto}
        lo={W.lo}
        hi={W.hi}
        y0={W.y0}
        y1={W.y1}
        ticks={[70, 75, 80]}
        levels={[{ p: 70, label: "", tone: "prac" }]}
        marks={[{ i: 8, label: "sells here", tone: "prac", show: fired, below: true }]}
      >
        <LevelTags tags={[{ y: chartY(70, W.lo, W.hi, W.y0, W.y1), label: "sell stop 70", tone: "prac" }]} />
        {beat === 2 && <Ping x={px} y={py} trigger="fire" tone="prac" r={22} />}
        <Txt x={chartX(WAKE, 11) - 4} y={chartY(73.5, W.lo, W.hi, W.y0, W.y1) - 14} anchor="end" size={11.5} weight={800} tone="see" show={beat >= 3} delay={0.5}>
          back above 70
        </Txt>
      </PriceChart>
    </Stage>
  );
}

// ── Stan's cotton stop (book numbers: 80¢ buy, 70¢ stop, 72¢ → 67¢, 66.90¢ fill) ──
const COT = [80, 79, 78.2, 76.5, 75.6, 73.8, 72, 67, 66.9, 67.6];
const C = { lo: 64, hi: 82, y0: 40, y1: 200 };
const cy = (p: number) => chartY(p, C.lo, C.hi, C.y0, C.y1);

export function StanCotton({ beat }: BeatProps) {
  const upto = [0, 0, 6, 7, 8, 9][beat] ?? 9;
  const x6 = chartX(COT, 6);
  const x7 = chartX(COT, 7);
  // trim the erased segment so it doesn't cover the dots at either end
  const t0 = 0.12;
  const t1 = 0.88;
  const gx = (t: number) => x6 + (x7 - x6) * t;
  const gy = (t: number) => cy(72) + (cy(67) - cy(72)) * t;
  return (
    <Stage h={224} label="Stan's cotton futures: bought at 80 cents, stop at 70 cents, price gaps from 72 to 67 cents and the stop sells at 66.90 cents">
      <PriceChart
        pts={COT}
        upto={upto}
        lo={C.lo}
        hi={C.hi}
        y0={C.y0}
        y1={C.y1}
        ticks={[65, 70, 75, 80]}
        fmtP={(p) => `${p}¢`}
        levels={[
          { p: 70, label: "", tone: "prac", show: beat >= 1 && beat < 5 },
          { p: 70, label: " ", tone: "see", dashed: false, show: beat >= 5 },
        ]}
        marks={[
          { i: 0, label: "bought 80¢", tone: "def", below: true },
          { i: 8, label: "sold 66.90¢", tone: "prac", show: beat >= 4, below: true },
        ]}
      >
        <LevelTags
          tags={[
            { y: cy(70), label: "stop 70¢", tone: "prac", show: beat >= 1 && beat < 5 },
            { y: cy(70), label: "put strike 70¢", tone: "see", show: beat >= 5 },
          ]}
        />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 3 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 3 ? 0.45 : 0 }}>
          <line x1={gx(t0)} y1={gy(t0)} x2={gx(t1)} y2={gy(t1)} stroke="var(--scene-bg)" strokeWidth={7} />
          <line x1={gx(t0)} y1={gy(t0)} x2={gx(t1)} y2={gy(t1)} stroke={toneVar("def")} strokeWidth={2.2} strokeDasharray="3 5" />
          <text x={x7 - 8} y={cy(77.2)} textAnchor="end" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill="var(--ink-2)">
            news: 72¢ → 67¢
          </text>
          <text x={x7 - 12} y={cy(70) + 16} textAnchor="end" className="sc-txt halo" style={{ fontSize: 11, fontWeight: 700 }} fill="var(--ink-3)">
            no trade at 70¢
          </text>
        </motion.g>
        {beat === 4 && <Ping x={chartX(COT, 8)} y={cy(66.9)} trigger="fill" tone="prac" r={20} />}
      </PriceChart>
    </Stage>
  );
}

// ── Two sell orders at €5: stop vs limit ────────────────────────────────────
const STOP_P = [5.62, 5.5, 5.38, 5.22, 5.08, 5.0, 4.95, 4.9];
const LIM_P = [4.38, 4.5, 4.62, 4.75, 4.88, 5.0, 5.08];
const E = { lo: 4.2, hi: 5.8, y0: 70, y1: 200 };
const eur = (p: number) => `€${p.toFixed(2)}`;

export function TwoSellsAtFive({ beat }: BeatProps) {
  const L = { x0: 50, x1: 184 };
  const R = { x0: 250, x1: 384 };
  const lUp = [0, 5, 6, 6, 6][beat] ?? 6;
  const rUp = beat >= 4 ? 6 : 0;
  return (
    <Stage h={222} label="A stop sell at 5 euros is submitted above 5 and sells after price falls to 5; a limit sell at 5 is submitted below 5 and sells only when price rises to 5">
      <Txt x={117} y={24} size={12} weight={800} tone="prac" className="caps">
        STOP SELL €5
      </Txt>
      <Txt x={117} y={42} size={11.5} weight={650} tone="neutral">
        submitted above €5
      </Txt>
      <motion.g initial={false} animate={{ opacity: beat >= 3 ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
        <Txt x={317} y={24} size={12} weight={800} tone="idea" className="caps">
          LIMIT SELL €5
        </Txt>
        <Txt x={317} y={42} size={11.5} weight={650} tone="neutral">
          submitted below €5
        </Txt>
      </motion.g>
      <PriceChart
        pts={STOP_P}
        upto={lUp}
        lo={E.lo}
        hi={E.hi}
        y0={E.y0}
        y1={E.y1}
        x0={L.x0}
        x1={L.x1}
        ticks={[4.5, 5, 5.5]}
        fmtP={eur}
        levels={[{ p: 5, label: "", tone: "prac" }]}
        marks={[{ i: 6, label: "sold €4.95", tone: "prac", show: beat >= 2, below: true }]}
      >
        <LevelTags x0={L.x0} tags={[{ y: chartY(5, E.lo, E.hi, E.y0, E.y1), label: "stop €5", tone: "prac" }]} />
        {beat === 1 && <Ping x={chartX(STOP_P, 5, L.x0, L.x1)} y={chartY(5, E.lo, E.hi, E.y0, E.y1)} trigger="stop" tone="prac" r={18} />}
      </PriceChart>
      <motion.g initial={false} animate={{ opacity: beat >= 3 ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
        <PriceChart
          pts={LIM_P}
          upto={rUp}
          lo={E.lo}
          hi={E.hi}
          y0={E.y0}
          y1={E.y1}
          x0={R.x0}
          x1={R.x1}
          ticks={[4.5, 5, 5.5]}
          fmtP={eur}
          levels={[{ p: 5, label: "", tone: "idea" }]}
          marks={[{ i: 5, label: "sold €5.00", tone: "idea", show: beat >= 4 }]}
        >
          <LevelTags x0={R.x0} tags={[{ y: chartY(5, E.lo, E.hi, E.y0, E.y1), label: "limit €5", tone: "idea" }]} />
        </PriceChart>
      </motion.g>
    </Stage>
  );
}

// ── Buy 100 ASTN, 10 stop, 10.37 limit (path: our numbers) ──────────────────
const ASTN = [9.62, 9.74, 9.86, 10.0, 10.25, 10.31, 10.28];
const A = { lo: 9.4, hi: 10.7, y0: 72, y1: 204 };
const ay = (p: number) => chartY(p, A.lo, A.hi, A.y0, A.y1);
const usd = (p: number) => `$${p.toFixed(2)}`;

export function AstnStopLimit({ beat }: BeatProps) {
  const upto = [0, 2, 3, 4, 6][beat] ?? 6;
  const status = ["waiting for $10", "sleeping: below the stop", "LIMIT BUY 10.37 · active", "BOUGHT at $10.25", "never pays above $10.37"][beat] ?? "";
  const tone: SceneTone = beat === 0 || beat === 1 ? "neutral" : beat === 4 ? "idea" : "prac";
  return (
    <Stage h={226} label="A stop limit buy order for Ashton Technology: 10 stop, 10.37 limit">
      <rect x={60} y={8} width={280} height={30} rx={9} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <text x={200} y={28} textAnchor="middle" className="sc-txt" style={{ fontSize: 13.5, fontWeight: 800 }} fill="var(--ink)">
        Buy 100 ASTN · 10 stop · 10.37 limit
      </text>
      <StatusPill x={105} y={54} text={status} tone={tone} />
      <motion.rect
        x={52}
        width={328}
        y={ay(A.hi)}
        height={ay(10.37) - ay(A.hi)}
        fill={toneSoft("idea")}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat >= 4 ? 0.85 : 0 }}
        transition={{ duration: 0.35 }}
      />
      <PriceChart
        pts={ASTN}
        upto={upto}
        lo={A.lo}
        hi={A.hi}
        y0={A.y0}
        y1={A.y1}
        ticks={[9.5, 10, 10.5]}
        fmtP={usd}
        levels={[
          { p: 10, label: "", tone: "prac" },
          { p: 10.37, label: " ", tone: "idea" },
        ]}
        marks={[{ i: 4, label: "bought 10.25", tone: "prac", show: beat >= 3, below: true }]}
      >
        <LevelTags
          tags={[
            { y: ay(10), label: "stop 10", tone: "prac" },
            { y: ay(10.37), label: "limit 10.37", tone: "idea" },
          ]}
        />
        {beat === 2 && <Ping x={chartX(ASTN, 3)} y={ay(10)} trigger="act" tone="prac" r={18} />}
      </PriceChart>
    </Stage>
  );
}

// ── A stop cascade on the bid side (our numbers) ───────────────────────────
const BOOK0: Lvl[] = [
  { p: 50.1, ask: 400 },
  { p: 50.05, ask: 300 },
  { p: 50.0, bid: 300 },
  { p: 49.95, bid: 200 },
  { p: 49.9, bid: 200 },
  { p: 49.85, bid: 300 },
  { p: 49.8, bid: 400 },
  { p: 49.75, bid: 500 },
];
const TAKEN: Record<number, number>[] = [
  {},
  { 50: 300, 49.95: 200 },
  { 50: 300, 49.95: 200, 49.9: 200, 49.85: 300 },
  { 50: 300, 49.95: 200, 49.9: 200, 49.85: 300, 49.8: 400, 49.75: 200 },
];
const HIT: number[][] = [[], [50, 49.95], [49.9, 49.85], [49.8, 49.75], []];
const LAST = [50.0, 49.95, 49.85, 49.75, 49.75];
const LY = 62;
const RH = 21;

export function StopCascade({ beat }: BeatProps) {
  const k = Math.min(beat, 3);
  const book = BOOK0.map((l) => (l.bid ? { ...l, bid: l.bid - (TAKEN[k][l.p] ?? 0) } : l));
  const ry = (p: number) => ladderY(BOOK0, p, LY, RH);
  const stops = [
    { p: 49.95, size: 500, fireAt: 1 },
    { p: 49.85, size: 600, fireAt: 2 },
  ];
  return (
    <Stage h={252} label="Sell stops below the market turn a 500-share sale into a 25-cent fall">
      <Txt x={16} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        LAST TRADE
      </Txt>
      <motion.text
        key={LAST[beat]}
        x={104}
        y={27}
        className="sc-num"
        style={{ fontSize: 16, fontWeight: 800 }}
        fill={beat >= 1 ? toneVar("prac") : "var(--ink)"}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.ui}
      >
        {LAST[beat].toFixed(2)}
      </motion.text>
      <Ladder levels={book} x={150} y={LY} rowH={RH} priceW={58} barMax={72} maxSize={500} hl={HIT[beat] ?? []} hlTone="prac" />
      {stops.map((s) => {
        const fired = beat >= s.fireAt;
        const done = beat > s.fireAt;
        const y = ry(s.p);
        return (
          <g key={s.p}>
            <motion.rect
              x={264}
              y={y - 10}
              width={124}
              height={20}
              rx={10}
              strokeWidth={1.5}
              fill={fired && !done ? toneSoft("prac") : "var(--surface)"}
              stroke={fired ? toneVar("prac") : "var(--line-strong)"}
              strokeDasharray={fired ? undefined : "4 4"}
              className="sc-node"
              initial={false}
              animate={{ opacity: done ? 0.5 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.text
              key={fired ? "f" : "w"}
              x={326}
              y={y + 4}
              textAnchor="middle"
              className="sc-txt"
              style={{ fontSize: 11.5, fontWeight: 800 }}
              fill={fired ? toneVar("prac") : "var(--ink-2)"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {fired ? `fired → sell ${s.size}` : `stop · sell ${s.size}`}
            </motion.text>
          </g>
        );
      })}
      <Token from={[350, 30]} to={[96, (ry(50) + ry(49.95)) / 2]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="sell 500" tone="prac" absorb />
      <Token from={[300, ry(49.95)]} to={[96, (ry(49.9) + ry(49.85)) / 2]} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="sell 500" tone="prac" absorb />
      <Token from={[300, ry(49.85)]} to={[96, (ry(49.8) + ry(49.75)) / 2]} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="sell 600" tone="prac" absorb />
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 4 ? 1 : 0 }} transition={{ duration: 0.35 }}>
        <rect x={200} y={ry(49.75) + 16} width={186} height={24} rx={12} fill={toneSoft("prac")} stroke={toneVar("prac")} strokeWidth={1.5} />
        <text x={293} y={ry(49.75) + 32} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 800 }} fill={toneVar("prac")}>
          −25¢ with stops · −5¢ without
        </text>
      </motion.g>
    </Stage>
  );
}
