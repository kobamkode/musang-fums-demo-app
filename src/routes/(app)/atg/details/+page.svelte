<script lang="ts">
	import DataTableAtg from '$lib/components/data-table-atg.svelte';
	import Tank from '$lib/components/tank.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import type { ATG } from '$lib/types';
	import { atgColumns } from './columns';

	let {
		data
	}: {
		data: {
			atg: ATG[];
		};
	} = $props();
	const latest = data.atg[0];
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">Tank Info</CardHeader>
		<CardContent>
			<Tank
				product={latest.volume}
				water={latest.water_volume}
				ullage={latest.ullage}
				temp={latest.temp}
				lastUpdate={latest.date_update}
				location={latest.location}
				fuelStation={latest.fuel_station}
				dataloggerId={latest.datalogger_id}
				tankLabel={latest.tank_label}
			/>
		</CardContent>
	</Card>
	<Card>
		<CardHeader class="text-xl">Tank Data</CardHeader>
		<CardContent>
			<DataTableAtg data={data.atg} columns={atgColumns} />
		</CardContent>
	</Card>
</div>
