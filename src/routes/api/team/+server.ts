import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { teamCode } = await request.json();

	cookies.set('activeTeam', teamCode, {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 30 // 30 days
	});

	return json({ success: true });
};
