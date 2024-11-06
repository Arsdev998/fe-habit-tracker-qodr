import { z } from "zod";

export const ziyadahMurajaahSchema = z.object({
  surah: z
    .string()
    .min(1, { message: "Minimal 1 Karakter" })
    .max(50, { message: "Maksimal 25 karakter" }),
  date: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});

export type AddHabitSchema = z.infer<typeof ziyadahMurajaahSchema>;
