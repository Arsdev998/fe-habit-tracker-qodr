"use client";

import { useGetAdminDashboardQuery } from "@/app/lib/redux/api/admindashboardApi";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CardAdminDashboard from "./CardAdminDashboard";
import { FaUser } from "react-icons/fa6";
import { FaBrain, FaQuran } from "react-icons/fa";
import { MdBrowserUpdated, MdCalendarMonth, MdUpdate } from "react-icons/md";
import { BiSolidBookOpen } from "react-icons/bi";
import HabitStatusTrafficChart from "./TraficHabitStatus";

const AdminDashboardPage = () => {
  const { data, isLoading } = useGetAdminDashboardQuery();

  if (isLoading)
    return <Skeleton className="min-h-[90vh] min-w-[900px] bg-[#303030]" />;
  return (
    <section className="p-4">
      <div className="mb-12">
        <h1 className="text-xl">
          Selamat Datang Di{" "}
          <span className="font-bold tracking-wider">Atmin Dashboard</span>
        </h1>
      </div>
      <div className="grid mx-auto grid-cols-4 gap-10 mb-5">
        <CardAdminDashboard
          count={data.userCount}
          icon={<FaUser />}
          desc="Jumlah Santri"
          href="/admindashboard/usercontroll"
        />
        <CardAdminDashboard
          count={data.habitCount}
          icon={<FaBrain />}
          desc="Jumlah Habit"
          href="/admindashboard/habitcontroll"
        />
        <CardAdminDashboard
          count={data.monthCount}
          icon={<MdCalendarMonth />}
          desc="Jumlah Bulan"
          href="/admindashboard/habitcontroll"
        />
        <CardAdminDashboard
          count={data.evaluationCount}
          icon={<MdBrowserUpdated />}
          desc="Evaluasi Masuk Hari Ini"
          href="/admindashboard/evaluasi"
        />
      </div>
      <HabitStatusTrafficChart />
    </section>
  );
};

export default AdminDashboardPage;
