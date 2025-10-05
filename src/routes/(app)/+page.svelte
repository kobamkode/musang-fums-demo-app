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
		<CardHeader class="text-xl">Automatic Tank Gauging (ATG)</CardHeader>
		<CardContent class="flex flex-wrap gap-4">
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
		</CardContent>
	</Card>

	<Card class="w-full">
		<CardHeader class="text-xl">iFuel - Fixed Stations</CardHeader>
		<CardContent class="flex flex-wrap gap-4">
			{#each data.fixedPercentageVariance as variance}
				<SectionFixedTransaction panel={variance} type="variance" />
			{/each}
			{#each data.fixedIOLastShiftTrans as lastIO}
				<SectionFixedTransaction panel={lastIO} type="last" />
			{/each}
			{#each data.fixedIOCurrentShiftTrans as currentIO}
				<SectionFixedTransaction panel={currentIO} type="current" />
			{/each}
		</CardContent>
	</Card>

	<Card class="w-full">
		<CardHeader class="text-xl">iFuel - Fuel Trucks</CardHeader>
		<CardContent class="flex flex-wrap gap-4">
			{#each data.mobileIOLastShiftTrans as lastIOMobile}
				<SectionFixedTransaction panel={lastIOMobile} type="lastMobile" />
			{/each}
		</CardContent>
	</Card>
</div>
