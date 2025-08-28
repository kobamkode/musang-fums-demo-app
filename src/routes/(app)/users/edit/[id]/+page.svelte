<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UserForm from './user-form.svelte';
	import type { EditUserSchema } from '$lib/schemas';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditUserSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<UserForm {data} />
</div>
