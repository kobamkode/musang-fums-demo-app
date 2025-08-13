<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { formSchema, type FormSchema } from '../../add/schema';
	import type { Country } from '../../columns';
	import * as Select from '$lib/components/ui/select';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			countries: Country[];
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zod4Client(formSchema),
		onError: ({ result }) => toast.error(result.error.message),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('company updated successfully!');
				goto('/companies');
			}
		}
	});
	const { form: formData, enhance } = form;

	let selectedCountry = $derived(data.countries.find((r) => r.alpha2 === $formData.country_id));
	let selectedItemLabel = $derived(selectedCountry?.name || 'Select a country');
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
	<Form.Field {form} name="code">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Code</Form.Label>
				<Input {...props} bind:value={$formData.code} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="country_id">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Country</Form.Label>
				<Select.Root type="single" bind:value={$formData.country_id} name={props.name}>
					<Select.Trigger class="w-full" {...props}>
						{selectedItemLabel}
					</Select.Trigger>
					<Select.Content>
						{#each data.countries as country}
							<Select.Item value={country.alpha2} label={country.name} />
						{/each}
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
