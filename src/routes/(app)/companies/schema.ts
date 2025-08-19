import { z } from "zod/v4";

export const formSchema = z.object({
        "id": z.number(),
        "code": z.string(),
        "name": z.string(),
        "country_id": z.string()
});

export type FormSchema = typeof formSchema

