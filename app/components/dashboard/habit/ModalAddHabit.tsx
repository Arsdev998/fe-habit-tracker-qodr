"use client";
import { usePostHabitUSerMutation } from "@/app/lib/redux/api/habitApi";
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
import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "sonner";

interface ModalAddHabitProps {
  monthName: string;
  monthId: string;
  userId: string;
  onHabitAdded: () => void;
}

const ModalAddHabit: React.FC<ModalAddHabitProps> = ({
  monthName,
  monthId,
  userId,
  onHabitAdded,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postHabit, { isLoading, isError, isSuccess }] =
    usePostHabitUSerMutation();

  const form = useForm({
    resolver: zodResolver(addHabitSchema),
    defaultValues: {
      title: "",
      maxDays: null,
    },
  });

  const handlePostHabit = async (data: AddHabitSchema) => {
    const title = data.title;
    const maxDays = data.maxDays === undefined ? null : data.maxDays;
    console.log(data);
    await postHabit({ monthId, userId, title, maxDays }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Berhasil menambahkan Habit");
      onHabitAdded();
      setIsOpen(false);
    }
    if (isError) {
      toast.error("Gagal Menambahkan Habit");
      setIsOpen(false);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:text-green-500 transition"
        >
          <BsFillPlusSquareFill className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md p-6 bg-gray-50 rounded-lg shadow-lg">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Tambahkan Habit di {monthName}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlePostHabit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nama Habit
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
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
            <div className="flex justify-center mt-6">
              <Button
                disabled={isLoading}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {isLoading ? "Menambahkan..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddHabit;
