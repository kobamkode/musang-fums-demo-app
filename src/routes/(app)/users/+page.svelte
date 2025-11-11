<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
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
	<Card>
		<CardContent class="flex flex-col gap-4">
			<Button href="/users/add" class="w-fit bg-secondary text-secondary-foreground">Create</Button>
			<DataTable data={data.users} {columns} />
		</CardContent>
	</Card>
</div>
