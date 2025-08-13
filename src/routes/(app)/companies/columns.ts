import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'

export type Country = {
        id: number
        alpha2: string
        alpha3: string
        name: string
}

export type Company = {
        id: number
        name: string
        code: string
        country_id: string
}

export const columns: ColumnDef<Company>[] = [
        {
                accessorKey: "name",
                header: "Name"
        },
        {
                accessorKey: "code",
                header: "Code"
        },
        {
                accessorKey: "country_id",
                header: "Country"
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
