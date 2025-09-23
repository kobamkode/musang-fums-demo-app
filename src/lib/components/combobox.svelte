<script lang="ts">
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';

	let {
		value = $bindable(),
		items = [],
		placeholder = '',
		searchPlaceholder = '',
		emptyText = '',
		valueKey = 'value',
		labelKey = 'label'
	} = $props();

	let open = $state(false);
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(items.find((item) => item[valueKey] === value)?.[labelKey]);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-[200px] justify-between"
				{...props}
				role="combobox"
				aria-expanded={open}
			>
				{selectedValue || placeholder}
				<ChevronsUpDownIcon class="ml-2 size-4 shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder={searchPlaceholder} />
			<Command.List>
				<Command.Empty>{emptyText}</Command.Empty>
				<Command.Group>
					{#each items as item}
						<Command.Item
							value={item[valueKey]}
							onSelect={() => {
								console.log(item[valueKey]);
								value = item[valueKey];
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon
								class={cn('mr-2 size-4', value !== item[valueKey] && 'text-transparent')}
							/>
							{item[labelKey]}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
