import { z } from "zod";

export const jurnalSchema = z.object({
  activity: z
    .string()
    .min(1, { message: "Minimal 1 Karakter" })
    .max(500, { message: "Maksimal 500 karakter" }),
  date: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date()
  ),
});

export type JurnalSchema = z.infer<typeof jurnalSchema>;
