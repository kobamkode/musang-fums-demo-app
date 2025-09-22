import { getGroupedAtgData } from "$lib/api"
import type { ATG } from "$lib/types"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
	const atg: ATG[] = await getGroupedAtgData(locals)
	return { atg }
}
