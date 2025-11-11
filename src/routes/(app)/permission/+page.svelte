<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { Company, Permission, Role, User } from '$lib/types';
	import { createColumns } from './columns';

	let {
		data
	}: {
		data: {
			users: User[];
			companies: Company[];
			roles: Role[];
			permission: Permission[];
		};
	} = $props();

	const columns = createColumns(data.users, data.companies, data.roles);
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardContent class="flex flex-col gap-4">
			<Button href="/permission/add" class="w-fit bg-secondary text-secondary-foreground"
				>Create</Button
			>
			<DataTable data={data.permission} {columns} />
		</CardContent>
	</Card>
</div>
