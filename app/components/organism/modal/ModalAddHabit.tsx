"use client";
import {
  usePosthabitAdminMutation,
  usePostHabitUSerMutation,
} from "@/app/lib/redux/api/habitApi";
import { useAppSelector } from "@/app/lib/redux/hook";
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
import { BsFillPlusSquareFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "sonner";

interface ModalAddHabitProps {
  monthName: string;
  monthId: string;
  userId: string;
}

const ModalAddHabit: React.FC<ModalAddHabitProps> = ({
  monthName,
  monthId,
  userId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);
  const [
    postHabitUser,
    {
      isLoading: postUserIsloading,
      isError: isUserPosterror,
      isSuccess: isPostUserSucces,
    },
  ] = usePostHabitUSerMutation();
  const [
    postHabitByAdmin,
    {
      isSuccess: postAdminIsSuccess,
      isError: postAdminIsError,
    },
  ] = usePosthabitAdminMutation();

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
    if (user.role === "KESANTRIAN") {
      await postHabitByAdmin({ title, maxDays }).unwrap();
    } else {
      await postHabitUser({ monthId, userId, title, maxDays }).unwrap();
    }
  };

  useEffect(() => {
    if (isPostUserSucces || postAdminIsSuccess) {
      toast.success("Berhasil menambahkan Habit");
      setIsOpen(false);
    }
    if (isUserPosterror || postAdminIsError) {
      toast.error("Gagal Menambahkan Habit");
      setIsOpen(false);
    }
  }, [isPostUserSucces, postAdminIsSuccess, isUserPosterror, postAdminIsError]);

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
      <DialogContent className="w-full max-w-md p-6 dark:bg-[#1f1f1f] rounded-lg shadow-lg">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-xl font-semibold">
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
                  <FormLabel className="text-sm font-medium">
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
                      disabled={postUserIsloading}
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
                disabled={postUserIsloading}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {postUserIsloading ? "Menambahkan..." : "Tambahkan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddHabit;
