import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
	const authToken = cookies.get('fumsauth')
	if (authToken) {
		const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
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
