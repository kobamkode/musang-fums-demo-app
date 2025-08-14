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
