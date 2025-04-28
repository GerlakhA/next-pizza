'use client'

import { ProductWithRelations } from '@/config/types'
import { useAddToCart } from '@/shared/hooks/useAddToCart'
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/ui'

type Props = {
	product: ProductWithRelations
	size?: number
}

const ProductForm = ({ product, size }: Props) => {
	const { mutate: addToCart, isPending } = useAddToCart()

	const firstItem = product?.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id
			addToCart({
				productItemId: itemId,
				ingredients
			})
		} catch (error) {}
	}

	if (isPizzaForm) {
		return <ChoosePizzaForm product={product} onSubmit={onSubmit} isLoading={isPending} />
	}

	return <ChooseProductForm product={product} onSubmit={onSubmit} />
}

export default ProductForm
