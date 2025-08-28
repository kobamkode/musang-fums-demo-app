import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { deleteCompany, getAllCompanies, getAllCountries } from "$lib/api";
import type { Company, Country } from "$lib/types";

export const load: PageServerLoad = async ({ locals }) => {
	const companies: Company[] = await getAllCompanies(locals);
	const countries: Country[] = await getAllCountries(locals);
	return { companies, countries }
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

		const result = await deleteCompany(event.locals, Number(id))
		if (result?.error) {
			return fail(result.error.status, {
				message: result.error.message
			})
		}
		return { result }
	}
}
