import { Ingredient, ProductItem } from '@prisma/client'

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
