import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (!locals.user) {
		throw redirect(308, '/');
	}

	const user = await prisma.users.findUnique({
		where: {
			auth_token: cookies.get('session')
		},
		include: {
			convos: {
				include: {
					users: {
						select: {
							username: true
						}
					}
				}
			},
		},
	})

	user.convos.forEach((i) => {
		console.log(i.users);
	})

	return { convos: user.convos }
}
