"use client";
import { useState } from "react";
import { useUpdateHabitStatusMutation } from "@/app/lib/redux/api/habitApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

interface TableProps {
  title: string;
  days: any[]; // Sesuaikan dengan tipe data dari API
}

const TableMontHabit: React.FC<TableProps> = ({ title, days }) => {
  const [updateHabitStatus] = useUpdateHabitStatusMutation();
  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.sub || user?.id;

  // State untuk menyimpan status lokal checkbox
  const [localStatus, setLocalStatus] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (!days || days.length === 0) {
    return <div>Loading...</div>;
  }

  const habits = days[0]?.habitStatuses?.map((hs: any) => hs.habit.title);

  const handleCheckBoxChange = async (
    dayId: string,
    habitId: string,
    currentStatus: boolean
  ) => {
    const checkboxKey = `${dayId}-${habitId}`;
    setLocalStatus((prev) => ({
      ...prev,
      [checkboxKey]: !currentStatus,
    }));
    await updateHabitStatus({ dayId, habitId, userId, status: !currentStatus });
  };

  return (
    <Table>
      <TableHeader>
        <TableHead colSpan={days.length} className="text-center font-bold text-black text-[20px]">
          {title}
        </TableHead>
        <TableRow>
          <TableHead>Amalan</TableHead>
          {days.map((day: any, index: number) => (
            <TableHead key={index} className="text-[13px] px-3 font-bold">
              {day.date}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {habits?.map((habit: string, habitIndex: number) => (
          <TableRow key={habitIndex}>
            <TableCell className="">{habit}</TableCell>
            {days.map((day: any, dayIndex: number) => {
              const habitStatus = day.habitStatuses.find(
                (hs: any) => hs.habit.title === habit
              );
              // Unik key untuk setiap checkbox berdasarkan dayId dan habitId
              const checkboxKey = `${day.id}-${habitStatus.habit.id}`;
              // Tentukan status checkbox dari local state atau server
              const isChecked =
                localStatus[checkboxKey] !== undefined
                  ? localStatus[checkboxKey]
                  : habitStatus?.status || false;
              return (
                <TableCell key={dayIndex} className="text-center text-sm px-1">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() =>
                      handleCheckBoxChange(
                        day.id,
                        habitStatus.habit.id,
                        habitStatus?.status
                      )
                    }
                  />
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableMontHabit;
