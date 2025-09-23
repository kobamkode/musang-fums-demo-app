<script lang="ts">
	import { Thermometer } from '@lucide/svelte';
	let {
		product = 0,
		water = 0,
		ullage = 0,
		temp = null,
		lastUpdate = '',
		location = '',
		fuelStation = '',
		dataloggerId = '',
		tankLabel = '',
		svgWidth = 300,
		svgHeight = 200,
		tankWidth = 270,
		tankHeight = 150
	}: {
		product?: number;
		water?: number;
		ullage?: number;
		temp?: number | null;
		lastUpdate?: string;
		location?: string;
		fuelStation?: string;
		dataloggerId?: string;
		tankLabel?: string;
		svgWidth?: number;
		svgHeight?: number;
		tankWidth?: number;
		tankHeight?: number;
	} = $props();

	let fullTankVolume = $derived(product + water + ullage);
	let productPercentage = $derived(Math.round((product / fullTankVolume) * 100));
	let waterPercentage = $derived(Math.round((water / fullTankVolume) * 100));
	let emptyPercentage = $derived(Math.round((ullage / fullTankVolume) * 100));

	let safeProductPercentage = $derived(Math.min(productPercentage, 100));
	let safeWaterPercentage = $derived(Math.min(waterPercentage, 100 - safeProductPercentage));

	let waterHeightPercentage = $derived(safeWaterPercentage / 100);
	let productHeightPercentage = $derived(safeProductPercentage / 100);

	let formattedLastUpdate = $derived(lastUpdate.replace('T', ' ').substring(0, 16));
</script>

<div>
	<svg viewBox="0 0 {svgWidth} {svgHeight}" preserveAspectRatio="xMidYMid meet">
		<defs>
			<linearGradient id="tankGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" stop-color="#b0b0b0" />
				<stop offset="20%" stop-color="#f0f0f0" />
				<stop offset="80%" stop-color="#b0b0b0" />
				<stop offset="100%" stop-color="#8a8a8a" />
			</linearGradient>
			<linearGradient id="productGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#704214" />
				<stop offset="50%" stop-color="#8B5A2B" />
				<stop offset="100%" stop-color="#704214" />
			</linearGradient>
			<linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stop-color="#2C7AAF" />
				<stop offset="50%" stop-color="#5DADE2" />
				<stop offset="100%" stop-color="#2C7AAF" />
			</linearGradient>

			<!-- Clip path for the tank -->
			<clipPath id="tankClip">
				<rect
					x="0"
					y="0"
					width={tankWidth}
					height={tankHeight}
					rx={tankHeight / 2}
					ry={tankHeight / 2}
				/>
			</clipPath>
		</defs>

		<g transform="translate({svgWidth * 0.05}, {svgHeight / 2 - tankHeight / 2})">
			<rect
				x="0"
				y="0"
				width={tankWidth}
				height={tankHeight}
				rx={tankHeight / 2}
				ry={tankHeight / 2}
				fill="url(#tankGradient)"
				stroke="#ccc"
				stroke-width="1"
			/>

			<g clip-path="url(#tankClip)">
				<rect
					x="0"
					y={tankHeight * (1 - waterHeightPercentage)}
					width={tankWidth}
					height={tankHeight * waterHeightPercentage}
					fill="url(#waterGradient)"
				/>

				<rect
					x="0"
					y={tankHeight * (1 - waterHeightPercentage - productHeightPercentage)}
					width={tankWidth}
					height={tankHeight * productHeightPercentage}
					fill="url(#productGradient)"
				/>
			</g>

			<line
				x1={tankWidth * 0.5}
				y1="0"
				x2={tankWidth * 0.5}
				y2={tankHeight}
				stroke="#333"
				stroke-width="1"
				stroke-dasharray="4 2"
			/>

			{#if productHeightPercentage > 0.1}
				<text
					x={tankWidth * 0.5}
					y={tankHeight * (1 - waterHeightPercentage - productHeightPercentage / 2)}
					text-anchor="middle"
					font-size="18"
					font-weight="bold"
					fill="white"
				>
					{safeProductPercentage}%
				</text>
			{/if}

			{#if waterHeightPercentage > 0.1}
				<text
					x={tankWidth * 0.5}
					y={tankHeight * (1 - waterHeightPercentage / 2)}
					text-anchor="middle"
					font-size="14"
					font-weight="bold"
					fill="white"
				>
					{safeWaterPercentage}%
				</text>
			{/if}

			<rect
				x="0"
				y="0"
				width={tankWidth}
				height={tankHeight}
				rx={tankHeight / 2}
				ry={tankHeight / 2}
				fill="white"
				fill-opacity="0.1"
				stroke="#333"
				stroke-width="1"
			/>
		</g>
	</svg>

	<div class="flex flex-wrap items-center justify-center gap-3 text-sm sm:gap-6">
		<div class="flex items-center">
			<div class="mr-2 h-4 w-4 rounded bg-amber-800"></div>
			<span>Product: {safeProductPercentage}%</span>
		</div>
		<div class="flex items-center">
			<div class="mr-2 h-4 w-4 rounded bg-blue-500"></div>
			<span>Water: {safeWaterPercentage}%</span>
		</div>
		<div class="flex items-center">
			<div class="mr-2 h-4 w-4 rounded border border-gray-300 bg-gray-200"></div>
			<span>Empty: {emptyPercentage}%</span>
		</div>
		<div class="flex items-center">
			<Thermometer size={18} />
			<span>{temp ?? 0}°C</span>
		</div>
	</div>
</div>
