import { getAtgData } from "$lib/api"
import type { Atg } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, url }) => {
	const fuelStation = url.searchParams.get('fs')
	const tankLabel = url.searchParams.get('t')
	const dataloggerId = url.searchParams.get('dl')
	const atg: Atg[] = await getAtgData(locals, fuelStation ?? "", tankLabel ?? "", dataloggerId ?? "")
	return { atg }
}
