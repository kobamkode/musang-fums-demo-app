import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from './$types';
import type { Role } from '../../roles/columns';
import { formSchema } from './schema';
import { createUser, getAllRoles } from '../api';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
        const roles: Role[] = await getAllRoles(locals);
        const form = await superValidate(zod4(formSchema))
        return { roles, form }
}

export const actions: Actions = {
        default: async (event) => {
                const form = await superValidate(event, zod4(formSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const result = await createUser(event.locals, form.data)
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        }
}

