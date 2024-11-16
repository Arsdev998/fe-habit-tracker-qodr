"use client";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month, ZiyadahMurajaahType } from "@/app/lib/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import ModalQuran from "../../organism/modal/ModalQuran";
import ModalConfirmDelete from "../../organism/modal/ModalConfirmDelete";
import {
  useGetZiyadahQuery,
  usePostZiyadahMutation,
  useEditZiyadahMutation,
  useDeleteZiyadahMutation,
} from "@/app/lib/redux/api/ziyadahApi";

interface ZiyadahProps {
  monthData: Month[];
  userId: string;
}

export default function Ziyadah({ monthData, userId }: ZiyadahProps) {
  const user = useAppSelector((state) => state.auth.user);
  const currentMonth = monthData?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];
  const [selectedMonthId, setSelectedMonthId] = useState<string>(
    lastMonth.id.toString()
  );
  // ACTION TO SERVER
  const [postZiyadah, { isLoading: isPosting, isSuccess: isPostSuccess }] =
    usePostZiyadahMutation();
  const [editZiyadah, { isLoading: isEditing, isSuccess: isEditingSucces }] =
    useEditZiyadahMutation();
  const [
    deleteZiyadah,
    {
      isLoading: isDeleting,
      isSuccess: IsDeletingSucces,
      reset: deleteReset,
      isError: isDeletingError,
    },
  ] = useDeleteZiyadahMutation();
  // FECTH
  const {
    data: murajaahData,
    isLoading,
    refetch,
  } = useGetZiyadahQuery({
    monthId: selectedMonthId,
    userId: userId,
  });

  useEffect(() => {
    if (isPostSuccess || isEditingSucces || IsDeletingSucces) {
      refetch();
      deleteReset();
    }
  }, [isPostSuccess, isEditingSucces, IsDeletingSucces]);

  const murajaahMonthData = murajaahData?.ziyadah;

  const isUser = user?.id === userId;
  return (
    <div className="w-full min-w-[400px] max-w-[700px]">
      <Tabs defaultValue={lastMonth.name}>
        <TabsList>
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
            <div className="border-2 p-2">
              <h1 className="text-center font-bold">
                Ziyadah Bulan {item.name}
              </h1>
            </div>
            <Table className="min-w-[400px] max-w-[700px]">
              <TableHeader className="border-2">
                <TableRow>
                  <TableHead className="w-[5%] border-2 text-center">
                    No
                  </TableHead>
                  <TableHead className="border-2 w-[25%]">
                    Nama Surah/Ayat
                  </TableHead>
                  <TableHead className="border-2 w-[20%]">Tanggal</TableHead>
                  {isUser && (
                    <TableHead
                      className="border-2 w-[5%] text-center"
                      colSpan={2}
                    >
                      Action
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell>Memuat Data</TableCell>
                  </TableRow>
                ) : murajaahMonthData?.length > 0 ? (
                  murajaahMonthData.map(
                    (ziyadah: ZiyadahMurajaahType, index: any) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{ziyadah.surah}</TableCell>
                        <TableCell>
                          {format(new Date(ziyadah.date), "dd MMM yyyy")}
                        </TableCell>
                        {isUser && (
                          <ModalConfirmDelete
                            resetState={deleteReset}
                            isLoading={isDeleting}
                            isDeletingError={isDeletingError}
                            isDeletingSuccess={IsDeletingSucces}
                            icon={
                              <MdDelete className="mx-auto text-red-600 cursor-pointer" />
                            }
                            onConfirmDelete={() => {
                              deleteZiyadah({ ziyadahId: ziyadah.id });
                            }}
                          />
                        )}

                        {isUser && (
                          <ModalQuran
                            icon={
                              <FaEdit className="mx-auto text-green-600 cursor-pointer" />
                            }
                            date={ziyadah.date}
                            surah={ziyadah.surah}
                            isLoading={isEditing}
                            isSuccess={isEditingSucces}
                            title="Edit Ziyadah"
                            handleSubmitQuran={(data) => {
                              editZiyadah({
                                ziyadahId: ziyadah.id,
                                surah: data.surah,
                                date: data.date,
                              });
                            }}
                          />
                        )}
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
                {isUser && (
                  <TableRow className="text-right">
                    <ModalQuran
                      icon={
                        <FaPlusSquare className="mx-auto text-green-400 text-lg" />
                      }
                      title="Tambahkan Ziyadah"
                      isLoading={isPosting}
                      surah="" // Set surah to an empty string or an appropriate value
                      date={new Date()} // You can replace this with a timestamp or the appropriate date format
                      isSuccess={isPostSuccess}
                      handleSubmitQuran={(data) => {
                        console.log(data);
                        postZiyadah({
                          monthId: selectedMonthId,
                          userId: user.id,
                          surah: data.surah,
                          date: data.date,
                        });
                      }}
                    />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
