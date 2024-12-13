'use client'

import { cn } from '@/lib/utils'
import { Ingredient as TypeIngredient } from '@prisma/client'
import { CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type TIngredient = {
	ingredient: TypeIngredient
}

export const Ingredient = ({ ingredient }: TIngredient) => {
	const [selectedIngredient, setSelectedIngredient] = useState(false)

	const handleSelectIngredient = (id: number) => {
		if (ingredient.id === id) {
			setSelectedIngredient(prev => !prev)
		}
	}

	return (
		<div
			key={ingredient.id}
			onClick={() => handleSelectIngredient(ingredient.id)}
			className={cn(
				'relative w-34 h-44 flex flex-col p-2 items-center text-center bg-white rounded-lg shadow-md cursor-pointer',
				selectedIngredient && 'border-2 border-primary'
			)}
		>
			{selectedIngredient && (
				<CheckCircle2 className='absolute top-2 right-2 w-6 h-6 text-primary' />
			)}
			<Image src={ingredient.imageUrl} width={90} height={90} alt={ingredient.name} />
			<span className='text-xs mt-1'>{ingredient.name}</span>
			<span className='font-bold'>{ingredient.price} ₽</span>
		</div>
	)
}
