import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/lib/supabase";

interface SavedCtx {
  savedIds: string[];
  isLoading: boolean;
  isSaved: (id: string) => boolean;
  toggleSave: (id: string) => boolean;
  removeSaved: (id: string) => void;
  clearAll: () => void;
}

const Ctx = createContext<SavedCtx | null>(null);
const LS_KEY = "jansahay.saved";

function load(): string[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? [...new Set(parsed.filter((id): id is string => typeof id === "string"))] : [];
  } catch (error) {
    console.error("Could not read local saved schemes:", error);
    return [];
  }
}

function persist(ids: string[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Could not save schemes in this browser:", error);
    toast.error("Could not save schemes in this browser.");
  }
}

export function SavedProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const key = authLoading ? "session-loading" : user?.id ?? "guest";
  return (
    <SavedStateProvider key={key} user={user} authLoading={authLoading}>
      {children}
    </SavedStateProvider>
  );
}

function SavedStateProvider({
  children,
  user,
  authLoading,
}: {
  children: ReactNode;
  user: ReturnType<typeof useAuth>["user"];
  authLoading: boolean;
}) {
  const [savedIds, setSavedIds] = useState<string[]>(() => user ? [] : load());
  const [isLoading, setIsLoading] = useState(Boolean(user));
  const userId = user?.id;

  useEffect(() => {
    if (authLoading || !userId) return;

    let active = true;

    void (async () => {
      const { data, error } = await supabase
        .from("saved_schemes")
        .select("scheme_id")
        .eq("user_id", userId);
      if (!active) return;
      if (error) throw error;

      const remoteIds = (data ?? []).map((row) => row.scheme_id);
      const guestIds = load();
      const mergedIds = [...new Set([...remoteIds, ...guestIds])];
      const guestOnlyIds = mergedIds.filter((id) => !remoteIds.includes(id));

      if (guestOnlyIds.length > 0) {
        const { error: saveError } = await supabase.from("saved_schemes").upsert(
          guestOnlyIds.map((scheme_id) => ({ user_id: userId, scheme_id })),
          { onConflict: "user_id,scheme_id" },
        );
        if (!active) return;
        if (saveError) throw saveError;
      }

      localStorage.removeItem(LS_KEY);
      setSavedIds(mergedIds);
    })().catch((error: unknown) => {
      if (!active) return;
      const message = error instanceof Error ? error.message : "Unknown Supabase error";
      console.error("Could not sync saved schemes:", message);
      toast.error(`Could not load saved schemes from Supabase: ${message}`);
    }).finally(() => {
      if (active) setIsLoading(false);
    });

    return () => {
      active = false;
    };
  }, [authLoading, userId]);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  const toggleSave = useCallback((id: string): boolean => {
    const nowSaved = !savedIds.includes(id);
    const next = nowSaved ? [...savedIds, id] : savedIds.filter((savedId) => savedId !== id);
    setSavedIds(next);

    if (!user) {
      persist(next);
    } else if (nowSaved) {
      void supabase.from("saved_schemes").upsert(
        { user_id: user.id, scheme_id: id },
        { onConflict: "user_id,scheme_id" },
      ).then(({ error }) => {
        if (error) {
          console.error("Could not save scheme:", error.message);
          toast.error(`Could not save this scheme: ${error.message}`);
          setSavedIds((current) => current.filter((savedId) => savedId !== id));
        }
      });
    } else {
      void supabase.from("saved_schemes").delete().eq("user_id", user.id).eq("scheme_id", id)
        .then(({ error }) => {
          if (error) {
            console.error("Could not remove saved scheme:", error.message);
            toast.error(`Could not remove this saved scheme: ${error.message}`);
            setSavedIds((current) => current.includes(id) ? current : [...current, id]);
          }
        });
    }
    return nowSaved;
  }, [savedIds, user]);

  const removeSaved = useCallback((id: string) => {
    const next = savedIds.filter((savedId) => savedId !== id);
    setSavedIds(next);
    if (!user) {
      persist(next);
      return;
    }

    void supabase.from("saved_schemes").delete().eq("user_id", user.id).eq("scheme_id", id)
      .then(({ error }) => {
        if (error) {
          console.error("Could not remove saved scheme:", error.message);
          toast.error(`Could not remove this saved scheme: ${error.message}`);
          setSavedIds((current) => current.includes(id) ? current : [...current, id]);
        }
      });
  }, [savedIds, user]);

  const clearAll = useCallback(() => {
    setSavedIds([]);
    if (!user) {
      try {
        localStorage.removeItem(LS_KEY);
      } catch (error) {
        console.error("Could not clear locally saved schemes:", error);
        toast.error("Could not clear schemes saved in this browser.");
      }
      return;
    }

    void supabase.from("saved_schemes").delete().eq("user_id", user.id)
      .then(({ error }) => {
        if (error) {
          console.error("Could not clear saved schemes:", error.message);
          toast.error(`Could not clear saved schemes: ${error.message}`);
          void supabase.from("saved_schemes").select("scheme_id").eq("user_id", user.id)
            .then(({ data, error: refreshError }) => {
              if (refreshError) {
                console.error("Could not refresh saved schemes:", refreshError.message);
                return;
              }
              setSavedIds((data ?? []).map((row) => row.scheme_id));
            });
        }
      });
  }, [user]);

  const value = useMemo(
    () => ({ savedIds, isLoading, isSaved, toggleSave, removeSaved, clearAll }),
    [savedIds, isLoading, isSaved, toggleSave, removeSaved, clearAll],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSaved(): SavedCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSaved must be used inside SavedProvider");
  return ctx;
}
