import type { FuelUsage } from "$lib/types"
import type { ColumnDef } from "@tanstack/table-core"

export const columns: ColumnDef<FuelUsage>[] = [
	{
		accessorKey: "unit_number",
		header: "Unit"
	},
	{
		accessorKey: "asset.String",
		header: "Asset"
	},
	{
		accessorKey: "asset_description.String",
		header: "Vehicle"
	},
	{
		accessorKey: 'start_time',
		header: 'Date',
		cell: ({ getValue }) => {
			const isoString = getValue() as string;
			return isoString.replace('T', ' ').substring(0, 16);
		},
	},
	{
		accessorKey: "volume",
		header: "Volume"
	},
	{
		accessorKey: "odometer",
		header: "Odometer"
	},
]
