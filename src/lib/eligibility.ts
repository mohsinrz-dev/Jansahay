import type { SchemeDoc, Verdict } from "../data/schemes";
import type {
  Profile,
  IncomeRange,
  AgeGroup,
  EducationLevel,
} from "./profile";

const INCOME_ORDER: IncomeRange[] = [
  "under-1l",
  "1-2.5l",
  "2.5-6l",
  "6-9l",
  "9-18l",
  "above-18l",
];

export const INCOME_MAX_LAKH: Record<IncomeRange, number> = {
  "under-1l": 1,
  "1-2.5l": 2.5,
  "2.5-6l": 6,
  "6-9l": 9,
  "9-18l": 18,
  "above-18l": 60,
};

const AGE_MIN: Record<AgeGroup, number> = {
  "below-18": 0,
  "18-30": 18,
  "31-45": 31,
  "46-59": 46,
  "60-79": 60,
  "80+": 80,
};

const AGE_MAX: Record<AgeGroup, number> = {
  "below-18": 17,
  "18-30": 30,
  "31-45": 45,
  "46-59": 59,
  "60-79": 79,
  "80+": 110,
};

const EDU_ORDER: EducationLevel[] = [
  "none",
  "up-to-10th",
  "10th-pass",
  "12th-pass",
  "graduate-plus",
];

export interface Reason {

  key: string;
  text: string;
}

export interface MatchResult {
  scheme: SchemeDoc;
  verdict: Verdict;
  matched: Reason[];
  unverified: Reason[];
  failing: Reason[];
}

interface Bilingual {
  en: string;
  hi: string;
}

type Lang = "en" | "hi";

function txt(b: Bilingual, lang: Lang): string {
  return lang === "hi" ? b.hi : b.en;
}

const M = {
  ageOk: {
    en: "Age group fits the scheme's age range.",
    hi: "आयु समूह योजना की आयु सीमा में है।",
  },
  ageUncertain: {
    en: "Age group may overlap the scheme's age range — confirm the exact age rule.",
    hi: "आयु समूह योजना की सीमा से मिल सकता है — सटीक आयु नियम जाँचें।",
  },
  ageFails: {
    en: "Age group is outside the scheme's age range.",
    hi: "आयु समूह योजना की आयु सीमा से बाहर है।",
  },
  incomeOk: {
    en: "Household income is within the scheme's limit.",
    hi: "परिवार की आय योजना की सीमा के भीतर है।",
  },
  incomeUnknown: {
    en: "Income was not answered — many schemes have income limits, so this needs checking.",
    hi: "आय नहीं बताई गई — कई योजनाओं में आय-सीमा होती है, इसलिए जाँच ज़रूरी।",
  },
  incomeFails: {
    en: "Household income appears to be above the scheme's limit.",
    hi: "परिवार की आय योजना की सीमा से अधिक प्रतीत होती है।",
  },
  occupationOk: {
    en: "Occupation matches the scheme's intended beneficiaries.",
    hi: "व्यवसाय योजना के लाभार्थी वर्ग से मेल खाता है।",
  },
  occupationFails: {
    en: "Occupation does not match the scheme's intended beneficiaries.",
    hi: "व्यवसाय योजना के लाभार्थी वर्ग से मेल नहीं खाता।",
  },
  residenceOk: {
    en: "Residence type matches the scheme's area coverage.",
    hi: "निवास प्रकार योजना के क्षेत्र से मेल खाता है।",
  },
  residenceUnknown: {
    en: "Residence type was not answered — this scheme applies to a specific area.",
    hi: "निवास प्रकार नहीं बताया गया — यह योजना किसी विशेष क्षेत्र के लिए है।",
  },
  residenceFails: {
    en: "Residence type does not match the scheme's area coverage.",
    hi: "निवास प्रकार योजना के क्षेत्र से मेल नहीं खाता।",
  },
  householdOk: {
    en: "Household status satisfies the scheme's requirement.",
    hi: "परिवार की स्थिति योजना की शर्त पूरी करती है।",
  },
  householdUnknown: {
    en: "Household status (e.g. BPL listing) must be confirmed by the official list.",
    hi: "परिवार की स्थिति (जैसे BPL सूची) आधिकारिक सूची से जाँचनी होगी।",
  },
  householdFails: {
    en: "Household status does not satisfy the scheme's requirement (e.g. BPL).",
    hi: "परिवार की स्थिति योजना की शर्त (जैसे BPL) पूरी नहीं करती।",
  },
  genderOk: {
    en: "Gender requirement is satisfied.",
    hi: "लिंग संबंधी शर्त पूरी होती है।",
  },
  genderFails: {
    en: "This scheme is for a different applicant group.",
    hi: "यह योजना किसी अन्य आवेदक वर्ग के लिए है।",
  },
  categoryOk: {
    en: "Community category matches the scheme's requirement.",
    hi: "समुदाय श्रेणी योजना की शर्त से मेल खाती है।",
  },
  categoryFails: {
    en: "Community category does not match the scheme's requirement.",
    hi: "समुदाय श्रेणी योजना की शर्त से मेल नहीं खाती।",
  },
  educationOk: {
    en: "Education level satisfies the scheme's requirement.",
    hi: "शिक्षा स्तर योजना की शर्त पूरी करता है।",
  },
  educationUnknown: {
    en: "Education level was not answered — this scheme has an education requirement.",
    hi: "शिक्षा स्तर नहीं बताया गया — इस योजना में शिक्षा की शर्त है।",
  },
  educationFails: {
    en: "Education level is below the scheme's requirement.",
    hi: "शिक्षा स्तर योजना की शर्त से कम है।",
  },
  flagOk: {
    en: "Your circumstances match this scheme's focus group.",
    hi: "आपकी परिस्थिति इस योजना के लक्षित वर्ग से मेल खाती है।",
  },
  flagFails: {
    en: "Your answers do not match this scheme's focus group.",
    hi: "आपके उत्तर इस योजना के लक्षित वर्ग से मेल नहीं खाते।",
  },
  flagUnknown: {
    en: "A required detail was skipped — confirm it with the official source.",
    hi: "एक ज़रूरी विवरण छूट गया — आधिकारिक स्रोत से पुष्ट करें।",
  },
  landOk: {
    en: "You indicated the required landholding status.",
    hi: "आपने आवश्यक भूमि-धारण की स्थिति बताई है।",
  },
  landFails: {
    en: "This scheme requires cultivable landholding, which you indicated you do not have.",
    hi: "इस योजना के लिए कृषि भूमि धारण ज़रूरी है, जो आपने नहीं बताई।",
  },
  landUnknown: {
    en: "Landholding was not answered — this scheme requires land records.",
    hi: "भूमि-धारण नहीं बताया गया — इस योजना हेतु भूमि रिकॉर्ड ज़रूरी हैं।",
  },
  extraVerification: {
    en: "Key condition needs official verification.",
    hi: "मुख्य शर्त की आधिकारिक जाँच ज़रूरी है।",
  },
} as const;

function reason(lang: Lang, key: keyof typeof M): Reason {
  return { key, text: txt(M[key], lang) };
}

function ageOverlap(
  answer: AgeGroup,
  min?: number | null,
  max?: number | null,
): "ok" | "uncertain" | "fail" {
  const aMin = AGE_MIN[answer];
  const aMax = AGE_MAX[answer];
  const cMin = min ?? 0;
  const cMax = max ?? 200;

  if (aMin >= cMin && aMax <= cMax) return "ok";

  if (aMin <= cMax && aMax >= cMin) return "uncertain";
  return "fail";
}

function incomeVerdict(
  answer: IncomeRange,
  incomeMaxLakh?: number | null,
): "ok" | "unknown" | "fail" {
  if (incomeMaxLakh == null) return "ok";
  const max = INCOME_MAX_LAKH[answer];
  if (max <= incomeMaxLakh) return "ok";

  return "fail";
}

export function evaluateScheme(
  scheme: SchemeDoc,
  profile: Profile,
  lang: Lang,
): MatchResult {
  const matched: Reason[] = [];
  const unverified: Reason[] = [];
  const failing: Reason[] = [];
  const c = scheme.criteria;


  if (profile.ageGroup && (c.ageMin != null || c.ageMax != null)) {
    const v = ageOverlap(profile.ageGroup, c.ageMin, c.ageMax);
    if (v === "ok") matched.push(reason(lang, "ageOk"));
    else if (v === "uncertain") unverified.push(reason(lang, "ageUncertain"));
    else failing.push(reason(lang, "ageFails"));
  } else if (c.ageMin != null || c.ageMax != null) {
    unverified.push(reason(lang, "ageUncertain"));
  }


  if (profile.income) {
    const v = incomeVerdict(profile.income, c.incomeMaxLakh);
    if (v === "ok") matched.push(reason(lang, "incomeOk"));
    else if (v === "unknown") unverified.push(reason(lang, "incomeUnknown"));
    else failing.push(reason(lang, "incomeFails"));
  } else if (c.incomeMaxLakh != null) {
    unverified.push(reason(lang, "incomeUnknown"));
  }


  if (c.occupations) {
    if (profile.occupation) {
      if (c.occupations.includes(profile.occupation)) {
        matched.push(reason(lang, "occupationOk"));
      } else {
        failing.push(reason(lang, "occupationFails"));
      }
    } else {
      unverified.push(reason(lang, "flagUnknown"));
    }
  }


  if (c.residence) {
    if (profile.residence === "unsure" || profile.residence === null) {
      unverified.push(reason(lang, "residenceUnknown"));
    } else if (c.residence.includes(profile.residence)) {
      matched.push(reason(lang, "residenceOk"));
    } else {
      failing.push(reason(lang, "residenceFails"));
    }
  }


  if (c.household && c.household.includes("bpl")) {
    if (profile.householdType === "bpl") {
      matched.push(reason(lang, "householdOk"));
    } else if (profile.householdType === "not-sure" || profile.householdType === null) {
      unverified.push(reason(lang, "householdUnknown"));
    } else {
      failing.push(reason(lang, "householdFails"));
    }
  }


  if (c.gender) {
    if (profile.gender === null) {
      unverified.push(reason(lang, "flagUnknown"));
    } else if (c.gender.includes(profile.gender)) {
      matched.push(reason(lang, "genderOk"));
    } else {
      failing.push(reason(lang, "genderFails"));
    }
  }


  if (c.categoryAnyOf) {
    if (profile.category === null) {
      unverified.push(reason(lang, "flagUnknown"));
    } else if (c.categoryAnyOf.includes(profile.category)) {
      matched.push(reason(lang, "categoryOk"));
    } else {
      failing.push(reason(lang, "categoryFails"));
    }
  }


  if (c.educationMin) {
    if (profile.education === null) {
      unverified.push(reason(lang, "educationUnknown"));
    } else if (
      EDU_ORDER.indexOf(profile.education) >= EDU_ORDER.indexOf(c.educationMin)
    ) {
      matched.push(reason(lang, "educationOk"));
    } else {
      failing.push(reason(lang, "educationFails"));
    }
  }


  const flagChecks: Array<{
    answered: boolean | null;
    required: boolean | undefined | null;
    okKey: keyof typeof M;
    failKey: keyof typeof M;
  }> = [
    {
      answered: profile.ownsLand,
      required: c.ownsLand,
      okKey: "landOk",
      failKey: "landFails",
    },
    {
      answered: profile.hasDisability,
      required: c.hasDisability,
      okKey: "flagOk",
      failKey: "flagFails",
    },
    {
      answered: profile.hasGirlChildUnder10,
      required: c.hasGirlChildUnder10,
      okKey: "flagOk",
      failKey: "flagFails",
    },
    {
      answered: profile.pregnantOrNewMother,
      required: c.pregnantOrNewMother,
      okKey: "flagOk",
      failKey: "flagFails",
    },
  ];

  for (const f of flagChecks) {
    if (f.required === undefined || f.required === null) continue;
    if (f.answered === null) {
      unverified.push(reason(lang, "flagUnknown"));
    } else if (f.answered === f.required) {
      matched.push(reason(lang, f.okKey));
    } else {
      failing.push(reason(lang, f.failKey));
    }
  }


  if (c.anyOf && c.anyOf.length > 0) {
    const anyPasses = c.anyOf.some((alt) => {
      const genderOk =
        !alt.gender || (profile.gender !== null && alt.gender.includes(profile.gender));
      const categoryOk =
        !alt.categoryAnyOf ||
        (profile.category !== null && alt.categoryAnyOf.includes(profile.category));


      const stated = (alt.gender ? 1 : 0) + (alt.categoryAnyOf ? 1 : 0);
      const known = (alt.gender && profile.gender !== null ? 1 : 0) +
        (alt.categoryAnyOf && profile.category !== null ? 1 : 0);
      return genderOk && categoryOk && known > 0 && stated > 0;
    });
    const anyKnown =
      (c.anyOf.some((a) => a.gender && profile.gender !== null) ||
        c.anyOf.some((a) => a.categoryAnyOf && profile.category !== null));
    if (anyPasses) {
      matched.push(reason(lang, "flagOk"));
    } else if (anyKnown) {
      failing.push(reason(lang, "flagFails"));
    } else {
      unverified.push(reason(lang, "flagUnknown"));
    }
  }


  if (c.needsExtraVerification && c.needsExtraVerification.length > 0) {
    for (const item of c.needsExtraVerification) {
      unverified.push({
        key: "extraVerification",
        text: txt({ en: verificationTextEn(item), hi: verificationTextHi(item) }, lang),
      });
    }
  }


  let verdict: Verdict;
  if (failing.length > 0) {
    verdict = "ineligible";
  } else if (unverified.length > 0) {
    verdict = "verify";
  } else {
    verdict = "eligible";
  }

  return { scheme, verdict, matched, unverified, failing };
}

function verificationTextEn(key: string): string {
  const map: Record<string, string> = {
    landRecordStatus: "Land-record status must match official records.",
    familyTaxStatus: "Whether any family member paid income tax last year must be confirmed.",
    familyInSeccOrStateList: "The family's presence in the SECC/state list must be confirmed via the official check.",
    noPuccaHouseAnywhere: "The 'no pucca house anywhere in India' declaration must be made officially.",
    loanSanction: "A home-loan sanction from a participating lender is required.",
    awaasPlusListStatus: "The household must be on the official Awaas+ wait list.",
    exactSchemeIncomeCeiling: "The exact income ceiling depends on the specific scholarship scheme.",
    enrolledInstitution: "Enrolment in a recognised institution must be verified.",
    marksCriteria: "Academic/marks criteria of the specific scheme must be met.",
    tradeIn18List: "The trade must be one of the 18 officially notified trades.",
    noSimilarLoan5Years: "No similar credit-scheme loan in the past 5 years must be confirmed.",
    greenfieldProject: "The venture must be a first-time (greenfield) project.",
    notBankDefaulter: "The applicant must not be a bank defaulter.",
    bplListStatus: "The household's BPL status must be on the official list.",
    disabilityCertificate40Pct: "A disability certificate of 40% or more is required.",
    incomeLimitMonthly: "The monthly income limit must be confirmed with the current guidelines.",
  };
  return map[key] ?? "This condition needs official verification.";
}

function verificationTextHi(key: string): string {
  const map: Record<string, string> = {
    landRecordStatus: "भूमि-रिकॉर्ड की स्थिति आधिकारिक रिकॉर्ड से मेल खानी चाहिए।",
    familyTaxStatus: "यह पुष्ट करनी होगी कि पिछले वर्ष परिवार के किसी सदस्य ने आयकर चुकाया या नहीं।",
    familyInSeccOrStateList: "परिवार का SECC/राज्य सूची में होना आधिकारिक जाँच से पुष्ट करें।",
    noPuccaHouseAnywhere: "'भारत में कहीं पक्का घर नहीं' की घोषणा आधिकारिक रूप से करनी होगी।",
    loanSanction: "भाग लेने वाले ऋणदाता से गृह ऋण स्वीकृति ज़रूरी है।",
    awaasPlusListStatus: "परिवार आधिकारिक आवास+ प्रतीक्षा सूची में होना चाहिए।",
    exactSchemeIncomeCeiling: "सटीक आय-सीमा विशिष्ट छात्रवृत्ति योजना पर निर्भर है।",
    enrolledInstitution: "मान्यता प्राप्त संस्थान में नामांकन सत्यापित होना चाहिए।",
    marksCriteria: "संबंधित योजना के शैक्षणिक/अंक मानदंड पूरे होने चाहिए।",
    tradeIn18List: "शिल्प 18 अधिसूचित शिल्पों में से एक होना चाहिए।",
    noSimilarLoan5Years: "पिछले 5 वर्षों में समान ऋण योजना से ऋण न लेने की पुष्टि ज़रूरी।",
    greenfieldProject: "उद्यम पहली बार शुरू होने वाला (ग्रीनफ़ील्ड) होना चाहिए।",
    notBankDefaulter: "आवेदक बैंक चूककर्ता न हो।",
    bplListStatus: "परिवार की BPL स्थिति आधिकारिक सूची में होनी चाहिए।",
    disabilityCertificate40Pct: "40% या अधिक का दिव्यांगता प्रमाणपत्र ज़रूरी है।",
    incomeLimitMonthly: "मासिक आय-सीमा वर्तमान दिशानिर्देशों से पुष्ट करें।",
  };
  return map[key] ?? "इस शर्त की आधिकारिक जाँच ज़रूरी है।";
}

export function evaluateAll(
  schemes: SchemeDoc[],
  profile: Profile,
  lang: Lang,
): MatchResult[] {
  const order: Record<Verdict, number> = { eligible: 0, verify: 1, ineligible: 2 };
  return schemes
    .map((s) => evaluateScheme(s, profile, lang))
    .sort(
      (a, b) =>
        order[a.verdict] - order[b.verdict] ||
        b.matched.length - a.matched.length,
    );
}

