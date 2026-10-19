// 3.1 WHO ARE THE PLAYERS? (pp. 32–34)
import type { Cite, Unit } from "../types.ts";
import { BuySellSides, BuySideChain, BuySideTypes, DealerVsBroker, LongChart, PropVsAgency, ShortChart } from "./illus/u31.tsx";
import { TradingPit } from "./games/TradingPit.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const TRADERS = c(32, "3.1", "Traders are people who trade. They may arrange their own trades, they may have others arrange trades for them, or they may arrange trades for others.");
const PROP = c(32, "3.1", "Proprietary traders trade for their own accounts, and brokers arrange trades as agents for their clients.");
const BROKER_AKA = c(32, "3.1", "Proprietary traders trade for their own accounts, and brokers arrange trades as agents for their clients. Brokers are also called agency traders, commission traders, or commission merchants.");
const AKA = c(32, "3.1", "Brokers are also called agency traders, commission traders, or commission merchants.");
const ENGAGE = c(32, "3.1", "Proprietary traders engage in proprietary trading, and brokers engage in agency trading.");
const LONG = c(32, "3.1", "Traders have long positions when they own something. Traders with long positions profit when prices rise. They try to buy low and sell high.");
const SHORT = c(32, "3.1", "Traders have short positions when they have sold something that they do not own. Traders with short positions hope that prices will fall so they can repurchase at a lower price.");
const COVER = c(32, "3.1", "When they repurchase, they cover their positions. Short sellers profit when they sell high and buy low.");
const SIDES = c(32, "3.1", "The trading industry has a buy side and a sell side. The buy side consists of traders who buy exchange services.");
const LIQ = c(32, "3.1", "Liquidity is the most important of these services. Liquidity is the ability to trade when you want to trade.");
const SELL_LIQ = c(32, "3.1", "Traders on the sell side sell liquidity to the buy side.");
const PRICE_LIQ = c(32, "3.1", "A substantial fraction of this book considers how interactions between buy-side and sell-side traders determine the price of liquidity.");
const NOT_INSTR = c(32, "3.1", "The buy and sell sides of the trading industry have nothing to do with whether a trader is a buyer or a seller of an instrument.");
const BOTH_SIDES = c(32, "3.1", 'Traders on both sides of the trading industry regularly buy and sell securities and contracts. The terms "buy side" and "sell side" refer to buyers and sellers of exchange services.');

const BUY_SIDE = c(32, "3.1.1", "The buy side of the trading industry includes individuals, funds, firms, and governments that use the markets to help solve various problems they face.");
const OUTSIDE = c(33, "3.1.1", "These problems typically originate outside of trading markets. For example, investors use securities markets to solve intertemporal cash flow problems: They have income today that they would like to have available in the future.");
const T31 = (t: string): Cite => c(33, "3.1.1", t, { table: "Table 3-1" });
const T_INVESTORS = T31("Investors To move wealth from the present to the future for themselves or for their clients Stocks Bonds");
const T_BORROWERS = T31("Borrowers Homeowners Students Corporations To move wealth from the future to the present Mortgages Bonds Notes");
const T_HEDGERS = T31("Hedgers Farmers Manufacturers Miners Shippers Financial institutions To reduce business operating risk Futures contracts Forward contracts Swaps");
const T_EXCH = T31("Asset exchangers International corporations Manufacturers Travelers To acquire an asset that they value more than the asset that they tender Currencies Commodities");
const T_GAMBLERS = T31("Gamblers Individuals To entertain themselves Various");
const T_WHY = T31("Investors To move wealth from the present to the future Borrowers To move wealth from the future to the present Hedgers To reduce business operating risk Asset exchangers To acquire an asset that they value more than the asset that they tender Gamblers To entertain themselves");
const T_EXAMPLES = T31("Investors Endowments Mutual funds Borrowers Homeowners Students Hedgers Farmers Miners Asset exchangers International corporations Travelers");
const SPONSORS = c(33, "3.1.1", "Many buy-side institutions are pension funds, mutual funds, trusts, endowments, and foundations that invest money. These institutions are known collectively as investment sponsors.");
const ADVISERS = c(33, "3.1.1", "Investment sponsors frequently employ investment advisers to manage their funds. Investment advisers are also called investment counselors, investment managers, or portfolio managers.");
const BS_TRADERS = c(33, "3.1.1", "Investment advisers often employ traders to implement their trading decisions. These traders are buy-side traders.");
const BENEF = c(33, "3.1.1", "The people and institutions who will ultimately benefit from the funds that investment sponsors hold are beneficiaries.");
const TYPICAL = c(37, "3.2.2.3", "The portfolio manager contacts his firm's buy-side trader—a fellow employee—and instructs her to buy 30,000 shares of Cisco Systems. She then issues an order to the state pension fund's broker to buy the shares.", { box: "A Typical Set of Relationships" });

const SELL_SIDE = c(33, "3.1.2", "The sell side of the trading industry includes dealers and brokers who provide exchange services to the buy side. Both types of traders help buy-side traders trade when they want to trade.");
const DEALERS = c(33, "3.1.2", "Dealers accommodate trades that their clients want to make by trading with them when their clients want to trade. Dealers profit when they buy low and sell high.");
const BROKERS = c(34, "3.1.2", "Brokers arrange trades that their clients want to make by finding other traders who will trade with their clients.");
const COMMISSIONS = c(34, "3.1.2", "Brokers profit when their clients pay them commissions for arranging trades with other traders.");
const BD = c(34, "3.1.2", "Many sell-side firms employ traders who both deal and broker trades. These firms therefore are known as broker-dealers or dual traders.");
const EXISTS = c(34, "3.1.2", "The sell side exists only because the buy side will pay for its services.");
const WIRE = c(34, "3.1.2", 'Traders often call large broker-dealers wirehouses. The word "wire" in wirehouse once referred to the telegraph.', { box: "The Wire in Wirehouse" });
const T32 = (t: string): Cite => c(34, "3.1.2", t, { table: "Table 3-2" });
const T_WHY_SELL = T32("Dealers To earn trading profits by supplying liquidity Brokers To earn commissions by arranging trades for clients Broker-dealers To earn trading profits and trading commissions");
const T_EX_SELL = T32("Dealers Market makers Specialists Floor traders Locals Scalpers Brokers Discount brokers Block brokers Futures commission merchants Broker-dealers Wirehouses");
const PTS_LIQ = c(66, "3.7", "The buy side buys liquidity services. The sell side provides them.");
const PTS_DEALERS = c(66, "3.7", "Dealers trade for their own account. Brokers trade for others.");

export const U31: Unit = {
  sec: "3.1",
  title: "Who Are the Players?",
  pages: "32–34",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "3.1-traders",
      sec: "3.1",
      title: "For yourself or for a client",
      pages: "32",
      steps: [
        { kind: "definition", term: "Traders", body: "People who trade. They arrange their **own** trades, have others arrange trades **for them**, or arrange trades **for others**.", cite: TRADERS },
        { kind: "definition", term: "Proprietary traders", body: "Trade for their **own accounts**. The gain or loss is theirs.", cite: PROP },
        {
          kind: "definition",
          term: "Brokers",
          aka: ["agency traders", "commission traders", "commission merchants"],
          body: "Arrange trades **as agents** for their clients. The trade belongs to the client.",
          cite: BROKER_AKA,
        },
        {
          kind: "see",
          title: "Two ways to be in a trade",
          illus: PropVsAgency,
          beats: [
            { text: "A **proprietary trader** trades with the market directly: her cash for other traders' shares." },
            { text: "The position sits in **her own account**, so the gains and losses are hers.", cite: PROP },
            { text: "A **broker** stands between a client and the market. The client's order goes through the broker." },
            { text: "The shares go to the **client**. The broker never owned them: it acted as the client's agent." },
            { text: "The broker is paid a **commission**. That is why brokers are also called commission traders.", cite: ENGAGE },
          ],
        },
        {
          kind: "fill",
          q: "Proprietary traders engage in ___ trading, and brokers engage in ___ trading.",
          bank: ["proprietary", "agency", "dealer", "insider"],
          answer: ["proprietary", "agency"],
          why: "Trading for your own account is **proprietary** trading; trading as an agent for clients is **agency** trading.",
          cite: ENGAGE,
        },
        {
          kind: "choice",
          q: "Which of these is **not** another name for a broker?",
          options: ["Agency trader", "Commission trader", "Commission merchant", "Proprietary trader"],
          answer: 3,
          why: "A proprietary trader trades for their own account, the opposite of a broker.",
          cite: AKA,
        },
        {
          kind: "classify",
          q: "Proprietary or agency trading?",
          buckets: ["Proprietary", "Agency"],
          items: [
            { text: "Maya buys bonds for her own account, hoping they rise.", bucket: 0, why: "Her own account: proprietary." },
            { text: "A trader fills a pension fund's order and charges a commission.", bucket: 1, why: "Acting for a client for a commission: agency." },
            { text: "A hedge fund trader bets the fund's own capital.", bucket: 0, why: "The fund's own money: proprietary." },
            { text: "Your online broker sends your order to the market.", bucket: 1, why: "It acts as your agent." },
            { text: "A commission merchant handles a farmer's futures order.", bucket: 1, why: "“Commission merchant” is another name for a broker." },
          ],
          cite: PROP,
        },
        {
          kind: "truefalse",
          q: "Someone who arranges a trade **for a client**, not for their own account, is doing proprietary trading.",
          answer: false,
          why: "Arranging trades for clients is agency trading; proprietary traders trade for their own accounts.",
          cite: PROP,
        },
        {
          kind: "recap",
          points: [
            { text: "**Proprietary traders** trade for their own accounts.", cite: PROP },
            { text: "**Brokers** (agency traders, commission traders, commission merchants) trade as agents for clients.", cite: AKA },
            { text: "Proprietary traders do **proprietary trading**; brokers do **agency trading**.", cite: ENGAGE },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "3.1-long-short",
      sec: "3.1",
      title: "Long and short",
      pages: "32",
      steps: [
        { kind: "definition", term: "Long position", body: "You **own** something. You profit when the price **rises**: buy low, sell high.", cite: LONG },
        {
          kind: "see",
          title: "A long position, step by step",
          illus: LongChart,
          beats: [
            { text: "Buy 100 shares at **$40**. You own them, so you are **long 100**. (Our numbers, for illustration.)" },
            { text: "The price climbs to $52. Each share is worth $12 more: **+$1,200** on paper." },
            { text: "Sell at $52 to lock it in. Buy low, sell high: **+$1,200** realized.", cite: LONG },
          ],
        },
        {
          kind: "number",
          q: "You buy 200 shares at $25 and later sell them at $31. What is your profit?",
          answer: 1200,
          prefix: "$",
          illustrative: true,
          why: "(31 − 25) × 200 = $1,200. A long position profits when prices rise.",
          cite: LONG,
        },
        { kind: "definition", term: "Short position", body: "You have **sold something you do not own**. You hope the price **falls** so you can buy it back cheaper.", cite: SHORT },
        { kind: "definition", term: "Cover", body: "To **buy back** what you sold short, which closes the short position.", cite: COVER },
        {
          kind: "see",
          title: "A short position, step by step",
          illus: ShortChart,
          beats: [
            { text: "Sell 100 shares you don't own at **$52**. You are now **short 100**." },
            { text: "The price falls to $40. You could buy the shares back $12 cheaper: **+$1,200** on paper." },
            { text: "Buy them back at $40 to **cover**. Sell high, buy low: **+$1,200**.", cite: COVER },
            { text: "The risk: if the price had **risen** to $58, covering would cost $6 a share more: **−$600**." },
          ],
        },
        {
          kind: "truefalse",
          q: "A trader with a short position profits when the price **rises**.",
          answer: false,
          why: "Short sellers hope prices fall so they can repurchase lower: they sell high and buy low.",
          cite: SHORT,
        },
        {
          kind: "choice",
          q: "Kai sold 100 shares he did not own at $30. What must he do to close the position?",
          options: ["Cover: buy the 100 shares back", "Sell 100 more shares", "Wait for the shares to expire", "Ask his broker to cancel the sale"],
          answer: 0,
          why: "Repurchasing the shares is called **covering** the position.",
          cite: COVER,
        },
        {
          kind: "number",
          q: "You short 100 shares at $48 and cover at $55. What is your profit or loss? (Use a minus sign for a loss.)",
          answer: -700,
          prefix: "$",
          illustrative: true,
          why: "You sold at 48 and bought back at 55: (48 − 55) × 100 = −$700. The price rose, so the short lost money.",
          cite: SHORT,
        },
        {
          kind: "game",
          id: "trading-pit",
          title: "Trading pit: go long, go short",
          brief: "The price moves for about 17 seconds. **Buy** to go long or to cover a short; **sell** to close a long or to go short. Complete all three missions.",
          game: TradingPit,
        },
        {
          kind: "recap",
          points: [
            { text: "**Long** = you own it; you profit when prices rise (buy low, sell high).", cite: LONG },
            { text: "**Short** = you sold what you don't own; you profit when prices fall.", cite: SHORT },
            { text: "Buying back a short is called **covering** (sell high, buy low).", cite: COVER },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "3.1-sides",
      sec: "3.1",
      title: "Buy side and sell side",
      pages: "32",
      steps: [
        { kind: "idea", title: "The industry has two sides", body: "The **buy side** buys exchange services. The **sell side** sells them.", cite: SIDES },
        { kind: "definition", term: "Liquidity", body: "The ability to trade **when you want to trade**. It is the most important exchange service.", cite: LIQ },
        {
          kind: "see",
          title: "What flows between the two sides",
          illus: BuySellSides,
          beats: [
            { text: "Two groups: the **buy side** (investors, hedgers…) and the **sell side** (dealers, brokers)." },
            { text: "The sell side sells **liquidity** to the buy side: the chance to trade right now.", cite: SELL_LIQ },
            { text: "The buy side **pays a price** for it. Much of the book is about what sets that price.", cite: PRICE_LIQ },
            { text: "Both sides **buy and sell securities**. The names are about exchange services, not about the direction of a trade.", cite: NOT_INSTR },
          ],
        },
        { kind: "quote", lead: "Careful with the names:", cite: BOTH_SIDES, mark: ["exchange services"] },
        {
          kind: "truefalse",
          q: "A buy-side trader only buys securities and never sells them.",
          answer: false,
          why: "Traders on both sides regularly buy and sell. “Buy side” means buyer of exchange services.",
          cite: BOTH_SIDES,
        },
        {
          kind: "choice",
          q: "What does the sell side sell to the buy side?",
          options: ["Liquidity", "Only stocks", "Insurance", "Research"],
          answer: 0,
          why: "Liquidity, the ability to trade when you want to, is the service the sell side sells.",
          cite: SELL_LIQ,
        },
        {
          kind: "fill",
          q: "Liquidity is the ability to trade ___.",
          bank: ["when you want to trade", "at the lowest price", "without a broker", "only on exchanges"],
          answer: ["when you want to trade"],
          why: "Harris defines liquidity by timing: being able to trade when you want to.",
          cite: LIQ,
        },
        {
          kind: "choice",
          q: "According to Harris, much of the book studies how buy-side and sell-side traders determine…",
          options: ["the price of liquidity", "interest rates", "tax rates", "which stocks get listed"],
          answer: 0,
          why: "The interaction between the two sides sets the price of liquidity.",
          cite: PRICE_LIQ,
        },
        {
          kind: "recap",
          points: [
            { text: "The **buy side** buys exchange services; the **sell side** sells them.", cite: SIDES },
            { text: "**Liquidity** = the ability to trade when you want to trade.", cite: LIQ },
            { text: "The names refer to exchange services, **not** to buying or selling instruments.", cite: BOTH_SIDES },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "3.1.1-why",
      sec: "3.1.1",
      title: "Why the buy side trades",
      pages: "32–33",
      steps: [
        {
          kind: "idea",
          title: "The buy side uses markets to solve problems",
          body: "Individuals, funds, firms and governments come to the markets to solve **problems they face**, mostly problems that start **outside** the markets.",
          cite: BUY_SIDE,
        },
        {
          kind: "see",
          title: "Table 3-1, one row at a time",
          illus: BuySideTypes,
          beats: [
            { text: "**Investors** have income today they want later. They buy stocks and bonds to carry wealth into the future.", cite: T_INVESTORS },
            { text: "**Borrowers** (homeowners, students, corporations) bring future income into the present with mortgages, bonds and notes.", cite: T_BORROWERS },
            { text: "**Hedgers** (farmers, miners, shippers…) use futures, forwards and swaps to reduce business operating risk.", cite: T_HEDGERS },
            { text: "**Asset exchangers** swap one asset for another they value more, such as currencies or commodities.", cite: T_EXCH },
            { text: "**Gamblers** trade to entertain themselves.", cite: T_GAMBLERS },
          ],
        },
        {
          kind: "match",
          q: "Match each trader type to why it trades.",
          pairs: [
            ["Investors", "Wealth: present → future"],
            ["Borrowers", "Wealth: future → present"],
            ["Hedgers", "Reduce operating risk"],
            ["Asset exchangers", "Get an asset they value more"],
            ["Gamblers", "Entertainment"],
          ],
          cite: T_WHY,
        },
        {
          kind: "classify",
          q: "Which type is it? (Table 3-1 examples)",
          buckets: ["Investors", "Borrowers", "Hedgers", "Asset exchangers"],
          items: [
            { text: "A university endowment", bucket: 0 },
            { text: "A student", bucket: 1 },
            { text: "A farmer", bucket: 2 },
            { text: "A traveler", bucket: 3 },
            { text: "A mutual fund", bucket: 0 },
            { text: "A homeowner", bucket: 1 },
            { text: "A miner", bucket: 2 },
            { text: "An international corporation", bucket: 3 },
          ],
          cite: T_EXAMPLES,
        },
        {
          kind: "choice",
          q: "Which instruments do **hedgers** typically use, according to Table 3-1?",
          options: ["Futures, forwards and swaps", "Stocks and bonds", "Mortgages and notes", "Currencies and commodities"],
          answer: 0,
          why: "Hedgers reduce business operating risk with futures contracts, forward contracts and swaps.",
          cite: T_HEDGERS,
        },
        {
          kind: "choice",
          q: "A worker saves part of each paycheck in bonds for retirement. In Table 3-1 terms, she is…",
          options: ["an investor", "a borrower", "a hedger", "an asset exchanger"],
          answer: 0,
          why: "She has income today that she wants available in the future: an investor's intertemporal problem.",
          cite: OUTSIDE,
        },
        {
          kind: "truefalse",
          q: "Borrowers use the markets to move wealth from the future to the present.",
          answer: true,
          why: "That is the borrowers' row of Table 3-1, the mirror image of investors.",
          cite: T_BORROWERS,
        },
        {
          kind: "recap",
          points: [
            { text: "Buy-side problems usually **start outside** the markets.", cite: OUTSIDE },
            { text: "**Investors** move wealth forward in time; **borrowers** bring it back.", cite: T_WHY },
            { text: "**Hedgers** reduce risk; **asset exchangers** swap assets; **gamblers** have fun.", cite: T_WHY },
          ],
        },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "3.1.1-who",
      sec: "3.1.1",
      title: "Who's who on the buy side",
      pages: "33",
      steps: [
        { kind: "definition", term: "Investment sponsors", body: "Institutions that **hold and invest money**: pension funds, mutual funds, trusts, endowments and foundations.", cite: SPONSORS },
        {
          kind: "definition",
          term: "Investment advisers",
          aka: ["investment counselors", "investment managers", "portfolio managers"],
          body: "Hired by sponsors to **manage their funds**.",
          cite: ADVISERS,
        },
        { kind: "definition", term: "Buy-side traders", body: "Traders employed by advisers to **carry out** their trading decisions.", cite: BS_TRADERS },
        { kind: "definition", term: "Beneficiaries", body: "The people and institutions who **ultimately benefit** from the funds sponsors hold.", cite: BENEF },
        {
          kind: "see",
          title: "From the money to the order",
          illus: BuySideChain,
          beats: [
            { text: "A **sponsor**, such as a state pension fund, receives money to invest." },
            { text: "It hires an **investment adviser**, whose portfolio manager decides what to buy.", cite: ADVISERS },
            { text: "The adviser's **buy-side trader** gets the instruction: buy 30,000 shares of Cisco.", cite: TYPICAL },
            { text: "She sends the order to a **broker**, who arranges the trade." },
            { text: "All of it is done for the **beneficiaries**, for example the pension fund's retirees.", cite: BENEF },
          ],
        },
        {
          kind: "match",
          q: "Match each role to what it does.",
          pairs: [
            ["Investment sponsor", "Holds the funds"],
            ["Investment adviser", "Manages the funds"],
            ["Buy-side trader", "Carries out trading decisions"],
            ["Beneficiary", "Ultimately benefits"],
          ],
          cite: BS_TRADERS,
        },
        {
          kind: "order",
          q: "Put the chain in order, from the money to the market.",
          items: ["Pension fund (sponsor) has money to invest", "Portfolio manager (adviser) decides to buy", "Buy-side trader receives the instruction", "Broker arranges the trade"],
          why: "Sponsor → adviser → buy-side trader → broker, as in the book's state pension fund example.",
          cite: TYPICAL,
        },
        {
          kind: "multi",
          q: "Which of these are **investment sponsors**?",
          options: ["Pension funds", "Endowments", "Foundations", "Dealers", "Specialists"],
          answer: [0, 1, 2],
          why: "Sponsors are institutions that invest money: pension funds, mutual funds, trusts, endowments and foundations. Dealers and specialists are on the sell side.",
          cite: SPONSORS,
        },
        {
          kind: "fill",
          q: "Investment advisers are also called investment counselors, investment managers, or ___ managers.",
          bank: ["portfolio", "money", "fund", "asset"],
          answer: ["portfolio"],
          why: "The book lists three other names: investment counselors, investment managers, portfolio managers.",
          cite: ADVISERS,
        },
        {
          kind: "recap",
          points: [
            { text: "**Sponsors** hold the money; they hire **advisers** to manage it.", cite: ADVISERS },
            { text: "Advisers employ **buy-side traders** to carry out decisions.", cite: BS_TRADERS },
            { text: "**Beneficiaries** ultimately benefit from the funds.", cite: BENEF },
          ],
        },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────────────────────
    {
      id: "3.1.2-sell-side",
      sec: "3.1.2",
      title: "The sell side: dealers and brokers",
      pages: "33–34",
      steps: [
        { kind: "idea", title: "The sell side provides exchange services", body: "**Dealers** and **brokers** both help buy-side traders trade when they want to trade.", cite: SELL_SIDE },
        { kind: "definition", term: "Dealers", body: "Trade **with** their clients whenever the clients want to trade. They profit by **buying low and selling high**.", cite: DEALERS },
        {
          kind: "see",
          title: "Dealer or broker: who takes the other side?",
          illus: DealerVsBroker,
          beats: [
            { text: "A seller arrives. The **dealer buys** her 100 shares at $20.00 and holds them in inventory. (Illustrative prices.)", cite: DEALERS },
            { text: "Later a buyer arrives. The **dealer sells** him the shares at $20.10, buying low and selling high." },
            { text: "A **broker** works differently: it finds the buyer for the seller, and the two clients trade with **each other**.", cite: BROKERS },
            { text: "The broker never holds the shares. It earns **commissions** for arranging the trade.", cite: COMMISSIONS },
          ],
        },
        { kind: "idea", title: "Brokers earn commissions", body: "Brokers trade **on behalf of** clients and profit when clients pay them **commissions**.", cite: COMMISSIONS },
        {
          kind: "classify",
          q: "Dealer or broker?",
          buckets: ["Dealer", "Broker"],
          items: [
            { text: "Buys your shares into its own inventory", bucket: 0 },
            { text: "Finds another trader to take the other side", bucket: 1 },
            { text: "Earns commissions", bucket: 1 },
            { text: "Profits by buying low and selling high", bucket: 0 },
            { text: "Trades with you whenever you want to trade", bucket: 0 },
            { text: "Acts as your agent", bucket: 1 },
          ],
          cite: PTS_DEALERS,
        },
        { kind: "definition", term: "Broker-dealers", aka: ["dual traders"], body: "Firms whose traders **both deal and broker** trades.", cite: BD },
        { kind: "definition", term: "Wirehouses", body: "What traders call **large broker-dealers**. The “wire” was the telegraph they used to collect orders.", cite: WIRE },
        { kind: "idea", title: "No buy side, no sell side", body: "The sell side exists **only** because the buy side pays for its services. To understand the sell side, start with why the buy side trades.", cite: EXISTS },
        {
          kind: "match",
          q: "Why they trade (Table 3-2)",
          pairs: [
            ["Dealers", "Trading profits from supplying liquidity"],
            ["Brokers", "Commissions for arranging trades"],
            ["Broker-dealers", "Trading profits and commissions"],
          ],
          cite: T_WHY_SELL,
        },
        {
          kind: "classify",
          q: "Sort the Table 3-2 examples.",
          buckets: ["Dealers", "Brokers", "Broker-dealers"],
          items: [
            { text: "Market makers", bucket: 0 },
            { text: "Discount brokers", bucket: 1 },
            { text: "Wirehouses", bucket: 2 },
            { text: "Specialists", bucket: 0 },
            { text: "Futures commission merchants", bucket: 1 },
            { text: "Scalpers", bucket: 0 },
            { text: "Block brokers", bucket: 1 },
            { text: "Locals", bucket: 0 },
          ],
          cite: T_EX_SELL,
        },
        {
          kind: "choice",
          q: "How does a dealer make money?",
          options: ["Buying low and selling high", "Charging commissions", "Charging listing fees", "Collecting taxes on trades"],
          answer: 0,
          why: "Dealers trade with their clients and profit when they buy low and sell high. Commissions are how brokers earn.",
          cite: DEALERS,
        },
        {
          kind: "truefalse",
          q: "A broker-dealer's traders can both deal and broker trades.",
          answer: true,
          why: "That is exactly why such firms are called broker-dealers or dual traders.",
          cite: BD,
        },
        {
          kind: "fill",
          q: "Dealers trade for ___ account. Brokers trade for ___.",
          bank: ["their own", "others", "the exchange", "the government"],
          answer: ["their own", "others"],
          why: "One of the chapter's points to remember (§3.7).",
          cite: PTS_DEALERS,
        },
        {
          kind: "recap",
          points: [
            { text: "**Dealers** trade with clients and profit by buying low, selling high.", cite: DEALERS },
            { text: "**Brokers** find counterparts for clients and earn commissions.", cite: COMMISSIONS },
            { text: "**Broker-dealers** (dual traders, large ones are called wirehouses) do both.", cite: BD },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "fill",
      q: "The buy side ___ liquidity services. The sell side ___ them.",
      bank: ["buys", "provides", "regulates", "taxes"],
      answer: ["buys", "provides"],
      why: "A point to remember from §3.7.",
      cite: PTS_LIQ,
    },
    {
      kind: "choice",
      q: "Who ultimately benefits from the funds that investment sponsors hold?",
      options: ["Beneficiaries", "Investment advisers", "Brokers", "Dealers"],
      answer: 0,
      why: "Beneficiaries are the people and institutions the funds are ultimately for.",
      cite: BENEF,
    },
    {
      kind: "truefalse",
      q: "“Buy side” and “sell side” describe who bought and who sold a stock in a particular trade.",
      answer: false,
      why: "They describe buyers and sellers of exchange services, not of instruments.",
      cite: NOT_INSTR,
    },
  ],
};
