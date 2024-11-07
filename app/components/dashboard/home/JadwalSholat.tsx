"use client";
import { useGetDateHijriahQuery, useGetJadwalSholatQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";
import { IoLocation } from "react-icons/io5";
import { ImSpinner3 } from "react-icons/im";
import { useGetRandomFotoQuery } from "@/app/lib/redux/api/unsplashApi";
import { FaCalendarAlt } from "react-icons/fa";

function JadwalSholat() {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let currentDate = `${year}-${month}-${day}`;
  let bantulCityId = "1501";

  const { data: unsplashFoto } = useGetRandomFotoQuery();
  const { data, isLoading } = useGetJadwalSholatQuery({
    cityId: bantulCityId,
    dateToday: currentDate,
  });
  const {data:hijriahDate} = useGetDateHijriahQuery()
  const hijriah = hijriahDate?.data.date
  const formattedDate = hijriah ? hijriah.join(", ") : "";

  if (isLoading || !data) {
    return (
      <div className="relative">
        <Skeleton className="bg-green-300 w-[350px] h-[400px]" />
        <p className="absolute flex items-center gap-2 top-[50%] left-[5%] font-bold text-sm">
          Memuat Jadwal Sholat <ImSpinner3 className="animate-spin text-lg" />
        </p>
      </div>
    );
  }

  const JadwalSholatData = [
    { label: "Subuh", time: data.data.jadwal.subuh },
    { label: "Dhuha", time: data.data.jadwal.dhuha },
    { label: "Dzuhur", time: data.data.jadwal.dzuhur },
    { label: "Ashar", time: data.data.jadwal.ashar },
    { label: "Maghrib", time: data.data.jadwal.maghrib },
    { label: "Isya", time: data.data.jadwal.isya },
  ];

  const backgroundStyle = unsplashFoto
    ? { backgroundImage: `url(${unsplashFoto.urls.regular})` }
    : {};

  return (
    <div
      className="flex flex-col p-5 border-2 shadow-md w-[350px] h-[400px] rounded-md bg-cover bg-center text-white"
      style={backgroundStyle}
    >
      <div className="bg-black bg-opacity-60 p-4 rounded mb-2">
        <p className="flex items-center gap-2 text-xs mb-1 ">
          <FaCalendarAlt /> {formattedDate}
        </p>
        <p className="flex items-center gap-2 text-xs mb-1">
          <IoLocation /> {data.data.daerah}, {data.data.lokasi}
        </p>
        <p className="italic text-[10px]">Jadwal Sholat Untuk Hari Ini</p>
      </div>
      <div className="bg-black bg-opacity-60 p-4 rounded">
        {JadwalSholatData.map((item, index) => (
          <div key={index} className="flex justify-between mb-1">
            <p className="uppercase font-semibold">{item.label}</p>
            <p className="font-light">{item.time} WIB</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JadwalSholat;