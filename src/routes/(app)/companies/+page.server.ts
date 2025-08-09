import { type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ locals }: ServerLoadEvent) {
        const response = await fetch('http://localhost:8080/api/v1/companies', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });


        if (!response.ok) {
                return {
                        companies: [],
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()

        return { companies: Data ? Data : [] }
}
