<script lang="ts">
	import DataTableFuelUsage from '$lib/components/data-table-fuel-usage.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import * as Tabs from '$lib/components/ui/tabs';
	import { columns } from '../columns';
	const { data } = $props();
	const assetTypes = ['lv bek', 'lv trust', 'lv kontraktor'];
	let selectedAssetType = $state<string>(assetTypes?.[0] ?? '');
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Light Vehicle</CardHeader>
		<CardContent>
			<Tabs.Root bind:value={selectedAssetType} class="w-full">
				<Tabs.List>
					{#each assetTypes as assetType}
						<Tabs.Trigger value={assetType}>{assetType}</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#if selectedAssetType === 'lv bek'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.lvBek} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'lv trust'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.lvTrust} />
					</Tabs.Content>
				{/if}
				{#if selectedAssetType === 'lv kontraktor'}
					<Tabs.Content value={selectedAssetType}>
						<DataTableFuelUsage assetType={selectedAssetType} {columns} data={data.lvKontraktor} />
					</Tabs.Content>
				{/if}
			</Tabs.Root>
		</CardContent>
	</Card>
</div>
