import React from "react";
import { Toaster } from "sonner";
import { SidebarProvider} from "@/components/ui/sidebar";
import SidebarApp from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <SidebarApp />
        <section className="w-full">
          <Header />
          <main className="">{children}</main>
        </section>
        <Toaster position="top-right" richColors />
      </SidebarProvider>
    </>
  );
}

export default layout;
