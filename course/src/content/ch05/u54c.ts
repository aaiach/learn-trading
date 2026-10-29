// 5.4.6 ORDER PRESENTATION SYSTEMS, 5.4.6.1 Accuracy in Oral Communications, 5.4.7 ORDER BOOKS (pp. 105–110),
// then the 5.5 SUMMARY and 5.6 SOME POINTS TO REMEMBER (pp. 110–111), which close unit 5.4.
import type { Cite, Lesson, Question } from "../types.ts";
import {
  BroadcastVsMessage,
  BrokerHandoff,
  DealerBook,
  Dispute,
  FourDials,
  HandSignals,
  InsideBook,
  IoiBoard,
  OpenClosed,
  OutTrade,
  PinkTimeline,
  PitShouts,
} from "./illus/u54c.tsx";
import { PitTalk } from "./games/PitTalk.tsx";
import { MarketProfile } from "./games/MarketProfile.tsx";

const c = (p: number | string, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 5.4.6 Order Presentation Systems ──────────────────────────────
const PRES = c(105, "5.4.6", "Order presentation systems reveal information about orders and quotes to the traders who arrange trades.");
const ANYWHERE = c(105, "5.4.6", "Traders like screen-based systems because they can use them anywhere and can update them easily.");
const BROADCAST = c(105, "5.4.6", "Some screen-based trading systems broadcast all information presented to all participants.");
const MESSAGING = c(105, "5.4.6", "called messaging systems, allow traders to send private messages to specific traders or classes of traders.");
const DEALER_MSG = c(105, "5.4.6", "Traders in dealer markets often use these systems to negotiate their trades.");
const SUCCESSORS = c(107, "5.4.6", "Screen-based systems are the technological successors to board-based trading systems.");
const BOARD = c(107, "5.4.6", "In board-based trading systems, traders or exchange clerks write orders on a big board for all to see.");
const BIG_BOARD = c(107, "5.4.6", "As a reflection of its importance, the NYSE became known as the “Big Board.”", { box: "The Big Board" });
const BIG_GONE = c(107, "5.4.6", "Although the Exchange long ago replaced these boards with electronic systems, its nickname endures.", { box: "The Big Board" });
const VIDEO = c(107, "5.4.6", "The first video market information systems were closed-circuit video systems that distributed real-time images of exchange boards.", { box: "Early Video Display Systems" });
const BULLETIN = c(107, "5.4.6", "Bulletin boards are information systems upon which people post indications of interest.");
const IOI_SHOW = c(107, "5.4.6", "Indications usually show the name of a broker-dealer, the name of the security, and whether the broker represents a buyer or a seller.");
const IOI_FIRM = c(107, "5.4.6", "Indications may also show prices, but they are rarely firm.");
const IOI_USE = c(107, "5.4.6", "Traders use indications to show other traders that they are interested in trading.");
const IOI_DISCOVER = c(107, "5.4.6", "They also sometimes use them to discover who is interested in trading.");
const AUTEX = c(107, "5.4.6", "For listed stocks, institutional traders primarily use AutEx or Bridge Information Systems to post electronic order indications.");
const OTCBB = c(107, "5.4.6", "For thinly traded, over-the-counter stocks, traders use the Nasdaq OTC Bulletin Board.");
const PINK = c(107, "5.4.6", "For the smallest and least frequently traded stocks, traders post their indications in the Pink Sheets published by the National Quotation Bureau.");
const POPUP = c(107, "5.4.6", "These systems try to anticipate what trades will interest traders' clients and direct only those indications to them.");
const QUICK = c(107, "5.4.6", "Floor traders like oral auctions because they are very quick.");
const PRONE = c(107, "5.4.6", "Their communications are prone to error, however, because traders often do not say what they intend to say and because traders often do not hear what other traders have said.");
const PHONE = c(107, "5.4.6", "Since they usually use the telephone, they cannot see the visual clues that help us understand speech.");

const PINK_BOX = "The Pink Sheets, Nasdaq, and Technological Evolution";
const PINK_1913 = c(108, "5.4.6.1", "started publishing weekly editions of the Pink Sheets in 1913 and daily editions five years later.", { box: PINK_BOX });
const PINK_REPLACED = c(108, "5.4.6.1", "Since the NASDAQ system allowed traders to present, access, and exchange information faster, it largely replaced the Pink Sheets.", { box: PINK_BOX });
const PINK_GREW = c(108, "5.4.6.1", "The NASDAQ system grew into the Nasdaq Stock Market and the Nasdaq OTC Electronic Bulletin Board.", { box: PINK_BOX });
const PINK_NOW = c(108, "5.4.6.1", "The Pink Sheets now report order indications only for the smallest publicly traded U.S. stocks.", { box: PINK_BOX });

// ── Excerpts: 5.4.6.1 Accuracy in Oral Communications ───────────────────────
const COSTLY = c(107, "5.4.6.1", "Otherwise, very serious and costly errors may result.");
const NOISY = c(107, "5.4.6.1", "Effective communication can be very difficult when traders are in a noisy environment, when significant distractions compete for their attention, and when they hurry.");
const OUT_RATE = c(107, "5.4.6.1", "In open-outcry trading in large futures pits, the out-trade rate is often as high as 4 percent.");
const OUT_TRADE = c(107, "5.4.6.1", "An out-trade results when one trader reports a trade that does not exactly match a report from another trader.");
const DK = c(107, "5.4.6.1", "In equity markets, unmatched trade reports are called DKs (Don't Know).");
const AVOID = c(107, "5.4.6.1", "Traders use various systems to avoid misunderstandings.");
const ESPEED = c(108, "5.4.6.1", "Cantor Fitzgerald's eSpeed government bond trading system allows traders to see what they have said to their Cantor broker.");
const SELLERS = c(108, "5.4.6.1", "Traders indicate that they are sellers by holding their palm away from them.");
const PUSH = c(108, "5.4.6.1", "In effect, they push the item away.");
const BUYERS = c(108, "5.4.6.1", "Buyers hold their palms inward, to pull in the item.");
const FINGERS = c(108, "5.4.6.1", "Traders convey prices and quantities by extending fingers, by holding the hand upright or sideways, and by touching their faces in various places.");
const FIXED = c(108, "5.4.6.1", "Traders commonly express their bids and offers in fixed formats to avoid confusion.");
const BID_FOR = c(108, "5.4.6.1", "When bidding, they express the price followed by the preposition “for” and then the quantity.");
const SIX_FOR = c(108, "5.4.6.1", "A trader who shouts out “6 for 20” is a buyer willing to pay 6 for 20 contracts.");
const OFFER_AT = c(108, "5.4.6.1", "When offering, traders express the quantity first followed by the preposition “at” and then the price.");
const FORTY_AT = c(108, "5.4.6.1", "A trader who shouts “40 at a quarter” is a seller willing to sell 40 contracts at the price of a quarter.");
const LAST_DIGIT = c(108, "5.4.6.1", "To further reduce confusion, traders usually express only the last digit or fractional portion of the price.");
const COMMON = c(108, "5.4.6.1", "Since the rest of the price is common knowledge, they do not need to express it.");
const SPEEDS = c(108, "5.4.6.1", "This practice speeds up their communications, and it reduces the amount of noise that traders might mistake for significant information.");
const REPEAT = c(108, "5.4.6.1", "Traders who trade over the telephone often repeat what they hear and then ask for confirmation.");
const RECORD = c(108, "5.4.6.1", "Most record their telephone calls to help resolve any disputes that may arise from misunderstandings.");
const WHO_ERRED = c(108, "5.4.6.1", "When errors do occur, the involved traders attempt to determine who was mistaken.");
const RECOGNIZE = c(108, "5.4.6.1", "Usually, one trader will recognize his error and correct it.");
const SPLIT = c(109, "5.4.6.1", "the traders often resolve the disputed trade by splitting the difference.");
const SHUN = c(109, "5.4.6.1", "However, traders quickly shun traders who make many mistakes.");
const SEE_SAY = c(108, "5.4.6.1", "This system allowed them to recognize and correct errors as they occurred.", { box: "See What You Say" });
const HK_BOX = "Microwaving Traders at the Hong Kong Futures Exchange";
const HK_WINDOWS = c(109, "5.4.6.1", "To obtain better reception for their cell phones, the brokers would stand near the windows on the sides of the trading room.", { box: HK_BOX });
const HK_FIX = c(109, "5.4.6.1", "The Exchange solved the problem by installing a low-powered cellular phone transceiver station inside the trading room.", { box: HK_BOX });

// ── Excerpts: 5.4.7 Order Books ─────────────────────────────────────────────
const BOOKS = c(109, "5.4.7", "All brokers, exchanges, and dealers that represent orders maintain order books to hold open orders that they cannot yet fill.");
const FORMS = c(109, "5.4.7", "The order books may be electronic databases, files, boxes of paper order tickets, or simply desktop piles of order tickets.");
const LIMITS = c(109, "5.4.7", "Order books mostly contain standing limit orders.");
const STOPS = c(109, "5.4.7", "They may also include stop orders and market-if-touched orders with price contingencies that have not yet been met.");
const REVEAL = c(109, "5.4.7", "They reveal the conditions under which traders will trade.");
const AHEAD = c(109, "5.4.7", "clever traders who know what other traders intend to do often can make money by trading ahead of them.");
const ACCESS = c(109, "5.4.7", "Access to the order book therefore is an important determinant of trader profitability.");
const OPEN = c(109, "5.4.7", "Open book markets fully display their order books to all traders.");
const CLOSED = c(109, "5.4.7", "Closed book markets do not show their orders.");
const NOT_SEEN = c(109, "5.4.7", "Many traders, however, do not want other traders to see their orders.");
const HOLD = c(109, "5.4.7", "They, or their brokers, instead hold them until suitable trading opportunities arise.");
const WORK_BEST = c(109, "5.4.7", "Rule-based order-matching systems work best when traders place standing limit orders in their system order books.");
const PROTECT = c(109, "5.4.7", "To protect limit order traders, some markets either restrict access to the book or allow traders to specify that their standing orders not be displayed in the book.");
const EURONEXT = c(109, "5.4.7", "Euronext, for example, allows traders to submit undisclosed limit orders.");
const REPRESENT = c(109, "5.4.7", "Brokers are responsible for representing the unfilled orders of their clients.");
const MONITOR = c(109, "5.4.7", "Since they usually cannot closely monitor all markets in which their customers have placed orders, they may give their clients' orders to others to manage.");
const SYS_BOOK = c(109, "5.4.7", "In markets with rule-based order-matching systems, they usually will submit the order to the system order book.");
const SPECIALIZE = c(109, "5.4.7", "In other markets, they may give orders to brokers or dealers who specialize in the specified securities.");
const SERVICE = c(109, "5.4.7", "Many dealers maintain order books as a service to the brokers who send them order flow.");
const HOPE = c(109, "5.4.7", "By encouraging brokers to send them limit orders, the dealers hope that brokers will also send them market orders.");
const LIKE_LIMITS = c(109, "5.4.7", "Moreover, some dealers like to hold limit orders");
const NO_CHARGE = c(110, "5.4.7", "Dealers usually do not charge for the brokerage services that they provide to brokers.");

// ── Excerpts: 5.5 Summary and 5.6 Some Points to Remember ───────────────────
const DETERMINE = c(110, "5.5", "The differences determine how the markets operate, who can supply liquidity, who knows current market conditions best, and who can act first.");
const AFFECTS = c(110, "5.5", "Market structure therefore affects market liquidity, transaction costs, and price efficiency.");
const MOST = c(110, "5.5", "Markets differ most in how they arrange trades.");
const QD = c(110, "5.5", "In quote-driven markets, dealers arrange all trades and provide all liquidity.");
const OD = c(110, "5.5", "In order-driven markets, traders or electronic trading systems arrange trades by matching public orders.");
const WHEN_WHERE = c(110, "5.5", "Markets differ significantly in when and where they trade.");
const NEGOTIATE = c(110, "5.5", "Markets also differ in how traders negotiate with each other.");
const TRANSPARENT = c(110, "5.5", "Transparent markets allow traders to see all orders, quotes, and trades as they occur.");
const BEST = c(110, "5.5", "The best structure for a given market undoubtedly depends on the instrument, on why people want to trade it, and on the communications and computing technologies that traders can use to trade it.");
const PARIS = c(102, "5.4.4", "Euronext Paris Bourse All orders All trades immediately", { table: "Table 5-7" });
const PT_CALL = c(110, "5.6", "Call markets convene all traders at the same time and place.");
const PT_CONT = c(110, "5.6", "Continuous markets arrange trades when willing buyers arrive and find waiting sellers, or when willing sellers arrive and find waiting buyers.");
const PT_LIQ = c(110, "5.6", "Dealers supply all liquidity in pure quote-driven markets. Public traders and dealers supply liquidity in order-driven markets. Public traders supply liquidity in brokered markets.");
const PT_SEARCH = c(110, "5.6", "Brokers arrange trades by searching for willing traders in brokered markets.");
const PT_INFO = c(111, "5.6", "Access to information about orders and trades is extremely valuable to traders.");
const PT_PUBLIC = c(111, "5.6", "Public traders generally favor transparent markets.");

export const U54C_LESSONS: Lesson[] = [
  // ── 5.4.6 Screens, boards and voices ──────────────────────────────────────
  {
    id: "5.4.6-presentation",
    sec: "5.4.6",
    title: "Screens, boards and voices",
    pages: "105–107",
    imp: 2,
    steps: [
      {
        kind: "definition",
        term: "Order presentation system",
        body: "The system that **shows orders and quotes** to the traders who arrange trades: a **screen**, a **board** or traders' **voices**.",
        cite: PRES,
      },
      {
        kind: "idea",
        title: "Screens go anywhere",
        body: "Screen-based markets show orders on **computer screens**. Traders like them because they work **anywhere** and update **easily**.",
        cite: ANYWHERE,
      },
      {
        kind: "see",
        title: "Broadcast or private message",
        illus: BroadcastVsMessage,
        beats: [
          { text: "A new offer reaches a screen-based market. A **broadcast** system shows it to **every participant** at once.", cite: BROADCAST },
          { text: "A **messaging system** sends a **private message** to one chosen trader. The others see nothing.", cite: MESSAGING },
          { text: "In **dealer markets**, a client and a dealer often **negotiate** a trade this way, message by message.", cite: DEALER_MSG },
        ],
      },
      {
        kind: "choice",
        q: "A client wants to negotiate a bond trade **privately** with one dealer, on screen. Which system fits?",
        options: ["A messaging system", "A broadcast system", "A bulletin board", "A board above the floor"],
        answer: 0,
        why: "Messaging systems send private messages to chosen traders. Dealer-market traders often negotiate this way.",
        cite: DEALER_MSG,
      },
      {
        kind: "truefalse",
        q: "Every screen-based system shows **all** its information to **all** participants.",
        answer: false,
        why: "Some broadcast everything, but **messaging systems** send private messages to specific traders.",
        cite: MESSAGING,
      },
      {
        kind: "idea",
        title: "Boards came first",
        body: "Before screens, traders or exchange clerks **wrote orders on a big board** for all to see. Screens are its successors; most boards are now published electronically.",
        cite: BOARD,
      },
      {
        kind: "quote",
        lead: "Where the NYSE's nickname comes from:",
        cite: BIG_BOARD,
        mark: ["Big Board"],
      },
      {
        kind: "idea",
        title: "Voices: fast but error-prone",
        body: "In **oral auctions**, traders **yell** bids and offers on the floor. It is very **quick**, but traders often don't say what they mean, or don't hear what others said.",
        cite: PRONE,
      },
      {
        kind: "classify",
        q: "Screen, board or voice?",
        buckets: ["Screen", "Board", "Voice"],
        items: [
          { text: "A private message to one dealer", bucket: 0, why: "A messaging system is screen-based." },
          { text: "Orders you can watch from anywhere", bucket: 0, why: "Traders like screens because they work anywhere." },
          { text: "A clerk writes an order on the wall", bucket: 1, why: "That is a board-based system." },
          { text: "Orders for a rarely traded stock, posted for all to see", bucket: 1, why: "Some markets still post such orders on boards." },
          { text: "Bids yelled across the trading floor", bucket: 2, why: "Oral auctions present orders by voice." },
          { text: "A dealer quotes a price over the phone", bucket: 2, why: "Many dealer markets negotiate orally, by telephone." },
        ],
        cite: SUCCESSORS,
      },
      {
        kind: "multi",
        q: "Why are oral communications **prone to error**? (Select all that apply.)",
        options: ["Traders don't always say what they intend", "Traders don't always hear what others said", "On the phone there are no visual clues", "Oral auctions are very slow"],
        answer: [0, 1, 2],
        why: "Oral auctions are very **quick**, not slow. The errors come from saying and hearing, and phones remove visual clues.",
        cite: PRONE,
      },
      {
        kind: "choice",
        q: "Why do floor traders like oral auctions?",
        options: ["They are very quick", "They never produce errors", "They hide every order", "They keep a perfect record"],
        answer: 0,
        why: "Speed is the attraction. The price is a higher rate of communication errors.",
        cite: QUICK,
      },
      {
        kind: "truefalse",
        q: "Dealers negotiating by **telephone** must be extra careful, because they can't see the visual clues that help us understand speech.",
        answer: true,
        why: "Without visual clues, misunderstandings are easier, so phone traders must be careful.",
        cite: PHONE,
      },
      {
        kind: "recap",
        points: [
          { text: "**Order presentation systems** show orders and quotes to the traders who arrange trades.", cite: PRES },
          { text: "Screens either **broadcast** to all or carry **private messages**; dealers negotiate by message.", cite: DEALER_MSG },
          { text: "**Boards** came before screens; **oral auctions** are quick but prone to error.", cite: PRONE },
        ],
      },
    ],
  },

  // ── 5.4.6 Indications of interest ─────────────────────────────────────────
  {
    id: "5.4.6-ioi",
    sec: "5.4.6",
    title: "Indications of interest",
    pages: "107–108",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Indication of interest (IOI)",
        aka: ["order indication"],
        body: "A posted **expression of interest in trading**: which broker-dealer, which security, **buyer or seller**. It may show a price, but it is **rarely firm**.",
        cite: IOI_SHOW,
      },
      {
        kind: "definition",
        term: "Bulletin board",
        body: "An information system where traders **post indications of interest** for other traders to see.",
        cite: BULLETIN,
      },
      {
        kind: "see",
        title: "An IOI on the board",
        illus: IoiBoard,
        beats: [
          { text: "A broker-dealer posts an **indication**: its name, the **security** and the **side**. Here it represents a **buyer**. (Our example.)", cite: IOI_SHOW },
          { text: "It may add a price, but the price is **rarely firm**: it is an interest, not an order.", cite: IOI_FIRM },
          { text: "Traders scan the board. A seller with stock to sell sees the IOI and **calls that broker**.", cite: IOI_USE },
          { text: "The IOI did its job: it **revealed who is interested**. The trade itself is negotiated by phone.", cite: IOI_DISCOVER },
        ],
      },
      {
        kind: "multi",
        q: "What does an indication of interest **usually** show? (Select all that apply.)",
        options: ["The broker-dealer's name", "The security", "Whether it's a buyer or a seller", "A firm price", "The client's name"],
        answer: [0, 1, 2],
        why: "An IOI names the broker-dealer, the security and the side. Prices, when shown, are rarely firm; the client stays unnamed.",
        cite: IOI_SHOW,
      },
      {
        kind: "truefalse",
        q: "The price on an IOI is a firm commitment to trade at that price.",
        answer: false,
        why: "Indications may show prices, but they are **rarely firm**.",
        cite: IOI_FIRM,
      },
      {
        kind: "choice",
        q: "Besides showing that they want to trade, traders sometimes use IOIs to…",
        options: ["discover who is interested in trading", "cancel standing orders", "report trades to regulators", "set the opening price"],
        answer: 0,
        why: "Posting or reading indications is a way to find out who else wants to trade.",
        cite: IOI_DISCOVER,
      },
      {
        kind: "idea",
        title: "Which board for which stock",
        body: "In 2003: **listed** stocks → institutions use **AutEx** or **Bridge**. Thin **OTC** stocks → the **Nasdaq OTC Bulletin Board**. The **smallest** stocks → the **Pink Sheets**.",
        cite: AUTEX,
      },
      {
        kind: "match",
        q: "Match each stock (or service) to its bulletin board.",
        pairs: [
          ["Listed stocks, institutions", "AutEx or Bridge"],
          ["Thin OTC stocks", "Nasdaq OTC Bulletin Board"],
          ["The smallest stocks", "Pink Sheets"],
          ["Pop-up windows", "Data vendors"],
        ],
        cite: OTCBB,
      },
      {
        kind: "fill",
        q: "For the smallest and least frequently traded stocks, traders post their indications in the ___ published by the National Quotation ___.",
        bank: ["Pink Sheets", "Bureau", "Big Board", "Exchange", "Tape", "Office"],
        answer: ["Pink Sheets", "Bureau"],
        why: "The National Quotation Bureau publishes the Pink Sheets, the board for the smallest U.S. stocks.",
        cite: PINK,
      },
      {
        kind: "see",
        title: "From pink paper to screens",
        illus: PinkTimeline,
        beats: [
          { text: "**1913**: the National Quotation Bureau starts a weekly **Pink Sheets**, printed on pink paper; daily editions follow five years later.", cite: PINK_1913 },
          { text: "The **NASDAQ** system lets traders present, access and exchange information **faster**, and largely replaces the Pink Sheets.", cite: PINK_REPLACED },
          { text: "NASDAQ grows into the **Nasdaq Stock Market** and the **Nasdaq OTC Bulletin Board**.", cite: PINK_GREW },
          { text: "The Pink Sheets keep only the **smallest** publicly traded U.S. stocks.", cite: PINK_NOW },
        ],
      },
      {
        kind: "choice",
        q: "Data vendors' pop-up indication systems try to…",
        options: [
          "send each trader only the indications likely to interest their clients",
          "show every indication to every trader",
          "turn indications into firm orders",
          "hide indications from institutions",
        ],
        answer: 0,
        why: "They anticipate which trades will interest a trader's clients and direct only those indications.",
        cite: POPUP,
      },
      {
        kind: "today",
        title: "The Pink Sheets today",
        body: "The Pink Sheets business is now **OTC Markets Group**, which runs electronic markets for over-the-counter stocks (OTCQX, OTCQB and Pink).",
        source: "OTC Markets Group",
      },
      {
        kind: "recap",
        points: [
          { text: "An **IOI** shows broker-dealer, security and side; any price is **rarely firm**.", cite: IOI_FIRM },
          { text: "Traders post IOIs on **bulletin boards** to show interest and to **find who else is interested**.", cite: IOI_DISCOVER },
          { text: "Listed: **AutEx/Bridge**; thin OTC: **OTC Bulletin Board**; smallest: **Pink Sheets**.", cite: PINK },
        ],
      },
    ],
  },

  // ── 5.4.6.1 Out-trades and DKs ────────────────────────────────────────────
  {
    id: "5.4.6.1-errors",
    sec: "5.4.6.1",
    title: "Out-trades and DKs",
    pages: "107–109",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Say it exactly, hear it exactly",
        body: "Traders who negotiate **orally** must understand exactly what others say, and be sure others understand them. Otherwise, **serious and costly errors** follow.",
        cite: COSTLY,
      },
      {
        kind: "definition",
        term: "Out-trade",
        body: "A trade that one trader reports and that **doesn't exactly match** the other trader's report of it.",
        cite: OUT_TRADE,
      },
      {
        kind: "definition",
        term: "DK (Don't Know)",
        body: "The equity markets' name for an **unmatched trade report**: the other side doesn't know the trade.",
        cite: DK,
      },
      {
        kind: "see",
        title: "Two reports, one trade",
        illus: OutTrade,
        beats: [
          { text: "A loud futures pit. A buyer and a seller agree on a trade of **20 contracts**. (Our example.)", cite: NOISY },
          { text: "Each writes up the trade. Both reports go in **at the same time** to be matched.", cite: OUT_TRADE },
          { text: "The buyer heard **6**, the seller said **7**. The reports don't match: an **out-trade**.", cite: OUT_TRADE },
          { text: "In large open-outcry futures pits, out-trades can reach **4 in every 100** trades.", cite: OUT_RATE },
        ],
      },
      {
        kind: "number",
        q: "At an out-trade rate of **4 percent**, how many of a pit's **500** trades would be out-trades?",
        answer: 20,
        unit: "trades",
        illustrative: true,
        why: "4% of 500 = 20. Harris says the rate in large futures pits is often as high as 4 percent.",
        cite: OUT_RATE,
      },
      {
        kind: "choice",
        q: "In **equity** markets, an unmatched trade report is called…",
        options: ["a DK", "an IOI", "a fill", "a cross"],
        answer: 0,
        why: "DK stands for **Don't Know**: the other side doesn't recognize the trade.",
        cite: DK,
      },
      {
        kind: "truefalse",
        q: "The buyer reports “bought 50 at 25.10 from K”; trader K reports “sold 50 at 25.10 to B.” This is an out-trade.",
        answer: false,
        why: "Side, size, price and counterparty all match, so the trade clears. An out-trade needs a mismatch.",
        cite: OUT_TRADE,
      },
      {
        kind: "idea",
        title: "Show it, repeat it, record it",
        body: "The best fix lets both traders **see each other's intentions on screens**. On the phone, traders **repeat and confirm**, and most **record their calls**.",
        cite: AVOID,
      },
      {
        kind: "multi",
        q: "Which practices reduce oral errors? (Select all that apply.)",
        options: ["Repeating what you heard and asking for confirmation", "Recording telephone calls", "Showing intentions on electronic screens", "Speaking faster to beat the noise"],
        answer: [0, 1, 2],
        why: "Repeating, recording and showing intent on screens all help. Hurrying makes communication harder, not easier.",
        cite: REPEAT,
      },
      {
        kind: "see",
        title: "Settling a disputed trade",
        illus: Dispute,
        beats: [
          { text: "When an error occurs, the two traders try to **find who was mistaken**.", cite: WHO_ERRED },
          { text: "Usually one of them **recognizes the error** and corrects it.", cite: RECOGNIZE },
          { text: "If no one can be blamed, they often **split the difference**: 6 and 7 settle at 6½. (Our numbers.)", cite: SPLIT },
          { text: "Traders quickly **shun** traders who make many mistakes.", cite: SHUN },
        ],
      },
      {
        kind: "order",
        q: "Put the life of a disputed trade in order.",
        items: [
          "Both traders report the trade",
          "The two reports don't exactly match",
          "They try to find who was mistaken",
          "If no one is to blame, they split the difference",
        ],
        why: "Reports first, then the mismatch (the out-trade), then the search for the mistake, then splitting the difference.",
        cite: WHO_ERRED,
      },
      {
        kind: "choice",
        q: "The buyer says the price was 6, the seller says 7, and neither can show who was wrong. What do traders often do?",
        options: ["Split the difference", "Let the buyer decide", "Cancel the exchange's session", "Ask the regulator to set the price"],
        answer: 0,
        why: "When responsibility can't be assigned, traders often resolve the disputed trade by splitting the difference.",
        cite: SPLIT,
      },
      {
        kind: "quote",
        lead: "In 1992, Lehman Brothers put speech recognition on its bond traders' phones:",
        cite: SEE_SAY,
        mark: ["recognize and correct errors"],
      },
      {
        kind: "recap",
        points: [
          { text: "An **out-trade** is a reported trade that doesn't match the other side's report; in equities it's a **DK**.", cite: DK },
          { text: "Large futures pits can see out-trade rates as high as **4 percent**.", cite: OUT_RATE },
          { text: "Traders find who erred or **split the difference**, and **shun** error-prone traders.", cite: SHUN },
        ],
      },
    ],
  },

  // ── 5.4.6.1 Bid for, offer at ─────────────────────────────────────────────
  {
    id: "5.4.6.1-for-at",
    sec: "5.4.6.1",
    title: "Bid for, offer at",
    pages: "108",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Fixed formats",
        body: "To avoid confusion, traders say bids and offers in **fixed formats**. The word order alone tells you who is **buying** and who is **selling**.",
        cite: FIXED,
      },
      {
        kind: "idea",
        title: "A bid: price “for” quantity",
        body: "A bidder says the **price first**, then **“for”**, then the quantity. “**6 for 20**” means: I'll **pay 6 for 20** contracts.",
        cite: SIX_FOR,
      },
      {
        kind: "idea",
        title: "An offer: quantity “at” price",
        body: "An offerer says the **quantity first**, then **“at”**, then the price. “**40 at a quarter**” means: I'll **sell 40** contracts **at a quarter**.",
        cite: FORTY_AT,
      },
      {
        kind: "see",
        title: "Two shouts in the pit",
        illus: PitShouts,
        beats: [
          { text: "A buyer shouts “**6 for 20**”: **price**, then “for”, then **size**. A bid to pay 6 for 20 contracts.", cite: SIX_FOR },
          { text: "A seller shouts “**40 at a quarter**”: **size**, then “at”, then **price**. An offer to sell 40 at a quarter.", cite: FORTY_AT },
          { text: "Only the **last digit** is spoken: everyone knows the contract trades around 97.40, so “6” means **97.46**. (Our numbers.)", cite: LAST_DIGIT },
          { text: "Saying less is **faster**, and leaves less noise that traders could mistake for information.", cite: SPEEDS },
        ],
      },
      {
        kind: "choice",
        q: "A trader shouts “**5 for 30**.” What does this trader want?",
        options: ["Buy 30 contracts at 5", "Sell 30 contracts at 5", "Buy 5 contracts at 30", "Sell 5 contracts at 30"],
        answer: 0,
        why: "Price first, then “for”, then quantity: a **bid** to pay 5 for 30 contracts.",
        cite: BID_FOR,
      },
      {
        kind: "choice",
        q: "A trader shouts “**25 at 8**.” What does this trader want?",
        options: ["Sell 25 contracts at 8", "Buy 25 contracts at 8", "Sell 8 contracts at 25", "Buy 8 contracts at 25"],
        answer: 0,
        why: "Quantity first, then “at”, then price: an **offer** to sell 25 contracts at 8.",
        cite: OFFER_AT,
      },
      {
        kind: "fill",
        q: "Bidders say the price, then ___, then the quantity. Offerers say the quantity, then ___, then the price.",
        bank: ["for", "at", "by", "from", "to"],
        answer: ["for", "at"],
        why: "Bids are “price **for** quantity”; offers are “quantity **at** price”.",
        cite: OFFER_AT,
      },
      {
        kind: "number",
        q: "The contract trades around **97.40**. A trader shouts “**7 for 10**.” What price is the bid?",
        answer: 97.47,
        tol: 0.001,
        illustrative: true,
        why: "Only the last digit is spoken; the rest of the price is common knowledge. 7 means 97.47.",
        cite: COMMON,
      },
      {
        kind: "idea",
        title: "Hands: push away, pull in",
        body: "In futures pits, a **seller** holds the **palm away**, pushing the item away. A **buyer** holds the **palms inward**, pulling it in. Fingers and hand positions give price and size.",
        cite: SELLERS,
      },
      {
        kind: "see",
        title: "Palms in, palms out",
        illus: HandSignals,
        beats: [
          { text: "A **palm away** from the body **pushes the item away**: a **seller**.", cite: PUSH },
          { text: "**Palms inward** **pull the item in**: a **buyer**.", cite: BUYERS },
          { text: "Extended **fingers**, the hand **upright or sideways**, and touches on the **face** give prices and quantities.", cite: FINGERS },
        ],
      },
      {
        kind: "choice",
        q: "Across the pit, a trader holds a **palm away** from the body. This trader is…",
        options: ["selling", "buying", "cancelling her order", "asking for a quote"],
        answer: 0,
        why: "Palm away = pushing the item away = **seller**. Buyers pull the item in, palms inward.",
        cite: SELLERS,
      },
      {
        kind: "game",
        id: "pit-talk",
        title: "Pit talk",
        brief: "Traders shout and signal across the pit. Decode each **bid or offer**, then catch the **out-trades**. The prices are ours; the rules are the book's.",
        game: PitTalk,
      },
      {
        kind: "truefalse",
        q: "In the pit, “**30 at 2**” is a bid.",
        answer: false,
        why: "Quantity first, then “at”: that is an **offer** to sell 30 at 2. A bid would be “2 for 30”.",
        cite: OFFER_AT,
      },
      {
        kind: "today",
        title: "Most pits are gone",
        body: "**CME Group** closed most of its open-outcry futures pits in **2015**. Nearly all futures now trade on screens (CME Globex), so shouts and hand signals are rare.",
        source: "CME Group announcement (2015)",
      },
      {
        kind: "recap",
        points: [
          { text: "Bids: **price “for” quantity** (“6 for 20” buys 20 at 6).", cite: SIX_FOR },
          { text: "Offers: **quantity “at” price** (“40 at a quarter” sells 40 at a quarter).", cite: FORTY_AT },
          { text: "Only the **last digit** is spoken; **palm away = sell**, **palms in = buy**.", cite: LAST_DIGIT },
        ],
      },
    ],
  },

  // ── 5.4.7 Order books: open or closed ─────────────────────────────────────
  {
    id: "5.4.7-books",
    sec: "5.4.7",
    title: "Order books: open or closed",
    pages: "109",
    imp: 3,
    steps: [
      {
        kind: "definition",
        term: "Order book",
        body: "Where a broker, exchange or dealer **holds the open orders it cannot fill yet**: a database, files, boxes of tickets, or a pile on a desk.",
        cite: BOOKS,
      },
      {
        kind: "idea",
        title: "What sits in a book",
        body: "Mostly **standing limit orders**. Also **stop** and **market-if-touched** orders whose price conditions haven't been met yet.",
        cite: STOPS,
      },
      {
        kind: "see",
        title: "Inside a book",
        illus: InsideBook,
        beats: [
          { text: "A book is mostly **standing limit orders**: bids below the market, offers above. (Our numbers.)", cite: LIMITS },
          { text: "It also holds **stop** and **market-if-touched** orders, waiting for their prices to be reached.", cite: STOPS },
          { text: "So the book **reveals the conditions** under which traders will trade: here, a large buyer at 50.00.", cite: REVEAL },
          { text: "A clever trader who sees it can **trade ahead**: bid 50.01 and stand in front of the big buyer.", cite: AHEAD },
        ],
      },
      {
        kind: "multi",
        q: "What can an order book hold? (Select all that apply.)",
        options: ["Standing limit orders", "Stop orders not yet triggered", "Market-if-touched orders not yet triggered", "Trades that already happened"],
        answer: [0, 1, 2],
        why: "A book holds **open** orders: limit orders, and stops and MITs still waiting. Completed trades aren't open orders.",
        cite: STOPS,
      },
      {
        kind: "truefalse",
        q: "An order book is always an electronic database.",
        answer: false,
        why: "It may be a database, files, boxes of paper tickets, or simply piles of tickets on a desk.",
        cite: FORMS,
      },
      {
        kind: "choice",
        q: "Why is access to the order book an important determinant of trader profitability?",
        options: [
          "It reveals the terms on which others will trade",
          "It lists the exchange's fees",
          "It shows every trader's account balance",
          "It guarantees your order will fill",
        ],
        answer: 0,
        why: "The book shows who will trade on what terms, and traders who know that can trade ahead of them.",
        cite: ACCESS,
      },
      {
        kind: "definition",
        term: "Open book market",
        body: "A market that **displays its whole order book** to all traders.",
        cite: OPEN,
      },
      {
        kind: "definition",
        term: "Closed book market",
        body: "A market that **does not show** its orders to traders.",
        cite: CLOSED,
      },
      {
        kind: "see",
        title: "Open book, closed book",
        illus: OpenClosed,
        beats: [
          { text: "In an **open book** market, every trader sees every standing order.", cite: OPEN },
          { text: "In a **closed book** market, traders see none of them.", cite: CLOSED },
          { text: "Traders want to see the book, but many **don't want to be seen**. In an open book, they **hold their order back**.", cite: HOLD },
          { text: "Some markets protect them: an **undisclosed** limit order sits in the book without being displayed (Euronext).", cite: EURONEXT },
        ],
      },
      {
        kind: "choice",
        q: "You want to buy a lot of stock in an **open book** market without others seeing your interest. What do traders like you often do?",
        options: [
          "Hold the order (or let the broker hold it) until a good opportunity",
          "Post the whole order in the book at once",
          "Post it far above the market",
          "Ask the market to close its book",
        ],
        answer: 0,
        why: "Traders who don't want their orders seen don't submit standing orders in open books; they hold them back.",
        cite: HOLD,
      },
      {
        kind: "classify",
        q: "Open book or closed book?",
        buckets: ["Open book", "Closed book"],
        items: [
          { text: "Every trader sees every standing order", bucket: 0, why: "Open books are fully displayed." },
          { text: "You can read the size waiting at each price", bucket: 0, why: "That is what a displayed book shows." },
          { text: "Traders see none of the standing orders", bucket: 1, why: "Closed books don't show their orders." },
          { text: "Only the market itself knows what is waiting", bucket: 1, why: "In a closed book, orders aren't shown to traders." },
        ],
        cite: CLOSED,
      },
      {
        kind: "fill",
        q: "Rule-based order-matching systems work best when traders place standing ___ orders in their system order ___.",
        bank: ["limit", "books", "market", "stop", "tapes"],
        answer: ["limit", "books"],
        why: "Matching systems need liquidity waiting in the book, so some markets protect those limit orders.",
        cite: WORK_BEST,
      },
      {
        kind: "today",
        title: "Books for sale",
        body: "Most electronic exchanges now sell **depth-of-book** data (Nasdaq TotalView, for example) showing displayed orders at every price, and still accept **hidden** orders.",
        source: "Exchange market data products (e.g., Nasdaq TotalView)",
      },
      {
        kind: "recap",
        points: [
          { text: "Order books hold **open orders**: mostly standing limits, plus untriggered stops and MITs.", cite: STOPS },
          { text: "Books reveal who will trade on what terms; **access to the book** drives profitability.", cite: ACCESS },
          { text: "**Open book** markets show every order; **closed book** markets show none.", cite: CLOSED },
        ],
      },
    ],
  },

  // ── 5.4.7 Who keeps the book ──────────────────────────────────────────────
  {
    id: "5.4.7-keepers",
    sec: "5.4.7",
    title: "Who keeps the book",
    pages: "109–110",
    imp: 2,
    steps: [
      {
        kind: "idea",
        title: "Brokers hand orders on",
        body: "Brokers must **represent** their clients' unfilled orders, but they can't watch every market. So they often **give the orders to others** to manage.",
        cite: MONITOR,
      },
      {
        kind: "see",
        title: "Where a broker parks an order",
        illus: BrokerHandoff,
        beats: [
          { text: "A client leaves an unfilled **limit order** with a broker, who is responsible for representing it.", cite: REPRESENT },
          { text: "In a market with **rule-based order matching**, the broker submits it to the **system order book**.", cite: SYS_BOOK },
          { text: "In other markets, the broker gives it to a **broker or dealer who specializes** in that security.", cite: SPECIALIZE },
        ],
      },
      {
        kind: "choice",
        q: "In a market with a rule-based order-matching system, where does a broker usually put a client's unfilled limit order?",
        options: ["In the system order book", "In a drawer at the brokerage", "Back with the client", "On a bulletin board"],
        answer: 0,
        why: "Where rules match the orders, the system's order book is where an order can trade.",
        cite: SYS_BOOK,
      },
      {
        kind: "truefalse",
        q: "Brokers can usually watch every market where their clients have placed orders.",
        answer: false,
        why: "They usually **can't** monitor them all closely, which is why they hand orders to others.",
        cite: MONITOR,
      },
      {
        kind: "idea",
        title: "Dealers keep books as a service",
        body: "Many dealers hold limit orders **for the brokers** who send them order flow. They hope those brokers will send them their **market orders** too.",
        cite: HOPE,
      },
      {
        kind: "idea",
        title: "A free option for the dealer",
        body: "A standing limit order lets whoever trades against it choose **if and when** to trade at its price. The dealer holding it gets that **trading option for free**.",
        cite: LIKE_LIMITS,
      },
      {
        kind: "see",
        title: "Why dealers like holding limit orders",
        illus: DealerBook,
        beats: [
          { text: "Brokers send **limit orders** to a dealer, who keeps them in a book as a **service**.", cite: SERVICE },
          { text: "What the dealer hoped for: the same brokers send their **market orders** too.", cite: HOPE },
          { text: "Bad news cuts the stock's value. A client's limit **buy at 20** is now stale, and the dealer can **sell to it**. (Our numbers.)", cite: LIKE_LIMITS },
          { text: "The dealer usually **charges nothing** for holding the orders.", cite: NO_CHARGE },
        ],
      },
      {
        kind: "multi",
        q: "Why do many dealers keep order books for brokers? (Select all that apply.)",
        options: ["To attract the same brokers' market orders", "Limit orders give them free trading options", "To charge a fee for each order held", "Every dealer is required to by law"],
        answer: [0, 1],
        why: "Dealers hope limit orders bring market orders, and limit orders give them free options. They usually don't charge.",
        cite: HOPE,
      },
      {
        kind: "choice",
        q: "What do dealers usually charge brokers for holding their limit orders?",
        options: ["Nothing", "A commission on each order", "A monthly fee", "Half the spread"],
        answer: 0,
        why: "Dealers usually don't charge for the brokerage services they provide to brokers.",
        cite: NO_CHARGE,
      },
      {
        kind: "fill",
        q: "By encouraging brokers to send them ___ orders, the dealers hope that brokers will also send them ___ orders.",
        bank: ["limit", "market", "stop", "iceberg", "day"],
        answer: ["limit", "market"],
        why: "Holding limit orders is the service; the market orders that follow are the business.",
        cite: HOPE,
      },
      {
        kind: "match",
        q: "Who ends up holding the order?",
        pairs: [
          ["Rule-based matching market", "The system order book"],
          ["Market without order matching", "A specialist broker or dealer"],
          ["Client's unfilled order", "The broker represents it"],
          ["Dealer's book of limit orders", "A free service to brokers"],
        ],
        cite: SPECIALIZE,
      },
      {
        kind: "recap",
        points: [
          { text: "Brokers **represent** unfilled orders and often hand them to the **system book** or a **specialist**.", cite: SYS_BOOK },
          { text: "Dealers keep books **as a service**, hoping for the brokers' **market orders**.", cite: HOPE },
          { text: "Limit orders give dealers **free trading options**; dealers usually **don't charge**.", cite: NO_CHARGE },
        ],
      },
    ],
  },

  // ── 5.5 Summary and 5.6 Some Points to Remember ───────────────────────────
  {
    id: "5.5-summary",
    sec: "5.5",
    title: "How markets differ",
    pages: "110–111",
    imp: 3,
    steps: [
      {
        kind: "idea",
        title: "Structure decides who profits",
        body: "Structure decides **who can supply liquidity**, **who knows** market conditions best and **who can act first**. So it shapes liquidity, costs and price efficiency.",
        cite: DETERMINE,
      },
      {
        kind: "idea",
        title: "Four ways markets differ",
        body: "**How** they arrange trades, **when and where** they trade, **how** traders negotiate, and how **transparent** they are. The first matters most.",
        cite: MOST,
      },
      {
        kind: "see",
        title: "Four dials of a market",
        illus: FourDials,
        beats: [
          { text: "**Who arranges trades?** Dealers (quote-driven), rules matching public orders (order-driven), or brokers who find traders (brokered).", cite: MOST },
          { text: "**When and where?** Only when called, or whenever open; on an exchange floor, or from traders' offices.", cite: WHEN_WHERE },
          { text: "**How do traders negotiate?** Through screens, by yelling on a floor, or over the telephone.", cite: NEGOTIATE },
          { text: "**How transparent?** Everyone sees orders, quotes and trades as they occur, or many traders never see them.", cite: TRANSPARENT },
          { text: "Set all four and you have a profile. **Euronext Paris** in 2003: order-driven, continuous, from offices, on screens, and transparent: **all orders** shown.", cite: PARIS },
        ],
      },
      {
        kind: "match",
        q: "Match each market type to how it arranges trades.",
        pairs: [
          ["Quote-driven", "Dealers arrange all trades"],
          ["Order-driven", "Rules match public orders"],
          ["Brokered", "Brokers find willing traders"],
          ["Call market", "Trades only when called"],
          ["Continuous market", "Trades whenever open"],
        ],
        cite: OD,
      },
      {
        kind: "classify",
        q: "Which dial does each one set?",
        buckets: ["Who arranges", "When and where", "How they talk", "Transparency"],
        items: [
          { text: "Dealers provide all liquidity", bucket: 0, why: "That is a quote-driven market: how trades are arranged." },
          { text: "Brokers search for willing traders", bucket: 0, why: "Brokered markets: how trades are arranged." },
          { text: "Trades only when the market is called", bucket: 1, why: "Call versus continuous: when." },
          { text: "Traders trade from their offices", bucket: 1, why: "Distributed access: where." },
          { text: "Traders yell on an exchange floor", bucket: 2, why: "Oral auctions: how traders negotiate." },
          { text: "Deals agreed over the telephone", bucket: 2, why: "Telephone negotiation: how traders negotiate." },
          { text: "Many traders never see the orders", bucket: 3, why: "An opaque market." },
          { text: "All orders and trades shown as they occur", bucket: 3, why: "A transparent market." },
        ],
        cite: NEGOTIATE,
      },
      {
        kind: "choice",
        q: "In which kind of market do **public traders and dealers** both supply liquidity?",
        options: ["Order-driven", "Pure quote-driven", "Brokered", "None of them"],
        answer: 0,
        why: "Dealers supply all liquidity in pure quote-driven markets and public traders in brokered markets; order-driven markets get both.",
        cite: PT_LIQ,
      },
      {
        kind: "choice",
        q: "In a **pure quote-driven** market, who supplies all the liquidity?",
        options: ["Dealers", "Public traders", "Brokers", "The exchange"],
        answer: 0,
        why: "Dealers quote the prices and take the other side of every trade.",
        cite: QD,
      },
      {
        kind: "idea",
        title: "No single best structure",
        body: "The best structure **depends on the instrument**, on **why people trade it**, and on the **technology** traders can use. That's why so many structures exist.",
        cite: BEST,
      },
      {
        kind: "truefalse",
        q: "Harris concludes there is one best market structure for every instrument.",
        answer: false,
        why: "The best structure depends on the instrument, why people trade it and the available technology.",
        cite: BEST,
      },
      {
        kind: "game",
        id: "market-profile",
        title: "Market profile",
        brief: "Real markets from this chapter, as the book describes them in 2003. Set each market's **dials**: session, place, and who arranges the trades.",
        game: MarketProfile,
      },
      {
        kind: "fill",
        q: "Continuous markets arrange trades when willing buyers arrive and find waiting ___, or when willing sellers arrive and find waiting ___.",
        bank: ["sellers", "buyers", "dealers", "brokers", "orders"],
        answer: ["sellers", "buyers"],
        why: "In a continuous market, whoever arrives trades with whoever is already waiting on the other side.",
        cite: PT_CONT,
      },
      {
        kind: "choice",
        q: "Which of these does Harris list as a point to remember?",
        options: [
          "Public traders generally favor transparent markets",
          "Dealers generally favor transparent markets",
          "Opaque markets always have lower costs",
          "Call markets trade whenever they are open",
        ],
        answer: 0,
        why: "Transparency helps those who know the least about market conditions, and public traders usually know the least.",
        cite: PT_PUBLIC,
      },
      {
        kind: "recap",
        points: [
          { text: "Markets differ most in **how they arrange trades**: quote-driven, order-driven or brokered.", cite: MOST },
          { text: "They also differ in **when and where** they trade, **how traders negotiate**, and **transparency**.", cite: WHEN_WHERE },
          { text: "**Access to information** about orders and trades is extremely valuable to traders.", cite: PT_INFO },
        ],
      },
    ],
  },
];

export const U54C_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "Why did trading at the Hong Kong Futures Exchange drift from the center of the pit to the windows?",
    options: ["Brokers wanted better cell-phone reception", "The light was better for hand signals", "An exchange rule moved it", "Brokers were avoiding the market reporters"],
    answer: 0,
    why: "Brokers stood by the windows for reception, out of reach of the microphones that recorded negotiations.",
    cite: HK_WINDOWS,
  },
  {
    kind: "choice",
    q: "How did the Hong Kong Futures Exchange get its brokers' negotiations back on tape?",
    options: [
      "It installed a low-powered cell-phone transceiver in the trading room",
      "It banned telephones from the floor",
      "It moved the microphones to the windows",
      "It bricked up the windows",
    ],
    answer: 0,
    why: "With good reception inside the room, brokers came back to the pit and the microphones.",
    cite: HK_FIX,
  },
  {
    kind: "truefalse",
    q: "The NYSE still presents its orders on boards hung above its trading floor.",
    answer: false,
    why: "It replaced those boards with electronic systems long ago; only the nickname “Big Board” endures.",
    cite: BIG_GONE,
  },
  {
    kind: "choice",
    q: "What did the first video market information systems distribute?",
    options: ["Real-time images of exchange boards", "Recordings of pit negotiations", "Scanned order tickets", "Trade confirmations"],
    answer: 0,
    why: "They were closed-circuit video systems showing the exchange boards; digital systems replaced them later.",
    cite: VIDEO,
  },
  {
    kind: "multi",
    q: "Market structure affects which of these? (Select all that apply.)",
    options: ["Market liquidity", "Transaction costs", "Price efficiency", "The tax rate on gains"],
    answer: [0, 1, 2],
    why: "Harris names liquidity, transaction costs and price efficiency; together they decide who trades profitably.",
    cite: AFFECTS,
  },
  {
    kind: "choice",
    q: "What does Cantor Fitzgerald's eSpeed let government bond traders see?",
    options: ["What they have said to their Cantor broker", "Every dealer's inventory", "Auction results before they happen", "Other traders' credit limits"],
    answer: 0,
    why: "Seeing your own words on screen catches misunderstandings before they become costly errors.",
    cite: ESPEED,
  },
  {
    kind: "fill",
    q: "Call markets convene all traders at the same ___ and ___.",
    bank: ["time", "place", "price", "size", "speed"],
    answer: ["time", "place"],
    why: "A call focuses everyone's attention on one moment and one place, so buyers and sellers find each other.",
    cite: PT_CALL,
  },
  {
    kind: "choice",
    q: "How do brokers arrange trades in brokered markets?",
    options: ["By searching for willing traders", "By trading from their own inventory", "By applying precedence rules to orders", "By calling the market once a day"],
    answer: 0,
    why: "Searching for willing traders is what defines brokered markets; dealers use inventory and order-driven markets use rules.",
    cite: PT_SEARCH,
  },
  {
    kind: "truefalse",
    q: "To protect limit order traders, some markets restrict access to the book or let traders keep standing orders off the display.",
    answer: true,
    why: "Matching systems need standing limit orders, so some markets shield them from view.",
    cite: PROTECT,
  },
  {
    kind: "choice",
    q: "Why do most brokers record their telephone calls?",
    options: ["To help resolve disputes from misunderstandings", "To sell the recordings to data vendors", "Because recordings replace trade reports", "To train speech recognition systems"],
    answer: 0,
    why: "A recording settles who said what when a trade is disputed.",
    cite: RECORD,
  },
  {
    kind: "choice",
    q: "Traders generally want to see the order book. What do many of them **not** want?",
    options: ["Other traders to see their own orders", "To see the best quotes", "To trade with limit orders", "To know the trade prices"],
    answer: 0,
    why: "Wanting to see but not be seen is why many traders hold orders back in open book markets.",
    cite: NOT_SEEN,
  },
];
