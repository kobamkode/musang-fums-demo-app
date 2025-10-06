<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import type { PanelFuelUsage, PanelIO, PanelIOMobile, PanelVariance } from '$lib/types';

	const {
		panel,
		type
	}: { panel: PanelIO | PanelVariance | PanelIOMobile | PanelFuelUsage; type: string } = $props();

	function formatTimestamp(timestamp: string): string {
		return timestamp.replace(' +0000 UTC', '');
	}
</script>

<Card.Root class="@container/card h-72 w-72">
	<Card.Header>
		{#if type == 'variance'}
			<Card.Description>Variance</Card.Description>
			<Card.Description>{(panel as PanelVariance).location}</Card.Description>
			<Separator />
			<Card.Title class="text-right text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{(panel as PanelVariance).panel_variance} ℓ
			</Card.Title>
			<Separator />
			<div class="flex flex-col">
				<div class="flex">
					ROB
					<div class="w-full text-right font-semibold">
						{(panel as PanelVariance).rob_init_value} ℓ
					</div>
				</div>
				<div class="flex">
					Inlets
					<div class="w-full text-right font-semibold">
						{(panel as PanelVariance).variance_inlets_volume} ℓ
					</div>
				</div>
				<div class="flex">
					Outlets
					<div class="w-full text-right font-semibold">
						{(panel as PanelVariance).variance_outlets_volume} ℓ
					</div>
				</div>
			</div>
		{/if}
		{#if type == 'last'}
			<Card.Description>Last Shift Transaction</Card.Description>
			<Card.Description>{(panel as PanelIO).location}</Card.Description>
			<Separator />
			<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
				<table class="w-full">
					<tbody>
						<tr>
							<td class="font-light">IN</td>
							<td class="text-right">{(panel as PanelIO).inlets_volume} ℓ</td>
						</tr>
						<tr>
							<td class="font-light">OUT</td>
							<td class="text-right">{(panel as PanelIO).outlets_volume} ℓ</td>
						</tr>
					</tbody>
				</table>
			</Card.Title>
			<Separator />
			<div class="flex flex-col">
				<div>Inlet last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIO).in_update)}</div>
				<div>Outlet last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIO).out_update)}</div>
			</div>
		{/if}
		{#if type == 'current'}
			<Card.Description>Current Shift Transaction</Card.Description>
			<Card.Description>{(panel as PanelIO).location}</Card.Description>
			<Separator />
			<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
				<table class="w-full">
					<tbody>
						<tr>
							<td class="font-light">IN</td>
							<td class="text-right">{(panel as PanelIO).inlets_volume} ℓ</td>
						</tr>
						<tr>
							<td class="font-light">OUT</td>
							<td class="text-right">{(panel as PanelIO).outlets_volume} ℓ</td>
						</tr>
					</tbody>
				</table>
			</Card.Title>
			<Separator />
			<div class="flex flex-col">
				<div>Inlet last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIO).in_update)}</div>
				<div>Outlet last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIO).out_update)}</div>
			</div>
		{/if}
		{#if type == 'lastMobile'}
			<Card.Description>Total Last Shift Transaction</Card.Description>
			<Card.Description>{(panel as PanelIOMobile).fuel_truck}</Card.Description>
			<Separator />
			<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
				<table class="w-full">
					<tbody>
						<tr>
							<td class="font-light">OUT</td>
							<td class="text-right">{(panel as PanelIOMobile).outlets_volume} ℓ</td>
						</tr>
					</tbody>
				</table>
			</Card.Title>
			<Separator />
			<div class="flex flex-col">
				<div>Start shift</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIOMobile).start_update)}</div>
				<div>Last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelIOMobile).out_update)}</div>
			</div>
		{/if}
		{#if type == 'fuelUsage'}
			<Card.Description
				>{(panel as PanelFuelUsage).current_month} Fuel Usage Transaction</Card.Description
			>
			<Card.Description>{(panel as PanelFuelUsage).asset_category}</Card.Description>
			<Separator />
			<Card.Title class="text-xl font-semibold tabular-nums @[250px]/card:text-3xl">
				<table class="w-full">
					<tbody>
						<tr>
							<td class="font-light">OUT</td>
							<td class="text-right">{(panel as PanelFuelUsage).outlets_volume} ℓ</td>
						</tr>
					</tbody>
				</table>
			</Card.Title>
			<Separator />
			<div class="flex flex-col">
				<div>Last update</div>
				<div class="font-semibold">{formatTimestamp((panel as PanelFuelUsage).out_update)}</div>
			</div>
		{/if}
	</Card.Header>
</Card.Root>
