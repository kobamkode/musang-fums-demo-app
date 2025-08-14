import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
        if (event.url.pathname !== '/login') {
                const authCookie = event.cookies.get('fumsauth')
                if (!authCookie) {
                        throw redirect(303, '/login')
                }

                const { email, token } = JSON.parse(authCookie)
                const userResponse = await fetch(`http://localhost:8080/api/v1/users?email=${email}`, {
                        method: 'GET',
                        headers: {
                                'Authorization': `Bearer ${token}`,
                        }
                })

                if (!userResponse.ok) {
                        event.cookies.delete('fumsauth', { path: '/' })
                        throw redirect(303, '/login')
                }

                const { Data: [userData] } = await userResponse.json()

                const permResponse = await fetch(`http://localhost:8080/api/v1/permissions?user=${userData.id}`, {
                        method: 'GET',
                        headers: {
                                'Authorization': `Bearer ${token}`,
                        }
                })

                if (!permResponse.ok) {
                        event.cookies.delete('fumsauth', { path: '/' })
                        throw redirect(303, '/login')
                }

                const { Data: permData } = await permResponse.json()

                const user = {
                        'id': userData.id,
                        'name': userData.name,
                        'email': userData.email,
                        'token': token,
                        'perms': permData
                }

                event.locals.user = user
        }

        return resolve(event)
}
