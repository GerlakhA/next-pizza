'use client'

import { Button } from '@/components'
import { ECategory, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/config/constants'
import { ProductWithRelations } from '@/config/types'
import { cn } from '@/lib/utils'
import { Ingredient, PizzaImage, Title } from '@/shared'
import { PizzaVariants } from '@/shared/pizza-variants'
import { useState } from 'react'

type TChoosePizzaForm = {
	product: ProductWithRelations
	className?: string
}

export const ChoosePizzaForm = ({ product, className }: TChoosePizzaForm) => {
	const [selectedSize, SetSelectedSize] = useState<PizzaSize>(20)
	const [selectedType, SetSelectedType] = useState<PizzaType>(1)

	const categoryName = ECategory[product.categoryId]

	const handleChangeSize = (value: string) => {
		SetSelectedSize(Number(value) as PizzaSize)
	}

	const handleChangeType = (value: string) => {
		SetSelectedType(Number(value) as PizzaType)
	}

	const priceForOtherType =
		product.items.find(item => item.pizzaType === selectedType && item.size === selectedSize)
			?.price || 0

	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage name={product.name} imageUrl={product.imageUrl} size={selectedSize} />

			<div className='w-[490px] p-6 bg-[#f7f6f5]'>
				<Title text={product.name} size='md' className='font-extrabold mb-1' />
				<p className='text-gray-400'>{categoryName}</p>
				<p className='text-gray-400'>описание продукта</p>
				<div className='flex flex-col gap-3'>
					<PizzaVariants
						items={pizzaSizes}
						value={String(selectedSize)}
						onClick={handleChangeSize}
					/>
					<PizzaVariants
						items={pizzaTypes}
						value={String(selectedType)}
						onClick={handleChangeType}
					/>
				</div>

				<Title text='Добавить по вкусу' size='sm' className='mt-6' />
				<div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-y-auto scrollbar mt-6'>
					<div className='grid grid-cols-3 gap-4'>
						{product.ingredients.map(ingredient => (
							<Ingredient key={ingredient.id} ingredient={ingredient} />
						))}
					</div>
				</div>

				<Button
					// loading={loading}
					onClick={() => {}}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {priceForOtherType} ₽
				</Button>
			</div>
		</div>
	)
}
