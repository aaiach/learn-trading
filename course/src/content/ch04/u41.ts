// 4.1 WHAT ARE ORDERS, AND WHY DO PEOPLE USE THEM? (pp. 68–69), with the chapter's opening (p. 68)
import type { Cite, Unit } from "../types.ts";
import { CancelRace, HarryTicket } from "./illus/u41.tsx";
import { OrderTicket } from "./games/OrderTicket.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
// Chapter opening (unnumbered, cited as section "4"). The drop cap splits its first word, so we quote from the second sentence.
const SPECIFY = c(68, "4", "They specify what traders want to trade, whether to buy or sell, how much, when and how to trade, and, most important, on what terms.");
const ISSUE = c(68, "4", "Traders issue orders when they cannot personally negotiate their trades.");
const BLOCKS = c(68, "4", "Orders are the fundamental building blocks of trading strategies.");
const STRATEGY = c(68, "4", "Your order submission strategy is the most important determinant of your success as a trader.");
const PROPER = c(68, "4", "The proper order used at the right time can make the difference between a good trade, a costly trade, and no trade at all.");
const VOCAB = c(68, "4", "Traders use specialized words and phrases to communicate quickly and accurately with each other.");

const INSTR = c(68, "4.1", "Orders are instructions that traders give to the brokers and exchanges which arrange their trades.");
const ALWAYS = c(68, "4.1", "An order always specifies which instrument (or instruments) to trade, how much to trade, and whether to buy or sell.");
const COMMON = c(69, "4.1", "The most common conditions limit the prices that the trader will accept.");
const OTHER = c(69, "4.1", "Other conditions may specify for how long the order is valid, when the order can be executed, whether it is okay to partially fill the order");
const WHOM = c(69, "4.1", "Some orders even specify the traders with whom the trader is willing to trade.");
const HARRY = c(69, "4.1", "Harry wants to sell 7,600 shares of Exxon Mobil (XOM) at no less than 41.05 dollars per share", { box: "An Order Example" });
const HARRY_WHEN = c(69, "4.1", "but only if he can trade during the current trading session and only if he can trade the entire quantity at once.", { box: "An Order Example" });
const HARRY_ORDER = c(69, "4.1", "He would issue an all-or-nothing, day order to sell 7,600 shares of XOM, limit 41.05 dollars.", { box: "An Order Example" });

const NECESSARY = c(69, "4.1", "Orders are necessary because most traders do not personally arrange their trades.");
const DEALERS = c(69, "4.1", "Traders who arrange their own trades—typically dealers—do not use orders. They decide on the spot what they want to do and how to do it.");
const MONITOR = c(69, "4.1", "For many small traders, it is not economical to continuously monitor the market.");
const REPRESENT = c(69, "4.1", "These traders use orders to represent their interests when they are not paying close attention to the market.");
const RESPOND = c(69, "4.1", "The former can respond to market conditions as they change. The latter must anticipate such changes and write contingencies into their orders to deal with them.");
const CANCEL = c(69, "4.1", "During the time it takes to cancel and resubmit orders, traders can lose because their old orders trade before they can cancel them");
const QUICK = c(69, "4.1", "In general, traders who can respond most quickly to changes in market conditions have an advantage over slower traders.");
const COMPUTERS = c(69, "4.1", "Traders who submit and cancel orders manually are slower than traders who use computers to monitor and adjust their orders.");
const COSTLY = c(69, "4.1", "Brokers must understand exactly what traders want. Otherwise, extremely costly errors may occur.");
const STANDARD = c(69, "4.1", "To avoid mistakes, most traders use standard orders to decrease the probability that they will misunderstand each other when communicating quickly.");
const PT_STYLIZED = c(86, "4.13", "Traders use stylized order instructions to reduce communication errors.");

export const U41: Unit = {
  sec: "4.1",
  title: "What Are Orders, and Why Do People Use Them?",
  pages: "68–69",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.1-orders",
      sec: "4.1",
      title: "Orders are instructions",
      pages: "68–69",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Orders",
          body: "Instructions traders give to the **brokers and exchanges** that arrange their trades. Traders use them when they can't negotiate a trade themselves.",
          cite: INSTR,
        },
        {
          kind: "idea",
          title: "What an order says",
          body: "**What** to trade, **buy or sell**, **how much**, **when and how** to trade and, most important, on **what terms**.",
          cite: SPECIFY,
        },
        {
          kind: "quote",
          lead: "Why this chapter matters for a trader:",
          cite: STRATEGY,
          mark: ["most important determinant of your success"],
        },
        {
          kind: "see",
          title: "Harry writes an order",
          illus: HarryTicket,
          beats: [
            { text: "Every order names **the instrument**, **how much** and **buy or sell**: sell 7,600 shares of XOM.", cite: ALWAYS },
            { text: "The most common condition **limits the price**. “No less than $41.05” becomes **limit 41.05**.", cite: HARRY },
            { text: "Other conditions say **how long** the order is valid. “Only during the current session” makes it a **day** order.", cite: HARRY_WHEN },
            { text: "Others say whether a **partial fill** is okay. “Only the entire quantity at once” makes it **all-or-nothing**.", cite: OTHER },
            { text: "The finished ticket: an all-or-nothing, day order to sell 7,600 XOM, limit 41.05.", cite: HARRY_ORDER },
          ],
        },
        {
          kind: "multi",
          q: "Which three things does **every** order specify? (Select all that apply.)",
          options: ["Which instrument to trade", "How much to trade", "Whether to buy or sell", "A limit price", "How long it is valid", "Which broker to use"],
          answer: [0, 1, 2],
          why: "Price limits and validity are **conditions** an order **may** add. Every order names the instrument, the quantity and the side.",
          cite: ALWAYS,
        },
        {
          kind: "choice",
          q: "What are the **most common** conditions traders attach to orders?",
          options: ["Limits on the price they will accept", "Limits on how long the order is valid", "The traders they will trade with", "Where to send the order"],
          answer: 0,
          why: "All four are possible conditions, but the most common ones **limit the price**.",
          cite: COMMON,
        },
        {
          kind: "classify",
          q: "Part of every order, or an optional condition?",
          buckets: ["Every order", "Optional condition"],
          items: [
            { text: "Buy or sell", bucket: 0, why: "Every order says whether to buy or sell." },
            { text: "100 shares", bucket: 0, why: "Every order says how much." },
            { text: "IBM", bucket: 0, why: "Every order names the instrument." },
            { text: "No more than $100 a share", bucket: 1, why: "A price limit: the most common condition." },
            { text: "Good for today only", bucket: 1, why: "How long the order is valid is a condition." },
            { text: "Partial fills are okay", bucket: 1, why: "Whether a partial fill is okay is a condition." },
          ],
          cite: OTHER,
        },
        {
          kind: "truefalse",
          q: "Some orders even specify **which traders** the trader is willing to trade with.",
          answer: true,
          why: "Harris lists it as a condition: some orders name the traders with whom the trader is willing to trade.",
          cite: WHOM,
        },
        {
          kind: "game",
          id: "order-ticket",
          title: "Order ticket",
          brief: "Five traders tell you what they want, in plain words. Build each one's **order ticket**, one field at a time. Every trader comes from the book.",
          game: OrderTicket,
        },
        {
          kind: "fill",
          q: "Harry would issue an ___, ___ order to sell 7,600 shares of XOM, limit 41.05 dollars.",
          bank: ["all-or-nothing", "day", "market", "stop", "weekly"],
          answer: ["all-or-nothing", "day"],
          why: "He wants the **entire quantity at once** (all-or-nothing) and only **during the current session** (a day order).",
          cite: HARRY_ORDER,
        },
        {
          kind: "recap",
          points: [
            { text: "Orders are **instructions** traders give to the brokers and exchanges that arrange their trades.", cite: INSTR },
            { text: "Every order names the **instrument**, the **quantity** and **buy or sell**; most add a **price limit**.", cite: ALWAYS },
            { text: "Your **order submission strategy** is the most important determinant of your success as a trader.", cite: STRATEGY },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.1-why",
      sec: "4.1",
      title: "Why traders use orders",
      pages: "69",
      imp: 2,
      steps: [
        {
          kind: "idea",
          title: "Dealers don't need orders",
          body: "Traders who arrange their own trades, typically **dealers**, decide on the spot. Everyone else must state their intentions **ahead of time**, in an order.",
          cite: DEALERS,
        },
        {
          kind: "idea",
          title: "An order stands in for you",
          body: "For many small traders, watching the market all day doesn't pay. Their orders **represent their interests** while they look away.",
          cite: REPRESENT,
        },
        {
          kind: "see",
          title: "The race to cancel",
          illus: CancelRace,
          beats: [
            { text: "You can't watch the market all day, so you leave an order: **buy 100 at 50**. (Our numbers.)", cite: MONITOR },
            { text: "Bad news: the stock is now worth about 46. Your order no longer makes sense, so you rush to **cancel** it." },
            { text: "Your cancel is slow. Another trader **sells to your old order** first: you bought at 50 something worth 46.", cite: CANCEL },
            { text: "A trader whose **computer** watches and adjusts orders cancels in time. **Speed** is an advantage.", cite: COMPUTERS },
          ],
        },
        {
          kind: "choice",
          q: "Which traders typically **don't** use orders?",
          options: ["Dealers, who arrange their own trades", "Small traders who can't watch the market", "Pension funds", "Traders who trade through brokers"],
          answer: 0,
          why: "Dealers arrange their own trades and decide on the spot. Everyone else expresses their intentions ahead of time.",
          cite: DEALERS,
        },
        {
          kind: "truefalse",
          q: "Traders who use orders can react to changing conditions as fast as traders who arrange their own trades.",
          answer: false,
          why: "Traders who arrange their own trades respond as conditions change. Order writers must **anticipate** changes and write contingencies into their orders.",
          cite: RESPOND,
        },
        {
          kind: "choice",
          q: "You are cancelling an order to replace it with a new one. What can go wrong in the meantime?",
          options: ["Your old order trades before the cancel arrives", "The broker doubles your order", "The market closes your account", "Nothing: cancels are instant"],
          answer: 0,
          why: "While you cancel and resubmit, your old order can trade, or you may miss the chance your new order was meant for.",
          cite: CANCEL,
        },
        {
          kind: "idea",
          title: "Speed wins",
          body: "Traders who respond fastest have an edge. People who cancel and resubmit **by hand** are slower than traders whose **computers** monitor and adjust their orders.",
          cite: QUICK,
        },
        {
          kind: "idea",
          title: "Standard orders prevent costly errors",
          body: "In a fast market a broker must understand **exactly** what you want. So traders use **standard orders** that everyone recognizes.",
          cite: COSTLY,
        },
        {
          kind: "fill",
          q: "To avoid mistakes, most traders use ___ orders to decrease the probability that they will ___ each other when communicating quickly.",
          bank: ["standard", "misunderstand", "custom", "outbid", "secret", "trust"],
          answer: ["standard", "misunderstand"],
          why: "Standard orders mean the same thing to every trader, so fast communication doesn't create errors.",
          cite: STANDARD,
        },
        {
          kind: "multi",
          q: "Why must traders who use orders write them carefully? (Select all that apply.)",
          options: ["They can't respond to conditions as they change", "Cancelling and resubmitting takes time", "An old order can trade before it is cancelled", "Brokers refuse orders with more than two conditions"],
          answer: [0, 1, 2],
          why: "Order writers must anticipate changes; correcting an order costs time, and the old one can trade meanwhile. The last option is made up.",
          cite: RESPOND,
        },
        {
          kind: "recap",
          points: [
            { text: "Dealers arrange their own trades; most other traders **use orders** because they don't.", cite: NECESSARY },
            { text: "Orders must **anticipate** changes: cancelling and resubmitting takes time, and old orders can trade.", cite: CANCEL },
            { text: "Traders use **standard (stylized) orders** to reduce communication errors.", cite: PT_STYLIZED },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "When do traders issue orders, according to Harris?",
      options: ["When they cannot personally negotiate their trades", "Only when they trade more than 100 shares", "Only on exchange floors", "When they act as dealers"],
      answer: 0,
      why: "Orders replace personal negotiation: traders issue them when they can't negotiate the trade themselves.",
      cite: ISSUE,
    },
    {
      kind: "truefalse",
      q: "Harris calls orders the fundamental building blocks of trading strategies.",
      answer: true,
      why: "Every trading strategy is carried out through orders.",
      cite: BLOCKS,
    },
    {
      kind: "choice",
      q: "Why do traders use specialized words and phrases?",
      options: ["To communicate quickly and accurately with each other", "To keep outsiders from trading", "Because regulators require jargon", "To make orders longer"],
      answer: 0,
      why: "Shared market nomenclature lets traders communicate quickly and accurately.",
      cite: VOCAB,
    },
    {
      kind: "fill",
      q: "The proper order used at the right time can make the difference between a good trade, a ___ trade, and ___ trade at all.",
      bank: ["costly", "no", "free", "quick", "every"],
      answer: ["costly", "no"],
      why: "The wrong order can cost you money, or leave you without a trade.",
      cite: PROPER,
    },
  ],
};
