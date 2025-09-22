<script lang="ts">
	import { TriangleAlert } from '@lucide/svelte';

	let { status, noUpdate }: { status: string; noUpdate: boolean } = $props();
</script>

<div class="h-15 w-15 content-center">
	{#if noUpdate === true}
		<TriangleAlert />
	{:else}
		<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
			{#if status === 'normal'}
				<circle cx="20" cy="25" r="15" fill="#22c55e" stroke="#16a34a" stroke-width="2">
					<animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
				</circle>
			{/if}

			{#if status === 'critical'}
				<circle cx="20" cy="25" r="15" fill="#ef4444" stroke="#dc2626" stroke-width="2">
					<animate attributeName="r" values="15;18;15" dur="1s" repeatCount="indefinite" />
					<animate attributeName="opacity" values="1;0.4;1" dur="0.8s" repeatCount="indefinite" />
				</circle>
			{/if}
		</svg>
	{/if}
</div>
