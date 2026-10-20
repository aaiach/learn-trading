// 4.3 MARKET ORDERS (pp. 71–73)
import type { Cite, Unit } from "../types.ts";
import { AmyRoundTrip, AnnImprove, InFlight, MarketBuyApwr, MarthaWalk } from "./illus/u43.tsx";
import { WalkTheBook } from "./games/WalkTheBook.tsx";

const c = (p: number | string, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
// 4.3 (p. 71)
const MKT_DEF = c(71, "4.3", "A market order is an instruction to trade at the best price currently available in the market.");
const MKT_FAST = c(71, "4.3", "Market orders usually fill quickly, but sometimes at inferior prices.");
const MKT_WHO = c(71, "4.3", "Impatient traders and traders who want to be certain that they will trade use market orders to demand liquidity.");
const MKT_DEPENDS = c(71, "4.3", "The execution of a market order depends on its size and on the liquidity currently available in the market.");
const MKT_SMALL = c(71, "4.3", "Small market orders usually fill immediately with little or no effect on prices.");
const MKT_BEST = c(71, "4.3", "A small market buy order will typically trade at the best (lowest) asking price, and a small market sell order will typically trade at the best (highest) bid price.");
const BOX_MKT = { box: "Market Order Example" };
const APWR_QUOTE = c(71, "4.3", "Nasdaq dealers are bidding 36.80 for APWR and offering it at 36.85.", BOX_MKT);
const APWR_SIZE = c(71, "4.3", "These quotes are good for 500 shares on the bid side and 400 shares on the ask side.", BOX_MKT);
const APWR_FILL = c(71, "4.3", "Bill submits a market order to buy 200 shares of APWR. He buys all 200 shares for 36.85.", BOX_MKT);

// 4.3.1 (p. 71)
const PAY = c(71, "4.3.1", "Market order traders pay the bid/ask spread.");
const AMY_BUY = c(71, "4.3.1", "Her market buy order buys the bond for 102, when the best bid is 100 and the best offer is 102.");
const AMY_SELL = c(71, "4.3.1", "Her market sell order sells the bond for 100, assuming that the best bid did not change.");
const LOSS = c(71, "4.3.1", "The total loss for her two trades is the bid/ask spread.");
const HALF = c(71, "4.3.1", "Since Amy pays the bid/ask spread for two opportunities to trade immediately, her transaction cost per trade (exclusive of commissions) is half of the spread.");
const IMMEDIACY = c(71, "4.3.1", "The spread—actually half of the spread—is the price traders pay for immediacy when using market orders.");
const VALUE = c(71, "4.3.1", "With no further information, our best estimate of value is the average of these two prices, or 101.");
const PAID = c(71, "4.3.1", "Using this estimate of value, we can see that Amy paid 102 for a bond worth 101.");
const HALF_LIQ = c(71, "4.3.1", "The difference of 1—which is half the bid/ask spread—is what she paid for liquidity.");
const SOLD = c(71, "4.3.1", "When she sold it, she also paid half the spread for liquidity because she received only 100 for a bond worth 101.");

// 4.3.2 (pp. 71–72)
const PI_DEF = c(71, "4.3.2", "In markets where traders negotiate prices, market orders may sometimes trade at better prices than the market bid and offer. Such orders receive price improvement.");
const PI_HOW = c(71, "4.3.2", "Price improvement takes place when a trader is willing to step in front of the current best price to offer a better price to the incoming market order.");
const PI_WHEN = c(71, "4.3.2", "This often happens when the spread is wide and the incoming market order is small.");
const PI_COST = c(71, "4.3.2", "Price improvement lowers the cost of liquidity.");
const BOX_PI = { box: "Price Improvement Example" };
const ANN_QUOTE = c(72, "4.3.2", "The market for AnnTaylor (ANN) at the New York Stock Exchange is 23.35 bid, offered at 23.45.", BOX_PI);
const ANN_SPEC = c(72, "4.3.2", "The ANN specialist (a dealer who trades for his own account on the floor of the exchange) may choose to fill the order at 23.38.", BOX_PI);
const ANN_BETTER = c(72, "4.3.2", "If he does, Tom would receive a price 3 cents better than the 23.35 bid price at which his market sell order would otherwise have traded.", BOX_PI);
const ANN_RULES = c(72, "4.3.2", "Exchange regulations, however, prevent him from buying at the same price at which public traders are willing to buy.", BOX_PI);
const ANN_MUST = c(72, "4.3.2", "The specialist therefore must improve the price to buy ANN.", BOX_PI);

// 4.3.3 (p. 72)
const HARD_FIND = c(72, "4.3.3", "Traders willing to take the other side of a very large trade are often hard to find.");
const AFRAID = c(72, "4.3.3", "They may not be interested in the instrument, or they may be afraid to trade with someone who may be well informed about the value of the instrument.");
const BID_UP = c(72, "4.3.3", "Large buyers bid prices up to encourage sellers to sell to them. Large sellers offer prices down to encourage buyers to buy from them.");
const CONCESSIONS = c(72, "4.3.3", "The premiums that large buyers pay, and the discounts that large sellers offer, are price concessions.");
const IMPACT = c(72, "4.3.3", "When traders move prices to fill their orders, they have market impact. (Market impact is also known as price impact.)");
const CONC_IMPACT = c(72, "4.3.3", "The premiums that large buyers pay, and the discounts that large sellers offer, are price concessions. When traders move prices to fill their orders, they have market impact.");
const MOST = c(72, "4.3.3", "Since market impact increases with order size, it generally is the most significant cost of trading large orders.");
const MORE_HALF = c(72, "4.3.3", "Traders who submit large market orders often pay more than half the bid/ask spread for liquidity.");
const DEPENDS = c(72, "4.3.3", "The price impact of a market order depends on the liquidity available in the market.");
const ILLIQ = c(72, "4.3.3", "In small, illiquid markets with few participants, small orders may be difficult to execute without significant price impacts, and large orders may be impossible to execute.");
const LIQ = c(72, "4.3.3", "Conversely, in large, liquid markets with many active traders, traders may routinely execute very large orders involving millions of dollars without much price impact.");
const BOX_MI = { box: "Market Impact Example" };
const M_QUOTE = c(72, "4.3.3", "Traders there are currently bidding 84.20 cents per pound and offering 84.25 cents per pound.", BOX_MI);
const M_FIRST = c(72, "4.3.3", "She gives the order to one broker who immediately buys 20 contracts for 84.25 cents, then another 30 for 84.40 cents, and an additional 150 for 84.70 cents.", BOX_MI);
const M_SECOND = c(72, "4.3.3", "The second broker buys 5 contracts for 84.60 cents, 75 contracts for 84.80, another 45 contracts for 85.00, and the remaining 75 contracts for 85.15.", BOX_MI);
const M_RAISE = c(72, "4.3.3", "To complete her trades, Martha's brokers had to raise the price by 0.90 cents.", BOX_MI);

// 4.3.4 (p. 73)
const EPU_COND = c(73, "4.3.4", "The prices at which market orders trade depend on current market conditions.");
const EPU_DEF = c(73, "4.3.4", "Since market conditions can change quickly, traders who use market orders risk trading at worse prices than they expect. Economists call this risk execution price uncertainty.");
const EPU_CAUSES = c(73, "4.3.4", "Execution price uncertainty is due to quote changes that may occur between the submission of an order and its execution, and to the unpredictable price concessions that may be required to fill large orders.");
const EPU_LIMIT = c(73, "4.3.4", "Traders who are concerned about this risk may prefer to submit limit orders.");

// 4.12–4.13 and Table 4-4 (pp. 86–88)
const SUM_WHEN = c(86, "4.12", "Traders use market orders when they want to trade immediately at the best price the market will bear.");
const SUM_UNCERTAIN = c(86, "4.12", "Traders who use market orders are uncertain about the prices at which they will trade.");
const PTS_IMMEDIACY = c(86, "4.13", "Market order traders demand immediacy.");
const PTS_SPREAD = c(86, "4.13", "The bid/ask spread is the cost of immediacy for small market orders.");
const PTS_LARGE = c(88, "4.13", "Large market orders can have substantial and unpredictable price impacts.");
const T44_MKT = c(87, "4.12", "Market order · Common · Demands immediacy · None · Fast execution · Uncertain price impact", { table: "Table 4-4" });

export const U43: Unit = {
  sec: "4.3",
  title: "Market Orders",
  pages: "71–73",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.3-market-orders",
      sec: "4.3",
      title: "Market orders",
      pages: "71",
      imp: 3,
      steps: [
        { kind: "definition", term: "Market order", body: "An instruction to trade **now**, at the **best price currently available** in the market.", cite: MKT_DEF },
        { kind: "idea", title: "Who uses them", body: "**Impatient** traders, and traders who must be **sure to trade**. Market orders **demand liquidity**.", cite: MKT_WHO },
        {
          kind: "see",
          title: "A small market buy meets the book",
          illus: MarketBuyApwr,
          beats: [
            { text: "APWR on Nasdaq: dealers bid **36.80** for 500 shares and offer **36.85** for 400.", cite: APWR_QUOTE },
            { text: "Bill sends a **market order to buy 200**. It goes straight to the **best offer**." },
            { text: "He buys all 200 at **36.85**, the best (lowest) asking price. 200 shares are still offered there.", cite: APWR_FILL },
            { text: "A small market **sell** (our example) would trade at the best (highest) **bid**, 36.80.", cite: MKT_BEST },
          ],
        },
        {
          kind: "choice",
          q: "APWR is **36.80 bid, 36.85 offered** (500 × 400). Bill sends a market order to buy 200. What does he pay?",
          options: ["36.85", "36.80", "36.825", "36.90"],
          answer: 0,
          why: "A small market buy trades at the **best offer**: 36.85, the lowest asking price.",
          cite: APWR_FILL,
        },
        {
          kind: "number",
          q: "The quote was good for **400** shares at the 36.85 offer. After Bill's market order for 200, how many shares are still offered there?",
          answer: 200,
          unit: "shares",
          why: "400 − 200 = **200**. A small order leaves the price where it was.",
          cite: APWR_SIZE,
        },
        {
          kind: "truefalse",
          q: "A small market **sell** order typically trades at the best bid.",
          answer: true,
          why: "Sellers at market take the **best (highest) bid**; buyers at market take the best (lowest) offer.",
          cite: MKT_BEST,
        },
        { kind: "idea", title: "Fast, but not always cheap", body: "Market orders usually fill **quickly**, but sometimes at **inferior prices**. How they fill depends on their **size** and on the **liquidity** available.", cite: MKT_DEPENDS },
        {
          kind: "classify",
          q: "Small market orders: which price do they trade at?",
          buckets: ["Best offer (ask)", "Best bid"],
          items: [
            { text: "Market buy, 100 shares", bucket: 0, why: "Buyers take the best offer." },
            { text: "Market sell, 50 shares", bucket: 1, why: "Sellers take the best bid." },
            { text: "A short seller covers 100 shares at market", bucket: 0, why: "Covering means buying back, so it takes the offer." },
            { text: "A trader closes a small long position at market", bucket: 1, why: "Closing a long means selling, so it takes the bid." },
            { text: "An impatient buyer wants in right now", bucket: 0, why: "A market buy takes the lowest asking price." },
          ],
          cite: MKT_BEST,
        },
        {
          kind: "fill",
          q: "Impatient traders and traders who want to be ___ that they will trade use market orders to ___ liquidity.",
          bank: ["certain", "demand", "supply", "lucky", "offer"],
          answer: ["certain", "demand"],
          why: "Market orders are for traders who want **certainty of trading**; they **demand** liquidity.",
          cite: MKT_WHO,
        },
        {
          kind: "multi",
          q: "Which statements about market orders are true?",
          options: ["They usually fill quickly", "They sometimes trade at inferior prices", "They guarantee the price you saw on the screen", "Small ones usually fill with little or no effect on prices"],
          answer: [0, 1, 3],
          why: "Fast fills, sometimes at inferior prices; small ones barely move prices. No price is guaranteed.",
          cite: MKT_SMALL,
        },
        {
          kind: "recap",
          points: [
            { text: "A **market order** trades at the best price currently available.", cite: MKT_DEF },
            { text: "It fills **quickly**, but sometimes at **inferior prices**; impatient traders use it to **demand liquidity**.", cite: MKT_FAST },
            { text: "Small market **buys pay the best offer**; small market **sells get the best bid**.", cite: MKT_BEST },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.3.1-spread",
      sec: "4.3.1",
      title: "Market orders pay the spread",
      pages: "71",
      imp: 3,
      steps: [
        { kind: "idea", title: "Market orders pay the spread", body: "A market buy pays the **offer**; a market sell receives the **bid**. Every round trip loses the gap between them.", cite: PAY },
        {
          kind: "see",
          title: "Amy's round trip",
          illus: AmyRoundTrip,
          beats: [
            { text: "A bond is quoted **100 bid, 102 offered**." },
            { text: "Amy's **market buy** pays the offer: **102**.", cite: AMY_BUY },
            { text: "Her **market sell** gets the bid: **100**. The bid hasn't moved.", cite: AMY_SELL },
            { text: "Round trip: she lost **2**, the whole **bid/ask spread**.", cite: LOSS },
            { text: "Value is best estimated at the **midpoint, 101**. Each trade cost her **1**: half the spread.", cite: HALF_LIQ },
          ],
        },
        {
          kind: "number",
          q: "Amy buys a bond at market for 102 and sells it at market for 100. What is her total loss on the round trip?",
          answer: 2,
          why: "102 − 100 = **2**: exactly the bid/ask spread.",
          cite: LOSS,
        },
        {
          kind: "number",
          q: "What is Amy's transaction cost **per trade** (ignoring commissions)?",
          answer: 1,
          why: "She paid the spread (2) for **two** trades, so each cost **half the spread**: 1.",
          cite: HALF,
        },
        { kind: "idea", title: "Half the spread buys immediacy", body: "Each market order pays **half the spread**. That is the **price of immediacy**: trading right now instead of waiting.", cite: IMMEDIACY },
        { kind: "idea", title: "Value sits at the midpoint", body: "With no other information, the best estimate of value is the **average of bid and offer**. Amy paid 102 for a bond worth **101**.", cite: PAID },
        {
          kind: "number",
          q: "A stock is quoted **50.00 bid, 50.10 offered** (our numbers). What is the best estimate of its value?",
          answer: 50.05,
          tol: 0.001,
          prefix: "$",
          illustrative: true,
          why: "The midpoint: (50.00 + 50.10) ÷ 2 = **50.05**.",
          cite: VALUE,
        },
        {
          kind: "number",
          q: "Same quote, 50.00 / 50.10. Measured against that value, how much per share does a small market buy pay for liquidity?",
          answer: 0.05,
          tol: 0.001,
          prefix: "$",
          illustrative: true,
          why: "It pays 50.10 for a stock worth 50.05: **0.05**, half the 0.10 spread.",
          cite: HALF_LIQ,
        },
        {
          kind: "truefalse",
          q: "A trader who sells at market receives the midpoint between the bid and the offer.",
          answer: false,
          why: "A market sell receives the **bid**, half a spread **below** the midpoint. Amy got 100 for a bond worth 101.",
          cite: SOLD,
        },
        {
          kind: "fill",
          q: "The spread, actually ___ of the spread, is the price traders pay for ___ when using market orders.",
          bank: ["half", "immediacy", "twice", "commissions", "information"],
          answer: ["half", "immediacy"],
          why: "Each market order pays **half the spread**: the price of **immediacy**.",
          cite: IMMEDIACY,
        },
        {
          kind: "recap",
          points: [
            { text: "**Market order traders pay the bid/ask spread**: buy at the offer, sell at the bid.", cite: PAY },
            { text: "A round trip loses the spread, so each trade costs **half the spread**.", cite: HALF },
            { text: "Measured from the **midpoint** value, half the spread is what you pay for **liquidity**.", cite: HALF_LIQ },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "4.3.2-price-improvement",
      sec: "4.3.2",
      title: "Price improvement",
      pages: "71–72",
      imp: 2,
      steps: [
        { kind: "definition", term: "Price improvement", body: "A market order trades at a **better price** than the market bid or offer.", cite: PI_DEF },
        { kind: "idea", title: "Someone steps in front", body: "It happens when a trader is willing to **step in front of the best price** and offer the incoming market order a better one.", cite: PI_HOW },
        {
          kind: "see",
          title: "Tom's 300 shares of ANN",
          illus: AnnImprove,
          beats: [
            { text: "ANN at the NYSE: **23.35 bid, 23.45 offered**. 500 shares bid, 1,000 offered.", cite: ANN_QUOTE },
            { text: "Tom sends a **market order to sell 300**. Normally it would trade at the **23.35** bid." },
            { text: "The **specialist**, a dealer on the exchange floor, steps in at **23.38**: Tom gets **3 cents** more per share.", cite: ANN_SPEC },
            { text: "Why not buy at 23.35? Exchange rules stop the specialist buying at the **same price as public bids**, so he must improve.", cite: ANN_RULES },
          ],
        },
        {
          kind: "number",
          q: "Tom's market sell fills at **23.38** instead of the **23.35** bid. How many cents per share better is that?",
          answer: 3,
          unit: "cents",
          why: "23.38 − 23.35 = **0.03**: 3 cents of price improvement.",
          cite: ANN_BETTER,
        },
        {
          kind: "number",
          q: "On all **300** shares, how many dollars more does that price improvement give Tom?",
          answer: 9,
          prefix: "$",
          why: "300 × $0.03 = **$9** (our arithmetic on the book's numbers).",
          cite: ANN_BETTER,
        },
        {
          kind: "choice",
          q: "Why can't the ANN specialist simply buy Tom's shares at the 23.35 bid?",
          options: ["Exchange rules stop him buying at the price public traders are bidding", "The bid is only good for 300 shares", "Specialists may only sell, never buy", "Tom set a limit price of 23.38"],
          answer: 0,
          why: "Public bids at 23.35 come first, so the specialist **must improve the price** to buy.",
          cite: ANN_MUST,
        },
        { kind: "idea", title: "When it happens", body: "Most often when the **spread is wide** and the incoming market order is **small**. It **lowers the cost of liquidity**.", cite: PI_WHEN },
        {
          kind: "classify",
          q: "Is price improvement likely? (Our examples.)",
          buckets: ["Likely", "Unlikely"],
          items: [
            { text: "Spread 10¢, market order for 100 shares", bucket: 0, why: "Wide spread, small order: room to step in front." },
            { text: "Spread 20¢, market order for 200 shares", bucket: 0, why: "Wide spread, small order." },
            { text: "Spread 1¢, market order for 100 shares", bucket: 1, why: "No price fits inside a one-cent spread." },
            { text: "Spread 10¢, market order for 500,000 shares", bucket: 1, why: "Price improvement favours small incoming orders." },
          ],
          cite: PI_WHEN,
        },
        {
          kind: "choice",
          q: "Where can market orders receive price improvement, according to Harris?",
          options: ["In markets where traders negotiate prices", "Only in markets without dealers", "Only at the close", "Only for orders over 10,000 shares"],
          answer: 0,
          why: "Where traders **negotiate** prices, someone may offer the incoming order better than the market bid or offer.",
          cite: PI_DEF,
        },
        {
          kind: "truefalse",
          q: "Price improvement raises the cost of liquidity for the market order trader.",
          answer: false,
          why: "It **lowers** the cost of liquidity: the market order pays less than the full half-spread.",
          cite: PI_COST,
        },
        {
          kind: "recap",
          points: [
            { text: "**Price improvement**: a market order trades better than the market bid or offer.", cite: PI_DEF },
            { text: "Someone steps in front of the best price, most often when the **spread is wide** and the order **small**.", cite: PI_WHEN },
            { text: "ANN: Tom sells at **23.38** instead of 23.35, **3 cents** better.", cite: ANN_BETTER },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "4.3.3-impact",
      sec: "4.3.3",
      title: "Market impact",
      pages: "72",
      imp: 3,
      steps: [
        { kind: "idea", title: "Big orders are hard to fill", body: "Large market orders are **harder to execute**: traders willing to take the other side of a very large trade are **hard to find**.", cite: HARD_FIND },
        { kind: "quote", lead: "Why the other side hides:", cite: AFRAID, mark: ["well informed"] },
        { kind: "definition", term: "Market impact", aka: ["price impact"], body: "**Moving the price** to fill your order. It grows with **order size**.", cite: IMPACT },
        {
          kind: "see",
          title: "Martha's first 200 contracts",
          illus: MarthaWalk,
          beats: [
            { text: "Orange juice futures: **84.20 bid, 84.25 offered** (cents per pound). Martha's broker must buy **200** at market.", cite: M_QUOTE },
            { text: "The order takes all **20** contracts offered at **84.25**." },
            { text: "Still 180 to go: it takes **30** more at **84.40**." },
            { text: "And the last **150** at **84.70**.", cite: M_FIRST },
            { text: "Average **84.61¢**, last fill 0.45¢ above the first offer. The order **moved the price**: that is market impact.", cite: IMPACT },
          ],
        },
        {
          kind: "number",
          q: "Martha's first broker buys 20 contracts at 84.25, 30 at 84.40 and 150 at 84.70. What is the **average** price paid, in cents per pound?",
          answer: 84.61,
          tol: 0.005,
          unit: "¢",
          why: "(20 × 84.25 + 30 × 84.40 + 150 × 84.70) ÷ 200 = 16,922 ÷ 200 = **84.61¢**.",
          cite: M_FIRST,
        },
        { kind: "definition", term: "Price concessions", body: "The **premium** a large buyer pays, or the **discount** a large seller offers, to attract the other side. Martha paid up to 0.45¢ over the first offer.", cite: CONCESSIONS },
        { kind: "idea", title: "The biggest cost of trading big", body: "Impact **increases with order size**, so it is generally the **most significant cost** of trading large orders. Large market orders often pay **more than half the spread**.", cite: MOST },
        {
          kind: "game",
          id: "walk-the-book",
          title: "Walk the book",
          brief: "Size a **market buy**, send it, and watch it eat through the offers. Five rounds, starting with Martha's orange juice futures.",
          game: WalkTheBook,
        },
        {
          kind: "number",
          q: "Martha's second broker buys 5 at 84.60, 75 at 84.80, 45 at 85.00 and 75 at 85.15. What is the **average** price, in cents per pound?",
          answer: 84.97,
          tol: 0.006,
          unit: "¢",
          why: "(5 × 84.60 + 75 × 84.80 + 45 × 85.00 + 75 × 85.15) ÷ 200 = 16,994.25 ÷ 200 ≈ **84.97¢**.",
          cite: M_SECOND,
        },
        {
          kind: "number",
          q: "Across both of Martha's orders, the price went from the 84.25 offer to a last fill of 85.15. By how many cents did her brokers raise the price?",
          answer: 0.9,
          tol: 0.001,
          unit: "¢",
          why: "85.15 − 84.25 = **0.90 cents** per pound.",
          cite: M_RAISE,
        },
        {
          kind: "classify",
          q: "Large or little price impact?",
          buckets: ["Large impact", "Little impact"],
          items: [
            { text: "A large order in a small, illiquid market", bucket: 0, why: "Large orders may be impossible to execute there." },
            { text: "A small order in a thin market with few participants", bucket: 0, why: "Even small orders can have significant impact in illiquid markets." },
            { text: "A very large order in a big market with many active traders", bucket: 1, why: "Liquid markets absorb large orders without much impact." },
            { text: "A 100-share order in a very active stock", bucket: 1, why: "Small order, liquid market." },
          ],
          cite: ILLIQ,
        },
        {
          kind: "truefalse",
          q: "Traders who submit large market orders often pay **more than half** the bid/ask spread for liquidity.",
          answer: true,
          why: "Walking the book adds **price concessions** on top of the half-spread.",
          cite: MORE_HALF,
        },
        {
          kind: "fill",
          q: "The premiums that large buyers pay, and the discounts that large sellers offer, are price ___. When traders move prices to fill their orders, they have market ___.",
          bank: ["concessions", "impact", "rebates", "spreads", "efficiency"],
          answer: ["concessions", "impact"],
          why: "Premiums and discounts are **price concessions**; moving the price is **market impact**.",
          cite: CONC_IMPACT,
        },
        {
          kind: "recap",
          points: [
            { text: "Large buyers bid prices up and large sellers offer them down: **price concessions**.", cite: BID_UP },
            { text: "**Market impact** grows with size: generally the **most significant cost** of large orders.", cite: MOST },
            { text: "Impact depends on **liquidity**: Martha's brokers raised the price **0.90 cents**.", cite: M_RAISE },
          ],
        },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "4.3.4-uncertainty",
      sec: "4.3.4",
      title: "Execution price uncertainty",
      pages: "73",
      imp: 3,
      steps: [
        { kind: "idea", title: "The price depends on the moment", body: "Market orders trade at whatever the market offers **when they arrive**, and conditions can change quickly.", cite: EPU_COND },
        { kind: "definition", term: "Execution price uncertainty", body: "The risk that a market order trades at a **worse price than you expect**.", cite: EPU_DEF },
        {
          kind: "see",
          title: "An order in flight",
          illus: InFlight,
          beats: [
            { text: "You see **50.00 bid, 50.05 offered** and send a market order to buy 300. You expect to pay 50.05." },
            { text: "Before it arrives, another buyer takes the 50.05 offer. The **quote changes**: the best offer is now 50.08." },
            { text: "Your order fills at **50.08**: 3 cents worse than you expected.", cite: EPU_DEF },
            { text: "A bigger order would also need **price concessions**: the next shares cost 50.12.", cite: EPU_CAUSES },
          ],
        },
        {
          kind: "multi",
          q: "What causes execution price uncertainty?",
          options: ["Quote changes between submitting the order and its execution", "Unpredictable price concessions needed to fill large orders", "The broker's commission schedule", "The settlement date"],
          answer: [0, 1],
          why: "Harris names two causes: **quote changes** before execution and unpredictable **price concessions** for large orders.",
          cite: EPU_CAUSES,
        },
        {
          kind: "truefalse",
          q: "Execution price uncertainty only affects large orders.",
          answer: false,
          why: "The quote can change before **any** market order executes. Concessions add to it for large orders.",
          cite: EPU_CAUSES,
        },
        { kind: "idea", title: "The remedy: a limit", body: "Traders worried about this risk may prefer **limit orders**: you'll meet them in the next unit.", cite: EPU_LIMIT },
        {
          kind: "choice",
          q: "A trader wants to buy but refuses to pay more than 50.10. Which order fits, according to Harris?",
          options: ["A limit order", "A market order", "Two market orders", "A market order sent later"],
          answer: 0,
          why: "Traders concerned about execution price uncertainty may prefer to submit **limit orders**.",
          cite: EPU_LIMIT,
        },
        { kind: "quote", lead: "Harris's summary table, market order row:", cite: T44_MKT },
        {
          kind: "match",
          q: "Match each idea to what it means.",
          pairs: [
            ["Immediacy", "Trading right now"],
            ["Price concession", "Premium or discount to attract the other side"],
            ["Price improvement", "A fill better than the best bid or offer"],
            ["Market impact", "Moving the price to fill your order"],
            ["Execution price uncertainty", "Not knowing your fill price in advance"],
          ],
          cite: SUM_UNCERTAIN,
        },
        {
          kind: "classify",
          q: "Market orders: advantage or disadvantage?",
          buckets: ["Advantage", "Disadvantage"],
          items: [
            { text: "Fast execution", bucket: 0, why: "Table 4-4 lists fast execution as the advantage." },
            { text: "Uncertain price impact", bucket: 1, why: "Table 4-4 lists uncertain price impact as the disadvantage." },
            { text: "Trade immediately at the best price the market will bear", bucket: 0, why: "That is why traders use them." },
            { text: "Pays the bid/ask spread", bucket: 1, why: "The spread is the cost of immediacy." },
          ],
          cite: T44_MKT,
        },
        {
          kind: "recap",
          points: [
            { text: "**Execution price uncertainty**: market orders may trade at worse prices than expected.", cite: EPU_DEF },
            { text: "Causes: **quote changes** before execution and unpredictable **price concessions** for large orders.", cite: EPU_CAUSES },
            { text: "Large market orders can have substantial and unpredictable impacts; worried traders use **limit orders**.", cite: PTS_LARGE },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "truefalse",
      q: "Market order traders demand immediacy.",
      answer: true,
      why: "They want to trade **right now**: that is demanding immediacy.",
      cite: PTS_IMMEDIACY,
    },
    {
      kind: "choice",
      q: "According to Harris's points to remember, what is the cost of immediacy for **small** market orders?",
      options: ["The bid/ask spread", "The commission", "The market impact", "The settlement fee"],
      answer: 0,
      why: "For small market orders, the **bid/ask spread** is the cost of immediacy.",
      cite: PTS_SPREAD,
    },
    {
      kind: "choice",
      q: "In Table 4-4, which order type lists **fast execution** as its advantage and **uncertain price impact** as its disadvantage?",
      options: ["Market order", "Standing limit order", "Tick-sensitive order", "Market-not-held order"],
      answer: 0,
      why: "That is the **market order** row of Table 4-4.",
      cite: T44_MKT,
    },
    {
      kind: "number",
      q: "A stock is quoted 20.00 bid, 20.04 offered (our numbers). You buy 100 shares at market and sell them straight back at market, quote unchanged. Total loss in dollars?",
      answer: 4,
      prefix: "$",
      illustrative: true,
      why: "You lose the spread on each share: 100 × $0.04 = **$4**.",
      cite: LOSS,
    },
    {
      kind: "choice",
      q: "When do traders use market orders, according to Harris's summary?",
      options: ["When they want to trade immediately at the best price the market will bear", "When they want to set the price they will accept", "When they will not be watching the market", "When they want to trade only at the close"],
      answer: 0,
      why: "Market orders are for trading **immediately** at the best price available.",
      cite: SUM_WHEN,
    },
    {
      kind: "choice",
      q: "What does the price impact of a market order depend on?",
      options: ["The liquidity available in the market", "The time of day the order was written", "Whether the trader is a broker", "The settlement date"],
      answer: 0,
      why: "Impact depends on **liquidity**: deep markets absorb orders that would swamp thin ones.",
      cite: DEPENDS,
    },
    {
      kind: "truefalse",
      q: "In large, liquid markets, traders may routinely execute very large orders without much price impact.",
      answer: true,
      why: "Price impact depends on the liquidity available: deep markets absorb big orders.",
      cite: LIQ,
    },
  ],
};
