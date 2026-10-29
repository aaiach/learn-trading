// 5.3.2–5.3.5: Order-driven Markets, Brokered Markets, Hybrid Markets, Summary (pp. 94–96), with the
// matching 5.5 summary and 5.6 points (p. 110). Lessons for unit 5.3, after u53a.
import type { Cite, Lesson, Question } from "../types.ts";
import {
  AuctionKinds,
  BrokerSearch,
  Counterparty,
  EbayAuction,
  HiddenLiquidity,
  HybridMix,
  OralVsMatching,
  OrderMatch,
  TableBuild,
} from "./illus/u53b.tsx";
import { ExecutionTable } from "./games/ExecutionTable.tsx";

const c = (p: number | string, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
// 5.3.2 Order-driven Markets (pp. 94–95)
const OD_DEF = c(94, "5.3.2", "In order-driven markets, buyers and sellers regularly trade with each other without the intermediation of dealers.");
const OD_RULES = c(94, "5.3.2", "These markets have trading rules that specify how they arrange their trades.");
const OD_PREC = c(94, "5.3.2", "Their order precedence rules determine which buyers trade with which sellers, and their trade pricing rules determine the trade prices.");
const AUCTION = c(94, "5.3.2", "Most order-driven markets are auction markets.");
const AUCTION_DEF = c(94, "5.3.2", "In an auction market, the trading rules formalize the process by which buyers seek the lowest available prices and sellers seek the highest available prices.");
const DISCOVERY = c(94, "5.3.2", "Economists call this the price discovery process because it reveals the prices that best match buyers to sellers.");
const OFFER_TAKE = c(94, "5.3.2", "In order-driven markets, traders can offer or take liquidity.");
const OFFER_DEF = c(94, "5.3.2", "Traders who offer liquidity indicate the terms at which they will trade. Traders who take liquidity accept those terms.");
const DEALERS_CAN = c(94, "5.3.2", "Dealers can—and often do—trade in order-driven markets.");
const EQUAL = c(94, "5.3.2", "In pure order-driven markets, they trade on an equal basis with all other traders.");
const MOST_LIQ = c(94, "5.3.2", "In some order-driven markets, dealers provide most of the liquidity.");
const STILL_OD = c(94, "5.3.2", "These markets are still known as order-driven markets because the dealers cannot choose their clients.");
const ANYONE = c(94, "5.3.2", "Instead, the exchange rules require that they trade with anyone who accepts their offers.");
const VARY = c(94, "5.3.2", "Order-driven market structures vary considerably.");
const SINGLE = c(94, "5.3.2", "Some markets conduct single-price auctions in which they arrange all trades at the same price");
const CONT = c(95, "5.3.2", "Other markets conduct continuous two-sided auctions, in which buyers and sellers can continuously attempt to arrange their trades at prices that typically vary through time.");
const CROSS = c(95, "5.3.2", "Still others conduct crossing networks, in which they match orders at prices taken from other markets.");
const ORAL = c(95, "5.3.2", "In markets that conduct oral auctions, traders negotiate their trades face-to-face on an exchange floor.");
const WHO_NEG = c(95, "5.3.2", "The trading rules in these markets determine who can negotiate and when they can negotiate.");
const OUTCRY = c(95, "5.3.2", "These auctions are also known as open-outcry auctions because the traders cry out their bids and offers.");
const MATCHING = c(95, "5.3.2", "In markets that have rule-based order-matching systems, the markets use rules to match orders that traders submit to them.");
const ELECTRONIC = c(95, "5.3.2", "Most order-matching markets use electronic systems to match buy and sell orders automatically.");
const CODED = c(95, "5.3.2", "Their trading rules are coded in their order-processing software.");
const CLERKS = c(95, "5.3.2", "Order-matching markets that still have manual operations use clerks to match their orders.");
const RULES_LIQ = c(95, "5.3.2", "The rules used by order-driven markets are extremely important because they affect market liquidity.");
const ENCOURAGE = c(95, "5.3.2", "Some trading rules encourage traders to offer liquidity while others discourage them.");
const CANNOT_CHOOSE = c(95, "5.3.2", "Since order-driven markets use order precedence rules to arrange trades, traders cannot choose with whom they trade.");
const NO_CREDIT = c(95, "5.3.2", "They therefore often trade with traders with whom they have no credit relationships.");
const MECH = c(95, "5.3.2", "To prevent settlement failures, order-driven markets have elaborate mechanisms to ensure that all their traders are trustworthy and creditworthy.");
const ALL_AUCT = c(95, "5.3.2", "All markets that conduct electronic auctions or open-outcry auctions are order-driven markets.");
const INCLUDE = c(95, "5.3.2", "These include all major futures exchanges, most stock and options exchanges, and many trading systems created by brokerages and ECNs to organize trading in stocks, bonds, swaps, currencies, and pollution rights.");
const GOV = c(95, "5.3.2", "Governments commonly issue their new debt securities in order-driven market calls.");
// For contrast: dealer markets (5.3.1, p. 93)
const DEALER_CHOOSE = c(93, "5.3.1", "In most dealer markets, dealers and their customers choose each other when they want to trade.");
const DEALER_TRUST = c(93, "5.3.1", "The dealers trade only with traders they believe are trustworthy and creditworthy.");

// Box "The World's Most Prolific Market Organizer" (p. 95)
const EBAY = { box: "The World's Most Prolific Market Organizer" };
const EBAY_MOST = c(95, "5.3.2", "eBay has created more markets than any other market organizer.", EBAY);
const EBAY_PURE = c(95, "5.3.2", "At any given moment, eBay is conducting pure order-driven auctions for millions of items.", EBAY);
const EBAY_CALL = c(95, "5.3.2", "Most of eBay's auctions are call market auctions to which buyers can submit only limit orders.", EBAY);
const EBAY_WIN = c(95, "5.3.2", "When the auction closes, the highest bidder wins.", EBAY);
const EBAY_BIN = c(95, "5.3.2", "The “buy it now” feature of some eBay markets allows buyers to take a seller's offer before the auction closes.", EBAY);
const EBAY_SETTLE = c(95, "5.3.2", "eBay does not guarantee settlement among its traders.", EBAY);
const EBAY_RATE = c(95, "5.3.2", "To help traders check credit, eBay provides a rating service that allows traders to rate each other and to see those ratings.", EBAY);
const EBAY_ESCROW = c(95, "5.3.2", "Traders who are especially concerned about settlement can hire escrow services.", EBAY);

// 5.3.3 Brokered Markets (pp. 95–96)
const BR_SEARCH = c(95, "5.3.3", "Brokers actively search to match buyers and sellers in brokered markets.");
const BR_START = c(95, "5.3.3", "Most searches start when their clients ask them to fill their orders.");
const BR_SUGGEST = c(95, "5.3.3", "Brokers, however, also initiate many searches when they suggest trades to their clients.");
const BR_MARK = c(95, "5.3.3", "The distinguishing characteristic of a brokered market is the broker's role in finding liquidity.");
const BR_NOPUBLIC = c(95, "5.3.3", "In markets where traders usually do not make public offers to trade, brokers must search for traders who will make those offers.");
const BR_ILLIQ = c(95, "5.3.3", "These markets are typically illiquid markets in which dealers will not normally trade.");
const TWO_TYPES = c(95, "5.3.3", "Two types of traders offer liquidity in brokered markets.");
const CONCEALED = c(95, "5.3.3", "Concealed traders know that they want to trade but, for reasons that we discuss in chapters 11 and 15, they will not expose orders to the public.");
const CONC_OFFER = c(95, "5.3.3", "They offer their liquidity when brokers present them with suitable trading opportunities.");
const LATENT = c(95, "5.3.3", "Latent traders do not know that they want to trade until brokers present them with attractive trading opportunities.");
const LAT_AVOID = c(95, "5.3.3", "They thereby avoid the costs of deciding whether they want to trade until they have the opportunity to trade.");
const LAT_COMMON = c(95, "5.3.3", "Latent traders are common when trading decisions are costly and the opportunities to trade on those decisions are rare.");
const GOOD = c(95, "5.3.3", "Good brokers can find concealed traders and latent traders.");
const BR_COMMON = c(96, "5.3.3", "Brokered markets are very common throughout the economy.");
const ARISE = c(96, "5.3.3", "They usually arise when the item traded is unique and when dealers will not hold inventories.");
const BLOCKS = c(96, "5.3.3", "The most important brokered securities markets are those for large blocks of stocks and bonds.");
const SMALL = c(96, "5.3.3", "Although these securities may trade in very liquid markets for small sizes, brokers must find suitable counterparts for most large blocks.");
const REAL = c(96, "5.3.3", "Real estate markets and markets for going business concerns are additional examples of brokered markets.");
const WHY_BR = c(96, "5.3.3", "In all three types of markets, dealers generally will not take positions because the items are too large and trade too infrequently, and order-driven markets are not viable because traders will not issue standing orders.");

// 5.3.4 Hybrid Markets (p. 96)
const HYB = c(96, "5.3.4", "Hybrid markets mix characteristics of quote-driven, order-driven, and brokered markets.");
const NYSE = c(96, "5.3.4", "For example, although the New York Stock Exchange is essentially an order-driven market, it requires its specialist dealers to offer liquidity if no one else will do so.");
const NYSE_Q = c(96, "5.3.4", "The NYSE therefore has elements of a quote-driven market.");
const NASDAQ = c(96, "5.3.4", "Although essentially a quote-driven market, it requires its dealers to display, and in many circumstances to execute, public limit orders.");
const NASDAQ_O = c(96, "5.3.4", "Nasdaq therefore has some elements of an order-driven market.");
const BLOCK_BOTH = c(96, "5.3.4", "Since brokers sometimes arrange large block trades in both of these markets, they also have some characteristics of brokered markets.");

// 5.3.5 Summary and Table 5-1 (p. 96)
const MOST_IMP = c(96, "5.3.5", "The execution system that a market uses to arrange its trades is the most important characteristic of its market structure.");
const TABLE = c(96, "5.3.5", "Table 5-1 summarizes the differences among the primary execution systems.");
const T51 = { table: "Table 5-1" };
const T_DEALER = c(96, "5.3.5", "Dealer markets · Quote-driven · Dealers · Dealers · Clients (or their brokers) choose dealers · OTC markets in currencies, bonds, and stocks", T51);
const T_ORAL = c(96, "5.3.5", "Oral auctions · Order-driven · Dealers and public limit order traders · Traders · Trading rules regulate negotiations · Floor-based stock, futures, and options auctions", T51);
const T_MATCH = c(96, "5.3.5", "Order-matching systems · Order-driven · Traders who issue limit orders · Brokerages or exchanges · Trading rules match orders · Electronic exchanges and automated brokerage systems", T51);
const T_BROKER = c(96, "5.3.5", "Brokered markets · Brokered · Public traders · Brokers · Brokers match traders · Block trading", T51);

// 5.5 Summary and 5.6 Points to remember (p. 110)
const SUM_DIFFER = c(110, "5.5", "Markets differ most in how they arrange trades.");
const SUM_OD = c(110, "5.5", "In order-driven markets, traders or electronic trading systems arrange trades by matching public orders.");
const SUM_BR = c(110, "5.5", "In brokered markets, brokers arrange trades by finding traders who are willing to trade.");
const PT_LIQ = c(110, "5.6", "Dealers supply all liquidity in pure quote-driven markets. Public traders and dealers supply liquidity in order-driven markets. Public traders supply liquidity in brokered markets.");
const PT_RULES = c(110, "5.6", "Order-driven markets arrange trades by applying a set of rules to a set of orders.");
const PT_BR = c(110, "5.6", "Brokers arrange trades by searching for willing traders in brokered markets.");

export const U53B_LESSONS: Lesson[] = [
  // ── 5.3.2 Order-driven markets ──────────────────────────────────────────
  {
    id: "5.3.2-order-driven",
    sec: "5.3.2",
    title: "Order-driven markets",
    pages: "94",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Order-driven market",
        body: "A market where **buyers and sellers trade with each other**, with no dealer in between. **Trading rules** say how trades are arranged.",
        cite: OD_DEF,
      },
      {
        kind: "idea",
        title: "Two sets of rules",
        body: "**Order precedence rules** decide which buyers trade with which sellers. **Trade pricing rules** decide the price.",
        cite: OD_PREC,
      },
      {
        kind: "see",
        title: "Rules match the orders",
        illus: OrderMatch,
        beats: [
          { text: "Buyers and sellers send **orders** to the market. No dealer stands between them. (Our numbers.)", cite: OD_DEF },
          { text: "The market's **trading rules** take over: they say how trades are arranged.", cite: OD_RULES },
          { text: "**Order precedence rules** rank the orders. Here the **highest bid** and the **lowest offer** come first.", cite: OD_PREC },
          { text: "The top buyer and the top seller are **matched**. The rules, not the traders, chose who trades with whom." },
          { text: "A **trade pricing rule** sets the price both pay: **50.10**. Rules applied to orders arranged the whole trade.", cite: PT_RULES },
        ],
      },
      {
        kind: "choice",
        q: "In a pure order-driven market, who is a buyer's counterparty?",
        options: ["A seller the trading rules matched", "Always a dealer", "The exchange itself", "The buyer's own broker"],
        answer: 0,
        why: "Buyers and sellers trade **with each other**, with no dealer in between. The rules pick who meets whom.",
        cite: OD_DEF,
      },
      {
        kind: "fill",
        q: "Their order ___ rules determine which buyers trade with which sellers, and their trade ___ rules determine the trade prices.",
        bank: ["precedence", "pricing", "settlement", "listing", "margin"],
        answer: ["precedence", "pricing"],
        why: "**Precedence** rules answer “who trades with whom?”; **pricing** rules answer “at what price?”.",
        cite: OD_PREC,
      },
      {
        kind: "definition",
        term: "Auction market",
        body: "Most order-driven markets are auctions: the rules formalize how **buyers seek the lowest prices** and **sellers seek the highest**.",
        cite: AUCTION_DEF,
      },
      {
        kind: "definition",
        term: "Price discovery",
        body: "The auction process that **reveals the prices that best match buyers to sellers**.",
        cite: DISCOVERY,
      },
      {
        kind: "truefalse",
        q: "Economists call it **price discovery** because the exchange announces the price before trading starts.",
        answer: false,
        why: "Nobody announces it: the auction **reveals** the prices that best match buyers to sellers.",
        cite: DISCOVERY,
      },
      {
        kind: "idea",
        title: "Offer or take liquidity",
        body: "Traders who **offer liquidity** state the terms on which they will trade. Traders who **take liquidity** accept those terms.",
        cite: OFFER_DEF,
      },
      {
        kind: "classify",
        q: "Offering liquidity or taking it?",
        buckets: ["Offers liquidity", "Takes liquidity"],
        items: [
          { text: "Posts a buy order at 20 and waits", bucket: 0, why: "A standing order states the terms on which she'll trade." },
          { text: "Sells at once to the best standing bid", bucket: 1, why: "He accepts terms someone else offered." },
          { text: "Leaves a sell order in the book", bucket: 0, why: "Others can now buy on his terms." },
          { text: "Buys from the lowest standing offer", bucket: 1, why: "Accepting an offer takes liquidity." },
          { text: "Shouts an offer to sell in the pit", bucket: 0, why: "An offer tells others the terms." },
          { text: "Accepts a bid shouted in the pit", bucket: 1, why: "Accepting someone's terms takes liquidity." },
        ],
        cite: OFFER_DEF,
      },
      {
        kind: "match",
        q: "Match each piece of an order-driven market to its job.",
        pairs: [
          ["Order precedence rules", "Who trades with whom"],
          ["Trade pricing rules", "At what price"],
          ["Offering liquidity", "Stating the terms"],
          ["Taking liquidity", "Accepting the terms"],
        ],
        cite: OD_PREC,
      },
      {
        kind: "recap",
        points: [
          { text: "In **order-driven markets**, buyers and sellers trade with each other, with no dealer in between.", cite: OD_DEF },
          { text: "They arrange trades by **applying a set of rules to a set of orders**: precedence rules, then pricing rules.", cite: PT_RULES },
          { text: "Traders can **offer** liquidity (state terms) or **take** it (accept terms).", cite: OFFER_TAKE },
        ],
      },
    ],
  },

  // ── 5.3.2 Counterparties ────────────────────────────────────────────────
  {
    id: "5.3.2-counterparty",
    sec: "5.3.2",
    title: "You don't choose your counterparty",
    pages: "94–95",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Dealers trade here too",
        body: "Dealers can, and often do, trade in order-driven markets. In a **pure** order-driven market they trade on an **equal basis** with everyone else.",
        cite: DEALERS_CAN,
      },
      {
        kind: "idea",
        title: "The test: who picks the client?",
        body: "In some order-driven markets **dealers supply most of the liquidity**. They are still order-driven: the rules make dealers **trade with anyone who accepts their offers**.",
        cite: STILL_OD,
      },
      {
        kind: "see",
        title: "Choosing versus being matched",
        illus: Counterparty,
        beats: [
          { text: "In a **dealer market**, dealers and customers **choose each other**. This dealer trades with a client she knows.", cite: DEALER_CHOOSE },
          { text: "She **turns away** a trader she doesn't know: dealers trade only with traders they trust.", cite: DEALER_TRUST },
          { text: "In an **order-driven market**, the same dealer posts an **offer** in the book. The rules will pick her counterparty.", cite: CANNOT_CHOOSE },
          { text: "A stranger accepts the offer, and the dealer **must trade**.", cite: ANYONE },
          { text: "They have **no credit relationship**, so the market needs mechanisms that make **every trader creditworthy** (chapter 7).", cite: MECH },
        ],
      },
      {
        kind: "choice",
        q: "Some order-driven markets get most of their liquidity from dealers. Why are they still called order-driven?",
        options: ["The dealers cannot choose their clients", "The dealers pay lower fees", "Public traders must trade with dealers", "The dealers write the trading rules"],
        answer: 0,
        why: "The rules make dealers **trade with anyone who accepts their offers**. Choosing clients is what makes a dealer market.",
        cite: STILL_OD,
      },
      {
        kind: "truefalse",
        q: "In a **pure** order-driven market, dealers get priority over other traders.",
        answer: false,
        why: "In pure order-driven markets dealers trade on an **equal basis** with all other traders.",
        cite: EQUAL,
      },
      {
        kind: "idea",
        title: "Strangers on both sides",
        body: "Precedence rules pick your counterparty, so you often trade with someone you have **no credit relationship** with.",
        cite: NO_CREDIT,
      },
      {
        kind: "idea",
        title: "So the market vouches for everyone",
        body: "To prevent **settlement failures**, order-driven markets use elaborate mechanisms to make sure **every trader is trustworthy and creditworthy**.",
        cite: MECH,
      },
      {
        kind: "choice",
        q: "You buy on an order-driven exchange from a seller you have never heard of. What protects you from a settlement failure?",
        options: [
          "The market's mechanisms that make every trader creditworthy",
          "Your right to refuse that seller",
          "A dealer who checks each trade by phone",
          "Nothing: you must vet the seller yourself",
        ],
        answer: 0,
        why: "You can't choose your counterparty, so the market itself makes sure all its traders are trustworthy and creditworthy.",
        cite: MECH,
      },
      {
        kind: "classify",
        q: "Who picks the counterparty?",
        buckets: ["The traders choose", "The rules pick"],
        items: [
          { text: "A client calls a bond dealer she likes", bucket: 0, why: "In dealer markets, clients choose dealers." },
          { text: "A dealer refuses an unknown caller", bucket: 0, why: "Dealers choose whom they trade with." },
          { text: "A buy order meets the best offer in the book", bucket: 1, why: "Precedence rules decide who meets whom." },
          { text: "A stranger takes a dealer's posted offer", bucket: 1, why: "The dealer must trade with anyone who accepts." },
          { text: "A fund picks the dealer with the best service", bucket: 0, why: "Customers choose dealers for price and service." },
          { text: "The highest bid trades first", bucket: 1, why: "That is an order precedence rule at work." },
        ],
        cite: CANNOT_CHOOSE,
      },
      {
        kind: "fill",
        q: "Dealers can, and often do, trade in order-driven markets. In pure order-driven markets, they trade on an ___ basis with all other traders.",
        bank: ["equal", "preferred", "exclusive", "secret"],
        answer: ["equal"],
        why: "No special treatment: in a pure order-driven market a dealer's order is just another order.",
        cite: EQUAL,
      },
      {
        kind: "recap",
        points: [
          { text: "Where dealers supply most liquidity, a market is still order-driven if **dealers can't choose their clients**.", cite: MOST_LIQ },
          { text: "Order precedence rules pick your counterparty: **you cannot choose with whom you trade**.", cite: CANNOT_CHOOSE },
          { text: "So order-driven markets need mechanisms that make **all traders trustworthy and creditworthy**.", cite: MECH },
        ],
      },
    ],
  },

  // ── 5.3.2 Kinds of auctions ─────────────────────────────────────────────
  {
    id: "5.3.2-auctions",
    sec: "5.3.2",
    title: "Kinds of auctions",
    pages: "94–95",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Single-price auction",
        body: "After a **market call**, every trade is arranged **at the same price**.",
        cite: SINGLE,
      },
      {
        kind: "definition",
        term: "Continuous two-sided auction",
        body: "Buyers and sellers can **try to trade at any time**, at prices that **change through time**.",
        cite: CONT,
      },
      {
        kind: "definition",
        term: "Crossing network",
        body: "A market that matches orders at **prices taken from other markets**.",
        cite: CROSS,
      },
      {
        kind: "see",
        title: "Where the price comes from",
        illus: AuctionKinds,
        beats: [
          { text: "**Single-price auction**: orders gather until the call, then **all trade at one price**. (Our numbers.)", cite: SINGLE },
          { text: "**Continuous two-sided auction**: trades happen one by one, whenever buyer meets seller, at **prices that vary**.", cite: CONT },
          { text: "**Crossing network**: it doesn't discover a price. It **borrows one from another market** and matches orders there.", cite: CROSS },
        ],
      },
      {
        kind: "classify",
        q: "Which kind of order-driven auction is this?",
        buckets: ["Single-price", "Continuous", "Crossing network"],
        items: [
          { text: "Orders gather; at the call all trade at 41.00", bucket: 0, why: "One call, one price for every trade." },
          { text: "A trade at 41.02, a minute later one at 41.05", bucket: 1, why: "Trades arrive one by one at prices that vary." },
          { text: "Orders match at the main market's last price", bucket: 2, why: "The price is taken from another market." },
          { text: "Every trade in the call clears at one price", bucket: 0, why: "That is a single-price auction." },
          { text: "Traders may try to trade whenever it is open", bucket: 1, why: "Continuous auctions let traders try any time." },
          { text: "The match price is copied from an exchange", bucket: 2, why: "Crossing networks import their prices." },
        ],
        cite: CROSS,
      },
      {
        kind: "choice",
        q: "How does a crossing network set the price of its trades?",
        options: ["It takes prices from other markets", "It holds a call at the open", "Its dealers quote them", "The highest bidder sets them"],
        answer: 0,
        why: "Crossing networks match orders **at prices taken from other markets**: they don't discover prices themselves.",
        cite: CROSS,
      },
      {
        kind: "idea",
        title: "Floor or software",
        body: "In **oral auctions**, traders negotiate **face-to-face on a floor**. In **rule-based order-matching systems**, the market applies its rules to the orders traders submit.",
        cite: MATCHING,
      },
      {
        kind: "definition",
        term: "Open-outcry auction",
        aka: ["oral auction"],
        body: "An auction where traders **negotiate face-to-face** on an exchange floor, **crying out** their bids and offers.",
        cite: OUTCRY,
      },
      {
        kind: "see",
        title: "Three ways to apply the rules",
        illus: OralVsMatching,
        beats: [
          { text: "**Oral auction**: traders cry out bids and offers in the pit. The rules decide **who can negotiate and when**.", cite: WHO_NEG },
          { text: "**Electronic order matching**: traders submit orders; the rules, **coded in software**, match them automatically.", cite: CODED },
          { text: "**Manual order matching**: where operations are still manual, **clerks** apply the rules and match the orders.", cite: CLERKS },
        ],
      },
      {
        kind: "truefalse",
        q: "In an oral auction, a computer matches the traders' orders.",
        answer: false,
        why: "In oral auctions traders **negotiate face-to-face** on the floor. Computers match orders in order-matching systems.",
        cite: ORAL,
      },
      {
        kind: "fill",
        q: "These auctions are also known as ___ auctions because the traders cry out their bids and offers.",
        bank: ["open-outcry", "single-price", "sealed-bid", "crossing"],
        answer: ["open-outcry"],
        why: "Oral auctions are called **open-outcry** auctions: traders shout their bids and offers.",
        cite: OUTCRY,
      },
      {
        kind: "idea",
        title: "Rules shape liquidity",
        body: "The rules matter because they **affect liquidity**: some encourage traders to **offer** liquidity, others discourage them. Chapter 6 goes deeper.",
        cite: ENCOURAGE,
      },
      {
        kind: "multi",
        q: "What is true of **rule-based order-matching systems**? (Select all that apply.)",
        options: ["Most match orders electronically", "Their rules are coded in software", "Some still use clerks", "Traders negotiate face-to-face", "A dealer must take part in every trade"],
        answer: [0, 1, 2],
        why: "Most are electronic, with rules in their software; a few manual ones use clerks. Face-to-face negotiation is the oral auction.",
        cite: ELECTRONIC,
      },
      {
        kind: "recap",
        points: [
          { text: "Order-driven auctions: **single-price** (after a call), **continuous two-sided**, or **crossing networks** (borrowed prices).", cite: VARY },
          { text: "**Oral (open-outcry)** auctions negotiate face-to-face; **order-matching systems** apply rules to submitted orders.", cite: ORAL },
          { text: "The rules matter because they **affect market liquidity**.", cite: RULES_LIQ },
        ],
      },
    ],
  },

  // ── 5.3.2 Order-driven markets are everywhere (box: eBay) ───────────────
  {
    id: "5.3.2-common",
    sec: "5.3.2",
    title: "Order-driven markets everywhere",
    pages: "95",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Every auction is order-driven",
        body: "Order-driven markets are **quite common**: every market that runs **electronic auctions** or **open-outcry auctions** is one.",
        cite: ALL_AUCT,
      },
      {
        kind: "idea",
        title: "Who runs them",
        body: "All major **futures exchanges**, most **stock and options exchanges**, and many brokerage and ECN systems, even for **pollution rights**. Governments sell new debt in order-driven **calls**.",
        cite: INCLUDE,
      },
      {
        kind: "multi",
        q: "Which of these are order-driven markets, according to Harris? (Select all that apply.)",
        options: ["All major futures exchanges", "Most stock and options exchanges", "Government sales of new debt", "OTC currency dealer networks", "Markets for real estate"],
        answer: [0, 1, 2],
        why: "Futures exchanges, most stock and options exchanges and government debt calls are order-driven. OTC currency is a dealer market; real estate is brokered.",
        cite: INCLUDE,
      },
      {
        kind: "idea",
        title: "The most prolific market organizer",
        body: "**eBay** has created more markets than anyone: at any moment it runs **pure order-driven auctions** for millions of items.",
        cite: EBAY_PURE,
      },
      {
        kind: "see",
        title: "An eBay auction is a call",
        illus: EbayAuction,
        beats: [
          { text: "Buyers send **limit orders**, their maximum bids, to an auction for one item. (Our numbers.)", cite: EBAY_CALL },
          { text: "The seller also offers **“buy it now”** at $70: any buyer could **take that offer** before the close.", cite: EBAY_BIN },
          { text: "Nobody takes it. The auction **closes**: that is the call, and the **highest bidder wins**.", cite: EBAY_WIN },
          { text: "eBay doesn't **guarantee settlement**, so traders check **ratings** or hire **escrow**.", cite: EBAY_SETTLE },
        ],
      },
      {
        kind: "choice",
        q: "Most eBay auctions are which kind of market?",
        options: ["Call market auctions that take only limit orders", "Continuous dealer markets", "Brokered markets", "Crossing networks"],
        answer: 0,
        why: "Bidders submit limit orders (their maximum bids) and everything is decided when the auction closes: a call.",
        cite: EBAY_CALL,
      },
      {
        kind: "choice",
        q: "A buyer clicks **“buy it now”** on a seller's listing. In market terms, what does the buyer do?",
        options: ["Takes the seller's offer: takes liquidity", "Offers liquidity to the seller", "Calls the auction early for everyone", "Becomes a dealer"],
        answer: 0,
        why: "“Buy it now” lets a buyer **take a seller's offer** before the auction closes.",
        cite: EBAY_BIN,
      },
      {
        kind: "truefalse",
        q: "eBay guarantees settlement between its buyers and sellers.",
        answer: false,
        why: "It doesn't. Traders must be careful sending money to sellers they don't know and trust.",
        cite: EBAY_SETTLE,
      },
      {
        kind: "multi",
        q: "How can eBay traders protect themselves against settlement failures? (Select all that apply.)",
        options: ["Check the other trader's ratings", "Hire an escrow service", "Be careful sending money to strangers", "Ask eBay to guarantee the trade"],
        answer: [0, 1, 2],
        why: "eBay offers a **rating service**, worried traders can hire **escrow**, and everyone should be careful. eBay itself guarantees nothing.",
        cite: EBAY_RATE,
      },
      {
        kind: "fill",
        q: "Governments commonly issue their new debt securities in order-driven market ___.",
        bank: ["calls", "brokers", "dealers", "swaps"],
        answer: ["calls"],
        why: "New government bonds, notes and bills are sold in **call market auctions**.",
        cite: GOV,
      },
      {
        kind: "recap",
        points: [
          { text: "Every **electronic or open-outcry auction** is an order-driven market: futures, most stocks and options, many ECNs.", cite: ALL_AUCT },
          { text: "**eBay** runs call auctions with limit orders only; the highest bidder wins at the close.", cite: EBAY_CALL },
          { text: "eBay doesn't guarantee settlement, so traders use **ratings** and **escrow**.", cite: EBAY_ESCROW },
        ],
      },
    ],
  },

  // ── 5.3.3 Brokered markets ──────────────────────────────────────────────
  {
    id: "5.3.3-brokered",
    sec: "5.3.3",
    title: "Brokered markets",
    pages: "95",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Brokered market",
        body: "A market where **brokers actively search** for buyers and sellers to match. Finding liquidity is the **broker's job**.",
        cite: BR_SEARCH,
      },
      {
        kind: "idea",
        title: "How a search starts",
        body: "Most searches start when a **client asks** the broker to fill an order. Brokers also start many searches by **suggesting trades** to clients.",
        cite: BR_SUGGEST,
      },
      {
        kind: "see",
        title: "The broker searches",
        illus: BrokerSearch,
        beats: [
          { text: "A client asks her broker to sell a **large block**. Nobody has posted an offer to buy it.", cite: BR_START },
          { text: "With no public offers, the broker must **search**: he calls traders who might buy.", cite: BR_NOPUBLIC },
          { text: "Most say no. One is **willing to trade**." },
          { text: "The broker **arranges the trade**. The liquidity came from his search.", cite: PT_BR },
        ],
      },
      {
        kind: "choice",
        q: "What distinguishes a brokered market from the other kinds?",
        options: ["The broker's role in finding liquidity", "Dealers quote every price", "A computer matches public orders", "All trades happen at one call price"],
        answer: 0,
        why: "Its **distinguishing characteristic** is the broker's role in **finding liquidity**.",
        cite: BR_MARK,
      },
      {
        kind: "truefalse",
        q: "Brokers search for a counterparty only when a client asks them to fill an order.",
        answer: false,
        why: "Most searches start that way, but brokers also **initiate** many searches by suggesting trades to their clients.",
        cite: BR_SUGGEST,
      },
      {
        kind: "idea",
        title: "Illiquid by nature",
        body: "Brokered markets are typically **illiquid**: traders don't post public offers, and **dealers won't normally trade** there.",
        cite: BR_ILLIQ,
      },
      {
        kind: "choice",
        q: "Why must brokers search in brokered markets?",
        options: ["Traders usually don't make public offers to trade", "Exchanges forbid limit orders there", "Dealers post too many quotes", "Prices are set at a call"],
        answer: 0,
        why: "With no public offers to see, brokers must find the traders who will make them.",
        cite: BR_NOPUBLIC,
      },
      {
        kind: "classify",
        q: "Who arranges this trade?",
        buckets: ["Dealers", "Trading rules", "Brokers"],
        items: [
          { text: "A bank quotes a currency price to a client", bucket: 0, why: "A dealer trades from its own inventory." },
          { text: "A computer matches a buy order to the best offer", bucket: 1, why: "Order-driven: rules applied to orders." },
          { text: "Someone phones around to find a buyer for 500,000 shares", bucket: 2, why: "A broker searching: a brokered market." },
          { text: "A bond dealer sells from inventory", bucket: 0, why: "Quote-driven: the dealer is the counterparty." },
          { text: "A call auction prices every order at once", bucket: 1, why: "Order-driven: precedence and pricing rules." },
          { text: "An agent finds a buyer for an office building", bucket: 2, why: "Real estate is a brokered market." },
        ],
        cite: SUM_BR,
      },
      {
        kind: "fill",
        q: "Brokers arrange trades by ___ for willing traders in brokered markets.",
        bank: ["searching", "quoting", "bidding", "voting"],
        answer: ["searching"],
        why: "The broker's **search** is what produces liquidity in a brokered market.",
        cite: PT_BR,
      },
      {
        kind: "recap",
        points: [
          { text: "In **brokered markets**, brokers actively search to match buyers and sellers.", cite: BR_SEARCH },
          { text: "The distinguishing mark: the **broker's role in finding liquidity**.", cite: BR_MARK },
          { text: "They are typically **illiquid** markets where dealers won't normally trade.", cite: BR_ILLIQ },
        ],
      },
    ],
  },

  // ── 5.3.3 Concealed and latent traders ──────────────────────────────────
  {
    id: "5.3.3-hidden",
    sec: "5.3.3",
    title: "Concealed and latent traders",
    pages: "95–96",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Concealed traders",
        body: "Traders who **know they want to trade** but **won't expose their orders** to the public. They trade when a broker brings a suitable opportunity.",
        cite: CONCEALED,
      },
      {
        kind: "definition",
        term: "Latent traders",
        body: "Traders who **don't know they want to trade** until a broker shows them an **attractive opportunity**.",
        cite: LATENT,
      },
      {
        kind: "see",
        title: "Liquidity nobody posted",
        illus: HiddenLiquidity,
        beats: [
          { text: "The public book is empty: nobody has posted an order for this block." },
          { text: "A **concealed trader** already wants to sell, but keeps the order **hidden**.", cite: CONCEALED },
          { text: "A **latent trader** hasn't decided anything yet.", cite: LATENT },
          { text: "The broker presents the opportunity to both. The concealed seller **shows** her order; the latent buyer **decides** to buy.", cite: CONC_OFFER },
          { text: "They trade. **Good brokers find both** kinds of traders.", cite: GOOD },
        ],
      },
      {
        kind: "classify",
        q: "Concealed trader or latent trader?",
        buckets: ["Concealed", "Latent"],
        items: [
          { text: "A pension fund wants to sell 2 million shares but won't show the order", bucket: 0, why: "It knows it wants to trade; it just hides it." },
          { text: "An investor hadn't thought of selling until a broker called with a bid", bucket: 1, why: "The opportunity created the decision." },
          { text: "A trader keeps a big buy order off every book", bucket: 0, why: "Wants to trade, won't expose the order." },
          { text: "An owner sells the business only once a buyer shows up", bucket: 1, why: "No decision until the opportunity appears." },
          { text: "A fund has a target size but hides it from the market", bucket: 0, why: "Knows its intention, conceals it." },
          { text: "A collector decides to sell when shown a generous offer", bucket: 1, why: "Latent: decides only when presented." },
        ],
        cite: TWO_TYPES,
      },
      {
        kind: "choice",
        q: "Why do latent traders wait for a broker before deciding to trade?",
        options: ["They avoid the cost of deciding until they can actually trade", "Regulators forbid them to post orders", "They are dealers waiting for quotes", "Brokers pay them to wait"],
        answer: 0,
        why: "Deciding is costly, so they skip it until a real opportunity to trade arrives.",
        cite: LAT_AVOID,
      },
      {
        kind: "truefalse",
        q: "Latent traders are most common when trading decisions are cheap and trading opportunities frequent.",
        answer: false,
        why: "The reverse: they are common when decisions are **costly** and opportunities to act on them are **rare**.",
        cite: LAT_COMMON,
      },
      {
        kind: "idea",
        title: "Where brokered markets arise",
        body: "When the item is **unique** and **dealers won't hold inventory**: **large blocks** of stocks and bonds, **real estate**, **going businesses**.",
        cite: ARISE,
      },
      {
        kind: "idea",
        title: "Why not dealers or a book?",
        body: "The items are **too large** and trade **too rarely** for dealers to take positions, and traders **won't post standing orders**, so an order-driven market can't work.",
        cite: WHY_BR,
      },
      {
        kind: "multi",
        q: "Which are brokered markets, according to Harris? (Select all that apply.)",
        options: ["Large blocks of stocks and bonds", "Real estate", "Going business concerns", "Small trades in liquid stocks", "Major futures exchanges"],
        answer: [0, 1, 2],
        why: "Blocks, real estate and whole businesses are unique, large and rare. Small stock trades and futures trade in liquid markets.",
        cite: REAL,
      },
      {
        kind: "choice",
        q: "A stock trades easily in small sizes. Why might a 3-million-share block of it still need a broker?",
        options: ["Big blocks need a broker to find the other side", "Large blocks are banned from exchanges", "Dealers must buy every block", "Block prices are set at a call"],
        answer: 0,
        why: "Small sizes trade in liquid markets, but most **large blocks** need a broker to find the other side.",
        cite: SMALL,
      },
      {
        kind: "fill",
        q: "Dealers generally will not take positions because the items are too ___ and trade too ___.",
        bank: ["large", "infrequently", "small", "often", "cheaply"],
        answer: ["large", "infrequently"],
        why: "Big, rarely traded items are too risky to hold in inventory.",
        cite: WHY_BR,
      },
      {
        kind: "recap",
        points: [
          { text: "**Concealed traders** want to trade but won't expose orders; **latent traders** decide only when shown an opportunity.", cite: TWO_TYPES },
          { text: "**Good brokers** can find both kinds of traders.", cite: GOOD },
          { text: "Brokered markets arise for **unique items dealers won't inventory**: blocks, real estate, businesses.", cite: BLOCKS },
        ],
      },
    ],
  },

  // ── 5.3.4 Hybrid markets ────────────────────────────────────────────────
  {
    id: "5.3.4-hybrid",
    sec: "5.3.4",
    title: "Hybrid markets",
    pages: "96",
    imp: 2,
    steps: [
      {
        kind: "definition",
        term: "Hybrid market",
        body: "A market that **mixes** features of quote-driven, order-driven and brokered markets.",
        cite: HYB,
      },
      {
        kind: "idea",
        title: "The NYSE, as the book describes it",
        body: "Essentially **order-driven**, but its **specialist dealers** must **offer liquidity if no one else will**: a quote-driven element.",
        cite: NYSE,
      },
      {
        kind: "idea",
        title: "Nasdaq, as the book describes it",
        body: "Essentially **quote-driven**, but its dealers must **display**, and often **execute**, **public limit orders**: an order-driven element.",
        cite: NASDAQ,
      },
      {
        kind: "see",
        title: "Mixing the three systems",
        illus: HybridMix,
        beats: [
          { text: "Three pure execution systems: **quote-driven**, **order-driven** and **brokered**.", cite: HYB },
          { text: "The **NYSE** sits on order-driven, plus a **specialist** who offers liquidity when no one else will.", cite: NYSE_Q },
          { text: "**Nasdaq** sits on quote-driven, plus dealers who must **display public limit orders**.", cite: NASDAQ_O },
          { text: "Brokers sometimes arrange **large blocks** in both, so both have a **brokered** side too.", cite: BLOCK_BOTH },
        ],
      },
      {
        kind: "choice",
        q: "In the book, what gives the NYSE an element of a **quote-driven** market?",
        options: ["Its specialists must offer liquidity if no one else will", "Brokers arrange block trades there", "It displays public limit orders", "Traders meet on a floor"],
        answer: 0,
        why: "Dealers supplying liquidity is the quote-driven element. The NYSE's specialists had to when nobody else would.",
        cite: NYSE,
      },
      {
        kind: "choice",
        q: "What gives Nasdaq an element of an **order-driven** market?",
        options: ["Dealers must display, and often execute, public limit orders", "Specialists must offer liquidity", "Brokers search for block buyers", "Traders shout bids on a floor"],
        answer: 0,
        why: "Public limit orders trading with other traders is the order-driven element.",
        cite: NASDAQ,
      },
      {
        kind: "match",
        q: "Which pure system does each feature borrow from?",
        pairs: [
          ["NYSE specialist offers liquidity", "Quote-driven"],
          ["Nasdaq displays public limit orders", "Order-driven"],
          ["Brokers arrange large blocks", "Brokered"],
        ],
        cite: HYB,
      },
      {
        kind: "truefalse",
        q: "Because brokers arrange some large block trades on both the NYSE and Nasdaq, both have some features of brokered markets.",
        answer: true,
        why: "Block brokering is the brokered element that both markets share.",
        cite: BLOCK_BOTH,
      },
      {
        kind: "today",
        title: "Both markets have changed",
        body: "The NYSE's specialists became **designated market makers** in 2008, and most NYSE trading is now electronic. **Nasdaq** became a registered **stock exchange** in 2006 and runs an electronic limit order book.",
        source: "NYSE New Market Model (2008); SEC approval of Nasdaq's exchange registration (2006)",
      },
      {
        kind: "recap",
        points: [
          { text: "**Hybrid markets** mix quote-driven, order-driven and brokered features.", cite: HYB },
          { text: "The book's NYSE: order-driven, with **specialists** who must offer liquidity if no one else will.", cite: NYSE },
          { text: "The book's Nasdaq: quote-driven, with dealers who must **display public limit orders**.", cite: NASDAQ },
        ],
      },
    ],
  },

  // ── 5.3.5 Summary: Table 5-1 ────────────────────────────────────────────
  {
    id: "5.3.5-summary",
    sec: "5.3.5",
    title: "Four ways to arrange a trade",
    pages: "96",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "The most important characteristic",
        body: "A market's **execution system** is the most important part of its structure. **Table 5-1** compares the four primary ones.",
        cite: MOST_IMP,
      },
      {
        kind: "see",
        title: "Table 5-1, row by row",
        illus: TableBuild,
        beats: [
          { text: "**Dealer markets** (quote-driven): dealers offer liquidity and arrange trades; **clients choose dealers**.", cite: T_DEALER },
          { text: "**Oral auctions** (order-driven): dealers and public limit order traders offer liquidity; **trading rules regulate negotiations**.", cite: T_ORAL },
          { text: "**Order-matching systems** (order-driven): limit order traders offer liquidity; **trading rules match orders**.", cite: T_MATCH },
          { text: "**Brokered markets**: public traders offer liquidity; **brokers match traders**.", cite: T_BROKER },
          { text: "Read down **who offers liquidity**: dealers only, dealers and the public, then the public alone.", cite: PT_LIQ },
        ],
      },
      {
        kind: "match",
        q: "Who offers liquidity in each market type?",
        pairs: [
          ["Dealer markets", "Dealers"],
          ["Oral auctions", "Dealers and public limit orders"],
          ["Order-matching systems", "Traders who issue limit orders"],
          ["Brokered markets", "Public traders"],
        ],
        cite: TABLE,
      },
      {
        kind: "match",
        q: "Who arranges the trades?",
        pairs: [
          ["Dealer markets", "Dealers"],
          ["Oral auctions", "The traders"],
          ["Order-matching systems", "Brokerages or exchanges"],
          ["Brokered markets", "Brokers"],
        ],
        cite: TABLE,
      },
      {
        kind: "choice",
        q: "In a dealer market, how are buyers and sellers matched?",
        options: ["Clients (or their brokers) choose dealers", "Trading rules match orders", "Brokers match traders", "Trading rules regulate negotiations"],
        answer: 0,
        why: "In Table 5-1, dealer markets match by **clients choosing dealers**; the other three answers belong to the other rows.",
        cite: T_DEALER,
      },
      {
        kind: "game",
        id: "execution-table",
        title: "Rebuild Table 5-1",
        brief: "Place each chip in its cell of **Table 5-1**: who offers liquidity, who arranges trades, how buyers and sellers are matched. Then a speed round.",
        game: ExecutionTable,
      },
      {
        kind: "classify",
        q: "Table 5-1's common examples: which market type?",
        buckets: ["Dealer market", "Oral auction", "Order matching", "Brokered"],
        items: [
          { text: "OTC currency market", bucket: 0, why: "Table 5-1: OTC markets in currencies are dealer markets." },
          { text: "OTC bond market", bucket: 0, why: "OTC bonds trade with dealers." },
          { text: "Floor-based futures pit", bucket: 1, why: "Floor-based futures auctions are oral auctions." },
          { text: "Floor-based options auction", bucket: 1, why: "Traders negotiate face-to-face." },
          { text: "Electronic exchange", bucket: 2, why: "Trading rules match orders by computer." },
          { text: "Automated brokerage system", bucket: 2, why: "An order-matching system run by a brokerage." },
          { text: "Block trading", bucket: 3, why: "Brokers find the other side of large blocks." },
        ],
        cite: TABLE,
      },
      {
        kind: "truefalse",
        q: "In oral auctions, both dealers and public limit order traders offer liquidity.",
        answer: true,
        why: "Table 5-1 lists **dealers and public limit order traders** as the liquidity suppliers in oral auctions.",
        cite: T_ORAL,
      },
      {
        kind: "fill",
        q: "Dealers supply all liquidity in pure ___ markets. Public traders supply liquidity in ___ markets.",
        bank: ["quote-driven", "brokered", "order-driven", "crossing", "call"],
        answer: ["quote-driven", "brokered"],
        why: "Dealers only in pure quote-driven markets, public traders and dealers in order-driven ones, public traders in brokered ones.",
        cite: PT_LIQ,
      },
      {
        kind: "recap",
        points: [
          { text: "The **execution system** is the most important characteristic of a market's structure.", cite: MOST_IMP },
          { text: "Liquidity: **dealers** in quote-driven markets, **public traders and dealers** in order-driven, **public traders** in brokered.", cite: PT_LIQ },
          { text: "Markets **differ most in how they arrange trades**: dealers, rules applied to orders, or brokers' searches.", cite: SUM_DIFFER },
        ],
      },
    ],
  },
];

export const U53B_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "What do economists call the auction process that reveals the prices that best match buyers to sellers?",
    options: ["Price discovery", "Price improvement", "Price clustering", "Price priority"],
    answer: 0,
    why: "Auction rules formalize buyers seeking low prices and sellers seeking high ones: that is **price discovery**.",
    cite: DISCOVERY,
  },
  {
    kind: "truefalse",
    q: "In order-driven markets, traders who take liquidity accept the terms that other traders offered.",
    answer: true,
    why: "Offering liquidity states the terms; taking liquidity accepts them.",
    cite: OFFER_DEF,
  },
  {
    kind: "choice",
    q: "Where do traders in an oral auction negotiate their trades?",
    options: ["Face-to-face on an exchange floor", "By telephone with dealers", "Inside a computer's order book", "Through a broker's search"],
    answer: 0,
    why: "Oral (open-outcry) auctions take place face-to-face on an exchange floor.",
    cite: ORAL,
  },
  {
    kind: "choice",
    q: "When are latent traders most common?",
    options: [
      "When trading decisions are costly and opportunities to act on them are rare",
      "When markets are open around the clock",
      "When dealers quote tight spreads",
      "When order books are fully displayed",
    ],
    answer: 0,
    why: "Latent traders skip a costly decision until an opportunity actually appears.",
    cite: LAT_COMMON,
  },
  {
    kind: "truefalse",
    q: "Brokered markets are rare outside the securities industry.",
    answer: false,
    why: "They are **very common throughout the economy**: real estate and whole businesses are brokered too.",
    cite: BR_COMMON,
  },
  {
    kind: "choice",
    q: "Which market organizer has created more markets than any other, according to the book?",
    options: ["eBay", "The New York Stock Exchange", "Nasdaq", "The Chicago Board of Trade"],
    answer: 0,
    why: "At any given moment eBay runs pure order-driven auctions for millions of items.",
    cite: EBAY_MOST,
  },
  {
    kind: "truefalse",
    q: "Most order-driven markets are auction markets.",
    answer: true,
    why: "Their rules formalize how buyers seek the lowest prices and sellers the highest: an auction.",
    cite: AUCTION,
  },
  {
    kind: "choice",
    q: "In order-driven markets, who or what arranges the trades?",
    options: ["Traders or electronic systems, by matching public orders", "Dealers, trading from inventory", "Brokers, by searching for counterparts", "Regulators, by setting prices"],
    answer: 0,
    why: "Order-driven markets arrange trades by matching public orders, on a floor or in a computer.",
    cite: SUM_OD,
  },
];
