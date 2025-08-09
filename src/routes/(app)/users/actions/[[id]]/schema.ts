import { z } from "zod/v4";

export const formSchema = z.object({
        name: z.string().min(2).max(50),
        email: z.email(),
        password: z.string().min(8).max(16),
        role: z.string()
});

export const editFormSchema = z.object({
        name: z.string().min(2).max(50),
        email: z.email(),
        role: z.string()
});

export type FormSchema = typeof formSchema

