'use client'

import {
	Button,
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components'
import { CartItems } from '@/enteties/cart/ui'
import { useGetCart } from '@/shared/hooks/useGetCart'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

type Props = {}

export const CartButton = (props: Props) => {
	const { data: cartItems } = useGetCart()

	const quantity = cartItems?.items.length
	const totalPriceBtn = cartItems?.totalAmount || 0

	console.log(cartItems)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className='group relative'>
					<b>{totalPriceBtn} ₽</b>
					<span className='h-full w-[1px] bg-white/30 mx-3' />
					<div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
						<ShoppingCart className='h-4 w-4 relative' size={16} strokeWidth={2} />
						<b>{quantity}</b>
					</div>
					<ArrowRight
						className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0
          group-hover:opacity-100 group-hover:translate-x-0'
					/>
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col pb-0 bg-[#f4f1ee]'>
				<SheetHeader>
					<SheetTitle>Корзина</SheetTitle>
				</SheetHeader>
				<div className=''>
					{cartItems?.items?.map(cart => (
						<CartItems key={cart.id} cart={cart} />
					))}
				</div>
				<SheetFooter className='-mx-6 bg-white p-8 mt-auto'>
					<div className='w-full'>
						<div className='flex mb-4'>
							<span className='flex flex-1 text-lg text-neutral-500'>
								Итого
								<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
							</span>

							<span className='font-bold text-lg'>500 ₽</span>
						</div>

						<Link href='/checkout'>
							<Button type='submit' className='w-full h-12 text-base'>
								Оформить заказ
								<ArrowRight className='w-5 ml-2' />
							</Button>
						</Link>
					</div>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
