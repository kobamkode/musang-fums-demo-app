import { z } from "zod/v4";

export const formSchema = z.object({
        "id": z.number(),
        "name": z.string(),
        "email": z.string(),
        "password": z.string(),
});

export const editFormSchema = z.object({
        "id": z.number(),
        "name": z.string(),
        "email": z.string(),
});

export type FormSchema = typeof formSchema
export type EditFormSchema = typeof editFormSchema
