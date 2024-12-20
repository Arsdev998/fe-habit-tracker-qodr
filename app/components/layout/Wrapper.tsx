"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { useEffect, useState } from "react";

export default function ThemeWrapperProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      themes={["light", "dark", "system"]}
    >
      {children}
    </ThemeProvider>
  );
}
