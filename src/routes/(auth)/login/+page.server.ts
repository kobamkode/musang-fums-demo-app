import { fail, redirect, type Actions } from "@sveltejs/kit";
import { NODE_ENV } from "$env/static/private";

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

                const response = await fetch('http://localhost:8080/api/v1/auth/login', {
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

                cookies.set('fumsauth', JSON.stringify(user.Data), {
                        httpOnly: true,
                        secure: NODE_ENV === 'production',
                        sameSite: 'strict',
                        maxAge: 60 * 60 * 24 * 1,
                        path: '/'
                });


                throw redirect(303, "/")
        }
}
