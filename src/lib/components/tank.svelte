<script lang="ts">
	import { Thermometer } from '@lucide/svelte';
	let {
		waterHeightPercentage = 0,
		productHeightPercentage = 0,
		temp = null,
		lastUpdate = '',
		location = '',
		fuelStation = '',
		dataloggerId = '',
		tankLabel = '',
		// SVG dimensions for viewBox calculations
		svgWidth = 500,
		svgHeight = 400,
		tankWidth = 450,
		tankHeight = 250
	} = $props();

	// Reactive calculations
	let safeProductPercentage = $derived(Math.round(productHeightPercentage * 100));
	let safeWaterPercentage = $derived(Math.round(waterHeightPercentage * 100));
	let emptyPercentage = $derived(
		Math.round((1 - waterHeightPercentage - productHeightPercentage) * 100)
	);
</script>

<div class="flex flex-col gap-4 lg:flex-row lg:gap-4">
	<div class="flex flex-col items-center">
		<!-- Responsive container for SVG -->
		<div class="aspect-[5/4] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md xl:max-w-lg">
			<svg
				class="h-full w-full"
				viewBox="0 0 {svgWidth} {svgHeight}"
				preserveAspectRatio="xMidYMid meet"
			>
				<!-- Definitions for gradients -->
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

				<!-- Tank body - capsule shape -->
				<g transform="translate({svgWidth * 0.05}, {svgHeight / 2 - tankHeight / 2})">
					<!-- Tank outline - single capsule shape -->
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

					<!-- Fluid levels - clipped to tank shape -->
					<g clip-path="url(#tankClip)">
						<!-- Water level (bottom) -->
						<rect
							x="0"
							y={tankHeight * (1 - waterHeightPercentage)}
							width={tankWidth}
							height={tankHeight * waterHeightPercentage}
							fill="url(#waterGradient)"
						/>

						<!-- Product level (middle) -->
						<rect
							x="0"
							y={tankHeight * (1 - waterHeightPercentage - productHeightPercentage)}
							width={tankWidth}
							height={tankHeight * productHeightPercentage}
							fill="url(#productGradient)"
						/>

						<!-- Empty space (top) - no need to draw this explicitly -->
					</g>

					<!-- Level gauge line -->
					<line
						x1={tankWidth * 0.5}
						y1="0"
						x2={tankWidth * 0.5}
						y2={tankHeight}
						stroke="#333"
						stroke-width="1"
						stroke-dasharray="4 2"
					/>

					<!-- Level labels -->
					{#if productHeightPercentage > 0.1}
						<text
							x={tankWidth * 0.5}
							y={tankHeight * (1 - waterHeightPercentage - productHeightPercentage / 2)}
							text-anchor="middle"
							font-size="14"
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

					<!-- Glass effect overlay -->
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
		</div>

		<!-- Responsive legend -->
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

	<div class="border-t pt-4 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-4">
		<p class="mb-2 font-semibold">Tank Information</p>
		<table class="w-full text-sm">
			<tbody>
				<tr>
					<td class="py-1 pr-4 text-muted-foreground">Last Update</td>
					<td>{lastUpdate}</td>
				</tr>
				<tr>
					<td class="py-1 pr-4 text-muted-foreground">Location</td>
					<td>{location}</td>
				</tr>
				<tr>
					<td class="py-1 pr-4 text-muted-foreground">Fuel Station</td>
					<td>{fuelStation}</td>
				</tr>
				<tr>
					<td class="py-1 pr-4 text-muted-foreground">Datalogger Id</td>
					<td>{dataloggerId}</td>
				</tr>
				<tr>
					<td class="py-1 pr-4 text-muted-foreground">Tank Label</td>
					<td>{tankLabel}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
