"use client";

import JadwalSholat from "@/app/components/dashboard/home/JadwalSholat";
import HadistSection from "./HadistSection";
import { useAppSelector } from "@/app/lib/redux/hook";
import { useGetRandomFotoQuery } from "@/app/lib/redux/api/unsplashApi";

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: unsplashFoto } = useGetRandomFotoQuery();
  const backgroundStyle = unsplashFoto
    ? { backgroundImage: `url(${unsplashFoto.urls.full})` }
    : {};
  return (
    <section style={backgroundStyle} className="md:min-h-[100vh] xl:min-h-[91.3vh]">
      <div className="p-2 sm:p-3 bg-zinc-800/10">
        <div className="mb-3 text-center sm:text-left bg-black bg-opacity-60  p-2 rounded-md text-white">
          <h1 className="text-2xl font-semibold ">
            Ahlan Wasahlan, Akhi <span className="font-bold">{user?.fullname}</span>
          </h1>
          <p className="text-lg italic">
            Semoga Antum selalu dalam perlindungan Allah
          </p>
        </div>
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:justify-between">
          <HadistSection unsplashFoto={unsplashFoto} />
          <JadwalSholat unsplashFoto={unsplashFoto} />
        </div>
      </div>
    </section>
  );
}
