import { renderComponent } from "$lib/components/ui/data-table"
import type { ColumnDef } from "@tanstack/table-core"
import DataTableActions from './data-table-actions.svelte'
import type { Company, Permission, Role, User } from "$lib/types"


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
			if (row.original.role_id !== 999) {
				const company = companies.find(c => c.id === row.original.company_id)
				return company?.name
			} else {
				return "*"
			}
		}
	},
	{
		id: 'role',
		header: 'Role',
		cell: ({ row }) => {
			if (row.original.role_id !== 999) {
				const role = roles.find(c => c.id === row.original.role_id)
				return role?.name
			} else {
				return "admin"
			}
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			if (row.original.role_id !== 999) {
				return renderComponent(DataTableActions, {
					id: row.original.id,
				})
			}
		}
	}
]
