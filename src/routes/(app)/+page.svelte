<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import { atgColumns } from './columns.js';
	let { data } = $props();
</script>

<div class="flex gap-4">
	<div class="w-full">
		ATG Devices

		<!-- <DataTable {data} {atgColumns} /> -->
	</div>
	<div class="w-full">Flowmeter Devices</div>
</div>
