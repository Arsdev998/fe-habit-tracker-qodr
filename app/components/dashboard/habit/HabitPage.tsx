"use client";
import { useEffect } from "react";
import { useState } from "react";
import TableMontHabit from "@/app/components/dashboard/habit/Table";
import {
  useGetAllMonthHabitsQuery,
  useGetMonthHabitsQuery,
  usePostHabitUSerMutation,
} from "@/app/lib/redux/api/habitApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month } from "@/app/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

function HabitPage() {
  const { data: months = [], isLoading: IsMonthLoading } =
    useGetAllMonthHabitsQuery();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub || user?.id;
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");
  const [defaultTab, setDefaultTab] = useState<string>("");
  const { data: monthHabits, refetch } = useGetMonthHabitsQuery(
    { monthId: selectedMonthId, userId },
    { skip: !selectedMonthId }
  );
  const currentMonth = months?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];

  const handleTabChange = (monthId: string) => {
    setSelectedMonthId(monthId);
  };

  const [postHabit, { isSuccess }] = usePostHabitUSerMutation();

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (months.length > 0) {
      if (!selectedMonthId) {
        setSelectedMonthId(lastMonth?.id.toString());
      }
      if (!defaultTab) {
        setDefaultTab(lastMonth?.name);
      }
    }
  }, [months]);

  if (IsMonthLoading) {
    return (
      <div>
        <Skeleton className="w-full h-full min-w-[1000px] bg-black/15" />
      </div>
    );
  }
  return (
    <div className="flex flex-col  min-w-[1200px]">
      <header className="w-full text-center border-b-2">
        <h1 className="font-bold text-green-800 text-xl leading-none">
          Habit Tracker
        </h1>
        <h2 className="font-bold text-xl leading-2">
          Pesantren Pelatihan Teknologi Informasi Qodr
        </h2>
        <h3 className="font-bold text-xl">{lastMonth?.year}</h3>
      </header>
      {defaultTab ? (
        <Tabs defaultValue={defaultTab} className="">
          <TabsList>
            {months?.map((month: Month) => (
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
                title={`${month.name} ${month.year}`}
                selectMonthId={selectedMonthId}
                refecthHabit={refetch}
              />
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="w-full">
          <Skeleton className="w-full h-full min-h-[500px] min-w-[1000px] bg-black/15" />
        </div>
      )}
    </div>
  );
}

export default HabitPage;
