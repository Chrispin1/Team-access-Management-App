import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Too many characters"),
  email: z.email().min(1, "Email is required").max(100, "Too many characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must not be more than 72 characters"),
  teamCode: z.string().max(32, "Team code must be no more than 32 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
