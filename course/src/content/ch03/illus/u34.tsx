// "See it" scenes for 3.4 Where Are the Trading Markets?
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Banknote, Building2, Check, CreditCard, FileText, Landmark, Layers, Monitor, Network as Hub, ShieldCheck, Store, UserRound } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Stage, Token, Txt, between } from "../../../scene/index.tsx";
import { spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 112, h = 56): Box => ({ x, y, w, h });
const edge = (a: Box, b: Box, offset = 0) => {
  const [from, to] = between(a, b, offset, 5);
  return { from, to };
};

// ── Table 3-4: share of U.S. capital wealth ─────────────────────────────────
const WEALTH = [
  { name: "Common stocks", v: 20, beat: 0, tone: "def" },
  { name: "Real estate", v: 50, beat: 1, tone: "see" },
  { name: "Corporate bonds", v: 15, beat: 2, tone: "idea" },
  { name: "Municipal bonds", v: 10, beat: 2, tone: "idea" },
  { name: "Government bonds", v: 10, beat: 2, tone: "idea" },
  { name: "Derivatives", v: 0, beat: 3, tone: "prac" },
  { name: "Currencies", v: 0.6, beat: 3, tone: "prac", label: "<1%" },
  { name: "Spot commodities", v: 0.6, beat: 3, tone: "prac", label: "<1%" },
] as const;

export function WealthBars({ beat }: BeatProps) {
  const X = 168;
  const scale = 3.7; // units per percentage point
  return (
    <Stage h={246} label="Share of U.S. capital wealth by instrument class, Table 3-4">
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        SHARE OF U.S. CAPITAL WEALTH
      </Txt>
      {WEALTH.map((r, i) => {
        const y = 48 + i * 25;
        const on = beat >= r.beat;
        const now = beat === r.beat;
        return (
          <g key={r.name}>
            <motion.text
              x={X - 10}
              y={y + 5}
              textAnchor="end"
              className="sc-txt"
              style={{ fontSize: 13.5, fontWeight: now ? 800 : 650, fill: "var(--ink)" }}
              animate={{ opacity: now ? 1 : on ? 0.75 : 0.35 }}
            >
              {r.name}
            </motion.text>
            <rect x={X} y={y - 7} width={50 * scale} height={14} rx={7} fill="var(--scene-grid)" opacity={0.6} />
            <motion.rect
              x={X}
              y={y - 7}
              height={14}
              rx={7}
              style={{ fill: `var(--${r.tone})` }}
              initial={{ width: 0 }}
              animate={{ width: on ? Math.max(r.v * scale, r.v ? 3 : 0) : 0, opacity: now || beat === 3 ? 1 : 0.55 }}
              transition={{ ...spring.fill, delay: now ? 0.1 + (i % 3) * 0.12 : 0 }}
            />
            <motion.text
              x={X + Math.max(r.v * scale, 3) + 8}
              y={y + 5}
              className="sc-txt"
              style={{ fontSize: 13.5, fontWeight: 800, fill: "var(--ink)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: on ? 1 : 0 }}
              transition={{ duration: 0.3, delay: on && now ? 0.45 : 0 }}
            >
              {"label" in r ? r.label : `${r.v}%`}
            </motion.text>
          </g>
        );
      })}
      <Txt x={X + 20 * 3.7 + 46} y={53} anchor="start" size={11.5} weight={750} tone="def" show={beat === 0} delay={0.7}>
        ← in the news
      </Txt>
      <motion.text
        x={X + 50 * scale - 10}
        y={77}
        textAnchor="end"
        className="sc-txt"
        style={{ fontSize: 11, fontWeight: 800, fill: "#fff" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: beat === 1 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: beat === 1 ? 0.8 : 0 }}
      >
        rarely trades
      </motion.text>
      <Txt x={X + 40} y={178} anchor="start" size={11.5} weight={750} tone="prac" show={beat === 3} delay={0.6}>
        zero net supply
      </Txt>
    </Stage>
  );
}

// ── Table 3-4: how many instruments actually trade ──────────────────────────
const CLASSES = [
  { name: "Common stocks", total: "15,000", active: "1,000", lit: 7, freq: "High" },
  { name: "Corporate bonds", total: "100,000", active: "50", lit: 0, freq: "Low" },
  { name: "Municipal bonds", total: "1,000,000", active: "0", lit: 0, freq: "Low" },
  { name: "Government bonds", total: "50", active: "3", lit: 6, freq: "Moderate" },
  { name: "Futures contracts", total: "100", active: "20", lit: 20, freq: "High" },
];

export function InstrumentDots({ beat }: BeatProps) {
  const c = CLASSES[Math.min(beat, CLASSES.length - 1)];
  const order = Array.from({ length: 100 }, (_, i) => i);
  return (
    <Stage h={236} label="Of all instruments in a class, how many trade actively (Table 3-4)">
      {order.map((i) => {
        const cx = 34 + (i % 10) * 16;
        const cy = 52 + Math.floor(i / 10) * 16;
        const lit = i < c.lit;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={5.2} fill="var(--line)" />
            <motion.circle
              cx={cx}
              cy={cy}
              r={5.2}
              style={{ fill: "var(--see)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: lit ? 1 : 0 }}
              transition={{ duration: 0.2, delay: lit ? 0.25 + i * 0.03 : 0 }}
            />
          </g>
        );
      })}
      <Txt x={26} y={26} anchor="start" size={11} weight={800} tone="neutral" className="caps">
        100 DOTS = ALL ISSUES
      </Txt>
      {CLASSES.map((k, i) => (
        <g key={k.name}>
          <Txt x={204} y={66} anchor="start" size={18} weight={800} show={beat === i}>
            {k.name}
          </Txt>
          <Txt x={204} y={96} anchor="start" size={14} weight={650} tone="neutral" show={beat === i}>
            {`${k.total} instruments`}
          </Txt>
          <Txt x={204} y={122} anchor="start" size={14} weight={800} tone="see" show={beat === i} delay={0.3}>
            {`${k.active} actively traded`}
          </Txt>
          <Txt x={204} y={148} anchor="start" size={13.5} weight={650} tone="neutral" show={beat === i}>
            {`Trade frequency: ${k.freq}`}
          </Txt>
        </g>
      ))}
      <Txt x={208} y={190} anchor="start" size={12} weight={750} tone="see" show={beat === 3} delay={0.5}>
        Few issues, each huge:
      </Txt>
      <Txt x={208} y={207} anchor="start" size={12} weight={750} tone="see" show={beat === 3} delay={0.5}>
        extremely liquid
      </Txt>
      <Txt x={208} y={190} anchor="start" size={12} weight={750} tone="neutral" show={beat === 1 || beat === 2} delay={0.5}>
        Almost none of the dots
      </Txt>
      <Txt x={208} y={207} anchor="start" size={12} weight={750} tone="neutral" show={beat === 1 || beat === 2} delay={0.5}>
        light up
      </Txt>
    </Stage>
  );
}

// ── Listing: an application passes the NYSE's quantitative standards ───────
const GATES = [
  { label: "Shareholders", sub: "2,000+ holders" },
  { label: "Market value", sub: "$100 million+" },
  { label: "Earnings", sub: "$2.5M+ pretax" },
];

export function ListingGate({ beat }: BeatProps) {
  const co = box(58, 122, 100, 58);
  const gates = GATES.map((_, i) => box(214, 48 + i * 74, 150, 52));
  const ex = box(352, 122, 80, 58);
  const listed = beat >= 4;
  return (
    <Stage h={254} label="A company must pass every listing standard before the exchange lists it">
      <Node {...co} icon={Building2} label="Company" sub={listed ? "listed!" : "applies"} hl={beat === 0 || listed} tone="see" />
      {gates.map((g, i) => (
        <g key={i}>
          <Edge {...edge(co, g)} tone={beat > i ? "good" : "neutral"} arrow={false} />
          <Edge {...edge(g, ex)} tone={beat > i ? "good" : "neutral"} arrow={false} />
          <Node {...g} icon={beat > i ? Check : ShieldCheck} label={GATES[i].label} sub={GATES[i].sub} hl={beat > i} tone="good" dim={beat === 0 ? false : beat <= i ? true : false} />
          <Token
            from={[co.x, co.y]}
            to={[g.x, g.y]}
            bend={i === 1 ? 0 : i === 0 ? 14 : -14}
            at={beat >= i + 1 ? 1 : 0}
            show={beat >= i + 1}
            label="file"
            icon={FileText}
            tone="prac"
            absorb
          />
        </g>
      ))}
      <Node {...ex} icon={Landmark} label="NYSE" sub={listed ? "lists it" : "exchange"} hl={listed} tone="good" dim={beat > 0 && !listed} />
      <Token from={[co.x, 238]} to={[ex.x, 238]} bend={-8} at={listed ? 1 : 0} show={listed} label="listing fee" icon={Banknote} tone="cash" absorb />
    </Stage>
  );
}

// ── Where one listed stock trades in the U.S. ───────────────────────────────
const VENUES = [
  { x: 98, y: 44, label: "Primary listing", sub: "NYSE · AMEX · Nasdaq", icon: Landmark },
  { x: 302, y: 44, label: "Regional", sub: "Chicago · Boston …", icon: Building2 },
  { x: 98, y: 214, label: "Third market", sub: "dealers off-exchange", icon: Store },
  { x: 302, y: 214, label: "Fourth market", sub: "inside ATSs / ECNs", icon: Monitor },
] as const;

export function EquityMap({ beat }: BeatProps) {
  const stock = box(200, 129, 132, 56);
  return (
    <Stage h={258} label="The venues where an exchange-listed U.S. stock can trade">
      {VENUES.map((v, i) => {
        const b = box(v.x, v.y, 150, 54);
        return (
          <g key={v.label}>
            <Edge {...edge(stock, b)} show={beat >= i} tone={beat === i ? "see" : "neutral"} />
            <Node {...b} icon={v.icon} label={v.label} sub={v.sub} show={beat >= i} hl={beat === i} tone="see" />
          </g>
        );
      })}
      <Node {...stock} icon={Layers} label="Listed stock" sub="e.g. listed at the NYSE" tone="def" hl />
      <Txt x={302} y={88} size={11} weight={750} tone="see" show={beat === 1} delay={0.5} className="halo">
        + Nasdaq stocks via unlisted
      </Txt>
      <Txt x={302} y={101} size={11} weight={750} tone="see" show={beat === 1} delay={0.5} className="halo">
        trading privileges
      </Txt>
    </Stage>
  );
}

// ── Double- and triple-counting volume ──────────────────────────────────────
function useSteps(beat: number, seqs: number[][], gapMs: number) {
  // shows each beat's values one after another, timed to the tokens
  const reduce = useReducedMotion();
  const seq = seqs[Math.min(beat, seqs.length - 1)];
  const [i, setI] = useState(seq.length - 1);
  useEffect(() => {
    if (reduce) {
      setI(seq.length - 1);
      return;
    }
    setI(0);
    const ids = seq.slice(1).map((_, k) => setTimeout(() => setI(k + 1), (k + 1) * gapMs));
    return () => ids.forEach(clearTimeout);
  }, [beat, reduce, seq, gapMs]);
  return seq[Math.min(i, seq.length - 1)];
}

const VOL_SEQ = [[0, 100], [0, 100, 200], [0, 100, 200, 300], [300]];
const LEG = 950;

export function VolumeCount({ beat }: BeatProps) {
  const seller = box(58, 178, 100, 56);
  const buyer = box(342, 178, 100, 56);
  const d1 = box(200, 74, 104, 54);
  const dA = box(128, 74, 104, 54);
  const dB = box(272, 74, 104, 54);
  const vol = useSteps(beat, VOL_SEQ, LEG);
  const one = beat === 1;
  const two = beat >= 2;
  const sh = (b: Box) => [b.x, b.y] as [number, number];
  const LANE = seller.y - seller.h / 2 - 18;
  return (
    <Stage h={246} label="The same public trade reported as 100, 200 or 300 shares of volume">
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" show={beat === 0} className="caps">
        NYSE · PUBLIC MEETS PUBLIC
      </Txt>
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" show={one} className="caps">
        NASDAQ · ONE DEALER
      </Txt>
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" show={beat === 2} className="caps">
        NASDAQ · TWO DEALERS
      </Txt>
      <Txt x={16} y={24} anchor="start" size={11} weight={800} tone="neutral" show={beat === 3} className="caps">
        SAME PUBLIC TRADE, THREE COUNTS
      </Txt>
      <Txt x={300} y={26} anchor="end" size={11} weight={750} tone="neutral" show={beat < 3}>
        reported volume
      </Txt>
      {[0, 100, 200, 300].map((v) => (
        <Txt key={v} x={384} y={27} anchor="end" size={20} weight={800} tone="prac" show={beat < 3 && vol === v}>
          {String(v)}
        </Txt>
      ))}
      <Node {...seller} icon={UserRound} label="Seller" sub="public trader" />
      <Node {...buyer} icon={UserRound} label="Buyer" sub="public trader" />
      <Node {...d1} icon={Store} label="Dealer" sub="Nasdaq" show={one} hl={one} tone="prac" />
      <Node {...dA} icon={Store} label="Dealer A" show={two && beat < 3} hl tone="prac" />
      <Node {...dB} icon={Store} label="Dealer B" show={two && beat < 3} hl tone="prac" />
      <Edge {...edge(seller, buyer)} show={beat === 0} tone="prac" />
      <Token from={[seller.x, LANE]} to={[buyer.x, LANE]} bend={12} at={beat === 0 ? 1 : 0} show={beat === 0} label="100 sh" icon={Layers} tone="asset" absorb duration={0.85} />
      <Edge {...edge(seller, d1)} show={one} tone="prac" />
      <Edge {...edge(d1, buyer)} show={one} tone="prac" />
      <Token from={sh(seller)} to={sh(d1)} at={one ? 1 : 0} show={one} label="100 sh" icon={Layers} tone="asset" absorb />
      <Token from={sh(d1)} to={sh(buyer)} at={one ? 1 : 0} show={one} label="100 sh" icon={Layers} tone="asset" absorb delay={LEG / 1000} />
      <Edge {...edge(seller, dA)} show={beat === 2} tone="prac" />
      <Edge {...edge(dA, dB)} show={beat === 2} tone="prac" />
      <Edge {...edge(dB, buyer)} show={beat === 2} tone="prac" />
      <Token from={sh(seller)} to={sh(dA)} at={two ? 1 : 0} show={beat === 2} label="100 sh" icon={Layers} tone="asset" absorb />
      <Token from={[dA.x, dA.y + 48]} to={[dB.x, dB.y + 48]} at={two ? 1 : 0} show={beat === 2} label="100 sh" icon={Layers} tone="asset" absorb delay={LEG / 1000} />
      <Token from={sh(dB)} to={sh(buyer)} at={two ? 1 : 0} show={beat === 2} label="100 sh" icon={Layers} tone="asset" absorb delay={(2 * LEG) / 1000} />
      {[
        ["NYSE", "100"],
        ["one dealer", "200"],
        ["two dealers", "300"],
      ].map(([k, v], i) => (
        <g key={k}>
          <Txt x={92 + i * 108} y={84} size={12} weight={700} tone="neutral" show={beat === 3} delay={0.15 * i}>
            {k}
          </Txt>
          <Txt x={92 + i * 108} y={114} size={24} weight={800} tone="prac" show={beat === 3} delay={0.15 * i}>
            {v}
          </Txt>
        </g>
      ))}
    </Stage>
  );
}

// ── Regional exchange trivia: exchanges consolidate ─────────────────────────
const MIDWEST = ["Chicago", "St. Louis", "Cleveland", "Minneapolis/St. Paul"];
const PACIFIC = ["San Francisco", "Los Angeles"];

export function Consolidation({ beat }: BeatProps) {
  const mw = box(300, 88, 160, 58);
  const pc = box(300, 206, 160, 58);
  const member = (y: number) => box(84, y, 152, 30);
  return (
    <Stage h={252} label="Regional exchanges merging into the Midwest and Pacific exchanges">
      {MIDWEST.map((name, i) => {
        const m = member(34 + i * 36);
        return (
          <g key={name}>
            <Edge {...edge(m, mw)} show={beat >= 1} tone={beat === 1 ? "see" : "neutral"} arrow={i === 1} />
            <Node {...m} label={name} tone="see" dim={beat >= 3} hl={beat === 0} />
          </g>
        );
      })}
      <Node {...mw} icon={Hub} label="Midwest SE" sub="merged in 1949" show={beat === 1} hl tone="see" />
      <Node {...mw} icon={Building2} label="Chicago SE (CHX)" sub="renamed 1993 · symbol M" show={beat >= 2} hl={beat === 2} dim={beat >= 3} tone="see" />
      {PACIFIC.map((name, i) => {
        const m = member(190 + i * 36);
        return (
          <g key={name}>
            <Edge {...edge(m, pc)} show={beat >= 4} tone={beat === 4 ? "see" : "neutral"} />
            <Node {...m} label={name} tone="see" show={beat >= 3} hl={beat === 3} />
          </g>
        );
      })}
      <Node {...pc} icon={Hub} label="Pacific Exchange" sub="merged in 1957" show={beat === 4} hl tone="see" />
      <Node {...pc} icon={Monitor} label="Archipelago Exch." sub="2002 · fully electronic" show={beat >= 5} hl tone="see" />
    </Stage>
  );
}

// ── One clearinghouse (OCC) for every U.S. options exchange ─────────────────
export function OccFungible({ beat }: BeatProps) {
  const trader = box(60, 122, 104, 62);
  const cboe = box(206, 48, 112, 54);
  const ise = box(206, 196, 112, 54);
  const occ = box(346, 122, 92, 62);
  const pt = (b: Box) => [b.x, b.y] as [number, number];
  const pos = beat === 0 ? "long 1 call" : "flat: offset";
  return (
    <Stage h={248} label="Buy an option at one exchange and sell it at another: the OCC clears both">
      <Edge {...edge(trader, cboe)} show tone={beat === 0 ? "prac" : "neutral"} />
      <Edge {...edge(cboe, occ)} show tone={beat === 0 ? "prac" : "neutral"} />
      <Edge {...edge(trader, ise)} show tone={beat === 1 ? "prac" : "neutral"} />
      <Edge {...edge(ise, occ)} show tone={beat === 1 ? "prac" : "neutral"} />
      <Node {...trader} icon={UserRound} label="Trader" sub={pos} hl={beat < 2} tone="prac" />
      <Node {...cboe} icon={Building2} label="CBOE" sub="buy here" dim={beat === 1} />
      <Node {...ise} icon={Monitor} label="ISE" sub="sell here" dim={beat === 0} />
      <Node {...occ} icon={ShieldCheck} label="OCC" sub="clears all" hl={beat === 2} tone="def" />
      <Token from={pt(trader)} to={pt(cboe)} at={1} show={beat === 0} label="buy 1 call" icon={FileText} tone="prac" absorb />
      <Token from={pt(cboe)} to={pt(occ)} at={1} show={beat === 0} label="clears" tone="def" absorb delay={1} />
      <Token from={pt(trader)} to={pt(ise)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="sell 1 call" icon={FileText} tone="prac" absorb />
      <Token from={pt(ise)} to={pt(occ)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="clears" tone="def" absorb delay={1} />
      <Txt x={340} y={176} size={11.5} weight={750} tone="def" show={beat === 2} delay={0.3} className="halo">
        issuer & guarantor
      </Txt>
      <Txt x={340} y={190} size={11.5} weight={750} tone="def" show={beat === 2} delay={0.3} className="halo">
        of every contract
      </Txt>
    </Stage>
  );
}

// ── Futures: front month, back contracts, rolling ───────────────────────────
const MONTHS = ["MAR", "JUN", "SEP", "DEC"];

export function FrontRoll({ beat }: BeatProps) {
  const xs = [62, 154, 246, 338];
  const y = 126;
  const front = beat >= 2 ? 1 : 0;
  const lane = 52;
  return (
    <Stage h={200} label="The front month contract, back contracts, and rolling a position">
      {MONTHS.map((m, i) => {
        const expired = beat >= 2 && i === 0;
        const harvest = beat === 3 && i === 2;
        return (
          <g key={m}>
            <Node
              x={xs[i]}
              y={y}
              w={84}
              h={56}
              label={m}
              sub={expired ? "expired" : harvest ? "first harvest" : i === front ? "front" : "back"}
              hl={i === front || harvest}
              tone={harvest ? "good" : "see"}
              dim={expired}
            />
          </g>
        );
      })}
      <motion.g initial={false} animate={{ x: xs[front] }} transition={spring.soft}>
        <rect x={-30} y={y - 52} width={60} height={20} rx={10} fill="var(--see)" />
        <text x={0} y={y - 38} textAnchor="middle" className="sc-txt" style={{ fontSize: 11, fontWeight: 800, fill: "#fff", letterSpacing: "0.08em" }}>
          FRONT
        </text>
      </motion.g>
      <Token from={[xs[0], lane]} to={[xs[1], lane]} bend={14} at={beat >= 2 ? 1 : 0} show={beat >= 1} label="long 10" icon={Layers} tone="asset" />
      <Txt x={xs[0] + 46} y={30} anchor="start" size={11.5} weight={750} tone="see" show={beat === 2} delay={1} className="halo">
        rolled into the next contract
      </Txt>
      <Txt x={200} y={186} size={11.5} weight={700} tone="neutral" show={beat === 3}>
        crop example, illustrative months
      </Txt>
    </Stage>
  );
}

// ── The Fed's Open Market Desk buys from the best-priced primary dealer ─────
const OFFERS = ["99.10", "99.06", "99.12"];

export function FedDesk({ beat }: BeatProps) {
  const fed = box(76, 124, 116, 62);
  const dealers = [0, 1, 2].map((i) => box(318, 46 + i * 78, 136, 54));
  const best = 1;
  const pt = (b: Box) => [b.x, b.y] as [number, number];
  return (
    <Stage h={250} label="The Fed requests offers from primary dealers and buys from the best price">
      <Txt x={16} y={242} anchor="start" size={10.5} weight={600} tone="neutral">
        illustrative prices
      </Txt>
      <Node {...fed} icon={Landmark} label="Fed desk" sub="adds reserves" hl={beat === 0 || beat === 3} tone="def" />
      <Txt x={76} y={178} size={11.5} weight={750} tone="def" show={beat === 0} delay={0.3}>
        wants to buy Treasuries
      </Txt>
      {dealers.map((d, i) => (
        <g key={i}>
          <Edge {...edge(fed, d)} show={beat >= 1} tone={beat === 3 && i === best ? "good" : "neutral"} arrow={false} />
          <Node
            {...d}
            icon={Store}
            label={`Dealer ${"ABC"[i]}`}
            sub={beat >= 2 ? `offers ${OFFERS[i]}` : "primary dealer"}
            hl={beat === 3 && i === best}
            tone="good"
            dim={beat === 3 && i !== best}
          />
          <Token from={pt(fed)} to={pt(d)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="offer?" tone="def" absorb />
          <Token from={pt(d)} to={pt(fed)} at={beat >= 2 ? 1 : 0} show={beat === 2} label={OFFERS[i]} tone="prac" absorb delay={0.1 * i} />
        </g>
      ))}
      <Token from={[dealers[best].x - 40, dealers[best].y - 14]} to={[fed.x + 30, fed.y - 14]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="bills" icon={FileText} tone="asset" absorb />
      <Token from={[fed.x + 30, fed.y + 14]} to={[dealers[best].x - 40, dealers[best].y + 14]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="new money" icon={Banknote} tone="cash" absorb />
      <Txt x={76} y={178} size={11.5} weight={750} tone="good" show={beat === 3} delay={1.1}>
        pays with new money
      </Txt>
    </Stage>
  );
}

// ── Retail currency: airport booth vs ATM ───────────────────────────────────
export function RetailFx({ beat }: BeatProps) {
  const trav = box(62, 124, 104, 62);
  const booth = box(226, 52, 134, 56);
  const atm = box(226, 196, 134, 56);
  const pt = (b: Box) => [b.x, b.y] as [number, number];
  const atmPhase = beat >= 2;
  return (
    <Stage h={250} label="Changing money at an airport booth versus withdrawing from an ATM">
      <Txt x={384} y={242} anchor="end" size={10.5} weight={600} tone="neutral">
        illustrative amounts
      </Txt>
      <Edge {...edge(trav, booth)} show tone={!atmPhase ? "bad" : "neutral"} arrow={false} />
      <Edge {...edge(trav, atm)} show={atmPhase} tone="good" arrow={false} />
      <Node {...trav} icon={UserRound} label="Traveler" sub="changes $100" hl tone="def" />
      <Node {...booth} icon={Store} label="Airport booth" sub="fee + wide spread" hl={!atmPhase} dim={atmPhase} tone="bad" />
      <Node {...atm} icon={CreditCard} label="ATM" sub="small access fee" show={atmPhase} hl={atmPhase} tone="good" />
      <Txt x={226} y={98} size={11} weight={700} tone="bad" show={beat === 0} delay={0.9} className="halo">
        rent · security · idle clerks
      </Txt>
      <Token from={pt(trav)} to={pt(booth)} at={1} show={beat === 0} label="$100" tone="cash" absorb />
      <Token from={pt(booth)} to={pt(trav)} at={beat >= 1 ? 1 : 0} show={beat === 1} label="€82" tone="asset" absorb />
      <Txt x={350} y={58} size={20} weight={800} tone="bad" show={beat >= 1} delay={beat === 1 ? 1 : 0}>
        €82
      </Txt>
      <Txt x={226} y={152} size={11} weight={700} tone="good" show={beat === 2} delay={0.9} className="halo">
        your bank pools many trades
      </Txt>
      <Token from={pt(trav)} to={pt(atm)} at={atmPhase ? 1 : 0} show={beat === 2} label="$100" tone="cash" absorb />
      <Token from={pt(atm)} to={pt(trav)} at={beat >= 3 ? 1 : 0} show={beat === 3} label="€91" tone="asset" absorb />
      <Txt x={350} y={202} size={20} weight={800} tone="good" show={beat >= 3} delay={beat === 3 ? 1 : 0}>
        €91
      </Txt>
    </Stage>
  );
}
