import type { ColumnDef } from "@tanstack/table-core"
import type { Flowmeter } from "$lib/types"

export const columns: ColumnDef<Flowmeter>[] = [
	{
		accessorKey: 'slip_number',
		header: 'Slip Number',
	},
	{
		accessorKey: 'user_name',
		header: 'Name',
	},
	{
		accessorKey: 'unit_number',
		header: 'Unit Number',
	},
	{
		accessorKey: 'start_time',
		header: 'Start Time',
		cell: ({ getValue }) => {
			const isoString = getValue() as string;
			return isoString.replace('T', ' ').replace('Z', '');
		},

	},
	{
		accessorKey: 'start_totalizer',
		header: 'Start Totalizer',
	},
	{
		accessorKey: 'end_time',
		header: 'End Time',
		cell: ({ getValue }) => {
			const isoString = getValue() as string;
			return isoString.replace('T', ' ').replace('Z', '');
		},
	},
	{
		accessorKey: 'end_totalizer',
		header: 'End Totalizer',
	},
	{
		accessorKey: 'volume',
		header: 'Volume',
	},
	{
		accessorKey: 'preset_volume',
		header: 'Preset Volume',
	},
	{
		accessorKey: 'odometer',
		header: 'Odometer',
	},
]
