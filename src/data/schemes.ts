import type {
  Occupation,
  EducationLevel,
  Residence,
  Gender,
  Category,
} from "../lib/profile";

export type SchemeId =
  | "pm-kisan"
  | "pm-jay"
  | "pmay-urban"
  | "pmay-gramin"
  | "nsp-scholarship"
  | "mgnrega"
  | "pm-vishwakarma"
  | "stand-up-india"
  | "ignoaps"
  | "apy"
  | "ssy"
  | "pmmvy"
  | "adip"
  | "state-farmer-support"
  | "state-merit-scholarship"
  | "state-pension-support";

export type GovLevel = "central" | "state";
export type Verdict = "eligible" | "verify" | "ineligible";

export const SCHEME_CATEGORIES = [
  "Education & Scholarships",
  "Agriculture & Farmers",
  "Women & Child Welfare",
  "Healthcare",
  "Housing",
  "Employment & Skill Development",
  "Pension & Senior Citizens",
  "Disability Benefits",
  "Entrepreneurship & MSMEs",
  "Social Welfare",
] as const;
export type SchemeCategory = (typeof SCHEME_CATEGORIES)[number];

export const CATEGORY_LABELS_HI: Record<SchemeCategory, string> = {
  "Education & Scholarships": "शिक्षा और छात्रवृत्ति",
  "Agriculture & Farmers": "कृषि और किसान",
  "Women & Child Welfare": "महिला एवं बाल कल्याण",
  Healthcare: "स्वास्थ्य सेवा",
  Housing: "आवास",
  "Employment & Skill Development": "रोज़गार और कौशल विकास",
  "Pension & Senior Citizens": "पेंशन और वरिष्ठ नागरिक",
  "Disability Benefits": "दिव्यांगजन लाभ",
  "Entrepreneurship & MSMEs": "उद्यमिता और MSME",
  "Social Welfare": "सामाजिक कल्याण",
};

export interface SchemeDoc {
  id: SchemeId;
  name: string;
  nameHi: string;
  category: SchemeCategory;
  govtLevel: GovLevel;
  purpose: { en: string; hi: string };
  beneficiaries: { en: string; hi: string };
  benefits: { en: string; hi: string };


  criteria: {
    ageMin?: number | null;
    ageMax?: number | null;

    incomeMaxLakh?: number | null;

    household?: Array<"bpl" | "not-required"> | null;
    occupations?: Occupation[] | null;
    educationMin?: EducationLevel | null;
    residence?: Residence[] | null;
    gender?: Gender[] | null;
    categoryAnyOf?: Category[] | null;

    anyOf?: Array<{
      gender?: Gender[] | null;
      categoryAnyOf?: Category[] | null;
    }> | null;
    ownsLand?: boolean | null;
    hasDisability?: boolean | null;
    hasGirlChildUnder10?: boolean | null;
    pregnantOrNewMother?: boolean | null;

    exclusions?: string[] | null;

    needsExtraVerification?: string[] | null;
  };

  eligibilityHuman: { en: string[]; hi: string[] };
  exclusionsHuman?: { en: string[]; hi: string[] } | undefined;
  documents: { en: string[]; hi: string[] };
  applicationSteps: { en: string[]; hi: string[] };
  infoUrl: string;
  applyUrl?: string | null;
  applyNote?: { en: string; hi: string } | undefined;
  sourceVerificationDate: string;
  lastReviewedDate: string;

  needsVerification: string[];
}

export const SCHEMES: SchemeDoc[] = [
  {
    id: "pm-kisan",
    name: "PM-KISAN",
    nameHi: "पीएम-किसान",
    category: "Agriculture & Farmers",
    govtLevel: "central",
    purpose: {
      en: "Income support of ₹6,000 a year to landholding farmer families, paid in three equal instalments of ₹2,000 directly to the bank account.",
      hi: "भूमिधारक किसान परिवारों को ₹6,000 की वार्षिक आय-सहायता, ₹2,000 की तीन किश्तों में सीधे बैंक खाते में।",
    },
    beneficiaries: {
      en: "Landholding farmer families (husband, wife and minor children) with cultivable land as per land records.",
      hi: "भूमि रिकॉर्ड के अनुसार कृषि योग्य भूमि वाले किसान परिवार (पति, पत्नी और नाबालिग बच्चे)।",
    },
    benefits: {
      en: "₹6,000 per year in three instalments of ₹2,000, transferred directly to the beneficiary's bank account (DBT).",
      hi: "प्रति वर्ष ₹6,000 — ₹2,000 की तीन किश्तें, सीधे लाभार्थी के बैंक खाते में (DBT)।",
    },
    criteria: {
      ageMin: 18,
      ownsLand: true,
      occupations: ["farmer"],
      exclusions: ["incomeTaxPayer"],
      needsExtraVerification: ["landRecordStatus", "familyTaxStatus"],
    },
    eligibilityHuman: {
      en: [
        "A farmer family holding cultivable land (as per land records).",
        "At least one adult member of the family (18+) applies as the beneficiary.",
        "No member of the family paid income tax in the last assessment year.",
      ],
      hi: [
        "कृषि योग्य भूमि धारक किसान परिवार (भूमि रिकॉर्ड के अनुसार)।",
        "परिवार का कोई एक वयस्क सदस्य (18+) लाभार्थी बनकर आवेदन करता है।",
        "पिछले मूल्यांकन वर्ष में परिवार के किसी सदस्य ने आयकर नहीं चुकाया हो।",
      ],
    },
    exclusionsHuman: {
      en: [
        "Any family member was an income-tax payer in the last assessment year.",
        "Institutional landholders; retired pensioners receiving more than ₹10,000 per month; serving/retired employees of certain government categories.",
      ],
      hi: [
        "पिछले मूल्यांकन वर्ष में परिवार का कोई सदस्य आयकरदाता रहा हो।",
        "संस्थागत भूमिधारक; ₹10,000/माह से अधिक पेंशन पाने वाले सेवानिवृत्त; कुछ सरकारी श्रेणियों के सेवारत/सेवानिवृत्त कर्मचारी।",
      ],
    },
    documents: {
      en: [
        "Aadhaar number (identity; no document upload needed at registration)",
        "Land record / khatauni / 7-12 extract showing cultivable land",
        "Bank account in the farmer's name (Aadhaar-linked)",
        "Mobile number",
      ],
      hi: [
        "आधार संख्या (पहचान के लिए)",
        "भूमि रिकॉर्ड / खसरा-खतौनी / 7-12 उतारा",
        "किसान के नाम का बैंक खाता (आधार-लिंक्ड)",
        "मोबाइल नंबर",
      ],
    },
    applicationSteps: {
      en: [
        "Register on the official portal (Farmers Corner → New Farmer Registration) or take help from a CSC / local revenue officer.",
        "Enter Aadhaar, state, district and land details exactly as in the land records.",
        "The state/district verifies land and eligibility before benefits start.",
        "Track instalments any time under 'Beneficiary Status' on the portal.",
      ],
      hi: [
        "आधिकारिक पोर्टल पर पंजीकरण करें (Farmers Corner → New Farmer Registration) या CSC / स्थानीय राजस्व अधिकारी से मदद लें।",
        "आधार, राज्य, ज़िला और भूमि विवरण भूमि रिकॉर्ड के अनुसार भरें।",
        "राज्य/ज़िला भूमि और पात्रता की जाँच करता है, तब लाभ शुरू होता है।",
        "पोर्टल के 'Beneficiary Status' से किश्तों की स्थिति देखें।",
      ],
    },
    infoUrl: "https://pmkisan.gov.in/",
    applyUrl: "https://pmkisan.gov.in/RegistrationFormupdated.aspx",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Registration support and land-record formats vary by district — confirm at a CSC or the local revenue office.",
    ],
  },
  {
    id: "pm-jay",
    name: "Ayushman Bharat PM-JAY",
    nameHi: "आयुष्मान भारत PM-JAY",
    category: "Healthcare",
    govtLevel: "central",
    purpose: {
      en: "Health cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation, with no cap on family size, age or gender.",
      hi: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य कवर (अस्पताल में भर्ती उपचार) — परिवार के आकार, आयु या लिंग की कोई सीमा नहीं।",
    },
    beneficiaries: {
      en: "Low-income families identified in the SECC 2011 list or state lists, and — since 2024-25 — all citizens aged 70+ regardless of income (Ayushman Vay Vandana).",
      hi: "SECC 2011 सूची या राज्य सूचियों में शामिल कम-आय परिवार, और 2024-25 से 70+ आयु के सभी नागरिक (आयुष्मान वय वंदना)।",
    },
    benefits: {
      en: "Cashless treatment up to ₹5 lakh per family per year at empanelled public and private hospitals across India.",
      hi: "देशभर के पैनल अस्पतालों में प्रति परिवार प्रति वर्ष ₹5 लाख तक नकद-रहित इलाज।",
    },
    criteria: {
      ageMin: null,
      household: ["bpl"],
      needsExtraVerification: ["familyInSeccOrStateList"],
    },
    eligibilityHuman: {
      en: [
        "Family appears in the SECC 2011 database (deprivation/occupational criteria) or the state's low-income list.",
        "Since 2024-25, every citizen aged 70 or above qualifies irrespective of income.",
        "No cap on family size, age or gender.",
      ],
      hi: [
        "परिवार SECC 2011 डेटाबेस (वंचित/व्यावसायिक मानदंड) या राज्य की कम-आय सूची में हो।",
        "2024-25 से 70 वर्ष या अधिक आयु के सभी नागरिक आय की परवाह किए बिना पात्र हैं।",
        "परिवार के आकार, आयु या लिंग की कोई सीमा नहीं।",
      ],
    },
    documents: {
      en: [
        "Aadhaar or another approved ID",
        "Ration card (to match the family against the SECC/state list)",
        "Mobile number for registration",
      ],
      hi: [
        "आधार या कोई मान्य पहचान पत्र",
        "राशन कार्ड (परिवार को सूची से मिलाने के लिए)",
        "पंजीकरण के लिए मोबाइल नंबर",
      ],
    },
    applicationSteps: {
      en: [
        "Use the official 'Check Eligibility' tool on beneficiary.nha.gov.in or the Ayushman app to see whether the family is on the list.",
        "If listed, complete e-KYC and download the Ayushman card at a CSC, empanelled hospital kiosk or Ayushman Arogya Mandir.",
        "Show the card at any empanelled hospital for cashless treatment.",
      ],
      hi: [
        "beneficiary.nha.gov.in के 'Check Eligibility' टूल या आयुष्मान ऐप से देखें कि परिवार सूची में है या नहीं।",
        "सूची में हों तो CSC, अस्पताल कियोस्क या आयुष्मान आरोग्य मंदिर पर e-KYC कर कार्ड बनवाएँ।",
        "किसी भी पैनल अस्पताल में कार्ड दिखाकर नकद-रहित इलाज पाएँ।",
      ],
    },
    infoUrl: "https://pmjay.gov.in/",
    applyUrl: "https://beneficiary.nha.gov.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Family-in-list status can only be confirmed through the official eligibility check; some states run their own implementation societies.",
    ],
  },
  {
    id: "pmay-urban",
    name: "PMAY-U 2.0 (Interest Subsidy Scheme)",
    nameHi: "पीएमएवाई-यू 2.0 (ब्याज सब्सिडी योजना)",
    category: "Housing",
    govtLevel: "central",
    purpose: {
      en: "Interest subsidy on home loans for first-time pucca-house buyers in urban areas, under the Interest Subsidy Scheme (ISS) of PMAY-U 2.0.",
      hi: "शहरी क्षेत्र में पहले पक्के घर के खरीदारों के गृह ऋण पर ब्याज सब्सिडी — पीएमएवाई-यू 2.0 की ब्याज सब्सिडी योजना (ISS)।",
    },
    beneficiaries: {
      en: "Urban households without a pucca house anywhere in India: EWS (income up to ₹3 lakh), LIG (₹3–6 lakh), MIG (₹6–9 lakh).",
      hi: "भारत में कहीं भी पक्का घर न रखने वाले शहरी परिवार: EWS (≤₹3 लाख), LIG (₹3–6 लाख), MIG (₹6–9 लाख)।",
    },
    benefits: {
      en: "Interest subsidy credited upfront to the home-loan account, lowering monthly EMIs; loan and property value caps apply per official circulars.",
      hi: "ब्याज सब्सिडी सीधे गृह ऋण खाते में जमा होती है, जिससे मासिक किश्त घटती है; ऋण व संपत्ति मूल्य सीमाएँ आधिकारिक परिपत्रों के अनुसार लागू।",
    },
    criteria: {
      ageMin: 18,
      incomeMaxLakh: 9,
      residence: ["urban"],
      needsExtraVerification: ["noPuccaHouseAnywhere", "loanSanction"],
    },
    eligibilityHuman: {
      en: [
        "Annual household income up to ₹9 lakh (EWS ≤3L, LIG ≤6L, MIG ≤9L).",
        "The family must not own a pucca house anywhere in India on the date of application.",
        "A home loan from a participating lending institution for purchase/construction of the first pucca house.",
      ],
      hi: [
        "वार्षिक आय ≤ ₹9 लाख (EWS ≤3, LIG ≤6, MIG ≤9 लाख)।",
        "आवेदन की तिथि को परिवार के पास भारत में कहीं भी पक्का मकान न हो।",
        "ISS में भाग लेने वाले ऋणदाता से पहले पक्के घर के लिए गृह ऋण।",
      ],
    },
    documents: {
      en: [
        "Aadhaar and PAN of all applicants/co-owners",
        "Income proof (salary slips / ITR / income certificate)",
        "Bank statements (6–12 months)",
        "Property documents of the house being purchased/constructed",
        "Self-declaration that the family owns no pucca house",
      ],
      hi: [
        "आधार और पैन (सभी आवेदक/सह-स्वामी)",
        "आय प्रमाण (वेतन पर्ची / ITR / आय प्रमाणपत्र)",
        "बैंक स्टेटमेंट (6–12 महीने)",
        "खरीदे/निर्माण होने वाले घर के दस्तावेज़",
        "घोषणा-पत्र कि परिवार के पास पक्का मकान नहीं है",
      ],
    },
    applicationSteps: {
      en: [
        "Confirm your income slab (EWS/LIG/MIG) and that no family member owns a pucca house.",
        "Take a home loan from a Primary Lending Institution participating in ISS.",
        "The lender submits the subsidy claim under ISS; the subsidy is credited to your loan account.",
      ],
      hi: [
        "अपनी आय श्रेणी (EWS/LIG/MIG) जाँचें और सुनिश्चित करें कि परिवार के पास पक्का घर नहीं है।",
        "ISS में भाग लेने वाले बैंक/वित्त कंपनी से गृह ऋण लें।",
        "ऋणदाता ISS के तहत सब्सिडी दावा जमा करता है; सब्सिडी आपके ऋण खाते में जमा होती है।",
      ],
    },
    infoUrl: "https://pmay-urban.gov.in/credit-linked-subsidy-scheme",
    applyUrl: "https://pmaymis.gov.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Exact subsidy percentage and maximum subsidy under ISS depend on loan amount and current circulars — confirm with the lender and the official ISS page.",
    ],
  },
  {
    id: "pmay-gramin",
    name: "PMAY-G (Rural Housing)",
    nameHi: "पीएमएवाई-जी (ग्रामीण आवास)",
    category: "Housing",
    govtLevel: "central",
    purpose: {
      en: "Assistance to rural households that are houseless or live in dilapidated houses, identified through the Awaas+ survey list.",
      hi: "बेघर या जर्जर मकान में रहने वाले ग्रामीण परिवारों को सहायता — आवास+ सर्वे सूची के आधार पर।",
    },
    beneficiaries: {
      en: "Rural households on the Awaas+ permanent wait list (earlier SECC 2011) without a pucca house.",
      hi: "आवास+ स्थायी प्रतीक्षा सूची (पूर्व में SECC 2011) में शामिल, बिना पक्के घर वाले ग्रामीण परिवार।",
    },
    benefits: {
      en: "Construction assistance paid in instalments directly to the beneficiary's bank account, tied to construction stages; includes support for toilets (SBM-G) and wage days (MGNREGA convergence).",
      hi: "निर्माण चरणों से जुड़ी किश्तों में सहायता सीधे लाभार्थी के बैंक खाते में; शौचालय (SBM-G) और मज़दूरी दिवस (मनरेगा) का समन्वय भी।",
    },
    criteria: {
      residence: ["rural"],
      needsExtraVerification: ["awaasPlusListStatus"],
    },
    eligibilityHuman: {
      en: [
        "Household is on the Awaas+ permanent wait list for its district/block (survey-based).",
        "House does not have a pucca roof/wall (kuccha or dilapidated).",
      ],
      hi: [
        "परिवार अपने ज़िले/प्रखंड की आवास+ स्थायी प्रतीक्षा सूची में हो (सर्वे आधारित)।",
        "घर में पक्की छत/दीवार नहीं (कच्चा या जर्जर)।",
      ],
    },
    documents: {
      en: [
        "Aadhaar of the household head",
        "Job card or BPL/SECC-linked documentation as your state requires",
        "Aadhaar-linked bank account",
        "Land/plot documents",
      ],
      hi: [
        "परिवार मुखिया का आधार",
        "जॉब कार्ड या बीपीएल/SECC-आधारित दस्तावेज़ (राज्य के अनुसार)",
        "आधार-लिंक्ड बैंक खाता",
        "भूमि/प्लॉट दस्तावेज़",
      ],
    },
    applicationSteps: {
      en: [
        "Check the Awaas+ list at your Gram Panchayat or on pmayg.nic.in.",
        "If listed, apply through the Gram Panchayat with Aadhaar and bank details.",
        "Instalments are transferred directly to the beneficiary's bank account as construction progresses.",
      ],
      hi: [
        "ग्राम पंचायत या pmayg.nic.in पर आवास+ सूची जाँचें।",
        "सूची में हों तो ग्राम पंचायत से आधार और बैंक विवरण के साथ आवेदन करें।",
        "निर्माण के साथ किश्तें सीधे लाभार्थी के बैंक खाते में आती हैं।",
      ],
    },
    infoUrl: "https://pmayg.nic.in/",
    applyUrl: "https://pmayg.nic.in/netiayHome/home.aspx",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Inclusion in the Awaas+ wait list is survey-based and state-managed; JANSAHAY cannot confirm list status.",
    ],
  },
  {
    id: "nsp-scholarship",
    name: "National Scholarship Portal (Pre/Post-Matric)",
    nameHi: "राष्ट्रीय छात्रवृत्ति पोर्टल (प्री/पोस्ट-मैट्रिक)",
    category: "Education & Scholarships",
    govtLevel: "central",
    purpose: {
      en: "Scholarships for SC/ST/OBC and minority students at pre-matric and post-matric levels, applied through One-Time Registration (OTR) on the National Scholarship Portal.",
      hi: "SC/ST/OBC और अल्पसंख्यक छात्रों के लिए प्री-मैट्रिक व पोस्ट-मैट्रिक छात्रवृत्तियाँ — राष्ट्रीय छात्रवृत्ति पोर्टल पर OTR से आवेदन।",
    },
    beneficiaries: {
      en: "Students of recognised institutions (class 9 onwards, depending on the scheme) from eligible SC/ST/OBC/minority families within income ceilings.",
      hi: "मान्यता प्राप्त संस्थानों के छात्र (योजना के अनुसार कक्षा 9 से) — आय-सीमा के भीतर SC/ST/OBC/अल्पसंख्यक परिवारों से।",
    },
    benefits: {
      en: "Tuition/maintenance support credited directly to the student's bank account; amounts vary by scheme and class level.",
      hi: "फीस/जीवन-यापन सहायता सीधे छात्र के बैंक खाते में; राशि योजना और कक्षा के अनुसार अलग-अलग।",
    },
    criteria: {
      occupations: ["student"],
      categoryAnyOf: ["sc", "st", "obc"],
      incomeMaxLakh: 2.5,
      needsExtraVerification: [
        "exactSchemeIncomeCeiling",
        "enrolledInstitution",
        "marksCriteria",
      ],
    },
    eligibilityHuman: {
      en: [
        "Student of a recognised institution (class 9 onwards for the relevant schemes).",
        "Family income within the scheme's ceiling (commonly ₹2.5 lakh for post-matric SC/OBC schemes — verify the exact scheme).",
        "Belongs to SC / ST / OBC or a notified minority community for the corresponding component.",
        "Not receiving another scholarship for the same course.",
      ],
      hi: [
        "मान्यता प्राप्त संस्थान का छात्र (संबंधित योजना के लिए कक्षा 9 से)।",
        "परिवार की आय योजना की सीमा में (पोस्ट-मैट्रिक SC/OBC हेतु सामान्यतः ₹2.5 लाख — सटीक योजना जाँचें)।",
        "SC / ST / OBC या अधिसूचित अल्पसंख्यक समुदाय से।",
        "उसी पाठ्यक्रम के लिए दूसरी छात्रवृत्ति न ले रहा हो।",
      ],
    },
    documents: {
      en: [
        "One-Time Registration (OTR) number from scholarships.gov.in",
        "Aadhaar (or enrolment ID) and student's bank account (parent's for minors)",
        "Income certificate",
        "Caste/minority certificate, where applicable",
        "Previous exam marksheet and fee receipt",
        "Institution verification",
      ],
      hi: [
        "scholarships.gov.in से OTR नंबर",
        "छात्र का आधार (या नामांकन आईडी) और बैंक खाता (नाबालिग हों तो अभिभावक का)",
        "आय प्रमाणपत्र",
        "जाति/अल्पसंख्यक प्रमाणपत्र (जहाँ लागू)",
        "पिछली परीक्षा की मार्कशीट और फीस रसीद",
        "संस्थान सत्यापन",
      ],
    },
    applicationSteps: {
      en: [
        "Create an OTR (One-Time Registration) on scholarships.gov.in with Aadhaar authentication.",
        "Log in with the OTR during the open application window and fill the scheme application.",
        "The institution verifies first; then district/state verification before the scholarship is credited.",
      ],
      hi: [
        "scholarships.gov.in पर आधार प्रमाणीकरण से OTR बनाएँ।",
        "आवेदन विंडो खुलने पर OTR से लॉग इन कर आवेदन भरें।",
        "पहले संस्थान सत्यापन करता है; फिर ज़िला/राज्य सत्यापन और भुगतान।",
      ],
    },
    infoUrl: "https://scholarships.gov.in/",
    applyUrl: "https://scholarships.gov.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Application windows change every academic year — check the portal during the open window.",
      "Exact income ceilings and marks criteria vary by the specific NSP scheme.",
    ],
  },
  {
    id: "mgnrega",
    name: "MGNREGA (Rural Employment Guarantee)",
    nameHi: "मनरेगा (ग्रामीण रोज़गार गारंटी)",
    category: "Employment & Skill Development",
    govtLevel: "central",
    purpose: {
      en: "Guaranteed 100 days of unskilled manual wage employment per rural household per financial year, on demand.",
      hi: "हर ग्रामीण परिवार को प्रति वित्तीय वर्ष, माँग पर, 100 दिन की अकुशल श्रम रोज़गार गारंटी।",
    },
    beneficiaries: {
      en: "Adult members (18+) of rural households willing to do unskilled manual work.",
      hi: "ग्रामीण परिवारों के वयस्क सदस्य (18+) जो अकुशल श्रम करने को तैयार हों।",
    },
    benefits: {
      en: "Wage employment at the state's notified MGNREGA wage rate, paid into the worker's bank/post-office account within the statutory timeline.",
      hi: "राज्य की अधिसूचित मनरेगा मज़दूरी दर पर रोज़गार; मज़दूरी कानूनी समय-सीमा में बैंक/डाक खाते में।",
    },
    criteria: {
      ageMin: 18,
      residence: ["rural"],
      occupations: ["daily-wage", "unemployed", "farmer", "homemaker", "other"],
    },
    eligibilityHuman: {
      en: [
        "Adult member (18+) of a rural household willing to do unskilled manual work.",
        "Apply for a job card at the Gram Panchayat; work is provided on demand within 15 days.",
      ],
      hi: [
        "ग्रामीण परिवार का वयस्क सदस्य (18+) जो अकुशल श्रम करने को तैयार हो।",
        "ग्राम पंचायत से जॉब कार्ड के लिए आवेदन करें; माँग के 15 दिनों के भीतर काम।",
      ],
    },
    documents: {
      en: [
        "Aadhaar of the adult member(s)",
        "Proof of residence (ration card / voter ID)",
        "Photograph",
        "Bank or post-office account (Aadhaar-linked) for wage payment",
      ],
      hi: [
        "वयस्क सदस्य का आधार",
        "निवास प्रमाण (राशन कार्ड / वोटर आईडी)",
        "फोटो",
        "बैंक/डाकघर खाता (आधार-लिंक्ड) — मज़दूरी के लिए",
      ],
    },
    applicationSteps: {
      en: [
        "Apply for a job card at the Gram Panchayat (free of cost).",
        "Submit a written work demand to the Panchayat / Programme Officer.",
        "Work must be provided within 15 days of the demand; wages are paid into the bank account.",
      ],
      hi: [
        "ग्राम पंचायत में निःशुल्क जॉब कार्ड के लिए आवेदन करें।",
        "पंचायत / कार्यक्रम अधिकारी को लिखित माँग दें।",
        "माँग के 15 दिनों के भीतर काम देना अनिवार्य है; मज़दूरी बैंक खाते में आती है।",
      ],
    },
    infoUrl: "https://nrega.dord.gov.in/",
    applyUrl: null,
    applyNote: {
      en: "Registration happens offline at the Gram Panchayat — there is no public online application form.",
      hi: "पंजीकरण ग्राम पंचायत में ऑफ़लाइन होता है — कोई सार्वजनिक ऑनलाइन आवेदन फ़ॉर्म नहीं है।",
    },
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "State wage rates change every financial year — check the current rate on nrega.nic.in.",
    ],
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma",
    nameHi: "पीएम विश्वकर्मा",
    category: "Entrepreneurship & MSMEs",
    govtLevel: "central",
    purpose: {
      en: "End-to-end support for traditional artisans and craftspeople in 18 notified trades: toolkit incentive, training, collateral-free credit at 5% concessional interest, and digital-transaction incentives.",
      hi: "18 अधिसूचित शिल्पों के पारंपरिक कारीगरों की पूरी सहायता: टूलकिट प्रोत्साहन, प्रशिक्षण, बिना गारंटी ऋण (5% रियायती ब्याज) और डिजिटल लेन-देन प्रोत्साहन।",
    },
    beneficiaries: {
      en: "Self-employed artisans and craftspeople engaged in one of the 18 notified family-based trades (carpenter, blacksmith, potter, cobbler, tailor, barber, etc.).",
      hi: "18 अधिसूचित पारिवारिक शिल्पों में से एक में स्व-रोज़गार कारीगर (बढ़ई, लोहार, कुम्हार, मोची, दर्जी, नाई आदि)।",
    },
    benefits: {
      en: "Toolkit e-incentive, skill training with a stipend, collateral-free enterprise loans (up to ₹3 lakh in two tranches) at 5% interest, and digital-transaction incentives.",
      hi: "टूलकिट राशि, वेतन-सहित कौशल प्रशिक्षण, 5% ब्याज पर बिना गारंटी ऋण (दो किश्तों में ₹3 लाख तक) और डिजिटल लेन-देन प्रोत्साहन।",
    },
    criteria: {
      ageMin: 18,
      occupations: ["artisan", "small-business"],
      exclusions: ["incomeTaxPayer", "governmentEmployee"],
      needsExtraVerification: ["tradeIn18List", "noSimilarLoan5Years"],
    },
    eligibilityHuman: {
      en: [
        "Minimum 18 years of age on the date of registration.",
        "Engaged in one of the 18 notified family-based trades, self-employed (not in formal/organised-sector employment).",
        "Only one member per family can register.",
        "No loans under similar credit schemes in the past 5 years (verify current rule at enrolment).",
      ],
      hi: [
        "पंजीकरण की तिथि को न्यूनतम 18 वर्ष आयु।",
        "18 अधिसूचित पारिवारिक शिल्पों में से एक में स्व-रोज़गार (संगठित क्षेत्र की नौकरी नहीं)।",
        "एक परिवार से केवल एक सदस्य पंजीकृत हो सकता है।",
        "पिछले 5 वर्षों में समान ऋण योजनाओं से ऋण न लिया हो (नामांकन पर जाँचें)।",
      ],
    },
    exclusionsHuman: {
      en: [
        "Government employees and their family members.",
        "Income-tax payers.",
      ],
      hi: [
        "सरकारी कर्मचारी और उनके परिवार के सदस्य।",
        "आयकरदाता।",
      ],
    },
    documents: {
      en: [
        "Aadhaar",
        "Bank account (Aadhaar-linked)",
        "Ration card (for family details)",
        "Mobile number",
        "Details of trade/practice",
      ],
      hi: [
        "आधार",
        "बैंक खाता (आधार-लिंक्ड)",
        "राशन कार्ड (परिवार विवरण)",
        "मोबाइल नंबर",
        "कार्य/शिल्प का विवरण",
      ],
    },
    applicationSteps: {
      en: [
        "Enrol at a Common Service Centre (CSC) or on the official portal with Aadhaar and trade details.",
        "Complete the basic orientation/digital-literacy module.",
        "Toolkit incentive is credited after enrolment verification.",
        "For the credit component, apply for the loan through the bank after training enrolment.",
      ],
      hi: [
        "CSC या आधिकारिक पोर्टल पर आधार और शिल्प विवरण से नामांकन करें।",
        "बुनियादी ओरिएंटेशन/डिजिटल-साक्षरता मॉड्यूल पूरा करें।",
        "नामांकन सत्यापन के बाद टूलकिट राशि खाते में आती है।",
        "ऋण के लिए प्रशिक्षण नामांकन के बाद बैंक से आवेदन करें।",
      ],
    },
    infoUrl: "https://pmvishwakarma.gov.in/",
    applyUrl: "https://pmvishwakarma.gov.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "The 18-trade list and the 'no similar loan in 5 years' rule should be confirmed on the official portal during enrolment.",
    ],
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India",
    nameHi: "स्टैंड-अप इंडिया",
    category: "Entrepreneurship & MSMEs",
    govtLevel: "central",
    purpose: {
      en: "Bank loans of ₹10 lakh to ₹1 crore to SC/ST and women entrepreneurs for setting up a new (greenfield) manufacturing, services, trading or agri-allied venture.",
      hi: "SC/ST और महिला उद्यमियों को नए (ग्रीनफ़ील्ड) विनिर्माण, सेवा, व्यापार या कृषि-संबद्ध उद्यम के लिए ₹10 लाख–₹1 करोड़ का बैंक ऋण।",
    },
    beneficiaries: {
      en: "Women and SC/ST entrepreneurs aged 18+, or non-individual enterprises with at least 51% shareholding by SC/ST/women.",
      hi: "18+ महिला और SC/ST उद्यमी, या कम-से-कम 51% हिस्सेदारी SC/ST/महिलाओं के पास वाले उद्यम।",
    },
    benefits: {
      en: "Bank loan between ₹10 lakh and ₹1 crore for a greenfield venture, with handholding support via the Standup Mitra portal and RuPay debit card for the working-capital component.",
      hi: "ग्रीनफ़ील्ड उद्यम के लिए ₹10 लाख–₹1 करोड़ का बैंक ऋण; Standup Mitra पोर्टल से सहयोग और कार्यशील पूँजी हेतु रुपे डेबिट कार्ड।",
    },
    criteria: {
      ageMin: 18,
      occupations: ["small-business", "unemployed", "salaried", "homemaker", "other"],

      anyOf: [{ gender: ["female"] }, { categoryAnyOf: ["sc", "st"] }],
      needsExtraVerification: ["greenfieldProject", "notBankDefaulter"],
    },
    eligibilityHuman: {
      en: [
        "Applicant is 18 or older.",
        "Applicant is a woman OR belongs to SC/ST (for non-individual enterprises, at least 51% shareholding must be held by the eligible group).",
        "Loan is for a greenfield venture — a first-time venture in manufacturing, services, trading or agri-allied activity.",
        "Applicant must not be a defaulter to any bank.",
      ],
      hi: [
        "आवेदक 18 वर्ष या अधिक।",
        "आवेदक महिला हो या SC/ST से (गैर-व्यक्तिगत उद्यम में कम-से-कम 51% हिस्सेदारी पात्र समूह के पास)।",
        "ऋण नए (ग्रीनफ़ील्ड) उद्यम के लिए — विनिर्माण/सेवा/व्यापार/कृषि-संबद्ध।",
        "आवेदक किसी बैंक का चूककर्ता न हो।",
      ],
    },
    documents: {
      en: [
        "Aadhaar / PAN",
        "Caste certificate (for SC/ST applicants)",
        "Project report / business plan",
        "Bank statements (no-default record)",
        "Identity and address proof",
      ],
      hi: [
        "आधार / पैन",
        "जाति प्रमाणपत्र (SC/ST आवेदक के लिए)",
        "परियोजना रिपोर्ट / व्यापार योजना",
        "बैंक स्टेटमेंट (चूक-मुक्त रिकॉर्ड)",
        "पहचान व पता प्रमाण",
      ],
    },
    applicationSteps: {
      en: [
        "Prepare a project report for the new venture.",
        "Find a lender branch on the Standup Mitra portal or apply through your bank's Stand-Up India window.",
        "The bank appraises the project; margin and security follow bank norms.",
      ],
      hi: [
        "नए उद्यम की परियोजना रिपोर्ट तैयार करें।",
        "Standup Mitra पोर्टल से ऋणदाता शाखा खोजें या बैंक की Stand-Up India विंडो से आवेदन करें।",
        "बैंक परियोजना का मूल्यांकन करता है; मार्जिन/सुरक्षा बैंक नियमों के अनुसार।",
      ],
    },
    infoUrl: "https://www.standupmitra.in/",
    applyUrl: "https://www.standupmitra.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Bank-specific processing, margin money and collateral norms apply at the branch level.",
    ],
  },
  {
    id: "ignoaps",
    name: "IGNOAPS (Old Age Pension — NSAP)",
    nameHi: "आईजीएनओएपीएस (वृद्धावस्था पेंशन — NSAP)",
    category: "Pension & Senior Citizens",
    govtLevel: "central",
    purpose: {
      en: "Monthly old-age pension for BPL elderly: ₹200/month for 60–79 years and ₹500/month for 80+ as the central share; many states add a top-up.",
      hi: "बीपीएल वरिष्ठ नागरिकों को मासिक पेंशन: 60–79 वर्ष हेतु ₹200/माह, 80+ हेतु ₹500/माह (केंद्रीय हिस्सा); कई राज्य अतिरिक्त राशि जोड़ते हैं।",
    },
    beneficiaries: {
      en: "People aged 60 or above from Below Poverty Line (BPL) households.",
      hi: "गरीबी रेखा से नीचे (BPL) के परिवारों के 60 वर्ष या अधिक आयु के लोग।",
    },
    benefits: {
      en: "Monthly pension credited to the beneficiary's bank account; central share is ₹200 (60–79) or ₹500 (80+) per month, with state top-ups where applicable.",
      hi: "मासिक पेंशन लाभार्थी के बैंक खाते में; केंद्रीय हिस्सा ₹200 (60–79) या ₹500 (80+) प्रति माह, राज्य टॉप-अप जहाँ लागू हो।",
    },
    criteria: {
      ageMin: 60,
      household: ["bpl"],
      needsExtraVerification: ["bplListStatus"],
    },
    eligibilityHuman: {
      en: [
        "Age 60 years or above.",
        "Applicant belongs to a household below the poverty line (BPL) per the applicable criteria.",
        "Many states run their own old-age pension schemes with different age/income rules — check your state's scheme too.",
      ],
      hi: [
        "आयु 60 वर्ष या अधिक।",
        "आवेदक लागू मानदंडों के अनुसार गरीबी रेखा से नीचे (BPL) के परिवार से हो।",
        "कई राज्य अलग आयु/आय नियमों वाली अपनी वृद्धावस्था पेंशन चलाते हैं — अपनी राज्य योजना भी जाँचें।",
      ],
    },
    documents: {
      en: [
        "Age proof (Aadhaar / birth certificate / voter ID)",
        "BPL / ration card showing the household's status",
        "Aadhaar-linked bank account",
        "Photograph",
      ],
      hi: [
        "आयु प्रमाण (आधार / जन्म प्रमाणपत्र / वोटर आईडी)",
        "बीपीएल / राशन कार्ड",
        "आधार-लिंक्ड बैंक खाता",
        "फोटो",
      ],
    },
    applicationSteps: {
      en: [
        "Apply at the Gram Panchayat / municipal office / state pension portal with age and BPL proof.",
        "Verification by the designated authority; pension is credited to the bank account.",
        "Track status via the official NSAP portal or the state portal.",
      ],
      hi: [
        "ग्राम पंचायत / नगर अधिकारी / राज्य पेंशन पोर्टल पर आयु और बीपीएल प्रमाण से आवेदन करें।",
        "सत्यापन के बाद पेंशन बैंक खाते में आती है।",
        "आधिकारिक NSAP/राज्य पोर्टल से स्थिति देखें।",
      ],
    },
    infoUrl: "https://nsap.dord.gov.in/",
    applyUrl: null,
    applyNote: {
      en: "Application happens through the state's machinery (Panchayat/municipality/state portal); the central NSAP portal is mainly for tracking.",
      hi: "आवेदन राज्य के माध्यम से होता है (पंचायत/नगरपालिका/राज्य पोर्टल); केंद्रीय NSAP पोर्टल मुख्यतः ट्रैकिंग हेतु है।",
    },
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "State top-up amounts and extra state-specific criteria vary widely.",
    ],
  },
  {
    id: "apy",
    name: "Atal Pension Yojana (APY)",
    nameHi: "अटल पेंशन योजना (APY)",
    category: "Pension & Senior Citizens",
    govtLevel: "central",
    purpose: {
      en: "Guaranteed pension of ₹1,000–₹5,000 per month from age 60 for unorganised-sector workers who join between 18 and 40.",
      hi: "18–40 वर्ष की आयु में जुड़ने वाले असंगठित क्षेत्र के कर्मियों को 60 वर्ष से ₹1,000–₹5,000/माह की गारंटीशुदा पेंशन।",
    },
    beneficiaries: {
      en: "Unorganised-sector workers aged 18–40 with a savings bank account, who are not income-tax payers.",
      hi: "18–40 वर्ष के असंगठित क्षेत्र के कर्मी — बचत बैंक खाता हो और आयकरदाता न हों।",
    },
    benefits: {
      en: "Guaranteed monthly pension of ₹1,000 to ₹5,000 from age 60, with the same amount continuing to the spouse and the corpus to the nominee.",
      hi: "60 वर्ष से ₹1,000–₹5,000 प्रति माह गारंटीशुदा पेंशन; पति/पत्नी को वही राशि और नॉमिनी को कोरपस।",
    },
    criteria: {
      ageMin: 18,
      ageMax: 40,
      occupations: [
        "daily-wage",
        "unemployed",
        "farmer",
        "artisan",
        "homemaker",
        "small-business",
        "other",
      ],
      exclusions: ["incomeTaxPayer"],
    },
    eligibilityHuman: {
      en: [
        "Age 18–40 at joining.",
        "Has a savings bank account (Aadhaar-linked recommended).",
        "Not an income-tax payer.",
        "Contribution depends on joining age and the chosen pension amount.",
      ],
      hi: [
        "शामिल होने के समय आयु 18–40।",
        "बचत बैंक खाता हो (आधार-लिंक्ड अनुशंसित)।",
        "आयकरदाता न हों।",
        "योगदान जुड़ने की आयु और चुनी गई पेंशन राशि पर निर्भर।",
      ],
    },
    documents: {
      en: [
        "Savings bank account",
        "Aadhaar",
        "Mobile number",
        "Nominee details",
      ],
      hi: [
        "बचत बैंक खाता",
        "आधार",
        "मोबाइल नंबर",
        "नॉमिनी विवरण",
      ],
    },
    applicationSteps: {
      en: [
        "Visit your bank (where you hold a savings account) and request the APY enrolment form — many banks allow it through net-banking.",
        "Choose the pension amount (₹1,000/₹2,000/₹3,000/₹4,000/₹5,000) and confirm the contribution.",
        "Auto-debit starts from the following month.",
      ],
      hi: [
        "अपने बैंक में APY नामांकन फ़ॉर्म लें (कई बैंक नेट-बैंकिंग से भी देते हैं)।",
        "पेंशन राशि (₹1,000–₹5,000) चुनें और योगदान पुष्ट करें।",
        "अगले महीने से ऑटो-डेबिट शुरू होता है।",
      ],
    },
    infoUrl: "https://npscra.nsdl.co.in/scheme-details.php",
    applyUrl: "https://enps.nsdl.com/",
    applyNote: {
      en: "APY is opened through your bank; the NSDL link is for scheme information and selected online flows.",
      hi: "APY आपके बैंक से खुलती है; NSDL लिंक सूचना और चुनिंदा ऑनलाइन प्रवाह हेतु है।",
    },
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "The contribution chart depends on joining age — confirm at the bank.",
    ],
  },
  {
    id: "ssy",
    name: "Sukanya Samriddhi Yojana (SSY)",
    nameHi: "सुकन्या समृद्धि योजना (SSY)",
    category: "Women & Child Welfare",
    govtLevel: "central",
    purpose: {
      en: "Small-savings scheme for a girl child below 10: deposits for 15 years, maturity at 21 years, with one of the highest fixed interest rates among small-savings schemes.",
      hi: "10 वर्ष से कम आयु की बेटी के लिए लघु बचत योजना: 15 वर्ष जमा, 21 वर्ष पर परिपक्वता, लघु बचत योजनाओं में सबसे ऊँची ब्याज दरों में एक।",
    },
    beneficiaries: {
      en: "Parents/legal guardians of girl children below 10 years (maximum two accounts per family, one per girl).",
      hi: "10 वर्ष से कम आयु की बेटियों के माता-पिता/अभिभावक (प्रति परिवार अधिकतम दो खाते, प्रति बेटी एक)।",
    },
    benefits: {
      en: "High fixed interest (declared quarterly), tax benefits under Section 80C, and maturity proceeds for the girl's education or marriage.",
      hi: "उच्च निश्चित ब्याज (त्रैमासिक घोषित), धारा 80C के तहत कर लाभ, और बेटी की शिक्षा/विवाह हेतु परिपक्वता राशि।",
    },
    criteria: {
      hasGirlChildUnder10: true,
    },
    eligibilityHuman: {
      en: [
        "Girl child below 10 years of age at account opening.",
        "Account is opened by parents/legal guardian; one account per girl, maximum two girls per family (exception for twins — verify).",
        "Account can be opened at a post office or authorised banks.",
      ],
      hi: [
        "खाता खुलने के समय बालिका की आयु 10 वर्ष से कम।",
        "खाता माता-पिता/अभिभावक खोलते हैं; प्रति बालिका एक खाता, प्रति परिवार अधिकतम दो (युग्मक अपवाद — जाँचें)।",
        "खाता डाकघर या अधिकृत बैंकों में खुलता है।",
      ],
    },
    documents: {
      en: [
        "Birth certificate of the girl child",
        "Aadhaar and PAN of the parent/guardian (KYC)",
        "Photographs",
        "Initial deposit (minimum ₹250)",
      ],
      hi: [
        "बालिका का जन्म प्रमाणपत्र",
        "अभिभावक का आधार और पैन (KYC)",
        "फोटो",
        "प्रारंभिक जमा (न्यूनतम ₹250)",
      ],
    },
    applicationSteps: {
      en: [
        "Visit a post office or authorised bank branch with the girl's birth certificate and your KYC documents.",
        "Fill the SSY account-opening form; deposit at least ₹250.",
        "Deposits continue for 15 years; the government declares the interest rate quarterly.",
      ],
      hi: [
        "बालिका के जन्म प्रमाणपत्र और अपने KYC दस्तावेज़ों के साथ डाकघर/बैंक जाएँ।",
        "SSY खाता-खोलने का फ़ॉर्म भरें; कम से कम ₹250 जमा करें।",
        "15 वर्ष तक जमा करें; ब्याज दर सरकार त्रैमासिक घोषित करती है।",
      ],
    },
    infoUrl: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89",
    applyUrl: null,
    applyNote: {
      en: "SSY accounts are opened in person at a post office or authorised bank branch.",
      hi: "SSY खाते डाकघर या अधिकृत बैंक शाखा में व्यक्तिगत रूप से खोले जाते हैं।",
    },
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "The current interest rate is declared quarterly — check the latest rate before investing.",
    ],
  },
  {
    id: "pmmvy",
    name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    nameHi: "प्रधान मंत्री मातृ वंदना योजना (PMMVY)",
    category: "Women & Child Welfare",
    govtLevel: "central",
    purpose: {
      en: "Maternity benefit for the first living child (₹5,000) and for a second child if it is a girl (₹6,000), paid in instalments tied to ANC, birth registration and immunisation milestones.",
      hi: "पहली जीवित संतान (₹5,000) और दूसरी संतान बालिका होने पर (₹6,000) हेतु मातृत्व लाभ — ANC, जन्म पंजीकरण व टीकाकरण से जुड़ी किश्तों में।",
    },
    beneficiaries: {
      en: "Pregnant women and lactating mothers aged 19+, for the first living child and for the second child if it is a girl.",
      hi: "19 वर्ष और अधिक आयु की गर्भवती महिलाएँ व स्तनपान कराने वाली माताएँ — पहली जीवित संतान और बालिका होने पर दूसरी संतान।",
    },
    benefits: {
      en: "₹5,000 for the first living child (in instalments) and ₹6,000 for a second girl child, transferred directly to the woman's bank account (DBT).",
      hi: "पहली जीवित संतान हेतु ₹5,000 (किश्तों में) और दूसरी बालिका हेतु ₹6,000, सीधे महिला के बैंक खाते में (DBT)।",
    },
    criteria: {
      pregnantOrNewMother: true,
      gender: ["female"],
      ageMin: 19,
      exclusions: ["governmentEmployee", "incomeTaxPayer"],
    },
    eligibilityHuman: {
      en: [
        "Pregnant woman or lactating mother, 19 years or older.",
        "For the first living child: ₹5,000 in instalments.",
        "For the second child if it is a girl: ₹6,000 in one instalment.",
        "Excluded: government employees and income-tax payers (per guidelines).",
      ],
      hi: [
        "गर्भवती महिला या स्तनपान कराने वाली माता, 19 वर्ष या अधिक।",
        "पहली जीवित संतान: किश्तों में ₹5,000।",
        "दूसरी संतान बालिका होने पर: एक किश्त में ₹6,000।",
        "अपात्र: सरकारी कर्मचारी और आयकरदाता (दिशानिर्देशों के अनुसार)।",
      ],
    },
    documents: {
      en: [
        "Mother-Child Protection (MCP) card",
        "Aadhaar of the woman",
        "Bank account in the woman's name (Aadhaar-linked)",
        "Pregnancy/birth/immunisation records for the respective instalment",
      ],
      hi: [
        "मातृत्व-सुरक्षा कार्ड (MCP)",
        "महिला का आधार",
        "महिला के नाम का बैंक खाता (आधार-लिंक्ड)",
        "किश्त के अनुसार गर्भावस्था/जन्म/टीकाकरण रिकॉर्ड",
      ],
    },
    applicationSteps: {
      en: [
        "Register the pregnancy at the nearest Anganwadi centre or health facility.",
        "Claim instalments as milestones are completed (ANC, birth registration, immunisation) via the PMMVY portal/CAS or the Anganwadi worker.",
        "The money is transferred directly to the woman's bank account (DBT).",
      ],
      hi: [
        "नज़दीकी आंगनवाड़ी या स्वास्थ्य केंद्र में गर्भावस्था पंजीकृत कराएँ।",
        "मील-पत्थर पूरे होते ही (ANC, जन्म पंजीकरण, टीकाकरण) PMMVY पोर्टल/CAS या आंगनवाड़ी कार्यकर्ता से किश्त का दावा करें।",
        "राशि सीधे महिला के बैंक खाते में (DBT) आती है।",
      ],
    },
    infoUrl: "https://wcd.gov.in/offerings/pradhan-mantri-matru-vandana-yojana",
    applyUrl: "https://pmmvy.wcd.gov.in/",
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Some states run additional maternity schemes with different amounts — verify your state's rules.",
    ],
  },
  {
    id: "adip",
    name: "ADIP Scheme (Assistance to Disabled Persons)",
    nameHi: "एडिप योजना (दिव्यांगजन सहायता)",
    category: "Disability Benefits",
    govtLevel: "central",
    purpose: {
      en: "Free or subsidised assistive devices (wheelchairs, hearing aids, artificial limbs, etc.) for persons with disabilities from low-income households.",
      hi: "कम-आय परिवारों के दिव्यांगजनों को निःशुल्क/सहायता प्राप्त सहायक उपकरण (व्हीलचेयर, हियरिंग एड, कृत्रिम अंग आदि)।",
    },
    beneficiaries: {
      en: "Persons with 40% or more disability from households with monthly income up to about ₹22,000 (₹30,000 for some devices) — limits per ADIP guidelines.",
      hi: "40% या अधिक दिव्यांगता वाले, मासिक आय लगभग ₹22,000 (कुछ उपकरणों हेतु ₹30,000) तक के व्यक्ति — एडिप दिशानिर्देशों के अनुसार।",
    },
    benefits: {
      en: "Modern, standard assistive devices fitted at camps/centres, with subsidy rates per ADIP guidelines (higher subsidy for students).",
      hi: "शिविरों/केंद्रों पर आधुनिक, मानक सहायक उपकरण; एडिप दिशानिर्देशों के अनुसार सब्सिडी (छात्रों हेतु अधिक)।",
    },
    criteria: {
      hasDisability: true,
      needsExtraVerification: ["disabilityCertificate40Pct", "incomeLimitMonthly"],
    },
    eligibilityHuman: {
      en: [
        "Person with disability of 40% or more (certified by the designated medical authority).",
        "Monthly income from all sources up to about ₹22,000 (₹30,000 for certain devices — verify).",
        "Device not received under ADIP in the previous 3 years for the same disability.",
      ],
      hi: [
        "40% या अधिक दिव्यांगता (नामित चिकित्सा प्राधिकारी से प्रमाणित)।",
        "सभी स्रोतों से मासिक आय लगभग ₹22,000 तक (कुछ उपकरणों हेतु ₹30,000 — जाँचें)।",
        "उसी दिव्यांगता के लिए पिछले 3 वर्षों में एडिप से उपकरण न मिला हो।",
      ],
    },
    documents: {
      en: [
        "Disability certificate (40% or more)",
        "Income certificate",
        "Aadhaar",
        "Photograph",
        "Aadhaar-linked bank account",
      ],
      hi: [
        "दिव्यांगता प्रमाणपत्र (40% या अधिक)",
        "आय प्रमाणपत्र",
        "आधार",
        "फोटो",
        "आधार-लिंक्ड बैंक खाता",
      ],
    },
    applicationSteps: {
      en: [
        "Get or confirm the disability certificate (40%+) from the designated medical authority.",
        "Attend an ADIP assessment camp (announced by ALIMCO/state) or apply through the district social welfare office.",
        "The device is provided through an implementing agency after assessment.",
      ],
      hi: [
        "नामित चिकित्सा प्राधिकारी से दिव्यांगता प्रमाणपत्र (40%+) लें/पुष्ट करें।",
        "एडिप आकलन शिविर में भाग लें (ALIMCO/राज्य द्वारा घोषित) या ज़िला समाज कल्याण कार्यालय से आवेदन करें।",
        "आकलन के बाद कार्यान्वयन एजेंसी से उपकरण मिलता है।",
      ],
    },
    infoUrl: "https://socialjustice.gov.in/schemes/23",
    applyUrl: null,
    applyNote: {
      en: "Applications happen via assessment camps and district welfare offices rather than a standing online portal.",
      hi: "आवेदन आकलन शिविरों और ज़िला कल्याण कार्यालयों के माध्यम से होता है, किसी स्थायी ऑनलाइन पोर्टल से नहीं।",
    },
    sourceVerificationDate: "2026-09-29",
    lastReviewedDate: "2026-09-29",
    needsVerification: [
      "Income limits and the device list are updated periodically — confirm current limits with the district welfare office.",
    ],
  },
  {
    id: "state-farmer-support",
    name: "State Farmer Support Scheme",
    nameHi: "राज्य किसान सहायता योजना",
    category: "Agriculture & Farmers",
    govtLevel: "state",
    purpose: {
      en: "State-level support for small and marginal farmers through seed, fertiliser and farm-input subsidies plus direct support for verified cultivation costs.",
      hi: "छोटे और सीमांत किसानों के लिए राज्यस्तरीय सहायता: बीज, उर्वरक और कृषि-इनपुट सब्सिडी, साथ ही प्रमाणित खेती लागत के लिए सीधे सहायता।",
    },
    beneficiaries: {
      en: "Small and marginal farmers with cultivable land and valid land records in the state.",
      hi: "राज्य में कृषि भूमि और वैध भूमि रिकॉर्ड वाले छोटे और सीमांत किसान।",
    },
    benefits: {
      en: "Direct subsidy or input support for crops, seasonal farm needs, and verified agriculture costs, as notified by the state government.",
      hi: "फसल, मौसमी कृषि आवश्यकताओं और सत्यापित कृषि लागत के लिए सीधे सब्सिडी या इनपुट सहायता, जैसा राज्य सरकार द्वारा अधिसूचित हो।",
    },
    criteria: {
      ageMin: 18,
      ownsLand: true,
      occupations: ["farmer"],
      residence: ["rural"],
      needsExtraVerification: ["stateLandVerification", "stateInputSupportList"],
    },
    eligibilityHuman: {
      en: [
        "Eligible farmer with valid cultivable land in the state.",
        "Small or marginal farmer as per state rules.",
        "Must hold a valid bank account and land documents for verification.",
      ],
      hi: [
        "राज्य में वैध कृषि योग्य भूमि वाले पात्र किसान।",
        "राज्य नियमों के अनुसार छोटे या सीमांत किसान।",
        "सत्यापन के लिए वैध बैंक खाता और भूमि दस्तावेज़ आवश्यक हैं।",
      ],
    },
    documents: {
      en: [
        "Land records / khatauni",
        "Aadhaar and bank account details",
        "Farmer registration or state portal record",
      ],
      hi: [
        "भूमि रिकॉर्ड / खतौनी",
        "आधार और बैंक खाता विवरण",
        "किसान पंजीकरण या राज्य पोर्टल रिकॉर्ड",
      ],
    },
    applicationSteps: {
      en: [
        "Register on the state agriculture portal or local agriculture office.",
        "Submit land records and bank details.",
        "Approval is processed by the state agriculture department and subsidy is credited directly.",
      ],
      hi: [
        "राज्य कृषि पोर्टल या स्थानीय कृषि कार्यालय में पंजीकरण करें।",
        "भूमि रिकॉर्ड और बैंक विवरण जमा करें।",
        "राज्य कृषि विभाग द्वारा सत्यापन और सब्सिडी सीधे खाते में दी जाती है।",
      ],
    },
    infoUrl: "https://agriculture.gov.in/",
    applyUrl: null,
    sourceVerificationDate: "2026-10-05",
    lastReviewedDate: "2026-10-05",
    needsVerification: [
      "The exact beneficiary list, subsidy amount, and crop eligibility vary by state and season.",
    ],
  },
  {
    id: "state-merit-scholarship",
    name: "State Merit Scholarship Scheme",
    nameHi: "राज्य मेरिट छात्रवृत्ति योजना",
    category: "Education & Scholarships",
    govtLevel: "state",
    purpose: {
      en: "Scholarship for meritorious students in secondary and higher secondary education to support tuition and study expenses.",
      hi: "माध्यमिक और उच्च माध्यमिक शिक्षा में मेरिट वाले छात्रों के लिए ट्यूशन और अध्ययन व्यय सहायता देने वाली छात्रवृत्ति।",
    },
    beneficiaries: {
      en: "Students who have passed class 10 or 12 with strong academic marks and meet income restrictions set by the state.",
      hi: "कक्षा 10 या 12 में उत्कृष्ट अंक लेने वाले छात्र, जो राज्य द्वारा निर्धारित आय सीमा के भीतर आते हैं।",
    },
    benefits: {
      en: "Cash scholarship or fee support credited to the bank account, often renewed every year based on academic performance.",
      hi: "नकद छात्रवृत्ति या शुल्क सहायता सीधे बैंक खाते में, अक्सर शैक्षणिक प्रदर्शन के आधार पर प्रतिवर्ष नवीनीकरण।",
    },
    criteria: {
      educationMin: "12th-pass",
      incomeMaxLakh: 6,
      occupations: ["student"],
      needsExtraVerification: ["stateMarksCutoff", "institutionVerification"],
    },
    eligibilityHuman: {
      en: [
        "Student has passed class 10 or 12 with required marks.",
        "Family income is within the state scholarship ceiling.",
        "Student is enrolled in a recognised institution in the state.",
      ],
      hi: [
        "छात्र ने आवश्यक अंकों के साथ कक्षा 10 या 12 पास किया हो।",
        "परिवार की आय राज्य छात्रवृत्ति सीमा के भीतर हो।",
        "छात्र राज्य के मान्यता प्राप्त संस्थान में नामांकित हो।",
      ],
    },
    documents: {
      en: [
        "Mark sheet of the latest exam",
        "Income certificate",
        "Aadhaar and bank account details",
        "Institution verification letter",
      ],
      hi: [
        "ताज़ा परीक्षा की मार्कशीट",
        "आय प्रमाणपत्र",
        "आधार और बैंक खाता विवरण",
        "संस्थान सत्यापन पत्र",
      ],
    },
    applicationSteps: {
      en: [
        "Apply during the state scholarship window on the official portal.",
        "Submit academic records, income proof, and bank account details.",
        "Selected students receive direct scholarship transfers after verification.",
      ],
      hi: [
        "राज्य छात्रवृत्ति विंडो के दौरान आधिकारिक पोर्टल पर आवेदन करें।",
        "शैक्षणिक रिकॉर्ड, आय प्रमाण और बैंक खाता विवरण जमा करें।",
        "सत्यापन के बाद चयनित छात्रों को सीधे छात्रवृत्ति दी जाती है।",
      ],
    },
    infoUrl: "https://scholarships.gov.in/",
    applyUrl: "https://scholarships.gov.in/",
    sourceVerificationDate: "2026-10-05",
    lastReviewedDate: "2026-10-05",
    needsVerification: [
      "The exact income ceiling and marks cutoff are decided by the state education department every year.",
    ],
  },
  {
    id: "state-pension-support",
    name: "State Pension Support Scheme",
    nameHi: "राज्य पेंशन सहायता योजना",
    category: "Pension & Senior Citizens",
    govtLevel: "state",
    purpose: {
      en: "Support for senior citizens and low-income households through a state top-up pension to supplement central pension schemes.",
      hi: "वरिष्ठ नागरिकों और कम-आय परिवारों के लिए राज्य स्तर की अतिरिक्त पेंशन, जो केंद्रीय पेंशन योजनाओं को补एं करती है।",
    },
    beneficiaries: {
      en: "Senior citizens, widows, and low-income residents who qualify under the state's pension rules.",
      hi: "वरिष्ठ नागरिक, विधवा महिलाएँ और राज्य की पेंशन नियमों के अनुसार पात्र कम-आय निवासी।",
    },
    benefits: {
      en: "Monthly pension top-up, often paid with the central pension amount into the beneficiary bank account.",
      hi: "मासिक पेंशन टॉप-अप, अक्सर केंद्रीय पेंशन के साथ लाभार्थी के बैंक खाते में दिया जाता है।",
    },
    criteria: {
      ageMin: 60,
      household: ["bpl"],
      needsExtraVerification: ["statePensionList", "widowStatus"],
    },
    eligibilityHuman: {
      en: [
        "Applicant is 60 or above or qualifies under a state eligibility category.",
        "Household meets the state pension threshold or BPL status.",
        "Bank account and identity proof must be valid for pension processing.",
      ],
      hi: [
        "आवेदक 60 वर्ष या अधिक हो या राज्य पात्रता श्रेणी में आता हो।",
        "परिवार राज्य पेंशन सीमा या बीपीएल स्थिति को पूरा करता हो।",
        "पेंशन प्रोसेसिंग के लिए बैंक खाता और पहचान प्रमाण वैध होना चाहिए।",
      ],
    },
    documents: {
      en: [
        "Age proof / Aadhaar",
        "BPL or income certificate",
        "Bank account and mobile number",
        "Address proof",
      ],
      hi: [
        "आयु प्रमाण / आधार",
        "बीपीएल या आय प्रमाणपत्र",
        "बैंक खाता और मोबाइल नंबर",
        "पता प्रमाण",
      ],
    },
    applicationSteps: {
      en: [
        "Apply through the district pension office, local body, or state pension portal.",
        "Submit age, income, and bank details.",
        "The pension is reviewed and paid monthly through direct benefit transfer.",
      ],
      hi: [
        "ज़िला पेंशन कार्यालय, स्थानीय निकाय या राज्य पेंशन पोर्टल के माध्यम से आवेदन करें।",
        "आयु, आय और बैंक विवरण जमा करें।",
        "पेंशन की समीक्षा के बाद प्रतिमाह सीधे लाभ हस्तांतरण से भुगतान होता है।",
      ],
    },
    infoUrl: "https://www.india.gov.in/topics/social-sector/pensions",
    applyUrl: null,
    sourceVerificationDate: "2026-10-05",
    lastReviewedDate: "2026-10-05",
    needsVerification: [
      "State pension top-up amounts, age cut-offs, and widow categories differ widely across states.",
    ],
  },
];

export function getScheme(id: string): SchemeDoc | undefined {
  return SCHEMES.find((s) => s.id === id);
}

