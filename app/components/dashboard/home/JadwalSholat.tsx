"use client";
import { useGetJadwalSholatQuery } from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";
import { IoLocation } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  unsplashFoto: {
    urls: { regular: string };
  };
}
function JadwalSholat({ unsplashFoto }: Props) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let currentDate = `${year}-${month}-${day}`;
  let bantulCityId = "1501";

  const { data, isLoading } = useGetJadwalSholatQuery({
    cityId: bantulCityId,
    dateToday: currentDate,
  });

  if (isLoading || !data) {
    return (
      <div>
        <Skeleton className="bg-[#303030] w-[370px] h-[400px] md:w-[800px] md:h-[150px] lg:w-[1000px] " />
      </div>
    );
  }

  const JadwalSholatData = [
    { label: "Shubuh", time: data.data.jadwal.subuh },
    { label: "Terbit", time: data.data.jadwal.terbit },
    { label: "Dhuha", time: data.data.jadwal.dhuha },
    { label: "Dzuhur", time: data.data.jadwal.dzuhur },
    { label: "Ashar", time: data.data.jadwal.ashar },
    { label: "Maghrib", time: data.data.jadwal.maghrib },
    { label: "Isya", time: data.data.jadwal.isya },
  ];

  return (
    <div className="flex flex-col md:flex-row dark:bg-[#303030] justify-around md:justify-between items-center p-2 md:p-5 border-2 shadow-md w-[370px] h-[400px] md:w-[800px] md:h-[150px] lg:w-[1000px] rounded-md">
      <div className="">
        <p className="text-center md:text-start text-2xl mb-4 font-bold md:mb-1">Jadwal Shalat</p>
        <div className="grid grid-cols-3  gap-5 items-center md:flex md:flex-row md:gap-0">
          {JadwalSholatData.map((item, index) => (
            <div key={index} className="mr-3 text-center">
              <p className="uppercase font-semibold">{item.label}</p>
              <p className="font-light">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
      {/* location */}
      <div className="mx-auto w-[300px] md:w-[237px]">
        <p className="flex items-center gap-2 text-sm mb-1">
          <IoLocation className="text-2xl" />
          Mangunan, Dlingo, {data.data.lokasi},{data.data.daerah}
        </p>
      </div>
    </div>
  );
}

export default JadwalSholat;
