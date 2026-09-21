"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type RecruiterContextValue = {
  company: string;
  focus: string;
  hydrated: boolean;
  update: (patch: Partial<{ company: string; focus: string }>) => void;
  reset: () => void;
};

const STORAGE_KEY = "portfolio-recruiter-context";

const RecruiterContext = createContext<RecruiterContextValue | undefined>(
  undefined,
);

export function RecruiterProvider({ children }: { children: React.ReactNode }) {
  const [company, setCompany] = useState("");
  const [focus, setFocus] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCompany(parsed.company || "");
        setFocus(parsed.focus || "");
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ company, focus }));
  }, [company, focus, hydrated]);

  const update = useCallback(
    (patch: Partial<{ company: string; focus: string }>) => {
      if (patch.company !== undefined) setCompany(patch.company);
      if (patch.focus !== undefined) setFocus(patch.focus);
    },
    [],
  );

  const reset = useCallback(() => {
    setCompany("");
    setFocus("");
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ company, focus, hydrated, update, reset }),
    [company, focus, hydrated, update, reset],
  );

  return (
    <RecruiterContext.Provider value={value}>
      {children}
    </RecruiterContext.Provider>
  );
}

export function useRecruiter(): RecruiterContextValue {
  const ctx = useContext(RecruiterContext);
  if (!ctx)
    throw new Error("useRecruiter must be used within a RecruiterProvider");
  return ctx;
}
