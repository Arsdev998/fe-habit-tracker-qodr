"use client";
import { useGetAllMonthHabitsQuery } from "@/app/lib/redux/api/habitApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import ModalMonth from "./modal/ModalMonth";

const MonthList = () => {
  const { data: monthData } = useGetAllMonthHabitsQuery();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Tambahkan{" "}
              <ModalMonth
                title="Tambahkan Bulan"
                description="Tambahkan Bulan Untuk user"
              />
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>List Bulan</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthData?.map((month) => (
            <TableRow key={month.id}>
              <TableCell>{month.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonthList;
