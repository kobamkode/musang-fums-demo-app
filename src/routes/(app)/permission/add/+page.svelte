<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import type { FormSchema } from './schema';
	import PermissionForm from './permission-form.svelte';
	import type { User } from '../../users/columns';
	import type { Company } from '../../companies/columns';
	import type { Role } from '../../roles/columns';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			users: User[];
			companies: Company[];
			roles: Role[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<PermissionForm {data} />
</div>
