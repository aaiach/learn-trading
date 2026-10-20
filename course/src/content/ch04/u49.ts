// 4.9 VALIDITY AND EXPIRATION INSTRUCTIONS (pp. 82–84)
import type { Cite, Unit } from "../types.ts";
import { ForgottenGtc, IocBook, OpenClose, OpenGood } from "./illus/u49.tsx";
import { OrderClock } from "./games/OrderClock.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const VALID = c(82, "4.9", "Traders specify validity and expiration instructions to indicate when their orders are valid and when their orders expire.");
const IMPORTANT = c(82, "4.9", "Although traders may specify these instructions for all order types, they are especially important for standing limit orders and stop orders.");
const UNFILLED = c(82, "4.9", "These orders generally do not trade immediately upon submission. Some may never trade. Traders therefore need to tell their brokers what to do with their unfilled orders.");
const OPEN = c(82, "4.9", "Open orders are orders that have not yet been executed or canceled.");
const GOOD = c(82, "4.9", "A good order is an order that can be executed. Traders generally do not distinguish between open orders and good orders because all good orders are open orders.");
const MOST_OPEN = c(82, "4.9", "Although most open orders are also good orders, some are not.");
const AFTER_DATE = c(83, "4.9", "an order to buy stock after some specified date is an open order, but before that date it is not a good order.");
const DAY = c(83, "4.9", "Day orders are valid for the trading day on which traders submit them. They expire when the market closes if they have not been filled.");
const DAY_DEFAULT = c(83, "4.9", "The day order instruction is the most common validity instruction. If it is not specified, most brokers assume that an order is a day order.");
const GTC = c(83, "4.9", "Good-till-cancel (GTC) orders are valid until the trader expressly cancels them.");
const GTC_LIST = c(83, "4.9", "To ensure that traders do not forget about their GTC orders, many brokers provide their clients with a list of their unfilled GTC orders at the end of every month.");
const GTC_STALE = c(83, "4.9", "Some brokers cancel GTC orders after a month or two in order to avoid the costs of keeping track of stale orders.");
const GTC_FORGET = c(83, "4.9", "Traders should be careful not to forget their good-till-cancel orders. They may trade as long as they remain open.");
const UNTIL = c(83, "4.9", "Good-until orders are good until a date specified by the trader. Not all brokers accept this order instruction because it requires that they keep track of the expiration date.");
const GTW = c(83, "4.9", "Good-this-week (GTW) and good-this-month (GTM) are special cases of good-until orders.");
const IOC = c(83, "4.9", "Whatever portion of the order that cannot be filled immediately is canceled.");
const IOC_WHY = c(83, "4.9", "Traders use immediate-or-cancel orders when they do not want to give trading options to the market.");
const IOC_AKA = c(83, "4.9", "In some markets, immediate-or-cancel orders are called fill-or-kill orders (FOK) or good-on-sight orders.");
const AFTER = c(83, "4.9", "Good-after orders are good only after some specified date. These orders are quite rare.");
const AFTER_VIP = c(83, "4.9", "Most brokers will not accept them unless you are a very important customer.");
const MOO = c(83, "4.9", "Market-on-open orders are market orders that a broker can fill only at the beginning of the trading session.");
const MOO_AUCTION = c(83, "4.9", "Traders use these orders primarily in markets that open with a single price auction. In such markets, a market-on-open order usually guarantees that the trader will receive the opening price.");
const MOO_CHEAP = c(83, "4.9", "Since these orders are usually easy to execute, brokers sometimes charge lower commissions than they would for a regular market order.");
const MOC = c(83, "4.9", "Market-on-close orders are market orders that a broker can fill only at the close of the trading session.");
const MOC_HOPE = c(83, "4.9", "Traders who submit these orders often do so because they hope to trade at the closing price.");
const MOC_FUNDS = c(83, "4.9", "Closing prices are particularly attractive to mutual funds because they value their funds for deposits and redemptions by using net asset values computed from closing prices.");
const MOC_GUAR = c(83, "4.9", "Brokers will not guarantee that market-on-close orders will fill at the closing price, however. Traders who want such guarantees can buy them from their dealer-brokers by paying higher commissions.");

// Table 4-3, Order Validity and Expiration Instructions (p. 84)
const T43 = (t: string): Cite => c(84, "4.9", t, { table: "Table 4-3" });
const T_EXPIRES = T43("Day order: End of day · Good-this-week (GTW): End of week · Good-this-month (GTM): End of month · Good-until: On specified date · Good-till-cancel (GTC): Never");
const T_GOOD = T43("Immediate-or-cancel (IOC): When submitted · Good-after: After specified date · Market-on-open: At open · Market-on-close: At close");
const T_USAGE = T43("Day order · Common · Good-till-cancel (GTC) · Common · Good-after · Rare · Good-until · Rare");
const T_IOC = T43("Immediate-or-cancel (IOC); Good-on-sight; Fill-or-kill (FOK) · Occasional · When submitted · Immediately following submission");
const T_MOO = T43("Market-on-open · Occasional · At open · After open");
const T_MOC = T43("Market-on-close · Occasional · At close · After close");

export const U49: Unit = {
  sec: "4.9",
  title: "Validity and Expiration Instructions",
  pages: "82–84",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.9-day-gtc",
      sec: "4.9",
      title: "Day, GTC and good-until",
      pages: "82–83",
      imp: 3,
      steps: [
        {
          kind: "idea",
          title: "When is an order valid?",
          body: "**Validity and expiration instructions** say when an order is valid and when it expires. They matter most for **standing limit orders** and **stop orders**, which may not trade at once, or ever.",
          cite: IMPORTANT,
        },
        { kind: "definition", term: "Open orders", body: "Orders that have not yet been **executed** or **canceled**.", cite: OPEN },
        { kind: "definition", term: "Good orders", body: "Orders that **can be executed** now. Every good order is open, but an open order is not always good.", cite: GOOD },
        {
          kind: "see",
          title: "Open, good, or neither?",
          illus: OpenGood,
          beats: [
            { text: "Monday you send an order to buy XYZ at 30 or less, but **only after Wednesday** (our example). It is **open**: not executed, not canceled.", cite: OPEN },
            { text: "Before Wednesday no broker may execute it. It is open, but **not yet good**.", cite: AFTER_DATE },
            { text: "From Wednesday it **can be executed**: now it is a **good** order too.", cite: GOOD },
            { text: "Thursday it fills. Executed, it is no longer open, and no longer good." },
          ],
        },
        {
          kind: "truefalse",
          q: "Every open order is also a good order.",
          answer: false,
          why: "Most open orders are good, but not all: an order to buy only after some date is open, yet not good before that date.",
          cite: MOST_OPEN,
        },
        { kind: "definition", term: "Day orders", body: "Valid for the **trading day** you submit them. If they haven't filled, they **expire at the close**.", cite: DAY },
        {
          kind: "choice",
          q: "A client says “Buy 200 at $35” and nothing about how long the order is valid. Most brokers will treat it as…",
          options: ["A day order", "A good-till-cancel order", "An immediate-or-cancel order", "A good-this-week order"],
          answer: 0,
          why: "The day order is the most common validity instruction, and brokers assume it when none is given.",
          cite: DAY_DEFAULT,
        },
        {
          kind: "definition",
          term: "Good-till-cancel orders",
          aka: ["GTC orders"],
          body: "Valid until **you cancel them**. They can keep working for weeks or months.",
          cite: GTC,
        },
        {
          kind: "see",
          title: "The GTC order you forgot",
          illus: ForgottenGtc,
          beats: [
            { text: "January: you place a **GTC** order to buy at $40 while the stock trades near $48 (our numbers).", cite: GTC },
            { text: "At each month end, many brokers send a **list of your unfilled GTC orders**, so you don't forget them.", cite: GTC_LIST },
            { text: "By March you've forgotten it. It is still **open**." },
            { text: "April: the price dips to $40 and the order **trades**. A forgotten GTC order can still fill.", cite: GTC_FORGET },
          ],
        },
        {
          kind: "truefalse",
          q: "Some brokers cancel GTC orders after a month or two.",
          answer: true,
          why: "They do it to avoid the costs of keeping track of stale orders.",
          cite: GTC_STALE,
        },
        {
          kind: "definition",
          term: "Good-until orders",
          body: "Valid until a **date you choose**. **Good-this-week** (GTW) and **good-this-month** (GTM) are special cases. Not every broker accepts them.",
          cite: UNTIL,
        },
        {
          kind: "match",
          q: "When does each order expire? (Table 4-3)",
          pairs: [
            ["Day order", "End of day"],
            ["GTW", "End of week"],
            ["GTM", "End of month"],
            ["Good-until", "On the date you set"],
            ["GTC", "Never: until you cancel"],
          ],
          cite: T_EXPIRES,
        },
        {
          kind: "classify",
          q: "Which instruction does each trader need?",
          buckets: ["Day", "GTC", "Good-until"],
          items: [
            { text: "Buy at $40 if it dips today. If not, forget it.", bucket: 0, why: "Valid only today: a day order." },
            { text: "“Sell 500 at $52,” with nothing said about timing.", bucket: 0, why: "Most brokers assume a day order." },
            { text: "Keep my bid working until I tell you to stop.", bucket: 1, why: "Valid until expressly canceled: GTC." },
            { text: "Leave my stop order in for months, whatever happens.", bucket: 1, why: "No end date: GTC." },
            { text: "Keep it working until the 21st, then drop it.", bucket: 2, why: "A date the trader specifies: good-until." },
            { text: "Good this month only.", bucket: 2, why: "GTM is a special case of good-until." },
          ],
          cite: T_EXPIRES,
        },
        {
          kind: "today",
          title: "No GTC or stop orders at the NYSE",
          body: "In late February 2016 the **NYSE stopped accepting** stop and good-till-cancel orders. Brokers still offer both: they **hold the order** themselves and send it to the market when it's triggered.",
          source: "NYSE client notices (2015–2016)",
        },
        {
          kind: "recap",
          points: [
            { text: "**Open** = not executed or canceled; **good** = can be executed now. All good orders are open.", cite: GOOD },
            { text: "**Day** orders expire at the close; with no instruction, brokers assume a day order.", cite: DAY_DEFAULT },
            { text: "**GTC** orders last until canceled, so don't forget them. **Good-until** orders (GTW, GTM) end on a set date.", cite: GTC_FORGET },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.9-ioc-open-close",
      sec: "4.9",
      title: "IOC, on the open, on the close",
      pages: "83–84",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Immediate-or-cancel orders",
          aka: ["IOC", "fill-or-kill (FOK)", "good-on-sight"],
          body: "Valid only **at the moment** they reach the market. Whatever can't fill immediately is **canceled**.",
          cite: IOC,
        },
        {
          kind: "idea",
          title: "IOC leaves no free option",
          body: "A standing order is a **trading option** that other traders can take when it suits them. An IOC order never stands, so it never gives that option away.",
          cite: IOC_WHY,
        },
        {
          kind: "see",
          title: "An IOC order meets the book",
          illus: IocBook,
          beats: [
            { text: "300 shares are offered at **50.10**, more above (our numbers). An **IOC** order to buy 600, limit 50.10, arrives." },
            { text: "It takes everything available at its limit at once: **300 shares** at 50.10." },
            { text: "The other 300 can't fill **immediately**, so they are **canceled**. Nothing of the order stays in the book.", cite: IOC },
            { text: "A **day** limit order would have left 300 bid at 50.10: a free option for sellers. IOC avoids exactly that.", cite: IOC_WHY },
          ],
        },
        {
          kind: "number",
          q: "An IOC order to buy 1,000 shares, limit $25.00, reaches the market. Only 400 shares are offered at $25.00 or less. How many shares are **canceled**?",
          answer: 600,
          unit: "shares",
          illustrative: true,
          why: "It buys the 400 available at once; the unfilled 600 are canceled immediately.",
          cite: IOC,
        },
        {
          kind: "choice",
          q: "In some markets, immediate-or-cancel orders go by other names. Which?",
          options: ["Fill-or-kill or good-on-sight orders", "Good-till-cancel orders", "Market-not-held orders", "Good-after orders"],
          answer: 0,
          why: "The book: in some markets IOC orders are called fill-or-kill (FOK) or good-on-sight orders.",
          cite: IOC_AKA,
        },
        {
          kind: "today",
          title: "IOC and FOK are no longer the same",
          body: "Most U.S. brokers and exchanges now treat them differently. **IOC** fills what it can at once and cancels the rest. **FOK** must fill **completely** at once, or it is canceled.",
          source: "Common U.S. broker and exchange order definitions",
        },
        {
          kind: "definition",
          term: "Good-after orders",
          body: "Good only **after a date** you choose. Quite **rare**: most brokers accept them only from very important customers.",
          cite: AFTER,
        },
        {
          kind: "definition",
          term: "Market-on-open orders",
          body: "**Market orders** a broker may fill only at the **beginning** of the trading session.",
          cite: MOO,
        },
        {
          kind: "definition",
          term: "Market-on-close orders",
          body: "**Market orders** a broker may fill only at the **close** of the trading session. Traders hope to get the **closing price**.",
          cite: MOC,
        },
        {
          kind: "see",
          title: "The open and the close",
          illus: OpenClose,
          beats: [
            { text: "**Market-on-open** orders wait: a broker may fill them only at the **beginning** of the session.", cite: MOO },
            { text: "Where the market opens with a **single price auction**, they usually all trade at the **opening price**.", cite: MOO_AUCTION },
            { text: "A mutual fund sends **market-on-close** orders: it values its fund at **net asset value**, computed from closing prices.", cite: MOC_FUNDS },
            { text: "Brokers **don't guarantee** the closing price. A dealer-broker will, for **higher commissions**.", cite: MOC_GUAR },
          ],
        },
        {
          kind: "truefalse",
          q: "Brokers guarantee that market-on-close orders fill at the closing price.",
          answer: false,
          why: "They don't. A trader who wants that guarantee buys it from a dealer-broker by paying higher commissions.",
          cite: MOC_GUAR,
        },
        {
          kind: "choice",
          q: "Why do mutual funds like to trade at the close?",
          options: [
            "They value deposits and redemptions at net asset values computed from closing prices",
            "Commissions are always zero at the close",
            "The exchange guarantees every closing trade",
            "Only funds may trade at the close",
          ],
          answer: 0,
          why: "Fund deposits and redemptions are valued at NAV, computed from closing prices.",
          cite: MOC_FUNDS,
        },
        {
          kind: "game",
          id: "order-clock",
          title: "Order clock",
          brief: "Eight traders tell you **when** their orders should be valid. Pick the instruction from Table 4-3, then watch the order's life on the week. Keys **1–9** work too.",
          game: OrderClock,
        },
        {
          kind: "today",
          title: "Closing auctions",
          body: "The **NYSE** and **Nasdaq** run **closing auctions** that set the official closing price. Market-on-close orders trade in them.",
          source: "NYSE and Nasdaq closing auction rules",
        },
        {
          kind: "recap",
          points: [
            { text: "**IOC** (also fill-or-kill, good-on-sight): fill now, cancel the rest, leave no free option.", cite: IOC_WHY },
            { text: "**Market-on-open** and **market-on-close** orders trade only at the open or at the close.", cite: MOO },
            { text: "Funds like the close (NAV uses closing prices), but brokers **don't guarantee** the closing price.", cite: MOC_GUAR },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "fill",
      q: "Validity and expiration instructions indicate when orders are ___ and when they ___.",
      bank: ["valid", "expire", "settle", "clear"],
      answer: ["valid", "expire"],
      why: "That is what these instructions are for.",
      cite: VALID,
    },
    {
      kind: "choice",
      q: "Why do validity instructions matter most for standing limit orders and stop orders?",
      options: [
        "They often don't trade at once, so brokers must know what to do with them unfilled",
        "They always trade at the open",
        "They are the only orders brokers may cancel",
        "Exchanges require them by law",
      ],
      answer: 0,
      why: "These orders generally don't trade on submission, and some never trade.",
      cite: UNFILLED,
    },
    {
      kind: "fill",
      q: "Good-this-week and good-this-month orders are special cases of ___ orders.",
      bank: ["good-until", "good-after", "day", "immediate-or-cancel"],
      answer: ["good-until"],
      why: "GTW and GTM are good-until orders with the date set to the end of the week or month.",
      cite: GTW,
    },
    {
      kind: "truefalse",
      q: "Most brokers accept good-after orders from any customer.",
      answer: false,
      why: "Good-after orders are rare; most brokers accept them only from very important customers.",
      cite: AFTER_VIP,
    },
    {
      kind: "choice",
      q: "Why do brokers sometimes charge lower commissions for market-on-open orders?",
      options: ["They are usually easy to execute", "They never trade", "The exchange pays the commission", "They are always small"],
      answer: 0,
      why: "Market-on-open orders are usually easy to execute.",
      cite: MOO_CHEAP,
    },
    {
      kind: "truefalse",
      q: "Traders often submit market-on-close orders because they hope to trade at the closing price.",
      answer: true,
      why: "Hoping for the closing price is the usual reason; it just isn't guaranteed.",
      cite: MOC_HOPE,
    },
    {
      kind: "choice",
      q: "According to Table 4-3, when does a good-after order become good?",
      options: ["After the specified date", "When submitted", "At the open", "At the close"],
      answer: 0,
      why: "Good-after: good after the specified date; its expiry is not specified.",
      cite: T_GOOD,
    },
    {
      kind: "multi",
      q: "Which validity instructions does Table 4-3 call **common**?",
      options: ["Day order", "Good-till-cancel (GTC)", "Good-after", "Good-until"],
      answer: [0, 1],
      why: "Day and GTC orders are common; good-after and good-until orders are rare.",
      cite: T_USAGE,
    },
    {
      kind: "choice",
      q: "According to Table 4-3, when does an immediate-or-cancel order expire?",
      options: ["Immediately following submission", "End of day", "Never", "After the open"],
      answer: 0,
      why: "IOC orders are good when submitted and expire immediately after.",
      cite: T_IOC,
    },
    {
      kind: "choice",
      q: "According to Table 4-3, a market-on-open order is good…",
      options: ["At the open", "When submitted", "At the close", "After a specified date"],
      answer: 0,
      why: "Market-on-open: good at the open, expires after the open.",
      cite: T_MOO,
    },
    {
      kind: "fill",
      q: "In Table 4-3, a market-on-close order is good ___ and expires ___.",
      bank: ["at close", "after close", "at open", "when submitted", "end of week"],
      answer: ["at close", "after close"],
      why: "It can trade only at the close, and expires right after.",
      cite: T_MOC,
    },
  ],
};
