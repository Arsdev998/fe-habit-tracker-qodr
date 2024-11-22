import { z } from "zod";

export const updatePasswordSchema = z.object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }).max(20, { message: "Old Password is too long" }),
    newPassword: z.string().min(1, { message: "New Password is required" }).max(20, { message: "New Password is too long" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }).max(20, { message: "Confirm Password is too long" }),
})


export type UpdateProfileType = z.infer<typeof updatePasswordSchema>