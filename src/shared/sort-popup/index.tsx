import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'

interface Props {
	className?: string
}

export const SortPopup = ({ className }: Props) => {
	return (
		<div
			className={cn(
				'flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
				className
			)}
		>
			<ArrowUpDown size={16} />
			<b>Сортировка:</b>
			<b className='text-primary'>популярное</b>
		</div>
	)
}