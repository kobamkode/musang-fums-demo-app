<script lang="ts">
	import DataTableAtg from '$lib/components/data-table-atg.svelte';
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
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Transactions</CardHeader>
		<CardContent>
			<DataTableAtg data={data.flowmeters} {columns} />
		</CardContent>
	</Card>
</div>
