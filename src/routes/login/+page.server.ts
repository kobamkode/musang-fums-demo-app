import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
        login: async ({ request, fetch }) => {
                const data = await request.formData()
                const email = data.get("email") as string
                const password = data.get("password") as string

                if (!email || !password) {
                        return fail(400, {
                                error: "Email and password are required", email
                        })
                }

                try {
                        const response = await fetch('http://your-golang-api.com/auth/login', {
                                method: 'POST',
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ email, password })
                        });

                        if (!response.ok) {
                                return fail(401, {
                                        error: 'Invalid credentials',
                                        email
                                });
                        }

                        const result = await response.json();

                        throw redirect(303, '/');

                } catch (error) {
                        console.error('Login failed:', error);
                        return fail(500, {
                                error: 'Login failed. Please try again.',
                                email
                        });
                }
        }
}
