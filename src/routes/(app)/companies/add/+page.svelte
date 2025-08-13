<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	import CompanyForm from './company-form.svelte';
	import type { Country } from '../columns';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			countries: Country[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<CompanyForm {data} />
</div>
