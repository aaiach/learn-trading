// 3.4 WHERE ARE THE TRADING MARKETS? (pp. 44–59)
import type { Cite, Lesson, Question, Unit } from "../types.ts";
import { Consolidation, EquityMap, FedDesk, FrontRoll, InstrumentDots, ListingGate, OccFungible, RetailFx, VolumeCount, WealthBars } from "./illus/u34.tsx";
import { WealthGuess } from "./games/WealthGuess.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 3.4 and 3.4.1 ─────────────────────────────────────────────────
const MP_STOCKS = c(45, "3.4", "Stocks represent less wealth than the widespread attention given to them by the media would suggest.");
const MP_INSTR = c(45, "3.4", "Trading volume depends in part on the number of available instruments. Markets with a great number of different instruments are often quite illiquid.");
const MP_CONSOL = c(45, "3.4", "Exchanges everywhere have been consolidating.");
const STOCKS20 = c(45, "3.4.1", "Despite the tremendous attention given to the stock market in the media, stocks represent only about 20 percent of the capital wealth of the country.");
const MOST_WEALTH = c(45, "3.4.1", "Most of the wealth is in real estate, which rarely trades, and in various types of bonds.");
const DERIV0 = c(45, "3.4.1", "Derivative contracts represent no wealth because they are all in zero net supply and do not represent ownership of real assets.");
const T34 = (t: string): Cite => c(45, "3.4.1", t, { table: "Table 3-4" });
const T34_STOCKS = T34("Common stocks: 20%");
const T34_REAL = T34("Real estate: 50%");
const T34_BONDS = T34("Corporate bonds: 15% · Municipal bonds: 10% · Government bonds: 10%");
const T34_NOTE = T34("The percentages add up to more than 100 percent primarily because corporations own real estate.");
const T34_ACTIVE = T34("Total instruments / actively traded · Common stocks: 15,000 / 1,000 · Corporate bonds: 100,000 / 50 · Municipal bonds: 1,000,000 / 0 · Government bonds: 50 / 3 · Futures contracts: 100 / 20");
const NYSE62 = c(45, "3.4.1", "At the NYSE, the 250 most active stocks accounted for 62 percent of the total reported trading volume, and a larger percentage of the total dollar volume, in 2000.");
const PUBLIC = c(45, "3.4.1", "When trading the most active stocks, public traders often trade with other public traders. Otherwise, public traders often trade with sell-side dealers.");
const RETAIL = c(45, "3.4.1", "Most trades are small retail trades; large institutional traders account for most share volume.");
const OPT_FEW = c(45, "3.4.1", "Very few option contracts trade frequently, however.");
const BONDS_RARE = c(46, "3.4.1", "The large number of corporate and municipal bond issues ensures that most issues hardly ever trade.");
const BOND_DEALERS = c(46, "3.4.1", "The buy side trades bonds almost exclusively with dealers because the public buyers and sellers rarely simultaneously want to trade the same bond issue.");
const GOV_LIQ = c(46, "3.4.1", "The tremendous size of these issues and the widespread interest in these securities make these markets extremely liquid.");
const REAL_EST = c(47, "3.4.1", "Real estate trades in brokered markets because every parcel is unique. The difficulties that buyers and sellers have finding each other make the real estate market the least liquid of the markets we have discussed.");
const FX_VOL = c(47, "3.4.1", "Volumes are high because international trade and cross-border capital transactions generally require currency conversions.");
const FX_DEALERS = c(47, "3.4.1", "The structure of currency markets also ensures that dealers trade several times with each other for every trade that they make with a client.");

// ── Excerpts: 3.4.2 listing ─────────────────────────────────────────────────
const FUT_LIQ = c(46, "3.4.1", "Some of the world's most liquid instruments trade in futures markets.");
const LIST = c(47, "3.4.2", "Corporations apply to exchanges to list their stocks. Exchanges generally list all companies that meet their listing standards and that pay their listing fees.");
const LIST_STD = c(47, "3.4.2", "The listing standards of an exchange generally require that its listed companies meet specified minimum standards for capital value, numbers of shareholders, and financial strength.");
const GAAP = c(47, "3.4.2", "Most exchanges also require listed companies to report their accounts regularly according to generally accepted accounting practices (GAAP).");
const CONTROL = c(47, "3.4.2", "Control structure refers to how the shareholders elect the board of directors who appoint the managers");
const ALL_BUT = c(47, "3.4.2", "All but the smallest publicly traded stocks are listed for trading at one or more markets.");
const NYSE_BOX = "The New York Stock Exchange's Quantitative Listing Standards for Domestic Companies";
const NYSE_HOLDERS = c(46, "3.4.1", "The company must have at least 2,000 U.S. shareholders that each hold at least one round lot", { box: NYSE_BOX });
const NYSE_VALUE = c(46, "3.4.1", "The publicly held shares of the company must have an aggregate market value of at least 100 million dollars", { box: NYSE_BOX });
const NYSE_EARN = c(46, "3.4.1", "Pretax earnings must total at least 2.5 million dollars in the latest fiscal year", { box: NYSE_BOX });

// ── Excerpts: 3.4.2.1 U.S. stock markets ────────────────────────────────────
const PRIMARY = c(48, "3.4.2.1", "The exchange where a corporate stock issue is primarily listed is its primary listing market.");
const PRIMARY3 = c(48, "3.4.2.1", "The main primary listing markets in the United States are the New York Stock Exchange, the American Stock Exchange, and the Nasdaq Stock Market.");
const LISTED = c(48, "3.4.2.1", "Stocks listed at the New York Stock Exchange and the American Stock Exchange are known as listed stocks.");
const OTC_ONCE = c(48, "3.4.2.1", "Nasdaq stocks were once known as over-the-counter stocks, but now they are simply called Nasdaq stocks.");
const FLOOR = c(48, "3.4.2.1", "Floor brokers arrange trades for their clients on the floor of the exchange, often with the assistance of dealers who are known as specialists.");
const NASDAQ = c(48, "3.4.2.1", "The Nasdaq Stock Market is an electronic communications network that allows brokers and dealers to meet each other in a screen-based environment managed by computers.");
const REGIONAL = c(48, "3.4.2.1", "Most listed stocks in the United States also trade in one or more regional stock markets.");
const UTP = c(49, "3.4.2.1", "the regional exchanges trade some Nasdaq stocks under unlisted trading privileges granted to them by the U.S. Securities and Exchange Commission.");
const THIRD = c(49, "3.4.2.1", "The third market includes dealers and brokers who arrange trades in exchange-listed stocks away from an exchange.");
const ATS = c(49, "3.4.2.1", "U.S. stocks also trade in various electronic trading systems known as alternative trading systems (ATSs). Registered broker-dealers sponsor most of these systems.");
const ECN = c(49, "3.4.2.1", "Electronic communications networks (ECNs) are the best-known alternative trading systems.");
const FOURTH = c(49, "3.4.2.1", "The term fourth market refers to trading in exchange-listed stocks within these systems.");
const T35 = c(49, "3.4.2.1", "Primary listing markets: New York Stock Exchange, The Nasdaq National Market · Regional markets: Chicago Stock Exchange, Philadelphia Stock Exchange · Third market dealers: Madoff Investment Securities, Knight Trading Group · Instinet · Island · POSIT", { table: "Table 3-5" });

// ── Excerpts: volume-counting box (p. 48) ───────────────────────────────────
const VBOX = "Double- and Triple-counting Volumes";
const v = (t: string) => c(48, "3.4.2", t, { box: VBOX });
const V_COMPARE = v("The volume figures that markets report often are not directly comparable.");
const V_NYSE = v("For example, a 100-share trade between a public buyer and a public seller creates 100 shares of volume at the NYSE.");
const V_ONE = v("If the same trade took place in Nasdaq with the intermediation of a single dealer, the total volume would be 200 shares");
const V_TWO = v("If Dealer A buys from the public seller, Dealer B sells to the public buyer, and Dealer B buys from Dealer A, the market will report 300 shares.");
const V_PUBLIC = v("In markets that exclusively match public buyers directly to public sellers, volume measures only the trading activity of public traders.");
const V_DEALER = v("In dealer markets, volume measures the total trading activity of public traders and dealers.");
const V_TWICE = v("Their reported trading volume thus overstates total trading volume because they count the same trades twice.");
const V_TSV = v("Trading System View (TSV) markets count only transactions that pass through their trading systems or that occur on their trading floors.");
const V_REV = v("Regulated Environment View (REV) markets count all transactions that are subject to their regulatory supervision.");
const V_WFE = v("The WFE classifies the NYSE as a TSV market and the Nasdaq Stock Market as an REV market.");

// ── Excerpts: 3.4.2.2 international, regional trivia ────────────────────────
const GROW = c(50, "3.4.2.2", "stock markets throughout the world grew substantially as firms increasingly sought public equity financing instead of bank loan financing and as governments privatized various enterprises.");
const CONSOL = c(50, "3.4.2.2", "Many exchanges consolidated to take advantage of economies of scale.");
const SYMBOL = c(50, "3.4.2.2", "Despite these deficiencies, these countries established stock exchanges because they are symbols of free market economies.");
const SUCCESS = c(50, "3.4.2.2", "the most successful of these markets are in countries that carefully defined property rights, privatized most of their government-run enterprises, adopted good securities laws, and diligently enforced those laws.");
const WARSAW = c(50, "3.4.2.2", "The government first housed the Exchange in the former Communist Party Headquarters Building.", { box: "Communist Party Headquarters" });
const RBOX = "Some Regional Exchange Trivia";
const MIDWEST = c(47, "3.4.1", "It merged with exchanges in St. Louis, Cleveland, and Minneapolis/St. Paul to form the Midwest Stock Exchange in 1949.", { box: RBOX });
const CHX = c(47, "3.4.1", "The Midwest Stock Exchange changed its name back to Chicago Stock Exchange in 1993.", { box: RBOX });
const PSE = c(47, "3.4.1", "and the Los Angeles Stock and Oil Exchange (founded in 1899) formed the Pacific Stock Exchange in 1957.", { box: RBOX });
const ARCA = c(47, "3.4.1", "the PCX moved its equity trading to the Archipelago Exchange in 2002.", { box: RBOX });
const ISRAEL = c(52, "3.4.3", "By capitalization and trading volume, the largest Israeli stock market is the U.S. Nasdaq Stock Market.", { box: "Some International Stock Market Trivia" });

// ── Excerpts: 3.4.3 equity options ──────────────────────────────────────────
const OCC = c(50, "3.4.3.1", "The Options Clearing Corporation (OCC) is the clearinghouse for all contracts that trade at these exchanges. Buyers therefore can buy contracts at one exchange and sell them at other exchanges to offset their positions.");
const FLEX_BOX = "FLEX Options";
const OCC_GUAR = c(52, "3.4.3", "The Options Clearing Corporation is the issuer and guarantor of all FLEX and E-FLEX contracts, as it is for all other options traded at U.S. exchanges.", { box: FLEX_BOX });
const FLOOR4 = c(50, "3.4.3.1", "Four of the five options exchanges employ floor-based trading systems.");
const ISE = c(50, "3.4.3.1", "The International Securities Exchange, formed in 1997, started trading in 2000 with a completely automated trading system.");
const SYNTH = c(50, "3.4.3.1", "These contracts usually have strike prices, maturity dates, settlement terms, or other features that are different from the standardized options available at the exchanges. This business is part of the synthetic derivatives business.");
const FLEX = c(52, "3.4.3", "Using a special request for quote (RFQ) procedure, institutional traders specify the option type (call or put), strike price, maturity date (up to three years distant), and exercise style (American or European)", { box: FLEX_BOX });
const SAME_EX = c(50, "3.4.3.2", "Outside of the United States, most organized trading in standardized stock option contracts takes place at the same exchange at which the underlying stocks trade.");
const SIDE = c(50, "3.4.3.2", "In the United States, the SEC has not permitted equities and their associated options to trade side by side.");
const SSF = c(54, "3.4.3.2", "Until December 2001, it was illegal to trade futures on individual stocks in the United States. The Commodity Futures Modernization Act of 2000 now permits trading in these contracts.");

// ── Excerpts: 3.4.4 futures ─────────────────────────────────────────────────
const OWN_CH = c(54, "3.4.4", "Most futures exchanges have their own clearinghouses. Exchanges therefore do not compete to trade the same contracts.");
const DESIGN = c(54, "3.4.4", "Instead, each exchange and its associated clearinghouse try to create contracts that will attract traders.");
const MONTHS4 = c(54, "3.4.4", "Most commodities have at least four delivery months.");
const FRONT = c(54, "3.4.4", "The contract that will expire next is called the front contract or front month contract. The other contracts are called the back contracts.");
const ROLL = c(54, "3.4.4", "In financial and industrial commodities, traders mostly trade only the front month contract. When it expires, they roll their positions into the next contract.");
const HARVEST = c(54, "3.4.4", "The first harvest contract is the first contract on which traders can deliver the currently growing crop. Hedgers and speculators usually have great interest in this contract.");
const BOARDS = c(54, "3.4.4.1", "These exchanges are often called boards of trade.");
const T310 = c(57, "3.4.4.2", "Volume (millions), rank · Eurex, Germany and Switzerland: 435.1, 1 · Chicago Mercantile Exchange, USA: 316.0, 2 · Chicago Board of Trade, USA: 210.0, 3", { table: "Table 3-10" });

// ── Excerpts: 3.4.5 bonds, 3.4.6 Treasuries ─────────────────────────────────
const OTC_BONDS = c(54, "3.4.5", "Throughout the world, most corporate and municipal bonds trade over the counter in investment banks or commercial banks.");
const PCT01 = c(54, "3.4.5", "Less than 0.1 percent of all corporate bond trading volume occurs in the New York Stock Exchange and American Stock Exchange bond markets.");
const PAPERS = c(54, "3.4.5", "The exchange bond price tables that appear in many daily newspapers therefore present less reliable information than you might imagine.");
const AUCTION = c(54, "3.4.6", "Most national treasuries conduct public auctions at which they issue their bills, notes, and bonds.");
const FBOX = "They Trade Enormous Volume but Receive No Year-end Bonuses";
const FED_PD = c(58, "3.4.6", "The Federal Reserve trades only with a small set of large institutional broker-dealers called primary government securities dealers.", { box: FBOX });
const FED_OBL = c(58, "3.4.6", "these primary dealers must quote firm prices for large sizes whenever the Fed wants to trade. In addition, they must participate meaningfully in Treasury auctions, and they must supply information about market conditions to the Federal Reserve.", { box: FBOX });
const FED_ADD = c(58, "3.4.6", "When the Fed wants to add monetary reserves to the banking system, it buys seasoned U.S. Treasury bills and bonds, and simply creates the money to pay for them.", { box: FBOX });
const FED_BEST = c(58, "3.4.6", "Instead, they merely request bids and offers to fill the Fed's daily requirements. They then arrange trades with the dealers who offer the best prices.", { box: FBOX });
const SECONDARY = c(58, "3.4.6", "Secondary trading of Treasury securities occurs primarily over the counter in investment and commercial banks.");
const INTERDEALER = c(58, "3.4.6", "These interdealer brokers permit their clients to trade on an anonymous basis. Dealers generally do not want other dealers to know what trades they are doing.");
const CANTOR = c(58, "3.4.6", "The largest such interdealer government bond broker is Cantor Fitzgerald.");

// ── Excerpts: 3.4.7 swaps and spot currencies ───────────────────────────────
const SWAPS_OTC = c(58, "3.4.7", "Swaps and spot currencies mostly trade over the counter in investment and commercial banks.");
const SEARCH = c(58, "3.4.7", "Some brokers and some data providers organize markets in these instruments. Traders use their services to lower the costs of searching for counterparts.");
const WBOX = "Some Wholesale OTC Brokers";
const REUTERS = c(59, "3.4.7", "Reuters is the world's leading foreign exchange broker.", { box: WBOX });
const XBOX = "The Retail Currency Markets";
const RFX_PRICEY = c(59, "3.4.7", "Retail foreign exchange markets in airports and tourist areas are notoriously expensive.", { box: XBOX });
const RFX_FEE = c(59, "3.4.7", "Currency dealers usually charge a significant fee for their transactions. They also profit from the wide spread between the prices at which they are willing to buy and sell currencies.", { box: XBOX });
const RFX_RENT = c(59, "3.4.7", "The high transaction costs in the retail foreign exchange market are due to the high rents dealers must pay for their shops at airports and near tourist sites", { box: XBOX });
const RFX_COSTS = c(59, "3.4.7", "to the costly security precautions that ensure they are not robbed while tending their shops and delivering and collecting currencies, and to the salaries they must pay clerks, who are often idle.", { box: XBOX });
const ATM = c(59, "3.4.7", "Your bank gives you a better rate because it can consolidate your transaction with many others, and because it has much more negotiating clout than you do.", { box: XBOX });

const L_WEALTH: Lesson = {
  id: "3.4.1-wealth",
  sec: "3.4.1",
  title: "Where the wealth is",
  pages: "44–45",
  imp: 1,
  steps: [
    {
      kind: "idea",
      title: "Three things to notice about markets",
      body: "Stocks get **more attention** than their share of wealth. Markets with **many instruments** are often illiquid. Exchanges keep **consolidating**.",
      cite: MP_STOCKS,
    },
    {
      kind: "game",
      id: "wealth-guess",
      title: "Guess where the wealth is",
      brief: "Drag each slider to your guess of that class's share of U.S. **capital wealth**, then reveal the book's estimates (Table 3-4).",
      game: WealthGuess,
    },
    {
      kind: "see",
      title: "Table 3-4, bar by bar",
      illus: WealthBars,
      beats: [
        { text: "**Common stocks**: only about **20%** of U.S. capital wealth, despite the media attention.", cite: STOCKS20 },
        { text: "**Real estate** holds about **50%**, and it rarely trades.", cite: MOST_WEALTH },
        { text: "**Bonds** come next: corporate 15%, municipal 10%, government 10%.", cite: T34_BONDS },
        { text: "**Derivatives** represent no wealth: they are in zero net supply. (The column adds to more than 100% because corporations own real estate.)", cite: T34_NOTE },
      ],
    },
    { kind: "idea", title: "Derivatives represent no wealth", body: "Every long position has a matching short, so options, futures and swaps add up to **zero net supply**. They don't own real assets.", cite: DERIV0 },
    {
      kind: "number",
      q: "According to Table 3-4, about what share of U.S. capital wealth is in **real estate**?",
      answer: 50,
      unit: "%",
      why: "Real estate is about 50%, the largest class, though it rarely trades.",
      cite: T34_REAL,
    },
    {
      kind: "choice",
      q: "Why do derivative contracts represent **no** capital wealth?",
      options: ["They are in zero net supply", "They are illegal in most countries", "They trade only over the counter", "They expire within a year"],
      answer: 0,
      why: "Longs and shorts cancel out, and derivatives don't represent ownership of real assets.",
      cite: DERIV0,
    },
    {
      kind: "truefalse",
      q: "Stocks are the largest store of U.S. capital wealth.",
      answer: false,
      why: "Stocks are about 20%; real estate (about 50%) and bonds hold more.",
      cite: T34_STOCKS,
    },
    {
      kind: "recap",
      points: [
        { text: "Stocks are only about **20%** of U.S. capital wealth, less than their media attention suggests.", cite: STOCKS20 },
        { text: "Most wealth is in **real estate** (which rarely trades) and **bonds**.", cite: MOST_WEALTH },
        { text: "Derivatives represent **no wealth**: they are in zero net supply.", cite: DERIV0 },
      ],
    },
  ],
};

const L_LIQUIDITY: Lesson = {
  id: "3.4.1-liquidity",
  sec: "3.4.1",
  title: "Many instruments, little trading",
  pages: "45–47",
  imp: 2,
  steps: [
    { kind: "idea", title: "More instruments, thinner markets", body: "Volume depends partly on how many instruments there are. When a market has **a great number of different instruments**, each one tends to be **illiquid**.", cite: MP_INSTR },
    {
      kind: "see",
      title: "How many issues actually trade?",
      illus: InstrumentDots,
      beats: [
        { text: "**Stocks**: about 1,000 of 15,000 trade actively. Only a few dots light up.", cite: T34_ACTIVE },
        { text: "**Corporate bonds**: 50 of 100,000. Most issues hardly ever trade.", cite: BONDS_RARE },
        { text: "**Municipal bonds**: a million issues, none actively traded." },
        { text: "**Government bonds**: only 50 issues, but each is huge, so these markets are extremely liquid.", cite: GOV_LIQ },
        { text: "**Futures**: 20 of 100 contracts trade actively, among the most liquid instruments in the world.", cite: FUT_LIQ },
      ],
    },
    { kind: "idea", title: "Trading piles into a few stocks", body: "At the NYSE in 2000, the **250 most active** stocks made up **62%** of reported volume.", cite: NYSE62 },
    {
      kind: "number",
      q: "At the NYSE in 2000, the 250 most active stocks accounted for what percent of total reported trading volume?",
      answer: 62,
      unit: "%",
      why: "62%, and an even larger share of dollar volume.",
      cite: NYSE62,
    },
    { kind: "idea", title: "Who the public trades with", body: "In the **most active** stocks, public traders often meet **other public traders**. Elsewhere, they usually trade with **dealers**.", cite: PUBLIC },
    {
      kind: "truefalse",
      q: "Most stock trades are large institutional trades.",
      answer: false,
      why: "Most trades are small retail trades; institutions account for most of the share **volume**.",
      cite: RETAIL,
    },
    { kind: "idea", title: "Bonds: the buy side calls a dealer", body: "Public buyers and sellers rarely want the same bond issue at the same time, so the buy side trades bonds **almost only with dealers**.", cite: BOND_DEALERS },
    {
      kind: "choice",
      q: "Why are government bond markets extremely liquid?",
      options: ["Few, very large issues that many traders follow", "They trade only on exchanges", "The government buys every bond back daily", "They never mature"],
      answer: 0,
      why: "Government issues are far less numerous and far larger than corporate or municipal issues, and interest in them is widespread.",
      cite: GOV_LIQ,
    },
    {
      kind: "classify",
      q: "Liquid, or rarely traded?",
      buckets: ["Very liquid", "Rarely trades"],
      items: [
        { text: "U.S. government bonds", bucket: 0 },
        { text: "A typical municipal bond issue", bucket: 1, why: "A million muni issues; almost none trade actively." },
        { text: "Major world currencies", bucket: 0 },
        { text: "A house", bucket: 1, why: "Every parcel is unique, so buyers and sellers struggle to find each other." },
        { text: "Futures on major commodities", bucket: 0 },
        { text: "Most listed option contracts", bucket: 1, why: "Very few option contracts trade frequently." },
        { text: "The 250 most active NYSE stocks", bucket: 0 },
      ],
      cite: OPT_FEW,
    },
    {
      kind: "choice",
      q: "Why is real estate the **least** liquid market Harris surveys?",
      options: ["Every parcel is unique, so buyers and sellers struggle to find each other", "Real estate cannot legally be sold quickly", "Only dealers may trade it", "It trades only once a year"],
      answer: 0,
      why: "Real estate trades in brokered markets because every parcel is unique; search costs are very high.",
      cite: REAL_EST,
    },
    {
      kind: "choice",
      q: "Why do currency dealers report so much volume?",
      options: ["Dealers trade several times with each other for every client trade", "Every currency trade is counted twice by law", "Currencies have more issues than bonds", "Central banks trade every minute"],
      answer: 0,
      why: "On top of the volume from international trade and capital flows, the market's structure makes dealers trade among themselves several times per client trade.",
      cite: FX_DEALERS,
    },
    {
      kind: "recap",
      points: [
        { text: "Markets with **many instruments** are often illiquid; trading concentrates in a few.", cite: MP_INSTR },
        { text: "The public trades **bonds** almost only with **dealers**; government bonds are the liquid exception.", cite: BOND_DEALERS },
        { text: "**Real estate** is the least liquid: every parcel is unique.", cite: REAL_EST },
      ],
    },
  ],
};

const L_LISTING: Lesson = {
  id: "3.4.2-listing",
  sec: "3.4.2",
  title: "Getting a stock listed",
  pages: "46–47",
  imp: 2,
  steps: [
    { kind: "definition", term: "Listing", body: "A corporation **applies** to an exchange to have its stock traded there. Exchanges list companies that **meet their standards** and **pay listing fees**.", cite: LIST },
    { kind: "definition", term: "Listing standards", body: "Minimums a company must meet: **capital value**, **number of shareholders** and **financial strength**.", cite: LIST_STD },
    {
      kind: "see",
      title: "Through the NYSE's gates (2001 standards)",
      illus: ListingGate,
      beats: [
        { text: "A company applies to list its stock at the **NYSE**." },
        { text: "Gate 1, **shareholders**: at least 2,000 U.S. holders of a round lot or more (one of three alternatives).", cite: NYSE_HOLDERS },
        { text: "Gate 2, **market value**: the publicly held shares must be worth at least $100 million.", cite: NYSE_VALUE },
        { text: "Gate 3, **earnings**: for example, at least $2.5 million pretax in the latest fiscal year.", cite: NYSE_EARN },
        { text: "All standards met and the **listing fee** paid: the stock is listed.", cite: LIST },
      ],
    },
    { kind: "definition", term: "GAAP", aka: ["generally accepted accounting practices"], body: "The accounting rules most exchanges require listed companies to **report their accounts** by, regularly.", cite: GAAP },
    { kind: "definition", term: "Control structure", body: "How shareholders **elect the board of directors**, who appoint the managers. Some exchanges regulate it.", cite: CONTROL },
    {
      kind: "fill",
      q: "Listing standards set minimums for capital value, numbers of ___, and financial ___.",
      bank: ["shareholders", "strength", "employees", "products"],
      answer: ["shareholders", "strength"],
      why: "Capital value, numbers of shareholders and financial strength.",
      cite: LIST_STD,
    },
    {
      kind: "number",
      q: "Under the NYSE's 2001 standards, the publicly held shares must be worth at least how many million dollars (for a company not listing at its IPO)?",
      answer: 100,
      prefix: "$",
      unit: "million",
      why: "$100 million, or $60 million for a company listing at its initial public offering.",
      cite: NYSE_VALUE,
    },
    {
      kind: "choice",
      q: "What must most exchanges' listed companies do with their accounts?",
      options: ["Report them regularly under GAAP", "Publish them only at listing", "Send them to the specialist", "Nothing: accounts are private"],
      answer: 0,
      why: "Most exchanges require regular reporting according to generally accepted accounting practices.",
      cite: GAAP,
    },
    {
      kind: "truefalse",
      q: "All but the smallest publicly traded stocks are listed at one or more markets.",
      answer: true,
      why: "Exchanges list every company that meets their standards and pays the fee, so nearly all public stocks are listed somewhere.",
      cite: ALL_BUT,
    },
    {
      kind: "recap",
      points: [
        { text: "Companies **apply** to list; exchanges list those that meet **standards** and pay **fees**.", cite: LIST },
        { text: "Standards cover **capital value, shareholders and financial strength**.", cite: LIST_STD },
        { text: "Listed companies report under **GAAP**; some exchanges also regulate **control structure**.", cite: GAAP },
      ],
    },
  ],
};

const L_US: Lesson = {
  id: "3.4.2.1-us-markets",
  sec: "3.4.2.1",
  title: "Where a U.S. stock trades",
  pages: "48–49",
  imp: 2,
  steps: [
    { kind: "definition", term: "Primary listing market", body: "The exchange where a stock is **primarily listed**. In the U.S.: the **NYSE**, the **American Stock Exchange** and **Nasdaq**.", cite: PRIMARY },
    { kind: "definition", term: "Listed stocks", body: "Stocks listed at the **NYSE** or the **American Stock Exchange**. Nasdaq stocks, once “over-the-counter” stocks, are now just Nasdaq stocks.", cite: LISTED },
    { kind: "idea", title: "Floor versus screen", body: "At the NYSE and AMEX, **floor brokers** arrange trades on the floor, often helped by dealers called **specialists**. Nasdaq is a **screen-based** network.", cite: FLOOR },
    {
      kind: "see",
      title: "One listed stock, four kinds of venue",
      illus: EquityMap,
      beats: [
        { text: "It trades at its **primary listing market**, for example the NYSE.", cite: PRIMARY3 },
        { text: "Most listed stocks also trade at **regional exchanges**, which can also trade some Nasdaq stocks under **unlisted trading privileges**.", cite: REGIONAL },
        { text: "In the **third market**, dealers and brokers trade it **away from any exchange**.", cite: THIRD },
        { text: "In the **fourth market**, it trades inside **alternative trading systems** such as ECNs.", cite: FOURTH },
      ],
    },
    { kind: "definition", term: "Unlisted trading privileges", body: "Permission from the **SEC** that lets regional exchanges trade some **Nasdaq stocks**.", cite: UTP },
    { kind: "definition", term: "Third market", body: "Dealers and brokers trading **exchange-listed** stocks **away from an exchange**.", cite: THIRD },
    { kind: "definition", term: "Alternative trading systems", aka: ["ATSs"], body: "Electronic trading systems, mostly sponsored by **broker-dealers**. **ECNs** are the best known.", cite: ATS },
    { kind: "definition", term: "Fourth market", body: "Trading in **exchange-listed** stocks **inside alternative trading systems**.", cite: FOURTH },
    {
      kind: "classify",
      q: "Sort the Table 3-5 examples.",
      buckets: ["Primary listing", "Regional", "Third market", "ECN / ATS"],
      items: [
        { text: "New York Stock Exchange", bucket: 0 },
        { text: "Nasdaq National Market", bucket: 0 },
        { text: "Chicago Stock Exchange", bucket: 1 },
        { text: "Philadelphia Stock Exchange", bucket: 1 },
        { text: "Madoff Investment Securities", bucket: 2, why: "A third-market dealer." },
        { text: "Knight Trading Group", bucket: 2, why: "A third-market dealer." },
        { text: "Island", bucket: 3 },
        { text: "Instinet", bucket: 3 },
        { text: "POSIT", bucket: 3, why: "Listed under “other alternative trading systems”." },
      ],
      cite: T35,
    },
    {
      kind: "fill",
      q: "Trading listed stocks with dealers away from an exchange is the ___ market; trading them inside ATSs is the ___ market.",
      bank: ["third", "fourth", "primary", "regional"],
      answer: ["third", "fourth"],
      why: "Third market = off-exchange dealers and brokers; fourth market = inside alternative trading systems.",
      cite: FOURTH,
    },
    {
      kind: "choice",
      q: "On the NYSE floor, who arranges trades for clients, often with help from specialists?",
      options: ["Floor brokers", "ECNs", "Third-market dealers", "Underwriters"],
      answer: 0,
      why: "Floor brokers work the floor; specialists are the exchange's dealers who assist them.",
      cite: FLOOR,
    },
    {
      kind: "truefalse",
      q: "Nasdaq stocks were once known as over-the-counter stocks.",
      answer: true,
      why: "Now they are simply called Nasdaq stocks.",
      cite: OTC_ONCE,
    },
    {
      kind: "today",
      title: "These venues have been reshuffled",
      body: "The NYSE merged with **Archipelago** in 2006 and became a public company; Archipelago is now **NYSE Arca**. Nasdaq bought **Instinet**, owner of the former Island ECN, in 2005 and became a registered **exchange** in 2006. The American Stock Exchange is now **NYSE American**.",
      source: "NYSE and Nasdaq corporate histories",
    },
    {
      kind: "recap",
      points: [
        { text: "**Primary listing markets**: NYSE, AMEX, Nasdaq. NYSE/AMEX stocks are **listed stocks**.", cite: PRIMARY3 },
        { text: "Listed stocks also trade at **regionals**, in the **third market** (off-exchange dealers) and the **fourth market** (ATSs).", cite: THIRD },
        { text: "**ECNs** are the best-known alternative trading systems.", cite: ECN },
      ],
    },
  ],
};

const L_VOLUME: Lesson = {
  id: "3.4.2-volume",
  sec: "3.4.2",
  title: "Counting volume",
  pages: "48",
  imp: 2,
  steps: [
    { kind: "idea", title: "Volume figures don't compare", body: "Markets where **dealers stand between** public traders report **more volume** than markets that match public buyers and sellers directly.", cite: V_COMPARE },
    {
      kind: "see",
      title: "One public trade, three volume counts",
      illus: VolumeCount,
      beats: [
        { text: "At the **NYSE**, a public seller meets a public buyer: **100 shares** of volume.", cite: V_NYSE },
        { text: "At **Nasdaq**, a dealer buys from the seller, then sells to the buyer: **200 shares**.", cite: V_ONE },
        { text: "With **two dealers**, the shares pass through three trades: **300 shares**.", cite: V_TWO },
        { text: "Same public trade, three different numbers. In dealer markets, volume includes the **dealers' own trading**.", cite: V_DEALER },
      ],
    },
    {
      kind: "number",
      q: "A public seller sells 500 shares to a dealer, who then sells them to a public buyer. How many shares of volume does the market report?",
      answer: 1000,
      unit: "shares",
      illustrative: true,
      why: "Two trades of 500 each: 1,000 shares, double what a direct match would report.",
      cite: V_ONE,
    },
    {
      kind: "number",
      q: "Same 500 shares, but Dealer A buys from the seller, sells to Dealer B, and Dealer B sells to the buyer. Reported volume?",
      answer: 1500,
      unit: "shares",
      illustrative: true,
      why: "Three trades of 500: 1,500 shares, triple the public activity.",
      cite: V_TWO,
    },
    {
      kind: "truefalse",
      q: "In a dealer market, reported volume measures only the activity of public traders.",
      answer: false,
      why: "That is true only where public buyers meet public sellers directly. Dealer-market volume adds the dealers' trades.",
      cite: V_PUBLIC,
    },
    { kind: "idea", title: "Some trades are counted twice", body: "Some Nasdaq broker-dealers run their own matching systems and report that volume too, so the **same trades get counted twice**.", cite: V_TWICE },
    { kind: "definition", term: "Trading System View (TSV)", body: "A market that counts only trades that pass **through its own trading system or floor**.", cite: V_TSV },
    { kind: "definition", term: "Regulated Environment View (REV)", body: "A market that counts **every trade under its regulatory supervision**, wherever it was arranged.", cite: V_REV },
    {
      kind: "choice",
      q: "How does the World Federation of Exchanges classify the NYSE and Nasdaq?",
      options: ["NYSE: TSV · Nasdaq: REV", "NYSE: REV · Nasdaq: TSV", "Both TSV", "Both REV"],
      answer: 0,
      why: "The NYSE counts only trades on its own system and floor (TSV); Nasdaq counts all trades under its supervision (REV).",
      cite: V_WFE,
    },
    {
      kind: "recap",
      points: [
        { text: "Dealer intermediation makes one public trade show up as **200 or 300 shares**.", cite: V_TWO },
        { text: "Dealer-market volume includes **dealers' trades**, so it can be highly inflated.", cite: V_DEALER },
        { text: "**TSV** markets (NYSE) count their own trades; **REV** markets (Nasdaq) count all they supervise.", cite: V_WFE },
      ],
    },
  ],
};

const L_WORLD: Lesson = {
  id: "3.4.2.2-world",
  sec: "3.4.2.2",
  title: "Growth and consolidation",
  pages: "47–52",
  imp: 1,
  steps: [
    { kind: "idea", title: "Stock markets boomed", body: "Late in the twentieth century, firms chose **equity over bank loans** and governments **privatized** companies, so stock markets grew worldwide.", cite: GROW },
    { kind: "idea", title: "…and merged", body: "Many exchanges **consolidated** to take advantage of **economies of scale**.", cite: CONSOL },
    {
      kind: "see",
      title: "Mergers among U.S. regional exchanges",
      illus: Consolidation,
      beats: [
        { text: "Four separate exchanges in the Midwest, starting with **Chicago** (founded 1882)." },
        { text: "In 1949 they merge into the **Midwest Stock Exchange**.", cite: MIDWEST },
        { text: "In 1993 it takes back the name **Chicago Stock Exchange**. Its quote symbol is still M, for Midwest.", cite: CHX },
        { text: "On the West Coast: the **San Francisco** and **Los Angeles** exchanges." },
        { text: "In 1957 they merge into the **Pacific Stock Exchange**, later the Pacific Exchange (PCX).", cite: PSE },
        { text: "In 2002 the PCX moves its equity trading to the fully electronic **Archipelago Exchange**.", cite: ARCA },
      ],
    },
    { kind: "idea", title: "Exchanges as symbols", body: "Former Communist countries opened stock exchanges, often before they had stocks or property laws, because exchanges are **symbols of free markets**.", cite: SYMBOL },
    { kind: "quote", lead: "Poland's Warsaw Stock Exchange reopened in 1991. Its first home:", cite: WARSAW },
    {
      kind: "multi",
      q: "Which countries built the most successful new stock markets?",
      options: ["Those that carefully defined property rights", "Those that privatized most government-run enterprises", "Those that adopted and enforced good securities laws", "Those that opened an exchange before having stocks to trade", "Those that kept state companies in government hands"],
      answer: [0, 1, 2],
      why: "Property rights, privatization, and good securities laws diligently enforced.",
      cite: SUCCESS,
    },
    {
      kind: "choice",
      q: "Why did many exchanges consolidate?",
      options: ["To gain economies of scale", "Because regulators required one exchange per country", "To avoid listing fees", "To trade only at night"],
      answer: 0,
      why: "Bigger exchanges spread their fixed costs over more trading.",
      cite: CONSOL,
    },
    {
      kind: "truefalse",
      q: "In 2001, the largest Israeli stock market by capitalization and trading volume was the Tel Aviv Stock Exchange.",
      answer: false,
      why: "It was the U.S. Nasdaq Stock Market: many high-tech Israeli companies listed there instead.",
      cite: ISRAEL,
    },
    {
      kind: "fill",
      q: "One of the section's main points: exchanges everywhere have been ___.",
      bank: ["consolidating", "multiplying", "closing", "nationalizing"],
      answer: ["consolidating"],
      why: "The third of the three points Harris lists at the start of §3.4.",
      cite: MP_CONSOL,
    },
    {
      kind: "recap",
      points: [
        { text: "Stock markets **grew** as firms chose equity and governments privatized.", cite: GROW },
        { text: "Exchanges **consolidate** for economies of scale.", cite: CONSOL },
        { text: "New markets succeed where **property rights and securities laws** are strong and enforced.", cite: SUCCESS },
      ],
    },
  ],
};

const L_OPTIONS: Lesson = {
  id: "3.4.3-options",
  sec: "3.4.3",
  title: "Equity options markets",
  pages: "50–54",
  imp: 2,
  steps: [
    { kind: "idea", title: "One clearinghouse for every U.S. options exchange", body: "The **Options Clearing Corporation (OCC)** clears every contract at all five U.S. options exchanges, so you can **buy at one exchange and sell at another**.", cite: OCC },
    {
      kind: "see",
      title: "Buy at the CBOE, sell at the ISE",
      illus: OccFungible,
      beats: [
        { text: "You **buy** a call at the CBOE. The trade clears at the **OCC**: you are long 1 call." },
        { text: "Later you **sell** the same call at the ISE. It also clears at the OCC, so your position **offsets** to zero.", cite: OCC },
        { text: "It works because the OCC is the **issuer and guarantor** of every option traded at U.S. exchanges.", cite: OCC_GUAR },
      ],
    },
    {
      kind: "truefalse",
      q: "If you buy an option at one U.S. options exchange, you must sell it at the same exchange.",
      answer: false,
      why: "All U.S. listed options clear through the OCC, so you can offset at any exchange that trades the contract.",
      cite: OCC,
    },
    { kind: "idea", title: "Floors and one fully automated newcomer", body: "Four of the five options exchanges were **floor-based**. The **ISE** started in 2000 with a **completely automated** system and grew fast.", cite: ISE },
    { kind: "definition", term: "Synthetic derivatives", body: "Custom contracts, such as options with **non-standard** strikes, maturities or settlement terms, and swaps, that **investment banks** create over the counter for clients.", cite: SYNTH },
    { kind: "definition", term: "FLEX options", body: "**Exchange-traded** options with **custom terms**: through a request for quote, an institution picks the type, strike, maturity and exercise style.", cite: FLEX },
    {
      kind: "multi",
      q: "In a FLEX request for quote, what can the institution specify?",
      options: ["Call or put", "Strike price", "Maturity date (up to three years)", "American or European exercise", "Which clearinghouse guarantees it"],
      answer: [0, 1, 2, 3],
      why: "Type, strike, maturity and exercise style. The clearinghouse is always the OCC.",
      cite: FLEX,
    },
    {
      kind: "choice",
      q: "Outside the United States, where do standardized stock options usually trade?",
      options: ["At the same exchange as the underlying stocks", "Only over the counter", "Only at futures exchanges", "At a single global options exchange"],
      answer: 0,
      why: "In the U.S., by contrast, the SEC has not let stocks and their options trade side by side.",
      cite: SAME_EX,
    },
    {
      kind: "truefalse",
      q: "Single-stock futures were illegal in the U.S. until December 2001.",
      answer: true,
      why: "The Commodity Futures Modernization Act of 2000 lifted the ban.",
      cite: SSF,
    },
    {
      kind: "recap",
      points: [
        { text: "The **OCC** clears all U.S. listed options: buy at one exchange, sell at another.", cite: OCC },
        { text: "Banks sell custom OTC options (**synthetic derivatives**); exchanges answered with **FLEX** options.", cite: SYNTH },
        { text: "In the U.S., stocks and their options may not trade **side by side**.", cite: SIDE },
      ],
    },
  ],
};

const L_FUTURES: Lesson = {
  id: "3.4.4-futures",
  sec: "3.4.4",
  title: "Futures markets",
  pages: "54–57",
  imp: 3,
  steps: [
    { kind: "idea", title: "Futures exchanges don't share contracts", body: "Most futures exchanges have **their own clearinghouse**, so they **don't compete** to trade the same contracts. Each designs **new** contracts to attract traders.", cite: OWN_CH },
    {
      kind: "choice",
      q: "Why can't a futures trader usually close a position at a rival exchange, when an options trader can?",
      options: ["Each futures exchange clears through its own clearinghouse", "Futures can never be closed early", "Futures trade only over the counter", "Options have no clearinghouse at all"],
      answer: 0,
      why: "Options share one clearinghouse (the OCC); futures exchanges each have their own, so their contracts aren't interchangeable.",
      cite: OWN_CH,
    },
    { kind: "definition", term: "Front month contract", aka: ["front contract"], body: "Of a commodity's contracts, the one that **expires next**. The later ones are the **back contracts**.", cite: FRONT },
    {
      kind: "see",
      title: "Front month, back months, and the roll",
      illus: FrontRoll,
      beats: [
        { text: "Each commodity has several contracts by delivery month, usually at least **four**. The next to expire is the **front month**.", cite: MONTHS4 },
        { text: "A trader holds 10 contracts in the **front month**, where most of the trading is." },
        { text: "When it expires, the trader **rolls** the position into the next contract, which becomes the new front month.", cite: ROLL },
        { text: "In crops, the **first harvest contract**, the first one that can deliver the growing crop, also draws heavy trading.", cite: HARVEST },
      ],
    },
    { kind: "definition", term: "Roll", body: "Move a position from the **expiring** contract into the **next** one.", cite: ROLL },
    { kind: "definition", term: "First harvest contract", body: "The first contract on which traders can **deliver the crop now growing**. Hedgers and speculators watch it closely.", cite: HARVEST },
    {
      kind: "choice",
      q: "The front month contract is about to expire. A trader who wants to keep the exposure will…",
      options: ["Roll the position into the next contract", "Ask the clearinghouse to extend the contract", "Switch to a back contract from last year", "Do nothing: futures renew automatically"],
      answer: 0,
      why: "Traders mostly trade the front month and roll into the next contract when it expires.",
      cite: ROLL,
    },
    {
      kind: "truefalse",
      q: "In financial and industrial commodities, most trading happens in the back contracts.",
      answer: false,
      why: "Traders mostly trade only the front month contract.",
      cite: ROLL,
    },
    {
      kind: "fill",
      q: "U.S. futures exchanges are often called ___ of ___.",
      bank: ["boards", "trade", "houses", "commerce"],
      answer: ["boards", "trade"],
      why: "As in the Chicago Board of Trade.",
      cite: BOARDS,
    },
    {
      kind: "choice",
      q: "According to Table 3-10, which exchange had the largest futures contract volume in 2001?",
      options: ["Eurex", "Chicago Mercantile Exchange", "Chicago Board of Trade", "LIFFE"],
      answer: 0,
      why: "Eurex (Germany and Switzerland) ranked first with 435.1 million contracts, ahead of the CME and the CBOT.",
      cite: T310,
    },
    {
      kind: "recap",
      points: [
        { text: "Each futures exchange has its **own clearinghouse** and designs its **own contracts**.", cite: DESIGN },
        { text: "The **front month** expires next; the rest are **back contracts**.", cite: FRONT },
        { text: "Traders **roll** into the next contract; crops also trade the **first harvest** contract.", cite: ROLL },
      ],
    },
  ],
};

const L_BONDS: Lesson = {
  id: "3.4.5-bonds-treasuries",
  sec: "3.4.5",
  title: "Bonds and Treasuries",
  pages: "54–58",
  imp: 2,
  steps: [
    { kind: "idea", title: "Bonds trade over the counter", body: "Most **corporate and municipal bonds** trade **OTC**, in investment and commercial banks. Exchange bond volume is trivial.", cite: OTC_BONDS },
    {
      kind: "number",
      q: "Less than what percent of corporate bond trading volume occurs on the NYSE and AMEX bond markets?",
      answer: 0.1,
      unit: "%",
      why: "Less than 0.1%: almost all of it is over the counter.",
      cite: PCT01,
    },
    {
      kind: "truefalse",
      q: "The exchange bond prices printed in newspapers are a reliable picture of the bond market.",
      answer: false,
      why: "So little bond trading happens on exchanges that those tables are less reliable than you might imagine.",
      cite: PAPERS,
    },
    { kind: "idea", title: "Treasuries are sold at auction", body: "Most national treasuries issue their **bills, notes and bonds** at **public auctions**.", cite: AUCTION },
    { kind: "definition", term: "Primary government securities dealers", aka: ["primary dealers"], body: "The few large broker-dealers the **Federal Reserve** trades with.", cite: FED_PD },
    {
      kind: "see",
      title: "How the Fed's desk buys Treasuries",
      illus: FedDesk,
      beats: [
        { text: "To **add reserves** to the banking system, the Fed buys Treasury bills and bonds.", cite: FED_ADD },
        { text: "Its traders **request offers** from the primary dealers." },
        { text: "Each dealer answers with a **price**. (Our numbers.)" },
        { text: "The Fed buys from the dealer with the **best price**, and pays with money it simply creates.", cite: FED_BEST },
      ],
    },
    {
      kind: "multi",
      q: "What must primary dealers do in exchange for dealing with the Fed?",
      options: ["Quote firm prices for large sizes whenever the Fed wants to trade", "Participate meaningfully in Treasury auctions", "Supply information about market conditions", "Become government employees", "Give up year-end bonuses"],
      answer: [0, 1, 2],
      why: "Firm quotes, auction participation and market information. It's the Fed's own traders who get no year-end bonus.",
      cite: FED_OBL,
    },
    { kind: "definition", term: "Interdealer brokers", body: "Brokers that let government bond dealers (and some large buy-side traders) trade **with each other anonymously**.", cite: INTERDEALER },
    {
      kind: "choice",
      q: "Why do dealers trade with each other through interdealer brokers?",
      options: ["To stay anonymous: dealers don't want rivals to see their trades", "Because the Fed requires it", "To avoid paying for Treasuries", "Because exchanges ban dealer-to-dealer trades"],
      answer: 0,
      why: "Dealers generally do not want other dealers to know what trades they are doing.",
      cite: INTERDEALER,
    },
    {
      kind: "choice",
      q: "Which firm does Harris name as the largest interdealer government bond broker?",
      options: ["Cantor Fitzgerald", "Reuters", "Instinet", "Knight Trading Group"],
      answer: 0,
      why: "Its government bond markets are among the world's most liquid markets.",
      cite: CANTOR,
    },
    {
      kind: "recap",
      points: [
        { text: "Corporate and municipal bonds trade **OTC**; under 0.1% on exchanges.", cite: PCT01 },
        { text: "Treasuries are issued at **auction**; the Fed trades with **primary dealers** at the best price.", cite: FED_BEST },
        { text: "Secondary Treasury trading is **OTC**, with **interdealer brokers** for anonymity.", cite: SECONDARY },
      ],
    },
  ],
};

const L_FX: Lesson = {
  id: "3.4.7-swaps-currencies",
  sec: "3.4.7",
  title: "Swaps and currencies",
  pages: "47, 58–59",
  imp: 1,
  steps: [
    { kind: "idea", title: "Swaps and currencies trade OTC", body: "Swaps and spot currencies trade mostly **over the counter** at banks. Brokers and data providers help traders **find counterparts** more cheaply.", cite: SEARCH },
    { kind: "idea", title: "Why currency volume is huge", body: "International trade and cross-border investment need **currency conversions**, and dealers trade **several times with each other** for every client trade.", cite: FX_VOL },
    {
      kind: "match",
      q: "Match each wholesale OTC broker to its market (2001).",
      pairs: [
        ["Reuters", "Foreign exchange"],
        ["Garban-Intercapital", "Swaps"],
        ["Cantor Fitzgerald", "U.S. government bonds"],
      ],
      cite: REUTERS,
    },
    { kind: "idea", title: "Retail currency is expensive", body: "Airport and tourist-area currency dealers charge a **fee** and earn a **wide spread**, partly to pay **high rents**.", cite: RFX_RENT },
    {
      kind: "see",
      title: "Airport booth or ATM?",
      illus: RetailFx,
      beats: [
        { text: "At an airport booth you pay a **fee** plus a **wide spread**: the booth must cover rent, security and idle clerks.", cite: RFX_FEE },
        { text: "You get back noticeably fewer euros. (Our numbers.)" },
        { text: "At an **ATM** you pay a small access fee, and your bank pools your trade with many others.", cite: ATM },
        { text: "The rate is far better, so you get more euros for the same dollars." },
      ],
    },
    {
      kind: "multi",
      q: "Which costs make airport currency dealers expensive, according to Harris?",
      options: ["Security precautions against robbery", "Salaries for clerks who are often idle", "High rents near airports and tourist sites", "A government tax on travelers"],
      answer: [0, 1, 2],
      why: "Rents, security and idle clerks. The book mentions no traveler tax.",
      cite: RFX_COSTS,
    },
    {
      kind: "choice",
      q: "Why does your bank give you a better exchange rate through an ATM?",
      options: ["It pools your trade with many others and has more negotiating clout", "ATM rates are set by the central bank", "ATMs avoid the spread entirely", "Banks lose money on purpose to win customers"],
      answer: 0,
      why: "Consolidation and bargaining power: the same reasons big traders get better prices.",
      cite: ATM,
    },
    {
      kind: "truefalse",
      q: "Retail currency dealers profit from both a fee and the spread between their buying and selling prices.",
      answer: true,
      why: "They charge a significant fee and also profit from a wide bid–ask spread.",
      cite: RFX_FEE,
    },
    {
      kind: "classify",
      q: "Mostly over the counter, or mostly on exchanges? (circa 2001)",
      buckets: ["Over the counter", "Exchanges"],
      items: [
        { text: "Corporate bonds", bucket: 0 },
        { text: "Swaps", bucket: 0 },
        { text: "Spot currencies", bucket: 0 },
        { text: "Futures contracts", bucket: 1 },
        { text: "Standardized equity options", bucket: 1 },
        { text: "Treasuries after issue (secondary trading)", bucket: 0 },
        { text: "Custom options from an investment bank", bucket: 0, why: "Part of the synthetic derivatives business." },
      ],
      cite: SWAPS_OTC,
    },
    {
      kind: "recap",
      points: [
        { text: "Swaps and spot currencies trade mostly **OTC**; brokers lower **search costs**.", cite: SEARCH },
        { text: "Retail currency is **expensive**: fees plus wide spreads.", cite: RFX_PRICEY },
        { text: "ATMs give better rates because banks **pool** trades and **negotiate** better.", cite: ATM },
      ],
    },
  ],
};

const CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "Most trades are small retail trades. Who accounts for most share **volume**?",
    options: ["Large institutional traders", "Retail traders", "The Federal Reserve", "Exchange specialists"],
    answer: 0,
    why: "Many small retail trades, but institutions trade most of the shares.",
    cite: RETAIL,
  },
  {
    kind: "truefalse",
    q: "Trading exchange-listed stocks inside alternative trading systems is called the third market.",
    answer: false,
    why: "That is the fourth market. The third market is dealers and brokers trading listed stocks off-exchange.",
    cite: FOURTH,
  },
  {
    kind: "choice",
    q: "Which U.S. primary listing market is a screen-based electronic network rather than a trading floor?",
    options: ["Nasdaq", "New York Stock Exchange", "American Stock Exchange", "Chicago Board of Trade"],
    answer: 0,
    why: "Nasdaq lets brokers and dealers meet in a screen-based environment; the NYSE and AMEX had floors.",
    cite: NASDAQ,
  },
  {
    kind: "choice",
    q: "How many of the five U.S. options exchanges used floor-based trading systems in 2001?",
    options: ["Four", "One", "Five", "None"],
    answer: 0,
    why: "Four were floor-based; the ISE was completely automated.",
    cite: FLOOR4,
  },
];


export const U34: Unit = {
  sec: "3.4",
  title: "Where Are the Trading Markets?",
  pages: "44–59",
  lessons: [L_WEALTH, L_LIQUIDITY, L_LISTING, L_US, L_VOLUME, L_WORLD, L_OPTIONS, L_FUTURES, L_BONDS, L_FX],
  checkpoint: CHECKPOINT,
};
