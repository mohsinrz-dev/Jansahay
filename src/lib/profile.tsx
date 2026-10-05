import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/lib/supabase";

export const RESIDENCE = ["rural", "urban", "unsure"] as const;
export type Residence = (typeof RESIDENCE)[number];

export const AGE_GROUPS = ["below-18", "18-30", "31-45", "46-59", "60-79", "80+"] as const;
export type AgeGroup = (typeof AGE_GROUPS)[number];

export const INCOME_RANGES = ["under-1l", "1-2.5l", "2.5-6l", "6-9l", "9-18l", "above-18l"] as const;
export type IncomeRange = (typeof INCOME_RANGES)[number];

export const OCCUPATIONS = [
  "student",
  "farmer",
  "artisan",
  "small-business",
  "salaried",
  "daily-wage",
  "homemaker",
  "unemployed",
  "retired",
  "other",
] as const;
export type Occupation = (typeof OCCUPATIONS)[number];

export const EDUCATION_LEVELS = ["none", "up-to-10th", "10th-pass", "12th-pass", "graduate-plus"] as const;
export type EducationLevel = (typeof EDUCATION_LEVELS)[number];

export const HOUSEHOLDS = [
  "bpl",
  "low-income",
  "middle-income",
  "not-sure",
] as const;
export type HouseholdType = (typeof HOUSEHOLDS)[number];

export const CATEGORIES = ["general", "obc", "sc", "st"] as const;
export type Category = (typeof CATEGORIES)[number];

export const GENDERS = ["female", "male", "other"] as const;
export type Gender = (typeof GENDERS)[number];

export interface Profile {
  state: string | null;
  residence: Residence | null;
  ageGroup: AgeGroup | null;
  occupation: Occupation | null;
  income: IncomeRange | null;
  education: EducationLevel | null;
  householdType: HouseholdType | null;
  category: Category | null;
  gender: Gender | null;
  hasDisability: boolean | null;
  hasGirlChildUnder10: boolean | null;
  ownsLand: boolean | null;
  pregnantOrNewMother: boolean | null;
}

export const EMPTY_PROFILE: Profile = {
  state: null,
  residence: null,
  ageGroup: null,
  occupation: null,
  income: null,
  education: null,
  householdType: null,
  category: null,
  gender: null,
  hasDisability: null,
  hasGirlChildUnder10: null,
  ownsLand: null,
  pregnantOrNewMother: null,
};

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export const INCOME_LABELS: Record<IncomeRange, { en: string; hi: string }> = {
  "under-1l": { en: "Under ₹1 lakh", hi: "₹1 लाख से कम" },
  "1-2.5l": { en: "₹1 – 2.5 lakh", hi: "₹1 – 2.5 लाख" },
  "2.5-6l": { en: "₹2.5 – 6 lakh", hi: "₹2.5 – 6 लाख" },
  "6-9l": { en: "₹6 – 9 lakh", hi: "₹6 – 9 लाख" },
  "9-18l": { en: "₹9 – 18 lakh", hi: "₹9 – 18 लाख" },
  "above-18l": { en: "Above ₹18 lakh", hi: "₹18 लाख से अधिक" },
};

export const OCCUPATION_LABELS: Record<Occupation, { en: string; hi: string }> = {
  student: { en: "Student", hi: "छात्र/छात्रा" },
  farmer: { en: "Farmer / farm work", hi: "किसान / खेती" },
  artisan: { en: "Artisan / craftsperson", hi: "कारीगर / शिल्पकार" },
  "small-business": { en: "Small business owner", hi: "छोटा व्यापारी" },
  salaried: { en: "Salaried employee", hi: "नौकरीपेशा" },
  "daily-wage": { en: "Daily-wage / manual work", hi: "दिहाड़ी / श्रम" },
  homemaker: { en: "Homemaker", hi: "गृहिणी" },
  unemployed: { en: "Unemployed / seeking work", hi: "बेरोज़गार / काम खोज रहे" },
  retired: { en: "Retired", hi: "सेवानिवृत्त" },
  other: { en: "Other", hi: "अन्य" },
};

export const EDUCATION_LABELS: Record<EducationLevel, { en: string; hi: string }> = {
  none: { en: "No formal schooling", hi: "औपचारिक शिक्षा नहीं" },
  "up-to-10th": { en: "Studying / studied up to class 10", hi: "कक्षा 10 तक" },
  "10th-pass": { en: "Passed class 10", hi: "कक्षा 10 पास" },
  "12th-pass": { en: "Passed class 12", hi: "कक्षा 12 पास" },
  "graduate-plus": { en: "Graduate or higher", hi: "स्नातक या उच्चतर" },
};

export const HOUSEHOLD_LABELS: Record<HouseholdType, { en: string; hi: string }> = {
  bpl: { en: "BPL / ration card shows priority household", hi: "बीपीएल / राशन कार्ड प्राथमिकता" },
  "low-income": { en: "Low income, not on BPL list", hi: "कम आय, बीपीएल सूची में नहीं" },
  "middle-income": { en: "Middle income", hi: "मध्यम आय" },
  "not-sure": { en: "Not sure", hi: "पता नहीं" },
};

export const AGE_LABELS: Record<AgeGroup, { en: string; hi: string }> = {
  "below-18": { en: "Below 18 years", hi: "18 वर्ष से कम" },
  "18-30": { en: "18 – 30 years", hi: "18 – 30 वर्ष" },
  "31-45": { en: "31 – 45 years", hi: "31 – 45 वर्ष" },
  "46-59": { en: "46 – 59 years", hi: "46 – 59 वर्ष" },
  "60-79": { en: "60 – 79 years", hi: "60 – 79 वर्ष" },
  "80+": { en: "80 years or above", hi: "80 वर्ष या अधिक" },
};

export const RESIDENCE_LABELS: Record<Residence, { en: string; hi: string }> = {
  rural: { en: "Rural / village", hi: "ग्रामीण / गाँव" },
  urban: { en: "Urban / town or city", hi: "शहरी / कस्बा या नगर" },
  unsure: { en: "Not sure", hi: "पता नहीं" },
};

export const CATEGORY_LABELS: Record<Category, { en: string; hi: string }> = {
  general: { en: "General", hi: "सामान्य" },
  obc: { en: "OBC", hi: "अन्य पिछड़ा वर्ग (OBC)" },
  sc: { en: "Scheduled Caste (SC)", hi: "अनुसूचित जाति (SC)" },
  st: { en: "Scheduled Tribe (ST)", hi: "अनुसूचित जनजाति (ST)" },
};

export const GENDER_LABELS: Record<Gender, { en: string; hi: string }> = {
  female: { en: "Female", hi: "महिला" },
  male: { en: "Male", hi: "पुरुष" },
  other: { en: "Other", hi: "अन्य" },
};

interface ProfileCtx {
  profile: Profile;
  setField: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  resetProfile: () => void;
}

const Ctx = createContext<ProfileCtx | null>(null);
const STORAGE_KEY = "jansahay.profile";

function loadProfile(): Profile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_PROFILE };
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return { ...EMPTY_PROFILE, ...parsed };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isMember<const T extends readonly string[]>(
  value: unknown,
  options: T,
): value is T[number] {
  return typeof value === "string" && options.includes(value);
}

function normalizedProfile(value: unknown): Profile {
  if (!isRecord(value)) return { ...EMPTY_PROFILE };
  return {
    state: typeof value.state === "string" ? value.state : null,
    residence: isMember(value.residence, RESIDENCE) ? value.residence : null,
    ageGroup: isMember(value.ageGroup, AGE_GROUPS) ? value.ageGroup : null,
    occupation: isMember(value.occupation, OCCUPATIONS) ? value.occupation : null,
    income: isMember(value.income, INCOME_RANGES) ? value.income : null,
    education: isMember(value.education, EDUCATION_LEVELS) ? value.education : null,
    householdType: isMember(value.householdType, HOUSEHOLDS) ? value.householdType : null,
    category: isMember(value.category, CATEGORIES) ? value.category : null,
    gender: isMember(value.gender, GENDERS) ? value.gender : null,
    hasDisability: typeof value.hasDisability === "boolean" ? value.hasDisability : null,
    hasGirlChildUnder10: typeof value.hasGirlChildUnder10 === "boolean" ? value.hasGirlChildUnder10 : null,
    ownsLand: typeof value.ownsLand === "boolean" ? value.ownsLand : null,
    pregnantOrNewMother: typeof value.pregnantOrNewMother === "boolean" ? value.pregnantOrNewMother : null,
  };
}

function mergeProfiles(guest: Profile, account: Profile): Profile {
  return {
    state: account.state ?? guest.state,
    residence: account.residence ?? guest.residence,
    ageGroup: account.ageGroup ?? guest.ageGroup,
    occupation: account.occupation ?? guest.occupation,
    income: account.income ?? guest.income,
    education: account.education ?? guest.education,
    householdType: account.householdType ?? guest.householdType,
    category: account.category ?? guest.category,
    gender: account.gender ?? guest.gender,
    hasDisability: account.hasDisability ?? guest.hasDisability,
    hasGirlChildUnder10: account.hasGirlChildUnder10 ?? guest.hasGirlChildUnder10,
    ownsLand: account.ownsLand ?? guest.ownsLand,
    pregnantOrNewMother: account.pregnantOrNewMother ?? guest.pregnantOrNewMother,
  };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const key = authLoading ? "session-loading" : user?.id ?? "guest";
  return (
    <ProfileStateProvider key={key} user={user} authLoading={authLoading}>
      {children}
    </ProfileStateProvider>
  );
}

function ProfileStateProvider({
  children,
  user,
  authLoading,
}: {
  children: ReactNode;
  user: ReturnType<typeof useAuth>["user"];
  authLoading: boolean;
}) {
  const [profile, setProfile] = useState<Profile>(() =>
    user ? { ...EMPTY_PROFILE } : loadProfile(),
  );
  const [isSynced, setIsSynced] = useState(false);
  const userId = user?.id;
  const displayName = typeof user?.user_metadata.full_name === "string"
    ? user.user_metadata.full_name
    : "";

  useEffect(() => {
    if (authLoading || !userId) return;

    const guestProfile = loadProfile();
    let active = true;

    void (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("answers")
        .eq("user_id", userId)
        .maybeSingle();

      if (!active) return;
      if (error) throw error;

      const merged = mergeProfiles(guestProfile, normalizedProfile(data?.answers));

      const { error: saveError } = await supabase.from("profiles").upsert(
        { user_id: userId, display_name: displayName, answers: merged },
        { onConflict: "user_id" },
      );
      if (!active) return;
      if (saveError) throw saveError;

      localStorage.removeItem(STORAGE_KEY);
      setProfile(merged);
      setIsSynced(true);
    })().catch((error: unknown) => {
      if (!active) return;
      const message = error instanceof Error ? error.message : "Unknown Supabase error";
      console.error("Could not sync profile:", message);
      toast.error(`Could not load your profile from Supabase: ${message}`);
    });

    return () => {
      active = false;
    };
  }, [authLoading, displayName, userId]);

  const setField = useCallback(
    <K extends keyof Profile>(key: K, value: Profile[K]) => {
      setProfile((prev) => {
        const next = { ...prev, [key]: value };
        if (!userId) {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch (error) {
            toast.error("Could not save your profile in this browser.");
            console.error("Could not save local profile:", error);
          }
        }
        return next;
      });
    },
    [userId],
  );

  const resetProfile = useCallback(() => {
    setProfile({ ...EMPTY_PROFILE });
    if (!userId) {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        toast.error("Could not clear the profile saved in this browser.");
        console.error("Could not clear local profile:", error);
      }
    }
  }, [userId]);

  useEffect(() => {
    if (!userId || authLoading || !isSynced) return;
    const timer = window.setTimeout(() => {
      void supabase.from("profiles").upsert(
        {
          user_id: userId,
          display_name: displayName,
          answers: profile,
        },
        { onConflict: "user_id" },
      ).then(({ error }) => {
        if (error) {
          console.error("Could not save profile:", error.message);
          toast.error(`Could not save your profile: ${error.message}`);
        }
      });
    }, 400);
    return () => window.clearTimeout(timer);
  }, [authLoading, displayName, isSynced, profile, userId]);

  const value = useMemo(
    () => ({ profile, setField, resetProfile }),
    [profile, setField, resetProfile],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProfile(): ProfileCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}
