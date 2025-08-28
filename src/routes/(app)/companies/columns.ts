import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import type { Company, Country } from "$lib/types"


export const createColumns = (countries: Country[]): ColumnDef<Company>[] => [
	{
		accessorKey: "name",
		header: "Name"
	},
	{
		accessorKey: "code",
		header: "Code"
	},
	{
		id: "country",
		header: "Country",
		cell: ({ row }) => {
			const country = countries.find(c => c.alpha2 === row.original.country_id)
			return country?.name
		}
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
