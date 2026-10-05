import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";
import { Link } from "react-router";
import { ShieldCheck, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const TEAM = [
  {
    name: "Mohsin",
    role: "Research, Ideation & PRD",
    desc: "Led user research, identified key pain points in scheme discovery, and authored the product requirements document.",
    initials: "MO",
  },
  {
    name: "Neha",
    role: "UI/UX Design & Frontend",
    desc: "Designed the visual identity, component system, and responsive layouts across all pages.",
    initials: "NE",
  },
  {
    name: "Monika",
    role: "Backend & Database",
    desc: "Set up the backend, authentication, and database for user sessions.",
    initials: "MK",
  },
  {
    name: "Faisal",
    role: "Data Research & Verification",
    desc: "Researched and verified government scheme details against official portals and authored the schemes dataset.",
    initials: "FA",
  },
];

export default function About() {
  const { t, lang } = useI18n();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">


        <section className="border-b border-border bg-card">
          <div className="container-app py-10">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-3xl font-extrabold tracking-tight"
            >
              {t("nav.about")}
            </motion.h1>
            <motion.p
              initial="hidden"
              animate="show"
              variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.1 } } }}
              className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base"
            >
              {t("about.p")}
            </motion.p>
          </div>
        </section>


        <section className="container-app grid gap-6 py-10 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="rounded-xl border border-border bg-card p-6"
          >
            <span className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
              <ShieldCheck className="size-4.5" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-base font-bold">
              {lang === "hi" ? "गोपनीयता" : "Privacy"}
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>• {lang === "hi" ? "केवल पात्रता मिलान के लिए आवश्यक जानकारी माँगी जाती है।" : "We collect only what eligibility matching requires."}</li>
              <li>• {lang === "hi" ? "अतिथि उत्तर इसी उपकरण पर रहते हैं; साइन इन करने पर उत्तर और सहेजी गई योजनाएँ आपके खाते में सिंक होती हैं।" : "Guest answers stay on this device; sign in to sync answers and saved schemes to your account."}</li>
              <li>• {lang === "hi" ? "हम आधार, OTP या बैंक विवरण कभी नहीं माँगते।" : "We never ask for Aadhaar, OTPs, or bank details."}</li>
              <li>• {lang === "hi" ? "'मेरी योजनाएँ' से सारा सहेजा डेटा मिटाया जा सकता है।" : "All saved data can be cleared from the My Schemes page."}</li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ ...fadeUp, show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay: 0.1 } } }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="text-base font-bold">
              {lang === "hi" ? "डेटा कैसे तैयार होता है" : "How the data is prepared"}
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              <li>• {lang === "hi" ? "योजनाएँ आधिकारिक पोर्टलों से सत्यापित की जाती हैं।" : "Schemes are verified against official portals."}</li>
              <li>• {lang === "hi" ? "हर योजना के साथ स्रोत लिंक और सत्यापन तिथि दी जाती है।" : "Every scheme carries its source link and verification date."}</li>
              <li>• {lang === "hi" ? "जो पुष्ट नहीं हो सकता, उसे स्पष्ट चिह्नित किया जाता है।" : "Anything unverifiable is explicitly marked."}</li>
              <li>• {lang === "hi" ? "नियम बदलने पर डेटा फ़ाइल अपडेट की जाती है — UI वही रहता है।" : "When rules change, only the data file is updated — the UI stays the same."}</li>
            </ul>
          </motion.div>
        </section>


        <section className="border-t border-border bg-card">
          <div className="container-app py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="mb-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-primary">
                {lang === "hi" ? "हैकाथॉन प्रस्तुति" : "Hackathon submission"}
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight">
                {lang === "hi" ? "टीम डायमंड" : "Team Diamond"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {lang === "hi"
                  ? "जनसहाय को एक हैकाथॉन प्रोजेक्ट के रूप में बनाया गया है जिसका लक्ष्य सरकारी कल्याण योजनाओं तक पहुँच को आसान बनाना है।"
                  : "JANSAHAY is a hackathon project built with the goal of making government welfare scheme discovery simpler and more transparent."}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {TEAM.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {member.initials}
                  </div>
                  <p className="mt-3 text-base font-bold">{member.name}</p>
                  <p className="text-xs font-semibold text-primary">{member.role}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{member.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mt-8 text-xs text-muted-foreground"
            >
              {lang === "hi"
                ? "संस्करण 1 · 2026 · यह प्रोजेक्ट एक स्वतंत्र शैक्षिक प्रयास है।"
                : "Version 1 · 2026 · This project is an independent educational effort."}
            </motion.p>
          </div>
        </section>


        <section className="container-app pb-12 pt-6">
          <div className="rounded-xl border border-border bg-secondary/40 p-6">
            <p className="text-sm leading-6 text-foreground">{t("about.team")}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                <ExternalLink className="mr-2 size-4" aria-hidden="true" />
                {t("hero.cta2")}
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary/50"
              >
                {t("nav.how")} →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
