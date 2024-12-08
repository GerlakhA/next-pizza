'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Category } from '@prisma/client'

interface Props {
	categories: Category[]
	className?: string
}

export const Categories = ({ categories, className }: Props) => {
	const categoryId = useCategoryStore(state => state.categoryId)
	// const { data: categories, isLoading } = useGetCategories()

	return (
		<>
			{/* {isLoading ? (
				<Skeleton className='w-[555px] h-[60px] rounded-md' />
			) : ( */}
			<div className={cn('inline-flex gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
				{categories?.map((category, i) => (
					<a
						key={category.id}
						href={`/#${category.name}`}
						className={cn(
							'flex item-center px-5 font-bold h-11 rounded-2xl',
							categoryId === i + 1 && 'bg-white shadow-md shadow-gray-200 text-primary'
						)}
					>
						<button onClick={() => {}}>{category.name}</button>
					</a>
					// ))}
				))}
			</div>
		</>
	)
}
