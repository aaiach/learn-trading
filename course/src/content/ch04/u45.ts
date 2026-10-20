// 4.5 STOP ORDERS (pp. 78–80)
import type { Cite, Unit } from "../types.ts";
import { AstnStopLimit, StanCotton, StopCascade, StopWakes, TwoSellsAtFive } from "./illus/u45.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 4.5 ───────────────────────────────────────────────────────────
const STOP_DEF = c(78, "4.5", "A stop instruction stops an order from executing until price reaches a stop price specified by the trader.");
const STOP_WHEN = c(78, "4.5", "Traders attach stop instructions to their orders when they want to buy only after price rises to the stop price or sell only after price falls to the stop price.");
const CALLED = c(78, "4.5", "Orders with stop instructions are called stop orders.");
const ANY = c(78, "4.5", "Traders can attach stop instructions to any type of order. They most often attach them to market orders.");
const VALID = c(78, "4.5", "Once they are activated, brokers and exchanges treat stop orders like all other orders. In particular, a stop order remains valid even if price crosses back over the stop price.");
const LOSSES = c(78, "4.5", "Traders most commonly use stop orders to stop their losses when prices move against their positions.");
const STAN = c(78, "4.5", "Stan may issue a market sell order for 10 contracts with a stop price of 70 cents.");
const STAN_BUY = c(78, "4.5", "suppose that Stan buys 10 cotton futures contracts at 80 cents a pound.");
const STOP_LOSS = c(78, "4.5", "Traders often call such orders stop loss orders.");
const NOT_STOP = c(78, "4.5", "The price at which a stop order executes may not be the stop price.");
const GAP = c(78, "4.5", "if the price of cotton drops from 72 cents to 67 cents on news that the harvest will be greater than expected, Stan's broker may be able to sell the 10 contracts for only 66.90 cents.");
const GUARANTEE = c(78, "4.5", "To guarantee a trade at a particular price, a trader must purchase an option contract.");
const PUT = c(79, "4.5", "he must buy a put option contract with a strike price of 70 cents.");

// ── Excerpts: 4.5.1 ─────────────────────────────────────────────────────────
const CONFUSE = c(79, "4.5.1", "Novices often confuse stop orders with limit orders because both specify price conditions. The difference lies in the purpose of the specified price.");
const ACTIVATION = c(79, "4.5.1", "A stop instruction provides for the activation of an order when the market price reaches or passes a specified stop price.");
const LIMIT_PRICE = c(79, "4.5.1", "In contrast, a limit order can be executed only at a price equal to or better than a specified limit price.");
const EURO_STOP = c(79, "4.5.1", "A trader would typically submit the stop sell order when price is above 5 euros. It will activate only when the market price drops to the 5-euro stop price.");
const EURO_MKT = c(79, "4.5.1", "At that time, it becomes a standard market order, and it should trade at the best price then available.");
const EURO_LIMIT = c(79, "4.5.1", "In contrast, a trader would typically submit a limit sell order when price is below 5 euros. It can be filled only if price rises to 5 euros or more.");
const TWO = c(79, "4.5.1", "When traders attach a stop instruction to a limit order, they must specify two prices.");
const STOP_LIMIT = c(79, "4.5.1", "The stop price indicates when the limit order becomes active, and the limit price indicates the terms upon which a trade may be arranged. The combined order is a stop limit order.");
const ALIKE = c(79, "4.5.1", "Both order instructions allow traders to tell their brokers conditions under which they are willing to trade in the future.");
const ASTN_WANT = c(79, "4.5.1", "Suppose that you would like to buy Ashton Technology Group only if its price rises to 10 dollars, and then only if you can buy it for less than 10.37.", { box: "Stop Limit Order Example" });
const ASTN_TICKET = c(79, "4.5.1", 'You would submit a limit buy order with a limit price of 10.37 and a stop price of 10: "Buy 100 ASTN, 10 stop, 10.37 limit."', { box: "Stop Limit Order Example" });

// ── Excerpts: 4.5.2 ─────────────────────────────────────────────────────────
const ACCEL = c(79, "4.5.2", "Stop orders accelerate price changes by adding buying pressure when prices are rising and selling pressure when prices are falling.");
const LEAST = c(79, "4.5.2", "They demand liquidity when it is least available. Traders say that stop orders add momentum to the market.");
const ONE_SIDED = c(79, "4.5.2", "When these price changes activate stop orders, the stop orders unfortunately contribute to the one-sided demands for liquidity.");
const MOM = c(79, "4.5.2", "Traders who pursue momentum trading strategies buy when prices are rising and sell when prices are falling. Momentum trading therefore destabilizes prices.");
const MOM_STOPS = c(79, "4.5.2", "Momentum traders often implement their strategies by giving stop orders to their brokers, who then monitor the market on their behalf.");
const CONTRA = c(79, "4.5.2", "Contrarian traders employ the opposite trading strategy. They buy when prices are falling and sell when prices are rising. They therefore stabilize prices when they trade.");
const CONTRA_LIMIT = c(79, "4.5.2", "Contrarians can implement their trading strategies by using standard limit orders.");
const CONCERN = c(79, "4.5.2", "The destabilizing effects that stop orders and momentum strategies have on the market concern many regulators, traders, and exchanges.");

// ── Excerpts: summary table and points to remember ─────────────────────────
const T44_STOP = c(87, "4.12", "Stop market order · Occasional · Demands liquidity when it is least available · Often used to stop losses when the trader is not present · Price impact can be large", { table: "Table 4-4" });
const T44_SL = c(87, "4.12", "Stop limit order · Rare · Limits price impact · May not execute", { table: "Table 4-4" });
const PT_NOT_LIMIT = c(88, "4.13", "Stop orders are not limit orders.");
const PT_DESTAB = c(88, "4.13", "Stop orders tend to destabilize prices.");

export const U45: Unit = {
  sec: "4.5",
  title: "Stop Orders",
  pages: "78–80",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.5-stop-orders",
      sec: "4.5",
      title: "Stop orders",
      pages: "78–79",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Stop order",
          aka: ["order with a stop instruction"],
          body: "An order held back until price reaches a **stop price** you choose. Then it wakes up and trades.",
          cite: STOP_DEF,
        },
        {
          kind: "idea",
          title: "Buy stops wait above, sell stops below",
          body: "A **buy stop** waits for price to **rise** to the stop. A **sell stop** waits for price to **fall** to it.",
          cite: STOP_WHEN,
        },
        {
          kind: "see",
          title: "A sell stop wakes up",
          illus: StopWakes,
          beats: [
            { text: "A **sell stop** at 70 sits **below** the market (our price path). While price stays above 70, nothing happens." },
            { text: "Price drifts down toward 70. Still nothing: the stop **stops** the order from executing.", cite: STOP_DEF },
            { text: "Price falls to 70: the stop **activates**. The order is now a normal **market order**, and it sells." },
            { text: "Price climbs back over 70. That changes nothing: an activated stop order **stays valid**.", cite: VALID },
          ],
        },
        {
          kind: "truefalse",
          q: "A **sell** stop order with a stop price of 70 activates when price **rises** to 70.",
          answer: false,
          why: "Sell stops activate when price **falls** to the stop price. Buy stops activate when it rises.",
          cite: STOP_WHEN,
        },
        {
          kind: "choice",
          q: "Traders can attach a stop instruction to any order. Which orders do they **most often** attach it to?",
          options: ["Market orders", "Limit orders", "Spread orders", "Substitution orders"],
          answer: 0,
          why: "Stops are most often attached to **market orders**: once price reaches the stop, the order trades at the best price available.",
          cite: ANY,
        },
        {
          kind: "truefalse",
          q: "Once a stop order is activated, it is canceled if price crosses back over the stop price.",
          answer: false,
          why: "After activation, a stop order is treated like any other order and **remains valid** even if price crosses back.",
          cite: VALID,
        },
        {
          kind: "definition",
          term: "Stop loss order",
          body: "A stop order used to **cap a loss** when price moves against your position, like a sell stop under a stock you own.",
          cite: LOSSES,
        },
        {
          kind: "see",
          title: "Stan's cotton stop",
          illus: StanCotton,
          beats: [
            { text: "Stan buys **10 cotton futures** contracts at **80¢** a pound.", cite: STAN_BUY },
            { text: "To limit his loss, he adds a **market sell order** with a **stop at 70¢**: a stop loss order.", cite: STAN },
            { text: "Cotton slides to 72¢. The stop keeps waiting." },
            { text: "News: the harvest will be bigger than expected. Cotton **jumps from 72¢ to 67¢**. No trade ever happens at 70¢." },
            { text: "The stop activates and the market order sells at the best price then available: **66.90¢**, 3.10¢ below the stop.", cite: GAP },
            { text: "Only an **option contract** guarantees a price. To be sure of 70¢, Stan must buy a **put** with a 70¢ strike.", cite: PUT },
          ],
        },
        {
          kind: "number",
          q: "Stan's stop price was 70¢, but his order sold at 66.90¢. How many cents below the stop price did it trade?",
          answer: 3.1,
          unit: "¢",
          why: "70 − 66.90 = **3.10¢**. A stop order executes at the best price available after activation, not at the stop price.",
          cite: NOT_STOP,
        },
        {
          kind: "number",
          q: "Stan bought at 80¢ and his stop order sold at 66.90¢. How many cents per pound did he lose?",
          answer: 13.1,
          unit: "¢",
          why: "80 − 66.90 = **13.10¢** a pound, not the 10¢ he planned with a 70¢ stop.",
          cite: GAP,
        },
        {
          kind: "choice",
          q: "What must Stan do to **guarantee** that he can sell at 70¢?",
          options: ["Buy a put option with a 70¢ strike", "Set his stop at 71¢", "Use a stop loss order", "Attach the stop to a market order"],
          answer: 0,
          why: "A stop order can't guarantee a price. Only an **option contract** can: a **put** with a 70¢ strike.",
          cite: GUARANTEE,
        },
        {
          kind: "today",
          title: "Exchanges stopped holding stops",
          body: "The **NYSE** stopped accepting stop and good-till-cancel orders in late February 2016. Brokers still offer stop orders: they **hold the order** and send it to the market when it is triggered.",
          source: "NYSE client notices (2015–2016)",
        },
        {
          kind: "recap",
          points: [
            { text: "A **stop order** waits until price reaches the stop: buy stops after a rise, sell stops after a fall.", cite: STOP_WHEN },
            { text: "Once activated it is a normal order, valid even if price crosses back; a **stop loss** order caps losses.", cite: VALID },
            { text: "The fill may be **far from the stop** (66.90¢ for a 70¢ stop). Only an option guarantees a price.", cite: NOT_STOP },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.5.1-stop-vs-limit",
      sec: "4.5.1",
      title: "Stop orders are not limit orders",
      pages: "79",
      imp: 3,
      steps: [
        {
          kind: "quote",
          lead: "Why the two get mixed up:",
          cite: CONFUSE,
          mark: ["purpose of the specified price"],
        },
        {
          kind: "idea",
          title: "A stop price says when",
          body: "When the market **reaches or passes** the stop price, the order **activates**. Before that, it does nothing.",
          cite: ACTIVATION,
        },
        {
          kind: "idea",
          title: "A limit price says how much",
          body: "A limit order trades only at the **limit price or better**. Never worse.",
          cite: LIMIT_PRICE,
        },
        {
          kind: "see",
          title: "Two sell orders at €5",
          illus: TwoSellsAtFive,
          beats: [
            { text: "**Stop sell at €5**: you submit it while price is **above** €5.", cite: EURO_STOP },
            { text: "Price **drops** to €5. The stop activates: the order becomes a standard **market order**." },
            { text: "It sells at the best price then available, here €4.95 (our numbers): **below** its €5 stop.", cite: EURO_MKT },
            { text: "**Limit sell at €5**: you submit it while price is **below** €5.", cite: EURO_LIMIT },
            { text: "It can fill only once price **rises** to €5 or more. Same €5, opposite purpose." },
          ],
        },
        {
          kind: "truefalse",
          q: "A trader typically submits a **stop sell** order at €5 when the price is **below** €5.",
          answer: false,
          why: "A stop sell goes in while price is **above** €5 and activates when price drops to €5. A limit sell at €5 goes in below €5.",
          cite: EURO_STOP,
        },
        {
          kind: "choice",
          q: "Price drops to a sell order's €5 stop price. What does the order become?",
          options: ["A standard market order", "A limit order at €5", "A canceled order", "A good-till-cancel order"],
          answer: 0,
          why: "Activated, it is a **standard market order** that should trade at the best price then available.",
          cite: EURO_MKT,
        },
        {
          kind: "classify",
          q: "Stop price or limit price?",
          buckets: ["Stop price", "Limit price"],
          items: [
            { text: "Tells the broker **when** the order becomes active.", bucket: 0, why: "Activation is the stop's job." },
            { text: "The **worst** price the trade may get.", bucket: 1, why: "A limit order trades at its limit or better." },
            { text: "“Sell only if cotton falls to 70¢.”", bucket: 0, why: "Waiting for a fall to a price, then selling: a sell stop." },
            { text: "“Sell at 5 euros or more.”", bucket: 1, why: "A floor on the sale price: a limit." },
            { text: "“Buy only after the price rises to $10.”", bucket: 0, why: "Waiting for a rise, then buying: a buy stop." },
            { text: "“Buy for no more than $48.05.”", bucket: 1, why: "A ceiling on the purchase price: a limit." },
          ],
          cite: ACTIVATION,
        },
        {
          kind: "definition",
          term: "Stop limit order",
          body: "A limit order with a stop attached, so it has **two prices**: the **stop** says when it activates, the **limit** says the worst price it may trade at.",
          cite: STOP_LIMIT,
        },
        {
          kind: "see",
          title: "Buy 100 ASTN, 10 stop, 10.37 limit",
          illus: AstnStopLimit,
          beats: [
            { text: "You want Ashton Technology only if it **rises to $10**, and then only below **$10.37**.", cite: ASTN_WANT },
            { text: "Below $10 the order sleeps: the stop holds it back." },
            { text: "Price reaches $10. The stop fires: you now have a **limit buy at $10.37**.", cite: STOP_LIMIT },
            { text: "The next trades are at $10.25 and below the limit, so you buy (our numbers)." },
            { text: "Had price jumped straight past $10.37, the order would just wait. A stop limit **limits price impact** but **may not execute**.", cite: T44_SL },
          ],
        },
        {
          kind: "fill",
          q: "To buy ASTN only after it rises to $10, and then for no more than $10.37: “Buy 100 ASTN, ___ stop, ___ limit.”",
          bank: ["10", "10.37", "9.63", "100"],
          answer: ["10", "10.37"],
          why: "The **stop** (10) says when the order activates; the **limit** (10.37) says the most you'll pay.",
          cite: ASTN_TICKET,
        },
        {
          kind: "choice",
          q: "In a stop limit order, what does the **limit price** indicate?",
          options: ["The terms upon which a trade may be arranged", "When the order becomes active", "How long the order stays valid", "How many shares to display"],
          answer: 0,
          why: "The stop price sets **when** the limit order becomes active; the limit price sets the **terms** of the trade.",
          cite: STOP_LIMIT,
        },
        {
          kind: "truefalse",
          q: "Stop orders and limit orders both let traders tell their brokers the conditions under which they will trade later, so they need not watch the market.",
          answer: true,
          why: "That is how they are alike: both state **conditions for future trading**, freeing the trader for other business.",
          cite: ALIKE,
        },
        {
          kind: "recap",
          points: [
            { text: "Stop orders are **not** limit orders: the price has a different purpose.", cite: PT_NOT_LIMIT },
            { text: "A **stop price** activates the order; a **limit price** is the worst price it may trade at.", cite: ACTIVATION },
            { text: "A **stop limit order** needs both: “Buy 100 ASTN, 10 stop, 10.37 limit.”", cite: TWO },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "4.5.2-momentum",
      sec: "4.5.2",
      title: "Stops add momentum",
      pages: "79–80",
      imp: 3,
      steps: [
        {
          kind: "idea",
          title: "Stops push in the direction of the move",
          body: "Activated stops **buy** when prices are rising and **sell** when they are falling, so they **accelerate** price changes.",
          cite: ACCEL,
        },
        {
          kind: "see",
          title: "A stop cascade",
          illus: StopCascade,
          beats: [
            { text: "Sell stops wait below the market: 500 shares at 49.95 and 600 at 49.85 (our numbers)." },
            { text: "A 500-share market sell takes the bids at 50.00 and 49.95. The last trade, 49.95, **triggers** the first stops." },
            { text: "Those stops are now market sells. They take the bids at 49.90 and 49.85, which triggers the next stops." },
            { text: "The second wave pushes price down to 49.75." },
            { text: "One 500-share sale would have moved price 5¢. With the stops, it fell 25¢: stops **add momentum**.", cite: LEAST },
          ],
        },
        {
          kind: "truefalse",
          q: "Activated stop orders **supply** liquidity when it is least available.",
          answer: false,
          why: "They **demand** liquidity, and they do it when liquidity is least available: everyone on that side is already trading.",
          cite: LEAST,
        },
        {
          kind: "choice",
          q: "Prices are falling fast. What do the sell stop orders it triggers do?",
          options: ["Add selling pressure, so prices fall faster", "Add buying pressure, so prices steady", "Nothing, until prices cross back", "Turn into limit orders at the stop price"],
          answer: 0,
          why: "Stops accelerate price changes: **selling pressure** when prices fall, **buying pressure** when they rise.",
          cite: ACCEL,
        },
        {
          kind: "quote",
          lead: "Where the pressure comes from:",
          cite: ONE_SIDED,
          mark: ["one-sided demands for liquidity"],
        },
        {
          kind: "definition",
          term: "Momentum traders",
          body: "Buy when prices are **rising** and sell when they are **falling**. Their trading **destabilizes** prices.",
          cite: MOM,
        },
        {
          kind: "definition",
          term: "Contrarian traders",
          body: "Do the opposite: buy when prices **fall**, sell when they **rise**. Their trading **stabilizes** prices.",
          cite: CONTRA,
        },
        {
          kind: "classify",
          q: "Momentum or contrarian?",
          buckets: ["Momentum", "Contrarian"],
          items: [
            { text: "Gives her broker a **buy stop** above the market.", bucket: 0, why: "Buying only once prices rise: momentum, often done with stops." },
            { text: "Places **limit buys** below the market during a selloff.", bucket: 1, why: "Buying as prices fall: contrarian." },
            { text: "Sells after prices have dropped sharply.", bucket: 0, why: "Selling into a fall: momentum." },
            { text: "Sells into a rally.", bucket: 1, why: "Selling as prices rise: contrarian." },
            { text: "Buys because the price just broke higher.", bucket: 0, why: "Buying into a rise: momentum." },
          ],
          cite: MOM,
        },
        {
          kind: "choice",
          q: "Which orders does Harris say contrarians can use to implement their strategies?",
          options: ["Standard limit orders", "Stop orders", "Market-on-close orders", "Spread orders"],
          answer: 0,
          why: "Contrarians buy on dips and sell on rallies, which **standard limit orders** do naturally.",
          cite: CONTRA_LIMIT,
        },
        {
          kind: "truefalse",
          q: "Momentum traders often give stop orders to their brokers, who then watch the market for them.",
          answer: true,
          why: "A buy stop buys after a rise and a sell stop sells after a fall: a momentum strategy the **broker monitors**.",
          cite: MOM_STOPS,
        },
        {
          kind: "multi",
          q: "Who does Harris say is concerned about the destabilizing effects of stop orders and momentum strategies?",
          options: ["Regulators", "Traders", "Exchanges", "Accountants"],
          answer: [0, 1, 2],
          why: "**Regulators, traders and exchanges** all worry about stops and momentum strategies.",
          cite: CONCERN,
        },
        {
          kind: "recap",
          points: [
            { text: "Stops **accelerate** price changes: buying in rises, selling in falls.", cite: ACCEL },
            { text: "They demand liquidity when it is **least available**: stop orders tend to destabilize prices.", cite: PT_DESTAB },
            { text: "**Momentum** traders destabilize prices; **contrarians**, often with limit orders, stabilize them.", cite: CONTRA },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "truefalse",
      q: "A stop order always executes exactly at its stop price.",
      answer: false,
      why: "The price at which a stop order executes **may not be the stop price**: in a fast market it can be far away.",
      cite: NOT_STOP,
    },
    {
      kind: "choice",
      q: "You are **short** a stock. Which order caps your loss if the price rises?",
      options: ["A buy stop above the market", "A sell stop below the market", "A buy limit below the market", "A sell limit above the market"],
      answer: 0,
      why: "A **buy stop** buys only after price rises to the stop, closing the short before the loss grows.",
      cite: STOP_WHEN,
    },
    {
      kind: "fill",
      q: "Orders with stop instructions are called ___ orders. Used to cap losses, traders often call them stop ___ orders.",
      bank: ["stop", "loss", "limit", "touch", "gain"],
      answer: ["stop", "loss"],
      why: "Orders with stop instructions are **stop orders**; used against losses, they are **stop loss** orders.",
      cite: CALLED,
    },
    {
      kind: "choice",
      q: "According to Table 4-4, what is the main disadvantage of a **stop market order**?",
      options: ["Price impact can be large", "It may never execute", "The trader loses control over the broker", "It supplies liquidity"],
      answer: 0,
      why: "A stop market order demands liquidity when it is least available, so its **price impact can be large**.",
      cite: T44_STOP,
    },
    {
      kind: "truefalse",
      q: "Traders often call a market sell order with a stop price under their long position a stop loss order.",
      answer: true,
      why: "Used to stop losses, such orders are called **stop loss orders**.",
      cite: STOP_LOSS,
    },
  ],
};
