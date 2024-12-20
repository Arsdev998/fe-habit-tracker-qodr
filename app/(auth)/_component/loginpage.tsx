"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/lib/redux/features/authSlices/authAction";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hook";
import { LoginSchema, loginSchema } from "@/app/schema/loginSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { error, loading, status } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      dispatch(login(data));
    } catch (error) {
      console.log("error");
    }
  };


   useEffect(() => {
     console.log("Current resolved theme:", resolvedTheme); // Debugging
   }, [resolvedTheme]);

  useEffect(() => {
    if (status === "succeeded") {
      router.push("/");
    }
  }, [status, router]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
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
            <CardFooter className="flex flex-col items-center">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                className="w-full"
                disabled={loading || status === "succeeded"}
              >
                {loading
                  ? "Loading..."
                  : status === "succeeded"
                  ? "Redirect..."
                  : "Login"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
