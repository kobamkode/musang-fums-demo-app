import { getAllAtgDevices } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
        const atgDevices = await getAllAtgDevices(locals);
        return { atgDevices }
}
