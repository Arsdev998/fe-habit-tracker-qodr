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
      <div className="flex flex-col md:flex-row md:justify-center md:gap-x-10">
        <div className="text-xl font-bold">
          <h2>Evaluasi Internal</h2>
          <EvaluationForm
            desc="Gunakan Form Ini untuk memberikan kritik dan saran kepada kami
              agar bisa membuat PPTI QODR lebih baik untuk kedepannya, Ini Bersifat Anonymous."
            type="internal"
            classButton="bg-[#D62202] hover:bg-red-600 dark:text-white"
          />
        </div>
        <div className="text-xl font-bold border-t-2 md:border-none mt-2 md:mt-0">
          <h3>Evaluasi Umum</h3>
          <EvaluationForm
            desc="Gunakan Form Ini untuk menyampaikan sesuatu kepada penghuni pondok secara umum. Setiap santri hanya bisa melakukan pengumuman maximal 1x dalam sehari!"
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
