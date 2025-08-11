import type { ColumnDef } from "@tanstack/table-core"

export type Role = {
        id: number
        name: string
}

export const columns: ColumnDef<Role>[] = [
        {
                accessorKey: "name",
                header: "Name"
        }
]
