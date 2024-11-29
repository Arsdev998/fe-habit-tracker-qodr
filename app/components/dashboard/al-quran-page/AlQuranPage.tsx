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
  const [selectedMonthId, setSelectedMonthId] = useState<string | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);
  const [defaultTab, setDefaultTab] = useState<string | undefined>(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const { data: monthData, isLoading: monthLoading } =
    useGetAllMonthHabitsQuery();
  const currentMonth = monthData?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (monthData && monthData.length > 0) {
      setDefaultTab(lastMonth?.id);
      setSelectedMonthId(lastMonth?.id);
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
        <Tabs defaultValue={lastMonth?.id} className="w-full mb-4">
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
                {month.name} {month.year}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}
      <Tabs defaultValue="murajaah" className="md:w-[950px]">
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
