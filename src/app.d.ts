// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
        namespace App {
                // interface Error {}
                interface Locals {
                        user?: {
                                id: string
                                name: string
                                email: string
                                token: string
                                perms: [
                                        {

                                                user_id: number
                                                company_id: number
                                                role_id: number
                                        }
                                ]
                        }
                }
                // interface PageData {}
                // interface PageState {}
                // interface Platform {}
        }
}

export { };
