<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { Role } from '../../../roles/columns';
	import UserForm from './user-form.svelte';
	import type { EditFormSchema } from './schema';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditFormSchema>>;
			roles: Role[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<UserForm {data} />
</div>
