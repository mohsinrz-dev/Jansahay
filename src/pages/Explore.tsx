import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  SchemeCard,
} from "@/components/scheme-ui";
import { SCHEMES, SCHEME_CATEGORIES, CATEGORY_LABELS_HI, type GovLevel } from "@/data/schemes";
import { useI18n } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Explore() {
  const { t, lang } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [query, setQuery] = useState("");
  const [gov, setGov] = useState<"all" | GovLevel>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHEMES.filter((s) => {
      if (category && s.category !== category) return false;
      if (gov !== "all" && s.govtLevel !== gov) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.nameHi.includes(q) ||
        s.purpose.en.toLowerCase().includes(q) ||
        s.purpose.hi.includes(q)
      );
    });
  }, [query, category, gov]);

  const setCategory = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("category", value);
    else next.delete("category");
    setSearchParams(next, { replace: true });
  };

  const inputId = "scheme-search";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container-app py-10">
            <h1 className="text-3xl font-extrabold tracking-tight">{t("explore.title")}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              {t("explore.sub")}
            </p>
          </div>
        </section>

        <section className="container-app py-8">
          <div className="grid gap-3 rounded-lg border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
                {lang === "hi" ? "खोज" : "Search"}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("explore.search")}
                  className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>
            <div>
              <label htmlFor="filter-category" className="mb-1.5 block text-sm font-medium">
                {t("explore.allCategories")}
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">{t("explore.allCategories")}</option>
                {SCHEME_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {lang === "hi" ? CATEGORY_LABELS_HI[c] : c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium">
                {lang === "hi" ? "सरकारी स्तर" : "Government level"}
              </span>
              <div className="flex overflow-hidden rounded-md border border-input">
                {(
                  [
                    ["all", t("explore.allGov")],
                    ["central", t("explore.central")],
                    ["state", t("explore.state")],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={gov === value}
                    onClick={() => setGov(value)}
                    className={cn(
                      "flex-1 px-2 py-2 text-xs font-semibold",
                      gov === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length} {t("explore.results")}
          </p>

          {filtered.length === 0 ? (
            <p className="mt-10 rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              {t("explore.none")}
            </p>
          ) : (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <SchemeCard key={s.id} scheme={s} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

