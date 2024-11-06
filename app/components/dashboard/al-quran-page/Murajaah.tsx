"use client";
import {
  useDeleteMurajaahMutation,
  useEditMurajaahMutation,
  useGetMurajaahQuery,
  usePostMurajaahMutation,
} from "@/app/lib/redux/api/murajaahApi";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month, ZiyadahMurajaahType } from "@/app/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalQuran from "./modal/ModalQuran";
import ModalConfirmDelete from "./modal/ModalConfirmDelete";

interface MurajaahProps {
  monthData: Month[];
}

export default function Murajaah({ monthData }: MurajaahProps) {
  const user = useAppSelector((state) => state.auth.user);
  const currentMonth = monthData?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];
  const [selectedMonthId, setSelectedMonthId] = useState<string>(
    lastMonth.id.toString()
  );
  // action
  const [postMurajaah, { isLoading: isPosting, isSuccess: isPostSuccess }] =
    usePostMurajaahMutation();
  const [editMurajaah, { isLoading: isEditing, isSuccess: isEditingSucces }] =
    useEditMurajaahMutation();
  const [
    deleteMurajaah,
    {
      isLoading: isDeleting,
      isSuccess: IsDeletingSucces,
      isError: isDeletingError,
    },
  ] = useDeleteMurajaahMutation();
  // FECTH
  const {
    data: murajaahData,
    isLoading,
    refetch,
  } = useGetMurajaahQuery({
    monthId: selectedMonthId,
    userId: user?.id,
  });

  useEffect(() => {
    if (isPostSuccess || isEditingSucces || IsDeletingSucces) {
      refetch();
    }
  }, [isPostSuccess, isEditingSucces, IsDeletingSucces]);

  const murajaahMonthData = murajaahData?.murajaah;
  return (
    <div>
      <Tabs>
        <TabsList defaultValue={lastMonth.name}>
          {monthData?.map((item: Month) => (
            <TabsTrigger
              key={item.id}
              value={item.name}
              onClick={() => setSelectedMonthId(item.id)}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {monthData?.map((item: Month) => (
          <TabsContent value={item.name} key={item.id}>
            <Table className="w-[400px]">
              <TableHeader className="border-2">
                <TableHead className="w-[5%] border-2 text-center">
                  No
                </TableHead>
                <TableHead className="border-2">Nama Surah/Ayat</TableHead>
                <TableHead className="border-2">Tanggal</TableHead>
                <TableHead className="border-2" colSpan={2}>
                  Action
                </TableHead>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <div>Loading...</div>
                ) : murajaahMonthData?.length > 0 ? (
                  murajaahMonthData.map(
                    (murajaah: ZiyadahMurajaahType, index: any) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{murajaah.surah}</TableCell>
                        <TableCell>{murajaah.date}</TableCell>
                        <TableCell className="mx-auto">
                          <ModalQuran
                            icon={
                              <FaEdit className="mx-auto text-green-600 cursor-pointer" />
                            }
                            date={murajaah.date}
                            surah={murajaah.surah}
                            isLoading={isEditing}
                            isSuccess={isEditingSucces}
                            title="Edit Murajaah"
                            handleSubmitQuran={(data) => {
                              editMurajaah({
                                murajaahId: murajaah.id,
                                surah: data.surah,
                                date: data.date,
                              });
                              console.log(data);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <ModalConfirmDelete
                            isLoading={isDeleting}
                            isError={isDeletingError}
                            isSuccess={IsDeletingSucces}
                            icon={
                              <MdDelete className="mx-auto text-red-600 cursor-pointer" />
                            }
                            onConfirmDelete={() => {
                              deleteMurajaah({ murajaahId: murajaah.id });
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="text-right">
                  <ModalQuran
                    icon={
                      <FaPlusSquare className="mx-auto text-green-400 text-lg" />
                    }
                    title="Tambahkan Murajaah"
                    isLoading={isPosting}
                    surah="" // Set surah to an empty string or an appropriate value
                    date={new Date()} // You can replace this with a timestamp or the appropriate date format
                    isSuccess={isPostSuccess}
                    handleSubmitQuran={(data) => {
                      postMurajaah({
                        monthId: selectedMonthId,
                        userId: user.id,
                        surah: data.surah,
                        date: data.date,
                      });
                    }}
                  />
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
