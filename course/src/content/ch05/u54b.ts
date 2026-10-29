// 5.4.4 TRANSPARENCY and 5.4.5 ORDER ROUTING SYSTEMS (pp. 101–106), part of unit 5.4 Market Information Systems.
import type { Cite, Lesson, Question } from "../types.ts";
import {
  Consolidation,
  DealerMargin,
  ExAnteExPost,
  FirstHalf,
  LatencyRace,
  NasdaqLevels,
  PhoneOrScreen,
  RoutingMap,
  TopOfBook,
  TransparencyMap,
  TugOfWar,
} from "./illus/u54b.tsx";
import { WhatCanYouSee } from "./games/WhatCanYouSee.tsx";

const c = (p: number | string, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 5.4.4 Transparency (p. 101) ───────────────────────────────────
const USES = c(101, "5.4.4", "The public uses these data to predict future price changes, to predict when their orders will execute, and to evaluate their brokers' performance.");
const CONFIDENCE = c(101, "5.4.4", "Without this information, public traders would not have much confidence in the markets.");
const TRANSPARENT = c(101, "5.4.4", "Transparent markets quickly report complete information to the public.");
const EXANTE = c(101, "5.4.4", "Markets that quickly report quotes and orders are ex ante transparent.");
const EXPOST = c(101, "5.4.4", "Those which quickly report trades are ex post transparent.");
const TIME = c(101, "5.4.4", "The terms ex ante and ex post refer to the time of the trade.");
const PRE = c(101, "5.4.4", "The terms pre-trade transparency and post-trade transparency are also used.");
const OPAQUE = c(101, "5.4.4", "Opaque markets are not transparent.");
const TOP = c(101, "5.4.4", "Markets that report only the best bid and offer show the top of the book.");
const BYPRICE = c(101, "5.4.4", "Markets that report bids and offers at multiple prices show the market by price.");
const OPENBOOKS = c(101, "5.4.4", "These markets have open limit order books.");
const USEQ = c(101, "5.4.4", "Table 5-7 shows that U.S. equity and equity options markets are quite transparent.");
const FUT = c(101, "5.4.4", "U.S. futures markets are ex post transparent, but not ex ante transparent.");
const FUT_WHY = c(101, "5.4.4", "In these oral auctions, quotes generally do not stand long enough to be reported.");
const BONDS = c(101, "5.4.4", "Over-the-counter corporate and municipal bond markets are generally quite opaque.");
const CANTOR = c(101, "5.4.4", "In these markets, interdealer bond brokerages such as Cantor Fitzgerald provide information to the public.");
const AMBIV = c(101, "5.4.4", "Traders are often ambivalent about transparency.");
const FAVOR = c(101, "5.4.4", "They favor transparency when it allows them to see more of what other traders are doing, but they oppose it when it requires that they reveal more of what they are doing.");
const LEAST = c(101, "5.4.4", "Generally, those who know the least about market conditions most favor transparency.");
const MOST = c(101, "5.4.4", "Those who know the most oppose transparency because they do not want to give up their informational advantages.");
const REDUNDANT = c(101, "5.4.4", "Markets produce an enormous volume of information, much of which is redundant.");
const HALF = c(101, "5.4.4", "Traders say that the first half of that information is much more important than the second half.");
// Box "Transparency and Dealer Profitability" (p. 101)
const DP = { box: "Transparency and Dealer Profitability" };
const BANKS = c(101, "5.4.4", "Large U.S. investment banks generally make more money trading bonds than stocks.", DP);
const EXPLAIN = c(101, "5.4.4", "The greater transparency of the U.S. stock markets may help explain this result.", DP);
const NEGOTIATE = c(101, "5.4.4", "When customers know current market conditions well, they negotiate better prices with their dealers.", DP);
// Table 5-7 (p. 102), checked word by word against the page
const T57 = (t: string): Cite => c(102, "5.4.4", t, { table: "Table 5-7" });
const T57_US = T57("U.S. equity and equity options exchanges · The best bid and offer immediately · No other prices or quantities · All trades immediately and in no event later than 90 seconds");
const T57_NASDAQ = T57("Nasdaq · All dealer quotes immediately · All trades immediately and in no event later than 90 seconds");
const T57_FUT = T57("U.S. futures markets · Reported only by your broker's representative on the floor · All price changes immediately");
const T57_OTC = T57("U.S. OTC corporate and municipal bond markets · Generally not reported · Only through some bond brokers");
const T57_FX = T57("Foreign exchange markets · Provided by various data vendors · None");
const T57_TSX = T57("Toronto Stock Exchange · Aggregate quantities of all orders at the five best prices on both sides of the market · All trades immediately");
const T57_PARIS = T57("Euronext Paris Bourse · All orders · All trades immediately");
// 5.6 Some points to remember (p. 111)
const PT_FAVOR = c(111, "5.6", "Public traders generally favor transparent markets.");

// ── Excerpts: 5.4.5 Order Routing Systems (pp. 102–106) ─────────────────────
const WHO = c(102, "5.4.5", "Customers use them to send orders to their brokers and dealers, brokers use them to send customer orders to dealers and to exchanges, dealers use them to send orders to other dealers, and exchanges use them to send orders to other exchanges.");
const CANCEL = c(102, "5.4.5", "Traders also use order-routing systems to transmit cancellation instructions, and exchanges and dealers use them to report trades to their customers.");
const FAST = c(102, "5.4.5", "Good order-routing systems are fast and accurate.");
const WHYFAST = c(102, "5.4.5", "Traders demand fast systems because they do not want to miss trading opportunities and because they value their time.");
const STRATEGIES = c(102, "5.4.5", "The strategies that traders can profitably undertake depend on the order-routing systems available to them.");
const HFT = c(103, "5.4.5", "Either they must trade on the floor of an exchange, or they must use fast order-routing systems, preferably with good computer interfaces.");
const STILL = c(103, "5.4.5", "In some places, however, traders still carry, shout, or hand-signal orders across rooms.");
const ELEC = c(103, "5.4.5", "Electronic order-routing systems are usually faster, more accurate, and cheaper to operate than other routing systems.");
const DISADV = c(103, "5.4.5", "The main disadvantage of these systems is that they can handle only the standardized orders and instructions that they are programmed to recognize.");
const SPECIAL = c(103, "5.4.5", "When traders want to issue special instructions, they typically use the telephone.");
const TALK = c(103, "5.4.5", "Traders also use the telephone when they want to talk to their brokers about current market conditions before they submit their orders.");
const DEPENDS = c(103, "5.4.5", "Which order-routing systems traders use depends on how often they trade, on how large their trades are, and on whether they can physically access an electronic communications network.");
const INFREQ = c(103, "5.4.5", "Infrequent traders usually do not use electronic systems because the fixed costs of building them and learning to use them are large relative to their needs.");
const CHEAPER = c(103, "5.4.5", "Retail brokerages generally offer lower commissions for orders entered through the Internet because they are less costly to handle than telephone orders.");
const CLERKS = c(103, "5.4.5", "they avoid mistakes that occasionally occur when a telephone order clerk hears or records something different from what a customer intends.");
const INST = c(104, "5.4.5", "Institutional traders most commonly send orders to their brokers and dealers by telephone.");
const ITS = c(105, "5.4.5", "ITS is an electronic system that allows traders in one market to send orders to another market.");
const T58 = (t: string): Cite => c(106, "5.4.5", t, { table: "Table 5-8" });
const T58_NYSE = T58("New York Stock Exchange · SuperDOT · Super Designated Order Turnaround · Equities");
// Box "Floor Trader Advantages" (p. 104)
const FTA = { box: "Floor Trader Advantages" };
const FT_SEE = c(104, "5.4.5", "Floor traders have an advantage over off-floor traders because they can see and react to market developments well before off-floor traders can.", FTA);
const FT_DATA = c(104, "5.4.5", "The best market data systems report information in less than three seconds.", FTA);
const FT_ROUTE = c(104, "5.4.5", "The best order-routing systems pass orders from the client to a broker in less than five seconds.", FTA);
const FT_RUNNER = c(104, "5.4.5", "If the routing system requires a runner, the delay can be substantially longer.", FTA);
const FT_WHO = c(104, "5.4.5", "In particular, they observe who is trading.", FTA);
const FT_WHY = c(104, "5.4.5", "Knowing who is trading can be valuable if you can guess why they want to trade or whom they represent.", FTA);
// Box "The Telegraph and Hand Signaling at the American Stock Exchange" (p. 104)
const AMX = { box: "The Telegraph and Hand Signaling at the American Stock Exchange" };
const AM_CURB = c(104, "5.4.5", "It was then known as the New York Curb Exchange because its members worked on the street curbs.", AMX);
const AM_SIGNAL = c(104, "5.4.5", "The clerks then used hand signals to transmit the orders down to their brokers on the street, and brokers sent trade reports back through the same system.", AMX);
// Box "Telegraphs, Ticker Tapes, Telephones, and Electronic Data Networks" (p. 105)
const TEL = { box: "Telegraphs, Ticker Tapes, Telephones, and Electronic Data Networks" };
const TG_CITY = c(105, "5.4.5", "Consequently, every major city had its own exchange, and prices for the same instruments would differ substantially across geographic regions.", TEL);
const TG_FIRST = c(105, "5.4.5", "Although the first users were arbitrageurs, other traders soon started routing their orders to the best markets.", TEL);
const TG_LIQUID = c(105, "5.4.5", "Markets that acquired a reputation for being liquid attracted more orders and thereby became even more liquid.", TEL);
const TG_FAIL = c(105, "5.4.5", "Smaller markets then started to fail. They either quit trading or combined to form larger markets.", TEL);
const TG_EVERY = c(105, "5.4.5", "Every innovation in telecommunications has increased competition among traders and has led to market consolidation.", TEL);
// Box "Nasdaq Level I, II, and III Services" (p. 105)
const NL = { box: "Nasdaq Level I, II, and III Services" };
const NL_THREE = c(105, "5.4.5", "Nasdaq provides three levels of quotation services through various data vendors", NL);
const NL_ONE = c(105, "5.4.5", "Level I service consists of real-time inside bid/ask quotations for Nasdaq Stock Market securities and for OTC Bulletin Board securities.", NL);
const NL_TWO = c(105, "5.4.5", "Level II service provides real-time access to all dealer quotations in these securities.", NL);
const NL_THREE_WHO = c(105, "5.4.5", "Level III service is available only to registered Nasdaq market makers.", NL);
const NL_THREE_WHAT = c(105, "5.4.5", "It consists of all Level II service information plus the ability to enter quotations, route orders, execute orders, and send messages.", NL);

export const U54B_LESSONS: Lesson[] = [
  // ── 5.4.4 Lesson 1 ────────────────────────────────────────────────────────
  {
    id: "5.4.4-transparency",
    sec: "5.4.4",
    title: "Transparent and opaque markets",
    pages: "101",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Transparent market",
        body: "A market that **quickly reports complete information** to the public. A market that doesn't is **opaque**.",
        cite: TRANSPARENT,
      },
      {
        kind: "definition",
        term: "Ex ante transparency",
        aka: ["pre-trade transparency"],
        body: "Quick public reports of **quotes and orders**: what traders offer **before** a trade happens.",
        cite: EXANTE,
      },
      {
        kind: "definition",
        term: "Ex post transparency",
        aka: ["post-trade transparency"],
        body: "Quick public reports of **trades**: the prices and sizes **after** they happen.",
        cite: EXPOST,
      },
      {
        kind: "see",
        title: "Before the trade, after the trade",
        illus: ExAnteExPost,
        beats: [
          { text: "A market knows its **quotes and orders** before each trade, and its **trades** as they happen. What does the public get?", cite: TIME },
          { text: "It reports **quotes and orders** quickly: the market is **ex ante** (pre-trade) transparent.", cite: EXANTE },
          { text: "It reports **trades** quickly: the market is also **ex post** (post-trade) transparent.", cite: EXPOST },
          { text: "U.S. futures pits: **ex post** transparent, not **ex ante**. Quotes **don't stand long enough** to be reported.", cite: FUT_WHY },
          { text: "An **opaque** market reports neither.", cite: OPAQUE },
        ],
      },
      {
        kind: "classify",
        q: "Ex ante (pre-trade) or ex post (post-trade) information?",
        buckets: ["Ex ante", "Ex post"],
        items: [
          { text: "Best bid and offer on a screen", bucket: 0, why: "Quotes exist before any trade." },
          { text: "Last sale: 300 at 20.12", bucket: 1, why: "A trade report comes after the trade." },
          { text: "A standing limit order in the book", bucket: 0, why: "Orders are pre-trade information." },
          { text: "Trade reported within 90 seconds", bucket: 1, why: "Trade reports are post-trade information." },
          { text: "A dealer's two-sided quote", bucket: 0, why: "A quote is an offer to trade, made before the trade." },
          { text: "The day's trades on the tape", bucket: 1, why: "The tape reports trades after they happen." },
        ],
        cite: TIME,
      },
      {
        kind: "truefalse",
        q: "A market that quickly reports its **trades** but not its quotes is **ex ante** transparent.",
        answer: false,
        why: "Quick trade reports make it **ex post** transparent. Ex ante transparency needs quick reports of **quotes and orders**.",
        cite: EXANTE,
      },
      {
        kind: "choice",
        q: "What do the terms **ex ante** and **ex post** refer to?",
        options: ["The time of the trade", "The size of the trade", "Who reports the trade", "The price of the trade"],
        answer: 0,
        why: "Ex ante means before the trade (quotes, orders); ex post means after it (trade reports).",
        cite: TIME,
      },
      {
        kind: "definition",
        term: "Top of the book",
        body: "What a market shows when it reports **only the best bid and the best offer**.",
        cite: TOP,
      },
      {
        kind: "definition",
        term: "Market by price",
        body: "What a market shows when it reports **bids and offers at several prices**. Such markets have **open limit order books**.",
        cite: BYPRICE,
      },
      {
        kind: "see",
        title: "How much of the book is public?",
        illus: TopOfBook,
        beats: [
          { text: "Inside the market, the **order book** holds bids and offers at many prices. (Our numbers.)" },
          { text: "An **opaque** market reports none of it: the public sees nothing.", cite: OPAQUE },
          { text: "**Top of the book**: only the **best bid** (20.10) and the **best offer** (20.15).", cite: TOP },
          { text: "**Market by price**: bids and offers at **multiple prices**, an **open limit order book**.", cite: BYPRICE },
        ],
      },
      {
        kind: "choice",
        q: "A public screen shows only **20.10 bid, 20.15 offered**. What does this market show?",
        fig: { illus: TopOfBook, beat: 2 },
        options: ["The top of the book", "The market by price", "An opaque market", "Only trade reports"],
        answer: 0,
        why: "Reporting **only the best bid and offer** shows the top of the book. Sizes at other prices would make it market by price.",
        cite: TOP,
      },
      {
        kind: "multi",
        q: "What does the public use the data markets release for? (Select all that apply.)",
        options: ["To predict future price changes", "To predict when their orders will execute", "To evaluate their brokers' performance", "To see other traders' account balances", "To set the exchange's fees"],
        answer: [0, 1, 2],
        why: "Harris names three uses: predicting **prices**, predicting **executions** and **evaluating brokers**.",
        cite: USES,
      },
      {
        kind: "truefalse",
        q: "Markets that report bids and offers at **multiple prices** have **open limit order books**.",
        answer: true,
        why: "Showing the market by price means the limit order book is open to view.",
        cite: OPENBOOKS,
      },
      {
        kind: "recap",
        points: [
          { text: "**Transparent** markets quickly report complete information; **opaque** ones don't.", cite: TRANSPARENT },
          { text: "**Ex ante** (pre-trade) = quotes and orders; **ex post** (post-trade) = trades.", cite: EXANTE },
          { text: "**Top of the book** = best bid and offer only; **market by price** = several prices (open book).", cite: BYPRICE },
        ],
      },
    ],
  },

  // ── 5.4.4 Lesson 2 ────────────────────────────────────────────────────────
  {
    id: "5.4.4-markets",
    sec: "5.4.4",
    title: "How transparent is each market?",
    pages: "101–102",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Transparency varies by market",
        body: "**U.S. equity and options markets** are quite transparent. **OTC corporate and municipal bonds** are quite opaque. Most markets sit in between.",
        cite: USEQ,
      },
      {
        kind: "idea",
        title: "Futures: trades yes, quotes no",
        body: "In U.S. futures pits, quotes **don't stand long enough** to be reported. So these markets are **ex post** transparent but not **ex ante**.",
        cite: FUT,
      },
      {
        kind: "see",
        title: "Four markets, four answers",
        illus: TransparencyMap,
        beats: [
          { text: "Two questions for any market: are **quotes** reported to the public? Are **trades**?" },
          { text: "**U.S. stock and option exchanges**: the best bid and offer immediately, every trade within 90 seconds.", cite: T57_US },
          { text: "**U.S. futures**: every price change at once, but quotes only from your broker's floor representative.", cite: T57_FUT },
          { text: "**Foreign exchange**: data vendors provide quotes, but there are **no trade reports**.", cite: T57_FX },
          { text: "**OTC corporate and municipal bonds**: quotes generally not reported, trades only through some brokers.", cite: T57_OTC },
        ],
      },
      {
        kind: "choice",
        q: "In the U.S. **government bond** markets, who provides quotes and trade information to the public?",
        options: ["Interdealer bond brokers such as Cantor Fitzgerald", "The Federal Reserve", "The futures exchanges", "Nobody: the market is fully opaque"],
        answer: 0,
        why: "Government bonds are more transparent than corporate bonds because **interdealer brokers** publish information.",
        cite: CANTOR,
      },
      {
        kind: "truefalse",
        q: "Foreign exchange markets publish a report of every trade.",
        answer: false,
        why: "In Table 5-7, data vendors provide FX quotes, and trade reports: **none**.",
        cite: T57_FX,
      },
      {
        kind: "choice",
        q: "Which description fits **U.S. futures markets**?",
        options: ["Ex post transparent, but not ex ante", "Ex ante transparent, but not ex post", "Fully transparent", "Fully opaque"],
        answer: 0,
        why: "Price changes are reported at once (ex post); quotes in the pit don't stand long enough to be reported (not ex ante).",
        cite: FUT,
      },
      {
        kind: "game",
        id: "what-can-you-see",
        title: "What can you see?",
        brief: "You trade in a market from **Table 5-7**. Pick what you can see of its **current quotes** and its **trade reports**. Eight markets, two answers each.",
        game: WhatCanYouSee,
      },
      {
        kind: "match",
        q: "Match each market to what it shows of its current quotes.",
        pairs: [
          ["Euronext Paris", "All orders"],
          ["Toronto", "Size at the five best prices"],
          ["Nasdaq", "All dealer quotes"],
          ["U.S. stock exchanges", "Best bid and offer only"],
        ],
        cite: T57_PARIS,
      },
      {
        kind: "idea",
        title: "Opacity pays dealers",
        body: "Large U.S. investment banks make more money trading **bonds** than **stocks**. Stock markets' greater **transparency** may explain it.",
        cite: BANKS,
      },
      {
        kind: "see",
        title: "A dealer quotes two customers",
        illus: DealerMargin,
        beats: [
          { text: "A customer asks a dealer for a price. (Our numbers.)" },
          { text: "In a **transparent** market the customer sees 20.10–20.12, so the dealer must quote close to it.", cite: NEGOTIATE },
          { text: "In an **opaque** market the customer sees nothing, and the dealer can quote a much **wider** price.", cite: EXPLAIN },
          { text: "When customers know market conditions well, they **negotiate better prices**. Opacity favors the dealer.", cite: NEGOTIATE },
        ],
      },
      {
        kind: "choice",
        q: "Why might large U.S. investment banks make more money trading bonds than stocks?",
        options: [
          "Bond customers see less of the market, so they negotiate worse prices",
          "Bonds always move more than stocks",
          "Banks are not allowed to trade stocks",
          "Bond customers pay no commissions",
        ],
        answer: 0,
        why: "Stock markets are more **transparent**: customers who know current conditions negotiate better prices with dealers.",
        cite: EXPLAIN,
      },
      {
        kind: "today",
        title: "U.S. bonds are far less opaque now",
        body: "FINRA's **TRACE** system, phased in from 2002 to 2005, publishes almost every U.S. **corporate bond** trade. **Municipal bond** trades appear on the MSRB's **EMMA** website.",
        source: "FINRA (TRACE) and MSRB (EMMA)",
      },
      {
        kind: "recap",
        points: [
          { text: "U.S. **equity and options** markets are quite transparent; **OTC corporate and municipal bonds** are opaque.", cite: USEQ },
          { text: "U.S. **futures** are **ex post** transparent only; **FX** has quotes from vendors but no trade reports.", cite: T57_FX },
          { text: "Customers who know market conditions **negotiate better prices**, so opacity favors dealers.", cite: NEGOTIATE },
        ],
      },
    ],
  },

  // ── 5.4.4 Lesson 3 ────────────────────────────────────────────────────────
  {
    id: "5.4.4-who",
    sec: "5.4.4",
    title: "Who wants transparency",
    pages: "101",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Traders are ambivalent",
        body: "Traders **favor** transparency when it lets them **see** what others do, and **oppose** it when it makes them **reveal** what they do.",
        cite: FAVOR,
      },
      {
        kind: "idea",
        title: "The less you know, the more you want it",
        body: "Those who know the **least** about market conditions favor transparency **most**.",
        cite: LEAST,
      },
      {
        kind: "quote",
        lead: "Why the best-informed push back:",
        cite: MOST,
        mark: ["informational advantages"],
      },
      {
        kind: "see",
        title: "Turn transparency up",
        illus: TugOfWar,
        beats: [
          { text: "Two traders in a market that reports little. One knows little about market conditions, the other a lot.", cite: AMBIV },
          { text: "Turn transparency up: the less-informed trader **sees more**, so they favor it.", cite: LEAST },
          { text: "The well-informed trader must **reveal more** and loses an edge, so they oppose it.", cite: MOST },
          { text: "Every trader wants to **see** others' orders without **showing** their own.", cite: FAVOR },
        ],
      },
      {
        kind: "classify",
        q: "Who is more likely to **favor** more transparency, and who to **oppose** it?",
        buckets: ["Favors", "Opposes"],
        items: [
          { text: "A small investor who rarely watches the market", bucket: 0, why: "Knows little, so gains the most from seeing more." },
          { text: "A dealer who sees heavy order flow", bucket: 1, why: "Knows a lot and would give up an informational advantage." },
          { text: "A trader hiding a large order", bucket: 1, why: "Transparency would make them reveal what they are doing." },
          { text: "An investor checking a broker's fills", bucket: 0, why: "Public data lets them evaluate their broker." },
          { text: "A well-informed trader with an edge", bucket: 1, why: "Those who know the most oppose transparency." },
          { text: "A newcomer to the market", bucket: 0, why: "Those who know the least favor it most." },
        ],
        cite: LEAST,
      },
      {
        kind: "choice",
        q: "Generally, who favors transparency **most**?",
        options: ["Those who know the least about market conditions", "Those who know the most about market conditions", "Dealers with large inventories", "Traders with large orders to hide"],
        answer: 0,
        why: "The less you know, the more you gain from seeing what others do.",
        cite: LEAST,
      },
      {
        kind: "truefalse",
        q: "The same trader can favor transparency and oppose it.",
        answer: true,
        why: "Traders like seeing **others'** orders and dislike **revealing** their own.",
        cite: FAVOR,
      },
      {
        kind: "idea",
        title: "The first half matters most",
        body: "Much market information is **redundant**. Traders say the **first half** of it is far more important than the second: seeing a little helps a lot.",
        cite: HALF,
      },
      {
        kind: "see",
        title: "Seeing a little helps a lot",
        illus: FirstHalf,
        beats: [
          { text: "Markets produce an **enormous volume** of information, much of it **redundant**.", cite: REDUNDANT },
          { text: "The **first half** of it tells a trader most of what matters. (Our picture.)", cite: HALF },
          { text: "The **second half** adds much less.", cite: HALF },
        ],
      },
      {
        kind: "choice",
        q: "Traders say the **first half** of market information is…",
        options: ["Much more important than the second half", "As important as the second half", "Less important than the second half", "Mostly redundant"],
        answer: 0,
        why: "Being able to see just a little of what is going on matters a lot to traders who would otherwise be in the dark.",
        cite: HALF,
      },
      {
        kind: "fill",
        q: "Markets produce an enormous volume of information, much of which is ___.",
        bank: ["redundant", "secret", "delayed", "false"],
        answer: ["redundant"],
        why: "A lot of market information repeats what traders already know.",
        cite: REDUNDANT,
      },
      {
        kind: "truefalse",
        q: "Public traders generally favor transparent markets.",
        answer: true,
        why: "One of the chapter's points to remember: the public, who know least, gain most from seeing more.",
        cite: PT_FAVOR,
      },
      {
        kind: "recap",
        points: [
          { text: "Traders favor transparency when they **see** more, oppose it when they must **reveal** more.", cite: FAVOR },
          { text: "The **least informed** favor it most; the **best informed** oppose it to keep their edge.", cite: MOST },
          { text: "**Public traders** generally favor transparent markets.", cite: PT_FAVOR },
        ],
      },
    ],
  },

  // ── 5.4.5 Lesson 1 ────────────────────────────────────────────────────────
  {
    id: "5.4.5-routing",
    sec: "5.4.5",
    title: "Order-routing systems",
    pages: "102–104",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Order-routing systems",
        body: "Systems that **transmit orders**: customer to broker or dealer, broker to dealer or exchange, dealer to dealer, exchange to exchange. They also carry **cancels** and **trade reports**.",
        cite: WHO,
      },
      {
        kind: "idea",
        title: "Fast and accurate",
        body: "Traders want **fast** routing so they don't miss opportunities, and **accurate** routing because mistakes can be very costly.",
        cite: FAST,
      },
      {
        kind: "see",
        title: "Where orders travel",
        illus: RoutingMap,
        beats: [
          { text: "**Customers** send orders to their brokers and to dealers.", cite: WHO },
          { text: "**Brokers** send customer orders on to dealers and to exchanges.", cite: WHO },
          { text: "**Exchanges** send orders to other exchanges (and dealers to other dealers).", cite: WHO },
          { text: "The same systems carry **cancellation instructions**…", cite: CANCEL },
          { text: "…and bring **trade reports** back to customers.", cite: CANCEL },
        ],
      },
      {
        kind: "multi",
        q: "Besides new orders, what do order-routing systems carry? (Select all that apply.)",
        options: ["Cancellation instructions", "Trade reports back to customers", "Orders from one exchange to another", "Share certificates", "Margin loans"],
        answer: [0, 1, 2],
        why: "Routing systems carry orders between all these parties, plus cancels and trade reports.",
        cite: CANCEL,
      },
      {
        kind: "choice",
        q: "Why do traders demand **fast** order-routing systems?",
        options: ["They don't want to miss trading opportunities, and they value their time", "Regulators require a minimum speed", "Fast systems pay higher rebates", "Slow systems can't carry cancels"],
        answer: 0,
        why: "Speed protects opportunities and saves time; accuracy matters because mistakes are costly.",
        cite: WHYFAST,
      },
      {
        kind: "truefalse",
        q: "A short-term, high-frequency trader can trade profitably through any routing system, however slow.",
        answer: false,
        why: "They must submit and cancel quickly: either trade on the floor or use **fast** routing systems with good computer interfaces.",
        cite: HFT,
      },
      {
        kind: "idea",
        title: "Electronic wins, except for special instructions",
        body: "Electronic routing is usually **faster, more accurate and cheaper**. But it handles only the **standardized orders** it was programmed for, so special instructions go by **telephone**.",
        cite: DISADV,
      },
      {
        kind: "see",
        title: "Screen or telephone?",
        illus: PhoneOrScreen,
        beats: [
          { text: "A **standard** order goes electronically: fast, accurate and cheap. (Our numbers.)", cite: ELEC },
          { text: "By **telephone** it's slower, and a clerk can **hear or record** something different from what you meant.", cite: CLERKS },
          { text: "A **special instruction** can't go electronically: the system knows only standardized orders. Pick up the phone.", cite: SPECIAL },
          { text: "Online orders cost less to handle, so retail brokers charge **lower commissions** on them.", cite: CHEAPER },
        ],
      },
      {
        kind: "choice",
        q: "You want your broker to work a large order carefully, and first to tell you how the market feels. How do you send it?",
        options: ["By telephone", "Through the electronic routing system", "Through the market data feed", "By ticker tape"],
        answer: 0,
        why: "Special instructions and talk about market conditions go by **telephone**: electronic systems take only standardized orders.",
        cite: TALK,
      },
      {
        kind: "classify",
        q: "How does each trader usually send orders, according to Harris?",
        buckets: ["Telephone", "Electronic", "Runner or hand signals"],
        items: [
          { text: "A large trader who wants market color", bucket: 0, why: "Large traders phone for more access to market information." },
          { text: "A floor broker in the pit", bucket: 2, why: "Runners deliver orders, or clerks hand-signal them." },
          { text: "A trader with special instructions", bucket: 0, why: "Electronic systems accept only standardized orders." },
          { text: "A retail trader at an online broker", bucket: 1, why: "Internet orders cost less to handle and get lower commissions." },
          { text: "An off-floor high-frequency trader", bucket: 1, why: "They need fast routing with good computer interfaces." },
        ],
        cite: DEPENDS,
      },
      {
        kind: "choice",
        q: "Why do retail brokerages charge **lower commissions** on Internet orders?",
        options: ["They cost less to handle than telephone orders", "Internet orders always fill at better prices", "Regulators cap Internet commissions", "Internet orders skip the exchange"],
        answer: 0,
        why: "No telephone order clerks to pay, and fewer mistakes from mishearing customers.",
        cite: CHEAPER,
      },
      {
        kind: "today",
        title: "Institutions route through FIX",
        body: "Most institutional orders now travel **electronically** in the **FIX protocol** (Financial Information eXchange), a standard message format for orders, cancels and fills.",
        source: "FIX Trading Community",
      },
      {
        kind: "recap",
        points: [
          { text: "**Order-routing systems** carry orders, cancels and trade reports between customers, brokers, dealers and exchanges.", cite: CANCEL },
          { text: "Good routing is **fast and accurate**; the strategies you can run depend on it.", cite: STRATEGIES },
          { text: "Electronic routing is faster and cheaper but takes only **standardized orders**; special instructions go by phone.", cite: DISADV },
        ],
      },
    ],
  },

  // ── 5.4.5 Lesson 2 ────────────────────────────────────────────────────────
  {
    id: "5.4.5-speed",
    sec: "5.4.5",
    title: "Speed, the floor and the wire",
    pages: "103–106",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Floor traders act first",
        body: "Off-floor traders learn through **market data systems** and answer through **order-routing systems**. Floor traders see and react **well before** them.",
        cite: FT_SEE,
      },
      {
        kind: "see",
        title: "The floor's head start",
        illus: LatencyRace,
        beats: [
          { text: "Something happens in the pit. The **floor trader** sees it at once, and sees **who** is trading.", cite: FT_WHO },
          { text: "The off-floor trader learns it through **market data**: under 3 seconds with the best systems.", cite: FT_DATA },
          { text: "Their order goes back through **order routing**: under 5 seconds more. The floor trader has already traded.", cite: FT_ROUTE },
          { text: "If the routing needs a **runner**, the delay is substantially longer.", cite: FT_RUNNER },
        ],
      },
      {
        kind: "number",
        q: "With the best systems, market data takes under **3 seconds** and routing to a broker under **5 seconds**. Adding both, up to how many seconds can pass before an off-floor trader's response reaches a broker?",
        answer: 8,
        unit: "seconds",
        why: "Under 3 s to learn of the event plus under 5 s to route the response: up to 8 s, while floor traders act at once.",
        cite: FT_ROUTE,
      },
      {
        kind: "multi",
        q: "What advantages do floor traders have over off-floor traders? (Select all that apply.)",
        options: ["They see market developments sooner", "They can react sooner", "They observe who is trading", "They pay no commissions", "They see every order in every market"],
        answer: [0, 1, 2],
        why: "Floor traders see and react first, and they see all the floor reveals, including **who** is trading.",
        cite: FT_SEE,
      },
      {
        kind: "choice",
        q: "Why is knowing **who** is trading valuable?",
        options: ["You may guess why they trade or whom they represent", "It tells you the closing price", "It lets you skip the order book", "It guarantees settlement"],
        answer: 0,
        why: "Identity hints at motive: a big fund's broker buying may signal more buying to come.",
        cite: FT_WHY,
      },
      {
        kind: "idea",
        title: "Every new wire consolidated markets",
        body: "Before the telegraph, each city had its **own exchange** and prices differed by region. Once traders could route orders to the **best prices**, liquid markets grew and small ones **closed or merged**.",
        cite: TG_CITY,
      },
      {
        kind: "quote",
        lead: "The pattern still holds:",
        cite: TG_EVERY,
        mark: ["market consolidation"],
      },
      {
        kind: "see",
        title: "The telegraph links five cities",
        illus: Consolidation,
        beats: [
          { text: "Before the telegraph, every city has its **own exchange**, and the same stock trades at different prices. (Our numbers.)", cite: TG_CITY },
          { text: "Telegraph lines let traders see **other cities' prices**.", cite: TG_FIRST },
          { text: "Arbitrageurs first, then everyone else, **route orders to the best market**.", cite: TG_FIRST },
          { text: "The liquid market attracts more orders and grows; smaller ones **quit trading or combine**.", cite: TG_FAIL },
        ],
      },
      {
        kind: "order",
        q: "Put the telegraph story in order.",
        items: [
          "Each city has its own exchange; prices differ",
          "The telegraph shows prices in other cities",
          "Traders route orders to the best markets",
          "Liquid markets attract more orders and grow",
          "Smaller markets quit or combine",
        ],
        why: "Better communication lets orders flow to liquidity, and liquidity attracts more orders.",
        cite: TG_LIQUID,
      },
      {
        kind: "truefalse",
        q: "The first traders to use the telegraph to route orders between cities were **arbitrageurs**.",
        answer: true,
        why: "Arbitrageurs came first; other traders soon followed, sending orders to the best markets.",
        cite: TG_FIRST,
      },
      {
        kind: "definition",
        term: "Intermarket Trading System (ITS)",
        body: "An electronic system that lets traders in one U.S. equity market **send orders to another**. It helped keep those markets **integrated and competitive**.",
        cite: ITS,
      },
      {
        kind: "match",
        q: "Match each market to its order-routing system (Table 5-8).",
        pairs: [
          ["New York Stock Exchange", "SuperDOT"],
          ["Chicago Mercantile Exchange", "TOPS"],
          ["Chicago Stock Exchange", "MAX"],
          ["All U.S. listed-equity exchanges", "ITS"],
        ],
        cite: T58_NYSE,
      },
      {
        kind: "today",
        title: "ITS is gone",
        body: "ITS was shut down in 2007, when **Regulation NMS** (adopted 2005) took effect. Each trading center must now avoid trading through better **protected quotes** elsewhere, and markets reach each other through their own routing links.",
        source: "SEC Regulation NMS (2005), Rule 611",
      },
      {
        kind: "recap",
        points: [
          { text: "Floor traders **see and react first**, and they see **who** is trading.", cite: FT_SEE },
          { text: "Every telecom innovation **increased competition** and led to **market consolidation**.", cite: TG_EVERY },
          { text: "**ITS** let traders in one U.S. equity market send orders to another.", cite: ITS },
        ],
      },
    ],
  },

  // ── 5.4.5 Lesson 3 ────────────────────────────────────────────────────────
  {
    id: "5.4.5-levels",
    sec: "5.4.5",
    title: "Nasdaq Level I, II and III",
    pages: "105",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Three levels of quotes",
        body: "Nasdaq sells **three levels** of quotation service through data vendors. Each level shows more, and only the top level lets you **act**.",
        cite: NL_THREE,
      },
      {
        kind: "definition",
        term: "Level I",
        body: "Real-time **inside bid and ask**: the best bid and the best offer across all dealers.",
        cite: NL_ONE,
      },
      {
        kind: "definition",
        term: "Level II",
        body: "Real-time access to **every dealer's quotation** in the stock, not just the best ones.",
        cite: NL_TWO,
      },
      {
        kind: "see",
        title: "One stock, three screens",
        illus: NasdaqLevels,
        beats: [
          { text: "Four dealers quote the same Nasdaq stock. (Our numbers.)" },
          { text: "**Level I** shows only the **inside quote**: the highest bid (20.12) and the lowest ask (20.18).", cite: NL_ONE },
          { text: "**Level II** shows **every dealer's quote**.", cite: NL_TWO },
          { text: "**Level III** adds the power to **quote, route, execute and message**, for registered market makers only.", cite: NL_THREE_WHAT },
        ],
      },
      {
        kind: "number",
        q: "Four dealers quote a stock: A **20.10–20.20**, B **20.12–20.22**, C **20.08–20.18**, D **20.11–20.19**. What **inside bid** does a Level I screen show?",
        answer: 20.12,
        prefix: "$",
        illustrative: true,
        why: "The inside bid is the **highest** bid across dealers: B's 20.12.",
        cite: NL_ONE,
      },
      {
        kind: "number",
        q: "Same dealers: A **20.10–20.20**, B **20.12–20.22**, C **20.08–20.18**, D **20.11–20.19**. What **inside ask** does Level I show?",
        answer: 20.18,
        prefix: "$",
        illustrative: true,
        why: "The inside ask is the **lowest** ask across dealers: C's 20.18.",
        cite: NL_ONE,
      },
      {
        kind: "choice",
        q: "Which Nasdaq service shows **every dealer's quotation**?",
        options: ["Level II", "Level I", "The ticker tape", "A time-delayed quote service"],
        answer: 0,
        why: "Level I gives only the inside bid and ask; Level II gives all dealer quotations.",
        cite: NL_TWO,
      },
      {
        kind: "definition",
        term: "Level III",
        body: "Level II plus the ability to **enter quotes, route and execute orders** and **send messages**. Only **registered Nasdaq market makers** get it.",
        cite: NL_THREE_WHO,
      },
      {
        kind: "multi",
        q: "What does Level III add to Level II? (Select all that apply.)",
        options: ["Entering quotations", "Routing orders", "Executing orders", "Sending messages", "Seeing other exchanges' order books"],
        answer: [0, 1, 2, 3],
        why: "Level III is Level II's information plus the tools to quote, route, execute and send messages.",
        cite: NL_THREE_WHAT,
      },
      {
        kind: "truefalse",
        q: "Any retail trader can subscribe to Nasdaq **Level III**.",
        answer: false,
        why: "Level III is available **only to registered Nasdaq market makers**.",
        cite: NL_THREE_WHO,
      },
      {
        kind: "choice",
        q: "A Level I screen shows the Nasdaq equivalent of…",
        options: ["The top of the book", "The market by price", "An opaque market", "Every order in the book"],
        answer: 0,
        why: "Level I reports only the best bid and best offer: the **top of the book**. Level II goes deeper.",
        cite: TOP,
      },
      {
        kind: "today",
        title: "“Level 2” now means depth",
        body: "Traders now say **Level 2** for any **depth-of-book** screen, on any market. Nasdaq's own full-depth feed is called **TotalView**.",
        source: "Nasdaq market data products",
      },
      {
        kind: "recap",
        points: [
          { text: "**Level I**: real-time inside bid and ask.", cite: NL_ONE },
          { text: "**Level II**: every dealer's quotation.", cite: NL_TWO },
          { text: "**Level III**: Level II plus quote, route, execute and message, for registered market makers only.", cite: NL_THREE_WHAT },
        ],
      },
    ],
  },
];
export const U54B_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "Without the data markets release, what would public traders lack, according to Harris?",
    options: ["Confidence in the markets", "Access to brokers", "The right to trade", "Price limits"],
    answer: 0,
    why: "Released market data is what gives the public confidence in the markets.",
    cite: CONFIDENCE,
  },
  {
    kind: "fill",
    q: "Ex ante and ex post transparency are also called ___ and ___ transparency.",
    bank: ["pre-trade", "post-trade", "top-of-book", "opaque", "dealer"],
    answer: ["pre-trade", "post-trade"],
    why: "Ex ante = before the trade (pre-trade); ex post = after it (post-trade).",
    cite: PRE,
  },
  {
    kind: "choice",
    q: "Which U.S. markets does Harris call generally **quite opaque**?",
    options: ["Over-the-counter corporate and municipal bonds", "Equity options exchanges", "Nasdaq stocks", "Government bonds"],
    answer: 0,
    why: "OTC corporate and municipal bond quotes were generally not reported; government bonds are more transparent thanks to interdealer brokers.",
    cite: BONDS,
  },
  {
    kind: "choice",
    q: "In Table 5-7, what did **Nasdaq** report of its current quotes?",
    options: ["All dealer quotes, immediately", "Only the best bid and offer", "Nothing", "Quotes on a 20-minute delay"],
    answer: 0,
    why: "Nasdaq reported all dealer quotes immediately, and all trades within 90 seconds.",
    cite: T57_NASDAQ,
  },
  {
    kind: "truefalse",
    q: "On the Toronto Stock Exchange, the public saw the total size of orders at the **five best prices** on each side.",
    answer: true,
    why: "Toronto reported aggregate quantities at the five best prices on both sides; members could see the whole book.",
    cite: T57_TSX,
  },
  {
    kind: "truefalse",
    q: "In U.S. futures pits, quotes usually stand long enough to be reported.",
    answer: false,
    why: "In these oral auctions quotes don't last long enough to be reported, so futures are ex post transparent only.",
    cite: FUT_WHY,
  },
  {
    kind: "choice",
    q: "Why do infrequent traders usually **not** use electronic routing systems?",
    options: [
      "Building and learning them costs too much for their needs",
      "Exchanges don't accept their orders",
      "Electronic orders can't be cancelled",
      "They are slower than the telephone",
    ],
    answer: 0,
    why: "The fixed costs are large relative to how little they trade.",
    cite: INFREQ,
  },
  {
    kind: "truefalse",
    q: "Electronic order-routing systems can handle any special instruction a trader writes.",
    answer: false,
    why: "They handle only the **standardized** orders and instructions they are programmed to recognize.",
    cite: DISADV,
  },
  {
    kind: "multi",
    q: "How do traders transmit orders, according to Harris? (Select all that apply.)",
    options: ["Electronic data transmission", "Telephone", "Carrying them across rooms", "Shouting or hand-signaling them", "The ticker tape"],
    answer: [0, 1, 2, 3],
    why: "Most orders go electronically or by phone, but some are still carried, shouted or hand-signaled. The tape reports trades, not orders.",
    cite: STILL,
  },
  {
    kind: "choice",
    q: "In 2003, how did **institutional** traders most commonly send orders to their brokers and dealers?",
    options: ["By telephone", "By hand signals", "By runner", "Through the ticker tape"],
    answer: 0,
    why: "Often over dedicated lines that brokers and dealers provided free; electronic delivery was growing.",
    cite: INST,
  },
  {
    kind: "choice",
    q: "Why was the American Stock Exchange once called the **New York Curb Exchange**?",
    options: ["Its members worked on the street curbs", "It curbed speculation", "It capped daily price moves", "It traded only small companies"],
    answer: 0,
    why: "It literally traded outdoors on Broad Street; clerks in offices above hand-signaled telegraph orders down to the brokers.",
    cite: AM_CURB,
  },
  {
    kind: "choice",
    q: "On the old curb market, how did telegraph orders reach the brokers on the street?",
    options: ["Clerks at the office windows hand-signaled them", "Runners carried paper tickets", "Brokers phoned the offices", "A ticker printed them on the street"],
    answer: 0,
    why: "Telegraph lines couldn't be installed on the curb, so clerks above Broad Street signaled orders down and reports came back the same way.",
    cite: AM_SIGNAL,
  },
];
