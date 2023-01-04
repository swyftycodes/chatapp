import { redirect } from "@sveltejs/kit"

export const load = async () => {
	throw redirect(302, '/')
}

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('session');

		throw redirect(302, '/login')
	}
}
