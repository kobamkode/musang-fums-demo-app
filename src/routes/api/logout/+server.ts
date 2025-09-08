import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { API_BASE_URL } from "$env/dynamic/private";

export const POST: RequestHandler = async ({ cookies }) => {
	const authToken = cookies.get('fumsauth')
	if (authToken) {
		const response = await fetch(`${API_BASE_URL}/v1/auth/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			console.error('Backend logout failed:', response.statusText);
		}
	}

	cookies.delete('fumsauth', { path: '/' })
	throw redirect(303, '/login')
};
