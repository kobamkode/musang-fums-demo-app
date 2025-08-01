<script lang="ts" module>
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import BotIcon from '@lucide/svelte/icons/bot';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';

	// This is sample data.
	const data = {
		user: {
			name: 'Mario',
			email: 'mario@musangten.com'
		},
		companies: [
			{
				name: 'Musang TEN',
				logo: GalleryVerticalEndIcon
			},
			{
				name: 'ITM',
				logo: AudioWaveformIcon
			}
		],
		navMain: [
			{
				title: 'Monitoring',
				url: '#',
				icon: SquareTerminalIcon,
				isActive: true,
				items: [
					{
						title: 'ATG',
						url: '#'
					},
					{
						title: 'Flowmeter',
						url: '#'
					}
				]
			},
			{
				title: 'Admin',
				url: '#',
				icon: BotIcon,
				items: [
					{
						title: 'Company',
						url: '#'
					},
					{
						title: 'Users',
						url: '#'
					},
					{
						title: 'Roles',
						url: '#'
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.companies} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
