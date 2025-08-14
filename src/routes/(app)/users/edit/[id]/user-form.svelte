<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { editFormSchema, type EditFormSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditFormSchema>>;
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zod4Client(editFormSchema),
		onError: ({ result }) => toast.error(result.error.message),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('user updated successfully!');
				goto('/users');
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
