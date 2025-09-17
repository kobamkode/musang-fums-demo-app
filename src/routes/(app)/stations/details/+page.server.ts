import { getFlowmeterData } from "$lib/api"
import type { Flowmeter } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals, url }) => {
	const panelId = url.searchParams.get('p')
	const location = url.searchParams.get('loc')
	const flowmeters: Flowmeter[] = await getFlowmeterData(locals, panelId ?? "", location ?? "")
	return { flowmeters }
}
