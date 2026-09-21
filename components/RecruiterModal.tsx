"use client";

import { useState, useEffect } from "react";
import { useRecruiter } from "@/context/RecruiterContext";
import { applyTheme } from "@/lib/applyTheme";

export default function RecruiterModal() {
  const { setRecruiterInfo } = useRecruiter();
  const [isOpen, setIsOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [style, setStyle] = useState("");

  // Show the modal on first load
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      setIsOpen(true);
    }
    const bg = sessionStorage.getItem("recruiterBackground");
    if (bg) {
      document.body.style.backgroundImage = `url(${bg})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
    }
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecruiterInfo({ company, style });
    sessionStorage.setItem("hasVisited", "true");
    sessionStorage.setItem("recruiterContext", JSON.stringify({ company, style }));

    const themeResponse = await fetch("/api/theme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, style }),
    });

    const themeData = await themeResponse.json();

    if (themeData.theme) {
      sessionStorage.setItem("recruiterTheme", JSON.stringify(themeData.theme));
    } else {
      console.warn("No theme returned from API.");
    }
    console.log("Theme data:", themeData);
    applyTheme(themeData.theme);

    // const imageGenResponse = await fetch("/api/generate-background", {
    //   method: "POST",
    //   body: JSON.stringify({ company: company, style: style }),
    // });

    // const { imageUrl } = await imageGenResponse.json();
    // sessionStorage.setItem("recruiterBackground", imageUrl);
    setIsOpen(false);
  };

  // Close without submitting
  const handleSkip = () => {
    sessionStorage.setItem("hasVisited", "true");
    setIsOpen(false);
  };

  // Don't render anything if not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Welcome Recruiter!</h2>
        <p className="mb-4 text-sm ">
          Optional: Let us know what company you&apos;re recruiting for and what style you want to see!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              placeholder="e.g., Google"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Style (optional)
            </label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black sm:text-sm"
              placeholder="e.g., Sleek, Modern, Bold"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={handleSkip}
              className="text-sm hover:underline"
            >
              Skip
            </button>
            <button
              type="submit"
              className="bg-black py-2 px-4 rounded-md text-sm hover:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}