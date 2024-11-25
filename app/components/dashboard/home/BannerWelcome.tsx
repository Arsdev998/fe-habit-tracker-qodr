"use client";

import {
  useGetDateHijriahQuery,
  useGetTimeStampQuery,
} from "@/app/lib/redux/api/myquranApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { format, parse } from "date-fns";

interface BannerWelcomeProps {
  name: string;
  bannerImg: any;
}

const BannerWelcome = ({ name, bannerImg }: BannerWelcomeProps) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const date = new Date();
  const { data: timeStamp, isLoading: timeStampLoading } =
    useGetTimeStampQuery();
  const { data: hijriahDate, isLoading: hijriahLoading } =
    useGetDateHijriahQuery();

  // Update waktu berdasarkan timestamp server
  useEffect(() => {
    if (timeStamp) {
      const serverTime = new Date(timeStamp.data.timestamp);
      setCurrentTime(serverTime);
    }
  }, [timeStamp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime((prevTime) => {
        if (prevTime) {
          return new Date(prevTime.getTime() + 1000);
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeStampLoading || hijriahLoading) {
    return (
      <div className="w-full">
        <Skeleton className="bg-[#303030] w-[370px] h-[400px] md:w-[800px] md:h-[200px] lg:w-full rounded-md" />
      </div>
    );
  }

  const rawDate = hijriahDate?.data?.date?.[2];

  let formattedDate = "Tanggal tidak valid";
  if (rawDate) {
    try {
      const parsedDate = parse(rawDate, "dd-MM-yyyy", new Date());
      formattedDate = format(parsedDate, "dd MMMM yyyy");
    } catch {
      console.error("Invalid date format:", rawDate);
    }
  }
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
            <p>{formattedDate}</p>
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
