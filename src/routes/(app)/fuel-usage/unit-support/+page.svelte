<script lang="ts">
	import DataTableFuelUsage from '$lib/components/data-table-fuel-usage.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { columns } from '../columns';
	const { data } = $props();
	const assetTypes = [
		'fire truck',
		'mesin las',
		'mesin compressor',
		'pompa',
		'sarana manhaul',
		'tower lamp',
		'genset trust',
		'genset bek',
		'genset'
	];
	let selectedAssetType = $state<string>(assetTypes?.[0] ?? '');
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Unit Support</CardHeader>
		<CardContent>
			<Tabs.Root bind:value={selectedAssetType} class="w-full">
				<Tabs.List>
					{#each assetTypes as assetType}
						<Tabs.Trigger value={assetType}>{assetType}</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#if selectedAssetType === 'fire truck'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.fireTruck} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'mesin las'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.mesinLas} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'mesin compressor'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage
							assetType={selectedAssetType}
							{columns}
							data={data.mesinCompressor}
						/>
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'pompa'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.pompa} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'sarana manhaul'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.saranaManhaul} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'tower lamp'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.towerLamp} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'genset trust'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.gensetTrust} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'genset bek'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.gensetBek} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'genset'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.genset} />
					</Tabs.Content>
				{/if}
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
