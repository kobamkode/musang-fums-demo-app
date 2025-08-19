import type { ColumnDef } from "@tanstack/table-core"

export type Flowmeter = {
}

export const columns: ColumnDef<Flowmeter>[] = [
        {
                accessorKey: "transaction_id",
                header: "Transaction ID"
        },
]
