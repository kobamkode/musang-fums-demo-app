// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Local } from "$lib/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Local
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
