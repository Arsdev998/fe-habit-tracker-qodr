"use client";

import { useUpdateProfileMutation } from "@/app/lib/redux/api/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

import { updateProfileSchema } from "@/app/schema/updateProfileSchema";
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

interface ModalEditProfileProps {
  name: string;
  fullname: string;
  email: string;
  motivation: string;
  userId: string; // Tetap digunakan untuk properti komponen
}

// Tipe data untuk form
interface FormData {
  name: string;
  fullname: string;
  email: string;
  motivation: string;
}

const ModalEditProfile = ({
  name,
  fullname,
  email,
  motivation,
  userId,
}: ModalEditProfileProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<FormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: name,
      fullname: fullname,
      email: email,
      motivation: motivation,
    },
  });

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpdateProfile = async (data: FormData) => {
    try {
      // Lakukan update profile menggunakan userId
      await updateProfile({
        userId,
        name: data.name,
        fullname: data.fullname,
        email: data.email,
        motivation: data.motivation,
      }).unwrap();
      toast.success("Profile berhasil diupdate");
      setIsOpen(false);
    } catch (error: any) {
      toast.error(`Profile gagal diupdate: ${error.data.message}`);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Update Profile</Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-[#1f1f1f]">
          <DialogHeader>
            <DialogTitle>Update Profile {name}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateProfile)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username:</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname:</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email:</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Motivation:</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <FaSpinner className="mr-2 animate-spin" />}{" "}
                Update
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalEditProfile;
