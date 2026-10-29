// Valuation, Chapter 2: Finance in a Nutshell (PDF pp. 68–80). A reading chapter: the story of Lily and Nate,
// told through the book's own sentences, with its numbers shown as scenes.
import type { Cite, Unit } from "../types.ts";
import { EconomicProfit, Emporium, LilyLogan, LilyStart, SameAnswer, SharePath } from "./illus.tsx";

const c = (p: number | string, s: string, t: string): Cite => ({ p, s, t });

// The book names its sections; "2" is the chapter's opening page.
const OPEN = "2";
const EARLY = "The Early Years";
const CONCEPT = "A New Concept";
const MAXROIC = "Should Lily and Nate Try to Maximize ROIC?";
const PUBLIC = "Going Public";
const EXPAND = "Expansion into Related Formats";
const LESSONS = "Some Lessons";

// ── Excerpts ────────────────────────────────────────────────────────────────
const CREATE = c(68, OPEN, "Companies create value when they earn a return on invested capital (ROIC) greater than their opportunity cost of capital.");
const AT_OR_BELOW = c(68, OPEN, "If the ROIC is at or below the cost of capital, growth may not create value.");
const COMBINATION = c(68, OPEN, "Companies should aim to find the combination of growth and ROIC that drives the highest discounted value of their cash flows.");
const ROIC = c(68, EARLY, "We told them they should measure their business's return on invested capital: after-tax operating profits divided by the capital invested in working capital and property, plant, and equipment.");
const ELSEWHERE = c(68, EARLY, "Then they could compare the ROIC with what they could earn if they invested their capital elsewhere—for example, in the stock market.");
const TEN_M = c(68, EARLY, "Lily and Nate had invested $10 million in their business, and in 2020 they earned about $1.8 million after taxes, with no debt.");
const EIGHTEEN = c("68-69", EARLY, "So they calculated their return on invested capital as 18 percent.");
const EIGHT_MORE = c(69, EARLY, "They easily saw that their money was earning 8 percent more than what we were assuming they could earn by investing elsewhere");
const EXPENSIVE = c(69, EARLY, "Nate added that they discovered growth can be expensive; to achieve that growth, they had to invest in new stores, fixtures, and inventory.");
const REINVEST = c(69, EARLY, "To grow at 5 percent and earn 18 percent ROIC on their growth, they reinvested about 28 percent of their profits back into the business each year.");
const CASH = c(69, EARLY, "In 2020, then, they generated cash flow of about $1.30 million.");
const LOGAN = c(70, EARLY, "Logan was achieving his growth by investing heavily. Despite all the growth in operating profit, his company's ROIC was declining significantly, so cash flow was slipping downward.");
const UNIQUE = c(71, EARLY, "their products were unique and cutting-edge fashion, so their customers were willing to pay higher prices for their dresses than for the products at many other dress shops.");
const ALONG = c(71, EARLY, "This discussion helped Nate and Lily appreciate that it was beneficial to consider ROIC along with growth.");

const FOUR_YEARS = c(72, CONCEPT, "all the new capital investment to convert their stores would reduce ROIC and cash flow for four years, even though revenue and profits would be growing faster");
const TRADE_OFF = c(72, CONCEPT, "After four years, cash flow would be greater, but they didn't know how to trade off the short-term decline in ROIC and cash flow against the long-term improvement.");
const DCF = c(73, CONCEPT, "DCF is a way of collapsing the future performance of the company into a single number.");
const FORECAST = c(73, CONCEPT, "Lily and Nate needed to forecast the future cash flow of the company and discount it back to the present at the same opportunity cost of capital we had used for our earlier comparisons.");
const FIFTY_THREE = c(73, CONCEPT, "We showed them that the DCF value of their company would be $53 million if they did not adopt the new concept. With the new concept, the DCF value would be greater: $62 million.");

const NOT_ROIC = c(73, MAXROIC, "Our advice was to focus not on the ROIC itself, but on the combination of ROIC (versus cost of capital) and the amount of capital.");
const EP = c(73, MAXROIC, "We defined economic profit as the spread between ROIC and cost of capital multiplied by the amount of invested capital.");
const NINE_SIXTY = c(74, MAXROIC, "economic profit forecast for 2024 would be the 8 percent spread by $12 million in invested capital, or $960,000.");
const EIGHT_FIFTY_FIVE = c(74, MAXROIC, "If they closed their low-returning stores, their average ROIC would increase to 19 percent, but their economic profit would decline to $855,000.");
const STILL_MORE = c(74, MAXROIC, "even though some stores earn a lower ROIC than others do, the lower-earning stores are still earning more than the cost of capital.");
const MAX_EP = c(74, MAXROIC, "Lily and Nate should seek to maximize economic profit, not ROIC, over the long term.");
const SAME = c(74, MAXROIC, "\"Good question,\" we said. \"In fact, they're the same.\"");
const ADDED = c(74, MAXROIC, "we discounted the future economic profit at the same cost of capital we had used with the DCF. Then we added the discounted economic profit to the amount of capital invested today.");
const PENNY = c(74, MAXROIC, "The results for the two approaches are the same—exactly, to the penny.");

const TWO_MARKETS = c(75, PUBLIC, "good performance in one market does not necessarily mean good performance in another.");
const REAL = c(75, PUBLIC, "Up until now, we'd been talking with Lily and Nate about the real market. How much profit and cash flow were they earning relative to the investments they were making?");
const RULE = c(76, PUBLIC, "In the real market, the decision rule is simple: choose strategies or make operational decisions that maximize the present value of future cash flow or future economic profit.");
const PRICE = c(76, PUBLIC, "The price of the shares is based on what investors think those shares are worth.");
const INTRINSIC = c(76, PUBLIC, "This intrinsic value is based on the future cash flows or earnings power of the company.");
const PAYING = c(76, PUBLIC, "investors are paying for the performance they expect the company to achieve in the future, not what the company has done in the past (and certainly not the cost of the company's assets).");
const SEVEN = c(76, PUBLIC, "\"That's interesting,\" said Nate, \"because the amount of capital we've invested is only $7 per share.\"");
const PREMIUM = c(76, PUBLIC, "We told them that this difference meant the market should be willing to pay their company a premium of $13 over the invested capital for the future economic profit the company would earn.");
const MAY_NOT = c(76, PUBLIC, "\"But,\" Lily asked, \"if they pay us this premium up front, how will the investors make any money?\"");
const THIRTY_TWO = c(77, PUBLIC, "An investor who bought a share for $20 per share today could sell the share for $32 in five years. The annualized return on the investment would be 10 percent, the same as the discount rate we used to discount your future performance.");
const AS_EXPECTED = c(77, PUBLIC, "as long as you perform as expected, the return for your shareholders will be just their opportunity cost. But if you do better than expected, your shareholders will earn more than 10 percent. And if you do worse than expected, your shareholders will earn less than 10 percent.");
const RELATIVE = c(77, PUBLIC, "the return that investors earn is driven not by the performance of our company, but by its performance relative to expectations.");
const DUAL = c(77, PUBLIC, "Managers have a dual task: to maximize the intrinsic value of the company and to properly manage the expectations of the financial market.");
const TOO_HIGH = c(77, PUBLIC, "You don't want investor expectations to be too high or too low.");
const TAKEOVER = c(77, PUBLIC, "if the market's expectations are too low and you have a low share price relative to the opportunities the company faces, you may be subject to a hostile takeover.");

const ANY_MEASURE = c(78, EXPAND, "the problem with any financial measure is that it cannot tell you how your managers are doing at building the business for the future.");
const CUTTING = c(78, EXPAND, "in the short term, managers could improve their financial results by cutting back on customer service, such as by reducing the number of employees available in the store to help customers, by cutting into employee training, or by deferring maintenance costs or brand-building expenditures.");
const FORWARD = c(78, EXPAND, "You need to make sure that you build in measures related to customer satisfaction or brand awareness—measures that let you know what the future will look like, not just what the current performance is.");

const L1 = c(79, LESSONS, "In the real market, you create value by earning a return on your invested capital greater than the opportunity cost of capital.");
const L2 = c(79, LESSONS, "The more you can invest at returns above the cost of capital, the more value you create. That is, growth creates more value as long as the return on invested capital exceeds the cost of capital.");
const L3 = c(79, LESSONS, "You should select strategies that maximize the present value of future expected cash flows or economic profit. The answer is the same regardless of which approach you choose.");
const L4 = c(79, LESSONS, "The value of a company's shares in the stock market equals the intrinsic value based on the market's expectations of future performance, but the market's expectations of future performance may not be same as the company's.");
const L5 = c(79, LESSONS, "The returns that shareholders earn depend on changes in expectations as much as on the actual performance of the company.");

export const U2: Unit = {
  sec: "2",
  title: "Finance in a Nutshell",
  pages: "68–79",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "v2-early-years",
      sec: EARLY,
      title: "ROIC, growth and cash flow",
      pages: "68–71",
      imp: 3,
      steps: [
        { kind: "quote", lead: "The chapter in one sentence.", cite: CREATE, mark: ["return on invested capital (ROIC)", "opportunity cost of capital"] },
        { kind: "quote", lead: "Which means:", cite: AT_OR_BELOW, mark: ["growth may not create value"] },
        { kind: "quote", lead: "So the target is", cite: COMBINATION, mark: ["combination of growth and ROIC"] },
        {
          kind: "definition",
          term: "Return on invested capital (ROIC)",
          body: "**After-tax operating profit ÷ invested capital** (working capital plus property, plant and equipment). What the business earns on each dollar put into it.",
          cite: ROIC,
          aka: ["ROIC"],
        },
        {
          kind: "definition",
          term: "Opportunity cost of capital",
          aka: ["cost of capital"],
          body: "What the same money could earn **invested elsewhere**, for example in the stock market. ROIC has to beat it.",
          cite: ELSEWHERE,
        },
        {
          kind: "see",
          title: "Lily's Dresses, 2020",
          illus: LilyStart,
          beats: [
            { text: "Meet **Lily and Nate**, owners of a small chain of clothing stores. They have **$10 million** invested.", cite: TEN_M },
            { text: "The stores earn **$1.8 million** after taxes: an **ROIC of 18%**.", cite: EIGHTEEN },
            { text: "Against a **10%** cost of capital, their money earns **8 points more** than it would elsewhere.", cite: EIGHT_MORE },
            { text: "Growth isn't free. To grow **5% a year**, they put **28% of profit** back into new stores, fixtures and inventory.", cite: REINVEST },
            { text: "The other **72%** is **cash flow** they can take out: about **$1.30 million**.", cite: CASH },
          ],
        },
        {
          kind: "number",
          q: "Lily's Dresses has **$10 million** invested and earns **$1.8 million** after taxes. What is its ROIC?",
          answer: 18,
          unit: "%",
          why: "$1.8M ÷ $10M = **18%**.",
          cite: EIGHTEEN,
        },
        { kind: "quote", lead: "Why growth costs cash:", cite: EXPENSIVE, mark: ["growth can be expensive"] },
        { kind: "quote", lead: "Cousin Logan's profits are growing faster. How?", cite: LOGAN, mark: ["investing heavily", "ROIC was declining"] },
        {
          kind: "see",
          title: "Lily against Logan, 2020–2025",
          illus: LilyLogan,
          beats: [
            { text: "**Profit:** Logan's grows faster than Lily's (Exhibit 2.1)." },
            { text: "**ROIC:** Lily's holds at 18%; Logan's slides, because he buys his growth with heavy investment." },
            { text: "**Cash flow:** Lily's rises; Logan's shrinks. Faster profit growth, less cash for the owner.", cite: LOGAN },
          ],
        },
        { kind: "quote", lead: "Where Lily's higher ROIC comes from:", cite: UNIQUE, mark: ["higher prices"] },
        {
          kind: "truefalse",
          q: "Logan's profits grow faster than Lily's, so Logan's business is creating more value.",
          answer: false,
          why: "Logan buys growth with heavy investment: his **ROIC falls** and his **cash flow slips**. Lily's earns more per dollar and more cash.",
          cite: LOGAN,
        },
        {
          kind: "number",
          q: "Lily's Dresses earns **$1.8 million** and reinvests **28%** of it to grow. How much cash flow is left for the owners?",
          answer: 1.3,
          tol: 0.02,
          prefix: "$",
          unit: "million",
          why: "72% of $1.8M ≈ **$1.30 million**, the book's figure.",
          cite: CASH,
        },
        {
          kind: "recap",
          points: [
            { text: "**ROIC** = after-tax operating profit ÷ invested capital.", cite: ROIC },
            { text: "Value needs ROIC **above the cost of capital**: what the money earns elsewhere.", cite: CREATE },
            { text: "Look at ROIC **along with growth**: growth bought with heavy investment can shrink cash flow.", cite: ALONG },
          ],
        },
      ],
    },
    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "v2-dcf",
      sec: CONCEPT,
      title: "DCF: the future in one number",
      pages: "71–73",
      imp: 3,
      steps: [
        { kind: "quote", lead: "Years later: **Lily's Emporium**, bigger stores with a wider range. The catch:", cite: FOUR_YEARS, mark: ["reduce ROIC and cash flow for four years"] },
        { kind: "quote", lead: "Their question:", cite: TRADE_OFF, mark: ["trade off"] },
        {
          kind: "definition",
          term: "Discounted cash flow (DCF)",
          aka: ["present value"],
          body: "Forecast the company's **future cash flows** and **discount** them back to today at the cost of capital. The total is what the company is worth.",
          cite: DCF,
        },
        { kind: "quote", lead: "How Lily and Nate apply it:", cite: FORECAST, mark: ["forecast", "discount it back to the present"] },
        {
          kind: "see",
          title: "Two futures, one number each",
          illus: Emporium,
          beats: [
            { text: "**Base case:** Lily's Dresses as it is. Cash flow grows slowly (Exhibit 2.3)." },
            { text: "**Emporium:** converting the stores cuts cash flow at first. It overtakes only after the lean years.", cite: FOUR_YEARS },
            { text: "Discount the base case at **10%**: worth **$53 million** today." },
            { text: "Discount the Emporium case the same way: **$62 million**. Higher, despite the lean years.", cite: FIFTY_THREE },
          ],
        },
        {
          kind: "choice",
          q: "What does a **DCF** do?",
          options: [
            "Collapses the company's future performance into a single number today",
            "Measures last year's return on capital",
            "Ranks companies by profit growth",
            "Adds up future cash flows without adjusting them",
          ],
          answer: 0,
          why: "It **forecasts** future cash flow and **discounts** it to the present: the future in one number.",
          cite: DCF,
        },
        {
          kind: "number",
          q: "The DCF value is **$53 million** without the new concept and **$62 million** with it. How much value does Lily's Emporium add?",
          answer: 9,
          prefix: "$",
          unit: "million",
          why: "$62M − $53M = **$9 million** of value, even though ROIC and cash flow dip for four years.",
          cite: FIFTY_THREE,
        },
        {
          kind: "truefalse",
          q: "Because ROIC and cash flow fall for four years, Lily's Emporium destroys value.",
          answer: false,
          why: "The DCF counts the **whole future**: $62 million with the Emporium against $53 million without.",
          cite: FIFTY_THREE,
        },
        {
          kind: "recap",
          points: [
            { text: "**DCF**: forecast cash flows, discount them at the cost of capital, add them up.", cite: FORECAST },
            { text: "It settles short-term pain against long-term gain in **one number**.", cite: DCF },
            { text: "Emporium: four lean years, yet **$62M vs $53M**.", cite: FIFTY_THREE },
          ],
        },
      ],
    },
    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "v2-economic-profit",
      sec: MAXROIC,
      title: "Economic profit, not ROIC",
      pages: "73–74",
      imp: 3,
      steps: [
        { kind: "quote", lead: "Lily wants to close the stores earning only **14%** to lift the average ROIC. The advice:", cite: NOT_ROIC, mark: ["the amount of capital"] },
        {
          kind: "definition",
          term: "Economic profit",
          body: "**(ROIC − cost of capital) × invested capital**. The dollars a business earns above what its capital could earn elsewhere.",
          cite: EP,
        },
        {
          kind: "see",
          title: "Close the 14% stores?",
          illus: EconomicProfit,
          beats: [
            { text: "Today: **18%** ROIC on **$12 million**. The 8-point spread over the cost of capital is the rectangle: **$960,000**.", cite: NINE_SIXTY },
            { text: "Close the low-returning stores: ROIC rises to **19%**, but on less capital. Economic profit **falls to $855,000**.", cite: EIGHT_FIFTY_FIVE },
            { text: "The 14% stores earn **less** than average, but **more than the 10%** cost of capital. Closing them throws value away.", cite: STILL_MORE },
          ],
        },
        { kind: "quote", lead: "So the rule:", cite: MAX_EP, mark: ["maximize economic profit, not ROIC"] },
        {
          kind: "number",
          q: "ROIC **18%**, cost of capital **10%**, invested capital **$12 million**. What is the economic profit?",
          answer: 960,
          prefix: "$",
          unit: "thousand",
          why: "(18% − 10%) × $12,000k = 8% × $12,000k = **$960k**.",
          cite: NINE_SIXTY,
        },
        {
          kind: "choice",
          q: "Why should Lily and Nate **keep** the stores earning 14%?",
          options: [
            "They earn more than the 10% cost of capital, so they add economic profit",
            "Closing stores always hurts the brand",
            "They will soon earn 18%",
            "ROIC doesn't matter at all",
          ],
          answer: 0,
          why: "14% beats the **10% cost of capital**: every dollar there still earns economic profit.",
          cite: STILL_MORE,
        },
        { kind: "quote", lead: "Nate: \"When do we use economic profit, and when do we use DCF?\"", cite: SAME },
        {
          kind: "see",
          title: "DCF = capital + discounted economic profit",
          illus: SameAnswer,
          beats: [
            { text: "The **DCF** of Lily's company: **$61,911,000** (Exhibit 2.5)." },
            { text: "Economic-profit method: start from the **capital invested today**.", cite: ADDED },
            { text: "Add the **economic profit**, discounted at the same cost of capital." },
            { text: "Same total.", cite: PENNY },
          ],
        },
        {
          kind: "truefalse",
          q: "Valuing Lily's company by discounted economic profit gives a different value from a DCF.",
          answer: false,
          why: "Capital invested today **plus** discounted economic profit equals the DCF, **to the penny**.",
          cite: PENNY,
        },
        {
          kind: "recap",
          points: [
            { text: "**Economic profit** = (ROIC − cost of capital) × invested capital.", cite: EP },
            { text: "Maximize **economic profit**, not ROIC: returns above the cost of capital add value.", cite: MAX_EP },
            { text: "**DCF** and **economic profit** give the same value.", cite: PENNY },
          ],
        },
      ],
    },
    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "v2-going-public",
      sec: PUBLIC,
      title: "Price, value and expectations",
      pages: "75–77",
      imp: 3,
      steps: [
        { kind: "quote", lead: "Lily and Nate need more capital, so they go public. First warning:", cite: TWO_MARKETS, mark: ["one market", "another"] },
        {
          kind: "definition",
          term: "Real market",
          body: "Where the company competes: the **profit and cash flow** it earns on the **money it invests**. (The other one is the financial market, where its shares trade.)",
          cite: REAL,
        },
        { kind: "quote", lead: "In the real market, nothing changes:", cite: RULE, mark: ["maximize the present value"] },
        { kind: "quote", lead: "In the financial market, a share has a price:", cite: PRICE },
        {
          kind: "definition",
          term: "Intrinsic value",
          body: "What a share is worth from the company's **expected future cash flows**. Investors trade when the price is above or below it.",
          cite: INTRINSIC,
        },
        { kind: "quote", lead: "So investors pay for", cite: PAYING, mark: ["in the future"] },
        { kind: "quote", lead: "Lily's shares are worth **$20**, though only **$7** of capital stands behind each. Lily asks:", cite: MAY_NOT },
        {
          kind: "see",
          title: "Lily's shares: $7, $20, $32",
          illus: SharePath,
          beats: [
            { text: "Lily and Nate have invested **$7 of capital** per share.", cite: SEVEN },
            { text: "The shares' intrinsic value is **$20**. The **$13 premium** pays for future economic profit.", cite: PREMIUM },
            { text: "If the company performs **exactly as expected**, the share is worth **$32** in five years." },
            { text: "$20 to $32 in five years is **10% a year**: the cost of capital, nothing more.", cite: THIRTY_TWO },
            { text: "Do better than expected and shareholders earn **more than 10%**; do worse and they earn less.", cite: AS_EXPECTED },
          ],
        },
        { kind: "quote", lead: "Lily, after the numbers:", cite: RELATIVE, mark: ["relative to expectations"] },
        { kind: "quote", lead: "So managers have two jobs:", cite: DUAL, mark: ["dual task"] },
        { kind: "quote", lead: "And expectations can be wrong both ways.", cite: TOO_HIGH },
        {
          kind: "number",
          q: "An investor pays **$20** a share. Five years later, with performance exactly as expected and no dividends, it is worth **$32**. What is the annual return?",
          answer: 10,
          tol: 0.3,
          unit: "%",
          why: "($32 ÷ $20) over five years ≈ **10% a year**: exactly the cost of capital used to value the shares.",
          cite: THIRTY_TWO,
        },
        {
          kind: "truefalse",
          q: "If a company earns more than its cost of capital, its shareholders necessarily earn more than the cost of capital.",
          answer: false,
          why: "If it performs **as expected**, shareholders earn just their opportunity cost. Only **beating expectations** earns more.",
          cite: AS_EXPECTED,
        },
        {
          kind: "choice",
          q: "What drives the return shareholders earn?",
          options: ["Performance relative to expectations", "The company's ROIC alone", "Its profit growth alone", "The cost of its assets"],
          answer: 0,
          why: "Not performance itself, but **performance relative to expectations**.",
          cite: RELATIVE,
        },
        {
          kind: "recap",
          points: [
            { text: "**Intrinsic value** comes from expected future cash flows, not the past or asset costs.", cite: PAYING },
            { text: "Meet expectations and shareholders earn just the **cost of capital**.", cite: AS_EXPECTED },
            { text: "Returns follow **performance relative to expectations**. Too low a price invites a takeover.", cite: TAKEOVER },
          ],
        },
      ],
    },
    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "v2-expansion",
      sec: EXPAND,
      title: "Measuring the future",
      pages: "78",
      imp: 2,
      steps: [
        { kind: "quote", lead: "Lily's Furniture and Lily's Garden Supplies follow; the business grows complex. The trap:", cite: ANY_MEASURE, mark: ["building the business for the future"] },
        { kind: "quote", lead: "How managers can flatter this year's numbers:", cite: CUTTING },
        { kind: "quote", lead: "The fix:", cite: FORWARD, mark: ["customer satisfaction or brand awareness"] },
        {
          kind: "multi",
          q: "Which of these could lift **this year's** financial results while hurting the future?",
          options: ["Fewer store staff to help customers", "Cutting employee training", "Deferring maintenance", "Opening stores that earn more than the cost of capital"],
          answer: [0, 1, 2],
          why: "Cutting service, training and maintenance flatters today's numbers and **weakens the business**. Opening value-creating stores does the opposite.",
          cite: CUTTING,
        },
        {
          kind: "choice",
          q: "Which is a **forward-looking** measure, in the book's sense?",
          options: ["Customer satisfaction", "Last quarter's ROIC", "This year's economic profit", "Revenue growth to date"],
          answer: 0,
          why: "Customer satisfaction or brand awareness tell you **what the future will look like**; the others report the past.",
          cite: FORWARD,
        },
        {
          kind: "recap",
          points: [
            { text: "Financial measures can't show whether the business is **built for the future**.", cite: ANY_MEASURE },
            { text: "Add forward-looking measures: **customer satisfaction, brand awareness**.", cite: FORWARD },
          ],
        },
      ],
    },
    // ── Lesson 6 ──────────────────────────────────────────────────────────
    {
      id: "v2-lessons",
      sec: LESSONS,
      title: "The five lessons",
      pages: "79",
      imp: 3,
      steps: [
        { kind: "quote", lead: "Lesson 1 of 5", cite: L1, mark: ["greater than the opportunity cost of capital"] },
        { kind: "quote", lead: "Lesson 2 of 5", cite: L2, mark: ["as long as the return on invested capital exceeds the cost of capital"] },
        { kind: "quote", lead: "Lesson 3 of 5", cite: L3, mark: ["The answer is the same"] },
        { kind: "quote", lead: "Lesson 4 of 5", cite: L4, mark: ["market's expectations"] },
        { kind: "quote", lead: "Lesson 5 of 5", cite: L5, mark: ["changes in expectations"] },
        {
          kind: "match",
          q: "Match each term to what it means.",
          pairs: [
            ["ROIC", "Operating profit ÷ invested capital"],
            ["Cost of capital", "What the money earns elsewhere"],
            ["Economic profit", "Spread over cost × capital"],
            ["DCF", "Future cash flows, discounted"],
            ["Intrinsic value", "Worth from expected cash flows"],
          ],
          cite: L3,
        },
        {
          kind: "truefalse",
          q: "Growth always creates value.",
          answer: false,
          why: "Growth creates value only **as long as ROIC exceeds the cost of capital**.",
          cite: L2,
        },
        {
          kind: "choice",
          q: "Two companies grow equally fast. Which creates more value?",
          options: ["The one whose ROIC is further above its cost of capital", "The one with higher earnings per share", "The one with more stores", "Neither: growth alone sets value"],
          answer: 0,
          why: "Growth adds value in proportion to how far **ROIC exceeds the cost of capital**.",
          cite: L2,
        },
        {
          kind: "recap",
          title: "The chapter in five lines",
          points: [
            { text: "Value: **ROIC above the cost of capital**.", cite: L1 },
            { text: "Growth adds value only **while ROIC beats the cost of capital**.", cite: L2 },
            { text: "Maximize the **present value** of cash flow or economic profit: same answer.", cite: L3 },
            { text: "The share price is intrinsic value on the **market's** expectations.", cite: L4 },
            { text: "Shareholder returns follow **changes in expectations**.", cite: L5 },
          ],
        },
      ],
    },
  ],
};
