import { z } from "zod/v4";

export const formSchema = z.object({
        name: z.string().min(2).max(50),
        code: z.string().min(2).max(5),
        country_id: z.string()
});

export type FormSchema = typeof formSchema

