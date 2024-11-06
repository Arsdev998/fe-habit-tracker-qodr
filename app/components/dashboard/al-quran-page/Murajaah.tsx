"use client";
import { useGetMurajaahQuery } from "@/app/lib/redux/api/murajaahApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month } from "@/app/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface MurajaahProps {
  monthData: Month[];
}

export default function Murajaah({ monthData }: MurajaahProps) {
  const [selectedMonthId] = useState<string>("7");
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const { data: murajaahData } = useGetMurajaahQuery({
    monthId: selectedMonthId,
    userId: user.id,
  });
  return (
    <div>
      <Tabs>
        <TabsList>
          {monthData?.map((item) => (
            <TabsTrigger
              value={item.name}
              onClick={() => setSelectedMonthId(item.id)}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {monthData?.map((item) => (
          <TabsContent value={item.name}>
            {murajaahData?.map((item: Ziyadah) => (
              <div>{item.name}</div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
