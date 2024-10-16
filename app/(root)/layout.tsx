import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Toaster } from "sonner";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="flex w-full">
        <Sidebar>{children}</Sidebar>
      </section>
      <Toaster position="top-center" richColors/>
    </>
  );
}

export default layout;
