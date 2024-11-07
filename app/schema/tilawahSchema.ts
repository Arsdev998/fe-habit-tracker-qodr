import { z } from "zod";

export const tilawahSchema = z.object({
  surah: z
    .string()
    .min(1, { message: "Minimal 1 Karakter" })
    .max(50, { message: "Maksimal 25 karakter" }),
  lembar: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 1, {
      message: "Minimal 1 Lembar",
    }),
});

export type AddHabitSchema = z.infer<typeof tilawahSchema>;
