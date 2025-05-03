import { Button, Separator } from '@/components'
import { CartItemDTO, TSign } from '@/config/types'
import { usecartItemDetails } from '@/shared/hooks/useCartItemDetails'
import { useDeleteCartItem } from '@/shared/hooks/useDeleteCartItem'
import { Title } from '@/shared/ui'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface CartItemsProps {
	cartItem: CartItemDTO
	handleChangeQuantity: (id: number, quantity: number, sign: TSign) => void
}

export const CartItem = ({ cartItem, handleChangeQuantity }: CartItemsProps) => {
	const { mutate: deleteCartItem, isPending } = useDeleteCartItem()
	const {
		typeDescription,
		sizeDescription,
		ingredientsDescription,
		price,
		disabledMinus,
		disabledPlus
	} = usecartItemDetails(cartItem)

	const handleDelete = () => deleteCartItem(cartItem.id)
	const handleClickMinus = () => handleChangeQuantity(cartItem.id, cartItem.quantity, 'minus')
	const handleClickPlus = () => handleChangeQuantity(cartItem.id, cartItem.quantity, 'plus')

	return (
		<div className='flex bg-white p-5 gap-6 rounded-lg'>
			<div className='shrink-0 w-16 h-16 relative'>
				<Image
					src={cartItem.productItem.product.imageUrl}
					width={60}
					height={60}
					alt={cartItem.productItem.product.name}
				/>
			</div>

			<div className='flex flex-col gap-2 grow'>
				<Title text={cartItem.productItem.product.name} size='sm' className='font-semibold' />
				<p className='text-sm text-muted-foreground'>{typeDescription}</p>
				<p className='text-sm text-muted-foreground'>{sizeDescription}</p>
				<p className='text-sm text-muted-foreground'>{ingredientsDescription}</p>
				<span>Цена: {price} ₽</span>
				<Separator className='my-2' />
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<Button
							disabled={disabledMinus}
							onClick={handleClickMinus}
							variant={'outline'}
							className='text-md'
						>
							-
						</Button>
						<span>{cartItem.quantity}</span>
						<Button
							disabled={disabledPlus}
							onClick={handleClickPlus}
							variant={'outline'}
							className='text-md'
						>
							+
						</Button>
					</div>
					<Button
						disabled={isPending}
						className='w-12 h-12 bg-transparent text-red-500 hover:bg-neutral-300/50 rounded-sm flex items-center justify-center cursor-pointer transition-all'
					>
						<Trash2 onClick={handleDelete} />
					</Button>
				</div>
			</div>
		</div>
	)
}
