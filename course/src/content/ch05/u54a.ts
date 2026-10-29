// 5.4 MARKET INFORMATION SYSTEMS (p. 97): 5.4.1 Information Collection Systems, 5.4.2 Information Distribution
// Systems, 5.4.3 Ticker Symbols (pp. 97–101). First third of unit 5.4 (with u54b and u54c).
import type { Cite, Lesson, Question } from "../types.ts";
import {
  BroadcastQuery,
  Consolidated,
  DelayClock,
  FuturesSymbol,
  InfoFlow,
  OptionSymbol,
  OtcCollect,
  PitReporters,
  SipFlow,
  StockSymbols,
  TorontoBook,
} from "./illus/u54a.tsx";
import { MonthCodes } from "./games/MonthCodes.tsx";
import { OptionCode } from "./games/OptionCode.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 5.4 and 5.4.1 (p. 97) ─────────────────────────────────────────
const DETERMINE = c(97, "5.4", "These systems are important because they determine what traders see and when they see it.");
const PRODUCE = c(97, "5.4.1", "Markets produce information about instrument values, transactions, who has traded, who wants to trade, and the terms on which they are willing to trade.");
const PREDICT = c(97, "5.4.1", "Traders use it to predict where prices are going and how much trading will cost.");
const ACCESS = c(97, "5.4.1", "Who has access to market information, when they can access it, and the form in which they can access it greatly influence who will trade profitably and who will pay high transaction costs.");
const PRESENT_SELL = c(97, "5.4.1", "They present some information to their traders, they sell some to data vendors, and they save most for regulatory purposes.");
const LUCRATIVE = c(97, "5.4.1", "Market data sales are often very lucrative.");
const TWENTY = c(97, "5.4.1", "At many major exchanges, data revenues account for more than 20 percent of total exchange revenues.");
const ELECTRONIC = c(97, "5.4.1", "Markets with electronic trading systems can easily collect any market information they want because all information is already in electronic form.");
const MANUAL = c(97, "5.4.1", "In contrast, floor-based markets, telephonic markets, and other manually operated markets must create special systems to collect information.");
const COST_ADV = c(97, "5.4.1", "Since information is valuable and manual collection is quite expensive, electronic systems have a strong cost advantage over other systems.");
const REPORTERS = c(97, "5.4.1", "Many floor-based exchanges employ clerks called market reporters to observe and report on trading activity.");
const ENTER = c(97, "5.4.1", "The reporters enter trade prices into electronic data systems.");
const ENSURE = c(97, "5.4.1", "The exchange trading rules usually require traders to ensure that the market reporters know what they are doing.");
const PODIUM = c(97, "5.4.1", "In large futures markets, the reporters sit on podiums above the trading pit so they can see all the traders.");
const HANDSIG = c(97, "5.4.1", "Some reporters may stand in the crowd and use hand signals to pass information to the reporters on the podium.");
const HANDHELD = c(97, "5.4.1", "In many markets, reporters use handheld wireless devices to report information.");
const REPORT = c(97, "5.4.1", "Some telephonic markets and some floor-based markets require traders to report their trades to their electronic trade reporting systems.");
const NINETY = c(97, "5.4.1", "For example, in the Nasdaq Stock Market, dealers must report within 90 seconds of trading when they arrange trades by telephone.");
const NOFORMAL = c(97, "5.4.1", "Many over-the-counter dealer markets have no formal organization.");
const VENDORS_COLLECT = c(97, "5.4.1", "Market data vendors often try to collect market information from the dealers in these markets.");
const FEE_OR = c(97, "5.4.1", "Either the dealers provide the information for a fee, or they provide their information on the condition that they can access the information the other dealers provide.");
const IDB = c(97, "5.4.1", "In dealer markets where interdealer brokers help dealers arrange trades among themselves, the brokers collect much information about market conditions.");
const REFUSE = c(97, "5.4.1", "If the dealers object to how a broker distributes that information, they may refuse to trade through that broker.");
const ARCA = c(97, "5.4.1", "The Archipelago ECN distributes its entire limit order book, integrated with those of several other ECNs, via the Internet, free of charge.", { box: "Archipelago's Integrated Book" });
const PT_ACCESS = c(111, "5.6", "Access to information about orders and trades is extremely valuable to traders.");

// ── Excerpts: 5.4.2 (pp. 98–99) ─────────────────────────────────────────────
const MEMBERS = c(98, "5.4.2", "In most markets, members can access more information than can unaffiliated traders.");
const SELL_VENDORS = c(98, "5.4.2", "Markets sell this information to various data vendors, who repackage it for distribution to the public.");
const RT_FEES = c(98, "5.4.2", "Customers who subscribe to real-time services can receive data as it is generated, but they must pay additional fees to the exchanges for these services.");
const DELAY = c(98, "5.4.2", "Customers who subscribe to time-delayed services receive the data with a constant 5-, 10-, 15-, or 20-minute delay.");
const DISCRIM = c(98, "5.4.2", "Exchanges offer both services in order to price discriminate among those who require immediate information and those who are less time sensitive.");
const T52_L2 = c(98, "5.4.2", "Nasdaq Level II 10.00", { table: "Table 5-2" });
const T52_PRO = c(98, "5.4.2", "Note: Professional subscribers generally pay higher fees.", { table: "Table 5-2" });
const SIP = c(98, "5.4.2", "In the U.S. equity markets, almost all markets, dealers, and trading systems must send their trades and quotes to a securities information processor (SIP), which then distributes the consolidated information to data vendors.", { box: "Securities Information Processors (SIPS)" });
const SIAC = c(98, "5.4.2", "The Securities Industry Automation Corporation (SIAC) is the SIP for exchange-listed stocks, and the NASD is the SIP for Nasdaq and OTC stocks.", { box: "Securities Information Processors (SIPS)" });
const YAHOO = c(99, "5.4.2", "It presents NYSE quotes with a 20-minute delay and Nasdaq quotes with a 15-minute delay.", { box: "Quotation Servers on the Internet" });

const BCAST = c(98, "5.4.2", "Data vendors offer broadcast services and query services.");
const STREAMS = c(98, "5.4.2", "Broadcast services provide continuous streams of information.");
const TAPES = c(98, "5.4.2", "Price and sale feeds and ticker tapes broadcast trade prices and sizes.");
const SERVER = c(98, "5.4.2", "Users submit requests for information to the vendor's data server.");
const ARCHIVE = c(98, "5.4.2", "To fill these requests, the data servers receive and archive broadcast information from market feeds.");
const OWN = c(98, "5.4.2", "Traders use these programs when their electronic proprietary trading systems require extremely fast query services.");
const REFORMAT = c(98, "5.4.2", "Data vendors such as Bloomberg, Bridge Information Systems, PC Quote, and Reuters reformat market information to make it more useful to their customers.");
const VDR = c(99, "5.4.2", "This rule requires vendors to construct consolidated quotes from all trading venues.");
const SMALL = c(99, "5.4.2", "Without this rule, many data vendors would not include quotes from small markets, which would make it very difficult for innovative trading systems to compete for order flow.");
const SAME = c(99, "5.4.2", "The information that they publish on the floor is usually the same information that they provide to the public.");
const SCREEN_MORE = c(99, "5.4.2", "In screen-based trading systems, participants often can access more information than can the public.");
const TORONTO = c(99, "5.4.2", "For example, the Toronto Stock Exchange allows its members to see the complete composition of the system limit order book.");
const FIVE = c(99, "5.4.2", "Public traders get to see only aggregate order sizes at the best five prices on either side of the market.");

// ── Excerpts: 5.4.3 (pp. 99–101) ────────────────────────────────────────────
const SYMBOLS = c(99, "5.4.3", "Exchanges and data vendors use ticker symbols to identify trading instruments.");
const ASSIGN = c(99, "5.4.3", "Generally, each exchange assigns ticker symbols to its instruments.");
const SUFFIX = c(99, "5.4.3", "The data vendors occasionally add their own suffixes or prefixes to these symbols to make them more useful for their clients.");
const LISTED = c(99, "5.4.3", "In the United States, listed common stocks have ticker symbols consisting of one to three letters.");
const ONE = c(99, "5.4.3", "The one-letter symbols are rare, and therefore coveted for the special status they convey.");
const RESERVE = c(99, "5.4.3", "Exchanges usually reserve them for their largest firms.");
const NASDAQ4 = c(99, "5.4.3", "Nasdaq National Market System stocks all have four-character ticker symbols, and Nasdaq SmallCap stocks have five-character ticker symbols.");
const FUNDX = c(99, "5.4.3", "U.S. open-end mutual funds have five-character ticker symbols, the last character of which is always X.");
const FUT = c(99, "5.4.3", "Ticker symbols for U.S. futures contracts generally consist of a one- or two-character code that indicates the commodity followed by a number that indicates the expiration year and a letter that indicates the delivery month.");
const MONTHFIRST = c(99, "5.4.3", "Some systems place the month code before the year number.");
const LC2Z = c(99, "5.4.3", "For example, LC2Z refers to the Chicago Mercantile Exchange December 2002 live cattle futures contract.");
const SECOND = c(99, "5.4.3", "The second character of the commodity code can be a number.");
const E72H = c(99, "5.4.3", "For example, E7 is the contract code for the CME E-Mini Euro-FX contract; thus E72H refers to the March 2002 E-Mini Euro contract.");
const T53 = c(99, "5.4.3", "January F February G March H April J May K June M July N August Q September U October V November X December Z", { table: "Table 5-3" });

const OPRA = c(100, "5.4.3", "The Option Price Reporting Authority (OPRA) assigns ticker symbols for exchange-traded U.S. equity and equity index option contracts.");
const THREE5 = c(100, "5.4.3", "These ticker symbols have three to five characters.");
const ROOT = c(100, "5.4.3", "The first one to three characters form the options root.");
const ROOT_OFTEN = c(100, "5.4.3", "The options root is often the ticker symbol of the underlying instrument, or it may include some portion of it.");
const MANY_ROOTS = c(100, "5.4.3", "Securities with options having many strike prices often have several options roots.");
const EACH_ROOT = c(100, "5.4.3", "Each root designates a different set of strike prices.");
const SECOND_LAST = c(100, "5.4.3", "The second-to-last character indicates the option type and expiration month.");
const FINAL = c(100, "5.4.3", "The final character indicates the option contract strike price.");
const SAMECHAR = c(100, "5.4.3", "The same character can indicate different strike prices.");
const T54 = c(100, "5.4.3", "January A M", { table: "Table 5-4" });
const T55 = c(100, "5.4.3", "T 100 200 300", { table: "Table 5-5" });
const IBMAT = c(99, "5.4.3", "IBMAT—IBM January 100 call", { box: "Some Equity Option Ticker Symbol Examples" });
const IBMIT = c(99, "5.4.3", "IBMIT—IBM September 100 call", { box: "Some Equity Option Ticker Symbol Examples" });
const IBMMT = c(99, "5.4.3", "IBMMT—IBM January 100 put", { box: "Some Equity Option Ticker Symbol Examples" });
const MSQVJ = c(99, "5.4.3", "MSQVJ—Microsoft October 50 put", { box: "Some Equity Option Ticker Symbol Examples" });
const FUTOPT = c(101, "5.4.3", "The month codes for options on futures differ from the month codes for equity options.");
const FUTOPT_CALLS = c(101, "5.4.3", "The call codes are the same as the futures delivery month codes for the futures contracts.");
const T56 = c(101, "5.4.3", "December Z T", { table: "Table 5-6" });

export const U54A_LESSONS: Lesson[] = [
  // ── 5.4 + 5.4.1 Market information is valuable ──────────────────────────
  {
    id: "5.4-value",
    sec: "5.4",
    title: "Market information is valuable",
    pages: "97",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Information systems",
        body: "Every market runs systems that **transmit, organize, present and store** information about orders, quotes and trades. They decide **what traders see, and when**.",
        cite: DETERMINE,
      },
      {
        kind: "definition",
        term: "Market information",
        body: "What a market produces besides trades: **instrument values**, **transactions**, **who has traded**, **who wants to trade** and on **what terms**.",
        cite: PRODUCE,
      },
      {
        kind: "quote",
        lead: "Why it matters to every trader:",
        cite: ACCESS,
        mark: ["who will trade profitably"],
      },
      {
        kind: "see",
        title: "Where a market's information goes",
        illus: InfoFlow,
        beats: [
          { text: "Trading produces information: **orders, quotes and trades**. Most markets collect it **from their own trading systems**.", cite: PRODUCE },
          { text: "The market **presents some** of it to its traders.", cite: PRESENT_SELL },
          { text: "It **sells some** to **data vendors**, who pay for it.", cite: PRESENT_SELL },
          { text: "And it **saves most** of it **for regulatory purposes**.", cite: PRESENT_SELL },
          { text: "Selling data pays: at many major exchanges it brings in **more than 20%** of revenues.", cite: TWENTY },
        ],
      },
      {
        kind: "multi",
        q: "Which kinds of information does a market produce? (Select all that apply.)",
        options: ["Instrument values", "Who has traded", "Who wants to trade", "The terms traders will accept", "Each trader's tax bill"],
        answer: [0, 1, 2, 3],
        why: "Markets produce information on values, transactions, who traded, who wants to trade and on what terms. Tax bills are not market information.",
        cite: PRODUCE,
      },
      {
        kind: "choice",
        q: "What do traders use market information for?",
        options: [
          "To predict where prices are going and how much trading will cost",
          "Only to settle the trades they have already made",
          "Only to satisfy their regulators",
          "To set the exchange's trading hours",
        ],
        answer: 0,
        why: "Traders use market information to forecast prices and to estimate their trading costs.",
        cite: PREDICT,
      },
      {
        kind: "classify",
        q: "What is the market doing with this information?",
        buckets: ["Presents it", "Sells it", "Saves it"],
        items: [
          { text: "Quotes on its traders' screens", bucket: 0, why: "Showing the market to its traders is presenting." },
          { text: "A feed a data vendor pays for", bucket: 1, why: "Data vendors buy market data." },
          { text: "Records kept for regulators", bucket: 2, why: "Markets save most information for regulatory purposes." },
          { text: "Prices on a board above the pit", bucket: 0, why: "A floor display presents the market to floor traders." },
          { text: "Data licensed to a quote website", bucket: 1, why: "Websites get their data from vendors who buy it." },
          { text: "An archive of every order", bucket: 2, why: "Keeping records for later review is saving." },
        ],
        cite: PRESENT_SELL,
      },
      {
        kind: "idea",
        title: "Data is a business",
        body: "Market data sales are often **very lucrative**: at many major exchanges they bring in **more than 20%** of total revenues.",
        cite: LUCRATIVE,
      },
      {
        kind: "number",
        q: "At many major exchanges, data revenues are more than what percentage of total exchange revenues?",
        answer: 20,
        unit: "%",
        why: "Harris: more than 20 percent of total exchange revenues at many major exchanges.",
        cite: TWENTY,
      },
      {
        kind: "truefalse",
        q: "Who can see market information, and when, has little effect on who trades profitably.",
        answer: false,
        why: "Access, timing and form of access **greatly influence** who trades profitably and who pays high transaction costs.",
        cite: ACCESS,
      },
      {
        kind: "fill",
        q: "Most markets ___ some information to their traders, ___ some to data vendors, and save most for regulatory purposes.",
        bank: ["present", "sell", "hide", "lend", "mail"],
        answer: ["present", "sell"],
        why: "Present to traders, sell to vendors, save for regulators.",
        cite: PRESENT_SELL,
      },
      {
        kind: "today",
        title: "Archipelago is now NYSE Arca",
        body: "The book's Archipelago ECN, which gave its whole order book away free on the Internet, merged with the **NYSE** in 2006 and became **NYSE Arca**.",
        source: "NYSE Group merger with Archipelago (2006)",
      },
      {
        kind: "recap",
        points: [
          { text: "**Access** to information about orders and trades is extremely valuable to traders.", cite: PT_ACCESS },
          { text: "Who gets market information, when and in what form decides **who trades profitably**.", cite: ACCESS },
          { text: "Markets **present** some information, **sell** some to vendors and **save** most for regulators.", cite: PRESENT_SELL },
        ],
      },
    ],
  },
  // ── 5.4.1 How markets collect it ────────────────────────────────────────
  {
    id: "5.4.1-collection",
    sec: "5.4.1",
    title: "How markets collect it",
    pages: "97",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Electronic markets collect it for free",
        body: "In an electronic market every order is **already in electronic form**, so the market can collect any information it wants. Floor and telephone markets must **build special systems**.",
        cite: ELECTRONIC,
      },
      {
        kind: "idea",
        title: "A strong cost advantage",
        body: "Information is valuable and **manual collection is expensive**, so electronic systems have a **strong cost advantage**.",
        cite: COST_ADV,
      },
      {
        kind: "definition",
        term: "Market reporters",
        body: "Exchange **clerks** on a trading floor who **watch and report** trading: they enter trade prices, and sometimes quotes and sizes, into electronic data systems.",
        cite: REPORTERS,
      },
      {
        kind: "see",
        title: "Reporting a futures pit",
        illus: PitReporters,
        beats: [
          { text: "In large futures markets the reporters sit on **podiums above the pit**, where they can see every trader.", cite: PODIUM },
          { text: "Two traders trade at 42.10 (our numbers). The reporter **enters the price** into the electronic data system.", cite: ENTER },
          { text: "Some reporters stand **in the crowd** and pass information to the podium with **hand signals**.", cite: HANDSIG },
          { text: "In many markets reporters use **handheld wireless devices** and report directly.", cite: HANDHELD },
          { text: "Trading rules make the **traders** responsible for keeping the reporters informed.", cite: ENSURE },
        ],
      },
      {
        kind: "choice",
        q: "In large futures markets, where do market reporters usually sit?",
        options: ["On podiums above the trading pit", "In a back office, watching screens", "At the clearinghouse", "Next to the exchange's data vendors"],
        answer: 0,
        why: "From a podium above the pit, a reporter can see all the traders.",
        cite: PODIUM,
      },
      {
        kind: "truefalse",
        q: "On a trading floor, reporting is the reporters' problem: traders don't have to help them.",
        answer: false,
        why: "Exchange rules usually require traders to make sure the market reporters know what they are doing.",
        cite: ENSURE,
      },
      {
        kind: "idea",
        title: "Report within a fixed time",
        body: "Some telephone and floor markets make traders **report their own trades** to an electronic trade reporting system, within a **fixed time**.",
        cite: REPORT,
      },
      {
        kind: "number",
        q: "A Nasdaq dealer arranges a trade by telephone at 10:14:20. Under the book's rule, by what time must it be reported? Enter the seconds.",
        answer: 50,
        prefix: "10:15:",
        illustrative: true,
        why: "Nasdaq dealers must report telephone trades within 90 seconds: 10:14:20 + 90 s = 10:15:50.",
        cite: NINETY,
      },
      {
        kind: "see",
        title: "Collecting data from OTC dealers",
        illus: OtcCollect,
        beats: [
          { text: "Many over-the-counter dealer markets have **no formal organization**: dealers simply phone each other.", cite: NOFORMAL },
          { text: "A **data vendor** may buy the dealers' information **for a fee**.", cite: VENDORS_COLLECT },
          { text: "Or dealers give their data **on condition that they can see the other dealers' data**. Some bond markets work this way.", cite: FEE_OR },
          { text: "Where an **interdealer broker** arranges trades among dealers, the broker sees both sides and **learns a lot** about the market.", cite: IDB },
          { text: "If dealers dislike how the broker spreads that information, they can **refuse to trade through it**.", cite: REFUSE },
        ],
      },
      {
        kind: "classify",
        q: "How is the trade information collected here?",
        buckets: ["Already electronic", "Market reporter", "Trader reports it", "Vendor gathers it"],
        items: [
          { text: "An ECN's matching computer", bucket: 0, why: "In an electronic system all information is already electronic." },
          { text: "A clerk on a podium above a pit", bucket: 1, why: "That is a market reporter." },
          { text: "A Nasdaq dealer's phone trade", bucket: 2, why: "The dealer must report it within 90 seconds." },
          { text: "An informal OTC bond dealer network", bucket: 3, why: "Data vendors collect from the dealers, for a fee or in exchange for others' data." },
          { text: "A clerk in the crowd with a handheld", bucket: 1, why: "Reporters can report from the crowd with wireless devices." },
          { text: "An electronic limit order book", bucket: 0, why: "Every order is already in electronic form." },
        ],
        cite: MANUAL,
      },
      {
        kind: "choice",
        q: "In some bond markets, dealers give a data vendor their information on what condition?",
        options: [
          "That they can access the information the other dealers provide",
          "That the vendor never shows it to the public",
          "That the vendor guarantees their trades",
          "That only regulators may see it",
        ],
        answer: 0,
        why: "It is data for data: either the vendor pays a fee, or each dealer gets to see the others' information.",
        cite: FEE_OR,
      },
      {
        kind: "truefalse",
        q: "Dealers who object to how an interdealer broker distributes market information may stop trading through that broker.",
        answer: true,
        why: "Interdealer brokers collect much information; dealers who object to how it is spread may refuse to trade through them.",
        cite: REFUSE,
      },
      {
        kind: "today",
        title: "Ten seconds, not ninety",
        body: "FINRA now requires off-exchange trades in U.S. stocks to be reported **within 10 seconds**, much faster than the 90 seconds in the book.",
        source: "FINRA trade reporting rules (2014 amendments)",
      },
      {
        kind: "recap",
        points: [
          { text: "Electronic systems collect information cheaply: a **strong cost advantage** over manual markets.", cite: COST_ADV },
          { text: "Floor exchanges use **market reporters**; phone markets make traders **report within a fixed time** (Nasdaq: 90 s).", cite: NINETY },
          { text: "In OTC markets, **data vendors** collect from dealers for a fee or in exchange for others' data.", cite: FEE_OR },
        ],
      },
    ],
  },
  // ── 5.4.2 Real-time or delayed ──────────────────────────────────────────
  {
    id: "5.4.2-delayed",
    sec: "5.4.2",
    title: "Real-time or delayed",
    pages: "98–99",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Members see more, sooner",
        body: "In most markets **members** can see more information than unaffiliated traders, and they may get it **faster**.",
        cite: MEMBERS,
      },
      {
        kind: "definition",
        term: "Data vendors",
        body: "Firms that **buy market data** from markets and **repackage it** for the public. Markets' **market data systems** report trades and quotes to the public through them.",
        cite: SELL_VENDORS,
      },
      {
        kind: "definition",
        term: "Real-time and delayed data",
        body: "**Real-time** data arrives as it is generated but costs **extra exchange fees**. **Time-delayed** data arrives with a constant **5-, 10-, 15- or 20-minute** delay.",
        cite: DELAY,
      },
      {
        kind: "see",
        title: "One trade, two screens",
        illus: DelayClock,
        beats: [
          { text: "At 10:00 a trade prints at the exchange at 41.20 (our numbers)." },
          { text: "A **real-time** subscriber sees it at once, and **pays extra fees** to the exchange for that.", cite: RT_FEES },
          { text: "At 10:15 the **15-minute delayed** screen finally shows the 10:00 trade. Real time has moved on to 41.45.", cite: DELAY },
          { text: "Same data, two prices: exchanges **price discriminate** between traders who need it now and traders who can wait.", cite: DISCRIM },
        ],
      },
      {
        kind: "choice",
        q: "Why do exchanges sell both real-time and time-delayed data?",
        options: [
          "To price discriminate between traders who need data immediately and those less time sensitive",
          "Because delayed data is more accurate",
          "Because regulators ban real-time data for the public",
          "To slow trading down",
        ],
        answer: 0,
        why: "Traders who need information immediately pay for real time; others accept a delay for less.",
        cite: DISCRIM,
      },
      {
        kind: "number",
        q: "Your quote service has a 15-minute delay. At 11:40 it shows a quote. At what time was that quote current? Enter the minutes.",
        answer: 25,
        prefix: "11:",
        illustrative: true,
        why: "A constant 15-minute delay: 11:40 − 15 minutes = 11:25.",
        cite: DELAY,
      },
      {
        kind: "truefalse",
        q: "Customers who want data as it is generated must pay additional fees to the exchanges.",
        answer: true,
        why: "Real-time services carry extra exchange fees; delayed services don't.",
        cite: RT_FEES,
      },
      {
        kind: "definition",
        term: "Securities information processor (SIP)",
        body: "In U.S. equities, almost every market, dealer and trading system sends its trades and quotes to a **SIP**, which passes the **consolidated** information to data vendors.",
        cite: SIP,
      },
      {
        kind: "see",
        title: "The SIP consolidates",
        illus: SipFlow,
        beats: [
          { text: "Exchanges, Nasdaq dealers and ECNs all send their **trades and quotes** to a **securities information processor**.", cite: SIP },
          { text: "The SIP **consolidates** them. In the book, **SIAC** is the SIP for exchange-listed stocks and the **NASD** for Nasdaq and OTC stocks.", cite: SIAC },
          { text: "It distributes the consolidated information to **data vendors**.", cite: SIP },
          { text: "Vendors **repackage** it for the public, in real time or with a delay.", cite: SELL_VENDORS },
        ],
      },
      {
        kind: "match",
        q: "Match each name to its job in the book.",
        pairs: [
          ["SIAC", "SIP for exchange-listed stocks"],
          ["NASD", "SIP for Nasdaq and OTC stocks"],
          ["Data vendor", "Repackages data for the public"],
          ["Real-time service", "Data at once, extra fees"],
          ["Delayed service", "Data 5 to 20 minutes late"],
        ],
        cite: SIAC,
      },
      {
        kind: "choice",
        q: "Table 5-2 lists 2003 monthly fees for nonprofessionals. Nasdaq Level I cost $1.00. What did Nasdaq Level II cost?",
        options: ["$10.00", "$1.00", "$60.00", "$94.00"],
        answer: 0,
        why: "Level II, with more quotes than Level I, cost ten times as much: $10.00 a month.",
        cite: T52_L2,
      },
      {
        kind: "truefalse",
        q: "Professional subscribers generally pay lower data fees than nonprofessionals.",
        answer: false,
        why: "The note under Table 5-2: professionals generally pay higher fees.",
        cite: T52_PRO,
      },
      {
        kind: "choice",
        q: "In the book, how late were NYSE quotes on Yahoo's free quote service?",
        options: ["20 minutes", "15 minutes", "5 minutes", "They were real-time"],
        answer: 0,
        why: "Yahoo showed NYSE quotes with a 20-minute delay and Nasdaq quotes with a 15-minute delay.",
        cite: YAHOO,
      },
      {
        kind: "today",
        title: "FINRA and today's SIPs",
        body: "The NASD became part of **FINRA** in 2007. U.S. stock quotes and trades are still consolidated by **SIPs**: the **CTA/CQ** plans for NYSE- and other exchange-listed stocks, the **UTP** plan for Nasdaq-listed stocks.",
        source: "FINRA (2007); CTA and UTP plan administrators",
      },
      {
        kind: "recap",
        points: [
          { text: "Members usually see **more** information than outsiders, and **faster**.", cite: MEMBERS },
          { text: "**Real-time** data costs extra exchange fees; **delayed** data comes 5 to 20 minutes late.", cite: DELAY },
          { text: "Two services let exchanges **price discriminate** by how time-sensitive the buyer is.", cite: DISCRIM },
        ],
      },
    ],
  },
  // ── 5.4.2 Feeds, queries and screens ────────────────────────────────────
  {
    id: "5.4.2-feeds",
    sec: "5.4.2",
    title: "Feeds, queries and screens",
    pages: "98–99",
    imp: 2,
    steps: [
      {
        kind: "definition",
        term: "Broadcast services",
        body: "Data services that send a **continuous stream**: **price-and-sale feeds** and **ticker tapes** carry trade prices and sizes; **quotation feeds** carry quotes.",
        cite: TAPES,
      },
      {
        kind: "definition",
        term: "Query services",
        body: "Data **on demand**: you send a request to the vendor's **data server**, which looks up the answer in the broadcasts it has **archived**.",
        cite: ARCHIVE,
      },
      {
        kind: "see",
        title: "Stream or ask",
        illus: BroadcastQuery,
        beats: [
          { text: "**Broadcast**: the market's feeds stream every trade and quote through the vendor to subscribers' pages.", cite: STREAMS },
          { text: "**Query**: you ask the vendor's data server a question, here the last IBM price.", cite: SERVER },
          { text: "The server looks it up in the broadcasts it **archived** and answers (our numbers).", cite: ARCHIVE },
        ],
      },
      {
        kind: "classify",
        q: "Broadcast service or query service?",
        buckets: ["Broadcast", "Query"],
        items: [
          { text: "A ticker tape of trade prices and sizes", bucket: 0, why: "Ticker tapes broadcast trades continuously." },
          { text: "A quotation feed", bucket: 0, why: "Quotation feeds broadcast quotes." },
          { text: "Asking a data server for yesterday's close", bucket: 1, why: "A request answered on demand is a query." },
          { text: "Looking up a quote on a website", bucket: 1, why: "Internet quote servers are query services." },
          { text: "A price-and-sale feed", bucket: 0, why: "It streams trade prices and sizes." },
          { text: "Your program requesting the last trade", bucket: 1, why: "Information on demand: a query." },
        ],
        cite: BCAST,
      },
      {
        kind: "choice",
        q: "Why do some traders run their own data servers?",
        options: [
          "Their electronic proprietary trading systems need extremely fast query services",
          "To avoid paying any exchange fees",
          "Because vendors won't sell them broadcasts",
          "To get delayed data instead of real-time data",
        ],
        answer: 0,
        why: "Some vendors sell software to run your own data server, for systems that need very fast answers.",
        cite: OWN,
      },
      {
        kind: "idea",
        title: "Vendors build pages",
        body: "Vendors such as **Bloomberg** and **Reuters** reformat market data onto **pages that update continuously**. Customers customize them to show only what interests them.",
        cite: REFORMAT,
      },
      {
        kind: "definition",
        term: "Vendor Display Rule",
        body: "A U.S. equity rule: data vendors must build **consolidated quotes** from **all trading venues**, small markets included.",
        cite: VDR,
      },
      {
        kind: "see",
        title: "Why consolidated quotes matter",
        illus: Consolidated,
        beats: [
          { text: "Three venues bid for the same stock (our numbers). A vendor that takes only the **big exchange** shows a best bid of 20.10." },
          { text: "The **Vendor Display Rule**: consolidate **all venues**. The best bid is really 20.12, at a small ECN.", cite: VDR },
          { text: "Now sellers can see the small market's better price and send it their orders: small systems can **compete for order flow**.", cite: SMALL },
        ],
      },
      {
        kind: "truefalse",
        q: "Without the Vendor Display Rule, many data vendors would leave out quotes from small markets.",
        answer: true,
        why: "That is why the rule exists: otherwise innovative small systems would struggle to compete for order flow.",
        cite: SMALL,
      },
      {
        kind: "choice",
        q: "Who benefits most directly from the Vendor Display Rule?",
        options: ["Small, innovative trading systems competing for order flow", "The largest exchange", "Vendors, who can show fewer quotes", "Floor market reporters"],
        answer: 0,
        why: "Consolidated quotes make small markets' prices visible, so they can attract orders.",
        cite: SMALL,
      },
      {
        kind: "idea",
        title: "On screens, members can see more",
        body: "In screen-based systems participants often see **more than the public**. **Toronto** let members see the **whole limit order book**.",
        cite: TORONTO,
      },
      {
        kind: "see",
        title: "Two views of one book",
        illus: TorontoBook,
        beats: [
          { text: "**Members** of the Toronto Stock Exchange see the complete book: every order at every price (our numbers).", cite: TORONTO },
          { text: "The **public** sees only the **total size** at the **best five prices** on each side.", cite: FIVE },
        ],
      },
      {
        kind: "fill",
        q: "Toronto public traders see only ___ order sizes at the best ___ prices on either side of the market.",
        bank: ["aggregate", "five", "individual", "ten", "hidden"],
        answer: ["aggregate", "five"],
        why: "Members see each order; the public sees totals at five prices per side.",
        cite: FIVE,
      },
      {
        kind: "today",
        title: "The rule lives on in Reg NMS",
        body: "Regulation NMS (2005) kept the Vendor Display Rule as **Rule 603(c)**: a vendor that shows quotes for a U.S. stock must show the **consolidated** best bid and offer.",
        source: "SEC Regulation NMS, Rule 603(c)",
      },
      {
        kind: "recap",
        points: [
          { text: "**Broadcast** services stream trades and quotes; **query** services answer on demand.", cite: BCAST },
          { text: "The **Vendor Display Rule** makes vendors consolidate quotes from all venues.", cite: VDR },
          { text: "On screen systems, **participants often see more** than the public.", cite: SCREEN_MORE },
        ],
      },
    ],
  },
  // ── 5.4.3 Ticker symbols ────────────────────────────────────────────────
  {
    id: "5.4.3-tickers",
    sec: "5.4.3",
    title: "Ticker symbols",
    pages: "99",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Ticker symbol",
        body: "A short code that **identifies a trading instrument**. Each **exchange** usually assigns its own; data vendors sometimes add prefixes or suffixes.",
        cite: SYMBOLS,
      },
      {
        kind: "idea",
        title: "Length told you the kind (in 2003)",
        body: "Listed U.S. stocks: **1 to 3 letters**. Nasdaq National Market: **4**. Nasdaq SmallCap: **5**. Mutual funds: **5, ending in X**.",
        cite: LISTED,
      },
      {
        kind: "see",
        title: "Symbols by length",
        illus: StockSymbols,
        beats: [
          { text: "Listed U.S. common stocks have **1 to 3 letters**: IBM, or just T (our examples).", cite: LISTED },
          { text: "**One-letter** symbols are rare and **coveted**; exchanges usually keep them for their **largest firms**.", cite: ONE },
          { text: "**Nasdaq National Market** stocks have **4** characters, like MSFT; Nasdaq SmallCap stocks have **5**.", cite: NASDAQ4 },
          { text: "U.S. open-end **mutual funds** have **5** characters, and the last one is always **X**.", cite: FUNDX },
        ],
      },
      {
        kind: "choice",
        q: "In the book's U.S. conventions, a ticker with five characters ending in X belongs to…",
        options: ["An open-end mutual fund", "A Nasdaq SmallCap stock", "A listed common stock", "A futures contract"],
        answer: 0,
        why: "Mutual funds have five characters and the last is always X. SmallCap stocks also have five, but don't end in X.",
        cite: FUNDX,
      },
      {
        kind: "classify",
        q: "What kind of U.S. security is it, by the book's conventions?",
        buckets: ["Listed stock", "Nasdaq NMS stock", "Mutual fund"],
        items: [
          { text: "IBM", bucket: 0, why: "Three letters: a listed stock." },
          { text: "GE", bucket: 0, why: "Two letters: a listed stock." },
          { text: "MSFT", bucket: 1, why: "Four characters: Nasdaq National Market." },
          { text: "INTC", bucket: 1, why: "Four characters: Nasdaq National Market." },
          { text: "VFINX", bucket: 2, why: "Five characters ending in X: a mutual fund." },
          { text: "FMAGX", bucket: 2, why: "Five characters ending in X: a mutual fund." },
        ],
        cite: NASDAQ4,
      },
      {
        kind: "definition",
        term: "Futures ticker symbol",
        body: "A **commodity code** (one or two characters), a **year digit** and a **delivery-month letter**. Some systems put the month before the year.",
        cite: FUT,
      },
      {
        kind: "see",
        title: "Reading LC2Z",
        illus: FuturesSymbol,
        beats: [
          { text: "A futures symbol starts with a **commodity code** of one or two characters: **LC** is live cattle.", cite: FUT },
          { text: "Then a **number for the year**: 2 means 2002.", cite: FUT },
          { text: "Then a **letter for the delivery month**: Z is December. LC2Z is the CME December 2002 live cattle contract.", cite: LC2Z },
          { text: "The code can contain a number: **E7** is the CME E-mini Euro FX, so **E72H** is the March 2002 contract.", cite: E72H },
          { text: "Some systems put the **month before the year**: LCZ2.", cite: MONTHFIRST },
        ],
      },
      {
        kind: "quote",
        lead: "Table 5-3, the twelve delivery-month codes every futures trader reads:",
        cite: T53,
        mark: ["March H", "June M", "September U", "December Z"],
      },
      {
        kind: "game",
        id: "month-codes",
        title: "Month codes",
        brief: "Learn the twelve futures **delivery-month codes** from Table 5-3, then decode and write symbols the book's way: **commodity + year digit + month letter**. Each code you get right lights up.",
        game: MonthCodes,
      },
      {
        kind: "choice",
        q: "What does LC2Z refer to?",
        options: [
          "The CME December 2002 live cattle futures contract",
          "The CME March 2002 live cattle futures contract",
          "Two live cattle contracts for December",
          "A December 2002 live cattle option",
        ],
        answer: 0,
        why: "LC = live cattle, 2 = 2002, Z = December.",
        cite: LC2Z,
      },
      {
        kind: "fill",
        q: "In E72H, ___ is the commodity code, 2 is the year, and ___ is the delivery month (March).",
        bank: ["E7", "H", "E", "72", "Z"],
        answer: ["E7", "H"],
        why: "E7 is the CME E-mini Euro FX contract; 2 = 2002; H = March.",
        cite: E72H,
      },
      {
        kind: "truefalse",
        q: "The second character of a futures commodity code is always a letter.",
        answer: false,
        why: "It can be a number: E7 is the code for the CME E-mini Euro FX contract.",
        cite: SECOND,
      },
      {
        kind: "today",
        title: "Month first on CME Globex",
        body: "CME Globex writes the month letter first and a **one-digit year**: **ESZ6** is the E-mini S&P 500 future for **December 2026**. The month letters are the same as Table 5-3.",
        source: "CME Group product and month codes",
      },
      {
        kind: "today",
        title: "Length no longer tells the market",
        body: "Symbol length no longer marks the listing market: **Zillow** trades as **Z** on Nasdaq, and **Alibaba** as **BABA** on the NYSE.",
        source: "Nasdaq and NYSE listings",
      },
      {
        kind: "recap",
        points: [
          { text: "Each **exchange** assigns ticker symbols to its instruments; vendors may add prefixes or suffixes.", cite: ASSIGN },
          { text: "A U.S. futures symbol: **commodity code + year digit + month letter** (LC2Z).", cite: FUT },
          { text: "Month codes run **F G H J K M N Q U V X Z**, January to December.", cite: T53 },
        ],
      },
    ],
  },
  // ── 5.4.3 Option symbols (OPRA codes) ───────────────────────────────────
  {
    id: "5.4.3-options",
    sec: "5.4.3",
    title: "Option symbols (OPRA codes)",
    pages: "99–101",
    imp: 1,
    steps: [
      {
        kind: "definition",
        term: "Options root",
        body: "The first **one to three characters** of an OPRA option symbol. They name the **underlying**, often with its own ticker symbol or part of it.",
        cite: ROOT_OFTEN,
      },
      {
        kind: "idea",
        title: "Root + month + strike",
        body: "After the root, the **second-to-last letter** gives the **option type and expiration month**, and the **last letter** gives the **strike price**.",
        cite: SECOND_LAST,
      },
      {
        kind: "see",
        title: "Reading IBMAT",
        illus: OptionSymbol,
        beats: [
          { text: "OPRA symbols for U.S. equity options have **three to five characters**. Take IBMAT.", cite: THREE5 },
          { text: "The first one to three characters are the **options root**, usually the underlying's own ticker: IBM.", cite: ROOT },
          { text: "The second-to-last letter gives **type and month**. Calls run A to L, January to December: **A** is a January call.", cite: T54 },
          { text: "The last letter is the **strike**: **T** is 100. The same letter also means 200 or 300; the root tells which.", cite: T55 },
          { text: "Puts run M to X: **IBMMT** is the IBM January 100 put.", cite: IBMMT },
          { text: "Stocks with many strikes get several roots. Microsoft's **MSQVJ** is the October 50 put.", cite: MSQVJ },
        ],
      },
      {
        kind: "choice",
        q: "In IBMIT, what does the I before the T mean?",
        options: ["A September call", "A September put", "A strike of 45", "The exchange that lists it"],
        answer: 0,
        why: "Calls run A–L from January: I is the ninth letter, September. IBMIT is the IBM September 100 call.",
        cite: IBMIT,
      },
      {
        kind: "truefalse",
        q: "The same strike-price letter can stand for different strike prices.",
        answer: true,
        why: "A can mean 5, 105 or 205 (Table 5-5). Different roots keep such contracts apart.",
        cite: SAMECHAR,
      },
      {
        kind: "idea",
        title: "Many strikes, many roots",
        body: "A stock with options at many strike prices often gets **several roots**; each root covers a **different set of strikes**.",
        cite: EACH_ROOT,
      },
      {
        kind: "game",
        id: "option-code",
        title: "Option code",
        brief: "Read and write OPRA option symbols with **Tables 5-4 and 5-5** at hand: root, then a letter for **type and month**, then a letter for the **strike**. Three of the rounds are the book's own examples.",
        game: OptionCode,
      },
      {
        kind: "choice",
        q: "Why does Microsoft have more than one options root (MSQ, MQF)?",
        options: [
          "Its options have many strike prices, and each root designates a different set",
          "Calls and puts need different roots",
          "Each root is a different expiration year",
          "It is listed on two stock exchanges",
        ],
        answer: 0,
        why: "Securities with options at many strikes often have several roots, one per set of strikes.",
        cite: MANY_ROOTS,
      },
      {
        kind: "idea",
        title: "Options on futures use other codes",
        body: "Month codes for **options on futures** differ from equity options. Their **call** codes are the **futures delivery-month codes** (F to Z); puts use other letters.",
        cite: FUTOPT_CALLS,
      },
      {
        kind: "choice",
        q: "For an option on a futures contract, which letter means a December call?",
        options: ["Z", "L", "X", "T"],
        answer: 0,
        why: "Call codes for options on futures equal the futures month codes: December is Z. (L and X are the equity December call and put; T is the futures-option December put.)",
        cite: T56,
      },
      {
        kind: "fill",
        q: "In an OPRA symbol, the second-to-last character indicates the option ___ and expiration ___.",
        bank: ["type", "month", "strike", "root", "year"],
        answer: ["type", "month"],
        why: "The last character is the strike; the root comes first.",
        cite: SECOND_LAST,
      },
      {
        kind: "today",
        title: "These codes were retired in 2010",
        body: "The 2010 **Options Symbology Initiative** replaced OPRA codes with OCC's 21-character symbol: root, expiration date (yymmdd), C or P, and strike × 1000 in eight digits. The IBM January 16, 2026 100 call is **IBM 260116C00100000**.",
        source: "OCC Options Symbology Initiative (2010)",
      },
      {
        kind: "recap",
        points: [
          { text: "OPRA option symbols start with an **options root** of one to three characters.", cite: ROOT },
          { text: "Then one letter for **type and month**, and one for the **strike**.", cite: FINAL },
          { text: "Many strikes → **several roots**, each for a different set of strikes.", cite: MANY_ROOTS },
        ],
      },
    ],
  },
];

export const U54A_CHECKPOINT: Question[] = [
  {
    kind: "truefalse",
    q: "What floor-based exchanges post on their floor screens and boards is usually the same information they provide to the public.",
    answer: true,
    why: "Indeed, the same data vendors often provide both services.",
    cite: SAME,
  },
  {
    kind: "truefalse",
    q: "Data vendors occasionally add their own prefixes or suffixes to exchange ticker symbols.",
    answer: true,
    why: "They do it to make the symbols more useful to their clients.",
    cite: SUFFIX,
  },
  {
    kind: "choice",
    q: "Which statement about one-letter U.S. stock symbols is right?",
    options: [
      "They are rare, and exchanges usually reserve them for their largest firms",
      "They mark Nasdaq SmallCap stocks",
      "They are given to mutual funds",
      "Any company can pick one when it lists",
    ],
    answer: 0,
    why: "One-letter symbols are rare and coveted for the status they convey.",
    cite: RESERVE,
  },
  {
    kind: "choice",
    q: "What is the difference between LC2Z and LCZ2?",
    options: [
      "None: some systems place the month code before the year number",
      "LCZ2 is an option on LC2Z",
      "LCZ2 expires two years later",
      "LCZ2 trades on a different exchange",
    ],
    answer: 0,
    why: "Both name December 2002 live cattle; systems differ in whether the month or the year comes first.",
    cite: MONTHFIRST,
  },
  {
    kind: "truefalse",
    q: "Markets save most of the information they collect for regulatory purposes.",
    answer: true,
    why: "They present some to traders, sell some to vendors and save most for regulators.",
    cite: PRESENT_SELL,
  },
  {
    kind: "choice",
    q: "How did the Archipelago ECN distribute its limit order book, according to the book?",
    options: [
      "All of it, merged with several other ECNs' books, free over the Internet",
      "Only the best bid and offer, for a monthly fee",
      "Only to its members, with a 15-minute delay",
      "It kept its book closed",
    ],
    answer: 0,
    why: "Archipelago gave away its entire, integrated book in real time through a Java applet.",
    cite: ARCA,
  },
  {
    kind: "choice",
    q: "Who assigns ticker symbols to U.S. exchange-traded equity options, in the book?",
    options: ["The Option Price Reporting Authority (OPRA)", "Each data vendor", "The SEC", "The NASD"],
    answer: 0,
    why: "OPRA assigns the symbols for exchange-traded U.S. equity and equity index options.",
    cite: OPRA,
  },
  {
    kind: "choice",
    q: "Decode the book's example IBMAT.",
    options: ["IBM January 100 call", "IBM January 100 put", "IBM April 100 call", "IBM January 5 call"],
    answer: 0,
    why: "IBM = root; A = January call (calls A–L); T = 100 (IBM trades near 100, not 200 or 300).",
    cite: IBMAT,
  },
  {
    kind: "truefalse",
    q: "Options on futures use the same month codes as equity options.",
    answer: false,
    why: "They differ. Their call codes are the futures delivery-month codes instead (December call = Z, not L).",
    cite: FUTOPT,
  },
];

