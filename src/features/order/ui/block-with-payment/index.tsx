import { Button, Input } from '@/components'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { TPromo } from '@/config/constants'
import { TCart } from '@/config/types'
import { priceWithPromo } from '@/lib/priceWithPromo'
import { cn } from '@/lib/utils'
import { ContentBlock } from '@/shared/ui'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { OrderDetails } from '../order-details'

type TProps = {
	cartItems: TCart
}

export const BlockWithPayment = ({ cartItems }: TProps) => {
	const { control, getFieldState } = useFormContext()

	const promo = useWatch({
		control,
		name: 'promo'
	})

	const validPromo = promo && !getFieldState('promo').error
	const totalPrice = validPromo
		? priceWithPromo(cartItems?.totalAmount, promo as TPromo)
		: cartItems?.totalAmount

	return (
		<ContentBlock className='p-6 sticky top-4'>
			<p>Итого:</p>
			<span className={cn('h-11 text-[34px] font-bold', validPromo && 'line-through')}>
				{cartItems?.totalAmount ? cartItems?.totalAmount + 120 : 0} ₽
			</span>
			{validPromo && (
				<span className='h-11 text-[34px] font-bold ml-4'>
					{priceWithPromo(cartItems?.totalAmount, promo as TPromo) + 120} ₽
				</span>
			)}
			<OrderDetails
				title={
					<div className='flex items-center'>
						<Package size={18} className='mr-2 text-gray-400' />
						Стоимость товаров:
					</div>
				}
				value={`${totalPrice} ₽`}
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
					<FormItem>
						<FormLabel>Промокод</FormLabel>
						<FormControl>
							<Input
								placeholder='Введите промокод'
								value={field.value?.toUpperCase()}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button
				// loading={loading}
				type='submit'
				className='w-full h-14 rounded-2xl mt-6 text-base font-bold'
			>
				Перейти к оплате
				<ArrowRight className='w-5 ml-2' />
			</Button>
		</ContentBlock>
	)
}
