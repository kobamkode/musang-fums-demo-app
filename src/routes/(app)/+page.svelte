<script lang="ts">
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
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
		<CardHeader class="text-xl">👋 {greeting} {data.user?.name}!</CardHeader>
		<CardContent></CardContent>
	</Card>
</div>
