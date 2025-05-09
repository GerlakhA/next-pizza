'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components'
import { SORT_POPUP } from '@/config/constants'
import { cn } from '@/lib/utils'
import { ArrowUpDown } from 'lucide-react'
import { useState } from 'react'

interface Props {
	className?: string
}

export const SortPopup = ({ className }: Props) => {
	const [sort, setSort] = useState(SORT_POPUP[0])

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div
					className={cn(
						'flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
						className
					)}
				>
					<ArrowUpDown size={16} />
					<b>Сортировка по:</b>
					<b className='text-primary'>{sort}</b>
				</div>
			</PopoverTrigger>
			<PopoverContent className='flex flex-col gap-2'>
				{SORT_POPUP.map((sortName, i) => (
					<div
						key={i}
						onClick={() => setSort(sortName)}
						className={cn(
							'hover:text-primary hover:bg-neutral-100 p-2 rounded-md flex items-center justify-center cursor-pointer',
							sort === sortName && 'bg-neutral-100 text-primary'
						)}
					>
						<span>{sortName}</span>
					</div>
				))}
			</PopoverContent>
		</Popover>
	)
}
