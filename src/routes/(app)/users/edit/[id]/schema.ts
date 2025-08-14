import { z } from "zod/v4";

export const editFormSchema = z.object({
        name: z.string().min(2).max(50),
        email: z.email(),
});

export type EditFormSchema = typeof editFormSchema

