<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import CompanyForm from './company-form.svelte';
	import type { Country } from '$lib/types';
	import type { CompanySchema } from '$lib/schemas';

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
	<CompanyForm {data} />
</div>
