<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import type { ATGStatus } from '$lib/types.js';
	import { atgColumns } from './columns.js';

	let {
		data
	}: {
		data: {
			atgDevices: ATGStatus[];
		};
	} = $props();
</script>

<div class="flex gap-4">
	<div class="w-full">
		ATG Devices
		<DataTable data={data.atgDevices} columns={atgColumns} />
	</div>
	<div class="w-full">Flowmeter Devices</div>
</div>
