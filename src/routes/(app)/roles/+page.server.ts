import { type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ locals }: ServerLoadEvent) {
        const response = await fetch('http://localhost:8080/api/v1/roles', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });


        if (!response.ok) {
                return {
                        roles: [],
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()

        return { roles: Data ? Data : [] }
}
