import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .nonempty("*Please enter your name.")
    .min(3, "Name must be at least 3 characters"),
  email: z
    .string()
    .nonempty("*Please enter your email.")
    .email("Invalid email address"),
  phone: z
    .string()
    .nonempty("*Please enter your phone number.")
    .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

export const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty("*Please enter your current password.")
      .min(6, "Password must be at least 6 characters"),
    newPassword: z
      .string()
      .nonempty("*Please enter your new password.")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .nonempty("*Please confirm your new password.")
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ProfileSchema = z.infer<typeof profileSchema>;
export type PasswordSchema = z.infer<typeof passwordSchema>;
