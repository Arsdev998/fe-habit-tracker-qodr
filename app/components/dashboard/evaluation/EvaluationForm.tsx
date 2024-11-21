"use client";
import { usePostEvaluationMutation } from "@/app/lib/redux/api/evaluationApi";
import { evaluationSchema } from "@/app/schema/evaluationSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

const EvaluationForm = () => {
  const [postEvaluation, { isLoading, isSuccess }] =
    usePostEvaluationMutation();
  const form = useForm({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      about: "",
      problem: "",
    },
  });

  const handleSendEvaluation = async (data: any) => {
    try {
      await postEvaluation(data).unwrap();
      form.reset();
      toast.success("Terima kasih atas kritik dan saran anda");
    } catch (error: any) {
      console.log(error);
      if (error.status === 400) {
        toast.error(`Kamu baru bisa mengirim pada ${error.data.message}`);
      } else {
        toast.error("Internal Server Error");
      }
    }
  };
  return (
    <div className="max-w-[600px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSendEvaluation)}
          className="space-y-4"
        >
          <FormField
            name="about"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tentang</FormLabel>
                <Input {...field} className="border-2 border-black w-[300px]" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="problem"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <Textarea {...field} className="border-2 border-black" />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <p className="italic text-xs">
              Gunakan Form Ini untuk memberikan kritik dan saran kepada kami
              agar bisa membuat PPTI QODR lebih baik untuk kedepannya
            </p>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  Mengirim <FaSpinner className="animate-spin" />
                </>
              ) : (
                "Kirim"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EvaluationForm;
