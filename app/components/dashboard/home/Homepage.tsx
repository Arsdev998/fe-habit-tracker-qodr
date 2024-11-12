import JadwalSholat from "@/app/components/dashboard/home/JadwalSholat";
import HadistSection from "./HadistSection";

export default function HomePage() {
  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="container flex flex-row justify-around items-start">
        <div className="flex-grow">
          <HadistSection />
        </div>
        <div className=" w-[300px]">
          <JadwalSholat />
        </div>
      </div>
    </section>
  );
}
