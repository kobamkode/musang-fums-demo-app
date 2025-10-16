<script lang="ts">
	import Combobox from '$lib/components/combobox.svelte';
	import Datepicker from '$lib/components/datepicker.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';
	import { downloadBlob } from '$lib/utils.js';
	import type { DateValue } from '@internationalized/date';
	import { Loader2 } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';

	const { data } = $props();

	const locations = [...new Set(data.panels.map((f) => f.location))].map((location) => ({
		value: location,
		label: location
	}));

	// Filter panels based on selected location
	const filteredPanels = $derived(() => {
		if (!selectedLocation) {
			return [...new Set(data.panels.map((f) => f.panel_id))].map((panel) => ({
				value: panel,
				label: panel
			}));
		}

		return data.panels
			.filter((panel) => panel.location === selectedLocation)
			.map((panel) => ({
				value: panel.panel_id,
				label: panel.panel_id
			}));
	});

	let selectedLocation = $state<string | undefined>();
	let selectedPanel = $state<string | undefined>();
	let selectedDateFrom = $state<DateValue | undefined>();
	let selectedDateTo = $state<DateValue | undefined>();
	let isDownloading = $state(false);

	$effect(() => {
		if (selectedLocation !== undefined) {
			selectedPanel = undefined;
		}
	});

	const isPanelIdDisabled = $derived(selectedLocation ? false : true);

	const handleDownloadClick = async () => {
		if (selectedDateFrom && selectedDateTo) {
			isDownloading = true;
			try {
				const response = await fetch('/api/downloadMaximo', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						location: selectedLocation,
						panel: selectedPanel,
						start: selectedDateFrom.toString(),
						end: selectedDateTo.toString()
					})
				});

				if (response.ok) {
					const blob = await response.blob();
					const filename =
						response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') ||
						'maximo_reports.xlsx';
					downloadBlob(blob, filename);
				} else {
					const errorMessage = `Failed to fetch data: ${response.status} ${response.statusText}`;
					toast.error(errorMessage);
				}
			} catch (error) {
				toast.error(
					`Failed to find data: ${error instanceof Error ? error.message : 'Unknown error'}`
				);
			} finally {
				isDownloading = false;
			}
		} else {
			toast.warning('Please select both from and to dates');
		}
	};
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Data Loader (Maximo)</CardHeader>
		<CardContent class="flex flex-row gap-4">
			<div>
				Location
				<Combobox items={locations} placeholder="All" bind:value={selectedLocation} />
			</div>
			<div>
				Panel Id
				<Combobox
					items={filteredPanels()}
					placeholder="All"
					bind:value={selectedPanel}
					disabled={isPanelIdDisabled}
				/>
			</div>
			<div>
				From
				<Datepicker bind:value={selectedDateFrom} />
				To
				<Datepicker bind:value={selectedDateTo} />
			</div>
			<Button onclick={handleDownloadClick} disabled={isDownloading}>
				{#if isDownloading}
					<Spinner />
				{:else}
					Download Maximo
				{/if}
			</Button>
		</CardContent>
	</Card>
</div>
