"use client";
import {
  useEditHabitUserMutation,
  usePostHabitUSerMutation,
} from "@/app/lib/redux/api/habitApi";
import { AddHabitSchema, addHabitSchema } from "@/app/schema/addHabitSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
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

interface ModalEditHabitProps {
  habitId: string;
  currentHabit: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onHabitEdit: () => void;
}

const ModalEditHabit: React.FC<ModalEditHabitProps> = ({
  habitId,
  currentHabit,
  onHabitEdit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editHabitUser, { isLoading, isError, isSuccess }] =
    useEditHabitUserMutation();

  const form = useForm<AddHabitSchema>({
    resolver: zodResolver(addHabitSchema),
    defaultValues: {
      title: currentHabit,
    },
  });

  const handleEditHabit = async (data: AddHabitSchema) => {
    try {
      await editHabitUser({ habitId, title: data.title }).unwrap();
    } catch (error) {
      toast.error("Gagal update habit");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Habit berhasil diedit");
      onHabitEdit();
      setIsOpen(false);
      form.reset();
    }
  }, [isSuccess, form]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      setIsOpen(newOpen);
      if (!newOpen) {
        form.reset();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="w-full"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
        >
          <MdEdit className="mr-2" />
          Edit Habit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col justify-center items-center"
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
        <DialogDescription className="w-full">
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
                        className="border-2 border-black outline-none"
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
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditHabit;
