import { PizzaSize, PizzaType } from '@/config/constants'
import { filteredPizzaByType } from '@/lib/helpers'
import { ProductItem } from '@prisma/client'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

export const usePizzaDetails = (items: ProductItem[]) => {
	const [selectedSize, setSelectedSize] = useState<PizzaSize>(20)
	const [selectedType, setSelectedType] = useState<PizzaType>(1)
	const [selectedIngredients, { toggle: addIngredient }] = useSet<number>(new Set([]))

	const availablePizzaSizes = filteredPizzaByType(items, selectedType)

	const productId = items.find(
		item => item.pizzaType === selectedType && item.size === selectedSize
	)?.id

	useEffect(() => {
		const findActiveSize = availablePizzaSizes.find(item => !item.disabled)

		if (findActiveSize) {
			setSelectedSize(Number(findActiveSize.value) as PizzaSize)
		}
	}, [selectedType])

	return {
		selectedSize,
		selectedType,
		productId,
		setSelectedSize,
		setSelectedType,
		selectedIngredients,
		addIngredient,
		availablePizzaSizes
	}
}
