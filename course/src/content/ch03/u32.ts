// 3.2 TRADE FACILITATORS (pp. 34–38)
import type { Cite, Unit } from "../types.ts";
import {
  ClearinghouseHub,
  ClearingMatch,
  Depository,
  ExchangeForum,
  ExchangeOwnership,
  NetSettlement,
  SettleTimeline,
  SettlementAgent,
  TradeLifecycle,
  VariationMargin,
} from "./illus/u32.tsx";
import { ClearingDesk } from "./games/ClearingDesk.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 3.2 and 3.2.1 ─────────────────────────────────────────────────
const FACILITATORS = c(34, "3.2", "Many institutions help traders trade. We introduce exchanges, clearing and settlement agents, depositories, and custodians in this section.");
const EXCH = c(34, "3.2.1", "Exchanges provide forums where traders meet to arrange trades. Exchange traders may include dealers, brokers, and buy-side traders.");
const MEMBERS = c(34, "3.2.1", "Only members can trade at most exchanges. Nonmembers trade by asking member-brokers to trade for them.");
const FLOORS = c(34, "3.2.1", "Historically, traders met on exchange floors. Now, at many exchanges, traders meet only via electronic communications networks.");
const ORDER_DRIVEN = c(34, "3.2.1", "Other exchanges have order-driven trading systems that arrange trades by matching buy and sell orders");
const BROKERAGES = c(35, "3.2.1", "Order-driven exchanges are essentially brokerages because they arrange trades for their clients. Exchanges and brokerages therefore often compete with each other.");
const PTS_COMPETE = c(66, "3.7", "Exchanges often compete with brokerages to arrange trades.");
const ECN = c(35, "3.2.1", "Some U.S. equity trading systems are known as electronic communications networks (ECNs). These are order-driven trading systems that are not regulated as exchanges.");
const ECN_OWN = c(35, "3.2.1", "Brokerages, dealers, or other entities may own them.");
const MEMBER_OWNED = c(35, "3.2.1", "Exchanges once were owned and controlled by their members. Membership organizations, however, tend not to be nimble competitors.");
const CORP = c(35, "3.2.1", "To compete more effectively with ECNs, brokerages, and other exchanges, many exchanges have converted, or are in the process of converting, to corporate ownership.");
const MGMT = c(35, "3.2.1", "With corporate ownership, they hope to obtain highly motivated, empowered, entrepreneurial management.");
const OTC = c(35, "3.2.1", "In many markets, dealers and brokers arrange trades over the counter.");
const OTC_BONDS = c(35, "3.2.1", "The corporate bond market is an example of a large market in which almost no trading takes place at organized exchanges.");

// ── Excerpts: 3.2.2 and 3.2.2.1 ─────────────────────────────────────────────
const AGENCIES = c(35, "3.2.2", "Several agencies facilitate trading by helping traders settle the trades they have arranged. They also prevent problems that can arise when some traders are not trustworthy or creditworthy.");
const RECORDS = c(35, "3.2.2.1", "They record the terms of their trades and the identities of the traders with whom they traded. To settle their trades, buyers and sellers must compare their records.");
const CLEARING_AGENT = c(35, "3.2.2.1", "The clearing agent matches the buyer and seller records and confirms that both traders agreed to the same terms. Once trades are cleared, traders then settle their trades.");
const NSCC = c(35, "3.2.2.1", "The largest securities clearing agency in the United States is the National Securities Clearing Corporation (NSCC).");
const CLEARS = c(35, "3.2.2.1", "A trade clears if the buyer and seller both report that they traded with each other, and their reported terms of trade are identical.");
const DK = c(35, "3.2.2.1", "In the futures markets, such trades are called out-trades. In the securities markets, they are called DKs (for Don't Know).");
const TRIVIAL = c(35, "3.2.2.1", "Clearing is a trivial exercise when automated order-matching systems arrange all trades.");
const KNOW_ALL = c(35, "3.2.2.1", "Since these systems know everything about the trades they arrange, they always report matched trades.");

// ── Excerpts: 3.2.2.2 ───────────────────────────────────────────────────────
const SETTLE_AGENTS = c(36, "3.2.2.2", "They receive cash from buyers and securities from sellers. When both sides have performed, the settlement agent gives the cash to the seller and the securities to the buyer.");
const ESCROW = c(36, "3.2.2.2", "In the real estate markets, settlement agents are called escrow agents.");
const WHY_SETTLE = c(36, "3.2.2.2", "Traders use settlement agents because the agents are very efficient at settling trades, and because they can help them avoid the losses that can arise if they trade with an untrustworthy or uncreditworthy trader.");
const NSCC_SETTLE = c(36, "3.2.2.2", "the National Securities Clearing Corporation is also, not surprisingly, the largest U.S. securities settlement agency.");
const CLEARED_THEN = c(35, "3.2.2.1", "Once trades are cleared, traders then settle their trades.");
const NET1 = c(36, "3.2.2.2", "Under net settlement, for each client, the settlement agent nets the buys and sells in each security to a single net security position.");
const NET_MONEY = c(36, "3.2.2.2", "The settlement agent also nets all money credits and debits into a single net money position for each client. The agent then settles only the net positions.");
const NET2 = c(36, "3.2.2.2", "Through netting, the settlement agency can vastly reduce the number of transactions necessary to settle trades.");
const NET3 = c(36, "3.2.2.2", "Netsettlement works best when all traders use the same settlement agent.");
const T3 = c(36, "3.2.2.2", "In U.S. securities markets, normal-way settlement occurs three business days after trades are arranged. Such settlement is called T+3 settlement.");
const CASH = c(36, "3.2.2.2", "The most common special settlement instruction is cash settlement, which occurs on the day of the trade.");
const BOX_T5 = { box: "T+5 and Counting Down" };
const T5_WHY = c(36, "3.2.2.2", "Brokers and regulators would like to settle security trades as quickly as possible in order to minimize trader exposure to credit risks.", BOX_T5);
const T5_RISK = c(36, "3.2.2.2", "During the time between the negotiation of a trade and the time it settles, prices can change substantially.", BOX_T5);
const T5_HIST = c(36, "3.2.2.2", "Until June 1995, the U.S. securities industry settled stock and bond trades on T+5. It now settles trades on T+3.", BOX_T5);
const T1_PLAN = c(36, "3.2.2.2", "Starting in June 2005, the industry intends to settle on T+1.", BOX_T5);
const T1_REQ = c(36, "3.2.2.2", "T+1 settlement will require most traders to deposit money and certificates with their brokers before they trade", BOX_T5);

// ── Excerpts: 3.2.2.3 ───────────────────────────────────────────────────────
const CH1 = c(36, "3.2.2.3", "The clearinghouses clear and settle all trades in these derivative contracts. They also usually guarantee that both parties will perform on their contracts.");
const CH2 = c(36, "3.2.2.3", "They do this by acting as buyer for every seller and as seller for every buyer. They therefore are the issuers and guarantors of their contracts.");
const CH_MEMBERS = c(36, "3.2.2.3", "Clearinghouses generally are owned by clearing members, who are jointly responsible for settling all trades.");
const CH_GUAR = c(36, "3.2.2.3", "Traders who are not clearing members must have a clearing member guarantee the settlement of their trades. If a trader fails to settle a trade, his clearing member must do so.");
const CH_INSURANCE = c(36, "3.2.2.3", "the clearinghouse can tax its other members to settle the trade. The clearinghouse is therefore like a mutual insurance company.");
const CH_MARGINS = c(36, "3.2.2.3", "clearinghouses require that their members post collateral called margins to secure their obligations");
const CH_CONTROL = c(36, "3.2.2.3", "provide timely information about their financial conditions and their trading activities, and not exceed positions limits that the clearinghouse establishes for them.");
const FUT_CREDIT = c(42, "3.3.3.1", "Futures traders therefore do not care whether their counterparts are creditworthy. They only need to consider whether the clearinghouse is creditworthy.");
const VM_DAILY = c(36, "3.2.2.3", "After every trading day, traders also make an intermediate settlement of their accounts in which they transfer profits earned that day from losers to winners.");
const VM_WHY = c(36, "3.2.2.3", "These variation margin adjustments ensure that the incentives to default on a contract do not grow as prices move against a losing position.");
const BOX_VM = { box: "Variation Margin Example" };
const SILVER1 = c(42, "3.3.3", "Brad buys a 5,000-troy-ounce silver futures contract for 4.50 an ounce from Sharon", BOX_VM);
const SILVER_PAY = c(42, "3.3.3", "The NYMEX Clearing House requires that Sharon pay it 250 dollars (5,000 ounces times 0.05 dollar per ounce) in variation margin.", BOX_VM);
const SILVER_SIM = c(42, "3.3.3", "Simultaneously, the Clearing House pays Brad 250 dollars in variation margin.", BOX_VM);
const SILVER_END = c(42, "3.3.3", "If the price of silver is the same when the contract expires, Brad will pay 4.55 an ounce for the silver, and Sharon will receive 4.55 an ounce.", BOX_VM);
const BOX_BR = { box: "The Brazilian Straddle" };
const BANKRUPT = c(37, "3.2.2.3", "Traders are technically bankrupt when they no longer have enough wealth to settle their trades.", BOX_BR);
const NOTHING_TO_LOSE = c(37, "3.2.2.3", "When traders know that they are technically bankrupt, they have nothing to lose by massively increasing their positions.", BOX_BR);
const STRADDLE = c(37, "3.2.2.3", "A Brazilian straddle consists of a large market position held against a one-way airline ticket to Brazil in the breast pocket.", BOX_BR);
const STRADDLE_STOP = c(37, "3.2.2.3", "They also require that their customers make margin payments within the day when prices move substantially against their positions.", BOX_BR);

// ── Excerpts: 3.2.2.4 ───────────────────────────────────────────────────────
const DEPO1 = c(38, "3.2.2.4", "Depositories and custodians hold cash and securities on behalf of their clients.");
const DEPO2 = c(38, "3.2.2.4", "They help settle trades by quickly delivering cash and security certificates—when properly instructed—to settlement agents.");
const DTC = c(38, "3.2.2.4", "The largest depository in the world is the Depository Trust Company (DTC). DTC holds nearly 20 trillion dollars in assets for its participants and their clients.");
const DTCC = c(38, "3.2.2.4", "It is a subsidiary of the Depository Trust and Clearing Corporation (DTCC). The other major subsidiary of DTCC is the National Securities Clearing Corporation (NSCC).");
const BOX_STP = { box: "Straight-Through Processing" };
const STP = c(38, "3.2.2.4", "Trading systems that fully automate the clearing and settlement process provide straight-through processing (STP) to their clients.", BOX_STP);
const STP_WHY = c(38, "3.2.2.4", "Traders like STP because it is cheap and minimizes the potential for errors.", BOX_STP);

// ── Excerpts: box "A Typical Set of Relationships" (p. 37) ──────────────────
const BOX_TYP = { box: "A Typical Set of Relationships" };
const TYP_FUND = c(37, "3.2.2.3", "The pension fund deposits the money in its account at its custodian bank. It also notifies its investment adviser that it has money available for investment.", BOX_TYP);
const TYP_DECIDE = c(37, "3.2.2.3", "The manager decides to buy 30,000 shares of Cisco Systems.", BOX_TYP);
const TYP_ORDER = c(37, "3.2.2.3", "She then issues an order to the state pension fund's broker to buy the shares.", BOX_TYP);
const TYP_DEALER = c(37, "3.2.2.3", "The broker calls a dealer and arranges the trade. The dealer sells the shares to the pension fund out of its inventory.", BOX_TYP);
const TYP_REPORT = c(37, "3.2.2.3", "The dealer and the broker both report the trade to the National Securities Clearing Corporation (NSCC).", BOX_TYP);
const TYP_CONFIRM = c(37, "3.2.2.3", "The broker also reports the trade to the pension fund and to the investment adviser.", BOX_TYP);
const TYP_SETTLE = c(37, "3.2.2.3", "Three days later, on instructions from the dealer and the pension fund, NSCC settles the trade.", BOX_TYP);
const TYP_DTC = c(37, "3.2.2.3", "The custodian bank sends money to the pension fund's account at the Depository Trust Company (DTC).", BOX_TYP);
const TYP_SHARES = c(37, "3.2.2.3", "The DTC then provides the money to settle on behalf of the pension fund, and it receives the 30,000 shares on behalf of the pension fund.", BOX_TYP);

export const U32: Unit = {
  sec: "3.2",
  title: "Trade Facilitators",
  pages: "34–38",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "3.2.1-exchanges",
      sec: "3.2.1",
      title: "Exchanges: where traders meet",
      pages: "34–35",
      steps: [
        {
          kind: "idea",
          title: "Trade facilitators",
          body: "Many institutions help traders trade: **exchanges**, **clearing and settlement agents**, **depositories** and **custodians**.",
          cite: FACILITATORS,
        },
        { kind: "definition", term: "Exchanges", body: "**Forums** where traders meet to arrange trades. Dealers, brokers and buy-side traders may all trade there.", cite: EXCH },
        { kind: "idea", title: "Members only", body: "At most exchanges only **members** can trade. A nonmember asks a **member-broker** to trade for it.", cite: MEMBERS },
        {
          kind: "see",
          title: "Inside an exchange",
          illus: ExchangeForum,
          beats: [
            { text: "An exchange is a **forum**: dealers, brokers and buy-side traders who are members meet there to arrange trades.", cite: EXCH },
            { text: "A **nonmember** can't trade there directly. Its order goes through a **member-broker**.", cite: MEMBERS },
            { text: "Traders used to meet on exchange **floors**. At many exchanges they now meet only through **electronic networks**.", cite: FLOORS },
            { text: "Some exchanges are **order-driven**: a system matches buy and sell orders according to its rules.", cite: ORDER_DRIVEN },
          ],
        },
        {
          kind: "truefalse",
          q: "At most exchanges, anyone can trade directly without going through a member.",
          answer: false,
          why: "Only members can trade at most exchanges; nonmembers go through member-brokers.",
          cite: MEMBERS,
        },
        {
          kind: "choice",
          q: "How does a nonmember trade at an exchange?",
          options: ["It asks a member-broker to trade for it", "It phones the clearing agent", "It trades on the floor as a guest", "It cannot trade at all"],
          answer: 0,
          why: "Nonmembers trade by asking member-brokers to trade for them.",
          cite: MEMBERS,
        },
        {
          kind: "definition",
          term: "Order-driven trading system",
          body: "Arranges trades by **matching buy and sell orders** according to a set of rules, instead of leaving traders to negotiate.",
          cite: ORDER_DRIVEN,
        },
        {
          kind: "quote",
          lead: "Why exchanges and brokerages are rivals:",
          cite: BROKERAGES,
          mark: ["essentially brokerages", "compete"],
        },
        {
          kind: "fill",
          q: "Order-driven exchanges are essentially ___ because they arrange trades for their clients.",
          bank: ["brokerages", "dealers", "clearinghouses", "regulators"],
          answer: ["brokerages"],
          why: "Like a brokerage, an order-driven exchange arranges trades for its clients.",
          cite: BROKERAGES,
        },
        {
          kind: "multi",
          q: "Which traders may meet at an exchange, according to the book?",
          options: ["Dealers", "Brokers", "Buy-side traders", "The clearing agent"],
          answer: [0, 1, 2],
          why: "Exchange traders may include dealers, brokers and buy-side traders. Clearing agents work after the trade.",
          cite: EXCH,
        },
        {
          kind: "truefalse",
          q: "Exchanges and brokerages often compete to arrange trades.",
          answer: true,
          why: "One of the chapter's points to remember (§3.7).",
          cite: PTS_COMPETE,
        },
        {
          kind: "recap",
          points: [
            { text: "**Exchanges** are forums where traders meet to arrange trades.", cite: EXCH },
            { text: "Only **members** trade at most exchanges; nonmembers use member-brokers.", cite: MEMBERS },
            { text: "**Order-driven** exchanges match orders, so they compete with **brokerages**.", cite: BROKERAGES },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "3.2.1-ecns-otc",
      sec: "3.2.1",
      title: "ECNs, demutualization and OTC",
      pages: "35",
      steps: [
        {
          kind: "definition",
          term: "Electronic communications networks (ECNs)",
          body: "U.S. **order-driven** trading systems that are **not regulated as exchanges**. Brokerages, dealers or others may own them.",
          cite: ECN,
        },
        {
          kind: "idea",
          title: "Member-owned exchanges are slow",
          body: "Exchanges were once **owned and controlled by their members**, and membership organizations are rarely **nimble** competitors.",
          cite: MEMBER_OWNED,
        },
        {
          kind: "definition",
          term: "Demutualization",
          body: "Converting an exchange from member ownership to **corporate ownership**, to compete better with ECNs, brokerages and other exchanges.",
          cite: CORP,
        },
        {
          kind: "see",
          title: "Who owns the exchange?",
          illus: ExchangeOwnership,
          beats: [
            { text: "Traditionally, the **members** own and control the exchange they trade on.", cite: MEMBER_OWNED },
            { text: "ECNs, brokerages and other exchanges compete for the same trades, and member-run exchanges are slow to respond.", cite: CORP },
            { text: "Demutualized, the exchange is owned by **shareholders** and run by **management** hired to be entrepreneurial.", cite: MGMT },
            { text: "Not all trading needs an exchange: **over the counter**, dealers and brokers arrange trades directly.", cite: OTC },
          ],
        },
        {
          kind: "choice",
          q: "What is an ECN?",
          options: ["An order-driven trading system not regulated as an exchange", "A clearinghouse for options", "A dealer's inventory account", "A government regulator"],
          answer: 0,
          why: "ECNs are order-driven trading systems that are not regulated as exchanges.",
          cite: ECN,
        },
        {
          kind: "truefalse",
          q: "Only exchanges are allowed to own ECNs.",
          answer: false,
          why: "Brokerages, dealers or other entities may own them.",
          cite: ECN_OWN,
        },
        {
          kind: "choice",
          q: "Why have many exchanges converted to corporate ownership?",
          options: ["To compete better with ECNs, brokerages and other exchanges", "Because regulators banned members", "To stop clearing their trades", "To lower their listing standards"],
          answer: 0,
          why: "Corporate ownership is meant to make them more effective competitors, with motivated management.",
          cite: CORP,
        },
        { kind: "definition", term: "Over the counter (OTC)", body: "Trading arranged directly by **dealers and brokers**, away from organized exchanges.", cite: OTC },
        {
          kind: "choice",
          q: "Which large market has almost no trading at organized exchanges?",
          options: ["The corporate bond market", "The futures market", "The stock market", "The equity options market"],
          answer: 0,
          why: "The book's example of a large market that trades almost entirely over the counter.",
          cite: OTC_BONDS,
        },
        {
          kind: "classify",
          q: "Exchange, ECN, or over the counter?",
          buckets: ["Exchange", "ECN", "Over the counter"],
          items: [
            { text: "A forum where members meet to arrange trades", bucket: 0 },
            { text: "An order-driven system owned by a brokerage, not regulated as an exchange", bucket: 1 },
            { text: "A dealer sells a corporate bond to a client by phone", bucket: 2 },
            { text: "Island ECN", bucket: 1, why: "The book lists Island ECN among the most important ECNs." },
            { text: "A trading floor full of member traders", bucket: 0 },
            { text: "Most corporate bond trading", bucket: 2 },
          ],
          cite: OTC_BONDS,
        },
        {
          kind: "today",
          title: "ECNs became exchanges",
          body: "As the book expected, the big ECNs merged into exchanges: **Archipelago** joined the NYSE in 2006 (today **NYSE Arca**), and Nasdaq bought **Instinet**, which owned Island, in 2005. The NYSE itself became a public company in 2006.",
          source: "NYSE and Nasdaq corporate histories",
        },
        {
          kind: "recap",
          points: [
            { text: "**ECNs** are order-driven systems not regulated as exchanges.", cite: ECN },
            { text: "Many exchanges **demutualized**: from member to corporate ownership.", cite: CORP },
            { text: "**Over the counter**, dealers and brokers trade without an exchange.", cite: OTC },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.1-clearing",
      sec: "3.2.2.1",
      title: "Clearing: do the records match?",
      pages: "35",
      steps: [
        {
          kind: "idea",
          title: "After the trade comes settlement",
          body: "Several agencies help traders **settle** the trades they arranged, and protect them from traders who aren't **trustworthy or creditworthy**.",
          cite: AGENCIES,
        },
        {
          kind: "idea",
          title: "Both sides keep a record",
          body: "Buyer and seller each record the **terms** of the trade and **who they traded with**. Before settling, the two records must be compared.",
          cite: RECORDS,
        },
        {
          kind: "definition",
          term: "Clearing agent",
          body: "Receives both records, **matches** them and confirms both traders agreed to the **same terms**. Only then is the trade settled.",
          cite: CLEARING_AGENT,
        },
        {
          kind: "see",
          title: "Clearing, field by field",
          illus: ClearingMatch,
          beats: [
            { text: "After the trade, the buyer and the seller each write down what they agreed: security, size, price and counterparty.", cite: RECORDS },
            { text: "Both records go to a **clearing agent**. In U.S. securities, the largest is the **NSCC**.", cite: NSCC },
            { text: "Every term agrees and each names the other: the trade **clears**.", cite: CLEARS },
            { text: "Here the prices differ. The agent reports the discrepancy: a **DK** in securities, an **out-trade** in futures.", cite: DK },
            { text: "When an **automated order-matching system** arranges the trade, it writes both sides, so the records always match.", cite: KNOW_ALL },
          ],
        },
        {
          kind: "definition",
          term: "Out-trades and DKs",
          body: "Trades whose two records **don't match**. Futures traders call them out-trades; securities traders call them DKs, for “Don't Know”.",
          cite: DK,
        },
        {
          kind: "truefalse",
          q: "A trade clears only if both sides report trading with each other on identical terms.",
          answer: true,
          why: "Both must name each other, and every reported term must be identical.",
          cite: CLEARS,
        },
        {
          kind: "choice",
          q: "In the securities markets, a trade whose records don't match is called…",
          options: ["a DK", "an out-trade", "a straddle", "a wash"],
          answer: 0,
          why: "DK stands for “Don't Know”. Futures traders call the same thing an out-trade.",
          cite: DK,
        },
        {
          kind: "choice",
          q: "Why is clearing trivial when an automated order-matching system arranges every trade?",
          options: ["The system knows everything about the trades it arranges", "Regulators skip the check", "No money changes hands", "Those trades are too small to matter"],
          answer: 0,
          why: "The system recorded both sides itself, so it always reports matched trades.",
          cite: KNOW_ALL,
        },
        {
          kind: "game",
          id: "clearing-desk",
          title: "Clearing desk",
          brief: "You are the clearing agent. For each trade, compare the two records: **Clears** if every term matches and each names the other, **DK** if anything differs. 8 trades, 80 seconds.",
          game: ClearingDesk,
        },
        {
          kind: "fill",
          q: "In the futures markets, unmatched trades are called ___; in the securities markets they are called ___.",
          bank: ["out-trades", "DKs", "straddles", "wirehouses"],
          answer: ["out-trades", "DKs"],
          why: "Same problem, two names.",
          cite: DK,
        },
        {
          kind: "truefalse",
          q: "Clearing is a hard problem when automated order-matching systems arrange all the trades.",
          answer: false,
          why: "It is trivial: the system already knows both sides of every trade.",
          cite: TRIVIAL,
        },
        {
          kind: "recap",
          points: [
            { text: "A **clearing agent** matches the buyer's and seller's records.", cite: CLEARING_AGENT },
            { text: "A trade **clears** when both name each other on identical terms.", cite: CLEARS },
            { text: "Mismatches are **DKs** (securities) or **out-trades** (futures).", cite: DK },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.2-agents",
      sec: "3.2.2.2",
      title: "Settlement agents",
      pages: "36",
      steps: [
        {
          kind: "definition",
          term: "Settlement agents",
          body: "Collect **cash from buyers** and **securities from sellers**. Once both have performed, they give the cash to the seller and the securities to the buyer.",
          cite: SETTLE_AGENTS,
        },
        {
          kind: "see",
          title: "Settlement, step by step",
          illus: SettlementAgent,
          beats: [
            { text: "The buyer delivers **cash** and the seller delivers **securities** to the settlement agent." },
            { text: "The agent holds both until **both sides have performed**. Neither side can walk away with the other's asset.", cite: SETTLE_AGENTS },
            { text: "Then it gives the **cash to the seller** and the **securities to the buyer**, together." },
          ],
        },
        {
          kind: "idea",
          title: "Why use a settlement agent?",
          body: "Agents are **efficient** at settling, and they protect you from losses when your counterpart is **untrustworthy or uncreditworthy**.",
          cite: WHY_SETTLE,
        },
        {
          kind: "choice",
          q: "When does the settlement agent give the cash to the seller?",
          options: ["When both sides have performed", "As soon as the buyer pays", "Before the trade is cleared", "Only at the end of the month"],
          answer: 0,
          why: "The agent waits until it holds both the cash and the securities, then swaps them.",
          cite: SETTLE_AGENTS,
        },
        {
          kind: "truefalse",
          q: "In real estate markets, settlement agents are called escrow agents.",
          answer: true,
          why: "Same job, different name: an escrow agent holds both sides until the deal closes.",
          cite: ESCROW,
        },
        {
          kind: "order",
          q: "Put the life of a trade in order.",
          items: ["Buyer and seller arrange the trade", "The clearing agent matches their records", "Cash and securities go to the settlement agent", "The agent gives the cash to the seller and the securities to the buyer"],
          why: "Trades are cleared first, then settled.",
          cite: CLEARED_THEN,
        },
        {
          kind: "choice",
          q: "Which organization is the largest U.S. securities settlement agency?",
          options: ["The NSCC", "The SEC", "The NYSE", "The CFTC"],
          answer: 0,
          why: "Clearing and settlement are closely related, so the largest clearing agency, the NSCC, is also the largest settlement agency.",
          cite: NSCC_SETTLE,
        },
        {
          kind: "match",
          q: "Match each agent to its job.",
          pairs: [
            ["Clearing agent", "Matches the two records"],
            ["Settlement agent", "Swaps cash and securities"],
            ["Escrow agent", "Settles real estate deals"],
          ],
          cite: ESCROW,
        },
        {
          kind: "recap",
          points: [
            { text: "**Settlement agents** take cash from buyers and securities from sellers, then swap them.", cite: SETTLE_AGENTS },
            { text: "They are efficient and protect against **uncreditworthy** counterparts.", cite: WHY_SETTLE },
            { text: "In real estate they are **escrow agents**; in U.S. securities the largest is the **NSCC**.", cite: NSCC_SETTLE },
          ],
        },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.2-netting",
      sec: "3.2.2.2",
      title: "Net settlement",
      pages: "36",
      steps: [
        {
          kind: "definition",
          term: "Net settlement",
          body: "For each client, the agent nets all buys and sells of a security into **one net security position**.",
          cite: NET1,
        },
        {
          kind: "idea",
          title: "Money nets too",
          body: "All money owed and due becomes **one net money position**. The agent settles **only the net** positions.",
          cite: NET_MONEY,
        },
        {
          kind: "see",
          title: "Three trades, two transfers",
          illus: NetSettlement,
          beats: [
            { text: "A client made three trades in XYZ today (our numbers). Settled one by one, that's **6 transfers**." },
            { text: "Net the shares: +500 − 200 + 100 = **+400** XYZ, a single security position.", cite: NET1 },
            { text: "Net the money: −$10,000 + $4,200 − $2,050 = **−$7,850**, a single money position.", cite: NET_MONEY },
            { text: "The agent settles only the net: **2 transfers** instead of 6.", cite: NET2 },
          ],
        },
        {
          kind: "number",
          q: "Today a client buys 300 shares of a stock, sells 500, then buys 100 more. What is its net security position? (Negative = net seller.)",
          answer: -100,
          unit: "shares",
          illustrative: true,
          why: "+300 − 500 + 100 = −100: the client delivers 100 shares in a single transfer.",
          cite: NET1,
        },
        {
          kind: "number",
          q: "The same client paid $6,000, received $10,500, then paid $2,000. What is its net money position?",
          answer: 2500,
          prefix: "$",
          illustrative: true,
          why: "−6,000 + 10,500 − 2,000 = +$2,500: the client receives one payment.",
          cite: NET_MONEY,
        },
        {
          kind: "idea",
          title: "One agent for everyone",
          body: "Netting works best when **all traders use the same settlement agent**: more of their buys and sells can offset each other.",
          cite: NET3,
        },
        {
          kind: "truefalse",
          q: "Netting increases the number of transactions needed to settle trades.",
          answer: false,
          why: "Netting vastly reduces it: only the net positions are settled.",
          cite: NET2,
        },
        {
          kind: "number",
          q: "A client makes 4 trades in one stock today. Without netting, each trade needs one delivery and one payment. How many transfers does net settlement need?",
          answer: 2,
          unit: "transfers",
          illustrative: true,
          why: "One net security position and one net money position: 2 transfers instead of 8.",
          cite: NET_MONEY,
        },
        {
          kind: "fill",
          q: "Net settlement works best when all traders use the ___ settlement agent.",
          bank: ["same", "cheapest", "nearest", "fastest"],
          answer: ["same"],
          why: "With one agent, every client's trades can be netted against each other.",
          cite: NET3,
        },
        {
          kind: "recap",
          points: [
            { text: "Buys and sells in a security net to **one security position** per client.", cite: NET1 },
            { text: "Money nets to **one money position**; only net positions settle.", cite: NET_MONEY },
            { text: "Netting **vastly reduces** transactions, best with **one agent** for all.", cite: NET2 },
          ],
        },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.2-timing",
      sec: "3.2.2.2",
      title: "T+3 and cash settlement",
      pages: "36",
      steps: [
        {
          kind: "definition",
          term: "Normal-way settlement",
          aka: ["T+3 settlement"],
          body: "In U.S. securities markets (in the book), trades settle **three business days** after they are arranged.",
          cite: T3,
        },
        {
          kind: "definition",
          term: "Cash settlement",
          body: "The most common **special** settlement instruction: the trade settles **on the day of the trade**.",
          cite: CASH,
        },
        {
          kind: "see",
          title: "When does a trade settle?",
          illus: SettleTimeline,
          beats: [
            { text: "Day **T**: buyer and seller agree on the trade." },
            { text: "Normal-way settlement comes **three business days** later: **T+3**.", cite: T3 },
            { text: "With **cash settlement**, the trade settles the same day.", cite: CASH },
            { text: "The industry was speeding up: **T+5** until June 1995, **T+3** when the book was written, and **T+1** planned from June 2005.", cite: T5_HIST },
          ],
        },
        {
          kind: "choice",
          q: "A U.S. stock trade is arranged on a Monday, with no holidays that week. Under the book's normal-way settlement, it settles on…",
          options: ["Thursday", "Monday", "Tuesday", "Wednesday"],
          answer: 0,
          why: "T+3: three business days after Monday is Thursday. Monday would be cash settlement.",
          cite: T3,
        },
        { kind: "quote", lead: "Why the wait is risky:", cite: T5_RISK, mark: ["prices can change substantially"] },
        {
          kind: "choice",
          q: "Why do brokers and regulators want trades to settle as quickly as possible?",
          options: ["To minimize traders' exposure to credit risk", "To raise commissions", "To reduce taxes", "To make clearing unnecessary"],
          answer: 0,
          why: "The longer the gap, the more prices can move, and the side hurt by the move may fail to settle.",
          cite: T5_WHY,
        },
        {
          kind: "truefalse",
          q: "According to the box, T+1 settlement would require most traders to deposit money and certificates with their brokers before they trade.",
          answer: true,
          why: "With only one day to settle, the money and certificates must already be in place.",
          cite: T1_REQ,
        },
        {
          kind: "fill",
          q: "Until June 1995, U.S. stocks and bonds settled on ___; when the book was written they settled on ___.",
          bank: ["T+5", "T+3", "T+1", "T+10"],
          answer: ["T+5", "T+3"],
          why: "The box traces settlement getting faster: T+5, then T+3, with T+1 planned.",
          cite: T5_HIST,
        },
        {
          kind: "choice",
          q: "What did the industry plan to move to from June 2005?",
          options: ["T+1", "T+2", "T+0", "T+5"],
          answer: 0,
          why: "The box says the industry intended to settle on T+1 from June 2005 (see the next screen for what actually happened).",
          cite: T1_PLAN,
        },
        {
          kind: "today",
          title: "U.S. settlement is now T+1",
          body: "The 2005 plan slipped. The U.S. moved from T+3 to **T+2** on 5 September 2017, and to **T+1** on 28 May 2024.",
          source: "SEC amendments to Rule 15c6-1 (2017 and 2023)",
        },
        {
          kind: "recap",
          points: [
            { text: "**Normal-way** settlement in the book: **T+3**, three business days.", cite: T3 },
            { text: "**Cash settlement** happens on the day of the trade.", cite: CASH },
            { text: "Faster settlement means less **credit risk** from price moves.", cite: T5_WHY },
          ],
        },
      ],
    },

    // ── Lesson 7 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.3-clearinghouses",
      sec: "3.2.2.3",
      title: "Clearinghouses: the guarantee",
      pages: "36",
      steps: [
        {
          kind: "definition",
          term: "Clearinghouses",
          body: "Clear and settle all trades in many **futures, options and swaps** markets, and usually **guarantee** that both sides will perform.",
          cite: CH1,
        },
        {
          kind: "idea",
          title: "Buyer to every seller, seller to every buyer",
          body: "The clearinghouse steps into every trade, so it becomes the **issuer and guarantor** of the contracts.",
          cite: CH2,
        },
        {
          kind: "see",
          title: "The clearinghouse steps in",
          illus: ClearinghouseHub,
          beats: [
            { text: "Without a clearinghouse, a buyer and a seller hold **one contract** with each other, and each must trust the other." },
            { text: "The clearinghouse becomes the **seller to the buyer** and the **buyer to the seller**.", cite: CH2 },
            { text: "Every trader now faces the same counterparty. Futures traders only need to ask whether the **clearinghouse** is creditworthy.", cite: FUT_CREDIT },
            { text: "If a trader fails, its **clearing member** must settle. If a clearing member fails, the clearinghouse can **tax the other members**.", cite: CH_GUAR },
          ],
        },
        {
          kind: "truefalse",
          q: "Once a clearinghouse is involved, each trader's counterparty is the clearinghouse.",
          answer: true,
          why: "It acts as buyer for every seller and seller for every buyer.",
          cite: CH2,
        },
        {
          kind: "definition",
          term: "Clearing members",
          body: "The firms that generally **own** the clearinghouse and are **jointly responsible** for settling all trades.",
          cite: CH_MEMBERS,
        },
        { kind: "quote", lead: "Why the book compares it to insurance:", cite: CH_INSURANCE, mark: ["mutual insurance company"] },
        {
          kind: "order",
          q: "A trade fails to settle. Who has to make it good, in order?",
          items: ["The trader who made the trade", "The trader's clearing member", "The clearinghouse, by taxing its other members"],
          why: "Non-members need a clearing member to guarantee their trades; if a member fails, the other members pay.",
          cite: CH_GUAR,
        },
        {
          kind: "definition",
          term: "Margins",
          body: "**Collateral** that clearing members post with the clearinghouse to secure their obligations.",
          cite: CH_MARGINS,
        },
        {
          kind: "multi",
          q: "How do clearinghouses control the risk their members pose? (Select all that apply.)",
          options: ["Members post collateral called margins", "Members report their financial condition and trading", "Members stay within position limits", "Members promise their clients profits"],
          answer: [0, 1, 2],
          why: "Margins, timely information and position limits are the three controls the book lists.",
          cite: CH_CONTROL,
        },
        {
          kind: "choice",
          q: "Why are clearinghouses the issuers and guarantors of their contracts?",
          options: ["They act as buyer for every seller and seller for every buyer", "They print the contracts", "Regulators appoint them as issuers", "They own the underlying commodity"],
          answer: 0,
          why: "By taking the other side of every trade, the clearinghouse becomes the issuer and guarantor.",
          cite: CH2,
        },
        {
          kind: "recap",
          points: [
            { text: "A **clearinghouse** is buyer to every seller and seller to every buyer.", cite: CH2 },
            { text: "**Clearing members** own it and are jointly responsible, like **mutual insurance**.", cite: CH_INSURANCE },
            { text: "It controls risk with **margins**, information and **position limits**.", cite: CH_CONTROL },
          ],
        },
      ],
    },

    // ── Lesson 8 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.3-variation-margin",
      sec: "3.2.2.3",
      title: "Variation margin, day by day",
      pages: "36–37, 42",
      steps: [
        {
          kind: "definition",
          term: "Variation margin",
          body: "After **every trading day**, that day's profits move **from losers to winners** through the clearinghouse.",
          cite: VM_DAILY,
        },
        {
          kind: "see",
          title: "Brad, Sharon and a silver contract",
          illus: VariationMargin,
          beats: [
            { text: "Brad buys a 5,000-ounce **silver futures** contract from Sharon at **$4.50** an ounce. The NYMEX Clearing House guarantees both sides.", cite: SILVER1 },
            { text: "Next day silver rises **5 cents**. On paper Brad, who is long, is up $250 and Sharon, who is short, is down $250." },
            { text: "Sharon pays the Clearing House **$250** and, **simultaneously**, the Clearing House pays Brad **$250**.", cite: SILVER_SIM },
            { text: "If silver is still $4.55 at expiry, Brad pays **$4.55** an ounce and Sharon receives $4.55.", cite: SILVER_END },
            { text: "Count the margin: each ends up at **$4.50**, the price they agreed. (Our arithmetic.)" },
          ],
        },
        {
          kind: "number",
          q: "Silver rises 5 cents on Brad's 5,000-ounce contract. How much variation margin does Sharon pay?",
          answer: 250,
          prefix: "$",
          why: "5,000 ounces × $0.05 = $250, exactly as in the book's example.",
          cite: SILVER_PAY,
        },
        {
          kind: "choice",
          q: "After silver rises 5 cents, who pays variation margin?",
          options: ["Sharon, the seller, pays; Brad receives", "Brad, the buyer, pays; Sharon receives", "Both pay the Clearing House", "Nobody pays until the contract expires"],
          answer: 0,
          why: "The price moved against the short, so the day's loss flows from Sharon to Brad through the Clearing House.",
          cite: SILVER_PAY,
        },
        {
          kind: "truefalse",
          q: "Sharon's payment to the Clearing House and its payment to Brad happen at the same time.",
          answer: true,
          why: "The book says “simultaneously”.",
          cite: SILVER_SIM,
        },
        {
          kind: "number",
          q: "The next day silver falls 3 cents, from $4.55 to $4.52. How much variation margin does Brad pay on 5,000 ounces?",
          answer: 150,
          prefix: "$",
          illustrative: true,
          why: "Now the price moves against the long: 5,000 × $0.03 = $150 flows from Brad to Sharon.",
          cite: VM_DAILY,
        },
        {
          kind: "choice",
          q: "Why do futures markets settle variation margin every day?",
          options: ["So the incentive to default doesn't grow as prices move against a losing position", "To raise the exchange's fees", "Because contracts expire every day", "So no clearinghouse is needed"],
          answer: 0,
          why: "Losses are paid as they happen, so nobody sits on a large unpaid loss.",
          cite: VM_WHY,
        },
        {
          kind: "definition",
          term: "Technically bankrupt",
          body: "A trader who no longer has **enough wealth to settle** his trades.",
          cite: BANKRUPT,
        },
        {
          kind: "definition",
          term: "Brazilian straddle",
          body: "A huge position taken by a technically bankrupt trader, with a **one-way ticket to Brazil** in the pocket: win and stay, lose and leave the loss to the clearing member.",
          cite: STRADDLE,
        },
        {
          kind: "choice",
          q: "Why might a technically bankrupt trader massively increase his positions?",
          options: ["He has nothing to lose: if the bet fails, his guarantor bears the loss", "Regulators require it", "It lowers his margin", "Larger positions settle faster"],
          answer: 0,
          why: "He can't pay his losses anyway, so the upside is his and the downside is someone else's.",
          cite: NOTHING_TO_LOSE,
        },
        {
          kind: "truefalse",
          q: "To prevent Brazilian straddles, clearing members can demand margin payments during the day when prices move sharply against a customer.",
          answer: true,
          why: "Along with frequent position reports and banning customers who can't settle.",
          cite: STRADDLE_STOP,
        },
        {
          kind: "recap",
          points: [
            { text: "**Variation margin** moves each day's profits from losers to winners.", cite: VM_DAILY },
            { text: "Sharon pays $250 and Brad receives $250 **simultaneously**.", cite: SILVER_SIM },
            { text: "Daily margin and monitoring stop the **Brazilian straddle**.", cite: STRADDLE_STOP },
          ],
        },
      ],
    },

    // ── Lesson 9 ──────────────────────────────────────────────────────────
    {
      id: "3.2.2.4-depositories",
      sec: "3.2.2.4",
      title: "Depositories and custodians",
      pages: "38",
      steps: [
        {
          kind: "definition",
          term: "Depositories and custodians",
          body: "**Hold cash and securities** for their clients, and **deliver** them quickly to settlement agents when properly instructed.",
          cite: DEPO2,
        },
        {
          kind: "definition",
          term: "Depository Trust Company (DTC)",
          body: "The **largest depository in the world**, holding nearly **$20 trillion** for its participants and their clients (the book's figure).",
          cite: DTC,
        },
        {
          kind: "see",
          title: "Where the shares sit",
          illus: Depository,
          beats: [
            { text: "The **DTCC** has two major subsidiaries: the **DTC**, a depository, and the **NSCC**, which clears and settles.", cite: DTCC },
            { text: "The DTC holds cash and securities for its participants and their clients.", cite: DEPO1 },
            { text: "When **properly instructed**, it delivers securities and cash to the settlement agent.", cite: DEPO2 },
            { text: "When the whole clearing and settlement process is automated, traders get **straight-through processing**.", cite: STP },
          ],
        },
        {
          kind: "choice",
          q: "What do depositories and custodians do?",
          options: ["Hold cash and securities for clients and deliver them to settlement agents", "Match buyer and seller records", "Act as buyer to every seller", "Set listing standards"],
          answer: 0,
          why: "Matching records is clearing; acting as buyer to every seller is a clearinghouse.",
          cite: DEPO2,
        },
        {
          kind: "truefalse",
          q: "The DTC is a subsidiary of the NSCC.",
          answer: false,
          why: "Both are subsidiaries of the DTCC.",
          cite: DTCC,
        },
        {
          kind: "match",
          q: "Match each organization to its role.",
          pairs: [
            ["DTC", "Largest depository"],
            ["NSCC", "Clears and settles"],
            ["DTCC", "Parent of both"],
          ],
          cite: DTCC,
        },
        {
          kind: "definition",
          term: "Straight-through processing (STP)",
          body: "A trading system that **fully automates** clearing and settlement for its clients.",
          cite: STP,
        },
        {
          kind: "choice",
          q: "Why do traders like straight-through processing?",
          options: ["It is cheap and minimizes the potential for errors", "It guarantees a profit", "It avoids regulation", "It delays settlement"],
          answer: 0,
          why: "No hand-offs means lower cost and fewer mistakes.",
          cite: STP_WHY,
        },
        {
          kind: "recap",
          points: [
            { text: "**Depositories and custodians** hold assets and deliver them for settlement.", cite: DEPO2 },
            { text: "The **DTC** (depository) and **NSCC** (clearing) both belong to the **DTCC**.", cite: DTCC },
            { text: "**STP** automates clearing and settlement: cheap, fewer errors.", cite: STP_WHY },
          ],
        },
      ],
    },

    // ── Lesson 10 ─────────────────────────────────────────────────────────
    {
      id: "3.2.2-typical-trade",
      sec: "3.2.2",
      title: "One trade, start to finish",
      pages: "37",
      steps: [
        {
          kind: "idea",
          title: "One purchase, many institutions",
          body: "The book follows a **state pension fund** buying 30,000 shares of Cisco. It starts with the fund's **custodian bank** and its **investment adviser**.",
          cite: TYP_FUND,
        },
        {
          kind: "see",
          title: "The Cisco trade, step by step",
          illus: TradeLifecycle,
          beats: [
            { text: "The pension fund deposits its money at its **custodian bank**.", cite: TYP_FUND },
            { text: "It tells its **investment adviser** the money is ready. The portfolio manager decides to buy **30,000 Cisco** shares.", cite: TYP_DECIDE },
            { text: "The manager instructs the firm's **buy-side trader**, who sends an order to the fund's **broker**.", cite: TYP_ORDER },
            { text: "The broker calls a **dealer**, who sells the shares to the fund **out of its inventory**.", cite: TYP_DEALER },
            { text: "The dealer and the broker **both** report the trade to the **NSCC**. The broker also confirms it to the fund and the adviser.", cite: TYP_REPORT },
            { text: "Three days later the NSCC settles: the custodian sends the money to the fund's account at the **DTC**.", cite: TYP_DTC },
            { text: "The DTC pays on the fund's behalf and, in the same settlement, **receives the 30,000 shares** for it.", cite: TYP_SHARES },
          ],
        },
        {
          kind: "order",
          q: "Put the Cisco trade in order.",
          items: [
            "The fund deposits money at its custodian bank",
            "The portfolio manager decides to buy 30,000 Cisco",
            "The buy-side trader sends the order to the broker",
            "The broker arranges the trade with a dealer",
            "The NSCC settles the trade three days later",
          ],
          why: "Money, decision, order, trade, settlement: the sequence in the book's box.",
          cite: TYP_SETTLE,
        },
        {
          kind: "choice",
          q: "Who sells the Cisco shares to the pension fund?",
          options: ["A dealer, out of its inventory", "The broker, from its own account", "The DTC", "Another pension fund, directly"],
          answer: 0,
          why: "The broker only arranges the trade; the dealer sells from inventory.",
          cite: TYP_DEALER,
        },
        {
          kind: "multi",
          q: "Who reports the trade to the NSCC?",
          options: ["The dealer", "The broker", "The custodian bank", "The beneficiaries"],
          answer: [0, 1],
          why: "Both sides of the trade report it, so the NSCC can match the records.",
          cite: TYP_REPORT,
        },
        {
          kind: "choice",
          q: "At settlement, where does the custodian bank send the money?",
          options: ["To the pension fund's account at the DTC", "Directly to the dealer", "To the broker", "To the SEC"],
          answer: 0,
          why: "The DTC then uses it to settle on the fund's behalf.",
          cite: TYP_DTC,
        },
        {
          kind: "number",
          q: "How many days after the trade does the NSCC settle it in the book's example?",
          answer: 3,
          unit: "days",
          why: "Three days later: normal-way T+3 settlement.",
          cite: TYP_SETTLE,
        },
        {
          kind: "classify",
          q: "Buy side, sell side, or trade facilitator?",
          buckets: ["Buy side", "Sell side", "Facilitator"],
          items: [
            { text: "The pension fund", bucket: 0 },
            { text: "The investment adviser", bucket: 0 },
            { text: "The broker", bucket: 1 },
            { text: "The dealer", bucket: 1 },
            { text: "The NSCC", bucket: 2 },
            { text: "The DTC", bucket: 2 },
            { text: "The buy-side trader", bucket: 0 },
            { text: "The custodian bank", bucket: 2, why: "Custodians are among the trade facilitators of §3.2." },
          ],
          cite: FACILITATORS,
        },
        {
          kind: "truefalse",
          q: "The broker reports the trade to the pension fund and to the investment adviser.",
          answer: true,
          why: "Besides reporting to the NSCC, the broker confirms the trade to its clients.",
          cite: TYP_CONFIRM,
        },
        {
          kind: "recap",
          points: [
            { text: "Fund → adviser → buy-side trader → broker → **dealer**.", cite: TYP_ORDER },
            { text: "Dealer and broker **both report** to the **NSCC**.", cite: TYP_REPORT },
            { text: "At settlement the **DTC** pays and receives the shares for the fund.", cite: TYP_SHARES },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "Which organization matches buyers' and sellers' records so trades can be settled?",
      options: ["A clearing agent", "A depository", "An investment sponsor", "A wirehouse"],
      answer: 0,
      why: "Clearing agents match the two records and confirm the terms.",
      cite: CLEARING_AGENT,
    },
    {
      kind: "truefalse",
      q: "Futures traders mostly worry about whether the clearinghouse is creditworthy, not their counterparts.",
      answer: true,
      why: "The clearinghouse guarantees every contract, so it is the only credit that matters.",
      cite: FUT_CREDIT,
    },
    {
      kind: "fill",
      q: "Under net settlement, the agent settles only the ___ positions.",
      bank: ["net", "gross", "largest", "oldest"],
      answer: ["net"],
      why: "Buys and sells, credits and debits, are netted first.",
      cite: NET_MONEY,
    },
  ],
};
