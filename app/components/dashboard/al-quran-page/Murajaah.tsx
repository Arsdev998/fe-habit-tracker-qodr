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
import { format } from "date-fns";
import ModalQuran from "../../organism/modal/ModalQuran";
import ModalConfirmDelete from "../../organism/modal/ModalConfirmDelete";
import { FaSpinner } from "react-icons/fa6";
interface MurajaahProps {
  monthData: Month[];
  userId: string;
}

export default function Murajaah({ monthData, userId }: MurajaahProps) {
  const [isClient, setIsClient] = useState(false);
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
      reset: deleteReset,
      isError: isDeletingError,
    },
  ] = useDeleteMurajaahMutation();
  // FECTH
  const { data: murajaahData, isLoading } = useGetMurajaahQuery({
    monthId: selectedMonthId,
    userId: userId,
  });

  const murajaahMonthData = murajaahData?.murajaah;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isUser = user?.id === userId;

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-w-[400px] max-w-[700px]">
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
                Murajaah Bulan {item.name}
              </h1>
            </div>
            <Table className="min-w-[400px] max-w-[700px]">
              <TableHeader>
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
                    <TableCell className="text-center" colSpan={5}>
                      Memuat Data <FaSpinner className="animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : murajaahMonthData?.length > 0 ? (
                  murajaahMonthData.map(
                    (murajaah: ZiyadahMurajaahType, index: number) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{murajaah.surah}</TableCell>
                        <TableCell>
                          {format(new Date(murajaah.date), "dd MMM yyyy")}
                        </TableCell>
                        {isUser && (
                          <ModalConfirmDelete
                            isLoading={isDeleting}
                            isDeletingError={isDeletingError}
                            isDeletingSuccess={IsDeletingSucces}
                            resetState={deleteReset}
                            icon={
                              <MdDelete className="mx-auto text-red-600 cursor-pointer" />
                            }
                            onConfirmDelete={() => {
                              deleteMurajaah({ murajaahId: murajaah.id });
                            }}
                          />
                        )}
                        {isUser && (
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
                        )}
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Belum ada data
                    </TableCell>
                  </TableRow>
                )}
                {isUser && (
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
                        console.log(data);
                        postMurajaah({
                          monthId: selectedMonthId,
                          userId: userId,
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
