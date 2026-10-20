// 4.2 SOME IMPORTANT TERMS (pp. 69–71)
import type { Cite, Unit } from "../types.ts";
import { BookBBO, JoeSue, Lifecycle, LiquidThin, NBBOScene, Precedence, QuoteRead } from "./illus/u42.tsx";
import { MakerTaker } from "./games/MakerTaker.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const BIDS_OFFERS = c(69, "4.2", "Traders indicate that they are willing to buy or sell by making bids and offers.");
const INCLUDE = c(69, "4.2", "Bids and offers usually include information about the prices and quantities that traders will accept.");
const NAMES = c(69, "4.2", "Traders call these prices bid and offer prices. They also use the terms bidding price, offering price, asking price, or simply bid and ask.");
const SIZES = c(69, "4.2", "They refer to the quantities as sizes.");
const FIRM = c(69, "4.2", "Prices are firm when traders can demand to trade at those prices. Prices are soft if the traders who offer them can revise them before trading.");
const FIRM_ORDERS = c(69, "4.2", "Orders generally have firm prices.");
const APWR = c(71, "4.3", "Nasdaq dealers are bidding 36.80 for APWR and offering it at 36.85.", { box: "Market Order Example" });
const APWR_SIZE = c(71, "4.3", "These quotes are good for 500 shares on the bid side and 400 shares on the ask side.", { box: "Market Order Example" });
const FIG42 = c(74, "4.4.1", "The market is \"26 bid, offered at 28\" because the best bid is 26 and the best offer is 28.");

const BEST = c(70, "4.2", "The highest bid price in a market is the best bid. The lowest offer price is the best offer (or, equivalently, the best ask).");
const MARKET_BID = c(70, "4.2", "Traders also call them the market bid and the market offer (or market ask) because they are the best prices available in the market.");
const BBO = c(70, "4.2", "A market quotation reports the best bid and best offer in a market. A market quotation is often called the BBO, which is the acronym for Best Bid and Offer.");
const PUBLICIZE = c(70, "4.2", "Many markets continuously publicize their market quotations.");
const NBBO = c(70, "4.2", "The best bid and offer anywhere in the United States is the NBBO—National Best Bid and Offer.");
const SPREAD = c(70, "4.2", "The difference between the best ask and the best bid is the bid/ask spread.");
const INSIDE = c(70, "4.2", "Traders sometimes call it the inside spread because the space between the highest bid price and the lowest ask price is inside the market.");
const TOUCH = c(70, "4.2", "The English often refer to the spread as the touch. In sports betting markets, bettors and bookies call it the vigorish.");
const ANN = c(72, "4.3.2", "The market for AnnTaylor (ANN) at the New York Stock Exchange is 23.35 bid, offered at 23.45.", { box: "Price Improvement Example" });
const GLOBEX = c(78, "4.4.4", "The market is 901.05 bid, offered at 901.20.", { box: "Ex Post Regret Example" });

const OFFERS_LIQ = c(70, "4.2", "An order offers liquidity—or equivalently supplies liquidity—if it gives other traders an opportunity to trade.");
const JOE = c(70, "4.2", "Joe's bid offers liquidity because other traders now have the opportunity to sell IBM for 100 dollars per share.");
const JOE_DAY = c(70, "4.2", "Joe's bid is a day limit order because it is valid only for the day, and because Joe limits the price that he will pay.");
const BOTH = c(70, "4.2", "Both buyers and sellers can offer liquidity. Buyers offer liquidity when their bids give other traders opportunities to sell.");
const DUAL = c(70, "4.2", "The dual use of the word \"offer\" may seem confusing. It may refer to an offer of an item for sale or to an offer of liquidity.");
const DEALERS_SELL = c(70, "4.2", "For example, dealers make money by selling liquidity to their clients.");
const STANDING = c(70, "4.2", "Standing orders are open offers to trade.");
const JOE_STAND = c(70, "4.2", "Joe's order will stand until someone sells to Joe at 100 dollars or less, the order expires at the end of the day, or Joe cancels it.");
const OPEN = c(70, "4.2", "Standing orders are also called open orders.");
const DEMAND = c(70, "4.2", "Traders who want to trade quickly demand liquidity.");
const TAKE = c(70, "4.2", "Traders take liquidity when they accept offers—standing limit orders or quotes—that other traders have made.");
const SUE = c(70, "4.2", "If Sue is willing to sell 100 shares of IBM at 100 dollars, she can initiate a trade by taking Joe's offer.");
const IMMEDIACY = c(70, "4.2", "Traders who demand to trade immediately demand immediacy.");
const LIQUID = c(70, "4.2", "A market is liquid when traders can trade without significant adverse effect on price.");
const MANY_LIMIT = c(70, "4.2", "Markets with many standing limit orders and small bid/ask spreads are usually quite liquid.");

const TRADE_PRICES = c(70, "4.2", "The prices at which orders fill are trade prices.");
const INFERIOR = c(70, "4.2", "Buy orders that trade at high prices and sell orders that trade at low prices trade at inferior prices.");
const AGENCY = c(70, "4.2", "Agency orders are orders that brokers represent as agents for their clients. Proprietary orders are orders that traders represent for their own accounts.");
const PRECEDENCE = c(70, "4.2", "In many organized markets, agency orders have precedence over proprietary orders at the same price.");
const PENDING = c(71, "4.2", "After traders submit their orders to their brokers, but before their brokers agree to accept them, the order is pending.");
const HOLD = c(71, "4.2", "Brokers often hold orders pending confirmation that the account is authorized to trade.");
const SHORT_HOLD = c(71, "4.2", "They also hold short sale orders pending confirmation that securities can be borrowed to settle the trade.");
const WORKING = c(71, "4.2", "After a broker accepts an order, but before it is filled or canceled, the order is working.");

export const U42: Unit = {
  sec: "4.2",
  title: "Some Important Terms",
  pages: "69–71",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.2-bids-offers",
      sec: "4.2",
      title: "Bids, offers and sizes",
      pages: "69",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Bids and offers",
          body: "A **bid** says you are willing to **buy**. An **offer** says you are willing to **sell**. Both usually state a price and a quantity.",
          cite: INCLUDE,
        },
        {
          kind: "definition",
          term: "Bid and offer prices",
          aka: ["bidding price", "offering price", "asking price", "bid and ask"],
          body: "The prices in bids and offers. The offer price is also called the **ask**.",
          cite: NAMES,
        },
        {
          kind: "definition",
          term: "Sizes",
          body: "The **quantities** in bids and offers: how many shares or contracts each side will trade.",
          cite: SIZES,
        },
        {
          kind: "see",
          title: "Reading a quote",
          illus: QuoteRead,
          beats: [
            { text: "A quote has two sides: a **bid** and an **offer**. Here, Nasdaq dealers quote AstroPower (APWR).", cite: APWR },
            { text: "The **bid**, 36.80: the dealers will **buy** at that price. It's where **you can sell**." },
            { text: "The **offer** (or ask), 36.85: the dealers will **sell** at that price. It's where **you can buy**." },
            { text: "The **sizes**: 500 shares bid, 400 offered. Traders write it **500 × 400**.", cite: APWR_SIZE },
          ],
        },
        {
          kind: "choice",
          q: "Dealers quote APWR at 36.80 bid, 36.85 offered. At what price can you **buy** from them?",
          options: ["36.85", "36.80", "36.825", "36.05"],
          answer: 0,
          why: "You buy at the **offer** (ask), 36.85. The bid, 36.80, is where the dealers buy from you.",
          cite: APWR,
        },
        {
          kind: "number",
          q: "The APWR quotes are good for **500** shares on the bid side and **400** on the ask side. How many shares can you **sell** to the dealers at 36.80?",
          answer: 500,
          unit: "shares",
          why: "You sell to the **bid**, and the bid side is good for 500 shares.",
          cite: APWR_SIZE,
        },
        {
          kind: "fill",
          q: "Traders also call the offering price the ___ price, or simply the ___.",
          bank: ["asking", "ask", "bidding", "size", "touch", "firm"],
          answer: ["asking", "ask"],
          why: "Bid and offer prices are also called bidding price, offering price, **asking price**, or simply **bid and ask**.",
          cite: NAMES,
        },
        {
          kind: "definition",
          term: "Firm and soft prices",
          body: "A price is **firm** when you can demand to trade at it, and **soft** when the trader who quoted it can still revise it.",
          cite: FIRM,
        },
        {
          kind: "truefalse",
          q: "Orders generally have **soft** prices that the trader can revise before trading.",
          answer: false,
          why: "Orders generally have **firm** prices: other traders can demand to trade at them.",
          cite: FIRM_ORDERS,
        },
        {
          kind: "choice",
          q: "A market is “26 bid, offered at 28”. What is the **best offer**?",
          options: ["28", "26", "27", "2"],
          answer: 0,
          why: "“Offered at 28”: the lowest price anyone will sell at is 28. The best bid is 26.",
          cite: FIG42,
        },
        {
          kind: "recap",
          points: [
            { text: "**Bids** are willingness to buy, **offers** to sell; their quantities are **sizes**.", cite: BIDS_OFFERS },
            { text: "The offer price is also the **asking price**, or simply the **ask**.", cite: NAMES },
            { text: "**Firm** prices can be demanded; **soft** ones can be revised. Orders are generally firm.", cite: FIRM },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.2-bbo",
      sec: "4.2",
      title: "Best bid, best offer, the spread",
      pages: "70",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Best bid and best offer",
          aka: ["market bid", "market offer", "best ask", "market ask"],
          body: "The **highest bid** and the **lowest offer** in a market: the best prices available there.",
          cite: BEST,
        },
        {
          kind: "see",
          title: "Finding the market in a book",
          illus: BookBBO,
          beats: [
            { text: "A book of standing bids (buyers, left) and offers (sellers, right). The prices are those of the book's Figure 4-2; the sizes are ours." },
            { text: "The **best bid** is the **highest** bid: 26.", cite: BEST },
            { text: "The **best offer** is the **lowest** offer: 28. Traders also call these the market bid and market offer.", cite: MARKET_BID },
            { text: "The gap between them is the **bid/ask spread**: 28 − 26 = 2. That space is **inside the market**.", cite: INSIDE },
            { text: "The market quotation: **26 bid, offered at 28**.", cite: FIG42 },
          ],
        },
        {
          kind: "choice",
          q: "A book holds bids at 24, 25 and 26, and offers at 28, 30 and 32. What is the **best bid**?",
          options: ["26", "24", "28", "25"],
          answer: 0,
          why: "The best bid is the **highest** bid price: 26.",
          cite: BEST,
        },
        {
          kind: "definition",
          term: "Market quotation",
          aka: ["BBO"],
          body: "Reports the **best bid and best offer** in a market. BBO stands for **B**est **B**id and **O**ffer.",
          cite: BBO,
        },
        {
          kind: "definition",
          term: "Bid/ask spread",
          aka: ["inside spread", "the touch", "vigorish"],
          body: "**Best ask minus best bid.** The English call it the touch; in sports betting it's the vigorish.",
          cite: SPREAD,
        },
        {
          kind: "number",
          q: "AnnTaylor (ANN) at the NYSE is **23.35 bid, offered at 23.45**. What is the bid/ask spread, in cents?",
          answer: 10,
          unit: "¢",
          why: "23.45 − 23.35 = 0.10 dollar, or **10 cents**.",
          cite: ANN,
        },
        {
          kind: "match",
          q: "Match each name to what it means.",
          pairs: [
            ["BBO", "Best bid and offer in one market"],
            ["NBBO", "Best bid and offer anywhere in the U.S."],
            ["Inside spread", "Best ask minus best bid"],
            ["The touch", "The English name for the spread"],
            ["Vigorish", "The spread, in sports betting"],
          ],
          cite: TOUCH,
        },
        {
          kind: "see",
          title: "The national best bid and offer",
          illus: NBBOScene,
          beats: [
            { text: "Many markets **publicize their market quotations**. Here are three, with our numbers.", cite: PUBLICIZE },
            { text: "The **highest bid anywhere**: 40.12, at market B." },
            { text: "The **lowest offer anywhere**: 40.19, at market C." },
            { text: "Together they form the **NBBO**: 40.12 bid, offered at 40.19.", cite: NBBO },
          ],
        },
        {
          kind: "choice",
          q: "Market A shows 40.10 bid, 40.20 offered. Market B shows 40.12 bid, 40.22 offered. (Our numbers.) What is the NBBO?",
          options: ["40.12 bid, 40.20 offered", "40.10 bid, 40.22 offered", "40.12 bid, 40.22 offered", "40.10 bid, 40.20 offered"],
          answer: 0,
          why: "Take the **highest bid** anywhere (40.12 at B) and the **lowest offer** anywhere (40.20 at A).",
          cite: NBBO,
        },
        {
          kind: "number",
          q: "S&P 500 futures on GLOBEX are **901.05 bid, offered at 901.20**. What is the spread, in index points?",
          answer: 0.15,
          why: "901.20 − 901.05 = **0.15** index points.",
          cite: GLOBEX,
        },
        {
          kind: "today",
          title: "No trading through the NBBO",
          body: "Since **Regulation NMS** (2005), U.S. trading centers must not trade through better-priced protected quotes shown at other markets. This is the **Order Protection Rule**.",
          source: "SEC Regulation NMS (2005), Rule 611",
        },
        {
          kind: "recap",
          points: [
            { text: "**Best bid** = highest bid; **best offer** (best ask) = lowest offer.", cite: BEST },
            { text: "A market quotation (**BBO**) reports both; the **NBBO** is the best anywhere in the U.S.", cite: NBBO },
            { text: "**Spread** = best ask − best bid (the inside spread, the touch, the vigorish).", cite: SPREAD },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "4.2-liquidity",
      sec: "4.2",
      title: "Offering and taking liquidity",
      pages: "70",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Offering liquidity",
          aka: ["supplying liquidity"],
          body: "An order **offers liquidity** when it gives other traders an **opportunity to trade**.",
          cite: OFFERS_LIQ,
        },
        {
          kind: "see",
          title: "Joe offers, Sue takes",
          illus: JoeSue,
          beats: [
            { text: "Joe will buy **100 IBM at no more than $100**, until trading closes today: a **day limit order**.", cite: JOE_DAY },
            { text: "His bid **stands**: until someone sells to him at 100 or less, it expires at the close, or he cancels it.", cite: JOE_STAND },
            { text: "Sue wants to sell now. She **takes Joe's offer**: the trade happens at 100.", cite: SUE },
            { text: "Joe **offered** liquidity. Sue **took** it.", cite: JOE },
          ],
        },
        {
          kind: "choice",
          q: "Joe bids $100 for 100 IBM until the close. Why does his bid **offer liquidity**?",
          options: ["Other traders can now sell IBM to him at 100", "It moves the price of IBM up", "It trades immediately", "It is larger than other bids"],
          answer: 0,
          why: "Offering liquidity means giving others an **opportunity to trade**: anyone can now sell to Joe at 100.",
          cite: JOE,
        },
        {
          kind: "truefalse",
          q: "Only sellers can offer liquidity.",
          answer: false,
          why: "Both sides can: buyers offer liquidity when their **bids** let others sell, sellers when their **offers** let others buy.",
          cite: BOTH,
        },
        {
          kind: "definition",
          term: "Standing orders",
          aka: ["open orders"],
          body: "**Open offers to trade** that wait in the market. Traders with orders outstanding offer liquidity.",
          cite: STANDING,
        },
        {
          kind: "definition",
          term: "Taking liquidity",
          body: "**Accepting** an offer another trader has made, a **standing limit order or a quote**. Traders who want to trade quickly **demand** liquidity.",
          cite: TAKE,
        },
        {
          kind: "game",
          id: "maker-taker",
          title: "Maker or taker?",
          brief: "Twelve traders act, one at a time. Does each one **offer** liquidity or **take** it? Watch the book: offers add a standing order, takers remove one.",
          game: MakerTaker,
        },
        {
          kind: "quote",
          lead: "Two meanings of the word “offer”:",
          cite: DUAL,
          mark: ["offer of liquidity"],
        },
        {
          kind: "choice",
          q: "According to Harris, how do **dealers** make money?",
          options: ["By selling liquidity to their clients", "By charging listing fees", "By buying liquidity from brokers", "By lending securities"],
          answer: 0,
          why: "Think of liquidity as a service you can buy or sell: dealers **sell** it.",
          cite: DEALERS_SELL,
        },
        {
          kind: "idea",
          title: "What makes a market liquid",
          body: "A market is **liquid** when you can trade **without a significant adverse effect on price**. Many standing limit orders and small spreads usually mean a liquid market.",
          cite: LIQUID,
        },
        {
          kind: "see",
          title: "The same order in two markets",
          illus: LiquidThin,
          beats: [
            { text: "Two books for the same stock (our numbers). Left: **many standing orders** and a 1¢ spread. Right: few orders, a 40¢ spread.", cite: MANY_LIMIT },
            { text: "A trader sells 300 shares at once. In the deep book, the best bid absorbs all of it at 50.00." },
            { text: "In the thin book, the order eats through three bids, down to **49.50**. The price drops." },
            { text: "That's liquidity: trading **without a significant adverse effect on price**.", cite: LIQUID },
          ],
        },
        {
          kind: "fill",
          q: "Traders who want to trade quickly ___ liquidity. Traders who demand to trade immediately demand ___.",
          bank: ["demand", "immediacy", "supply", "volatility", "patience", "commissions"],
          answer: ["demand", "immediacy"],
          why: "Impatient traders **demand** liquidity, and in particular **immediacy**: the chance to trade right now.",
          cite: IMMEDIACY,
        },
        {
          kind: "today",
          title: "Makers and takers",
          body: "Today traders call liquidity offerers **makers** and liquidity takers **takers**. Many exchanges pay a **rebate** to orders that add liquidity and charge a **fee** to orders that remove it.",
          source: "Exchange fee schedules (e.g., Nasdaq, NYSE)",
        },
        {
          kind: "recap",
          points: [
            { text: "An order **offers liquidity** when it gives others a chance to trade; buyers and sellers both can.", cite: OFFERS_LIQ },
            { text: "**Standing (open) orders** offer liquidity; accepting them **takes** it.", cite: TAKE },
            { text: "A market is **liquid** when you can trade without a significant adverse effect on price.", cite: LIQUID },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "4.2-order-status",
      sec: "4.2",
      title: "Trade prices and order status",
      pages: "70–71",
      imp: 2,
      steps: [
        {
          kind: "definition",
          term: "Trade prices",
          body: "The prices at which orders **fill**.",
          cite: TRADE_PRICES,
        },
        {
          kind: "definition",
          term: "Inferior prices",
          body: "A buy that fills at a **high** price, or a sell that fills at a **low** price, trades at an inferior price.",
          cite: INFERIOR,
        },
        {
          kind: "choice",
          q: "Two buyers each fill 100 shares of the same stock at the same moment: one at 50.02, one at 50.05. (Our numbers.) Which trade got the **inferior** price?",
          options: ["The buy at 50.05", "The buy at 50.02", "Neither: buy prices can't be inferior", "Both"],
          answer: 0,
          why: "For a **buy**, a higher trade price is worse. 50.05 is the inferior price.",
          cite: INFERIOR,
        },
        {
          kind: "definition",
          term: "Agency and proprietary orders",
          body: "**Agency orders**: brokers represent them as agents for clients. **Proprietary orders**: traders represent them for their own accounts.",
          cite: AGENCY,
        },
        {
          kind: "see",
          title: "Who fills first at the same price?",
          illus: Precedence,
          beats: [
            { text: "Two bids at **50.00**: a client's order (agency) and the broker's own order (proprietary). (Our numbers.)", cite: AGENCY },
            { text: "A seller arrives with 200 shares." },
            { text: "The **agency order fills first**. In many organized markets, agency orders have precedence at the same price.", cite: PRECEDENCE },
          ],
        },
        {
          kind: "truefalse",
          q: "In many organized markets, a broker's own order at 50.00 fills **before** its client's order at 50.00.",
          answer: false,
          why: "The reverse: **agency orders have precedence** over proprietary orders at the same price.",
          cite: PRECEDENCE,
        },
        {
          kind: "definition",
          term: "Pending order",
          body: "Submitted to the broker, but **not yet accepted**. Brokers hold orders pending checks, such as whether the account may trade.",
          cite: PENDING,
        },
        {
          kind: "definition",
          term: "Working order",
          body: "**Accepted** by the broker, but **not yet filled or canceled**.",
          cite: WORKING,
        },
        {
          kind: "see",
          title: "An order's life",
          illus: Lifecycle,
          beats: [
            { text: "A trader **submits** an order to the broker." },
            { text: "The order is **pending** while the broker checks: is the account authorized? For a short sale, can the shares be borrowed?", cite: HOLD },
            { text: "The broker accepts it: the order is now **working**.", cite: WORKING },
            { text: "It ends **filled** at its trade price, or **canceled**.", cite: TRADE_PRICES },
          ],
        },
        {
          kind: "order",
          q: "Put an order's life in order.",
          items: ["The trader submits the order to a broker", "Pending: the broker checks the account", "Working: the broker has accepted it", "Filled or canceled"],
          why: "Pending comes **before** acceptance; working comes **after** acceptance and before the fill or cancel.",
          cite: WORKING,
        },
        {
          kind: "choice",
          q: "A broker is holding a client's **short sale** order until it confirms the shares can be borrowed. What is the order's status?",
          options: ["Pending", "Working", "Filled", "Canceled"],
          answer: 0,
          why: "The broker hasn't accepted it yet, so the order is **pending**.",
          cite: SHORT_HOLD,
        },
        {
          kind: "classify",
          q: "Pending or working?",
          buckets: ["Pending", "Working"],
          items: [
            { text: "Submitted; the broker is checking the account is authorized to trade", bucket: 0, why: "Not yet accepted: pending." },
            { text: "A short sale waiting for confirmation that shares can be borrowed", bucket: 0, why: "Held before acceptance: pending." },
            { text: "Accepted by the broker, waiting in the market for a seller", bucket: 1, why: "Accepted, not filled: working." },
            { text: "Accepted this morning, still unfilled, not canceled", bucket: 1, why: "Accepted and still open: working." },
          ],
          cite: PENDING,
        },
        {
          kind: "recap",
          points: [
            { text: "**Trade prices** are fill prices; buying high or selling low means **inferior prices**.", cite: INFERIOR },
            { text: "At the same price, **agency** orders often have precedence over **proprietary** orders.", cite: PRECEDENCE },
            { text: "**Pending** = not yet accepted; **working** = accepted, not yet filled or canceled.", cite: WORKING },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "truefalse",
      q: "The best bid is the **lowest** bid price in a market.",
      answer: false,
      why: "The best bid is the **highest** bid: the best price a seller can get.",
      cite: BEST,
    },
    {
      kind: "choice",
      q: "What does **NBBO** stand for?",
      options: ["National Best Bid and Offer", "New Bid Before Open", "Net Bid/Bought Order", "National Broker Book Order"],
      answer: 0,
      why: "The NBBO is the best bid and offer anywhere in the United States.",
      cite: NBBO,
    },
    {
      kind: "choice",
      q: "Which market is usually **quite liquid**?",
      options: ["One with many standing limit orders and small spreads", "One with few orders and wide spreads", "One where every order is a market order", "One that trades once a day"],
      answer: 0,
      why: "Many standing limit orders and small bid/ask spreads usually mean a liquid market.",
      cite: MANY_LIMIT,
    },
    {
      kind: "fill",
      q: "Traders who want to trade quickly ___ liquidity; standing orders are also called ___ orders.",
      bank: ["demand", "open", "supply", "soft", "closed", "agency"],
      answer: ["demand", "open"],
      why: "Impatient traders **demand** liquidity; standing orders are **open** offers to trade.",
      cite: DEMAND,
    },
    {
      kind: "truefalse",
      q: "Standing orders are also called **open orders**.",
      answer: true,
      why: "Standing orders are open offers to trade, so traders also call them open orders.",
      cite: OPEN,
    },
  ],
};
