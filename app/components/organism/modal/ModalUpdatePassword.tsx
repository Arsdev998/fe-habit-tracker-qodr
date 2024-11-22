"use client";
import { useUpdatePasswordUserMutation } from "@/app/lib/redux/api/userApi";
import { updatePasswordSchema } from "@/app/schema/UpdatePasswordSchema";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface UpdatePasswordType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ModalUpdatePasswordProps {
  userId: string;
}
const ModalUpdatePassword = ({ userId }: ModalUpdatePasswordProps) => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [updatePasswordUser, { isLoading }] = useUpdatePasswordUserMutation();

  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePassword = async (data: UpdatePasswordType) => {
    try {
      await updatePasswordUser({
        userId: userId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      form.reset()
      setIsopen(false);
      toast.success("Password berhasil diupdate");
    } catch (error: any) {
      toast.error(`${error.data.message}`);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsopen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsopen(true)}>Ubah Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ubah Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="space-y-2">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Masukan Password Saat Ini</FormLabel>
                  <Input type="password" placeholder="Masukan Password Saat Ini" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Baru</FormLabel>
                  <Input type="password" placeholder="Masukan Password Baru" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <Input type="password" placeholder="Konfirmasi" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? <FaSpinner className="animate-spin mr-2" /> : ""} Update
              Password
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdatePassword;
