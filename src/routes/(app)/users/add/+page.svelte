<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UserForm from './user-form.svelte';
	import type { FormSchema } from './schema';
	import type { Role } from '../../roles/columns';

	let {
		data
	}: {
		data: {
			isUpdate: boolean;
			form: SuperValidated<Infer<FormSchema>>;
			roles: Role[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<UserForm {data} />
</div>
