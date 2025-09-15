<script lang="ts">
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import NavMain from './nav-main.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import type { ProcessedPermission } from '$lib/types';
	import NavUserOrg from './nav-user-org.svelte';
	import { navAdmin, navMain } from '$lib/navigations';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		user,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		user: {
			name: string | undefined;
			email: string | undefined;
			perms: ProcessedPermission[] | null | undefined;
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
					code: c.company_code,
					logo: GalleryVerticalEndIcon
				}));
			}

			return [
				{
					name: 'No Company',
					code: '',
					active: true,
					logo: GalleryVerticalEndIcon
				}
			];
		},
		active: () => {
			if (user.perms) {
				const act = user.perms.find((c) => {
					return c.company_active === true;
				});
				if (act) {
					return {
						name: act.company_name,
						code: act.company_code,
						logo: GalleryVerticalEndIcon
					};
				}
			}
			return {
				name: 'Select Company',
				code: '',
				active: true,
				logo: GalleryVerticalEndIcon
			};
		},
		navMain,
		navAdmin
	};
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<NavUserOrg user={data.userInfo} teams={data.companies()} activeTeam={data.active()} />
		<!-- <TeamSwitcher teams={data.companies()} activeTeam={data.active()} /> -->
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavMain items={data.navAdmin} />
	</Sidebar.Content>
	<Sidebar.Rail />
</Sidebar.Root>
