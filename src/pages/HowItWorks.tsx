import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CheckMyEligibility } from "@/components/scheme-ui";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const { t, lang } = useI18n();
  const steps = [
    { n: 1, title: t("how.1.t"), desc: t("how.1.d") },
    { n: 2, title: t("how.2.t"), desc: t("how.2.d") },
    { n: 3, title: t("how.3.t"), desc: t("how.3.d") },
    { n: 4, title: t("how.4.t"), desc: t("how.4.d") },
  ];
  const principles = [
    {
      title: lang === "hi" ? "कोई वादा नहीं — केवल जानकारी" : "No promises — only information",
      body: lang === "hi"
        ? "जनसहाय पात्रता का अनुमान देता है, गारंटी नहीं। स्वीकृति और भुगतान का निर्णय सदैव संबंधित सरकारी प्राधिकरण का है।"
        : "JANSAHAY estimates eligibility; it never guarantees approval or payment. Decisions rest with government authorities.",
    },
    {
      title: lang === "hi" ? "आधिकारिक स्रोत पहले" : "Official sources first",
      body: lang === "hi"
        ? "हर योजना का डेटा आधिकारिक पोर्टल (जैसे pmkisan.gov.in, scholarships.gov.in, pmjay.gov.in) से लिया जाता है और सत्यापन तिथि सहित दिखाया जाता है।"
        : "Scheme data comes from official portals (pmkisan.gov.in, scholarships.gov.in, pmjay.gov.in, etc.) and is shown with its verification date.",
    },
    {
      title: lang === "hi" ? "संवेदनशील जानकारी कभी नहीं" : "Never sensitive information",
      body: lang === "hi"
        ? "हम आधार नंबर, बैंक विवरण, OTP या पासवर्ड नहीं माँगते। आपके उत्तर आपके उपकरण से बाहर नहीं जाते।"
        : "We never ask for Aadhaar numbers, bank details, OTPs, or passwords. Your answers never leave your device.",
    },
    {
      title: lang === "hi" ? "अज्ञात = स्पष्ट" : "Unknown means stated",
      body: lang === "hi"
        ? "जो शर्त हम जाँच नहीं सकते, उसे 'सत्यापन ज़रूरी' चिह्नित किया जाता है — चुपचाप छिपाया नहीं जाता।"
        : "Any criterion we cannot check is explicitly marked 'needs verification' — never silently hidden.",
    },
  ];
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container-app py-10">
            <h1 className="text-3xl font-extrabold tracking-tight">{t("nav.how")}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {lang === "hi"
                ? "कुछ सवाल → मिलती-जुलती योजनाएँ → पात्रता समझें → दस्तावेज़ तैयार करें → आधिकारिक माध्यम से आवेदन।"
                : "Answer a few questions → Discover relevant schemes → Understand eligibility → Prepare documents → Apply through official channels."}
            </p>
          </div>
        </section>

        <section className="container-app py-10">
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map((s) => (
              <li key={s.n} className="rounded-xl border border-border bg-card p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                  {s.n}
                </span>
                <h2 className="mt-3 text-base font-bold">{s.title}</h2>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>

          <h2 className="mt-12 text-2xl font-bold tracking-tight">
            {lang === "hi" ? "हमारे सिद्धांत" : "Our principles"}
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start gap-4 rounded-xl border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-foreground">
              {lang === "hi"
                ? "तैयार हैं? प्रश्नावली पाँच मिनट से कम समय लेती है।"
                : "Ready? The questionnaire takes less than five minutes."}
            </p>
            <div className="flex gap-2">
              <CheckMyEligibility />
              <Link
                to="/explore"
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary/50"
              >
                {t("hero.cta2")}
                <ArrowRight className="ml-2 size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

