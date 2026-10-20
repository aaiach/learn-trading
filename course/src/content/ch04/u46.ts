// 4.6 MARKET-IF-TOUCHED ORDERS (p. 80)
import type { Cite, Unit } from "../types.ts";
import { FourAtFive, MitVsLimit, StopVsMit } from "./illus/u46.tsx";
import { TriggerLab } from "./games/TriggerLab.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 4.6 ───────────────────────────────────────────────────────────
const MIT_DEF = c(80, "4.6", "A market-if-touched order (MIT) is a market order that is activated when price reaches (touches) some preset touch price.");
const MIT_DIR = c(80, "4.6", "In contrast to stop orders, traders submit market-if-touched orders to buy when prices fall to their touch prices or to sell when prices rise to their touch prices.");
const MIT_LIKE = c(80, "4.6", "Market-if-touched orders are like standing limit orders because traders can use both order types to buy when prices drop and to sell when prices increase.");
const MIT_DIFF = c(80, "4.6", "They differ from limit orders because, upon activation, market-if-touched orders become market orders that will fill at the best available price.");
const MIT_LIMIT = c(80, "4.6", "In contrast, limit orders must trade at their limit price or better. Otherwise, they will not trade.");
const MIT_SURE = c(80, "4.6", "Traders use market-if-touched orders instead of limit orders when they want to be sure that they will trade if prices reach their touch prices.");
const MIT_RARE = c(80, "4.6", "Most traders use limit orders rather than market-if-touched orders when they want to wait for prices to move in their favor.");
const MIT_LIQ = c(80, "4.6", "Market-if-touched orders demand liquidity in a narrow sense and supply liquidity in a broader sense.");
const MIT_NARROW = c(80, "4.6", "When they are triggered, they become standard market orders that demand immediacy.");
const MIT_BROAD = c(80, "4.6", "they supply liquidity in a broader sense because they offer liquidity to traders who push prices to their touch prices. They thus decrease the price impacts of other traders.");
const MIT_STAB = c(80, "4.6", "Traders who issue market-if-touched orders stabilize the market because they trade against the motion of the market. They buy when the market is falling and sell when it is rising.");

// ── Excerpts: Table 4-2 (p. 80), sell orders with price contingencies set at £5 ──
const T42 = (t: string): Cite => c(80, "4.6", t, { table: "Table 4-2" });
const T42_TITLE = T42("Differences Among Sell Orders with Various Price Contingencies Set at £5");
const T42_LIMIT = T42("Standing limit sell order with a £5 limit price · Common · Below £5 · After price rises to or above the limit price · At or above the limit price");
const T42_STOP = T42("Market stop sell order with a £5 stop price · Occasional · Above £5 · After price falls to the stop price · Whatever the market will bear after the order is activated");
const T42_SL = T42("Limit-stop sell order with a £5 limit price and a £5 stop price · Rare · Above £5 · After price falls to the stop price and then when price is at or above the limit price · At or above the limit price");
const T42_MIT = T42("Market-if-touched sell order with a £5 touch price · Very rare · Below £5 · After price rises to or above the touch price · Whatever the market will bear after the order is activated");
const T42_USAGE = T42("Standing limit sell: Common · Market stop sell: Occasional · Limit-stop sell: Rare · Market-if-touched sell: Very rare");
const T42_SUBMIT = T42("Standing limit sell: Below £5 · Market stop sell: Above £5 · Limit-stop sell: Above £5 · Market-if-touched sell: Below £5");
const T44_MIT = c(87, "4.12", "Market-if-touched order · Very rare · Demands immediacy and supplies resiliency · Fast execution following trigger · Uncertain price impact", { table: "Table 4-4" });

export const U46: Unit = {
  sec: "4.6",
  title: "Market-If-Touched Orders",
  pages: "80",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.6-mit",
      sec: "4.6",
      title: "Market-if-touched orders",
      pages: "80",
      imp: 2,
      steps: [
        {
          kind: "definition",
          term: "Market-if-touched order",
          aka: ["MIT"],
          body: "A **market order** that activates when price **touches** a preset **touch price**.",
          cite: MIT_DEF,
        },
        {
          kind: "idea",
          title: "The mirror image of a stop",
          body: "An MIT **buys** when prices **fall** to the touch price and **sells** when they **rise** to it: the opposite direction to a stop order.",
          cite: MIT_DIR,
        },
        {
          kind: "see",
          title: "Buy stop above, buy MIT below",
          illus: StopVsMit,
          beats: [
            { text: "Price is 50. A **buy stop** waits above at 52; a **buy MIT** waits below at 48 (our numbers)." },
            { text: "Price **rises** to 52: the buy stop fires and buys into the rise." },
            { text: "Later price **falls** to 48: the buy MIT fires and buys into the dip.", cite: MIT_DIR },
            { text: "Both become **market orders** once triggered. The stop follows the move; the MIT leans **against** it.", cite: MIT_STAB },
          ],
        },
        {
          kind: "truefalse",
          q: "A **sell** market-if-touched order activates when price **falls** to its touch price.",
          answer: false,
          why: "MITs sell when prices **rise** to the touch price and buy when they fall: the opposite of stops.",
          cite: MIT_DIR,
        },
        {
          kind: "choice",
          q: "Upon activation, what does a market-if-touched order become?",
          options: ["A market order that fills at the best available price", "A limit order at the touch price", "A stop order at the touch price", "An order that waits for a better price"],
          answer: 0,
          why: "Once touched, an MIT is a **market order**: it fills at the best available price.",
          cite: MIT_DIFF,
        },
        {
          kind: "idea",
          title: "Like a limit order, with one difference",
          body: "Both buy on dips and sell on rallies. But a triggered MIT takes **whatever price** is available, while a limit order must get its **limit price or better**.",
          cite: MIT_LIKE,
        },
        {
          kind: "see",
          title: "Same touch price, different result",
          illus: MitVsLimit,
          beats: [
            { text: "Two buy orders wait at **48**: a **limit buy** and an **MIT buy** (our numbers)." },
            { text: "Price touches 48 for a moment. Only a few shares trade there, and buyers who were already bidding 48 get them (our assumption)." },
            { text: "The **MIT** fires and becomes a market order: it buys at the best offer, 48.10.", cite: MIT_DIFF },
            { text: "Price bounces away. The **limit** order never traded: it must get 48 or better.", cite: MIT_LIMIT },
            { text: "The trade-off: the MIT is **sure to trade** once price touches; the limit order **controls the price**.", cite: MIT_SURE },
          ],
        },
        {
          kind: "choice",
          q: "Why would a trader choose an MIT instead of a limit order?",
          options: ["To be sure of trading if prices reach the touch price", "To get a better price than the touch price", "To avoid demanding liquidity", "To keep the order hidden"],
          answer: 0,
          why: "An MIT gives up price control for certainty: it **will trade** once prices touch the touch price.",
          cite: MIT_SURE,
        },
        {
          kind: "truefalse",
          q: "Most traders who want to wait for prices to move in their favor use market-if-touched orders rather than limit orders.",
          answer: false,
          why: "MITs are **quite uncommon**. Most traders use **limit orders** to wait for a better price.",
          cite: MIT_RARE,
        },
        {
          kind: "quote",
          lead: "A liquidity puzzle, solved in one line:",
          cite: MIT_LIQ,
          mark: ["narrow sense", "broader sense"],
        },
        {
          kind: "choice",
          q: "In what **broader** sense do MIT orders supply liquidity?",
          options: [
            "They give traders who push prices to the touch price someone to trade with",
            "They rest in the limit order book",
            "They are displayed to all traders",
            "They trade only at the touch price",
          ],
          answer: 0,
          why: "Waiting MITs **offer liquidity to traders who push prices** to the touch price, which lowers those traders' price impacts.",
          cite: MIT_BROAD,
        },
        {
          kind: "truefalse",
          q: "Traders who issue MIT orders stabilize the market because they trade against its motion.",
          answer: true,
          why: "They **buy when the market falls** and **sell when it rises**, like contrarians.",
          cite: MIT_STAB,
        },
        {
          kind: "recap",
          points: [
            { text: "An **MIT** is a market order activated when price **touches** the touch price.", cite: MIT_DEF },
            { text: "It buys on falls and sells on rises, like a limit order, but fills at **any** available price: sure to trade.", cite: MIT_SURE },
            { text: "It demands liquidity narrowly, supplies it broadly, and **stabilizes** prices.", cite: MIT_STAB },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.6-compare",
      sec: "4.6",
      title: "Four sell orders at £5",
      pages: "80",
      imp: 3,
      steps: [
        {
          kind: "idea",
          title: "Same £5, four different orders",
          body: "Table 4-2 sets four **sell** orders at **£5**. They differ in **where price starts**, **what triggers** them and **what price** they get.",
          cite: T42_TITLE,
        },
        {
          kind: "see",
          title: "Table 4-2, one order at a time",
          illus: FourAtFive,
          beats: [
            { text: "**Standing limit sell**: placed while price is **below** £5. It trades once price **rises** to £5, at £5 **or better**.", cite: T42_LIMIT },
            { text: "**Market stop sell**: placed while price is **above** £5. When price **falls** to £5 it sells at **whatever the market will bear**.", cite: T42_STOP },
            { text: "**Limit-stop sell** (a stop limit order): placed **above** £5. Price falls to £5, then it may sell only at **£5 or more**.", cite: T42_SL },
            { text: "**Market-if-touched sell**: placed **below** £5. When price **rises** to £5 it sells at **whatever the market will bear**.", cite: T42_MIT },
            { text: "How often traders use them: **common**, **occasional**, **rare**, **very rare**.", cite: T42_USAGE },
          ],
        },
        {
          kind: "match",
          q: "How often do traders use each £5 sell order? (Table 4-2)",
          pairs: [
            ["Standing limit sell", "Common"],
            ["Market stop sell", "Occasional"],
            ["Limit-stop sell", "Rare"],
            ["Market-if-touched sell", "Very rare"],
          ],
          cite: T42_USAGE,
        },
        {
          kind: "classify",
          q: "Where is the market price when you submit each £5 sell order? (Table 4-2)",
          buckets: ["Below £5", "Above £5"],
          items: [
            { text: "Standing limit sell", bucket: 0, why: "It waits for price to rise to £5." },
            { text: "Market stop sell", bucket: 1, why: "It waits for price to fall to £5." },
            { text: "Limit-stop sell", bucket: 1, why: "Its stop waits for price to fall to £5." },
            { text: "Market-if-touched sell", bucket: 0, why: "It waits for price to rise and touch £5." },
          ],
          cite: T42_SUBMIT,
        },
        {
          kind: "multi",
          q: "Once activated, which £5 sell orders trade at **whatever the market will bear**?",
          options: ["Standing limit sell", "Market stop sell", "Limit-stop sell", "Market-if-touched sell"],
          answer: [1, 3],
          why: "The **market stop** and the **MIT** both become market orders. The limit and the limit-stop must get **£5 or more**.",
          cite: T42_STOP,
        },
        {
          kind: "game",
          id: "trigger-lab",
          title: "Trigger lab",
          brief: "Each round arms two **£5 sell orders** and shows how the price starts. Predict what each order does: **no trade**, **sells at £5 or more**, or **sells below £5**. Then run the tape and watch the triggers fire.",
          game: TriggerLab,
        },
        {
          kind: "choice",
          q: "Price is £5.40 and falling. Bad news: it jumps from £5.10 straight to £4.70. What happens to a **market stop sell** at £5 (our numbers)?",
          options: ["It sells, at about £4.70 or lower", "It sells at exactly £5", "It doesn't trade, because £5 never traded", "It turns into a limit order at £5"],
          answer: 0,
          why: "Price has fallen through the stop, so the order activates and sells at **whatever the market will bear**: well under £5.",
          cite: T42_STOP,
        },
        {
          kind: "truefalse",
          q: "A limit-stop sell order (£5 stop, £5 limit) can fail to trade even after price falls to £5.",
          answer: true,
          why: "After the stop fires, it may sell only when price is **at or above £5**. If price keeps falling, it never trades.",
          cite: T42_SL,
        },
        {
          kind: "multi",
          q: "If they trade at all, which £5 sell orders are sure to get **at least £5**?",
          options: ["Standing limit sell", "Market stop sell", "Limit-stop sell", "Market-if-touched sell"],
          answer: [0, 2],
          why: "Orders with a **limit price** trade at the limit or better. The market stop and the MIT take whatever the market will bear.",
          cite: T42_LIMIT,
        },
        {
          kind: "recap",
          points: [
            { text: "**Limit** and **MIT** sells wait below £5 for a rise; **stop** and **limit-stop** sells wait above £5 for a fall.", cite: T42_SUBMIT },
            { text: "Orders with a **limit** get £5 or better but may not trade; **stop** and **MIT** take whatever the market will bear.", cite: T42_MIT },
            { text: "Usage: limit common, stop occasional, limit-stop rare, MIT very rare.", cite: T42_USAGE },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "A **buy** market-if-touched order activates when…",
      options: ["price falls to the touch price", "price rises to the touch price", "the market opens", "the order is touched by a broker"],
      answer: 0,
      why: "MITs **buy when prices fall** to the touch price and sell when prices rise to it.",
      cite: MIT_DIR,
    },
    {
      kind: "truefalse",
      q: "A standing limit sell order at £5 is usually submitted while the market price is below £5.",
      answer: true,
      why: "It waits **below** the market for price to rise to £5 (Table 4-2).",
      cite: T42_LIMIT,
    },
    {
      kind: "truefalse",
      q: "Once triggered, an MIT becomes a standard market order that demands immediacy.",
      answer: true,
      why: "That is the **narrow** sense in which MITs demand liquidity.",
      cite: MIT_NARROW,
    },
    {
      kind: "choice",
      q: "Table 4-4 lists the market-if-touched order's effect on liquidity as…",
      options: ["Demands immediacy and supplies resiliency", "Supplies liquidity only", "Demands liquidity when it is least available", "Broker decides whether to offer or take liquidity"],
      answer: 0,
      why: "Triggered MITs **demand immediacy**; waiting ones help prices recover, **supplying resiliency**.",
      cite: T44_MIT,
    },
  ],
};
