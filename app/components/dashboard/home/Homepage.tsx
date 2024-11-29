"use client";

import JadwalSholat from "@/app/components/dashboard/home/JadwalSholat";
import HadistSection from "./HadistSection";
import { useAppSelector } from "@/app/lib/redux/hook";
import { useGetRandomFotoQuery } from "@/app/lib/redux/api/unsplashApi";
import BannerWelcome from "./BannerWelcome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AyatSection from "./AyatSection";

export default function HomePage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data: unsplashFoto } = useGetRandomFotoQuery();
  const backgroundStyle = unsplashFoto
    ? { backgroundImage: `url(${unsplashFoto.urls.full})` }
    : {};
  return (
    <section className="flex flex-col gap-y-5 items-center rounded-md">
      <BannerWelcome name={user?.fullname} bannerImg={backgroundStyle} />
      <JadwalSholat unsplashFoto={unsplashFoto} />
      <div className="flex justify-center w-[370px] min-h-[400px] md:w-[800px] md:h-[500px] lg:w-[1000px]">
        <Tabs className="w-full" defaultValue="ayat">
          <TabsList className="flex p-0 bg-transparent mx-auto md:w-[400px] mb-0">
            <TabsTrigger value="ayat" className="w-full">Ayat Hari Ini</TabsTrigger>
            <TabsTrigger value="hadist" className="w-full">Hadist Hari Ini</TabsTrigger>
          </TabsList>
          <TabsContent value="ayat" className="mt-0">
            <AyatSection />
          </TabsContent>
          <TabsContent value="hadist" className="mt-0">
            <HadistSection />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
