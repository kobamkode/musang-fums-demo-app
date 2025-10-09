<script lang="ts">
	import DataTableFuelUsage from '$lib/components/data-table-fuel-usage.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { columns } from '../columns';
	const { data } = $props();
	const assetTypes = ['tangki kontraktor', 'fuel truck kontraktor'];
	let selectedAssetType = $state<string>(assetTypes?.[0] ?? '');
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Contractor</CardHeader>
		<CardContent>
			<Tabs.Root bind:value={selectedAssetType} class="w-full">
				<Tabs.List>
					{#each assetTypes as assetType}
						<Tabs.Trigger value={assetType}>{assetType}</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#if selectedAssetType === 'tangki kontraktor'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage
							{columns}
							assetType={selectedAssetType}
							data={data.contractorTank}
						/>
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'fuel truck kontraktor'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage
							{columns}
							assetType={selectedAssetType}
							data={data.contractorFuelTruck}
						/>
					</Tabs.Content>
				{/if}
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
