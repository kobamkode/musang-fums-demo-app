<script lang="ts">
	import DataTableFuelUsage from '$lib/components/data-table-fuel-usage.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { columns } from '../columns';
	const { data } = $props();
	const assetTypes = ['compact', 'crane truck', 'dozer', 'drilling', 'dump truck', 'excavator'];
	let selectedAssetType = $state<string>(assetTypes?.[0] ?? '');
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Heavy Equipment</CardHeader>
		<CardContent>
			<Tabs.Root bind:value={selectedAssetType} class="w-full">
				<Tabs.List>
					{#each assetTypes as assetType}
						<Tabs.Trigger value={assetType}>{assetType}</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#if selectedAssetType === 'compact'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.compacts} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'crane truck'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.crane} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'dozer'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.dozer} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'drilling'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.drilling} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'excavator'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.excavator} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'dump truck'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.dumptruck} />
					</Tabs.Content>
				{/if}
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
