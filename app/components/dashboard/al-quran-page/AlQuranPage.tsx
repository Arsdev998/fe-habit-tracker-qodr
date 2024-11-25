"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Murajaah from "./Murajaah";
import Ziyadah from "./Ziyadah";
import Tilawah from "./Tilawah";
import { useGetAllMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/lib/redux/hook";

const AlQuranPage = () => {
  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: monthData, isLoading: monthLoading } =
    useGetAllMonthHabitsQuery();

  useEffect(() => {
    if (monthData && monthData.length > 0) {
      setSelectedMonthId(monthData[0].id); // Default ke bulan pertama
    }
  }, [monthData]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <h1 className="text-3xl text-center mb-4">Al Quran</h1>
      </div>
      {monthLoading ? (
        <Skeleton className="w-full h-[50px] mb-4 bg-black/20" />
      ) : (
        <Tabs defaultValue={monthData?.[0]?.id ?? ""} className="w-full mb-4">
          <TabsList className="flex p-0 bg-transparent justify-center">
            {monthData?.map((month) => (
              <TabsTrigger
                key={month.id}
                value={month.id}
                className={`px-4 py-2 ${
                  selectedMonthId === month.id ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedMonthId(month.id)}
              >
                {month.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      <Tabs defaultValue="murajaah" className="w-[950px]">
        <TabsList className="flex justify-center space-x-2 p-0 bg-transparent">
          <TabsTrigger value="murajaah" className="px-4">
            Murajaah
          </TabsTrigger>
          <TabsTrigger value="ziyadah" className="px-4">
            Ziyadah
          </TabsTrigger>
          <TabsTrigger value="tilawah" className="px-4">
            Tilawah
          </TabsTrigger>
        </TabsList>
        <div className="flex justify-center w-full dark:bg-[#303030]">
          <TabsContent value="murajaah">
            {selectedMonthId && (
              <Murajaah monthId={selectedMonthId} userId={user.id} />
            )}
          </TabsContent>
          <TabsContent value="ziyadah">
            {selectedMonthId && (
              <Ziyadah monthId={selectedMonthId} userId={user.id} />
            )}
          </TabsContent>
          <TabsContent value="tilawah">
            {selectedMonthId && (
              <Tilawah monthId={selectedMonthId} userId={user.id} />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AlQuranPage;
