import { getFuelUsagesByType } from "$lib/api";
import type { FuelUsage } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const sdt: FuelUsage[] = await getFuelUsagesByType(locals, 'TRUCK SDT');

	return { sdt }
}
