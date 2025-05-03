import { Button, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/components'
import { TCart, TSign } from '@/config/types'
import { useUpdateQuantity } from '@/shared/hooks/useUpdateQuantity'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from './cart-items'
import { EmptyCart } from './empty-cart'

type TProps = {
	cartItems: TCart
	totalPrice: number
}

export const Cart = ({ cartItems, totalPrice }: TProps) => {
	const { mutate: updateQuantity } = useUpdateQuantity()

	const handleChangeQuantity = async (id: number, quantity: number, sign: TSign) => {
		const newQuantity = sign === 'plus' ? quantity + 1 : quantity - 1

		updateQuantity({ id, quantity: newQuantity })
	}

	return (
		<SheetContent className='flex flex-col pb-0 bg-[#f4f1ee]'>
			<SheetHeader>
				<SheetTitle className='font-semibold text-4xl'>Корзина</SheetTitle>
			</SheetHeader>
			<div className='flex flex-col gap-4 overflow-y-auto'>
				{cartItems?.totalAmount ? (
					cartItems?.items?.map(cartItem => (
						<CartItem
							key={cartItem.id}
							cartItem={cartItem}
							handleChangeQuantity={handleChangeQuantity}
						/>
					))
				) : (
					<EmptyCart />
				)}
			</div>
			{cartItems?.totalAmount ? (
				<SheetFooter className='-mx-6 bg-white p-8 mt-auto'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>
							<span className='font-bold text-lg'>{totalPrice} ₽</span>
						</div>
						<Link href='/checkout'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			) : null}
		</SheetContent>
	)
}
