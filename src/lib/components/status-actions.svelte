<script lang="ts">
	let { status, noUpdate }: { status: string; noUpdate: boolean } = $props();
</script>

<div class="justify-center">
	{#if noUpdate === true}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-triangle-alert"
			style="animation: blink 1s step-start infinite;"
		>
			<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
			<path d="M12 9v4" />
			<path d="M12 17h.01" />
		</svg>
		<style>
			@keyframes blink {
				0%,
				100% {
					opacity: 1;
				}
				50% {
					opacity: 0;
				}
			}
		</style>
	{:else}
		<svg width="24" height="24" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
			{#if status == 'normal'}
				<circle cx="25" cy="25" r="24" fill="#22c55e" stroke="#16a34a" stroke-width="2">
					<animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
				</circle>
			{/if}

			{#if status == 'critical'}
				<circle cx="25" cy="25" r="24" fill="#ef4444" stroke="#dc2626" stroke-width="2">
					<animate attributeName="r" values="15;18;15" dur="1s" repeatCount="indefinite" />
					<animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
				</circle>
			{/if}
		</svg>
	{/if}
</div>
