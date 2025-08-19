<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			flowmeterDevices: Flowmeter[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<DataTable data={data.flowmeterDevices} {columns} />
</div>
