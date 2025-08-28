<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { User } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			users: User[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<div>
		<Button href="/users/add">Create</Button>
	</div>
	<DataTable data={data.users} {columns} />
</div>
