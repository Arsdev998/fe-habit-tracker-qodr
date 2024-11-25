import React from "react";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarApp />
        <section className="w-full p-2">
          <Header />
          <main className="p-2 dark:bg-[#0F0E0E] md:min-h-[500px] xl:min-h-[620px]">
            {children}
          </main>
        </section>
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </>
  );
}

export default layout;
