"use client";

import { useEffect } from "react";

export default function ScriptedBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const imageUrl = sessionStorage.getItem("recruiterBackground");
    if (imageUrl) {
      document.documentElement.style.setProperty(
        "--recruiter-bg-url",
        `url(${imageUrl})`
      );
    }
  }, []);

  return <>{children}</>;
}