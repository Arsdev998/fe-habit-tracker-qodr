"use client";
import {
  useGetMurajaahQuery,
  usePostMurajaahMutation,
  useEditMurajaahMutation,
  useDeleteMurajaahMutation,
} from "@/app/lib/redux/api/murajaahApi";
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

interface MurajaahProps {
  monthId: string;
  userId: string;
}

const Murajaah = ({ monthId, userId }: MurajaahProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const isUser = user?.id === userId;
  const { data: murajaahData, isLoading } = useGetMurajaahQuery({
    monthId,
    userId,
  });

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

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full bg-white h-[400px]" />
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <h2 className="text-xl text-center mb-4">
        Murajaah Bulan {murajaahData.name}
      </h2>
      {isLoading ? (
        <div className="text-center">
          <FaSpinner className="animate-spin" />
        </div>
      ) : (
        <Table className="w-full table-fixed border-collapse">
          <TableHeader>
            <TableRow>
              <TableCell className="w-10  py-2 text-center">No</TableCell>
              <TableCell className="w-48 px-4 py-2 border">Surah/Ayat</TableCell>
              <TableCell className="w-32 px-4 py-2 border">Tanggal</TableCell>
              <TableCell className="w-16 text-center py-2 border" colSpan={2}>
                Opsi
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {murajaahData.murajaah?.length > 0 ? (
              murajaahData.murajaah.map(
                (item: ZiyadahMurajaahType, index: number) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-10 py-2 text-center border-r-2">{index + 1}</TableCell>
                    <TableCell>{item.surah}</TableCell>
                    <TableCell>
                      {" "}
                      {format(new Date(item.date), "dd MMM yyyy")}
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
                          deleteMurajaah({ murajaahId: item.id });
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
                        isSuccess={isEditingSucces}
                        title="Edit Ziyadah"
                        handleSubmitQuran={(data) => {
                          editMurajaah({
                            murajaahId: item.id,
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
                  title="Tambahkan Murajaah"
                  isLoading={isPosting}
                  surah="" // Set surah to an empty string or an appropriate value
                  date={new Date()} // You can replace this with a timestamp or the appropriate date format
                  isSuccess={isPostSuccess}
                  handleSubmitQuran={(data) => {
                    console.log(data);
                    postMurajaah({
                      monthId: monthId,
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
      )}
    </div>
  );
};

export default Murajaah;
