import { renderComponent } from "$lib/components/ui/data-table"
import type { ATGStatus } from "$lib/types"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import StatusActions from "$lib/components/status-actions.svelte"

export const columns: ColumnDef<ATGStatus>[] = [
	{
		id: 'status',
		cell: ({ row }) => {
			return renderComponent(StatusActions, {
				status: row.original.status,
				noUpdate: row.original.noUpdate
			})
		},
		header: "Status"
	},
	{
		accessorKey: "location",
		header: "Location"
	},
	{
		accessorKey: "fuel_station",
		header: "Fuel Station"
	},
	{
		accessorKey: "tank_label",
		header: "Tank Label"
	},
	{
		accessorKey: "datalogger_id",
		header: "Datalogger ID"
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				fs: row.original.fuel_station,
				t: row.original.tank_label,
				dl: row.original.datalogger_id,
			})
		},
		meta: {
			class: "text-right"
		}
	}
]
