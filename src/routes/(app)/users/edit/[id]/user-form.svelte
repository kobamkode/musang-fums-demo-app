<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { editFormSchema, type EditFormSchema } from './schema';
	import type { Role } from '../../../roles/columns';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<EditFormSchema>>;
			roles: Role[];
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

	let selectedRole = $derived(data.roles.find((r) => String(r.id) === $formData.role_id));
	let selectedItemLabel = $derived(selectedRole?.name || 'Select a role');
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
	<Form.Field {form} name="role_id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Role</Form.Label>
				<Select.Root type="single" bind:value={$formData.role_id} name={props.name}>
					<Select.Trigger class="w-full" {...props}>
						{selectedItemLabel}
					</Select.Trigger>
					<Select.Content>
						{#each data.roles as role}
							<Select.Item value={String(role.id)} label={role.name} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
