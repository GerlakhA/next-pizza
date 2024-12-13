import { ProductWithRelations } from '@/config/types'
import { Ingredient } from '@prisma/client'

export type TProductCard = {
	product: ProductWithRelations
	ingredients: Ingredient[]
	price: number
}
