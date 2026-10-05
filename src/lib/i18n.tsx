import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, { en: string; hi: string }>;

const STRINGS: Dict = {
  "brand.name": { en: "JANSAHAY", hi: "जनसहाय" },
  "brand.tagline": {
    en: "Government Benefits. Made Accessible to Everyone.",
    hi: "सरकारी लाभ। सबके लिए सरल।",
  },
  "nav.home": { en: "Home", hi: "होम" },
  "nav.explore": { en: "Explore Schemes", hi: "योजनाएँ देखें" },
  "nav.how": { en: "How It Works", hi: "कैसे काम करता है" },
  "nav.about": { en: "About", hi: "परिचय" },
  "nav.check": { en: "Check My Eligibility", hi: "अपनी पात्रता जाँचें" },
  "nav.mySchemes": { en: "My Schemes", hi: "मेरी योजनाएँ" },
  "nav.skip": { en: "Skip to main content", hi: "मुख्य सामग्री पर जाएँ" },

  "hero.badge": {
    en: "Independent information service",
    hi: "स्वतंत्र सूचना सेवा",
  },
  "hero.title": {
    en: "Government Benefits You Deserve, Made Easier to Find.",
    hi: "आपके अधिकार के सरकारी लाभ, अब खोजना आसान।",
  },
  "hero.sub": {
    en: "Answer a few simple questions to discover government schemes that may match your circumstances, understand their requirements, and find official application instructions.",
    hi: "कुछ आसान सवालों के जवाब दें और जानें कि आपकी परिस्थिति से मिलती-जुलती सरकारी योजनाएँ कौन-सी हैं, उनकी ज़रूरी शर्तें क्या हैं, और आवेदन कैसे करें।",
  },
  "hero.cta1": { en: "Check My Eligibility", hi: "अपनी पात्रता जाँचें" },
  "hero.cta2": { en: "Explore Schemes", hi: "योजनाएँ देखें" },
  "hero.disclaimer": {
    en: "JANSAHAY is an independent information platform, not a government body. It does not decide eligibility or approve applications.",
    hi: "जनसहाय एक स्वतंत्र सूचना मंच है, कोई सरकारी निकाय नहीं। यह पात्रता का निर्णय या आवेदन की स्वीकृति नहीं देता।",
  },
  "hero.photoAlt": {
    en: "A farmer working in a field",
    hi: "खेत में काम करता किसान",
  },

  "trust.title": {
    en: "What JANSAHAY gives you",
    hi: "जनसहाय आपको क्या देता है",
  },
  "trust.1.t": { en: "Personalized scheme discovery", hi: "आपके अनुसार योजना खोज" },
  "trust.1.d": {
    en: "A short questionnaire matches your answers against written eligibility rules.",
    hi: "एक छोटा प्रश्नावली आपके उत्तरों को लिखित पात्रता नियमों से मिलाता है।",
  },
  "trust.2.t": { en: "Clear eligibility requirements", hi: "स्पष्ट पात्रता शर्तें" },
  "trust.2.d": {
    en: "Every criterion is stated plainly, with the official source it comes from.",
    hi: "हर शर्त सरल भाषा में, उसके आधिकारिक स्रोत के साथ लिखी जाती है।",
  },
  "trust.3.t": { en: "Official application links", hi: "आधिकारिक आवेदन लिंक" },
  "trust.3.d": {
    en: "Apply only through portals owned by the government. We never ask for Aadhaar, OTPs, or bank details.",
    hi: "आवेदन केवल सरकारी पोर्टल पर करें। हम आधार, ओटीपी या बैंक विवरण नहीं माँगते।",
  },
  "trust.4.t": { en: "Document checklists", hi: "दस्तावेज़ सूची" },
  "trust.4.d": {
    en: "Know exactly which papers to gather before you start an application.",
    hi: "आवेदन शुरू करने से पहले जानें कि कौन-से कागज़ जुटाने हैं।",
  },

  "how.title": { en: "How it works", hi: "यह कैसे काम करता है" },
  "how.1.t": { en: "Answer a few questions", hi: "कुछ सवालों के जवाब दें" },
  "how.1.d": {
    en: "About your home, work, and family — in under five minutes.",
    hi: "अपने घर, काम और परिवार के बारे में — पाँच मिनट से कम में।",
  },
  "how.2.t": { en: "See matched schemes", hi: "मिलती-जुलती योजनाएँ देखें" },
  "how.2.d": {
    en: "Each result explains why it matches and what still needs checking.",
    hi: "हर परिणाम बताता है कि क्यों मिला और क्या अभी जाँचना बाकी है।",
  },
  "how.3.t": { en: "Prepare documents", hi: "दस्तावेज़ तैयार करें" },
  "how.3.d": {
    en: "Use the checklist for each scheme before applying.",
    hi: "आवेदन से पहले हर योजना की सूची का उपयोग करें।",
  },
  "how.4.t": { en: "Apply through official channels", hi: "आधिकारिक माध्यम से आवेदन करें" },
  "how.4.d": {
    en: "JANSAHAY links to official portals. Approval is always the government's decision.",
    hi: "जनसहाय आधिकारिक पोर्टल से जोड़ता है। स्वीकृति हमेशा सरकार का निर्णय है।",
  },

  "explore.title": { en: "Explore Schemes", hi: "योजनाएँ देखें" },
  "explore.sub": {
    en: "Central Government schemes with verifiable criteria and official sources.",
    hi: "केंद्र सरकार की योजनाएँ — सत्यापित शर्तों और आधिकारिक स्रोतों के साथ।",
  },
  "explore.search": { en: "Search scheme name…", hi: "योजना का नाम खोजें…" },
  "explore.allCategories": { en: "All categories", hi: "सभी श्रेणियाँ" },
  "explore.allGov": { en: "Central + State", hi: "केंद्र + राज्य" },
  "explore.central": { en: "Central only", hi: "केवल केंद्र" },
  "explore.state": { en: "State-level", hi: "राज्य-स्तर" },
  "explore.results": { en: "schemes", hi: "योजनाएँ" },
  "explore.none": { en: "No schemes match your filters.", hi: "आपके फ़िल्टर से मेल खाती कोई योजना नहीं।" },

  "check.title": { en: "Eligibility Checker", hi: "पात्रता जाँच" },
  "check.step": { en: "Step", hi: "चरण" },
  "check.of": { en: "of", hi: "में से" },
  "check.back": { en: "Back", hi: "पीछे" },
  "check.continue": { en: "Continue", hi: "आगे बढ़ें" },
  "check.review": { en: "See My Matches", hi: "मेरे मिलान देखें" },
  "check.optional": { en: "Optional — you can skip this", hi: "वैकल्पिक — छोड़ सकते हैं" },
  "check.skippedNote": {
    en: "You skipped this question. Some schemes need this answer, so results may be incomplete.",
    hi: "आपने यह सवाल छोड़ दिया। कुछ योजनाओं को यह उत्तर चाहिए, इसलिए परिणाम अधूरे हो सकते हैं।",
  },
  "check.why": { en: "Why we ask", hi: "हम क्यों पूछते हैं" },
  "check.reviewTitle": { en: "Review your answers", hi: "अपने उत्तर जाँचें" },
  "check.edit": { en: "Edit", hi: "बदलें" },
  "check.privacy": {
    en: "Guest answers stay on this device. Sign in to sync your answers and saved schemes to your account.",
    hi: "अतिथि उत्तर इसी उपकरण पर रहते हैं। उत्तर और सहेजी गई योजनाएँ खाते में सिंक करने के लिए साइन इन करें।",
  },

  "results.title": { en: "Schemes That May Match Your Profile", hi: "आपकी जानकारी से मिलती-जुलती योजनाएँ" },
  "results.edit": { en: "Edit answers", hi: "उत्तर बदलें" },
  "results.print": { en: "Save / Print report", hi: "रिपोर्ट सहेजें / प्रिंट करें" },
  "results.details": { en: "View Eligibility Details", hi: "पात्रता विवरण देखें" },
  "results.official": { en: "Visit Official Website", hi: "आधिकारिक वेबसाइट खोलें" },
  "results.whyMatch": { en: "Why this matches", hi: "यह क्यों मेल खाता है" },
  "results.whyIneligible": { en: "Why it may not match", hi: "यह क्यों मेल नहीं खा सकता" },
  "results.needVerify": { en: "Needs verification", hi: "सत्यापन ज़रूरी" },
  "results.docs": { en: "Documents you'll need", hi: "आवश्यक दस्तावेज़" },
  "results.eligibleCount": { en: "Potentially eligible", hi: "संभावित पात्र" },
  "results.verifyCount": { en: "Possibly eligible — verification needed", hi: "संभव पात्र — सत्यापन चाहिए" },
  "results.ineligibleCount": { en: "Likely ineligible", hi: "संभवतः अपात्र" },
  "results.none": {
    en: "No schemes matched the answers given. Try editing an answer or browse all schemes.",
    hi: "दिए गए उत्तरों से कोई योजना मेल नहीं खाई। कोई उत्तर बदलें या सभी योजनाएँ देखें।",
  },
  "results.summary": { en: "Answers used for matching", hi: "मिलान के लिए उपयोग किए उत्तर" },

  "verdict.eligible": { en: "Potentially eligible", hi: "संभावित पात्र" },
  "verdict.verify": { en: "Possibly eligible — verification needed", hi: "संभव पात्र — सत्यापन चाहिए" },
  "verdict.ineligible": { en: "Likely ineligible based on current answers", hi: "वर्तमान उत्तरों के आधार पर संभवतः अपात्र" },

  "scheme.purpose": { en: "Purpose", hi: "उद्देश्य" },
  "scheme.beneficiaries": { en: "Intended beneficiaries", hi: "लाभार्थी" },
  "scheme.benefits": { en: "Benefits", hi: "लाभ" },
  "scheme.eligibility": { en: "Eligibility requirements", hi: "पात्रता शर्तें" },
  "scheme.exclusions": { en: "Exclusions", hi: "अपात्रता" },
  "scheme.docs": { en: "Required documents", hi: "आवश्यक दस्तावेज़" },
  "scheme.apply": { en: "How to apply", hi: "आवेदन कैसे करें" },
  "scheme.portal": { en: "Official application portal", hi: "आधिकारिक आवेदन पोर्टल" },
  "scheme.sources": { en: "Official sources", hi: "आधिकारिक स्रोत" },
  "scheme.verified": { en: "Last verified", hi: "अंतिम सत्यापन" },
  "scheme.reviewed": { en: "Last reviewed", hi: "अंतिम समीक्षा" },
  "scheme.officialSite": { en: "Official website", hi: "आधिकारिक वेबसाइट" },
  "scheme.officialApply": { en: "Apply on official portal", hi: "आधिकारिक पोर्टल पर आवेदन" },
  "scheme.save": { en: "Save Scheme", hi: "योजना सहेजें" },
  "scheme.unsave": { en: "Saved ✓", hi: "सहेजी गई ✓" },
  "scheme.needsCheck": {
    en: "Check your profile for a personalized assessment.",
    hi: "व्यक्तिगत आकलन के लिए अपनी जानकारी जाँचें।",
  },
  "scheme.verifyNote": {
    en: "Some details on this page could not be fully confirmed. Verify them with the official source before applying.",
    hi: "इस पृष्ठ के कुछ विवरण पूरी तरह पुष्ट नहीं किए जा सके। आवेदन से पहले आधिकारिक स्रोत से जाँच लें।",
  },

  "dash.title": { en: "My Schemes", hi: "मेरी योजनाएँ" },
  "dash.sub": {
    en: "Saved schemes and answers are kept only in this browser. Nothing is stored on our servers.",
    hi: "सहेजी गई योजनाएँ और उत्तर केवल इसी ब्राउज़र में रहते हैं। हमारे सर्वर पर कुछ नहीं जाता।",
  },
  "dash.empty": { en: "You haven't saved any schemes yet.", hi: "आपने अभी कोई योजना नहीं सहेजी है।" },
  "dash.remove": { en: "Remove", hi: "हटाएँ" },
  "dash.clearAll": { en: "Clear all saved data", hi: "सभी सहेजा डेटा मिटाएँ" },
  "dash.cleared": { en: "Saved schemes and answers were cleared from this device.", hi: "सहेजी गई योजनाएँ और उत्तर इस उपकरण से मिटा दिए गए।" },
  "dash.savedCount": { en: "Saved schemes", hi: "सहेजी गई योजनाएँ" },
  "dash.checklist": { en: "Application preparation", hi: "आवेदन की तैयारी" },

  "about.p": {
    en: "JANSAHAY is an independent information platform. It is not affiliated with, endorsed by, or operated by any government body. Scheme data is compiled from public official sources and dated with the day it was last verified. Government decisions on eligibility and approval always rest with the concerned authority.",
    hi: "जनसहाय एक स्वतंत्र सूचना मंच है। यह किसी सरकारी निकाय से संबद्ध, समर्थित या संचालित नहीं है। योजना डेटा सार्वजनिक आधिकारिक स्रोतों से संकलित है और अंतिम सत्यापन की तिथि के साथ प्रकाशित है। पात्रता और स्वीकृति का निर्णय सदैव संबंधित प्राधिकरण का है।",
  },
  "about.team": {
    en: "Built in 2026 by Team Diamond — Mohsin, Faisal, Neha, Monika.",
    hi: "टीम डायमंड द्वारा 2026 में निर्मित — मोहसिन, फ़ैज़ल, नेहा, मोनिका।",
  },
  "footer.independent": {
    en: "JANSAHAY is an independent information platform. It is not a government website and does not decide eligibility or approve applications.",
    hi: "जनसहाय एक स्वतंत्र सूचना मंच है। यह सरकारी वेबसाइट नहीं है और पात्रता या स्वीकृति का निर्णय नहीं देता।",
  },
  "footer.built": {
    en: "Built in 2026 by Team Diamond (Mohsin, Faisal, Neha, Monika).",
    hi: "टीम डायमंड (मोहसिन, फ़ैज़ल, नेहा, मोनिका) द्वारा 2026 में निर्मित।",
  },
  "common.loading": { en: "Loading…", hi: "लोड हो रहा है…" },
  "common.error": { en: "Something went wrong.", hi: "कुछ ग़लत हो गया।" },
  "common.back": { en: "Back", hi: "पीछे" },
  "common.close": { en: "Close", hi: "बंद करें" },
};

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

const STORAGE_KEY = "jansahay.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "hi") return saved;
    } catch {

    }
    return "en";
  });

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {

    }
  }, []);

  const t = useCallback(
    (key: string) => {
      const entry = STRINGS[key];
      if (!entry) return key;
      return entry[lang];
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}

export function pick(lang: Lang, en: string, hi: string): string {
  return lang === "hi" ? hi : en;
}
