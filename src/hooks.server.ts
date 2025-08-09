import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
        if (event.url.pathname !== '/login') {
                const authCookie = event.cookies.get('fumsauth')
                if (!authCookie) {
                        throw redirect(303, '/login')
                }

                const { email, token } = JSON.parse(authCookie)
                const response = await fetch(`http://localhost:8080/api/v1/users?email=${email}`, {
                        method: 'GET',
                        headers: {
                                'Authorization': `Bearer ${token}`,
                        }
                })

                if (!response.ok) {
                        event.cookies.delete('fumsauth', { path: '/' })
                        throw redirect(303, '/login')
                }

                const { Data } = await response.json()

                const user = {
                        'id': Data[0].id,
                        'name': Data[0].name,
                        'email': Data[0].email,
                        'token': token,
                        'role': Data[0].role,
                }

                event.locals.user = user
        }

        return resolve(event)
}
