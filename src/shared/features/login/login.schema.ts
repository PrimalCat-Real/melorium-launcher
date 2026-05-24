import { z as zod } from "zod";

export const loginSchema = zod.object({
  login: zod.string().min(3, "Минимум 3 символа").max(32, "Максимум 32 символа"),
});

export type LoginFormData = zod.infer<typeof loginSchema>;
