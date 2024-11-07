import { ziyadahMurajaahSchema } from "@/app/schema/ziyadahMurajaahSchema";
import { tilawahSchema } from "@/app/schema/tilawahSchema";
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
import { format, parseISO } from "date-fns";

interface ModalQuranProps {
  title: string;
  surah: string;
  date: string | Date | number;
  icon: React.ReactNode;
  isLoading: boolean;
  handleSubmitQuran: (data: any) => void;
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
  const initialDate = typeof date === "string" ? parseISO(date) : date;

  // Form configuration based on title
  const isTilawah = title === "Tambahkan Tilawah" || title === "Edit Tilawah";
  const formSchema = isTilawah ? tilawahSchema : ziyadahMurajaahSchema;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      surah: surah || "",
      ...(isTilawah
        ? { lembar: date || "1" }
        : { date: initialDate || new Date() }),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} size={"icon"} onClick={() => setOpen(true)}>
          {icon}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                handleSubmitQuran(data);
              })}
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

              {isTilawah ? (
                <FormField
                  control={form.control}
                  name="lembar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Jumlah Lembar
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...{
                            ...field,
                            value: field.value?.toString() ?? "", 
                          }}
                          onChange={(e) => {
                            const value = e.target.value; 
                            field.onChange(value === "" ? "" : value); 
                          }}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600" />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value instanceof Date
                              ? format(field.value, "yyyy-MM-dd")
                              : ""
                          }
                          onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            field.onChange(selectedDate);
                          }}
                          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-center mt-6">
                <Button
                  disabled={isLoading}
                  className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  {isLoading ? "Loading..." : "Konfirmasi"}
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
