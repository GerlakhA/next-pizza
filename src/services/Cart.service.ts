import { ApiRoutes } from '@/config/constants'
import { CartItem } from '@prisma/client'
import { AxiosInstance } from './instance'

export const CartService = {
	async getAll() {
		const { data } = await AxiosInstance.get<CartItem[]>(ApiRoutes.CART)
		return data
	},

	async addProduct() {
		const { data } = await AxiosInstance<CartItem>(ApiRoutes.CART)
		return data
	}
}
