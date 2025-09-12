import type { ColumnDef } from "@tanstack/table-core"
import type { ATG } from "$lib/types"

export const atgColumns: ColumnDef<ATG>[] = [
	// {
	// 	accessorKey: 'transaction_id',
	// 	header: 'Transaction Id',
	// },
	{
		accessorKey: 'height',
		header: 'Product Level (mm)',
	},
	{
		accessorKey: 'volume',
		header: 'Volume in Stock (ℓ)',
	},
	{
		accessorKey: 'ullage',
		header: 'Empty Volume (ℓ)',
	},
	{
		accessorKey: 'water_height',
		header: 'Water Level (mm)',
	},
	{
		accessorKey: 'temp',
		header: 'Average Temperature (°C)',
	},
	{
		accessorKey: 'date_update',
		header: 'Updated at',
		cell: ({ getValue }) => {
			const isoString = getValue() as string;
			return isoString.replace('T', ' ').replace('Z', '');
		},
	},
]
