"use client";
import months from "@/app/data/months";
import { usePostMonthMutation } from "@/app/lib/redux/api/monthAPi";
import { MonthSchema, monthSchema } from "@/app/schema/monthSchema";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendarPlus } from "react-icons/fa";

interface Props {
  title: string;
  description: string;
}

const ModalMonth = ({ title, description }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [
    postMonth,
    { isLoading: isPostMonthLoading, isSuccess: isPostMonthSuccess },
  ] = usePostMonthMutation();
  const form = useForm({
    resolver: zodResolver(monthSchema),
    defaultValues: {
      name: "Januari",
      year: 2024,
    },
  });
  const handleSubmit = async (data: { name: string; year: number }) => {
    await postMonth(data).unwrap();
  };

  useEffect(() => {
    if (isPostMonthSuccess) {
      setIsOpen(false);
    }
  }, [isPostMonthSuccess]);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button variant={"ghost"} onClick={() => setIsOpen(true)}>
          <FaCalendarPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Nama Bulan
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("name", value as MonthSchema["name"])
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Bulan" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem className="w-full">
                  <FormLabel>Tahun</FormLabel>
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isPostMonthLoading}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                {isPostMonthLoading ? "Menambahkan..." : "Tambahkan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMonth;
