<script lang="ts">
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import PermissionForm from './permission-form.svelte';
	import type { PermissionSchema } from '$lib/schemas';
	import type { Company, Role, User } from '$lib/types';
	import { Card, CardHeader, CardContent } from '$lib/components/ui/card';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<PermissionSchema>>;
			users: User[];
			companies: Company[];
			roles: Role[];
		};
	} = $props();
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Edit Permission</CardHeader>
		<CardContent>
			<PermissionForm {data} />
		</CardContent>
	</Card>
</div>
