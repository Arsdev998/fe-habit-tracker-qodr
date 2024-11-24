import { useGetAyatRandomQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import React from "react";

const AyatSection = () => {
  const { data, isLoading } = useGetAyatRandomQuery();
  const {theme} = useTheme()

  if (isLoading || !data) {
    return (
      <div className="rounded-md w-full h-full flex justify-center items-center">
        <Skeleton className="bg-black/20 w-full h-[400px] rounded-md" />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] rounded-md overflow-y-auto">
      <div className={`${theme === "dark" ? "bg-[#303030]" : ""} p-6 `}>
        {/* Informasi Surah */}
        <div>
          <h2 className="text-xl font-semibold mb-1">
            {data.data.info.surat.nama.id}
          </h2>
          <h3 className="text-lg font-semibold dark:text-gray-300">
            {data.data.info.surat.nama.ar}
          </h3>
        </div>

        {/* Ayat Arab */}
        <div className="text-right">
          <p className="text-3xl font-bold leading-relaxed mb-4">
            {data.data.ayat.arab}
          </p>
        </div>

        {/* Terjemahan Ayat */}
        <div>
          <p className="text-base italic dark:text-gray-300">
            {data.data.ayat.text}
          </p>
        </div>

        {/* Detail Ayat */}
        <div className="text-sm dark:text-gray-400">
          <p>Ayat: {data.data.ayat.ayah}</p>
          <p>Surah ke: {data.data.ayat.surah}</p>
        </div>

        {/* Audio Ayat */}
        <div className="mt-4">
          <audio controls className="w-full">
            <source src={data.data.ayat.audio} type="audio/mpeg" />
            Browser Anda tidak mendukung audio.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default AyatSection;
