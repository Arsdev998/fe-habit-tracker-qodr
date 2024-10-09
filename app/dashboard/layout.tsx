import FaidahSidebar from "../components/layout/FaidahSidebar";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="">
      <Header />
      <div className="flex  justify-between">
        <Sidebar>
          <main>{children}</main>
        </Sidebar>
        <FaidahSidebar/>
      </div>
    </section>
  );
}
