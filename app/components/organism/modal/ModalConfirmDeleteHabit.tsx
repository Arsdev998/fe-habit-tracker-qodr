"use client";
import {
    useDeletehabitMutation,
} from "@/app/lib/redux/api/habitApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { MdDelete} from "react-icons/md";
import { toast } from "sonner";
interface ModalDelteeHabitProps {
  habitId: string;
  currentHabit: string;
  onHabitDelete: () => void;
}

const ModalDeleteHabit: React.FC<ModalDelteeHabitProps> = ({
  habitId,
  currentHabit,
  onHabitDelete
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteHabitUser, { isLoading, isError, isSuccess }] =
    useDeletehabitMutation();

  const handleDeleteHabit = async () => {
    await deleteHabitUser({ habitId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Habit Dihapus");
      onHabitDelete();
      setIsOpen(false);
    }
    if (isError) {
      toast.warning("Habit Gagal Dihapus");
      setIsOpen(false);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MdDelete className="text-red-500 mx-auto" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center dark:bg-[#1f1f1f]">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Konfirmasi Hapus Habit {currentHabit}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleDeleteHabit}
            disabled={isLoading}
            variant={"destructive"}
          >
            {isLoading ? "Menghapus" : "Hapus"}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeleteHabit;
