"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type RecruiterSession = {
  company: string;
  focus: string;
  summary: string;
  summarySource: "openai" | "fallback" | null;
};

type RecruiterContextValue = {
  session: RecruiterSession;
  hydrated: boolean;
  update: (patch: Partial<RecruiterSession>) => void;
  reset: () => void;
};

const EMPTY_SESSION: RecruiterSession = {
  company: "",
  focus: "",
  summary: "",
  summarySource: null,
};

const STORAGE_KEY = "portfolio-recruiter-session";

const RecruiterContext = createContext<RecruiterContextValue | undefined>(
  undefined,
);

export function RecruiterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<RecruiterSession>(EMPTY_SESSION);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSession({ ...EMPTY_SESSION, ...JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [session, hydrated]);

  const update = useCallback((patch: Partial<RecruiterSession>) => {
    setSession((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setSession(EMPTY_SESSION);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(
    () => ({ session, hydrated, update, reset }),
    [session, hydrated, update, reset],
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
