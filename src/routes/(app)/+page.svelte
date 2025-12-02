<script lang="ts">
	import StatusActions from '$lib/components/status-actions.svelte';
	import TankDashboard from '$lib/components/tank-dashboard.svelte';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { onDestroy, onMount } from 'svelte';
	import SectionTransaction from './section-transaction.svelte';
	import { invalidate } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { Clock, RefreshCw } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { browser } from '$app/environment';

	let { data } = $props();

	let refreshInterval = $state<ReturnType<typeof setInterval> | null>(null);
	let isManualRefreshing = $state(false);
	let isAutoRefreshing = $state(false);
	let lastRefreshTime = $state(new Date());

	let isLoading = $derived(isManualRefreshing || isAutoRefreshing);

	let refreshIconClass = $derived(`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`);
	let loadingRefreshIconClass = $derived(
		`h-4 w-4 animate-spin ${isLoading ? 'text-blue-600' : ''}`
	);

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

	let formattedLastRefresh = $derived(
		lastRefreshTime.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
	);

	// Auto-refresh function
	async function autoRefresh() {
		if (isLoading) return; // Prevent overlapping refreshes

		isAutoRefreshing = true;
		try {
			await invalidate('app:dashboard-data');
			lastRefreshTime = new Date();
			toast.success('Dashboard data refreshed automatically');
		} catch (error) {
			console.error('Auto-refresh error:', error);
			toast.error('Failed to refresh data automatically');
		} finally {
			isAutoRefreshing = false;
		}
	}

	// Setup auto-refresh using onMount/onDestroy for better control
	onMount(() => {
		if (browser) {
			lastRefreshTime = new Date();

			// Set up the interval
			refreshInterval = setInterval(autoRefresh, 60 * 1000); // 1 minute

			// Handle visibility change to pause/resume when tab is hidden/shown
			const handleVisibilityChange = () => {
				if (document.hidden) {
					if (refreshInterval) {
						clearInterval(refreshInterval);
						refreshInterval = null;
					}
				} else {
					if (!refreshInterval) {
						refreshInterval = setInterval(autoRefresh, 60 * 1000);
					}
				}
			};

			document.addEventListener('visibilitychange', handleVisibilityChange);

			return () => {
				document.removeEventListener('visibilitychange', handleVisibilityChange);
			};
		}
	});

	onDestroy(() => {
		if (refreshInterval) {
			clearInterval(refreshInterval);
			refreshInterval = null;
		}
	});

	async function handleManualRefresh() {
		if (isLoading) return; // Prevent multiple simultaneous refreshes

		isManualRefreshing = true;
		try {
			await invalidate('app:dashboard-data');
			lastRefreshTime = new Date();
			toast.success('Dashboard data refreshed manually');
		} catch (error) {
			toast.error('Failed to refresh data');
			console.error('Refresh error:', error);
		} finally {
			isManualRefreshing = false;
		}
	}
</script>

{#if isLoading}
	<div
		class="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-lg"
	>
		<RefreshCw class={loadingRefreshIconClass} />
		<span class="text-sm font-medium">Refreshing data...</span>
	</div>
{/if}

<div class="flex flex-col gap-4">
	<Card>
		<CardHeader class="text-xl">
			<div class="flex flex-row gap-4">
				<div class="flex-auto text-xl">
					👋 {greeting}
					{data.user?.name}!
				</div>
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<Clock class="h-3 w-3" />
					Last updated: {formattedLastRefresh} • Auto-refresh every 1 minutes
				</div>
				<Button
					variant="outline"
					size="sm"
					onclick={handleManualRefresh}
					disabled={isLoading}
					class="gap-2 bg-secondary text-secondary-foreground"
				>
					<RefreshCw class={refreshIconClass} />
					Refresh
				</Button>
			</div>
		</CardHeader>
	</Card>

	<div class="flex gap-4">
		<Card class="w-[850px] bg-muted">
			<CardHeader class="text-xl font-bold lg:text-2xl">Automatic Tank Gauging (ATG)</CardHeader>
			<CardContent class="flex flex-wrap gap-4">
				{#each data.atgStats as atg}
					<Card class="w-full">
						<CardHeader class="flex items-center">
							<StatusActions status={atg.status} noUpdate={atg.noUpdate} />
							<Separator orientation="vertical" />
							<p class="lg:text-2xl">{atg.location} - {atg.tank_label}</p>
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
		<div class="flex w-[100%] flex-col gap-4">
			<Card class="w-full bg-muted">
				<CardHeader class="text-xl font-bold lg:text-2xl">iFuel - Fixed Stations</CardHeader>
				<CardContent class="flex flex-wrap gap-4">
					<!-- {#each data.fixedPercentageVariance as variance} -->
					<!-- 	<SectionTransaction panel={variance} type="variance" /> -->
					<!-- {/each} -->
					{#each data.fixedIOLastShiftTrans as lastIO}
						<SectionTransaction panel={lastIO} type="last" />
					{/each}
					{#each data.fixedIOCurrentShiftTrans as currentIO}
						<SectionTransaction panel={currentIO} type="current" />
					{/each}
					{#each data.fixedInputMonthlyCumTrans as monthlyCumIn}
						<SectionTransaction panel={monthlyCumIn} type="monthlycumin" />
					{/each}
				</CardContent>
			</Card>

			<Card class="w-full bg-muted">
				<CardHeader class="text-xl font-bold lg:text-2xl">iFuel - Fuel Trucks</CardHeader>
				<CardContent class="flex flex-wrap gap-4">
					{#each data.mobileIOLastShiftTrans as lastIOMobile}
						<SectionTransaction panel={lastIOMobile} type="lastMobile" />
					{/each}
				</CardContent>
			</Card>
		</div>
	</div>

	<Card class="w-full bg-muted">
		<CardHeader class="text-xl font-black lg:text-2xl">Fuel Usage</CardHeader>
		<CardContent class="flex flex-wrap gap-4">
			<SectionTransaction panel={data.heavyEquipmentsVolumeCurrentMonth} type="fuelUsage" />
			<SectionTransaction panel={data.lightVehicleVolumeCurrentMonth} type="fuelUsage" />
			<SectionTransaction panel={data.siteDumpTruckVolumeCurrentMonth} type="fuelUsage" />
			<SectionTransaction panel={data.contractorsVolumeCurrentMonth} type="fuelUsage" />
			<SectionTransaction panel={data.unitSupportsVolumeCurrentMonth} type="fuelUsage" />
		</CardContent>
	</Card>
</div>
