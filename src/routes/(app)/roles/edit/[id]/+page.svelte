<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import RoleForm from './role-form.svelte';
	import type { RoleSchema } from '$lib/schemas';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<RoleSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<RoleForm {data} />
</div>
