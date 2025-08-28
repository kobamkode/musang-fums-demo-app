import type { ATGStatus, FlowmeterStatus } from "$lib/types"
import type { ColumnDef } from "@tanstack/table-core"

export const atgColumns: ColumnDef<ATGStatus>[] = [
	{
		accessorKey: "",
		header: "Status"
	},
	{
		accessorKey: "name",
		header: "ATG"
	},
]

export const flowmeterColumns: ColumnDef<FlowmeterStatus>[] = [
	{
		accessorKey: "email",
		header: "Email"
	},
	{
		accessorKey: "name",
		header: "Name"
	},
]
