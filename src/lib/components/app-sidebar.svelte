<script lang="ts">
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import BotIcon from '@lucide/svelte/icons/bot';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		user = {
			name: '',
			email: '',
			perms: [
				{
					user_id: 0,
					company_id: 0,
					role_id: 0
				}
			]
		},
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		user?: {
			name: string | undefined;
			email: string | undefined;
			perms:
				| [
						{
							user_id: number;
							company_id: number;
							role_id: number;
						}
				  ]
				| undefined;
		};
	} = $props();

	console.log(user);

	const data = {
		userInfo: {
			name: user.name ? user.name : '',
			email: user.email ? user.email : ''
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
			}
		],
		navAdmin: [
			{
				title: 'Admin',
				url: '#',
				icon: BotIcon,
				items: [
					{
						title: 'Companies',
						url: '/companies'
					},
					{
						title: 'Users',
						url: '/users'
					},
					{
						title: 'Roles',
						url: '/roles'
					},
					{
						title: 'Permissions',
						url: '/permission'
					}
				]
			}
		]
	};
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.companies} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavMain items={data.navAdmin} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.userInfo} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
