'use server'

import { prisma } from '@/prisma/prisma-client'

export const getProductsByCategory = async () => {
	try {
		const category = await prisma.category.findMany({
			include: {
				products: {
					include: {
						ingredients: true,
						items: true
					}
				}
			}
		})

		return category
	} catch (error: any) {
		const { toast } = await import('react-hot-toast')
		toast.error(error)
	}
}
