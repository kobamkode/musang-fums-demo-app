<script lang="ts">
	import StatusActions from '$lib/components/status-actions.svelte';
	import TankDashboard from '$lib/components/tank-dashboard.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SectionFixedTransaction from './section-fixed-transaction.svelte';
	let { data } = $props();

	function getTimeBasedGreeting(): string {
		const hour = new Date().getHours();

		if (hour >= 5 && hour < 12) {
			return 'Good morning';
		} else if (hour >= 12 && hour < 17) {
			return 'Good afternoon';
		} else if (hour >= 17 && hour < 22) {
			return 'Good evening';
		} else {
			return 'Good night';
		}
	}

	let greeting = $state(getTimeBasedGreeting());
</script>

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">
			👋 {greeting}
			{data.user?.name}!
		</CardHeader>
	</Card>

	<Card class="w-full">
		<CardHeader class="text-xl">ATG</CardHeader>
		<CardContent>
			<div class="flex gap-4">
				{#each data.atgStats as atg}
					<Card class="w-80">
						<CardHeader class="flex items-center">
							<StatusActions status={atg.status} noUpdate={atg.noUpdate} />
							<Separator orientation="vertical" />
							<p>{atg.location} - {atg.tank_label}</p>
						</CardHeader>
						<CardContent>
							<TankDashboard
								product={atg.volume}
								water={atg.water_volume}
								ullage={atg.ullage}
								temp={atg.temp}
								lastUpdate={atg.date_update}
								location={atg.location}
								fuelStation={atg.fuel_station}
								dataloggerId={atg.datalogger_id}
								tankLabel={atg.tank_label}
							/>
						</CardContent>
					</Card>
				{/each}
			</div>
		</CardContent>
	</Card>

	<Card class="w-full">
		<CardHeader class="text-xl">iFuel - Fixed Station</CardHeader>
		<CardContent class="flex gap-4">
			{#each data.fixedIOLastShiftTrans as lastIO}
				<SectionFixedTransaction panel={lastIO} shift="last" />
			{/each}
			{#each data.fixedIOCurrentShiftTrans as currentIO}
				<SectionFixedTransaction panel={currentIO} shift="current" />
			{/each}
		</CardContent>
	</Card>
</div>
