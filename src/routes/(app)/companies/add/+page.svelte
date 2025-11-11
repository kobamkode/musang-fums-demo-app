<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import CompanyForm from './company-form.svelte';
	import type { Country } from '$lib/types';
	import type { CompanySchema } from '$lib/schemas';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<CompanySchema>>;
			countries: Country[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Add Company</CardHeader>
		<CardContent>
			<CompanyForm {data} />
		</CardContent>
	</Card>
</div>
