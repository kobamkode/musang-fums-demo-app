import { fail, superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from './$types';
import type { Role } from '../../../roles/columns';
import { formSchema } from './schema';
import type { User } from '../../columns';

export const load: PageServerLoad = async ({ locals, params }) => {
        if (params.id !== undefined) {
                // Update user
                const userInfo: User[] = await findUser(locals, `id=${params.id}`)
                const roleInfo: Role[] = await findRole(locals, `id=${userInfo[0].role}`)
                const user: User = {
                        id: userInfo[0].id,
                        email: userInfo[0].email,
                        name: userInfo[0].name,
                        role: roleInfo[0].name
                }
                const form = await superValidate(user, zod4(formSchema))
                const roles: Role[] = await getAllRoles(locals);
                const isUpdate = true
                return { roles, form, isUpdate }
        }

        // Create user
        const roles: Role[] = await getAllRoles(locals);
        const form = await superValidate(zod4(formSchema))
        const isUpdate = false
        return { roles, form, isUpdate }
}

export const actions: Actions = {
        add: async (event) => {
                const form = await superValidate(event, zod4(formSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const role = await findRole(event.locals, `name=${form.data.role}`)
                const result = await createUser(event.locals, form.data, role[0].id)
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        },
        edit: async (event) => {
                if (event.params.id === undefined) {
                        return fail(400, {
                                message: 'Bad Request'
                        })
                }

                const form = await superValidate(event, zod4(formSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const role = await findRole(event.locals, `name=${form.data.role}`)

                const result = await updateUser(event.locals, form.data, role[0].id, Number(event.params.id))
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        },
        delete: async () => {

        }
}

const createUser = async (
        locals: App.Locals,
        data: {
                name: string;
                email: string;
                password: string;
                role: string;
        },
        role_id: number

) => {

        const response = await fetch('http://localhost:8080/api/v1/users', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        role_id: role_id
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

const updateUser = async (
        locals: App.Locals,
        data: {
                name: string;
                email: string;
                role: string;
        },
        role_id: number,
        user_id: number
) => {

        const response = await fetch(`http://localhost:8080/api/v1/users/${user_id}`, {
                method: 'PUT',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
                body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        role_id: role_id
                })
        });

        if (!response.ok) {
                return {
                        error: {
                                status: response.status,
                                message: response.statusText
                        }
                }
        }
}

const getAllRoles = async (locals: App.Locals) => {
        const response = await fetch('http://localhost:8080/api/v1/roles', {
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

const findRole = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('name=')) {
                                const name = param.split('=')[1];
                                params.append('name', name);
                        } else if (param.includes('id=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }

        const response = await fetch(`http://localhost:8080/api/v1/roles${queryString}`, {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
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

const findUser = async (locals: App.Locals, ...query: string[]) => {
        let queryString = ''

        if (query.length > 0) {
                const params = new URLSearchParams();

                for (const param of query) {
                        if (param.includes('email=')) {
                                const email = param.split('=')[1];
                                params.append('email', email);
                        } else if (param.includes('id=')) {
                                const id = param.split('=')[1];
                                params.append('id', id);
                        }
                }

                queryString = params.toString() ? `?${params.toString()}` : '';
        }
        const response = await fetch(`http://localhost:8080/api/v1/users${queryString}`, {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${locals.user?.token}`,
                },
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
