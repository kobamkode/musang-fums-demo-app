<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import type { Atg } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			atgDevices: Atg[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<DataTable data={data.atgDevices} {columns} />
</div>
