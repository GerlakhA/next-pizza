import { cn } from '@/lib/utils'
import { Categories, Container, SortPopup } from '@/shared'
import { Category } from '@prisma/client'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar = async ({ categories, className }: Props) => {
	if (!categories) return null

	return (
		<div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
			<Container className='flex items-center justify-between'>
				<Categories categories={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}
