import { Button, Input } from '@/components'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { promocodes, TPromo } from '@/config/constants'
import { TCart } from '@/config/types'
import { priceWithPromo } from '@/lib/priceWithPromo'
import { cn } from '@/lib/utils'
import { ContentBlock } from '@/shared/ui'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { OrderDetails } from '../order-details'

type TProps = {
	cartItems: TCart
}

export const BlockWithPayment = ({ cartItems }: TProps) => {
	const [checkPromo, setCheckPromo] = useState<boolean>(false)
	const { control } = useFormContext()

	const promo = useWatch({
		control,
		name: 'promo'
	})

	const isValidPromo = promocodes.includes(promo)
	const checkValidPromo = checkPromo && isValidPromo

	const totalPrice = checkPromo
		? priceWithPromo(cartItems.totalAmount || 0, promo as TPromo) + 120
		: cartItems.totalAmount + 120

	const handleApply = () => {
		if (isValidPromo) {
			setCheckPromo(true)
		}
	}

	useEffect(() => {
		if (!isValidPromo) {
			setCheckPromo(false)
		}
	}, [isValidPromo])

	return (
		<ContentBlock className='p-6 sticky top-4'>
			<p>Итого:</p>
			<span className={cn('h-11 text-[34px] font-bold', checkValidPromo && 'line-through')}>
				{cartItems.totalAmount ? cartItems.totalAmount + 120 : 0} ₽
			</span>
			{checkValidPromo && (
				<span className='h-11 text-[34px] font-bold ml-4'>{totalPrice} ₽</span>
			)}
			<OrderDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-400' />
						Стоимость товаров:
					</div>
				}
				value={`${totalPrice - 120} ₽`}
			/>
			<OrderDetails
				title={
					<div className='flex items-center'>
						<Truck size={18} className='mr-2 text-gray-400' />
						Доставка:
					</div>
				}
				value={'120 ₽'}
			/>
			<FormField
				name='promo'
				control={control}
				render={({ field }) => (
					<FormItem className='relative'>
						<FormLabel>Промокод</FormLabel>
						<FormControl>
							<Input
								placeholder='Введите промокод'
								{...field}
								value={field.value.toUpperCase()}
							/>
						</FormControl>
						<FormMessage />
						{promo && (
							<span
								onClick={handleApply}
								className='absolute top-[33px] right-4 text-sm text-neutral-400 hover:text-red-500 cursor-pointer'
							>
								Применить
							</span>
						)}
					</FormItem>
				)}
			/>
			<Button type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</ContentBlock>
	)
}
