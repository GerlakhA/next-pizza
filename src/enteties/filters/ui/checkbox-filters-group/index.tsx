'use client'

import { Input, Skeleton } from '@/components'
import { TCheckboxFiltersGroup } from '@/enteties/filters/config/types'
import { FilterCheckbox } from '@/enteties/filters/ui'
import { fakeArray } from '@/lib/helpers'
import { useState } from 'react'

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
}: TCheckboxFiltersGroup) => {
	const [searchValue, setSearchValue] = useState('')
	const [showAll, setShowAll] = useState(false)

	if (isLoading) {
		return (
			<div className=''>
				<p className='font-bold mb-3 mt-5'>{title}</p>
				{fakeArray(limit).map((_, i) => (
					<Skeleton key={i} className='h-6 mb-5 rounded-[8px]' />
				))}
				<Skeleton className='w-28 h-6 mb-5 rounded-[8px]' />
			</div>
		)
	}

	const checkLimitCheckbox = showAll
		? checkbox?.filter(item => item.text?.toLowerCase().includes(searchValue.toLowerCase()))
		: (checkbox || visableCheckbox)?.slice(0, limit)

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
