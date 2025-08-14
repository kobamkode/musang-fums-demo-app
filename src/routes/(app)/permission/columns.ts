import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import type { Company } from "../companies/columns"
import type { User } from "../users/columns"
import type { Role } from "../roles/columns"

export type Permission = {
        id: number
        user_id: number,
        company_id: number
        role_id: number
}

export const createColumns = (users: User[], companies: Company[], roles: Role[]): ColumnDef<Permission>[] => [
        {
                id: 'user',
                header: 'User',
                cell: ({ row }) => {
                        const user = users.find(c => c.id === row.original.user_id)
                        return user?.name
                }
        },
        {
                id: 'company',
                header: 'Company',
                cell: ({ row }) => {
                        const company = companies.find(c => c.id === row.original.company_id)
                        return company?.name
                }
        },
        {
                id: 'role',
                header: 'Role',
                cell: ({ row }) => {
                        const role = roles.find(c => c.id === row.original.role_id)
                        return role?.name
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
