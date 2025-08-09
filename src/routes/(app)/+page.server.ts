import { fail, redirect, type Actions } from "@sveltejs/kit";
import { toast } from "svelte-sonner"

export const actions: Actions = {
        logout: async ({ cookies, fetch }) => {
                const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        },
                });

                if (!response.ok) {
                        toast(response.statusText)
                        return fail(response.status, {
                                error: response.statusText,
                        });
                }

                cookies.delete('fumsauth', { path: '/' })
                throw redirect(303, '/login')
        }
}
