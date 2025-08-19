import { z } from "zod/v4";

export const formSchema = z.object({
        "id": z.number(),
        "transaction_id": z.string(),
        "tank_number": z.number(),
        "volume": z.number(),
        "tc_volume": z.number(),
        "ullage": z.number(),
        "height": z.number(),
        "water_height": z.number(),
        "temp": z.number(),
        "water_volume": z.number(),
        "date_update": z.coerce.date(),
        "location": z.string(),
        "code_company": z.string(),
        "fuel_station": z.string(),
        "data_source": z.string(),
        "created_at": z.coerce.date(),
        "full_volume": z.number(),
        "datalogger_id": z.string(),
        "tank_label": z.string(),
        "status": z.boolean(),
});

export type FormSchema = typeof formSchema

