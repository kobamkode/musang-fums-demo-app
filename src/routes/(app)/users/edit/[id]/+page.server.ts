import { findUser, updateUser } from '$lib/api';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from './$types';
import type { User } from '$lib/types';
import { editUserSchema } from '$lib/schemas';


export const load: PageServerLoad = async ({ locals, params }) => {
	const userInfo: User[] = await findUser(locals, `id=${params.id}`)
	const user = {
		id: userInfo[0].id,
		email: userInfo[0].email,
		name: userInfo[0].name,
	}
	const form = await superValidate(user, zod4(editUserSchema))
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		if (event.params.id === undefined) {
			return fail(400, {
				message: 'params id not found'
			})
		}

		const form = await superValidate(event, zod4(editUserSchema))
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

