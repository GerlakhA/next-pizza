'use client'

import { useGetCategories } from '@/hooks/useGetCategories'
import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'

interface Props {
	className?: string
}

export const Categories = ({ className }: Props) => {
	const categoryId = useCategoryStore(state => state.categoryId)
	const { data: categories, isLoading } = useGetCategories()

	// if (isLoading) {
	// 	return <h1>Loading...</h1>
	// }
	console.log('test: ', categoryId)

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
			{categories?.map((category, i) => (
				<a
					key={category.id}
					href={`/#${category.name}`}
					className={cn(
						'flex item-center px-5 font-bold h-11 rounded-2xl',
						categoryId === i && 'bg-white shadow-md shadow-gray-200 text-primary'
					)}
				>
					<button onClick={() => console.log('test2: ', category.id)}>
						{category.name}
					</button>
				</a>
			))}
		</div>
	)
}