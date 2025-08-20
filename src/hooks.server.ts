import { redirect, type Handle } from "@sveltejs/kit"

interface Permission {
        id: number;
        user_id: number;
        company_id: number;
        role_id: number;
        is_deleted: boolean;
}

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
                let user: {
                        id: string
                        name: string
                        email: string
                        token: string
                        perms: any
                }

                if (permData != null) {
                        const companyIds = [...new Set(permData
                                .filter((perm: Permission) => !perm.is_deleted)
                                .map((perm: Permission) => perm.company_id))]

                        const companiesResponse = await fetch(`http://localhost:8080/api/v1/companies?id=${companyIds.join(',')}`, {
                                method: 'GET',
                                headers: {
                                        'Authorization': `Bearer ${token}`,
                                }
                        })

                        const companyCodeMap = new Map<number, string>()
                        const companyNameMap = new Map<number, string>()
                        if (companiesResponse.ok) {
                                const { Data: companiesData } = await companiesResponse.json()
                                companiesData.forEach((company: any) => {
                                        companyCodeMap.set(company.id, company.code)
                                        companyNameMap.set(company.id, company.name)
                                })
                        }

                        const perms = permData
                                .filter((perm: Permission) => !perm.is_deleted)
                                .map((perm: Permission) => ({
                                        id: perm.id,
                                        user_id: perm.user_id,
                                        company_id: perm.company_id,
                                        company_code: companyCodeMap.get(perm.company_id) || "",
                                        company_name: companyNameMap.get(perm.company_id) || "",
                                        role_id: perm.role_id
                                }))

                        user = {
                                'id': userData.id,
                                'name': userData.name,
                                'email': userData.email,
                                'token': token,
                                'perms': perms
                        }

                } else {
                        user = {
                                'id': userData.id,
                                'name': userData.name,
                                'email': userData.email,
                                'token': token,
                                'perms': null
                        }


                }

                event.locals.user = user

        }

        return resolve(event)
}
