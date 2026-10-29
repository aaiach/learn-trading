// "See it" scenes for 5.3.2–5.3.5: order-driven, brokered and hybrid markets, and Table 5-1.
// Cast (shared across Chapter 5): traders UserRound (buyers "bid" blue, sellers "ask" orange), dealer Store,
// broker Handshake, order book ListOrdered, matching engine Cpu, floor crowd Users.
import { useRef } from "react";
import { motion } from "motion/react";
import { Cpu, FileText, Gavel, Handshake, ListOrdered, Phone, ShieldCheck, Store, UserRound, Users } from "lucide-react";
import type { BeatProps } from "../../types.ts";
import { type Box, Edge, Node, Ping, Stage, Token, Txt, between, toneSoft, toneVar } from "../../../scene/index.tsx";
import { EASE_OUT, spring } from "../../../motion/tokens.ts";

const box = (x: number, y: number, w = 104, h = 52): Box => ({ x, y, w, h });

/** A small rounded chip (an order, a price) that can move between positions. */
function Chip({
  x,
  y,
  w,
  label,
  tone = "neutral",
  show = true,
  dim = false,
  dashed = false,
  from,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
  tone?: "bid" | "ask" | "see" | "neutral" | "prac" | "idea" | "game" | "def";
  show?: boolean;
  dim?: boolean;
  dashed?: boolean;
  /** Where it enters from on first mount (only if the scene mounts on its first beat). */
  from?: { x: number; y: number };
  delay?: number;
}) {
  const c = tone === "neutral" ? "var(--ink-2)" : toneVar(tone);
  return (
    <motion.g
      initial={from ? { x: from.x, y: from.y, opacity: 0 } : { x, y, opacity: 0 }}
      animate={{ x, y, opacity: show ? (dim ? 0.38 : 1) : 0 }}
      transition={{ ...spring.soft, delay, opacity: { duration: 0.3, delay: show ? delay : 0 } }}
      style={{ pointerEvents: "none" }}
    >
      <rect
        x={-w / 2}
        y={-12}
        width={w}
        height={24}
        rx={12}
        fill={tone === "neutral" ? "var(--surface-2)" : toneSoft(tone)}
        stroke={c}
        strokeWidth={1.5}
        strokeDasharray={dashed ? "4 4" : undefined}
      />
      <text y={4.5} textAnchor="middle" className="sc-token" style={{ fill: c }}>
        {label}
      </text>
    </motion.g>
  );
}

// ── Order-driven: the rules rank and match the orders (§5.3.2, p. 94) ──────
const BUYS = [
  { n: "Ann", p: "50.10", arrive: 1, rank: 0 },
  { n: "Ben", p: "50.05", arrive: 0, rank: 1 },
  { n: "Cal", p: "50.00", arrive: 2, rank: 2 },
];
const SELLS = [
  { n: "Dee", p: "50.10", arrive: 1, rank: 0 },
  { n: "Eve", p: "50.15", arrive: 2, rank: 1 },
  { n: "Fay", p: "50.20", arrive: 0, rank: 2 },
];
const OM_STATUS = ["orders arrive", "trading rules apply", "best prices first", "top bid meets top offer", "pricing rule: 50.10"];

export function OrderMatch({ beat }: BeatProps) {
  const first = useRef(beat).current === 0;
  const PX = 116;
  const PW = 168;
  const BX = 158;
  const SX = 242;
  const rowY = (i: number) => 104 + i * 28;
  const ranked = beat >= 2;
  const matched = beat >= 3;
  const rulesOn = beat === 1 || beat === 2;
  const side = (list: typeof BUYS, buy: boolean) =>
    list.map((o, i) => {
      const ny = 74 + i * 56;
      const nx = buy ? 40 : 360;
      const top = o.rank === 0;
      return (
        <g key={o.n}>
          <Node
            x={nx}
            y={ny}
            w={64}
            h={42}
            icon={undefined}
            label={o.n}
            sub={buy ? "buyer" : "seller"}
            tone={buy ? "bid" : "ask"}
            hl={matched && top}
            dim={rulesOn || (matched && !top)}
          />
          <Chip
            x={buy ? BX : SX}
            y={rowY(ranked ? o.rank : o.arrive)}
            w={76}
            label={`${o.n} ${o.p}`}
            tone={buy ? "bid" : "ask"}
            dim={matched && !top}
            from={first ? { x: nx, y: ny } : undefined}
            delay={first && beat === 0 ? 0.2 + 0.25 * o.arrive : 0}
          />
        </g>
      );
    });
  return (
    <Stage h={252} label="Buy and sell orders ranked and matched by the market's rules">
      <motion.rect
        x={PX}
        y={36}
        width={PW}
        height={172}
        rx={14}
        fill="var(--node)"
        initial={false}
        animate={{ strokeWidth: rulesOn ? 2 : 1.25 }}
        stroke={rulesOn ? toneVar("see") : "var(--node-line)"}
      />
      <g transform={`translate(${200 - 52}, 47)`} style={{ color: "var(--ink-3)" }}>
        <ListOrdered width={15} height={15} strokeWidth={2.4} />
      </g>
      <text x={206} y={59} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill="var(--ink-3)">
        ORDER BOOK
      </text>
      <text x={BX} y={82} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("bid")}>
        BUY
      </text>
      <text x={SX} y={82} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("ask")}>
        SELL
      </text>
      <motion.rect
        x={PX + 2}
        y={rowY(0) - 15}
        width={PW - 4}
        height={30}
        rx={10}
        fill={toneSoft("see")}
        stroke={toneVar("see")}
        strokeWidth={1.5}
        initial={false}
        animate={{ opacity: matched ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {side(BUYS, true)}
      {side(SELLS, false)}
      {OM_STATUS.map((s, i) => (
        <Txt key={s} x={200} y={194} size={12} weight={750} tone={i === 0 ? "neutral" : "see"} show={beat === i}>
          {s}
        </Txt>
      ))}
      <motion.g initial={false} animate={{ opacity: beat >= 4 ? 1 : 0, y: beat >= 4 ? 0 : 6 }} transition={{ ...spring.soft, opacity: { duration: 0.3 } }}>
        <rect x={140} y={219} width={120} height={26} rx={13} fill={toneSoft("see")} stroke={toneVar("see")} strokeWidth={1.5} />
        <text x={200} y={236.5} textAnchor="middle" className="sc-token" fill={toneVar("see")}>
          TRADE AT 50.10
        </text>
      </motion.g>
    </Stage>
  );
}

// ── Dealers choose clients; order-driven rules don't let them (§5.3.1–5.3.2) ─
export function Counterparty({ beat }: BeatProps) {
  const od = beat >= 2;
  const dealer = box(200, 52, 104, 56);
  const client = box(66, 150, 100, 56);
  const stranger = box(334, 150, 100, 56);
  const book = box(200, 236, 120, 56);
  const safe = box(66, 150, 112, 56);
  // edges run box to box; tokens stop short and are absorbed
  const cd = between(client, dealer);
  const sd = between(stranger, dealer);
  const db = between(dealer, book);
  const sb = between(stranger, book);
  const fb = between(safe, book);
  const tcd = between(client, dealer, 0, 6, 34);
  const tsd = between(stranger, dealer, 0, 6, 34);
  const tdb = between(dealer, book, 0, 6, 36);
  const tsb = between(stranger, book, 0, 6, 36);
  return (
    <Stage h={274} label="A dealer chooses clients in a dealer market but must trade with anyone in an order-driven market">
      <Txt x={16} y={24} anchor="start" size={10.5} weight={800} tone="neutral" className="caps" show={!od}>
        DEALER MARKET
      </Txt>
      <Txt x={16} y={24} anchor="start" size={10.5} weight={800} tone="neutral" className="caps" show={od}>
        ORDER-DRIVEN MARKET
      </Txt>

      <Edge from={cd[0]} to={cd[1]} show={beat <= 1} tone={beat === 0 ? "see" : "neutral"} label="chosen" labelDy={-10} />
      <Edge from={sd[0]} to={sd[1]} show={beat === 1} dashed tone="neutral" />
      <Edge from={db[0]} to={db[1]} show={od} tone="idea" label="posts offer" labelAt={0.42} labelDy={0} />
      <Edge from={sb[0]} to={sb[1]} show={beat >= 3} tone="bid" />
      <Edge from={sd[0]} to={sd[1]} show={beat >= 4} dashed arrow={false} tone="prac" />
      <Txt x={300} y={96} anchor="start" size={12} weight={800} tone="prac" show={beat >= 4} delay={beat === 4 ? 0.4 : 0} className="halo">
        no credit line
      </Txt>
      <Edge from={fb[0]} to={fb[1]} show={beat >= 4} tone="see" />

      <Node {...dealer} icon={Store} label="Dealer" tone="idea" hl={beat === 0 || beat === 2} />
      <Node {...client} icon={UserRound} label="Client" sub="known to her" tone="bid" show={!od} dim={beat === 1} />
      <Node {...safe} icon={ShieldCheck} label="Safeguards" sub="see chapter 7" tone="see" show={beat >= 4} hl />
      <Node {...stranger} icon={UserRound} label="Stranger" sub="unknown" tone="bid" hl={beat === 1 || beat === 3} dim={beat === 0 || beat === 2} />
      <Node {...book} icon={ListOrdered} label="Order book" sub={beat >= 3 ? "offer taken" : "dealer offers 20"} tone="see" show={od} hl={beat === 2 || beat === 3} />

      <Token from={tcd[0]} to={tcd[1]} at={1} show={beat === 0} label="buy 100" tone="bid" absorb />
      <Token from={tsd[0]} to={tsd[1]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="buy 100" tone="bid" absorb />
      <Txt x={stranger.x} y={194} size={12} weight={800} tone="neutral" show={beat === 1} delay={1.0} className="halo">
        turned away
      </Txt>
      <Token from={tdb[0]} to={tdb[1]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="offer 20" tone="ask" absorb />
      <Token from={tsb[0]} to={tsb[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="buy 100" tone="bid" absorb />
      <Txt x={322} y={240} size={12} weight={800} tone="see" show={beat >= 3} delay={beat === 3 ? 1.0 : 0} className="halo">
        must trade
      </Txt>
      <Ping x={book.x} y={book.y} trigger={beat === 3 ? "trade" : "idle"} tone="see" r={40} />
    </Stage>
  );
}

// ── Three auction designs: where the price comes from (§5.3.2, pp. 94–95) ──
const LANES = [
  { y: 62, label: "SINGLE-PRICE AUCTION" },
  { y: 142, label: "CONTINUOUS TWO-SIDED AUCTION" },
  { y: 232, label: "CROSSING NETWORK" },
];
const DOTS = [34, 64, 94, 124, 154, 184, 214];
const CONT = [
  { x: 120, p: "41.02" },
  { x: 220, p: "41.05" },
  { x: 320, p: "40.98" },
];

export function AuctionKinds({ beat }: BeatProps) {
  const laneOp = (k: number) => (beat === k ? 1 : beat > k ? 0.35 : 0);
  const L3 = LANES[2].y;
  return (
    <Stage h={262} label="Single-price, continuous and crossing auctions">
      {LANES.map((l, k) => (
        <motion.g key={l.label} initial={false} animate={{ opacity: laneOp(k) }} transition={{ duration: 0.35, ease: EASE_OUT }}>
          <text x={16} y={l.y - 26} className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("see")}>
            {l.label}
          </text>
          <line x1={16} x2={384} y1={l.y} y2={l.y} stroke="var(--line-strong)" strokeWidth={1.5} />
          <text x={384} y={l.y + 28} textAnchor="end" className="sc-tick">
            time →
          </text>
        </motion.g>
      ))}

      {/* lane 1: orders gather, then one call at one price */}
      <motion.g initial={false} animate={{ opacity: laneOp(0) }} transition={{ duration: 0.35 }}>
        {DOTS.map((x, i) => (
          <motion.circle
            key={x}
            cx={x}
            cy={LANES[0].y}
            r={5.5}
            fill={toneVar(i % 2 ? "ask" : "bid")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25, delay: beat === 0 ? 0.1 + i * 0.09 : 0 }}
          />
        ))}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: beat === 0 ? 0.85 : 0 }}>
          <line x1={250} x2={250} y1={LANES[0].y - 14} y2={LANES[0].y + 14} stroke={toneVar("prac")} strokeWidth={3} strokeLinecap="round" />
          <text x={250} y={LANES[0].y + 30} textAnchor="middle" className="sc-txt" style={{ fontSize: 11.5, fontWeight: 800 }} fill={toneVar("prac")}>
            call
          </text>
        </motion.g>
        <Chip x={322} y={LANES[0].y} w={112} label="all at 41.00" tone="see" delay={beat === 0 ? 1.2 : 0} />
      </motion.g>

      {/* lane 2: trades one by one, prices vary */}
      <motion.g initial={false} animate={{ opacity: laneOp(1) }} transition={{ duration: 0.35 }}>
        {CONT.map((t, i) => (
          <Chip key={t.p} x={t.x} y={LANES[1].y} w={62} label={t.p} tone="see" show={beat >= 1} delay={beat === 1 ? 0.2 + i * 0.45 : 0} />
        ))}
      </motion.g>

      {/* lane 3: price borrowed from another market */}
      <motion.g initial={false} animate={{ opacity: laneOp(2) }} transition={{ duration: 0.35 }}>
        <rect x={262} y={L3 - 58} width={122} height={34} rx={10} fill="var(--node)" stroke="var(--node-line)" strokeWidth={1.25} />
        <text x={323} y={L3 - 44} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 9.5, fontWeight: 800 }} fill="var(--ink-3)">
          MAIN MARKET
        </text>
        <text x={323} y={L3 - 29} textAnchor="middle" className="sc-num" style={{ fontSize: 13, fontWeight: 800 }} fill="var(--ink)">
          last 41.03
        </text>
        <Chip x={150} y={L3} w={136} label="matched at 41.03" tone="see" show={beat >= 2} delay={beat === 2 ? 1.0 : 0} />
      </motion.g>
      <Token from={[262, L3 - 30]} to={[166, L3]} at={beat >= 2 ? 1 : 0} show={beat === 2} label="41.03" tone="prac" duration={0.9} absorb />
    </Stage>
  );
}

// ── Oral auction, electronic matching, manual matching (§5.3.2, p. 95) ─────
const COLS = [
  { x: 70, head: "ORAL AUCTION", label: "Trading pit", sub: "face to face", icon: Users, foot: "rules: who, when" },
  { x: 200, head: "ELECTRONIC", label: "Computer", sub: "rules in software", icon: Cpu, foot: "matched by code" },
  { x: 330, head: "MANUAL", label: "Clerk", sub: "rules on paper", icon: UserRound, foot: "matched by hand" },
];

export function OralVsMatching({ beat }: BeatProps) {
  const op = (k: number) => (beat === k ? 1 : beat > k ? 0.35 : 0);
  const NY = 150;
  return (
    <Stage h={226} label="Oral auction, electronic order matching and manual order matching">
      {COLS.map((c, k) => (
        <motion.g key={c.head} initial={false} animate={{ opacity: op(k) }} transition={{ duration: 0.35, ease: EASE_OUT }}>
          <text x={c.x} y={24} textAnchor="middle" className="sc-txt caps" style={{ fontSize: 10.5, fontWeight: 800 }} fill={toneVar("see")}>
            {c.head}
          </text>
          <Node x={c.x} y={NY} w={116} h={58} icon={c.icon} label={c.label} sub={c.sub} tone="see" hl={beat === k} />
          <text x={c.x} y={NY + 50} textAnchor="middle" className="sc-txt" style={{ fontSize: 12, fontWeight: 750 }} fill="var(--ink-2)">
            {c.foot}
          </text>
        </motion.g>
      ))}
      {/* pit: traders cry out bids and offers */}
      <Chip x={52} y={58} w={64} label="41 bid" tone="bid" show={beat >= 0} dim={beat > 0} delay={beat === 0 ? 0.2 : 0} />
      <Chip x={86} y={92} w={78} label="42 offer" tone="ask" show={beat >= 0} dim={beat > 0} delay={beat === 0 ? 0.6 : 0} />
      {/* electronic and manual: orders travel in to be matched */}
      {[1, 2].map((k) => {
        const x = COLS[k].x;
        const icon = k === 2 ? FileText : undefined;
        return (
          <g key={k}>
            <Token from={[x - 28, 46]} to={[x - 28, 104]} at={beat >= k ? 1 : 0} show={beat === k} label="buy" icon={icon} tone="bid" absorb />
            <Token from={[x + 28, 46]} to={[x + 28, 104]} at={beat >= k ? 1 : 0} show={beat === k} label="sell" icon={icon} tone="ask" absorb />
          </g>
        );
      })}
    </Stage>
  );
}

// ── eBay: a call auction with limit orders, and "buy it now" (box, p. 95) ───
const BIDDERS = [
  { n: "Bidder A", max: 40, y: 50 },
  { n: "Bidder B", max: 62, y: 128 },
  { n: "Bidder C", max: 55, y: 206 },
];

export function EbayAuction({ beat }: BeatProps) {
  const closed = beat >= 2;
  const auc = box(214, 128, 108, 58);
  const seller = box(348, 128, 92, 56);
  const escrow = box(214, 232, 112, 56);
  const nodes = BIDDERS.map((b) => box(56, b.y, 92, 56));
  const toEsc = between(nodes[1], escrow);
  const escToSeller = between(escrow, seller);
  const tToEsc = between(nodes[1], escrow, 0, 6, 30);
  const tEscToSeller = between(escrow, seller, 0, 6, 30);
  return (
    <Stage h={268} label="An eBay auction: limit-order bids, a buy-it-now offer, the close and settlement">
      {BIDDERS.map((b, i) => {
        const e = between(nodes[i], auc);
        const t = between(nodes[i], auc, 0, 6, 34);
        const win = i === 1;
        return (
          <g key={b.n}>
            <Edge from={e[0]} to={e[1]} show={beat <= 2} tone={closed && win ? "see" : "neutral"} arrow={false} />
            <Node {...nodes[i]} icon={UserRound} label={b.n} sub={`max $${b.max}`} tone="bid" hl={closed && win && beat === 2} dim={(closed && !win) || beat === 1} />
            <Token from={t[0]} to={t[1]} at={1} show={beat === 0} label={`$${b.max}`} tone="bid" absorb delay={0.15 * i} />
          </g>
        );
      })}
      <Node {...auc} icon={Gavel} label="Auction" sub={closed ? "closed: B wins" : "3 limit orders"} tone="see" hl={beat === 0 || beat === 2} dim={beat === 1 || beat === 3} />
      <Ping x={auc.x} y={auc.y} trigger={beat === 2 ? "close" : "open"} tone="see" r={44} />
      <Node {...seller} icon={UserRound} label="Seller" sub="one item" tone="ask" hl={beat === 1} dim={beat === 0 || beat === 2} />
      <Chip x={seller.x} y={70} w={128} label="buy it now $70" tone="ask" show={beat >= 1 && beat <= 2} dim={beat === 2} delay={beat === 1 ? 0.15 : 0} />
      <Txt x={seller.x} y={78} size={12} weight={800} tone="neutral" show={beat >= 3}>
        rated ★ 4.9
      </Txt>
      <Txt x={auc.x} y={188} size={12} weight={750} tone="ask" show={beat === 1} delay={0.3} className="halo">
        any buyer may take it
      </Txt>

      <Edge from={toEsc[0]} to={toEsc[1]} show={beat >= 3} dashed tone="see" />
      <Edge from={escToSeller[0]} to={escToSeller[1]} show={beat >= 3} dashed tone="see" />
      <Node {...escrow} icon={ShieldCheck} label="Escrow" sub="optional" tone="see" show={beat >= 3} hl />
      <Token from={tToEsc[0]} to={tToEsc[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="payment" tone="cash" absorb />
      <Token from={tEscToSeller[0]} to={tEscToSeller[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="payment" tone="cash" absorb delay={1.3} />
    </Stage>
  );
}

// ── A broker searches for the other side of a block (§5.3.3, p. 95) ───────
const FUNDS = [
  { n: "Fund A", y: 50, yes: false },
  { n: "Fund B", y: 150, yes: true },
  { n: "Fund C", y: 250, yes: false },
];
const lerp = (a: readonly [number, number], b: readonly [number, number], t: number): [number, number] => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

export function BrokerSearch({ beat }: BeatProps) {
  const client = box(52, 40, 92, 56);
  const book = box(56, 150, 100, 56);
  const broker = box(190, 150, 100, 56);
  const funds = FUNDS.map((f) => box(350, f.y, 88, 56));
  const cb = between(client, broker);
  const tcb = between(client, broker, 0, 6, 30);
  const tbB = between(broker, funds[1], 0, 6, 30);
  return (
    <Stage h={286} label="A broker phones possible buyers to find the other side of a block">
      <Edge from={cb[0]} to={cb[1]} show tone={beat === 0 ? "ask" : beat >= 3 ? "see" : "neutral"} />
      {funds.map((f, i) => {
        const e = between(broker, f, 0, 6, 6);
        const yes = FUNDS[i].yes;
        const at = lerp(e[0], e[1], yes ? 0.5 : 0.62);
        return (
          <g key={FUNDS[i].n}>
            <Edge from={e[0]} to={e[1]} show={beat >= 1} dashed={!(yes && beat >= 2)} tone={beat >= 2 ? (yes ? "see" : "neutral") : "neutral"} />
            <Txt x={at[0]} y={at[1] + (yes ? -9 : 5)} size={12} weight={800} tone={yes ? "see" : "neutral"} show={beat === 2} delay={0.2 + 0.25 * i} className="halo">
              {yes ? "yes" : "no"}
            </Txt>
            <Node {...f} icon={UserRound} label={FUNDS[i].n} sub="might buy" tone="bid" hl={(beat === 2 || beat === 3) && yes} dim={beat === 0 || (beat >= 2 && !yes)} />
          </g>
        );
      })}
      <Node {...client} icon={UserRound} label="Client" sub="sells a block" tone="ask" hl={beat === 0} dim={beat === 1 || beat === 2} />
      <Node {...book} icon={ListOrdered} label="Public book" sub="no bids for it" tone="prac" hl={beat === 0} dim={beat >= 1} />
      <Node {...broker} icon={Handshake} label="Broker" sub="searches" tone="see" hl={beat >= 1} />
      <Token from={tcb[0]} to={tcb[1]} at={1} show={beat === 0} label="sell block" tone="ask" absorb />
      {funds.map((f, i) => {
        const e = between(broker, f, 0, 6, 34);
        return <Token key={i} from={e[0]} to={e[1]} at={beat >= 1 ? 1 : 0} show={beat === 1} label="" icon={Phone} tone="see" absorb delay={0.15 * i} />;
      })}
      <Token from={tcb[0]} to={tcb[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="block" tone="ask" duration={0.6} absorb />
      <Token from={tbB[0]} to={tbB[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="block" tone="ask" duration={0.6} delay={0.65} absorb />
      <Txt x={broker.x} y={broker.y + 48} size={12} weight={800} tone="see" show={beat >= 3} delay={beat === 3 ? 1.2 : 0} className="halo">
        trade arranged
      </Txt>
    </Stage>
  );
}

// ── Concealed and latent traders: liquidity nobody posted (§5.3.3, p. 95) ──
export function HiddenLiquidity({ beat }: BeatProps) {
  const book = box(200, 42, 150, 56);
  const broker = box(200, 138, 104, 56);
  const conc = box(70, 238, 112, 56);
  const lat = box(330, 238, 112, 56);
  const toC = between(broker, conc, 0, 6, 30);
  const toL = between(broker, lat, 0, 6, 30);
  const cE = between(conc, broker, 0, 6, 6);
  const lE = between(broker, lat, 0, 6, 6);
  return (
    <Stage h={274} label="A broker finds a concealed seller and a latent buyer who never posted orders">
      <Node {...book} icon={ListOrdered} label="Public book" sub={beat >= 4 ? "still empty" : "empty"} tone="prac" hl={beat === 0 || beat === 4} dim={beat >= 1 && beat <= 3} />
      <Edge from={cE[0]} to={cE[1]} show={beat >= 4} tone="see" arrow={false} />
      <Edge from={lE[0]} to={lE[1]} show={beat >= 4} tone="see" arrow={false} />
      <Node {...broker} icon={Handshake} label="Broker" sub="presents a deal" tone="see" hl={beat >= 3} dim={beat <= 2} />
      <Node {...conc} icon={UserRound} label="Concealed" sub="knows, hides" tone="ask" hl={beat === 1} dim={beat === 0 || beat === 2} />
      <Node {...lat} icon={UserRound} label="Latent" sub="hasn't decided" tone="bid" hl={beat === 2} dim={beat <= 1} />
      <Chip x={62} y={190} w={118} label="sell 2M · hidden" tone="ask" dashed show={beat === 1 || beat === 2} dim={beat === 2} />
      <Chip x={62} y={190} w={78} label="sell 2M" tone="ask" show={beat >= 3} delay={beat === 3 ? 0.9 : 0} />
      <Chip x={338} y={190} w={104} label="no plan yet" dashed show={beat === 2} />
      <Chip x={338} y={190} w={72} label="buy 2M" tone="bid" show={beat >= 3} delay={beat === 3 ? 0.9 : 0} />
      <Token from={toC[0]} to={toC[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="deal?" tone="see" absorb />
      <Token from={toL[0]} to={toL[1]} at={beat >= 3 ? 1 : 0} show={beat === 3} label="deal?" tone="see" absorb />
      <Txt x={200} y={196} size={12} weight={800} tone="see" show={beat >= 4} className="halo">
        trade: 2M shares
      </Txt>
    </Stage>
  );
}

// ── Hybrid markets: the book's NYSE and Nasdaq as mixes (§5.3.4, p. 96) ────
type Seg = { key: string; label: string; tone: "idea" | "see" | "game" };
const QD: Seg = { key: "qd", label: "quote-driven", tone: "idea" };
const OD: Seg = { key: "od", label: "order-driven", tone: "see" };
const BRK: Seg = { key: "br", label: "brokered", tone: "game" };
const BAR_X = 96;

function MixBar({ y, name, segs, widths, show }: { y: number; name: string; segs: { seg: Seg; label: string }[]; widths: number[]; show: boolean }) {
  let x = BAR_X;
  return (
    <motion.g initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3 }}>
      <text x={16} y={y + 5} className="sc-txt" style={{ fontSize: 14, fontWeight: 800 }} fill="var(--ink)">
        {name}
      </text>
      <rect x={BAR_X} y={y - 17} width={292} height={34} rx={10} fill="var(--surface-2)" />
      {segs.map(({ seg, label }, i) => {
        const w = widths[i];
        const sx = x;
        x += w;
        return (
          <g key={seg.key}>
            <motion.rect
              y={y - 17}
              height={34}
              rx={8}
              fill={toneSoft(seg.tone)}
              stroke={toneVar(seg.tone)}
              strokeWidth={1.5}
              initial={false}
              animate={{ x: sx, width: Math.max(0, w - 2), opacity: w > 0 ? 1 : 0 }}
              transition={spring.fill}
            />
            <motion.text
              y={y + 4.5}
              textAnchor="middle"
              className="sc-txt"
              style={{ fontSize: 11.5, fontWeight: 800 }}
              fill={toneVar(seg.tone)}
              initial={false}
              animate={{ x: sx + w / 2, opacity: w > 0 ? 1 : 0 }}
              transition={{ x: spring.fill, opacity: { duration: 0.3, delay: w > 0 ? 0.25 : 0 } }}
            >
              {label}
            </motion.text>
          </g>
        );
      })}
    </motion.g>
  );
}

export function HybridMix({ beat }: BeatProps) {
  const nyse = beat >= 3 ? [148, 86, 58] : beat >= 1 ? [206, 86, 0] : [0, 0, 0];
  const nasdaq = beat >= 3 ? [148, 86, 58] : beat >= 2 ? [206, 86, 0] : [0, 0, 0];
  const lit = (k: string) => (beat === 1 ? k !== "br" : beat === 2 ? k !== "br" : beat === 3 ? k === "br" : true);
  return (
    <Stage h={266} label="The NYSE and Nasdaq each mix features of the three pure execution systems">
      {[
        { s: QD, x: 70, icon: Store, label: "Quote-driven" },
        { s: OD, x: 200, icon: ListOrdered, label: "Order-driven" },
        { s: BRK, x: 330, icon: Handshake, label: "Brokered" },
      ].map((p) => (
        <Node key={p.s.key} x={p.x} y={50} w={118} h={52} icon={p.icon} label={p.label} tone={p.s.tone} hl={beat === 0 || (beat > 0 && lit(p.s.key))} dim={beat > 0 && !lit(p.s.key)} />
      ))}
      <MixBar
        y={140}
        name="NYSE"
        show={beat >= 1}
        segs={[
          { seg: OD, label: "order-driven" },
          { seg: QD, label: "specialist" },
          { seg: BRK, label: "blocks" },
        ]}
        widths={nyse}
      />
      <MixBar
        y={210}
        name="Nasdaq"
        show={beat >= 2}
        segs={[
          { seg: QD, label: "quote-driven" },
          { seg: OD, label: "limit orders" },
          { seg: BRK, label: "blocks" },
        ]}
        widths={nasdaq}
      />
      <Txt x={384} y={252} anchor="end" size={11} weight={650} tone="neutral" show={beat >= 1}>
        as the book describes them (2003) · widths not to scale
      </Txt>
    </Stage>
  );
}

// ── Table 5-1, row by row (§5.3.5, p. 96) ──────────────────────────────────
const TCOLS = [
  { x0: 8, x1: 88, head: ["MARKET", "TYPE"] },
  { x0: 88, x1: 200, head: ["WHO OFFERS", "LIQUIDITY?"] },
  { x0: 200, x1: 290, head: ["WHO", "ARRANGES?"] },
  { x0: 290, x1: 392, head: ["HOW", "MATCHED?"] },
];
const TROWS: string[][][] = [
  [["Dealer", "markets"], ["Dealers"], ["Dealers"], ["Clients choose", "dealers"]],
  [["Oral", "auctions"], ["Dealers + public", "limit orders"], ["Traders"], ["Rules regulate", "negotiations"]],
  [["Order-", "matching"], ["Limit order", "traders"], ["Brokerages", "or exchanges"], ["Rules match", "orders"]],
  [["Brokered", "markets"], ["Public traders"], ["Brokers"], ["Brokers match", "traders"]],
];
const T_TOP = 58;
const T_ROW = 48;

export function TableBuild({ beat }: BeatProps) {
  const col1 = beat >= 4;
  return (
    <Stage h={T_TOP + 4 * T_ROW + 8} label="Table 5-1: who offers liquidity, who arranges trades and how buyers and sellers are matched">
      <motion.rect
        x={TCOLS[1].x0 + 2}
        y={14}
        width={TCOLS[1].x1 - TCOLS[1].x0 - 4}
        height={T_TOP + 4 * T_ROW - 14}
        rx={10}
        fill={toneSoft("see")}
        stroke={toneVar("see")}
        strokeWidth={1.5}
        initial={false}
        animate={{ opacity: col1 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {TCOLS.map((c) => (
        <text key={c.head[0]} x={(c.x0 + c.x1) / 2} className="sc-txt caps" textAnchor="middle" style={{ fontSize: 9.5, fontWeight: 800 }} fill={c === TCOLS[1] && col1 ? toneVar("see") : "var(--ink-3)"}>
          <tspan x={(c.x0 + c.x1) / 2} y={30}>
            {c.head[0]}
          </tspan>
          <tspan x={(c.x0 + c.x1) / 2} y={43}>
            {c.head[1]}
          </tspan>
        </text>
      ))}
      {TROWS.map((row, i) => {
        const top = T_TOP + i * T_ROW;
        const on = beat >= i;
        const now = beat === i;
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on ? (col1 || now ? 1 : 0.55) : 0, x: on ? 0 : 12 }} transition={{ ...spring.soft, opacity: { duration: 0.3 } }}>
            <line x1={8} x2={392} y1={top} y2={top} stroke="var(--line)" strokeWidth={1} />
            <motion.rect
              x={6}
              y={top + 2}
              width={388}
              height={T_ROW - 4}
              rx={10}
              fill={toneSoft("see")}
              stroke={toneVar("see")}
              strokeWidth={1.5}
              initial={false}
              animate={{ opacity: now && !col1 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            {row.map((cell, j) => {
              const cx = (TCOLS[j].x0 + TCOLS[j].x1) / 2;
              const y0 = cell.length === 1 ? top + 28 : top + 20;
              return (
                <text
                  key={j}
                  textAnchor="middle"
                  className="sc-txt"
                  style={{ fontSize: j === 0 ? 12.5 : 11.5, fontWeight: j === 0 ? 800 : 650 }}
                  fill={j === 0 ? "var(--ink)" : "var(--ink-2)"}
                >
                  {cell.map((line, k) => (
                    <tspan key={k} x={cx} y={y0 + k * 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            })}
          </motion.g>
        );
      })}
    </Stage>
  );
}
