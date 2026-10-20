// "See it" scenes for 4.9 Validity and Expiration Instructions.
import { motion } from "motion/react";
import { Building2, Mail } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { Node, Ping, Stage, Token, Txt, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { Ladder, type Lvl, PriceChart, chartX, chartY, ladderY } from "./kit.tsx";

// ── Open vs good: an order that may trade only after Wednesday ──────────────
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const D0 = 40;
const DW = 64;
const dayX = (d: number, t = 0) => D0 + d * DW + t * DW;

export function OpenGood({ beat }: BeatProps) {
  const Y = 132;
  const sub = dayX(0, 0.45);
  const good = dayX(2);
  const fill = dayX(3, 0.55);
  const now = [dayX(0, 0.55), dayX(1, 0.9), dayX(2, 0.45), fill][beat] ?? fill;
  const preW = beat <= 1 ? now - sub : good - sub;
  const goodW = beat < 2 ? 0 : (beat === 2 ? now : fill) - good;
  return (
    <Stage h={232} label="An order to buy only after Wednesday: open from Monday, good from Wednesday, gone once filled">
      <Node x={200} y={36} w={292} h={46} label="Buy 100 XYZ, limit 30" sub="only after Wednesday (our numbers)" tone="see" hl={beat >= 2 && beat < 3} />
      {DAYS.map((d, i) => (
        <g key={d}>
          <rect x={dayX(i) + 2} y={Y - 30} width={DW - 4} height={62} rx={8} fill="var(--node)" stroke="var(--line)" strokeWidth={1} />
          <text x={dayX(i, 0.5)} y={Y - 38} textAnchor="middle" className="sc-tick" style={{ fontSize: 12, fontWeight: 750 }}>
            {d}
          </text>
        </g>
      ))}
      {/* open but not good: dashed outline */}
      <motion.rect
        x={sub}
        y={Y - 9}
        height={18}
        rx={9}
        fill="none"
        stroke="var(--ink-3)"
        strokeWidth={2}
        strokeDasharray="5 4"
        initial={false}
        animate={{ width: Math.max(0, preW) }}
        transition={spring.fill}
      />
      {/* open and good: solid */}
      <motion.rect
        x={good}
        y={Y - 9}
        height={18}
        rx={9}
        fill={toneVar("see")}
        initial={false}
        animate={{ width: Math.max(0, goodW), opacity: goodW > 0 ? 1 : 0 }}
        transition={spring.fill}
      />
      <circle cx={sub} cy={Y} r={5} fill="var(--ink-2)" />
      <Txt x={(sub + Math.min(now, good)) / 2} y={Y + 26} size={11.5} weight={750} tone="neutral" show={beat >= 1}>
        open, not good
      </Txt>
      <Txt x={(good + fill) / 2} y={Y + 26} size={11.5} weight={800} tone="see" show={beat >= 2}>
        open and good
      </Txt>
      {/* the "now" cursor */}
      <motion.g initial={false} animate={{ x: now }} transition={{ duration: 0.6, ease: EASE_OUT }}>
        <line x1={0} x2={0} y1={Y - 30} y2={Y + 32} stroke="var(--ink)" strokeWidth={1.5} />
        <text y={Y - 58} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 11, fontWeight: 800, fill: "var(--ink)" }}>
          now
        </text>
      </motion.g>
      {beat >= 3 && <Ping x={fill} y={Y} trigger={`fill${beat}`} tone="def" r={22} />}
      <Txt x={fill + 4} y={Y + 58} size={12.5} weight={800} tone="def" show={beat >= 3} delay={0.25}>
        filled: no longer open
      </Txt>
      <Txt x={sub} y={Y + 58} size={11.5} weight={700} tone="neutral" show={beat < 3}>
        submitted
      </Txt>
    </Stage>
  );
}

// ── A good-till-cancel order you forgot about ───────────────────────────────
const GTC_PTS = [47.5, 48.2, 47.6, 48.8, 48.1, 47.2, 46.8, 47.9, 47.0, 46.2, 46.9, 45.8, 45.1, 46.0, 44.9, 44.2, 45.3, 43.9, 43.0, 41.8, 40.9, 40.0, 41.2, 42.6, 43.4];
const MONTHS = ["Jan", "Feb", "Mar", "Apr"];

export function ForgottenGtc({ beat }: BeatProps) {
  const upto = [2, 17, 19, 24][beat] ?? 24;
  const lo = 37;
  const hi = 50;
  return (
    <Stage h={246} label="A good-till-cancel buy order at 40 placed in January fills in April after the trader forgot it">
      <PriceChart
        pts={GTC_PTS}
        upto={upto}
        lo={lo}
        hi={hi}
        ticks={[40, 44, 48]}
        fmtP={(p) => `$${p}`}
        y1={190}
        levels={[{ p: 40, label: "", tone: "bid" }]}
        marks={[{ i: 21, label: "filled at $40", tone: "bid", show: beat >= 3, below: true }]}
      >
        {/* the level's label sits at the left, clear of the price path */}
        <text x={58} y={chartY(40, lo, hi, 30, 190) - 7} className="sc-txt halo" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("bid")}>
          GTC buy at $40
        </text>
        {MONTHS.map((m, k) => (
          <text key={m} x={chartX(GTC_PTS, k * 6 + 3)} y={212} textAnchor="middle" className="sc-tick" style={{ fontWeight: 750 }}>
            {m}
          </text>
        ))}
        {[6, 12, 18].map((i, k) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: beat >= 1 ? 1 : 0, y: beat >= 1 ? 0 : 6 }}
            transition={{ ...spring.soft, delay: beat === 1 ? 0.2 + k * 0.25 : 0 }}
          >
            <g transform={`translate(${chartX(GTC_PTS, i) - 8}, 200)`} style={{ color: toneVar("idea") }}>
              <Mail width={16} height={16} strokeWidth={2.2} />
            </g>
          </motion.g>
        ))}
      </PriceChart>
      <Txt x={216} y={236} size={11.5} weight={750} tone="idea" show={beat >= 1}>
        ✉ = the broker's monthly list of unfilled GTC orders
      </Txt>
      <Txt x={216} y={22} size={12.5} weight={800} tone="neutral" show={beat === 2}>
        forgotten, but still open…
      </Txt>
    </Stage>
  );
}

// ── An immediate-or-cancel order meets the book ─────────────────────────────
const IOC_BASE: Lvl[] = [
  { p: 50.14, ask: 800 },
  { p: 50.12, ask: 500 },
  { p: 50.1, ask: 300 },
  { p: 50.08 },
  { p: 50.06, bid: 400 },
  { p: 50.04, bid: 600 },
];
const IOC_AFTER = IOC_BASE.map((l) => (l.p === 50.1 ? { p: 50.1 } : l));
const IOC_DAY = IOC_BASE.map((l) => (l.p === 50.1 ? { p: 50.1, bid: 300 } : l));
const LY = 112;

export function IocBook({ beat }: BeatProps) {
  const levels = beat === 0 ? IOC_BASE : beat === 3 ? IOC_DAY : IOC_AFTER;
  const rowY = ladderY(levels, 50.1, LY, 24);
  return (
    <Stage h={262} label="An immediate-or-cancel order to buy 600 at 50.10 buys the 300 offered and cancels the rest">
      <Node x={200} y={30} w={270} h={40} label="IOC: buy 600, limit 50.10" tone="prac" hl={beat < 3} dim={beat === 3} />
      <Token from={[262, 54]} to={[268, rowY]} at={beat >= 1 ? 1 : 0} show={beat >= 1 && beat < 3} absorb label="buy 300" tone="bid" />
      {beat === 1 && <Ping x={268} y={rowY} trigger="ioc-fill" tone="bid" r={22} />}
      <Txt x={200} y={72} size={12.5} weight={800} tone="neutral" show={beat === 2} delay={0.15}>
        ✕ the other 300: canceled at once
      </Txt>
      <Ladder
        levels={levels}
        y={LY}
        maxSize={800}
        hl={beat === 1 || beat === 2 ? [50.1] : []}
        hlTone="bid"
        marks={[
          { p: 50.1, label: "300 bought", side: "ask", tone: "bid", show: beat === 1 || beat === 2 },
          { p: 50.1, label: "a day order", side: "bid", tone: "idea", show: beat === 3 },
        ]}
      />
    </Stage>
  );
}

// ── One trading day: market-on-open and market-on-close ─────────────────────
export function OpenClose({ beat }: BeatProps) {
  const Y = 168;
  return (
    <Stage h={258} label="Market-on-open orders trade at the opening auction; a mutual fund's market-on-close orders trade at the close">
      <line x1={124} x2={276} y1={Y} y2={Y} stroke="var(--line-strong)" strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" />
      <Txt x={200} y={Y - 10} size={11.5} weight={700} tone="neutral">
        trading session
      </Txt>
      <Node x={70} y={Y} w={104} h={50} label="Open" sub="opening auction" tone="see" hl={beat <= 1} />
      <Node x={330} y={Y} w={104} h={50} label="Close" sub="closing prices" tone="idea" hl={beat >= 2} />
      <Token from={[44, 58]} to={[54, Y - 30]} at={beat >= 1 ? 1 : 0} show={beat <= 1} absorb label="MOO buy" tone="bid" />
      <Token from={[118, 92]} to={[88, Y - 30]} at={beat >= 1 ? 1 : 0} show={beat <= 1} absorb label="MOO sell" tone="ask" delay={0.05} />
      {beat === 1 && <Ping x={70} y={Y} trigger="open" tone="see" r={36} />}
      <Txt x={70} y={Y + 46} size={12.5} weight={800} tone="see" show={beat >= 1} delay={0.5}>
        all at one price
      </Txt>
      <Txt x={70} y={Y + 62} size={11} weight={650} tone="neutral" show={beat >= 1} delay={0.6}>
        the opening price
      </Txt>
      <Node x={318} y={56} w={140} h={50} label="Mutual fund" sub="values at NAV" icon={Building2} tone="idea" show={beat >= 2} />
      <Token from={[318, 98]} to={[330, Y - 30]} at={beat >= 2 ? 1 : 0} show={beat >= 2} absorb label="MOC buy" tone="bid" delay={0.3} />
      <Txt x={322} y={Y + 46} size={12.5} weight={800} tone="idea" show={beat === 2} delay={0.8}>
        hopes for the close
      </Txt>
      <Txt x={322} y={Y + 46} size={12.5} weight={800} tone="neutral" show={beat >= 3}>
        price not guaranteed
      </Txt>
      <Txt x={200} y={Y + 80} size={11.5} weight={750} tone="idea" show={beat >= 3} delay={0.25}>
        a dealer-broker can guarantee it, for higher commissions
      </Txt>
      <Txt x={170} y={42} size={11.5} weight={700} tone="neutral" show={beat === 0}>
        waiting for the open
      </Txt>
    </Stage>
  );
}
