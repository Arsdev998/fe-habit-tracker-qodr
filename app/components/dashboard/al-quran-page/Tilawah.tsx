"use client";
import { useAppSelector } from "@/app/lib/redux/hook";
import { Month, TilawahType } from "@/app/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalQuran from "../../organism/modal/ModalQuran";
import ModalConfirmDelete from "../../organism/modal/ModalConfirmDelete";
import {
  useGetTilawahQuery,
  useDeleteTilawahMutation,
  useEditTilawahMutation,
  usePostTilawahMutation,
} from "@/app/lib/redux/api/tilawahApi";
import { Skeleton } from "@/components/ui/skeleton";
import { FaSpinner } from "react-icons/fa6";

interface TilawahProps {
  monthId: string;
  userId: string;
}

export default function Tilawah({ monthId, userId }: TilawahProps) {
  const user = useAppSelector((state) => state.auth.user);
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
    data: tilawahData,
    isLoading,
    refetch,
  } = useGetTilawahQuery({
    monthId: monthId,
    userId: userId,
  });

  useEffect(() => {
    if (isPostSuccess || isEditingSucces || IsDeletingSucces) {
      deleteReset();
    }
  }, [isPostSuccess, isEditingSucces, IsDeletingSucces, deleteReset, refetch]);

  const tilawahMonthData = tilawahData?.tilawah;
  const isLogin = user?.id === userId;

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full min-w-[1200px] h-[400px]" />
      </div>
    );
  }
  return (
    <div className="w-full min-h-[400px]">
      <div>
        <div>
          <h1 className="text-xl text-center mb-4">
            Tilawah Bulan {tilawahData?.name} {tilawahData?.year}
          </h1>
        </div>
        <Table className="w-full table-fixed border-collapse">
          <TableHeader className="">
            <TableRow>
              <TableHead className="w-7 md:w-10  py-2 text-center border-r-2">
                No
              </TableHead>
              <TableHead className="w-36 md:w-48 px-4 py-2 border-r-2">
                Nama Surah/Ayat
              </TableHead>
              <TableHead className="w-26 md:w-32 px-4 py-2 border text-center">
                Jumlah Lembar
              </TableHead>
              {isLogin && (
                <TableHead className="border-2 text-center w-16" colSpan={2}>
                  Opsi
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
            ) : tilawahMonthData?.length > 0 ? (
              tilawahMonthData.map((tilawah: TilawahType, index: any) => (
                <TableRow key={index}>
                  <TableCell className="text-center border-r-2 ">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-center border-r-2">
                    {tilawah.surah}
                  </TableCell>
                  <TableCell className="text-center border-r-2">
                    {tilawah.lembar}
                  </TableCell>
                  {isLogin && (
                    <ModalConfirmDelete
                      resetState={deleteReset}
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
                  )}

                  {isLogin && (
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
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No Data Available
                </TableCell>
              </TableRow>
            )}
            {isLogin && (
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
                      monthId: monthId,
                      userId: user.id,
                      surah: data.surah,
                      lembar: data.lembar,
                    });
                  }}
                />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
