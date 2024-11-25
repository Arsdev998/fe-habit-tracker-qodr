"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
      enableColorScheme
    >
      {children}
    </ThemeProvider>
  );
}
