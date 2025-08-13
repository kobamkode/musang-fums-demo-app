import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { editFormSchema } from './schema';
import type { Actions, PageServerLoad } from './$types';
import type { User } from '../../columns';
import type { Role } from '../../../roles/columns';
import { fail } from '@sveltejs/kit';
import { findRole, findUser, getAllRoles, updateUser } from '../../../../../api';

export const load: PageServerLoad = async ({ locals, params }) => {
        const userInfo: User[] = await findUser(locals, `id=${params.id}`)
        const roleInfo: Role[] = await findRole(locals, `id=${userInfo[0].role_id}`)
        const user = {
                id: userInfo[0].id,
                email: userInfo[0].email,
                name: userInfo[0].name,
                role_id: roleInfo[0].id,
        }
        const form = await superValidate(user, zod4(editFormSchema))
        const roles: Role[] = await getAllRoles(locals);
        return { roles, form }
}

export const actions: Actions = {
        default: async (event) => {
                if (event.params.id === undefined) {
                        return fail(400, {
                                message: 'params id not found'
                        })
                }

                const form = await superValidate(event, zod4(editFormSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const result = await updateUser(event.locals, form.data, Number(event.params.id))
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        }
}

