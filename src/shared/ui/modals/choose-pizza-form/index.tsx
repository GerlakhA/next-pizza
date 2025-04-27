'use client'

import { Button } from '@/components'
import { EPizzaType, PizzaSize, PizzaType, pizzaTypes } from '@/config/constants'
import { ProductWithRelations } from '@/config/types'
import { calcPriceForProduct } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import { usePizzaDetails } from '@/shared/hooks/usePizzaDetails'
import { Ingredient, PizzaImage, Title } from '@/shared/ui'
import { PizzaVariants } from '@/shared/ui/pizza-variants'

type TChoosePizzaForm = {
	product: ProductWithRelations
	className?: string
	onSubmit: () => void
}

export const ChoosePizzaForm = ({ product, className, onSubmit }: TChoosePizzaForm) => {
	const {
		selectedSize,
		selectedType,
		addIngredient,
		selectedIngredients,
		setSelectedSize,
		setSelectedType,
		availablePizzaSizes
	} = usePizzaDetails(product.items)

	const handleChangeSize = (value: string) => {
		setSelectedSize(Number(value) as PizzaSize)
	}

	const handleChangeType = (value: string) => {
		setSelectedType(Number(value) as PizzaType)
	}

	const pizzaPrice = calcPriceForProduct(
		product.ingredients,
		selectedIngredients,
		product.items,
		selectedType,
		selectedSize
	)

	const pizzaDetails = `${selectedSize} см, тесто: ${EPizzaType[selectedType].toLowerCase()}`

	return (
		<div className={cn('flex flex-1', className)}>
			<PizzaImage name={product.name} imageUrl={product.imageUrl} size={selectedSize} />

			<div className='w-[490px] p-7 bg-[#f7f6f5]'>
				<Title text={product.name} size='md' className='font-extrabold mb-1' />
				<p className='text-gray-400'>{pizzaDetails}</p>
				<div className='flex flex-col gap-4 mt-6'>
					<PizzaVariants
						items={availablePizzaSizes}
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
				<div className='bg-gray-50 p-6 rounded-md h-[420px] overflow-y-auto scrollbar'>
					<div className='grid grid-cols-3 gap-4'>
						{product.ingredients.map(ingredient => (
							<Ingredient
								key={ingredient.id}
								ingredient={ingredient}
								ingredients={product.ingredients}
								onClick={() => addIngredient(ingredient.id)}
								active={selectedIngredients.has(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					// loading={loading}
					onClick={onSubmit}
					className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
				>
					Добавить в корзину за {pizzaPrice} ₽
				</Button>
			</div>
		</div>
	)
}
