// 5.3 EXECUTION SYSTEMS (p. 92) and 5.3.1 Quote-driven Dealer Markets (pp. 92–94), with the boxes
// "Bookies Are Dealers" (p. 93) and "You Can't Tell the Players Without a Scorecard" (p. 94).
// u53b.ts holds 5.3.2–5.3.5; index.ts joins both into unit 5.3.
import type { Cite, Lesson, Question } from "../types.ts";
import { BalancedBook, BarbaraSaul, DealerBrokers, DealerChooses, DealerNetwork, InterdealerBroker, LayOff, Scorecard, ThreeWays } from "./illus/u53a.tsx";
import { BalanceTheBook } from "./games/BalanceTheBook.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
// 5.3
const PROCEDURES = c(92, "5.3", "Every market has procedures for matching buyers to sellers.");
const DEFINE = c(92, "5.3", "These procedures define the execution system of the market.");
const DEFINING = c(92, "5.3", "Since the execution system is the defining characteristic of a market, analysts frequently classify markets by their execution systems.");
const THREE = c(92, "5.3", "The three main types of markets are quote-driven markets, order-driven markets, and brokered markets.");
const HYBRID = c(92, "5.3", "Hybrid markets use some combination of these three systems.");
const MOST_IMPORTANT = c(96, "5.3.5", "The execution system that a market uses to arrange its trades is the most important characteristic of its market structure.");
const SUM_DIFFER = c(110, "5.5", "Markets differ most in how they arrange trades.");
const SUM_QUOTE = c(110, "5.5", "In quote-driven markets, dealers arrange all trades and provide all liquidity.");
const SUM_ORDER = c(110, "5.5", "In order-driven markets, traders or electronic trading systems arrange trades by matching public orders.");
const SUM_BROKER = c(110, "5.5", "In brokered markets, brokers arrange trades by finding traders who are willing to trade.");
const PT_LIQ = c(110, "5.6", "Dealers supply all liquidity in pure quote-driven markets.");
const T51_DEALER = c(96, "5.3.5", "Dealer markets Quote-driven Dealers Dealers Clients (or their brokers) choose dealers OTC markets in currencies, bonds, and stocks", { table: "Table 5-1" });

// 5.3.1, p. 92
const PURE = c(92, "5.3.1", "In pure quote-driven markets, dealers participate in every trade.");
const MUST = c(92, "5.3.1", "Anyone who wants to trade must trade with a dealer.");
const AGENTS = c(92, "5.3.1", "Either traders negotiate with the dealers themselves, or their brokers, acting as their agents, negotiate with the dealers.");
const AMONG = c(92, "5.3.1", "The dealers frequently trade among themselves, but public traders cannot trade with each other.");
const BARBARA = c(92, "5.3.1", "if Barbara wants to buy a security, she must find a dealer who will sell it to her from his or her inventory.");
const SAUL = c(92, "5.3.1", "if Saul wants to sell a security, he must find a dealer who will buy it from him to add to his or her inventory.");
const CANNOT = c(92, "5.3.1", "Although Barbara might be willing to buy the security directly from Saul, in a pure quote-driven market they generally cannot arrange such trades.");
const INDIRECT = c(92, "5.3.1", "Instead, they trade indirectly with each other through the intermediation of one or more dealers.");
const QUOTE_NAME = c(92, "5.3.1", "Such markets are called quote-driven markets because the dealers quote the prices at which they will buy and sell.");
const DEALER_NAME = c(92, "5.3.1", "They are also known as dealer markets because dealers supply all the liquidity.");

// 5.3.1, p. 93
const NOTPURE = c(93, "5.3.1", "In some dealer markets, traders can trade with each other without the direct intervention of a dealer.");
const STILL = c(93, "5.3.1", "they are still known as quote-driven dealer markets because dealers supply most of the liquidity and arrange all the trades.");
const NASDAQ = c(93, "5.3.1", "The Nasdaq Stock Market is an example of a quote-driven market in which dealers often broker trades among public traders.");
const CHOOSE = c(93, "5.3.1", "In most dealer markets, dealers and their customers choose each other when they want to trade.");
const GOOD_PRICES = c(93, "5.3.1", "choose dealers who offer good prices and good service.");
const TRUST = c(93, "5.3.1", "The dealers trade only with traders they believe are trustworthy and creditworthy.");
const GUARANTEE = c(93, "5.3.1", "Traders who do not have credit relationships with dealers trade through brokers who guarantee that they will settle their trades.");
const CLIENTELE = c(93, "5.3.1", "Many dealers specialize in serving clienteles such as small retail traders or large institutional traders.");
const REFUSE = c(93, "5.3.1", "Such dealers may refuse to trade with customers who are not among their preferred clientele.");
const INFORMED = c(93, "5.3.1", "Most dealers also try to avoid trading with customers they believe are well informed about future prices, because they often lose to well-informed traders.");
const IDB = c(93, "5.3.1", "In some dealer markets, interdealer brokers help dealers arrange trades among themselves.");
const RIVALS = c(93, "5.3.1", "Many dealers do not like their rivals to know about their trades.");
const ANON = c(93, "5.3.1", "By allowing dealers to trade with each other anonymously, interdealer brokers protect dealers and their clients from predatory actions by rivals.");
const COMMON = c(93, "5.3.1", "Quote-driven dealer markets are very common.");
const BOND_FX = c(93, "5.3.1", "Almost all bond and currency markets, and many stock markets, are quote-driven markets.");
const PHONE = c(93, "5.3.1", "Most dealer markets are informal networks of dealers who communicate with their clients and among themselves by telephone.");
const STRUCTURED = c(93, "5.3.1", "More structured dealer markets usually have proprietary electronic data systems to facilitate communications with and among dealers.");
const RESPECTIVELY = c(93, "5.3.1", "are examples of quote-driven markets organized, respectively, by a dealer association, an exchange, a broker, and an electronic data vendor.");

// Box "Bookies Are Dealers", p. 93
const BK = (t: string): Cite => c(93, "5.3.1", t, { box: "Bookies Are Dealers" });
const BK_DEALERS = BK("Most sport betting markets are quote-driven dealer markets in which bookies are dealers.");
const BK_BALANCED = BK("The bookies try to maintain a balanced book with equal volumes bet on both sides.");
const BK_PROFIT = BK("They profit from small differences in the payoffs that they offer each side.");
const BK_VIG = BK("The difference between these payoffs is the vigorish or juice. It is essentially a bid/ask spread.");
const BK_TEN = BK("The vigorish for a typical football point spread bet is 1 dollar for a 10-dollar bet.");
const BK_TWENTY = BK("A perfectly balanced book ensures that bookies earn 1 dollar for every 20 dollars bet.");
const BK_RARELY = BK("Interest in a game is rarely balanced, and point spreads and odds change in response to new information about the contest.");
const BK_LAYOFF = BK("Bookies with lopsided books will often lay off some of their risk by placing offsetting bets with other bookies.");
const BK_COSTLY = BK("The bets are costly because they have to pay the vigorish.");
const BK_ONLY_RISK = BK("When bookies have balanced books, their only risk is that their losing clients will not pay up.");
const BK_SCREEN = BK("Dealers minimize their credit risks by carefully screening their clients.");
const BK_LIMIT = BK("They limit the credit that they extend to clients, and they require that their least creditworthy clients post substantial sums to cover their potential losses.");

// Box "You Can't Tell the Players Without a Scorecard", p. 94
const SC = (t: string): Cite => c(94, "5.3.1", t, { box: "You Can't Tell the Players Without a Scorecard" });
const SC_FIRST = SC("Brokers and dealers established the first exchanges as membership organizations.");
const SC_MEMBERS = SC("The members arranged all the trades, either for themselves or for their clients.");
const SC_COMPUTERS = SC("Initially, exchange members or clerks operated these systems. Now many exchanges use computers to arrange trades.");
const SC_BECAME = SC("They essentially became brokerages.");
const SC_PRIVILEGES = SC("They grant their clients trading privileges instead of memberships.");
const SC_ECN = SC("These electronic communications networks (ECNs) look like exchanges and operate like brokers.");
const SC_FOR_PROFIT = SC("Many exchanges are converting from membership organizations to for-profit companies.");
const SC_FLEX = SC("They want the flexibility to compete with for-profit organizations that have streamlined control structures.");
const SC_REG = SC("Most government regulations distinguish between brokers and exchanges.");
const SC_UNCLEAR = SC("The practical differences between these organizations, however, are increasingly unclear, and therefore are often a subject of regulatory debate.");
const SC_INVADED = SC("Although exchanges invaded the brokerage business before brokers invaded the exchange business");

export const U53A_LESSONS: Lesson[] = [
  // ── Lesson 1 ──────────────────────────────────────────────────────────
  {
    id: "5.3-execution",
    sec: "5.3",
    title: "Execution systems",
    pages: "92",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Execution system",
        body: "A market's **procedures for matching buyers to sellers**. Every market has one.",
        cite: DEFINE,
      },
      {
        kind: "idea",
        title: "Three main types, plus mixes",
        body: "By execution system, markets are **quote-driven**, **order-driven** or **brokered**. **Hybrid** markets combine them.",
        cite: THREE,
      },
      {
        kind: "see",
        title: "Who brings buyer and seller together?",
        illus: ThreeWays,
        beats: [
          { text: "A buyer and a seller want to trade the same security. **What** matches them?", cite: PROCEDURES },
          { text: "**Quote-driven**: a **dealer** buys from the seller and sells to the buyer. Dealers arrange the trades and provide the liquidity.", cite: SUM_QUOTE },
          { text: "**Order-driven**: both send orders, and the market's **rules match** them.", cite: SUM_ORDER },
          { text: "**Brokered**: a **broker** searches for a trader who is willing to take the other side.", cite: SUM_BROKER },
          { text: "**Hybrid**: a market that uses **some combination** of the three.", cite: HYBRID },
        ],
      },
      {
        kind: "choice",
        q: "What defines a market's **execution system**?",
        options: ["Its procedures for matching buyers to sellers", "Its trading hours", "Where its traders sit", "What information it publishes"],
        answer: 0,
        why: "Hours, location and information are other parts of market structure. The execution system is **how buyers get matched to sellers**.",
        cite: DEFINE,
      },
      {
        kind: "multi",
        q: "Which are the **three main types** of markets, classified by execution system? (Select all that apply.)",
        options: ["Quote-driven", "Order-driven", "Brokered", "Call", "Continuous", "Transparent"],
        answer: [0, 1, 2],
        why: "Call and continuous describe **trading sessions**; transparent describes **information**. The execution types are quote-driven, order-driven and brokered.",
        cite: THREE,
      },
      {
        kind: "quote",
        lead: "Why analysts start with the execution system:",
        cite: DEFINING,
        mark: ["defining characteristic"],
      },
      {
        kind: "match",
        q: "Match each type of market with who arranges its trades.",
        pairs: [
          ["Quote-driven", "Dealers"],
          ["Order-driven", "Rules matching public orders"],
          ["Brokered", "Brokers finding willing traders"],
          ["Hybrid", "A mix of the three"],
        ],
        cite: SUM_DIFFER,
      },
      {
        kind: "truefalse",
        q: "A market that runs a dealer system **and** an order-matching system side by side is a **hybrid** market.",
        answer: true,
        why: "Hybrid markets use some combination of the quote-driven, order-driven and brokered systems.",
        cite: HYBRID,
      },
      {
        kind: "fill",
        q: "Since the execution system is the ___ characteristic of a market, analysts frequently ___ markets by their execution systems.",
        bank: ["defining", "classify", "least", "regulate", "hidden", "price"],
        answer: ["defining", "classify"],
        why: "The execution system is what makes a market what it is, so it is the natural way to sort markets.",
        cite: DEFINING,
      },
      {
        kind: "recap",
        points: [
          { text: "An **execution system** is a market's procedures for matching buyers to sellers.", cite: DEFINE },
          { text: "The three main types are **quote-driven**, **order-driven** and **brokered**; **hybrids** mix them.", cite: THREE },
          { text: "It is the **most important characteristic** of a market's structure.", cite: MOST_IMPORTANT },
        ],
      },
    ],
  },

  // ── Lesson 2 ──────────────────────────────────────────────────────────
  {
    id: "5.3.1-dealer",
    sec: "5.3.1",
    title: "Quote-driven dealer markets",
    pages: "92–93",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Quote-driven market",
        aka: ["Dealer market"],
        body: "A market where **dealers take part in every trade**: anyone who wants to trade must trade **with a dealer**.",
        cite: PURE,
      },
      {
        kind: "idea",
        title: "Public traders can't meet",
        body: "Dealers trade among themselves, but **public traders cannot trade with each other**. They trade **indirectly**, through one or more dealers.",
        cite: AMONG,
      },
      {
        kind: "see",
        title: "Barbara buys, Saul sells",
        illus: BarbaraSaul,
        beats: [
          { text: "Barbara wants to **buy**, Saul wants to **sell**. Barbara might buy straight from Saul, but in a pure quote-driven market they **can't arrange** that.", cite: CANNOT },
          { text: "Saul sells to a **dealer**, who adds the security to **inventory**. Shares and cash change hands at once. (Our numbers.)", cite: SAUL },
          { text: "Barbara buys from a dealer, who sells it to her **from inventory**.", cite: BARBARA },
          { text: "Two trades, not one: Barbara and Saul traded **indirectly**, through the dealer's **intermediation**.", cite: INDIRECT },
        ],
      },
      {
        kind: "choice",
        q: "In a **pure** quote-driven market, Barbara wants to buy and Saul wants to sell the same security. How do they trade?",
        options: ["Each trades with a dealer", "Barbara buys directly from Saul", "Their orders meet in a public book", "They wait for the market to be called"],
        answer: 0,
        why: "Public traders can't trade with each other there: each trades with a dealer, so they trade **indirectly**.",
        cite: INDIRECT,
      },
      {
        kind: "truefalse",
        q: "In a pure quote-driven market, dealers can't trade with each other.",
        answer: false,
        why: "Dealers **frequently trade among themselves**. It's the **public traders** who can't trade with each other.",
        cite: AMONG,
      },
      {
        kind: "choice",
        q: "Barbara doesn't want to call dealers herself. What else can she do in a quote-driven market?",
        options: ["Have a broker negotiate with the dealers as her agent", "Post her own quote for other customers", "Trade with Saul if a dealer approves", "Nothing: she must call dealers herself"],
        answer: 0,
        why: "Traders negotiate with dealers **themselves**, or their **brokers**, acting as their agents, do it for them.",
        cite: AGENTS,
      },
      {
        kind: "idea",
        title: "Why two names",
        body: "**Quote-driven**, because dealers **quote** the prices at which they'll buy and sell. **Dealer market**, because dealers **supply all the liquidity**.",
        cite: QUOTE_NAME,
      },
      {
        kind: "fill",
        q: "They are also known as ___ markets because dealers supply all the ___.",
        bank: ["dealer", "liquidity", "auction", "information", "orders", "broker"],
        answer: ["dealer", "liquidity"],
        why: "The other name, **quote-driven**, comes from dealers quoting the prices at which they'll trade.",
        cite: DEALER_NAME,
      },
      {
        kind: "idea",
        title: "Not every dealer market is pure",
        body: "In some dealer markets, **public traders can trade with each other** without a dealer stepping in. On **Nasdaq**, dealers often **broker** such trades.",
        cite: NASDAQ,
      },
      {
        kind: "see",
        title: "The dealer as broker",
        illus: DealerBrokers,
        beats: [
          { text: "In some dealer markets, public traders trade **with each other**, without the dealer's **direct intervention**.", cite: NOTPURE },
          { text: "On **Nasdaq**, a dealer often **brokers** the trade: it brings the public buyer and seller together.", cite: NASDAQ },
          { text: "It is still a **quote-driven dealer market**: dealers supply **most of the liquidity** and **arrange all the trades**.", cite: STILL },
        ],
      },
      {
        kind: "choice",
        q: "Why is a market where dealers often broker trades among public traders **still** called quote-driven?",
        options: [
          "Dealers supply most of the liquidity and arrange all the trades",
          "Public traders aren't allowed to post prices",
          "Every share passes through a dealer's inventory",
          "It has no rules for matching orders",
        ],
        answer: 0,
        why: "Even when customers trade with each other, the dealers supply most of the liquidity and **arrange every trade**.",
        cite: STILL,
      },
      {
        kind: "classify",
        q: "Pure quote-driven market, or not pure?",
        buckets: ["Pure", "Not pure"],
        items: [
          { text: "Every trade has a dealer on one side", bucket: 0, why: "In pure quote-driven markets, dealers participate in every trade." },
          { text: "Barbara and Saul each trade with a dealer", bucket: 0, why: "They trade indirectly, through dealers." },
          { text: "Customers can only trade through dealers", bucket: 0, why: "Anyone who wants to trade must trade with a dealer." },
          { text: "A dealer brokers a trade between two customers", bucket: 1, why: "The customers trade with each other; the dealer only arranges it." },
          { text: "Nasdaq, as the book describes it", bucket: 1, why: "Nasdaq dealers often broker trades among public traders." },
          { text: "Two customers trade without a dealer stepping in", bucket: 1, why: "Possible in some dealer markets, but not in a pure one." },
        ],
        cite: NOTPURE,
      },
      {
        kind: "recap",
        points: [
          { text: "In a **pure quote-driven** market, anyone who wants to trade must trade **with a dealer**.", cite: MUST },
          { text: "Public traders trade **indirectly**, through one or more dealers.", cite: INDIRECT },
          { text: "Some dealer markets let customers trade with each other, but dealers still **arrange all the trades**.", cite: STILL },
        ],
      },
    ],
  },

  // ── Lesson 3 ──────────────────────────────────────────────────────────
  {
    id: "5.3.1-choose",
    sec: "5.3.1",
    title: "Dealers and clients choose each other",
    pages: "93",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Both sides choose",
        body: "In most dealer markets, **dealers and customers choose each other**. Customers pick dealers for **price and service**; dealers pick traders they trust to **pay**.",
        cite: CHOOSE,
      },
      {
        kind: "definition",
        term: "Clientele",
        body: "The kind of customer a dealer **specializes in serving**, such as small retail traders or large institutions. Some dealers turn away anyone else.",
        cite: CLIENTELE,
      },
      {
        kind: "see",
        title: "Who gets to trade with Dealer B?",
        illus: DealerChooses,
        beats: [
          { text: "Customers **choose dealers** with good prices and service. Dealer B quotes a narrower spread, so the fund calls B. (Our numbers.)", cite: GOOD_PRICES },
          { text: "Dealers choose too: B trades with the fund because it believes the fund is **trustworthy and creditworthy**.", cite: TRUST },
          { text: "A trader with **no credit relationship** goes through a **broker**, who **guarantees** the trade will settle.", cite: GUARANTEE },
          { text: "B **avoids** a trader it believes is **well informed** about future prices: dealers often lose to such traders.", cite: INFORMED },
        ],
      },
      {
        kind: "choice",
        q: "A trader has **no credit relationship** with any dealer. How can she trade in a dealer market?",
        options: ["Through a broker who guarantees she will settle", "She can't trade at all", "By posting a limit order in the dealer's book", "By trading directly with another customer"],
        answer: 0,
        why: "Brokers stand behind such traders: they **guarantee that the trades will settle**.",
        cite: GUARANTEE,
      },
      {
        kind: "truefalse",
        q: "Most dealers are happy to trade with customers they believe are **well informed** about future prices.",
        answer: false,
        why: "They try to **avoid** them, because dealers often **lose** to well-informed traders.",
        cite: INFORMED,
      },
      {
        kind: "multi",
        q: "Which of these can make a dealer **turn a customer away**? (Select all that apply.)",
        options: [
          "The dealer doesn't trust the customer's credit",
          "The customer isn't in the dealer's clientele",
          "The dealer thinks the customer is well informed",
          "The customer trades through a broker",
        ],
        answer: [0, 1, 2],
        why: "Dealers trade only with traders they find **creditworthy**, may refuse customers outside their **clientele**, and avoid the **well informed**. Trading through a broker is how customers without credit get in.",
        cite: TRUST,
      },
      {
        kind: "choice",
        q: "A dealer serves only **large institutions**. A small retail trader calls for a quote. What may happen?",
        options: ["The dealer may refuse to trade", "The dealer must quote it like anyone else", "The call goes to an interdealer broker", "The exchange assigns another dealer"],
        answer: 0,
        why: "Dealers that specialize in a clientele may refuse customers who are not among their preferred clientele.",
        cite: REFUSE,
      },
      {
        kind: "definition",
        term: "Interdealer broker",
        body: "A broker that helps **dealers trade with each other**, **anonymously**, so rivals don't learn about their trades.",
        cite: IDB,
      },
      {
        kind: "see",
        title: "Trading with a rival, anonymously",
        illus: InterdealerBroker,
        beats: [
          { text: "Dealer A wants to sell. Calling rival B directly would tell B what A is doing, and dealers **don't like rivals to know** their trades.", cite: RIVALS },
          { text: "Both send orders to an **interdealer broker**, which matches them.", cite: IDB },
          { text: "Each gets a fill without learning who was on the other side: anonymity protects dealers and their clients from **predatory** rivals.", cite: ANON },
        ],
      },
      {
        kind: "choice",
        q: "Why do dealers trade with each other **through interdealer brokers**?",
        options: ["To trade with rivals anonymously", "To get better credit terms", "Because rules forbid direct dealer trades", "To reach retail customers"],
        answer: 0,
        why: "Interdealer brokers let dealers trade **without revealing their trades to rivals**.",
        cite: ANON,
      },
      {
        kind: "fill",
        q: "By allowing dealers to trade with each other ___, interdealer brokers protect dealers and their clients from ___ actions by rivals.",
        bank: ["anonymously", "predatory", "publicly", "friendly", "slowly", "legal"],
        answer: ["anonymously", "predatory"],
        why: "A rival who knew a dealer had to sell could trade against it. Anonymity takes that away.",
        cite: ANON,
      },
      {
        kind: "recap",
        points: [
          { text: "In most dealer markets, **dealers and customers choose each other**.", cite: CHOOSE },
          { text: "Traders without credit relationships trade through **brokers who guarantee** settlement.", cite: GUARANTEE },
          { text: "**Interdealer brokers** let dealers trade with each other **anonymously**.", cite: ANON },
        ],
      },
    ],
  },

  // ── Lesson 4 ──────────────────────────────────────────────────────────
  {
    id: "5.3.1-where",
    sec: "5.3.1",
    title: "Where dealer markets are",
    pages: "93",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Bonds and currencies trade with dealers",
        body: "Quote-driven markets are **very common**: almost all **bond** and **currency** markets, and many **stock** markets.",
        cite: BOND_FX,
      },
      {
        kind: "idea",
        title: "Phone networks and private systems",
        body: "Most dealer markets are **informal networks** of dealers talking by **telephone**. More structured ones run on **proprietary electronic data systems**.",
        cite: PHONE,
      },
      {
        kind: "see",
        title: "From telephone network to platform",
        illus: DealerNetwork,
        beats: [
          { text: "Most dealer markets are **informal networks**: dealers call their clients and each other on the **telephone**.", cite: PHONE },
          { text: "More structured dealer markets link dealers through a **proprietary electronic data system**.", cite: STRUCTURED },
          { text: "Four examples, each organized by a different kind of firm: a **dealer association**, an **exchange**, a **broker** and a **data vendor**.", cite: RESPECTIVELY },
        ],
      },
      {
        kind: "match",
        q: "Who organized each quote-driven market, per the book?",
        pairs: [
          ["Nasdaq Stock Market", "A dealer association"],
          ["London Stock Exchange", "An exchange"],
          ["eSpeed (government bonds)", "A broker"],
          ["Reuters 3000 (currencies)", "A data vendor"],
        ],
        cite: RESPECTIVELY,
      },
      {
        kind: "multi",
        q: "Which markets are **almost all** quote-driven, according to Harris? (Select all that apply.)",
        options: ["Bond markets", "Currency markets", "Futures markets", "Real estate markets"],
        answer: [0, 1],
        why: "Almost all bond and currency markets (and many stock markets) are quote-driven. Futures trade in order-driven auctions; real estate is brokered.",
        cite: BOND_FX,
      },
      {
        kind: "truefalse",
        q: "Most dealer markets are formal exchanges with a trading floor.",
        answer: false,
        why: "Most are **informal networks** of dealers who communicate by **telephone**.",
        cite: PHONE,
      },
      {
        kind: "choice",
        q: "A treasurer phones three banks for euro quotes, then trades with the best one. What kind of market is she using?",
        options: ["A quote-driven dealer market", "An order-driven auction", "A call market", "A crossing network"],
        answer: 0,
        why: "She picks among **dealers' quotes**: currency markets are almost all quote-driven, mostly over the telephone.",
        cite: BOND_FX,
      },
      {
        kind: "fill",
        q: "Most dealer markets are ___ networks of dealers who communicate with their clients and among themselves by ___.",
        bank: ["informal", "telephone", "formal", "auction", "mail", "satellite"],
        answer: ["informal", "telephone"],
        why: "Structured dealer markets with electronic systems are the exception.",
        cite: PHONE,
      },
      {
        kind: "today",
        title: "The book's platforms changed hands",
        body: "**Nasdaq** bought **eSpeed** in 2013, and the Reuters trading platforms passed to **Refinitiv** and then **LSEG** (2021). Bonds and currencies are still mostly dealer markets, now often reached through **electronic platforms** where clients ask several dealers for quotes at once.",
        source: "Nasdaq (2013) and LSEG (2021) announcements",
      },
      {
        kind: "recap",
        points: [
          { text: "Almost all **bond and currency** markets, and many stock markets, are **quote-driven**.", cite: BOND_FX },
          { text: "Most dealer markets are **informal telephone networks**.", cite: PHONE },
          { text: "Structured ones use **proprietary electronic data systems**, run by associations, exchanges, brokers or vendors.", cite: STRUCTURED },
        ],
      },
    ],
  },

  // ── Lesson 5 ──────────────────────────────────────────────────────────
  {
    id: "5.3.1-bookies",
    sec: "5.3.1",
    title: "Bookies are dealers",
    pages: "93",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "A sports bookie is a dealer",
        body: "Most sport betting markets are **quote-driven**, with **bookies as the dealers**. A bookie wants a **balanced book**: equal amounts bet on both sides.",
        cite: BK_BALANCED,
      },
      {
        kind: "definition",
        term: "Vigorish",
        aka: ["Juice"],
        body: "The bookie's cut: the **difference between the payoffs** offered to each side. It is essentially a **bid/ask spread**.",
        cite: BK_VIG,
      },
      {
        kind: "see",
        title: "A balanced book",
        illus: BalancedBook,
        beats: [
          { text: "One bettor takes each team. Each bets **$10** plus **$1** of vigorish: risk $11 to win $10.", cite: BK_TEN },
          { text: "Team A wins. The bookie pays A's bettor **$21** (the $11 stake plus $10) and keeps B's $11: **$1** left over.", cite: BK_PROFIT },
          { text: "Had B won, the bookie would keep $1 too. A balanced book earns **$1 for every $20 bet**, whoever wins.", cite: BK_TWENTY },
        ],
      },
      {
        kind: "number",
        q: "A bookie takes one $10 bet on each side of a game. Each bettor risks $11 to win $10. How much does the bookie earn, **whoever wins**?",
        answer: 1,
        prefix: "$",
        why: "He collects the loser's $11 and pays the winner $10 of winnings: **$1**, the vigorish on $20 bet.",
        cite: BK_TWENTY,
      },
      {
        kind: "choice",
        q: "In dealer terms, what is the **vigorish**?",
        options: ["Essentially a bid/ask spread", "A broker's commission", "The bookie's inventory", "A credit limit"],
        answer: 0,
        why: "Like a dealer's spread, it is the small difference between the terms offered to the two sides.",
        cite: BK_VIG,
      },
      {
        kind: "idea",
        title: "Lopsided books get laid off",
        body: "Interest in a game is **rarely balanced**. A bookie with a **lopsided book** lays off risk by placing **offsetting bets with other bookies**.",
        cite: BK_LAYOFF,
      },
      {
        kind: "see",
        title: "Laying off the extra",
        illus: LayOff,
        beats: [
          { text: "$30 is bet on A, only $10 on B. If A wins, the bookie **loses $19**; if B wins, he **makes $23**. (Our numbers.)", cite: BK_RARELY },
          { text: "He **lays off $20 on A** with another bookie. Now he makes **$1** whichever team wins.", cite: BK_LAYOFF },
          { text: "The lay-off isn't free: he paid the other bookie's **vigorish**. A naturally balanced $40 book would have earned $2.", cite: BK_COSTLY },
        ],
      },
      {
        kind: "game",
        id: "balance-the-book",
        title: "Balance the book",
        brief: "You're the bookie. Eight games, eight **lopsided books**. Lay off just enough with another bookie that you earn the **same whichever team wins**. Our numbers: every bet risks $11 to win $10.",
        game: BalanceTheBook,
      },
      {
        kind: "truefalse",
        q: "Laying off risk with another bookie costs nothing.",
        answer: false,
        why: "The offsetting bets are **costly**: the bookie pays the other bookie's **vigorish**.",
        cite: BK_COSTLY,
      },
      {
        kind: "idea",
        title: "What risk is left",
        body: "With a balanced book, the bookie's **only risk** is that losers **don't pay up**: credit risk. Dealers face the same risk with their clients.",
        cite: BK_ONLY_RISK,
      },
      {
        kind: "multi",
        q: "How do dealers **minimize their credit risk**? (Select all that apply.)",
        options: [
          "They screen their clients carefully",
          "They limit the credit they extend",
          "They make their least creditworthy clients post deposits",
          "They trade mostly with well-informed clients",
        ],
        answer: [0, 1, 2],
        why: "Screening, credit limits and deposits all cut credit risk. Well-informed clients are the ones dealers **avoid**.",
        cite: BK_LIMIT,
      },
      {
        kind: "recap",
        points: [
          { text: "Most sport betting markets are **dealer markets**; bookies are the dealers.", cite: BK_DEALERS },
          { text: "The **vigorish** (juice) is essentially a **bid/ask spread**.", cite: BK_VIG },
          { text: "Lopsided books are **laid off** with other bookies, at the cost of their vigorish.", cite: BK_LAYOFF },
        ],
      },
    ],
  },

  // ── Lesson 6 ──────────────────────────────────────────────────────────
  {
    id: "5.3.1-scorecard",
    sec: "5.3.1",
    title: "Exchanges, brokers and ECNs",
    pages: "94",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Exchanges began as members' clubs",
        body: "**Brokers and dealers** founded the first exchanges as **membership organizations**: a common place to do business, with rules to regulate it.",
        cite: SC_FIRST,
      },
      {
        kind: "see",
        title: "Who is the exchange now?",
        illus: Scorecard,
        beats: [
          { text: "At first an exchange was a **place**: its **members arranged all the trades**, for themselves or their clients.", cite: SC_MEMBERS },
          { text: "Exchanges adopted **rule-based order-matching systems**, run by clerks, then computers. They **essentially became brokerages**.", cite: SC_BECAME },
          { text: "Brokerages built **similar matching systems** for low-cost service. They look like exchanges, but grant **trading privileges**, not memberships.", cite: SC_PRIVILEGES },
          { text: "Entrepreneurs started **ECNs**: for-profit companies that **look like exchanges and operate like brokers**.", cite: SC_ECN },
          { text: "Regulations still **distinguish brokers from exchanges**, but the practical differences are **increasingly unclear**.", cite: SC_UNCLEAR },
        ],
      },
      {
        kind: "definition",
        term: "ECN",
        aka: ["Electronic communications network"],
        body: "A **for-profit company** offering a **rule-based order-matching system**. It looks like an exchange and **operates like a broker**.",
        cite: SC_ECN,
      },
      {
        kind: "choice",
        q: "What happened when exchanges adopted **rule-based order-matching systems**, according to Harris?",
        options: ["They essentially became brokerages", "They stopped needing rules", "They became dealer markets", "They lost their regulators"],
        answer: 0,
        why: "Matching buyers to sellers is a broker's job, so the exchanges became more than a place to trade: **essentially brokerages**.",
        cite: SC_BECAME,
      },
      {
        kind: "truefalse",
        q: "Brokerages that run their own order-matching systems give their clients **memberships**.",
        answer: false,
        why: "They grant **trading privileges** instead of memberships.",
        cite: SC_PRIVILEGES,
      },
      {
        kind: "fill",
        q: "These electronic communications networks (ECNs) look like ___ and operate like ___.",
        bank: ["exchanges", "brokers", "dealers", "banks", "bookies", "regulators"],
        answer: ["exchanges", "brokers"],
        why: "ECNs match orders like an exchange but are run as for-profit firms serving clients, like a broker.",
        cite: SC_ECN,
      },
      {
        kind: "order",
        q: "Put these steps in the order the box tells them.",
        items: [
          "Brokers and dealers form membership exchanges",
          "Exchanges adopt rule-based order matching",
          "Brokerages build similar matching systems",
          "Entrepreneurs create for-profit ECNs",
        ],
        why: "Exchanges invaded the brokerage business **before** brokers invaded the exchange business; ECNs came **recently**.",
        cite: SC_INVADED,
      },
      {
        kind: "idea",
        title: "From clubs to companies",
        body: "Many exchanges are converting from **membership organizations** to **for-profit companies**, to compete with streamlined for-profit rivals.",
        cite: SC_FOR_PROFIT,
      },
      {
        kind: "choice",
        q: "Why are many exchanges converting from membership organizations to **for-profit companies**?",
        options: [
          "For the flexibility to compete with streamlined for-profit rivals",
          "Because regulators banned memberships",
          "To stop running order-matching systems",
          "To become dealer markets",
        ],
        answer: 0,
        why: "For-profit rivals such as ECNs have **streamlined control structures**; exchanges want the same flexibility.",
        cite: SC_FLEX,
      },
      {
        kind: "choice",
        q: "Why is the line between **brokers** and **exchanges** a subject of regulatory debate?",
        options: [
          "Both now run rule-based order-matching systems, so they look alike",
          "Brokers no longer handle client orders",
          "Exchanges stopped regulating their members",
          "ECNs are run by governments",
        ],
        answer: 0,
        why: "Regulations treat them differently, but in practice the differences are **increasingly unclear**.",
        cite: SC_UNCLEAR,
      },
      {
        kind: "today",
        title: "The ECNs joined the exchanges",
        body: "**Archipelago** merged with the **NYSE** in 2006 and became **NYSE Arca**; the NYSE itself became a **for-profit public company** in that deal. **Island** and **Instinet**'s ECN became part of **Nasdaq** in 2005. Off-exchange matching today mostly runs on **alternative trading systems (ATSs)**, including **dark pools**.",
        source: "NYSE Group and Nasdaq filings (2005–2006); SEC Regulation ATS",
      },
      {
        kind: "recap",
        points: [
          { text: "The first exchanges were **membership organizations** of brokers and dealers.", cite: SC_FIRST },
          { text: "**ECNs** look like exchanges and operate like brokers.", cite: SC_ECN },
          { text: "The practical differences between brokers and exchanges are **increasingly unclear**.", cite: SC_UNCLEAR },
        ],
      },
    ],
  },
];

export const U53A_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "In Table 5-1, how are buyers and sellers matched in **dealer markets**?",
    options: ["Clients (or their brokers) choose dealers", "Trading rules match orders", "Brokers match traders", "Trading rules regulate negotiations"],
    answer: 0,
    why: "In dealer markets, dealers offer the liquidity and arrange the trades; clients or their brokers **choose the dealers**.",
    cite: T51_DEALER,
  },
  {
    kind: "truefalse",
    q: "In **pure** quote-driven markets, dealers supply **all** the liquidity.",
    answer: true,
    why: "That is why they are also called dealer markets.",
    cite: PT_LIQ,
  },
  {
    kind: "truefalse",
    q: "Quote-driven dealer markets are rare outside the stock market.",
    answer: false,
    why: "They are **very common**: almost all bond and currency markets are quote-driven.",
    cite: COMMON,
  },
  {
    kind: "choice",
    q: "A bookie's book is **perfectly balanced**. What risk is left?",
    options: ["Losing clients may not pay up", "The favorite may win", "The point spread may change", "Other bookies may cut their vigorish"],
    answer: 0,
    why: "A balanced book earns the vigorish whoever wins; only **credit risk** remains.",
    cite: BK_ONLY_RISK,
  },
  {
    kind: "fill",
    q: "Dealers minimize their ___ risks by carefully ___ their clients.",
    bank: ["credit", "screening", "price", "ignoring", "inventory", "paying"],
    answer: ["credit", "screening"],
    why: "They also limit credit and ask the least creditworthy clients for deposits.",
    cite: BK_SCREEN,
  },
  {
    kind: "choice",
    q: "Who operated the first rule-based order-matching systems at exchanges?",
    options: ["Exchange members or clerks", "Computers", "The exchanges' customers", "Government regulators"],
    answer: 0,
    why: "Members or clerks ran them at first; **now** many exchanges use computers.",
    cite: SC_COMPUTERS,
  },
  {
    kind: "truefalse",
    q: "Most government regulations treat brokers and exchanges the same way.",
    answer: false,
    why: "Most regulations **distinguish** between them, even though in practice they look more and more alike.",
    cite: SC_REG,
  },
];
