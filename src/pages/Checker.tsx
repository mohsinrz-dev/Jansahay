import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { useI18n } from "@/lib/i18n";
import {
  AGE_LABELS,
  CATEGORY_LABELS,
  EDUCATION_LABELS,
  GENDER_LABELS,
  HOUSEHOLD_LABELS,
  INCOME_LABELS,
  INDIAN_STATES,
  OCCUPATION_LABELS,
  RESIDENCE_LABELS,
  useProfile,
  type AgeGroup,
  type Category,
  type EducationLevel,
  type Gender,
  type HouseholdType,
  type IncomeRange,
  type Occupation,
  type Profile,
  type Residence,
} from "@/lib/profile";
import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Info, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Lang = "en" | "hi";

function OptionRow({
  label,
  checked,
  onSelect,
  name,
}: {
  label: string;
  checked: boolean;
  onSelect: () => void;
  name: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border p-3.5 text-sm font-medium transition-colors",
        checked
          ? "border-primary bg-secondary text-secondary-foreground"
          : "border-border bg-card hover:bg-secondary/50",
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="size-4 accent-[#176b5b]"
      />
      {label}
    </label>
  );
}

function YesNo({
  question,
  value,
  onChange,
  lang,
}: {
  question: string;
  value: boolean | null;
  onChange: (v: boolean | null) => void;
  lang: Lang;
}) {
  const options: Array<{ v: boolean | null; label: string }> = [
    { v: true, label: lang === "hi" ? "हाँ" : "Yes" },
    { v: false, label: lang === "hi" ? "नहीं" : "No" },
    { v: null, label: lang === "hi" ? "छोड़ें" : "Skip" },
  ];
  return (
    <fieldset>
      <legend className="text-sm font-semibold">{question}</legend>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <OptionRow
            key={String(o.v)}
            name={question}
            label={o.label}
            checked={(value ?? "unset") === (o.v ?? "unset")}
            onSelect={() => onChange(o.v)}
          />
        ))}
      </div>
    </fieldset>
  );
}

interface StepProps {
  profile: Profile;
  setField: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  lang: Lang;
}

function StepState({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-5">
      <div>
        <label htmlFor="state" className="mb-1.5 block text-sm font-medium">
          {lang === "hi" ? "राज्य / केंद्र शासित प्रदेश" : "State / UT"}
        </label>
        <select
          id="state"
          value={profile.state ?? ""}
          onChange={(e) => setField("state", e.target.value || null)}
          className="h-10 w-full max-w-md rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">
            {lang === "hi" ? "अपना राज्य चुनें" : "Select your state / UT"}
          </option>
          {INDIAN_STATES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="text-sm font-semibold">
          {lang === "hi" ? "आपका क्षेत्र" : "Your area"}
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-3">
          {(Object.keys(RESIDENCE_LABELS) as Residence[]).map((r) => (
            <OptionRow
              key={r}
              name="residence"
              label={lang === "hi" ? RESIDENCE_LABELS[r].hi : RESIDENCE_LABELS[r].en}
              checked={profile.residence === r}
              onSelect={() => setField("residence", r)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function StepAge({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(AGE_LABELS) as AgeGroup[]).map((a) => (
        <OptionRow
          key={a}
          name="age"
          label={lang === "hi" ? AGE_LABELS[a].hi : AGE_LABELS[a].en}
          checked={profile.ageGroup === a}
          onSelect={() => setField("ageGroup", a)}
        />
      ))}
    </div>
  );
}

function StepWork({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(OCCUPATION_LABELS) as Occupation[]).map((o) => (
        <OptionRow
          key={o}
          name="occupation"
          label={lang === "hi" ? OCCUPATION_LABELS[o].hi : OCCUPATION_LABELS[o].en}
          checked={profile.occupation === o}
          onSelect={() => setField("occupation", o)}
        />
      ))}
    </div>
  );
}

function StepIncome({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(INCOME_LABELS) as IncomeRange[]).map((i) => (
        <OptionRow
          key={i}
          name="income"
          label={lang === "hi" ? INCOME_LABELS[i].hi : INCOME_LABELS[i].en}
          checked={profile.income === i}
          onSelect={() => setField("income", i)}
        />
      ))}
    </div>
  );
}

function StepEducation({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(EDUCATION_LABELS) as EducationLevel[]).map((e) => (
        <OptionRow
          key={e}
          name="education"
          label={lang === "hi" ? EDUCATION_LABELS[e].hi : EDUCATION_LABELS[e].en}
          checked={profile.education === e}
          onSelect={() => setField("education", e)}
        />
      ))}
    </div>
  );
}

function StepHousehold({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(Object.keys(HOUSEHOLD_LABELS) as HouseholdType[]).map((h) => (
        <OptionRow
          key={h}
          name="household"
          label={lang === "hi" ? HOUSEHOLD_LABELS[h].hi : HOUSEHOLD_LABELS[h].en}
          checked={profile.householdType === h}
          onSelect={() => setField("householdType", h)}
        />
      ))}
    </div>
  );
}

function StepCategoryGender({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="text-sm font-semibold">
          {lang === "hi" ? "समुदाय श्रेणी" : "Community category"}
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
            <OptionRow
              key={c}
              name="category"
              label={lang === "hi" ? CATEGORY_LABELS[c].hi : CATEGORY_LABELS[c].en}
              checked={profile.category === c}
              onSelect={() => setField("category", c)}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-sm font-semibold">
          {lang === "hi" ? "लिंग" : "Gender"}
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {(Object.keys(GENDER_LABELS) as Gender[]).map((g) => (
            <OptionRow
              key={g}
              name="gender"
              label={lang === "hi" ? GENDER_LABELS[g].hi : GENDER_LABELS[g].en}
              checked={profile.gender === g}
              onSelect={() => setField("gender", g)}
            />
          ))}
        </div>
      </fieldset>
      <p className="text-xs leading-5 text-muted-foreground">
        {lang === "hi"
          ? "ये उत्तर केवल श्रेणी-आधारित योजनाओं के मिलान के लिए उपयोग होते हैं।"
          : "These answers are used only for category-based scheme matching."}
      </p>
    </div>
  );
}

function StepSituations({ profile, setField, lang }: StepProps) {
  return (
    <div className="grid gap-6">
      <YesNo
        question={lang === "hi" ? "क्या परिवार के पास कृषि योग्य भूमि है?" : "Does your family own farmland?"}
        value={profile.ownsLand}
        onChange={(v) => setField("ownsLand", v)}
        lang={lang}
      />
      <YesNo
        question={lang === "hi" ? "क्या कोई सदस्य दिव्यांगता प्रमाणपत्र धारक है?" : "Does any member hold a disability certificate?"}
        value={profile.hasDisability}
        onChange={(v) => setField("hasDisability", v)}
        lang={lang}
      />
      <YesNo
        question={lang === "hi" ? "क्या परिवार में 10 वर्ष से कम आयु की बेटी है?" : "Is there a girl child under 10 in the family?"}
        value={profile.hasGirlChildUnder10}
        onChange={(v) => setField("hasGirlChildUnder10", v)}
        lang={lang}
      />
      <YesNo
        question={lang === "hi" ? "क्या कोई महिला सदस्य गर्भवती या नई माँ है?" : "Is any woman in the family pregnant or a new mother?"}
        value={profile.pregnantOrNewMother}
        onChange={(v) => setField("pregnantOrNewMother", v)}
        lang={lang}
      />
    </div>
  );
}

function ReviewStep({
  profile,
  lang,
  onEdit,
  editLabel,
  skippedLabel,
}: {
  profile: Profile;
  lang: Lang;
  onEdit: (step: number) => void;
  editLabel: string;
  skippedLabel: string;
}) {
  const val = <T extends string | null>(v: T): string | null =>
    v === null ? null : v;

  const rows: Array<{ label: string; value: string | null; step: number }> = [
    {
      label: lang === "hi" ? "राज्य / क्षेत्र" : "State / area",
      value: [
        profile.state,
        profile.residence
          ? lang === "hi"
            ? RESIDENCE_LABELS[profile.residence].hi
            : RESIDENCE_LABELS[profile.residence].en
          : null,
      ]
        .filter(Boolean)
        .join(" · ") || null,
      step: 0,
    },
    {
      label: lang === "hi" ? "आयु समूह" : "Age group",
      value: profile.ageGroup
        ? lang === "hi"
          ? AGE_LABELS[profile.ageGroup].hi
          : AGE_LABELS[profile.ageGroup].en
        : null,
      step: 1,
    },
    {
      label: lang === "hi" ? "व्यवसाय" : "Occupation",
      value: profile.occupation
        ? lang === "hi"
          ? OCCUPATION_LABELS[profile.occupation].hi
          : OCCUPATION_LABELS[profile.occupation].en
        : null,
      step: 2,
    },
    {
      label: lang === "hi" ? "परिवार की आय" : "Household income",
      value: profile.income
        ? lang === "hi"
          ? INCOME_LABELS[profile.income].hi
          : INCOME_LABELS[profile.income].en
        : null,
      step: 3,
    },
    {
      label: lang === "hi" ? "शिक्षा" : "Education",
      value: profile.education
        ? lang === "hi"
          ? EDUCATION_LABELS[profile.education].hi
          : EDUCATION_LABELS[profile.education].en
        : null,
      step: 4,
    },
    {
      label: lang === "hi" ? "परिवार की स्थिति" : "Household status",
      value: profile.householdType
        ? lang === "hi"
          ? HOUSEHOLD_LABELS[profile.householdType].hi
          : HOUSEHOLD_LABELS[profile.householdType].en
        : null,
      step: 5,
    },
    {
      label: lang === "hi" ? "श्रेणी / लिंग" : "Category / gender",
      value:
        [
          profile.category
            ? lang === "hi"
              ? CATEGORY_LABELS[profile.category].hi
              : CATEGORY_LABELS[profile.category].en
            : null,
          profile.gender
            ? lang === "hi"
              ? GENDER_LABELS[profile.gender].hi
              : GENDER_LABELS[profile.gender].en
            : null,
        ]
          .filter(Boolean)
          .join(" · ") || null,
      step: 6,
    },
    {
      label: lang === "hi" ? "परिस्थितियाँ" : "Circumstances",
      value:
        [
          profile.ownsLand === true
            ? lang === "hi"
              ? "कृषि भूमि: हाँ"
              : "Farmland: yes"
            : profile.ownsLand === false
              ? lang === "hi"
                ? "कृषि भूमि: नहीं"
                : "Farmland: no"
              : null,
          profile.hasDisability === true
            ? lang === "hi"
              ? "दिव्यांगता प्रमाणपत्र: हाँ"
              : "Disability certificate: yes"
            : profile.hasDisability === false
              ? lang === "hi"
                ? "दिव्यांगता प्रमाणपत्र: नहीं"
                : "Disability certificate: no"
              : null,
          profile.hasGirlChildUnder10 === true
            ? lang === "hi"
              ? "10 वर्ष से कम बेटी: हाँ"
              : "Girl under 10: yes"
            : profile.hasGirlChildUnder10 === false
              ? lang === "hi"
                ? "10 वर्ष से कम बेटी: नहीं"
                : "Girl under 10: no"
              : null,
          profile.pregnantOrNewMother === true
            ? lang === "hi"
              ? "गर्भवती/नई माँ: हाँ"
              : "Pregnant / new mother: yes"
            : profile.pregnantOrNewMother === false
              ? lang === "hi"
                ? "गर्भवती/नई माँ: नहीं"
                : "Pregnant / new mother: no"
              : null,
        ]
          .filter(Boolean)
          .join(" · ") || null,
      step: 7,
    },
  ];
  void val;

  return (
    <div>
      <div className="divide-y divide-border rounded-lg border border-border bg-card">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <p className="text-sm font-medium">{row.label}</p>
              <p className="text-sm text-muted-foreground">
                {row.value ?? skippedLabel}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onEdit(row.step)}>
              {editLabel}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Checker() {
  const { t, lang } = useI18n();
  const { profile, setField, resetProfile } = useProfile();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);


  const REQUIRED_BY_STEP: Record<number, string[]> = {
    1: ["ageGroup"],
    2: ["occupation"],
    3: ["income"],
  };

  interface StepDef {
    title: string;
    desc?: string;
    why?: string;
    optional?: boolean;
    optionalNote?: string;
    render: () => ReactNode;
    requiredFields?: string[];
  }

  const steps: StepDef[] = [
    {
      title: lang === "hi" ? "आप कहाँ रहते हैं?" : "Where do you live?",
      desc:
        lang === "hi"
          ? "क्षेत्र और राज्य आधारित योजनाओं के मिलान के लिए।"
          : "Used for schemes tied to rural/urban areas and state lists.",
      render: () => <StepState {...{ profile, setField, lang }} />,
    },
    {
      title: lang === "hi" ? "आपकी आयु समूह" : "Your age group",
      desc:
        lang === "hi"
          ? "कई योजनाओं में न्यूनतम/अधिकतम आयु होती है।"
          : "Many schemes have minimum or maximum age limits.",
      render: () => <StepAge {...{ profile, setField, lang }} />,
      requiredFields: ["ageGroup"],
    },
    {
      title: lang === "hi" ? "आपका मुख्य काम" : "Your main occupation",
      desc:
        lang === "hi"
          ? "योजनाएँ अक्सर किसी विशेष वर्ग — किसान, छात्र, कारीगर — के लिए होती हैं।"
          : "Schemes often target a specific group — farmers, students, artisans.",
      render: () => <StepWork {...{ profile, setField, lang }} />,
      requiredFields: ["occupation"],
    },
    {
      title: lang === "hi" ? "परिवार की सालाना आय" : "Annual household income",
      desc:
        lang === "hi"
          ? "सटीक राशि नहीं — सिर्फ़ अनुमानित श्रेणी चुनें।"
          : "You don't need exact figures — choose the closest bracket.",
      why:
        lang === "hi"
          ? "आय से तय होता है कि आप EWS/LIG/MIG जैसी श्रेणियों में आते हैं या नहीं।"
          : "Income helps determine whether you fall in slabs like EWS/LIG/MIG.",
      render: () => <StepIncome {...{ profile, setField, lang }} />,
      requiredFields: ["income"],
    },
    {
      title: lang === "hi" ? "सबसे बड़ी शिक्षा" : "Highest education",
      desc:
        lang === "hi"
          ? "शिक्षा-आधारित योजनाओं के लिए।"
          : "Used for education-linked schemes.",
      optional: true,
      render: () => <StepEducation {...{ profile, setField, lang }} />,
    },
    {
      title: lang === "hi" ? "परिवार की स्थिति" : "Household status",
      desc:
        lang === "hi"
          ? "बीपीएल/राशन कार्ड की स्थिति कई कल्याण योजनाओं के लिए ज़रूरी है।"
          : "BPL/ration-card status matters for many welfare schemes.",
      render: () => <StepHousehold {...{ profile, setField, lang }} />,
    },
    {
      title: lang === "hi" ? "श्रेणी और लिंग" : "Category and gender",
      desc:
        lang === "hi"
          ? "कुछ योजनाएँ केवल विशेष श्रेणी या लिंग के लिए हैं।"
          : "Some schemes are only for specific categories or genders.",
      render: () => <StepCategoryGender {...{ profile, setField, lang }} />,
    },
    {
      title: lang === "hi" ? "आपकी परिस्थितियाँ" : "Your circumstances",
      desc:
        lang === "hi"
          ? "कुछ योजनाएँ विशेष स्थितियों पर आधारित हैं।"
          : "Some schemes target specific situations.",
      optional: true,
      render: () => <StepSituations {...{ profile, setField, lang }} />,
    },
    {
      title: lang === "hi" ? "उत्तर जाँचें" : "Review answers",
      desc:
        lang === "hi"
          ? "कुछ भी बदलना हो तो 'बदलें' दबाएँ।"
          : "Change anything with the edit buttons before seeing results.",
      render: () => (
        <ReviewStep
          profile={profile}
          lang={lang}
          onEdit={(s) => setStep(s)}
          editLabel={t("check.edit")}
          skippedLabel={lang === "hi" ? "— छोड़ा गया —" : "— skipped —"}
        />
      ),
    },
  ];

  const total = steps.length;
  const isReview = step === total - 1;
  const currentStep = steps[step];
  const requiredFields = currentStep?.requiredFields ?? [];
  const missingValues = requiredFields.filter((k) => {
    const v = (profile as unknown as Record<string, unknown>)[k];
    return v === null || v === undefined || v === "";
  });
  const canContinue = missingValues.length === 0;

  function handleContinue() {
    if (!canContinue) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    if (isReview) {
      navigate("/results");
      return;
    }
    setStep((s) => Math.min(s + 1, total - 1));
  }

  function handleBack() {
    setShowErrors(false);
    setStep((s) => Math.max(0, s - 1));
  }

  const handleReset = () => {
    resetProfile();
    setStep(0);
    setShowErrors(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container-app py-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight">{t("check.title")}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("check.step")} {step + 1} {t("check.of")} {total}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="mr-2 size-4" aria-hidden="true" />
                {lang === "hi" ? "शुरू से" : "Start over"}
              </Button>
            </div>
            <div
              className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={step + 1}
              aria-label="Questionnaire progress"
            >
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t("check.privacy")}</p>
          </div>
        </section>

        <section className="container-app py-8">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <h2 className="text-lg font-bold">{currentStep?.title}</h2>
              {currentStep?.desc && (
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {currentStep.desc}
                </p>
              )}

              <div className="mt-6">{currentStep?.render()}</div>

              {currentStep?.why && (
                <p className="mt-6 flex gap-2 rounded-md border border-gold/60 bg-gold/10 p-3 text-xs leading-5 text-gold-foreground">
                  <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">{t("check.why")}: </strong>
                    {currentStep.why}
                  </span>
                </p>
              )}
              {currentStep?.optional && (
                <p className="mt-4 text-xs text-muted-foreground">
                  {t("check.optional")}.{" "}
                  {currentStep.optionalNote ?? t("check.skippedNote")}
                </p>
              )}
              {showErrors && !canContinue && (
                <p className="mt-4 text-sm font-medium text-destructive" role="alert">
                  {lang === "hi"
                    ? "कृपया आवश्यक उत्तर चुनें।"
                    : "Please choose an answer to continue."}
                </p>
              )}

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-5">
                <Button variant="outline" onClick={handleBack} disabled={step === 0}>
                  <ChevronLeft className="mr-1 size-4" aria-hidden="true" />
                  {t("check.back")}
                </Button>
                <Button onClick={handleContinue}>
                  {isReview ? t("check.review") : t("check.continue")}
                  {!isReview && <ChevronRight className="ml-1 size-4" aria-hidden="true" />}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
