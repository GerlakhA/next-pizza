import { ApiRoutes } from '@/config/constants'
import { Product } from '@prisma/client'
import { AxiosInstance } from './instance'

export const ProductsService = {
	async search(query: string) {
		const { data } = await AxiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
			params: { query }
		})
		return data
	}
}
