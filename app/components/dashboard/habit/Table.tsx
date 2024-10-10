import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
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
  if (!days || days.length === 0) {
    return <div>Loading...</div>; 
  }

  const habits = days[0]?.habitStatuses?.map((hs: any) => hs.habit.title);

  return (
    <Table>
      <TableHeader>
        <TableHead colSpan={days.length} className="text-center font-bold">{title}</TableHead>
        <TableRow>
          <TableHead>Amalan</TableHead>
          {days.map((day: any, index: number) => (
            <TableHead key={index} className="text-[13px] px-3 font-bold">{day.date}</TableHead>
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
              return (
                <TableCell key={dayIndex} className="text-center text-sm px-1">
                  {habitStatus?.status ? <Checkbox checked={true}/> : <Checkbox checked={false}/>}
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
