import type { ColumnDef } from "@tanstack/table-core"

export type Company = {
        code: string
        name: string
        country: string
}

export const columns: ColumnDef<Company>[] = [
        {
                accessorKey: "code",
                header: "Code"
        },
        {
                accessorKey: "name",
                header: "Name"
        },
        {
                accessorKey: "country",
                header: "Country"
        },
]
