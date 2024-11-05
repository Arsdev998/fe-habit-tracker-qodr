import { z } from "zod";

export const addHabitSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Minimal 1 Karakter" })
    .max(25, { message: "Maksimal 25 karakter" }),
  maxDays: z
    .union([
      z.coerce.number().positive().int(), // untuk nilai angka positif
      z.null(), 
    ])
    .optional(), 
});

export type AddHabitSchema = z.infer<typeof addHabitSchema>;
