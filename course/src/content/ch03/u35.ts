// 3.5 MARKET REGULATION (pp. 59–66) and 3.7 SOME POINTS TO REMEMBER (p. 66)
import type { Cite, Unit } from "../types.ts";
import {
  BrazilTax,
  Buttonwood,
  Delegation,
  Jurisdiction,
  MissionTradeoffs,
  OnionBan,
  Powers,
  PrivateRegs,
  RegGoals,
  RegLayers,
  ShadJohnson,
  SROTypes,
} from "./illus/u35.tsx";
import { JurisdictionRush } from "./games/JurisdictionRush.tsx";

const c = (p: number, s: string, t: string, extra: Partial<Cite> = {}): Cite => ({ p, s, t, ...extra });

// ── Excerpts: 3.5 ───────────────────────────────────────────────────────────
const FACILITATE = c(59, "3.5", "Regulators create and enforce rules that facilitate trading. Most traders believe that securities markets work best when they are well regulated but not excessively regulated.");
const GOOD = c(59, "3.5", "Good regulations help ensure that traders communicate effectively with each other, that people do not defraud others, and that all things generally are as they appear.");
const OTHER = c(59, "3.5", "Such regulations may give privileges—usually protections from competition—to favored traders, brokers, or exchanges.");
const FOREIGN = c(59, "3.5", "For example, regulators often try to protect domestic markets from foreign competition.");
const TAX = c(60, "3.5", "For example, governments sometimes tax trading to raise money for the national treasury.");
const HARM = c(60, "3.5", "Regulations that make it difficult or expensive for traders to arrange mutually beneficial trades generally harm the markets and the wider economy.");
const STATED = c(60, "3.5", "The stated purpose of a regulation often is not its true objective.");
const IGNORANCE = c(60, "3.5", "Through ignorance, self-interest, or malice, however, regulators often adopt regulations that do not promote the common good.");
const LOBBY = c(60, "3.5", "Since regulators set the rules of the game, and since rules help determine who will be successful, people devote tremendous efforts to lobbying for rules that they favor.");

// ── Excerpts: 3.5.1 ─────────────────────────────────────────────────────────
const DIVIDE = c(60, "3.5.1", "Legislatures enact laws that directly regulate markets. They generally delegate enforcement of these laws to various public and private regulatory agencies.");
const FORCE_OF_LAW = c(60, "3.5.1", "These laws authorize agencies to write regulations that have the force of law. The agencies then enforce their regulations through judicial proceedings.");
const VAGUE = c(60, "3.5.1", "The definition of what is in the public interest, however, may be vague. Regulators therefore often have significant power to promote their personal agendas.");

// ── Excerpts: 3.5.1.1 ───────────────────────────────────────────────────────
const GOV = c(60, "3.5.1.1", "Most countries have created governmental regulatory agencies to oversee traders and trading practices. These agencies generally are independent commissions.");
const MINISTRIES = c(60, "3.5.1.1", "Table 3-11 shows that some countries delegate regulatory powers over the markets to ministries of the executive branch of the government, or to their national central banks.");
const SEC_SCOPE = c(60, "3.5.1.1", "The SEC regulates securities markets (stocks, bonds, warrants, investment company shares, and trust units), equity options markets, and cash-settled equity index options markets.");
const CFTC_SCOPE = c(60, "3.5.1.1", "The CFTC regulates commodity spot, forward, and futures markets.");
const MERGE = c(61, "3.5.1.1", "Concerns over the inefficiencies of having two agencies perform similar functions have caused many people to propose merging the two agencies.");
const T311 = c(62, "3.5.1.1", "Germany: Bundesaufsichtsamt fur den Wertpapierhandel (BAWE) · Ireland: Central Bank of Ireland · Singapore: Monetary Authority of Singapore · United Kingdom: Financial Services Authority", { table: "Table 3-11" });
const POWERS = c(61, "3.5.1.1", "The law also allows them to enforce their regulations through administrative hearings. These agencies can also ask that the Department of Justice prosecute violators in the federal courts.");
const WRITE = c(61, "3.5.1.1", "The SEC and the CFTC write regulations to interpret and implement the laws that fall within their jurisdictions.");
const EDGAR = c(61, "3.5.1.1", "Investors who are interested in estimating security values can access these reports over the Internet via the SEC's Edgar information retrieval system.");
const CFTC_INFO = c(61, "3.5.1.1", "The CFTC likewise collects and publishes information about commodity market supply and demand conditions and large trader positions.");
const SPEC_MARGIN = c(61, "3.5.1.1", "The Federal Reserve Board sets speculative margins. Speculative margins specify the minimum amount of capital that traders must have to buy or sell securities and to hold long or short positions.");
const REG_T = c(61, "3.5.1.1", "Traders call these margins Regulation T margins, or simply Reg T margins because the Federal Reserve Board specifies them in its Regulation T.");
const STATES = c(63, "3.5.1.1", "These commissions primarily enforce state antifraud statutes.");
const MISSION_BOX = { box: "The SEC Mission" };
const MISSION = c(61, "3.5.1.1", "the Commission shall also consider, in addition to the protection of investors, whether the action will promote efficiency, competition, and capital formation.", MISSION_BOX);
const THREE_ACTS = c(61, "3.5.1.1", "These three acts together form the legislative foundation for securities regulation in the United States.", MISSION_BOX);
const NO_GUIDE = c(61, "3.5.1.1", "Although this directive seems quite explicit, it provides no guidance to regulators confronted with issues that require trade-offs among the named objectives.", MISSION_BOX);
const INSIDER = c(61, "3.5.1.1", "For example, rules that prohibit insider trading protect investors while simultaneously making markets less efficient in the sense that they produce less informative prices.", MISSION_BOX);
const SMALL = c(61, "3.5.1.1", "For example, rules that protect the interests of small investors often hurt large investors. In these cases, regulators generally freely decide what they believe is in the public interest.", MISSION_BOX);
const COMP_BOX = { box: "Regulatory Competition" };
const TURF = c(63, "3.5.1.1", 'These "turf wars" generally occur when markets or issuers create new trading products that have characteristics of both securities and commodity contracts.', COMP_BOX);
const BEFORE82 = c(63, "3.5.1.1", "Before 1982, the Commodity Exchange Act gave the CFTC authority to regulate any exchange contract that has an element of futurity.", COMP_BOX);
const ACCORD_CFTC = c(63, "3.5.1.1", "Their agreement, which Congress enacted into law, gave the CFTC jurisdiction over futures trading in broad equity indexes and options on those futures contracts.", COMP_BOX);
const ACCORD_SEC = c(63, "3.5.1.1", "The SEC obtained exclusive jurisdiction over options on individual stocks and cash-settled options on indexes.", COMP_BOX);
const BANNED = c(63, "3.5.1.1", "The chairmen agreed that no futures on individual stocks or on narrow indexes would trade anywhere.", COMP_BOX);
const CFMA = c(63, "3.5.1.1", "The Commodity Futures Modernization Act of 2000 amended the law to permit trading in these previously prohibited futures contracts.", COMP_BOX);
const IDENTICAL = c(63, "3.5.1.1", "Two regulatory agencies thus separately regulate instruments that have essentially identical risk characteristics.", COMP_BOX);
// ── Excerpts: 3.5.1.2 ───────────────────────────────────────────────────────
const SRO_DEF = c(63, "3.5.1.2", "Organizations that regulate their members are called self-regulatory organizations, or SROs.");
const SRO_WHY = c(63, "3.5.1.2", "These organizations regulate their members to lower their costs of doing business together, to improve their business prospects, to ensure that no member hurts another member, and to provide quality assurances to their members' clients.");
const EXCH_REG = c(63, "3.5.1.2", "Exchanges primarily regulate their members' trading practices.");
const CH_REG = c(64, "3.5.1.2", "Clearinghouses primarily establish capital adequacy standards and trade-reporting practices for their members.");
const ASSOC = c(64, "3.5.1.2", "The primary SROs that regulate brokers and dealers in the United States are the National Association of Securities Dealers (NASD) and the National Futures Association (NFA).");
const NFA_LAW = c(64, "3.5.1.2", "The law requires all U.S. futures brokers and dealers to belong to the NFA and to submit themselves to its regulations.");
const ENFORCE = c(64, "3.5.1.2", "SROs enforce their regulations by threatening to expel members who do not comply.");
const INEFFECTIVE = c(64, "3.5.1.2", "They can be ineffective, however, when dishonest members can profit greatly from violating the rules.");
const APPROVAL = c(65, "3.5.1.2", "In the United States, the various SROs apply to the SEC or CFTC for approval of their rules. These agencies approve proposed rules if they find that they are in the public interest.");
const EXPERTS = c(65, "3.5.1.2", "The delegation of regulatory powers from national legislatures to regulatory nongovernmental agencies allows experts who are most familiar with the markets and their problems to regulate them.");
const BTW = { box: "The Buttonwood Tree Agreement" };
const BTW_ORIGIN = c(64, "3.5.1.2", "The New York Stock Exchange traces its beginnings to an agreement traders made in 1792 to regulate their commissions and to trade with each other.", BTW);
const BTW_FEE = c(64, "3.5.1.2", "Their written agreement—which entered the NYSE archives in 1840—indicates that they all would charge their clients no less than 0.25 percent commission for their brokerage services.", BTW);
const BTW_1975 = c(64, "3.5.1.2", "The New York Stock Exchange stopped regulating brokerage commissions 183 years later, in 1975.", BTW);
const RULE390 = c(64, "3.5.1.2", "It repealed Rule 390, its last restriction on off-exchange trading, in December 1999.", BTW);
const ONION_BOX = { box: "Crying Over Onion Futures" };
const PERISH = c(65, "3.5.1.2", "Commodity markets can be especially volatile when the traded commodity is perishable. When commodity supplies will soon spoil, their prices dive if they are in excess supply, and they rocket upward if they are in short supply.", ONION_BOX);
const COMPLAIN = c(65, "3.5.1.2", "The farmers and dealers attributed the volatility to speculative trading in the onion futures market.", ONION_BOX);
const BAN = c(65, "3.5.1.2", "In 1958, they complied by prohibiting all exchange trading in onion futures.", ONION_BOX);
const NATURAL = c(65, "3.5.1.2", "Consequently, the natural beneficiaries of onion futures markets—the farmers who produce onions and the food processors who use onions—cannot use futures contracts to cheaply exchange onion price risk.", ONION_BOX);
const FORWARDS = c(65, "3.5.1.2", "Instead, they now use forward contracts.", ONION_BOX);
const SRO_TYPES = c(63, "3.5.1.2", "Private regulatory agencies include exchanges, clearinghouses, and trader associations.");

// ── Excerpts: 3.5.1.3 ───────────────────────────────────────────────────────
const PRIVATE = c(65, "3.5.1.3", "Several private agencies regulate traders, issuers, and investment managers in the United States.");
const FASB = c(65, "3.5.1.3", "The Financial Accounting Standards Board (FASB) sets accounting standards by which firms must report their accounts.");
const FASB_SEC = c(65, "3.5.1.3", "The SEC, which has ultimate authority for specifying reporting standards for public firms, has recognized the FASB standards as authoritative since 1973.");
const AIMR = c(65, "3.5.1.3", "The Association for Investment Management and Research (AIMR) sets performance reporting standards that many investment managers use to report their results.");
const VOLUNTARY = c(65, "3.5.1.3", "Although the standards are voluntary, many firms choose to comply in order to satisfy their clients.");
const INSURERS = c(65, "3.5.1.3", "The insurance companies that write these policies regulate the brokers who purchase these policies in order to minimize the probability that the brokers will fail, and thus impose costs on their funds.");
const CFA = c(66, "3.5.2", "Financial analysts who wish to become a chartered financial analyst (CFA) must pass rigorous examinations that the AIMR administers over a three-year period.", { box: "Chartered Financial Analysts" });

// ── Excerpts: 3.5.2 ─────────────────────────────────────────────────────────
const INTL_NAMES = c(66, "3.5.2", "The most important of these organizations are the International Organization of Securities Commissions (IOSCO), the World Federation of Exchanges (WFE), and the International Councils of Securities Associations (ICSA).");
const INTL = c(66, "3.5.2", "Although they cannot easily impose standards upon their members, they provide useful forums for sharing information about market structure and for exploring solutions to common regulatory and operational problems.");
const BR = { box: "Unintended Consequences" };
const BR_TAX = c(66, "3.5.2", "In 1997, the Brazilian government imposed a 0.38 percent tax on all financial transactions in order to raise revenue.", BR);
const BR_ADR = c(66, "3.5.2", "The unintended consequence of this tax was to cause institutional traders to trade Brazilian stocks as American depository receipts (ADRs) in New York to avoid the tax.", BR);
const BR_LESS = c(66, "3.5.2", "The tax therefore raised less revenue than expected, and the Brazilian equity markets lost liquidity.", BR);
const BR_VOL = c(66, "3.5.2", "Daily trading volume at the sao Paulo Bovespa dropped from 1.2 billion reais (1.08 billion dollars) a day in 1997 to 350 million reais (136 million dollars) a day in 2001.", BR);
const BR_EXEMPT = c(66, "3.5.2", "The Brazilian government announced in September 2001 that stock transactions would be exempt from the tax in late 2001.", BR);

// ── Excerpts: 3.7 and the earlier sections its points refer to ──────────────
const P1 = c(66, "3.7", "The buy side buys liquidity services. The sell side provides them.");
const P2 = c(66, "3.7", "Dealers trade for their own account. Brokers trade for others.");
const P3 = c(66, "3.7", "Stocks get more attention than their values would indicate.");
const P4 = c(66, "3.7", "Many markets compete for order flow.");
const P5 = c(66, "3.7", "Exchanges often compete with brokerages to arrange trades.");
const P6 = c(66, "3.7", "Legislatures provide the regulatory framework, the SROs provide the details, and governmental regulatory agencies provide oversight.");
const P7 = c(66, "3.7", "Private regulators try to create respected standards.");
const STOCKS20 = c(45, "3.4.1", "Despite the tremendous attention given to the stock market in the media, stocks represent only about 20 percent of the capital wealth of the country.");
const ORDER_DRIVEN = c(35, "3.2.1", "Order-driven exchanges are essentially brokerages because they arrange trades for their clients. Exchanges and brokerages therefore often compete with each other.");
const VIEWS = c(63, "3.5.1.1", "Some people believe that this redundancy is foolish. Others believe that the competition between regulators has made both of them more reasonable. Still others believe that this competition has made both regulators too lax.", COMP_BOX);

export const U35: Unit = {
  sec: "3.5",
  title: "Market Regulation",
  pages: "59–66",
  lessons: [
    // ── Lesson 1 ──────────────────────────────────────────────────────────
    {
      id: "3.5-why-regulate",
      sec: "3.5",
      title: "Rules that help, rules that hinder",
      pages: "59–60",
      steps: [
        { kind: "idea", title: "Regulators make trading possible", body: "Regulators **create and enforce rules that facilitate trading**. Most traders want markets **well regulated, but not excessively**.", cite: FACILITATE },
        { kind: "idea", title: "What good rules ensure", body: "Traders **communicate** clearly, nobody **defrauds** anyone, and things are **as they appear**.", cite: GOOD },
        {
          kind: "see",
          title: "Rules that help, rules that hinder",
          illus: RegGoals,
          beats: [
            { text: "Good rules let a trader and a market deal with confidence: clear talk, no fraud, no surprises.", cite: GOOD },
            { text: "Some rules hand out **privileges**: here, a newcomer market is kept out to protect the incumbent.", cite: OTHER },
            { text: "Some rules **tax trading** to raise money for the treasury: every trade pays a cut.", cite: TAX },
            { text: "When trades that would help **both sides** become hard or costly, fewer happen. That harms the market and the economy.", cite: HARM },
          ],
        },
        {
          kind: "multi",
          q: "Which of these does Harris say **good regulations** help ensure?",
          options: ["Traders communicate effectively", "People do not defraud others", "Things are as they appear", "Incumbent exchanges keep their clients", "Prices only go up"],
          answer: [0, 1, 2],
          why: "Those are the three jobs of good regulation. Protecting incumbents is one of the “other objectives”.",
          cite: GOOD,
        },
        {
          kind: "classify",
          q: "Does the rule facilitate trading, or hand out a privilege?",
          buckets: ["Facilitates trading", "Gives a privilege"],
          items: [
            { text: "A ban on defrauding clients", bucket: 0 },
            { text: "Keeping foreign exchanges out of the home market", bucket: 1, why: "Protection from foreign competition is a privilege." },
            { text: "A disclosure rule so a security is what it appears to be", bucket: 0 },
            { text: "Blocking a new trading system to shield the incumbent exchange", bucket: 1, why: "Protection from new domestic competition." },
            { text: "A standard way to report trade terms", bucket: 0, why: "It helps traders communicate effectively." },
          ],
          cite: FOREIGN,
        },
        {
          kind: "truefalse",
          q: "Governments sometimes tax trading to raise money for the national treasury.",
          answer: true,
          why: "Harris gives it as an example of restrictive regulation imposed for reasons other than facilitating trade.",
          cite: TAX,
        },
        { kind: "quote", lead: "The test Harris applies to any rule:", cite: HARM, mark: ["mutually beneficial trades"] },
        { kind: "idea", title: "Read the label, then look again", body: "The **stated purpose** of a regulation is often **not its true objective**.", cite: STATED },
        {
          kind: "choice",
          q: "Why do people lobby so hard over market rules?",
          options: ["Rules help decide who will be successful", "Lobbying is required by law", "Traders elect the regulators", "Rules never change once written"],
          answer: 0,
          why: "Regulators set the rules of the game, and the rules help determine the winners.",
          cite: LOBBY,
        },
        {
          kind: "fill",
          q: "Through ___, self-interest, or malice, regulators often adopt regulations that do not promote the common good.",
          bank: ["ignorance", "honesty", "competition", "liquidity"],
          answer: ["ignorance"],
          why: "Harris names three causes: ignorance, self-interest and malice.",
          cite: IGNORANCE,
        },
        {
          kind: "recap",
          points: [
            { text: "Good rules: clear communication, **no fraud**, things **as they appear**.", cite: GOOD },
            { text: "Rules that make **mutually beneficial trades** hard or costly harm markets.", cite: HARM },
            { text: "A rule's **stated purpose** is often not its true objective.", cite: STATED },
          ],
        },
      ],
    },

    // ── Lesson 2 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1-regulators",
      sec: "3.5.1",
      title: "Who writes and enforces the rules",
      pages: "60",
      steps: [
        { kind: "idea", title: "Legislatures pass the laws", body: "Legislatures **enact laws** that regulate markets, then **delegate enforcement** to public and private agencies.", cite: DIVIDE },
        { kind: "idea", title: "Agencies get the power to write rules", body: "Delegated powers let agencies **write regulations with the force of law** and **enforce** them in judicial proceedings.", cite: FORCE_OF_LAW },
        {
          kind: "see",
          title: "From a law to an enforced regulation",
          illus: Delegation,
          beats: [
            { text: "A **legislature** enacts laws that directly regulate the markets.", cite: DIVIDE },
            { text: "It **delegates** powers to an agency, public or private." },
            { text: "The agency writes **regulations** that have the **force of law**.", cite: FORCE_OF_LAW },
            { text: "It **enforces** them through judicial proceedings." },
            { text: "Agencies must act in the **public interest**, but that can be vague, which leaves room for their own agendas.", cite: VAGUE },
          ],
        },
        {
          kind: "order",
          q: "Put the steps in order.",
          items: ["The legislature enacts a law that delegates powers", "The agency writes regulations with the force of law", "The agency enforces them through judicial proceedings"],
          why: "Delegation first, then rule-writing, then enforcement.",
          cite: FORCE_OF_LAW,
        },
        {
          kind: "choice",
          q: "Regulations an agency writes under delegated powers…",
          options: ["have the force of law", "are only recommendations", "bind only the agency's own staff", "must be re-voted by the legislature every year"],
          answer: 0,
          why: "The delegating laws authorize agencies to write regulations that have the force of law.",
          cite: FORCE_OF_LAW,
        },
        { kind: "idea", title: "“Public interest” leaves room", body: "Agencies must regulate in the **public interest**, but its definition **may be vague**. So regulators can push **personal agendas**.", cite: VAGUE },
        {
          kind: "truefalse",
          q: "Because “the public interest” can be vague, regulators often have significant power to promote their own agendas.",
          answer: true,
          why: "That is Harris's conclusion from the vagueness of the public-interest mandate.",
          cite: VAGUE,
        },
        {
          kind: "fill",
          q: "Legislatures generally ___ enforcement of their laws to public and private regulatory agencies.",
          bank: ["delegate", "abolish", "auction", "ignore"],
          answer: ["delegate"],
          why: "Legislatures pass the laws and hand enforcement to agencies.",
          cite: DIVIDE,
        },
        {
          kind: "recap",
          points: [
            { text: "Legislatures **enact laws** and **delegate** enforcement to agencies.", cite: DIVIDE },
            { text: "Agency regulations have the **force of law**, enforced in judicial proceedings.", cite: FORCE_OF_LAW },
            { text: "A vague **public interest** gives regulators room for their own agendas.", cite: VAGUE },
          ],
        },
      ],
    },

    // ── Lesson 3 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.1-sec-cftc",
      sec: "3.5.1.1",
      title: "SEC and CFTC",
      pages: "60–62",
      steps: [
        { kind: "definition", term: "Governmental regulatory agencies", body: "Government bodies that **oversee traders and trading practices**. Usually **independent commissions**.", cite: GOV },
        {
          kind: "definition",
          term: "SEC",
          aka: ["Securities and Exchange Commission"],
          body: "Regulates **securities** markets (stocks, bonds, warrants, fund shares, trust units), **equity options** and **cash-settled equity index options**.",
          cite: SEC_SCOPE,
        },
        { kind: "definition", term: "CFTC", aka: ["Commodity Futures Trading Commission"], body: "Regulates **commodity spot, forward and futures** markets.", cite: CFTC_SCOPE },
        {
          kind: "see",
          title: "Two agencies split the U.S. markets",
          illus: Jurisdiction,
          beats: [
            { text: "Stocks, bonds, warrants and trust units: all **securities**, so all **SEC**.", cite: SEC_SCOPE },
            { text: "The SEC also takes **equity options** and **cash-settled equity index options**." },
            { text: "Commodity **spot, forward and futures** markets go to the **CFTC**.", cite: CFTC_SCOPE },
            { text: "Most countries use **one** agency. Two agencies doing similar work is why many people propose **merging** them.", cite: MERGE },
          ],
        },
        {
          kind: "game",
          id: "jurisdiction-rush",
          title: "SEC or CFTC?",
          brief: "Instruments appear one at a time. Send each to the agency that regulates it. You have **30 seconds**; a wrong answer costs 2.",
          game: JurisdictionRush,
        },
        {
          kind: "multi",
          q: "Which markets does the **SEC** regulate?",
          options: ["Stocks and bonds", "Equity options", "Cash-settled equity index options", "Commodity futures", "Commodity forwards"],
          answer: [0, 1, 2],
          why: "Futures and forwards on commodities are the CFTC's.",
          cite: SEC_SCOPE,
        },
        {
          kind: "truefalse",
          q: "In the United States, a single agency regulates both securities and commodity futures markets.",
          answer: false,
          why: "The U.S. splits the job between the SEC and the CFTC; many people propose merging them.",
          cite: MERGE,
        },
        {
          kind: "match",
          q: "Match the country to its regulator (Table 3-11).",
          pairs: [
            ["Germany", "BAWe"],
            ["Ireland", "Central Bank of Ireland"],
            ["Singapore", "Monetary Authority"],
            ["United Kingdom", "Financial Services Authority"],
          ],
          cite: T311,
        },
        {
          kind: "choice",
          q: "Table 3-11 shows that some countries hand market oversight to…",
          options: ["ministries or their national central bank", "their largest stock exchange", "the United Nations", "foreign regulators"],
          answer: 0,
          why: "Ireland's central bank is an example; Japan lists ministries.",
          cite: MINISTRIES,
        },
        {
          kind: "today",
          title: "Two names in Table 3-11 have changed",
          body: "Germany merged the **BAWe** into **BaFin** in 2002. The UK replaced the **Financial Services Authority** with the **FCA** and the **PRA** in 2013.",
          source: "BaFin (bafin.de); UK Financial Services Act 2012",
        },
        {
          kind: "recap",
          points: [
            { text: "Most countries regulate through **independent commissions**.", cite: GOV },
            { text: "**SEC**: securities, equity options, cash-settled equity index options.", cite: SEC_SCOPE },
            { text: "**CFTC**: commodity spot, forward and futures markets.", cite: CFTC_SCOPE },
          ],
        },
      ],
    },

    // ── Lesson 4 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.1-powers",
      sec: "3.5.1.1",
      title: "What the agencies can do",
      pages: "61–63",
      steps: [
        { kind: "idea", title: "They write the detailed rules", body: "The SEC and CFTC **write regulations** that interpret and implement the laws they oversee.", cite: WRITE },
        { kind: "idea", title: "They enforce them", body: "Through **administrative hearings**, or by asking the **Department of Justice** to prosecute in federal court.", cite: POWERS },
        {
          kind: "see",
          title: "An agency's toolbox",
          illus: Powers,
          beats: [
            { text: "**Write**: regulations that interpret and implement the laws.", cite: WRITE },
            { text: "**Enforce**: administrative hearings.", cite: POWERS },
            { text: "**Refer**: ask the Department of Justice to prosecute violators in the federal courts." },
            { text: "**Publish**: the SEC collects reports from issuers; investors read them on **EDGAR**.", cite: EDGAR },
          ],
        },
        {
          kind: "choice",
          q: "How can the SEC enforce its regulations?",
          options: ["Administrative hearings, or a referral to the Justice Department", "Only by fining exchanges", "By voting in Congress", "It can only issue warnings"],
          answer: 0,
          why: "Both routes are in the law: hearings, and prosecution by the DOJ in federal courts.",
          cite: POWERS,
        },
        {
          kind: "choice",
          q: "Where can investors read the reports issuers file with the SEC?",
          options: ["EDGAR", "Regulation T", "The NFA", "IOSCO"],
          answer: 0,
          why: "EDGAR is the SEC's information retrieval system.",
          cite: EDGAR,
        },
        {
          kind: "truefalse",
          q: "The CFTC publishes information about large trader positions in commodity markets.",
          answer: true,
          why: "It also publishes supply and demand conditions, which traders use to value commodities.",
          cite: CFTC_INFO,
        },
        {
          kind: "definition",
          term: "Speculative margins",
          aka: ["Regulation T margins", "Reg T margins"],
          body: "The **minimum capital** a trader needs to buy or sell securities and hold long or short positions. Set by the **Federal Reserve Board**.",
          cite: SPEC_MARGIN,
        },
        {
          kind: "fill",
          q: "Speculative margins are set by the ___, so traders call them ___ margins.",
          bank: ["Federal Reserve Board", "Regulation T", "SEC", "variation", "NFA"],
          answer: ["Federal Reserve Board", "Regulation T"],
          why: "The Fed specifies them in its Regulation T.",
          cite: REG_T,
        },
        {
          kind: "truefalse",
          q: "U.S. state securities commissions mainly enforce state antifraud statutes.",
          answer: true,
          why: "That is their primary job, alongside the federal agencies.",
          cite: STATES,
        },
        {
          kind: "recap",
          points: [
            { text: "Agencies **write regulations** and enforce them through **hearings** or the **DOJ**.", cite: POWERS },
            { text: "They also **publish information**: issuer reports on EDGAR.", cite: EDGAR },
            { text: "The **Fed** sets speculative margins, called **Reg T** margins.", cite: REG_T },
          ],
        },
      ],
    },

    // ── Lesson 5 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.1-mission",
      sec: "3.5.1.1",
      title: "The SEC's mission and its trade-offs",
      pages: "61",
      steps: [
        {
          kind: "quote",
          lead: "Section 3f of the Securities Exchange Act of 1934 tells the SEC that…",
          cite: MISSION,
          mark: ["protection of investors", "efficiency", "competition", "capital formation"],
        },
        {
          kind: "idea",
          title: "The foundation of U.S. securities law",
          body: "Nearly the same words appear in the **1933 Securities Act**, the **1934 Exchange Act** and the **1940 Investment Company Act**.",
          cite: THREE_ACTS,
        },
        { kind: "idea", title: "Four goals, no tie-breaker", body: "The directive names the goals but gives **no guidance** when they **conflict**.", cite: NO_GUIDE },
        {
          kind: "see",
          title: "When the goals pull apart",
          illus: MissionTradeoffs,
          beats: [
            { text: "Four objectives: **protect investors**, and promote **efficiency**, **competition** and **capital formation**.", cite: MISSION },
            { text: "Banning insider trading **protects investors** but makes prices **less informative**: a trade-off **between** goals.", cite: INSIDER },
            { text: "Protecting **small** investors often **hurts large** ones: a trade-off **within** one goal.", cite: SMALL },
            { text: "The law doesn't settle these cases, so regulators decide what they believe is in the public interest." },
          ],
        },
        {
          kind: "choice",
          q: "According to Harris, rules that prohibit insider trading…",
          options: ["protect investors but make prices less informative", "make prices more informative and hurt investors", "have no effect on efficiency", "only matter to large investors"],
          answer: 0,
          why: "Investor protection and efficiency pull in opposite directions here.",
          cite: INSIDER,
        },
        {
          kind: "fill",
          q: "The SEC must consider whether an action will promote efficiency, competition, and ___ formation.",
          bank: ["capital", "price", "market", "wealth"],
          answer: ["capital"],
          why: "Efficiency, competition and capital formation, on top of investor protection.",
          cite: MISSION,
        },
        {
          kind: "truefalse",
          q: "When a rule helps small investors but hurts large ones, the SEC's directive says how to decide.",
          answer: false,
          why: "It gives no guidance; regulators generally decide freely what is in the public interest.",
          cite: SMALL,
        },
        {
          kind: "recap",
          points: [
            { text: "SEC goals: **investor protection**, **efficiency**, **competition**, **capital formation**.", cite: MISSION },
            { text: "The directive gives **no guidance** on trade-offs between or within goals.", cite: NO_GUIDE },
            { text: "Insider-trading bans protect investors but make prices **less informative**.", cite: INSIDER },
          ],
        },
      ],
    },

    // ── Lesson 6 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.1-turf",
      sec: "3.5.1.1",
      title: "Turf wars: SEC vs CFTC",
      pages: "63",
      steps: [
        {
          kind: "idea",
          title: "Hybrid products start turf wars",
          body: "Conflicts arise when a new product looks like **both** a security and a commodity contract, such as an oil-linked bond.",
          cite: TURF,
        },
        { kind: "idea", title: "Before 1982: “futurity” meant CFTC", body: "The law gave the CFTC any exchange contract with an **element of futurity**, even as the SEC authorized stock options.", cite: BEFORE82 },
        {
          kind: "see",
          title: "The 1982 Shad-Johnson accord",
          illus: ShadJohnson,
          beats: [
            { text: "Stock options: securities-like, but with futurity. Both agencies had a claim.", cite: BEFORE82 },
            { text: "The accord gave the **SEC** options on individual stocks and **cash-settled options on indexes**.", cite: ACCORD_SEC },
            { text: "The **CFTC** got futures on **broad** equity indexes and options on those futures.", cite: ACCORD_CFTC },
            { text: "Futures on **individual stocks** or **narrow** indexes: no one could trade them anywhere.", cite: BANNED },
            { text: "The Commodity Futures Modernization Act of **2000** permitted them.", cite: CFMA },
          ],
        },
        {
          kind: "classify",
          q: "Under the 1982 accord, who got it?",
          buckets: ["SEC", "CFTC", "Nobody (banned)"],
          items: [
            { text: "Options on individual stocks", bucket: 0 },
            { text: "Futures on a broad equity index", bucket: 1 },
            { text: "Cash-settled options on an index", bucket: 0 },
            { text: "Options on broad index futures", bucket: 1 },
            { text: "Futures on a single stock", bucket: 2, why: "Banned until the CFMA of 2000." },
            { text: "Futures on a narrow index", bucket: 2, why: "Banned until the CFMA of 2000." },
          ],
          cite: ACCORD_SEC,
        },
        {
          kind: "truefalse",
          q: "Cash-settled index options and options on index futures carry nearly identical risks, yet different agencies regulate them.",
          answer: true,
          why: "Harris calls it the most interesting part of the accord: two regulators for essentially identical risks.",
          cite: IDENTICAL,
        },
        {
          kind: "choice",
          q: "What did the Commodity Futures Modernization Act of 2000 do?",
          options: ["Permitted the previously banned single-stock and narrow-index futures", "Merged the SEC and the CFTC", "Banned onion futures", "Created the National Futures Association"],
          answer: 0,
          why: "It amended the law to permit those futures.",
          cite: CFMA,
        },
        {
          kind: "multi",
          q: "Which views on two competing regulators does Harris report?",
          options: ["The redundancy is foolish", "Competition made both more reasonable", "Competition made both too lax", "Competition ended all turf wars"],
          answer: [0, 1, 2],
          why: "He lists all three views without picking one. Nothing says turf wars ended.",
          cite: VIEWS,
        },
        {
          kind: "recap",
          points: [
            { text: "Turf wars start with products that look like **securities and commodity contracts**.", cite: TURF },
            { text: "1982: SEC gets stock options and cash-settled index options; CFTC gets broad index futures and their options.", cite: ACCORD_CFTC },
            { text: "Single-stock and narrow-index futures were **banned** until **2000**.", cite: CFMA },
          ],
        },
      ],
    },

    // ── Lesson 7 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.2-sros",
      sec: "3.5.1.2",
      title: "Self-regulatory organizations",
      pages: "63–65",
      steps: [
        { kind: "definition", term: "Self-regulatory organizations", aka: ["SROs"], body: "Organizations that **regulate their own members**.", cite: SRO_DEF },
        {
          kind: "idea",
          title: "Why members accept the rules",
          body: "Rules **lower the cost of doing business together**, improve prospects, stop members **hurting each other**, and **reassure clients**.",
          cite: SRO_WHY,
        },
        {
          kind: "see",
          title: "Three kinds of SROs",
          illus: SROTypes,
          beats: [
            { text: "**Exchanges** regulate their members' **trading practices**: how they arrange trades and treat clients.", cite: EXCH_REG },
            { text: "**Clearinghouses** set **capital adequacy** standards and trade-reporting practices.", cite: CH_REG },
            { text: "**Trader associations** regulate how traders treat each other and clients. In the U.S.: the **NASD** and the **NFA**.", cite: ASSOC },
            { text: "Members who don't comply can be **expelled**, or sued in civil court.", cite: ENFORCE },
            { text: "To give their rules the **force of law**, SROs need the **SEC or CFTC** to approve them.", cite: APPROVAL },
          ],
        },
        {
          kind: "match",
          q: "Match each SRO to what it mainly regulates.",
          pairs: [
            ["Exchange", "Members' trading practices"],
            ["Clearinghouse", "Capital adequacy standards"],
            ["Trader association", "How traders treat clients"],
          ],
          cite: CH_REG,
        },
        {
          kind: "choice",
          q: "Which two SROs regulated U.S. brokers and dealers when the book was written?",
          options: ["The NASD and the NFA", "The SEC and the CFTC", "FASB and AIMR", "IOSCO and the WFE"],
          answer: 0,
          why: "The SEC and CFTC are government agencies, not SROs.",
          cite: ASSOC,
        },
        {
          kind: "truefalse",
          q: "U.S. law requires every futures broker and dealer to belong to the NFA.",
          answer: true,
          why: "For security brokers the NASD wasn't legally required, but doing business without it was essentially impossible.",
          cite: NFA_LAW,
        },
        {
          kind: "today",
          title: "The NASD is now FINRA",
          body: "In 2007 the NASD merged with the NYSE's member-regulation arm to form **FINRA**, the Financial Industry Regulatory Authority. FINRA is now the main SRO for U.S. broker-dealers.",
          source: "FINRA, “About FINRA” (finra.org)",
        },
        {
          kind: "choice",
          q: "When is SRO enforcement (expulsion, civil suits) least effective?",
          options: ["When dishonest members can profit greatly from breaking the rules", "When compliance is cheap", "When compliance brings large benefits", "When the SRO has many members"],
          answer: 0,
          why: "Expulsion threats work when compliance is cheap and valuable, not when cheating pays a lot.",
          cite: INEFFECTIVE,
        },
        { kind: "idea", title: "Rules with the force of law need approval", body: "SROs **apply to the SEC or CFTC**, which approve rules that are **in the public interest**.", cite: APPROVAL },
        {
          kind: "order",
          q: "How does an SRO rule get approved in the United States?",
          items: ["The SRO proposes a rule", "It applies to the SEC or CFTC for approval", "The agency approves it if it is in the public interest"],
          why: "Proposal, application, approval on public-interest grounds.",
          cite: APPROVAL,
        },
        { kind: "idea", title: "Why delegate to SROs at all?", body: "The **experts** who know the markets best do the regulating, instead of poorly informed legislators.", cite: EXPERTS },
        {
          kind: "recap",
          points: [
            { text: "**SROs** = exchanges, clearinghouses, trader associations regulating their members.", cite: SRO_DEF },
            { text: "They enforce by **expulsion** and civil suits; weak when cheating pays a lot.", cite: INEFFECTIVE },
            { text: "In the U.S., SRO rules need **SEC or CFTC approval**.", cite: APPROVAL },
          ],
        },
      ],
    },

    // ── Lesson 8 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.2-stories",
      sec: "3.5.1.2",
      title: "Buttonwood and onions",
      pages: "64–65",
      steps: [
        { kind: "quote", lead: "The NYSE itself began as a self-regulatory agreement:", cite: BTW_ORIGIN, mark: ["1792", "regulate their commissions"] },
        {
          kind: "see",
          title: "From a buttonwood tree to Rule 390",
          illus: Buttonwood,
          beats: [
            { text: "1792: **24 brokers** pledge to charge clients **no less than 0.25%** commission.", cite: BTW_FEE },
            { text: "The NYSE kept regulating commissions for **183 years**, until **1975**.", cite: BTW_1975 },
            { text: "Its last limit on off-exchange trading, **Rule 390**, went in **December 1999**.", cite: RULE390 },
          ],
        },
        {
          kind: "number",
          q: "Under the 1792 agreement, what is the minimum commission on a $10,000 stock purchase?",
          answer: 25,
          prefix: "$",
          illustrative: true,
          why: "0.25% × $10,000 = $25.",
          cite: BTW_FEE,
        },
        {
          kind: "choice",
          q: "For how long did the NYSE regulate brokerage commissions?",
          options: ["183 years (1792–1975)", "75 years", "18 years", "Until 1999"],
          answer: 0,
          why: "From the 1792 agreement until 1975. 1999 is when Rule 390 went.",
          cite: BTW_1975,
        },
        {
          kind: "truefalse",
          q: "Rule 390, the NYSE's last restriction on off-exchange trading, was repealed in December 1999.",
          answer: true,
          why: "The Exchange relaxed the restrictions gradually, under pressure from members and the SEC.",
          cite: RULE390,
        },
        { kind: "idea", title: "Perishable goods, wild prices", body: "When supplies will soon **spoil**, prices **dive** in a glut and **rocket** in a shortage.", cite: PERISH },
        {
          kind: "see",
          title: "Crying over onion futures",
          illus: OnionBan,
          beats: [
            { text: "1950s: onion futures prices swing wildly. Onions spoil, so prices before a new harvest are volatile.", cite: PERISH },
            { text: "Farmers and dealers blame **speculators** and complain to their senators.", cite: COMPLAIN },
            { text: "**1958**: Congress bans all exchange trading in onion futures.", cite: BAN },
            { text: "Farmers and processors lose a cheap way to share price risk. They use **forward contracts** instead.", cite: FORWARDS },
          ],
        },
        {
          kind: "choice",
          q: "Since the ban, how do onion farmers and food processors exchange price risk?",
          options: ["Forward contracts", "Onion futures on a U.S. board of trade", "Stock options", "They can't at all"],
          answer: 0,
          why: "Futures on onions are still illegal on U.S. boards of trade, so they use forwards.",
          cite: FORWARDS,
        },
        {
          kind: "fill",
          q: "In ___, Congress prohibited all exchange trading in onion futures.",
          bank: ["1958", "1975", "1982", "1999"],
          answer: ["1958"],
          why: "1975 is the end of fixed NYSE commissions, 1982 the Shad-Johnson accord, 1999 the repeal of Rule 390.",
          cite: BAN,
        },
        {
          kind: "multi",
          q: "Who were the natural beneficiaries of onion futures markets?",
          options: ["Farmers who produce onions", "Food processors who use onions", "Speculators", "Senators"],
          answer: [0, 1],
          why: "The ban took a cheap hedging tool away from the very people it would have helped.",
          cite: NATURAL,
        },
        {
          kind: "recap",
          points: [
            { text: "The NYSE began in **1792** as an agreement on **minimum commissions** (0.25%).", cite: BTW_FEE },
            { text: "The NYSE stopped regulating commissions in **1975**.", cite: BTW_1975 },
            { text: "Since the **1958 onion futures ban**, onion hedgers use **forward contracts**.", cite: FORWARDS },
          ],
        },
      ],
    },

    // ── Lesson 9 ──────────────────────────────────────────────────────────
    {
      id: "3.5.1.3-private",
      sec: "3.5.1.3",
      title: "Other private regulators",
      pages: "65–66",
      steps: [
        { kind: "definition", term: "FASB", aka: ["Financial Accounting Standards Board"], body: "Sets the **accounting standards** firms must use to report their accounts.", cite: FASB },
        {
          kind: "definition",
          term: "AIMR",
          aka: ["Association for Investment Management and Research"],
          body: "Sets the **performance reporting standards** many investment managers use to report results.",
          cite: AIMR,
        },
        { kind: "idea", title: "Brokers' insurers regulate too", body: "Insurers that cover brokers' clients **regulate those brokers**, to make it less likely a broker fails and costs them money.", cite: INSURERS },
        {
          kind: "see",
          title: "Private regulators and whom they regulate",
          illus: PrivateRegs,
          beats: [
            { text: "**FASB** sets accounting standards; the SEC has treated them as authoritative since 1973.", cite: FASB_SEC },
            { text: "**AIMR** sets performance standards. They are **voluntary**, yet many managers comply to satisfy clients.", cite: VOLUNTARY },
            { text: "**Insurers** of brokers' clients set conditions on the brokers they cover.", cite: INSURERS },
            { text: "All three have the same aim: standards people **respect**.", cite: P7 },
          ],
        },
        {
          kind: "match",
          q: "Match the private regulator to its standards.",
          pairs: [
            ["FASB", "Accounting standards"],
            ["AIMR", "Performance reporting"],
            ["Brokers' insurers", "Lower risk of broker failure"],
          ],
          cite: PRIVATE,
        },
        {
          kind: "truefalse",
          q: "Investment managers are required by law to follow AIMR's performance reporting standards.",
          answer: false,
          why: "The standards are voluntary; many firms comply to satisfy their clients.",
          cite: VOLUNTARY,
        },
        {
          kind: "fill",
          q: "Since 1973, the SEC has recognized the standards of the ___ as authoritative.",
          bank: ["FASB", "AIMR", "NFA", "IOSCO"],
          answer: ["FASB"],
          why: "The SEC holds ultimate authority over reporting standards for public firms and recognizes FASB's.",
          cite: FASB_SEC,
        },
        { kind: "idea", title: "AIMR also charters analysts", body: "To earn the **CFA** charter, analysts pass rigorous AIMR exams spread over **three years**.", cite: CFA },
        {
          kind: "today",
          title: "AIMR is now the CFA Institute",
          body: "AIMR renamed itself the **CFA Institute** in 2004. It still awards the CFA charter and sets the GIPS performance standards.",
          source: "CFA Institute, history (cfainstitute.org)",
        },
        {
          kind: "choice",
          q: "Why do insurers regulate the brokers whose clients they insure?",
          options: ["To make it less likely a broker fails and costs them money", "To set brokers' commissions", "To approve exchange rules", "To collect a tax on trades"],
          answer: 0,
          why: "A failed broker would impose costs on the insurer's funds.",
          cite: INSURERS,
        },
        {
          kind: "recap",
          points: [
            { text: "**FASB**: accounting standards, recognized by the SEC since 1973.", cite: FASB_SEC },
            { text: "**AIMR**: voluntary performance reporting standards; also charters CFAs.", cite: VOLUNTARY },
            { text: "Brokers' **insurers** regulate brokers to limit failures.", cite: INSURERS },
          ],
        },
      ],
    },

    // ── Lesson 10 ─────────────────────────────────────────────────────────
    {
      id: "3.5.2-international",
      sec: "3.5.2",
      title: "Across borders",
      pages: "66",
      steps: [
        {
          kind: "definition",
          term: "International regulatory organizations",
          body: "Bodies that try to **coordinate regulation across borders**. The main ones: **IOSCO**, the **WFE** and **ICSA**.",
          cite: INTL_NAMES,
        },
        { kind: "idea", title: "Forums, not enforcers", body: "They **can't easily impose standards**, but they are useful forums to **share information** and solve common problems.", cite: INTL },
        { kind: "quote", lead: "Box: a tax that backfired", cite: BR_TAX, mark: ["0.38 percent tax"] },
        {
          kind: "see",
          title: "Brazil's transaction tax",
          illus: BrazilTax,
          beats: [
            { text: "1997: institutions trade Brazilian stocks in **São Paulo**, about **1.2 billion reais** a day.", cite: BR_VOL },
            { text: "Brazil puts a **0.38% tax** on all financial transactions to raise revenue.", cite: BR_TAX },
            { text: "Institutions move their trading to **New York**, as **ADRs**, to avoid the tax.", cite: BR_ADR },
            { text: "By 2001 São Paulo trades **350 million reais** a day. Less revenue than hoped, less liquidity.", cite: BR_LESS },
            { text: "September 2001: stock trades will be **exempt** from the tax.", cite: BR_EXEMPT },
          ],
        },
        {
          kind: "choice",
          q: "What was the unintended consequence of Brazil's 1997 transaction tax?",
          options: ["Institutions traded Brazilian stocks as ADRs in New York", "Trading in São Paulo doubled", "Revenue beat expectations", "New York banned Brazilian ADRs"],
          answer: 0,
          why: "Traders avoided the tax by moving to New York.",
          cite: BR_ADR,
        },
        {
          kind: "truefalse",
          q: "The tax raised more revenue than expected.",
          answer: false,
          why: "It raised less, because trading moved away, and Brazilian markets lost liquidity.",
          cite: BR_LESS,
        },
        {
          kind: "number",
          q: "Daily Bovespa volume fell from 1.2 billion to 350 million reais. By how many **million** reais a day did it fall?",
          answer: 850,
          unit: "million reais",
          why: "1,200 − 350 = 850 million reais a day (derived from the book's figures).",
          cite: BR_VOL,
        },
        {
          kind: "number",
          q: "At 0.38%, how much tax does a 1,000,000-real trade pay?",
          answer: 3800,
          unit: "reais",
          illustrative: true,
          why: "0.38% × 1,000,000 = 3,800 reais, on every trade.",
          cite: BR_TAX,
        },
        {
          kind: "choice",
          q: "What do IOSCO, the WFE and ICSA mainly do?",
          options: ["Offer forums to share information and explore solutions", "Impose binding standards on members", "Prosecute violators in court", "Set margin requirements"],
          answer: 0,
          why: "They can't easily impose standards; they coordinate and share information.",
          cite: INTL,
        },
        {
          kind: "recap",
          points: [
            { text: "**IOSCO**, **WFE**, **ICSA** coordinate across borders but can't easily impose standards.", cite: INTL },
            { text: "Brazil's **0.38%** tax drove trading to New York **ADRs**.", cite: BR_ADR },
            { text: "Result: **less revenue**, **less liquidity** at home.", cite: BR_LESS },
          ],
        },
      ],
    },

    // ── Lesson 11 ─────────────────────────────────────────────────────────
    {
      id: "3.7-points",
      sec: "3.7",
      title: "Some points to remember",
      pages: "66",
      steps: [
        { kind: "idea", title: "Point 1 · Two sides", body: "The **buy side** buys liquidity services. The **sell side** provides them.", cite: P1 },
        { kind: "idea", title: "Point 2 · Dealers and brokers", body: "**Dealers** trade for their own account. **Brokers** trade for others.", cite: P2 },
        {
          kind: "truefalse",
          q: "A broker trades for its own account.",
          answer: false,
          why: "Brokers trade for others; dealers trade for their own account.",
          cite: P2,
        },
        { kind: "idea", title: "Point 3 · Stocks get too much attention", body: "Despite the media focus, stocks are only about **20%** of U.S. capital wealth.", cite: STOCKS20 },
        {
          kind: "choice",
          q: "What does Harris say about stocks in his points to remember?",
          options: ["They get more attention than their values would indicate", "They are most of the country's wealth", "They never trade with dealers", "They are in zero net supply"],
          answer: 0,
          why: "Stocks are about 20% of capital wealth; real estate and bonds are most of the rest.",
          cite: P3,
        },
        { kind: "idea", title: "Point 4 · Markets compete for orders", body: "**Many markets** compete for **order flow**: the same instrument can often trade in several places.", cite: P4 },
        { kind: "idea", title: "Point 5 · Exchanges vs brokerages", body: "**Order-driven exchanges** arrange trades for clients, as brokerages do, so the two often **compete**.", cite: ORDER_DRIVEN },
        {
          kind: "multi",
          q: "Which of these are among Harris's points to remember?",
          options: ["Many markets compete for order flow", "Exchanges often compete with brokerages to arrange trades", "Stocks represent most of the country's wealth", "Regulation always serves the common good"],
          answer: [0, 1],
          why: "Stocks are only about 20% of wealth, and §3.5 warns that rules often don't serve the common good.",
          cite: P5,
        },
        {
          kind: "see",
          title: "Points 6 and 7 · Who regulates, in layers",
          illus: RegLayers,
          beats: [
            { text: "**Legislatures** provide the regulatory **framework**.", cite: P6 },
            { text: "**SROs** provide the **details**: trading rules, capital standards, conduct." },
            { text: "**Governmental regulatory agencies** provide **oversight**." },
            { text: "**Private regulators** try to create **respected standards**.", cite: P7 },
          ],
        },
        {
          kind: "match",
          q: "Who provides what?",
          pairs: [
            ["Legislatures", "The framework"],
            ["SROs", "The details"],
            ["Government agencies", "Oversight"],
            ["Private regulators", "Respected standards"],
          ],
          cite: P6,
        },
        {
          kind: "fill",
          q: "Legislatures provide the regulatory ___, the SROs provide the ___, and governmental regulatory agencies provide ___.",
          bank: ["framework", "details", "oversight", "liquidity", "order flow"],
          answer: ["framework", "details", "oversight"],
          why: "Point 6, word for word.",
          cite: P6,
        },
        {
          kind: "truefalse",
          q: "Governmental regulatory agencies provide the detailed rules of market regulation.",
          answer: false,
          why: "SROs provide the details; agencies provide oversight.",
          cite: P6,
        },
        {
          kind: "recap",
          title: "Chapter 3 in four lines",
          points: [
            { text: "Buy side buys liquidity; sell side provides it. Dealers trade for themselves, brokers for others.", cite: P1 },
            { text: "Stocks get more attention than their value warrants.", cite: P3 },
            { text: "Markets compete for order flow; exchanges compete with brokerages.", cite: P5 },
            { text: "Legislatures: framework. SROs: details. Agencies: oversight. Private regulators: standards.", cite: P6 },
          ],
        },
      ],
    },
  ],
  checkpoint: [
    {
      kind: "choice",
      q: "Which U.S. agency regulates commodity futures markets?",
      options: ["The CFTC", "The SEC", "The Federal Reserve Board", "The NASD"],
      answer: 0,
      why: "The CFTC regulates commodity spot, forward and futures markets.",
      cite: CFTC_SCOPE,
    },
    {
      kind: "truefalse",
      q: "Exchanges, clearinghouses and trader associations are all private regulatory agencies.",
      answer: true,
      why: "All three regulate their members: they are self-regulatory organizations.",
      cite: SRO_TYPES,
    },
    {
      kind: "choice",
      q: "What do speculative (Reg T) margins specify?",
      options: ["The minimum capital to buy or sell securities and hold positions", "The maximum commission a broker may charge", "The daily variation margin on futures", "The fee for listing a new stock"],
      answer: 0,
      why: "The Fed sets them in its Regulation T.",
      cite: SPEC_MARGIN,
    },
  ],
};
