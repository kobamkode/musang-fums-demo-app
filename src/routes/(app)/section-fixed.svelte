<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	const { fixedStat } = $props();
</script>

<div class="w-72">
	<Card.Root class="@container/card">
		<Card.Header>
			<Card.Description>{fixedStat.location}</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{fixedStat.calculation} ℓ
			</Card.Title>
		</Card.Header>
	</Card.Root>
</div>
