import { Button } from '@/components'
import { CartItemDTO, TSign } from '@/config/types'
import { usecartItemDetails } from '@/shared/hooks/useCartItemDetails'
import { useDeleteCartItem } from '@/shared/hooks/useDeleteCartItem'
import { X } from 'lucide-react'
import Image from 'next/image'

type TProps = {
	orderItem: CartItemDTO
	handleChangeQuantity: (id: number, quantity: number, sign: TSign) => void
}

export const OrderItem = ({ orderItem, handleChangeQuantity }: TProps) => {
	const {
		typeDescription,
		sizeDescription,
		ingredientsDescription,
		price,
		disabledMinus,
		disabledPlus
	} = usecartItemDetails(orderItem)
	const { mutate: deleteOrder } = useDeleteCartItem()

	const handleClickMinus = () =>
		handleChangeQuantity(orderItem.id, orderItem.quantity, 'minus')
	const handleClickPlus = () => handleChangeQuantity(orderItem.id, orderItem.quantity, 'plus')

	return (
		<div className='flex items-center gap-8'>
			<Image
				src={orderItem.productItem.product.imageUrl}
				width={120}
				height={120}
				alt={orderItem.productItem.product.name}
			/>
			<div className='flex flex-col gap-1 w-[240px]'>
				<span className='font-bold text-xl'>{orderItem.productItem.product.name}</span>
				<p className='text-neutral-400 text-sm'>{typeDescription}</p>
				<p className='text-neutral-400 text-sm'>{sizeDescription}</p>
				<p className='text-neutral-400 text-sm'>{ingredientsDescription}</p>
			</div>
			<div className='flex items-center justify-between flex-1'>
				<span className='font-bold'>{price} ₽</span>
				<div className='flex items-center gap-4'>
					<Button
						disabled={disabledMinus}
						onClick={handleClickMinus}
						variant={'outline'}
						className='text-md'
					>
						-
					</Button>
					<span>{orderItem.quantity}</span>
					<Button
						disabled={disabledPlus}
						onClick={handleClickPlus}
						variant={'outline'}
						className='text-md'
					>
						+
					</Button>
				</div>
				<X
					onClick={() => deleteOrder(orderItem.id)}
					className='w-5 h-5 text-neutral-400 hover:text-black cursor-pointer'
				/>
			</div>
		</div>
	)
}
