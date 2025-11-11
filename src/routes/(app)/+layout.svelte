<script lang="ts">
	import { page } from '$app/state';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Toaster } from '$lib/components/ui/sonner';
	import { generateBreadcrumbs } from '$lib/navigations';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.css';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';

	let { children, data } = $props();
	const user = {
		name: data.user?.name,
		email: data.user?.email,
		perms: data.user?.perms
	};

	const breadcrumbs = $derived(() => {
		return generateBreadcrumbs(page.url.pathname);
	});
</script>

<Toaster position="top-right" />
<ModeWatcher />

<Sidebar.Provider>
	<AppSidebar {user} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
		>
			<div class="flex w-full items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each breadcrumbs() as crumb, index}
							{#if index > 0}
								<Breadcrumb.Separator class="hidden md:block" />
							{/if}
							<Breadcrumb.Item class={index === 0 ? 'hidden md:block' : ''}>
								{#if crumb.href}
									<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
								{:else}
									<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
								{/if}
							</Breadcrumb.Item>
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>
			<ThemeToggle />
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
