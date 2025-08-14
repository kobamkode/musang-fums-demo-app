import { z } from "zod/v4";

export const formSchema = z.object({
        user_id: z.string(),
        company_id: z.string(),
        role_id: z.string(),
});

export type FormSchema = typeof formSchema

