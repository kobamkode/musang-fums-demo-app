<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PanelIO } from '$lib/types';

	const { panel, shift }: { panel: PanelIO; shift: string } = $props();

	function formatTimestamp(timestamp: string): string {
		return timestamp.replace(' +0000 UTC', '');
	}
</script>

<div class="w-72">
	<Card.Root class="@container/card h-70">
		<Card.Header>
			{#if shift == 'last'}
				<Card.Description>Last Shift Transaction</Card.Description>
				<Card.Description>{panel.location}</Card.Description>
				<Separator />
				<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<table class="w-full">
						<tbody>
							<tr>
								<td class="font-light">IN</td>
								<td class="text-right">{panel.inlets_volume} ℓ</td>
							</tr>
							<tr>
								<td class="font-light">OUT</td>
								<td class="text-right">{panel.outlets_volume} ℓ</td>
							</tr>
						</tbody>
					</table>
				</Card.Title>
				<Separator />
				<div class="flex flex-col">
					<div>Inlet last update</div>
					<div>{formatTimestamp(panel.in_update)}</div>
					<div>Outlet last update</div>
					<div>{formatTimestamp(panel.out_update)}</div>
				</div>
			{/if}
			{#if shift == 'current'}
				<Card.Description>Current Shift Transaction</Card.Description>
				<Card.Description>{panel.location}</Card.Description>
				<Separator />
				<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
					<table class="w-full">
						<tbody>
							<tr>
								<td class="font-light">IN</td>
								<td class="text-right">{panel.inlets_volume} ℓ</td>
							</tr>
							<tr>
								<td class="font-light">OUT</td>
								<td class="text-right">{panel.outlets_volume} ℓ</td>
							</tr>
						</tbody>
					</table>
				</Card.Title>
				<Separator />
				<div class="flex flex-col">
					<div>Inlet last update</div>
					<div>{formatTimestamp(panel.in_update)}</div>
					<div>Outlet last update</div>
					<div>{formatTimestamp(panel.out_update)}</div>
				</div>
			{/if}
		</Card.Header>
	</Card.Root>
</div>
