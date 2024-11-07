"use client";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month, TilawahType, ZiyadahMurajaahType } from "@/app/lib/types";
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
import ModalQuran from "./modal/ModalQuran";
import ModalConfirmDelete from "./modal/ModalConfirmDelete";
import {
  useGetTilawahQuery,
  useDeleteTilawahMutation,
  useEditTilawahMutation,
  usePostTilawahMutation,
} from "@/app/lib/redux/api/tilawahApi";

interface TilawahProps {
  monthData: Month[];
}

export default function Tilawah({ monthData }: TilawahProps) {
  const user = useAppSelector((state) => state.auth.user);
  const currentMonth = monthData?.slice();
  const lastMonth = currentMonth?.[currentMonth.length - 1];
  const [selectedMonthId, setSelectedMonthId] = useState<string>(
    lastMonth.id.toString()
  );
  // ACTION TO SERVER
  const [postZiyadah, { isLoading: isPosting, isSuccess: isPostSuccess }] =
    usePostTilawahMutation();
  const [editZiyadah, { isLoading: isEditing, isSuccess: isEditingSucces }] =
    useEditTilawahMutation();
  const [
    deleteZiyadah,
    {
      isLoading: isDeleting,
      isSuccess: IsDeletingSucces,
      reset: deleteReset,
      isError: isDeletingError,
    },
  ] = useDeleteTilawahMutation();
  // FECTH
  const {
    data: murajaahData,
    isLoading,
    refetch,
  } = useGetTilawahQuery({
    monthId: selectedMonthId,
    userId: user?.id,
  });

  useEffect(() => {
    if (isPostSuccess || isEditingSucces || IsDeletingSucces) {
      refetch();
      deleteReset();
    }
  }, [isPostSuccess, isEditingSucces, IsDeletingSucces]);

  const murajaahMonthData = murajaahData?.tilawah;
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
                Tilawah Bulan {item.name}
              </h1>
            </div>
            <Table className="min-w-[400px] max-w-[700px]">
              <TableHeader className="border-2">
                <TableHead className="w-[5%] border-2 text-center">
                  No
                </TableHead>
                <TableHead className="border-2 w-[25%]">
                  Nama Surah/Ayat
                </TableHead>
                <TableHead className="border-2 w-[20%]">Jumlah Lembar</TableHead>
                <TableHead className="border-2 w-[5%] text-center" colSpan={2}>
                  Action
                </TableHead>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <div>Loading...</div>
                ) : murajaahMonthData?.length > 0 ? (
                  murajaahMonthData.map(
                    (tilawah: TilawahType, index: any) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell>{tilawah.surah}</TableCell>
                        <TableCell>
                          {tilawah.lembar}
                        </TableCell>
                        <TableCell className="text-center">
                          <ModalConfirmDelete
                            isLoading={isDeleting}
                            isDeletingError={isDeletingError}
                            isDeletingSuccess={IsDeletingSucces}
                            icon={
                              <MdDelete className="mx-auto text-red-600 cursor-pointer" />
                            }
                            onConfirmDelete={() => {
                              deleteZiyadah({ tilawahId: tilawah.id });
                            }}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <ModalQuran
                            icon={
                              <FaEdit className="mx-auto text-green-600 cursor-pointer" />
                            }
                            date={tilawah.lembar}
                            surah={tilawah.surah}
                            isLoading={isEditing}
                            isSuccess={isEditingSucces}
                            title="Edit Tilawah"
                            handleSubmitQuran={(data) => {
                              editZiyadah({
                                tilawahId: tilawah.id,
                                surah: data.surah,
                                lembar: data.lembar,
                              });
                              console.log(data);
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
                    title="Tambahkan Tilawah"
                    isLoading={isPosting}
                    surah="" // Set surah to an empty string or an appropriate value
                    date={0} // You can replace this with a timestamp or the appropriate date format
                    isSuccess={isPostSuccess}
                    handleSubmitQuran={(data) => {
                      console.log(data);
                      postZiyadah({
                        monthId: selectedMonthId,
                        userId: user.id,
                        surah: data.surah,
                        lembar: data.lembar,
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
