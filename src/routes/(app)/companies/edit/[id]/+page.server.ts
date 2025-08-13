import { superValidate } from 'sveltekit-superforms';
import { zod4 } from "sveltekit-superforms/adapters";
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';
import { formSchema } from '../../add/schema';
import { findCompany, findCountry, getAllCountries, updateCompany } from '../../../../../api';
import type { Company, Country } from '../../columns';

export const load: PageServerLoad = async ({ locals, params }) => {
        const countries: Country[] = await getAllCountries(locals);
        const companyInfo: Company[] = await findCompany(locals, `id=${params.id}`)
        const countryInfo: Country[] = await findCountry(locals, `alpha2=${companyInfo[0].country_id}`)
        const company = {
                name: companyInfo[0].name,
                code: companyInfo[0].code,
                country_id: countryInfo[0].alpha2
        }
        const form = await superValidate(company, zod4(formSchema))
        return { form, countries }
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
                const result = await updateCompany(event.locals, form.data, Number(event.params.id))
                if (result?.error) {
                        return fail(result.error.status, {
                                form,
                                message: result.error.message
                        })
                }

                return { form }
        }
}

