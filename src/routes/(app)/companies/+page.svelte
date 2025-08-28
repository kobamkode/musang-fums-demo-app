<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Company, Country } from '$lib/types';
	import { createColumns } from './columns';

	let {
		data
	}: {
		data: {
			companies: Company[];
			countries: Country[];
		};
	} = $props();

	const columns = createColumns(data.countries);
</script>

<div class="flex flex-col gap-4">
	<div>
		<Button href="/companies/add">Create</Button>
	</div>
	<DataTable data={data.companies} {columns} />
</div>
