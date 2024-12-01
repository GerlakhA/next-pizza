import { ApiRoutes } from '@/config/constants'
import { Ingredient } from '@prisma/client'
import { AxiosInstance } from './instance'

export const IngredientsService = {
	async getAll() {
		const { data } = await AxiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)
		return data
	}
}
