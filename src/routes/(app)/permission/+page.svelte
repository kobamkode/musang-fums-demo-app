<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Company } from '../companies/columns';
	import type { Role } from '../roles/columns';
	import type { User } from '../users/columns';
	import { createColumns, type Permission } from './columns';

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
	<div>
		<Button href="/permission/add">Assign</Button>
	</div>
	<DataTable data={data.permission} {columns} />
</div>
