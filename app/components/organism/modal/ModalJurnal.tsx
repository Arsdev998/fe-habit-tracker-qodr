import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { TableCell } from "@/components/ui/table";
import { jurnalSchema } from "@/app/schema/jurnalSchema";

interface ModalJurnalProps {
  title: string;
  activity: string;
  date: string | Date | number;
  icon: React.ReactNode;
  isLoading: boolean;
  handleSubmitJurnal: (data: any) => void;
  isSuccess: boolean;
}

function ModalJurnal({
  title,
  activity,
  date,
  icon,
  isLoading,
  handleSubmitJurnal,
  isSuccess,
}: ModalJurnalProps) {
  const [open, setOpen] = useState(false);
  const initialDate = typeof date === "string" ? parseISO(date) : date;

  const form = useForm({
    resolver: zodResolver(jurnalSchema),
    defaultValues: {
      activity: activity || "",
      date: initialDate || new Date(),
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
        <TableCell
          className="border-none text-center"
          onClick={() => setOpen(true)}
        >
          {icon}
        </TableCell>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#303030]">
        <DialogTitle>{title}</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              handleSubmitJurnal(data);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                   Aktivitas Yang Dilakukan
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
      </DialogContent>
    </Dialog>
  );
}

export default ModalJurnal;
