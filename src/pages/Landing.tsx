import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { CheckMyEligibility } from "@/components/scheme-ui";
import { SCHEMES, SCHEME_CATEGORIES, CATEGORY_LABELS_HI } from "@/data/schemes";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router";
import {
  BookOpenCheck,
  ClipboardList,
  ExternalLink,
  Landmark,
  ListChecks,
  Search,
  ShieldCheck,
  Sprout,
  UserRoundSearch,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CATEGORY_ICONS: Record<string, typeof Sprout> = {
  "Education & Scholarships": BookOpenCheck,
  "Agriculture & Farmers": Sprout,
  "Women & Child Welfare": ShieldCheck,
  Healthcare: ShieldCheck,
  Housing: Landmark,
  "Employment & Skill Development": ClipboardList,
  "Pension & Senior Citizens": Landmark,
  "Disability Benefits": ShieldCheck,
  "Entrepreneurship & MSMEs": Landmark,
  "Social Welfare": ClipboardList,
};

function Hero() {
  const { t, lang } = useI18n();
  return (
    <section className="hero-pattern border-b border-border">
      <div className="container-app grid items-center gap-10 py-12 md:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-secondary-foreground"
          >
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            {t("hero.badge")}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-foreground sm:text-5xl"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          >
            {t("hero.sub")}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <CheckMyEligibility size="lg" />
            <Button asChild size="lg" variant="outline">
              <Link to="/explore">{t("hero.cta2")}</Link>
            </Button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-xs leading-5 text-muted-foreground"
          >
            {t("hero.disclaimer")}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
          className="photo-frame hero-photo-fallback aspect-[4/3] w-full shadow-sm"
        >
          <img
            src="/img/hero.svg"
            alt={t("hero.photoAlt")}
            className="opacity-90"
            loading="eager"
            width={1600}
            height={1200}
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith("/img/hero.svg")) img.src = "/img/hero.svg";
            }}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-xs font-medium text-white">
            {lang === "hi"
              ? "खेती, पढ़ाई, स्वास्थ्य, आवास — हर परिस्थिति के लिए योजनाएँ"
              : "Farming, education, healthcare, housing — schemes for every circumstance"}
          </figcaption>
        </motion.div>
      </div>
    </section>
  );
}

function Trust() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const items = [
    { icon: UserRoundSearch, title: t("trust.1.t"), desc: t("trust.1.d") },
    { icon: ListChecks,      title: t("trust.2.t"), desc: t("trust.2.d") },
    { icon: ExternalLink,    title: t("trust.3.t"), desc: t("trust.3.d") },
    { icon: ClipboardList,   title: t("trust.4.t"), desc: t("trust.4.d") },
  ];
  return (
    <section className="border-b border-border bg-card">
      <div className="container-app py-12">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight">{t("trust.title")}</h2>
        </FadeIn>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-lg border border-border bg-background p-5"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
                <item.icon className="size-4.5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 text-sm font-semibold leading-6">{item.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HowItWorksPreview() {
  const { t } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const steps = [
    { n: "1", title: t("how.1.t"), desc: t("how.1.d") },
    { n: "2", title: t("how.2.t"), desc: t("how.2.d") },
    { n: "3", title: t("how.3.t"), desc: t("how.3.d") },
    { n: "4", title: t("how.4.t"), desc: t("how.4.d") },
  ];
  return (
    <section className="border-b border-border">
      <div className="container-app py-12">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">{t("how.title")}</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/how-it-works">{t("nav.how")}</Link>
            </Button>
          </div>
        </FadeIn>
        <motion.ol
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((s) => (
            <motion.li key={s.n} variants={fadeUp} className="rounded-lg border border-border bg-card p-5">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{s.desc}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function CategoryPreview() {
  const { lang } = useI18n();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  return (
    <section className="border-b border-border bg-card">
      <div className="container-app py-12">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {lang === "hi" ? "श्रेणियों के अनुसार योजनाएँ" : "Schemes by category"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {lang === "hi"
                  ? "सभी योजनाएँ आधिकारिक स्रोतों से ली गई हैं और सत्यापन तिथि के साथ प्रकाशित हैं।"
                  : "All schemes come from official sources and are published with their verification date."}
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to="/explore">
                <Search className="mr-2 size-4" aria-hidden="true" />
                {lang === "hi" ? "सभी देखें" : "Browse all"}
              </Link>
            </Button>
          </div>
        </FadeIn>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={stagger}
          className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {SCHEME_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] ?? ClipboardList;
            const count = SCHEMES.filter((s) => s.category === cat).length;
            return (
              <motion.div key={cat} variants={fadeUp}>
                <Link
                  to={`/explore?category=${encodeURIComponent(cat)}`}
                  className="group flex flex-col rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
                >
                  <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-primary">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="mt-2.5 text-sm font-semibold leading-5 group-hover:text-primary">
                    {lang === "hi" ? CATEGORY_LABELS_HI[cat] : cat}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {count > 0
                      ? lang === "hi"
                        ? `${count} योजना(एँ)`
                        : `${count} scheme${count > 1 ? "s" : ""}`
                      : lang === "hi"
                        ? "आगे आ रही हैं"
                        : "coming soon"}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function GapSection() {
  const { lang } = useI18n();
  const rows = [
    {
      existing: { en: "Government portals list hundreds of schemes with dense legal text.", hi: "सरकारी पोर्टल सैकड़ों योजनाएँ घने कानूनी भाषा में दिखाते हैं।" },
      jansahay: { en: "Plain-language summaries in English and Hindi, with the official link always one click away.", hi: "सरल भाषा में सार — हिंदी और अंग्रेज़ी में — आधिकारिक लिंक हमेशा एक क्लिक दूर।" },
    },
    {
      existing: { en: "Eligibility rules are scattered across PDFs and ministry pages.", hi: "पात्रता नियम PDF और मंत्रालय पृष्ठों में बिखरे हैं।" },
      jansahay: { en: "Criteria are structured per scheme and evaluated against your answers, with reasons shown.", hi: "शर्तें हर योजना के लिए संरचित हैं और आपके उत्तरों पर कारण-सहित जाँची जाती हैं।" },
    },
    {
      existing: { en: "Official checkers are scheme-specific; no single view across schemes.", hi: "आधिकारिक जाँच योजना-विशेष हैं; सभी योजनाओं का एक साथ कोई दृश्य नहीं।" },
      jansahay: { en: "One questionnaire checks every scheme in the dataset at once, sorted by fit.", hi: "एक प्रश्नावली एक साथ सभी योजनाएँ जाँचती है और मिलान के अनुसार क्रमबद्ध करती है।" },
    },
    {
      existing: { en: "Documents and steps must be pieced together manually.", hi: "दस्तावेज़ और प्रक्रिया खुद जोड़ने पड़ते हैं।" },
      jansahay: { en: "Every result carries a document checklist and step-by-step application guide.", hi: "हर परिणाम के साथ दस्तावेज़ सूची और चरण-दर-चरण आवेदन मार्गदर्शिका।" },
    },
    {
      existing: { en: "Third-party sites often hide official sources or scrape unverified data.", hi: "तीसरे पक्ष की साइटें अक्सर आधिकारिक स्रोत छिपाती हैं या बिना जाँच डेटा उठाती हैं।" },
      jansahay: { en: "Each scheme shows its official source, verification date, and anything still unverified.", hi: "हर योजना अपना आधिकारिक स्रोत, सत्यापन तिथि और अज्ञात विवरण स्पष्ट दिखाती है।" },
    },
  ];
  return (
    <section className="border-b border-border">
      <div className="container-app py-12">
        <FadeIn>
          <h2 className="text-2xl font-bold tracking-tight">
            {lang === "hi" ? "मौजूदा विकल्प और जनसहाय में अंतर" : "How JANSAHAY differs from existing solutions"}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {lang === "hi"
              ? "सरकार के अपने पोर्टल सत्य का स्रोत हैं — जनसहाय उनकी जगह नहीं लेता, उन तक पहुँचना आसान बनाता है।"
              : "Government portals remain the source of truth — JANSAHAY does not replace them; it makes reaching the right one easier."}
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid grid-cols-1 border-b border-border bg-muted/50 sm:grid-cols-2">
            <p className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              {lang === "hi" ? "आम तौर पर आज" : "Commonly, today"}
            </p>
            <p className="border-t border-border px-5 py-3 text-xs font-bold uppercase tracking-wide text-primary sm:border-l sm:border-t-0">
              {lang === "hi" ? "जनसहाय (v1)" : "JANSAHAY (v1)"}
            </p>
          </div>
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ borderBottom: i === rows.length - 1 ? undefined : "1px solid var(--border)" }}
            >
              <p className="px-5 py-4 text-sm leading-6 text-muted-foreground">{lang === "hi" ? r.existing.hi : r.existing.en}</p>
              <p className="border-t border-border bg-secondary/30 px-5 py-4 text-sm leading-6 text-foreground sm:border-l sm:border-t-0">
                {lang === "hi" ? r.jansahay.hi : r.jansahay.en}
              </p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function ClosingCta() {
  const { t, lang } = useI18n();
  return (
    <section className="bg-card">
      <FadeIn>
        <div className="container-app flex flex-col items-start gap-5 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {lang === "hi" ? "आज ही जाँचें — पाँच मिनट में" : "Check in five minutes, today"}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {lang === "hi"
                ? "कोई लॉगिन नहीं, कोई आधार नहीं, कोई OTP नहीं। उत्तर आपके उपकरण पर ही रहते हैं।"
                : "No login needed to browse. Never share Aadhaar or OTPs. Sign in to sync your answers."}
            </p>
          </div>
          <CheckMyEligibility size="lg" />
        </div>
      </FadeIn>
    </section>
  );
}

export default function Landing() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <Trust />
        <HowItWorksPreview />
        <CategoryPreview />
        <GapSection />
        <ClosingCta />
        <div className="border-t border-border bg-background">
          <div className="container-app py-6 text-xs leading-5 text-muted-foreground">
            {t("hero.disclaimer")}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
