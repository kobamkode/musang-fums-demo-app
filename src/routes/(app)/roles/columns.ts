import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'

export type Role = {
        id: number
        name: string
}

export const columns: ColumnDef<Role>[] = [
        {
                accessorKey: "name",
                header: "Name"
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
