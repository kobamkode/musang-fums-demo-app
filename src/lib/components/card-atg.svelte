<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		noUpdate: boolean;
		since: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		children,
		noUpdate,
		since,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	class={cn(
		'flex flex-col gap-6 rounded-xl border bg-card pb-6 text-card-foreground shadow-sm',
		className
	)}
	{...restProps}
>
	{#if noUpdate}
		<div class="mb-4 rounded-t-xl bg-red-800 p-4">
			<p class="text-center">No Update since {since}</p>
		</div>
	{/if}
	{@render children?.()}
</div>
