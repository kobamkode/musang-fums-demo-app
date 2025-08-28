import { deleteUser, getAllUsers } from '$lib/api';
import type { User } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const users: User[] = await getAllUsers(locals);
	return { users }
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

		const result = await deleteUser(event.locals, Number(id))
		if (result?.error) {
			return fail(result.error.status, {
				message: result.error.message
			})
		}
		return { result }
	}
}

