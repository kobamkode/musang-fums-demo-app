<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import UserForm from './user-form.svelte';
	import type { UserSchema } from '$lib/schemas';
	import { Card, CardContent } from '$lib/components/ui/card';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<UserSchema>>;
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Add User</CardHeader>
		<CardContent>
			<UserForm {data} />
		</CardContent>
	</Card>
</div>
