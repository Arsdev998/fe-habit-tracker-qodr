"use client";
import { useGetMurajaahQuery } from "@/app/lib/redux/api/murajaahApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month, ZiyadahMurajaahType } from "@/app/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MurajaahProps {
  monthData: Month[];
}

export default function Murajaah({ monthData }: MurajaahProps) {
  const user = useAppSelector((state) => state.auth.user);
  const currentMonth = monthData?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];
  const [selectedMonthId, setSelectedMonthId] = useState<string>(
    lastMonth.id.toString()
  );
  const { data: murajaahData, isLoading } = useGetMurajaahQuery({
    monthId: selectedMonthId,
    userId: user.id,
  });

  const murajaahMonthData = murajaahData?.murajaah;
  console.log(monthData);
  return (
    <div>
      <Tabs>
        <TabsList defaultValue={lastMonth.name}>
          {monthData?.map((item: Month) => (
            <TabsTrigger
              value={item.name}
              onClick={() => setSelectedMonthId(item.id)}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {monthData?.map((item: Month) => (
          <TabsContent value={item.name} key={item.id}>
            {isLoading ? (
              <div>loadingg</div>
            ) : murajaahMonthData?.length > 0 ? (
              murajaahMonthData?.map((murajaah: ZiyadahMurajaahType) => (
                <div key={murajaah.id}>{murajaah.surah}</div>
              ))
            ) : (
              <div>No Data</div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
