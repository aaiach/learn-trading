// 4.10 QUANTITY INSTRUCTIONS (pp. 83–84)
import type { Cite, Unit } from "../types.ts";
import { HarryDay, ThreeLanes } from "./illus/u410.tsx";
import { FillDesk } from "./games/FillDesk.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const QTY = c(83, "4.10", "Traders specify quantity instructions to indicate whether their brokers can arrange multiple trades to fill their large orders. They usually do so to minimize the costs that they pay to clear and settle their trades.");
const QTY_COMMON = c(83, "4.10", "The most common quantity instructions are all-or-none instructions and minimum-or-none (minimum acceptable quantity) instructions.");
const AON = c(83, "4.10", "Brokers must fill all-or-none (AON) orders all at once.");
const AON_MAQ = c(83, "4.10", "Brokers must fill all-or-none (AON) orders all at once. They can arrange multiple trades to fill minimum-or-none orders");
const MAQ_AKA = c(84, "4.10", "In some markets, these two instructions are also known as all-or-nothing and minimum acceptable quantity (MAQ) instructions.");
// The book's order example (box on p. 69) and what every order specifies (§4.1)
const HARRY = c(69, "4.2", "Harry wants to sell 7,600 shares of Exxon Mobil (XOM) at no less than 41.05 dollars per share, but only if he can trade during the current trading session and only if he can trade the entire quantity at once.", { box: "An Order Example" });
const HARRY_ORDER = c(69, "4.2", "He would issue an all-or-nothing, day order to sell 7,600 shares of XOM, limit 41.05 dollars.", { box: "An Order Example" });
const ALWAYS = c(68, "4.1", "An order always specifies which instrument (or instruments) to trade, how much to trade, and whether to buy or sell.");
const CONDITIONS = c(69, "4.1", "Other conditions may specify for how long the order is valid, when the order can be executed, whether it is okay to partially fill the order, where to present the order, and how to search for the other side.");

export const U410: Unit = {
  sec: "4.10",
  title: "Quantity Instructions",
  pages: "83–84",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.10-quantity",
      sec: "4.10",
      title: "All-or-none and minimum quantities",
      pages: "83–84",
      imp: 2,
      steps: [
        {
          kind: "idea",
          title: "One trade or several?",
          body: "**Quantity instructions** say whether the broker may fill a large order with **several trades**. Traders use them mostly to cut what they pay to **clear and settle** their trades.",
          cite: QTY,
        },
        {
          kind: "definition",
          term: "All-or-none orders",
          aka: ["AON", "all-or-nothing"],
          body: "The broker must fill the whole order **in one trade**, or not at all.",
          cite: AON,
        },
        {
          kind: "definition",
          term: "Minimum-or-none orders",
          aka: ["minimum acceptable quantity (MAQ)"],
          body: "The broker may use **several trades**, but each one must be bigger than a **minimum size** the trader sets.",
          cite: AON_MAQ,
        },
        {
          kind: "see",
          title: "Same sellers, three buy orders",
          illus: ThreeLanes,
          beats: [
            { text: "Three buyers each want **1,000 shares** at $20 (our numbers): a plain limit order, an **all-or-none** order, and a **minimum-or-none** order with a 400-share minimum.", cite: QTY_COMMON },
            { text: "A seller offers **300**. The plain order takes them. All-or-none can't: not all at once. Minimum-or-none can't: 300 is under 400.", cite: AON_MAQ },
            { text: "A seller offers **500**. The plain order takes them, and so does minimum-or-none (500 is over 400). All-or-none still waits." },
            { text: "A seller offers **1,000**. All-or-none fills **all at once**; the other two take only what they still need.", cite: AON },
            { text: "Same 1,000 shares: **3 trades**, **1 trade**, **2 trades**. Fewer trades mean lower clearing and settlement costs.", cite: QTY },
          ],
        },
        {
          kind: "choice",
          q: "A broker holds an all-or-none order to buy 5,000 shares. A seller offers 3,000 at a good price. What can the broker do?",
          options: ["Nothing yet: the order must fill all at once", "Buy the 3,000 and wait for 2,000 more", "Buy the 3,000 and cancel the rest", "Buy 3,000 if the client agrees later"],
          answer: 0,
          why: "All-or-none means one trade for the full 5,000. A 3,000-share fill isn't allowed.",
          cite: AON,
        },
        {
          kind: "number",
          q: "A minimum-or-none order to buy 2,000 shares has a 500-share minimum. Sellers offer 300, then 800, then 400 shares, one at a time, all at acceptable prices. How many shares does it buy?",
          answer: 800,
          unit: "shares",
          illustrative: true,
          why: "300 and 400 are each under the 500 minimum. Only the 800-share trade qualifies.",
          cite: AON_MAQ,
        },
        {
          kind: "quote",
          lead: "The book's order example puts a quantity instruction on a real ticket:",
          cite: HARRY_ORDER,
          mark: ["all-or-nothing", "day order"],
        },
        {
          kind: "fill",
          q: "Harry wants all 7,600 shares at once, and only today. He issues an ___, ___ order to sell 7,600 XOM, limit 41.05.",
          bank: ["all-or-nothing", "day", "good-till-cancel", "minimum-or-none", "good-after"],
          answer: ["all-or-nothing", "day"],
          why: "“The entire quantity at once” is all-or-nothing; “the current trading session” is a day order.",
          cite: HARRY,
        },
        {
          kind: "classify",
          q: "Which quantity instruction is the client asking for?",
          buckets: ["All-or-none", "Minimum-or-none", "No quantity instruction"],
          items: [
            { text: "Fill my 10,000 shares in one trade, or not at all.", bucket: 0, why: "One trade for everything: all-or-none." },
            { text: "Several trades are fine, but none under 1,000 shares.", bucket: 1, why: "A minimum size per trade: minimum-or-none." },
            { text: "Fill it however you can, in as many pieces as you need.", bucket: 2, why: "Any number of trades: no quantity instruction." },
            { text: "Partial fills only in blocks of 500 or more.", bucket: 1, why: "A minimum acceptable quantity." },
            { text: "One trade, so I clear and settle just once.", bucket: 0, why: "All-or-none keeps it to one trade." },
          ],
          cite: QTY_COMMON,
        },
        {
          kind: "truefalse",
          q: "Traders mainly use quantity instructions to cut what they pay to clear and settle their trades.",
          answer: true,
          why: "Fewer, larger trades cost less to clear and settle.",
          cite: QTY,
        },
        {
          kind: "choice",
          q: "In some markets, all-or-none and minimum-or-none instructions go by other names. Which?",
          options: ["All-or-nothing and minimum acceptable quantity (MAQ)", "Fill-or-kill and good-on-sight", "Day and good-till-cancel", "Market-on-open and market-on-close"],
          answer: 0,
          why: "The book gives all-or-nothing and minimum acceptable quantity (MAQ).",
          cite: MAQ_AKA,
        },
        {
          kind: "recap",
          points: [
            { text: "**Quantity instructions** limit how many trades may fill an order, to save clearing and settlement costs.", cite: QTY },
            { text: "**All-or-none** (all-or-nothing): one trade for the whole order, or none.", cite: AON },
            { text: "**Minimum-or-none** (MAQ): several trades allowed, each above a minimum the trader sets.", cite: MAQ_AKA },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.10-partial-fills",
      sec: "4.10",
      title: "Partial fills and order tickets",
      pages: "68–69, 83–84",
      imp: 2,
      steps: [
        {
          kind: "idea",
          title: "What a ticket can say",
          body: "Beyond instrument, size and side, an order can set **how long** it is valid, **when** it may execute, and whether a **partial fill** is OK.",
          cite: CONDITIONS,
        },
        {
          kind: "idea",
          title: "Partial fills",
          body: "With no quantity instruction, a broker may fill a big order **in pieces**: several trades at different moments. All-or-none and minimum-or-none limit that.",
          cite: QTY,
        },
        {
          kind: "see",
          title: "Harry's ticket through the day",
          illus: HarryDay,
          beats: [
            { text: "Harry's ticket: sell **7,600** XOM, limit **41.05**, a **day** order, **all-or-nothing**.", cite: HARRY_ORDER },
            { text: "10:00: a buyer bids 41.10 for 5,000 shares (our numbers). The price is fine, but it is **not all 7,600 at once**: no trade.", cite: AON },
            { text: "13:00: a buyer bids 41.00 for 10,000. Enough shares, but **below the 41.05 limit**: no trade." },
            { text: "15:00: a buyer bids 41.06 for 9,000. Price and size both work: **all 7,600 trade at once**. With no such buyer by the close, the day order would simply expire.", cite: HARRY },
          ],
        },
        {
          kind: "number",
          q: "Harry's all-or-nothing order to sell 7,600 XOM, limit 41.05: a buyer bids 41.08 for 6,000 shares. How many of Harry's shares trade?",
          answer: 0,
          unit: "shares",
          illustrative: true,
          why: "The price is fine, but all-or-nothing means all 7,600 at once, or nothing.",
          cite: AON,
        },
        {
          kind: "choice",
          q: "Ticket: buy 5,000 ABC, limit 20.00, good-till-cancel, minimum 1,000 per trade. Today sellers offer 800 at 19.95, then 1,500 at 20.00. What happens?",
          options: [
            "It buys 1,500; the other 3,500 keep working after today",
            "It buys 2,300; the rest keeps working after today",
            "It buys nothing and expires tonight",
            "It buys 1,500; the rest is canceled tonight",
          ],
          answer: 0,
          why: "800 is under the 1,000 minimum; 1,500 qualifies. A GTC order stays open until it is canceled.",
          cite: AON_MAQ,
        },
        {
          kind: "game",
          id: "fill-desk",
          title: "Broker's desk",
          brief: "You are the broker. Three client tickets, twelve incoming offers. For each one: may you **trade** it under the ticket's limit, validity and quantity instructions, or must you **pass**?",
          game: FillDesk,
        },
        {
          kind: "truefalse",
          q: "A minimum-or-none order can be filled in several trades.",
          answer: true,
          why: "Yes, as long as each trade is bigger than the trader's minimum.",
          cite: AON_MAQ,
        },
        {
          kind: "fill",
          q: "Brokers must fill ___ orders all at once; they can arrange multiple trades to fill ___ orders.",
          bank: ["all-or-none", "minimum-or-none", "good-till-cancel", "immediate-or-cancel"],
          answer: ["all-or-none", "minimum-or-none"],
          why: "All-or-none: one trade. Minimum-or-none: several trades, each above the minimum.",
          cite: AON_MAQ,
        },
        {
          kind: "multi",
          q: "Which conditions can an order specify, according to the book?",
          options: ["How long the order is valid", "Whether it is okay to partially fill it", "Where to present it", "A guaranteed execution price", "The price the last buyer paid"],
          answer: [0, 1, 2],
          why: "Validity, partial fills and where to present the order are all conditions an order may carry. No order can guarantee its execution price.",
          cite: CONDITIONS,
        },
        {
          kind: "choice",
          q: "Which three things does every order always specify?",
          options: [
            "The instrument, how much, and whether to buy or sell",
            "The price, the broker and the exchange",
            "The validity, the quantity instruction and the limit",
            "The time, the counterparty and the commission",
          ],
          answer: 0,
          why: "Everything else is an optional condition.",
          cite: ALWAYS,
        },
        {
          kind: "recap",
          points: [
            { text: "Every order names the **instrument**, the **quantity** and **buy or sell**.", cite: ALWAYS },
            { text: "Conditions add a price limit, **validity** and **partial-fill** rules; the broker must respect them all.", cite: CONDITIONS },
            { text: "Harry's **all-or-nothing, day** order trades only in one piece, and only today.", cite: HARRY_ORDER },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "truefalse",
      q: "An all-or-none order may be filled in two trades if both happen on the same day.",
      answer: false,
      why: "All-or-none orders must be filled all at once, in a single trade.",
      cite: AON,
    },
    {
      kind: "choice",
      q: "Why do traders attach quantity instructions to large orders?",
      options: ["To minimize what they pay to clear and settle their trades", "To get price improvement", "To hide their orders from other traders", "To trade at the closing price"],
      answer: 0,
      why: "Fewer trades cost less to clear and settle.",
      cite: QTY,
    },
    {
      kind: "fill",
      q: "The most common quantity instructions are ___ and ___ instructions.",
      bank: ["all-or-none", "minimum-or-none", "good-till-cancel", "stop"],
      answer: ["all-or-none", "minimum-or-none"],
      why: "These are the two the book names.",
      cite: QTY_COMMON,
    },
  ],
};
