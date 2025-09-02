import { findAtgByCC, getAtgData } from "$lib/api";
import type { Atg, ATGDevice } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const atgDevices: ATGDevice[] = await findAtgByCC(locals);

	const atgStats = await Promise.all(
		atgDevices.map(async (device) => {
			const atg: Atg = await getAtgData(locals, device.fuel_station, device.tank_label, device.datalogger_id);

			// Low is below 20%
			const isLow = atg.volume < atg.full_volume * 0.2;
			const noUpdate = (Date.now() - new Date(atg.date_update).getTime()) > (24 * 60 * 1000)
			const status = isLow ? 'critical' : 'normal';

			return {
				status,
				noUpdate,
				fuel_station: device.fuel_station,
				tank_label: device.tank_label,
				datalogger_id: device.datalogger_id,

			};
		})
	);

	return { atgStats };
}
