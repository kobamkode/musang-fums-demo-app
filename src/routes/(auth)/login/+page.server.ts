import { fail, redirect, type Actions } from "@sveltejs/kit";
import { API_BASE_URL } from "$env/static/private";
import { LIVE_VIEW_ACCOUNT } from "$env/static/private";
import { encrypt } from "$lib/crypto";

export const actions: Actions = {
	login: async ({ request, cookies, fetch }) => {
		const data = await request.formData()
		const email = data.get("email") as string
		const password = data.get("password") as string

		if (!email || !password) {
			return fail(400, {
				error: "Email and password are required", email
			})
		}

		const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			return fail(response.status, {
				error: response.statusText, email
			});
		}

		const user = await response.json();

		const maxAge = user.data.email === `${LIVE_VIEW_ACCOUNT}`
			? 60 * 60 * 24 * 365
			: 60 * 60 * 24 * 1;

		const tokenHashed = await encrypt(user.data.token)

		cookies.set('token', tokenHashed, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge,
			path: '/'
		});

		cookies.set('profile', JSON.stringify({ email: user.data.email }), {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge,
			path: '/'
		});


		throw redirect(303, "/")
	}
}
