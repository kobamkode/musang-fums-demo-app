import type { PageServerLoad } from "./$types";
import { getAllAtgDevices } from "$lib/api";

export const load: PageServerLoad = async ({ locals }) => {
	const atgDevices = await getAllAtgDevices(locals);
	return { atgDevices }
}
