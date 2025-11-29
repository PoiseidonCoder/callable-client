import { z } from "zod";

export const registerSchema = () =>
  z
    .object({
      email: z.string().min(6, { message: "Email must be at least 6 character." }),
      password: z.string().min(12, { message: "Password must be at least 12 characters." }),
      confirmPassword: z
        .string()
        .min(12, { message: "Confirm Password must be at least 12 characters." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match.",
    });

export const loginSchema = () =>
  z.object({
    email: z.string().min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
  });
