import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const GET = async ({ cookies }) => {
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


	const replacer = (key, value) => typeof value === "bigint" ? value.toString() : value;

	return new Response(JSON.stringify(user.convos, replacer));
}
