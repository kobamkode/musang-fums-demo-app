import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import type { Role } from "$lib/types"

export const columns: ColumnDef<Role>[] = [
	{
		accessorKey: "name",
		header: "Name"
	},
	{
		accessorKey: "description.String",
		header: "Description"
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return renderComponent(DataTableActions, {
				id: row.original.id,
			})
		}
	}
]
