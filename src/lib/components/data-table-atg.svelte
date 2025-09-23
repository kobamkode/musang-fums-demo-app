<script lang="ts" generics="TData, TValue">
	import * as Table from '$lib/components/ui/table';
	import {
		type ColumnDef,
		getCoreRowModel,
		getPaginationRowModel,
		type PaginationState
	} from '@tanstack/table-core';

	import { createSvelteTable, FlexRender } from '$lib/components/ui/data-table/index.js';
	import Button from './ui/button/button.svelte';
	import type { ATG } from '$lib/types';
	import Datepicker from './datepicker.svelte';
	import type { DateValue } from '@internationalized/date';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
	};

	let { data, columns }: DataTableProps<TData, TValue> = $props();
	let tableData = $state<TData[]>(data);
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	const fuelStation = $derived((tableData[0] as ATG)?.fuel_station);
	const tankLabel = $derived((tableData[0] as ATG)?.tank_label);
	const dataloggerId = $derived((tableData[0] as ATG)?.datalogger_id);

	const table = createSvelteTable({
		get data() {
			return tableData;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			}
		},
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	let selectedDateFrom = $state<DateValue | undefined>();
	let selectedDateTo = $state<DateValue | undefined>();
	const handleFindClick = async () => {
		if (selectedDateFrom && selectedDateTo) {
			try {
				const response = await fetch('/api/findAtgByRangeDate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						fuelStation,
						tankLabel,
						dataloggerId,
						start: selectedDateFrom.toString(),
						end: selectedDateTo.toString()
					})
				});

				if (response.ok) {
					const { atg } = await response.json();
					tableData = atg;
					pagination = { pageIndex: 0, pageSize: 10 };
				}
			} catch (error) {
				console.error('Failed to find data:', error);
			}
		} else {
			console.log('No date range selected');
		}
	};
</script>

<div class="flex items-center gap-2 py-4">
	From
	<Datepicker bind:value={selectedDateFrom} />
	To
	<Datepicker bind:value={selectedDateTo} />
	<Button onclick={handleFindClick}>Find</Button>
</div>
<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row>
					{#each headerGroup.headers as header (header.id)}
						<Table.Head colspan={header.colSpan}>
							{#if !header.isPlaceholder}
								<FlexRender
									content={header.column.columnDef.header}
									context={header.getContext()}
								/>
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#each table.getRowModel().rows as row (row.id)}
				<Table.Row data-state={row.getIsSelected() && 'selected'}>
					{#each row.getVisibleCells() as cell (cell.id)}
						<Table.Cell>
							<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
						</Table.Cell>
					{/each}
				</Table.Row>
			{:else}
				<Table.Row>
					<Table.Cell colspan={columns.length} class="h-24 text-center">No results.</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
<div class="flex items-center justify-end space-x-2 py-4">
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.previousPage()}
		disabled={!table.getCanPreviousPage()}
	>
		Previous
	</Button>
	<Button
		variant="outline"
		size="sm"
		onclick={() => table.nextPage()}
		disabled={!table.getCanNextPage()}
	>
		Next
	</Button>
</div>
