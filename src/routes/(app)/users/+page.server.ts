import type { PageServerLoad } from './$types';
import type { User } from './columns';

export const load: PageServerLoad = async ({ locals }) => {
        const users: User[] = await getAllUsers(locals);

        return { users }
}

const getAllUsers = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                }
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }

        const { Data } = await response.json()
        return Data ? Data : []
}
