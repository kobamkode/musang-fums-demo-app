<script lang="ts">
	import DataTableFixed from '$lib/components/data-table-fixed.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { Flowmeter } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			flowmeters: Flowmeter[];
		};
	} = $props();
	const latest = data.flowmeters[0];
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Fixed Station Info</CardHeader>
		<CardContent>
			<div class="border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-4">
				<table>
					<tbody>
						<tr>
							<td class="py-1 pr-4 text-muted-foreground">Panel Id</td>
							<td>{latest.panel_id}</td>
						</tr>
						<tr>
							<td class="py-1 pr-4 text-muted-foreground">Location</td>
							<td>{latest.location}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</CardContent>
	</Card>
	<Card>
		<CardHeader class="text-xl">Transactions</CardHeader>
		<CardContent>
			<DataTableFixed data={data.flowmeters} {columns} />
		</CardContent>
	</Card>
</div>
