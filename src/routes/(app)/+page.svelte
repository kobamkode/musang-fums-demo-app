<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
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
	<div class="w-full">
		ATG Devices
		<DataTable data={data.atgStats} columns={atgColumns} />
	</div>
</div>
