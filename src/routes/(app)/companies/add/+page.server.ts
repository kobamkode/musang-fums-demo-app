import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, type Actions } from '@sveltejs/kit';
import { createCompany, getAllCountries } from '$lib/api';
import type { PageServerLoad } from './$types';
import type { Country } from '$lib/types';
import { companySchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ locals }) => {
	const countries: Country[] = await getAllCountries(locals);
	const form = await superValidate(zod4(companySchema))
	return { form, countries }
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(companySchema))
		if (!form.valid) {
			return fail(400, { form })

		}
		const result = await createCompany(event.locals, form.data)
		if (result?.error) {
			return fail(result.error.status, {
				form,
				message: result.error.message
			})
		}

		return { form }
	}
}

