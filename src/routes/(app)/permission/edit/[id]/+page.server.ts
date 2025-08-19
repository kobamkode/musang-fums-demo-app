import { zod4 } from "sveltekit-superforms/adapters"
import { findPermission, getAllCompanies, getAllRoles, getAllUsers, updatePermission } from "$lib/api"
import { formSchema } from "../../schema"
import type { Permission } from "../../columns"
import type { Actions, PageServerLoad } from "./$types"
import { superValidate } from "sveltekit-superforms"
import { fail } from "@sveltejs/kit"
import type { User } from "../../../users/columns"

export const load: PageServerLoad = async ({ locals, params }) => {
        const users: User[] = await getAllUsers(locals)
        const companies: User[] = await getAllCompanies(locals)
        const roles: User[] = await getAllRoles(locals)
        const permissionInfo: Permission[] = await findPermission(locals, `id=${params.id}`)
        const permission = {
                user_id: String(permissionInfo[0].user_id),
                company_id: String(permissionInfo[0].company_id),
                role_id: String(permissionInfo[0].role_id),
        }
        const form = await superValidate(permission, zod4(formSchema))
        return { users, companies, roles, form }
}

export const actions: Actions = {
        default: async (event) => {
                if (event.params.id === undefined) {
                        return fail(400, {
                                message: 'params id not found'
                        })
                }

                const form = await superValidate(event, zod4(formSchema))
                if (!form.valid) {
                        return fail(400, { form })

                }
                const result = await updatePermission(event.locals, form.data, Number(event.params.id))
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        }
}

