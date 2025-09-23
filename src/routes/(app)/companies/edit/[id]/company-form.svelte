<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import type { Country } from '$lib/types';
	import { companySchema, type CompanySchema } from '$lib/schemas';
	import { tick } from 'svelte';
	import { useId } from 'bits-ui';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';
	import * as Command from '$lib/components/ui/command';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<CompanySchema>>;
			countries: Country[];
		};
	} = $props();

	const form = superForm(data.form, {
		validators: zod4Client(companySchema),
		onError: ({ result }) => toast.error(result.error.message),
		onUpdated: ({ form }) => {
			if (form.valid) {
				toast.success('company updated successfully!');
				goto('/companies');
			}
		}
	});
	const { form: formData, enhance } = form;
	let open = $state(false);
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	const triggerId = useId();
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} class="w-[400px]" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="code">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Code</Form.Label>
				<Input {...props} bind:value={$formData.code} class="w-[400px]" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="country_id">
		<Popover.Root bind:open>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Country</Form.Label>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-[400px] justify-between',
							!$formData.country_id && 'text-muted-foreground'
						)}
						role="combobox"
						{...props}
					>
						{data.countries.find((f) => f.alpha2 === $formData.country_id)?.name ??
							'Select country'}
						<ChevronsUpDownIcon class="opacity-50" />
					</Popover.Trigger>
					<input hidden value={$formData.country_id} name={props.name} />
				{/snippet}
			</Form.Control>

			<Popover.Content class="w-[400px] p-0">
				<Command.Root>
					<Command.Input autofocus placeholder="Search language..." class="h-9" />
					<Command.Empty>No language found.</Command.Empty>
					<Command.Group value="languages">
						{#each data.countries as country (country.alpha2)}
							<Command.Item
								value={country.name}
								onSelect={() => {
									$formData.country_id = country.alpha2;
									closeAndFocusTrigger(triggerId);
								}}
							>
								{country.name}
								<CheckIcon
									class={cn('ml-auto', country.name !== $formData.country_id && 'text-transparent')}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Update</Form.Button>
</form>
