import * as z from "zod"

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("*Please enter your name.")
    .min(4, "Name must be at least 4 characters.")
    .max(20, "Name must be at most 20 characters."),
  email: z
    .string()
    .nonempty("*Please enter your email.")
    .email("Invalid email address."),
  password: z
    .string()
    .nonempty("*Please enter your password.")
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  rePassword: z
    .string()  
     .nonempty("*Please confirm your password.")
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
  phone: z
    .string()
    .nonempty("*Please enter your phone number.")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number."),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  error: "Passwords Not Match.",
});

export type registerTypeSchema = z.infer<typeof registerSchema>;





export const loginSchema = z.object({
 email: z
    .string()
    .nonempty("*Please enter your email.")
    .email("Invalid email address."),
   password: z
    .string()
    .nonempty("*Please enter your password.")
    .min(6, "Password must be at least 6 characters.")
    .max(100, "Password must be at most 100 characters."),
});

export type loginTypeSchema = z.infer<typeof loginSchema>;

   