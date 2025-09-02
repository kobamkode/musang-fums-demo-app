<script lang="ts">
	import { AreaChart } from 'layerchart';
	import { curveNatural } from 'd3-shape';
	import { scaleUtc } from 'd3-scale';
	import * as Chart from '$lib/components/ui/chart/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import type { Atg } from '$lib/types';

	let { atg }: { atg: Atg[] } = $props();

	// Calculate P90 helper function
	function calculateP90(values: number[]): number {
		if (values.length === 0) return 0;
		const sorted = values.sort((a, b) => a - b);
		const index = Math.ceil(sorted.length * 0.9) - 1;
		return sorted[Math.max(0, index)];
	}

	// Transform ATG data to chart format with P90 calculations
	const chartData = (() => {
		// Group by date
		const groupedData = atg.reduce(
			(acc, item) => {
				const date = new Date(item.date_update).toISOString().split('T')[0];
				if (!acc[date]) {
					acc[date] = {
						volumes: [],
						waterVolumes: []
					};
				}
				acc[date].volumes.push(item.volume);
				acc[date].waterVolumes.push(item.water_volume);
				return acc;
			},
			{} as Record<string, { volumes: number[]; waterVolumes: number[] }>
		);

		// Get date range
		const dates = Object.keys(groupedData).sort();
		const startDate = new Date(dates[0]);
		const endDate = new Date(dates[dates.length - 1]);

		// Generate all dates in range
		const allData = [];
		const currentDate = new Date(startDate);

		while (currentDate <= endDate) {
			const dateStr = currentDate.toISOString().split('T')[0];
			const hasData = groupedData[dateStr];

			allData.push({
				date: new Date(currentDate),
				product: hasData ? calculateP90(hasData.volumes) : null,
				water: hasData ? calculateP90(hasData.waterVolumes) : null
			});

			currentDate.setDate(currentDate.getDate() + 1);
		}

		return allData;
	})();

	const chartConfig = {
		product: { label: 'Product', color: 'var(--chart-1)' },
		water: { label: 'Water', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Product Chart</Card.Title>
		<Card.Description>Showing daily product volume</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<AreaChart
				data={chartData}
				x="date"
				xScale={scaleUtc()}
				yPadding={[0, 25]}
				series={[
					{
						key: 'water',
						label: 'water',
						color: chartConfig.water.color
					},
					{
						key: 'product',
						label: 'Product',
						color: chartConfig.product.color
					}
				]}
				seriesLayout="stack"
				props={{
					area: {
						curve: curveNatural,
						'fill-opacity': 0.4,
						line: { class: 'stroke-1' },
						motion: 'tween',
						defined: (d: any) => d.product !== null && d.water !== null
					},
					xAxis: {
						ticks: chartData.length,
						format: (v: Date) => v.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
					},
					yAxis: { format: () => '' }
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip
						labelFormatter={(v: Date) => {
							return v.toLocaleDateString('en-US', {
								day: 'numeric',
								month: 'long'
							});
						}}
						indicator="line"
					/>
				{/snippet}
			</AreaChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
