import { Button, Separator } from '@/components'
import { EPizzaType } from '@/config/constants'
import { CartItemDTO } from '@/config/types'
import { useDeleteCartItem } from '@/shared/hooks/useDeleteCartItem'
import { Title } from '@/shared/ui'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface CartItemsProps {
	cart: CartItemDTO
}

export const CartItems = ({ cart }: CartItemsProps) => {
	const { mutate: deleteCartItem, isPending } = useDeleteCartItem()
	const details = cart.ingredients.map(ingredient => ingredient.name)

	const typeDescription = `Тесто: ${EPizzaType[cart.productItem.pizzaType as 1 | 2]}`

	const sizeDescription = `Размер: ${cart.productItem.size} см.`

	const ingredientsDescription = `Ингредиенты: ${details.join(', ')}`

	const ingridientPrice = cart.ingredients.reduce(
		(acc, ingridient) => acc + ingridient.price,
		0
	)
	const price = (ingridientPrice + cart.productItem.price) * cart.quantity

	const handleDelete = () => deleteCartItem(cart.productItem.id)

	return (
		<div className='flex bg-white p-5 gap-6 rounded-lg'>
			<div className='shrink-0 w-16 h-16 relative'>
				<Image
					src={cart.productItem.product.imageUrl}
					width={60}
					height={60}
					alt={cart.productItem.product.name}
				/>
			</div>

			<div className='flex flex-col gap-2 grow'>
				<Title text={cart.productItem.product.name} size='sm' className='font-semibold' />
				<p className='text-sm text-muted-foreground'>{typeDescription}</p>
				<p className='text-sm text-muted-foreground'>{sizeDescription}</p>
				<p className='text-sm text-muted-foreground'>{ingredientsDescription}</p>
				<span>Цена: {price} ₽</span>
				<Separator className='my-2' />
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Button variant={'outline'}>-</Button>
						<span>{cart.quantity}</span>
						<Button variant={'outline'}>+</Button>
					</div>
					<div className='w-12 h-12 bg-transparent text-red-500 hover:bg-neutral-300/50 rounded-sm flex items-center justify-center cursor-pointer transition-all'>
						<Trash2 onClick={handleDelete} />
					</div>
				</div>
			</div>
		</div>
	)
}
