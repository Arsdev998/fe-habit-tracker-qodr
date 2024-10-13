import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import FaidahSidebar from "../components/layout/FaidahSidebar";
import FaidahSide from "../components/dashboard/FaidahSide";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="flex w-full">
        <Sidebar>{children}</Sidebar>
      </section>
    </>
  );
}

export default layout;
