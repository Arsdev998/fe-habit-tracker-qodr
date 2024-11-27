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
    <section className="">
      <div className="mb-5">
        <h1 className="font-bold text-xl">Selamat Datang Di AdminDashboard</h1>
      </div>
      <div className="grid mx-auto grid-cols-4 gap-10">
        <CardAdminDashboard
          count={data.userCount}
          icon={<FaUser />}
          desc="Jumlah Santri"
        />
        <CardAdminDashboard
          count={data.habitCount}
          icon={<FaBrain />}
          desc="Jumlah Habit"
        />
        <CardAdminDashboard
          count={data.monthCount}
          icon={<MdCalendarMonth />}
          desc="Jumlah Bulan"
        />
        <CardAdminDashboard
          count={data.evaluationCount}
          icon={<MdBrowserUpdated />}
          desc="Evaluasi Masuk Hari Ini"
        />
        <CardAdminDashboard
          count={data.murajaahCount}
          icon={<FaQuran />}
          desc="Murajaah Dibuat Hari Ini"
        />
        <CardAdminDashboard
          count={data.ziyadahCount}
          icon={<FaQuran />}
          desc="Ziyadah Dibuat Hari Ini"
        />
        <CardAdminDashboard
          count={data.tilawahCount}
          icon={<FaQuran />}
          desc="Tilawah Dibuat Hari Ini"
        />
        <CardAdminDashboard
          count={data.habitStatusCount}
          icon={<MdUpdate />}
          desc="Habit Di Check Hari Ini"
        />
      </div>
      <HabitStatusTrafficChart/>
    </section>
  );
};

export default AdminDashboardPage;
