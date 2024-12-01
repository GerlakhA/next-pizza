'use client'

import { FilterChecboxProps, FilterCheckbox } from '@/shared/components/shared/filter-checkbox'
import { Skeleton } from '@/shared/components/ui'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'

type Checkbox = FilterChecboxProps

type Props = {
	title: string
	className?: string
	checkbox?: Checkbox[]
	visableCheckbox?: Checkbox[]
	limit?: number
	selectedIds: Set<string>
	name: string
	isLoading: boolean
	inputPlaceholder?: string
	onChange: (value: string) => void
	defaultValue?: string[]
}

export const CheckboxFiltersGroup = ({
	className,
	title,
	name,
	checkbox,
	visableCheckbox,
	limit = 5,
	inputPlaceholder = 'Поиск...',
	isLoading,
	selectedIds,
	onChange,
	defaultValue
}: Props) => {
	const [searchValue, setSearchValue] = useState('')
	const [showAll, setShowAll] = useState(false)

	if (isLoading) {
		return (
			<div className=''>
				<p className='font-bold mb-3 mt-5'>{title}</p>
				{...Array(limit)
					.fill(0)
					.map((_, i) => <Skeleton key={i} className='h-6 mb-5 rounded-[8px]' />)}
				<Skeleton className='w-28 h-6 mb-5 rounded-[8px]' />
			</div>
		)
	}

	const checkLimitCheckbox = showAll
		? checkbox?.filter(item => item.text?.toLowerCase().includes(searchValue.toLowerCase()))
		: visableCheckbox

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>
			{showAll && (
				<div className='mb-5'>
					<Input
						value={searchValue}
						placeholder={inputPlaceholder}
						className='bg-gray-50 border-none'
						onChange={e => setSearchValue(e.target.value)}
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{checkLimitCheckbox?.map((item, i) => (
					<FilterCheckbox
						key={item.value}
						name={name}
						onCheckedChange={() => onChange(item.value)}
						checked={selectedIds.has(item.value)}
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
					/>
				))}
			</div>

			{checkbox && checkbox?.length > limit && (
				<div>
					<button onClick={() => setShowAll(prev => !prev)} className='text-primary mt-3'>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			)}
		</div>
	)
}
