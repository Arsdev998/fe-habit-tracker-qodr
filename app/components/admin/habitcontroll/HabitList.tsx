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
import React, { useState } from "react";
import ModalAddHabit from "@/app/components/organism/modal/ModalAddHabit";
import ModalEditHabit from "@/app/components/organism/modal/ModalEditHabit";
import ModalDeleteHabit from "@/app/components/organism/modal/ModalConfirmDeleteHabit";

function HabitList() {
  const { data, isLoading, refetch } = useGetAllHabitQuery();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleModalClose = () => {
    setActiveModal(null);
  };

  return (
    <div className="w-[300px] md:w-[700px] xl:w-[900px]">
      {isLoading ? (
        <Skeleton className="h-12 w-12 bg-black/20" />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-semibold border-r-2">
                List Habit
              </TableHead>
              <TableHead className="text-center font-semibold flex items-center">
                Tambahkan <ModalAddHabit monthId="" monthName="" userId="" />
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border-r-2 text-center">
                Nama Habit
              </TableHead>
              <TableHead className="text-center border-r-2">Jumlah Hari</TableHead>
              <TableHead className="text-center w-10" colSpan={2}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="border-r-2 px-2">{item.title}</TableCell>
                <TableCell className="border-r-2 px-2">
                  {item.maxDays === null ? "Setiap Hari" : item.maxDays}
                </TableCell>
                <TableCell className="text-center">
                  <ModalDeleteHabit
                    habitId={item.id}
                    currentHabit={item.title}
                    onHabitDelete={() => {
                      refetch();
                    }}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <ModalEditHabit
                    currentHabit={item.title}
                    dayCount={item.maxDays}
                    habitId={item.id}
                    onHabitEdit={refetch}
                    isOpen={activeModal === `edit-${item.id}`}
                    onOpenChange={(open) => {
                      if (!open) handleModalClose();
                    }}
                  />
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
