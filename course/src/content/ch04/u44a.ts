// 4.4 LIMIT ORDERS, part A: 4.4 and 4.4.1 Limit Price Placement (pp. 73–74).
import type { Cite, Lesson, Question } from "../types.ts";
import { AggressiveScale, BookArrival, Figure42, LimitVsMarket, Table41 } from "./illus/u44a.tsx";
import { PlaceIt } from "./games/PlaceIt.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 4.4 (p. 73) ───────────────────────────────────────────────────
const LIMIT = c(73, "4.4", "A limit order is an instruction to trade at the best price available, but only if it is no worse than the limit price specified by the trader.");
const BUYSELL = c(73, "4.4", "For buy orders, the trade price must be at or below the limit price. For sell orders, the price must be at or above the limit price.");
const ARRIVE = c(73, "4.4", "In continuously trading markets, a broker (or an exchange) will attempt to trade a newly submitted limit order as soon as it arrives.");
const NOTRADE = c(73, "4.4", "If no trader is immediately willing to take the opposite side at an acceptable price, the order will not trade.");
const STAND = c(73, "4.4", "Instead, it will stand as an offer to trade until someone is willing to trade at its limit price, until it expires, or until the trader who submitted it cancels it.");
const BOOK = c(73, "4.4", "Standing limit orders are placed in a file called a limit order book.");
const KEEPER = c(73, "4.4", "Depending on the market, a broker, an exchange, or even a dealer will maintain the limit order book.");
const FIG41 = c(73, "4.4", "The Top of the Island ECN Limit Order Book for Cisco Systems at 11:57:28 ET on January 28, 2002");
const PROB = c(73, "4.4", "The probability that a limit order will trade depends on its limit price.");
const TOOLOW = c(73, "4.4", "If the limit price of a buy order is too low, the order will not trade. Likewise, if a sell limit price is too high, the order will not trade.");
const AGGR = c(73, "4.4", "Buy limit orders with high prices and sell limit orders with low prices are aggressively priced.");
const EASIEST = c(73, "4.4", "Aggressively priced limit orders are the easiest limit orders to fill.");

// ── Excerpts: 4.4.1 (pp. 73–74) ─────────────────────────────────────────────
const CLASSIFY = c(73, "4.4.1", "Traders classify limit orders by where they place their limit prices relative to the market.");
const MARKET = c(73, "4.4.1", "The market is the range of prices bounded above by the best offer (lowest price) and below by the best bid (highest price).");
const MKTBL = c(73, "4.4.1", "A marketable limit order is an order that the broker (or exchange) can execute immediately when a trader submits it.");
const MKTBUY = c(73, "4.4.1", "The limit price of a marketable limit buy order is at or above the best offer.");
const MKTSELL = c(73, "4.4.1", "For a sell order, the limit price is at or below the best bid, and the broker can arrange to sell immediately to the trader quoting the best bid.");
const LIKE = c(73, "4.4.1", "Marketable limit orders are like market orders, except that they limit the price concessions that brokers can make to fill them.");
const ESSENT = c(73, "4.4.1", "Marketable limit orders with very high limit buy prices or very low limit sell prices are essentially market orders.");
const WHY = c(73, "4.4.1", "Traders use marketable limit orders instead of market orders to limit execution price uncertainty and to limit what they will pay for liquidity.");
const ATMKT = c(73, "4.4.1", "Limit buy orders that stand at the best bid, and limit sell orders that stand at the best offer, are at the market.");
const NEWMKT = c(74, "4.4.1", "Traders make a new market when they submit orders that improve the current best bid or offer.");
const RAISE = c(74, "4.4.1", "Buyers make a new market when they raise the best bid, and sellers make a new market when they lower the best offer.");
const INMKT = c(74, "4.4.1", "Whenever traders place their limit orders in the market (between the current best bid and best offer), they make a new market.");
const AWAY = c(74, "4.4.1", "Limit orders that stand behind the best bid or offer are behind the market. Such orders are away from the market.");
const BEHIND = c(74, "4.4.1", "A buy order is behind the market if its limit price is less than the best bid. A sell order is behind the market if its limit price is above the best offer.");
const TICKETS = c(74, "4.4.1", "traders who maintain manual order books place tickets for these orders behind those of more aggressively priced orders");
const SUMM = c(74, "4.4.1", "To summarize, marketable limit orders are the most aggressively priced limit orders.");
const NEXT = c(74, "4.4.1", "The next most aggressive orders are those which make a new market, followed by orders that match the market at the best bid or offer.");
const LEAST = c(74, "4.4.1", "The least aggressive limit orders stand behind the market.");

// Figure 4-2 (p. 74)
const F_NOTE = c(74, "4.4.1", 'The market is "26 bid, offered at 28" because the best bid is 26 and the best offer is 28.');
const F_DEFINE = c(74, "4.4.1", "The best bid and best offer define the market.");
const F_OFFER = c(74, "4.4.1", "The best offer is at the market.");
const F_BID = c(74, "4.4.1", "The best bid is at the market.");
const F_INSIDE = c(74, "4.4.1", "The space between the current best bid and offer is inside the market.");
const F_BEHIND = c(74, "4.4.1", "These sell orders are behind the market. We also say that they are away from the market.");
const F_FAR = c(74, "4.4.1", "The least aggressively priced sell orders are far from the market.");

// Table 4-1 (p. 74), one row at a time
const T41 = (t: string): Cite => c(74, "4.4.1", t, { table: "Table 4-1" });
const T_ABOVE = T41("Above the best offer · Buy orders: Marketable · Sell orders: Behind the market");
const T_ATOFFER = T41("At the best offer · Buy orders: Marketable · Sell orders: At the market");
const T_BETWEEN = T41("Between the current best bid and best offer · Buy orders: In the market · Sell orders: In the market");
const T_ATBID = T41("At the best bid · Buy orders: At the market · Sell orders: Marketable");
const T_BELOW = T41("Below the best bid · Buy orders: Behind the market · Sell orders: Marketable");
const T_BUYS = T41("Buy orders · Above the best offer: Marketable · At the best offer: Marketable · Between the current best bid and best offer: In the market · At the best bid: At the market · Below the best bid: Behind the market");

export const U44A_LESSONS: Lesson[] = [
  // ── Lesson 1 ──────────────────────────────────────────────────────────
  {
    id: "4.4-limit-orders",
    sec: "4.4",
    title: "Limit orders and the book",
    pages: "73",
    imp: 3,
    steps: [
      { kind: "definition", term: "Limit order", body: "An order to trade at the **best price available**, but **no worse than** the limit price you set.", cite: LIMIT },
      { kind: "idea", title: "Which side of the limit?", body: "A **buy** may trade only **at or below** its limit. A **sell** may trade only **at or above** it.", cite: BUYSELL },
      {
        kind: "choice",
        q: "You send a limit order to **buy** at $50. Which trade price is acceptable?",
        options: ["$49.80", "$50.20", "$51.00", "Any price, as long as it trades fast"],
        answer: 0,
        why: "A buy limit order trades **at or below** its limit price: $49.80 qualifies, anything above $50 doesn't.",
        cite: BUYSELL,
      },
      {
        kind: "see",
        title: "Trade now, or stand in the book",
        illus: BookArrival,
        beats: [
          { text: "The top of a real **limit order book**: Island ECN, Cisco, 28 January 2002. Sizes are added up per price.", cite: FIG41 },
          { text: "Buy orders (**bids**) wait on the left, sell orders (**offers**) on the right. Best bid 19.74, best offer 19.76." },
          { text: "A new order arrives: **buy 300 at 19.77** (our order). A seller already offers 327 shares at 19.76, which is acceptable.", cite: ARRIVE },
          { text: "It **trades at once**, at **19.76**: the best price available, and better than its limit. 27 shares stay offered.", cite: LIMIT },
          { text: "Next: **buy 500 at 19.73**. Nobody offers to sell that low, so it can't trade now.", cite: NOTRADE },
          { text: "It **stands** in the book, waiting until someone sells at 19.73, it expires, or it is canceled.", cite: STAND },
        ],
      },
      { kind: "definition", term: "Limit order book", body: "The file where **standing limit orders** wait. A **broker**, an **exchange** or even a **dealer** keeps it.", cite: KEEPER },
      {
        kind: "truefalse",
        q: "In a continuous market, a new limit order that nobody will trade with at an acceptable price is canceled at once.",
        answer: false,
        why: "It doesn't trade, but it isn't canceled: it **stands** in the book as an offer to trade.",
        cite: STAND,
      },
      {
        kind: "fill",
        q: "A standing limit order waits until someone trades at its limit price, until it ___, or until the trader who submitted it ___ it.",
        bank: ["expires", "cancels", "doubles", "reprices", "settles"],
        answer: ["expires", "cancels"],
        why: "Three ways out of the book: it **trades**, it **expires**, or its trader **cancels** it.",
        cite: STAND,
      },
      { kind: "idea", title: "Aggressive prices fill most easily", body: "**High** buy limits and **low** sell limits are **aggressively priced**. They are the easiest limit orders to fill.", cite: AGGR },
      {
        kind: "choice",
        q: "The market is 26 bid, offered at 28. Which limit order is the **most likely** to fill?",
        options: ["Buy at 29", "Buy at 27", "Buy at 25", "Sell at 30"],
        answer: 0,
        why: "A buy priced above the best offer is the most aggressively priced here: someone already offers to sell at 28.",
        cite: EASIEST,
      },
      {
        kind: "truefalse",
        q: "If a sell limit price is too high, the order will not trade.",
        answer: true,
        why: "The chance that a limit order trades depends on its limit price: sells priced too high, like buys priced too low, don't trade.",
        cite: TOOLOW,
      },
      {
        kind: "today",
        title: "Island is now part of Nasdaq",
        body: "Island, whose book is the book's Figure 4-1, merged with **Instinet** in 2002; the platform was renamed **INET**, and **Nasdaq** bought it in 2005.",
        source: "Instinet and Nasdaq filings (2002, 2005)",
      },
      {
        kind: "recap",
        points: [
          { text: "A **limit order** trades at the best price available, never worse than its limit: buys at or below, sells at or above.", cite: BUYSELL },
          { text: "If it can't trade on arrival, it **stands** in the **limit order book** until it trades, expires or is canceled.", cite: STAND },
          { text: "High buy limits and low sell limits are **aggressively priced**: the easiest to fill.", cite: EASIEST },
        ],
      },
    ],
  },

  // ── Lesson 2 ──────────────────────────────────────────────────────────
  {
    id: "4.4.1-placement",
    sec: "4.4.1",
    title: "Where to place a limit price",
    pages: "73–74",
    imp: 3,
    steps: [
      { kind: "idea", title: "Named by where the price sits", body: "Traders describe a limit order by **where its limit price sits relative to the market**.", cite: CLASSIFY },
      { kind: "definition", term: "The market", body: "The range of prices between the **best bid** (its bottom) and the **best offer** (its top).", cite: MARKET },
      {
        kind: "see",
        title: "Figure 4-2, zone by zone",
        illus: Figure42,
        beats: [
          { text: "Figure 4-2's book: the market is **26 bid, offered at 28**.", cite: F_NOTE },
          { text: "The best bid and best offer **define the market**.", cite: F_DEFINE },
          { text: "Orders at the best bid and at the best offer are **at the market**.", cite: F_OFFER },
          { text: "The space between them is **inside the market**. A new order there **makes a new market**.", cite: F_INSIDE },
          { text: "Sells above the best offer and buys below the best bid are **behind the market**, or **away from the market**.", cite: F_BEHIND },
          { text: "The least aggressively priced orders are **far from the market**.", cite: F_FAR },
        ],
      },
      { kind: "definition", term: "Marketable limit order", body: "One that can execute **immediately**: a buy priced **at or above the best offer**, or a sell **at or below the best bid**.", cite: MKTBL },
      { kind: "definition", term: "At the market", body: "A buy standing **at the best bid**, or a sell standing **at the best offer**.", cite: ATMKT },
      {
        kind: "definition",
        term: "Make a new market",
        aka: ["in the market"],
        body: "Place a limit order **between** the best bid and best offer. It **improves** the best bid or offer.",
        cite: INMKT,
      },
      { kind: "definition", term: "Behind the market", aka: ["away from the market"], body: "A buy **below the best bid**, or a sell **above the best offer**.", cite: BEHIND },
      {
        kind: "see",
        title: "Table 4-1: one price, two names",
        illus: Table41,
        beats: [
          { text: "**Above the best offer**: a buy is **marketable**, a sell is **behind the market**.", cite: T_ABOVE },
          { text: "**At the best offer**: a buy is still **marketable**, a sell is **at the market**.", cite: T_ATOFFER },
          { text: "**Between** the best bid and best offer: both are **in the market**.", cite: T_BETWEEN },
          { text: "**At the best bid**: a buy is **at the market**, a sell is **marketable**.", cite: T_ATBID },
          { text: "**Below the best bid**: a buy is **behind the market**, a sell is **marketable**.", cite: T_BELOW },
        ],
      },
      {
        kind: "choice",
        q: "The market is 26 bid, offered at 28. A **buy** limit at 27 is…",
        options: ["In the market: it makes a new market", "Marketable", "At the market", "Behind the market"],
        answer: 0,
        why: "27 is between the best bid and best offer: the order raises the best bid, so it **makes a new market**.",
        cite: NEWMKT,
      },
      {
        kind: "choice",
        q: "Same market, 26 bid, offered at 28. A **sell** limit at 26 is…",
        options: ["Marketable", "At the market", "In the market", "Behind the market"],
        answer: 0,
        why: "A sell priced **at or below the best bid** can trade at once with the buyer bidding 26: it's marketable.",
        cite: MKTSELL,
      },
      {
        kind: "game",
        id: "place-it",
        title: "Place it",
        brief: "Ten new limit orders arrive at a live book. First **name** each one (marketable, in, at or behind the market) before the clock runs out, then **place** orders yourself. Watch what each order does to the book. Keys 1–4 work too.",
        game: PlaceIt,
      },
      {
        kind: "match",
        q: "Buy orders, Table 4-1: match the limit price to its name.",
        pairs: [
          ["Above the best offer", "Marketable"],
          ["Between the best bid and offer", "In the market"],
          ["At the best bid", "At the market"],
          ["Below the best bid", "Behind the market"],
        ],
        cite: T_BUYS,
      },
      {
        kind: "truefalse",
        q: "A **sell** limit order priced above the best offer is marketable.",
        answer: false,
        why: "Above the best offer, a sell waits behind other sellers: it is **behind the market**. Only a buy there is marketable.",
        cite: BEHIND,
      },
      {
        kind: "fill",
        q: "Buyers make a new market when they ___ the best bid; sellers make a new market when they ___ the best offer.",
        bank: ["raise", "lower", "match", "cancel", "hide"],
        answer: ["raise", "lower"],
        why: "A new market means a **better** best price: a higher bid or a lower offer.",
        cite: RAISE,
      },
      {
        kind: "recap",
        points: [
          { text: "**The market** runs from the best bid up to the best offer.", cite: MARKET },
          { text: "**Marketable** orders can trade at once; orders **at the market** stand at the best bid or offer; orders **in the market** make a new market.", cite: INMKT },
          { text: "Orders **behind the market** (away from it) are buys below the best bid and sells above the best offer.", cite: AWAY },
        ],
      },
    ],
  },

  // ── Lesson 3 ──────────────────────────────────────────────────────────
  {
    id: "4.4.1-aggressive",
    sec: "4.4.1",
    title: "From aggressive to passive",
    pages: "73–74",
    imp: 3,
    steps: [
      { kind: "idea", title: "Most aggressive first", body: "**Marketable** limit orders are the most aggressively priced. Next come orders that **make a new market**, then orders **at the market**.", cite: NEXT },
      { kind: "idea", title: "Least aggressive last", body: "Orders **behind the market** are the least aggressive: they wait behind better-priced orders.", cite: LEAST },
      {
        kind: "see",
        title: "The aggressiveness ladder",
        illus: AggressiveScale,
        beats: [
          { text: "For a **buy**, the higher the limit, the more aggressive. Most aggressive: **marketable**, at or above the best offer.", cite: SUMM },
          { text: "Next: buys that **make a new market**, inside the spread.", cite: NEXT },
          { text: "Then buys **at the market**, at the best bid.", cite: ATMKT },
          { text: "Least aggressive: buys **behind the market**, below the best bid.", cite: LEAST },
          { text: "For a **sell** it's the mirror image: the **lower** the limit, the more aggressive.", cite: AGGR },
        ],
      },
      {
        kind: "order",
        q: "The market is 26 bid, offered at 28. Rank these **buy** limits from most to least aggressive.",
        items: ["Buy at 29", "Buy at 27", "Buy at 26", "Buy at 24"],
        why: "29 is marketable, 27 makes a new market, 26 is at the market and 24 is behind it.",
        cite: SUMM,
      },
      {
        kind: "order",
        q: "Same market. Rank these **sell** limits from most to least aggressive.",
        items: ["Sell at 25", "Sell at 27", "Sell at 28", "Sell at 31"],
        why: "For sells, lower is more aggressive: 25 is marketable, 27 makes a new market, 28 is at the market, 31 is behind it.",
        cite: NEXT,
      },
      { kind: "idea", title: "Marketable limit = market order with a cap", body: "A marketable limit order trades at once like a **market order**, but it **limits the price concessions** the broker can make to fill it.", cite: LIKE },
      {
        kind: "see",
        title: "Market order vs marketable limit",
        illus: LimitVsMarket,
        beats: [
          { text: "Offers stand at 28, 29, 30 and 31. Two traders each want to buy 600 shares (our numbers)." },
          { text: "A **market order** for 600 takes 200 at 28, 200 at 29 and 200 at 30. It pays up to 30." },
          { text: "Rewind. Now a **marketable limit order**: buy 600, limit 29.", cite: MKTBUY },
          { text: "It takes 200 at 28 and 200 at 29, then **stops**: 30 is above its limit.", cite: LIKE },
          { text: "The other 200 **stand at 29** as a bid. It now makes a new market: 29 bid, offered at 30.", cite: RAISE },
        ],
      },
      {
        kind: "number",
        q: "Offers: 200 at 28, 200 at 29, 300 at 30 (our numbers). You send a **buy** limit order for 600 at 29. How many shares trade right away?",
        answer: 400,
        unit: "shares",
        illustrative: true,
        why: "It can take everything offered at or below 29: 200 at 28 plus 200 at 29. The other 200 stand at 29.",
        cite: LIKE,
      },
      {
        kind: "truefalse",
        q: "A marketable limit **buy** with a very high limit price is essentially a market order.",
        answer: true,
        why: "With a limit far above the market, the cap almost never binds: the order behaves like a market order.",
        cite: ESSENT,
      },
      {
        kind: "multi",
        q: "Why do traders use marketable limit orders instead of market orders? (Select all that apply.)",
        options: ["To limit execution price uncertainty", "To limit what they pay for liquidity", "To avoid trading right away", "To hide the size of their order"],
        answer: [0, 1],
        why: "The limit caps how far the order can go for liquidity, so the trader knows the worst price in advance.",
        cite: WHY,
      },
      {
        kind: "choice",
        q: "Which limit order is the **least** aggressively priced?",
        options: ["A sell above the best offer", "A buy at the best bid", "A sell between the best bid and offer", "A buy above the best offer"],
        answer: 0,
        why: "A sell above the best offer stands **behind the market**: the least aggressive placement.",
        cite: LEAST,
      },
      {
        kind: "recap",
        points: [
          { text: "Most to least aggressive: **marketable** → **new market** → **at the market** → **behind the market**.", cite: NEXT },
          { text: "A **marketable limit order** trades at once but caps the price concessions; a very high buy limit is essentially a market order.", cite: ESSENT },
          { text: "Traders use them to limit **execution price uncertainty** and what they pay for liquidity.", cite: WHY },
        ],
      },
    ],
  },
];

export const U44A_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "Where do standing limit orders wait?",
    options: ["In a file called the limit order book", "In the clearinghouse's margin account", "At the depository", "In the broker's commission ledger"],
    answer: 0,
    why: "Standing limit orders sit in the **limit order book**, kept by a broker, an exchange or even a dealer.",
    cite: BOOK,
  },
  {
    kind: "truefalse",
    q: "Buy limit orders with **low** prices are aggressively priced.",
    answer: false,
    why: "Aggressive buys have **high** limit prices; aggressive sells have low ones.",
    cite: AGGR,
  },
  {
    kind: "choice",
    q: "What does the probability that a limit order trades mainly depend on?",
    options: ["Its limit price", "The broker's commission", "The trader's account size", "The time of day it was sent"],
    answer: 0,
    why: "Price is the key: buys priced too low and sells priced too high don't trade.",
    cite: PROB,
  },
  {
    kind: "choice",
    q: "The market is 41.00 bid, offered at 41.10 (our numbers). A **sell** limit at 41.05…",
    options: ["Makes a new market", "Is marketable", "Is at the market", "Is behind the market"],
    answer: 0,
    why: "41.05 is between the best bid and best offer, so the sell **lowers the best offer**: a new market.",
    cite: INMKT,
  },
  {
    kind: "fill",
    q: "The market is the range of prices bounded above by the best ___ and below by the best ___.",
    bank: ["offer", "bid", "trade", "close", "limit"],
    answer: ["offer", "bid"],
    why: "The best offer is the market's top and the best bid its bottom.",
    cite: MARKET,
  },
  {
    kind: "truefalse",
    q: "A **buy** limit order priced exactly at the best offer is marketable.",
    answer: true,
    why: "Marketable means at **or** above the best offer for a buy: it can trade at once with the seller quoting it.",
    cite: MKTBUY,
  },
  {
    kind: "choice",
    q: "Why are orders away from the market said to be \"behind\" it?",
    options: [
      "Manual order books placed their tickets behind those of more aggressively priced orders",
      "They arrive after the market closes",
      "They are filled only after market orders settle",
      "Brokers handle them through the back office",
    ],
    answer: 0,
    why: "The name comes from paper order books: their tickets sat **behind** the better-priced ones.",
    cite: TICKETS,
  },
  {
    kind: "choice",
    q: "In Figure 4-2 (26 bid, offered at 28), which order is **at the market**?",
    options: ["The best bid at 26", "A buy at 25", "A sell at 30", "A new order at 27"],
    answer: 0,
    why: "The best bid, like the best offer, is **at the market**. A new order at 27 would make a new market.",
    cite: F_BID,
  },
];
