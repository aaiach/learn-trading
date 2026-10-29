// 5.2 TRADING SESSIONS (pp. 90–92)
import type { Cite, Unit } from "../types.ts";
import { BatchVsBilateral, ContinuousTape, DayWithCalls, FindEachOther, Sonar, TheCall, TimeZones, Tote, TradingDay, VolumeDay } from "./illus/u52.tsx";
import { MarketClock } from "./games/MarketClock.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts ────────────────────────────────────────────────────────────────
const SESSIONS = c(90, "5.2", "Markets have trading sessions during which trades are arranged.");
const TWO = c(90, "5.2", "The two types of trading sessions are continuous market sessions and call market sessions.");
const CONT_DEF = c(90, "5.2.1", "In continuous markets, traders may trade anytime the market is open.");
const CONT_TRY = c(90, "5.2.1", "Trading is continuous in the sense that traders may continuously attempt to arrange their trades.");
const PRACTICE = c(90, "5.2.1", "In practice, they usually trade only when a trader demands liquidity.");
const COMMON = c(90, "5.2.1", "Almost all major stock, bond, futures, options, and foreign exchange markets have continuous trading sessions.");

const CALL_DEF = c(90, "5.2.2", "In call markets, all traders trade at the same time when the market is called.");
const ROTATION = c(90, "5.2.2", "The market may call all securities simultaneously, or it may call the securities one at a time, in a rotation.");
const ROT_ONE = c(90, "5.2.2", "Markets that call in rotation may complete only one rotation per trading session");
const ROT_NOW = c(91, "5.2.2", "Markets that call in rotation were once very common. Now only the stock markets of a few small countries call in rotation.");
const OPEN_CALL = c(91, "5.2.2", "Many continuous order-driven exchanges open their trading sessions with call market auctions and then switch over to continuous trading.");
const HALT = c(91, "5.2.2", "These markets also use calls to restart their trading after trading halts.");
const OUTCRY = c(91, "5.2.2", "Open-outcry futures exchanges, however, start continuous trading immediately when they open.");
const EXCL = c(91, "5.2.2", "Call markets are used as the exclusive market mechanism for many instruments.");
const GOV = c(91, "5.2.2", "Most governments sell their bonds, notes, and bills in call market auctions.");
const LEAST = c(91, "5.2.2", "Some stock markets use calls to trade their least active securities.");
const USUAL = c(91, "5.2.2", "Call markets usually arrange their trades using order-driven execution systems.");
const BATCH_MOST = c(91, "5.2.2", "They most commonly use batch execution systems, but a few call markets allow bilateral trading.");
const BATCH = c(91, "5.2.2", "Markets with batch execution systems arrange all trades at the same time by matching orders with order precedence rules.");
const MULTI = c(91, "5.2.2", "These rules usually arrange multilateral trades that involve more than one buyer and more than one seller.");
const BILAT = c(91, "5.2.2", "In markets that allow bilateral trading, traders arrange their trades among themselves.");

const HORSE = "Call Market Betting at the Horse Races";
const PM_SHARE = c(91, "5.2.2", "In pari-mutuel betting, bettors receive a share of the total money bet on all horses", { box: HORSE });
const PM_UNTIL = c(91, "5.2.2", "Bettors can place their bets anytime until betting closes a few moments after the start of the race.", { box: HORSE });
const PM_SHOW = c(91, "5.2.2", "The track totalizator system displays the projected winnings for each bet while the bettors place their bets.", { box: HORSE });
const PM_CALL = c(91, "5.2.2", "Pari-mutuel betting is a call market auction in which the totalizator simultaneously prices all bets on a race.", { box: HORSE });
const PM_PRICE = c(91, "5.2.2", "The price of each bet is the amount bettors must bet to receive a dollar if their horse wins.", { box: HORSE });
const PM_CLOSE = c(91, "5.2.2", "The call occurs when betting closes.", { box: HORSE });
const PM_WAIT = c(91, "5.2.2", "Since the system allows only market orders, many traders wait until the last moment to bet so that they can see what the prices will be.", { box: HORSE });

const CALL_ADV = c(91, "5.2.3", "The main advantage of call markets is that they focus the attention of all traders interested in a given instrument at the same time and place.");
const FIND = c(91, "5.2.3", "When buyers and sellers search for liquidity at the same time and place, they can easily find each other.");
const CONT_ADV = c(91, "5.2.3", "The main advantage of continuous trading is that it allows traders to attempt to arrange their trades whenever they want.");
const IMPATIENT = c(91, "5.2.3", "This flexibility can be very important to impatient traders who do not want to wait for the next market call.");
const PREFER = c(91, "5.2.3", "Recent developments in the equities markets suggest that traders prefer continuous markets with opening calls to exclusive call markets.");
const SWITCHED = c(91, "5.2.3", "Many national equity exchanges have switched from call market rotations to continuous trading with opening calls, but none has changed from continuous trading to exclusive call markets.");

const HOURS = c(92, "5.2.4", "A market's trading hours specify when the market accepts orders and arranges trades.");
const BUSINESS = c(92, "5.2.4", "Continuously trading markets schedule their regular trading sessions during normal business hours.");
const NYSE_HOURS = c(92, "5.2.4", "The New York Stock Exchange and the Nasdaq Stock Market, for example, open at 9:30 A.M. and close at 4 P.M. Eastern Time.");
const BEFORE = c(92, "5.2.4", "Traders use the hours before the open to collect and submit orders.");
const AFTER = c(92, "5.2.4", "They use the hours after the close to settle trades and to report the results to clients.");
const ODD = c(92, "5.2.4", "Some markets trade at odd hours within their time zone so that they can be open during normal hours in another time zone.");
const PACIFIC = c(92, "5.2.4", "The Pacific Exchange opens trading at 6:30 A.M. Pacific Time");
const CHICAGO = c(92, "5.2.4", "the Chicago Stock Exchange opens trading at 8:30 A.M. Central Time to coincide with the New York Stock Exchange opening at 9:30 A.M. Eastern Time.");
const FX = c(92, "5.2.4", "Since many currency markets trade around the clock, foreign exchange traders often keep very unusual hours.");
const AH = c(92, "5.2.4", "Some markets permit trading after normal hours in special after-hours trading sessions.");
const AH_WHY = c(92, "5.2.4", "Exchanges provide these sessions to appeal to clients in other time zones or to permit traders to clean up (adjust) their positions after the regular trading session.");
const ECN = c(92, "5.2.4", "Many electronic trading networks provide extended trading hours for their clients.");

const LUNCH = "Lunchtime Recess";
const RECESS = c(92, "5.2.4", "Some continuous markets stop trading for lunch.", { box: LUNCH });
const SESSIONS2 = c(92, "5.2.4", "They divide their trading days into a morning session and an afternoon session.", { box: LUNCH });
const TOKYO = c(92, "5.2.4", "The Tokyo Stock Exchange is the largest exchange to stop for lunch.", { box: LUNCH });
const SKIP = c(92, "5.2.4", "At exchanges that trade through lunch, traders either skip lunch or eat it on the trading floor (or at their desks) so that they do not miss anything.", { box: LUNCH });
const LOW = c(92, "5.2.4", "Intraday trading activity at the NYSE and in Nasdaq generally is lowest at lunchtime.", { box: LUNCH });
const MIDWAY = c(92, "5.2.4", "lunchtime is midway between the market open and the market close, both of which are very active for a variety of reasons.", { box: LUNCH });
const HUNGRY = c(92, "5.2.4", "Alternatively, at lunchtime people may be more interested in lunch than in trading.", { box: LUNCH });

const SONAR = "Market Sonar";
const OPAQUE = c(92, "5.2.4", "Like the deep sea, markets are often quite opaque.", { box: SONAR });
const PING_INFO = c(92, "5.2.4", "In continuous markets, traders can ping the market to obtain information about the prices at which other traders will trade.", { box: SONAR });
const PING = c(92, "5.2.4", "Traders ping by submitting orders to see what happens to them.", { box: SONAR });

// Summary and points to remember (pp. 110)
const SUM = c(110, "5.5", "Call markets trade only when the market is called. Continuous markets trade whenever the market is open.");
const PT_CALL = c(110, "5.6", "Call markets convene all traders at the same time and place.");
const PT_CONT = c(110, "5.6", "Continuous markets arrange trades when willing buyers arrive and find waiting sellers, or when willing sellers arrive and find waiting buyers.");

export const U52: Unit = {
  sec: "5.2",
  title: "Trading Sessions",
  pages: "90–92",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "5.2.1-continuous",
      sec: "5.2.1",
      title: "Continuous markets",
      pages: "90",
      imp: 3,
      steps: [
        {
          kind: "idea",
          title: "Two kinds of trading session",
          body: "Markets arrange trades in **trading sessions**. A session is either **continuous** or a **call**.",
          cite: TWO,
        },
        {
          kind: "definition",
          term: "Continuous market",
          body: "A market where traders may trade **any time it is open**: they can keep trying to arrange trades all session long.",
          cite: CONT_DEF,
        },
        {
          kind: "see",
          title: "A day in a continuous market",
          illus: ContinuousTape,
          beats: [
            { text: "The market is open. A seller leaves an **offer to sell 100** and waits. (Our times and sizes.)", cite: CONT_DEF },
            { text: "At 10:12 a buyer **arrives and finds the waiting seller**: a trade, right then.", cite: PT_CONT },
            { text: "At 1:05 another buyer leaves a **bid** and waits. Nothing trades: no one is **demanding liquidity** yet.", cite: PRACTICE },
            { text: "At 2:40 a seller arrives, **takes the waiting bid**, and they trade. Trades can happen at any moment of the session.", cite: PT_CONT },
          ],
        },
        {
          kind: "choice",
          q: "In a continuous market, when do trades **actually** happen?",
          options: ["When a trader demands liquidity", "Only when the market is called", "On the hour, every hour", "Only at the open and the close"],
          answer: 0,
          why: "Traders may try to trade any time, but in practice a trade happens when someone **demands liquidity** by taking a waiting order.",
          cite: PRACTICE,
        },
        {
          kind: "truefalse",
          q: "In a continuous market, a bid trades as soon as it is posted.",
          answer: false,
          why: "A posted bid **waits** until a seller arrives and takes it. Trades happen when a trader demands liquidity.",
          cite: PRACTICE,
        },
        {
          kind: "fill",
          q: "In continuous markets, traders may trade ___ the market is ___.",
          bank: ["anytime", "open", "only when", "called", "closed"],
          answer: ["anytime", "open"],
          why: "That is the definition: a continuous market lets you try to trade at any moment of the session.",
          cite: CONT_DEF,
        },
        {
          kind: "idea",
          title: "The normal case",
          body: "Continuous sessions are **very common**: almost all major **stock, bond, futures, options and foreign exchange** markets have them.",
          cite: COMMON,
        },
        {
          kind: "multi",
          q: "Which of these almost always have **continuous** trading sessions? (Select all that apply.)",
          options: ["Major stock markets", "Major futures markets", "Major foreign exchange markets", "Pari-mutuel betting on a horse race", "A government's sale of new bills"],
          answer: [0, 1, 2],
          why: "Major stock, bond, futures, options and FX markets trade continuously. Race betting and most government debt sales are **calls** (next lessons).",
          cite: COMMON,
        },
        {
          kind: "choice",
          q: "Continuous markets arrange trades when…",
          options: [
            "willing buyers arrive and find waiting sellers, or the reverse",
            "the market is called and every order is matched at once",
            "a broker finds a counterparty for each client",
            "enough orders have built up for an auction",
          ],
          answer: 0,
          why: "One side arrives and finds the other side **already waiting**. A call matches everyone at once instead.",
          cite: PT_CONT,
        },
        {
          kind: "recap",
          points: [
            { text: "Trading sessions are either **continuous** or **call** sessions.", cite: TWO },
            { text: "In a continuous market you may try to trade **any time it is open**; trades happen when someone **demands liquidity**.", cite: PRACTICE },
            { text: "Almost all major stock, bond, futures, options and FX markets trade **continuously**.", cite: COMMON },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "5.2.2-call",
      sec: "5.2.2",
      title: "Call markets",
      pages: "90–91",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Call market",
          body: "A market where **all traders trade at the same time**, when the market is **called**. Orders that arrive earlier wait for the call.",
          cite: CALL_DEF,
        },
        {
          kind: "see",
          title: "Waiting for the call",
          illus: TheCall,
          beats: [
            { text: "Before the call, buy and sell orders **arrive and wait**. Nothing trades yet. (Our times.)", cite: CALL_DEF },
            { text: "The market is **called**: all the orders that match **trade at the same time**.", cite: CALL_DEF },
            { text: "After the call the book starts again: a **new order waits** for the next call.", cite: SUM },
          ],
        },
        {
          kind: "choice",
          q: "In a call market, when do trades take place?",
          options: ["Only when the market is called", "Whenever a buyer finds a waiting seller", "Whenever a dealer quotes a price", "Every time a new order arrives"],
          answer: 0,
          why: "Call markets trade **only when the market is called**; continuous markets trade whenever they are open.",
          cite: SUM,
        },
        {
          kind: "truefalse",
          q: "In a call market, a buyer who arrives early trades as soon as a seller shows up.",
          answer: false,
          why: "Both orders **wait for the call**. Then everyone trades at the same time.",
          cite: CALL_DEF,
        },
        {
          kind: "idea",
          title: "All at once, or in rotation",
          body: "A market may call **all securities simultaneously**, or **one at a time, in a rotation**. Rotations were once very common; now only a **few small countries'** stock markets use them.",
          cite: ROTATION,
        },
        {
          kind: "choice",
          q: "A market calls stock A, then stock B, then stock C. What is that called?",
          options: ["Calling in a rotation", "A continuous session", "Bilateral trading", "An after-hours session"],
          answer: 0,
          why: "Calling the securities **one at a time** is a **rotation**. Calling them all together is a simultaneous call.",
          cite: ROTATION,
        },
        {
          kind: "idea",
          title: "Calls inside continuous markets",
          body: "Many continuous order-driven exchanges **open with a call auction**, then switch to continuous trading. They also use calls to **restart after trading halts**.",
          cite: OPEN_CALL,
        },
        {
          kind: "see",
          title: "Where the calls fall in a day",
          illus: DayWithCalls,
          beats: [
            { text: "A continuous order-driven exchange **opens with a call auction**…", cite: OPEN_CALL },
            { text: "…then **switches to continuous trading**.", cite: OPEN_CALL },
            { text: "If trading **halts**, a **call restarts** it; then continuous trading resumes. (Our halt time.)", cite: HALT },
            { text: "An **open-outcry futures** exchange skips the call: it starts **continuous trading immediately** when it opens.", cite: OUTCRY },
          ],
        },
        {
          kind: "multi",
          q: "When do many continuous order-driven exchanges use a **call**? (Select all that apply.)",
          options: ["To open the trading session", "To restart trading after a halt", "For every trade during the day", "Only on the last day of the month"],
          answer: [0, 1],
          why: "They open with a call auction and use calls to restart after halts. Between calls they trade continuously.",
          cite: HALT,
        },
        {
          kind: "truefalse",
          q: "Open-outcry futures exchanges open with a call auction, like continuous order-driven stock exchanges.",
          answer: false,
          why: "Open-outcry futures exchanges **start continuous trading immediately** when they open.",
          cite: OUTCRY,
        },
        {
          kind: "today",
          title: "Opening and closing auctions",
          body: "Today the **NYSE** and **Nasdaq** run a call auction at the **open** and another at the **close** of every trading day. The closing auction is one of the busiest moments of the day.",
          source: "NYSE auction guides; Nasdaq Opening and Closing Cross",
        },
        {
          kind: "recap",
          points: [
            { text: "In a call market, **all traders trade at the same time** when the market is called.", cite: CALL_DEF },
            { text: "Securities are called **all together** or **in a rotation**; rotations are now rare.", cite: ROT_NOW },
            { text: "Continuous order-driven exchanges **open with a call** and **restart with calls** after halts.", cite: HALT },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "5.2.2-batch",
      sec: "5.2.2",
      title: "Markets that only call",
      pages: "91",
      imp: 2,
      steps: [
        {
          kind: "idea",
          title: "Sometimes the call is the whole market",
          body: "For many instruments a call is the **only** way to trade. **Most governments sell their bonds, notes and bills** in call auctions, and some stock markets call their **least active** stocks.",
          cite: EXCL,
        },
        {
          kind: "definition",
          term: "Batch execution system",
          body: "The usual way a call executes: it arranges **all trades at the same time** by matching orders with **order precedence rules**.",
          cite: BATCH,
        },
        {
          kind: "see",
          title: "Batch or bilateral",
          illus: BatchVsBilateral,
          beats: [
            { text: "At the call, every buyer and seller sends an order to the market's **rules**, all at once.", cite: BATCH },
            { text: "The rules match them together: one **multilateral** trade with **more than one buyer and more than one seller**.", cite: MULTI },
            { text: "A few call markets allow **bilateral** trading instead: traders **pair off** and arrange deals among themselves.", cite: BILAT },
          ],
        },
        {
          kind: "choice",
          q: "Which execution systems do call markets **most commonly** use?",
          options: ["Batch execution systems", "Bilateral negotiation", "Dealer quotes", "Brokers searching for each counterparty"],
          answer: 0,
          why: "Call markets usually use **order-driven**, **batch** execution; only a few allow bilateral trading.",
          cite: BATCH_MOST,
        },
        {
          kind: "truefalse",
          q: "Most governments sell their new bonds, notes and bills through dealers' continuous quotes.",
          answer: false,
          why: "Most governments sell them in **call market auctions**.",
          cite: GOV,
        },
        {
          kind: "fill",
          q: "Markets with ___ execution systems arrange all trades at the same time by matching orders with order ___ rules.",
          bank: ["batch", "precedence", "bilateral", "pricing", "dealer"],
          answer: ["batch", "precedence"],
          why: "Batch systems match every order at once with **order precedence rules**.",
          cite: BATCH,
        },
        {
          kind: "definition",
          term: "Multilateral trade",
          body: "A trade that involves **more than one buyer and more than one seller**: what batch rules usually arrange.",
          cite: MULTI,
        },
        {
          kind: "classify",
          q: "Batch or bilateral?",
          buckets: ["Batch", "Bilateral"],
          items: [
            { text: "Rules match every order at the same moment", bucket: 0, why: "Batch systems arrange all trades at the same time." },
            { text: "Two traders agree a deal between themselves", bucket: 1, why: "Bilateral traders arrange their trades among themselves." },
            { text: "One trade with three buyers and two sellers", bucket: 0, why: "A multilateral trade: what batch rules usually produce." },
            { text: "Each trade is negotiated by its two sides", bucket: 1, why: "That is bilateral trading." },
            { text: "The most common way calls execute", bucket: 0, why: "Call markets most commonly use batch execution." },
          ],
          cite: BATCH_MOST,
        },
        {
          kind: "choice",
          q: "Some stock markets use calls as the **only** mechanism for which stocks?",
          options: ["Their least active securities", "Their largest companies", "Stocks that also have options", "Stocks under regulatory review"],
          answer: 0,
          why: "A call gathers the few interested traders at one moment, which suits **thinly traded** stocks.",
          cite: LEAST,
        },
        {
          kind: "recap",
          points: [
            { text: "Calls are the **exclusive** mechanism for many instruments, such as most **government debt** sales.", cite: GOV },
            { text: "Calls are usually **order-driven** and most commonly **batch**: all trades at once by order precedence rules.", cite: USUAL },
            { text: "Batch rules usually arrange **multilateral** trades; a few calls allow **bilateral** trading.", cite: MULTI },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "5.2.2-parimutuel",
      sec: "5.2.2",
      title: "Pari-mutuel betting is a call",
      pages: "91",
      imp: 1,
      steps: [
        {
          kind: "definition",
          term: "Pari-mutuel betting",
          body: "Bettors whose horse wins **share the total money bet on all horses**, minus a fixed cut for the track and the state.",
          cite: PM_SHARE,
        },
        {
          kind: "idea",
          title: "A call auction in disguise",
          body: "The track's **totalizator** prices **all the bets at the same time**. The call happens when **betting closes**.",
          cite: PM_CALL,
        },
        {
          kind: "see",
          title: "The tote board",
          illus: Tote,
          beats: [
            { text: "Bets come in: $500 on A, $300 on B, $200 on C. The **pool** is $1,000. (Our numbers throughout.)", cite: PM_SHARE },
            { text: "Say the track and state keep 20%: winners share $800. The board shows **projected winnings** per $1 on each horse.", cite: PM_SHOW },
            { text: "Late money pours onto C. **Every** horse's payoff changes, because all bets share one pool.", cite: PM_CALL },
            { text: "Betting closes: **the call**. Prices are now fixed. If C wins, each $1 on C collects $1.60.", cite: PM_CLOSE },
          ],
        },
        {
          kind: "number",
          q: "$10,000 is bet on a race. The track and state keep 20%, and $2,000 was bet on the winning horse. How much does each **$1** bet on the winner collect?",
          answer: 4,
          prefix: "$",
          tol: 0.001,
          illustrative: true,
          why: "Winners share $10,000 × 80% = $8,000. Spread over the $2,000 bet on the winner, that's **$4 per $1**.",
          cite: PM_SHARE,
        },
        {
          kind: "choice",
          q: "Why do many bettors wait until the last moment to bet?",
          options: [
            "Only market orders are allowed, so they wait to see what the prices will be",
            "Late bets pay a smaller cut to the track and the state",
            "The track turns away early bets on the favourite horses",
            "A dealer offers better odds in the last minute before the race",
          ],
          answer: 0,
          why: "You can't set a limit price on a pari-mutuel bet. Waiting shows you the price closest to the one you'll get.",
          cite: PM_WAIT,
        },
        {
          kind: "truefalse",
          q: "In pari-mutuel betting, the price of your bet is fixed the moment you place it.",
          answer: false,
          why: "The board only shows **projected** winnings while bets come in. Prices are set for everyone at the call, when betting closes.",
          cite: PM_SHOW,
        },
        {
          kind: "idea",
          title: "The price of a bet",
          body: "A bet's **price** is the amount you must bet to receive **one dollar** if your horse wins.",
          cite: PM_PRICE,
        },
        {
          kind: "number",
          q: "If a horse wins, each $1 bet on it collects $4. What is the **price** of that bet (the amount you must bet to receive $1)?",
          answer: 0.25,
          prefix: "$",
          tol: 0.001,
          illustrative: true,
          why: "$1 collects $4, so receiving $1 takes **$0.25**: the price is 1 ÷ 4.",
          cite: PM_PRICE,
        },
        {
          kind: "choice",
          q: "When does the call happen at a racetrack?",
          options: ["When betting closes, a few moments after the race starts", "When the first bet of the day is placed at the track", "When the winning horse crosses the finish line", "Every hour on the hour, while the races are run"],
          answer: 0,
          why: "Bettors can bet until betting closes, a few moments after the start; **that** is the call.",
          cite: PM_UNTIL,
        },
        {
          kind: "recap",
          points: [
            { text: "Pari-mutuel winners **share the pool** of all bets, less the track's and state's cut.", cite: PM_SHARE },
            { text: "It is a **call auction**: the totalizator prices all bets at once when **betting closes**.", cite: PM_CALL },
            { text: "Only **market orders** are allowed, so many bettors wait until the last moment.", cite: PM_WAIT },
          ],
        },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "5.2.3-call-vs-continuous",
      sec: "5.2.3",
      title: "Call or continuous?",
      pages: "91",
      imp: 3,
      steps: [
        {
          kind: "idea",
          title: "A call focuses attention",
          body: "A call brings **everyone interested in an instrument together at the same time and place**, so buyers and sellers **easily find each other**.",
          cite: CALL_ADV,
        },
        {
          kind: "idea",
          title: "Continuous trading gives flexibility",
          body: "Continuous trading lets you **trade whenever you want**. That matters most to **impatient traders** who won't wait for the next call.",
          cite: CONT_ADV,
        },
        {
          kind: "see",
          title: "Same traders, two sessions",
          illus: FindEachOther,
          beats: [
            { text: "Four traders show up at different times in a **call market** that calls at noon. (Our times.) They wait.", cite: CALL_DEF },
            { text: "At the call they are **all there at once**, so they **easily find each other**.", cite: FIND },
            { text: "In a **continuous market**, the same traders can try to trade **the moment they arrive**.", cite: CONT_ADV },
            { text: "For the **impatient** first buyer, that's the difference: the call makes them wait almost two hours; here they trade at 10:05.", cite: IMPATIENT },
          ],
        },
        {
          kind: "choice",
          q: "What is the **main advantage** of a call market?",
          options: [
            "It focuses all interested traders at the same time and place",
            "It lets each trader trade at any moment they choose",
            "Dealers stand ready to quote a firm price all day long",
            "It needs no order precedence or trade pricing rules",
          ],
          answer: 0,
          why: "When buyers and sellers search for liquidity at the same time and place, they easily find each other.",
          cite: CALL_ADV,
        },
        {
          kind: "choice",
          q: "Who gains most from continuous trading?",
          options: ["Impatient traders who don't want to wait for the next call", "Traders who want every counterparty in one place at once", "Governments selling new bills, notes and bonds at auction", "Bettors who want to see the final odds before they bet"],
          answer: 0,
          why: "The flexibility to trade **whenever you want** matters most to impatient traders.",
          cite: IMPATIENT,
        },
        {
          kind: "classify",
          q: "Which session suits each trader better?",
          buckets: ["Call", "Continuous"],
          items: [
            { text: "Must sell now, before the news spreads", bucket: 1, why: "An impatient trader can't wait for the next call." },
            { text: "Wants to meet as many buyers as possible at once", bucket: 0, why: "A call gathers every interested trader at the same time and place." },
            { text: "Trades a quiet stock and fears finding no one", bucket: 0, why: "A call focuses the few interested traders on one moment." },
            { text: "Wants to trade the moment a signal appears", bucket: 1, why: "Continuous trading lets you trade whenever you want." },
            { text: "Happy to wait for the crowd at the auction", bucket: 0, why: "Patience buys the call's concentrated liquidity." },
          ],
          cite: CALL_ADV,
        },
        {
          kind: "idea",
          title: "Traders voted for both",
          body: "Many national equity exchanges switched from **call rotations** to **continuous trading with opening calls**. **None** went from continuous trading to exclusive calls.",
          cite: SWITCHED,
        },
        {
          kind: "truefalse",
          q: "Several national stock exchanges have moved from continuous trading to exclusive call markets.",
          answer: false,
          why: "The moves went the other way: from call rotations to **continuous trading with opening calls**. None went to exclusive calls.",
          cite: SWITCHED,
        },
        {
          kind: "fill",
          q: "Traders prefer ___ markets with opening ___ to exclusive call markets.",
          bank: ["continuous", "calls", "dealer", "rotations", "brokered"],
          answer: ["continuous", "calls"],
          why: "An opening call gathers everyone once; continuous trading then serves the impatient for the rest of the day.",
          cite: PREFER,
        },
        {
          kind: "recap",
          points: [
            { text: "A call's main advantage: it **focuses everyone at the same time and place**, so traders find each other.", cite: CALL_ADV },
            { text: "Continuous trading's main advantage: **trade whenever you want**, which impatient traders value.", cite: IMPATIENT },
            { text: "Traders prefer **continuous markets with opening calls** to exclusive call markets.", cite: PREFER },
          ],
        },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────────────────────
    {
      id: "5.2.4-hours",
      sec: "5.2.4",
      title: "Trading hours",
      pages: "92",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Trading hours",
          body: "The times when a market **accepts orders and arranges trades**.",
          cite: HOURS,
        },
        {
          kind: "idea",
          title: "The regular session",
          body: "Continuous markets trade in **normal business hours**. The **NYSE** and **Nasdaq** open at **9:30 a.m.** and close at **4 p.m. Eastern Time**.",
          cite: NYSE_HOURS,
        },
        {
          kind: "see",
          title: "A trading day",
          illus: TradingDay,
          beats: [
            { text: "The **regular session**: at the NYSE and Nasdaq, 9:30 a.m. to 4 p.m. Eastern.", cite: NYSE_HOURS },
            { text: "**Before the open**, traders collect and submit orders.", cite: BEFORE },
            { text: "**After the close**, they settle trades and report the results to clients.", cite: AFTER },
            { text: "Some markets add an **after-hours session** once the regular session ends.", cite: AH },
          ],
        },
        {
          kind: "choice",
          q: "What do traders do in the hours **before the open**?",
          options: ["Collect and submit orders", "Settle trades and report to clients", "Run the closing auction", "Nothing: markets refuse orders then"],
          answer: 0,
          why: "Before the open they collect and submit orders; after the close they settle trades and report to clients.",
          cite: BEFORE,
        },
        {
          kind: "number",
          q: "The NYSE's regular session runs from 9:30 a.m. to 4 p.m. Eastern. How many hours long is it?",
          answer: 6.5,
          unit: "hours",
          tol: 0.01,
          why: "From 9:30 a.m. to 4:00 p.m. is **6½ hours**.",
          cite: NYSE_HOURS,
        },
        {
          kind: "truefalse",
          q: "Traders use the hours after the close to settle trades and report results to clients.",
          answer: true,
          why: "That is what the hours after the close are for.",
          cite: AFTER,
        },
        {
          kind: "idea",
          title: "Odd hours to match another time zone",
          body: "Some markets trade at odd local hours to be open during another zone's business hours. The **Chicago Stock Exchange** opened at **8:30 a.m. Central** and the **Pacific Exchange** at **6:30 a.m. Pacific**: both at the NYSE's 9:30 a.m. Eastern open.",
          cite: ODD,
        },
        {
          kind: "see",
          title: "One moment, three clocks",
          illus: TimeZones,
          beats: [
            { text: "In New York it's **9:30 a.m. ET**: the NYSE opens.", cite: NYSE_HOURS },
            { text: "In Chicago it's one hour earlier: **8:30 a.m. CT**, when the Chicago Stock Exchange opens.", cite: CHICAGO },
            { text: "In San Francisco it's three hours earlier: **6:30 a.m. PT**, when the Pacific Exchange opens.", cite: PACIFIC },
            { text: "Three local times, **one moment**: the odd hours line the markets up with the NYSE.", cite: ODD },
          ],
        },
        {
          kind: "choice",
          q: "Why did the Chicago Stock Exchange open at 8:30 a.m. Central Time?",
          options: ["To coincide with the NYSE's 9:30 a.m. Eastern open", "Because Chicago brokers start work earlier", "To finish before Chicago's futures pits open", "Because rules banned trading at 9:30 in Chicago"],
          answer: 0,
          why: "8:30 a.m. Central is 9:30 a.m. Eastern: it opened at the same moment as the NYSE.",
          cite: CHICAGO,
        },
        {
          kind: "game",
          id: "market-clock",
          title: "Market clock",
          brief: "A clock in **New York**, **Chicago** or **San Francisco**. Say where the NYSE's day is, or convert the time between cities. The hours come from the book: **9:30 a.m.–4 p.m. Eastern**.",
          game: MarketClock,
        },
        {
          kind: "idea",
          title: "After-hours sessions",
          body: "Some markets run **after-hours sessions**: for **clients in other time zones**, or so traders can **clean up (adjust) their positions** after the regular session.",
          cite: AH_WHY,
        },
        {
          kind: "multi",
          q: "Why do exchanges offer after-hours sessions? (Select all that apply.)",
          options: ["To appeal to clients in other time zones", "To let traders clean up (adjust) their positions", "To settle the day's trades", "To collect orders for the next open"],
          answer: [0, 1],
          why: "After-hours sessions serve other time zones and position clean-up. Settling and order collection aren't trading sessions.",
          cite: AH_WHY,
        },
        {
          kind: "choice",
          q: "Why do foreign exchange traders often keep very unusual hours?",
          options: ["Many currency markets trade around the clock", "FX markets open only at night, after stocks close", "Currency trades must be confirmed at midnight", "Regulators require FX desks to work in night shifts"],
          answer: 0,
          why: "With currency markets trading **around the clock**, there is always a market open somewhere.",
          cite: FX,
        },
        {
          kind: "today",
          title: "Hours today",
          body: "U.S. stocks still have a **9:30 a.m.–4 p.m. ET** regular session, and many brokers and venues offer **extended hours**, commonly **4 a.m.–8 p.m. ET**. The Pacific Exchange's stock market is now **NYSE Arca**; the Chicago Stock Exchange is **NYSE Chicago**.",
          source: "NYSE Arca and Nasdaq trading-hours pages; NYSE (2006, 2018)",
        },
        {
          kind: "recap",
          points: [
            { text: "Trading hours say when a market **accepts orders and arranges trades**; NYSE and Nasdaq: **9:30 a.m.–4 p.m. ET**.", cite: NYSE_HOURS },
            { text: "**Before the open**: collect and submit orders. **After the close**: settle and report.", cite: AFTER },
            { text: "Some markets keep **odd hours** to match another time zone, and some add **after-hours sessions**.", cite: ODD },
          ],
        },
      ],
    },

    // ── Lesson 7 ──────────────────────────────────────────────────────────
    {
      id: "5.2.4-rhythm",
      sec: "5.2.4",
      title: "Lunch, the open and the close",
      pages: "92",
      imp: 2,
      steps: [
        {
          kind: "idea",
          title: "Busy open, quiet lunch, busy close",
          body: "At the NYSE and Nasdaq, trading activity is generally **lowest at lunchtime**. The **open** and the **close** are both very active.",
          cite: LOW,
        },
        {
          kind: "see",
          title: "The shape of a trading day",
          illus: VolumeDay,
          beats: [
            { text: "Volume through the day: tall bars at the **open** and the **close**. (Our numbers.)", cite: MIDWAY },
            { text: "The **lowest** activity comes at **lunchtime**.", cite: LOW },
            { text: "Some markets stop for lunch altogether. The **Tokyo Stock Exchange** splits its day into a **morning** and an **afternoon session**.", cite: SESSIONS2 },
          ],
        },
        {
          kind: "choice",
          q: "When is trading activity at the NYSE and Nasdaq generally **lowest**?",
          options: ["At lunchtime", "In the first half hour", "In the last half hour", "Right after the open"],
          answer: 0,
          why: "Activity dips at lunch, midway between the very active open and close.",
          cite: LOW,
        },
        {
          kind: "multi",
          q: "Which explanations does Harris give for low lunchtime volume? (Select all that apply.)",
          options: ["Lunch sits midway between the very active open and close", "People may be more interested in lunch than in trading", "Exchanges charge higher fees at lunch", "Prices are not allowed to change at lunch"],
          answer: [0, 1],
          why: "He offers both: lunch falls between two busy moments, or people may simply prefer lunch.",
          cite: HUNGRY,
        },
        {
          kind: "definition",
          term: "Lunchtime recess",
          body: "Some continuous markets **stop trading for lunch**, splitting the day into a **morning session** and an **afternoon session**.",
          cite: RECESS,
        },
        {
          kind: "truefalse",
          q: "The Tokyo Stock Exchange is the largest exchange that stops trading for lunch.",
          answer: true,
          why: "Harris names Tokyo as the largest exchange with a lunchtime recess.",
          cite: TOKYO,
        },
        {
          kind: "fill",
          q: "Some continuous markets divide their trading days into a ___ session and an ___ session.",
          bank: ["morning", "afternoon", "night", "opening", "after-hours"],
          answer: ["morning", "afternoon"],
          why: "A lunchtime recess splits the day in two: morning and afternoon.",
          cite: SESSIONS2,
        },
        {
          kind: "today",
          title: "Tokyo still breaks for lunch",
          body: "The **Tokyo Stock Exchange** still pauses from **11:30 a.m. to 12:30 p.m.**. Since **November 2024** its afternoon session closes at **3:30 p.m.** instead of 3:00.",
          source: "Japan Exchange Group, trading hours extension (5 Nov 2024)",
        },
        {
          kind: "definition",
          term: "Pinging the market",
          body: "Submitting orders **just to see what happens to them**, to learn the prices at which other traders will trade.",
          cite: PING,
        },
        {
          kind: "see",
          title: "Market sonar",
          illus: Sonar,
          beats: [
            { text: "Markets are often **opaque**: you can't see who is waiting to trade, or at what price.", cite: OPAQUE },
            { text: "So you **ping**: send a small order, say sell 100 at 20.10, just to see what happens. (Our numbers.)", cite: PING },
            { text: "It comes back **filled**: someone will buy at 20.10. Your ping revealed a price at which another trader will trade.", cite: PING_INFO },
          ],
        },
        {
          kind: "choice",
          q: "Why do traders ping a continuous market?",
          options: [
            "To learn the prices at which other traders will trade",
            "To test how fast the exchange's network is",
            "To cancel all their standing orders at once",
            "To force the market to stop and hold a call auction",
          ],
          answer: 0,
          why: "Markets are often opaque; an order's fate tells you something about the orders you can't see.",
          cite: PING_INFO,
        },
        {
          kind: "truefalse",
          q: "At exchanges that trade through lunch, many traders skip lunch or eat at their desks so they don't miss anything.",
          answer: true,
          why: "Where trading never stops, traders eat on the floor or at their desks.",
          cite: SKIP,
        },
        {
          kind: "recap",
          points: [
            { text: "Activity at the NYSE and Nasdaq is **lowest at lunch**; the **open** and **close** are very active.", cite: LOW },
            { text: "Some markets, the largest being **Tokyo**, stop for lunch: a **morning** and an **afternoon** session.", cite: TOKYO },
            { text: "Traders **ping** opaque markets with orders to see what happens to them.", cite: PING },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "Which statement matches the chapter's summary of trading sessions?",
      options: [
        "Call markets trade only when called; continuous markets trade whenever they are open",
        "Continuous markets trade only when called; call markets trade whenever they are open",
        "Both trade only at the open and the close",
        "Call markets trade only on exchange floors",
      ],
      answer: 0,
      why: "A call trades only at the call; a continuous market trades all session long.",
      cite: SUM,
    },
    {
      kind: "truefalse",
      q: "Call markets convene all traders at the same time and place.",
      answer: true,
      why: "That is their whole point: one moment, one place, everyone together.",
      cite: PT_CALL,
    },
    {
      kind: "choice",
      q: "Markets that call in rotation…",
      options: ["may do one rotation a session, or as many as their hours permit", "must finish exactly one rotation, no more, each trading day", "call every security at the same moment, never one at a time", "must trade continuously between rotations, by law"],
      answer: 0,
      why: "Some complete only one rotation per session; others repeat as often as their hours allow.",
      cite: ROT_ONE,
    },
    {
      kind: "fill",
      q: "Markets have trading ___ during which trades are ___.",
      bank: ["sessions", "arranged", "halts", "cancelled", "rotations"],
      answer: ["sessions", "arranged"],
      why: "Trades are arranged in sessions, continuous or call.",
      cite: SESSIONS,
    },
    {
      kind: "choice",
      q: "When do continuously trading markets schedule their **regular** sessions?",
      options: ["During normal business hours", "Overnight, when fewer traders compete", "Only at weekends", "Whenever the regulator calls them"],
      answer: 0,
      why: "Regular sessions fall in business hours, often opening an hour or two after the day starts.",
      cite: BUSINESS,
    },
    {
      kind: "truefalse",
      q: "Many electronic trading networks provide extended trading hours for their clients.",
      answer: true,
      why: "Extended hours are one of the ways electronic networks serve their clients.",
      cite: ECN,
    },
    {
      kind: "choice",
      q: "In a continuous market, traders may…",
      options: ["continuously attempt to arrange their trades while it is open", "trade only once the opening call has finished each day", "trade only with a dealer who quotes them a price", "submit orders only before the open, never during it"],
      answer: 0,
      why: "That is the sense in which trading is continuous.",
      cite: CONT_TRY,
    },
  ],
};
