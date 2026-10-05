import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Link, NavLink, useNavigate } from "react-router";
import { CheckMyEligibility } from "@/components/scheme-ui";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Brand() {
  const { t } = useI18n();
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="JANSAHAY home">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v18" />
          <path d="M5 8l7-5 7 5" />
          <path d="M5 8v8l7 5 7-5V8" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-foreground">
          {t("brand.name")}
        </span>
        <span className="mt-0.5 hidden text-[11px] font-medium text-muted-foreground sm:block">
          {t("brand.tagline")}
        </span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/explore", label: t("nav.explore") },
    { to: "/how-it-works", label: t("nav.how") },
    { to: "/about", label: t("nav.about") },
  ];

  const navCls = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      isActive
        ? "bg-secondary text-secondary-foreground"
        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
    );

  return (
    <header className="no-print sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {t("nav.skip")}
      </a>
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Brand />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={navCls} end={l.to === "/"}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <div
            className="flex overflow-hidden rounded-md border border-border"
            role="group"
            aria-label="Language"
          >
            {(["en", "hi"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "px-2.5 py-1.5 text-xs font-semibold",
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {l === "en" ? "EN" : "हिं"}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard")}>
            {t("nav.mySchemes")}
          </Button>
          <CheckMyEligibility size="sm" />
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md border border-border lg:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="container-app flex flex-col gap-1 py-3">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={navCls}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/dashboard" className={navCls} onClick={() => setOpen(false)}>
              {t("nav.mySchemes")}
            </NavLink>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex overflow-hidden rounded-md border border-border" role="group" aria-label="Language">
                {(["en", "hi"] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "px-2.5 py-1.5 text-xs font-semibold",
                      lang === l
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-muted-foreground",
                    )}
                  >
                    {l === "en" ? "EN" : "हिं"}
                  </button>
                ))}
              </div>
              <CheckMyEligibility size="sm" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="no-print border-t border-border bg-card">
      <div className="container-app grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v18" />
                <path d="M5 8l7-5 7 5" />
                <path d="M5 8v8l7 5 7-5V8" />
              </svg>
            </span>
            <span className="text-base font-bold tracking-tight">{t("brand.name")}</span>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            {t("footer.independent")}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">{t("nav.explore")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" to="/explore">
                {t("explore.title")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" to="/check">
                {t("nav.check")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" to="/dashboard">
                {t("nav.mySchemes")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">{t("nav.about")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" to="/how-it-works">
                {t("nav.how")}
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" to="/about">
                {t("nav.about")}
              </Link>
            </li>
          </ul>
          <Badge variant="outline" className="mt-4 text-[11px] font-medium">
            v1 · 2026
          </Badge>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-app flex flex-col gap-1 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footer.built")}</span>
          <span>© 2026 {t("brand.name")}</span>
        </div>
      </div>
    </footer>
  );
}

