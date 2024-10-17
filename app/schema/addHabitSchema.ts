import { z } from "zod";

export const addHabitSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Minimal 1 Karakter" })
    .max(25, { message: "Maksimal 25 karakter" }),
});

export type AddHabitSchema = z.infer<typeof addHabitSchema>