"use client";
import JadwalSholat from "@/app/components/dashboard/home/JadwalSholat";
import HadistSection from "./HadistSection";
import { useAppSelector } from "@/app/lib/redux/hook";

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <section className="p-4 sm:p-6 bg-slate-100 min-h-screen">
      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">
          Ahlan Wasahlan, Akhi <span className="font-bold">{user?.name}</span>
        </h1>
        <p className="text-lg text-gray-600">
          Semoga Antum selalu dalam perlindungan Allah
        </p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div className="flex-1 max-w-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Random Hadist
          </h2>
          <HadistSection />
        </div>
        <div className="flex-1 max-w-sm">
          <JadwalSholat />
        </div>
      </div>
    </section>
  );
}
