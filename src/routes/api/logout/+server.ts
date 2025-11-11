import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ cookies }) => {
	// for session approach
	// const tokenCookie = cookies.get('token')
	// if (tokenCookie) {
	// 	const response = await fetch(`${API_BASE_URL}/v1/auth/logout`, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});
	//
	// 	if (!response.ok) {
	// 		console.error('Logout failed:', response.statusText);
	// 	}
	// }

	cookies.delete('token', { path: '/' })
	cookies.delete('profile', { path: '/' })
	throw redirect(303, '/login')
};
