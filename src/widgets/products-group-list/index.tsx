'use client'

import React from 'react'

import { ProductWithRelations } from '@/config/types'
import { ProductCard } from '@/enteties/product/ui'
import { cn } from '@/lib/utils'
import { useCategoryObserver } from '@/shared/hooks/useCategoryObserver'
import { Title } from '@/shared/ui'

interface Props {
	title: string
	items?: ProductWithRelations[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductsGroupList: React.FC<Props> = ({
	title,
	items,
	listClassName,
	categoryId,
	className
}) => {
	const intersectionRef = React.useRef(null)

	useCategoryObserver(intersectionRef, categoryId)

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn('grid lg:grid-cols-2 2xl:grid-cols-3 gap-[50px]', listClassName)}>
				{items?.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						price={product?.items ? product?.items[0].price : 490}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	)
}
