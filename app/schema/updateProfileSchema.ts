import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(25, { message: "Name is too long" }),
    fullname: z.string().min(1, { message: "Fullname is required" }).max(25, { message: "Fullname is too long" }),
    email: z.string().email({ message: "Invalid email address" }),
    motivation: z.string().min(1, { message: "Motivation is required" }).max(200, { message: "Motivation is too long" }),
});


export type UpdateProfileType = z.infer<typeof updateProfileSchema>;