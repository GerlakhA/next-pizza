import { TPromo } from '@/config/constants'

export const priceWithPromo = (price: number, promo: TPromo) => {
	let totalAmount = price

	switch (promo) {
		case 'NEWUSER':
			totalAmount -= price * 0.15
			break
		case 'DISCOUNT20':
			totalAmount -= price * 0.2
			break
		case 'SUMMER2025':
			totalAmount -= price * 0.1
			break
		default:
			break
	}

	return Math.round(totalAmount)
}
