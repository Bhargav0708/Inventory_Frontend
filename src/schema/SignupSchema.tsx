import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string("Must be Number Not allowed to string")
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be at most 15 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  role: z.enum(["admin", "supplier", "customer"]),

  customertype: z
    .string()
    .min(1, "customer Type Required ")
    .optional()
    .refine((val) => !val || val === "individual" || val === "business", {
      message: "Invalid customer type",
    }),
});
