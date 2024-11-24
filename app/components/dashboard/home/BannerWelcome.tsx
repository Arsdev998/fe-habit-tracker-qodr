"use client";

import {
  useGetDateHijriahQuery,
  useGetTimeStampQuery,
} from "@/app/lib/redux/api/myquranApi";
import { useEffect, useState } from "react";

interface BannerWelcomeProps {
  name: string;
  bannerImg: any;
}

const BannerWelcome = ({ name, bannerImg }: BannerWelcomeProps) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const date = new Date();
  const { data: timeStamp } = useGetTimeStampQuery();
  const { data: hijriahDate } = useGetDateHijriahQuery();

  const hijriahFormatted = hijriahDate?.data.date.join(", "); // Format Hijriah: "Ahad, 22 Jumadil Awal 1446 H"

  // Update waktu berdasarkan timestamp server
  useEffect(() => {
    if (timeStamp) {
      const serverTime = new Date(timeStamp.data.timestamp);
      setCurrentTime(serverTime);
    }
  }, [timeStamp]);

  // Interval untuk memperbarui waktu setiap detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime) {
          return new Date(prevTime.getTime() + 1000); // Tambahkan 1 detik
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={bannerImg}
      className="bg-center bg-cover w-full h-[200px] rounded-md overflow-hidden text-white "
    >
      <div className="flex items-center justify-between px-10 h-full mb-3 sm:text-left bg-black bg-opacity-60 ">
        <div>
          <h1 className="text-2xl font-semibold">
            Ahlan Wasahlan, Akhi <span className="font-bold">{name}</span>
          </h1>
        </div>
        <div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">{hijriahDate?.data?.date[0]}</h2>
            <p>{hijriahDate?.data?.date[2]}</p>
            <p>{hijriahDate?.data?.date[1]}</p>
            <p className="text-2xl font-bold">
              {currentTime?.getHours().toString().padStart(2, "0")}:
              {currentTime?.getMinutes().toString().padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerWelcome;
