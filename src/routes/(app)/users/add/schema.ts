import { z } from "zod/v4";

export const formSchema = z.object({
        name: z.string().min(2).max(50),
        email: z.email(),
        password: z.string().min(8).max(16),
        role_id: z.number()
});

export type FormSchema = typeof formSchema

