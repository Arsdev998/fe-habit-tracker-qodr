"use client";
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
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "sonner";
interface ModalConfirmDelteProps {
  onConfirmDelete: () => void;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  icon: React.ReactNode;
}

const ModalConfirmDelete: React.FC<ModalConfirmDelteProps> = ({
  onConfirmDelete,
  isSuccess,
  isError,
  isLoading,
  icon
  
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Berhasil Menghapus");
      setIsOpen(false);
    }
    if (isError) {
      toast.warning("Gagal Dihapus");
      setIsOpen(false);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full">
        <Button variant={"destructive"} className="w-full">
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Konfirmasi Hapus Habit</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={()=> onConfirmDelete()}
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

export default ModalConfirmDelete;
