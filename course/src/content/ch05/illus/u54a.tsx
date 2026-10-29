// "See it" scenes for 5.4 Market Information Systems: collection (5.4.1), distribution (5.4.2), ticker symbols (5.4.3).
import { motion } from "motion/react";
import {
  Cpu,
  Database,
  Eye,
  Hand,
  Handshake,
  Landmark,
  Layers,
  Monitor,
  Radio,
  Scale,
  Smartphone,
  Store,
  UserRound,
  Users,
} from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

const B = (x: number, y: number, w = 112, h = 56): Box => ({ x, y, w, h });

// ── Where a market's information goes (p. 97) ───────────────────────────────
export function InfoFlow({ beat }: BeatProps) {
  const mkt = B(104, 116, 132, 70);
  const tr = B(322, 44, 118, 54);
  const ve = B(322, 118, 118, 54);
  const re = B(322, 192, 118, 54);
  const toTr = between(mkt, tr, 0, 6, 8);
  const toVe = between(mkt, ve, -9, 6, 8);
  const fromVe = between(ve, mkt, -9, 8, 6);
  const toRe = between(mkt, re, 0, 6, 8);
  return (
    <Stage h={250} label="A market collects information, shows some to traders, sells some to vendors and keeps most for regulators">
      <Node {...mkt} icon={Landmark} label="Market" sub="trading system" hl={beat === 0 || beat === 4} tone="see" />
      <Ping x={mkt.x} y={mkt.y} trigger={beat === 0 ? "made" : "none"} r={44} />
      <Txt x={mkt.x} y={178} size={12.5} weight={700} tone="neutral" show={beat < 4}>
        orders · quotes · trades
      </Txt>

      <Node {...tr} icon={Users} label="Traders" sub="see some" dim={beat !== 1 && beat !== 4} hl={beat === 1} tone="see" />
      <Node {...ve} icon={Radio} label="Data vendors" sub="buy some" dim={beat !== 2 && beat !== 4} hl={beat === 2} tone="see" />
      <Node {...re} icon={Scale} label="Regulators" sub="get most" dim={beat !== 3 && beat !== 4} hl={beat === 3} tone="see" />

      <Edge from={toTr[0]} to={toTr[1]} show={beat >= 1} tone={beat === 1 ? "see" : "neutral"} />
      <Edge from={toVe[0]} to={toVe[1]} show={beat >= 2} tone={beat === 2 ? "see" : "neutral"} />
      <Edge from={fromVe[0]} to={fromVe[1]} show={beat >= 2} tone={beat === 2 ? "cash" : "neutral"} dashed />
      <Edge from={toRe[0]} to={toRe[1]} show={beat >= 3} tone={beat === 3 ? "see" : "neutral"} width={beat >= 3 ? 3.5 : 2} />

      <Token from={toTr[0]} to={toTr[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="quotes" tone="see" absorb />
      <Token from={toVe[0]} to={toVe[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="data" tone="see" absorb />
      <Token from={fromVe[0]} to={fromVe[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="$" tone="cash" delay={0.9} absorb />
      <Token from={toRe[0]} to={toRe[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="records" tone="neutral" absorb />

      {/* data sales: more than 20% of revenues at many major exchanges */}
      <motion.g initial={false} animate={{ opacity: beat === 4 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <text x={38} y={176} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
          EXCHANGE REVENUE
        </text>
        <rect x={38} y={186} width={132} height={16} rx={5} fill="var(--surface-2)" stroke="var(--node-line)" strokeWidth={1} />
        <motion.rect
          x={38}
          y={186}
          height={16}
          rx={5}
          fill={toneVar("cash")}
          initial={false}
          animate={{ width: beat === 4 ? 32 : 0 }}
          transition={{ ...spring.fill, delay: beat === 4 ? 0.2 : 0 }}
        />
        <text x={38} y={222} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 750 }} fill="var(--ink)">
          data sales: over 20%
        </text>
      </motion.g>
    </Stage>
  );
}

// ── Market reporters around a futures pit (p. 97) ───────────────────────────
const PIT = { x: 140, y: 196, rx: 118, ry: 50 };
const TRADERS: [number, number][] = [
  [70, 196],
  [100, 178],
  [104, 218],
  [140, 190],
  [170, 216],
  [178, 174],
];

export function PitReporters({ beat }: BeatProps) {
  const pod = B(140, 50, 132, 56);
  const data = B(330, 50, 112, 56);
  const crowd = B(212, 190, 30, 30);
  const podData = between(pod, data, 0, 6, 8);
  const crowdPod = between(crowd, pod, 0, 6, 6);
  const crowdData = between(crowd, data, 0, 6, 8);
  return (
    <Stage h={256} label="Market reporters watch a futures pit and enter trade prices into a data system">
      <ellipse cx={PIT.x} cy={PIT.y} rx={PIT.rx} ry={PIT.ry} fill={toneSoft("neutral")} stroke="var(--node-line)" strokeWidth={1.5} />
      <text x={PIT.x} y={PIT.y + PIT.ry - 8} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
        PIT
      </text>
      {TRADERS.map(([x, y], i) => {
        const trading = beat === 1 && (i === 3 || i === 4);
        return (
          <g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r={11}
              initial={false}
              animate={{ strokeWidth: trading || beat === 4 ? 2.2 : 1.25 }}
              fill="var(--node)"
              stroke={trading || beat === 4 ? toneVar("see") : "var(--node-line)"}
            />
            <g transform={`translate(${x - 7}, ${y - 7})`} style={{ color: "var(--ink-3)" }}>
              <UserRound width={14} height={14} strokeWidth={2.2} />
            </g>
          </g>
        );
      })}
      <Ping x={155} y={203} trigger={beat === 1 ? "trade" : "none"} r={30} />
      <Txt x={155} y={134} size={12.5} weight={800} tone="see" show={beat === 1} className="halo">
        trade at 42.10
      </Txt>
      <Txt x={150} y={128} size={12.5} weight={750} tone="see" show={beat === 4} className="halo">
        traders keep the reporters informed
      </Txt>

      {/* sight lines from the podium */}
      <Edge from={[112, 84]} to={[70, 156]} show={beat === 0} dashed arrow={false} tone="see" />
      <Edge from={[168, 84]} to={[210, 156]} show={beat === 0} dashed arrow={false} tone="see" />

      <Node {...pod} icon={Eye} label="Podium" sub="market reporter" hl={beat === 0 || beat === 1} dim={beat === 3} tone="see" />
      <Node {...data} icon={Cpu} label="Data system" sub="trade prices" dim={beat === 0 || beat === 2 || beat === 4} hl={beat === 1 || beat === 3} tone="see" />

      {/* the reporter standing in the crowd */}
      <motion.g initial={false} animate={{ opacity: beat >= 2 ? 1 : 0.35 }} transition={{ duration: 0.3 }}>
        <circle cx={crowd.x} cy={crowd.y} r={14} fill={toneSoft("see")} stroke={toneVar("see")} strokeWidth={2} />
        <g transform={`translate(${crowd.x - 8}, ${crowd.y - 8})`} style={{ color: toneVar("see") }}>
          <Eye width={16} height={16} strokeWidth={2.2} />
        </g>
        <text x={crowd.x} y={crowd.y + 31} textAnchor="middle" className="sc-sub">
          reporter
        </text>
      </motion.g>

      <Edge from={podData[0]} to={podData[1]} show={beat === 1} tone="see" />
      <Edge from={crowdPod[0]} to={crowdPod[1]} show={beat === 2} tone="see" dashed />
      <Edge from={crowdData[0]} to={crowdData[1]} show={beat === 3} tone="see" />
      <Token from={podData[0]} to={podData[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="42.10" tone="see" delay={0.4} absorb />
      <Token from={crowdPod[0]} to={crowdPod[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="42.10" icon={Hand} tone="see" absorb />
      <Token from={crowdData[0]} to={crowdData[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="42.10" icon={Smartphone} tone="see" absorb />
    </Stage>
  );
}

// ── Who collects information in an OTC dealer market (p. 97) ────────────────
export function OtcCollect({ beat }: BeatProps) {
  const ds = [B(62, 46, 104, 50), B(62, 126, 104, 50), B(62, 206, 104, 50)];
  const ven = B(330, 46, 112, 54);
  const idb = B(326, 186, 120, 56);
  const toVen = ds.map((d) => between(d, ven, -9, 6, 8));
  const fromVen = ds.map((d) => between(ven, d, -9, 8, 6));
  const toIdb = [between(ds[1], idb, 0, 6, 8), between(ds[2], idb, 0, 6, 8)];
  const vendorBeat = beat === 1 || beat === 2;
  const idbBeat = beat === 3;
  return (
    <Stage h={250} label="Data vendors and interdealer brokers collect information from dealers">
      {/* dealers phone each other: no formal organization */}
      <Edge from={[62, 72]} to={[62, 100]} show={beat === 0} dashed arrow={false} />
      <Edge from={[62, 152]} to={[62, 180]} show={beat === 0} dashed arrow={false} />
      {ds.map((d, i) => (
        <Node
          key={i}
          {...d}
          icon={Store}
          label={`Dealer ${"ABC"[i]}`}
          hl={beat === 0 || (beat === 1 && i === 0) || beat === 2 || (beat === 3 && i > 0)}
          dim={(beat === 1 && i > 0) || (beat === 3 && i === 0) || beat === 4}
          tone="see"
        />
      ))}
      <Node {...ven} icon={Radio} label="Data vendor" sub={beat === 2 ? "shares it back" : "buys data"} dim={!vendorBeat} hl={vendorBeat} tone="see" />
      <Node
        {...idb}
        icon={Handshake}
        label="Broker"
        sub={beat === 4 ? "dealers walk away" : "interdealer"}
        dim={beat !== 3}
        hl={idbBeat}
        tone="see"
      />

      {/* beat 1: a fee */}
      <Edge from={toVen[0][0]} to={toVen[0][1]} show={beat === 1 || beat === 2} tone="see" />
      <Token from={toVen[0][0]} to={toVen[0][1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="data" tone="see" absorb />
      <Token from={fromVen[0][0]} to={fromVen[0][1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="$ fee" tone="cash" delay={1.0} absorb />
      <Edge from={fromVen[0][0]} to={fromVen[0][1]} show={beat === 1 || beat === 2} tone={beat === 1 ? "cash" : "see"} dashed />
      {/* beat 2: data for data */}
      {[1, 2].map((i) => (
        <Edge key={i} from={toVen[i][0]} to={toVen[i][1]} show={beat === 2} tone="see" />
      ))}
      {[1, 2].map((i) => (
        <Edge key={`r${i}`} from={fromVen[i][0]} to={fromVen[i][1]} show={beat === 2} tone="see" dashed />
      ))}
      {ds.map((_, i) => (
        <Token key={`o${i}`} from={toVen[i][0]} to={toVen[i][1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="data" tone="see" absorb />
      ))}
      {ds.map((_, i) => (
        <Token key={`b${i}`} from={fromVen[i][0]} to={fromVen[i][1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="others'" tone="see" delay={1.2} absorb />
      ))}
      {/* beat 3: the interdealer broker sees both sides */}
      {toIdb.map((e, i) => (
        <Edge key={i} from={e[0]} to={e[1]} show={beat === 3} tone="see" />
      ))}
      <Token from={toIdb[0][0]} to={toIdb[0][1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="bid" tone="bid" absorb />
      <Token from={toIdb[1][0]} to={toIdb[1][1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="offer" tone="ask" absorb />
      <Ping x={idb.x} y={idb.y} trigger={beat === 3 ? "sees" : "none"} r={40} />
      <Txt x={idb.x} y={idb.y - 42} size={12.5} weight={800} tone="see" show={beat === 3} delay={0.9} className="halo">
        sees both sides
      </Txt>
    </Stage>
  );
}

// ── Real-time or delayed (p. 98) ────────────────────────────────────────────
function Screen({
  x,
  y,
  w,
  h,
  title,
  sub,
  values,
  hl,
  dim,
}: Box & { title: string; sub: { t: string; show: boolean }[]; values: { v: string; at: string; show: boolean }[]; hl?: boolean; dim?: boolean }) {
  const left = x - w / 2;
  const top = y - h / 2;
  return (
    <motion.g initial={false} animate={{ opacity: dim ? 0.35 : 1 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
      <rect x={left} y={top} width={w} height={h} rx={12} className="sc-node" style={{ fill: "var(--node)", stroke: hl ? toneVar("see") : "var(--node-line)", strokeWidth: hl ? 2 : 1.25 }} />
      <g transform={`translate(${left + 10}, ${top + 8})`} style={{ color: toneVar("see") }}>
        <Monitor width={16} height={16} strokeWidth={2.2} />
      </g>
      <text x={left + 32} y={top + 21} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("see")}>
        {title}
      </text>
      {sub.map((s) => (
        <motion.text key={s.t} x={left + 12} y={top + h - 10} className="sc-sub" initial={false} animate={{ opacity: s.show ? 1 : 0 }} transition={{ duration: 0.3 }}>
          {s.t}
        </motion.text>
      ))}
      {values.map((v) => (
        <motion.g key={v.v + v.at} initial={false} animate={{ opacity: v.show ? 1 : 0 }} transition={{ duration: 0.3, delay: v.show ? 0.6 : 0 }}>
          <text x={left + 12} y={top + 46} className="sc-num" style={{ fontSize: 20, fontWeight: 800 }} fill="var(--ink)">
            {v.v}
          </text>
          <text x={left + w - 12} y={top + 46} textAnchor="end" className="sc-sub">
            {v.at}
          </text>
        </motion.g>
      ))}
    </motion.g>
  );
}

export function DelayClock({ beat }: BeatProps) {
  const ex = B(70, 104, 112, 60);
  const rt = B(296, 62, 176, 80);
  const dl = B(296, 182, 176, 80);
  const toRt = between(ex, rt, -10, 6, 8);
  const feeBack = between(rt, ex, -10, 8, 6);
  const toDl = between(ex, dl, 0, 6, 8);
  const t = beat >= 2 ? "10:15" : "10:00";
  return (
    <Stage h={244} label="The same trade reaches a real-time screen at once and a delayed screen 15 minutes later">
      <Node {...ex} icon={Landmark} label="Exchange" sub="trade prints" hl={beat === 0} tone="see" />
      <Ping x={ex.x} y={ex.y} trigger={beat === 0 ? "t1" : beat === 2 ? "t2" : "none"} r={42} />
      {["10:00", "10:15"].map((s) => (
        <Txt key={s} x={ex.x} y={168} size={22} weight={800} show={t === s} tone="neutral">
          {s}
        </Txt>
      ))}

      <Screen
        {...rt}
        title="REAL-TIME"
        sub={[
          { t: "pays exchange fees", show: beat < 3 },
          { t: "needs it now: pays more", show: beat === 3 },
        ]}
        values={[
          { v: "—", at: "", show: beat === 0 },
          { v: "41.20", at: "10:00 trade", show: beat === 1 },
          { v: "41.45", at: "10:15 trade", show: beat >= 2 },
        ]}
        hl={beat === 1 || beat === 3}
        dim={beat === 0}
      />
      <Screen
        {...dl}
        title="15-MINUTE DELAY"
        sub={[
          { t: "no real-time fees", show: beat < 3 },
          { t: "can wait: pays less", show: beat === 3 },
        ]}
        values={[
          { v: "—", at: "", show: beat <= 1 },
          { v: "41.20", at: "10:00 trade", show: beat >= 2 },
        ]}
        hl={beat === 2 || beat === 3}
        dim={beat <= 1}
      />
      <Edge from={toRt[0]} to={toRt[1]} show={beat >= 1} tone={beat === 1 || beat === 2 ? "see" : "neutral"} />
      <Edge from={feeBack[0]} to={feeBack[1]} show={beat >= 1} tone={beat === 1 ? "cash" : "neutral"} dashed />
      <Edge from={toDl[0]} to={toDl[1]} show={beat >= 2} tone={beat === 2 ? "see" : "neutral"} />
      <Token from={toRt[0]} to={toRt[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="41.20" tone="see" absorb />
      <Token from={feeBack[0]} to={feeBack[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="$ fee" tone="cash" delay={0.8} absorb />
      <Token from={toRt[0]} to={toRt[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="41.45" tone="see" absorb />
      <Token from={toDl[0]} to={toDl[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="41.20" tone="see" absorb />
    </Stage>
  );
}

// ── The SIP consolidates U.S. equity trades and quotes (p. 98, box) ─────────
export function SipFlow({ beat }: BeatProps) {
  const src = [
    { b: B(58, 46, 100, 50), icon: Landmark, label: "NYSE", tok: "trades" },
    { b: B(58, 126, 100, 50), icon: Store, label: "Nasdaq", sub: "dealers", tok: "quotes" },
    { b: B(58, 206, 100, 50), icon: Cpu, label: "ECN", tok: "trades" },
  ];
  const sip = B(192, 126, 88, 62);
  const ven = B(330, 66, 116, 54);
  const pub = B(330, 196, 116, 54);
  const ins = src.map((s) => between(s.b, sip, 0, 6, 6));
  const out = between(sip, ven, 0, 6, 8);
  const down = between(ven, pub, 0, 6, 8);
  return (
    <Stage h={250} label="Markets send trades and quotes to a securities information processor, which feeds data vendors">
      {src.map((s, i) => (
        <Node key={i} {...s.b} icon={s.icon} label={s.label} sub={s.sub} hl={beat === 0} dim={beat >= 2} tone="see" />
      ))}
      {ins.map((e, i) => (
        <Edge key={i} from={e[0]} to={e[1]} show tone={beat === 0 ? "see" : "neutral"} />
      ))}
      {ins.map((e, i) => (
        <Token key={i} from={e[0]} to={e[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label={src[i].tok} tone="see" absorb />
      ))}
      <Node {...sip} icon={Layers} label="SIP" sub="consolidates" hl={beat === 1 || beat === 2} dim={beat === 3} tone="see" />
      <Ping x={sip.x} y={sip.y} trigger={beat === 1 ? "merge" : "none"} r={46} />
      <Node {...ven} icon={Radio} label="Data vendors" sub="repackage" dim={beat < 2} hl={beat === 2 || beat === 3} tone="see" />
      <Node {...pub} icon={Users} label="Public" sub="live or delayed" dim={beat < 3} hl={beat === 3} tone="see" />
      <Edge from={out[0]} to={out[1]} show={beat >= 2} tone={beat === 2 ? "see" : "neutral"} />
      <Edge from={down[0]} to={down[1]} show={beat >= 3} tone={beat === 3 ? "see" : "neutral"} />
      <Token from={out[0]} to={out[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="feed" tone="see" absorb />
      <Token from={down[0]} to={down[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="data" tone="see" absorb />
    </Stage>
  );
}

// ── Broadcast services and query services (p. 98) ───────────────────────────
export function BroadcastQuery({ beat }: BeatProps) {
  const mkt = B(64, 50, 112, 54);
  const ven = B(318, 50, 124, 56);
  const scr = B(64, 196, 112, 54);
  const you = B(318, 196, 124, 54);
  const feed = [between(mkt, ven, -15, 6, 8), between(mkt, ven, 15, 6, 8)];
  const bcast = [between(ven, scr, -15, 6, 8), between(ven, scr, 15, 6, 8)];
  const ask = between(you, ven, 30, 6, 6);
  const reply = between(ven, you, 30, 6, 6);
  return (
    <Stage h={250} label="A broadcast feed streams trades and quotes; a query service answers a question on demand">
      <Node {...mkt} icon={Landmark} label="Market" sub="feeds" hl={beat === 0} dim={beat > 0} tone="see" />
      <Node {...ven} icon={Database} label="Data server" sub={beat === 0 ? "vendor" : "archives feeds"} hl={beat > 0} tone="see" />
      <Node {...scr} icon={Monitor} label="Subscriber" sub="streaming page" hl={beat === 0} dim={beat > 0} tone="see" />
      <Node {...you} icon={UserRound} label="You" sub="ask a question" dim={beat === 0} hl={beat > 0} tone="see" />

      {feed.map((e, i) => (
        <Edge key={`f${i}`} from={e[0]} to={e[1]} show tone={beat === 0 ? "see" : "neutral"} />
      ))}
      {bcast.map((e, i) => (
        <Edge key={`b${i}`} from={e[0]} to={e[1]} show={beat === 0} tone="see" />
      ))}
      {["trade", "quote"].map((l, i) => (
        <Token key={`tf${l}`} from={feed[i][0]} to={feed[i][1]} at={beat === 0 ? 1 : 0} show={beat === 0} label={l} tone={i ? "bid" : "see"} absorb />
      ))}
      {["trade", "quote"].map((l, i) => (
        <Token key={`tb${l}`} from={bcast[i][0]} to={bcast[i][1]} at={beat === 0 ? 1 : 0} show={beat === 0} label={l} tone={i ? "bid" : "see"} delay={1.1} absorb />
      ))}
      <Txt x={318} y={128} size={12.5} weight={800} tone="see" show={beat === 0} className="halo">
        broadcast: a stream
      </Txt>

      <Edge from={ask[0]} to={ask[1]} show={beat === 1 || beat === 2} tone={beat === 1 ? "see" : "neutral"} />
      <Edge from={reply[0]} to={reply[1]} show={beat === 2} tone="see" />
      <Token from={ask[0]} to={ask[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="IBM last?" tone="see" absorb />
      <Token from={reply[0]} to={reply[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="41.20" tone="see" absorb />
      <Txt x={200} y={128} size={12.5} weight={800} tone="see" show={beat >= 1} className="halo">
        query: on demand
      </Txt>
    </Stage>
  );
}

// ── The Vendor Display Rule: consolidated quotes (p. 99) ────────────────────
const VENUES = [
  { label: "Big exchange", bid: "20.10", icon: Landmark },
  { label: "Regional", bid: "20.11", icon: Landmark },
  { label: "Small ECN", bid: "20.12", icon: Cpu },
];

export function Consolidated({ beat }: BeatProps) {
  const vs = VENUES.map((_, i) => B(68, 44 + i * 78, 116, 52));
  const scr = B(298, 92, 172, 100);
  const sel = B(298, 206, 128, 50);
  const feeds = vs.map((v) => between(v, scr, 0, 6, 8));
  const sell = between(sel, vs[2], 0, 6, 8);
  const best = beat >= 1 ? 2 : 0;
  const left = scr.x - scr.w / 2;
  const top = scr.y - scr.h / 2;
  return (
    <Stage h={244} label="A vendor screen shows the best bid only from the venues it includes">
      {VENUES.map((v, i) => (
        <Node
          key={v.label}
          {...vs[i]}
          icon={v.icon}
          label={v.label}
          sub={`bid ${v.bid}`}
          tone="bid"
          hl={(beat === 0 && i === 0) || (beat >= 1 && i === 2)}
          dim={(beat === 0 && i > 0) || (beat === 2 && i < 2)}
        />
      ))}
      {feeds.map((e, i) => (
        <Edge key={i} from={e[0]} to={e[1]} show={i === 0 || beat >= 1} tone={beat === 2 ? "neutral" : "see"} dashed={i > 0 && beat === 0} />
      ))}
      {feeds.map((e, i) => (
        <Token key={`t${i}`} from={e[0]} to={e[1]} at={(i === 0 && beat === 0) || beat === 1 ? 1 : 0} show={(i === 0 && beat === 0) || beat === 1} label={VENUES[i].bid} tone="bid" absorb />
      ))}

      <rect x={left} y={top} width={scr.w} height={scr.h} rx={12} className="sc-node" style={{ fill: "var(--node)", stroke: toneVar("see"), strokeWidth: 2 }} />
      <g transform={`translate(${left + 10}, ${top + 8})`} style={{ color: toneVar("see") }}>
        <Monitor width={16} height={16} strokeWidth={2.2} />
      </g>
      <text x={left + 32} y={top + 21} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("see")}>
        VENDOR SCREEN
      </text>
      <text x={left + 12} y={top + 44} className="sc-sub">
        {"best bid"}
      </text>
      {VENUES.map((v, i) => (
        <motion.g key={v.label} initial={false} animate={{ opacity: best === i ? 1 : 0 }} transition={{ duration: 0.3, delay: best === i ? 0.7 : 0 }}>
          <text x={left + 12} y={top + 70} className="sc-num" style={{ fontSize: 24, fontWeight: 800 }} fill={toneVar("bid")}>
            {v.bid}
          </text>
          <text x={left + 12} y={top + 89} className="sc-sub">
            {`at ${v.label}`}
          </text>
        </motion.g>
      ))}
      {["one venue only", "all venues"].map((s, i) => (
        <Txt key={s} x={left + scr.w - 12} y={top + 44} anchor="end" size={11.5} weight={750} tone="see" show={i === 0 ? beat === 0 : beat >= 1}>
          {s}
        </Txt>
      ))}

      <Node {...sel} icon={UserRound} label="Seller" sub="sees 20.12" tone="ask" show={beat === 2} hl={beat === 2} />
      <Edge from={sell[0]} to={sell[1]} show={beat === 2} tone="ask" />
      <Token from={sell[0]} to={sell[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="sell 500" tone="ask" delay={0.3} absorb />
    </Stage>
  );
}

// ── Toronto: members see the whole book, the public the best five (p. 99) ───
const TOR: { p: number; o: number[] }[] = [
  { p: 20.16, o: [400, 300] },
  { p: 20.15, o: [500, 300, 300] },
  { p: 20.14, o: [300, 400] },
  { p: 20.13, o: [600, 300] },
  { p: 20.12, o: [300, 300, 400] },
  { p: 20.11, o: [400, 300] },
  { p: 20.1, o: [300, 500, 300] },
  { p: 20.09, o: [400, 400] },
  { p: 20.08, o: [300, 600] },
  { p: 20.07, o: [500, 300] },
  { p: 20.06, o: [300, 400, 300] },
  { p: 20.05, o: [600, 300] },
];
const TOR_S = 0.11; // units per share
const TOR_Y = 58;
const TOR_H = 17.5;

export function TorontoBook({ beat }: BeatProps) {
  const pub = beat >= 1;
  return (
    <Stage h={266} label="The same limit order book seen by members (every order) and by the public (totals at the best five prices)">
      {["MEMBERS SEE EVERY ORDER", "PUBLIC SEES TOTALS, BEST FIVE PRICES"].map((s, i) => (
        <Txt key={s} x={200} y={22} size={11} weight={800} tone="see" show={i === 0 ? !pub : pub} className="caps">
          {s}
        </Txt>
      ))}
      <g className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.08em" }}>
        <text x={160} y={42} textAnchor="end" fill={toneVar("bid")}>
          BIDS
        </text>
        <text x={200} y={42} textAnchor="middle" fill="var(--ink-3)">
          PRICE
        </text>
        <text x={240} y={42} textAnchor="start" fill={toneVar("ask")}>
          OFFERS
        </text>
      </g>
      {TOR.map((row, r) => {
        const ask = r < 6;
        const y = TOR_Y + r * TOR_H;
        const deep = r === 0 || r === TOR.length - 1;
        const tone = ask ? "ask" : "bid";
        const total = row.o.reduce((a, b) => a + b, 0);
        const gap = pub ? 0 : 3;
        let off = 0;
        return (
          <g key={row.p}>
            <motion.text
              x={200}
              y={y + 4.5}
              textAnchor="middle"
              className="sc-num"
              style={{ fontSize: 12, fontWeight: 700 }}
              fill="var(--ink-2)"
              initial={false}
              animate={{ opacity: pub && deep ? 0.3 : 1 }}
              transition={{ duration: 0.35 }}
            >
              {row.p.toFixed(2)}
            </motion.text>
            <motion.g initial={false} animate={{ opacity: pub && deep ? 0 : 1 }} transition={{ duration: 0.35 }}>
            {row.o.map((s, k) => {
              const w = s * TOR_S;
              const o = off * TOR_S + k * gap;
              off += s;
              const x = ask ? 234 + o : 166 - o - w;
              return (
                <motion.g key={k} initial={false} animate={{ x }} transition={spring.soft}>
                  <motion.rect
                    y={y - 6.5}
                    width={w}
                    height={13}
                    rx={3}
                    fill={toneSoft(tone)}
                    stroke={toneVar(tone)}
                    strokeWidth={1.25}
                    initial={false}
                    animate={{ strokeOpacity: pub ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.text
                    x={w / 2}
                    y={y + 3.8}
                    textAnchor="middle"
                    className="sc-num"
                    style={{ fontSize: 10.5, fontWeight: 750 }}
                    fill={toneVar(tone)}
                    initial={false}
                    animate={{ opacity: pub ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {s}
                  </motion.text>
                </motion.g>
              );
            })}
            </motion.g>
            {/* the aggregate the public sees */}
            <motion.g initial={false} animate={{ opacity: pub && !deep ? 1 : 0 }} transition={{ duration: 0.3, delay: pub ? 0.3 : 0 }}>
              <rect x={ask ? 234 : 166 - total * TOR_S} y={y - 6.5} width={total * TOR_S} height={13} rx={3} fill="none" stroke={toneVar(tone)} strokeWidth={1.5} />
              <text x={ask ? 234 + (total * TOR_S) / 2 : 166 - (total * TOR_S) / 2} y={y + 4} textAnchor="middle" className="sc-num" style={{ fontSize: 11, fontWeight: 800 }} fill={toneVar(tone)}>
                {total.toLocaleString("en-US")}
              </text>
            </motion.g>
            {deep && (
              <Txt x={ask ? 240 : 160} y={y + 4} anchor={ask ? "start" : "end"} size={11.5} weight={750} tone="neutral" show={pub} delay={0.3}>
                not shown
              </Txt>
            )}
          </g>
        );
      })}
    </Stage>
  );
}

// ── Letter tiles for ticker symbols ─────────────────────────────────────────
function Tile({ x, y, ch, w = 36, h = 42, show = true, hl = false, dim = false }: { x: number; y: number; ch: string; w?: number; h?: number; show?: boolean; hl?: boolean; dim?: boolean }) {
  return (
    <motion.g initial={false} animate={{ x, y, opacity: show ? (dim ? 0.32 : 1) : 0 }} transition={{ ...spring.soft, opacity: { duration: 0.3, ease: EASE_OUT } }}>
      <rect y={-h / 2} width={w} height={h} rx={8} className="sc-node" style={{ fill: hl ? toneSoft("see") : "var(--node)", stroke: hl ? toneVar("see") : "var(--node-line)", strokeWidth: hl ? 2 : 1.25 }} />
      <motion.text
        key={ch}
        x={w / 2}
        y={7.5}
        textAnchor="middle"
        className="sc-txt"
        style={{ fontSize: 21, fontWeight: 800, fontFamily: "var(--mono)" }}
        fill={hl ? toneVar("see") : "var(--ink)"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {ch}
      </motion.text>
    </motion.g>
  );
}

/** A bracket under a group of tiles with a two-line label. */
function Tag({ x, y, span, title, sub, show = true, dim = false }: { x: number; y: number; span: number; title: string; sub: string; show?: boolean; dim?: boolean }) {
  return (
    <motion.g initial={false} animate={{ x, opacity: show ? (dim ? 0.32 : 1) : 0 }} transition={{ ...spring.soft, opacity: { duration: 0.3, delay: show ? 0.15 : 0 } }}>
      <path d={`M${-span / 2},${y - 26} v5 h${span} v-5`} fill="none" stroke={toneVar("see")} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <text y={y} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("see")}>
        {title}
      </text>
      <motion.text key={sub} y={y + 15} textAnchor="middle" className="sc-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        {sub}
      </motion.text>
    </motion.g>
  );
}

// ── U.S. stock and fund symbols by length (p. 99; examples ours) ────────────
const ROWS = [
  { tiles: ["I", "B", "M", "", "T"], y: 58, beat: 0, title: "Listed stocks", subs: ["1 to 3 letters", "1 letter: rare, coveted"] },
  { tiles: ["M", "S", "F", "T"], y: 130, beat: 2, title: "Nasdaq NMS", subs: ["4 letters (SmallCap: 5)"] },
  { tiles: ["V", "F", "I", "N", "X"], y: 202, beat: 3, title: "Mutual funds", subs: ["5 letters, the last X"] },
];

export function StockSymbols({ beat }: BeatProps) {
  return (
    <Stage h={240} label="Ticker symbol length by kind of security, U.S. conventions in the book">
      {ROWS.map((r, ri) => {
        const show = beat >= r.beat;
        const now = ri === 0 ? beat <= 1 : beat === r.beat;
        return (
          <g key={ri}>
            {r.tiles.map((ch, i) =>
              ch ? (
                <Tile
                  key={i}
                  x={24 + i * 39 + (ri === 0 && i === 4 ? 8 : 0)}
                  y={r.y}
                  ch={ch}
                  w={34}
                  show={show}
                  dim={!now || (ri === 0 && beat === 1 && i < 3)}
                  hl={(ri === 0 && beat === 1 && i === 4) || (ri === 2 && beat === 3 && i === 4)}
                />
              ) : null,
            )}
            <motion.g initial={false} animate={{ opacity: show ? (now ? 1 : 0.32) : 0 }} transition={{ duration: 0.3 }}>
              <text x={236} y={r.y - 3} className="sc-txt" style={{ fontSize: 13.5, fontWeight: 800 }} fill="var(--ink)">
                {r.title}
              </text>
              {r.subs.map((s, si) => (
                <motion.text
                  key={s}
                  x={236}
                  y={r.y + 14}
                  className="sc-sub"
                  initial={false}
                  animate={{ opacity: r.subs.length === 1 || (si === 1) === (beat >= 1) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {s}
                </motion.text>
              ))}
            </motion.g>
          </g>
        );
      })}
    </Stage>
  );
}

// ── Reading a futures symbol: LC2Z and E72H (p. 99, Table 5-3) ──────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FUT_CODES = ["F", "G", "H", "J", "K", "M", "N", "Q", "U", "V", "X", "Z"];

export function FuturesSymbol({ beat }: BeatProps) {
  const swap = beat === 4;
  const r1dim = beat === 3;
  const r2 = beat >= 3;
  const r2dim = beat === 4;
  const hlCode = beat === 2 || beat === 4 ? "Z" : beat === 3 ? "H" : "";
  const X = [24, 62, 112, 166];
  return (
    <Stage h={252} label="A futures symbol split into commodity code, year digit and month letter">
      {/* row 1: LC2Z (LCZ2 in systems that put the month first) */}
      <Tile x={X[0]} y={52} ch="L" dim={r1dim} hl={beat === 0} />
      <Tile x={X[1]} y={52} ch="C" dim={r1dim} hl={beat === 0} />
      <Tile x={swap ? X[3] : X[2]} y={52} ch="2" dim={r1dim} hl={beat === 1} />
      <Tile x={swap ? X[2] : X[3]} y={52} ch="Z" dim={r1dim} hl={beat === 2 || beat === 4} />
      <Tag x={61} y={102} span={74} title="commodity" sub="live cattle" dim={r1dim} />
      <Tag x={(swap ? X[3] : X[2]) + 18} y={102} span={34} title="year" sub="2002" show={beat >= 1} dim={r1dim} />
      <Tag x={(swap ? X[2] : X[3]) + 18} y={102} span={34} title="month" sub="December" show={beat >= 2} dim={r1dim} />

      {/* row 2: E72H, a commodity code with a number in it */}
      {["E", "7", "2", "H"].map((ch, i) => (
        <Tile key={i} x={X[i]} y={178} ch={ch} show={r2} dim={r2dim} hl={beat === 3 && i < 2} />
      ))}
      <Tag x={61} y={228} span={74} title="commodity" sub="E-mini Euro FX" show={r2} dim={r2dim} />
      <Tag x={X[2] + 18} y={228} span={34} title="year" sub="2002" show={r2} dim={r2dim} />
      <Tag x={X[3] + 18} y={228} span={34} title="month" sub="March" show={r2} dim={r2dim} />

      {/* Table 5-3 */}
      <text x={224} y={22} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
        TABLE 5-3 · MONTH CODES
      </text>
      {FUT_CODES.map((code, i) => {
        const cx = 224 + (i % 4) * 43;
        const cy = 30 + Math.floor(i / 4) * 41;
        const on = code === hlCode;
        return (
          <g key={code}>
            <rect x={cx} y={cy} width={40} height={37} rx={7} className="sc-node" style={{ fill: on ? toneSoft("see") : "var(--node)", stroke: on ? toneVar("see") : "var(--node-line)", strokeWidth: on ? 2 : 1 }} />
            <text x={cx + 20} y={cy + 15} textAnchor="middle" className="sc-txt" style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--mono)" }} fill={on ? toneVar("see") : "var(--ink)"}>
              {code}
            </text>
            <text x={cx + 20} y={cy + 31} textAnchor="middle" className="sc-sub">
              {MONTHS[i]}
            </text>
          </g>
        );
      })}
    </Stage>
  );
}

// ── Reading an OPRA option symbol: IBMAT, IBMMT, MSQVJ (pp. 99–100) ─────────
const CALLS = "ABCDEFGHIJKL".split("");
const PUTS = "MNOPQRSTUVWX".split("");

export function OptionSymbol({ beat }: BeatProps) {
  const split = beat >= 1;
  const letters = beat === 5 ? ["M", "S", "Q", "V", "J"] : ["I", "B", "M", beat === 4 ? "M" : "A", "T"];
  const xs = split ? [26, 65, 104, 212, 322] : [104, 143, 182, 221, 260];
  const monthSub = beat === 5 ? "October put" : beat === 4 ? "January put" : "January call";
  const strip = beat >= 2;
  const hlCell = beat === 2 || beat === 3 ? "A" : beat === 4 ? "M" : beat === 5 ? "V" : "";
  return (
    <Stage h={252} label="An OPRA option symbol split into root, month-and-type letter and strike letter">
      {letters.map((ch, i) => (
        <Tile key={i} x={xs[i]} y={50} ch={ch} hl={(beat === 1 && i < 3) || ((beat === 2 || beat === 4) && i === 3) || (beat === 3 && i === 4) || beat === 5} />
      ))}
      <Tag x={83} y={102} span={114} title="root" sub={beat === 5 ? "Microsoft" : "IBM"} show={beat >= 1} />
      <Tag x={230} y={102} span={36} title="type + month" sub={monthSub} show={beat >= 2} />
      <Tag x={340} y={102} span={36} title="strike" sub={beat === 5 ? "50" : "100"} show={beat >= 3} />

      {/* Table 5-4: calls A–L and puts M–X, January to December */}
      <motion.g initial={false} animate={{ opacity: strip ? 1 : 0 }} transition={{ duration: 0.3 }}>
        {MONTHS.map((m, i) => (
          <text key={m} x={62 + i * 27 + 12.5} y={153} textAnchor="middle" className="sc-sub">
            {m[0]}
          </text>
        ))}
        {[CALLS, PUTS].map((row, r) => (
          <g key={r}>
            <text x={12} y={177 + r * 27} className="sc-txt" style={{ fontSize: 12, fontWeight: 800 }} fill="var(--ink-2)">
              {r ? "puts" : "calls"}
            </text>
            {row.map((code, i) => {
              const on = code === hlCell && (r === 0 ? beat <= 3 : beat >= 4);
              return (
                <g key={code}>
                  <rect x={62 + i * 27} y={160 + r * 27} width={25} height={23} rx={5} className="sc-node" style={{ fill: on ? toneSoft("see") : "var(--node)", stroke: on ? toneVar("see") : "var(--node-line)", strokeWidth: on ? 2 : 1 }} />
                  <text x={62 + i * 27 + 12.5} y={176 + r * 27} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "var(--mono)" }} fill={on ? toneVar("see") : "var(--ink)"}>
                    {code}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </motion.g>
      {["T = 100, 200 or 300: the root tells which", "J = 50, 150 or 250"].map((s, i) => (
        <Txt key={s} x={200} y={238} size={12.5} weight={750} tone="see" show={i === 0 ? beat === 3 || beat === 4 : beat === 5}>
          {s}
        </Txt>
      ))}
    </Stage>
  );
}
