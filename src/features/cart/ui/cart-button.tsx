'use client'

import { Sheet } from '@/components'
import { Cart } from '@/enteties/cart/ui'
import { useGetCart } from '@/shared/hooks/useGetCart'
import { CartButtonTrigger } from './cart-button-trigger'

export const CartButton = () => {
	const { data: cartItems } = useGetCart()

	if (!cartItems) return null

	const quantity = cartItems?.items.length
	const totalPriceBtn = cartItems?.totalAmount || 0

	return (
		<Sheet>
			<CartButtonTrigger quantity={quantity || 0} totalPrice={totalPriceBtn} />
			<Cart cartItems={cartItems} totalPrice={totalPriceBtn} />
		</Sheet>
	)
}
