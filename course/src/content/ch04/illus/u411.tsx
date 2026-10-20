// "See it" scenes for 4.11 Other Order Instructions and the chapter's closing points (4.12–4.13).
import { motion } from "motion/react";
import { Activity, ArrowLeftRight, Ban, ClipboardCheck, Gift, Moon, TrendingUp, Waves, Zap, type LucideIcon } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

const fmt = (n: number) => n.toLocaleString("en-US");

// ── 4.11.1 Fulvio rolls June into September with one spread order ───────────
const TICKET: Box = { x: 200, y: 36, w: 176, h: 46 };
const JUN: Box = { x: 92, y: 112, w: 120, h: 58 };
const SEP: Box = { x: 308, y: 112, w: 120, h: 58 };
const G0 = 64;
const G1 = 336;
const GLO = 9;
const GHI = 15;
const GY = 224;
const gx = (s: number) => G0 + ((s - GLO) / (GHI - GLO)) * (G1 - G0);

export function FulvioRoll({ beat }: BeatProps) {
  const [a1, a2] = between(TICKET, JUN, 0, 6);
  const [b1, b2] = between(TICKET, SEP, 0, 6);
  const spread = beat >= 4 ? 12 : 13;
  const wobble = beat === 3;
  return (
    <Stage h={252} label="Fulvio rolls a long S&P 500 futures position from June into September with one spread order">
      <Node {...TICKET} label="Spread order" sub="sell JUN · buy SEP" tone="def" hl show={beat >= 1} />
      <Edge from={a1} to={a2} tone="ask" show={beat >= 1} />
      <Edge from={b1} to={b2} tone="bid" show={beat >= 1} />
      <Txt x={a2[0] - 14} y={a2[1] - 2} anchor="end" size={12} weight={800} tone="ask" show={beat >= 1} delay={0.4}>
        SELL
      </Txt>
      <Txt x={b2[0] + 14} y={b2[1] - 2} anchor="start" size={12} weight={800} tone="bid" show={beat >= 1} delay={0.4}>
        BUY
      </Txt>
      <Node {...JUN} label="June" sub={beat >= 2 ? "last 1276" : "expiring"} tone="ask" hl={beat === 0} dim={beat >= 4} />
      <Node {...SEP} label="September" sub={beat >= 2 ? "last 1289" : "back month"} tone="bid" hl={beat >= 4} />
      <Token from={[92, 160]} to={[308, 160]} at={beat >= 4 ? 1 : 0} label="LONG 1" tone="def" />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 2 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <motion.rect
          x={gx(GLO)}
          y={GY - 14}
          height={14}
          rx={4}
          fill={toneSoft("def")}
          initial={false}
          animate={{ width: beat === 3 ? gx(10) - gx(GLO) : 0, opacity: beat === 3 ? 1 : 0 }}
          transition={spring.fill}
        />
        <line x1={G0} x2={G1} y1={GY} y2={GY} className="sc-axis" strokeWidth={2} />
        {[9, 10, 11, 12, 13, 14, 15].map((s) => (
          <g key={s}>
            <line x1={gx(s)} x2={gx(s)} y1={GY} y2={GY + 5} className="sc-axis" />
            <text x={gx(s)} y={GY + 18} textAnchor="middle" className="sc-tick">
              {s}
            </text>
          </g>
        ))}
        <motion.g initial={false} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <line x1={gx(10)} x2={gx(10)} y1={GY - 20} y2={GY} stroke={toneVar("def")} strokeWidth={2} strokeDasharray="4 3" />
          <text x={gx(10)} y={GY - 24} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("def")}>
            limit 10
          </text>
        </motion.g>
        <motion.g
          initial={false}
          animate={{ x: wobble ? [gx(13), gx(13.7), gx(12.6), gx(13.5), gx(13)] : gx(spread) }}
          transition={wobble ? { duration: 2.6, ease: "easeInOut" } : spring.soft}
        >
          <path d="M0,0 L-6,-10 L6,-10 Z" fill="var(--ink)" transform={`translate(0, ${GY - 2})`} />
          <text y={GY - 16} textAnchor="middle" className="sc-num halo" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink)">
            {beat >= 4 ? "filled at 12" : beat === 3 ? "never ≤ 10" : "spread 13"}
          </text>
        </motion.g>
        {beat >= 4 && <Ping x={gx(12)} y={GY - 6} trigger="fill" tone="def" r={16} />}
      </motion.g>
    </Stage>
  );
}

// ── 4.11.2 Michael's iceberg meets Liza's fill-or-kill order ────────────────
const ICX = 118;
const IBW = 146;
const IBH = 15;
const WATER = 94;
const TIP_Y = 72;
const hiddenY = (j: number) => WATER + 5 + (j - 1) * 17;

export function IcebergFill({ beat }: BeatProps) {
  const eaten = beat >= 3 ? 6 : 0;
  const left = 9 - eaten;
  const hiddenMid = beat >= 4 ? (hiddenY(1) + hiddenY(left - 1) + IBH) / 2 : (hiddenY(1) + hiddenY(8) + IBH) / 2;
  return (
    <Stage h={240} label="An undisclosed order shows 10,000 of 90,000 shares; a 60,000-share fill-or-kill order eats into the hidden reserve">
      <Txt x={16} y={26} anchor="start" size={10.5} weight={800} tone="ask" className="caps">
        MICHAEL · SELL 90,000 @ 408
      </Txt>
      <motion.g initial={false} animate={{ opacity: beat >= 1 ? 1 : 0 }} transition={{ duration: 0.45, ease: EASE_OUT }}>
        <rect x={0} y={WATER} width={400} height={146} fill={toneSoft("see")} opacity={0.8} />
        <path d={`M0,${WATER} q12,-4 24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0`} fill="none" stroke={toneVar("see")} strokeWidth={1.75} />
        <text x={392} y={WATER - 7} textAnchor="end" className="sc-txt caps" style={{ fontSize: 10, fontWeight: 800 }} fill={toneVar("see")}>
          VISIBLE ↑
        </text>
        <text x={392} y={WATER + 17} textAnchor="end" className="sc-txt caps" style={{ fontSize: 10, fontWeight: 800 }} fill={toneVar("see")}>
          HIDDEN ↓
        </text>
      </motion.g>
      <text x={ICX - IBW / 2 - 8} y={TIP_Y + 12} textAnchor="end" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink)">
        408
      </text>
      {Array.from({ length: 9 }, (_, i) => {
        const j = i - eaten;
        const gone = j < 0;
        const hidden = beat >= 1 && j >= 1;
        // before the waterline appears the order is one solid stack; then everything below the tip sinks
        const y = gone ? 30 : j === 0 ? TIP_Y : beat === 0 ? TIP_Y + j * 17 : hiddenY(j);
        return (
          <motion.rect
            key={i}
            x={ICX - IBW / 2}
            width={IBW}
            height={IBH}
            rx={4}
            fill={hidden ? toneSoft("ask") : toneVar("ask")}
            stroke={toneVar("ask")}
            strokeWidth={1.5}
            strokeDasharray={hidden ? "4 3" : undefined}
            initial={{ y: TIP_Y + Math.max(0, j) * 17, opacity: 1 }}
            animate={{ y, x: gone ? 190 : 0, opacity: gone ? 0 : hidden ? 0.75 : 1 }}
            transition={
              gone
                ? { duration: 0.45, ease: EASE_OUT, delay: (5 - i) * 0.12 }
                : { ...spring.soft, delay: beat === 3 ? 0.85 : 0, opacity: { duration: 0.3 } }
            }
          />
        );
      })}
      <Txt x={ICX + IBW / 2 + 10} y={TIP_Y + 12} anchor="start" size={13} weight={800} tone="ask" show={beat >= 1}>
        10,000 shown
      </Txt>
      <motion.text
        x={ICX + IBW / 2 + 10}
        textAnchor="start"
        className="sc-txt"
        style={{ fontSize: 13, fontWeight: 800 }}
        fill={toneVar("ask")}
        initial={{ opacity: 0, y: hiddenMid }}
        animate={{ opacity: beat >= 1 && beat !== 3 ? 1 : 0, y: hiddenMid + 4 }}
        transition={{ duration: 0.3 }}
      >
        {beat >= 4 ? "20,000 hidden" : "80,000 hidden"}
      </motion.text>
      <Token from={[322, 6]} to={[322, 38]} at={beat >= 2 ? 1 : 0} show={beat >= 2} label="BUY 60,000 FOK" tone="bid" />
      <Txt x={322} y={66} size={13} weight={800} tone="bid" show={beat >= 3} delay={0.9}>
        {`bought ${fmt(60000)}`}
      </Txt>
      {beat >= 3 && <Ping x={ICX} y={TIP_Y + 7} trigger={`eat${beat}`} tone="bid" r={26} />}
    </Stage>
  );
}

// ── 4.11.3 Steve's substitution order ───────────────────────────────────────
const STEVE: Box = { x: 80, y: 110, w: 118, h: 64 };
const FORD: Box = { x: 304, y: 44, w: 120, h: 46 };
const GM: Box = { x: 304, y: 110, w: 120, h: 46 };
const CHRY: Box = { x: 304, y: 176, w: 120, h: 46 };

export function SteveSubstitution({ beat }: BeatProps) {
  const pf = between(STEVE, FORD, 0, 6, 26);
  const pg = between(STEVE, GM, 0, 6, 6);
  const pc = between(STEVE, CHRY, 0, 6, 26);
  return (
    <Stage h={222} label="A substitution order: $35 million of Ford, GM or Chrysler; the broker avoids GM and buys Ford and Chrysler">
      <Node {...STEVE} label="Steve" sub={beat >= 1 ? "$35 million" : "wants autos"} tone="def" hl />
      <Node {...FORD} label="Ford" sub="auto maker" tone="see" hl={beat >= 3} />
      <Node {...GM} label="GM" sub={beat >= 2 ? "price pushed up" : "auto maker"} tone="prac" hl={beat === 2} dim={beat >= 3} />
      <Node {...CHRY} label="Chrysler" sub="auto maker" tone="see" hl={beat >= 3} />
      <Edge from={pf[0]} to={pf[1]} dashed show={beat >= 1 && beat < 3} tone="def" />
      <Edge from={pg[0]} to={pg[1]} dashed show={beat >= 1 && beat < 3} tone="def" />
      <Edge from={pc[0]} to={pc[1]} dashed show={beat >= 1 && beat < 3} tone="def" />
      <Txt x={186} y={196} size={12} weight={750} tone="def" show={beat === 1}>
        any of the three
      </Txt>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat === 2 ? 1 : 0, y: beat === 2 ? 0 : 6 }} transition={{ duration: 0.3 }}>
        <g transform="translate(372, 84)" style={{ color: toneVar("prac") }}>
          <TrendingUp width={20} height={20} strokeWidth={2.4} />
        </g>
        <text x={394} y={146} textAnchor="end" className="sc-txt halo" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar("prac")}>
          big buyer
        </text>
      </motion.g>
      <Token from={pf[0]} to={pf[1]} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="BUY" tone="cash" />
      <Token from={pc[0]} to={pc[1]} at={beat >= 3 ? 1 : 0} show={beat >= 3} label="BUY" tone="cash" delay={0.15} />
    </Stage>
  );
}

// ── 4.11.4 Cash settlement in time for a spin-off ───────────────────────────
const DAYS = ["Tue", "Wed", "Thu", "Fri", "Mon", "Tue"];
const dx = (i: number) => 46 + i * 62;
const DAY_Y = 128;

export function SpinoffWeek({ beat }: BeatProps) {
  const top = DAY_Y - 24;
  const tone = (i: number) => (i === 2 ? "def" : i === 3 ? "idea" : i === 5 && (beat === 1 || beat === 2) ? "ask" : i === 0 && beat >= 3 ? "def" : "neutral");
  return (
    <Stage h={236} label="A week calendar: regular-way settlement misses the record date; cash settlement makes it">
      {DAYS.map((d, i) => {
        const t = tone(i);
        const lit = t !== "neutral";
        return (
          <g key={i}>
            <motion.rect
              x={dx(i) - 27}
              y={DAY_Y - 22}
              width={54}
              height={44}
              rx={10}
              initial={false}
              animate={{ opacity: i === 0 && beat < 3 ? 0.45 : 1 }}
              fill={lit ? toneSoft(t) : "var(--node)"}
              stroke={lit ? toneVar(t) : "var(--node-line)"}
              strokeWidth={lit ? 2 : 1.25}
            />
            <text x={dx(i)} y={DAY_Y + 5} textAnchor="middle" className="sc-label">
              {d}
            </text>
          </g>
        );
      })}
      <line x1={dx(3) + 31} x2={dx(3) + 31} y1={DAY_Y - 30} y2={DAY_Y + 30} stroke="var(--line-strong)" strokeDasharray="3 4" />
      <Txt x={dx(2)} y={DAY_Y + 40} size={11.5} weight={800} tone="def">
        today
      </Txt>
      <Txt x={dx(3)} y={DAY_Y + 40} size={11.5} weight={800} tone="idea">
        record date
      </Txt>
      <Txt x={dx(0)} y={DAY_Y + 40} size={11.5} weight={800} tone="def" show={beat >= 3}>
        last day
      </Txt>
      <Txt x={dx(5)} y={DAY_Y + 40} size={11.5} weight={800} tone="ask" show={beat === 1 || beat === 2}>
        too late
      </Txt>
      <Txt x={dx(3)} y={34} size={12} weight={750} tone="idea" show={beat === 0}>
        holders of record get XYZ
      </Txt>
      <Edge from={[dx(2), top]} to={[dx(5), top]} bend={22} tone="ask" show={beat === 1 || beat === 2} label="regular way: T+3" labelAt={0.72} labelDy={-6} />
      <Edge from={[dx(2) + 8, top]} to={[dx(3) - 8, top]} bend={14} tone="def" show={beat === 2} label="cash: today" labelAt={0.35} labelDy={-8} />
      <Edge from={[dx(0), top]} to={[dx(3), top]} bend={22} tone="def" show={beat >= 3} label="T+3 lands on the record date" labelDy={-6} />
      {beat === 2 && <Ping x={dx(2)} y={DAY_Y} trigger="cash" tone="def" r={24} />}

      {/* ABC's price: worth ABC + XYZ until Tuesday, ABC only from Wednesday */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <path d={`M${dx(0) - 26},196 L${dx(1) - 31},196 L${dx(1) - 31},216 L${dx(5) + 26},216`} fill="none" stroke="var(--ink)" strokeWidth={2.4} strokeLinejoin="round" />
        <text x={dx(0) - 26} y={188} className="sc-txt" style={{ fontSize: 11.5, fontWeight: 750 }} fill="var(--ink-2)">
          ABC + XYZ
        </text>
        <text x={dx(5) + 26} y={208} textAnchor="end" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 750 }} fill="var(--ink-2)">
          ABC price falls on Wednesday
        </text>
      </motion.g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: beat >= 4 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <text x={150} y={199} textAnchor="end" className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink-2)">
          cash, today
        </text>
        <text x={150} y={223} textAnchor="end" className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink-2)">
          regular way
        </text>
        <motion.rect x={158} y={188} height={14} rx={7} fill={toneVar("def")} initial={false} animate={{ width: beat >= 4 ? 196 : 0 }} transition={spring.fill} />
        <motion.rect x={158} y={212} height={14} rx={7} fill="var(--ink-3)" initial={false} animate={{ width: beat >= 4 ? 124 : 0 }} transition={{ ...spring.fill, delay: 0.1 }} />
        <text x={160 + 196 - 8} y={199} textAnchor="end" className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill="#fff">
          ABC + XYZ
        </text>
        <text x={160 + 124 - 8} y={223} textAnchor="end" className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill="#fff">
          ABC
        </text>
      </motion.g>
    </Stage>
  );
}

// ── 4.12 Table 4-4 on one line: who demands, who supplies ──────────────────
type Spot = { x: number; y: number; label: string; sub: string; group: number; tone: "prac" | "see" | "game" | "idea" };
const SPOTS: Spot[] = [
  { x: 72, y: 84, label: "Market", sub: "fast execution", group: 0, tone: "prac" },
  { x: 72, y: 134, label: "Marketable", sub: "limit order", group: 0, tone: "prac" },
  { x: 328, y: 84, label: "Standing limit", sub: "may never fill", group: 1, tone: "see" },
  { x: 328, y: 134, label: "Tick-sensitive", sub: "no price impact", group: 1, tone: "see" },
  { x: 72, y: 184, label: "Stop market", sub: "large impact", group: 2, tone: "game" },
  { x: 200, y: 184, label: "Stop limit", sub: "may not execute", group: 2, tone: "game" },
  { x: 200, y: 84, label: "MIT", sub: "touch → market", group: 3, tone: "idea" },
  { x: 200, y: 134, label: "Not held", sub: "broker decides", group: 3, tone: "idea" },
];

export function OrderSpectrum({ beat }: BeatProps) {
  return (
    <Stage h={222} label="Table 4-4 laid out from orders that demand immediacy to orders that supply liquidity">
      <line x1={26} x2={374} y1={44} y2={44} stroke="var(--line-strong)" strokeWidth={2} />
      <path d="M26,44 l8,-5 l0,10 Z M374,44 l-8,-5 l0,10 Z" fill="var(--line-strong)" />
      <text x={26} y={30} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("prac")}>
        DEMANDS IMMEDIACY
      </text>
      <text x={374} y={30} textAnchor="end" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("see")}>
        SUPPLIES LIQUIDITY
      </text>
      {SPOTS.map((s) => (
        <Node key={s.label} x={s.x} y={s.y} w={116} h={42} label={s.label} sub={s.sub} tone={s.tone} hl={s.group === beat} show={beat >= s.group} dim={s.group !== beat} />
      ))}
    </Stage>
  );
}

// ── 4.13 Points to remember, one row per point ──────────────────────────────
type Point = { n: number; icon: LucideIcon; text: string };

function PointsBoard({ beat, items, label }: { beat: number; items: Point[]; label: string }) {
  const rowH = items.length > 4 ? 40 : 46;
  const h = 22 + items.length * rowH + 8;
  return (
    <Stage h={h} label={label}>
      {items.map((p, i) => {
        const y = 22 + i * rowH;
        const now = i === beat;
        const Icon = p.icon;
        return (
          <motion.g
            key={p.n}
            initial={{ opacity: 0, y: y + 8 }}
            animate={{ opacity: i > beat ? 0 : now ? 1 : 0.5, y: i > beat ? y + 8 : y }}
            transition={{ ...spring.soft, opacity: { duration: 0.3 } }}
          >
            <rect x={14} y={0} width={372} height={rowH - 8} rx={12} fill={now ? toneSoft("see") : "var(--node)"} stroke={now ? toneVar("see") : "var(--node-line)"} strokeWidth={now ? 2 : 1.25} />
            <circle cx={36} cy={(rowH - 8) / 2} r={12} fill={toneVar("see")} />
            <text x={36} y={(rowH - 8) / 2 + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 12.5, fontWeight: 800 }} fill="#fff">
              {p.n}
            </text>
            <g transform={`translate(56, ${(rowH - 8) / 2 - 9})`} style={{ color: toneVar("see") }}>
              <Icon width={18} height={18} strokeWidth={2.3} />
            </g>
            <text x={84} y={(rowH - 8) / 2 + 5} className="sc-txt" style={{ fontSize: 14, fontWeight: now ? 800 : 700 }} fill="var(--ink)">
              {p.text}
            </text>
          </motion.g>
        );
      })}
    </Stage>
  );
}

const MARKET_POINTS: Point[] = [
  { n: 1, icon: ClipboardCheck, text: "Standard instructions cut errors" },
  { n: 2, icon: Zap, text: "Market orders demand immediacy" },
  { n: 3, icon: ArrowLeftRight, text: "Small orders: the spread is the cost" },
  { n: 4, icon: Waves, text: "Large orders: big, unpredictable impact" },
];
const LIMIT_POINTS: Point[] = [
  { n: 5, icon: Gift, text: "Limit orders grant trading options" },
  { n: 6, icon: TrendingUp, text: "Must fill? A miss can cost a lot" },
  { n: 7, icon: Moon, text: "Limit orders work while you're away" },
  { n: 8, icon: Ban, text: "Stop orders are not limit orders" },
  { n: 9, icon: Activity, text: "Stops tend to destabilize prices" },
];

export function PointsMarket({ beat }: BeatProps) {
  return <PointsBoard beat={beat} items={MARKET_POINTS} label="Points to remember 1 to 4: order instructions and market orders" />;
}

export function PointsLimitStop({ beat }: BeatProps) {
  return <PointsBoard beat={beat} items={LIMIT_POINTS} label="Points to remember 5 to 9: limit orders and stop orders" />;
}
