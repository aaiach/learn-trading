// 5.1 OVERVIEW (pp. 89–90), with the chapter's opening (p. 89) and the "Price Clustering" box (p. 91)
import type { Cite, Lesson, Question, Unit } from "../types.ts";
import { Clustering, FloorOrOffice, InfoFlow, PriceGrid, RuleCard, ThreeWays, TwoMarkets } from "./illus/u51.tsx";
import { TickGrid } from "./games/TickGrid.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
// Chapter opening (unnumbered, cited as section "5"). The drop cap splits its first word, so we quote from the second sentence.
const DETERMINE = c(89, "5", "They determine who can trade; what they can trade; and when, where, and how they can trade.");
const SEE = c(89, "5", "They also determine what information traders can see about orders, quotations, and trades; when they can see it; and who can see it.");
const IMPORTANT = c(89, "5", "Market structure is extremely important because it determines what people can know and do in a market.");
const POWER = c(89, "5", "Since power comes from knowledge and the ability to act on it, market structure helps determine power relations among various types of traders.");
const PROFIT = c(89, "5", "These relationships greatly affect who will trade profitably.");
const EVERY = c(89, "5", "To trade effectively, you need to know the structure of every market in which you trade.");
const STRATS = c(89, "5", "The trading strategies that are successful in one market often do not work well in markets with different structures.");
const BEST = c(89, "5", "The best order submission strategy for a given trading problem generally depends on the structure of the market where the trader intends to solve the problem.");
const BEHAVE = c(89, "5", "Traders therefore behave differently in different markets.");
const DEPEND = c(89, "5", "These variables all depend on trader behavior.");
const LIQUID = c(89, "5", "it helps to determine whether markets will be liquid, whether prices will be informative, and which traders will trade profitably.");
const SIMILAR = c(89, "5", "Being able to classify market structures will be useful to you because trading problems have similar solutions in similar markets.");
const APPLY = c(89, "5", "If you understand how to trade in one market, you should be able to apply your knowledge and experience to similar markets.");

// 5.1 Overview
const SESSIONS = c(89, "5.1", "The two types of trading sessions are continuous trading sessions and call market sessions.");
const CONT = c(89, "5.1", "In continuous trading, traders can attempt to arrange their trades whenever the market is open.");
const CALL = c(89, "5.1", "In call markets, all trades take place only when the market is called.");
const FORUMS = c(90, "5.1", "Trading forums are the places where traders arrange their trades.");
const FLOOR = c(90, "5.1", "In physically convened markets, traders must be on a trading floor to negotiate their trades.");
const PITS = c(90, "5.1", "Physically convened futures markets trade in trading pits.");
const POSTS = c(90, "5.1", "Physically convened stock markets trade at posts.");
const DIST = c(90, "5.1", "In distributed access markets, traders use telephones or screen-based trading systems to arrange their trades from their offices.");
const ONE_PLACE = c(90, "5.1", "Some countries require that traders arrange all trades in a given instrument at a particular exchange.");
const CORN = c(90, "5.1", "it is illegal to arrange trades in a Chicago Board of Trade corn futures contract outside of the corn futures trading pit on the CBOT floor.");
const WHERE_COMMON = c(90, "5.1", "These restrictions are common in many futures markets and in the equities markets of some Asian and Eastern European countries.");
const BOX_PC = "Physically Convened Screen-based Markets";
const ASIA = c(90, "5.1", "many Asian exchanges with screen-based trading systems once required their traders to be on their trading floors to use their electronic systems.", { box: BOX_PC });
const REGULATE = c(90, "5.1", "This arrangement made it easier for exchanges to regulate their traders.", { box: BOX_PC });
const NETWORKS = c(90, "5.1", "It also allowed them to construct reliable communications networks", { box: BOX_PC });
const SOCIETY = c(90, "5.1", "Many traders like to trade in physically convened markets because they enjoy the society of other traders.", { box: BOX_PC });

const EXEC = c(90, "5.1", "Traders and exchanges use various execution systems to arrange trades.");
const QUOTE = c(90, "5.1", "In quote-driven systems, dealers arrange most trades when they trade with their customers.");
const ORDER = c(90, "5.1", "In order-driven systems, all trades are arranged by using order precedence rules to match buyers to sellers and trade pricing rules to determine the prices of the resulting trades.");
const BROKERED = c(90, "5.1", "In brokered trading systems, brokers arrange trades by helping buyers and sellers find each other.");
const INFOSYS = c(90, "5.1", "Various systems move information in and out of the market, present it, and store it.");
const ROUTING = c(90, "5.1", "Order-routing systems send orders from customers to brokers, from brokers to dealers, from brokers to markets, and from markets to markets.");
const REPORTS = c(90, "5.1", "These systems also send reports of filled orders back to customers.");
const PRESENT = c(90, "5.1", "Order presentation systems present orders to traders so that they can act upon them.");
const TECH = c(90, "5.1", "The systems may use screen-based, open-outcry, or hand-signaling technologies.");
const BOOKS = c(90, "5.1", "Order books store open orders.");
const DATA = c(90, "5.1", "Market data systems report trades and quotes to the public.");

const TICK = c(90, "5.1", "In most markets, traders can use only prices that are an integer multiple of a specified minimum price increment.");
const SIZE = c(90, "5.1", "The size of the increment, measured as a fraction of price, varies considerably across markets.");
const QUALITY = c(90, "5.1", "In chapter 11, we show that the increment is an extremely important determinant of market quality in many markets.");
// Box "Price Clustering" sits on p. 91, inside 5.2.2.
const BOX_CL = "Price Clustering";
const UNEQUAL = c(91, "5.2.2", "Traders do not use all possible prices equally. Instead, their usage clusters on round numbers.", { box: BOX_CL });
const FRACTIONS = c(91, "5.2.2", "they use whole numbers more often than halves, halves more often than odd quarters, quarters more often than odd eighths, and eighths more often than odd sixteenths.", { box: BOX_CL });
const DECIMALS = c(91, "5.2.2", "In markets with decimal prices, prices that are integer multiples of 1.00, 0.50, 0.25, 0.20, 0.10, and 0.05 are most common.", { box: BOX_CL });
const PRONOUNCED = c(91, "5.2.2", "The clustering of prices is most pronounced when the minimum price increment is a small fraction of price, the market is highly volatile, and the instrument is thinly traded.", { box: BOX_CL });
const CLEVER = c(91, "5.2.2", "Clever traders often consider the clustering of limit order prices when they place limit orders.", { box: BOX_CL });
const ABOVE = c(91, "5.2.2", "They frequently place their orders just above or just below a round number to take advantage of the fact that many other traders may place their prices at the round number.", { box: BOX_CL });

// ── Lessons ─────────────────────────────────────────────────────────────────
const L_STRUCTURE: Lesson = {
  id: "5-structure",
  sec: "5",
  title: "What market structure is",
  pages: "89",
  imp: 3,
  steps: [
    {
      kind: "definition",
      term: "Market structure",
      body: "A market's **trading rules** and **trading systems**. They decide **who** can trade, **what**, **when**, **where** and **how**.",
      cite: DETERMINE,
    },
    {
      kind: "idea",
      title: "It also decides what you can see",
      body: "Structure sets what traders can see about **orders, quotes and trades**, **when** they see it, and **who** gets to see it.",
      cite: SEE,
    },
    {
      kind: "see",
      title: "What the rules decide",
      illus: RuleCard,
      beats: [
        { text: "A market's rules decide **who** can trade and **what** they can trade.", cite: DETERMINE },
        { text: "They also decide **when**, **where** and **how** traders can trade." },
        { text: "And what traders **can see**: orders, quotes and trades, **when** they see them, and **who** sees them.", cite: SEE },
        { text: "Power comes from **knowledge** and the ability to act on it, so structure shapes **who trades profitably**.", cite: POWER },
      ],
    },
    {
      kind: "multi",
      q: "Which of these does a market's structure decide? (Select all that apply.)",
      options: ["Who can trade", "When and where they can trade", "What traders can see about orders and trades", "What the traded company is worth", "Which broker charges the lowest commission"],
      answer: [0, 1, 2],
      why: "Structure is the rules and systems of the market: who, what, when, where, how, and who sees what. It doesn't set values or broker prices.",
      cite: DETERMINE,
    },
    {
      kind: "quote",
      lead: "Why it matters so much:",
      cite: IMPORTANT,
      mark: ["what people can know and do"],
    },
    {
      kind: "truefalse",
      q: "Market structure helps decide **which traders trade profitably**.",
      answer: true,
      why: "Structure decides what each type of trader can know and do. Those power relations greatly affect who trades profitably.",
      cite: PROFIT,
    },
    {
      kind: "idea",
      title: "Know every market you trade",
      body: "You need the structure of **every** market you trade in. A strategy that works in one market often **fails** in a market with a different structure.",
      cite: STRATS,
    },
    {
      kind: "see",
      title: "One order, two markets",
      illus: TwoMarkets,
      beats: [
        { text: "You send the same order, **buy 100**, to two markets with different structures. (Our numbers.)" },
        { text: "In the **continuous** market a seller is waiting, so you **trade at once**. In the **call** market, your order **waits**.", cite: CONT },
        { text: "In the call market, other traders' orders **pile up** until the market is called.", cite: CALL },
        { text: "At the **call** they all trade together. Same order, different result: the best order strategy **depends on the structure**.", cite: BEST },
      ],
    },
    {
      kind: "choice",
      q: "A strategy works well on one exchange. You move it to a market with a **different structure**. What should you expect?",
      options: ["It may not work well there", "It works exactly the same", "It always works better in a bigger market", "Structure only matters for dealers"],
      answer: 0,
      why: "Strategies that succeed in one market often don't work well in markets with different structures.",
      cite: STRATS,
    },
    {
      kind: "fill",
      q: "The best order ___ strategy for a trading problem generally depends on the ___ of the market where you trade.",
      bank: ["submission", "structure", "pricing", "volume", "holding", "history"],
      answer: ["submission", "structure"],
      why: "How you should send your orders depends on how the market where you trade is organized.",
      cite: BEST,
    },
    {
      kind: "idea",
      title: "Similar markets, similar solutions",
      body: "**Trading problems have similar solutions in similar markets.** Learn to classify a market and you can reuse what you know from markets like it.",
      cite: SIMILAR,
    },
    {
      kind: "multi",
      q: "Through its effect on trader behavior, what does market structure help determine? (Select all that apply.)",
      options: ["Whether markets will be liquid", "Whether prices will be informative", "Which traders will trade profitably", "The company's future earnings", "The central bank's interest rate"],
      answer: [0, 1, 2],
      why: "Liquidity, informative prices and trading profits all depend on how traders behave, and structure shapes that behavior.",
      cite: LIQUID,
    },
    {
      kind: "recap",
      points: [
        { text: "**Market structure** = the rules and systems that decide who, what, when, where, how, and who sees what.", cite: DETERMINE },
        { text: "Power comes from **knowledge**, so structure shapes **who trades profitably**.", cite: POWER },
        { text: "Strategies don't travel: learn the structure of **every** market you trade.", cite: EVERY },
      ],
    },
  ],
};

const L_FORUMS: Lesson = {
  id: "5.1-forums",
  sec: "5.1",
  title: "Where trades are arranged",
  pages: "89–90",
  imp: 3,
  steps: [
    {
      kind: "idea",
      title: "Two kinds of trading sessions",
      body: "Trading happens in **sessions**. In a **continuous** session you can try to trade whenever the market is open. In a **call** session, all trades happen only when the market is **called**.",
      cite: SESSIONS,
    },
    {
      kind: "definition",
      term: "Trading forums",
      body: "The **places** where traders arrange their trades: a trading floor, or telephones and screens in their own offices.",
      cite: FORUMS,
    },
    {
      kind: "definition",
      term: "Physically convened market",
      body: "Traders must be **on a trading floor** to negotiate. Futures trade in **pits**, stocks at **posts**.",
      cite: FLOOR,
    },
    {
      kind: "definition",
      term: "Distributed access market",
      body: "Traders arrange trades **from their offices**, by **telephone** or through **screen-based** trading systems.",
      cite: DIST,
    },
    {
      kind: "see",
      title: "On the floor, or in the office",
      illus: FloorOrOffice,
      beats: [
        { text: "**Physically convened**: traders meet on a trading floor. Futures trade in a **pit**, stocks at a **post**.", cite: PITS },
        { text: "**Distributed access**: traders stay **in their offices** and trade by phone or through a screen-based system.", cite: DIST },
        { text: "Some markets must be the **only place**. With few exceptions, a CBOT corn futures trade arranged **outside the corn pit** is illegal.", cite: CORN },
        { text: "Screens don't always mean offices: many Asian exchanges once put their **screens on the floor**, and traders had to come in to use them.", cite: ASIA },
      ],
    },
    {
      kind: "classify",
      q: "Physically convened or distributed access?",
      buckets: ["Physically convened", "Distributed access"],
      items: [
        { text: "Corn futures in a CBOT pit", bucket: 0, why: "Traders must be in the pit, on the floor." },
        { text: "Stocks traded at a post", bucket: 0, why: "Posts are on an exchange floor." },
        { text: "A bond dealer quoting by phone from an office", bucket: 1, why: "Telephones let traders trade from their offices." },
        { text: "A fund trading on a screen from its office", bucket: 1, why: "Screen-based systems are ideal for distributed access." },
        { text: "Traders shouting bids in a futures pit", bucket: 0, why: "Open outcry happens face to face on the floor." },
        { text: "Currency dealers trading over the telephone", bucket: 1, why: "They arrange trades from their offices." },
      ],
      cite: DIST,
    },
    {
      kind: "choice",
      q: "In a physically convened market, where do **stocks** trade?",
      options: ["At posts", "In trading pits", "In dealers' offices", "Over the telephone"],
      answer: 0,
      why: "Physically convened stock markets trade at posts. Futures trade in pits.",
      cite: POSTS,
    },
    {
      kind: "idea",
      title: "Sometimes one place is the law",
      body: "Some countries require that **all trades** in an instrument be arranged at **one exchange**. These rules are common in many futures markets and in some Asian and Eastern European stock markets.",
      cite: ONE_PLACE,
    },
    {
      kind: "truefalse",
      q: "Two traders who agree on a price may legally arrange a **CBOT corn futures** trade by telephone, away from the pit, whenever they like.",
      answer: false,
      why: "With few exceptions, arranging a CBOT corn futures trade outside the corn futures pit is illegal.",
      cite: CORN,
    },
    {
      kind: "multi",
      q: "Where are rules that force all trading into one exchange common? (Select all that apply.)",
      options: ["Many futures markets", "Stock markets of some Asian countries", "Stock markets of some Eastern European countries", "Foreign exchange markets", "U.S. corporate bond markets"],
      answer: [0, 1, 2],
      why: "Harris lists many futures markets and the equity markets of some Asian and Eastern European countries.",
      cite: WHERE_COMMON,
    },
    {
      kind: "quote",
      lead: "Screens on the floor:",
      cite: ASIA,
      mark: ["once required their traders to be on their trading floors"],
    },
    {
      kind: "choice",
      q: "Why did some Asian exchanges make traders come to the floor to use **screen-based** systems?",
      options: ["It made traders easier to regulate", "Screens were too heavy to install in offices", "Floor trading needs no communications network", "To keep foreign traders out"],
      answer: 0,
      why: "It made it easier to regulate traders. It also let exchanges build reliable networks where telecommunications were poor.",
      cite: REGULATE,
    },
    {
      kind: "truefalse",
      q: "Some traders stay on exchange floors even when the rules no longer require it, because they **enjoy the company** of other traders.",
      answer: true,
      why: "Many traders like physically convened markets for the society of other traders.",
      cite: SOCIETY,
    },
    {
      kind: "today",
      title: "Most futures pits have closed",
      body: "CME Group closed most of its **futures trading pits** in Chicago and New York in **2015**. Corn futures now trade electronically on **CME Globex**; some options pits stayed open.",
      source: "CME Group announcement (February 2015)",
    },
    {
      kind: "recap",
      points: [
        { text: "Sessions are **continuous** (trade any time it's open) or **call** (trade only when called).", cite: SESSIONS },
        { text: "**Physically convened**: on a floor, futures in pits, stocks at posts. **Distributed access**: from offices, by phone or screen.", cite: FLOOR },
        { text: "Some markets must be the **only place** to trade an instrument, like the CBOT corn pit.", cite: ONE_PLACE },
      ],
    },
  ],
};

const L_SYSTEMS: Lesson = {
  id: "5.1-systems",
  sec: "5.1",
  title: "The systems that run a market",
  pages: "90",
  imp: 3,
  steps: [
    {
      kind: "idea",
      title: "Three ways to arrange a trade",
      body: "Every market uses an **execution system** to arrange trades: **quote-driven**, **order-driven** or **brokered**. Section 5.3 takes each in turn.",
      cite: EXEC,
    },
    {
      kind: "see",
      title: "Dealer, rules or broker",
      illus: ThreeWays,
      beats: [
        { text: "**Quote-driven**: a dealer stands in the middle. The buyer trades with the dealer, and so does the seller.", cite: QUOTE },
        { text: "**Order-driven**: both orders go to the rules. **Order precedence rules** pair buyer with seller, **trade pricing rules** set the price.", cite: ORDER },
        { text: "**Brokered**: the buyer asks a broker, who **searches** for a seller and brings the two together.", cite: BROKERED },
      ],
    },
    {
      kind: "match",
      q: "Match each execution system to how it arranges trades.",
      pairs: [
        ["Quote-driven", "Dealers trade with their customers"],
        ["Order-driven", "Rules match buyers to sellers"],
        ["Brokered", "Brokers help buyers and sellers find each other"],
      ],
      cite: EXEC,
    },
    {
      kind: "choice",
      q: "In an **order-driven** system, what sets the price of each trade?",
      options: ["Trade pricing rules", "The dealer's quote", "The broker's judgment", "The buyer alone"],
      answer: 0,
      why: "Order precedence rules decide who trades with whom; trade pricing rules decide the price.",
      cite: ORDER,
    },
    {
      kind: "fill",
      q: "In order-driven systems, order ___ rules match buyers to sellers, and trade ___ rules determine the prices.",
      bank: ["precedence", "pricing", "settlement", "clearing", "dealer"],
      answer: ["precedence", "pricing"],
      why: "Two sets of rules: precedence (who trades with whom) and pricing (at what price).",
      cite: ORDER,
    },
    {
      kind: "truefalse",
      q: "In a **quote-driven** system, dealers arrange most trades by trading with their customers.",
      answer: true,
      why: "That is what makes it quote-driven: dealers quote prices and trade with their customers.",
      cite: QUOTE,
    },
    {
      kind: "idea",
      title: "Information systems",
      body: "Other systems move information **in and out** of the market, **present** it to traders and **store** it.",
      cite: INFOSYS,
    },
    {
      kind: "see",
      title: "Where market information flows",
      illus: InfoFlow,
      beats: [
        { text: "**Order-routing systems** carry orders in: customer to broker, broker to market.", cite: ROUTING },
        { text: "They also send **reports of filled orders** back to the customer.", cite: REPORTS },
        { text: "**Order presentation systems** show orders to traders so they can act: on screens, by open outcry or by hand signals.", cite: PRESENT },
        { text: "**Order books** store the orders that are still open.", cite: BOOKS },
        { text: "**Market data systems** report trades and quotes to the public.", cite: DATA },
      ],
    },
    {
      kind: "match",
      q: "Match each system to its job.",
      pairs: [
        ["Order-routing system", "Sends orders in, fill reports back"],
        ["Order presentation system", "Shows orders to traders"],
        ["Order book", "Stores open orders"],
        ["Market data system", "Reports trades and quotes to the public"],
      ],
      cite: INFOSYS,
    },
    {
      kind: "multi",
      q: "Order-routing systems send orders between which parties? (Select all that apply.)",
      options: ["Customers to brokers", "Brokers to dealers", "Brokers to markets", "Markets to markets", "Order books to newspapers"],
      answer: [0, 1, 2, 3],
      why: "Customers to brokers, brokers to dealers and markets, and markets to other markets. They also carry fill reports back.",
      cite: ROUTING,
    },
    {
      kind: "choice",
      q: "Which technologies can an **order presentation system** use?",
      options: ["Screens, open outcry or hand signals", "Only computer screens", "Only telephones", "Only printed order tickets"],
      answer: 0,
      why: "Presentation can be screen-based, open-outcry or hand-signaling.",
      cite: TECH,
    },
    {
      kind: "truefalse",
      q: "Order books store **filled** orders so that the market can report them later.",
      answer: false,
      why: "Order books store **open** orders, the ones not yet filled. Market data systems report trades.",
      cite: BOOKS,
    },
    {
      kind: "recap",
      points: [
        { text: "Execution systems: **quote-driven** (dealers), **order-driven** (rules), **brokered** (brokers find each side).", cite: EXEC },
        { text: "Order-driven markets use **precedence rules** to pair traders and **pricing rules** to set prices.", cite: ORDER },
        { text: "Information systems: **order routing**, **order presentation**, **order books**, **market data**.", cite: INFOSYS },
      ],
    },
  ],
};

const L_TICK: Lesson = {
  id: "5.1-tick",
  sec: "5.1",
  title: "The minimum price increment",
  pages: "90–91",
  imp: 3,
  steps: [
    {
      kind: "definition",
      term: "Minimum price increment",
      body: "The smallest step between allowed prices: in most markets every price must be a **whole multiple** of it. Traders call it the **tick size**.",
      cite: TICK,
    },
    {
      kind: "idea",
      title: "Its size varies a lot",
      body: "Measured as a **fraction of price**, the increment differs widely across markets. Chapter 11 shows it strongly affects **market quality**.",
      cite: SIZE,
    },
    {
      kind: "see",
      title: "The price grid",
      illus: PriceGrid,
      beats: [
        { text: "With an increment of **0.05**, the allowed prices are 20.00, 20.05, 20.10 and so on. (Our numbers.)", cite: TICK },
        { text: "A limit price of **20.07** is not a multiple of 0.05, so it isn't allowed. The nearest allowed prices are 20.05 and 20.10." },
        { text: "The same 0.05 is **0.25%** of a $20 price but **2.5%** of a $2 price: as a fraction of price, increments vary.", cite: SIZE },
      ],
    },
    {
      kind: "choice",
      q: "The minimum price increment is **0.25**. Which limit price can a trader use? (Our numbers.)",
      options: ["30.50", "30.10", "30.30", "30.05"],
      answer: 0,
      why: "30.50 is 122 × 0.25. The others are not whole multiples of 0.25.",
      cite: TICK,
    },
    {
      kind: "number",
      q: "A stock trades near **$40** and the increment is **$0.01**. What is the increment as a percent of price?",
      answer: 0.025,
      tol: 0.0005,
      unit: "%",
      illustrative: true,
      why: "0.01 ÷ 40 = 0.00025, or 0.025% of the price.",
      cite: SIZE,
    },
    {
      kind: "quote",
      lead: "A preview of chapter 11:",
      cite: QUALITY,
      mark: ["extremely important determinant of market quality"],
    },
    {
      kind: "idea",
      title: "Prices cluster on round numbers",
      body: "Traders don't use all prices equally: they favor **round numbers**. With decimal prices, multiples of **1.00, 0.50, 0.25, 0.20, 0.10 and 0.05** are the most common.",
      cite: DECIMALS,
    },
    {
      kind: "see",
      title: "Stepping ahead of the crowd",
      illus: Clustering,
      beats: [
        { text: "Buy orders **cluster** on the round number 20.00. (Our numbers.)", cite: UNEQUAL },
        { text: "A clever buyer bids **20.01**, just above the round number.", cite: ABOVE },
        { text: "A seller arrives and sells to the **highest bid** first: you trade before the whole crowd at 20.00, for one cent more." },
      ],
    },
    {
      kind: "choice",
      q: "Many buyers bid exactly **20.00**. Where does a clever buyer place a limit order to buy? (Our numbers.)",
      options: ["20.01, just above the round number", "20.00, with the crowd", "19.99, just below the round number", "19.50, well below"],
      answer: 0,
      why: "Just above the round number puts you ahead of everyone at 20.00 when a seller comes, at a cost of one cent.",
      cite: ABOVE,
    },
    {
      kind: "multi",
      q: "When is price clustering **most pronounced**? (Select all that apply.)",
      options: ["The increment is a small fraction of price", "The market is highly volatile", "The instrument is thinly traded", "The instrument trades very actively", "The increment is a large fraction of price"],
      answer: [0, 1, 2],
      why: "Clustering is strongest with a small increment relative to price, high volatility and thin trading.",
      cite: PRONOUNCED,
    },
    {
      kind: "game",
      id: "tick-grid",
      title: "Tick grid",
      brief: "Ten quick rounds: is the price **on the grid**? Where do you place your order to **beat the crowd** at a round number? Which price will traders use most? (Prices are ours; the rules are the book's.)",
      game: TickGrid,
    },
    {
      kind: "order",
      q: "Prices in fractions: put these from **most** used to **least** used.",
      items: ["Whole numbers", "Halves", "Odd quarters", "Odd eighths", "Odd sixteenths"],
      why: "Whole numbers beat halves, halves beat odd quarters, quarters beat odd eighths, eighths beat odd sixteenths.",
      cite: FRACTIONS,
    },
    {
      kind: "truefalse",
      q: "Clever traders consider where **other** traders' limit orders cluster when they price their own limit orders.",
      answer: true,
      why: "Knowing that many orders sit at round numbers, they price just above or just below them.",
      cite: CLEVER,
    },
    {
      kind: "today",
      title: "U.S. stocks trade in pennies",
      body: "Since **Regulation NMS** (2005), U.S. stocks priced at **$1 or more** can't be quoted in increments smaller than **$0.01**.",
      source: "SEC Regulation NMS (2005), Rule 612",
    },
    {
      kind: "recap",
      points: [
        { text: "Prices must be whole multiples of the **minimum price increment** (the tick).", cite: TICK },
        { text: "Traders **cluster** on round numbers, most of all with small ticks, volatile markets and thin trading.", cite: PRONOUNCED },
        { text: "Clever traders price **just above or just below** a round number to get ahead of the crowd.", cite: ABOVE },
      ],
    },
  ],
};

const CHECKPOINT: Question[] = [
  {
    kind: "truefalse",
    q: "Traders behave the same way in every market, whatever its structure.",
    answer: false,
    why: "Because the best strategy depends on structure, traders behave differently in different markets.",
    cite: BEHAVE,
  },
  {
    kind: "choice",
    q: "If you know how to trade in one market, where should that knowledge help most?",
    options: ["In markets with a similar structure", "In every market equally", "Only in the same instrument", "Nowhere: each market is unique"],
    answer: 0,
    why: "Trading problems have similar solutions in similar markets, so knowledge carries over to similar structures.",
    cite: APPLY,
  },
  {
    kind: "choice",
    q: "In which kind of market can traders attempt to arrange trades **whenever the market is open**?",
    options: ["A continuous market", "A call market", "A rotation", "A pari-mutuel pool"],
    answer: 0,
    why: "Continuous sessions let traders try to trade any time; call markets trade only when called.",
    cite: CONT,
  },
  {
    kind: "choice",
    q: "Requiring screen traders to sit on the trading floor made them easier to regulate. What else did it let those Asian exchanges do?",
    options: ["Build reliable communications networks", "Abolish the minimum price increment", "Trade around the clock", "Skip trade reporting"],
    answer: 0,
    why: "Reliable networks mattered in countries with poor telecommunications infrastructures.",
    cite: NETWORKS,
  },
  {
    kind: "choice",
    q: "Which system reports **trades and quotes to the public**?",
    options: ["Market data systems", "Order books", "Order presentation systems", "Order-routing systems"],
    answer: 0,
    why: "Market data systems report to the public; books store open orders; presentation shows orders to traders.",
    cite: DATA,
  },
  {
    kind: "truefalse",
    q: "In most markets traders may use any price they like, to as many decimals as they want.",
    answer: false,
    why: "In most markets, prices must be an integer multiple of the minimum price increment.",
    cite: TICK,
  },
  {
    kind: "fill",
    q: "Liquidity, price efficiency and volatility all depend on trader ___, which market ___ affects.",
    bank: ["behavior", "structure", "income", "regulators", "taxes"],
    answer: ["behavior", "structure"],
    why: "These variables depend on how traders behave, and structure shapes that behavior.",
    cite: DEPEND,
  },
];

export const U51: Unit = {
  sec: "5.1",
  title: "Overview",
  pages: "89–91",
  lessons: [L_STRUCTURE, L_FORUMS, L_SYSTEMS, L_TICK],
  checkpoint: CHECKPOINT,
};
