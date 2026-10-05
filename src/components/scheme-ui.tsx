import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CATEGORY_LABELS_HI, type SchemeDoc, type Verdict } from "@/data/schemes";
import { useI18n } from "@/lib/i18n";
import { useSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  CircleAlert,
  CircleHelp,
  Bookmark,
  ExternalLink,
} from "lucide-react";

export function CheckMyEligibility({
  size = "default",
  className,
}: {
  size?: "default" | "sm" | "lg";
  className?: string;
}) {
  const { t } = useI18n();
  const navigate = useNavigate();
  return (
    <Button
      size={size}
      className={className}
      onClick={() => navigate("/check")}
    >
      {t("nav.check")}
      <ArrowRight className="ml-2 size-4" />
    </Button>
  );
}

export function VerdictBadge({ verdict }: { verdict: Verdict | null }) {
  const { t } = useI18n();
  if (verdict === "eligible") {
    return (
      <Badge className="gap-1 bg-primary text-primary-foreground hover:bg-primary">
        <BadgeCheck className="size-3.5" aria-hidden="true" />
        {t("verdict.eligible")}
      </Badge>
    );
  }
  if (verdict === "verify") {
    return (
      <Badge
        className="gap-1 border border-transparent bg-gold text-gold-foreground hover:bg-gold"
        aria-label={t("verdict.verify")}
      >
        <CircleHelp className="size-3.5" aria-hidden="true" />
        {t("verdict.verify")}
      </Badge>
    );
  }
  if (verdict === "ineligible") {
    return (
      <Badge variant="outline" className="gap-1 border-destructive/40 text-destructive">
        <CircleAlert className="size-3.5" aria-hidden="true" />
        {t("verdict.ineligible")}
      </Badge>
    );
  }
  return null;
}

export function CategoryBadge({ scheme }: { scheme: SchemeDoc }) {
  const { lang } = useI18n();
  return (
    <Badge variant="secondary" className="text-xs font-medium">
      {lang === "hi" ? CATEGORY_LABELS_HI[scheme.category] : scheme.category}
    </Badge>
  );
}

export function SaveButton({ id }: { id: string }) {
  const { t } = useI18n();
  const { isSaved, isLoading, toggleSave } = useSaved();
  const saved = isSaved(id);
  return (
    <Button
      type="button"
      variant={saved ? "secondary" : "outline"}
      size="sm"
      aria-pressed={saved}
      disabled={isLoading}
      onClick={() => toggleSave(id)}
    >
      <Bookmark className={cn("mr-2 size-4", saved && "fill-current")} aria-hidden="true" />
      {saved ? t("scheme.unsave") : t("scheme.save")}
    </Button>
  );
}

export function OfficialLink({
  href,
  apply,
  small,
}: {
  href: string;
  apply?: boolean;
  small?: boolean;
}) {
  const { t } = useI18n();
  return (
    <Button asChild size={small ? "sm" : "default"} variant={apply ? "default" : "outline"}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {apply ? t("scheme.officialApply") : t("scheme.officialSite")}
        <ExternalLink className="ml-2 size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

export function SchemeCard({
  scheme,
  verdict = null,
  reasons,
}: {
  scheme: SchemeDoc;
  verdict?: Verdict | null;
  reasons?: string[];
}) {
  const { t, lang } = useI18n();
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge scheme={scheme} />
          {verdict && <VerdictBadge verdict={verdict} />}
        </div>
        <CardTitle className="mt-2 text-lg leading-snug">
          <Link
            to={`/scheme/${scheme.id}`}
            className="hover:text-primary hover:underline underline-offset-4"
          >
            {lang === "hi" ? scheme.nameHi : scheme.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm leading-6">
          {lang === "hi" ? scheme.purpose.hi : scheme.purpose.en}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {reasons && reasons.length > 0 && (
          <div className="mb-3 rounded-md border border-border bg-muted/40 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {verdict === "ineligible" ? t("results.whyIneligible") : t("results.whyMatch")}
            </p>
            <ul className="mt-1.5 space-y-1">
              {reasons.slice(0, 3).map((r) => (
                <li key={r} className="flex gap-1.5 text-xs leading-5 text-foreground/90">
                  <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to={`/scheme/${scheme.id}`}>{t("results.details")}</Link>
          </Button>
          <SaveButton id={scheme.id} />
        </div>
      </CardContent>
    </Card>
  );
}
