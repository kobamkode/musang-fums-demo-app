import { getAtgStatuses } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const atgDevices = await getAtgStatuses(locals);
	return { atgDevices }
}
