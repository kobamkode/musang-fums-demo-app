import { getFuelUsagesByType } from "$lib/api";
import type { FuelUsage } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const compacts: FuelUsage[] = await getFuelUsagesByType(locals, 'COMPACT');
	const crane: FuelUsage[] = await getFuelUsagesByType(locals, 'CRANE TRUCK');
	const dozer: FuelUsage[] = await getFuelUsagesByType(locals, 'DOZER');
	const drilling: FuelUsage[] = await getFuelUsagesByType(locals, 'DRILLING');
	const dumptruck: FuelUsage[] = await getFuelUsagesByType(locals, 'DUMP TRUCK');
	const excavator: FuelUsage[] = await getFuelUsagesByType(locals, 'EXCAVATOR');

	return { compacts, crane, dozer, drilling, dumptruck, excavator }
}
