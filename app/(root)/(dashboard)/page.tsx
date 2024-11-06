import JadwalSholat from "@/app/components/dashboard/home/JadwalSholat";

export default function Page() {
  return (
    <section className="">
      <div className="flex flex-row justify-between">
        <div className="h-[5000px] overflow-y-auto">scroll area</div>
        <div className="fixed right-2">
          <JadwalSholat />
        </div>
      </div>
    </section>
  );
}
