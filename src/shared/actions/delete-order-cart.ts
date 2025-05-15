import { prisma } from '@/prisma/prisma-client'

export const deleteOrderCart = async (id: number) => {
	try {
		await prisma.cart.delete({
			where: {
				id
			}
		})
	} catch (error) {
		console.log(error)
	}
}
