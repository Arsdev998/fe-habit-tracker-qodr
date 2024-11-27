import EvaluationForm from "./EvaluationForm";

const EvaluationPage = () => {
  return (
    <div className="px-7 py-1">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Evaluasi</h1>
        <p className="text-lg">
          Tuliskan kritik dan saran antum untuk kebaikan bersama{" "}
        </p>
      </div>
      <div className="space-y-5">
        <div className="">
          <h2 className="text-xl font-bold">Evaluasi Internal</h2>
          <EvaluationForm
            desc="Gunakan Form Ini untuk memberikan kritik dan saran kepada kami
              agar bisa membuat PPTI QODR lebih baik untuk kedepannya"
            type=""
            classButton="bg-green-500 hover:bg-green-600 dark:text-white"
          />
        </div>
        <hr className="max-w-[1000px]"/>
        <div className="text-xl font-bold">
          <h3>Evaluasi Umum</h3>
          <EvaluationForm
            desc="Gunakan Form Ini untuk menyampaikan sesuatu kepada penghuni pondok secara umum. Setiap santri hanya bisa melakukan pengumuman maximal 3x dalam sehari!"
            type=""
            classButton="bg-red-500 hover:bg-red-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default EvaluationPage;
