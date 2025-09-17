<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import type { FlowmeterDevice } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			panels: FlowmeterDevice[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Fixed Stations</CardHeader>
		<CardContent>
			<DataTable data={data.panels} {columns} />
		</CardContent>
	</Card>
</div>
