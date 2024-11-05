import React from "react";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarApp from "../components/layout/Sidebar";
import { ButtonSidebarTrigger } from "../components/dashboard/action/ButtonSidebarTrigger";
import Header from "../components/layout/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarApp />
        <section className="w-full">
          <Header />
          <main>{children}</main>
        </section>
        <Toaster position="top-center" richColors />
      </SidebarProvider>
    </>
  );
}

export default layout;
