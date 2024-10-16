"use client"
import { usePostHabitUSerMutation } from "@/app/lib/redux/api/habitApi";
import { AddHabitSchema, addHabitSchema } from "@/app/schema/addHabitSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
import { BsFillPlusSquareFill } from "react-icons/bs";
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
  onHabitAdded
}) => {
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const [postHabit, { isLoading, isError, isSuccess }] =
    usePostHabitUSerMutation();
  const form = useForm({
    resolver: zodResolver(addHabitSchema),
    defaultValues: {
      title: "",
    },
  });

  const handlePostHabit = async (data: AddHabitSchema) => {
    const title = data.title;
     await postHabit({ monthId, userId, title });
  };

  useEffect(()=>{
   if (isSuccess) {
     toast.success("Berhasil menambahkan Habit");
     onHabitAdded()
     setIsOpen(false)
   }
   if (isError) {
     toast.success("Gagal Menambahkan Toast");
     setIsOpen(false)
   }
  },[isSuccess,isError])
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <BsFillPlusSquareFill />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader className="font-bold text-lg">
          Tambahkan {monthName}
        </DialogHeader>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlePostHabit)}
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

export default ModalAddHabit;
