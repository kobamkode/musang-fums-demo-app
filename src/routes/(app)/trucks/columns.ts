import { renderComponent } from "$lib/components/ui/data-table/render-helpers"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import type { FlowmeterDevice } from "$lib/types"

export const columns: ColumnDef<FlowmeterDevice>[] = [
	{
		accessorKey: "panel_id",
		header: "Panel Id"
	},
	{
		accessorKey: "location",
		header: "Location"
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				p: row.original.panel_id,
				loc: row.original.location
			})
		},
		meta: {
			class: "text-right"
		}
	}
]
