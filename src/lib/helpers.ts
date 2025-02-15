import { PizzaSize, pizzaSizes, PizzaType } from '@/config/constants'
import { Ingredient, ProductItem } from '@prisma/client'

export const fakeArray = (number: number) => {
	return Array(number).fill(0)
}

export const calcPriceForProduct = (
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
	items: ProductItem[],
	selectedType: PizzaType,
	selectedSize: PizzaSize
) => {
	const ingredientPrice = ingredients
		.filter(ingredient => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	const priceForOtherType =
		items.find(item => item.pizzaType === selectedType && item.size === selectedSize)?.price ||
		0

	const pizzaPrice = priceForOtherType + ingredientPrice

	return pizzaPrice
}

export const filteredPizzaByType = (items: ProductItem[], selectedType: PizzaType) => {
	const pizzasByType = items.filter(item => item.pizzaType === selectedType)

	const availablePizzaSizes = pizzaSizes.map(item => ({
		name: item.name,
		value: item.value,
		disabled: !pizzasByType.some(pizza => Number(pizza.size) === Number(item.value))
	}))

	return availablePizzaSizes
}
