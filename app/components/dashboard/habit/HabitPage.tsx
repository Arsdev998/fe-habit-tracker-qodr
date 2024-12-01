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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebarCustom } from "@/components/ui/sidebar";

function HabitPage() {
  const { data: months = [], isLoading: IsMonthLoading } =
    useGetAllMonthHabitsQuery();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub || user?.id;
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");
  const [defaultTab, setDefaultTab] = useState<string>("");
  const { data: monthHabits } = useGetMonthHabitsQuery(
    { monthId: selectedMonthId, userId },
    { skip: !selectedMonthId }
  );
  const currentMonth = months?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];
  const { open } = useSidebarCustom();

  const handleTabChange = (monthId: string) => {
    setSelectedMonthId(monthId);
  };

  useEffect(() => {
    if (months.length > 0) {
      if (!selectedMonthId) {
        setSelectedMonthId(lastMonth?.id.toString());
      }
      if (!defaultTab) {
        setDefaultTab(`${lastMonth?.name}-${lastMonth?.year}`);
      }
    }
  }, [months, defaultTab, selectedMonthId]);

  if (IsMonthLoading) {
    return (
      <div>
        <Skeleton className="w-full h-full min-w-[1000px] bg-black/15 dark:bg-[#303030]" />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full md:min-w-[1200px]">
      <header className="w-full text-center mb-2">
        <h1 className="font-bold text-3xl leading-none">Habbit Tracker</h1>
      </header>
      {defaultTab ? (
        <Tabs defaultValue={defaultTab} className="">
          <TabsList className="flex items-center w-full mx-auto">
            {months?.map((month: Month) => (
              <TabsTrigger
                key={month.id}
                value={`${month.name}-${month.year}`}
                onClick={() => handleTabChange(month.id)}
              >
                {month.name} {month.year}
              </TabsTrigger>
            ))}
          </TabsList>

          {months.map((month: Month) => (
            <TabsContent key={month.id} value={`${month.name}-${month.year}`}>
              <ScrollArea
                className={` ${
                  open ? "max-w-[350px] md:max-w-[1200px]" : "max-w-[350px] md:max-w-[1450px]"
                }`}
              >
                <TableMontHabit
                  days={monthHabits?.days}
                  title={`${month.name} ${month.year}`}
                  selectMonthId={selectedMonthId}
                />
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
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
