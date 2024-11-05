import React from "react";
import Header from "../components/layout/Header";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarApp from "../components/layout/Sidebar";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Header />
      <SidebarProvider>
        <SidebarApp/>
        <section className="p-2">
           <SidebarTrigger/>
            {children}
        </section>
        <Toaster position="top-center" richColors />
      </SidebarProvider>
    </>
  );
}

export default layout;
