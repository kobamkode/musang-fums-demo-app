import { getFixedIOCurrentShiftTrans, getFixedIOLastShiftTrans, getGroupedAtgData, getGroupedFixedData, getMobileIOLastShiftTrans, getPercentageVariance } from "$lib/api"
import type { ATG, FixedStat, PanelIO } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
	const groupedAtg: ATG[] = await getGroupedAtgData(locals)
	const atgStats = await Promise.all(
		groupedAtg.map(async (device) => {
			// Low is below 20%
			let isLow = false
			if (device.full_volume === 0) {
				isLow = true
			} else {
				isLow = device.volume < device.full_volume * 0.2;
			}

			let noUpdate = false
			if (device.date_update === undefined) {
				noUpdate = true
			} else {
				// noUpdate == true, if date_update no new change > 3 hours
				noUpdate = (Date.now() - new Date(device.date_update).getTime()) > (3 * 60 * 60 * 1000)
			}
			const status = isLow ? 'critical' : 'normal';

			return {
				status,
				noUpdate,
				location: device.location,
				fuel_station: device.fuel_station,
				tank_label: device.tank_label,
				datalogger_id: device.datalogger_id,
				volume: device.volume,
				water_volume: device.water_volume,
				ullage: device.ullage,
				temp: device.temp,
				date_update: device.date_update
			};
		})
	);

	const fixedIOLastShiftTrans: PanelIO[] = await getFixedIOLastShiftTrans(locals)
	const mobileIOLastShiftTrans: PanelIO[] = await getMobileIOLastShiftTrans(locals)
	const fixedIOCurrentShiftTrans: PanelIO[] = await getFixedIOCurrentShiftTrans(locals)
	const fixedPercentageVariance: PanelIO[] = await getPercentageVariance(locals)

	const fixedStats: FixedStat[] = await getGroupedFixedData(locals)

	return { atgStats, fixedStats, fixedIOLastShiftTrans, fixedIOCurrentShiftTrans, fixedPercentageVariance, mobileIOLastShiftTrans }
}
