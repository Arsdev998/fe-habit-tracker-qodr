"use client";
import { useAppSelector } from "@/app/lib/redux/hook";
import EvaluationForm from "./EvaluationForm";

const EvaluationPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="px-7 py-1">
      <div className="text-center mb-5">
        <h1 className="font-bold text-2xl">Evaluasi</h1>
        <p className="text-lg">
          Tuliskan kritik dan saran antum untuk kebaikan bersama{" "}
        </p>
      </div>
      <div className="flex items-center justify-around  py-2">
        <div className="">
          <h2 className="text-xl font-bold">Evaluasi Internal</h2>
          <EvaluationForm
            desc="Gunakan Form Ini untuk memberikan kritik dan saran kepada kami
              agar bisa membuat PPTI QODR lebih baik untuk kedepannya"
            type="internal"
            classButton="bg-[#D62202] hover:bg-red-600 dark:text-white"
          />
        </div>
        <hr className="max-w-[1000px]" />
        <div className="text-xl font-bold">
          <h3>Evaluasi Umum</h3>
          <EvaluationForm
            desc="Gunakan Form Ini untuk menyampaikan sesuatu kepada penghuni pondok secara umum. Setiap santri hanya bisa melakukan pengumuman maximal 3x dalam sehari!"
            type="general"
            classButton="bg-[#D62202] hover:bg-red-600 dark:text-white"
            userId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
