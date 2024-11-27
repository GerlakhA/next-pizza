'use client'

import React from 'react'
import { useIntersection } from 'react-use'

import { cn } from '@/lib/utils'
// import { useCategoryStore } from '@/shared/store'
import { ProductCard, Title } from '@/shared/components/shared'
import { useCategoryStore } from '@/store/category'
import { ProductWithRelations } from '@/types'

interface Props {
	title: string
	items: ProductWithRelations[] | undefined
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
	const setCategoryId = useCategoryStore(state => state.setCategoryId)

	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4
	})

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, title])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />

			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items?.map((product, i) => (
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
