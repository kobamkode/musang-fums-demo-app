<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { goto } from '$app/navigation';
	import { Search } from '@lucide/svelte';

	let { fs, t, dl }: { id: string; fs: string; t: string; dl: string } = $props();

	const handleDetail = (fs: string, t: string, dl: string) => {
		goto(`/atg?fs=${fs}&t=${t}&dl=${dl}`);
	};
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="ghost"
				size="icon"
				class="relative size-8 p-0"
				onclick={() => {
					handleDetail(fs, t, dl);
				}}
			>
				<span class="sr-only">Show ATG</span>
				<Search />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
</DropdownMenu.Root>
