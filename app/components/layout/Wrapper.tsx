"use client";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { useEffect, useState } from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
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
      enableSystem={false} 
    >
      {children}
    </ThemeProvider>
  );
}
