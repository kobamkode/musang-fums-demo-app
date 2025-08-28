import type { Atg } from "$lib/types"
import type { ColumnDef } from "@tanstack/table-core"

export const columns: ColumnDef<Atg>[] = [
	{
		accessorKey: "transaction_id",
		header: "Transaction ID"
	},
]
