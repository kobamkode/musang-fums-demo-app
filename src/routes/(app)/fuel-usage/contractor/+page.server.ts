import { getFuelUsagesByType } from "$lib/api";
import type { FuelUsage } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const contractorTank: FuelUsage[] = await getFuelUsagesByType(locals, 'TANGKI KONTRAKTOR');
	const contractorFuelTruck: FuelUsage[] = await getFuelUsagesByType(locals, 'FUEL TRUCK KONTRAKTOR');

	return { contractorTank, contractorFuelTruck }
}
