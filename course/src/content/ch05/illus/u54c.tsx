// "See it" scenes for 5.4.6 Order Presentation Systems, 5.4.6.1 Accuracy in Oral Communications,
// 5.4.7 Order Books and the 5.5 Summary. Same rules as src/scene: props derive from `beat`, elements stay mounted.
import { motion } from "motion/react";
import { ClipboardCheck, Cpu, FileText, Handshake, Lock, Monitor, Phone, Store, UserRound } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, type SceneTone, Edge, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";
import { Ladder, ladderY, type Lvl } from "../../ch04/illus/kit.tsx";

const box = (x: number, y: number, w = 108, h = 54): Box => ({ x, y, w, h });

/** Small caps heading in the top-left corner; several can share the spot, one shown per beat. */
function Heading({ show, children, tone = "neutral" }: { show: boolean; children: string; tone?: SceneTone }) {
  return (
    <Txt x={16} y={24} anchor="start" size={11} weight={800} tone={tone} className="caps" show={show}>
      {children}
    </Txt>
  );
}

/** A rounded label chip drawn in place (not travelling). */
function Chip({
  x,
  y,
  w,
  label,
  tone = "neutral",
  show = true,
  on = true,
  h = 26,
  size = 12.5,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  tone?: SceneTone;
  show?: boolean;
  /** Filled and coloured when on, outlined and grey when off. */
  on?: boolean;
  h?: number;
  size?: number;
}) {
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, ease: EASE_OUT }}>
      <motion.rect
        x={x - w / 2}
        y={y - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        initial={false}
        animate={{ opacity: 1 }}
        fill={on ? toneSoft(tone) : "var(--node)"}
        stroke={on ? toneVar(tone) : "var(--node-line)"}
        strokeWidth={1.5}
      />
      <text x={x} y={y + size * 0.36} textAnchor="middle" className="sc-token" style={{ fontSize: size }} fill={on ? toneVar(tone) : "var(--ink-3)"}>
        {label}
      </text>
    </motion.g>
  );
}

// ── Broadcast or private message (p. 105) ───────────────────────────────────
const TRADERS = ["Trader A", "Trader B", "Client C", "Trader D"];

export function BroadcastVsMessage({ beat }: BeatProps) {
  const dealer = box(66, 140, 104);
  const sys = box(186, 140, 100);
  const tr = TRADERS.map((_, i) => box(326, 44 + i * 64, 112, 48));
  const toSys = between(dealer, sys, 0, 6, 6);
  const fan = tr.map((t) => between(sys, t, 0, 6, 6));
  // the private line curves from the dealer to client C, under the system box
  const pa = [dealer.x + 18, dealer.y + dealer.w / 4 + 6] as const;
  const pb = [tr[2].x - tr[2].w / 2 - 6, tr[2].y + 8] as const;
  const BEND = -34;
  return (
    <Stage h={292} label="A broadcast reaches every screen; a message reaches one trader">
      <Heading show={beat === 0} tone="see">BROADCAST TO ALL</Heading>
      <Heading show={beat === 1} tone="see">PRIVATE MESSAGE</Heading>
      <Heading show={beat === 2} tone="see">NEGOTIATING BY MESSAGE</Heading>
      <Edge from={toSys[0]} to={toSys[1]} show={beat === 0} arrow={false} />
      {fan.map((f, i) => (
        <Edge key={i} from={f[0]} to={f[1]} show={beat === 0} arrow={false} />
      ))}
      <Edge from={pa} to={pb} bend={BEND} show={beat >= 1} dashed tone="see" arrow={false} label="private line" labelDy={18} />
      <Node {...dealer} icon={Store} label="Dealer" sub="posts an offer" hl={beat >= 0} tone="ask" />
      <Node {...sys} icon={Cpu} label="System" sub="screen-based" dim={beat >= 1} />
      {tr.map((t, i) => (
        <Node key={i} {...t} icon={Monitor} label={TRADERS[i]} dim={beat >= 1 && i !== 2} hl={beat >= 1 && i === 2} tone="see" />
      ))}
      <Token from={toSys[0]} to={toSys[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="offer" tone="ask" absorb duration={0.6} />
      {fan.map((f, i) => (
        <Token key={i} from={f[0]} to={f[1]} at={beat === 0 ? 1 : 0} show={beat === 0} label="offer" tone="ask" absorb delay={0.7} duration={0.8} />
      ))}
      <Token from={pa} to={pb} bend={BEND} at={beat === 1 ? 1 : 0} show={beat === 1} label="message" tone="see" absorb duration={1.1} />
      <Token from={pb} to={pa} bend={-BEND} at={beat === 2 ? 1 : 0} show={beat === 2} label="40 at 99?" tone="bid" absorb duration={1} />
      <Token from={pa} to={pb} bend={BEND} at={beat === 2 ? 1 : 0} show={beat === 2} label="done" tone="ask" absorb delay={1.2} duration={1} />
    </Stage>
  );
}

// ── An indication of interest on a bulletin board (p. 107) ──────────────────
export function IoiBoard({ beat }: BeatProps) {
  const broker = box(72, 48, 118, 52);
  const seller = box(328, 48, 118, 52);
  const BX = 112;
  const BY = 104;
  const BW = 176;
  const BH = 128;
  const board: Box = { x: BX + BW / 2, y: BY + BH / 2, w: BW, h: BH };
  const post = between(broker, board, 0, 6, 8);
  const read = between(board, seller, 0, 8, 6);
  const call = between(seller, broker, 0, 6, 6);
  const rows = [
    { k: "FIRM", v: "ABC Securities", at: 0 },
    { k: "STOCK", v: "XYZ", at: 0 },
    { k: "SIDE", v: "BUYER", at: 0 },
    { k: "PRICE", v: "about 25", at: 1 },
  ];
  return (
    <Stage h={250} label="A broker-dealer posts an indication of interest; a seller sees it and calls">
      <rect x={BX} y={BY} width={BW} height={BH} rx={12} fill="var(--node)" stroke={beat === 0 || beat === 1 ? toneVar("def") : "var(--node-line)"} strokeWidth={beat <= 1 ? 2 : 1.25} />
      <text x={BX + 12} y={BY + 20} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
        BULLETIN BOARD · IOI
      </text>
      {rows.map((r, i) => {
        const y = BY + 44 + i * 22;
        return (
          <motion.g key={r.k} initial={false} animate={{ opacity: beat >= r.at ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === r.at ? 0.5 : 0 }}>
            <text x={BX + 12} y={y} className="sc-txt" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em" }} fill="var(--ink-3)">
              {r.k}
            </text>
            <text x={BX + BW - 12} y={y} textAnchor="end" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill={r.k === "SIDE" ? toneVar("bid") : "var(--ink)"}>
              {r.v}
            </text>
          </motion.g>
        );
      })}
      <Chip x={BX + BW - 46} y={BY + BH + 2} w={78} h={22} size={11.5} label="not firm" tone="prac" show={beat >= 1} />
      <Edge from={read[0]} to={read[1]} show={beat >= 2} dashed tone="ask" />
      <Edge from={call[0]} to={call[1]} show={beat === 3} tone="ask" label="phone call" />
      <Node {...broker} icon={Handshake} label="ABC" sub="broker-dealer" hl={beat === 0 || beat === 3} tone="bid" />
      <Node {...seller} icon={UserRound} label="Seller" sub="has XYZ to sell" dim={beat <= 1} hl={beat >= 2} tone="ask" />
      <Token from={post[0]} to={post[1]} at={beat >= 0 ? 1 : 0} label="IOI" tone="bid" absorb duration={0.7} />
      <Token from={call[0]} to={call[1]} at={beat === 3 ? 1 : 0} show={beat === 3} label="call" icon={Phone} tone="ask" absorb duration={1.1} />
    </Stage>
  );
}

// ── From the Pink Sheets to NASDAQ (box p. 108) ─────────────────────────────
export function PinkTimeline({ beat }: BeatProps) {
  const pink = box(66, 122, 116, 62);
  const nas = box(204, 122, 100, 62);
  const nms = box(332, 58, 112, 56);
  const bb = box(332, 186, 112, 56);
  const e1 = between(pink, nas, 0, 6, 6);
  const e2 = between(nas, nms, 0, 6, 6);
  const e3 = between(nas, bb, 0, 6, 6);
  return (
    <Stage h={250} label="The Pink Sheets, replaced by the faster NASDAQ system">
      <Edge from={e1[0]} to={e1[1]} show={beat >= 1} tone="def" />
      <Edge from={e2[0]} to={e2[1]} show={beat >= 2} tone="def" />
      <Edge from={e3[0]} to={e3[1]} show={beat >= 2} tone="def" />
      <Node
        {...pink}
        icon={FileText}
        label="Pink Sheets"
        sub={beat === 3 ? "smallest stocks" : "printed on pink"}
        tone="game"
        hl={beat === 0 || beat === 3}
        dim={beat === 1 || beat === 2}
      />
      <Node {...nas} icon={Monitor} label="NASDAQ" sub="faster" tone="def" show={beat >= 1} hl={beat === 1} dim={beat === 3} />
      <Node {...nms} label="Nasdaq" sub="Stock Market" tone="def" show={beat >= 2} hl={beat === 2} dim={beat === 3} />
      <Node {...bb} label="OTC Bulletin" sub="Board" tone="def" show={beat >= 2} hl={beat === 2} dim={beat === 3} />
      <Txt x={pink.x} y={184} size={12.5} weight={750} tone="game" show={beat === 0}>
        1913 weekly
      </Txt>
      <Txt x={pink.x} y={202} size={12.5} weight={750} tone="game" show={beat === 0} delay={0.25}>
        1918 daily
      </Txt>
      <Txt x={pink.x} y={184} size={12.5} weight={750} tone="game" show={beat === 3}>
        only the smallest
      </Txt>
      <Txt x={pink.x} y={202} size={12.5} weight={750} tone="game" show={beat === 3}>
        U.S. stocks
      </Txt>
      <Ping x={pink.x} y={pink.y} trigger={beat === 3 ? "now" : "then"} tone="game" r={46} />
    </Stage>
  );
}

// ── Two reports that don't match: an out-trade (p. 107) ─────────────────────
function Report({ x, y, side, price, show, flag }: { x: number; y: number; side: "bid" | "ask"; price: string; show: boolean; flag: boolean }) {
  const w = 138;
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }}>
      <rect x={x - w / 2} y={y - 16} width={w} height={32} rx={8} fill="var(--node)" stroke={toneVar(side)} strokeWidth={1.5} />
      <text x={x - w / 2 + 10} y={y + 4.5} className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar(side)}>
        {side === "bid" ? "BOUGHT 20" : "SOLD 20"}
      </text>
      <motion.rect
        x={x + w / 2 - 46}
        y={y - 11}
        width={38}
        height={22}
        rx={6}
        initial={false}
        animate={{ opacity: flag ? 1 : 0 }}
        fill={toneSoft("prac")}
        stroke={toneVar("prac")}
        strokeWidth={1.5}
      />
      <text x={x + w / 2 - 27} y={y + 4.5} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill={flag ? toneVar("prac") : "var(--ink)"}>
        {`at ${price}`}
      </text>
    </motion.g>
  );
}

export function OutTrade({ beat }: BeatProps) {
  const buyer = box(76, 50, 112, 52);
  const seller = box(324, 50, 112, 52);
  const match = box(200, 214, 136, 52);
  const deal = between(buyer, seller, 0, 6, 6);
  const rb = box(76, 124, 138, 32);
  const rs = box(324, 124, 138, 32);
  const tb = between(rb, match, 0, 4, 6);
  const ts = between(rs, match, 0, 4, 6);
  const GRID = Array.from({ length: 100 }, (_, i) => i);
  const bad = new Set([13, 38, 61, 86]);
  return (
    <Stage h={256} label="A buyer's and a seller's reports of one trade don't match">
      <Edge from={deal[0]} to={deal[1]} show={beat <= 2} arrow={false} tone="see" label="deal: 20 contracts" />
      <Node {...buyer} icon={UserRound} label="Buyer" sub={beat >= 2 && beat < 3 ? "heard 6" : "in the pit"} tone="bid" hl={beat < 3} dim={beat === 3} />
      <Node {...seller} icon={UserRound} label="Seller" sub={beat >= 2 && beat < 3 ? "said 7" : "in the pit"} tone="ask" hl={beat < 3} dim={beat === 3} />
      <Report x={rb.x} y={rb.y} side="bid" price="6" show={beat === 1 || beat === 2} flag={beat === 2} />
      <Report x={rs.x} y={rs.y} side="ask" price="7" show={beat === 1 || beat === 2} flag={beat === 2} />
      <Txt x={200} y={129} size={18} weight={800} tone="prac" show={beat === 2}>
        ≠
      </Txt>
      <Node {...match} icon={ClipboardCheck} label={beat === 2 ? "OUT-TRADE" : "Trade check"} sub={beat === 2 ? "reports differ" : "compares reports"} show={beat === 1 || beat === 2} hl={beat === 2} tone="prac" />
      <Token from={tb[0]} to={tb[1]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="report" tone="bid" absorb duration={0.9} />
      <Token from={ts[0]} to={ts[1]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="report" tone="ask" absorb duration={0.9} />
      {/* beat 3: 100 pit trades, 4 of them out-trades */}
      <motion.g initial={false} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={{ duration: 0.35, delay: beat === 3 ? 0.15 : 0 }}>
        <text x={200} y={118} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 800 }} fill="var(--ink-2)">
          100 trades in a large futures pit
        </text>
        {GRID.map((i) => (
          <circle key={i} cx={57 + (i % 20) * 15} cy={140 + Math.floor(i / 20) * 15} r={5} fill={bad.has(i) ? toneVar("prac") : "var(--node-line)"} />
        ))}
        <text x={200} y={233} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill={toneVar("prac")}>
          as many as 4 are out-trades
        </text>
      </motion.g>
    </Stage>
  );
}

// ── Settling a disputed trade (pp. 108–109) ─────────────────────────────────
export function Dispute({ beat }: BeatProps) {
  const buyer = box(76, 50, 112, 52);
  const seller = box(324, 50, 112, 52);
  const X0 = 110;
  const X1 = 290;
  const at = beat === 1 ? X1 : (X0 + X1) / 2;
  const a = box(66, 200, 100, 50);
  const z = box(200, 200, 104, 50);
  const b = box(334, 200, 100, 50);
  const past = between(a, b, 0, 6, 6);
  return (
    <Stage h={250} label="Traders find who erred, or split the difference">
      <Node {...buyer} icon={UserRound} label="Buyer" sub={beat === 1 ? "“my error: 7”" : "says 6"} tone="bid" hl={beat === 1} dim={beat === 3} />
      <Node {...seller} icon={UserRound} label="Seller" sub="says 7" tone="ask" dim={beat === 3} />
      <Txt x={200} y={55} size={13.5} weight={800} tone="prac" show={beat === 0}>
        who erred?
      </Txt>
      {/* the price both claim, on a 6-to-7 line */}
      <motion.g initial={false} animate={{ opacity: beat <= 2 ? 1 : 0 }} transition={{ duration: 0.3 }}>
        <line x1={X0} x2={X1} y1={140} y2={140} stroke="var(--line-strong)" strokeWidth={2} strokeLinecap="round" />
        <circle cx={X0} cy={140} r={5} fill={toneVar("bid")} />
        <circle cx={X1} cy={140} r={5} fill={toneVar("ask")} />
        <text x={X0} y={164} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill={toneVar("bid")}>
          6
        </text>
        <text x={X1} y={164} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill={toneVar("ask")}>
          7
        </text>
      </motion.g>
      <motion.g initial={false} animate={{ x: at, opacity: beat === 1 || beat === 2 ? 1 : 0 }} transition={{ x: spring.travel, opacity: { duration: 0.3 } }}>
        <circle cx={0} cy={140} r={9} fill={toneSoft("see")} stroke={toneVar("see")} strokeWidth={2.5} />
        <text x={0} y={118} textAnchor="middle" className="sc-txt halo" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("see")}>
          {beat === 1 ? "settle at 7" : "split: 6½"}
        </text>
      </motion.g>
      {/* beat 3: the others trade around an error-prone trader */}
      <Node {...a} label="Trader A" show={beat === 3} />
      <Node {...z} label="Trader Z" sub="many mistakes" show={beat === 3} dim />
      <Node {...b} label="Trader B" show={beat === 3} />
      <Edge from={past[0]} to={past[1]} bend={40} show={beat === 3} tone="see" arrow={false} label="trade with each other" labelAt={0.5} labelDy={-8} />
    </Stage>
  );
}

// ── Two shouts in the pit (p. 108) ──────────────────────────────────────────
function Parse({ cx, parts, decode, side, show, dim }: { cx: number; parts: { t: string; cap?: string; w: number }[]; decode: string; side: "bid" | "ask"; show: boolean; dim: boolean }) {
  const gap = 8;
  const total = parts.reduce((s, p) => s + p.w, 0) + gap * (parts.length - 1);
  let x = cx - total / 2;
  return (
    <motion.g initial={false} animate={{ opacity: show ? (dim ? 0.32 : 1) : 0 }} transition={{ duration: 0.3 }}>
      {parts.map((p) => {
        const mx = x + p.w / 2;
        x += p.w + gap;
        return (
          <g key={p.t}>
            {p.cap && (
              <text x={mx} y={126} textAnchor="middle" className="sc-txt" style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.07em" }} fill="var(--ink-3)">
                {p.cap}
              </text>
            )}
            <Chip x={mx} y={146} w={p.w} label={p.t} tone={p.cap ? side : "neutral"} on={!!p.cap} />
          </g>
        );
      })}
      <text x={cx} y={184} textAnchor="middle" className="sc-txt" style={{ fontSize: 13.5, fontWeight: 850 }} fill={toneVar(side)}>
        {decode}
      </text>
    </motion.g>
  );
}

function Bubble({ x, y, text, tone, show, dim }: { x: number; y: number; text: string; tone: SceneTone; show: boolean; dim?: boolean }) {
  const w = Math.round(text.length * 8 + 26);
  return (
    <motion.g initial={false} animate={{ opacity: show ? (dim ? 0.32 : 1) : 0, y: show ? 0 : 4 }} transition={{ ...spring.soft, opacity: { duration: 0.3 } }}>
      <path d={`M${x - 8},${y - 15} L${x},${y - 24} L${x + 8},${y - 15}`} fill="var(--node)" stroke={toneVar(tone)} strokeWidth={1.5} />
      <rect x={x - w / 2} y={y - 15} width={w} height={30} rx={15} fill="var(--node)" stroke={toneVar(tone)} strokeWidth={1.5} />
      <rect x={x - 9} y={y - 16.5} width={18} height={4} fill="var(--node)" />
      <text x={x} y={y + 5} textAnchor="middle" className="sc-txt" style={{ fontSize: 14, fontWeight: 850 }} fill={toneVar(tone)}>
        {text}
      </text>
    </motion.g>
  );
}

export function PitShouts({ beat }: BeatProps) {
  const buyer = box(100, 38, 104, 46);
  const seller = box(300, 38, 104, 46);
  return (
    <Stage h={262} label="A bid is price for quantity; an offer is quantity at price">
      <Node {...buyer} icon={UserRound} label="Buyer" tone="bid" hl={beat === 0} dim={beat === 1} />
      <Node {...seller} icon={UserRound} label="Seller" tone="ask" hl={beat === 1} dim={beat === 0} />
      <Bubble x={buyer.x} y={92} text="“6 for 20”" tone="bid" show dim={beat === 1} />
      <Bubble x={seller.x} y={92} text="“40 at a quarter”" tone="ask" show={beat >= 1} dim={beat === 0} />
      <Parse
        cx={100}
        side="bid"
        show={beat === 0 || beat === 1}
        dim={beat === 1}
        parts={[
          { t: "6", cap: "PRICE", w: 40 },
          { t: "for", w: 40 },
          { t: "20", cap: "SIZE", w: 42 },
        ]}
        decode="BUY 20 at 6"
      />
      <Parse
        cx={300}
        side="ask"
        show={beat === 1}
        dim={false}
        parts={[
          { t: "40", cap: "SIZE", w: 42 },
          { t: "at", w: 34 },
          { t: "a quarter", cap: "PRICE", w: 84 },
        ]}
        decode="SELL 40 at ¼"
      />
      {/* beat 2: only the last digit is spoken */}
      <motion.g initial={false} animate={{ opacity: beat === 2 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 2 ? 0.15 : 0 }}>
        <text x={200} y={140} textAnchor="middle" className="sc-txt" style={{ fontSize: 12.5, fontWeight: 750 }} fill="var(--ink-2)">
          Everyone knows the contract trades around 97.40
        </text>
        <text x={156} y={184} textAnchor="middle" className="sc-num" style={{ fontSize: 26, fontWeight: 850 }} fill={toneVar("bid")}>
          6
        </text>
        <text x={196} y={182} textAnchor="middle" className="sc-txt" style={{ fontSize: 18, fontWeight: 800 }} fill="var(--ink-3)">
          →
        </text>
        <text x={216} y={184} textAnchor="start" className="sc-num" style={{ fontSize: 26, fontWeight: 850 }} fill="var(--ink-3)">
          97.4
          <tspan fill={toneVar("bid")}>6</tspan>
        </text>
      </motion.g>
      {/* beat 3: short shouts are faster */}
      <motion.g initial={false} animate={{ opacity: beat === 3 ? 1 : 0 }} transition={{ duration: 0.3, delay: beat === 3 ? 0.15 : 0 }}>
        <text x={200} y={146} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 650 }} fill="var(--ink-3)" textDecoration="line-through">
          “ninety-seven forty-six for twenty”
        </text>
        <text x={200} y={180} textAnchor="middle" className="sc-txt" style={{ fontSize: 16, fontWeight: 850 }} fill={toneVar("bid")}>
          “6 for 20”
        </text>
      </motion.g>
      <Txt x={200} y={234} size={12.5} weight={800} tone="see" show={beat === 3}>
        faster, and less noise
      </Txt>
    </Stage>
  );
}

// ── Palms in, palms out (p. 108) ────────────────────────────────────────────
function Figure({ x, y, tone, dim, hl }: { x: number; y: number; tone: SceneTone; dim: boolean; hl: boolean }) {
  return (
    <motion.g initial={false} animate={{ opacity: dim ? 0.32 : 1 }} transition={{ duration: 0.3 }}>
      <circle cx={x} cy={y} r={25} fill={hl ? toneSoft(tone) : "var(--node)"} stroke={hl ? toneVar(tone) : "var(--node-line)"} strokeWidth={hl ? 2 : 1.25} />
      <g transform={`translate(${x - 11}, ${y - 11})`} style={{ color: toneVar(tone) }}>
        <UserRound width={22} height={22} strokeWidth={2.2} />
      </g>
      {/* arm and open palm */}
      <line x1={x + 25} x2={x + 52} y1={y} y2={y} stroke={toneVar(tone)} strokeWidth={3} strokeLinecap="round" />
      <rect x={x + 52} y={y - 13} width={9} height={26} rx={4.5} fill={toneSoft(tone)} stroke={toneVar(tone)} strokeWidth={2} />
    </motion.g>
  );
}

const SIGNS: { label: string; sub: string }[] = [
  { label: "fingers", sub: "extended" },
  { label: "hand", sub: "upright or sideways" },
  { label: "face", sub: "touched in places" },
];

export function HandSignals({ beat }: BeatProps) {
  const sy = 58;
  const by = 146;
  return (
    <Stage h={262} label="Sellers push the item away, buyers pull it in">
      <Figure x={50} y={sy} tone="ask" dim={beat !== 0} hl={beat === 0} />
      <Figure x={50} y={by} tone="bid" dim={beat !== 1} hl={beat === 1} />
      <Txt x={130} y={sy - 22} anchor="start" size={11.5} weight={800} tone="ask" show={beat >= 0} className="caps">
        PALM AWAY
      </Txt>
      <Txt x={130} y={by - 22} anchor="start" size={11.5} weight={800} tone="bid" show={beat >= 1} className="caps">
        PALMS INWARD
      </Txt>
      {/* the item pushed away, and the item pulled in */}
      <Token from={[150, sy]} to={[262, sy]} at={beat >= 0 ? 1 : 0} label="item" tone="ask" duration={0.9} delay={0.2} />
      <Token from={[262, by]} to={[150, by]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="item" tone="bid" duration={0.9} delay={0.2} />
      <Txt x={352} y={sy + 5} size={15} weight={850} tone="ask" show={beat >= 0} delay={0.6}>
        SELL
      </Txt>
      <Txt x={352} y={by + 5} size={15} weight={850} tone="bid" show={beat >= 1} delay={0.6}>
        BUY
      </Txt>
      {SIGNS.map((s, i) => (
        <g key={s.label}>
          <Chip x={78 + i * 122} y={222} w={104} label={s.label} tone="see" show={beat === 2} />
          <Txt x={78 + i * 122} y={250} size={11.5} weight={650} tone="neutral" show={beat === 2}>
            {s.sub}
          </Txt>
        </g>
      ))}
      <Txt x={200} y={196} size={12.5} weight={800} tone="see" show={beat === 2}>
        price and quantity
      </Txt>
    </Stage>
  );
}

// ── Inside an order book (p. 109) ───────────────────────────────────────────
const BOOK: Lvl[] = [
  { p: 50.04, ask: 300 },
  { p: 50.03, ask: 500 },
  { p: 50.02, ask: 200 },
  { p: 50.01 },
  { p: 50.0, bid: 2000 },
  { p: 49.99, bid: 400 },
  { p: 49.98, bid: 300 },
];

export function InsideBook({ beat }: BeatProps) {
  const levels = beat === 3 ? BOOK.map((l) => (l.p === 50.01 ? { ...l, bid: 100 } : l)) : BOOK;
  const Y0 = 52;
  return (
    <Stage h={292} label="An order book: standing limit orders, waiting stops, and what they reveal">
      <Ladder levels={levels} y={Y0} maxSize={2000} hl={beat === 2 ? [50.0] : beat === 3 ? [50.01] : []} hlTone={beat === 3 ? "see" : "def"} />
      <Txt x={244} y={ladderY(BOOK, 50.0, Y0) + 4.5} anchor="start" size={12} weight={800} tone="def" show={beat >= 2}>
        ← big buyer
      </Txt>
      <Txt x={244} y={ladderY(BOOK, 50.01, Y0) + 4.5} anchor="start" size={12} weight={800} tone="see" show={beat === 3}>
        ← trades ahead
      </Txt>
      {/* untriggered contingent orders wait off the ladder */}
      <motion.g initial={false} animate={{ opacity: beat === 1 ? 1 : beat > 1 ? 0.32 : 0 }} transition={{ duration: 0.3 }}>
        <text x={200} y={240} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
          ALSO WAITING, NOT YET TRIGGERED
        </text>
      </motion.g>
      <Chip x={128} y={264} w={136} label="stop sell · 49.90" tone="ask" show={beat >= 1} on={beat === 1} />
      <Chip x={272} y={264} w={136} label="MIT buy · 49.95" tone="bid" show={beat >= 1} on={beat === 1} />
    </Stage>
  );
}

// ── Open book, closed book (p. 109) ─────────────────────────────────────────
const SMALL: Lvl[] = [
  { p: 50.02, ask: 300 },
  { p: 50.01, ask: 400 },
  { p: 50.0, bid: 500 },
  { p: 49.99, bid: 300 },
  { p: 49.98, bid: 200 },
];

export function OpenClosed({ beat }: BeatProps) {
  const LX = 250;
  const Y0 = 72;
  const RH = 22;
  const closed = beat === 1;
  const big = box(68, 212, 112, 50);
  const rowY = ladderY(SMALL, 50.0, Y0, RH);
  const rest: readonly [number, number] = [176, 212];
  const into: readonly [number, number] = [LX - 32 - 40, rowY];
  return (
    <Stage h={262} label="An open book shows every order; a closed book shows none">
      <Heading show={beat !== 1} tone="see">OPEN BOOK: ALL TRADERS SEE IT</Heading>
      <Heading show={beat === 1} tone="see">CLOSED BOOK: NOTHING SHOWN</Heading>
      <Ladder levels={SMALL} x={LX} y={Y0} rowH={RH} barMax={70} dim={closed} />
      {/* the closed book's cover */}
      <motion.g initial={false} animate={{ opacity: closed ? 1 : 0 }} transition={{ duration: 0.35, ease: EASE_OUT }}>
        <rect x={LX - 142} y={Y0 - 34} width={284} height={5 * RH + 28} rx={12} fill="var(--surface-2)" stroke="var(--line-strong)" strokeWidth={1.5} />
        <g transform={`translate(${LX - 13}, ${Y0 + 12})`} style={{ color: "var(--ink-3)" }}>
          <Lock width={26} height={26} strokeWidth={2.2} />
        </g>
        <text x={LX} y={Y0 + 66} textAnchor="middle" className="sc-txt" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink-2)">
          orders not shown
        </text>
      </motion.g>
      {/* a hidden order: in the book at 50.00, not displayed */}
      <motion.rect
        x={LX - 30}
        y={rowY - 10}
        width={60}
        height={20}
        rx={5}
        fill="none"
        stroke={toneVar("bid")}
        strokeWidth={1.5}
        strokeDasharray="4 4"
        initial={false}
        animate={{ opacity: beat === 3 ? 1 : 0 }}
        transition={{ duration: 0.3, delay: beat === 3 ? 1.1 : 0 }}
      />
      <Txt x={LX + 42} y={rowY + 4.5} anchor="start" size={12} weight={800} tone="bid" show={beat === 3} delay={1.1}>
        +5,000 hidden
      </Txt>
      <Node {...big} icon={UserRound} label="Big buyer" sub="wants 5,000" tone="bid" show={beat >= 2} hl={beat >= 2} />
      <Txt x={rest[0]} y={rest[1] + 30} size={12} weight={800} tone="prac" show={beat === 2}>
        held back
      </Txt>
      <Token from={rest} to={into} at={beat === 3 ? 1 : 0} show={beat >= 2} label="buy 5,000" tone="bid" absorb duration={1} />
    </Stage>
  );
}

// ── Where a broker parks an order (p. 109) ──────────────────────────────────
export function BrokerHandoff({ beat }: BeatProps) {
  const client = box(76, 48, 112, 50);
  const broker = box(76, 172, 112, 52);
  const sysb = box(316, 100, 136, 54);
  const spec = box(316, 206, 136, 54);
  const e0 = between(client, broker, 0, 6, 6);
  const e1 = between(broker, sysb, 0, 6, 6);
  const e2 = between(broker, spec, 0, 6, 6);
  return (
    <Stage h={244} label="A broker submits the order to the system book, or gives it to a specialist">
      <Edge from={e0[0]} to={e0[1]} show tone="bid" />
      <Edge from={e1[0]} to={e1[1]} show={beat >= 1} tone={beat === 1 ? "def" : "neutral"} />
      <Edge from={e2[0]} to={e2[1]} show={beat >= 2} tone="def" />
      <Node {...client} icon={UserRound} label="Client" sub="limit order" tone="bid" hl={beat === 0} dim={beat > 0} />
      <Node {...broker} icon={Handshake} label="Broker" sub="represents it" tone="def" hl={beat === 0} />
      <Node {...sysb} icon={Cpu} label="System book" sub="rule-based markets" tone="def" hl={beat === 1} dim={beat === 0 || beat === 2} />
      <Node {...spec} icon={Store} label="Specialist" sub="other markets" tone="def" show={beat >= 2} hl={beat === 2} />
      <Token from={e0[0]} to={e0[1]} at={beat >= 0 ? 1 : 0} label="order" tone="bid" absorb duration={0.8} />
      <Token from={e1[0]} to={e1[1]} at={beat === 1 ? 1 : 0} show={beat === 1} label="order" tone="bid" absorb duration={0.8} />
      <Token from={e2[0]} to={e2[1]} at={beat === 2 ? 1 : 0} show={beat === 2} label="order" tone="bid" absorb duration={0.9} />
    </Stage>
  );
}

// ── Why dealers like holding limit orders (pp. 109–110) ─────────────────────
export function DealerBook({ beat }: BeatProps) {
  const broker = box(70, 62, 112, 52);
  const dealer = box(330, 62, 112, 52);
  const lim = between(broker, dealer, -11, 6, 6);
  const mkt = between(broker, dealer, 11, 6, 6);
  const PX = 270;
  const PY = 118;
  const stale = beat >= 2;
  return (
    <Stage h={232} label="A dealer holds brokers' limit orders and gets their market orders">
      <Edge from={lim[0]} to={lim[1]} show tone="bid" label={beat === 3 ? "free service: fee $0" : "limit orders"} labelDy={-8} />
      <Edge from={mkt[0]} to={mkt[1]} show={beat >= 1} tone="prac" label="market orders" labelDy={22} />
      <Node {...broker} icon={Handshake} label="Brokers" sub="order flow" tone="def" hl={beat === 0 || beat === 1 || beat === 3} />
      <Node {...dealer} icon={Store} label="Dealer" sub="keeps a book" tone="def" hl />
      <Token from={lim[0]} to={lim[1]} at={beat >= 0 ? 1 : 0} label="limit" tone="bid" absorb duration={1} />
      <Token from={mkt[0]} to={mkt[1]} at={beat >= 1 ? 1 : 0} show={beat >= 1} label="market" tone="prac" absorb duration={1} />
      {/* the dealer's book of limit orders */}
      <rect x={PX} y={PY} width={120} height={86} rx={10} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
      <text x={PX + 10} y={PY + 18} className="sc-txt caps" style={{ fontSize: 10, fontWeight: 800 }} fill="var(--ink-3)">
        HELD FOR BROKERS
      </text>
      <motion.rect
        x={PX + 6}
        y={PY + 27}
        width={108}
        height={24}
        rx={6}
        initial={false}
        animate={{ opacity: stale ? 1 : 0 }}
        fill={toneSoft("prac")}
        stroke={toneVar("prac")}
        strokeWidth={1.5}
      />
      <text x={PX + 12} y={PY + 43.5} className="sc-num" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("bid")}>
        buy 100 at 20
      </text>
      <text x={PX + 12} y={PY + 71.5} className="sc-num" style={{ fontSize: 12.5, fontWeight: 800 }} fill={toneVar("ask")}>
        sell 100 at 21
      </text>
      <Txt x={PX - 14} y={PY + 44} anchor="end" size={12.5} weight={800} tone="prac" show={beat === 2}>
        news: now worth 19.50
      </Txt>
      <Txt x={PX - 14} y={PY + 64} anchor="end" size={12.5} weight={800} tone="prac" show={beat === 2} delay={0.4}>
        dealer sells to it at 20
      </Txt>
    </Stage>
  );
}

// ── Four dials of a market (5.5) ────────────────────────────────────────────
const DIALS: { cap: string; opts: string[]; pick: number[] }[] = [
  { cap: "WHO ARRANGES TRADES", opts: ["Dealers", "Order rules", "Brokers"], pick: [1] },
  { cap: "WHEN · WHERE", opts: ["Call", "Continuous", "Floor", "Offices"], pick: [1, 3] },
  { cap: "HOW TRADERS NEGOTIATE", opts: ["Screens", "Voices", "Telephone"], pick: [0] },
  { cap: "TRANSPARENCY", opts: ["Transparent", "Opaque"], pick: [0] },
];

export function FourDials({ beat }: BeatProps) {
  const ex = beat === 4;
  return (
    <Stage h={268} label="Four ways markets differ, set for one market">
      <Txt x={384} y={24} anchor="end" size={11} weight={800} tone="see" className="caps" show={ex}>
        EURONEXT PARIS, 2003
      </Txt>
      {DIALS.map((d, i) => {
        const y = 44 + i * 58;
        const active = beat === i || ex;
        const n = d.opts.length;
        const w = n === 4 ? 84 : n === 3 ? 110 : 150;
        const gap = 8;
        const total = n * w + (n - 1) * gap;
        return (
          <motion.g key={d.cap} initial={false} animate={{ opacity: active ? 1 : 0.32 }} transition={{ duration: 0.3 }}>
            <text x={16} y={y} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={active ? toneVar("def") : "var(--ink-3)"}>
              {d.cap}
            </text>
            {d.opts.map((o, j) => (
              <Chip key={o} x={200 - total / 2 + w / 2 + j * (w + gap)} y={y + 22} w={w} label={o} tone={ex ? "see" : "def"} on={ex ? d.pick.includes(j) : beat === i} />
            ))}
          </motion.g>
        );
      })}
    </Stage>
  );
}
