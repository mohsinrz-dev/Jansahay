import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  CategoryBadge,
  CheckMyEligibility,
  OfficialLink,
  SaveButton,
  VerdictBadge,
} from "@/components/scheme-ui";
import { Button } from "@/components/ui/button";
import { evaluateAll, type MatchResult } from "@/lib/eligibility";
import { SCHEMES } from "@/data/schemes";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { Link } from "react-router";
import { Printer, SquarePen } from "lucide-react";

function AnswerSummary() {
  const { t, lang } = useI18n();
  const { profile } = useProfile();

  const rows: Array<[string, string]> = [];
  const push = (label: string, v: string | null) => {
    if (v) rows.push([label, v]);
  };

  push(lang === "hi" ? "राज्य" : "State", profile.state);
  push(
    lang === "hi" ? "क्षेत्र" : "Area",
    profile.residence === "rural"
      ? lang === "hi"
        ? "ग्रामीण"
        : "Rural"
      : profile.residence === "urban"
        ? lang === "hi"
          ? "शहरी"
          : "Urban"
        : null,
  );
  push(
    lang === "hi" ? "आयु समूह" : "Age group",
    profile.ageGroup?.replace("-", "–") ?? null,
  );
  push(
    lang === "hi" ? "आय" : "Income",
    profile.income?.replace("l", " lakh").replace("-", "–") ?? null,
  );
  push(
    lang === "hi" ? "परिवार" : "Household",
    profile.householdType === "bpl"
      ? "BPL"
      : profile.householdType === "low-income"
        ? lang === "hi"
          ? "कम आय"
          : "Low income"
        : profile.householdType === "middle-income"
          ? lang === "hi"
            ? "मध्यम आय"
            : "Middle income"
          : null,
  );
  push(
    lang === "hi" ? "व्यवसाय" : "Occupation",
    profile.occupation
      ? profile.occupation === "daily-wage"
        ? lang === "hi"
          ? "दिहाड़ी मज़दूर"
          : "Daily wage"
        : profile.occupation.charAt(0).toUpperCase() +
          profile.occupation.slice(1).replace("-", " ")
      : null,
  );

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("results.summary")}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {rows.length === 0 ? (
          <span className="text-sm text-muted-foreground">
            {lang === "hi" ? "कोई उत्तर नहीं" : "No answers recorded"}
          </span>
        ) : (
          rows.map(([k, v]) => (
            <span
              key={k + v}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs"
            >
              <span className="font-semibold">{k}:</span> {v}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function ResultCard({ result }: { result: MatchResult }) {
  const { t, lang } = useI18n();
  const s = result.scheme;

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge scheme={s} />
        <VerdictBadge verdict={result.verdict} />
      </div>
      <h3 className="mt-3 text-lg font-bold leading-snug">
        <Link
          to={`/scheme/${s.id}`}
          className="hover:text-primary hover:underline underline-offset-4"
        >
          {lang === "hi" ? s.nameHi : s.name}
        </Link>
      </h3>
      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
        {lang === "hi" ? s.purpose.hi : s.purpose.en}
      </p>

      {result.failing.length > 0 && (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive">
            {t("results.whyIneligible")}
          </p>
          <ul className="mt-1.5 space-y-1">
            {result.failing.map((r, i) => (
              <li key={i} className="text-xs leading-5 text-foreground/90">
                • {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.unverified.length > 0 && (
        <div className="mt-3 rounded-md border border-gold/60 bg-gold/10 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-gold-foreground">
            {t("results.needVerify")}
          </p>
          <ul className="mt-1.5 space-y-1">
            {result.unverified.map((r, i) => (
              <li key={i} className="text-xs leading-5 text-foreground/90">
                • {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.verdict !== "ineligible" && result.matched.length > 0 && (
        <div className="mt-3 rounded-md border border-border bg-secondary/40 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
            {t("results.whyMatch")}
          </p>
          <ul className="mt-1.5 space-y-1">
            {result.matched.map((r, i) => (
              <li key={i} className="text-xs leading-5 text-foreground/90">
                • {r.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 rounded-md border border-border bg-background p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("results.docs")}
        </p>
        <ul className="mt-1.5 grid gap-1 sm:grid-cols-2">
          {(lang === "hi" ? s.documents.hi : s.documents.en)
            .slice(0, 4)
            .map((d) => (
              <li key={d} className="text-xs leading-5 text-foreground/90">
                • {d}
              </li>
            ))}
        </ul>
      </div>

      <div className="no-print mt-4 flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" size="sm">
          <Link to={`/scheme/${s.id}`}>{t("results.details")}</Link>
        </Button>
        <OfficialLink
          href={s.applyUrl ?? s.infoUrl}
          apply={Boolean(s.applyUrl)}
          small
        />
        <SaveButton id={s.id} />
      </div>
    </article>
  );
}

export default function Results() {
  const { t, lang } = useI18n();
  const { profile } = useProfile();
  const results = evaluateAll(SCHEMES, profile, lang);

  const eligible = results.filter((r) => r.verdict === "eligible");
  const verify = results.filter((r) => r.verdict === "verify");
  const ineligible = results.filter((r) => r.verdict === "ineligible");

  const groups: Array<{
    key: string;
    title: string;
    items: MatchResult[];
    tone: "primary" | "gold" | "muted";
  }> = [
    { key: "eligible", title: t("results.eligibleCount"), items: eligible, tone: "primary" },
    { key: "verify", title: t("results.verifyCount"), items: verify, tone: "gold" },
    { key: "ineligible", title: t("results.ineligibleCount"), items: ineligible, tone: "muted" },
  ];

  const isEmpty =
    eligible.length === 0 && verify.length === 0 && ineligible.length === 0;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container-app py-8">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("results.title")}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              {lang === "hi"
                ? "ये अनुमान आपके उत्तरों पर आधारित हैं — ये आधिकारिक निर्णय नहीं हैं। स्वीकृति हमेशा संबंधित प्राधिकरण का निर्णय है।"
                : "These assessments are based on your answers — they are not official decisions. Approval always rests with the concerned authority."}
            </p>
            <div className="mt-4">
              <AnswerSummary />
            </div>
            <div className="no-print mt-4 flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/check">
                  <SquarePen className="mr-2 size-4" aria-hidden="true" />
                  {t("results.edit")}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.print()}>
                <Printer className="mr-2 size-4" aria-hidden="true" />
                {t("results.print")}
              </Button>
            </div>
          </div>
        </section>

        <section className="container-app py-8">
          {isEmpty ? (
            <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
              <p className="text-sm text-muted-foreground">{t("results.none")}</p>
              <div className="mt-4 flex justify-center">
                <CheckMyEligibility size="sm" />
              </div>
            </div>
          ) : (
            <div className="grid gap-8">
              {groups.map(
                (g) =>
                  g.items.length > 0 && (
                    <div key={g.key}>
                      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
                        {g.title} ({g.items.length})
                      </h2>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        {g.items.map((r) => (
                          <ResultCard key={r.scheme.id} result={r} />
                        ))}
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

