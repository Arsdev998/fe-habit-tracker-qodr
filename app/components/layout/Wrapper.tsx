"use client";

import { useTheme } from "next-themes";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <main className={`p-2 ${theme === "dark" ? "bg-[#0F0E0E]" : ""}`}>
      {children}
    </main>
  );
}
