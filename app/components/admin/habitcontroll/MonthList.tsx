"use client";
import { useGetAllMonthQuery } from "@/app/lib/redux/api/monthAPi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ModalMonth from "./modal/ModalMonth";
import ModalConfirmDelete from "@/app/components/organism/modal/ModalConfirmDelete";
import { MdDelete } from "react-icons/md";
import { useDeleteMonthMutation } from "@/app/lib/redux/api/monthAPi";

const MonthList = () => {
  const { data: monthData } = useGetAllMonthQuery();
  const [deleteMonth, { isLoading, isSuccess, isError, reset }] =
    useDeleteMonthMutation();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center flex items-center">
              Tambahkan{" "}
              <ModalMonth
                title="Tambahkan Bulan"
                description="Tambahkan Bulan Untuk user"
              />
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead>List Bulan</TableHead>
            <TableHead>Tahun</TableHead>
            <TableHead colSpan={2}>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monthData?.map((month) => (
            <TableRow key={month.id}>
              <TableCell className="border-r-2 px-2">{month.name}</TableCell>
              <TableCell className="border-r-2 px-2">{month.year}</TableCell>
              <ModalConfirmDelete
                icon={<MdDelete className="mx-auto text-red-500"/>}
                isDeletingError={isError}
                isDeletingSuccess={isSuccess}
                isLoading={isLoading}
                onConfirmDelete={() => deleteMonth({ monthId: month.id })}
                resetState={reset}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonthList;
