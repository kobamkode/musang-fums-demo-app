import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, type Actions } from '@sveltejs/kit';
import { createRole } from '$lib/api';
import type { PageServerLoad } from './$types';
import { roleSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(roleSchema))
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(roleSchema))
		if (!form.valid) {
			return fail(400, { form })

		}
		const result = await createRole(event.locals, form.data)
		if (result?.error) {
			return fail(result.error.status, {
				form,
				message: result.error.message
			})
		}

		return { form }
	}
}

