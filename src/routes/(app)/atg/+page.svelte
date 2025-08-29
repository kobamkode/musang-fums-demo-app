<script lang="ts">
	import DataTable from '$lib/components/data-table.svelte';
	import Tank from '$lib/components/tank.svelte';
	import type { Atg } from '$lib/types';
	import { columns } from './columns';

	let {
		data
	}: {
		data: {
			atg: Atg[];
		};
	} = $props();
	const latest = data.atg[0];
</script>

<div class="flex flex-col gap-4">
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
	<DataTable data={data.atg} {columns} />
</div>
