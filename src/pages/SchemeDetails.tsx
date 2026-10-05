import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  CategoryBadge,
  CheckMyEligibility,
  OfficialLink,
  SaveButton,
  VerdictBadge,
} from "@/components/scheme-ui";
import { Button } from "@/components/ui/button";
import { getScheme } from "@/data/schemes";
import { evaluateScheme } from "@/lib/eligibility";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  CircleAlert,
  CircleHelp,
  ExternalLink,
  Printer,
} from "lucide-react";

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm leading-6 text-foreground/90">
          <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export default function SchemeDetails() {
  const { id } = useParams();
  const { t, lang } = useI18n();
  const { profile } = useProfile();
  const scheme = getScheme(id ?? "");

  if (!scheme) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container-app py-16 text-center">
          <p className="text-lg font-semibold">Scheme not found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            The scheme you're looking for doesn't exist or was removed.
          </p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/explore">
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to Explore Schemes
            </Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const hasAnswers = Object.values(profile).some((v) => v !== null);
  const result = hasAnswers ? evaluateScheme(scheme, profile, lang) : null;

  const L = (en: string, hi: string) => (lang === "hi" ? hi : en);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">

        <section className="border-b border-border bg-card">
          <div className="container-app py-8">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t("explore.title")}
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <CategoryBadge scheme={scheme} />
              {result && <VerdictBadge verdict={result.verdict} />}
            </div>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {L(scheme.nameHi, scheme.name)}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
              {L(scheme.purpose.hi, scheme.purpose.en)}
            </p>
            <div className="no-print mt-5 flex flex-wrap items-center gap-2">
              <OfficialLink href={scheme.applyUrl ?? scheme.infoUrl} apply={Boolean(scheme.applyUrl)} />
              <SaveButton id={scheme.id} />
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 size-4" aria-hidden="true" />
                {t("results.print")}
              </Button>
            </div>
          </div>
        </section>

        <section className="container-app grid gap-6 py-8 lg:grid-cols-[1fr_320px]">

          <div className="grid gap-6">
            <Section title={t("scheme.beneficiaries")}>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                {L(scheme.beneficiaries.hi, scheme.beneficiaries.en)}
              </p>
            </Section>

            <Section title={t("scheme.benefits")}>
              <p className="mt-2 text-sm leading-6 text-foreground/90">
                {L(scheme.benefits.hi, scheme.benefits.en)}
              </p>
            </Section>

            <Section title={t("scheme.eligibility")}>
              <List items={L2(scheme.eligibilityHuman, lang)} />
              {scheme.exclusionsHuman && scheme.exclusionsHuman[lang].length > 0 && (
                <>
                  <h3 className="mt-5 text-sm font-bold text-destructive">{t("scheme.exclusions")}</h3>
                  <List items={scheme.exclusionsHuman[lang]} />
                </>
              )}
            </Section>

            <Section title={t("scheme.docs")}>
              <List items={L2(scheme.documents, lang)} />
            </Section>

            <Section title={t("scheme.apply")}>
              <List items={L2(scheme.applicationSteps, lang)} />
              {scheme.applyNote && (
                <p className="mt-4 rounded-md border border-gold/60 bg-gold/10 p-3 text-xs leading-5 text-gold-foreground">
                  {L(scheme.applyNote.hi, scheme.applyNote.en)}
                </p>
              )}
              <div className="no-print mt-4">
                <OfficialLink
                  href={scheme.applyUrl ?? scheme.infoUrl}
                  apply={Boolean(scheme.applyUrl)}
                  small
                />
              </div>
            </Section>
          </div>


          <aside className="grid gap-6">
            {result && (
              <Section title={L("Your assessment", "आपका आकलन")}>
                <div className="mt-2 grid gap-3">
                  {result.failing.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-destructive">
                        <CircleAlert className="size-3.5" aria-hidden="true" />
                        {t("results.whyIneligible")}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {result.failing.map((r, i) => (
                          <li key={i} className="text-xs leading-5 text-foreground/90">• {r.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.unverified.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-gold-foreground">
                        <CircleHelp className="size-3.5" aria-hidden="true" />
                        {t("results.needVerify")}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {result.unverified.map((r, i) => (
                          <li key={i} className="text-xs leading-5 text-foreground/90">• {r.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {result.matched.length > 0 && (
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <BadgeCheck className="size-3.5" aria-hidden="true" />
                        {t("results.whyMatch")}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {result.matched.map((r, i) => (
                          <li key={i} className="text-xs leading-5 text-foreground/90">• {r.text}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs leading-5 text-muted-foreground">
                    {L(
                      "Estimates only — the official decision rests with the authority.",
                      "केवल अनुमान — आधिकारिक निर्णय प्राधिकरण का है।",
                    )}
                  </p>
                </div>
              </Section>
            )}
            {!result && (
              <Section title={L("Personalised assessment", "व्यक्तिगत आकलन")}>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {t("scheme.needsCheck")}
                </p>
                <div className="mt-4">
                  <CheckMyEligibility size="sm" />
                </div>
              </Section>
            )}

            <Section title={t("scheme.sources")}>
              <div className="mt-2 grid gap-3 text-sm">
                <a
                  href={scheme.infoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline underline-offset-4"
                >
                  {scheme.infoUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
                <dl className="grid gap-2 text-xs text-muted-foreground">
                  <div className="flex justify-between gap-3">
                    <dt className="font-medium">{t("scheme.verified")}</dt>
                    <dd>{scheme.sourceVerificationDate}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="font-medium">{t("scheme.reviewed")}</dt>
                    <dd>{scheme.lastReviewedDate}</dd>
                  </div>
                </dl>
                {scheme.needsVerification.length > 0 && (
                  <div className="rounded-md border border-gold/60 bg-gold/10 p-3">
                    <p className="text-xs font-semibold text-gold-foreground">
                      {t("scheme.verifyNote")}
                    </p>
                    <ul className="mt-1.5 space-y-1">
                      {scheme.needsVerification.map((n, i) => (
                        <li key={i} className="text-xs leading-5 text-foreground/90">• {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Section>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function L2(
  obj: { en: string[]; hi: string[] },
  lang: "en" | "hi",
): string[] {
  return lang === "hi" ? obj.hi : obj.en;
}

