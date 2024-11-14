"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Murajaah from "./Murajaah";
import Ziyadah from "./Ziyadah";
import Tilawah from "./Tilawah";
import { useGetAllMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const AlQuranPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const { data: monthData, isLoading: monthLoading } =
    useGetAllMonthHabitsQuery();

  if (!isClient) {
    return null;
  }
  return (
    <div>
      <Tabs defaultValue="murajaah" className="border-2">
        <TabsList>
          <TabsTrigger value="murajaah" className="border-2">
            Murajaah
          </TabsTrigger>
          <TabsTrigger value="ziyadah" className="border-2">
            Ziyadah
          </TabsTrigger>
          <TabsTrigger value="tilawah" className="border-2">
            Tilawah
          </TabsTrigger>
        </TabsList>
        {monthLoading ? (
          <Skeleton className="w-[200px] h-[100px]  bg-black/20" />
        ) : (
          <div>
            <TabsContent value="murajaah">
              <Murajaah monthData={monthData ?? []} />
            </TabsContent>
            <TabsContent value="ziyadah">
              <Ziyadah monthData={monthData ?? []} />
            </TabsContent>
            <TabsContent value="tilawah">
              <Tilawah monthData={monthData ?? []} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default AlQuranPage;
