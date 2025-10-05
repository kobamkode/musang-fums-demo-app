import { getFuelUsagesByType } from "$lib/api";
import type { FuelUsage } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const genset: FuelUsage[] = await getFuelUsagesByType(locals, 'GENSET');
	const gensetTrust: FuelUsage[] = await getFuelUsagesByType(locals, 'GENSET TRUST');
	const gensetBek: FuelUsage[] = await getFuelUsagesByType(locals, 'GENSET BEK');
	const mesinLas: FuelUsage[] = await getFuelUsagesByType(locals, 'MESIN LAS');
	const mesinCompressor: FuelUsage[] = await getFuelUsagesByType(locals, 'MESIN COMPRESSOR');
	const fuelTruck: FuelUsage[] = await getFuelUsagesByType(locals, 'FUEL TRUCK');
	const forkLift: FuelUsage[] = await getFuelUsagesByType(locals, 'FORKLIFT');
	const fireTruck: FuelUsage[] = await getFuelUsagesByType(locals, 'FIRE TRUCK');
	const saranaManhaul: FuelUsage[] = await getFuelUsagesByType(locals, 'SARANA MANHAUL');
	const towerLamp: FuelUsage[] = await getFuelUsagesByType(locals, 'TOWER LAMP');
	const pompa: FuelUsage[] = await getFuelUsagesByType(locals, 'POMPA');

	return { genset, gensetTrust, gensetBek, mesinLas, mesinCompressor, fuelTruck, forkLift, fireTruck, saranaManhaul, towerLamp, pompa }
}
