import { ziyadahMurajaahSchema } from "@/app/schema/ziyadahMurajaahSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ModalQuranProps {
  title: string;
  surah: string;
  date: Date;
  icon: React.ReactNode;
  isLoading: boolean;
  handleSubmitQuran: (data: any) => void; // Pastikan tipe data untuk handleSubmitQuran sesuai
  isSuccess: boolean;
}

function ModalQuran({
  title,
  surah,
  date,
  icon,
  isLoading,
  handleSubmitQuran,
  isSuccess,
}: ModalQuranProps) {
  const [open, setOpen] = useState(false);
  const formattedDate =
    date instanceof Date ? date.toISOString().split("T")[0] : date;
  const form = useForm({
    resolver: zodResolver(ziyadahMurajaahSchema),
    defaultValues: {
      surah: surah || "",
      date: formattedDate || ""
    },
  });
useEffect(() => {
  if (isSuccess) {
    setOpen(false); 
  }
}, [isSuccess]);
console.log(formattedDate)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} onClick={()=> setOpen(true)}>
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitQuran)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="surah"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Nama Surah/Ayat
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
                name="date"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem className="w-full">
                    <FormLabel>Tanggal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </FormControl>
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default ModalQuran;
