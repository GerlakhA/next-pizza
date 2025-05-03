import { CartItem, Ingredient, ProductItem, User } from '@prisma/client'

export type Product = {
	name: string
	id: number
	imageUrl: string
	categoryId: number
	createdAt: Date
	updatedAt: Date
}

export type ProductWithRelations = Product & {
	items: ProductItem[]
	ingredients: Ingredient[]
}

export type Category = {
	name: string
	id: number
	createdAt: Date
	updatedAt: Date
}

export type CartItemDTO = CartItem & {
	productItem: ProductItem & {
		product: Product
	}
	ingredients: Ingredient[]
}

export interface CreateCartItemValues {
	productItemId: number
	ingredients?: number[]
}

export type CartDetails = Product & {
	productItem: ProductItem
	ingredients: Ingredient[]
}

export type TCart = {
	id: number
	user: User
	userId: string
	items: CartItemDTO[]
	token: string
	totalAmount: number
}

export type TSign = 'plus' | 'minus'

export type TUpdateQuantity = {
	id: number
	quantity: number
}
