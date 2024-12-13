'use client'

import { cn } from '@/lib/utils'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

type TPizzaVariants = {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: Variant['value']
	className?: string
}

export const PizzaVariants = ({ items, onClick, className, value }: TPizzaVariants) => {
	return (
		<div
			className={cn(
				className,
				'flex justify-between bg-neutral-200/50 rounded-3xl p-2 select-none'
			)}
		>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-[30px] px-5 py-4 flex-1 rounded-3xl transition-all duration-400 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
