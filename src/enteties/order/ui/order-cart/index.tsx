import { TCart, TSign } from '@/config/types'
import { useUpdateQuantity } from '@/shared/hooks/useUpdateQuantity'
import { ContentBlock } from '@/shared/ui'
import Link from 'next/link'
import { OrderItem } from '../order-item'

type TProps = {
	cartItems: TCart
}

export const OrderCart = ({ cartItems }: TProps) => {
	const { mutate: updateQuantity } = useUpdateQuantity()

	const handleChangeQuantity = async (id: number, quantity: number, sign: TSign) => {
		const newQuantity = sign === 'plus' ? quantity + 1 : quantity - 1

		updateQuantity({ id, quantity: newQuantity })
	}

	return (
		<ContentBlock
			title='1. Корзина'
			endAdornment={
				<Link href={'/'} className='text-neutral-400 hover:text-black'>
					Дополнить заказ
				</Link>
			}
		>
			<div className='p-6 flex flex-col gap-8 '>
				{cartItems?.items.map(orderItem => (
					<OrderItem
						key={orderItem.id}
						orderItem={orderItem}
						handleChangeQuantity={handleChangeQuantity}
					/>
				))}
			</div>
		</ContentBlock>
	)
}
