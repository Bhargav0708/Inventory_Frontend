// src/schema/signupSchema.ts
import { z } from "zod";

export const loginScehma = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string("Must be Number Not allowed to string")
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  role: z.enum(["admin", "supplier", "customer"]),
});
