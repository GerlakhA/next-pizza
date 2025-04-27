'use client'

import { ProductWithRelations } from '@/config/types'
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/ui'

type Props = {
	product: ProductWithRelations
	size?: number
}

const ProductForm = ({ product, size }: Props) => {
	const firstItem = product?.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const onSubmit = () => {}

	if (isPizzaForm) {
		return <ChoosePizzaForm product={product} onSubmit={onSubmit} />
	}

	return <ChooseProductForm product={product} onSubmit={onSubmit} />
}

export default ProductForm
