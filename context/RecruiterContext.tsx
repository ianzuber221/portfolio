'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type RecruiterInfo = {
  company: string;
  style: string;
};

type RecruiterContextType = {
  recruiterInfo: RecruiterInfo | null;
  setRecruiterInfo: (info: RecruiterInfo) => void;
};

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export const RecruiterProvider = ({ children }: { children: ReactNode }) => {
  const [recruiterInfo, setRecruiterInfo] = useState<RecruiterInfo | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("recruiterContext");
    if (stored) {
      setRecruiterInfo(JSON.parse(stored));
    }
    const themeStored = sessionStorage.getItem("recruiterTheme");
    if(themeStored) {
      const theme = JSON.parse(themeStored);
      if (theme) {
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
        document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', theme.textColor);
      }
    }
  }, []);

  return (
    <RecruiterContext.Provider value={{ recruiterInfo, setRecruiterInfo }}>
      {children}
    </RecruiterContext.Provider>
  );
};

export const useRecruiter = () => {
  const context = useContext(RecruiterContext);
  if (!context) throw new Error('useRecruiter must be used within a RecruiterProvider');
  return context;
};