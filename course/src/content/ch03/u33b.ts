// 3.3 TRADING INSTRUMENTS, part B: 3.3.3 Derivative Contracts to 3.3.5 Hybrid Contracts (pp. 41–44)
import type { Cite, Lesson, Question } from "../types.ts";
import { Convertible, FuturesOffset, InsureOrGamble, OdaxCall, RateSwap, Settlement, TomatoForward, ZeroNetSupply } from "./illus/u33b.tsx";
import { OdaxGame } from "./games/OdaxGame.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts (short, targeted) ──────────────────────────────────────────────
const D_DEF = c(41, "3.3.3", "Derivative contracts are instruments that derive their values from the values of the underlying instruments upon which they are based.");
const D_TYPES = c(41, "3.3.3", "Derivative contracts include forward contracts, futures contracts, options, and swaps.");
const ZNS = c(41, "3.3.3", "Sellers create derivative contracts when they first sell them. Derivative contracts therefore are in zero net supply.");
const ZNS_SUM = c(41, "3.3.3", "The sum of all long positions minus the sum of all short positions is always zero.");
const NO_WEALTH = c(45, "3.4.1", "Derivative contracts represent no wealth because they are all in zero net supply and do not represent ownership of real assets.");
const FUT = c(41, "3.3.3", "All derivative contracts have an element of futurity: Their values depend on future events.");
const FUT_EX = c(41, "3.3.3", "For example, the prices of futures, options, and forwards all depend on future prices of their underlying instruments.");
const EXP = c(41, "3.3.3", "On that date, traders make final settlement and the contract expires. European traders refer to this date as the expiry of the contract.");
const INF = c(41, "3.3.3", "Exchanges and investment banks have proposed many infinitely lived derivative contracts, but none have been notably successful.");
const INF_DEF = c(41, "3.3.3", "Contracts that do not expire are infinitely lived.");

const PHYS = c(41, "3.3.3", "A physically settled contract requires that the seller deliver the underlying instrument to the buyer when obligated to do so. At that time, the buyer pays cash for the instrument at the agreed price.");
const CASH = c(41, "3.3.3", "A cash-settled contract requires that the seller deliver the cash value of the underlying instrument to the buyer when obligated to do so.");
const DIFF = c(41, "3.3.3", "In practice, the traders transfer only the difference between the value and the price.");
const NEG = c(41, "3.3.3", "If the contract is a futures contract, the difference might be negative. In that case, the seller pays the buyer the difference.");
const OPT_NEG = c(41, "3.3.3", "If the contract is an option contract, the difference will never be negative because contract holders will not exercise their options when doing so would require that they make additional payments.");
const NOTIONAL = c(41, "3.3.3", "Derivative contracts always have a notional size or notional value.");
const NOTIONAL_CASH = c(42, "3.3.3", "For cash-settled contracts, a formula specifies the notional value that determines the final cash settlement.");
const VM = c(42, "3.3.3", "Variational margin payments transfer money from buyers to sellers or from sellers to buyers to adjust the prices of their contracts to reflect current market conditions.");
const VM_WHY = c(42, "3.3.3", "Variation margin payments therefore reduce the chance that traders will default when their contracts expire.");

const FWD = c(42, "3.3.3.1", "Forward contracts are contracts for the future sale of some commodity. The commodity may be a physical commodity, like pork bellies, or a financial commodity, like a currency.");
const TOMATO = c(41, "3.3.3", "A tomato forward contract is an agreement between a buyer and a seller in which the buyer agrees to pay a fixed price for tomatoes that the seller will deliver in the future.", { box: "A Tomato Forward" });
const TOMATO_OWN = c(41, "3.3.3", "The seller may not own the tomatoes when they negotiate the contract.", { box: "A Tomato Forward" });
const TOMATO_WHY = c(41, "3.3.3", "The farmers obtain fixed prices for their harvests, and the food processors obtain fixed prices for the tomatoes they must buy to produce their products.", { box: "A Tomato Forward" });
const FUTDEF = c(42, "3.3.3.1", "Standardized futures contracts are forward contracts that an exchange clearinghouse guarantees. Futures traders therefore do not care whether their counterparts are creditworthy.");
const FUT_CH = c(42, "3.3.3.1", "They only need to consider whether the clearinghouse is creditworthy.");
const CH_BOTH = c(42, "3.3.3.1", "the clearinghouse is a buyer to every seller and a seller to every buyer");
const OFFSET = c(42, "3.3.3.1", "traders can open a position by buying a contract from one trader and close the position by selling it to someone else. They do not need to buy and sell with the same trader to offset their positions.");

const OPT = c(42, "3.3.3.1", "An option represents the right—but not the obligation—to do something.");
const OPT_FIXED = c(42, "3.3.3.1", "Option contracts give their holders the option to buy or sell an underlying instrument");
const WRITER = c(42, "3.3.3.1", "The writer of the option is the trader who sold the contract. The option is written upon the underlying instrument.");
const CALLPUT = c(42, "3.3.3.1", "A call option is an option to buy at a fixed strike price. A put option is an option to sell at a fixed strike price.");
const STYLE = c(42, "3.3.3.1", "If the option holder can exercise the option any time before the expiration date, it is an American-style option. If the holder can exercise only on the expiration date, it is a European-style option.");
const ODAX_BOX = { box: "The Eurex ODAX Contract" };
const ODAX_WHAT = c(42, "3.3.3", "Eurex trades a cash-settled option contract based on the German Deutscher Aktienindex (DAX) equity index.", ODAX_BOX);
const ODAX_NOTIONAL = c(42, "3.3.3", "The notional value of this ODAX contract is five euros per index point, or 29,500 euros, given the 5,900 level of the DAX at the end of June 2001.", ODAX_BOX);
const ODAX_BUY = c(42, "3.3.3", "If you buy an ODAX call option with a strike price of 6,200 for 26.00 euros, you will pay 130 euros for the contract.", ODAX_BOX);
const ODAX_WIN = c(42, "3.3.3", "If the DAX on the expiration date closes at 6,500, you will make five times the difference between the closing price and the strike price, or 1,500 euros.", ODAX_BOX);
const ODAX_LOSE = c(42, "3.3.3", "If the DAX remains below 6,200, you will not exercise the option, and it will expire worthless.", ODAX_BOX);

const FOPT = c(42, "3.3.3.1", "A futures option contract is an option contract written on a futures contract.");
const FOPT_CALL = c(42, "3.3.3.1", "The holder of a call option on a futures contract has the right to purchase a futures contract at a specified strike price.");
const FOPT_WHERE = c(42, "3.3.3.1", "Futures option contracts trade at the exchange where the underlying futures contracts trade.");
const SWAP = c(42, "3.3.3.1", "Swaps are contracts for the exchange of two future cash flows. A cash flow is a series of payments.");
const IRS = c(42, "3.3.3.1", "An interest rate swap provides for the exchange of a future series of fixed-rate interest payments for a future series of variable floating-rate interest payments.");
const IRS_TERMS = c(42, "3.3.3.1", "When they enter the contract, the traders negotiate the fixed-rate payments and agree upon a formula for computing the future variable-rate payments.");
const CSWAP = c(42, "3.3.3.1", "A currency swap provides for the exchange of a future series of fixed payments in one currency for a future series of payments in another currency.");
const SWAP_VAL = c(42, "3.3.3.1", "Since the values of these contracts depend on the values of the cash flows that the traders swap, swaps are derivative contracts.");
const SWAPTION = c(43, "3.3.3.1", "Swaptions are options on a swap contract. A trader who owns a swaption call has the right to buy a swap at the specified strike price.");
const LIFFE_BOX = { box: "The Third Order Derivative of LIFFE" };
const SWAPNOTE = c(43, "3.3.3.1", "The Swapnote futures option is a derivative on a derivative on a derivative.", LIFFE_BOX);
const SWAPNOTE_CHAIN = c(43, "3.3.3.1", "The Swapnote futures contracts thus derive their values from prices in the swaps market. LIFFE also trades options on Swapnote futures.", LIFFE_BOX);

const INS = c(43, "3.3.4", "Insurance contracts and gambling contracts are instruments that derive their values from the outcomes of future events.");
const INS_FIRE = c(43, "3.3.4", "For example, the value of a fire insurance contract on a building depends on whether the building burns down.");
const INS_WHY = c(43, "3.3.4", "The distinction between an insurance contract and a gambling contract depends on the reasons why people buy them.");
const HEDGERS = c(43, "3.3.4", "People who are concerned about the loss that they would experience if some future event takes place buy insurance contracts. Such traders are called hedgers.");
const GAMB = c(43, "3.3.4", "Gambling contracts are arranged by people who have no other financial stake in the underlying event.");
const GAMB_FUN = c(43, "3.3.4", "People arrange gambling contracts for entertainment, whereas they arrange financial contracts to raise capital and reallocate risk.");
const INS_ZNS = c(43, "3.3.4", "Like derivative contracts, insurance contracts and gambling contracts have an element of futurity. They are also in zero net supply.");
const DERIV_CLASS = c(43, "3.3.4", "Derivative contracts therefore are contracts whose values depend on future events. We therefore can classify derivative contracts as insurance contracts or gambling contracts.");
const DERIV_USE = c(43, "3.3.4", "many hedgers use derivative contracts to insure against risks that they face, and many traders use derivative contracts to gamble on future events in which they have no financial interest.");
const WHY_GAMB = c(43, "3.3.4", "The close analogy between the two markets is both useful and harmful.", { box: "Why Discuss Gambling Contracts?" });

const HYB = c(43, "3.3.5", "Some trading instruments defy easy classification because they embody elements of more than one type of instrument.");
const OIL = c(43, "3.3.5", "For example, some oil companies issue oil-linked bonds. The interest that they pay depends on the price of oil.");
const OIL_FIN = c(43, "3.3.5", "These bonds are financial assets because they represent ownership of the assets of the firm in the event of bankruptcy.");
const OIL_DER = c(44, "3.3.5", "derivative contracts because they derive at least part of their value from the price of oil.");
const WARRANT = c(44, "3.3.5", "Warrants are options that allow the holder to purchase stock at a specified price from the issuing corporation at some time in the future.");
const WARRANT_FIN = c(44, "3.3.5", "Since a corporation issues them, and since they represent ownership of the assets of the corporation under certain circumstances, they are financial assets.");
const WARRANT_DER = c(44, "3.3.5", "Since their value depends on the value of the underlying stock, they are like derivative contracts.");
const CONV = c(44, "3.3.5", "The holder of a convertible bond can exchange it for stock under some circumstances.");
const CONV_SUM = c(44, "3.3.5", "A convertible therefore is the combination of a straight bond plus an option to exchange the bond for stock.");
const CONV_PARTS = c(44, "3.3.5", "The straight bond is a financial asset. The option gives the convertible bond derivative properties because its value depends on the values of the straight bond and of the stock.");
const QUIB = { box: "Shall We Quibble?" };
const QUIB_ARB = c(44, "3.3.5", "The distinctions between real assets, financial assets, derivative contracts, insurance contracts, and gambling contracts are somewhat arbitrary", QUIB);
const QUIB_ZNS = c(44, "3.3.5", 'We reserve the term "zero net supply" only for contracts that public traders can create by selling.', QUIB);
const QUIB_DER = c(44, "3.3.5", "We reserve the term, however, for instruments whose values depend directly on other instrument values through some contractual mechanism rather than indirectly through common valuation factors.", QUIB);

export const U33B_LESSONS: Lesson[] = [
  // ── 3.3.3 What a derivative is ────────────────────────────────────────────
  {
    id: "3.3.3-derivatives",
    sec: "3.3.3",
    title: "What a derivative is",
    pages: "41",
    imp: 3,
    steps: [
      { kind: "definition", term: "Derivative contracts", body: "Contracts whose value **derives** from the value of an **underlying** instrument.", cite: D_DEF },
      { kind: "idea", title: "Four kinds", body: "**Forwards**, **futures**, **options** and **swaps**. You'll meet each one in this unit.", cite: D_TYPES },
      {
        kind: "definition",
        term: "Zero net supply",
        body: "A derivative is **created by its seller** when first sold. So for every long position there is a matching short.",
        cite: ZNS,
      },
      {
        kind: "see",
        title: "Longs minus shorts is always zero",
        illus: ZeroNetSupply,
        beats: [
          { text: "Ann sells one contract to Ben. The sale **creates** it: Ann is short 1, Ben is long 1.", cite: ZNS },
          { text: "Cara sells two to Dan. Longs rise to 3, shorts to 3. The difference stays **zero**." },
          { text: "Ben sells his contract to Cara. Positions move, but longs still equal shorts.", cite: ZNS_SUM },
          { text: "Every long is matched by a short, so derivatives add up to **no net wealth**.", cite: NO_WEALTH },
        ],
      },
      {
        kind: "truefalse",
        q: "When a futures contract is first sold, the **seller** creates it.",
        answer: true,
        why: "Sellers create derivative contracts when they first sell them. That is why they are in zero net supply.",
        cite: ZNS,
      },
      {
        kind: "number",
        q: "Across a market, traders hold long positions in 1,200 contracts. How many contracts do they hold **short** in total?",
        answer: 1200,
        unit: "contracts",
        illustrative: true,
        why: "Longs minus shorts is always zero, so shorts total 1,200 too.",
        cite: ZNS_SUM,
      },
      { kind: "definition", term: "Futurity", body: "Derivative values depend on **future events**, such as the future price of the underlying.", cite: FUT },
      {
        kind: "definition",
        term: "Expiration date",
        aka: ["expiry"],
        body: "The date of **final settlement**, when the contract ends. European traders call it the **expiry**.",
        cite: EXP,
      },
      {
        kind: "choice",
        q: "The prices of futures, options and forwards all depend on…",
        options: ["future prices of their underlying instruments", "the past prices of the underlying", "the exchange's listing fees", "interest rates only"],
        answer: 0,
        why: "That is futurity: their value depends on what the underlying will be worth.",
        cite: FUT_EX,
      },
      {
        kind: "fill",
        q: "European traders refer to the expiration date as the ___ of the contract.",
        bank: ["expiry", "maturity", "delivery", "strike"],
        answer: ["expiry"],
        why: "“Expiry” is the European word for the expiration date.",
        cite: EXP,
      },
      {
        kind: "truefalse",
        q: "Infinitely lived derivative contracts (contracts that never expire) have been notably successful.",
        answer: false,
        why: "Many have been proposed, but none have been notably successful.",
        cite: INF,
      },
      {
        kind: "recap",
        points: [
          { text: "A **derivative** derives its value from an underlying instrument.", cite: D_DEF },
          { text: "Sellers create them, so they are in **zero net supply**: longs − shorts = 0.", cite: ZNS_SUM },
          { text: "Values depend on the future (**futurity**); final settlement happens at **expiry**.", cite: EXP },
        ],
      },
    ],
  },
  // ── 3.3.3 Settlement, notional value, variation margin ────────────────────
  {
    id: "3.3.3-settlement",
    sec: "3.3.3",
    title: "Physical or cash settlement",
    pages: "41–42",
    imp: 3,
    steps: [
      { kind: "definition", term: "Physically settled", body: "The seller **delivers the underlying**; the buyer pays the **agreed price**.", cite: PHYS },
      { kind: "definition", term: "Cash settled", body: "The seller delivers the underlying's **cash value** instead of the thing itself, and the buyer pays the agreed price.", cite: CASH },
      { kind: "idea", title: "Only the difference moves", body: "Paying the value one way and the price the other would be silly. In practice the traders swap just the **difference**.", cite: DIFF },
      {
        kind: "see",
        title: "Three ways the same contract can settle",
        illus: Settlement,
        beats: [
          { text: "**Physical**: 1,000 bushels of wheat go to the buyer while $4,000 goes to the seller, at the same time. (Our numbers.)", cite: PHYS },
          { text: "**Cash settled**, as written: the seller owes the wheat's value, $5,000; the buyer owes the price, $4,000.", cite: CASH },
          { text: "In practice the two cancel: only the **$1,000 difference** moves, from seller to buyer.", cite: DIFF },
          { text: "In a futures contract the difference can be **negative**. Worth $3,000, the $1,000 moves from buyer to seller.", cite: NEG },
        ],
      },
      {
        kind: "number",
        q: "A cash-settled contract has an agreed price of $50,000. At settlement the underlying is worth $53,500. How much money changes hands?",
        answer: 3500,
        prefix: "$",
        illustrative: true,
        why: "Only the difference moves: 53,500 − 50,000 = $3,500.",
        cite: DIFF,
      },
      {
        kind: "choice",
        q: "In that contract, who pays the $3,500?",
        options: ["The seller pays the buyer", "The buyer pays the seller", "The exchange pays both", "Nobody: it cancels out"],
        answer: 0,
        why: "The seller owes the cash value ($53,500) and the buyer the price ($50,000), so the seller pays the net $3,500.",
        cite: CASH,
      },
      { kind: "idea", title: "Options never settle negative", body: "An option holder simply **won't exercise** if exercising would mean paying more. So the difference is never negative.", cite: OPT_NEG },
      {
        kind: "truefalse",
        q: "At expiration, the holder of a cash-settled **option** may have to pay the writer the difference.",
        answer: false,
        why: "Holders don't exercise when it would cost them extra, so for options the difference is never negative.",
        cite: OPT_NEG,
      },
      { kind: "definition", term: "Notional value", aka: ["notional size"], body: "Every derivative has one. For cash-settled contracts, a **formula** gives the notional value that sets the final cash settlement.", cite: NOTIONAL_CASH },
      { kind: "definition", term: "Variation margin payments", body: "Regular payments between buyers and sellers that **adjust contract prices to current market conditions**.", cite: VM },
      {
        kind: "choice",
        q: "Why do many derivative contracts require variation margin payments?",
        options: ["They reduce the chance that traders default at expiration", "They pay the exchange's fees", "They let traders skip final settlement", "They make the contract infinitely lived"],
        answer: 0,
        why: "Settling gains and losses as prices move keeps a loser from building up a large debt to pay at the end.",
        cite: VM_WHY,
      },
      {
        kind: "fill",
        q: "A ___ settled contract delivers the underlying instrument; a ___ settled contract delivers its cash value.",
        bank: ["physically", "cash", "net", "forward"],
        answer: ["physically", "cash"],
        why: "Physical settlement moves the goods; cash settlement moves their value (in practice, only the difference).",
        cite: CASH,
      },
      {
        kind: "recap",
        points: [
          { text: "**Physical** settlement delivers the underlying; **cash** settlement delivers its value.", cite: PHYS },
          { text: "In practice only the **difference** between value and price changes hands.", cite: DIFF },
          { text: "Every derivative has a **notional value**; **variation margin** reduces default risk.", cite: NOTIONAL },
        ],
      },
    ],
  },
  // ── 3.3.3.1 Forwards and futures ──────────────────────────────────────────
  {
    id: "3.3.3.1-forwards-futures",
    sec: "3.3.3.1",
    title: "Forwards and futures",
    pages: "41–42",
    imp: 3,
    steps: [
      { kind: "definition", term: "Forward contracts", body: "Contracts for the **future sale** of a commodity: physical, like pork bellies, or financial, like a currency.", cite: FWD },
      { kind: "quote", lead: "The book's example, from the box “A Tomato Forward”:", cite: TOMATO, mark: ["fixed price", "in the future"] },
      {
        kind: "see",
        title: "A tomato forward, from spring to harvest",
        illus: TomatoForward,
        beats: [
          { text: "In spring, a farmer and a food processor agree a **fixed price** for tomatoes to be delivered later. The farmer may not own any tomatoes yet.", cite: TOMATO_OWN },
          { text: "At harvest, the tomatoes go to the processor and the fixed price goes to the farmer, **at the same time**." },
          { text: "Both sides knew their price in advance: the farmer for the harvest, the processor for its inputs.", cite: TOMATO_WHY },
        ],
      },
      {
        kind: "choice",
        q: "Why does the food processor sign a tomato forward?",
        options: ["To fix the price of tomatoes it must buy", "To bet that tomato prices will fall", "Because it owns the farm", "To delay paying until expiry"],
        answer: 0,
        why: "Processors obtain fixed prices for the tomatoes they need; farmers obtain fixed prices for their harvests.",
        cite: TOMATO_WHY,
      },
      {
        kind: "truefalse",
        q: "The farmer must already own the tomatoes when the forward contract is negotiated.",
        answer: false,
        why: "The seller may not own the tomatoes yet: they are delivered in the future.",
        cite: TOMATO_OWN,
      },
      {
        kind: "definition",
        term: "Futures contracts",
        body: "**Standardized** forward contracts **guaranteed by an exchange clearinghouse**. Traders worry about the clearinghouse's credit, not each other's.",
        cite: FUTDEF,
      },
      {
        kind: "see",
        title: "Why futures are easy to get out of",
        illus: FuturesOffset,
        beats: [
          { text: "**Forward**: Ann buys directly from Bob. Ann depends on Bob to perform." },
          { text: "**Futures**: the clearinghouse stands in the middle, a buyer to every seller and a seller to every buyer.", cite: CH_BOTH },
          { text: "To close her long, Ann **sells one contract to Cara**. Her long and short cancel: she's flat." },
          { text: "Ann never had to deal with Bob again. Bob is still short; Cara is long.", cite: OFFSET },
        ],
      },
      {
        kind: "choice",
        q: "Why don't futures traders care whether their counterparts are creditworthy?",
        options: ["An exchange clearinghouse guarantees the contracts", "They only trade with people they know", "Futures can't lose money", "The government insures every trade"],
        answer: 0,
        why: "Futures are forwards guaranteed by a clearinghouse, so only the clearinghouse's credit matters.",
        cite: FUT_CH,
      },
      {
        kind: "choice",
        q: "Ann bought a futures contract from Bob. How can she close the position?",
        options: ["Sell one contract to any trader", "Only by selling back to Bob", "Only by waiting for expiry", "By asking the exchange to cancel it"],
        answer: 0,
        why: "Because everyone trades the same contract with the clearinghouse, she can offset with anyone.",
        cite: OFFSET,
      },
      {
        kind: "classify",
        q: "Forward or futures?",
        buckets: ["Forward", "Futures"],
        items: [
          { text: "A farmer's private deal with one food processor", bucket: 0 },
          { text: "Guaranteed by an exchange clearinghouse", bucket: 1 },
          { text: "Standardized: everyone trades the same contract", bucket: 1 },
          { text: "You must worry whether your counterpart will pay", bucket: 0 },
          { text: "Close it by selling to someone else", bucket: 1 },
          { text: "Pork bellies sold for future delivery to one buyer", bucket: 0 },
        ],
        cite: FUTDEF,
      },
      {
        kind: "recap",
        points: [
          { text: "A **forward** is a contract for the future sale of a commodity.", cite: FWD },
          { text: "A **futures** contract is a standardized forward guaranteed by a clearinghouse.", cite: FUTDEF },
          { text: "Futures traders can **offset** with anyone, not just the original counterpart.", cite: OFFSET },
        ],
      },
    ],
  },
  // ── 3.3.3.1 Options, with the Eurex ODAX box ──────────────────────────────
  {
    id: "3.3.3.1-options",
    sec: "3.3.3.1",
    title: "Options: a right, not an obligation",
    pages: "42",
    imp: 3,
    steps: [
      { kind: "definition", term: "Option", body: "The **right, but not the obligation**, to buy or sell an underlying at a fixed price.", cite: OPT },
      { kind: "definition", term: "Writer", body: "The trader who **sold** the option. The option is written upon the underlying.", cite: WRITER },
      { kind: "idea", title: "Calls and puts", body: "A **call** is an option to **buy** at a fixed strike price. A **put** is an option to **sell** at a fixed strike price.", cite: CALLPUT },
      { kind: "quote", lead: "The book's worked example, from the box “The Eurex ODAX Contract”:", cite: ODAX_WHAT, mark: ["cash-settled option"] },
      {
        kind: "see",
        title: "One ODAX call, from purchase to expiration",
        illus: OdaxCall,
        beats: [
          { text: "Buy one call with a **strike of 6,200** quoted at 26.00. At €5 per index point, you pay **€130**.", cite: ODAX_BUY },
          { text: "The DAX closes at **6,500**: you get 5 × (6,500 − 6,200) = **€1,500**.", cite: ODAX_WIN },
          { text: "At or below 6,200 you **don't exercise**: the call expires worthless, never negative.", cite: ODAX_LOSE },
          { text: "The full payoff. Net of the €130 you paid, you break even at 6,226 (our arithmetic, not the book's)." },
        ],
      },
      {
        kind: "number",
        q: "The ODAX is worth **€5 per index point**. With the DAX at 5,900, what is the contract's notional value?",
        answer: 29500,
        prefix: "€",
        why: "5 × 5,900 = €29,500, as in the box.",
        cite: ODAX_NOTIONAL,
      },
      {
        kind: "number",
        q: "You buy an ODAX call with a 6,200 strike quoted at **26.00**. How many euros do you pay?",
        answer: 130,
        prefix: "€",
        why: "26.00 points × €5 per point = €130.",
        cite: ODAX_BUY,
      },
      {
        kind: "number",
        q: "At expiration the DAX closes at **6,500**. What does your 6,200 call pay?",
        answer: 1500,
        prefix: "€",
        why: "5 × (6,500 − 6,200) = €1,500.",
        cite: ODAX_WIN,
      },
      {
        kind: "choice",
        q: "The DAX closes at **6,100** at expiration. What happens to your 6,200 call?",
        options: ["You don't exercise; it expires worthless", "You must pay 5 × 100 = €500", "It turns into a put", "You get your €130 back"],
        answer: 0,
        why: "Below the strike you would not exercise, so the call expires worthless. You lose only the €130 you paid.",
        cite: ODAX_LOSE,
      },
      { kind: "idea", title: "American or European style", body: "**American-style**: exercise any time before expiration. **European-style**: only on the expiration date.", cite: STYLE },
      {
        kind: "match",
        q: "Match each term to its meaning.",
        pairs: [
          ["Call", "Right to buy"],
          ["Put", "Right to sell"],
          ["Writer", "Sold the option"],
          ["American-style", "Exercise any time"],
          ["European-style", "Exercise at expiry only"],
        ],
        cite: CALLPUT,
      },
      {
        kind: "truefalse",
        q: "The holder of a put option is **obliged** to sell if the price falls.",
        answer: false,
        why: "An option is a right, not an obligation. The holder chooses whether to exercise; the writer is the one bound.",
        cite: OPT,
      },
      {
        kind: "game",
        id: "odax-payoff",
        title: "Payoff hunter: the ODAX call",
        brief: "Drag the DAX close along the chart (or use the arrow keys) to hit each target on the book's **6,200 call**. Four rounds.",
        game: OdaxGame,
      },
      {
        kind: "recap",
        points: [
          { text: "An **option** is a right, not an obligation; the **writer** sold it.", cite: OPT_FIXED },
          { text: "**Call** = right to buy, **put** = right to sell, at the strike price.", cite: CALLPUT },
          { text: "ODAX: €5 per point; a 6,200 call bought at 26.00 costs €130 and pays €1,500 at 6,500.", cite: ODAX_WIN },
        ],
      },
    ],
  },
  // ── 3.3.3.1 Futures options, swaps, swaptions ─────────────────────────────
  {
    id: "3.3.3.1-swaps",
    sec: "3.3.3.1",
    title: "Futures options, swaps and swaptions",
    pages: "42–43",
    imp: 3,
    steps: [
      { kind: "definition", term: "Futures option contract", body: "An option **written on a futures contract**. A call gives the right to buy the futures at the strike.", cite: FOPT_CALL },
      {
        kind: "truefalse",
        q: "Futures option contracts trade at the exchange where the underlying futures contracts trade.",
        answer: true,
        why: "The book says so directly: the options trade where their futures trade.",
        cite: FOPT_WHERE,
      },
      { kind: "definition", term: "Swaps", body: "Contracts to **exchange two future cash flows**. A cash flow is a series of payments.", cite: SWAP },
      {
        kind: "definition",
        term: "Interest rate swap",
        body: "A series of **fixed-rate** interest payments exchanged for a series of **floating-rate** ones.",
        cite: IRS,
      },
      {
        kind: "see",
        title: "An interest rate swap, date by date",
        illus: RateSwap,
        beats: [
          { text: "At the start the traders **negotiate the fixed rate** and agree a **formula** for the floating one.", cite: IRS_TERMS },
          { text: "Date 1: A pays fixed 5.0% while B pays floating 4.0%, **at the same time**. (Illustrative rates.)" },
          { text: "Date 2: the floating rate has moved to 5.5%. The fixed side never changes." },
          { text: "Date 3: floating is 6.5%. The swap's value depends on these cash flows, which is why it's a derivative.", cite: SWAP_VAL },
        ],
      },
      { kind: "definition", term: "Currency swap", body: "Fixed payments in **one currency** exchanged for payments in **another currency**.", cite: CSWAP },
      {
        kind: "choice",
        q: "When traders enter an interest rate swap, what do they agree on?",
        options: ["The fixed-rate payments and a formula for the floating ones", "Every payment amount for every date", "Only an exchange rate", "The stock price at expiration"],
        answer: 0,
        why: "The fixed leg is negotiated; the floating leg follows an agreed formula.",
        cite: IRS_TERMS,
      },
      { kind: "definition", term: "Swaptions", body: "Options **on a swap**. A swaption call gives the right to **buy a swap** at the strike price.", cite: SWAPTION },
      { kind: "quote", lead: "LIFFE's Swapnote options stack three layers (box “The Third Order Derivative of LIFFE”):", cite: SWAPNOTE, mark: ["derivative on a derivative on a derivative"] },
      {
        kind: "order",
        q: "Build the third-order derivative, from the bottom layer up.",
        items: ["Prices in the swaps market", "Swapnote futures contract", "Option on Swapnote futures"],
        why: "Swapnote futures derive their values from swap prices; the options are written on the futures.",
        cite: SWAPNOTE_CHAIN,
      },
      {
        kind: "match",
        q: "Match each contract to what it is.",
        pairs: [
          ["Futures option", "Option on a futures"],
          ["Interest rate swap", "Fixed for floating"],
          ["Currency swap", "One currency for another"],
          ["Swaption", "Option on a swap"],
        ],
        cite: SWAPTION,
      },
      {
        kind: "today",
        title: "LIFFE is now part of ICE",
        body: "Euronext bought LIFFE in 2002. After Intercontinental Exchange (ICE) acquired NYSE Euronext in 2013, LIFFE's contracts moved to **ICE Futures Europe**.",
        source: "ICE, completion of the NYSE Euronext acquisition (November 2013)",
      },
      {
        kind: "recap",
        points: [
          { text: "A **futures option** is an option on a futures contract.", cite: FOPT },
          { text: "A **swap** exchanges two cash flows: fixed for floating, or one currency for another.", cite: SWAP },
          { text: "A **swaption** is an option on a swap.", cite: SWAPTION },
        ],
      },
    ],
  },
  // ── 3.3.4 Insurance contracts and gambling contracts ──────────────────────
  {
    id: "3.3.4-insurance-gambling",
    sec: "3.3.4",
    title: "Insurance or gambling?",
    pages: "43",
    imp: 2,
    steps: [
      { kind: "idea", title: "Both pay on future events", body: "Insurance and gambling contracts derive their values from the **outcomes of future events**, like whether a building burns down.", cite: INS_FIRE },
      { kind: "idea", title: "The difference is the reason", body: "What separates insurance from gambling is not the contract but **why people buy it**.", cite: INS_WHY },
      { kind: "definition", term: "Hedgers", body: "People who buy contracts because they **would lose** if some future event happens.", cite: HEDGERS },
      { kind: "idea", title: "Gamblers have no other stake", body: "Gamblers have **no other financial stake** in the event. They play for **entertainment**.", cite: GAMB },
      {
        kind: "see",
        title: "Same contract, two reasons to buy",
        illus: InsureOrGamble,
        beats: [
          { text: "A contract that pays if a certain building **burns down**." },
          { text: "The building's **owner** buys it. A fire would hurt her, so for her it is **insurance**: she is a hedger.", cite: HEDGERS },
          { text: "A **stranger** buys the same contract. He has no stake in the building, so for him it is a **gamble**.", cite: GAMB },
          { text: "Derivatives work the same way: a wheat farmer hedges with futures; a speculator with no wheat gambles.", cite: DERIV_USE },
        ],
      },
      {
        kind: "classify",
        q: "Insurance (hedging) or gambling?",
        buckets: ["Insurance", "Gambling"],
        items: [
          { text: "A homeowner buys fire insurance on her house", bucket: 0 },
          { text: "A fan bets on the Lakers' point spread", bucket: 1, why: "The book's own example of a gambling contract." },
          { text: "A wheat farmer sells futures on his coming harvest", bucket: 0 },
          { text: "Someone with no oil business buys oil futures for the thrill", bucket: 1 },
          { text: "An airline buys fuel futures to fix its fuel costs", bucket: 0 },
          { text: "Two friends bet $20 on tomorrow's rain", bucket: 1 },
        ],
        cite: DERIV_USE,
      },
      {
        kind: "choice",
        q: "According to Harris, what distinguishes an insurance contract from a gambling contract?",
        options: ["The reasons why people buy them", "Whether an exchange lists them", "Whether they settle in cash", "How long they last"],
        answer: 0,
        why: "The same contract can be either, depending on whether the buyer has a loss to protect.",
        cite: INS_WHY,
      },
      {
        kind: "truefalse",
        q: "Like derivative contracts, insurance and gambling contracts are in zero net supply.",
        answer: true,
        why: "They also have futurity: their values depend on future events.",
        cite: INS_ZNS,
      },
      { kind: "idea", title: "So derivatives can be either", body: "A future price is itself a future event. So any derivative can be classed as **insurance** or **gambling**, depending on who holds it.", cite: DERIV_CLASS },
      { kind: "quote", lead: "Why a trading book talks about gambling (box “Why Discuss Gambling Contracts?”):", cite: WHY_GAMB, mark: ["useful and harmful"] },
      {
        kind: "fill",
        q: "People arrange gambling contracts for ___, whereas they arrange financial contracts to raise capital and ___ risk.",
        bank: ["entertainment", "reallocate", "profit", "eliminate"],
        answer: ["entertainment", "reallocate"],
        why: "Financial contracts raise capital and reallocate risk; gambling contracts entertain.",
        cite: GAMB_FUN,
      },
      {
        kind: "recap",
        points: [
          { text: "Insurance and gambling contracts both pay on **future events**.", cite: INS },
          { text: "**Hedgers** buy to cover a possible loss; gamblers have no other stake.", cite: HEDGERS },
          { text: "Any derivative can be classed as insurance or gambling, by the holder's **reason**.", cite: DERIV_CLASS },
        ],
      },
    ],
  },
  // ── 3.3.5 Hybrid contracts ────────────────────────────────────────────────
  {
    id: "3.3.5-hybrids",
    sec: "3.3.5",
    title: "Hybrids: two instruments in one",
    pages: "43–44",
    imp: 2,
    steps: [
      { kind: "idea", title: "Some instruments are two things at once", body: "**Hybrid contracts** embody elements of more than one type of instrument, so they defy easy classification.", cite: HYB },
      { kind: "definition", term: "Oil-linked bonds", body: "Bonds whose **interest depends on the price of oil**. A financial asset with a derivative part.", cite: OIL },
      { kind: "definition", term: "Warrants", aka: ["equity warrants"], body: "Options, **issued by a corporation**, to buy its stock at a set price at some time in the future.", cite: WARRANT },
      { kind: "idea", title: "Why a warrant is a hybrid", body: "Issued by the corporation, it is a **financial asset**. Its value depends on the stock, so it is **like a derivative**.", cite: WARRANT_DER },
      { kind: "definition", term: "Convertible bonds", body: "Bonds the holder can **exchange for stock** under some circumstances.", cite: CONV },
      {
        kind: "see",
        title: "Taking a convertible bond apart",
        illus: Convertible,
        beats: [
          { text: "Start with a **straight bond**: coupons, then principal. It is a financial asset." },
          { text: "Add an **option** to exchange the bond for stock. That part is a derivative." },
          { text: "Put them together: a **convertible bond**.", cite: CONV_SUM },
          { text: "The option's value depends on the bond **and the stock**. If exchanging pays, the holder swaps the bond for shares.", cite: CONV_PARTS },
        ],
      },
      {
        kind: "choice",
        q: "A convertible bond is the combination of…",
        options: ["a straight bond plus an option to exchange it for stock", "a stock plus a put option", "two zero-coupon bonds", "a futures contract plus a swap"],
        answer: 0,
        why: "Straight bond (financial asset) + option to exchange for stock (derivative properties).",
        cite: CONV_SUM,
      },
      {
        kind: "multi",
        q: "Why is an equity warrant a **financial asset**? Select the book's reasons.",
        options: ["A corporation issues it", "It represents ownership of the corporation's assets in some circumstances", "Its value depends on the stock", "It is cash settled"],
        answer: [0, 1],
        why: "Those two make it a financial asset. Depending on the stock's value is what makes it like a derivative.",
        cite: WARRANT_FIN,
      },
      {
        kind: "truefalse",
        q: "Oil-linked bonds are derivative contracts only, not financial assets.",
        answer: false,
        why: "They are financial assets (ownership of the firm's assets in bankruptcy) that also behave like derivatives through the oil link.",
        cite: OIL_FIN,
      },
      {
        kind: "match",
        q: "Match each hybrid to its two parts.",
        pairs: [
          ["Oil-linked bond", "Bond + oil price link"],
          ["Equity warrant", "Issued option on its stock"],
          ["Convertible bond", "Straight bond + option"],
        ],
        cite: HYB,
      },
      { kind: "quote", lead: "Harris admits the categories are fuzzy (box “Shall We Quibble?”):", cite: QUIB_ARB, mark: ["somewhat arbitrary"] },
      { kind: "idea", title: "Reserved words", body: "**Zero net supply** is reserved for contracts that **public traders can create by selling**, not for stocks or bonds an issuer creates.", cite: QUIB_ZNS },
      {
        kind: "truefalse",
        q: "Harris calls stocks derivative instruments because stock values are correlated with bond values.",
        answer: false,
        why: "He reserves “derivative” for values that depend on other instruments directly, through a contract, not through common valuation factors.",
        cite: QUIB_DER,
      },
      {
        kind: "recap",
        points: [
          { text: "**Hybrids** mix instrument types: oil-linked bonds, warrants, convertibles.", cite: HYB },
          { text: "A **convertible** = straight bond + option to exchange it for stock.", cite: CONV_SUM },
          { text: "Oil-linked bonds are financial assets and also **derivatives** through oil.", cite: OIL_DER },
        ],
      },
    ],
  },
];

export const U33B_CHECKPOINT: Question[] = [
  {
    kind: "choice",
    q: "Which of these is **not** one of the derivative contracts the book lists?",
    options: ["Common stocks", "Forward contracts", "Futures contracts", "Swaps"],
    answer: 0,
    why: "The book lists forwards, futures, options and swaps. Stocks are financial assets.",
    cite: D_TYPES,
  },
  {
    kind: "fill",
    q: "Contracts that do not expire are ___ lived.",
    bank: ["infinitely", "perpetually", "eternally", "indefinitely"],
    answer: ["infinitely"],
    why: "The book's term is “infinitely lived”, and none have been notably successful.",
    cite: INF_DEF,
  },
  {
    kind: "truefalse",
    q: "An American-style option can be exercised any time before the expiration date.",
    answer: true,
    why: "European-style options can be exercised only on the expiration date.",
    cite: STYLE,
  },
];
