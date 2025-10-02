import { fail, redirect, type Actions } from "@sveltejs/kit";
import { API_BASE_URL } from "$env/static/private";

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

		cookies.set('fumsauth', JSON.stringify(user.data), {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 1,
			path: '/'
		});


		throw redirect(303, "/")
	}
}
