'use client'

import { cn } from '@/lib/utils'
import { Ingredient as TypeIngredient } from '@prisma/client'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

type TIngredient = {
	ingredient: TypeIngredient
	ingredients: TypeIngredient[]
	active: boolean
	onClick: () => void
}

export const Ingredient = ({ ingredient, ingredients, active, onClick }: TIngredient) => {
	return (
		<div
			key={ingredient.id}
			onClick={onClick}
			className={cn(
				'relative w-34 h-44 flex flex-col p-2 items-center text-center bg-white rounded-lg shadow-md cursor-pointer',
				active && 'border-2 border-primary'
			)}
		>
			{active && <CheckCircle2 className='absolute top-2 right-2 w-6 h-6 text-primary' />}
			<Image src={ingredient.imageUrl} width={90} height={90} alt={ingredient.name} />
			<span className='text-xs mt-1'>{ingredient.name}</span>
			<span className='font-bold'>{ingredient.price} ₽</span>
		</div>
	)
}
