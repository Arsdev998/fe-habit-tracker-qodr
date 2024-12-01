import { z } from "zod";

// Buat daftar nama bulan dalam bentuk enum untuk validasi
export const monthSchema = z.object({
  name: z.enum([
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "December",
  ]),
  year: z.coerce
    .number()
    .min(1, { message: "Tahun minimal 1" })
    .max(9999, { message: "Tahun maksimal 9999" }),
});

export type MonthSchema = z.infer<typeof monthSchema>;
