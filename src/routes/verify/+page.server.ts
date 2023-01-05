import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const load = async ({ cookies }) => {

	console.log(cookies.get('registersession'))	
	if (!cookies.get('registersession')) {
		throw redirect(308, '/')
	}
}

export const actions = {
	verify: async ({ cookies, request }) => {
		const body = Object.fromEntries(await request.formData());

		const sessionid = cookies.get('registersession')
		
		// redirect if cookie doesnt exist
		if (!sessionid) {
			throw redirect(308, '/')
		}

		const attempt = await prisma.signup_attempts.findUnique({
			where: {
				sessionid: sessionid
			}
		})
		
		const difference = Date.now() - Date.parse(attempt.created);
		
		// throw redirect if session is expired
		if (difference > 60000) {
			await prisma.signup_attempts.delete({
				where: {
					sessionid: sessionid
				}
			})

			cookies.delete('registersession')
			throw redirect(308, '/') 
		}
		
		//throw error if code is wrong
		const correct = body.code == attempt.code
		
		if (!correct) {
			return fail(400, { message: 'wrong code' }) 
		}

		await prisma.users.create({
			data: {
				username: attempt?.username,
				email: attempt?.email,
				password: attempt?.password
			}
		})

		console.log('signed up a user');

		await prisma.signup_attempts.delete({
			where: {
				sessionid: sessionid
			}
		})
		
		cookies.delete('registersession', {
			path: '/',
			httpOnly: true,
			secure: false,
			sameSite: 'strict'
		})

		throw redirect(308, '/')
	}
}
