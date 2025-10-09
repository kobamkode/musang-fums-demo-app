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
	import Datepicker from './datepicker.svelte';
	import type { DateValue } from '@internationalized/date';
	import { toast } from 'svelte-sonner';

	type DataTableProps<TData, TValue> = {
		columns: ColumnDef<TData, TValue>[];
		data: TData[];
		assetType: string;
	};

	type EnhancedData<T> = T & {
		_isSummaryRow?: boolean;
		_summaryDate?: string;
		_summaryVolume?: number;
	};

	// Function to transform data with summary rows
	function transformDataWithSummaryRows(rawData: TData[]): EnhancedData<TData>[] {
		if (!rawData || rawData.length === 0) return [];

		const groupedByDate = rawData.reduce(
			(groups, item: any) => {
				const dateStr = item.start_time;
				const date = new Date(dateStr).toISOString().split('T')[0]; // Get YYYY-MM-DD format

				if (!groups[date]) {
					groups[date] = [];
				}
				groups[date].push(item);
				return groups;
			},
			{} as Record<string, TData[]>
		);

		// Sort dates (newest first) and create enhanced data with summary rows
		const sortedDates = Object.keys(groupedByDate).sort((a, b) => {
			return new Date(b).getTime() - new Date(a).getTime();
		});
		const enhancedData: EnhancedData<TData>[] = [];

		sortedDates.forEach((date) => {
			const dateGroup = groupedByDate[date];

			// Add regular data rows
			dateGroup.forEach((item) => {
				enhancedData.push(item as EnhancedData<TData>);
			});

			// Calculate total volume for this date (adjust field name as needed)
			const totalVolume = dateGroup.reduce((sum, item: any) => {
				return sum + (item.volume || 0);
			}, 0);

			// Add summary row
			const summaryRow: EnhancedData<TData> = {
				_isSummaryRow: true,
				_summaryDate: date,
				_summaryVolume: totalVolume
			} as EnhancedData<TData>;

			enhancedData.push(summaryRow);
		});

		return enhancedData;
	}

	// Transform data whenever raw data changes
	$effect(() => {
		tableData = transformDataWithSummaryRows(data);
	});

	let { data, columns, assetType }: DataTableProps<TData, TValue> = $props();
	let tableData = $state<TData[]>(data);
	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 20 });

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

	let selectedDateFrom = $state<DateValue>();
	let selectedDateTo = $state<DateValue>();
	const handleFindClick = async () => {
		if (selectedDateFrom && selectedDateTo) {
			try {
				const response = await fetch('/api/findFuelUsageByRangeDate', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						assetType: assetType.toUpperCase(),
						start: selectedDateFrom.toString(),
						end: selectedDateTo.toString()
					})
				});

				if (response.ok) {
					const { flowmeters } = await response.json();
					tableData = transformDataWithSummaryRows(flowmeters);
					pagination = { pageIndex: 0, pageSize: 20 };
				} else {
					const errorMessage = `Failed to fetch data: ${response.status} ${response.statusText}`;
					toast.error(errorMessage);
				}
			} catch (error) {
				toast.error(
					`Failed to find data: ${error instanceof Error ? error.message : 'Unknown error'}`
				);
			}
		} else {
			toast.warning('Please select both from and to dates');
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
				{@const rowData = row.original as EnhancedData<TData>}
				{#if rowData._isSummaryRow}
					<Table.Row class="border-t-2 bg-muted/50 font-semibold">
						<Table.Cell colspan={columns.length - 1}>
							Daily Total ({rowData._summaryDate})
						</Table.Cell>
						<Table.Cell>
							{rowData._summaryVolume?.toLocaleString() || 0}
						</Table.Cell>
					</Table.Row>
				{:else}
					<Table.Row data-state={row.getIsSelected() && 'selected'}>
						{#each row.getVisibleCells() as cell (cell.id)}
							<Table.Cell>
								<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
							</Table.Cell>
						{/each}
					</Table.Row>
				{/if}
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
