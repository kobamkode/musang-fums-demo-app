import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createUser } from '$lib/api';
import { userSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(userSchema))
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(userSchema))
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

