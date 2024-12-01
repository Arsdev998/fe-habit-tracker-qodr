"use client";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
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
import { jurnalType, ZiyadahMurajaahType } from "@/app/lib/types";
import { useDeleteJurnalMutation, useEditJurnalMutation, useGetJurnalQuery, usePostJurnalMutation } from "@/app/lib/redux/api/jurnalApi";
import ModalJurnal from "../../organism/modal/ModalJurnal";

interface JurnalProps {
  monthId: string;
  userId: string;
}

const Jurnal = ({ monthId, userId }: JurnalProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const isUser = user?.id === userId;
  const { data: jurnalData, isLoading } = useGetJurnalQuery({
    monthId,
    userId,
  });

  // action
  const [postJurnal, { isLoading: isPosting, isSuccess: isPostSuccess }] =
    usePostJurnalMutation();
  const [editJurnal, { isLoading: isEditing, isSuccess: isEditingSucces }] =
    useEditJurnalMutation();
  const [
    deleteJurnal,
    {
      isLoading: isDeleting,
      isSuccess: IsDeletingSucces,
      reset: deleteReset,
      isError: isDeletingError,
    },
  ] = useDeleteJurnalMutation();

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  return (
    <div className="w-full md:p-2 min-h-[400px] dark:bg-[#303030]">
      <h2 className="text-xl text-center mb-4">
        Jurnal Bulan {jurnalData?.name} {jurnalData?.year}
      </h2>
      {isLoading ? (
        <div className="text-center">
          <FaSpinner className="animate-spin" />
        </div>
      ) : (
        <Table className="w-full table-fixed border-collapse">
          <TableHeader>
            <TableRow>
              <TableCell className="w-5 md:w-10  py-2 text-center">
                No
              </TableCell>
              <TableCell className="w-35 md:w-48 px-4 py-2 border text-center">
                Aktivitas
              </TableCell>
              <TableCell className="w-24 md:w-32 px-4 py-2 border text-center">
                Tanggal
              </TableCell>
              {isUser && (
                <TableCell className="w-16 text-center py-2 border" colSpan={2}>
                  Opsi
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {jurnalData?.jurnal?.length > 0 ? (
              jurnalData.jurnal.map((item: jurnalType, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="w-10 py-2 text-center border-r-2">
                    {index + 1}
                  </TableCell>
                  <TableCell className="px-2 border-r-2">
                    {item.activity}
                  </TableCell>
                  <TableCell className="text-center border-r-2">
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
                        deleteJurnal({ jurnalId: item.id });
                      }}
                    />
                  )}
                  {isUser && (
                    <ModalJurnal
                      icon={
                        <FaEdit className="mx-auto text-green-600 cursor-pointer" />
                      }
                      date={item.date}
                      activity={item.activity}
                      isLoading={isEditing}
                      isSuccess={isEditingSucces}
                      title="Edit Jurnal"
                      handleSubmitJurnal={(data) => {
                        editJurnal({
                          jurnalId: item.id,
                          activity: data.activity,
                          date: data.date,
                        });
                      }}
                    />
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
            {isUser && (
              <TableRow className="text-right">
                <ModalJurnal
                  icon={
                    <FaPlusSquare className="mx-auto text-green-400 text-lg" />
                  }
                  title="Tambahkan Jurnal"
                  isLoading={isPosting}
                  activity="" // Set surah to an empty string or an appropriate value
                  date={new Date()} // You can replace this with a timestamp or the appropriate date format
                  isSuccess={isPostSuccess}
                  handleSubmitJurnal={(data) => {
                    console.log(data);
                    postJurnal({
                      monthId: monthId,
                      userId: userId,
                      activity: data.activity,
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

export default Jurnal;
