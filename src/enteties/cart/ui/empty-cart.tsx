import { Button, SheetClose } from '@/components'
import { Title } from '@/shared/ui'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export const EmptyCart = () => {
	return (
		<div className='flex flex-col items-center justify-center w-72 mx-auto h-screen'>
			<Image src='/empty-box.png' alt='Empty cart' width={120} height={120} />
			<Title size='sm' text='Корзина пустая' className='text-center font-bold my-2' />
			<p className='text-center text-neutral-500 mb-5'>
				Добавьте хотя бы одну пиццу, чтобы совершить заказ
			</p>

			<SheetClose asChild>
				<Button className='w-56 h-12 text-base' size='lg'>
					<ArrowLeft className='w-5 mr-2' />
					Вернуться назад
				</Button>
			</SheetClose>
		</div>
	)
}
