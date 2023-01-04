import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!event.cookies.get('session')) {
		console.log('not logged in')
		return await resolve(event);
	}

	const user = await prisma.users.findUnique({
		where: {
			auth_token: session
		}
	})

	if (user) {
		event.locals.user = {
			username: user.username,
		}
		console.log(`logged in as ${user.email}`);
	}

	return await resolve(event);
}
