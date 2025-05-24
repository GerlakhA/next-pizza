'use client'

import { Form } from '@/components/ui/form'
import { DEFAULT_VALUES } from '@/enteties/order/config/constants'
import { orderFormSchema } from '@/enteties/order/config/schema'
import { PersonalInfo } from '@/enteties/order/ui'
import { OrderCart } from '@/enteties/order/ui/order-cart'
import { BlockWithPayment, DeliveryAddress } from '@/features/order/ui'
import { useGetCart } from '@/shared/hooks/useGetCart'
import { Container, Title } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export const Order = () => {
	const { data: cartItems } = useGetCart()
	const { data: session } = useSession()

	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(orderFormSchema),
		defaultValues: {
			...DEFAULT_VALUES
		}
	})

	if (!cartItems || !cartItems.items.length) {
		redirect('/')
	}

	useEffect(() => {
		if (session) {
			form.setValue('firstName', session.user.name || '')
			form.setValue('lastName', session.user.name?.split(' ')[1] || '')
			form.setValue('email', session.user.email || '')
		}
	}, [session])

	const onSubmit: SubmitHandler<z.infer<typeof orderFormSchema>> = data => {
		console.log('ORDER DATA: ', data)
	}

	return (
		<Container className='p-4'>
			<Title text='Оформление заказа' className='font-extrabold mb-8 text-[36px]' />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col flex-1 gap-10'>
							<OrderCart cartItems={cartItems} />
							<PersonalInfo />
							<DeliveryAddress />
						</div>
						<div className='w-[450px]'>
							<BlockWithPayment cartItems={cartItems} />
						</div>
					</div>
				</form>
			</Form>
		</Container>
	)
}
