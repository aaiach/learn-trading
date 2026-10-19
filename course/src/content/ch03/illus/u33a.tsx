// "See it" scenes for 3.3 Trading Instruments, part A (3.3 intro, 3.3.1, 3.3.2, 3.3.2.1)
import { useRef } from "react";
import { motion } from "motion/react";
import {
  Banknote,
  Building2,
  BarChart3,
  Factory,
  Globe,
  Home,
  Landmark,
  Layers,
  Store,
  UserRound,
  Users,
} from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, type SceneTone, Edge, Node, Num, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_IN_OUT, EASE_OUT, spring } from "../../../motion/tokens.ts";
import { money } from "../../../util.ts";

const box = (x: number, y: number, w = 112, h = 58): Box => ({ x, y, w, h });

/** A small labelled chip that can move and fade (an item on a balance sheet, a coupon, a share block…). */
function Chip({
  x,
  y,
  w,
  h = 26,
  label,
  tone = "neutral",
  show = true,
  delay = 0,
  dim,
  dashed,
  size = 12,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  tone?: SceneTone;
  show?: boolean;
  delay?: number;
  dim?: boolean;
  dashed?: boolean;
  size?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: show ? (dim ? 0.3 : 1) : 0, x, y }}
      transition={{ x: { duration: 0.8, ease: EASE_IN_OUT, delay }, y: { duration: 0.8, ease: EASE_IN_OUT, delay }, opacity: { duration: 0.3, delay: show ? delay : 0 } }}
      style={{ pointerEvents: "none" }}
    >
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={8}
        style={{ fill: toneSoft(tone), stroke: toneVar(tone) }}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <text y={size * 0.36} textAnchor="middle" className="sc-token" style={{ fill: toneVar(tone), fontSize: size }}>
        {label}
      </text>
    </motion.g>
  );
}

// ── Table 3-3: classes of trading instruments ───────────────────────────────
const CLASSES = [
  { label: "Real assets", sub: undefined, ins: ["Spot commodities · Intellectual properties", "Real estate · Pollution emission rights"], by: ["Farmers, miners, manufacturers · Inventors", "and artists · Builders · Governments"] },
  { label: "Financial assets", sub: undefined, ins: ["Stocks and warrants · Bonds", "Trust units · Currencies"], by: ["Corporate issuers · Governments", "Trusts · Banks"] },
  { label: "Derivative", sub: "contracts", ins: ["Futures contracts · Forward contracts", "Options · Swaps"], by: ["Sellers"] },
  { label: "Insurance", sub: "contracts", ins: ["Insurance policies", "Reinsurance contracts"], by: ["Corporations"] },
  { label: "Hybrid", sub: "instruments", ins: ["Warrants · Index linked bonds", "Convertible bonds"], by: ["Corporate issuers"] },
  { label: "Gambling", sub: "contracts", ins: ["Numerous types"], by: ["Individuals · Bookies", "Casinos · Racetracks"] },
];
const FIN = [1, 2, 3];

export function InstrumentClasses({ beat }: BeatProps) {
  const last = beat >= CLASSES.length;
  return (
    <Stage h={262} label="The classes of trading instruments in Table 3-3">
      {CLASSES.map((c, i) => {
        const x = 70 + (i % 3) * 130;
        const y = 34 + Math.floor(i / 3) * 56;
        const on = last ? FIN.includes(i) : beat === i;
        return <Node key={c.label} x={x} y={y} w={124} h={48} label={c.label} sub={c.sub} tone={last ? "def" : "see"} hl={on} dim={!on} />;
      })}
      {CLASSES.map((c, i) => (
        <g key={`d${i}`}>
          <Txt x={200} y={142} size={11} weight={800} tone="neutral" show={beat === i} className="caps">
            INSTRUMENTS
          </Txt>
          {c.ins.map((line, k) => (
            <Txt key={k} x={200} y={162 + k * 18} size={13} weight={650} show={beat === i}>
              {line}
            </Txt>
          ))}
          <Txt x={200} y={208} size={11} weight={800} tone="neutral" show={beat === i} className="caps">
            CREATED BY
          </Txt>
          {c.by.map((line, k) => (
            <Txt key={k} x={200} y={228 + k * 18} size={13} weight={650} tone="see" show={beat === i}>
              {line}
            </Txt>
          ))}
        </g>
      ))}
      <Txt x={200} y={168} size={15} weight={800} tone="def" show={last}>
        Financial instruments =
      </Txt>
      <Txt x={200} y={192} size={13} weight={650} show={last}>
        financial assets + derivative contracts
      </Txt>
      <Txt x={200} y={212} size={13} weight={650} show={last}>
        + insurance contracts
      </Txt>
    </Stage>
  );
}

// ── Balance sheets ──────────────────────────────────────────────────────────
function Sheet({ x, title, icon }: { x: number; title: string; icon: typeof Users }) {
  const Icon = icon;
  return (
    <g>
      <rect x={x} y={14} width={176} height={166} rx={14} fill="var(--node)" stroke="var(--node-line)" />
      <g transform={`translate(${x + 14}, 24)`} style={{ color: "var(--ink-2)" }}>
        <Icon width={18} height={18} strokeWidth={2.2} />
      </g>
      <text x={x + 38} y={38} className="sc-label">
        {title}
      </text>
      <line x1={x + 10} x2={x + 166} y1={52} y2={52} stroke="var(--ink-3)" strokeWidth={1.5} />
      <line x1={x + 88} x2={x + 88} y1={52} y2={170} stroke="var(--ink-3)" strokeWidth={1.5} />
      <text x={x + 49} y={70} textAnchor="middle" className="sc-sub">
        Assets
      </text>
      <text x={x + 127} y={70} textAnchor="middle" className="sc-sub">
        Liabilities
      </text>
    </g>
  );
}

/** Real assets sit on one side only. */
export function RealAssetSheet({ beat }: BeatProps) {
  const L = 16;
  const R = 208;
  return (
    <Stage h={194} label="A real asset appears only on the asset side of a balance sheet">
      <Sheet x={L} title="Farmer" icon={UserRound} />
      <Sheet x={R} title="Anyone else" icon={Users} />
      <Chip x={L + 49} y={96} w={70} label="Wheat" tone="asset" />
      <Chip x={L + 49} y={128} w={70} label="Tractor" tone="asset" delay={0.15} />
      <Chip x={L + 49} y={160} w={70} label="Patent" tone="asset" delay={0.3} />
      {[L + 127, R + 127].map((cx, i) => (
        <Chip key={i} x={cx} y={128} w={64} h={84} label="" tone="bad" dashed show={beat >= 1} delay={i * 0.15} />
      ))}
      {[L + 127, R + 127].map((cx, i) => (
        <g key={`t${i}`}>
          <Txt x={cx} y={124} size={11.5} weight={750} tone="bad" show={beat >= 1} delay={0.2 + i * 0.15}>
            no one
          </Txt>
          <Txt x={cx} y={138} size={11.5} weight={750} tone="bad" show={beat >= 1} delay={0.2 + i * 0.15}>
            owes it
          </Txt>
        </g>
      ))}
    </Stage>
  );
}

/** A financial asset is the issuer's liability and the holder's asset. */
export function FinancialAssetSheet({ beat }: BeatProps) {
  const L = 16;
  const R = 208;
  const bondAtHolder = beat >= 1;
  return (
    <Stage h={208} label="A bond is a liability for its issuer and an asset for its holder">
      <Sheet x={L} title="Corporation" icon={Factory} />
      <Sheet x={R} title="Bondholder" icon={UserRound} />
      <Chip x={L + 49} y={100} w={70} label="Factory" tone="asset" />
      {/* the issuer's promise: always on its liability side once issued */}
      <Chip x={L + 127} y={100} w={70} label="Bond" tone="bad" />
      {/* the same bond travels to the holder's asset side as the cash travels back */}
      <Chip x={bondAtHolder ? R + 49 : L + 127} y={bondAtHolder ? 100 : 100} w={70} label="Bond" tone="good" show={beat >= 1} />
      <Chip x={bondAtHolder ? L + 49 : R + 49} y={bondAtHolder ? 132 : 132} w={70} label="Cash" tone="cash" show={beat >= 1 || beat === 0} />
      <Txt x={L + 127} y={136} size={11.5} weight={750} tone="bad" show={beat >= 2}>
        owes
      </Txt>
      <Txt x={R + 49} y={136} size={11.5} weight={750} tone="good" show={beat >= 2}>
        owns
      </Txt>
      <Txt x={200} y={199} size={12.5} weight={750} tone="def" show={beat >= 2}>
        same bond · both sides
      </Txt>
    </Stage>
  );
}

// ── Fungible commodities ────────────────────────────────────────────────────
export function Fungible({ beat }: BeatProps) {
  const xs = [70, 135, 200, 265, 330];
  // beat 1 swaps bars 1 and 3: nothing about the position changes
  const order = beat >= 1 ? [0, 3, 2, 1, 4] : [0, 1, 2, 3, 4];
  return (
    <Stage h={210} label="Fungible units are interchangeable">
      {order.map((slot, i) => {
        const odd = i === 4 && beat >= 2;
        return (
          <motion.g key={i} initial={false} animate={{ x: xs[slot], y: 86 }} transition={{ duration: 0.9, ease: EASE_IN_OUT }}>
            <path d="M-26,14 L-18,-12 L18,-12 L26,14 Z" style={{ fill: odd ? "var(--book-soft)" : "var(--def-soft)", stroke: odd ? "var(--book)" : "var(--asset)", transition: "fill .3s, stroke .3s" }} strokeWidth={1.5} />
            <text y={6} textAnchor="middle" className="sc-token" style={{ fill: odd ? "var(--book-ink)" : "var(--asset)", fontSize: 11 }}>
              1 oz
            </text>
          </motion.g>
        );
      })}
      <Txt x={200} y={40} size={13} weight={750} tone="neutral" show={beat === 0}>
        five units of silver
      </Txt>
      <Txt x={200} y={40} size={13} weight={750} tone="def" show={beat === 1}>
        swap any two: nothing changes
      </Txt>
      <Txt x={200} y={40} size={13} weight={750} tone="book" show={beat >= 2}>
        one unit is a bit lower quality
      </Txt>
      <Chip x={330} y={140} w={92} label="price −2%" tone="book" show={beat >= 2} delay={0.4} />
      <Txt x={200} y={186} size={12} weight={600} tone="neutral" show={beat >= 2} delay={0.6}>
        traders just adjust the price (illustrative)
      </Txt>
    </Stage>
  );
}

// ── Primary vs secondary markets ────────────────────────────────────────────
export function PrimarySecondary({ beat }: BeatProps) {
  const issuer = box(64, 132, 104, 60);
  const ann = box(200, 132, 104, 60);
  const ben = box(336, 132, 104, 60);
  // shares fly over the top of the row and cash underneath, at the same time
  const TOP = issuer.y - issuer.h / 2 - 18;
  const BOT = issuer.y + issuer.h / 2 + 18;
  return (
    <Stage h={232} label="New issues trade in the primary market, seasoned issues in the secondary market">
      <Txt x={132} y={30} size={11} weight={800} tone="def" className="caps" show={beat <= 1} delay={0.2}>
        PRIMARY MARKET
      </Txt>
      <path d="M20,40 L20,46 L244,46 L244,40" fill="none" stroke="var(--def)" strokeWidth={1.5} opacity={beat <= 1 ? 1 : 0} style={{ transition: "opacity .3s" }} />
      <Txt x={268} y={30} size={11} weight={800} tone="see" className="caps" show={beat >= 2} delay={0.2}>
        SECONDARY MARKET
      </Txt>
      <path d="M156,40 L156,46 L380,46 L380,40" fill="none" stroke="var(--see)" strokeWidth={1.5} opacity={beat >= 2 ? 1 : 0} style={{ transition: "opacity .3s" }} />
      <Node {...issuer} icon={Factory} label="Issuer" sub={beat >= 2 ? "not involved" : "creates shares"} dim={beat >= 2} tone="def" hl={beat <= 1} />
      <Node {...ann} icon={UserRound} label="Ann" sub={beat >= 1 ? "seasoned shares" : "buys new issue"} tone="def" hl />
      <Node {...ben} icon={UserRound} label="Ben" sub="buys later" dim={beat < 2} tone="see" hl={beat >= 2} />
      <Token from={[issuer.x, TOP]} to={[ann.x, TOP]} bend={8} at={1} show={beat === 0} label="new shares" icon={Layers} tone="asset" absorb />
      <Token from={[ann.x, BOT]} to={[issuer.x, BOT]} bend={8} at={1} show={beat === 0} label="cash" icon={Banknote} tone="cash" absorb />
      <Token from={[ann.x, TOP]} to={[ben.x, TOP]} bend={8} at={beat >= 2 ? 1 : 0} show={beat === 2} label="shares" icon={Layers} tone="asset" absorb />
      <Token from={[ben.x, BOT]} to={[ann.x, BOT]} bend={8} at={beat >= 2 ? 1 : 0} show={beat === 2} label="cash" icon={Banknote} tone="cash" absorb />
      <Txt x={132} y={214} size={12.5} weight={750} tone="def" show={beat === 1}>
        new equity: the IPO market
      </Txt>
      <Txt x={268} y={214} size={12.5} weight={750} tone="see" show={beat >= 3}>
        a trade between investors
      </Txt>
    </Stage>
  );
}

// ── Underwriting: three kinds of offering ───────────────────────────────────
// Ten blocks = the issue. Each beat moves them to where that kind of offering leaves them.
type Owner = "issuer" | "uw" | "buyers";
const COLS: Record<Owner, number> = { issuer: 64, uw: 200, buyers: 336 };
function slot(owner: Owner, k: number): [number, number] {
  const col = k % 4;
  const row = Math.floor(k / 4);
  return [COLS[owner] - 39 + col * 26, 124 + row * 24];
}
const BLOCK: Record<Owner, { fill: string; stroke: string }> = {
  issuer: { fill: "var(--bad-soft)", stroke: "var(--bad)" },
  uw: { fill: "var(--prac-soft)", stroke: "var(--prac)" },
  buyers: { fill: "var(--def-soft)", stroke: "var(--asset)" },
};

export function Underwriting({ beat }: BeatProps) {
  // beat 0 best efforts: 7 sold, 3 left with the issuer; beat 1 underwritten: the underwriter buys 3;
  // beat 2 fixed-price open: oversubscribed, a lottery picks 10 of 15 subscribers; beat 3: fees
  const owners: Owner[] = Array.from({ length: 10 }, (_, k) => {
    if (beat === 0) return k < 7 ? "buyers" : "issuer";
    if (beat === 1) return k < 7 ? "buyers" : "uw";
    return "buyers";
  });
  const counts: Record<Owner, number> = { issuer: 0, uw: 0, buyers: 0 };
  const pos = owners.map((o) => slot(o, counts[o]++));
  const titles = ["BEST EFFORTS · ACTS AS A BROKER", "UNDERWRITTEN · PRICE GUARANTEED", "FIXED-PRICE OPEN · LOTTERY", "FEES"];
  const winners = new Set([0, 2, 3, 5, 6, 8, 9, 11, 12, 14]);
  return (
    <Stage h={244} label="Best efforts, underwritten and fixed-price open offerings">
      {titles.map((t, i) => (
        <Txt key={t} x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" className="caps" show={beat === i}>
          {t}
        </Txt>
      ))}
      <Node x={64} y={66} w={110} h={52} icon={Factory} label="Issuer" tone="def" hl={beat === 1 || beat === 3} />
      <Node x={200} y={66} w={110} h={52} icon={Landmark} label="Underwriter" tone="def" hl={beat === 1 || beat === 3} />
      <Node x={336} y={66} w={110} h={52} icon={Users} label="Buyers" tone="def" hl={beat === 2} />
      {pos.map(([x, y], k) => (
        <motion.g key={k} initial={{ x, y, opacity: 0 }} animate={{ x, y, opacity: 1 }} transition={{ duration: 0.9, ease: EASE_IN_OUT, delay: k * 0.04 }}>
          <rect x={-10} y={-9} width={20} height={18} rx={4} fill={BLOCK[owners[k]].fill} stroke={BLOCK[owners[k]].stroke} strokeWidth={1.5} style={{ transition: "fill .4s, stroke .4s" }} />
        </motion.g>
      ))}
      <Txt x={64} y={196} size={12} weight={750} tone="bad" show={beat === 0} delay={0.8}>
        3 unsold
      </Txt>
      <Txt x={200} y={196} size={12} weight={750} tone="prac" show={beat === 1} delay={0.8}>
        buys 3 itself
      </Txt>
      <Txt x={64} y={196} size={12} weight={750} tone="good" show={beat === 1} delay={1}>
        full price
      </Txt>
      <Txt x={200} y={150} size={12} weight={750} tone="neutral" show={beat === 2}>
        sets the price
      </Txt>
      {/* fixed-price open: 15 subscribers, a lottery picks 10 */}
      {Array.from({ length: 15 }, (_, k) => {
        const win = winners.has(k);
        return (
          <motion.g
            key={`s${k}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: beat === 2 ? (win ? 1 : 0.45) : 0 }}
            transition={{ duration: 0.3, delay: beat === 2 ? 0.3 + k * 0.03 : 0 }}
          >
            <circle
              cx={280 + (k % 8) * 16}
              cy={204 + Math.floor(k / 8) * 16}
              r={5.5}
              strokeWidth={1.5}
              style={{ fill: beat === 2 && win ? "var(--asset)" : "var(--surface)", stroke: "var(--asset)", transition: beat === 2 ? "fill .3s 1.2s" : "none" }}
            />
          </motion.g>
        );
      })}
      <Txt x={160} y={210} size={12} weight={750} tone="def" show={beat === 2} delay={0.4} anchor="start">
        15 subscribe →
      </Txt>
      <Txt x={160} y={226} size={12} weight={750} tone="def" show={beat === 2} delay={1.2} anchor="start">
        lottery: 10 win
      </Txt>
      <Token from={[84, 22]} to={[200, 22]} bend={6} at={beat >= 3 ? 1 : 0} show={beat === 3} label="fee" icon={Banknote} tone="cash" absorb />
    </Stage>
  );
}

// ── Preferred dividends come first ──────────────────────────────────────────
export function PreferredFirst({ beat }: BeatProps) {
  const co = box(200, 56, 132, 56);
  const pref = box(96, 184, 132, 56);
  const com = box(304, 184, 132, 56);
  const e1 = between(co, pref, 0, 6);
  const e2 = between(co, com, 0, 6);
  return (
    <Stage h={240} label="Accrued preferred dividends are paid before any common dividends">
      <Node {...co} icon={Factory} label="Corporation" sub={beat >= 3 ? "cash is short" : "pays dividends"} tone="def" hl />
      <Node {...pref} icon={UserRound} label="Preferred" sub="contractual rate" tone="good" hl={beat >= 1 && beat !== 2} dim={beat === 2} />
      <Node {...com} icon={Users} label="Common" sub={beat >= 3 ? "must wait" : "after preferred"} tone="good" hl={beat === 2} dim={beat !== 2 && beat !== 0} />
      <Edge from={e1[0]} to={e1[1]} tone="good" show={beat >= 1} label="1st" labelDy={-4} />
      <Edge from={e2[0]} to={e2[1]} tone={beat >= 3 ? "bad" : "good"} show={beat >= 2} dashed={beat >= 3} label="2nd" labelDy={-4} />
      <Token from={e1[0]} to={e1[1]} at={beat >= 1 ? 1 : 0} show={beat === 1 || beat === 3} label="$" tone="cash" absorb />
      <Token from={e2[0]} to={e2[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="$" tone="cash" absorb />
      <Txt x={304} y={230} size={12.5} weight={800} tone="bad" show={beat >= 3} delay={0.6} className="halo">
        nothing until preferred is paid
      </Txt>
    </Stage>
  );
}

// ── ADRs, ETFs, REITs: a trust or fund wraps something and trades as units ─
const WRAP = [
  { und: "Foreign company", undSub: "one company only", undIcon: Globe, mid: "Trust", out: "U.S. market", unit: "ADRs" },
  { und: "Index basket", undSub: "many stocks", undIcon: BarChart3, mid: "Mutual fund", out: "Exchange", unit: "ETF shares" },
  { und: "Real estate", undSub: "buildings", undIcon: Building2, mid: "Trust", out: "Exchange", unit: "REIT units" },
];
export function Wrappers({ beat }: BeatProps) {
  const a = box(70, 120, 116, 62);
  const m = box(200, 120, 104, 62);
  const o = box(330, 120, 112, 62);
  return (
    <Stage h={228} label="ADRs, ETFs and REITs wrap an underlying holding into tradable units">
      {WRAP.map((w, i) => (
        <g key={w.unit}>
          <Txt x={200} y={36} size={18} weight={800} show={beat === i}>
            {w.unit}
          </Txt>
          <Node {...a} icon={w.undIcon} label={w.und} sub={w.undSub} show={beat === i} tone="asset" />
          <Node {...m} icon={Landmark} label={w.mid} sub="holds it" show={beat === i} tone="def" hl />
          <Node {...o} icon={Store} label={w.out} sub="trades units" show={beat === i} />
          <Token from={[a.x, a.y - 49]} to={[m.x, m.y - 49]} bend={8} at={beat >= i ? 1 : 0} show={beat === i} label="holdings" tone="asset" absorb />
          <Token from={[m.x, m.y + 49]} to={[o.x, o.y + 49]} bend={-8} at={beat >= i ? 1 : 0} show={beat === i} label={w.unit} tone="def" absorb delay={0.9} />
        </g>
      ))}
      <Txt x={200} y={214} size={12.5} weight={700} tone="neutral" show={beat === 0}>
        avoids international settlement problems
      </Txt>
      <Txt x={200} y={214} size={12.5} weight={700} tone="neutral" show={beat === 1}>
        most mimic a market or industry index
      </Txt>
      <Txt x={200} y={214} size={12.5} weight={700} tone="neutral" show={beat === 2}>
        real estate, traded like common stock
      </Txt>
    </Stage>
  );
}

// ── Bond quotes as a percentage of par ──────────────────────────────────────
export function BondQuote({ beat }: BeatProps) {
  const X0 = 40;
  const W100 = 300; // width of 100% of par
  const quote = beat === 0 ? 100 : beat === 1 ? 97 : 102.5;
  const price = 1_000_000 * (quote / 100);
  return (
    <Stage h={206} label="A bond quoted at 97 costs 97 percent of its par value">
      <Txt x={X0} y={34} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        PAR VALUE · $1,000,000
      </Txt>
      <rect x={X0} y={52} width={W100} height={34} rx={8} fill="var(--surface-2)" stroke="var(--line-strong)" strokeDasharray="4 4" />
      {/* two fills (book quote / our illustration) so the colour can change while the width springs */}
      {[false, true].map((ours) => (
        <motion.rect
          key={String(ours)}
          x={X0}
          y={52}
          height={34}
          rx={8}
          initial={{ width: W100, opacity: ours ? 0 : 1 }}
          animate={{ width: (W100 * quote) / 100, opacity: (beat === 2) === ours ? 1 : 0 }}
          transition={{ width: spring.fill, opacity: { duration: 0.3 } }}
          fill={ours ? "var(--prac-soft)" : "var(--def-soft)"}
          stroke={ours ? "var(--prac)" : "var(--asset)"}
          strokeWidth={1.5}
        />
      ))}
      <line x1={X0 + W100} x2={X0 + W100} y1={44} y2={96} stroke="var(--ink-3)" strokeWidth={1.5} />
      <text x={X0 + W100} y={110} textAnchor="middle" className="sc-tick">
        100
      </text>
      <Txt x={X0} y={140} anchor="start" size={12} weight={700} tone="neutral">
        quote
      </Txt>
      <Num value={quote} x={X0} y={168} anchor="start" size={26} weight={800} format={(v) => v.toFixed(1).replace(/\.0$/, "")} />
      <Txt x={360} y={140} anchor="end" size={12} weight={700} tone="neutral">
        price
      </Txt>
      <Num value={price} x={360} y={168} anchor="end" size={26} weight={800} format={(v) => money(Math.round(v))} tone={beat === 1 ? "def" : beat === 2 ? "prac" : undefined} />
      <Txt x={200} y={196} size={10.5} weight={600} tone="neutral" show={beat === 2}>
        102.5 is our illustration · 97 is the book's
      </Txt>
    </Stage>
  );
}

// ── Credit quality ──────────────────────────────────────────────────────────
export function CreditQuality({ beat }: BeatProps) {
  const xs = [70, 135, 200, 265, 330];
  const labels = ["int.", "int.", "int.", "int.", "principal"];
  const unsure = beat >= 1 ? [2, 4] : [];
  return (
    <Stage h={226} label="Investment grade bonds pay on time; junk bond payments are less certain">
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" className="caps" show={beat === 0}>
        INVESTMENT GRADE
      </Txt>
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="bad" className="caps" show={beat >= 1}>
        JUNK · HIGH YIELD
      </Txt>
      <line x1={40} x2={360} y1={84} y2={84} stroke="var(--ink-3)" strokeWidth={1.5} />
      {xs.map((x, i) => {
        const bad = unsure.includes(i);
        return (
          <g key={i}>
            <circle
              cx={x}
              cy={84}
              r={i === 4 ? 16 : 12}
              style={{ fill: bad ? "var(--bad-soft)" : "var(--good-soft)", stroke: bad ? "var(--bad)" : "var(--good)", transition: "fill .3s, stroke .3s" }}
              strokeWidth={2}
              strokeDasharray={bad ? "4 3" : undefined}
            />
            <text x={x} y={89} textAnchor="middle" className="sc-token" style={{ fill: bad ? "var(--bad)" : "var(--good)", fontSize: 13 }}>
              {bad ? "?" : "✓"}
            </text>
            <text x={x} y={120} textAnchor="middle" className="sc-tick">
              {labels[i]}
            </text>
            <text x={x} y={58} textAnchor="middle" className="sc-tick">
              {`yr ${Math.min(i + 1, 4)}`}
            </text>
          </g>
        );
      })}
      <Txt x={200} y={150} size={12.5} weight={700} tone="bad" show={beat === 1} delay={0.3}>
        will every payment come on time? less certain
      </Txt>
      {/* investors want a higher yield for the risk */}
      <Txt x={60} y={168} anchor="start" size={12} weight={700} tone="neutral" show={beat >= 2}>
        yield investors require (illustrative)
      </Txt>
      <motion.rect x={60} y={178} height={14} rx={5} initial={{ width: 0 }} animate={{ width: beat >= 2 ? 110 : 0 }} transition={spring.fill} style={{ fill: "var(--good)" }} />
      <Txt x={176} y={190} anchor="start" size={12} weight={750} tone="good" show={beat >= 2}>
        investment grade 5%
      </Txt>
      <motion.rect x={60} y={198} height={14} rx={5} initial={{ width: 0 }} animate={{ width: beat >= 2 ? 200 : 0 }} transition={{ ...spring.fill, delay: 0.2 }} style={{ fill: "var(--bad)" }} />
      <Txt x={266} y={210} anchor="start" size={12} weight={750} tone="bad" show={beat >= 2} delay={0.2}>
        junk 9%
      </Txt>
    </Stage>
  );
}

// ── Stripping a bond into zeros ─────────────────────────────────────────────
const ZX = [52, 126, 200, 274, 348];
const ZPRICE = [47.62, 45.35, 43.19, 41.14, 822.7];
export function Stripping({ beat }: BeatProps) {
  const apart = beat >= 1 && beat <= 3;
  const principalApart = beat >= 2 && beat <= 3;
  const couponHome = (i: number): [number, number] => [92 + i * 62, 104];
  return (
    <Stage h={276} label="Stripping: a straight bond becomes a bundle of zero-coupon bonds">
      {/* the straight bond */}
      <motion.g initial={false} animate={{ opacity: principalApart ? 0.35 : 1 }}>
        <rect x={30} y={18} width={340} height={70} rx={12} fill="var(--node)" stroke="var(--asset)" strokeWidth={2} />
        <text x={46} y={42} className="sc-label">
          Straight bond
        </text>
        <text x={46} y={60} className="sc-sub">
          $1,000 face · coupon $50 a year · 4 years
        </text>
        <text x={354} y={42} textAnchor="end" className="sc-sub">
          {principalApart ? "fully stripped" : ""}
        </text>
      </motion.g>
      {/* zero-coupon slots */}
      {ZX.map((x, i) => (
        <motion.g key={`z${i}`} initial={{ opacity: 0 }} animate={{ opacity: beat >= 1 && beat <= 3 ? 1 : 0 }} transition={{ duration: 0.3 }}>
          <rect x={x - 34} y={164} width={68} height={58} rx={10} fill="none" stroke="var(--line-strong)" strokeDasharray="4 4" />
          <text x={x} y={238} textAnchor="middle" className="sc-tick">
            {i < 4 ? `zero · yr ${i + 1}` : "zero · yr 4"}
          </text>
        </motion.g>
      ))}
      {/* coupons */}
      {[0, 1, 2, 3].map((i) => {
        const [hx, hy] = couponHome(i);
        return (
          <Chip key={`c${i}`} x={apart ? ZX[i] : hx} y={apart ? 184 : hy} w={56} h={24} label={`yr${i + 1} $50`} tone="cash" delay={apart ? i * 0.12 : (3 - i) * 0.08} size={11} />
        );
      })}
      {/* principal */}
      <Chip x={principalApart ? ZX[4] : 334} y={principalApart ? 184 : 66} w={60} h={24} label="$1,000" tone="asset" delay={0.1} size={11.5} />
      {/* discount prices */}
      {ZX.map((x, i) => (
        <Txt key={`p${i}`} x={x} y={212} size={12} weight={800} tone={i < 4 ? "good" : "def"} show={beat === 3} delay={0.15 + i * 0.12}>
          {money(ZPRICE[i], i < 4 ? 2 : 0)}
        </Txt>
      ))}
      <Txt x={200} y={262} size={12} weight={700} tone="neutral" show={beat === 3}>
        price today: further away = bigger discount (illustrative, 5%)
      </Txt>
      <Txt x={200} y={262} size={12.5} weight={750} tone="def" show={beat === 1}>
        clip the coupons: each becomes a zero
      </Txt>
      <Txt x={200} y={262} size={12.5} weight={750} tone="def" show={beat === 2}>
        the final principal becomes a zero too
      </Txt>
      <Txt x={200} y={262} size={12.5} weight={750} tone="def" show={beat >= 4}>
        put back together: the same straight bond
      </Txt>
    </Stage>
  );
}

// ── Mortgage pool and CMO waterfall ─────────────────────────────────────────
const TR = [
  { name: "A", cap: 30 },
  { name: "B", cap: 25 },
  { name: "C", cap: 25 },
  { name: "Z", cap: 20 },
];
const PAID = [0, 100, 90, 65];
function fills(paid: number) {
  let left = paid;
  return TR.map((t) => {
    const got = Math.min(t.cap, Math.max(0, left));
    left -= got;
    return got;
  });
}

export function CmoWaterfall({ beat }: BeatProps) {
  const paid = PAID[Math.min(beat, PAID.length - 1)];
  const f = fills(paid);
  const prev = useRef(f);
  const decreasing = f.reduce((s, v) => s + v, 0) < prev.current.reduce((s, v) => s + v, 0);
  prev.current = f;
  const houses = Array.from({ length: 10 }, (_, k) => ({ x: 28 + (k % 2) * 34, y: 52 + Math.floor(k / 2) * 38 }));
  const defaults = beat === 2 ? [9] : beat >= 3 ? [3, 6, 8, 9] : [];
  const pool = box(140, 128, 76, 70);
  const BX = 192;
  const BW = 138; // width for a capacity of 30
  return (
    <Stage h={262} label="Mortgage payments pour into CMO tranches in order; defaults hit the Z tranche first">
      {houses.map((h, k) => {
        const d = defaults.includes(k);
        return (
          <g key={k} transform={`translate(${h.x - 11}, ${h.y - 11})`} style={{ color: d ? "var(--bad)" : "var(--ink-2)", opacity: d ? 0.55 : 1, transition: "opacity .3s, color .3s" }}>
            <Home width={22} height={22} strokeWidth={2} />
            {d && <line x1={0} y1={0} x2={22} y2={22} stroke="var(--bad)" strokeWidth={2.4} />}
          </g>
        );
      })}
      <text x={45} y={250} textAnchor="middle" className="sc-tick">
        borrowers
      </text>
      <Node {...pool} label="Pool" sub="mortgages" tone="def" hl />
      <Num value={paid} x={140} y={186} size={14} format={(v) => `$${Math.round(v)} paid`} tone="def" />
      {houses.map((h, k) => (
        <Token key={`t${k}`} from={[h.x, h.y]} to={[pool.x - 14, pool.y - 14]} at={beat >= 0 ? 1 : 0} show={beat === 0} label="$" tone="cash" absorb delay={k * 0.06} />
      ))}
      {TR.map((t, i) => {
        const y = 52 + i * 52;
        const w = (BW * t.cap) / 30;
        const fw = (BW * f[i]) / 30;
        const order = decreasing ? TR.length - 1 - i : i;
        const full = f[i] === t.cap;
        return (
          <g key={t.name}>
            <text x={BX} y={y - 12} className="sc-label" style={{ fontSize: 12.5 }}>
              {i === 0 ? "Tranche A · paid first" : i === 3 ? "Z tranche · gets what's left" : `Tranche ${t.name}`}
            </text>
            <rect x={BX} y={y - 4} width={w} height={22} rx={6} fill="var(--surface-2)" stroke="var(--line-strong)" />
            <motion.rect
              x={BX}
              y={y - 4}
              height={22}
              rx={6}
              initial={{ width: 0 }}
              animate={{ width: fw }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: beat === 0 ? 0 : 0.6 + order * 0.45 }}
              style={{ fill: i === 3 ? "var(--prac)" : "var(--asset)", opacity: 0.85 }}
            />
            <text x={BX + w + 6} y={y + 12} className="sc-tick" style={{ fill: beat >= 1 && !full ? "var(--bad)" : undefined }}>
              {beat === 0 ? `owed $${t.cap}` : `$${f[i]} / ${t.cap}`}
            </text>
          </g>
        );
      })}
      {/* when everyone pays, cash reaches each tranche in turn */}
      {TR.map((t, i) => (
        <Token key={`p${t.name}`} from={[pool.x + 50, pool.y]} to={[BX + 18, 59 + i * 52]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="$" tone="cash" absorb delay={0.15 + i * 0.45} duration={0.5} />
      ))}
      <Txt x={300} y={252} size={12} weight={800} tone="bad" show={beat >= 3} delay={1.6} className="halo">
        Z gets nothing: toxic waste
      </Txt>
      <Txt x={300} y={252} size={10.5} weight={600} tone="neutral" show={beat < 3}>
        illustrative amounts
      </Txt>
    </Stage>
  );
}

