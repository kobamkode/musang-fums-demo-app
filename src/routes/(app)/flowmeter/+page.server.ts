import { getAllFlowmeterDevices } from "$lib/api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
        const flowmeterDevices = await getAllFlowmeterDevices(locals);
        return { flowmeterDevices }
}
