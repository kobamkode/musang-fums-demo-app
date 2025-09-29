<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import type { PanelIO } from '$lib/types';

	const { panel, shift }: { panel: PanelIO; shift: string } = $props();
</script>

<div class="w-72">
	<Card.Root class="@container/card">
		<Card.Header>
			{#if shift == 'last'}
				<Card.Description>
					<p>
						{panel.location} Last Shift Transaction
					</p>
					<p>
						{panel.shift_start} - {panel.shift_end}
					</p>
				</Card.Description>
				<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<p>
						OUT: {panel.outlets_volume} ℓ
					</p>
					<p>
						IN: {panel.inlets_volume} ℓ
					</p>
				</Card.Title>
			{/if}
			{#if shift == 'current'}
				<Card.Description>
					<p>
						{panel.location} Current Shift Transaction
					</p>
					<p>
						last in: {panel.in_update}
					</p>
					<p>
						last out: {panel.out_update}
					</p>
				</Card.Description>
				<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<p>
						OUT: {panel.outlets_volume} ℓ
					</p>
					<p>
						IN: {panel.inlets_volume} ℓ
					</p>
				</Card.Title>
			{/if}
		</Card.Header>
	</Card.Root>
</div>
