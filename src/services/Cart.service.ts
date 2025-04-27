import { ApiRoutes } from '@/config/constants'
import { CreateCartItemValues, TCart } from '@/config/types'
import { AxiosInstance } from './instance'

export const CartService = {
	async getAll() {
		const { data } = await AxiosInstance.get<TCart>(ApiRoutes.CART)
		return data
	},

	async addProduct(cartItem: CreateCartItemValues) {
		const { data } = await AxiosInstance.post<CreateCartItemValues>(ApiRoutes.CART, cartItem)
		return data
	},

	async deleteCartItem(id: number) {
		const { data } = await AxiosInstance.delete(`${ApiRoutes.CART}/${id}`)

		return data
	}
}
