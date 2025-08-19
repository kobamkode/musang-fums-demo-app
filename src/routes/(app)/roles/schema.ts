import { z } from "zod/v4";

export const formSchema = z.object({
        "id": z.number(),
        "name": z.string(),
});

export type FormSchema = typeof formSchema

