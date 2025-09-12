import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getAtgData } from '$lib/api';
import type { ATG } from '$lib/types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { fuelStation, tankLabel, dataloggerId, start, end } = await request.json();
	const atg: ATG[] = await getAtgData(locals, fuelStation, tankLabel, dataloggerId, start, end)
	return json({ atg });
};
