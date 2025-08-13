<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from '../../add/schema';
	import RoleForm from './role-form.svelte';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<RoleForm {data} />
</div>
