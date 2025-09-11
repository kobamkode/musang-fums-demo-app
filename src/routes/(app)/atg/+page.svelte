<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { ATGStatus } from '$lib/types.js';
	import { atgColumns } from './columns.js';

	let {
		data
	}: {
		data: {
			atgStats: ATGStatus[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader>ATG Devices</CardHeader>
		<CardContent>
			<DataTable data={data.atgStats} columns={atgColumns} />
		</CardContent>
	</Card>
</div>
