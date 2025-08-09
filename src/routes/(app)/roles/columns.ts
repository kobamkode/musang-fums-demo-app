import type { ColumnDef } from "@tanstack/table-core"

export type Role = {
        id: string
        name: string
}

export const columns: ColumnDef<Role>[] = [
        {
                accessorKey: "name",
                header: "Name"
        }
]
