<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import RoleForm from './role-form.svelte';
	import type { RoleSchema } from '$lib/schemas';
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<RoleSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Edit Role</CardHeader>
		<CardContent>
			<RoleForm {data} />
		</CardContent>
	</Card>
</div>
