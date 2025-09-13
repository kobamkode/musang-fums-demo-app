import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFlowmeterData } from '$lib/api';
import type { Flowmeter } from '$lib/types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { panelId, location, start, end } = await request.json();
	const flowmeters: Flowmeter[] = await getFlowmeterData(locals, panelId, location, start, end)
	return json({ flowmeters });
};
