// src/schema/signupSchema.ts
import { z } from "zod";

export const otpSchema = z.object({
  otp: z.string().min(1, "Name is required").max(6),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  //   token: z.string().min(1, "Token Is Required"),
});
