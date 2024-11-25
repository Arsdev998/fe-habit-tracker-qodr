"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import Murajaah from "../../dashboard/al-quran-page/Murajaah";
import Ziyadah from "../../dashboard/al-quran-page/Ziyadah";
import Tilawah from "../../dashboard/al-quran-page/Tilawah";
import { useGetAllMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";
import { useState } from "react";

const TahfidzUserPage = () => {
  const { userId } = useParams();
  const isValidId = typeof userId === "string" ? userId : "";
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");

  const { data: monthData, isLoading: monthLoading } =
    useGetAllMonthHabitsQuery();

  return (
    <div>
      {monthLoading ? (
        <Skeleton className="w-full h-[50px] mb-4 bg-black/20" />
      ) : (
        <Tabs defaultValue={monthData?.[0]?.id ?? ""} className="w-full mb-4">
          <TabsList className="flex items-center w-full mx-auto">
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
      <Tabs defaultValue="murajaah" className="border-2">
        <TabsList className="flex items-center w-full mx-auto">
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
              <Murajaah monthId={selectedMonthId} userId={isValidId} />
            </TabsContent>
            <TabsContent value="ziyadah">
              <Ziyadah monthId={selectedMonthId} userId={isValidId} />
            </TabsContent>
            <TabsContent value="tilawah">
              <Tilawah monthId={selectedMonthId} userId={isValidId} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default TahfidzUserPage;
