"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema/loginSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { login } from "../lib/features/authSlices/authAction";
import axios from "axios";
import axiosInstance from "../lib/AxiosInstance";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  // const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await axiosInstance.post("/auth/login", data);
      console.log("succes");
      router.push("/");
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="flex flex-col items-center p-3 min-w-[350px] min-h-[300px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader className="flex flex-col items-center">
              <CardTitle>Login To Qodr App</CardTitle>
              <CardDescription>Please login to continue</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Login</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
