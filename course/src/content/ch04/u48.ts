// 4.8 MARKET-NOT-HELD ORDERS (p. 82)
import type { Cite, Unit } from "../types.ts";
import { HeldVsNotHeld, WorkLarge } from "./illus/u48.tsx";
import { WorkTheOrder } from "./games/WorkTheOrder.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const NH_DEF = c(82, "4.8", "Market-not-held orders are orders that brokers do not need to fill immediately. Traders use this order instruction to tell their brokers to use their discretion when filling their orders.");
const OFFER_TAKE = c(82, "4.8", "The brokers then can offer liquidity or take liquidity according to current market conditions.");
const ON_BEHALF = c(82, "4.8", "Traders give their brokers market-not-held orders when they want their brokers to make order strategy decisions on their behalf.");
const BETTER = c(82, "4.8", "Brokers are often better traders than their clients are because they have more experience, and because they generally know more about current market conditions.");
const RISK_WAIT = c(82, "4.8", "When brokers decide to wait to obtain better prices, they risk trading at worse prices if prices move away from them.");
const NOT_ACCOUNT = c(82, "4.8", "Traders submit market-not-held orders to indicate that they will not hold their brokers accountable for failing to trade.");
const HELD = c(82, "4.8", "Traders who submit standard market orders can hold their brokers accountable for failing to trade if suitable opportunities were available.");
const LEGAL = c(82, "4.8", "Market order traders often can use legal remedies to compel their brokers to provide them with the executions that they would have received had their brokers not been negligent.");
const RECOURSE = c(82, "4.8", "Their only recourse is to withhold future orders from brokers who do not provide them with consistently good service.");
const LARGE = c(82, "4.8", "Traders most often use market-not-held orders when they give their brokers large orders to fill.");
const IMPACT = c(82, "4.8", "Large orders, if exposed all at once, can have very large market impacts.");
const EXPOSURE = c(82, "4.8", "To minimize these price impacts, brokers carefully control the exposure of large orders by revealing only small portions and only to traders they deem likely and able to trade the other side.");
const WAITING = c(82, "4.8", "Market-not-held orders ensure that brokers will not be held accountable for failing to trade if prices move away while they are waiting for better prices or for more size.");
const FLOOR = c(82, "4.8", "Traders most commonly give market-not-held orders to brokers who work on the floor of an exchange.");
const FLOOR_KNOW = c(82, "4.8", "Floor traders generally know more about market conditions than do any other traders.");
const DESKS = c(82, "4.8", "Some traders also give market-not-held orders to brokers who operate electronic order desks that use complex econometric models to formulate optimal order submission strategies.");
const T44_NH = c(87, "4.12", "Market-not-held order · Common among institutions · Broker decides whether to offer or take liquidity · Whatever the broker decides · Expert brokers may make better trading decisions with better information · Trader loses control over the broker", { table: "Table 4-4" });

export const U48: Unit = {
  sec: "4.8",
  title: "Market-Not-Held Orders",
  pages: "82",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.8-not-held",
      sec: "4.8",
      title: "Market-not-held orders",
      pages: "82",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Market-not-held order",
          body: "An order the broker **need not fill immediately**. The broker uses its **discretion**: it may offer liquidity or take it, as conditions allow.",
          cite: NH_DEF,
        },
        {
          kind: "idea",
          title: "Why hand over the decisions?",
          body: "Brokers are often **better traders** than their clients: more **experience**, and more knowledge of **current market conditions**.",
          cite: BETTER,
        },
        {
          kind: "see",
          title: "Held or not held?",
          illus: HeldVsNotHeld,
          beats: [
            { text: "A **standard market order** (our numbers): the broker trades at once, at the best price available, **20.05**." },
            { text: "If the broker sat on it and missed a fill that was available, the client could **hold the broker accountable**.", cite: HELD },
            { text: "A **market-not-held** order: the broker may wait. Here it rests a bid at **20.01**, hoping for a better price.", cite: OFFER_TAKE },
            { text: "Prices move away. The broker ends up paying **20.15**. That is the risk of waiting.", cite: RISK_WAIT },
            { text: "The client agreed in advance **not to hold** the broker accountable for this.", cite: NOT_ACCOUNT },
          ],
        },
        {
          kind: "choice",
          q: "What does a market-not-held order let the broker do?",
          options: [
            "Decide when and how to fill it: offer liquidity or take it",
            "Cancel the order whenever prices rise",
            "Trade only at the opening price",
            "Fill it only on an uptick",
          ],
          answer: 0,
          why: "The broker uses its **discretion**: it can offer or take liquidity according to current market conditions.",
          cite: OFFER_TAKE,
        },
        {
          kind: "truefalse",
          q: "A broker holding a market-not-held order must fill it **immediately**.",
          answer: false,
          why: "That's the point of the instruction: brokers **do not need to fill** market-not-held orders immediately.",
          cite: NH_DEF,
        },
        {
          kind: "idea",
          title: "Standard market orders are held",
          body: "With a **standard market order**, a broker who negligently misses an available fill can be **held accountable**, often with **legal remedies**.",
          cite: LEGAL,
        },
        {
          kind: "idea",
          title: "Not held: no claim, only your feet",
          body: "Not-held clients give up those rights. Their **only recourse** is to send future orders to **other brokers**.",
          cite: RECOURSE,
        },
        {
          kind: "classify",
          q: "Standard market order or market-not-held order?",
          buckets: ["Market order (held)", "Market-not-held"],
          items: [
            { text: "The broker must trade at the best price available now.", bucket: 0, why: "A standard market order trades immediately at the best available price." },
            { text: "The broker may wait for a better price.", bucket: 1, why: "Not-held orders need not be filled immediately." },
            { text: "The client can use legal remedies if the broker negligently missed a fill.", bucket: 0, why: "Market order traders can hold their brokers accountable." },
            { text: "If prices run away, the client's only recourse is to take future orders elsewhere.", bucket: 1, why: "Not-held clients give up the right to hold the broker accountable." },
            { text: "The broker may rest a bid and offer liquidity.", bucket: 1, why: "With discretion, the broker can offer liquidity or take it." },
          ],
          cite: HELD,
        },
        {
          kind: "choice",
          q: "Prices run away while a broker waits on a client's not-held order. What can the client do?",
          options: [
            "Withhold future orders from that broker",
            "Sue for the price it could have had",
            "Force the broker to fill at the earlier price",
            "Cancel the trade after it settles",
          ],
          answer: 0,
          why: "Not-held clients can't hold the broker accountable. Their **only recourse** is to withhold future orders.",
          cite: RECOURSE,
        },
        {
          kind: "fill",
          q: "Traders submit market-not-held orders to indicate that they will not hold their brokers ___ for failing to ___.",
          bank: ["accountable", "trade", "responsible", "cancel", "report"],
          answer: ["accountable", "trade"],
          why: "Not held means the client won't hold the broker **accountable** for failing to **trade**.",
          cite: NOT_ACCOUNT,
        },
        {
          kind: "choice",
          q: "Why do traders hand order strategy decisions to their brokers?",
          options: [
            "Brokers often have more experience and know more about current market conditions",
            "Brokers must guarantee the best price of the day",
            "Brokers pay the client's commissions on not-held orders",
            "Exchanges require it for orders above 100 shares",
          ],
          answer: 0,
          why: "Brokers are often **better traders**: more experience and better knowledge of current conditions.",
          cite: BETTER,
        },
        {
          kind: "recap",
          points: [
            { text: "A **market-not-held** order lets the broker use **discretion**: no need to fill immediately.", cite: NH_DEF },
            { text: "Standard market orders are **held**: a negligent broker can be held accountable.", cite: HELD },
            { text: "Not-held clients accept the risk of waiting; their **only recourse** is to send orders elsewhere.", cite: RECOURSE },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.8-large-orders",
      sec: "4.8",
      title: "Working large orders",
      pages: "82",
      imp: 3,
      steps: [
        { kind: "idea", title: "Large orders go not held", body: "Traders most often use market-not-held orders for **large orders**.", cite: LARGE },
        { kind: "idea", title: "Show it all, move the price", body: "A large order exposed **all at once** can have a very large **market impact**.", cite: IMPACT },
        {
          kind: "see",
          title: "Working a large order",
          illus: WorkLarge,
          beats: [
            { text: "A client wants **20,000 shares** (our numbers). Near the best offer, the book holds only a few thousand." },
            { text: "Exposed **all at once**, the order would sweep the book: the price would jump.", cite: IMPACT },
            { text: "Instead, the broker reveals a **small portion**, only to traders likely and able to sell.", cite: EXPOSURE },
            { text: "New sellers step in, and the broker takes another slice. Not held, it can **wait for more size**.", cite: WAITING },
            { text: "Slice by slice, the order fills close to the starting price." },
          ],
        },
        {
          kind: "truefalse",
          q: "To limit price impact, brokers usually show a large order to the whole market at once.",
          answer: false,
          why: "The opposite: they reveal **only small portions**, and only to traders likely and able to trade the other side.",
          cite: EXPOSURE,
        },
        {
          kind: "choice",
          q: "When working a large order, to whom does the broker reveal it?",
          options: [
            "Small portions, only to traders likely and able to trade the other side",
            "The full size, to every trader at once",
            "Nobody: it waits until the close",
            "Only to the exchange's clearinghouse",
          ],
          answer: 0,
          why: "Brokers control **exposure**: small portions, shown only to likely counterparties.",
          cite: EXPOSURE,
        },
        {
          kind: "idea",
          title: "Room to wait",
          body: "Working a large order takes time. Not held, the broker can't be blamed if prices move while it **waits for better prices or more size**.",
          cite: WAITING,
        },
        {
          kind: "game",
          id: "work-the-order",
          title: "Work the order",
          brief: "You hold a **not-held** order to buy **8,000 shares** (our numbers). Over four moments, choose how much to buy each time. Big slices walk up the book; waiting risks a drifting price. Beat the trader who buys it all at once.",
          game: WorkTheOrder,
        },
        {
          kind: "choice",
          q: "Who most commonly receives market-not-held orders, according to Harris?",
          options: ["Brokers on the floor of an exchange", "Clearinghouses", "Retail customers", "Regulators"],
          answer: 0,
          why: "Traders most commonly give them to **floor brokers**, who generally know more about market conditions than any other traders.",
          cite: FLOOR,
        },
        {
          kind: "truefalse",
          q: "Harris says floor traders generally know more about market conditions than any other traders.",
          answer: true,
          why: "That is why traders most commonly give market-not-held orders to brokers on the exchange floor.",
          cite: FLOOR_KNOW,
        },
        {
          kind: "multi",
          q: "Which brokers receive market-not-held orders, according to the book? (Select all that apply.)",
          options: [
            "Brokers who work on the floor of an exchange",
            "Electronic order desks that use econometric models",
            "The exchange's matching engine itself",
            "The clearinghouse",
          ],
          answer: [0, 1],
          why: "Mostly **floor brokers**, and some **electronic order desks** whose models formulate optimal order submission strategies.",
          cite: DESKS,
        },
        {
          kind: "today",
          title: "Algorithms now work the order",
          body: "Many institutional not-held orders are now worked by broker **execution algorithms** (VWAP, TWAP, implementation shortfall) that slice them into small **child orders**.",
          source: "Industry practice",
        },
        {
          kind: "recap",
          points: [
            { text: "Market-not-held orders are mostly used for **large orders**.", cite: LARGE },
            { text: "Brokers reveal **small portions** to likely counterparties to limit market impact.", cite: EXPOSURE },
            { text: "They go mostly to **floor brokers**, and some to electronic desks with econometric models.", cite: DESKS },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "In Table 4-4, what is the main disadvantage of a market-not-held order?",
      options: ["The trader loses control over the broker", "Uncertain execution price", "It may never execute", "It demands liquidity when it is least available"],
      answer: 0,
      why: "Table 4-4: expert brokers may decide better, but the **trader loses control** over the broker.",
      cite: T44_NH,
    },
    {
      kind: "truefalse",
      q: "Traders who use standard market orders can sometimes use legal remedies to get the executions a negligent broker should have obtained.",
      answer: true,
      why: "Standard market orders are held: market order traders often can use **legal remedies** against negligent brokers.",
      cite: LEGAL,
    },
    {
      kind: "choice",
      q: "Why do brokers working large not-held orders reveal only small portions?",
      options: ["To minimize price impacts", "To save on commissions", "Because exchanges cap order size", "To get the opening price"],
      answer: 0,
      why: "A large order exposed all at once can move prices a lot; small portions **minimize price impact**.",
      cite: EXPOSURE,
    },
    {
      kind: "fill",
      q: "With a market-not-held order, brokers can ___ liquidity or ___ liquidity according to current market conditions.",
      bank: ["offer", "take", "hide", "cancel", "price"],
      answer: ["offer", "take"],
      why: "Discretion means the broker chooses to **offer** liquidity (rest an order) or **take** it (trade with standing orders).",
      cite: OFFER_TAKE,
    },
    {
      kind: "choice",
      q: "When do traders give their brokers market-not-held orders?",
      options: [
        "When they want the broker to make order strategy decisions for them",
        "When they want the trade done at once, whatever the price",
        "When they want a guaranteed closing price",
        "When they trade fewer than 100 shares",
      ],
      answer: 0,
      why: "Not held hands the **order strategy decisions** to the broker.",
      cite: ON_BEHALF,
    },
  ],
};
