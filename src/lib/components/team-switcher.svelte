<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { toast } from 'svelte-sonner';

	// This should be `Component` after @lucide/svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let {
		teams,
		activeTeam = $bindable()
	}: {
		teams: { name: string; logo: any; code: string }[];
		activeTeam: { name: string; logo: any; code: string };
	} = $props();
	const sidebar = useSidebar();

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

{#if activeTeam}
	<Sidebar.Menu>
		<Sidebar.MenuItem>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuButton
							{...props}
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<activeTeam.logo class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">
									{activeTeam.name}
								</span>
							</div>
							<ChevronsUpDownIcon class="ml-auto" />
						</Sidebar.MenuButton>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content
					class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
					align="start"
					side={sidebar.isMobile ? 'bottom' : 'right'}
					sideOffset={4}
				>
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
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Sidebar.MenuItem>
	</Sidebar.Menu>
{/if}
