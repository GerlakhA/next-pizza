import { prisma } from '@/prisma/prisma-client'

export const findProductById = async (id: number) => {
	try {
		return await prisma.cartItem.findFirst({
			where: {
				id
			}
		})
	} catch (error) {
		console.log(error)
	}
}
