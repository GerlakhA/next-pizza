import { Button } from '@/components'
import { ECategory } from '@/config/constants'
import { ProductWithRelations } from '@/config/types'
import { cn } from '@/lib/utils'
import { Title } from '@/shared'
import Image from 'next/image'

type TChooseProductForm = {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductForm = ({ product, className }: TChooseProductForm) => {
	const categoryName = ECategory[product.categoryId]

	return (
		<div className={cn('flex flex-1', className)}>
			<div
				className={cn('flex items-center justify-center flex-1 relative w-full', className)}
			>
				<Image
					src={product.imageUrl}
					width={350}
					height={350}
					alt={product.name}
					className={cn('relative left-2 top-2 transition-all z-10 duration-300')}
				/>
			</div>

			<div className='w-[490px] p-7 bg-[#f7f6f5]'>
				<Title text={product.name} size='md' className='font-extrabold mb-1' />
				<p className='text-gray-400'>{categoryName}</p>
				<p className='text-gray-400'>описание продукта</p>

				<Button
					// loading={loading}
					onClick={() => {}}
					className='h-[55px] px-10 text-base rounded-[18px] w-full'
				>
					Добавить в корзину за 100 ₽
				</Button>
			</div>
		</div>
	)
}
