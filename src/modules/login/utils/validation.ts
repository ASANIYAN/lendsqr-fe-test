import { z } from "zod";

export const sanitizedEmail = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email is too long")
  .refine(
    (email) => {
      const dangerousChars = /[<>'";&|*%`\\]/;
      return !dangerousChars.test(email);
    },
    {
      message: "Email contains invalid characters",
    },
  )
  .transform((email) => email.toLowerCase().trim());

export const sanitizedPassword = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long")
  .refine(
    (password) => {
      return /[A-Z]/.test(password);
    },
    {
      message: "Password must contain at least one uppercase letter",
    },
  )
  .refine(
    (password) => {
      return /[a-z]/.test(password);
    },
    {
      message: "Password must contain at least one lowercase letter",
    },
  )
  .refine(
    (password) => {
      return /[0-9]/.test(password);
    },
    {
      message: "Password must contain at least one number",
    },
  )
  .refine(
    (password) => {
      const allowedSpecialChars = /^[A-Za-z0-9@#$%^&+=!]*$/;
      return allowedSpecialChars.test(password);
    },
    {
      message:
        "Password contains invalid characters. Only @#$%^&+=! are allowed as special characters",
    },
  )
  .refine(
    (password) => {
      return /[@#$%^&+=!]/.test(password);
    },
    {
      message:
        "Password must contain at least one special character (@#$%^&+=!)",
    },
  );

export const LoginSchema = z.object({
  email: sanitizedEmail,
  password: sanitizedPassword,
});

export type LoginFormType = z.infer<typeof LoginSchema>;
