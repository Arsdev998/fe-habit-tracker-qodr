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
interface ModalAddHabitProps {
  habitId: string;
  currentHabit: string;
  onHabitEdit: () => void;
}

const ModalEditHabit: React.FC<ModalAddHabitProps> = ({
  habitId,
  currentHabit,
  onHabitEdit,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editHabitUser, { isLoading, isError, isSuccess }] =
    useEditHabitUserMutation();
  const form = useForm({
    resolver: zodResolver(addHabitSchema),
    defaultValues: {
      title: currentHabit,
    },
  });

  const handleEditHabit = async (data: AddHabitSchema) => {
    const title = data.title;
    await editHabitUser({ habitId, title });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Habit berhasil diedit");
      onHabitEdit();
      setIsOpen(false);
    }
    if (isError) {
      toast.warning("Gagal updateHabit");
      setIsOpen(false);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"} className="w-full">
          <MdEdit /> Edit Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader className="font-bold text-lg">
          <DialogTitle>Habit</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditHabit)}
              className="flex flex-col gap-y-2 justify-center items-center"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Habit</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        className="border-2 border-black outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading}>
                {isLoading ? "Menambahkan" : "Tambahkan"}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ModalEditHabit;
