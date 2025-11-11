<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto } from '$app/navigation';
	import { Search } from '@lucide/svelte';

	let { p, loc }: { p: string; loc: string } = $props();

	const handleDetail = (p: string, loc: string) => {
		goto(`/trucks/details?p=${p}&loc=${loc}`);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="default"
				size="icon"
				class="relative size-8 bg-secondary p-0 text-secondary-foreground"
				onclick={() => {
					handleDetail(p, loc);
				}}
			>
				<span class="sr-only">Show Fuel Truck</span>
				<Search />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
</DropdownMenu.Root>
