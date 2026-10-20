// 4.4 LIMIT ORDERS, part B: 4.4.2 to 4.4.5 (pp. 75–78)
import type { Cite, Lesson, Question } from "../types.ts";
import { AaaaPaths, AndyLoss, ContractVsOrder, ExercisedOption, FarClose, JillChase, SandyWatch, ValueLadder, VolSpread } from "./illus/u44b.tsx";
import { BeatTheBell } from "./games/BeatTheBell.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 4.4.2 (p. 75) ─────────────────────────────────────────────────
const OFFER = c(75, "4.4.2", "Traders who submit standing limit orders offer liquidity to other traders. Their limit orders give others the ability to trade when they want to trade.");
const OPTIONS = c(75, "4.4.2", "Since traders can choose whether they want to trade with a standing limit order, standing limit orders are options to trade.");
const CALL = c(75, "4.4.2", "In particular, sell limit orders are call options that give other traders opportunities to buy when they want to buy.");
const PUT = c(75, "4.4.2", "Buy limit orders likewise are put options that give other traders opportunities to sell when they want to sell. The option strike prices are the limit prices.");
const IMPORTANT = c(75, "4.4.2", "Since this concept is very important, we need to understand the option characteristics of limit orders thoroughly.");
const NOT_CONTRACT = c(75, "4.4.2", "Standing limit orders are options, but not option contracts.");
const PREMIUM = c(75, "4.4.2", "The buyer of the contract pays a premium to the writer regardless of whether the buyer ultimately exercises the option.");
const FREE = c(75, "4.4.2", "In contrast, traders who write standing limit orders do not sell them to other traders. Instead, they freely grant their options to the market.");
const OWN = c(75, "4.4.2", "Unlike with option contracts, traders do not own the trading options that limit orders represent.");
const EXERCISE = c(75, "4.4.2", "Any trader who wants to exercise a limit order option may do so by submitting a market order or a marketable limit order.");
const VALUE = c(75, "4.4.2", "The option value of a limit order is the value of the order to other traders. Limit order option values depend on the limit price, how long the orders will stand, and price volatility.");
const MOST = c(75, "4.4.2", "The most important variable is the limit price.");
const FAR = c(75, "4.4.2", "If the limit price is far behind the market, the option to trade has little value because traders prefer to trade first with orders that offer better prices.");
const AT = c(75, "4.4.2", "Conversely, if the limit price is at the market, traders who want to trade immediately will value the option to trade.");
const GOOD = c(75, "4.4.2", "If the order offers an exceptionally good price, traders will jump to take its price, and the order will fill quickly.");
const WAIT = c(75, "4.4.2", "When presented with such options, traders like to wait and see what happens before committing to trade.");
const TIME = c(75, "4.4.2", "Because values change more in long intervals than in short intervals, limit order trading options are more valuable when traders expect that they will remain available for a long time rather than for a short time.");
const DISAPPEAR = c(75, "4.4.2", "Valuable limit orders often disappear quickly because other traders take them, or because the traders who write them cancel them.");

// ── 4.4.2 (p. 76) ───────────────────────────────────────────────────────────
const VOL_DEF = c(76, "4.4.2", "Price volatility, which refers to how fast prices change, also affects limit order option values.");
const VOL = c(76, "4.4.2", "Limit order options are valuable in volatile markets because volatility increases the probability of executing a profitable trade with a limit order.");
const FAR_VOL = c(76, "4.4.2", "Since traders do not like to give away option values, they often place their limit orders far from the market when the market is volatile in order to reduce their option values.");
const WIDE = c(76, "4.4.2", "Bid/ask spreads consequently tend to be wide in volatile markets.");

// ── Box "Option Contracts Are Sold Limit Orders" (p. 76) ────────────────────
const BX = { box: "Option Contracts Are Sold Limit Orders" };
const SOLD = c(76, "4.4.2", "Traders who are willing to honor their limit orders until some future date can sell their orders to other traders by writing option contracts.", BX);
const PAY = c(76, "4.4.2", "The traders to whom they sell their orders pay them for the liquidity that they offer.", BX);
const CANCEL = c(76, "4.4.2", "To sell limit orders, traders must give up their right to cancel them at any time. No one would buy an order that the seller could cancel at any time.", BX);
const WRITE = c(76, "4.4.2", "Traders sell limit orders when they write option contracts.", BX);
const EXCLUSIVE = c(76, "4.4.2", "Traders are willing to buy option contracts because the exclusive right to exercise a limit order at any time before its expiration date can be quite valuable.", BX);
const AAAA = c(76, "4.4.2", "Rather than submit a limit order to sell at 100, you should consider selling (writing) a call option with a strike price of 100.", BX);
const AAAA_UP = c(76, "4.4.2", "If you submit the limit order, you will receive only 100. If you sell the option, you will receive 100 dollars plus the option premium.", BX);
const AAAA_FALL = c(76, "4.4.2", "The buyer certainly would not have executed the option after the stock fell below 100.", BX);
const AAAA_KEEP = c(76, "4.4.2", "If the buyer does not exercise the option, you will still own the stock, plus, of course, the option premium.", BX);

// ── 4.4.3 (pp. 76–77) ───────────────────────────────────────────────────────
const COMP = c(76, "4.4.3", "The compensation that limit order traders hope to receive for giving away free trading options is a better price.");
const HOPE_BID = c(76, "4.4.3", "Buyers who submit standing limit orders hope to buy at the bid. If they had submitted market orders instead, they would pay the higher asking price.");
const HOPE_ASK = c(76, "4.4.3", "Sellers likewise hope to receive the ask instead of the lower bid.");
const ONLY = c(76, "4.4.3", "Limit order traders receive better prices only if their orders trade.");
const CHASE = c(77, "4.4.3", "If they still want to trade, they will have to chase the price by raising their bid or lowering their offer.");
const WORSE = c(77, "4.4.3", "Thus, the trade prices that they ultimately obtain may be worse than the prices they would have obtained had they used market orders.");
const AVG = c(77, "4.4.3", "In chapter 14, we show that spreads adjust so that traders expect to obtain better average prices by using limit order strategies than by using market order strategies.");
const NO_COMP = c(77, "4.4.3", "If there were no compensation for offering liquidity, traders would not offer it.");

// ── Box "Chasing the Price with a Limit Order" (p. 77) ──────────────────────
const BJ = { box: "Chasing the Price with a Limit Order" };
const JILL_MKT = c(77, "4.4.3", "The market for GM at the New York Stock Exchange is currently 48.05 bid, offered at 48.11.", BJ);
const JILL_BID = c(77, "4.4.3", "Jill submits a limit order to buy 500 shares of GM for no more than 48.05 dollars per share.", BJ);
const JILL_CHASE = c(77, "4.4.3", "After the market moves to 48.15 bid, 48.20 asked, Jill cancels her limit order and replaces it with a market order that immediately trades for 48.20 dollars per share.", BJ);
const JILL_6 = c(77, "4.4.3", "Had her original limit order traded at 48.05, Jill would have paid 6 cents less than she would have if she had initially submitted a market order.", BJ);
const JILL_9 = c(77, "4.4.3", "As it happened, she ended up paying 9 cents more.", BJ);

// ── 4.4.4 (p. 77) ───────────────────────────────────────────────────────────
const TWO = c(77, "4.4.4", "Traders face two risks when using standing limit orders. The first is execution uncertainty.");
const EXEC = c(77, "4.4.4", "When prices move away from their orders, limit order traders fail to trade and wish that they had.");
const AGGR = c(77, "4.4.4", "Limit order traders can minimize execution uncertainty by aggressively pricing their limit orders to increase the probability that they will trade.");
const SURE = c(77, "4.4.4", "Traders who want to be very sure that they trade should submit market orders.");
const COST = c(77, "4.4.4", "These strategies reduce execution uncertainty, but they increase the cost of trading.");
const SECOND = c(77, "4.4.4", "The second risk that traders face when using standing limit orders is that they may trade and subsequently regret it.");
const REGRET = c(77, "4.4.4", "Their orders fill, and then the market moves against their newly established positions so that they lose money. Economists call this risk ex post regret.");
const ALL = c(77, "4.4.4", "All traders face ex post regret regardless of how and why they trade.");
const DEALERS = c(77, "4.4.4", "Dealers do not like to trade with traders who know more about future values than they do.");
const ADVERSE = c(77, "4.4.4", "Economists call this risk adverse selection risk. Adverse selection risk is the most important cause of ex post regret.");
const FAR_REGRET = c(77, "4.4.4", "Limit order traders can minimize the risk of ex post regret by placing their orders far from the market.");
const FAR_PRICE = c(77, "4.4.4", "This strategy gives them better prices, should their orders execute, but it decreases the probability that they will trade.");
const CLOSE = c(77, "4.4.4", "This strategy reduces the time that they are exposed to adverse selection risk, but it worsens the price they receive if their orders trade.");

// ── Box "Ex Post Regret Example" (p. 78) ────────────────────────────────────
const BA = { box: "Ex Post Regret Example" };
const ANDY_DEALER = c(78, "4.4.4", "He makes money when he is able to buy at the lower bid price and sell at the higher ask price.", BA);
const ANDY_BID = c(78, "4.4.4", "At 2:30 A.M. Chicago time, Andy submits a limit buy order for 20 contracts at the best bid of 901.05.", BA);
const ANDY_SELL = c(78, "4.4.4", "Five minutes later, a market sell order for 50 contracts arrives.", BA);
const ANDY_REST = c(78, "4.4.4", "It then fills the rest of the order with 12 contracts bid at 901.00 and with 8 more contracts at 900.90.", BA);
const ANDY_CLOSE = c(78, "4.4.4", "In the next minute, traders submit new buy and sell limit orders so that the market spread closes to 900.95 bid, 901.00 offered.", BA);
const ANDY_LOSS = c(78, "4.4.4", "Since the nominal value of the S&P 500 contract is 250 times the index value, Andy has lost 500 dollars (250 x 0.10 dollar per contract x 20 contracts).", BA);

// ── 4.4.5 (pp. 77–78) ───────────────────────────────────────────────────────
const ABSENT = c(77, "4.4.5", "Many traders use limit orders to tell their brokers the conditions under which they would be willing to trade.");
const MONITOR = c(77, "4.4.5", "Their brokers then monitor the market on their behalf to determine when these conditions are met.");
const ELSEWHERE = c(78, "4.4.5", "traders can participate in the markets while they attend to business elsewhere.");
const BS = { box: "Limit Order Example" };
const SANDY_WANT = c(78, "4.4.5", "Sandy wants to buy five July sugar futures contracts if their price drops below 10 cents per pound.", BS);
const SANDY_ORDER = c(78, "4.4.5", "Rather than watch the sugar market herself, she gives her broker a limit buy order with a 10-cent limit price.", BS);
const SANDY_WATCH = c(78, "4.4.5", "Her broker then watches the sugar market for her while she attends to other business.", BS);

export const U44B_LESSONS: Lesson[] = [
  // ── 4.4.2 Limit orders are options ──────────────────────────────────────
  {
    id: "4.4.2-options",
    sec: "4.4.2",
    title: "Limit orders are free options",
    pages: "75",
    imp: 3,
    steps: [
      { kind: "idea", title: "Standing orders offer liquidity", body: "A **standing limit order** lets other traders trade **when they want to trade**. That is what offering liquidity means.", cite: OFFER },
      {
        kind: "definition",
        term: "Options to trade",
        body: "Other traders **choose** whether, and when, to trade with a standing limit order. So each one is an **option to trade**.",
        cite: OPTIONS,
      },
      { kind: "quote", lead: "Harris doesn't say this lightly:", cite: IMPORTANT, mark: ["very important"] },
      {
        kind: "idea",
        title: "Sell limits are calls, buy limits are puts",
        body: "A **sell limit** order lets others **buy** from you: a **call**. A **buy limit** order lets others **sell** to you: a **put**. The **strike** is the limit price.",
        cite: PUT,
      },
      {
        kind: "see",
        title: "A free option, exercised",
        illus: ExercisedOption,
        beats: [
          { text: "A trader leaves a **sell limit order at $50**. Any buyer may take it, whenever they like: a **call** with a strike of 50. (Our numbers.)", cite: CALL },
          { text: "News lifts the stock's **value to $52**. The order still offers the stock at $50." },
          { text: "A buyer **exercises the option** with a market order: he pays $50 for a stock worth $52. The order's writer gave that gain away.", cite: EXERCISE },
          { text: "A **buy limit order at $48** works the other way: a **put** with a strike of 48. It lets others sell to it.", cite: PUT },
          { text: "Value falls to about $47.60. A seller exercises the put: **sells at $48** a stock now worth less." },
        ],
      },
      {
        kind: "match",
        q: "Match each part of a limit order to its option twin.",
        pairs: [
          ["Sell limit order", "Call option"],
          ["Buy limit order", "Put option"],
          ["Limit price", "Strike price"],
          ["A market order that takes it", "Exercising the option"],
        ],
        cite: PUT,
      },
      {
        kind: "truefalse",
        q: "A standing **buy** limit order is like a **call** option, because it gives other traders a chance to trade.",
        answer: false,
        why: "A buy limit order lets others **sell** to it, so it is a **put**. Sell limit orders are the calls.",
        cite: PUT,
      },
      {
        kind: "fill",
        q: "Sell limit orders are ___ options; buy limit orders are ___ options. The strike prices are the ___ prices.",
        bank: ["call", "put", "limit", "stop", "closing"],
        answer: ["call", "put", "limit"],
        why: "Sell limits give others the chance to buy (calls), buy limits the chance to sell (puts); the limit price is the strike.",
        cite: PUT,
      },
      {
        kind: "idea",
        title: "Options, but not option contracts",
        body: "An option **contract** is **sold** for a **premium**. A limit order is **given away free** to the market: nobody owns it, and its writer may cancel it.",
        cite: FREE,
      },
      {
        kind: "see",
        title: "Contract or limit order?",
        illus: ContractVsOrder,
        beats: [
          { text: "**Paid for?** The buyer of an option contract pays the writer a **premium**. A limit order is granted to the market for **free**.", cite: PREMIUM },
          { text: "**Owned by?** A contract belongs to its holder. Nobody owns the option a limit order represents.", cite: OWN },
          { text: "**Can the writer cancel?** A contract binds its writer until it expires. A limit order can be **cancelled at any time**." },
          { text: "**Exercised by?** Only a contract's holder. A limit order: **any trader**, with a market order or a marketable limit order.", cite: EXERCISE },
        ],
      },
      {
        kind: "multi",
        q: "How do standing limit orders differ from option contracts? Select all that apply.",
        options: [
          "Nobody pays a premium for them",
          "Traders freely grant them to the market",
          "No trader owns the option they represent",
          "Only one trader may exercise them",
        ],
        answer: [0, 1, 2],
        why: "Limit orders are **free**, **granted to the market**, and **owned by nobody**: any trader can take them.",
        cite: FREE,
      },
      {
        kind: "choice",
        q: "How does a trader **exercise** the option a standing limit order offers?",
        options: [
          "By submitting a market order or a marketable limit order",
          "By paying the order's writer a premium",
          "By waiting until the order expires",
          "By asking the exchange to assign it to her",
        ],
        answer: 0,
        why: "Any trader exercises a limit order option simply by trading with it: a **market order** or a **marketable limit order**.",
        cite: EXERCISE,
      },
      {
        kind: "recap",
        points: [
          { text: "Standing limit orders are **options to trade** that their writers give to the market.", cite: OPTIONS },
          { text: "**Sell limit = call**, **buy limit = put**; the strike is the **limit price**.", cite: PUT },
          { text: "Not option contracts: **no premium**, **no owner**; anyone exercises with a market order.", cite: EXERCISE },
        ],
      },
    ],
  },

  // ── 4.4.2 What the option is worth ──────────────────────────────────────
  {
    id: "4.4.2-option-value",
    sec: "4.4.2",
    title: "What a limit order option is worth",
    pages: "75–76",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Option value of a limit order",
        body: "What the order is worth **to other traders**. It depends on the **limit price**, **how long** the order will stand, and **volatility**.",
        cite: VALUE,
      },
      {
        kind: "idea",
        title: "The limit price matters most",
        body: "**Far behind** the market, the option is worth little: better prices trade first. **At** the market, anyone who wants to trade now values it.",
        cite: MOST,
      },
      {
        kind: "see",
        title: "One order, three option values",
        illus: ValueLadder,
        beats: [
          { text: "Your sell order stands at **20.40**, far behind the best offer of 20.05. Buyers take the cheaper offers first. (Our numbers.)", cite: FAR },
          { text: "Move it to **20.05**, at the market. Any buyer who wants to trade right now will value it.", cite: AT },
          { text: "News lifts value to about **20.30**. Your 20.05 offer is now an **exceptionally good price**: buyers jump on it and it fills at once.", cite: GOOD },
        ],
      },
      {
        kind: "choice",
        q: "The market is 20.00 bid, offered at 20.05. Which standing order gives other traders the **most valuable** option?",
        options: ["A sell limit at 20.05", "A sell limit at 20.40", "A buy limit at 19.60", "A buy limit at 19.80"],
        answer: 0,
        why: "The **limit price** matters most: an order **at the market** is the one impatient traders want. Orders far behind the market have little value.",
        cite: AT,
      },
      {
        kind: "idea",
        title: "Time: the longer it stands, the more it's worth",
        body: "An order that will stand a long time lets others **wait and see**, then trade only if values move their way. Values move more over long intervals.",
        cite: WAIT,
      },
      {
        kind: "truefalse",
        q: "A limit order expected to stand all week is a **more valuable** option to other traders than one that will stand for one minute.",
        answer: true,
        why: "Values change more over long intervals, so an order that stays available longer is a more valuable trading option.",
        cite: TIME,
      },
      {
        kind: "idea",
        title: "Volatility: faster prices, richer options",
        body: "**Volatility** is how fast prices change. It makes a profitable trade against a limit order more likely, often before its writer can cancel.",
        cite: VOL_DEF,
      },
      {
        kind: "see",
        title: "Volatility widens the spread",
        illus: VolSpread,
        beats: [
          { text: "A calm market: limit orders sit right next to each other. The spread is **2¢**. (Our numbers.)" },
          { text: "Volatility rises. Values may jump before traders can cancel, so they **pull** their orders near the market.", cite: VOL },
          { text: "They place new orders **far from the market** to give away less option value. The spread widens to **22¢**.", cite: FAR_VOL },
        ],
      },
      {
        kind: "choice",
        q: "Why do bid/ask spreads tend to be **wide** in volatile markets?",
        options: [
          "Traders place limit orders far from the market to give away less option value",
          "Exchanges raise the minimum price change when markets move",
          "Dealers must quote wider spreads by law",
          "Fewer traders want to trade when prices move",
        ],
        answer: 0,
        why: "Limit orders are more valuable options in volatile markets, so their writers move them **away** from the market. Spreads widen.",
        cite: WIDE,
      },
      {
        kind: "multi",
        q: "Which of these **raise** the option value a standing limit order gives to other traders? Select all that apply.",
        options: ["A limit price at the market", "Expecting the order to stand a long time", "More volatile prices", "A limit price far behind the market"],
        answer: [0, 1, 2],
        why: "Limit price (closer is worth more), time standing (longer is worth more) and volatility (more is worth more). Far behind the market, the option is worth little.",
        cite: VALUE,
      },
      {
        kind: "fill",
        q: "Valuable limit orders often disappear quickly because other traders ___ them, or because the traders who write them ___ them.",
        bank: ["take", "cancel", "display", "report", "hedge"],
        answer: ["take", "cancel"],
        why: "A valuable option doesn't last: someone exercises it, or its writer pulls it.",
        cite: DISAPPEAR,
      },
      {
        kind: "classify",
        q: "Does it raise or lower the option value the order gives away?",
        buckets: ["Raises it", "Lowers it"],
        items: [
          { text: "Moving a sell limit from far behind the market to the best offer", bucket: 0, why: "At the market, impatient traders value it." },
          { text: "Volatility jumps after news", bucket: 0, why: "A profitable trade against the order becomes more likely." },
          { text: "Placing a buy limit far below the best bid", bucket: 1, why: "Better-priced orders trade first." },
          { text: "Cancelling after one minute instead of leaving it all day", bucket: 1, why: "A shorter life is a less valuable option." },
          { text: "Leaving the order standing all week", bucket: 0, why: "Others can wait and see for longer." },
        ],
        cite: VALUE,
      },
      {
        kind: "recap",
        points: [
          { text: "Option value = the order's value **to other traders**; the **limit price** matters most.", cite: MOST },
          { text: "Orders that stand **longer**, in **more volatile** markets, give away more value.", cite: VOL },
          { text: "So in volatile markets traders quote far away and **spreads widen**.", cite: WIDE },
        ],
      },
    ],
  },

  // ── 4.4.2 box: Option contracts are sold limit orders ───────────────────
  {
    id: "4.4.2-sold-orders",
    sec: "4.4.2",
    title: "Option contracts are sold limit orders",
    pages: "76",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Sell what you'd otherwise give away",
        body: "A trader willing to **honor** a limit order until a future date can **sell** it, by **writing an option contract**. The buyer pays for the liquidity.",
        cite: SOLD,
      },
      {
        kind: "idea",
        title: "The price of selling it: no cancelling",
        body: "Nobody would pay for an order its writer could pull at any moment. So to sell a limit order, you **give up the right to cancel** it.",
        cite: CANCEL,
      },
      {
        kind: "truefalse",
        q: "A trader who writes a call option can still cancel it whenever the market moves against him.",
        answer: false,
        why: "Writing the contract **sells** the limit order: the writer gives up the right to cancel it.",
        cite: CANCEL,
      },
      { kind: "quote", lead: "Why buyers pay for it:", cite: EXCLUSIVE, mark: ["exclusive right"] },
      {
        kind: "see",
        title: "AAAA: limit order or call option?",
        illus: AaaaPaths,
        beats: [
          { text: "You'll be away exploring the Arctic and want to sell AAAA at **$100**. Leave a sell limit at 100, or **write a call** with a strike of 100?", cite: AAAA },
          { text: "**Path 1:** AAAA rises above 100 and stays there. Both sell at $100, but the call writer **also keeps the premium**.", cite: AAAA_UP },
          { text: "**Path 2:** AAAA rises above 100, then falls back below. The limit order probably sold on the way up. The call holder didn't exercise: you **still own AAAA, plus the premium**.", cite: AAAA_KEEP },
        ],
      },
      {
        kind: "choice",
        q: "AAAA rises to $104 and stays there until you return. Compared with the sell limit order at 100, writing the 100 call…",
        options: ["sells at $100 too, and you also keep the premium", "sells at $104", "never sells", "costs you the premium"],
        answer: 0,
        why: "Either way you sell at 100; the call writer also received the **premium**.",
        cite: AAAA_UP,
      },
      {
        kind: "choice",
        q: "AAAA rises above 100, then falls to $96 before you return. If you wrote the call, you most likely…",
        options: ["still own the stock, plus the premium", "sold at $100 and kept the premium", "sold at $96", "owe the buyer $4"],
        answer: 0,
        why: "The buyer wouldn't exercise after the fall below 100, so you keep the stock **and** the premium.",
        cite: AAAA_FALL,
      },
      {
        kind: "classify",
        q: "Standing limit order or written option contract?",
        buckets: ["Limit order", "Option contract"],
        items: [
          { text: "Granted free to the market", bucket: 0 },
          { text: "Earns its writer a premium", bucket: 1 },
          { text: "Can be cancelled at any time", bucket: 0 },
          { text: "Its holder alone may exercise it until expiry", bucket: 1 },
          { text: "Any trader can take it with a market order", bucket: 0 },
        ],
        cite: EXCLUSIVE,
      },
      {
        kind: "fill",
        q: "To sell a limit order, a trader writes an ___ contract and gives up the right to ___ it.",
        bank: ["option", "cancel", "futures", "display", "price"],
        answer: ["option", "cancel"],
        why: "Option contracts are limit orders sold to one buyer, who pays because the writer can no longer cancel.",
        cite: WRITE,
      },
      {
        kind: "recap",
        points: [
          { text: "Writing an option contract **sells** a limit order; the buyer pays for the liquidity.", cite: PAY },
          { text: "The seller gives up the **right to cancel**.", cite: CANCEL },
          { text: "AAAA: a call writer gets **100 + premium** if exercised, or keeps the stock and the premium.", cite: AAAA_UP },
        ],
      },
    ],
  },

  // ── 4.4.3 The expected compensation for offering liquidity ─────────────
  {
    id: "4.4.3-compensation",
    sec: "4.4.3",
    title: "Paid for waiting, or chasing",
    pages: "76–77",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "The reward: a better price",
        body: "Limit order traders give away free options. In return they hope for a **better price**: buyers hope to buy at the **bid**, sellers to sell at the **ask**.",
        cite: COMP,
      },
      {
        kind: "fill",
        q: "Buyers who submit standing limit orders hope to buy at the ___. With a market order they would pay the higher ___ price.",
        bank: ["bid", "asking", "closing", "stop", "strike"],
        answer: ["bid", "asking"],
        why: "A standing buy order waits at the bid; a market buy order pays the ask.",
        cite: HOPE_BID,
      },
      {
        kind: "idea",
        title: "Only if it trades",
        body: "The better price comes **only if the order trades**. If the market moves away, a trader who still wants to trade must **chase the price**.",
        cite: ONLY,
      },
      {
        kind: "definition",
        term: "Chase the price",
        body: "**Raise your bid** (or **lower your offer**) after the market moves away from your limit order, because you still want to trade.",
        cite: CHASE,
      },
      {
        kind: "see",
        title: "Jill chases GM",
        illus: JillChase,
        beats: [
          { text: "GM is **48.05 bid, offered at 48.11**. Jill bids 48.05 for 500 shares, hoping to save the spread. (Sizes: our numbers.)", cite: JILL_MKT },
          { text: "GM rises and her bid is left behind: the market moves to **48.15 bid, 48.20 asked**." },
          { text: "Jill cancels her limit order and sends a **market order**: she buys 500 shares at **48.20**.", cite: JILL_CHASE },
          { text: "A market order at the start would have paid 48.11. Chasing cost her **9 cents more** a share.", cite: JILL_9 },
        ],
      },
      {
        kind: "number",
        q: "GM was 48.05 bid, offered at 48.11. Had Jill's limit order at 48.05 filled, how many cents per share would she have saved compared with a market order?",
        answer: 6,
        unit: "cents",
        why: "48.11 − 48.05 = 6 cents: the spread she hoped to save.",
        cite: JILL_6,
      },
      {
        kind: "number",
        q: "Jill finally bought at 48.20. A market order at the start would have paid 48.11. How many cents per share more did she pay?",
        answer: 9,
        unit: "cents",
        why: "48.20 − 48.11 = 9 cents more than the starting offer.",
        cite: JILL_9,
      },
      {
        kind: "order",
        q: "Put Jill's trade in order.",
        items: [
          "Jill bids 48.05 for 500 GM",
          "GM rises; her order doesn't execute",
          "The market reaches 48.15 bid, 48.20 asked",
          "She cancels and sends a market order",
          "She buys at 48.20",
        ],
        why: "She waited for a better price, the market moved away, and she chased it with a market order.",
        cite: JILL_CHASE,
      },
      {
        kind: "truefalse",
        q: "A standing buy limit order always ends up cheaper than a market order would have been.",
        answer: false,
        why: "If the market moves away and you chase it, your final price **may be worse** than a market order's, as Jill found.",
        cite: WORSE,
      },
      {
        kind: "idea",
        title: "On average, waiting pays",
        body: "Spreads adjust so that limit order strategies **expect better average prices** than market order strategies. That average gap is the **compensation for offering liquidity**.",
        cite: AVG,
      },
      {
        kind: "choice",
        q: "According to Harris, what would happen if offering liquidity earned **no** compensation?",
        options: ["Traders would not offer it", "Exchanges would have to offer it instead", "Spreads would fall to zero", "Market orders would become cheaper"],
        answer: 0,
        why: "The better average price is what pays limit order traders for the free options they grant. Without it, nobody would offer liquidity.",
        cite: NO_COMP,
      },
      {
        kind: "recap",
        points: [
          { text: "The hoped-for reward for a standing limit order is a **better price**: buy at the bid, sell at the ask.", cite: HOPE_ASK },
          { text: "It comes only **if the order trades**; otherwise traders **chase the price**, sometimes paying more.", cite: CHASE },
          { text: "On average limit strategies get better prices: the **compensation for offering liquidity**.", cite: AVG },
        ],
      },
    ],
  },

  // ── 4.4.4 The risks of using standing limit orders ──────────────────────
  {
    id: "4.4.4-risks",
    sec: "4.4.4",
    title: "The two risks of standing limit orders",
    pages: "77–78",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Two risks",
        body: "A standing limit order can go wrong two ways: it **never trades** (execution uncertainty), or it **trades and you regret it** (ex post regret).",
        cite: TWO,
      },
      {
        kind: "definition",
        term: "Execution uncertainty",
        body: "The risk that prices move away and your limit order **never trades**, though you wish it had.",
        cite: EXEC,
      },
      {
        kind: "idea",
        title: "Less uncertainty costs more",
        body: "Price your limit order **aggressively**, or use a **market order**, to make sure you trade. Both cut execution uncertainty but **raise the cost** of trading.",
        cite: COST,
      },
      {
        kind: "choice",
        q: "A trader **must** buy before the close today, whatever happens. What does Harris say she should do?",
        options: ["Submit a market order", "Leave a buy limit far below the bid", "Leave a buy limit at the bid and wait", "Use a good-till-cancel limit order"],
        answer: 0,
        why: "Traders who want to be **very sure** they trade should submit market orders: no execution uncertainty, at a higher cost.",
        cite: SURE,
      },
      {
        kind: "definition",
        term: "Ex post regret",
        body: "You **trade, then regret it**: price moved through your limit, your order filled, and the market kept moving against your new position.",
        cite: REGRET,
      },
      {
        kind: "definition",
        term: "Adverse selection risk",
        body: "The risk of trading with someone who **knows more** about future values than you. It is the **most important cause** of ex post regret.",
        cite: ADVERSE,
      },
      {
        kind: "see",
        title: "Andy's overnight bid",
        illus: AndyLoss,
        beats: [
          { text: "2:30 a.m., GLOBEX, S&P 500 futures: **901.05 bid, 901.20 offered**. Andy, a dealer, joins the best bid: **20** of the 30 contracts at 901.05. (Other sizes: our numbers.)", cite: ANDY_BID },
          { text: "A **market sell order for 50 contracts** arrives. It takes all 30 at 901.05 (Andy buys his 20), then 12 at 901.00 and 8 at 900.90.", cite: ANDY_SELL },
          { text: "A minute later, new orders close the spread to **900.95 bid, 901.00 offered**.", cite: ANDY_CLOSE },
          { text: "Andy owns 20 contracts bought at 901.05 but could sell only at 900.95: **250 × 0.10 × 20 = $500 lost**. That's ex post regret.", cite: ANDY_LOSS },
        ],
      },
      {
        kind: "number",
        q: "Andy bought 20 contracts at 901.05 and could sell them only at 900.95. The contract is worth 250 times the index. How much has he lost?",
        answer: 500,
        prefix: "$",
        why: "0.10 index points × 250 × 20 contracts = $500.",
        cite: ANDY_LOSS,
      },
      {
        kind: "truefalse",
        q: "Ex post regret worries dealers most when they trade with **better-informed** traders.",
        answer: true,
        why: "Dealers dislike trading with traders who know more about future values: they end up on the wrong side of the market.",
        cite: DEALERS,
      },
      {
        kind: "classify",
        q: "Execution uncertainty or ex post regret?",
        buckets: ["Execution uncertainty", "Ex post regret"],
        items: [
          { text: "Your buy limit sits at 48.05 while GM climbs to 48.20.", bucket: 0, why: "The market moved away: no trade." },
          { text: "Your buy limit fills, then the price keeps falling.", bucket: 1, why: "You traded, then lost money on the new position." },
          { text: "A dealer's bid is hit by an informed seller just before bad news.", bucket: 1, why: "Adverse selection: the main cause of ex post regret." },
          { text: "The market moves away and your sell order never trades.", bucket: 0, why: "You failed to trade and wish you had." },
          { text: "Andy buys 20 contracts at 901.05, then the market drops.", bucket: 1, why: "Filled, then the market moved against him." },
        ],
        cite: SECOND,
      },
      {
        kind: "idea",
        title: "Far or close: pick your risk",
        body: "**Far** from the market: a better price if it fills, but it may never fill. **Close**: it fills faster, with less time exposed to adverse selection, at a worse price.",
        cite: FAR_REGRET,
      },
      {
        kind: "see",
        title: "Moving the order away from the market",
        illus: FarClose,
        beats: [
          { text: "Your buy order **at the bid**: it will probably fill, and soon, but at no price advantage.", cite: CLOSE },
          { text: "Move it lower: if it fills, the price is better, but a fill is less likely." },
          { text: "Far below the market: the best price if it fills, and the smallest chance that it does.", cite: FAR_PRICE },
          { text: "There is no free choice: closer means more execution certainty, farther means less ex post regret." },
        ],
      },
      {
        kind: "choice",
        q: "What does placing a limit order **far** from the market do?",
        options: [
          "Gives a better price if it fills, but makes a fill less likely",
          "Makes a fill more likely, at a worse price",
          "Removes all risk of ex post regret",
          "Turns it into a market order",
        ],
        answer: 0,
        why: "Far orders protect against ex post regret with a better price, at the cost of a lower chance to trade.",
        cite: FAR_PRICE,
      },
      {
        kind: "game",
        id: "beat-the-bell",
        title: "Beat the bell",
        brief: "Buy **500 shares** before the closing bell in a market that moves every second. Wait with a limit bid, move it, or take the offer. Three rounds, three hidden market moods.",
        game: BeatTheBell,
      },
      {
        kind: "recap",
        points: [
          { text: "**Execution uncertainty**: the market moves away and you don't trade.", cite: EXEC },
          { text: "**Ex post regret**: you trade, then the market moves against you; **adverse selection** is its main cause.", cite: ADVERSE },
          { text: "Far orders: better prices, fewer fills. Close orders: faster fills, worse prices.", cite: FAR_PRICE },
        ],
      },
    ],
  },

  // ── 4.4.5 Limit orders represent absent traders ─────────────────────────
  {
    id: "4.4.5-absent",
    sec: "4.4.5",
    title: "Limit orders stand in for absent traders",
    pages: "77–78",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Your order keeps watch for you",
        body: "A limit order tells your broker the **conditions** under which you'd trade. The broker then **monitors the market** for you and trades when they're met.",
        cite: MONITOR,
      },
      { kind: "quote", lead: "So the trader can be somewhere else:", cite: ELSEWHERE, mark: ["business elsewhere"] },
      {
        kind: "see",
        title: "Sandy's sugar order",
        illus: SandyWatch,
        beats: [
          { text: "Sandy wants **5 July sugar futures**, but only if the price drops below **10 cents a pound**.", cite: SANDY_WANT },
          { text: "She gives her broker a **limit buy order at 10 cents** and goes back to her other business.", cite: SANDY_ORDER },
          { text: "Her **broker watches** the sugar market for her. The price drifts down… (our path)", cite: SANDY_WATCH },
          { text: "…and reaches her limit: the order **buys 5 contracts at 10 cents or less**, while Sandy is busy elsewhere." },
        ],
      },
      {
        kind: "choice",
        q: "In the box, who watches the sugar market while Sandy attends to other business?",
        options: ["Her broker", "Sandy herself", "The clearinghouse", "A dealer on the floor"],
        answer: 0,
        why: "Her limit order states her conditions; her **broker** monitors the market until they are met.",
        cite: SANDY_WATCH,
      },
      {
        kind: "fill",
        q: "Sandy gives her broker a limit ___ order with a 10-cent ___ price.",
        bank: ["buy", "limit", "sell", "stop", "touch"],
        answer: ["buy", "limit"],
        why: "She wants to buy if the price drops to 10 cents: a limit buy order, limit price 10 cents.",
        cite: SANDY_ORDER,
      },
      {
        kind: "truefalse",
        q: "To use a limit order, a trader must watch the market herself until the order fills.",
        answer: false,
        why: "That is the point of a limit order: the broker monitors the market on her behalf.",
        cite: MONITOR,
      },
      {
        kind: "choice",
        q: "Why do many traders give their brokers limit orders?",
        options: [
          "To state the conditions under which they'd trade, then let the broker watch the market",
          "To be sure they trade immediately",
          "To hide their orders from other traders",
          "To avoid paying commissions",
        ],
        answer: 0,
        why: "A limit order expresses the trader's conditions; the broker monitors the market and trades when they're met.",
        cite: ABSENT,
      },
      {
        kind: "recap",
        points: [
          { text: "Limit orders tell brokers the **conditions** under which a trader would trade.", cite: ABSENT },
          { text: "Brokers then **monitor the market** for the trader.", cite: MONITOR },
          { text: "So traders take part while they **attend to business elsewhere**, like Sandy.", cite: ELSEWHERE },
        ],
      },
    ],
  },
];

// Extra questions for the 4.4 checkpoint (lesson questions are sampled too).
export const U44B_CHECKPOINT: Question[] = [
  {
    kind: "truefalse",
    q: "A standing **sell** limit order is a **put** option on the stock.",
    answer: false,
    why: "A sell limit lets others **buy** from it: it is a **call**. Buy limits are the puts.",
    cite: CALL,
  },
  {
    kind: "truefalse",
    q: "Standing limit orders are option **contracts**.",
    answer: false,
    why: "They are options, but not option contracts: nobody buys them, and their writers can cancel them.",
    cite: NOT_CONTRACT,
  },
  {
    kind: "choice",
    q: "Which variable matters **most** for the option value of a standing limit order?",
    options: ["Its limit price", "Its size", "The broker who holds it", "The time of day"],
    answer: 0,
    why: "Harris: the most important variable is the **limit price**.",
    cite: MOST,
  },
  {
    kind: "choice",
    q: "What compensation do limit order traders hope to receive for the free options they give away?",
    options: ["A better price", "A rebate from the exchange", "A premium paid by other traders", "Priority over market orders"],
    answer: 0,
    why: "Buyers hope to buy at the bid and sellers to sell at the ask: a **better price**.",
    cite: COMP,
  },
  {
    kind: "choice",
    q: "What is the **most important cause** of ex post regret?",
    options: ["Adverse selection risk", "Execution uncertainty", "Wide spreads", "Slow brokers"],
    answer: 0,
    why: "Trading with better-informed traders, **adverse selection**, is the main reason fills turn into losses.",
    cite: ADVERSE,
  },
  {
    kind: "fill",
    q: "Limit order traders can minimize execution uncertainty by ___ pricing their limit orders.",
    bank: ["aggressively", "passively", "secretly", "randomly"],
    answer: ["aggressively"],
    why: "Aggressive prices raise the probability that the order trades, at a higher cost.",
    cite: AGGR,
  },
  {
    kind: "truefalse",
    q: "Only traders who use limit orders face ex post regret.",
    answer: false,
    why: "All traders face ex post regret, however and why they trade; standing limit orders just expose you to it in a particular way.",
    cite: ALL,
  },
  {
    kind: "choice",
    q: "How does a dealer like Andy normally make money?",
    options: ["Buying at the lower bid and selling at the higher ask", "Charging commissions on client orders", "Collecting option premiums", "Holding positions overnight for the long run"],
    answer: 0,
    why: "Dealers earn the spread: they buy at the bid and sell at the ask, which is why adverse selection hurts them.",
    cite: ANDY_DEALER,
  },
  {
    kind: "choice",
    q: "GM is 48.05 bid, offered at 48.11, and Jill bids 48.05. Where does her limit order stand?",
    options: ["At the market", "Behind the market", "It is marketable", "In the market, making a new market"],
    answer: 0,
    why: "Her buy limit sits **at the best bid**: it is at the market, so it waits for a seller.",
    cite: JILL_BID,
  },
  {
    kind: "number",
    q: "A market sell order for 50 contracts takes 30 at 901.05 and 12 at 901.00. How many contracts does it sell at 900.90?",
    answer: 8,
    unit: "contracts",
    why: "50 − 30 − 12 = 8 contracts at the next bid, 900.90.",
    cite: ANDY_REST,
  },
];
