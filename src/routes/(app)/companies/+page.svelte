<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
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
	<Card>
		<CardContent class="flex flex-col gap-4">
			<Button href="/companies/add" class="w-fit bg-secondary text-secondary-foreground"
				>Create</Button
			>
			<DataTable data={data.companies} {columns} />
		</CardContent>
	</Card>
</div>
