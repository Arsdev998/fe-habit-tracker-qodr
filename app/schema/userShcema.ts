import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(15, { message: "Name is too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(20, { message: "Password is too long" }),
  fullname: z
    .string()
    .min(1, { message: "Fullname is required" })
    .max(20, { message: "Fullname is too long" }),
    email: z.string().email({ message: "Invalid email address" }),
    joinDate: z.string().optional(),
  role: z.enum(["SANTRI", "ADMIN", "SUPERADMIN"]).default("SANTRI"),
});

export type UserSchema = z.infer<typeof userSchema>;
