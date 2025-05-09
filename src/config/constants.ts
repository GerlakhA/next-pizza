export enum ApiRoutes {
	SEARCH_PRODUCTS = '/products/search',
	PRODUCTS = '/products',
	CATEGORIES = '/categories',
	INGREDIENTS = '/ingredients',
	CART = '/cart'
}

export const SORT_POPUP = ['Популярности', 'Цене (от мин)', 'Цене (от макс)']

export const ECategory: Record<number, string> = {
	1: 'Пиццы',
	2: 'Завтрак',
	3: 'Закуски',
	4: 'Коктейли',
	5: 'Напитки'
} as const

export const EPizzaType = {
	1: 'Традиционное',
	2: 'Тонкое'
} as const

export const EPizzaSize = {
	20: 'Маленькая',
	30: 'Средняя',
	40: 'Большая'
} as const

export const pizzaSizes = Object.entries(EPizzaSize).map(([value, name]) => ({
	name,
	value
}))

export const pizzaTypes = Object.entries(EPizzaType).map(([value, name]) => ({
	name,
	value
}))

export type PizzaSize = keyof typeof EPizzaSize
export type PizzaType = keyof typeof EPizzaType
