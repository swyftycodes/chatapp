import type { PageServerLoad } from "./$types";
import { PrismaClient } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';
import { randomBytes } from 'crypto';
import mailTransporter from "$lib/server/email";

const prisma = new PrismaClient();

function genSessionID() {
	return randomBytes(32).toString('base64');
}

function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
}

export const load: PageServerLoad = () => {
	console.log('loaded');
}

export const actions = {
	register: async ({ cookies, request }) => {
		const body = Object.fromEntries(await request.formData());

		const emailTaken = await prisma.users.findUnique({
			where: {
				email: body.email
			}
		})

		const usernameTaken = await prisma.users.findUnique({
			where: {
				username: body.username
			}
		})
		
		if (emailTaken) {
			return fail(400, { message: 'Email taken' })
		} else if (usernameTaken) {
			return fail(400, { message: 'Username taken' })
		}

		const attempt = await prisma.signup_attempts.findUnique({
			where: {
				email: body.email
			}
		})
		
		if (attempt) {
			await prisma.signup_attempts.delete({
				where: {
					email: body.email
				}
			})
		}

		const code = generateRandomNumber()
		const sessionid = genSessionID()

		await prisma.signup_attempts.create({
			data: {
				username: body.username,
				email: body.email, 
				password: body.password,
				code: code,
				sessionid: sessionid 
			}
		})

		cookies.set('registersession', sessionid, {
			path: '/',
			httpOnly: true,
			secure: false,
			sameSite: 'strict',
			maxAge: 60 
		})

		console.log('created verification attempt in database and set sessionid in cookies')
		
		const email = {
			from: 'chat-app-verification@outlook.com',
			to: body.email,
			subject: 'verification',
			text: `Your verification code is ${code}`
		}

		mailTransporter.sendMail(email, (err, info) => {
			if (err) {
				console.log(err)
				return
			}
			console.log(info.response)
		})

		throw redirect(303, '/verify') 
	}
}
