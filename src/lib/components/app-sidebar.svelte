<script lang="ts">
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
					company_code: '',
					company_name: '',
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
							company_code: string;
							company_name: string;
							role_id: number;
						}
				  ]
				| undefined;
		};
	} = $props();
	const data = {
		userInfo: {
			name: user.name ? user.name : '',
			email: user.email ? user.email : ''
		},
		companies: () => {
			if (user.perms) {
				return user.perms.map((c) => ({
					name: c.company_name,
					logo: GalleryVerticalEndIcon
				}));
			} else {
				return [
					{
						name: 'No Company',
						logo: GalleryVerticalEndIcon
					}
				];
			}
		},
		navMain: [
			{
				title: 'Monitoring',
				url: '#',
				icon: SquareTerminalIcon,
				isActive: true,
				items: [
					{
						title: 'ATG',
						url: '/atg'
					},
					{
						title: 'Flowmeter',
						url: '/flowmeter'
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
		<TeamSwitcher teams={data.companies()} />
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
