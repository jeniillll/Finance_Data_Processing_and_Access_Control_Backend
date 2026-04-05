import { z } from "zod";

export const signupSchema = z.object({
    contactnumber: z.string().min(10, "Contact number must be at least 10 digits"),
    fullname: z.string().min(2, "Full name is too short"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const loginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(1, "Password is required")
});