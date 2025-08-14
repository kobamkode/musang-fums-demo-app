<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UserForm from './user-form.svelte';
	import type { EditFormSchema } from './schema';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditFormSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<UserForm {data} />
</div>
