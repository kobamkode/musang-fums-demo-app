import type { ATGMonitor, FlowmeterMonitor } from "$lib/types"
import type { ColumnDef } from "@tanstack/table-core"


export const atgColumns: ColumnDef<ATGMonitor>[] = [
	{
		accessorKey: "email",
		header: "Email"
	},
	{
		accessorKey: "name",
		header: "Name"
	},
]


export const flowmeterColumns: ColumnDef<FlowmeterMonitor>[] = [
	{
		accessorKey: "email",
		header: "Email"
	},
	{
		accessorKey: "name",
		header: "Name"
	},
]
