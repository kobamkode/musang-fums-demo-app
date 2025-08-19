import type { ColumnDef } from "@tanstack/table-core"

export type Atg = {
        id: number;
        transaction_id: string;
        tank_number: number;
        volume: number;
        tc_volume: number;
        ullage: number;
        height: number;
        water_height: number;
        temp: number;
        water_volume: number;
        date_update: Date;
        location: string;
        code_company: string;
        fuel_station: string;
        data_source: string;
        created_at: Date;
        full_volume: number;
        datalogger_id: string;
        tank_label: string;
        status: boolean;
}

export const columns: ColumnDef<Atg>[] = [
        {
                accessorKey: "transaction_id",
                header: "Transaction ID"
        },
]
