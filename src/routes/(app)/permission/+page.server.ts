import { fail, type Actions } from "@sveltejs/kit";
import { deletePermission, getAllCompanies, getAllPermissions, getAllRoles, getAllUsers } from "$lib/api";
import type { PageServerLoad } from "./$types";
import type { Company, Permission, Role, User } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
	const users: User[] = await getAllUsers(locals);
	const roles: Role[] = await getAllRoles(locals);
	const companies: Company[] = await getAllCompanies(locals);
	const permission: Permission[] = await getAllPermissions(locals);
	return { users, roles, companies, permission }
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

		const result = await deletePermission(event.locals, Number(id))
		if (result?.error) {
			return fail(result.error.status, {
				message: result.error.message
			})
		}
		return { result }
	}
}
