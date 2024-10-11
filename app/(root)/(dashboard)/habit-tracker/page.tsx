"use client";
import { useState } from "react";
import TableMontHabit from "@/app/components/dashboard/habit/Table";
import {
  useGetAllMonthHabitsQuery,
  useGetMonthHabitsQuery,
} from "@/app/lib/redux/api/habitApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipe data untuk month
interface Month {
  id: string;
  name: string;
  year: number;
}

export default function HabitTracker() {
  const user = useAppSelector((state) => state.auth.user);
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");
  const userId = user?.sub || user?.id;
  const { data: months = [] } = useGetAllMonthHabitsQuery(); 
  const { data: monthHabits } = useGetMonthHabitsQuery(
    { monthId: selectedMonthId, userId },
    { skip: !selectedMonthId || !userId }
  );

  const handleTabChange = (monthId: string) => {
    setSelectedMonthId(monthId);
  };

  return (
    <div>
      <Tabs >
        <TabsList>
          {months.map((month: Month) => (
            <TabsTrigger
              key={month.id}
              value={month.name}
              onClick={() => handleTabChange(month.id)}
            >
              {month.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {months.map((month: Month) => (
          <TabsContent key={month.id} value={month.name}>
            <TableMontHabit
              days={monthHabits?.days}
              title={`Habits in ${month.name} ${month.year}`}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
