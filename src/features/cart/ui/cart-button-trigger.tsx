import { Button, SheetTrigger } from '@/components'
import { ArrowRight, ShoppingCart } from 'lucide-react'

type TProps = {
	quantity: number
	totalPrice: number
}

export const CartButtonTrigger = ({ quantity, totalPrice }: TProps) => {
	return (
		<SheetTrigger asChild>
			<Button className='group relative'>
				<b>{totalPrice} ₽</b>
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
	)
}
