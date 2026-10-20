// 4.11 OTHER ORDER INSTRUCTIONS (pp. 84–86), then 4.12 Summary, Table 4-4 and 4.13 Some Points to Remember (pp. 86–88).
import type { Cite, Unit } from "../types.ts";
import { FulvioRoll, IcebergFill, OrderSpectrum, PointsLimitStop, PointsMarket, SpinoffWeek, SteveSubstitution } from "./illus/u411.tsx";
import { IcebergHunter } from "./games/IcebergHunter.tsx";
import { OrderDesk } from "./games/OrderDesk.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 4.11.1 Spread orders (p. 84) ──────────────────────────────────
const SPREAD = c(84, "4.11.1", "Traders issue spread orders when they want to buy one instrument and simultaneously sell another instrument.");
const RELATED = c(84, "4.11.1", "The two instruments usually are closely related. For example, they may be futures contracts for different delivery months of the same commodity.");
const SPREAD_KINDS = c(84, "4.11.1", "Spread orders can be market orders or limit orders.");
const PREMIUM = c(84, "4.11.1", "Traders always specify the limit as a premium to the buy side or to the sell side.");
const SELL_SIDE = c(84, "4.11.1", "If you want to sell one instrument at a higher price than you want to pay to buy the other instrument, the premium is to the sell side.");
const SELL_FILL = c(84, "4.11.1", "The order can be filled only if the difference between the sales and purchase prices is greater than or equal to the limit.");
const BUY_SIDE = c(84, "4.11.1", "If the instrument you want to buy is priced above the instrument that you want to sell, the premium is to the buy side.");
const BUY_FILL = c(84, "4.11.1", "In that case, the order can be filled only if the difference between the purchase and sales prices is less than or equal to the limit.");
const ROLL_BOX = { box: "Rolling a Futures Position with a Spread Order" };
const FULVIO = c(84, "4.11.1", "In early June, Fulvio wants to roll a long S&P 500 Index futures position from the expiring June contract into the September contract.", ROLL_BOX);
const FULVIO_ORDER = c(84, "4.11.1", "He issues a spread order to sell the June contract and to buy the September contract.", ROLL_BOX);
const FULVIO_PRICES = c(84, "4.11.1", "The last trade prices for the June and September contracts were respectively 1276 and 1289, which implies a spread of 13.", ROLL_BOX);
const BACK_PREMIUM = c(84, "4.11.1", "As is usual, the back month trades at a premium to the current month.", ROLL_BOX);
const FULVIO_LIMIT = c(84, "4.11.1", "Fulvio places a limit of 10, premium to the buy side, on the spread order. The spread, however, never drops to his limit, and the order does not execute.", ROLL_BOX);
const FULVIO_MKT = c(84, "4.11.1", "Fulvio subsequently replaces his limit spread order with a market spread order. The order then executes at a spread of 12.", ROLL_BOX);

// ── Excerpts: 4.11.2 Display instructions (pp. 84–85) ───────────────────────
const DISPLAY = c(84, "4.11.2", "Traders give display instructions when they want to specify how their brokers should display unfilled portions of their standing limit orders.");
const MAXQ = c(84, "4.11.2", "These instructions typically tell brokers to show no more than some maximum quantity.");
const FEAR = c(84, "4.11.2", "Traders restrict the display of their orders when they fear that showing their full sizes would cause the market to move away from them.");
const NAMES = c(85, "4.11.2", "Traders also call them hidden orders, or reserve orders (because they hold some size in reserve), or iceberg orders (because other traders can see only the top of the order).");
const FILL_FIRST = c(85, "4.11.2", "To fill an undisclosed order, a broker must fill the exposed portion first.");
const REPLENISH = c(85, "4.11.2", "As the order fills, the broker can then expose more size up to the maximum display quantity. This process continues until the broker fills the entire order.");
const EURONEXT = c(85, "4.11.2", "Some electronic exchanges, such as the Euronext, permit traders to issue undisclosed limit orders.");
const DISCOVER = c(85, "4.11.2", "Traders who want to trade with these orders can discover their full sizes only by submitting large marketable orders with fill-or-kill instructions attached.");
const PRESENT = c(85, "4.11.2", "If the size is present, they trade. If it is not, their orders cancel.");
const ICE_BOX = { box: "Undisclosed Order Example" };
const MICHAEL = c(85, "4.11.2", "Michael wants to sell 90,000 shares of Alcatel Cable at the Euronext Paris Bourse.", ICE_BOX);
const M_AFRAID = c(85, "4.11.2", "He is willing to display only 10,000 shares at a time because he is afraid that revealing his full size might move the market down.", ICE_BOX);
const M_ORDER = c(85, "4.11.2", "He places an undisclosed limit order to sell 90,000 shares at 408 francs, with instructions to display only 10,000 shares.", ICE_BOX);
const LIZA_HIDDEN = c(85, "4.11.2", "She knows that more shares may be hidden behind the 10,000 displayed shares.", ICE_BOX);
const LIZA_FOK = c(85, "4.11.2", "Liza submits a fill-or-kill limit order to buy 60,000 shares for 408 francs.", ICE_BOX);
const LIZA_SURE = c(85, "4.11.2", "She can be sure of trading at least 10,000 shares.", ICE_BOX);
const ICE_FILLED = c(85, "4.11.2", "When the Bourse's automated trading system receives Liza's order, it immediately fills the entire order.", ICE_BOX);
const ICE_REST = c(85, "4.11.2", "The 30,000-share remainder of Michael's sell order will stay in the system with 10,000 shares displayed at 408 francs and another 20,000 undisclosed shares behind it.", ICE_BOX);

// ── Excerpts: 4.11.3 Substitution orders (p. 85) ────────────────────────────
const SUBST = c(85, "4.11.3", "Traders give substitution orders to their brokers when they want to invest or divest a specified amount of money by trading any of several securities.");
const DISCRETION = c(85, "4.11.3", "The brokers then use their discretion to choose which securities to trade, based on which ones appear to provide the best prices.");
const SUB_BOX = { box: "Substitution Order Example" };
const STEVE_WANT = c(85, "4.11.3", "Steve wants the stock portfolio he manages to have more automobile industry exposure.", SUB_BOX);
const STEVE_ANY = c(85, "4.11.3", "He does not care whether he buys Ford, General Motors, or Chrysler, as long as he gets a good price for his purchase.", SUB_BOX);
const STEVE_35 = c(85, "4.11.3", "Steve instructs his broker to buy 35 million dollars of Ford, General Motors, or Chrysler.", SUB_BOX);
const STEVE_GM = c(85, "4.11.3", "He learns that a large buyer is accumulating GM and pushing prices up.", SUB_BOX);
const STEVE_FILL = c(85, "4.11.3", "He therefore buys Ford and Chrysler to fill the order.", SUB_BOX);

// ── Excerpts: 4.11.4 Special settlement instructions (pp. 85–86) ────────────
const SPECIAL = c(85, "4.11.4", "Traders attach special settlement instructions to their orders when they want nonstandard settlement.");
const REGULAR = c(85, "4.11.4", "In U.S. equity markets, regular-way settlement occurs three days after the trade (T +3).");
const CASH = c(85, "4.11.4", "The most common nonstandard settlement is cash settlement. Cash settlement trades settle that day.");
const RECORD = c(85, "4.11.4", "Traders typically specify cash settlement when they decide at the last moment that they want to be a shareholder of record before a vote or before some distribution.");
const DIVCAP = c(85, "4.11.4", "Traders also use special settlement instructions when they pursue dividend capture strategies.");
const HARDER = c(85, "4.11.4", "Orders with special settlement instructions are more difficult to trade than are regular orders.");
const NEGOTIATE = c(86, "4.11.4", "Instead, they must negotiate for it. If no one wants to provide special settlement, these orders will not fill.");
const FEES = c(86, "4.11.4", "Some brokers charge higher fees for special settlement because of the greater costs of arranging and settling these trades.");
const CASH_BOX = { box: "Cash Settlement Example" };
const SPIN = c(86, "4.11.4", "In two weeks, ABC will spin off its XYZ division to its shareholders. All shareholders of record tomorrow will receive one share of XYZ for every share of ABC that they own.", CASH_BOX);
const SPIN_REG = c(86, "4.11.4", "If you buy ABC today with normal three-day settlement, your trade will settle on Tuesday, and you will not receive the XYZ shares.", CASH_BOX);
const SPIN_CASH = c(86, "4.11.4", "If you buy ABC today with cash settlement, you will be a shareholder of record tomorrow, and you will own both companies.", CASH_BOX);
const SPIN_LAST = c(86, "4.11.4", "With regular-way settlement, the last day that you could have bought ABC and still have been entitled to receive the distribution was two days ago (Tuesday).", CASH_BOX);
const SPIN_FELL = c(86, "4.11.4", "On Wednesday, the price of ABC fell because buyers were no longer entitled to receive XYZ.", CASH_BOX);
const SPIN_HIGHER = c(86, "4.11.4", "The price you pay for your cash purchase on Thursday will therefore be substantially higher than the normal-way price because you will receive two companies instead of one.", CASH_BOX);

// ── Excerpts: 4.12 Summary, Table 4-4, 4.13 Points (pp. 86–88) ──────────────
const SUM_TWO = c(86, "4.12", "The most important and most common order types are market orders and limit orders.");
const SUM_UNCERTAIN = c(86, "4.12", "Traders who use market orders are uncertain about the prices at which they will trade. Conversely, traders who use limit orders are uncertain about whether they will trade.");
const SUM_OPTIONS = c(86, "4.12", "Traders who use limit orders grant trading options to the market because they allow other traders to trade when they want to.");
const SUM_TAKE = c(86, "4.12", "Traders who exercise these options take liquidity. Traders generally use market orders when they want to take liquidity.");
const T44 = (t: string): Cite => c(87, "4.12", t, { table: "Table 4-4" });
const T44_IMMEDIACY = T44("Market order · Demands immediacy · Marketable limit order · Demands immediacy");
const T44_SUPPLY = T44("Standing limit order · Supplies liquidity · Tick sensitive order · Supplies liquidity");
const T44_STOPS = T44("Stop market order · Demands liquidity when it is least available · Stop limit order · Triggered when liquidity is least available; offers liquidity on the side not needed");
const T44_OTHERS = T44("Market-if-touched order · Demands immediacy and supplies resiliency · Market-not-held order · Broker decides whether to offer or take liquidity");
const T44_DISADV = T44("Market order · Uncertain price impact · Standing limit order · May never execute · Stop market order · Price impact can be large · Market-not-held order · Trader loses control over the broker");
const T44_LIQ = T44("Market order · Demands immediacy · Standing limit order · Supplies liquidity · Marketable limit order · Demands immediacy · Tick sensitive order · Supplies liquidity · Stop market order · Demands liquidity when it is least available");
const P1 = c(86, "4.13", "Traders use stylized order instructions to reduce communication errors.");
const P2 = c(86, "4.13", "Market order traders demand immediacy.");
const P3 = c(86, "4.13", "The bid/ask spread is the cost of immediacy for small market orders.");
const P4 = c(88, "4.13", "Large market orders can have substantial and unpredictable price impacts.");
const P5 = c(88, "4.13", "Limit order traders supply liquidity by granting trading options to other traders.");
const P6 = c(88, "4.13", "Limit order traders who must fill their orders can lose substantially if their orders do not fill when the market moves away from them.");
const P7 = c(88, "4.13", "Some traders use limit orders to participate in the market when they are not present.");
const P8 = c(88, "4.13", "Stop orders are not limit orders.");
const P9 = c(88, "4.13", "Stop orders tend to destabilize prices.");

export const U411: Unit = {
  sec: "4.11",
  title: "Other Order Instructions",
  pages: "84–88",
  lessons: [
    // ── Lesson 1 · 4.11.1 ─────────────────────────────────────────────────
    {
      id: "4.11.1-spread-orders",
      sec: "4.11.1",
      title: "Spread orders",
      pages: "84",
      imp: 2,
      steps: [
        { kind: "definition", term: "Spread orders", body: "One order that **buys** one instrument and **simultaneously sells** another.", cite: SPREAD },
        { kind: "idea", title: "Two legs, closely related", body: "The two instruments are usually **closely related**, such as futures on the same commodity for **different delivery months**.", cite: RELATED },
        {
          kind: "see",
          title: "Rolling a futures position in one order",
          illus: FulvioRoll,
          beats: [
            { text: "Early June. Fulvio is **long** the June S&P 500 futures contract, which is about to **expire**.", cite: FULVIO },
            { text: "One spread order does both legs: **sell June**, **buy September**. That is a **roll**.", cite: FULVIO_ORDER },
            { text: "Last trades: June **1276**, September **1289**. The spread is 1289 − 1276 = **13**: the back month is the dearer one.", cite: FULVIO_PRICES },
            { text: "He buys the dearer leg, so he sets a limit of **10, premium to the buy side**. The spread never drops to 10: **no fill**.", cite: FULVIO_LIMIT },
            { text: "He replaces it with a **market** spread order. It fills at a spread of **12**, and his position now sits in September.", cite: FULVIO_MKT },
          ],
        },
        {
          kind: "number",
          q: "June last traded at 1276 and September at 1289. What spread do these prices imply?",
          answer: 13,
          why: "1289 − 1276 = **13** points.",
          cite: FULVIO_PRICES,
        },
        {
          kind: "choice",
          q: "What did Fulvio's spread order instruct his broker to do?",
          options: ["Sell the June contract and buy the September contract", "Buy the June contract and sell the September contract", "Sell June now and buy September after June settles", "Buy both contracts at the market"],
          answer: 0,
          why: "Both legs in **one** order: sell the expiring June contract, buy September.",
          cite: FULVIO_ORDER,
        },
        {
          kind: "truefalse",
          q: "In Fulvio's example, the back month trades at a premium to the current month.",
          answer: true,
          why: "September (1289) is above June (1276), as is usual.",
          cite: BACK_PREMIUM,
        },
        { kind: "idea", title: "The limit is a premium to one side", body: "A limit spread order caps the **difference** between the two prices, stated as a **premium to the buy side** or **to the sell side**: whichever leg is priced higher.", cite: PREMIUM },
        {
          kind: "classify",
          q: "Premium to which side?",
          buckets: ["To the buy side", "To the sell side"],
          items: [
            { text: "Buy September at 1289, sell June at 1276.", bucket: 0, why: "The leg you buy is the dearer one." },
            { text: "Sell a contract at 52 and buy another at 50 (our numbers).", bucket: 1, why: "You sell the dearer leg." },
            { text: "Roll a long position into a pricier back month.", bucket: 0, why: "Rolling long means buying the dearer back month." },
            { text: "Roll a short position into a pricier back month.", bucket: 1, why: "Rolling short means selling the dearer back month." },
          ],
          cite: SELL_SIDE,
        },
        {
          kind: "truefalse",
          q: "With a limit of 10, premium to the buy side, Fulvio's order could have filled at a spread of 12.",
          answer: false,
          why: "Premium to the buy side fills only if the difference is **at or below** the limit: 12 is above 10.",
          cite: BUY_FILL,
        },
        {
          kind: "choice",
          q: "You sell one contract and buy another with a limit of 3, premium to the sell side (our numbers). Which spread lets the order fill?",
          options: ["Sale price 4 above purchase price", "Sale price 2 above purchase price", "Sale price 1 above purchase price", "Both prices equal"],
          answer: 0,
          why: "Premium to the sell side fills only if sale minus purchase is **at least** the limit: 4 ≥ 3.",
          cite: SELL_FILL,
        },
        {
          kind: "fill",
          q: "Spread orders can be ___ orders or ___ orders.",
          bank: ["market", "limit", "stop", "substitution"],
          answer: ["market", "limit"],
          why: "Fulvio tried a **limit** spread order first, then a **market** one.",
          cite: SPREAD_KINDS,
        },
        {
          kind: "recap",
          points: [
            { text: "A **spread order** buys one instrument and simultaneously sells a related one.", cite: SPREAD },
            { text: "Its limit is a **premium to the buy side** (fills at or below) or **to the sell side** (fills at or above).", cite: PREMIUM },
            { text: "Fulvio's limit of 10 never filled; his **market** spread order filled at **12**.", cite: FULVIO_MKT },
          ],
        },
      ],
    },

    // ── Lesson 2 · 4.11.2 ─────────────────────────────────────────────────
    {
      id: "4.11.2-icebergs",
      sec: "4.11.2",
      title: "Hidden and iceberg orders",
      pages: "84–85",
      imp: 3,
      steps: [
        { kind: "definition", term: "Display instructions", body: "Tell your broker how much of the **unfilled part** of a standing limit order to show: usually **no more than** a maximum quantity.", cite: DISPLAY },
        { kind: "idea", title: "Why hide your size", body: "Showing your **full size** can make the market **move away** from you. So large traders show only part of it.", cite: FEAR },
        {
          kind: "definition",
          term: "Undisclosed orders",
          aka: ["hidden orders", "reserve orders", "iceberg orders"],
          body: "Orders that are **not fully displayed**: other traders see only the **top**; the rest waits **in reserve**.",
          cite: NAMES,
        },
        {
          kind: "see",
          title: "Michael's iceberg meets Liza",
          illus: IcebergFill,
          beats: [
            { text: "Michael wants to sell **90,000** Alcatel at the Euronext Paris Bourse.", cite: MICHAEL },
            { text: "He shows only **10,000** at **408** francs. The other **80,000** wait below the surface.", cite: M_ORDER },
            { text: "Liza wants **60,000** but sees only 10,000. She sends a **fill-or-kill** buy for 60,000 at 408.", cite: LIZA_FOK },
            { text: "The system fills all **60,000**: the shown 10,000 first, then more from the reserve, 10,000 at a time.", cite: ICE_FILLED },
            { text: "**30,000** remain: 10,000 shown again at 408, and **20,000** still hidden behind them.", cite: ICE_REST },
          ],
        },
        {
          kind: "number",
          q: "Michael offers 90,000 shares and displays 10,000. How many shares are hidden when he places the order?",
          answer: 80000,
          unit: "shares",
          why: "90,000 − 10,000 = **80,000** in reserve.",
          cite: M_ORDER,
        },
        {
          kind: "number",
          q: "Liza buys 60,000 of Michael's 90,000 shares. Of the shares left, how many are still hidden?",
          answer: 20000,
          unit: "shares",
          why: "30,000 remain: **10,000** displayed and **20,000** undisclosed.",
          cite: ICE_REST,
        },
        {
          kind: "choice",
          q: "Liza sees 10,000 shares offered at 408 and sends a fill-or-kill buy for 60,000 at 408. How many shares can she be sure to trade?",
          options: ["At least 10,000", "Exactly 60,000", "No more than 10,000", "None: hidden shares can't trade"],
          answer: 0,
          why: "The **displayed** 10,000 are certain; anything more depends on the hidden reserve. Here the book uses fill-or-kill as in §4.9, a name for **immediate-or-cancel**: what can't fill cancels. Today's stricter fill-or-kill would be all 60,000 or nothing.",
          cite: LIZA_SURE,
        },
        { kind: "idea", title: "Exposed part first", body: "The broker fills the **exposed portion first**, then shows more, up to the **display maximum**, until the whole order is filled.", cite: FILL_FIRST },
        {
          kind: "order",
          q: "Put the life of an iceberg order in order.",
          items: ["The displayed tip trades", "The broker shows more size from the reserve", "That newly shown size trades", "The cycle repeats until the whole order is filled"],
          why: "Exposed first, then refill up to the display maximum, again and again.",
          cite: REPLENISH,
        },
        { kind: "idea", title: "How to find the hidden size", body: "You can't see the reserve. The only way to discover it: send a **large marketable fill-or-kill** order. If the size is there, you **trade**; if not, your order **cancels**.", cite: DISCOVER },
        {
          kind: "game",
          id: "iceberg-hunter",
          title: "Iceberg hunter",
          brief: "An offer shows only its tip. Probe it with **fill-or-kill** buys: if the size is there, you trade it all; if not, the order cancels. Take the **whole iceberg** with as few probes as you can.",
          game: IcebergHunter,
        },
        {
          kind: "multi",
          q: "Which are other names for undisclosed orders? (Select all that apply.)",
          options: ["Hidden orders", "Reserve orders", "Iceberg orders", "Spread orders", "Substitution orders"],
          answer: [0, 1, 2],
          why: "Hidden, **reserve** (size held in reserve) and **iceberg** (only the top shows).",
          cite: NAMES,
        },
        {
          kind: "truefalse",
          q: "To fill an undisclosed order, a broker may trade the hidden shares before the displayed ones.",
          answer: false,
          why: "The broker must fill the **exposed portion first**.",
          cite: FILL_FIRST,
        },
        {
          kind: "today",
          title: "Icebergs are standard now",
          body: "Most electronic exchanges now offer **reserve (iceberg)** orders that display part of the size, and many offer **fully hidden** orders.",
          source: "Exchange order type guides (e.g., Nasdaq, CME)",
        },
        {
          kind: "recap",
          points: [
            { text: "**Display instructions** show no more than a maximum quantity of a standing limit order.", cite: MAXQ },
            { text: "**Undisclosed** = hidden = reserve = **iceberg** orders; the exposed part fills first.", cite: NAMES },
            { text: "Their full size shows only to **large marketable fill-or-kill** orders.", cite: DISCOVER },
          ],
        },
      ],
    },

    // ── Lesson 3 · 4.11.3 ─────────────────────────────────────────────────
    {
      id: "4.11.3-substitution",
      sec: "4.11.3",
      title: "Substitution orders",
      pages: "85",
      imp: 1,
      steps: [
        { kind: "definition", term: "Substitution orders", body: "Invest or divest a **set amount of money** by trading **any of several** securities.", cite: SUBST },
        { kind: "idea", title: "The broker picks", body: "The broker uses its **discretion**: it trades whichever securities appear to offer the **best prices**.", cite: DISCRETION },
        {
          kind: "see",
          title: "Steve's $35 million of car stocks",
          illus: SteveSubstitution,
          beats: [
            { text: "Steve wants **more auto industry exposure** in the portfolio he manages.", cite: STEVE_WANT },
            { text: "Ford, GM or Chrysler: any will do at a good price. He tells his broker to buy **$35 million** of them.", cite: STEVE_35 },
            { text: "The broker sees a **large buyer** accumulating GM and pushing its price **up**.", cite: STEVE_GM },
            { text: "So he fills the order with **Ford and Chrysler**, and leaves GM alone.", cite: STEVE_FILL },
          ],
        },
        {
          kind: "choice",
          q: "Why did Steve's broker skip GM?",
          options: ["A large buyer was pushing GM's price up", "GM is not an automobile stock", "Steve had banned GM", "Substitution orders can only buy two stocks"],
          answer: 0,
          why: "The broker bought where prices looked **best**: GM was being pushed up.",
          cite: STEVE_GM,
        },
        {
          kind: "fill",
          q: "Steve instructs his broker to buy 35 million ___ of Ford, General Motors, or Chrysler.",
          bank: ["dollars", "shares", "contracts", "bonds"],
          answer: ["dollars"],
          why: "A substitution order sets an **amount of money**, not a number of shares.",
          cite: STEVE_35,
        },
        {
          kind: "truefalse",
          q: "Steve cares which of the three car makers his broker buys.",
          answer: false,
          why: "He doesn't care, as long as he gets a **good price**.",
          cite: STEVE_ANY,
        },
        {
          kind: "classify",
          q: "Substitution order or not?",
          buckets: ["Substitution order", "Something else"],
          items: [
            { text: "Buy $10 million of any of three oil majors, wherever prices look best.", bucket: 0, why: "A money amount, any of several securities." },
            { text: "Buy 500 GM at 48.05 or better.", bucket: 1, why: "One stock, a limit price: a limit order." },
            { text: "Sell $5 million of any of my bank stocks, best prices first.", bucket: 0, why: "Divesting money across several securities." },
            { text: "Sell June and buy September S&P 500 futures.", bucket: 1, why: "Two named legs at once: a spread order." },
          ],
          cite: SUBST,
        },
        {
          kind: "choice",
          q: "Who chooses which securities a substitution order trades?",
          options: ["The broker, based on which appear to offer the best prices", "The exchange, by lottery", "The trader, security by security", "The clearinghouse"],
          answer: 0,
          why: "The broker uses its **discretion**, guided by prices.",
          cite: DISCRETION,
        },
        {
          kind: "recap",
          points: [
            { text: "A **substitution order** invests or divests a set **amount of money** in any of several securities.", cite: SUBST },
            { text: "The **broker** picks the securities that appear to offer the best prices.", cite: DISCRETION },
            { text: "Steve's broker saw GM pushed up, so he bought **Ford and Chrysler**.", cite: STEVE_FILL },
          ],
        },
      ],
    },

    // ── Lesson 4 · 4.11.4 ─────────────────────────────────────────────────
    {
      id: "4.11.4-settlement",
      sec: "4.11.4",
      title: "Special settlement instructions",
      pages: "85–86",
      imp: 2,
      steps: [
        { kind: "definition", term: "Special settlement instructions", body: "Instructions attached to an order when you want **nonstandard settlement**: a different settlement date.", cite: SPECIAL },
        { kind: "idea", title: "Regular way: T+3 in the book", body: "When the book was written, U.S. stock trades settled **regular way**: **three days** after the trade, or **T+3**.", cite: REGULAR },
        { kind: "definition", term: "Cash settlement", body: "The most common nonstandard settlement: the trade **settles the same day**.", cite: CASH },
        { kind: "idea", title: "Why pay for speed", body: "Traders ask for cash settlement when they decide **at the last moment** to become a **shareholder of record** before a vote or a distribution.", cite: RECORD },
        {
          kind: "see",
          title: "Buying in time for a spin-off",
          illus: SpinoffWeek,
          beats: [
            { text: "It's **Thursday**. ABC will spin off XYZ: every shareholder **of record tomorrow** (Friday) gets one XYZ share per ABC share.", cite: SPIN },
            { text: "Buy ABC today **regular way** (T+3) and it settles on **Tuesday**: too late, no XYZ shares.", cite: SPIN_REG },
            { text: "Buy it with **cash settlement** and it settles **today**: you're a shareholder of record tomorrow and own **both** companies.", cite: SPIN_CASH },
            { text: "The last regular-way day to buy and still get XYZ was **Tuesday**. On **Wednesday**, ABC's price **fell**.", cite: SPIN_FELL },
            { text: "So your cash purchase today costs **substantially more** than the regular-way price: you get **two** companies, not one.", cite: SPIN_HIGHER },
          ],
        },
        {
          kind: "choice",
          q: "It's Thursday and the record date is Friday. You buy ABC regular way (T+3). When does the trade settle?",
          options: ["Tuesday", "Friday", "Thursday", "Monday"],
          answer: 0,
          why: "Three business days after Thursday: Friday, Monday, **Tuesday**, after the record date.",
          cite: SPIN_REG,
        },
        {
          kind: "choice",
          q: "With regular-way settlement, what was the last day to buy ABC and still receive XYZ?",
          options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
          answer: 0,
          why: "Tuesday + 3 business days = **Friday**, the record date.",
          cite: SPIN_LAST,
        },
        {
          kind: "truefalse",
          q: "Your cash-settled purchase of ABC on Thursday costs about the same as a regular-way purchase.",
          answer: false,
          why: "It costs **substantially more**: the cash buyer gets XYZ too.",
          cite: SPIN_HIGHER,
        },
        { kind: "idea", title: "Negotiated, not demanded", body: "You can't simply **demand** special settlement: you must **negotiate** for it. If nobody provides it, the order **won't fill**.", cite: NEGOTIATE },
        {
          kind: "multi",
          q: "Why are orders with special settlement harder to trade? (Select all that apply.)",
          options: ["They must be negotiated, not demanded", "If nobody provides special settlement, they don't fill", "Some brokers charge higher fees for them", "Exchanges ban them outright", "They always settle T+3"],
          answer: [0, 1, 2],
          why: "Special settlement has to be **arranged**, may not be available, and can cost more.",
          cite: FEES,
        },
        {
          kind: "fill",
          q: "The most common nonstandard settlement is ___ settlement. These trades settle ___.",
          bank: ["cash", "that day", "regular-way", "in three days", "physical"],
          answer: ["cash", "that day"],
          why: "**Cash settlement** trades settle **the same day**.",
          cite: CASH,
        },
        {
          kind: "choice",
          q: "Besides becoming a shareholder of record, which strategy uses special settlement instructions, according to the book?",
          options: ["Dividend capture", "Momentum trading", "Market making", "Rolling futures"],
          answer: 0,
          why: "**Dividend capture** strategies (covered in chapter 8) also use them.",
          cite: DIVCAP,
        },
        {
          kind: "today",
          title: "U.S. stocks now settle T+1",
          body: "U.S. trades settle **T+1** since 28 May 2024. With T+1, the **ex-dividend date** is the **same day** as the **record date**.",
          source: "SEC Rule 15c6-1 amendments (2023)",
        },
        {
          kind: "recap",
          points: [
            { text: "**Special settlement** instructions ask for nonstandard settlement (regular way was T+3).", cite: SPECIAL },
            { text: "**Cash settlement** settles the same day, to become a **shareholder of record** in time.", cite: RECORD },
            { text: "It must be **negotiated**; if no one provides it, the order won't fill.", cite: NEGOTIATE },
          ],
        },
      ],
    },

    // ── Lesson 5 · 4.12 Summary, Table 4-4, 4.13 Points ───────────────────
    {
      id: "4.13-points",
      sec: "4.13",
      title: "Some points to remember",
      pages: "86–88",
      imp: 3,
      steps: [
        { kind: "idea", title: "4.12 · The two workhorses", body: "Of all the orders in this chapter, **market orders** and **limit orders** are the most important and the most common.", cite: SUM_TWO },
        { kind: "idea", title: "4.12 · Two kinds of uncertainty", body: "Market order traders don't know the **price** they'll get. Limit order traders don't know **whether** they'll trade.", cite: SUM_UNCERTAIN },
        {
          kind: "truefalse",
          q: "Traders who use limit orders grant trading options to the market.",
          answer: true,
          why: "Standing limit orders let **other** traders trade when **they** want to.",
          cite: SUM_OPTIONS,
        },
        {
          kind: "see",
          title: "Table 4-4 on one line",
          illus: OrderSpectrum,
          beats: [
            { text: "Orders that **demand immediacy**: market orders and **marketable** limit orders.", cite: T44_IMMEDIACY },
            { text: "Orders that **supply liquidity**: **standing** limit orders and **tick-sensitive** orders.", cite: T44_SUPPLY },
            { text: "**Stop** orders trigger when liquidity is **least available**. A stop market order then demands it.", cite: T44_STOPS },
            { text: "Two special cases: **market-if-touched** demands immediacy but supplies **resiliency**; with **market-not-held**, the **broker decides**.", cite: T44_OTHERS },
          ],
        },
        {
          kind: "classify",
          q: "Supplies liquidity or demands immediacy? (Table 4-4)",
          buckets: ["Supplies liquidity", "Demands immediacy or liquidity"],
          items: [
            { text: "Standing limit order", bucket: 0, why: "It waits in the book: an offer to trade." },
            { text: "Market order", bucket: 1, why: "It trades at once against what's there." },
            { text: "Marketable limit order", bucket: 1, why: "Its limit lets it trade immediately." },
            { text: "Tick-sensitive order", bucket: 0, why: "It can't push the price: it waits for others." },
            { text: "Stop market order, once triggered", bucket: 1, why: "It demands liquidity when it is least available." },
          ],
          cite: T44_LIQ,
        },
        {
          kind: "match",
          q: "Match each order to its main disadvantage (Table 4-4).",
          pairs: [
            ["Market order", "Uncertain price impact"],
            ["Standing limit order", "May never execute"],
            ["Stop market order", "Price impact can be large"],
            ["Market-not-held order", "You lose control over the broker"],
          ],
          cite: T44_DISADV,
        },
        {
          kind: "see",
          title: "Points 1–4 · Instructions and market orders",
          illus: PointsMarket,
          beats: [
            { text: "**1.** Traders use **standard** order instructions to cut communication errors.", cite: P1 },
            { text: "**2.** Market order traders **demand immediacy**.", cite: P2 },
            { text: "**3.** For **small** market orders, the **bid/ask spread** is the cost of immediacy.", cite: P3 },
            { text: "**4.** **Large** market orders can have **substantial and unpredictable** price impacts.", cite: P4 },
          ],
        },
        {
          kind: "truefalse",
          q: "For a large market order, the bid/ask spread is the whole cost of immediacy.",
          answer: false,
          why: "The spread is the cost for **small** orders; large ones add **substantial, unpredictable** price impact.",
          cite: P4,
        },
        {
          kind: "see",
          title: "Points 5–9 · Limit orders and stop orders",
          illus: PointsLimitStop,
          beats: [
            { text: "**5.** Limit order traders **supply liquidity** by granting **trading options** to others.", cite: P5 },
            { text: "**6.** If you **must** fill, a limit order can cost you a lot when the market **moves away**.", cite: P6 },
            { text: "**7.** Limit orders let traders take part in the market when they are **not present**.", cite: P7 },
            { text: "**8.** Stop orders are **not** limit orders.", cite: P8 },
            { text: "**9.** Stop orders tend to **destabilize** prices.", cite: P9 },
          ],
        },
        {
          kind: "fill",
          q: "Limit order traders supply ___ by granting trading ___ to other traders.",
          bank: ["liquidity", "options", "immediacy", "contracts", "commissions"],
          answer: ["liquidity", "options"],
          why: "Point 5, word for word.",
          cite: P5,
        },
        {
          kind: "choice",
          q: "A trader who must buy uses a limit order, and the market moves away. According to Harris…",
          options: ["They can lose substantially", "They always end up with a better price", "The order turns into a market order", "The exchange must fill them at the limit"],
          answer: 0,
          why: "They may have to **chase** the price and pay more than a market order would have cost.",
          cite: P6,
        },
        {
          kind: "multi",
          q: "Which of these are among Harris's points to remember? (Select all that apply.)",
          options: ["Stop orders are not limit orders", "Stop orders tend to destabilize prices", "Some traders use limit orders to take part in the market when absent", "Market orders always trade at the best bid or offer", "Limit orders carry no risk"],
          answer: [0, 1, 2],
          why: "Large market orders can trade far from the quotes, and limit orders risk not filling.",
          cite: P8,
        },
        {
          kind: "game",
          id: "order-desk",
          title: "Order desk",
          brief: "You're on the desk. Each ticket is a client with a goal. Pick the **order** that fits, then read why, from Table 4-4. Ten tickets.",
          game: OrderDesk,
        },
        {
          kind: "recap",
          title: "Chapter 4 in four lines",
          points: [
            { text: "Market orders: **uncertain price**. Limit orders: **uncertain execution**.", cite: SUM_UNCERTAIN },
            { text: "Limit orders **supply** liquidity by granting options; market orders **take** it.", cite: SUM_TAKE },
            { text: "The **spread** is the cost of immediacy for small market orders.", cite: P3 },
            { text: "Stop orders are **not** limit orders, and they tend to **destabilize** prices.", cite: P9 },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "Which instruction tells a broker to show no more than some maximum quantity of a standing limit order?",
      options: ["A display instruction", "A spread order", "A substitution order", "A special settlement instruction"],
      answer: 0,
      why: "**Display instructions** cap the visible size.",
      cite: MAXQ,
    },
    {
      kind: "choice",
      q: "Why does Michael display only 10,000 of his 90,000 shares at a time?",
      options: ["He fears revealing his full size might move the market down", "The exchange caps displays at 10,000", "Smaller displays pay lower commissions", "He isn't sure he wants to sell"],
      answer: 0,
      why: "Showing full size could push the price **down** before he sells.",
      cite: M_AFRAID,
    },
    {
      kind: "truefalse",
      q: "Liza knew that more shares might be hidden behind Michael's 10,000 displayed shares.",
      answer: true,
      why: "That's why she sent a **60,000**-share fill-or-kill order.",
      cite: LIZA_HIDDEN,
    },
    {
      kind: "choice",
      q: "You probe a hidden offer with a large marketable fill-or-kill order, as section 4.11.2 describes. What happens if the size isn't there?",
      options: ["Your order cancels", "It rests in the book as a limit order", "It turns into a market order", "The seller must reveal his full size"],
      answer: 0,
      why: "If the size is present you trade; if not, the order **cancels**.",
      cite: PRESENT,
    },
    {
      kind: "truefalse",
      q: "Some electronic exchanges, such as the Euronext, permitted undisclosed limit orders.",
      answer: true,
      why: "The book names the **Euronext**.",
      cite: EURONEXT,
    },
    {
      kind: "choice",
      q: "You buy a contract priced at 95 and sell one priced at 90 in one spread order (our numbers). The limit is a premium to which side?",
      options: ["The buy side", "The sell side", "Neither: spread limits are prices", "Both sides"],
      answer: 0,
      why: "The leg you **buy** is priced higher, so the premium is **to the buy side**.",
      cite: BUY_SIDE,
    },
    {
      kind: "truefalse",
      q: "Orders with special settlement instructions are easier to trade than regular orders.",
      answer: false,
      why: "They are **more difficult** to trade.",
      cite: HARDER,
    },
    {
      kind: "choice",
      q: "According to the summary, what are limit order traders uncertain about?",
      options: ["Whether they will trade", "The price at which they will trade", "Whether the market will open", "The commission they will pay"],
      answer: 0,
      why: "Limit orders fix the price but not the **execution**.",
      cite: SUM_UNCERTAIN,
    },
  ],
};
