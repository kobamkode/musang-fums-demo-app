import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getFuelUsagesByType } from '$lib/api';
import type { Flowmeter } from '$lib/types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { assetType, start, end } = await request.json();
	const flowmeters: Flowmeter[] = await getFuelUsagesByType(locals, assetType, start, end)
	return json({ flowmeters });
};
