"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetAllMonthHabitsQuery,
  useGetMonthHabitsQuery,
} from "@/app/lib/redux/api/habitApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Month } from "@/app/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

const HabitUserPage = () => {
  const { userId } = useParams();
  const validUserId = typeof userId === "string" ? userId : "";
  const { data: months = [], isLoading: IsMonthLoading } =
    useGetAllMonthHabitsQuery();
  const [selectedMonthId, setSelectedMonthId] = useState<string>("");
  const [defaultTab, setDefaultTab] = useState<string>("");

  const { data: monthHabits } = useGetMonthHabitsQuery(
    { monthId: selectedMonthId, userId: validUserId },
    { skip: !selectedMonthId }
  );

  const currentMonth = months?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];

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

  const calculateHabitPercentage = (habit: any, days: any[]) => {
    let completedCount = 0;
    const maxDays = habit.habit.maxDays || days.length;

    days.forEach((day) => {
      const habitStatus = day.habitStatuses.find(
        (hs: any) => hs.habit.title === habit.habit.title
      );
      if (habitStatus?.status) {
        completedCount++;
      }
    });

    return maxDays > 0
      ? Math.min((completedCount / maxDays) * 100, 100).toFixed(1)
      : "0";
  };

  const calculateOverallPercentage = (days: any[]) => {
    if (!days || days.length === 0) return "0";

    let totalCompletedDays = 0;
    let totalTargetDays = 0;

    days.forEach((day) => {
      day.habitStatuses.forEach((habitStatus: any) => {
        const maxDays = habitStatus.habit.maxDays || days.length;

        if (habitStatus.status) {
          totalCompletedDays++;
        }

        if (day.date === days[0].date) {
          totalTargetDays += maxDays;
        }
      });
    });

    return totalTargetDays > 0
      ? Math.min((totalCompletedDays / totalTargetDays) * 100, 100).toFixed(1)
      : "0";
  };

  if (IsMonthLoading) {
    return (
      <div>
        <Skeleton className="w-full h-full min-w-[1000px] bg-black/15" />
      </div>
    );
  }

  const HabitTable = ({ days, title }: { days: any[]; title: string }) => {
    if (!days || days.length === 0) {
      return (
        <div>
          <Skeleton className="w-full min-w-[1200px] h-80 bg-black/10" />
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              colSpan={days.length + 2}
              className="text-center font-bold dark:text-white text-[20px]"
            >
              {title}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>Amalan</TableHead>
            {days.map((day: any, index: number) => (
              <TableHead key={index} className="text-[13px] px-3 font-bold">
                {day.date}
              </TableHead>
            ))}
            <TableHead className="text-[13px] px-3 font-bold text-center">
              Avg
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {days[0]?.habitStatuses?.map((habit: any, habitIndex: number) => (
            <TableRow key={habitIndex}>
              <TableCell>{habit.habit.title}</TableCell>
              {days.map((day: any, dayIndex: number) => {
                const habitStatus = day.habitStatuses.find(
                  (hs: any) => hs.habit.title === habit.habit.title
                );
                return (
                  <TableCell
                    key={dayIndex}
                    className="text-center text-sm px-1"
                  >
                    {habitStatus?.status ? (
                      <Checkbox checked={true} className="cursor-not-allowed" />
                    ) : (
                      <Checkbox
                        checked={false}
                        className="cursor-not-allowed"
                      />
                    )}
                  </TableCell>
                );
              })}
              <TableCell className="text-center font-medium">
                {calculateHabitPercentage(habit, days)}%
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={days.length + 1} className="text-center">
              Overall Percentage
            </TableCell>
            <TableCell className="text-center font-bold">
              {calculateOverallPercentage(days)}%
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col min-w-[1200px]">
      <header className="w-full text-center mb-2">
        <h1 className="font-bold text-3xl leading-none">Habbit Tracker</h1>
      </header>
      {defaultTab ? (
        <Tabs defaultValue={defaultTab} className="w-full">
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
              <HabitTable
                days={monthHabits?.days}
                title={`${month.name} ${month.year}`}
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
};

export default HabitUserPage;
