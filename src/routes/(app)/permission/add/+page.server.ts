import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { formSchema } from './schema';
import { fail, type Actions } from '@sveltejs/kit';
import { createPermission, getAllCompanies, getAllRoles, getAllUsers } from '../../../../api';
import type { PageServerLoad } from './$types';
import type { User } from '../../users/columns';

export const load: PageServerLoad = async ({ locals }) => {
        const users: User[] = await getAllUsers(locals)
        const companies: User[] = await getAllCompanies(locals)
        const roles: User[] = await getAllRoles(locals)
        const form = await superValidate(zod4(formSchema))
        return { users, companies, roles, form }
}

export const actions: Actions = {
        default: async (event) => {
                const form = await superValidate(event, zod4(formSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const result = await createPermission(event.locals, form.data)
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        }
}

