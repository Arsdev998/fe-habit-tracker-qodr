import React from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import FaidahSidebar from "../components/layout/FaidahSidebar";
import FaidahSide from "../components/dashboard/FaidahSide";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <section className="flex justify-between">
        <Sidebar>{children}</Sidebar>
        <FaidahSidebar>
          <FaidahSide />
        </FaidahSidebar>
      </section>
    </>
  );
}

export default layout;
