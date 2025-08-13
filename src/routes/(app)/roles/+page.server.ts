import type { Role } from "./columns";
import { deleteRole, getAllRoles } from "../../../api";
import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
        const roles: Role[] = await getAllRoles(locals);
        return { roles }
}

export const actions: Actions = {
        delete: async (event) => {
                const formData = event.request.formData()
                const id = (await formData).get('id')?.toString()
                if (id === undefined) {
                        return fail(400, {
                                message: 'params id not found'
                        })
                }

                const result = await deleteRole(event.locals, Number(id))
                if (result?.error) {
                        return fail(result.error.status, {
                                message: result.error.message
                        })
                }
                return { result }
        }
}
