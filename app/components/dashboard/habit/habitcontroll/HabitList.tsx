"use client";
import { useGetAllHabitQuery } from "@/app/lib/redux/api/habitApi";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function HabitList() {
  const { data, isLoading } = useGetAllHabitQuery();

  return (
    <div className="w-[300px] md:w-[400px] border-2 p-2">
      {isLoading ? (
        <Skeleton className="h-12 w-12 bg-black/20" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold" colSpan={2}>List Habit</TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border-r-2 text-center">Nama Habit</TableHead>
              <TableHead className="text-center">Jumlah Hari</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  {item.maxDays === null ? "Setiap Hari" : item.maxDays}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default HabitList;
