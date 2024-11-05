import React from "react";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "../components/layout/Sidebar";
import ButtonSidebarTrigger from "../components/dashboard/action/ButtonSidebarTrigger";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarApp/>
        <section className="p-2">
           <ButtonSidebarTrigger/>
            {children}
        </section>
        <Toaster position="top-center" richColors />
      </SidebarProvider>
    </>
  );
}

export default layout;
