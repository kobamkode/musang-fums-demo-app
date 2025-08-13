<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { columns, type Company } from './columns';

	let {
		data
	}: {
		data: {
			companies: Company[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<div>
		<Button href="/companies/add">Create</Button>
	</div>
	<DataTable data={data.companies} {columns} />
</div>
