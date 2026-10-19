// 3.3 TRADING INSTRUMENTS, part A: 3.3 intro, 3.3.1 Real Assets, 3.3.2 Financial Assets (pp. 38–41)
import type { Cite, Lesson, Question } from "../types.ts";
import {
  BondQuote,
  CmoWaterfall,
  CreditQuality,
  FinancialAssetSheet,
  Fungible,
  InstrumentClasses,
  PreferredFirst,
  PrimarySecondary,
  RealAssetSheet,
  Stripping,
  Underwriting,
  Wrappers,
} from "./illus/u33a.tsx";
import { ClassRush } from "./games/ClassRush.tsx";
import { Waterfall } from "./games/Waterfall.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 3.3 and Table 3-3 ─────────────────────────────────────────────
const INSTR = c(38, "3.3", "The securities, contracts, commodities, and currencies that traders trade are collectively known as trading instruments.");
const KINDS = c(38, "3.3", "They include real assets, financial assets, derivative contracts, insurance contracts, and gambling contracts.");
const FIN_INSTR = c(38, "3.3", "Financial instruments include financial assets, derivative contracts, and insurance contracts.");
const T33 = (t: string): Cite => c(38, "3.3", t, { table: "Table 3-3" });
const T_REAL = T33("Real assets: Spot commodities, Intellectual properties, Real estate, Pollution emission rights. Creators: Farmers, miners, manufacturers; Inventors and artists; Builders; Governments.");
const T_FIN = T33("Financial assets: Stocks and warrants, Bonds, Trust units, Currencies. Creators: Corporate issuers; governments; Trusts; banks.");
const T_DER = T33("Derivative contracts: Futures contracts, Forward contracts, Options, Swaps. Creators: Sellers.");
const T_INS = T33("Insurance contracts: Insurance policies, Reinsurance contracts. Creators: Corporations.");
const T_HYB = T33("Hybrid instruments: Warrants, Index linked bonds, Convertible bonds. Creators: Corporate issuers.");
const T_GAM = T33("Gambling contracts: Numerous types. Creators: Individuals, Bookies, Casinos, Racetracks.");
const T_CREATORS = T33("Spot commodities: Farmers, miners, manufacturers · Real estate: Builders · Pollution emission rights: Governments · Futures contracts: Sellers · Insurance policies: Corporations");
const T_SORT = T33("Real assets: Real estate, Intellectual properties, Pollution emission rights · Financial assets: Bonds, Currencies · Derivative contracts: Options, Swaps · Insurance contracts: Reinsurance contracts");

// ── Excerpts: 3.3.1 ─────────────────────────────────────────────────────────
const REAL = c(39, "3.3.1", "Real assets include physical commodities, real estate, machines, patents, and other intellectual properties.");
const POLLUTION = c(39, "3.3.1", "Real assets also include pollution credits, which are rights to emit a specified quantity of a given type of pollution.");
const ASSET_SIDE = c(39, "3.3.1", "Real assets are instruments that would appear only on the asset side of a balance sheet.");
const LIQUID_REAL = c(39, "3.3.1", "The real assets that trade in the most liquid markets are industrial and precious metals, agricultural commodities, fuels, and pollution credits.");
const FUNGIBLE = c(39, "3.3.1", "These instruments generally are quite fungible: One unit is very similar, if not identical, to all other units.");
const PRICE_QUALITY = c(39, "3.3.1", "Traders in these commodities generally are more concerned about price than about quality variations. They usually can easily adjust prices for any quality variations.");

// ── Excerpts: 3.3.2 ─────────────────────────────────────────────────────────
const FIN_ASSETS = c(39, "3.3.2", "Financial assets are instruments that represent ownership of real assets and the cash flows that they produce.");
const HOLDERS = c(39, "3.3.2", "Stockholders own the assets of a corporation after all creditors have been paid off. Bondholders own the assets of a corporation if the corporation defaults on its creditors and becomes bankrupt.");
const OTHER_FIN = c(39, "3.3.2", "Other financial assets include currencies, warehouse receipts that represent ownership of physical commodities, and trust units that represent ownership of the assets of a trust.");
const ISSUERS = c(39, "3.3.2", "Issuers create all financial assets. Corporations issue stocks, bonds, and warrants. Governments issue currencies and bonds. Warehouses issue commodity receipts. Trusts issue trust units.");
const ISSUES = c(39, "3.3.2", "Many securities are called issues because issuers issue them.");
const BOTH_SIDES = c(39, "3.3.2", "A financial asset appears as a liability on the issuer's balance sheet and as an asset on the holders' balance sheet.");
const PRIMARY = c(39, "3.3.2", "Issues trade in primary markets when issuers first create and sell them. Subsequent trading occurs in secondary markets.");
const SEASONED = c(39, "3.3.2", "New issues become seasoned securities after they are issued. Traders therefore trade new issues in primary markets and seasoned issues in secondary markets.");
const IPO = c(39, "3.3.2", "Traders say that primary trading in new equity issues takes place in the initial public offering (IPO) market.");
const SPOT = c(39, "3.3.2", "Commodities and currencies trade for immediate delivery in spot markets. They trade for future delivery in forward markets or futures markets.");
const UW = c(39, "3.3.2", "Underwriters are broker-dealers at investment banks who find buyers for the securities.");
const BEST = c(39, "3.3.2", "In a best efforts offering, the underwriter acts strictly as a broker.");
const UWD = c(39, "3.3.2", "In an underwritten offering, the underwriter guarantees the issuer an offering price.");
const UWD2 = c(39, "3.3.2", "If the underwriter cannot find buyers for the securities at the offering price, the underwriter buys them for its own account.");
const FIXED = c(39, "3.3.2", "In a fixed-price open offering, the underwriter sets a price and buyers subscribe to the offering.");
const LOTTERY = c(39, "3.3.2", "If the offering is oversubscribed, the underwriter conducts a lottery to allocate the shares.");
const FEES = c(39, "3.3.2", "Underwriters generally charge issuers fees for their services.");

// ── Excerpts: 3.3.2.1 equities ──────────────────────────────────────────────
const S = "3.3.2.1";
const STOCKS = c(39, S, "Stocks represent ownership of corporate assets, net of corporate liabilities. Stock values depend on corporate assets, liabilities, and income.");
const MANAGERS = c(40, S, "…depend critically on how well traders expect corporate managers will use corporate assets in the future.");
const PREFERRED = c(40, S, "Preferred stocks are stocks that pay dividends at contractually specified rates.");
const PREF_FIRST = c(40, S, "Corporations must pay all accrued dividends on preferred stocks before they can pay any dividends on common stock.");
const ADR = c(40, S, "American depository receipts (ADRs) are trust units that traders use to trade foreign stocks in U.S. markets. Each trust holds only the stock of a single foreign company.");
const ADR_WHY = c(40, S, "ADRs are popular because they allow traders to avoid international settlement problems.");
const ETF = c(40, S, "Exchange-traded funds (ETFs) are mutual funds that trade at exchanges.");
const ETF_INDEX = c(40, S, "Most ETFs are index funds that try to mimic the returns of a market or industry index.");
const REIT = c(40, S, "Real estate investment trusts (REITs) are trusts that own real estate.");
const REIT2 = c(40, S, "By securitizing real estate, they allow investors and speculators to trade real estate interests like common stock shares.");

// ── Excerpts: 3.3.2.1 debt instruments ──────────────────────────────────────
const BONDS = c(40, S, "Bonds are debt securities issued by corporations, governments, and occasionally individuals. Debtors create bonds when they borrow money.");
const BOND_VALUE = c(40, S, "Bond values depend on interest rates, issuer creditworthiness, assets pledged as collateral, and attached options.");
const PAR = c(40, S, "Traders usually quote bond prices as a percentage of their par value. For example, the price of a million-dollar Treasury bond quoted at 97 is 970,000 dollars.");
const STRAIGHT = c(40, S, "A straight bond is a bond that pays interest periodically until it matures. At maturity, the issuer redeems the bond for its principal or face value.");
const CREDIT = c(40, S, "Credit quality, the probability that a bond issuer will make all bond payments when they are due, greatly concerns bond investors.");
const INV_GRADE = c(40, S, "Investors expect that the issuers of investment grade bonds will make all interest and principal payments on time.");
const JUNK = c(40, S, "The interest and principal payments on junk bonds are less certain. The latter are also called high yield bonds because investors require high yields to compensate for the probability that the issuers will default on their payments.");
const TREAS = c(40, S, "Treasury bills, Treasury notes, and Treasury bonds are debt securities issued by a country.");
const MATURITIES = c(40, S, "Bills normally mature in one year or less. Notes normally mature two to five years after they are issued, and bonds normally mature ten or more years after they are issued.");
const BILLS = c(40, S, "Bills do not pay interest. Instead, they sell at a discount from their face value.");
const ZERO = c(40, S, "Zero coupon bonds pay no interest. They simply return their principal value at maturity.");
const PURE = c(40, S, "Since they pay no interest, buyers will buy them only at a discount from their face value. Zero coupon bonds therefore are also known as pure discount bonds.");
const DISCOUNT = c(40, S, "The greater the time to maturity, the greater the discount.");
const BUNDLE = c(40, S, "A straight bond is equivalent to a bundle of zero coupon bonds consisting of one zero-coupon bond due on each interest payment date plus a zero-coupon bond due when the straight bond matures.");
const STRIP_BOX = { box: "Stripping Bonds" };
const STRIP_WHY = c(40, S, "When traders want more zero-coupon bonds than are available, zero-coupon bonds become expensive relative to straight bonds.", STRIP_BOX);
const STRIP_HOW = c(40, S, "Fixed income arbitrageurs then buy straight bonds and clip the coupons.", STRIP_BOX);
const STRIP_SELL = c(40, S, "They bundle the coupons by their interest payment dates and sell the bundles and the remaining final principal payments as zero coupon bonds.", STRIP_BOX);
const STRIP_NAME = c(40, S, "Traders call this process stripping a bond.", STRIP_BOX);
const CP = c(40, S, "Commercial paper is a short-term debt security issued by a corporation. Commercial paper usually matures in nine months or less from the date it is issued.");

// ── Excerpts: 3.3.2.1 mortgage-backed securities ────────────────────────────
const MBS = c(41, S, "Mortgage-backed securities are bondlike instruments which receive the mortgage payments that borrowers make on their mortgages.");
const POOL = c(41, S, "The securities are backed by a specified set of mortgages called a mortgage pool.");
const PASS = c(41, S, "Since they receive the mortgage payments as they are paid, they are examples of pass-through securities.");
const CMO = c(41, S, "Collateralized mortgage obligations (CMOs) are mortgage-backed securities that divide rights to the cash flows from the mortgage pool into several different tranches.");
const FIRST_TR = c(41, S, "The first tranche has the highest claim on the mortgage payments and therefore is the least risky. When its claims are satisfied, the next tranche is paid, and so on until the available funds are exhausted.");
const Z_TR = c(41, S, "The last tranche, which is usually called the Z tranche, gets whatever is left over. It is obviously the most risky tranche.");
const REMIC = c(41, S, "CMOs are also called real estate mortgage investment conduits (REMICs).");
const CMO_WHY = c(41, S, "Companies issue CMOs to distribute mortgage prepayment risk and interest rate risk among investors with varying degrees of risk tolerance.");
const FIXED_INC = c(41, S, "All debt instruments are collectively known as fixed-income products.");
const TOXIC_BOX = { box: "Toxic Waste" };
const TOXIC = c(41, S, "The riskiest CMO tranches are called toxic waste because no one wants to hold them. They typically sell at highly discounted prices.", TOXIC_BOX);
const TOXIC_ZERO = c(41, S, "Toxic waste is worthless, however, if too many borrowers default.", TOXIC_BOX);

export const U33A_LESSONS: Lesson[] = [
  // ── 3.3 intro ───────────────────────────────────────────────────────────
  {
    id: "3.3-classes",
    sec: "3.3",
    title: "What traders trade",
    pages: "38",
    steps: [
      { kind: "definition", term: "Trading instruments", body: "Everything traders trade: **securities, contracts, commodities and currencies**.", cite: INSTR },
      {
        kind: "idea",
        title: "Five kinds of instrument",
        body: "**Real assets**, **financial assets**, **derivative contracts**, **insurance contracts** and **gambling contracts**.",
        cite: KINDS,
      },
      {
        kind: "see",
        title: "Table 3-3, one class at a time",
        illus: InstrumentClasses,
        beats: [
          { text: "**Real assets**: commodities, intellectual property, real estate, pollution rights. Farmers, inventors, builders and governments create them.", cite: T_REAL },
          { text: "**Financial assets**: stocks, bonds, trust units, currencies. **Issuers** create them: corporations, governments, trusts, banks.", cite: T_FIN },
          { text: "**Derivative contracts**: futures, forwards, options, swaps. Whoever **sells** one creates it.", cite: T_DER },
          { text: "**Insurance contracts**: policies and reinsurance, created by corporations.", cite: T_INS },
          { text: "**Hybrid instruments** mix types: warrants, index linked bonds, convertible bonds.", cite: T_HYB },
          { text: "**Gambling contracts** come in numerous types, created by individuals, bookies, casinos and racetracks.", cite: T_GAM },
          { text: "Three of these classes together are called **financial instruments**.", cite: FIN_INSTR },
        ],
      },
      {
        kind: "multi",
        q: "Which classes count as **financial instruments**?",
        options: ["Financial assets", "Derivative contracts", "Insurance contracts", "Real assets", "Gambling contracts"],
        answer: [0, 1, 2],
        why: "Financial instruments = financial assets + derivative contracts + insurance contracts. Real assets and gambling contracts are not on the list.",
        cite: FIN_INSTR,
      },
      {
        kind: "match",
        q: "Who creates it? (Table 3-3)",
        pairs: [
          ["Spot commodities", "Farmers, miners, manufacturers"],
          ["Real estate", "Builders"],
          ["Pollution rights", "Governments"],
          ["Futures contracts", "Sellers"],
          ["Insurance policies", "Corporations"],
        ],
        cite: T_CREATORS,
      },
      {
        kind: "classify",
        q: "Which class? (Table 3-3)",
        buckets: ["Real assets", "Financial assets", "Derivative contracts", "Insurance contracts"],
        items: [
          { text: "Real estate", bucket: 0 },
          { text: "Bonds", bucket: 1 },
          { text: "Options", bucket: 2 },
          { text: "Reinsurance contracts", bucket: 3 },
          { text: "Intellectual properties", bucket: 0 },
          { text: "Currencies", bucket: 1 },
          { text: "Swaps", bucket: 2 },
          { text: "Pollution emission rights", bucket: 0 },
        ],
        cite: T_SORT,
      },
      {
        kind: "truefalse",
        q: "In Table 3-3, derivative contracts are created by the traders who **sell** them.",
        answer: true,
        why: "The creators column for futures, forwards, options and swaps reads “Sellers”.",
        cite: T_DER,
      },
      {
        kind: "game",
        id: "class-rush",
        title: "Class rush",
        brief: "Instruments from Table 3-3 appear one by one. Tap the right **class** before the clock runs out. Keys **1–6** work too.",
        game: ClassRush,
      },
      {
        kind: "recap",
        points: [
          { text: "**Trading instruments** = securities, contracts, commodities and currencies.", cite: INSTR },
          { text: "Classes: real assets, financial assets, derivatives, insurance, gambling (plus **hybrids**).", cite: KINDS },
          { text: "**Financial instruments** = financial assets + derivatives + insurance contracts.", cite: FIN_INSTR },
        ],
      },
    ],
  },

  // ── 3.3.1 Real assets ───────────────────────────────────────────────────
  {
    id: "3.3.1-real-assets",
    sec: "3.3.1",
    title: "Real assets",
    pages: "39",
    steps: [
      { kind: "definition", term: "Real assets", body: "Physical things and ideas you can own: **commodities, real estate, machines, patents** and other intellectual property.", cite: REAL },
      { kind: "definition", term: "Pollution credits", body: "Rights to **emit** a set quantity of a given type of pollution. They are real assets too.", cite: POLLUTION },
      { kind: "idea", title: "Only one side of the balance sheet", body: "A real asset is **someone's asset and nobody's liability**.", cite: ASSET_SIDE },
      {
        kind: "see",
        title: "Where a real asset shows up",
        illus: RealAssetSheet,
        beats: [
          { text: "A farmer owns wheat, a tractor and a patent. All three sit on the **asset side** of her balance sheet." },
          { text: "Look for the matching liability: there is none. **Nobody owes** a tractor.", cite: ASSET_SIDE },
        ],
      },
      {
        kind: "truefalse",
        q: "A patent is a real asset.",
        answer: true,
        why: "Real assets include patents and other intellectual properties.",
        cite: REAL,
      },
      {
        kind: "fill",
        q: "A pollution credit is a right to ___ a specified quantity of a given type of pollution.",
        bank: ["emit", "clean up", "tax", "measure"],
        answer: ["emit"],
        why: "Pollution credits are rights to emit pollution, which is why firms trade them.",
        cite: POLLUTION,
      },
      { kind: "definition", term: "Fungible", body: "Every unit is **very similar, if not identical,** to every other unit, so any unit will do.", cite: FUNGIBLE },
      {
        kind: "see",
        title: "Why fungible assets trade easily",
        illus: Fungible,
        beats: [
          { text: "Five ounces of silver. Each unit is very similar, if not identical, to the others.", cite: FUNGIBLE },
          { text: "Swap any two and nothing changes. Buyers don't care **which** unit they get." },
          { text: "If one unit is slightly worse, traders simply **adjust the price**. They watch price more than quality.", cite: PRICE_QUALITY },
        ],
      },
      {
        kind: "multi",
        q: "Which real assets trade in the **most liquid** markets?",
        options: ["Industrial and precious metals", "Agricultural commodities", "Fuels", "Pollution credits", "Patents", "Office buildings"],
        answer: [0, 1, 2, 3],
        why: "These are fungible, so traders can focus on price. Patents and buildings are not on the book's list.",
        cite: LIQUID_REAL,
      },
      {
        kind: "choice",
        q: "Why do traders of fungible commodities care more about price than about quality?",
        options: [
          "Units are nearly identical, and they can easily adjust prices for quality differences",
          "Exchanges forbid any quality differences",
          "Quality is always identical by law",
          "Prices of commodities never change",
        ],
        answer: 0,
        why: "Fungibility plus easy price adjustments for quality let traders focus on price.",
        cite: PRICE_QUALITY,
      },
      {
        kind: "recap",
        points: [
          { text: "**Real assets**: commodities, real estate, machines, patents, pollution credits.", cite: REAL },
          { text: "They appear **only on the asset side** of a balance sheet.", cite: ASSET_SIDE },
          { text: "The most liquid ones are **fungible**: any unit will do.", cite: FUNGIBLE },
        ],
      },
    ],
  },

  // ── 3.3.2 Financial assets ──────────────────────────────────────────────
  {
    id: "3.3.2-financial-assets",
    sec: "3.3.2",
    title: "Financial assets",
    pages: "39",
    steps: [
      { kind: "definition", term: "Financial assets", body: "Instruments that represent **ownership** of real assets and of the **cash flows** those assets produce.", cite: FIN_ASSETS },
      {
        kind: "idea",
        title: "Stockholders vs bondholders",
        body: "**Stockholders** own what is left after all creditors are paid. **Bondholders** own the assets if the company defaults and goes bankrupt.",
        cite: HOLDERS,
      },
      { kind: "definition", term: "Issuers", body: "They create **all** financial assets: corporations, governments, warehouses and trusts.", cite: ISSUERS },
      { kind: "idea", title: "Both sides of the balance sheet", body: "A financial asset is the **issuer's liability** and the **holder's asset** at the same time.", cite: BOTH_SIDES },
      {
        kind: "see",
        title: "One bond, two balance sheets",
        illus: FinancialAssetSheet,
        beats: [
          { text: "A corporation issues a bond. The promise to pay shows up on its **liability** side." },
          { text: "An investor pays cash for the bond: the cash goes to the corporation while the bond goes to the investor." },
          { text: "The same bond now sits on **both** sheets: a liability for the issuer, an asset for the holder.", cite: BOTH_SIDES },
        ],
      },
      {
        kind: "truefalse",
        q: "The bond you hold is an asset for you and a liability for the company that issued it.",
        answer: true,
        why: "Financial assets appear on both sides of a balance sheet: the issuer's liability, the holder's asset.",
        cite: BOTH_SIDES,
      },
      {
        kind: "match",
        q: "Who issues what?",
        pairs: [
          ["Corporations", "Stocks, bonds, warrants"],
          ["Governments", "Currencies and bonds"],
          ["Warehouses", "Commodity receipts"],
          ["Trusts", "Trust units"],
        ],
        cite: ISSUERS,
      },
      {
        kind: "choice",
        q: "A corporation defaults on its creditors and goes bankrupt. Who owns its assets?",
        options: ["The bondholders", "The stockholders", "Its underwriter", "The exchange that lists it"],
        answer: 0,
        why: "Bondholders own the assets if the corporation defaults; stockholders own only what is left after creditors are paid.",
        cite: HOLDERS,
      },
      {
        kind: "classify",
        q: "Real asset or financial asset?",
        buckets: ["Real asset", "Financial asset"],
        items: [
          { text: "A warehouse receipt for wheat", bucket: 1, why: "It represents ownership of the wheat." },
          { text: "A tractor", bucket: 0 },
          { text: "A trust unit", bucket: 1, why: "It represents ownership of the trust's assets." },
          { text: "A patent", bucket: 0 },
          { text: "A banknote (currency)", bucket: 1 },
          { text: "A corporate bond", bucket: 1 },
          { text: "Farmland", bucket: 0 },
        ],
        cite: OTHER_FIN,
      },
      {
        kind: "fill",
        q: "Many securities are called ___ because issuers issue them.",
        bank: ["issues", "assets", "claims", "notes"],
        answer: ["issues"],
        why: "That is where the word comes from.",
        cite: ISSUES,
      },
      {
        kind: "recap",
        points: [
          { text: "**Financial assets** represent ownership of real assets and their cash flows.", cite: FIN_ASSETS },
          { text: "**Issuers** create all of them.", cite: ISSUERS },
          { text: "Each one is the issuer's **liability** and the holder's **asset**.", cite: BOTH_SIDES },
        ],
      },
    ],
  },

  // ── 3.3.2 Primary, secondary and spot markets ───────────────────────────
  {
    id: "3.3.2-markets",
    sec: "3.3.2",
    title: "Primary, secondary and spot markets",
    pages: "39",
    steps: [
      { kind: "definition", term: "Primary market", body: "Where an issue trades when the issuer **first creates and sells** it.", cite: PRIMARY, },
      { kind: "definition", term: "Secondary market", body: "Where all **later** trading in the issue happens.", cite: PRIMARY },
      { kind: "definition", term: "Seasoned securities", body: "What new issues become **after** they have been issued. They trade in secondary markets.", cite: SEASONED },
      {
        kind: "see",
        title: "From new issue to seasoned issue",
        illus: PrimarySecondary,
        beats: [
          { text: "The issuer creates new shares and sells them to Ann: shares go one way, cash the other, at the same time." },
          { text: "For new **equity**, traders call this primary market the **IPO market**.", cite: IPO },
          { text: "A year later Ann sells her now **seasoned** shares to Ben." },
          { text: "That later trade happens in the **secondary market**, between investors.", cite: SEASONED },
        ],
      },
      {
        kind: "choice",
        q: "Ana buys shares from Ben on an exchange, a year after the company's IPO. Which market is this?",
        options: ["The secondary market", "The primary market", "The IPO market", "A spot commodity market"],
        answer: 0,
        why: "Seasoned issues trade in secondary markets; only the first sale by the issuer is primary.",
        cite: SEASONED,
      },
      {
        kind: "truefalse",
        q: "New issues trade in secondary markets and seasoned issues trade in primary markets.",
        answer: false,
        why: "It is the other way round: new issues in primary markets, seasoned issues in secondary markets.",
        cite: SEASONED,
      },
      {
        kind: "fill",
        q: "Primary trading in new equity issues takes place in the ___ market.",
        bank: ["initial public offering (IPO)", "secondary", "spot", "futures"],
        answer: ["initial public offering (IPO)"],
        why: "Traders call the primary market for new stock the IPO market.",
        cite: IPO,
      },
      {
        kind: "definition",
        term: "Spot markets",
        body: "Where commodities and currencies trade for **immediate delivery**. For **future** delivery they trade in forward or futures markets.",
        cite: SPOT,
      },
      {
        kind: "classify",
        q: "Spot market, or forward / futures market?",
        buckets: ["Spot", "Forward or futures"],
        items: [
          { text: "Buy euros at the airport counter today", bucket: 0 },
          { text: "Agree now on a price for wheat delivered in March", bucket: 1 },
          { text: "Buy copper for delivery right away", bucket: 0 },
          { text: "Lock in next year's price for jet fuel", bucket: 1 },
        ],
        cite: SPOT,
      },
      {
        kind: "recap",
        points: [
          { text: "**Primary market**: the issuer's first sale (the **IPO market** for new stock).", cite: IPO },
          { text: "**Secondary market**: all later trading in **seasoned** issues.", cite: SEASONED },
          { text: "**Spot** = immediate delivery; **forward/futures** = future delivery.", cite: SPOT },
        ],
      },
    ],
  },

  // ── 3.3.2 Underwriting ──────────────────────────────────────────────────
  {
    id: "3.3.2-underwriting",
    sec: "3.3.2",
    title: "Underwriters and offerings",
    pages: "39",
    steps: [
      { kind: "definition", term: "Underwriters", body: "**Broker-dealers at investment banks** who find buyers for an issuer's new securities.", cite: UW },
      { kind: "definition", term: "Best efforts offering", body: "The underwriter acts **strictly as a broker**: it looks for buyers, nothing more.", cite: BEST },
      { kind: "definition", term: "Underwritten offering", body: "The underwriter **guarantees** the issuer an offering price.", cite: UWD },
      { kind: "definition", term: "Fixed-price open offering", body: "The underwriter **sets a price** and buyers **subscribe** to the offering.", cite: FIXED },
      {
        kind: "see",
        title: "Three ways to sell a new issue",
        illus: Underwriting,
        beats: [
          { text: "**Best efforts**: the bank finds buyers for 7 of 10 blocks. As a pure broker, it doesn't take the rest. (Illustrative numbers.)", cite: BEST },
          { text: "**Underwritten**: the bank sells 7 blocks and **buys the other 3 for its own account**, so the issuer gets its price.", cite: UWD2 },
          { text: "**Fixed-price open**: buyers subscribe at the set price. 15 ask for 10 blocks, so a **lottery** decides.", cite: LOTTERY },
          { text: "In every case, the underwriter charges the issuer **fees**.", cite: FEES },
        ],
      },
      {
        kind: "classify",
        q: "Which kind of offering?",
        buckets: ["Best efforts", "Underwritten", "Fixed-price open"],
        items: [
          { text: "The bank buys unsold shares for its own account", bucket: 1 },
          { text: "The bank acts strictly as a broker", bucket: 0 },
          { text: "Too many orders: a lottery allocates the shares", bucket: 2 },
          { text: "The issuer is guaranteed an offering price", bucket: 1 },
          { text: "Buyers subscribe at a price the bank set", bucket: 2 },
        ],
        cite: UWD,
      },
      {
        kind: "choice",
        q: "In an underwritten offering, what happens to shares the underwriter cannot sell at the offering price?",
        options: ["It buys them for its own account", "They go back to the issuer", "They are cancelled", "They are sold by lottery"],
        answer: 0,
        why: "That is what the guarantee means: the underwriter keeps the unsold securities.",
        cite: UWD2,
      },
      {
        kind: "truefalse",
        q: "In a best efforts offering, the underwriter guarantees the issuer a price.",
        answer: false,
        why: "In a best efforts offering the underwriter acts strictly as a broker. The guarantee belongs to underwritten offerings.",
        cite: BEST,
      },
      {
        kind: "number",
        q: "Underwritten offering: 1,000,000 shares at a guaranteed price. The underwriter finds buyers for 800,000. How many shares must it buy for its own account?",
        answer: 200000,
        unit: "shares",
        illustrative: true,
        why: "1,000,000 − 800,000 = 200,000 shares stay with the underwriter.",
        cite: UWD2,
      },
      {
        kind: "fill",
        q: "If the offering is ___, the underwriter conducts a lottery to allocate the shares.",
        bank: ["oversubscribed", "undersubscribed", "cancelled", "delayed"],
        answer: ["oversubscribed"],
        why: "More subscriptions than shares means a lottery.",
        cite: LOTTERY,
      },
      {
        kind: "recap",
        points: [
          { text: "**Best efforts**: the underwriter is only a broker.", cite: BEST },
          { text: "**Underwritten**: price guaranteed; the underwriter buys what it can't sell.", cite: UWD2 },
          { text: "**Fixed-price open**: buyers subscribe; a lottery if oversubscribed.", cite: LOTTERY },
        ],
      },
    ],
  },

  // ── 3.3.2.1 Equities ────────────────────────────────────────────────────
  {
    id: "3.3.2.1-equities",
    sec: "3.3.2.1",
    title: "Stocks, preferred, ADRs, ETFs, REITs",
    pages: "39–40",
    steps: [
      { kind: "definition", term: "Stocks", body: "Ownership of a corporation's **assets, net of its liabilities**. Their value follows assets, liabilities and income.", cite: STOCKS },
      { kind: "idea", title: "Stocks also price the future", body: "Stock values depend critically on how well traders expect **managers will use** the company's assets.", cite: MANAGERS },
      { kind: "definition", term: "Preferred stocks", body: "Stocks that pay dividends at **contractually specified rates**.", cite: PREFERRED },
      {
        kind: "see",
        title: "Who gets dividends first",
        illus: PreferredFirst,
        beats: [
          { text: "A corporation has cash to pay out as dividends." },
          { text: "**Preferred** holders come first: all their accrued dividends are paid.", cite: PREF_FIRST },
          { text: "Only then can **common** stockholders receive any dividend." },
          { text: "If cash is short, common holders get **nothing** until the preferred arrears are paid.", cite: PREF_FIRST },
        ],
      },
      {
        kind: "truefalse",
        q: "A corporation may pay a common stock dividend while it still owes accrued preferred dividends.",
        answer: false,
        why: "All accrued preferred dividends must be paid before any common dividend.",
        cite: PREF_FIRST,
      },
      { kind: "definition", term: "ADRs", aka: ["American depository receipts"], body: "**Trust units** that let traders trade a **foreign stock** in U.S. markets. Each trust holds one foreign company's stock.", cite: ADR },
      { kind: "definition", term: "ETFs", aka: ["exchange-traded funds"], body: "**Mutual funds** that trade at exchanges. Most are index funds.", cite: ETF },
      { kind: "definition", term: "REITs", aka: ["real estate investment trusts"], body: "**Trusts that own real estate**, so investors can trade property interests like stock.", cite: REIT },
      {
        kind: "see",
        title: "Three wrappers",
        illus: Wrappers,
        beats: [
          { text: "**ADR**: a trust holds the stock of **one** foreign company and issues units that trade in the U.S.", cite: ADR_WHY },
          { text: "**ETF**: a mutual fund holds an index basket; its shares trade at an exchange.", cite: ETF_INDEX },
          { text: "**REIT**: a trust owns real estate; its units trade like common stock.", cite: REIT2 },
        ],
      },
      {
        kind: "match",
        q: "Match each equity to what it is.",
        pairs: [
          ["ADR", "A foreign stock, traded in the U.S."],
          ["ETF", "A mutual fund trading at an exchange"],
          ["REIT", "A trust that owns real estate"],
          ["Preferred stock", "Dividends at a contractual rate"],
        ],
        cite: ADR,
      },
      {
        kind: "choice",
        q: "Why are ADRs popular?",
        options: ["They let traders avoid international settlement problems", "They pay guaranteed dividends", "They are free of all risk", "They are issued by the U.S. Treasury"],
        answer: 0,
        why: "Trading the foreign stock through a U.S. trust sidesteps international settlement.",
        cite: ADR_WHY,
      },
      {
        kind: "choice",
        q: "What do most ETFs try to do?",
        options: ["Mimic the returns of a market or industry index", "Beat the market by stock picking", "Hold a single foreign company", "Own real estate"],
        answer: 0,
        why: "Most ETFs are index funds.",
        cite: ETF_INDEX,
      },
      {
        kind: "recap",
        points: [
          { text: "**Stocks**: ownership of assets net of liabilities.", cite: STOCKS },
          { text: "**Preferred** dividends (all accrued ones) come before any **common** dividend.", cite: PREF_FIRST },
          { text: "**ADRs**, **ETFs** and **REITs** package a holding into tradable units.", cite: ETF },
        ],
      },
    ],
  },

  // ── 3.3.2.1 Bonds ───────────────────────────────────────────────────────
  {
    id: "3.3.2.1-bonds",
    sec: "3.3.2.1",
    title: "Bonds, quotes and credit quality",
    pages: "40",
    steps: [
      { kind: "definition", term: "Bonds", body: "**Debt securities.** A debtor creates a bond when it **borrows money**.", cite: BONDS },
      {
        kind: "multi",
        q: "Bond values depend on… (select all that apply)",
        options: ["Interest rates", "Issuer creditworthiness", "Assets pledged as collateral", "Attached options", "The bond's printing date"],
        answer: [0, 1, 2, 3],
        why: "The book lists four drivers: interest rates, creditworthiness, collateral and attached options.",
        cite: BOND_VALUE,
      },
      { kind: "idea", title: "Quotes are a percentage of par", body: "A bond quoted at **97** costs **97% of its par value**: $970,000 for a million-dollar bond.", cite: PAR },
      {
        kind: "see",
        title: "Reading a bond quote",
        illus: BondQuote,
        beats: [
          { text: "A Treasury bond with a **par value** of $1,000,000. Quoted at 100, it would cost exactly par." },
          { text: "Quoted at **97**, it costs 97% of par: **$970,000**.", cite: PAR },
          { text: "Quotes can also be above par: at 102.5 the price is $1,025,000. (Our illustration.)" },
        ],
      },
      {
        kind: "number",
        q: "A million-dollar Treasury bond is quoted at 97. What is its price?",
        answer: 970000,
        prefix: "$",
        why: "97% × $1,000,000 = $970,000, the book's own example.",
        cite: PAR,
      },
      {
        kind: "number",
        q: "A bond with a $500,000 par value is quoted at 101.5. What is its price?",
        answer: 507500,
        prefix: "$",
        illustrative: true,
        why: "101.5% × $500,000 = $507,500.",
        cite: PAR,
      },
      { kind: "definition", term: "Straight bond", body: "Pays **interest periodically** until it matures; then the issuer repays the **principal** (face value).", cite: STRAIGHT },
      { kind: "definition", term: "Credit quality", body: "The **probability** that the issuer makes **all** bond payments when they are due.", cite: CREDIT },
      { kind: "definition", term: "Junk bonds", aka: ["high yield bonds"], body: "Bonds whose payments are **less certain**, so investors demand **high yields**.", cite: JUNK },
      {
        kind: "see",
        title: "Investment grade vs junk",
        illus: CreditQuality,
        beats: [
          { text: "**Investment grade**: investors expect every interest and principal payment on time.", cite: INV_GRADE },
          { text: "**Junk**: the same payments are **less certain**. Some may come late, or not at all." },
          { text: "To hold that risk, investors require a **higher yield**. Hence the name high yield bonds.", cite: JUNK },
        ],
      },
      {
        kind: "choice",
        q: "Why are junk bonds also called high yield bonds?",
        options: [
          "Investors require high yields to compensate for the chance of default",
          "They always pay more interest by law",
          "They mature faster than other bonds",
          "Their issuers are governments",
        ],
        answer: 0,
        why: "Less certain payments → investors demand compensation in yield.",
        cite: JUNK,
      },
      {
        kind: "truefalse",
        q: "Investors expect issuers of investment grade bonds to make all interest and principal payments on time.",
        answer: true,
        why: "That expectation is what investment grade means.",
        cite: INV_GRADE,
      },
      {
        kind: "recap",
        points: [
          { text: "Bonds are **debt securities**, quoted as a **% of par** (97 → $970,000 per $1M).", cite: PAR },
          { text: "A **straight bond** pays interest periodically, then principal at maturity.", cite: STRAIGHT },
          { text: "**Credit quality** = chance of being paid; **junk** = less certain, high yield.", cite: CREDIT },
        ],
      },
    ],
  },

  // ── 3.3.2.1 Treasuries, zeros and stripping ─────────────────────────────
  {
    id: "3.3.2.1-zeros",
    sec: "3.3.2.1",
    title: "Treasuries, zeros and stripping",
    pages: "40",
    steps: [
      { kind: "definition", term: "Treasury bills, notes and bonds", body: "**Debt securities issued by a country**, told apart by how long they run.", cite: TREAS },
      {
        kind: "match",
        q: "Match each Treasury security to its usual maturity.",
        pairs: [
          ["Bills", "One year or less"],
          ["Notes", "Two to five years"],
          ["Bonds", "Ten or more years"],
        ],
        cite: MATURITIES,
      },
      { kind: "idea", title: "Bills pay no interest", body: "Instead, Treasury bills **sell at a discount** from their face value.", cite: BILLS },
      { kind: "definition", term: "Zero coupon bonds", aka: ["pure discount bonds"], body: "Pay **no interest**: they just return their principal at maturity, so they sell **at a discount**.", cite: PURE },
      {
        kind: "truefalse",
        q: "A zero coupon bond pays interest every year until it matures.",
        answer: false,
        why: "Zeros pay no interest at all; they simply return their principal at maturity.",
        cite: ZERO,
      },
      { kind: "idea", title: "Further away, deeper discount", body: "The longer until maturity, the **bigger the discount** from face value.", cite: DISCOUNT },
      { kind: "idea", title: "A straight bond is a bundle of zeros", body: "One zero for **each interest payment**, plus one zero for the **principal** at maturity.", cite: BUNDLE },
      {
        kind: "see",
        title: "Stripping a bond",
        illus: Stripping,
        beats: [
          { text: "A straight bond: $1,000 face, a $50 coupon each year for 4 years. (Illustrative.)" },
          { text: "Arbitrageurs **clip the coupons**. Each coupon becomes its own zero coupon bond.", cite: STRIP_HOW },
          { text: "The final **principal** payment is sold as a zero too. The bond is fully stripped.", cite: STRIP_SELL },
          { text: "Each zero sells at a discount, and the later it pays, the **bigger the discount**.", cite: DISCOUNT },
          { text: "Put the pieces back and you have the straight bond again: it **is** a bundle of zeros.", cite: BUNDLE },
        ],
      },
      {
        kind: "number",
        q: "A straight bond pays interest once a year for 5 years, plus its principal at maturity. How many zero coupon bonds is it equivalent to?",
        answer: 6,
        unit: "zeros",
        why: "One zero for each of the 5 interest payments, plus one for the principal: 6.",
        cite: BUNDLE,
      },
      {
        kind: "choice",
        q: "When do fixed income arbitrageurs strip bonds?",
        options: [
          "When zeros become expensive relative to straight bonds",
          "When interest rates are exactly zero",
          "When the issuer defaults",
          "Only when a bond matures",
        ],
        answer: 0,
        why: "Demand for zeros pushes their price up, so it pays to make more of them from straight bonds.",
        cite: STRIP_WHY,
      },
      {
        kind: "truefalse",
        q: "A 10-year zero coupon bond sells at a bigger discount than an otherwise similar 1-year zero.",
        answer: true,
        why: "The greater the time to maturity, the greater the discount.",
        cite: DISCOUNT,
      },
      { kind: "definition", term: "Commercial paper", body: "**Short-term** corporate debt, usually maturing in **nine months or less**.", cite: CP },
      {
        kind: "fill",
        q: "Commercial paper usually matures in ___ or less from the date it is issued.",
        bank: ["nine months", "one year", "five years", "thirty days"],
        answer: ["nine months"],
        why: "Commercial paper is short-term: nine months or less.",
        cite: CP,
      },
      {
        kind: "recap",
        points: [
          { text: "Bills ≤ 1 year, notes 2–5 years, bonds 10+ years; bills sell at a discount.", cite: MATURITIES },
          { text: "**Zeros** (pure discount bonds) pay only principal; longer = deeper discount.", cite: PURE },
          { text: "A straight bond = a bundle of zeros; **stripping** separates them.", cite: STRIP_NAME },
        ],
      },
    ],
  },

  // ── 3.3.2.1 Mortgage-backed securities and CMOs ─────────────────────────
  {
    id: "3.3.2.1-mortgages",
    sec: "3.3.2.1",
    title: "Mortgage-backed securities and CMOs",
    pages: "41",
    steps: [
      { kind: "definition", term: "Mortgage-backed securities", body: "Bondlike instruments that **receive the mortgage payments** borrowers make.", cite: MBS },
      { kind: "definition", term: "Mortgage pool", body: "The specified set of mortgages that **backs** a mortgage-backed security.", cite: POOL },
      { kind: "definition", term: "Pass-through securities", body: "They pass on the mortgage payments **as they are paid**.", cite: PASS },
      { kind: "definition", term: "CMOs", aka: ["collateralized mortgage obligations", "REMICs"], body: "Mortgage-backed securities that split the pool's cash flows into **tranches** with different rights.", cite: CMO },
      { kind: "idea", title: "Tranches are paid in order", body: "The **first tranche** is paid first and is the least risky. The last, the **Z tranche**, gets whatever is left.", cite: FIRST_TR },
      {
        kind: "see",
        title: "The CMO waterfall",
        illus: CmoWaterfall,
        beats: [
          { text: "Borrowers make their mortgage payments into the **pool**. (Illustrative amounts: $100 owed in total.)", cite: MBS },
          { text: "Everyone pays: tranche A fills first, then B, then C, and the **Z tranche** gets what is left.", cite: FIRST_TR },
          { text: "A few borrowers default: only $90 comes in. The shortfall hits the **Z tranche** first.", cite: Z_TR },
          { text: "Many default: $65 comes in. C is short and Z gets nothing. That is why it is called **toxic waste**.", cite: TOXIC_ZERO },
        ],
      },
      {
        kind: "choice",
        q: "Which CMO tranche is the least risky?",
        options: ["The first tranche", "The Z tranche", "The middle tranche", "They are all equally risky"],
        answer: 0,
        why: "The first tranche has the highest claim on the mortgage payments.",
        cite: FIRST_TR,
      },
      {
        kind: "truefalse",
        q: "The Z tranche is paid before the other tranches.",
        answer: false,
        why: "It is paid last and gets whatever is left over, which makes it the riskiest tranche.",
        cite: Z_TR,
      },
      {
        kind: "game",
        id: "cmo-waterfall",
        title: "Pour the waterfall",
        brief: "Five rounds. Each round tells you how much the borrowers paid. Predict **which tranches are paid in full**, then pour the cash and see.",
        game: Waterfall,
      },
      { kind: "quote", lead: "The riskiest tranches have a nickname:", cite: TOXIC, mark: ["toxic waste"] },
      {
        kind: "choice",
        q: "Why do companies issue CMOs?",
        options: [
          "To spread prepayment and interest rate risk across investors with different risk tolerance",
          "To avoid paying borrowers",
          "To turn mortgages into real estate",
          "To guarantee every tranche the same return",
        ],
        answer: 0,
        why: "Tranches let each investor take the slice of risk that suits them.",
        cite: CMO_WHY,
      },
      {
        kind: "fill",
        q: "All debt instruments are collectively known as ___ products.",
        bank: ["fixed-income", "derivative", "equity", "real"],
        answer: ["fixed-income"],
        why: "Bonds, bills, notes, commercial paper and mortgage-backed securities are all fixed-income products.",
        cite: FIXED_INC,
      },
      {
        kind: "recap",
        points: [
          { text: "**Mortgage-backed securities** pass through payments from a **mortgage pool**.", cite: PASS },
          { text: "**CMOs** (REMICs) pay tranches in order; the **Z tranche** gets what's left.", cite: Z_TR },
          { text: "All debt instruments are **fixed-income products**.", cite: FIXED_INC },
        ],
      },
    ],
  },
];

export const U33A_CHECKPOINT: Question[] = [
  {
    kind: "number",
    q: "A bond with a $2,000,000 par value is quoted at 98. What is its price?",
    answer: 1960000,
    prefix: "$",
    illustrative: true,
    why: "98% × $2,000,000 = $1,960,000.",
    cite: PAR,
  },
  {
    kind: "choice",
    q: "Who creates all financial assets?",
    options: ["Issuers", "Underwriters", "Exchanges", "Dealers"],
    answer: 0,
    why: "Issuers create all financial assets; underwriters only help them sell.",
    cite: ISSUERS,
  },
  {
    kind: "choice",
    q: "Collateralized mortgage obligations (CMOs) are also called…",
    options: ["REMICs", "REITs", "ADRs", "ETFs"],
    answer: 0,
    why: "CMOs are also called real estate mortgage investment conduits (REMICs). REITs are trusts that own real estate.",
    cite: REMIC,
  },
  {
    kind: "truefalse",
    q: "Real assets appear on both sides of a balance sheet.",
    answer: false,
    why: "Real assets appear only on the asset side. Financial assets appear on both sides.",
    cite: ASSET_SIDE,
  },
];
