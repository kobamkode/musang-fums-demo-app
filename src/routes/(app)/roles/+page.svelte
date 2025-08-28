<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Role } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			roles: Role[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<div>
		<Button href="/roles/add">Create</Button>
	</div>
	<DataTable data={data.roles} {columns} />
</div>
