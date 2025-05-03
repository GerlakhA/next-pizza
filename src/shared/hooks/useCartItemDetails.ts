import { EPizzaType } from '@/config/constants'
import { CartItemDTO } from '@/config/types'
import { MAX_QUANTITY_PRODUCT, MIN_QUANTITY_PRODUCT } from '@/enteties/cart/config/constants'

export const usecartItemDetails = (cartItem: CartItemDTO) => {
	const details = cartItem.ingredients.map(ingredient => ingredient.name)

	const typeDescription = `Тесто: ${EPizzaType[cartItem.productItem.pizzaType as 1 | 2]}`

	const sizeDescription = `Размер: ${cartItem.productItem.size} см.`

	const ingredientsDescription = details.length
		? `Ингредиенты: ${details.join(', ')}`
		: 'Доп. ингридиентов нет'

	const disabledMinus = cartItem.quantity === MIN_QUANTITY_PRODUCT
	const disabledPlus = cartItem.quantity === MAX_QUANTITY_PRODUCT

	const ingridientPrice = cartItem.ingredients.reduce(
		(acc, ingridient) => acc + ingridient.price,
		0
	)
	const price = (ingridientPrice + cartItem.productItem.price) * cartItem.quantity

	const returnObj = {
		typeDescription,
		sizeDescription,
		ingredientsDescription,
		disabledMinus,
		disabledPlus,
		price
	}

	return returnObj
}
