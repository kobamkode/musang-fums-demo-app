<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { getInitials } from '$lib/utils';
	import BadgeCheckIcon from '@lucide/svelte/icons/badge-check';
	import BellIcon from '@lucide/svelte/icons/bell';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import { toast } from 'svelte-sonner';

	let {
		user,
		teams,
		activeTeam = $bindable()
	}: {
		user: { name: string; email: string };
		teams: { name: string; logo: any; code: string }[];
		activeTeam: { name: string; logo: any; code: string };
	} = $props();
	const sidebar = useSidebar();

	const logout = async () => {
		try {
			const response = await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				invalidateAll();
			}
		} catch (error) {
			toast.error(`Failed to logout: ${error}`);
		}
	};

	const setActiveTeam = async (team: { name: string; logo: any; code: string }) => {
		try {
			const response = await fetch('/api/team', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ teamCode: team.code })
			});

			if (response.ok) {
				activeTeam = team;
				invalidateAll();
			}
		} catch (error) {
			toast.error(`Failed to set active team: ${error}`);
		}
	};
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Fallback class="rounded-lg">{getInitials(user.name)}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDownIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<!-- <DropdownMenu.Label class="p-0 font-normal"> -->
				<!-- 	<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"> -->
				<!-- 		<Avatar.Root class="size-8 rounded-lg"> -->
				<!-- 			<Avatar.Fallback class="rounded-lg">{getInitials(user.name)}</Avatar.Fallback> -->
				<!-- 		</Avatar.Root> -->
				<!-- 		<div class="grid flex-1 text-left text-sm leading-tight"> -->
				<!-- 			<span class="truncate font-medium">{user.name}</span> -->
				<!-- 			<span class="truncate text-xs">{user.email}</span> -->
				<!-- 		</div> -->
				<!-- 	</div> -->
				<!-- </DropdownMenu.Label> -->

				<DropdownMenu.Label class="text-xs text-muted-foreground">Teams</DropdownMenu.Label>
				{#each teams as team (team.name)}
					<DropdownMenu.Item onSelect={() => setActiveTeam(team)} class="gap-2 p-2">
						<div class="flex size-6 items-center justify-center rounded-md border">
							<team.logo class="size-3.5 shrink-0" />
						</div>
						{team.name}
					</DropdownMenu.Item>
				{/each}
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<button class="flex w-full items-center gap-2 text-left" onclick={() => logout()}>
						<LogOutIcon />
						Log out
					</button>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
