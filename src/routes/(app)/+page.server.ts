import { getContractorsFuelUsageTransaction, getFixedInputMonthlyCumTrans, getFixedIOCurrentShiftTrans, getFixedIOLastShiftTrans, getGroupedAtgData, getHeavyEquipmentsFuelUsageTransaction, getLightVehicleFuelUsageTransaction, getMobileIOLastShiftTrans, getSiteDumpTruckFuelUsageTransaction, getUnitSupportsFuelUsageTransaction } from "$lib/api"
import type { ATG, PanelFuelUsage, PanelInput, PanelIO, PanelIOMobile } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, depends }) => {
	depends('app:dashboard-data')
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
	const mobileIOLastShiftTrans: PanelIOMobile[] = await getMobileIOLastShiftTrans(locals)
	const fixedIOCurrentShiftTrans: PanelIO[] = await getFixedIOCurrentShiftTrans(locals)
	const fixedInputMonthlyCumTrans: PanelInput[] = await getFixedInputMonthlyCumTrans(locals)
	// const fixedPercentageVariance: PanelIO[] = await getPercentageVariance(locals)
	const heavyEquipmentsVolumeCurrentMonth: PanelFuelUsage = await getHeavyEquipmentsFuelUsageTransaction(locals)
	const unitSupportsVolumeCurrentMonth: PanelFuelUsage = await getUnitSupportsFuelUsageTransaction(locals)
	const contractorsVolumeCurrentMonth: PanelFuelUsage = await getContractorsFuelUsageTransaction(locals)
	const siteDumpTruckVolumeCurrentMonth: PanelFuelUsage = await getSiteDumpTruckFuelUsageTransaction(locals)
	const lightVehicleVolumeCurrentMonth: PanelFuelUsage = await getLightVehicleFuelUsageTransaction(locals)

	// const fixedStats: FixedStat[] = await getGroupedFixedData(locals)

	return {
		atgStats,
		// fixedStats,
		fixedIOLastShiftTrans,
		fixedIOCurrentShiftTrans,
		// fixedPercentageVariance,
		mobileIOLastShiftTrans,
		heavyEquipmentsVolumeCurrentMonth,
		unitSupportsVolumeCurrentMonth,
		contractorsVolumeCurrentMonth,
		siteDumpTruckVolumeCurrentMonth,
		lightVehicleVolumeCurrentMonth,
		fixedInputMonthlyCumTrans
	}
}
