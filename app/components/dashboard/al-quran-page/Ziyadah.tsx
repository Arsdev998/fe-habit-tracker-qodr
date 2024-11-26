"use client";
import {
  useGetZiyadahQuery,
  usePostZiyadahMutation,
  useEditZiyadahMutation,
  useDeleteZiyadahMutation,
} from "@/app/lib/redux/api/ziyadahApi";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaSpinner } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/app/lib/redux/hook";
import ModalConfirmDelete from "../../organism/modal/ModalConfirmDelete";
import { MdDelete } from "react-icons/md";
import ModalQuran from "../../organism/modal/ModalQuran";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { ZiyadahMurajaahType } from "@/app/lib/types";

interface ZiyadahProps {
  monthId: string;
  userId: string;
}

const Ziyadah = ({ monthId, userId }: ZiyadahProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const isUser = user?.id === userId;
  const { data: ziyadahData, isLoading } = useGetZiyadahQuery({
    monthId,
    userId,
  });

  // Action
  const [postZiyadah, { isLoading: isPosting, isSuccess: isPostSuccess }] =
    usePostZiyadahMutation();
  const [editZiyadah, { isLoading: isEditing, isSuccess: isEditingSuccess }] =
    useEditZiyadahMutation();
  const [
    deleteZiyadah,
    {
      isLoading: isDeleting,
      isSuccess: isDeletingSuccess,
      reset: deleteReset,
      isError: isDeletingError,
    },
  ] = useDeleteZiyadahMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[400px] p-4">
      <h2 className="text-xl text-center mb-4">
        Ziyadah Bulan {ziyadahData?.name} {ziyadahData?.year}
      </h2>
      {isLoading ? (
        <div className="text-center">
          <FaSpinner className="animate-spin" />
        </div>
      ) : (
        <Table className="w-full table-fixed border-collapse">
          <TableHeader>
            <TableRow>
              <TableCell className="w-10 py-2 text-center">No</TableCell>
              <TableCell className="w-48 px-4 py-2 border">
                Surah/Ayat
              </TableCell>
              <TableCell className="w-32 px-4 py-2 border">Tanggal</TableCell>
              {isUser && (
                <TableCell className="w-16 text-center py-2 border" colSpan={2}>
                  Opsi
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ziyadahData?.ziyadah?.length > 0 ? (
              ziyadahData.ziyadah.map(
                (item: ZiyadahMurajaahType, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-10 py-2 text-center border-r-2">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.surah}</TableCell>
                    <TableCell>
                      {format(new Date(item.date), "dd MMM yyyy")}
                    </TableCell>
                    {isUser && (
                      <ModalConfirmDelete
                        resetState={deleteReset}
                        isLoading={isDeleting}
                        isDeletingError={isDeletingError}
                        isDeletingSuccess={isDeletingSuccess}
                        icon={
                          <MdDelete className="mx-auto text-red-600 cursor-pointer" />
                        }
                        onConfirmDelete={() => {
                          deleteZiyadah({ ziyadahId: item.id });
                        }}
                      />
                    )}
                    {isUser && (
                      <ModalQuran
                        icon={
                          <FaEdit className="mx-auto text-green-600 cursor-pointer" />
                        }
                        date={item.date}
                        surah={item.surah}
                        isLoading={isEditing}
                        isSuccess={isEditingSuccess}
                        title="Edit Ziyadah"
                        handleSubmitQuran={(data) => {
                          editZiyadah({
                            ziyadahId: item.id,
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
                <TableCell colSpan={3} className="text-center">
                  Tidak ada data.
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
                  surah=""
                  date={new Date()}
                  isSuccess={isPostSuccess}
                  handleSubmitQuran={(data) => {
                    postZiyadah({
                      monthId: monthId,
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
      )}
    </div>
  );
};

export default Ziyadah;
