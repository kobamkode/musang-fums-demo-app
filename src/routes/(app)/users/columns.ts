import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'

export type User = {
        id: number
        email: string
        name: string
        role_id: number
}

export const columns: ColumnDef<User>[] = [
        {
                accessorKey: "email",
                header: "Email"
        },
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
