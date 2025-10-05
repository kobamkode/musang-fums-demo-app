import { BotIcon, CircleGauge, FileDown, Fuel, House } from '@lucide/svelte'

export const navMain = [
	{
		title: 'Home',
		url: '/',
		icon: House,
		isActive: false
	},
	{
		title: 'IFuel',
		url: '/stations',
		icon: Fuel,
		isActive: true,
		items: [
			{
				title: 'Fixed Stations',
				url: '/stations'
			},
			{
				title: 'Fuel trucks',
				url: '/trucks'
			}
		]
	},
	{
		title: 'ATG',
		url: '/atg',
		icon: CircleGauge,
		isActive: false
	},
	{
		title: 'Fuel Usage',
		url: '',
		icon: CircleGauge,
		isActive: true,
		items: [
			{
				title: 'Heavy Equipment',
				url: '/fuel-usage/heavy-equipment'
			},
			{
				title: 'Unit Support',
				url: '/fuel-usage/unit-support'
			},
			{
				title: 'Contractor',
				url: '/fuel-usage/contractor'
			},
			{
				title: 'Site Dump Truck',
				url: '/fuel-usage/sdt'
			},
			{
				title: 'Light Vehicle',
				url: '/fuel-usage/lv'
			},
		]
	},
	{
		title: 'Data Loader',
		url: '/dataloader',
		icon: FileDown,
		isActive: false
	}

]

export const navAdmin = [
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

// Function to generate breadcrumbs from navigation structure
export function generateBreadcrumbs(currentPath: string) {
	const allNavItems = [...navMain, ...navAdmin];
	const breadcrumbs: Array<{ label: string; href?: string }> = [];

	// Always start with Home if not on home page
	if (currentPath !== '/') {
		breadcrumbs.push({ label: 'Home', href: '/' });
	}

	// Find matching navigation items
	for (const navItem of allNavItems) {
		// Check main item
		if (navItem.url === currentPath && navItem.url !== '/') {
			breadcrumbs.push({ label: navItem.title });
			break;
		}

		// Check sub-items
		if (navItem.items) {
			const matchingSubItem = navItem.items.find(item => item.url === currentPath);
			if (matchingSubItem) {
				// Add parent if it has a valid URL
				if (navItem.url && navItem.url !== '#') {
					breadcrumbs.push({ label: navItem.title, href: navItem.url });
				} else {
					breadcrumbs.push({ label: navItem.title });
				}
				breadcrumbs.push({ label: matchingSubItem.title });
				break;
			}
		}
	}

	// Fallback: if no match found, generate from path
	if (breadcrumbs.length === 0 || (breadcrumbs.length === 1 && currentPath !== '/')) {
		const segments = currentPath.split('/').filter(Boolean);
		segments.forEach((segment, index) => {
			const label = segment.charAt(0).toUpperCase() + segment.slice(1);
			const href = index < segments.length - 1 ? '/' + segments.slice(0, index + 1).join('/') : undefined;
			breadcrumbs.push({ label, href });
		});
	}

	return breadcrumbs;
}

