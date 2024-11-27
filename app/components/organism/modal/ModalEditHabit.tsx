"use client";
import { useEditHabitUserMutation } from "@/app/lib/redux/api/habitApi";
import { AddHabitSchema, addHabitSchema } from "@/app/schema/addHabitSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { RiErrorWarningLine } from "react-icons/ri";

interface ModalEditHabitProps {
  habitId: string;
  currentHabit: string;
  dayCount: number | null;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onHabitEdit: () => void;
}

const ModalEditHabit: React.FC<ModalEditHabitProps> = ({
  habitId,
  currentHabit,
  dayCount,
  onHabitEdit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editHabitUser, { isLoading, isSuccess }] = useEditHabitUserMutation();

  const form = useForm<AddHabitSchema>({
    resolver: zodResolver(addHabitSchema),
    defaultValues: {
      title: currentHabit,
      maxDays: dayCount,
    },
  });

  const handleEditHabit = async (data: AddHabitSchema) => {
    try {
      const maxDays = data.maxDays === undefined ? null : data.maxDays;
      await editHabitUser({
        habitId,
        title: data.title,
        maxDays,
      }).unwrap();
    } catch (error) {
      toast.error("Gagal update habit");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Habit berhasil diedit");
      onHabitEdit();
      setIsOpen(false);
    }
  }, [isSuccess]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      setIsOpen(newOpen);
      if (!newOpen) {
        form.reset({
          title: currentHabit,
          maxDays: dayCount,
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <MdEdit className="text-green-600" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col  justify-center items-center w-full max-w-md dark:bg-[#1f1f1f]"
        onPointerDownOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (isLoading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Edit Habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditHabit)}
            className="flex flex-col gap-y-4 justify-center items-center w-full"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nama Habit</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      className="border-2 border-green-600 outline-none"
                      onKeyDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxDays"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="w-full">
                  <FormLabel>Jumlah Hari</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      value={value ?? ""} // Convert null to empty string
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val === "" ? null : Number(val));
                      }}
                      placeholder="0"
                      className="border-2 border-green-600 outline-none"
                      onKeyDown={(e) => {
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription className="flex items-center gap-x-[1px] text-xs text-yellow-500">
                    <RiErrorWarningLine /> Kosongkan Jika ingin sesuai dengan
                    bulan
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditHabit;
