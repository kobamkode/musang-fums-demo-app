import { getFuelUsagesByType } from "$lib/api";
import type { FuelUsage } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const lvBek: FuelUsage[] = await getFuelUsagesByType(locals, 'LV BEK');
	const lvTrust: FuelUsage[] = await getFuelUsagesByType(locals, 'LV TRUST');
	const lvKontraktor: FuelUsage[] = await getFuelUsagesByType(locals, 'LV KONTRAKTOR');

	return { lvBek, lvTrust, lvKontraktor }
}
