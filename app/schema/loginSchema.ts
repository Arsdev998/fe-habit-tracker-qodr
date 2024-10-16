import { z } from "zod";

export const loginSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(15, { message: "Name is too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(15, { message: "Password is too long" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
