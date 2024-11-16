"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell } from "@/components/ui/table";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
interface ModalConfirmDelteProps {
  onConfirmDelete: () => void;
  resetState: () => void;
  isDeletingSuccess: boolean;
  isDeletingError: boolean;
  isLoading: boolean;
  icon: React.ReactNode;
}

const ModalConfirmDelete: React.FC<ModalConfirmDelteProps> = ({
  onConfirmDelete,
  isDeletingSuccess,
  isDeletingError,
  isLoading,
  icon,
  resetState,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toastShownRef = useRef<boolean>(false);

  useEffect(() => {
    if (isDeletingSuccess && !toastShownRef.current) {
      toast.success("Berhasil Menghapus");
      toastShownRef.current = true;
      setIsOpen(false);
      resetState();
    }
    if (isDeletingError && !toastShownRef.current) {
      toast.warning("Gagal Dihapus");
      toastShownRef.current = false;
      setIsOpen(false);
    }

    return () => {
      toastShownRef.current = false;
    };
  }, [isDeletingSuccess, isDeletingError]);

  const handleConfirmDelete = () => {
    toastShownRef.current = false; // Reset flag before delete
    onConfirmDelete();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <TableCell className="border-none text-center">{icon}</TableCell>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center w-[400px]">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Apakah Kamu Yakin Ingin Menghapus Data Ini?
        </DialogDescription>
        <DialogFooter className="flex gap-4">
          <Button variant={"default"} onClick={() => setIsOpen(false)} className="bg-green-500 hover:bg-green-600">
            Batal
          </Button>
          <Button
            onClick={handleConfirmDelete}
            disabled={isLoading}
            variant={"destructive"}
          >
            {isLoading ? "Menghapus" : "Hapus"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirmDelete;
