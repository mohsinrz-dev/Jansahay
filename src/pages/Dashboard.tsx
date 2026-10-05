import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  CategoryBadge,
  CheckMyEligibility,
  OfficialLink,
  VerdictBadge,
} from "@/components/scheme-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getScheme } from "@/data/schemes";
import { evaluateScheme } from "@/lib/eligibility";
import { useI18n } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { useSaved } from "@/lib/saved";
import { Link } from "react-router";
import { ShieldCheck, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export default function Dashboard() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const { savedIds, removeSaved, clearAll } = useSaved();
  const { profile, resetProfile } = useProfile();

  const saved = savedIds
    .map((id) => getScheme(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const hasAnswers = Object.values(profile).some((v) => v !== null);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container-app py-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-secondary-foreground">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
              {user
                ? user.user_metadata.full_name || user.email
                : lang === "hi" ? "गेस्ट मोड" : "Guest mode"}
            </span>
            <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {t("dash.title")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t("dash.sub")}
            </p>
          </div>
        </section>

        <section className="container-app grid gap-6 py-8 lg:grid-cols-[1fr_300px]">
          <div className="grid gap-4">
            {saved.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
                <p className="text-sm text-muted-foreground">{t("dash.empty")}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <CheckMyEligibility size="sm" />
                  <Button asChild size="sm" variant="outline">
                    <Link to="/explore">{t("hero.cta2")}</Link>
                  </Button>
                </div>
              </div>
            ) : (
              saved.map((s) => {
                const result = hasAnswers
                  ? evaluateScheme(s, profile, lang)
                  : null;
                return (
                  <Card key={s.id}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <CategoryBadge scheme={s} />
                        {result && <VerdictBadge verdict={result.verdict} />}
                      </div>
                      <CardTitle className="mt-2 text-lg leading-snug">
                        <Link
                          to={`/scheme/${s.id}`}
                          className="hover:text-primary hover:underline underline-offset-4"
                        >
                          {lang === "hi" ? s.nameHi : s.name}
                        </Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-sm leading-6">
                        {lang === "hi" ? s.purpose.hi : s.purpose.en}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap items-center gap-2 pt-0">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/scheme/${s.id}`}>{t("results.details")}</Link>
                      </Button>
                      <OfficialLink href={s.applyUrl ?? s.infoUrl} apply={Boolean(s.applyUrl)} small />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeSaved(s.id)}
                      >
                        <Trash2 className="mr-2 size-4" aria-hidden="true" />
                        {t("dash.remove")}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>

          <aside className="grid content-start gap-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold">{t("dash.checklist")}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {hasAnswers
                  ? lang === "hi"
                    ? user
                      ? "आपके उत्तर खाते में सहेजे हैं — परिणाम देखने के लिए तैयार।"
                      : "आपके उत्तर इसी ब्राउज़र में सहेजे हैं — परिणाम देखने के लिए तैयार।"
                    : user
                      ? "Your answers are saved to your account — results are ready to view."
                      : "Your answers are stored in this browser — results are ready to view."
                  : lang === "hi"
                    ? "पहले प्रश्नावली पूरी करें, फिर योजनाएँ सहेजें।"
                    : "Complete the questionnaire first, then save schemes."}
              </p>
              <div className="mt-4">
                {hasAnswers ? (
                  <Button asChild size="sm" variant="outline">
                    <Link to="/results">{t("results.title")}</Link>
                  </Button>
                ) : (
                  <CheckMyEligibility size="sm" />
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold">
                {t("dash.savedCount")} ({savedIds.length})
              </h2>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {user
                  ? lang === "hi"
                    ? "आपकी योजनाएँ और उत्तर आपके खाते में सहेजे गए हैं।"
                    : "Your schemes and answers are saved to your account."
                  : lang === "hi"
                    ? "सहेजा गया सारा डेटा केवल इसी उपकरण पर है।"
                    : "All saved data lives only on this device."}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 text-destructive hover:text-destructive"
                onClick={() => {
                  if (
                    window.confirm(
                      lang === "hi"
                        ? "सभी सहेजी गई योजनाएँ और उत्तर मिटाएँ?"
                        : "Clear all saved schemes and answers?",
                    )
                  ) {
                    clearAll();
                    resetProfile();
                  }
                }}
              >
                <Trash2 className="mr-2 size-4" aria-hidden="true" />
                {t("dash.clearAll")}
              </Button>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
