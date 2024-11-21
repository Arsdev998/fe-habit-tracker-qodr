import { z } from "zod";


export const evaluationSchema = z.object({
about: z.string().min(1, { message: "Minimal 5 Karakter" }).max(30, { message: "Maksimal 30 Karakter" }),
problem: z.string().min(1, { message: "Evaluation is required" }).max(500, { message: "Evaluasi Maksimal 500 Karakter" }),
})


export type evaluationSchema = z.infer<typeof evaluationSchema>