// "See it" scenes for 4.4.2–4.4.5 (Limit orders, part B): limit orders as options, their value,
// option contracts as sold limit orders, chasing the price, ex post regret, absent traders.
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { BeatProps } from "../../types.ts";
import { Node, Num, Stage, Token, Txt, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";
import { Ladder, type Lvl, ladderY, PriceChart } from "./kit.tsx";

/**
 * True once `ms` have passed since `beat` last moved forward (immediately when going back or under
 * reduced motion). Lets a scene show "before" for a moment, e.g. while an order token travels.
 */
function useSettled(beat: number, ms = 650) {
  const reduce = useReducedMotion();
  const [s, setS] = useState(beat);
  useEffect(() => {
    if (reduce || beat <= s) {
      setS(beat);
      return;
    }
    const t = setTimeout(() => setS(beat), ms);
    return () => clearTimeout(t);
  }, [beat, s, reduce, ms]);
  return !!reduce || beat <= s;
}

const cents = (p: number) => p.toFixed(2);

// ── 4.4.2 A sell limit is a call, a buy limit is a put ──────────────────────
const EX = [49, 49.4, 49.1, 49.8, 50.6, 51.5, 52, 51.2, 49.9, 48.6, 47.6, 46.8, 47.2];

export function ExercisedOption({ beat }: BeatProps) {
  const upto = beat === 0 ? 0 : beat <= 3 ? 6 : 10;
  return (
    <Stage h={236} label="A sell limit order at 50 is taken by a buyer when the stock's value rises to 52; a buy limit order at 48 is taken by a seller when value falls below 48">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        VALUE OF THE STOCK (OUR NUMBERS)
      </Txt>
      <PriceChart
        pts={EX}
        upto={upto}
        lo={45.5}
        hi={53.5}
        ticks={[46, 48, 50, 52]}
        y0={40}
        y1={206}
        fmtP={(p) => `$${p}`}
        tone="neutral"
        levels={[
          { p: 50, label: "sell limit 50 = call, strike 50", tone: "ask" },
          { p: 48, label: "buy limit 48 = put, strike 48", tone: "bid", show: beat >= 3 },
        ]}
        marks={[
          { i: 6, label: "a buyer buys at 50", tone: "ask", show: beat >= 2 },
          { i: 10, label: "a seller sells at 48", tone: "bid", show: beat >= 4, below: true },
        ]}
      />
    </Stage>
  );
}

// ── 4.4.2 Option contract vs standing limit order ───────────────────────────
const VS = [
  { q: "Paid for?", a: ["Yes", "the buyer pays a premium"], b: ["No", "granted free"] },
  { q: "Owned by?", a: ["The holder", "who bought it"], b: ["Nobody", "open to every trader"] },
  { q: "Writer can cancel?", a: ["No", "until it expires"], b: ["Yes", "at any time"] },
  { q: "Exercised by?", a: ["The holder", "only"], b: ["Any trader", "with a market order"] },
];

export function ContractVsOrder({ beat }: BeatProps) {
  const A = 196;
  const B = 322;
  return (
    <Stage h={232} label="Comparison of an option contract and a standing limit order, one row at a time">
      <text x={A} y={30} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill="var(--ink)">
        Option contract
      </text>
      <text x={B} y={30} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("see")}>
        Standing limit order
      </text>
      <line x1={14} x2={386} y1={42} y2={42} className="sc-axis" />
      {VS.map((r, i) => {
        const y = 70 + i * 42;
        const on = beat >= i;
        const now = beat === i;
        return (
          <motion.g key={r.q} initial={{ opacity: 0 }} animate={{ opacity: on ? (now ? 1 : 0.62) : 0 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
            <motion.rect
              x={8}
              y={y - 19}
              width={384}
              height={38}
              rx={9}
              fill="var(--surface-2)"
              stroke={toneVar("see")}
              strokeWidth={1.5}
              initial={false}
              animate={{ opacity: now ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <text x={16} y={y + 4.5} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 750 }} fill="var(--ink-2)">
              {r.q}
            </text>
            <text x={A} y={y - 1} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink)">
              {r.a[0]}
            </text>
            <text x={A} y={y + 13} textAnchor="middle" className="sc-sub">
              {r.a[1]}
            </text>
            <text x={B} y={y - 1} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill={toneVar("see")}>
              {r.b[0]}
            </text>
            <text x={B} y={y + 13} textAnchor="middle" className="sc-sub">
              {r.b[1]}
            </text>
          </motion.g>
        );
      })}
    </Stage>
  );
}

// ── 4.4.2 The limit price decides the option value ──────────────────────────
const VP = [20.4, 20.3, 20.2, 20.1, 20.05, 20.0, 19.95, 19.9];
const vbook = (asks: Record<string, number>): Lvl[] =>
  VP.map((p) => ({ p, ask: asks[p.toFixed(2)], bid: p <= 20 ? { "20.00": 800, "19.95": 500, "19.90": 700 }[p.toFixed(2)] : undefined }));
const V_FAR = vbook({ "20.40": 300, "20.20": 500, "20.10": 400, "20.05": 600 });
const V_AT = vbook({ "20.20": 500, "20.10": 400, "20.05": 900 });
const V_GONE = vbook({});

export function ValueLadder({ beat }: BeatProps) {
  const after = useSettled(beat, 700);
  const lv = beat === 0 ? V_FAR : beat === 1 || !after ? V_AT : V_GONE;
  const yours = beat === 0 ? 20.4 : 20.05;
  const X = 170;
  return (
    <Stage h={252} label="A sell limit order far behind the market, then at the market, then taken at once when value jumps">
      <Ladder
        levels={lv}
        x={X}
        y={50}
        barMax={56}
        maxSize={1000}
        hl={beat === 2 ? [20.3] : [yours]}
        hlTone={beat === 2 ? "idea" : "see"}
        marks={[
          { p: yours, label: beat === 2 ? "taken at once" : "your offer", side: "bid", tone: "see" },
          { p: 20.3, label: "value now ≈ 20.30", side: "bid", tone: "idea", show: beat === 2 },
        ]}
      />
      <Txt x={200} y={242} size={12.5} weight={750} tone="neutral" show={beat === 0}>
        Better offers trade first: little option value
      </Txt>
      <Txt x={200} y={242} size={12.5} weight={750} tone="neutral" show={beat === 1}>
        Anyone who wants to buy now values it
      </Txt>
      <Txt x={200} y={242} size={12.5} weight={750} tone="neutral" show={beat === 2} delay={0.5}>
        An exceptionally good price: buyers jump on it
      </Txt>
    </Stage>
  );
}

// ── 4.4.2 Volatility widens the spread ──────────────────────────────────────
const SP = [20.12, 20.08, 20.04, 20.02, 20.0, 19.98, 19.94, 19.9];
const sbook = (a: number[], b: number[]): Lvl[] => SP.map((p, i) => ({ p, ask: a[i] || undefined, bid: b[i] || undefined }));
const S_CALM = sbook([300, 400, 600, 800, 0, 0, 0, 0], [0, 0, 0, 0, 900, 700, 500, 300]);
const S_PULL = sbook([300, 200, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 200, 300]);
const S_WIDE = sbook([1100, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1200]);
const SPREAD = [2, 14, 22];

function spark(a: number) {
  const ys = [0, -0.6, 0.4, -1, 0.8, -0.4, 1, -0.8, 0.3, 0];
  return ys.map((v, i) => `${i ? "L" : "M"}${16 + i * 13},${32 + v * a}`).join(" ");
}

export function VolSpread({ beat }: BeatProps) {
  const lv = beat === 0 ? S_CALM : beat === 1 ? S_PULL : S_WIDE;
  return (
    <Stage h={268} label="As volatility rises, traders cancel limit orders near the market and replace them far away, so the spread widens">
      <Txt x={16} y={16} anchor="start" size={10.5} weight={800} tone="neutral" className="caps">
        VOLATILITY
      </Txt>
      <motion.path
        fill="none"
        stroke={toneVar("idea")}
        strokeWidth={2.2}
        strokeLinejoin="round"
        initial={false}
        animate={{ d: spark(beat === 0 ? 2.5 : 11) }}
        transition={{ duration: 0.6, ease: EASE_IN_OUT }}
      />
      <Txt x={384} y={16} anchor="end" size={10.5} weight={800} tone="neutral" className="caps">
        SPREAD
      </Txt>
      <Num x={384} y={40} anchor="end" size={20} weight={800} value={SPREAD[Math.min(2, beat)]} format={(v) => `${Math.round(v)}¢`} />
      <Ladder
        levels={lv}
        y={80}
        marks={[
          { p: 20.0, label: "cancelled", side: "bid", tone: "neutral", show: beat === 1 },
          { p: 20.02, label: "cancelled", side: "ask", tone: "neutral", show: beat === 1 },
          { p: 19.9, label: "far away", side: "bid", tone: "neutral", show: beat === 2 },
          { p: 20.12, label: "far away", side: "ask", tone: "neutral", show: beat === 2 },
        ]}
        barMax={56}
        maxSize={1200}
      />
    </Stage>
  );
}

// ── 4.4.2 box: AAAA, a sell limit at 100 or a 100 call ──────────────────────
const AA_UP = [97, 98, 99, 101, 102.5, 103.5, 104, 104.5];
const AA_BACK = [97, 98.5, 100.5, 102, 101, 99, 97.5, 96];

function AaChart({ pts, show, upto }: { pts: number[]; show: boolean; upto: number }) {
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }}>
      <PriceChart
        pts={pts}
        upto={upto}
        lo={94}
        hi={107}
        ticks={[95, 100, 105]}
        y0={44}
        y1={140}
        tone="neutral"
        fmtP={(p) => `$${p}`}
        levels={[{ p: 100, label: "100: your limit = the strike", tone: "see" }]}
      />
    </motion.g>
  );
}

export function AaaaPaths({ beat }: BeatProps) {
  const lim = ["free option, can cancel", "sold at $100", "sold at $100 on the way up"][beat] ?? "";
  const call = ["premium paid up front", "sold at $100 + premium", "kept AAAA + premium"][beat] ?? "";
  return (
    <Stage h={248} label="Selling AAAA with a limit order at 100 versus writing a call with a strike of 100, on two price paths">
      <Txt x={16} y={22} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        {beat === 2 ? "PATH 2: ABOVE 100, THEN BACK BELOW" : beat === 1 ? "PATH 1: ABOVE 100 AND STAYS" : "AAAA WHILE YOU ARE AWAY (OUR NUMBERS)"}
      </Txt>
      <AaChart pts={AA_UP} show={beat <= 1} upto={beat >= 1 ? AA_UP.length - 1 : 0} />
      <AaChart pts={AA_BACK} show={beat === 2} upto={beat >= 2 ? AA_BACK.length - 1 : 0} />
      <Node x={102} y={204} w={184} h={58} label="Sell limit at $100" sub={lim} tone="ask" hl={beat >= 1} />
      <Node x={298} y={204} w={184} h={58} label="Write a $100 call" sub={call} tone="see" hl={beat >= 1} />
    </Stage>
  );
}

// ── 4.4.3 box: Jill chases GM ───────────────────────────────────────────────
const JP = [48.22, 48.2, 48.17, 48.15, 48.11, 48.08, 48.05, 48.02];
const jbook = (a: number[], b: number[]): Lvl[] => JP.map((p, i) => ({ p, ask: a[i] || undefined, bid: b[i] || undefined }));
const J0 = jbook([800, 600, 400, 500, 700, 0, 0, 0], [0, 0, 0, 0, 0, 0, 800, 600]);
const J1 = jbook([800, 900, 0, 0, 0, 0, 0, 0], [0, 0, 0, 400, 300, 500, 800, 600]);
const J2 = jbook([800, 400, 0, 0, 0, 0, 0, 0], [0, 0, 0, 400, 300, 500, 300, 600]);

export function JillChase({ beat }: BeatProps) {
  const after = useSettled(beat, 650);
  const lv = beat === 0 ? J0 : beat === 1 || (beat === 2 && !after) ? J1 : J2;
  const ry = (p: number) => ladderY(JP.map((q) => ({ p: q })), p, 50, 22);
  return (
    <Stage h={252} label="Jill bids 48.05 for GM, the market rises away from her, she cancels and buys at 48.20 with a market order">
      <Ladder
        levels={lv}
        y={50}
        rowH={22}
        barMax={56}
        maxSize={900}
        hl={beat === 3 ? [48.11, 48.2] : []}
        marks={[
          { p: 48.05, label: "Jill 500", side: "bid", tone: "see", show: beat <= 1 },
          { p: 48.2, label: "Jill buys 500", side: "ask", tone: "see", show: beat >= 2 && after },
          { p: 48.11, label: "start offer", side: "ask", tone: "neutral", show: beat === 3 },
        ]}
      />
      <Token from={[118, ry(48.05)]} to={[262, ry(48.2)]} bend={28} at={beat >= 2 ? 1 : 0} show={beat === 2} label="Market buy" tone="see" absorb duration={0.6} />
      <Txt x={200} y={240} size={12.5} weight={750} tone="neutral" show={beat === 0}>
        Hoping to save the 6¢ spread
      </Txt>
      <Txt x={200} y={240} size={12.5} weight={750} tone="neutral" show={beat === 1}>
        The market is now 48.15 bid, 48.20 asked
      </Txt>
      <Txt x={200} y={240} size={12.5} weight={750} tone="neutral" show={beat === 2} delay={0.4}>
        She cancels and takes the offer
      </Txt>
      <Txt x={200} y={240} size={13} weight={800} tone="see" show={beat === 3}>
        Paid 48.20, not 48.11: 9¢ more a share
      </Txt>
    </Stage>
  );
}

// ── 4.4.4 box: Andy's overnight bid (ex post regret) ────────────────────────
const AP = [901.2, 901.15, 901.1, 901.05, 901.0, 900.95, 900.9, 900.85];
const abook = (a: number[], b: number[]): Lvl[] => AP.map((p, i) => ({ p, ask: a[i] || undefined, bid: b[i] || undefined }));
const A0 = abook([25, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 30, 12, 0, 20, 15]);
const A1 = abook([25, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 12, 15]);
const A2 = abook([25, 0, 0, 0, 15, 0, 0, 0], [0, 0, 0, 0, 0, 10, 12, 15]);
const ANDY_TXT = [
  "901.05 bid, 901.20 offered: Andy joins the bid",
  "Sold 50: 30 at 901.05, 12 at 901.00, 8 at 900.90",
  "The spread closes: 900.95 bid, 901.00 offered",
];

export function AndyLoss({ beat }: BeatProps) {
  const after = useSettled(beat, 750);
  const lv = beat === 0 || (beat === 1 && !after) ? A0 : beat === 1 ? A1 : A2;
  const ry = (p: number) => ladderY(AP.map((q) => ({ p: q })), p, 50, 22);
  return (
    <Stage h={252} label="Andy's limit buy at 901.05 fills when a 50-contract market sell order sweeps the bids; the market then settles lower and he has lost money">
      <Ladder
        levels={lv}
        y={50}
        rowH={22}
        barMax={70}
        maxSize={32}
        hl={beat === 3 ? [901.05, 900.95] : []}
        hlTone="idea"
        marks={[
          { p: 901.05, label: beat === 0 || (beat === 1 && !after) ? "Andy 20" : "Andy bought 20", side: "bid", tone: "see" },
          { p: 900.95, label: "could sell here", side: "bid", tone: "idea", show: beat === 3 },
        ]}
      />
      <Token from={[356, ry(901.05)]} to={[246, ry(901.05)]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="Sell 50" tone="ask" absorb duration={0.65} />
      {ANDY_TXT.map((t, i) => (
        <Txt key={t} x={200} y={240} size={12.5} weight={750} tone="neutral" show={beat === i} delay={i === 1 ? 0.6 : 0}>
          {t}
        </Txt>
      ))}
      <Txt x={200} y={240} size={13} weight={800} tone="idea" show={beat === 3}>
        250 × 0.10 × 20 contracts = $500 lost
      </Txt>
    </Stage>
  );
}

// ── 4.4.4 Far or close: choose your risk ────────────────────────────────────
const FC_ROWS = [20.1, 20.05, 20.0, 19.95, 19.9, 19.85];
const FC_AT = [20.0, 19.9, 19.85];
const FC_FILL = [0.9, 0.5, 0.2];
const FC_PRICE = [0.15, 0.6, 0.9];
const FC_TXT = ["Close: likely to fill, quickly, little price advantage", "Further: a better price, a smaller chance", "Far: the best price if it fills, but it may never fill"];

function Meter({ y, label, v, tone }: { y: number; label: string; v: number; tone: "idea" | "see" }) {
  const W = 168;
  return (
    <g>
      <text x={212} y={y - 9} className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink-2)">
        {label}
      </text>
      <rect x={212} y={y - 2} width={W} height={14} rx={7} fill="var(--scene-grid)" />
      <motion.rect x={212} y={y - 2} height={14} rx={7} fill={toneVar(tone)} initial={false} animate={{ width: Math.max(8, v * W) }} transition={spring.fill} />
    </g>
  );
}

export function FarClose({ beat }: BeatProps) {
  const b = Math.min(2, beat);
  const rowY = (p: number) => 46 + FC_ROWS.indexOf(p) * 28;
  return (
    <Stage h={244} label="Moving a buy limit order away from the market improves its price if it fills but lowers its chance of filling">
      <Txt x={16} y={22} anchor="start" size={10.5} weight={800} tone="neutral" className="caps">
        YOUR BUY ORDER
      </Txt>
      {FC_ROWS.map((p) => (
        <g key={p}>
          <text x={100} y={rowY(p) + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: 700 }} fill="var(--ink)">
            {cents(p)}
          </text>
          {p === 20.05 && (
            <text x={136} y={rowY(p) + 4.5} className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar("ask")}>
              offer
            </text>
          )}
          {p === 20.0 && (
            <text x={136} y={rowY(p) + 4.5} className="sc-txt" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar("bid")}>
              bid
            </text>
          )}
        </g>
      ))}
      <motion.g initial={false} animate={{ y: rowY(FC_AT[b]) }} transition={spring.soft}>
        <rect x={18} y={-11} width={50} height={22} rx={11} fill={toneVar("bid")} />
        <text x={43} y={4} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800 }} fill="#fff">
          yours
        </text>
      </motion.g>
      <Meter y={70} label="Chance it fills" v={FC_FILL[b]} tone="idea" />
      <Meter y={128} label="Price if it fills" v={FC_PRICE[b]} tone="see" />
      <Txt x={296} y={180} size={11} weight={650} tone="neutral">
        (illustrative)
      </Txt>
      {FC_TXT.map((t, i) => (
        <Txt key={t} x={200} y={226} size={12.5} weight={750} tone="neutral" show={beat === i}>
          {t}
        </Txt>
      ))}
      <Txt x={200} y={226} size={13} weight={800} tone="see" show={beat >= 3}>
        No free choice: you pick which risk to carry
      </Txt>
    </Stage>
  );
}

// ── 4.4.5 box: Sandy's sugar order ──────────────────────────────────────────
const SU = [10.6, 10.5, 10.55, 10.4, 10.45, 10.3, 10.2, 10.25, 10.1, 10.0, 9.95];

export function SandyWatch({ beat }: BeatProps) {
  const upto = beat <= 1 ? 0 : beat === 2 ? 6 : 9;
  return (
    <Stage h={246} label="Sandy leaves a limit buy order for sugar at 10 cents with her broker, who watches the market and buys when the price reaches her limit">
      <Node x={104} y={32} w={184} h={48} label="Sandy" sub="attending to other business" tone="see" show={beat >= 1} dim={beat >= 2} />
      <Node x={298} y={32} w={184} h={48} label="Her broker" sub="watching sugar for her" tone="see" show={beat >= 1} hl={beat >= 2} />
      <Txt x={16} y={80} anchor="start" size={10.5} weight={800} tone="neutral" className="caps">
        JULY SUGAR, ¢ PER POUND (OUR PATH)
      </Txt>
      <PriceChart
        pts={SU}
        upto={upto}
        lo={9.7}
        hi={10.75}
        ticks={[9.8, 10, 10.2, 10.4, 10.6]}
        y0={96}
        y1={226}
        tone="neutral"
        fmtP={(p) => p.toFixed(1)}
        levels={[{ p: 10, label: "limit 10¢", tone: "bid" }]}
        marks={[{ i: 9, label: "bought 5 at 10¢", tone: "bid", show: beat >= 3, below: true }]}
      />
    </Stage>
  );
}
