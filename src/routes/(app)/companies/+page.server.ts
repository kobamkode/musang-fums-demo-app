import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { deleteCompany, getAllCompanies } from "../../../api";
import type { Company } from "./columns";

export const load: PageServerLoad = async ({ locals }) => {
        const companies: Company[] = await getAllCompanies(locals);
        return { companies }
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
