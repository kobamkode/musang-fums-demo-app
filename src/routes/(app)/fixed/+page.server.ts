import { findFixedFlowmeterByCC } from "$lib/api";
import type { FlowmeterDevice } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const panels: FlowmeterDevice[] = await findFixedFlowmeterByCC(locals);
	return { panels }
}
