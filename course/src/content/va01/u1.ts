// Valuation, Chapter 1: Why Value Value? (PDF pp. 50–64). A reading chapter: the key passages, one per screen.
import type { Cite, Unit } from "../types.ts";

const c = (p: number | string, s: string, t: string): Cite => ({ p, s, t });

// The book names its sections; "1" is the chapter's opening pages.
const OPEN = "1";
const MEAN = "What Does It Mean to Create Shareholder Value?";
const SHORT = "Short-Termism Runs Deep";
const CANNOT = "Shareholder Capitalism Cannot Solve Every Challenge";
const STAKE = "Can Stakeholder Interests Be Reconciled?";
const FORGET = "Consequences of Forgetting Value-Creation Principles";
const BOOK = "This Book";

// ── Excerpts ────────────────────────────────────────────────────────────────
const PRINCIPLE = c(50, OPEN, "The guiding principle of business value creation is a refreshingly simple construct: companies that grow and earn a return on capital that exceeds their cost of capital create value.");
const VICTIM = c(51, OPEN, "Managers too often fall victim to short-termism, adopting a focus on meeting short-term performance metrics rather than creating value over the long term.");
const OBJECTIVE = c(52, MEAN, "For value-minded executives, creating value cannot be limited to simply maximizing today's share price. Rather, the evidence points to a better objective: maximizing a company's collective value to its shareholders, now and in the future.");
const PUMP = c(52, MEAN, "Since investors don't have complete information, companies can easily pump up their share price in the short term or even longer.");
const SHORTCHANGE = c(53, MEAN, "unaware that the company was shortchanging its investment in product development and brand building to inflate short-term profits, even as revenue growth declined.");
const REBUILD = c(53, MEAN, "Not surprisingly, the company went through a painful period of rebuilding. Its stock price took years to recover");
const OMNISCIENT = c(53, MEAN, "Markets do a great job with public information, but markets are not omniscient. Markets cannot price information they don't have.");
const LONG_TSR = c(53, MEAN, "companies whose focus was more on the long term generated superior TSR, with a 50 percent greater likelihood of being in the top decile or top quartile");
const BANKS_TSR = c(53, MEAN, "Banks that had the insight and courage to forgo short-term profits during the last decade's real-estate bubble, for example, earned much better total shareholder returns (TSR) over the longer term.");
const ORGANIC = c(53, MEAN, "long-term revenue growth—particularly organic revenue growth—is the most important driver of shareholder returns for companies with high returns on capital.");

const EPS = c(54, SHORT, "too many managers continue to plan and execute strategy—and then report their performance—against shorter-term measures, particularly earnings per share (EPS).");
const CFO_RULE = c(54, SHORT, "every business unit is expected to increase its profits faster than its revenues, every year.");
const FORGO = c(54, SHORT, "for units to meet that performance bar right now, they are forgoing growth opportunities that have 25 percent profit margins in the years to come.");
const CFOS = c(54, SHORT, "fully 80 percent of the CFOs said they would reduce discretionary spending on potentially value-creating activities such as marketing and R&D in order to meet their short-term earnings targets.");
const DILUTE = c(54, SHORT, "The most frequent question managers ask is whether the transaction will dilute EPS over the first year or two.");
const EQUALLY = c(55, SHORT, "Deals that strengthen EPS and deals that dilute EPS are equally likely to create or destroy value.");
const LONG_INVESTORS = c(55, SHORT, "longer-term investors are the ones who align market prices with intrinsic value.");
const SOURCE = c(55, SHORT, "we often find that executives themselves or their boards are the source of short-termism.");
const SURVEY = c(55, SHORT, "most cited their own executive teams and boards (rather than investors, analysts, and others outside the company) as the greatest sources of pressure for short-term performance.");
const EVERYONE = c(55, SHORT, "Apparently, everyone knows that a transaction's short-term impact on EPS doesn't matter. Yet they all pay attention to it.");
const VICIOUS = c("55-56", SHORT, "any short-term efforts to massage earnings that undercut productive investment make achieving long-term growth even more difficult, spawning a vicious circle.");
const PROTECT = c(56, SHORT, "above all, to protect managers when they choose to build long-term value at the expense of short-term profits.");

const NEITHER = c(57, CANNOT, "Managers struggle to make many trade-offs for which neither a shareholder nor a stakeholder approach offers a clear path forward.");
const EXTERNAL = c(57, CANNOT, "These so-called externalities can be extremely challenging for corporate decision making, because there is no objective basis for making trade-offs among parties.");
const BONDHOLDERS = c(57, CANNOT, "not only would the company's shareholders lose their entire investment, but so would its bondholders, who are often pension funds.");
const GOVERNMENTS = c(58, CANNOT, "Trading off different economic interests and time horizons is precisely what people charge their governments to do.");
const IGNORE = c(59, STAKE, "You can't create long-term value by ignoring the needs of your customers, suppliers, and employees.");
const PRIORITIZE = c(60, STAKE, "we'd encourage leaders, when trade-offs must be made, to prioritize long-term value creation, given the advantages it holds for resource allocation and economic health.");
const WAGES = c(60, STAKE, "If the company earns more than its cost of capital, it might afford to pay above-market wages and still prosper; treating employees well can be good business.");
const TURING = c(61, STAKE, "raised the price per pill by more than 5,000 percent. The tactic prompted outrage and a wave of government investigations.");
const JOBS = c(61, STAKE, "it's also true that value-creating companies create more jobs.");

const LOST_ROIC = c(62, FORGET, "During the Internet bubble, managers and investors lost sight of what drives return on invested capital (ROIC); indeed, many forgot the importance of this ratio entirely.");
const BIG_FAST = c(62, FORGET, "The notion of \"winner take all\" led companies and investors to believe that all that mattered was getting big fast, on the assumption that they could wait until later to worry about creating an effective business model.");
const LAWS = c(63, FORGET, "When the laws of economics prevailed, as they always do, it was clear that many Internet businesses did not have the unassailable competitive advantages required to earn even modest returns on invested capital.");
const OBSOLETE = c(63, FORGET, "The Internet has revolutionized the economy, as have other innovations, but it did not and could not render obsolete the rules of economics, competition, and value creation.");
const TEASER = c(63, FORGET, "Banks lent money to individuals and speculators at low teaser rates on the assumption that housing prices would only increase.");
const PACKAGED = c(63, FORGET, "Banks packaged these high-risk debts into long-term securities and sold them to investors who used short-term debt to finance the purchase, thus creating a long-term risk for whoever lent them the money.");
const CRASH = c(63, FORGET, "When the home buyers could no longer afford the payments, the real estate market crashed, pushing the values of many homes below the values of the loans taken out to buy them.");

const FASTER = c(63, BOOK, "The faster companies can increase their revenues and deploy more capital at attractive rates of return, the more value they create.");
const DRIVES = c(63, BOOK, "The combination of growth and return on invested capital (ROIC), relative to its cost, is what drives cash flow and value.");
const ANYTHING = c(63, BOOK, "Anything that doesn't increase ROIC or growth at an attractive ROIC doesn't create value.");
const TIMING = c(63, BOOK, "steps that change the ownership of claims to cash flows, and accounting techniques that may change the timing of profits without actually changing cash flows.");
const ADVANTAGE = c(64, BOOK, "Only if companies have a well-defined competitive advantage can they sustain strong growth and high returns on invested capital.");
const ERODE = c(64, BOOK, "Competition tends to erode competitive advantages and, with them, returns on invested capital.");
const CONSENSUS = c(64, BOOK, "Creating value is not the same as, for example, meeting the analysts' consensus earnings forecast for the next quarter.");
const INVESTORS = c(64, BOOK, "this knowledge will enable investors to calculate the risks and returns of their investments with greater confidence.");
const NO_FREE = c(64, BOOK, "It means accepting that there are no free lunches.");

export const U1: Unit = {
  sec: "1",
  title: "Why Value Value?",
  pages: "50–64",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "v1-principle",
      sec: MEAN,
      title: "The guiding principle",
      pages: "50–53",
      imp: 3,
      steps: [
        { kind: "quote", lead: "The whole book in one sentence.", cite: PRINCIPLE, mark: ["grow", "return on capital", "cost of capital create value"] },
        {
          kind: "definition",
          term: "Short-termism",
          body: "Managing to hit **short-term performance metrics**, like this quarter's earnings, instead of creating **value over the long term**.",
          cite: VICTIM,
        },
        { kind: "quote", lead: "So the goal is not today's share price.", cite: OBJECTIVE, mark: ["share price", "now and in the future"] },
        { kind: "quote", lead: "Why the share price can be pushed around:", cite: PUMP, mark: ["pump up their share price"] },
        {
          kind: "quote",
          lead: "Example: a consumer-goods company grew **EPS 11–16% a year for seven years**. Investors pushed its shares above its peers',",
          cite: SHORTCHANGE,
          mark: ["shortchanging its investment"],
        },
        { kind: "quote", lead: "Markets aren't fooled for ever. They just can't see inside.", cite: OMNISCIENT, mark: ["not omniscient"] },
        {
          kind: "definition",
          term: "Total shareholder return (TSR)",
          body: "What owning the share actually earned: **dividends plus the change in the share price**.",
          cite: BANKS_TSR,
        },
        { kind: "quote", lead: "The evidence for the long view:", cite: LONG_TSR, mark: ["superior TSR"] },
        { kind: "quote", lead: "And the strongest driver of returns:", cite: ORGANIC, mark: ["organic revenue growth"] },
        {
          kind: "choice",
          q: "By the book's guiding principle, which companies **create value**?",
          options: [
            "Those that grow and earn a return on capital above their cost of capital",
            "Those whose earnings per share grow fastest",
            "Those with the highest share price today",
            "Those that grow revenue, whatever the return",
          ],
          answer: 0,
          why: "Growth **and** a return on capital above the cost of capital. Growth alone, EPS or today's price are not the test.",
          cite: PRINCIPLE,
        },
        {
          kind: "truefalse",
          q: "Maximizing today's share price is the same as maximizing a company's value to its shareholders.",
          answer: false,
          why: "Investors don't have complete information, so a company can **pump up its share price** for a while. The goal is value **now and in the future**.",
          cite: PUMP,
        },
        {
          kind: "choice",
          q: "The company that grew EPS 11–16% a year by starving product development and brands: what happened next?",
          options: ["Years of rebuilding; its stock took years to recover", "Its value kept rising with its EPS", "Nothing: the market never found out", "It was bought at a premium"],
          answer: 0,
          why: "Managers had to admit it, the company went through a painful rebuilding, and its stock took years to recover.",
          cite: REBUILD,
        },
        {
          kind: "recap",
          points: [
            { text: "Value comes from **growth** plus a **return on capital above the cost of capital**.", cite: PRINCIPLE },
            { text: "The goal is value **now and in the future**, not today's share price.", cite: OBJECTIVE },
            { text: "Markets can't price what they can't see: short-term **EPS** can hide a weakening business.", cite: OMNISCIENT },
          ],
        },
      ],
    },
    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "v1-short-termism",
      sec: SHORT,
      title: "EPS is not value",
      pages: "54–56",
      imp: 3,
      steps: [
        {
          kind: "definition",
          term: "Earnings per share (EPS)",
          body: "**Net profit divided by the number of shares**. The short-term number many managers still plan and report against.",
          cite: EPS,
        },
        { kind: "quote", lead: "A real rule set by the CFO of a very large company:", cite: CFO_RULE, mark: ["profits faster than its revenues"] },
        { kind: "quote", lead: "Some of its units already earn margins above 30%. The price of the rule:", cite: FORGO, mark: ["forgoing growth opportunities"] },
        { kind: "quote", lead: "Not an isolated case. In a survey of 400 CFOs,", cite: CFOS, mark: ["80 percent"] },
        {
          kind: "definition",
          term: "EPS dilution",
          body: "A deal **dilutes EPS** when the buyer's earnings per share fall because of it. It's the first thing most managers check.",
          cite: DILUTE,
        },
        { kind: "quote", lead: "What the evidence says about that check:", cite: EQUALLY, mark: ["equally likely"] },
        { kind: "quote", lead: "Who really sets prices?", cite: LONG_INVESTORS, mark: ["intrinsic value"] },
        { kind: "quote", lead: "And who pushes for the short term? Not who you'd think.", cite: SOURCE, mark: ["executives themselves or their boards"] },
        { kind: "quote", lead: "The absurd part:", cite: EVERYONE },
        { kind: "quote", lead: "Where it leads:", cite: VICIOUS, mark: ["vicious circle"] },
        { kind: "quote", lead: "The board's job, above all:", cite: PROTECT, mark: ["protect managers"] },
        {
          kind: "truefalse",
          q: "A deal that **raises** EPS in its first year is more likely to create value than one that **dilutes** EPS.",
          answer: false,
          why: "There is no evidence linking higher EPS to the value a deal creates: both kinds are **equally likely** to create or destroy value.",
          cite: EQUALLY,
        },
        {
          kind: "choice",
          q: "What did 80% of surveyed CFOs say they would cut to hit short-term earnings targets?",
          options: ["Discretionary spending such as marketing and R&D", "Dividends", "Their own pay", "Debt"],
          answer: 0,
          why: "Marketing and R&D: spending that can **create value** later, cut to make this quarter's number.",
          cite: CFOS,
        },
        {
          kind: "choice",
          q: "In a survey of over 1,000 executives and board members, who did most name as the **greatest source** of short-term pressure?",
          options: ["Their own executive teams and boards", "Activist shareholders", "Wall Street analysts", "Short-term traders"],
          answer: 0,
          why: "Most cited **their own executive teams and boards**, not investors or analysts.",
          cite: SURVEY,
        },
        {
          kind: "recap",
          points: [
            { text: "**EPS** is a short-term yardstick; it doesn't measure value.", cite: EPS },
            { text: "Deals that lift or dilute EPS are **equally likely** to create or destroy value.", cite: EQUALLY },
            { text: "Massaging earnings starves investment: a **vicious circle**.", cite: VICIOUS },
          ],
        },
      ],
    },
    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "v1-stakeholders",
      sec: STAKE,
      title: "Shareholders and stakeholders",
      pages: "57–61",
      imp: 1,
      steps: [
        { kind: "quote", lead: "Curing short-termism wouldn't fix everything.", cite: NEITHER },
        {
          kind: "definition",
          term: "Externalities",
          body: "Effects of a company's actions on **people outside the deal**, like carbon emissions reaching parties far away.",
          cite: EXTERNAL,
        },
        { kind: "quote", lead: "Example: a coal miner closing its mines early to cut emissions.", cite: BONDHOLDERS, mark: ["pension funds"] },
        { kind: "quote", lead: "So who should weigh such trade-offs?", cite: GOVERNMENTS, mark: ["governments"] },
        { kind: "quote", lead: "Most of the time, though, interests line up:", cite: IGNORE },
        { kind: "quote", lead: "When they truly conflict, the book's rule:", cite: PRIORITIZE, mark: ["prioritize long-term value creation"] },
        { kind: "quote", lead: "Employees, for instance:", cite: WAGES, mark: ["good business"] },
        { kind: "quote", lead: "Pricing gone too far: Turing Pharmaceuticals, 2015, bought an AIDS-related drug and", cite: TURING },
        { kind: "quote", lead: "And jobs?", cite: JOBS },
        {
          kind: "truefalse",
          q: "In the book's view, long-term shareholder value usually comes from squeezing customers, suppliers and employees.",
          answer: false,
          why: "You **can't** create long-term value by ignoring their needs.",
          cite: IGNORE,
        },
        {
          kind: "choice",
          q: "When stakeholders' interests **truly conflict**, what do the authors tell leaders to prioritize?",
          options: ["Long-term value creation", "This year's profit", "Employees first, always", "Whatever politicians ask"],
          answer: 0,
          why: "**Long-term value creation**, for its advantages in resource allocation and economic health.",
          cite: PRIORITIZE,
        },
        {
          kind: "recap",
          points: [
            { text: "**Externalities** have no objective trade-off; governments must weigh them.", cite: GOVERNMENTS },
            { text: "Long-term value needs happy customers, suppliers and employees.", cite: IGNORE },
            { text: "In a real conflict, **prioritize long-term value creation**.", cite: PRIORITIZE },
          ],
        },
      ],
    },
    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "v1-bubbles",
      sec: FORGET,
      title: "When markets forget ROIC",
      pages: "62–63",
      imp: 2,
      steps: [
        { kind: "quote", lead: "The Internet bubble of the 1990s:", cite: LOST_ROIC, mark: ["return on invested capital (ROIC)"] },
        { kind: "quote", lead: "The story everyone believed:", cite: BIG_FAST, mark: ["getting big fast"] },
        {
          kind: "quote",
          lead: "Online pet supplies and grocery delivery had to buy more trucks, warehouses and inventory as they grew. Then,",
          cite: LAWS,
          mark: ["competitive advantages"],
        },
        { kind: "quote", lead: "The lesson:", cite: OBSOLETE, mark: ["rules of economics"] },
        { kind: "quote", lead: "2008: the same mistake, with debt.", cite: TEASER, mark: ["housing prices would only increase"] },
        { kind: "quote", lead: "Then the risky loans were sold on:", cite: PACKAGED, mark: ["short-term debt"] },
        {
          kind: "choice",
          q: "During the Internet bubble, which ratio did many managers and investors forget entirely?",
          options: ["Return on invested capital (ROIC)", "Price-to-earnings", "Debt-to-equity", "Dividend yield"],
          answer: 0,
          why: "They lost sight of what drives **ROIC**, and many forgot the ratio entirely.",
          cite: LOST_ROIC,
        },
        {
          kind: "truefalse",
          q: "The Internet changed the rules of economics, competition and value creation.",
          answer: false,
          why: "It revolutionized the economy but **could not render obsolete** the rules of economics, competition and value creation.",
          cite: OBSOLETE,
        },
        {
          kind: "order",
          q: "Put the 2008 chain of events in order.",
          items: [
            "Banks lend at teaser rates, betting house prices only rise",
            "The loans are packaged into securities bought with short-term debt",
            "Buyers can't pay; homes fall below the value of their loans",
            "Lenders won't roll over the short-term loans; everyone sells at once",
          ],
          why: "Cheap loans, then long-term securities funded short-term, then the crash, then the run on the short-term funding.",
          cite: CRASH,
        },
        {
          kind: "recap",
          points: [
            { text: "Bubbles start when managers and investors **forget ROIC**.", cite: LOST_ROIC },
            { text: "Getting big fast is no business model without **competitive advantage**.", cite: LAWS },
            { text: "New technology doesn't repeal the **rules of economics**.", cite: OBSOLETE },
          ],
        },
      ],
    },
    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "v1-growth-roic",
      sec: BOOK,
      title: "Growth and ROIC drive value",
      pages: "63–64",
      imp: 3,
      steps: [
        { kind: "quote", lead: "The book's thesis, restated:", cite: FASTER, mark: ["attractive rates of return"] },
        { kind: "quote", lead: "In other words:", cite: DRIVES, mark: ["growth", "relative to its cost", "cash flow and value"] },
        { kind: "quote", lead: "And the flip side:", cite: ANYTHING },
        { kind: "quote", lead: "That rules out", cite: TIMING, mark: ["without actually changing cash flows"] },
        {
          kind: "definition",
          term: "Competitive advantage",
          body: "Whatever lets a company **sustain strong growth and high returns on invested capital**. The core concept of business strategy.",
          cite: ADVANTAGE,
        },
        { kind: "quote", lead: "But it doesn't last on its own:", cite: ERODE, mark: ["erode"] },
        { kind: "quote", lead: "So value is not", cite: CONSENSUS, mark: ["consensus earnings forecast"] },
        { kind: "quote", lead: "What the book gives an investor:", cite: INVESTORS },
        { kind: "quote", lead: "Last word:", cite: NO_FREE },
        {
          kind: "fill",
          q: "The combination of ___ and return on invested capital, relative to its ___, is what drives cash flow and value.",
          bank: ["growth", "cost", "earnings", "price", "debt", "size"],
          answer: ["growth", "cost"],
          why: "Growth and ROIC, measured **against the cost of capital**, drive cash flow and value.",
          cite: DRIVES,
        },
        {
          kind: "multi",
          q: "Which of these **create value**, by the book's rule?",
          options: [
            "Growing at an attractive ROIC",
            "Raising ROIC",
            "An accounting change that moves profit into this year without changing cash flow",
            "Changing who owns claims to the same cash flows",
          ],
          answer: [0, 1],
          why: "Only higher ROIC or growth at an attractive ROIC create value. Shifting the **timing of profits** or the **ownership of claims** doesn't change cash flows.",
          cite: ANYTHING,
        },
        {
          kind: "truefalse",
          q: "Competition tends to push a company's returns on invested capital down over time.",
          answer: true,
          why: "Competition **erodes** competitive advantages, and with them ROIC, so companies must keep finding new ones.",
          cite: ERODE,
        },
        {
          kind: "recap",
          points: [
            { text: "**Growth** and **ROIC** relative to the cost of capital drive cash flow and value.", cite: DRIVES },
            { text: "No change in cash flow, no value: accounting tricks don't count.", cite: TIMING },
            { text: "High ROIC needs a **competitive advantage**, and competition erodes it.", cite: ERODE },
          ],
        },
      ],
    },
  ],
};
