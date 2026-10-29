// "See it" scenes for 5.2 Trading Sessions (pp. 90–92).
import { useEffect, type ReactNode } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { ClipboardCheck, Cpu, FileText, Landmark, UserRound, Users } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, type SceneTone, Bar, Edge, Node, Num, Stage, Token, Txt, between, link, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 104, h = 56): Box => ({ x, y, w, h });

/** A resting chip (an order waiting somewhere). */
function Chip({ x, y, label, tone = "neutral", show = true, delay = 0, w }: { x: number; y: number; label: string; tone?: SceneTone; show?: boolean; delay?: number; w?: number }) {
  const width = w ?? Math.round(label.length * 7.2 + 22);
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, delay: show ? delay : 0, ease: EASE_OUT }}>
      <rect x={x - width / 2} y={y - 13} width={width} height={26} rx={13} fill={toneSoft(tone)} stroke={toneVar(tone)} strokeWidth={1.5} />
      <text x={x} y={y + 4.5} textAnchor="middle" className="sc-token" fill={toneVar(tone)}>
        {label}
      </text>
    </motion.g>
  );
}

/** A ring that expands once, after `delay`, to say "this just happened here". Render it only while it applies. */
function Ring({ x, y, k, tone = "see", r = 34, delay = 0 }: { x: number; y: number; k: string; tone?: SceneTone; r?: number; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.circle
      key={k}
      cx={x}
      cy={y}
      fill="none"
      stroke={toneVar(tone)}
      strokeWidth={2}
      initial={{ r: r * 0.6, opacity: 0 }}
      animate={{ r: r * 1.5, opacity: [0, 0.85, 0] }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT }}
      style={{ pointerEvents: "none" }}
    />
  );
}

/** A small diamond marker on a timeline. */
function Diamond({ x, y, tone = "see", show = true, delay = 0, s = 7 }: { x: number; y: number; tone?: SceneTone; show?: boolean; delay?: number; s?: number }) {
  return (
    <motion.rect
      x={x - s}
      y={y - s}
      width={2 * s}
      height={2 * s}
      rx={2}
      transform={`rotate(45 ${x} ${y})`}
      fill={toneVar(tone)}
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, delay: show ? delay : 0 }}
    />
  );
}

/** A horizontal bar that grows from its left end. */
function HBar({ x, y, w, h = 14, tone = "see", show = true, delay = 0, dashed }: { x: number; y: number; w: number; h?: number; tone?: SceneTone; show?: boolean; delay?: number; dashed?: boolean }) {
  return (
    <motion.rect
      x={x}
      y={y - h / 2}
      height={h}
      rx={h / 2}
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: show ? w : 0, opacity: show ? 1 : 0 }}
      transition={{ width: { duration: 0.8, ease: EASE_IN_OUT, delay: show ? delay : 0 }, opacity: { duration: 0.2, delay: show ? delay : 0 } }}
      fill={dashed ? "none" : toneSoft(tone)}
      stroke={toneVar(tone)}
      strokeWidth={1.5}
      strokeDasharray={dashed ? "4 4" : undefined}
    />
  );
}

function Fade({ show, children, delay = 0, dim }: { show: boolean; children: ReactNode; delay?: number; dim?: boolean }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: show ? (dim ? 0.32 : 1) : 0 }} transition={{ duration: 0.3, delay: show ? delay : 0, ease: EASE_OUT }}>
      {children}
    </motion.g>
  );
}

// ── 5.2.1 Continuous: trades happen when someone arrives and finds a waiting order ──
export function ContinuousTape({ beat }: BeatProps) {
  const buyer = box(64, 58, 100, 60);
  const seller = box(336, 58, 100, 60);
  const mkt = box(200, 124, 120, 60);
  const fromBuyer = between(buyer, mkt, 0, 6, 8);
  const fromSeller = between(seller, mkt, 0, 6, 8);
  const x0 = 40;
  const x1 = 360;
  const tx = (h: number) => x0 + ((h - 9.5) / 6.5) * (x1 - x0);
  const ty = 226;
  const clocks = ["9:50 a.m.", "10:12 a.m.", "1:05 p.m.", "2:40 p.m."];
  const trade1 = tx(10 + 12 / 60);
  const trade2 = tx(14 + 40 / 60);
  return (
    <Stage h={256} label="In a continuous market, trades happen whenever a trader arrives and finds a waiting order">
      {clocks.map((c, i) => (
        <Txt key={c} x={200} y={44} size={15} weight={800} show={beat === i}>
          {c}
        </Txt>
      ))}
      <Node {...buyer} icon={UserRound} label="Buyer" tone="bid" hl={beat === 1 || beat === 2} dim={beat === 0 || beat === 3} />
      <Node {...seller} icon={UserRound} label="Seller" tone="ask" hl={beat === 0 || beat === 3} dim={beat === 1 || beat === 2} />
      <Node {...mkt} icon={Landmark} label="Market" sub="open all day" tone="see" hl={beat === 1 || beat === 3} />

      <Token from={fromSeller[0]} to={fromSeller[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="sell 100" tone="ask" absorb />
      <Token from={fromBuyer[0]} to={fromBuyer[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="buy 100" tone="bid" absorb />
      <Token from={fromBuyer[0]} to={fromBuyer[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="bid 100" tone="bid" absorb />
      <Token from={fromSeller[0]} to={fromSeller[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="sell 100" tone="ask" absorb />
      {beat === 1 && <Ring x={mkt.x} y={mkt.y} k="t1" delay={0.75} r={44} />}
      {beat === 3 && <Ring x={mkt.x} y={mkt.y} k="t3" delay={0.75} r={44} />}

      <Chip x={mkt.x} y={178} label="waiting: offer to sell 100" tone="ask" show={beat === 0} delay={0.75} />
      <Chip x={mkt.x} y={178} label="waiting: bid for 100" tone="bid" show={beat === 2} delay={0.75} />
      <Txt x={mkt.x} y={182} size={12.5} weight={800} tone="see" show={beat === 1 || beat === 3} delay={0.8}>
        TRADE
      </Txt>

      {/* the session: open all day */}
      <line x1={x0} x2={x1} y1={ty} y2={ty} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
      <text x={x0} y={ty + 18} textAnchor="start" className="sc-tick">
        9:30 open
      </text>
      <text x={x1} y={ty + 18} textAnchor="end" className="sc-tick">
        close 4:00
      </text>
      <Diamond x={trade1} y={ty} show={beat >= 1} delay={beat === 1 ? 0.8 : 0} />
      <Txt x={trade1} y={ty - 12} size={11.5} weight={750} tone="see" show={beat >= 1} delay={beat === 1 ? 0.8 : 0}>
        trade
      </Txt>
      <Diamond x={trade2} y={ty} show={beat >= 3} delay={beat === 3 ? 0.8 : 0} />
      <Txt x={trade2} y={ty - 12} size={11.5} weight={750} tone="see" show={beat >= 3} delay={beat === 3 ? 0.8 : 0}>
        trade
      </Txt>
    </Stage>
  );
}

// ── 5.2.2 A call: orders wait, then everyone trades at the same time ───────────
const ROWS = [112, 144, 176];
export function TheCall({ beat }: BeatProps) {
  const buyers = box(52, 144, 84, 64);
  const sellers = box(348, 144, 84, 64);
  const BX = 158;
  const SX = 242;
  const clock = ["9:28 · orders wait", "9:30 · THE CALL", "9:31 · next call later"];
  return (
    <Stage h={232} label="In a call market, orders wait until the call, then all trade at the same time">
      <motion.rect
        x={106}
        y={40}
        width={188}
        height={158}
        rx={14}
        fill="var(--node)"
        initial={false}
        animate={{ strokeWidth: beat === 1 ? 2 : 1.25 }}
        stroke={beat === 1 ? toneVar("idea") : "var(--node-line)"}
      />
      <text x={200} y={62} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
        CALL MARKET
      </text>
      {clock.map((c, i) => (
        <Txt key={c} x={200} y={84} size={13.5} weight={800} tone={i === 1 ? "idea" : undefined} show={beat === i}>
          {c}
        </Txt>
      ))}
      <Node {...buyers} icon={Users} label="Buyers" tone="bid" hl={beat === 0} dim={beat === 2} />
      <Node {...sellers} icon={Users} label="Sellers" tone="ask" hl={beat === 0} dim={beat === 2} />

      {ROWS.map((y, i) => {
        const b = link(buyers, box(BX, y, 40, 26), 0, 4);
        const s = link(sellers, box(SX, y, 48, 26), 0, 4);
        return (
          <g key={y}>
            <Token from={b[0]} to={[BX, y]} at={beat >= 0 ? 1 : 0} show={beat <= 1} label="buy" tone="bid" delay={i * 0.35} />
            <Token from={s[0]} to={[SX, y]} at={beat >= 0 ? 1 : 0} show={beat <= 1} label="sell" tone="ask" delay={0.15 + i * 0.35} />
            <Edge from={[BX + 24, y]} to={[SX - 28, y]} show={beat === 1} arrow={false} tone="idea" width={2.5} />
          </g>
        );
      })}
      {beat === 1 && <Ring x={200} y={144} k="call" tone="idea" r={56} delay={0.3} />}
      <Txt x={200} y={220} size={13} weight={800} tone="idea" show={beat === 1} delay={0.35}>
        all trade at the same time
      </Txt>
      {/* after the call, a new order waits for the next one */}
      {(() => {
        const b = link(buyers, box(BX, ROWS[0], 40, 26), 0, 4);
        return <Token from={b[0]} to={[BX, ROWS[0]]} at={beat === 2 ? 1 : 0} show={beat === 2} label="buy" tone="bid" delay={0.35} />;
      })()}
      <Txt x={200} y={220} size={12.5} weight={700} show={beat === 2} delay={0.5}>
        a new order waits for the next call
      </Txt>
    </Stage>
  );
}

// ── 5.2.2 Calls inside a continuous day; futures pits go straight to continuous ─
export function DayWithCalls({ beat }: BeatProps) {
  const x0 = 30;
  const x1 = 370;
  const tx = (h: number) => x0 + ((h - 9.5) / 6.5) * (x1 - x0);
  const y1 = 84;
  const y2 = 186;
  const halt0 = tx(12);
  const halt1 = tx(12 + 40 / 60);
  return (
    <Stage h={232} label="An exchange opens with a call, trades continuously, and restarts with a call after a halt; a futures pit trades continuously from the open">
      <Fade show dim={beat === 3}>
        <text x={x0} y={46} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 750 }} fill="var(--ink)">
          Continuous order-driven exchange
        </text>
        <line x1={x0} x2={x1} y1={y1} y2={y1} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
      </Fade>
      <Fade show dim={beat < 3}>
        <text x={x0} y={152} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 750 }} fill="var(--ink)">
          Open-outcry futures exchange
        </text>
        <line x1={x0} x2={x1} y1={y2} y2={y2} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
      </Fade>
      <text x={x0} y={216} textAnchor="start" className="sc-tick">
        open
      </text>
      <text x={x1} y={216} textAnchor="end" className="sc-tick">
        close
      </text>

      {/* lane 1 */}
      <Fade show dim={beat === 3}>
        <Diamond x={x0 + 8} y={y1} tone="idea" s={8} />
        <Txt x={x0} y={y1 + 26} size={12} weight={800} anchor="start" tone="idea">
          opening call
        </Txt>
        <HBar x={x0 + 20} y={y1} w={halt0 - x0 - 22} show={beat >= 1} />
        <Txt x={(x0 + halt0) / 2 + 30} y={y1 - 14} size={12} weight={750} tone="see" show={beat >= 1} delay={beat === 1 ? 0.5 : 0}>
          continuous
        </Txt>
        <HBar x={halt0} y={y1} w={halt1 - halt0} tone="neutral" dashed show={beat >= 2} />
        <Txt x={(halt0 + halt1) / 2} y={y1 - 14} size={12} weight={750} tone="neutral" show={beat >= 2}>
          halt
        </Txt>
        <Diamond x={halt1 + 8} y={y1} tone="idea" s={8} show={beat >= 2} delay={beat === 2 ? 0.3 : 0} />
        <Txt x={halt1 + 8} y={y1 + 26} size={12} weight={800} tone="idea" show={beat >= 2} delay={beat === 2 ? 0.3 : 0}>
          call to restart
        </Txt>
        <HBar x={halt1 + 20} y={y1} w={x1 - halt1 - 20} show={beat >= 2} delay={beat === 2 ? 0.6 : 0} />
      </Fade>

      {/* lane 2 */}
      <HBar x={x0} y={y2} w={x1 - x0} show={beat >= 3} />
      <Txt x={200} y={y2 - 14} size={12} weight={750} tone="see" show={beat >= 3} delay={beat === 3 ? 0.5 : 0}>
        continuous from the open: no call
      </Txt>
    </Stage>
  );
}

// ── 5.2.2 Batch (multilateral) vs bilateral trading in a call ──────────────────
export function BatchVsBilateral({ beat }: BeatProps) {
  const engine = box(100, 148, 72, 58);
  const buyers = [box(56, 80, 64, 32), box(144, 80, 64, 32)];
  const sellers = [box(38, 222, 56, 30), box(100, 222, 56, 30), box(162, 222, 56, 30)];
  const pairs: [Box, Box][] = [
    [box(250, 104, 64, 32), box(350, 104, 64, 32)],
    [box(250, 196, 64, 32), box(350, 196, 64, 32)],
  ];
  const batchOn = beat <= 1;
  return (
    <Stage h={252} label="A batch call matches many buyers and sellers in one multilateral trade; bilateral traders deal in pairs">
      <line x1={200} x2={200} y1={18} y2={236} stroke="var(--line)" strokeWidth={1.5} strokeDasharray="4 5" />
      <Fade show dim={!batchOn}>
        <text x={100} y={28} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
          BATCH
        </text>
      </Fade>
      <Txt x={100} y={46} size={12} weight={800} tone="see" show={beat === 1} delay={0.5}>
        1 multilateral trade
      </Txt>
      <Fade show dim={batchOn}>
        <text x={300} y={28} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
          BILATERAL
        </text>
      </Fade>

      <Node {...engine} icon={Cpu} label="rules" tone="see" hl={beat === 1} dim={!batchOn} />
      {buyers.map((b, i) => {
        const [a, z] = link(b, engine, 0, 5);
        const [ra, rz] = link(engine, b, 0, 5);
        return (
          <g key={`b${i}`}>
            <Node {...b} label="Buyer" tone="bid" hl={batchOn} dim={!batchOn} />
            <Edge from={a} to={z} show={beat === 0} tone="bid" dashed />
            <Edge from={ra} to={rz} show={beat === 1} tone="see" />
          </g>
        );
      })}
      {sellers.map((s, i) => {
        const [a, z] = link(s, engine, 0, 5);
        const [ra, rz] = link(engine, s, 0, 5);
        return (
          <g key={`s${i}`}>
            <Node {...s} label="Seller" tone="ask" hl={batchOn} dim={!batchOn} />
            <Edge from={a} to={z} show={beat === 0} tone="ask" dashed />
            <Edge from={ra} to={rz} show={beat === 1} tone="see" />
          </g>
        );
      })}

      {pairs.map(([b, s], i) => {
        const [a, z] = between(b, s, 0, 4);
        return (
          <g key={`p${i}`}>
            <Node {...b} label="Buyer" tone="bid" hl={beat === 2} dim={beat !== 2} />
            <Node {...s} label="Seller" tone="ask" hl={beat === 2} dim={beat !== 2} />
            <Edge from={a} to={z} show={beat === 2} tone="see" arrow={false} width={2.5} label="deal" labelDy={-9} />
          </g>
        );
      })}
    </Stage>
  );
}

// ── 5.2.2 box: the totalizator prices every bet at the call ────────────────────
const HORSES = ["Horse A", "Horse B", "Horse C"];
const BETS = [
  [500, 300, 200],
  [500, 300, 200],
  [500, 300, 800],
  [500, 300, 800],
];
const CUT = 0.2;
export function Tote({ beat }: BeatProps) {
  const bets = BETS[beat];
  const pool = bets.reduce((a, b) => a + b, 0);
  const share = pool * (1 - CUT);
  const money = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
  const ROW = [92, 132, 172];
  return (
    <Stage h={240} label="A totalizator board: money bet on each horse and what each dollar would pay">
      <text x={20} y={30} className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
        TOTALIZATOR
      </text>
      <Txt x={380} y={30} size={12} weight={800} anchor="end" tone="see" show={beat < 3}>
        betting open
      </Txt>
      <Txt x={380} y={30} size={12} weight={850} anchor="end" tone="idea" show={beat === 3}>
        CALL · prices fixed
      </Txt>
      <text x={276} y={60} textAnchor="end" className="sc-tick caps">
        MONEY BET
      </text>
      <Fade show={beat >= 1}>
        <text x={380} y={60} textAnchor="end" className="sc-tick caps">
          PAYS PER $1
        </text>
      </Fade>
      {HORSES.map((h, i) => {
        const y = ROW[i];
        const lit = (beat === 2 || beat === 3) && i === 2;
        return (
          <g key={h}>
            <motion.rect
              x={12}
              y={y - 17}
              width={376}
              height={34}
              rx={8}
              initial={false}
              animate={{ opacity: lit ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              fill={toneSoft(beat === 3 ? "idea" : "see")}
              stroke={toneVar(beat === 3 ? "idea" : "see")}
              strokeWidth={1.5}
            />
            <text x={22} y={y + 5} className="sc-txt" style={{ fontSize: 13.5, fontWeight: 750 }} fill="var(--ink)">
              {h}
            </text>
            <motion.rect
              x={92}
              y={y - 7}
              height={14}
              rx={5}
              fill={toneVar("see")}
              initial={false}
              animate={{ width: (bets[i] / 800) * 110 }}
              transition={spring.fill}
            />
            <Num x={276} y={y + 5} value={bets[i]} format={money} anchor="end" size={14} />
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 ? 1 : 0 }} transition={{ duration: 0.3 }}>
              <Num x={380} y={y + 5} value={share / bets[i]} format={(v) => `$${v.toFixed(2)}`} anchor="end" size={14} tone={lit ? (beat === 3 ? "idea" : "see") : undefined} />
            </motion.g>
          </g>
        );
      })}
      <line x1={20} x2={380} y1={198} y2={198} stroke="var(--line)" strokeWidth={1} />
      <text x={20} y={222} className="sc-txt" style={{ fontSize: 13, fontWeight: 650 }} fill="var(--ink-2)">
        Pool
      </text>
      <Num x={58} y={222} value={pool} format={money} anchor="start" size={14} />
      <Fade show={beat >= 1}>
        <text x={292} y={222} textAnchor="end" className="sc-txt" style={{ fontSize: 13, fontWeight: 650 }} fill="var(--ink-2)">
          after 20% cut
        </text>
        <Num x={380} y={222} value={share} format={money} anchor="end" size={14} tone="see" />
      </Fade>
    </Stage>
  );
}

// ── 5.2.3 Call vs continuous: everyone at once, or whenever you want ───────────
const ARRIVE = [10 + 5 / 60, 10 + 40 / 60, 11.25, 11 + 40 / 60];
const SIDE: SceneTone[] = ["bid", "ask", "bid", "ask"];
export function FindEachOther({ beat }: BeatProps) {
  const x0 = 30;
  const x1 = 370;
  const tx = (h: number) => x0 + ((h - 9.5) / 3) * (x1 - x0);
  const callX = tx(12);
  const yc = 82;
  const yk = 182;
  const cluster = [-35, -17, 17, 35];
  return (
    <Stage h={236} label="A call gathers traders who arrive at different times; a continuous market lets each trade when they arrive">
      <Fade show dim={beat === 2}>
        <text x={x0} y={46} className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
          CALL MARKET
        </text>
        <line x1={x0} x2={x1} y1={yc} y2={yc} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
        <line x1={callX} x2={callX} y1={yc - 16} y2={yc + 16} stroke={toneVar("idea")} strokeWidth={2.5} strokeLinecap="round" />
        <text x={callX} y={yc - 24} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 800 }} fill={toneVar("idea")}>
          call 12:00
        </text>
      </Fade>
      <Fade show dim={beat < 2}>
        <text x={x0} y={146} className="sc-txt caps" style={{ fontSize: 11, fontWeight: 800 }} fill="var(--ink-3)">
          CONTINUOUS MARKET
        </text>
        <line x1={x0} x2={x1} y1={yk} y2={yk} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
      </Fade>
      <text x={x0} y={222} className="sc-tick">
        9:30
      </text>
      <text x={x1} y={222} textAnchor="end" className="sc-tick">
        12:30
      </text>

      {ARRIVE.map((h, i) => {
        const x = beat >= 1 ? callX + cluster[i] : tx(h);
        const lit = beat === 3 ? i === 0 : beat <= 1;
        return (
          <motion.circle
            key={`c${i}`}
            cy={yc}
            r={8}
            fill={toneVar(SIDE[i])}
            initial={{ cx: tx(h), opacity: 0 }}
            animate={{ cx: x, opacity: lit ? 1 : 0.35 }}
            transition={{ cx: { duration: 0.9, ease: EASE_IN_OUT, delay: beat === 1 ? i * 0.08 : 0 }, opacity: { duration: 0.3, delay: beat === 0 ? i * 0.25 : 0 } }}
          />
        );
      })}
      {beat === 1 && <Ring x={callX} y={yc} k="call" tone="idea" r={36} delay={0.95} />}
      <Txt x={callX - 4} y={yc + 34} size={12.5} weight={800} tone="idea" show={beat === 1 || beat === 2} delay={beat === 1 ? 1 : 0}>
        all trade at once
      </Txt>

      {ARRIVE.map((h, i) => (
        <motion.g key={`k${i}`} initial={{ opacity: 0 }} animate={{ opacity: beat < 2 ? 0 : beat === 3 && i !== 0 ? 0.35 : 1 }} transition={{ duration: 0.3, delay: beat === 2 ? i * 0.3 : 0 }}>
          <circle cx={tx(h)} cy={yk} r={8} fill={toneVar(SIDE[i])} />
          <line x1={tx(h)} x2={tx(h)} y1={yk - 22} y2={yk - 12} stroke={toneVar("see")} strokeWidth={2.5} strokeLinecap="round" />
        </motion.g>
      ))}
      <Txt x={200} y={yk + 30} size={12.5} weight={750} tone="see" show={beat === 2}>
        each can trade the moment they arrive
      </Txt>

      {/* beat 3: the impatient first trader */}
      <Fade show={beat === 3}>
        <line x1={tx(ARRIVE[0])} x2={callX - 35} y1={yc + 26} y2={yc + 26} stroke={toneVar("prac")} strokeWidth={2} />
        <line x1={tx(ARRIVE[0])} x2={tx(ARRIVE[0])} y1={yc + 20} y2={yc + 32} stroke={toneVar("prac")} strokeWidth={2} />
        <line x1={callX - 35} x2={callX - 35} y1={yc + 20} y2={yc + 32} stroke={toneVar("prac")} strokeWidth={2} />
        <text x={(tx(ARRIVE[0]) + callX - 35) / 2} y={yc + 48} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("prac")}>
          waits almost 2 hours
        </text>
        <text x={tx(ARRIVE[0]) + 14} y={yk + 30} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("prac")}>
          trades at 10:05
        </text>
      </Fade>
    </Stage>
  );
}

// ── 5.2.4 The trading day ──────────────────────────────────────────────────────
export function TradingDay({ beat }: BeatProps) {
  const y = 70;
  const H = 40;
  const seg = [
    { x: 24, w: 92, label: "before the open", icon: FileText, on: beat === 1 },
    { x: 116, w: 164, label: "regular session", icon: Landmark, on: beat === 0 },
    { x: 280, w: 96, label: "after the close", icon: ClipboardCheck, on: beat === 2 },
  ];
  return (
    <Stage h={164} label="A trading day: before the open, the regular session, after the close">
      <text x={116} y={y - H / 2 - 10} textAnchor="middle" className="sc-tick">
        9:30 a.m.
      </text>
      <text x={280} y={y - H / 2 - 10} textAnchor="middle" className="sc-tick">
        4:00 p.m. ET
      </text>
      {seg.map((s, i) => {
        const Icon = s.icon;
        return (
          <g key={s.label}>
            <motion.rect
              x={s.x}
              y={y - H / 2}
              width={s.w}
              height={H}
              rx={i === 1 ? 4 : 10}
              initial={false}
              animate={{ opacity: s.on ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              fill={s.on ? toneSoft(i === 1 ? "see" : "idea") : "var(--surface-2)"}
              stroke={s.on ? toneVar(i === 1 ? "see" : "idea") : "var(--node-line)"}
              strokeWidth={s.on ? 2 : 1.25}
            />
            <g transform={`translate(${s.x + s.w / 2 - 10}, ${y - 10})`} style={{ color: s.on ? toneVar(i === 1 ? "see" : "idea") : "var(--ink-3)" }}>
              <Icon width={20} height={20} strokeWidth={2.2} />
            </g>
            <motion.text
              x={s.x + s.w / 2}
              y={y + H / 2 + 22}
              textAnchor="middle"
              className="sc-txt"
              style={{ fontSize: 12.5, fontWeight: 750 }}
              fill={s.on ? toneVar(i === 1 ? "see" : "idea") : "var(--ink-3)"}
              initial={false}
              animate={{ opacity: s.on || beat === 3 ? 1 : 0.6 }}
            >
              {s.label}
            </motion.text>
          </g>
        );
      })}
      {/* after-hours session, in some markets */}
      <HBar x={284} y={y + H / 2 + 50} w={88} h={14} tone="prac" show={beat === 3} />
      <Txt x={274} y={y + H / 2 + 54.5} size={12.5} weight={800} anchor="end" tone="prac" show={beat === 3} delay={0.4}>
        some markets: after-hours session
      </Txt>
    </Stage>
  );
}

// ── 5.2.4 Same moment, three clocks ────────────────────────────────────────────
function Hand({ cx, cy, len, deg, width, tone }: { cx: number; cy: number; len: number; deg: number; width: number; tone: string }) {
  const reduce = useReducedMotion();
  const a = useMotionValue(deg);
  useEffect(() => {
    if (reduce) {
      a.set(deg);
      return;
    }
    const c = animate(a, deg, { duration: 1.1, ease: EASE_IN_OUT });
    return () => c.stop();
  }, [deg, a, reduce]);
  const x2 = useTransform(a, (v) => cx + len * Math.sin((v * Math.PI) / 180));
  const y2 = useTransform(a, (v) => cy - len * Math.cos((v * Math.PI) / 180));
  return <motion.line x1={cx} y1={cy} x2={x2} y2={y2} stroke={tone} strokeWidth={width} strokeLinecap="round" />;
}

const ZONES = [
  { ex: ["Pacific", "Exchange"], city: "San Francisco", local: 6.5, z: "PT", diff: "−3 h", from: 2 },
  { ex: ["Chicago", "Stock Exchange"], city: "Chicago", local: 8.5, z: "CT", diff: "−1 h", from: 1 },
  { ex: ["New York", "Stock Exchange"], city: "New York", local: 9.5, z: "ET", diff: "", from: 0 },
];
export function TimeZones({ beat }: BeatProps) {
  const cy = 110;
  const r = 42;
  return (
    <Stage h={232} label="When the NYSE opens at 9:30 in New York, it is 8:30 in Chicago and 6:30 in San Francisco">
      {ZONES.map((zn, i) => {
        const cx = 72 + i * 128;
        const known = beat >= zn.from;
        const lit = beat === zn.from || beat === 3;
        const hours = known ? zn.local : 9.5;
        const hourDeg = hours * 30;
        const minDeg = hours * 360;
        const c = lit ? toneVar("see") : "var(--ink-3)";
        return (
          <motion.g key={zn.city} initial={false} animate={{ opacity: lit ? 1 : 0.4 }} transition={{ duration: 0.3 }}>
            <text x={cx} y={30} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink)">
              {zn.ex[0]}
            </text>
            <text x={cx} y={45} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink)">
              {zn.ex[1]}
            </text>
            <circle cx={cx} cy={cy} r={r} fill="var(--node)" stroke={lit ? toneVar("see") : "var(--node-line)"} strokeWidth={lit ? 2 : 1.25} />
            {Array.from({ length: 12 }, (_, k) => {
              const t = (k * Math.PI) / 6;
              return (
                <line
                  key={k}
                  x1={cx + (r - 5) * Math.sin(t)}
                  y1={cy - (r - 5) * Math.cos(t)}
                  x2={cx + (r - (k % 3 ? 9 : 12)) * Math.sin(t)}
                  y2={cy - (r - (k % 3 ? 9 : 12)) * Math.cos(t)}
                  stroke="var(--line-strong)"
                  strokeWidth={k % 3 ? 1.2 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            <Hand cx={cx} cy={cy} len={r - 14} deg={minDeg} width={2.5} tone="var(--ink-2)" />
            <Hand cx={cx} cy={cy} len={r - 22} deg={hourDeg} width={4} tone={c} />
            <circle cx={cx} cy={cy} r={3.5} fill={c} />
            <Txt x={cx} y={cy + r + 26} size={14} weight={800} tone={lit ? "see" : undefined} show={known}>
              {`${Math.floor(zn.local)}:30 a.m. ${zn.z}`}
            </Txt>
            <Txt x={cx} y={cy + r + 26} size={14} weight={800} show={!known}>
              ?
            </Txt>
            <text x={cx} y={cy + r + 44} textAnchor="middle" className="sc-sub">
              {zn.city}
            </text>
            {zn.diff && (
              <Txt x={cx + r + 8} y={cy - r + 14} size={12} weight={850} tone="prac" show={beat === zn.from}>
                {zn.diff}
              </Txt>
            )}
          </motion.g>
        );
      })}
      <Fade show={beat === 3} delay={0.2}>
        <rect x={110} y={210} width={180} height={20} rx={10} fill={toneSoft("see")} />
        <text x={200} y={224} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 850 }} fill={toneVar("see")}>
          the same moment
        </text>
      </Fade>
    </Stage>
  );
}

// ── 5.2.4 box "Lunchtime Recess": busy open and close, quiet lunch ─────────────
const VOL = [104, 72, 54, 44, 36, 30, 28, 31, 38, 46, 58, 76, 112];
export function VolumeDay({ beat }: BeatProps) {
  const base = 176;
  const x = (i: number) => 44 + i * 26;
  const lunch = (i: number) => i >= 5 && i <= 7;
  return (
    <Stage h={212} label="Trading volume through the day: high at the open and close, lowest at lunch">
      <Txt x={380} y={26} size={12.5} weight={800} anchor="end" show={beat < 2}>
        NYSE · Nasdaq
      </Txt>
      <Txt x={380} y={26} size={12.5} weight={800} anchor="end" show={beat === 2}>
        Tokyo Stock Exchange
      </Txt>
      <line x1={28} x2={372} y1={base} y2={base} className="sc-axis" />
      {VOL.map((v, i) => (
        <motion.g key={i} initial={false} animate={{ opacity: beat === 1 && !lunch(i) ? 0.45 : 1 }} transition={{ duration: 0.3 }}>
          <Bar x={x(i)} base={base} w={16} h={beat === 2 && lunch(i) ? 0 : v} tone={lunch(i) && beat >= 1 ? "see" : "neutral"} delay={beat === 0 ? i * 0.04 : 0} />
        </motion.g>
      ))}
      <text x={x(0)} y={base + 22} textAnchor="middle" className="sc-tick">
        open
      </text>
      <text x={x(6)} y={base + 22} textAnchor="middle" className="sc-tick">
        lunch
      </text>
      <text x={x(12)} y={base + 22} textAnchor="middle" className="sc-tick">
        close
      </text>
      <Txt x={x(6)} y={base - 44} size={12.5} weight={800} tone="see" show={beat === 1}>
        lowest
      </Txt>
      <Txt x={x(6)} y={base - 20} size={12.5} weight={800} tone="see" show={beat === 2} delay={0.4}>
        recess
      </Txt>
      <Txt x={x(2)} y={52} size={12.5} weight={750} show={beat === 2} delay={0.4}>
        morning session
      </Txt>
      <Txt x={x(10)} y={52} size={12.5} weight={750} show={beat === 2} delay={0.4}>
        afternoon session
      </Txt>
    </Stage>
  );
}

// ── 5.2.4 box "Market Sonar": ping an opaque market ─────────────────────────────
export function Sonar({ beat }: BeatProps) {
  const you = box(66, 104, 96, 60);
  const mkt = box(290, 104, 160, 120);
  const [a, z] = between(you, mkt, 0, 6, 8);
  return (
    <Stage h={208} label="A trader pings an opaque market with a small order to learn what others will do">
      <Node {...you} icon={UserRound} label="You" sub="trader" tone="see" hl={beat >= 1} />
      <motion.rect
        x={mkt.x - mkt.w / 2}
        y={mkt.y - mkt.h / 2}
        width={mkt.w}
        height={mkt.h}
        rx={14}
        fill="var(--surface-2)"
        stroke="var(--node-line)"
        strokeWidth={1.5}
        strokeDasharray="5 5"
      />
      <text x={mkt.x} y={mkt.y - 36} textAnchor="middle" className="sc-label">
        Market
      </text>
      <text x={mkt.x} y={mkt.y - 20} textAnchor="middle" className="sc-sub">
        you can't see who waits
      </text>
      <Txt x={mkt.x} y={mkt.y + 22} size={34} weight={800} tone="neutral" show={beat < 2}>
        ?
      </Txt>
      <Chip x={mkt.x} y={mkt.y + 16} label="someone bids 20.10" tone="bid" show={beat === 2} delay={0.9} />
      <Token from={a} to={z} at={beat === 1 ? 1 : 0} show={beat === 1} label="sell 100" tone="ask" absorb />
      <Token from={z} to={a} at={beat === 2 ? 1 : 0} show={beat === 2} label="filled" tone="see" absorb delay={0.2} />
      {beat === 2 && <Ring x={mkt.x} y={mkt.y} k="echo" r={60} delay={0} />}
      <Txt x={you.x + 72} y={you.y + 50} size={12} weight={750} tone="ask" show={beat === 1}>
        a small test order
      </Txt>
    </Stage>
  );
}
