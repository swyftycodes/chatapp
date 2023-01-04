import { PrismaClient } from "@prisma/client";
import { fail, redirect } from "@sveltejs/kit";

const prisma = new PrismaClient();

export const actions = {
	login: async ({ cookies, request }) => {
		const body = Object.fromEntries(await request.formData());

		const user = await prisma.users.findUnique({
			where: {
				email: body.email
			}
		})
		
		// throw error when credentials are invalid
		if (!user) {
			// if user is not found throw error
			await prisma.$disconnect()
			return fail(400, { message: 'invalid credentials' });
		} else {
			// if password is incorrect throw error
			const validpw = user.password == body.password;

			if (!validpw) {
				await prisma.$disconnect()
				return fail(400, { message: 'invalid credentials' });
			}
		}

		// TODO: update user with auth token

		const authedUser = await prisma.users.update({
			where: {
				email: user.email
			},
			data: {
				auth_token: crypto.randomUUID()
			}
		})
		
		cookies.set('session', authedUser.auth_token, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

		await prisma.$disconnect()
		throw redirect(303, '/')
	}
}
