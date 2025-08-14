<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select';
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

	const form = superForm(data.form, {
		validators: zod4Client(formSchema),
		onError: ({ result }) => toast.error(result.error.message),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('permission created successfully!');
				goto('/permission');
			}
		}
	});
	const { form: formData, enhance } = form;

	let selectedUser = $derived(data.users.find((r) => String(r.id) === $formData.user_id));
	let selectedUserLabel = $derived(selectedUser?.name || 'Select a user');
	let selectedCompany = $derived(data.companies.find((r) => String(r.id) === $formData.company_id));
	let selectedCompanyLabel = $derived(selectedCompany?.name || 'Select a company');
	let selectedRole = $derived(data.roles.find((r) => String(r.id) === $formData.role_id));
	let selectedRoleLabel = $derived(selectedRole?.name || 'Select a role');
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="user_id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>User</Form.Label>
				<Select.Root type="single" bind:value={$formData.user_id} name={props.name}>
					<Select.Trigger class="w-full" {...props}>
						{selectedUserLabel}
					</Select.Trigger>
					<Select.Content>
						{#each data.users as user}
							<Select.Item value={String(user.id)} label={user.name} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="company_id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Company</Form.Label>
				<Select.Root type="single" bind:value={$formData.company_id} name={props.name}>
					<Select.Trigger class="w-full" {...props}>
						{selectedCompanyLabel}
					</Select.Trigger>
					<Select.Content>
						{#each data.companies as company}
							<Select.Item value={String(company.id)} label={company.name} />
						{/each}
					</Select.Content>
				</Select.Root>
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
						{selectedRoleLabel}
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
	<Form.Button>Submit</Form.Button>
</form>
