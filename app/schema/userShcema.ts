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
    .max(30, { message: "Fullname is too long" }),
  email: z.string().email({ message: "Invalid email address" }),
  joinDate: z.string().max(20, { message: "Join Date is too long" }).optional(),
  major: z.string().max(20, { message: "Major is too long" }).optional(),
  numberPhone: z
    .string()
    .max(15, { message: "Number Phone is too long" })
    .optional(),
  techStack: z
    .string()
    .max(100, { message: "Tech Stack is too long" })
    .optional(),
  role: z.enum(["SANTRI", "ADMIN", "SUPERADMIN"]).default("SANTRI"),
});

export type UserSchema = z.infer<typeof userSchema>;
