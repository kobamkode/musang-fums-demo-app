import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, type Actions } from '@sveltejs/kit';
import { findRole, updateRole } from '$lib/api';
import type { PageServerLoad } from '../../$types';
import { roleSchema } from '$lib/schemas';
import type { Role } from '$lib/types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const roleInfo: Role[] = await findRole(locals, `id=${params.id}`)
	const role = {
		name: roleInfo[0].name,
	}
	const form = await superValidate(role, zod4(roleSchema))
	return { form }
}

export const actions: Actions = {
	default: async (event) => {
		if (event.params.id === undefined) {
			return fail(400, {
				message: 'params id not found'
			})
		}

		const form = await superValidate(event, zod4(roleSchema))
		if (!form.valid) {
			return fail(400, { form })

		}
		const result = await updateRole(event.locals, form.data, Number(event.params.id))
		if (result?.error) {
			return fail(result.error.status, {
				form,
				message: result.error.message
			})
		}

		return { form }
	}
}

