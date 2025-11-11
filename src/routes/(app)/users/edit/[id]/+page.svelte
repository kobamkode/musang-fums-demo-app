<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UserForm from './user-form.svelte';
	import type { EditUserSchema } from '$lib/schemas';
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditUserSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Edit User</CardHeader>
		<CardContent>
			<UserForm {data} />
		</CardContent>
	</Card>
</div>
