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
import { TableCell } from "@/components/ui/table";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
interface ModalConfirmDelteProps {
  onConfirmDelete: () => void;
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
  icon
  
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toastShownRef = useRef<boolean>(false);

  useEffect(() => {
    if (isDeletingSuccess && !toastShownRef.current) {
      toast.success("Berhasil Menghapus");
      toastShownRef.current = true;
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild >
        <TableCell className="border-none text-center">
          {icon}
        </TableCell>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={handleConfirmDelete}
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
