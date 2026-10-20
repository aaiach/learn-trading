// 4.7 TICK-SENSITIVE ORDERS (p. 81)
import type { Cite, Unit } from "../types.ts";
import { DynamicLimit, KoTape, SkiChart } from "./illus/u47.tsx";
import { TickTape } from "./games/TickTape.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const CLASSIFY = c(81, "4.7", "Traders classify prices by their relation to previous prices.");
const TICKS = c(81, "4.7", "Price is on an uptick if the current price is higher than the last price, a downtick if lower, and a zero tick if the same.");
const ZERO = c(81, "4.7", "A zero tick price is on a zero downtick if the last different price was higher and a zero uptick if it was lower.");
const KO_BOX = { box: "Tick Examples" };
const KO_DOWN = c(81, "4.7", "KO is on a downtick because 56.05 is less than 56.08.", KO_BOX);
const KO_ZERO = c(81, "4.7", "KO now trades three times, all at 56.05. KO is now on a zero downtick.", KO_BOX);
const KO_UP = c(81, "4.7", "You now try to sell KO for 56.07. If you succeed, you will sell on an uptick.", KO_BOX);

const CONDITION = c(81, "4.7", "Traders who want to condition their orders on the last price change submit tick-sensitive orders.");
const BUY_DOWN = c(81, "4.7", "A buy downtick order can be filled only on a downtick or zero downtick price. The trade price must be lower than the last different price.");
const SELL_UP = c(81, "4.7", "Likewise, a sell uptick order can be filled only on an uptick or zero uptick. The trade price must be higher than the last different price.");
const HOLD = c(81, "4.7", "If this is not possible, they hold these orders until an opportunity to fill them arises.");
const SKI_BOX = { box: "Tick-Sensitive Order Example" };
const SKI_WANT = c(81, "4.7", "You want to buy American Skiing (SKI) at less than the ask price, but you are not available to cancel and resubmit your orders if prices rise.", SKI_BOX);
const SKI_START = c(81, "4.7", "When your broker receives your order, SKI is on a zero uptick at 1.02. Your broker cannot buy SKI for you until price drops to or below 1.01.", SKI_BOX);
const SKI_RISE = c(81, "4.7", "Unfortunately, price rises to 1.03. Now the maximum price your broker can pay is 1.02.", SKI_BOX);
const SKI_FILL = c(81, "4.7", "When a market sell order arrives, you buy for 1.02.", SKI_BOX);

const NO_IMPACT = c(81, "4.7.1", "The tick condition ensures that tick-sensitive orders have no market impact.");
const NO_BID_UP = c(81, "4.7.1", "A broker holding a buy downtick order cannot bid up prices to encourage sellers.");
const SUPPLY = c(81, "4.7.1", "Since tick orders cannot have market impact, traders cannot use them to demand liquidity. Since they allow other traders to trade when they want to trade, tick-sensitive orders supply liquidity.");
const DYNAMIC = c(81, "4.7.1", "Tick-sensitive orders are essentially limit orders with dynamically adjusting limit prices.");
const STRATEGY = c(81, "4.7.1", "Submit a buy limit order just below the last different price. If price rises, raise the limit price to a price just below the new price. If price falls, leave the limit price alone.");
const FAST = c(81, "4.7.1", "Dynamic limit order submission strategies are almost impossible to implement effectively in fast markets.");
const TICK_DEF = c(81, "4.7.1", "The minimum price increment—also called the tick or the minimum price variation—is the smallest amount by which two prices can differ.");
const SET_BY = c(81, "4.7.1", "It is usually set by exchange regulations.");
const LARGE_TICK = c(81, "4.7.1", "Tick-sensitive orders are most attractive when the minimum price increment is large.");
const ONE_TICK = c(81, "4.7.1", "Traders who use tick-sensitive orders forgo taking liquidity in exchange for a price that typically is just one tick better.");
const DECIMAL = c(81, "4.7.1", "The decimalization of the U.S. stock markets in 2000 decreased the minimum price increment for most stocks from one-sixteenth dollar (6.25 cents) to 1 cent.");
const LESS_ATTR = c(81, "4.7.1", "This change made tick-sensitive orders much less attractive than they used to be.");
const T44_TICK = c(87, "4.12", "Tick sensitive order · Occasional · Supplies liquidity · Must sell on an uptick or buy on a downtick · No price impact; adjusts with the market · Uncertain execution price", { table: "Table 4-4" });

export const U47: Unit = {
  sec: "4.7",
  title: "Tick-Sensitive Orders",
  pages: "81",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "4.7-ticks",
      sec: "4.7",
      title: "Upticks and downticks",
      pages: "81",
      imp: 2,
      steps: [
        { kind: "idea", title: "Every trade has a direction", body: "Traders label each trade price by comparing it with the **prices before it**.", cite: CLASSIFY },
        {
          kind: "definition",
          term: "Uptick, downtick, zero tick",
          body: "**Uptick**: the price is higher than the last price. **Downtick**: lower. **Zero tick**: the same.",
          cite: TICKS,
        },
        {
          kind: "see",
          title: "Reading the tape: Coca-Cola",
          illus: KoTape,
          beats: [
            { text: "KO trades at 56.08, then at **56.05**. Lower than the last price: a **downtick**.", cite: KO_DOWN },
            { text: "KO trades again at 56.05. Same price as the last trade: a **zero tick**." },
            { text: "Which kind? Look back to the **last different price**: 56.08, which was higher. So this is a **zero downtick**.", cite: ZERO },
            { text: "Two more trades at 56.05. The last different price is still 56.08: still **zero downticks**.", cite: KO_ZERO },
            { text: "You sell KO at **56.07**, higher than the last price, 56.05: your sale is on an **uptick**.", cite: KO_UP },
          ],
        },
        {
          kind: "truefalse",
          q: "A trade at the **same price** as the trade before it is on a zero tick.",
          answer: true,
          why: "Same price as the last trade: a **zero tick**. Higher is an uptick, lower a downtick.",
          cite: TICKS,
        },
        {
          kind: "definition",
          term: "Zero uptick and zero downtick",
          body: "A zero tick is named after the **last different price**: a **zero downtick** if that price was higher, a **zero uptick** if it was lower.",
          cite: ZERO,
        },
        {
          kind: "choice",
          q: "Trades (our numbers): 20.10, then 20.12, then 20.12. What is the last trade on?",
          options: ["A zero uptick", "A zero downtick", "An uptick", "A downtick"],
          answer: 0,
          why: "The last trade repeats 20.12, so it's a zero tick. The last **different** price, 20.10, was lower: a **zero uptick**.",
          cite: ZERO,
        },
        {
          kind: "game",
          id: "tick-tape",
          title: "Tick tape",
          brief: "Trades print one after another. Label each new print: uptick, downtick, zero uptick or zero downtick. For a zero tick, look back to the **last different price**. Keys 1–4 work too.",
          game: TickTape,
        },
        {
          kind: "choice",
          q: "KO trades at 56.08, then four times at 56.05. What is the last trade on?",
          options: ["A zero downtick", "A zero uptick", "A downtick", "An uptick"],
          answer: 0,
          why: "It repeats 56.05, and the last different price, 56.08, was higher: a **zero downtick**.",
          cite: KO_ZERO,
        },
        {
          kind: "fill",
          q: "A zero tick price is on a zero ___ if the last different price was higher and a zero ___ if it was lower.",
          bank: ["downtick", "uptick", "spread", "touch"],
          answer: ["downtick", "uptick"],
          why: "Coming down from a higher price: **zero downtick**. Coming up from a lower one: **zero uptick**.",
          cite: ZERO,
        },
        {
          kind: "choice",
          q: "After the run of trades at 56.05, you sell KO at **56.07**. Your sale is on…",
          options: ["an uptick", "a zero uptick", "a downtick", "a zero downtick"],
          answer: 0,
          why: "56.07 is higher than the last price, 56.05: an **uptick**.",
          cite: KO_UP,
        },
        {
          kind: "today",
          title: "Upticks still matter to short sellers",
          body: "The old U.S. uptick rule for short sales was removed in 2007. Since **Rule 201** (2010), after a stock falls **10%** from the prior close, short sales are allowed only **above the national best bid** for the rest of that day and the next.",
          source: "SEC Rule 201 (2010)",
        },
        {
          kind: "recap",
          points: [
            { text: "**Uptick**: higher than the last price. **Downtick**: lower. **Zero tick**: the same.", cite: TICKS },
            { text: "A zero tick is a **zero downtick** if the last different price was higher, a **zero uptick** if lower.", cite: ZERO },
            { text: "KO at 56.05 after 56.08 is on a **downtick**; more trades at 56.05 are **zero downticks**.", cite: KO_ZERO },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "4.7.1-tick-orders",
      sec: "4.7.1",
      title: "Tick-sensitive orders",
      pages: "81",
      imp: 2,
      steps: [
        { kind: "idea", title: "Orders that watch the last tick", body: "Some traders make their order depend on the **last price change**. They submit **tick-sensitive orders**.", cite: CONDITION },
        {
          kind: "definition",
          term: "Buy downtick order",
          body: "Fills only on a **downtick or zero downtick**: the trade price must be **below the last different price**.",
          cite: BUY_DOWN,
        },
        {
          kind: "definition",
          term: "Sell uptick order",
          body: "Fills only on an **uptick or zero uptick**: the trade price must be **above the last different price**.",
          cite: SELL_UP,
        },
        {
          kind: "see",
          title: "The SKI order, tick by tick",
          illus: SkiChart,
          beats: [
            { text: "You want SKI **below the ask**, but you can't watch the market to cancel and resubmit. You send a **buy downtick** order.", cite: SKI_WANT },
            { text: "SKI is on a zero uptick at **1.02**. To buy on a downtick, your broker can pay at most **1.01**.", cite: SKI_START },
            { text: "No seller at 1.01 yet. The broker can't fill without breaking the tick condition, so it **holds** the order.", cite: HOLD },
            { text: "SKI rises to **1.03**. The ceiling rises with it: now **1.02**.", cite: SKI_RISE },
            { text: "A market sell order arrives. 1.02 is below the last different price, 1.03: you **buy at 1.02**.", cite: SKI_FILL },
          ],
        },
        {
          kind: "number",
          q: "A buy downtick order is working. SKI's last trade, 1.03, was an uptick. With a one-cent tick, what is the **most** the broker can pay?",
          answer: 1.02,
          tol: 0.001,
          prefix: "$",
          why: "The trade must be **below the last different price**, 1.03. One tick lower is **1.02**, as in the book's SKI example.",
          cite: SKI_RISE,
        },
        {
          kind: "choice",
          q: "Trades (our numbers): 40.10, then 40.05, then 40.05. A **sell uptick** order arrives. What can it sell at?",
          options: ["40.06 or higher", "40.05 or higher", "40.11 or higher", "Any price"],
          answer: 0,
          why: "A sale at 40.05 would be a zero **down**tick (the last different price, 40.10, was higher). It needs an uptick: **above 40.05**.",
          cite: SELL_UP,
        },
        {
          kind: "idea",
          title: "No impact, so they supply liquidity",
          body: "A broker holding a buy downtick order **can't bid prices up**: it waits for a seller. Orders that can't move prices **can't demand liquidity**. They **supply** it.",
          cite: NO_IMPACT,
        },
        {
          kind: "truefalse",
          q: "Traders use tick-sensitive orders when they want to **demand** liquidity.",
          answer: false,
          why: "Tick orders can't have market impact, so they can't demand liquidity. They let others trade when they want: they **supply** liquidity.",
          cite: SUPPLY,
        },
        {
          kind: "see",
          title: "A limit price that only moves up",
          illus: DynamicLimit,
          beats: [
            { text: "A buy downtick order behaves like a **buy limit just below the last different price** (our numbers).", cite: DYNAMIC },
            { text: "Price rises: the limit **rises with it**, staying just below the new price.", cite: STRATEGY },
            { text: "Price falls: the limit **stays put**, and the order can now trade below the last different price." },
            { text: "By hand, every price change means cancel and resubmit. In **fast markets** that is almost impossible.", cite: FAST },
          ],
        },
        {
          kind: "multi",
          q: "Which steps describe the limit order strategy a buy downtick order carries out? (Select all that apply.)",
          options: [
            "Start with a buy limit just below the last different price",
            "When price rises, raise the limit to just below the new price",
            "When price falls, leave the limit alone",
            "When price falls, lower the limit",
            "Cross the spread to trade at once",
          ],
          answer: [0, 1, 2],
          why: "The limit follows prices **up**, never down. It never crosses the spread: that would take liquidity.",
          cite: STRATEGY,
        },
        {
          kind: "definition",
          term: "Minimum price increment",
          aka: ["tick", "minimum price variation"],
          body: "The **smallest amount** by which two prices can differ. It is usually set by **exchange regulations**.",
          cite: TICK_DEF,
        },
        {
          kind: "idea",
          title: "One tick better: worth more when ticks are big",
          body: "A tick-sensitive order gives up taking liquidity for a price usually **one tick better**. So it pays most when the **tick is large**.",
          cite: ONE_TICK,
        },
        {
          kind: "choice",
          q: "Why did U.S. decimalization make tick-sensitive orders much less attractive?",
          options: [
            "The tick fell from 1/16 dollar (6.25¢) to 1¢, so one tick better is worth much less",
            "Decimalization banned orders conditioned on the last price change",
            "Prices started moving only in whole dollars",
            "Brokers stopped holding orders for their clients",
          ],
          answer: 0,
          why: "The order's reward is about **one tick**. A 1¢ tick is worth far less than a 6.25¢ tick.",
          cite: DECIMAL,
        },
        {
          kind: "today",
          title: "Decimal prices since 2001",
          body: "U.S. stocks finished decimalizing on **29 January 2001** (NYSE) and **9 April 2001** (Nasdaq). **Rule 612** bars quotes in steps below **1 cent** for stocks priced $1 or more.",
          source: "SEC decimalization orders; Regulation NMS Rule 612",
        },
        {
          kind: "recap",
          points: [
            { text: "**Buy downtick**: only below the last different price. **Sell uptick**: only above it.", cite: BUY_DOWN },
            { text: "No market impact, so tick orders **supply liquidity**; they act like limits that follow prices up.", cite: DYNAMIC },
            { text: "Their edge is about **one tick**, so a large tick makes them attractive; 1¢ ticks made them much less so.", cite: LESS_ATTR },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "truefalse",
      q: "A broker holding a buy downtick order may bid prices up to encourage sellers.",
      answer: false,
      why: "It **cannot** bid prices up: it must wait for someone willing to trade below the last different price. That is why the order has no market impact.",
      cite: NO_BID_UP,
    },
    {
      kind: "truefalse",
      q: "A buy downtick order can be filled on an uptick.",
      answer: false,
      why: "A buy downtick order fills only on a **downtick or zero downtick**: below the last different price.",
      cite: BUY_DOWN,
    },
    {
      kind: "choice",
      q: "The minimum price increment is also called…",
      options: ["the tick", "the spread", "the touch", "the uptick"],
      answer: 0,
      why: "The minimum price increment is also called the **tick** or the **minimum price variation**.",
      cite: TICK_DEF,
    },
    {
      kind: "fill",
      q: "Tick-sensitive orders are essentially ___ orders with ___ adjusting limit prices.",
      bank: ["limit", "dynamically", "market", "stop", "rarely"],
      answer: ["limit", "dynamically"],
      why: "A buy downtick order is a buy **limit** whose price adjusts **dynamically**: up with prices, never down.",
      cite: DYNAMIC,
    },
    {
      kind: "choice",
      q: "Trades (our numbers): 15.20, 15.18, 15.18, 15.18. What is the last trade on?",
      options: ["A zero downtick", "A zero uptick", "A downtick", "An uptick"],
      answer: 0,
      why: "A repeat of 15.18, and the last different price, 15.20, was higher: a **zero downtick**.",
      cite: ZERO,
    },
    {
      kind: "truefalse",
      q: "Tick-sensitive orders are most attractive when the minimum price increment is **small**.",
      answer: false,
      why: "They are most attractive when the tick is **large**: their reward is a price about one tick better.",
      cite: LARGE_TICK,
    },
    {
      kind: "choice",
      q: "In Table 4-4, what is the disadvantage of a tick-sensitive order?",
      options: ["Uncertain execution price", "Price impact can be large", "The trader loses control over the broker", "It demands immediacy"],
      answer: 0,
      why: "Table 4-4: no price impact and it adjusts with the market, but the **execution price is uncertain**.",
      cite: T44_TICK,
    },
    {
      kind: "choice",
      q: "Who usually sets the minimum price increment?",
      options: ["Exchange regulations", "Each broker, for its own clients", "The buyer and seller in each trade", "Clearinghouses"],
      answer: 0,
      why: "The tick is the smallest amount by which two prices can differ, and it is usually **set by exchange regulations**.",
      cite: SET_BY,
    },
  ],
};
