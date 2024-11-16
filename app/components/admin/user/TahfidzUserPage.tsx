"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import Murajaah from "../../dashboard/al-quran-page/Murajaah";
import Ziyadah from "../../dashboard/al-quran-page/Ziyadah";
import Tilawah from "../../dashboard/al-quran-page/Tilawah";
import { useGetAllMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";

const TahfidzUserPage = () => {
  const { userId } = useParams();
  const isValidId = typeof userId === "string" ? userId : "";

  const { data: monthData, isLoading: monthLoading } =
    useGetAllMonthHabitsQuery();
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
              <Murajaah monthData={monthData ?? []} userId={isValidId} />
            </TabsContent>
            <TabsContent value="ziyadah">
              <Ziyadah monthData={monthData ?? []} userId={isValidId} />
            </TabsContent>
            <TabsContent value="tilawah">
              <Tilawah monthData={monthData ?? []} userId={isValidId} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default TahfidzUserPage;
