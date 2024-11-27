'use client'

import { CheckboxFiltersGroup } from '@/shared/components/shared/checkbox-filters-group'
import { FilterCheckbox } from '@/shared/components/shared/filter-checkbox'
import { RangeSlider } from '@/shared/components/shared/range-slider'
import { Title } from '@/shared/components/shared/title'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'
import { allCheckbox, visableCheckbox } from './contants'

interface Props {
	className?: string
}

export const Filters = ({ className }: Props) => {
	const [price, setPrice] = useState({ minimum: 0, maximum: 10000 })

	return (
		<div className={className}>
			<Title text='Фильтрация ' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<FilterCheckbox text='Можно собирать' value='1' />
				<FilterCheckbox text='Новинки' value='2' />
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						value={String(price.minimum)}
						min={0}
						max={10000}
						onChange={e =>
							setPrice({ minimum: Number(e.target.value), maximum: price.maximum })
						}
					/>
					<Input
						type='number'
						placeholder='10000'
						value={String(price.maximum)}
						min={0}
						max={10000}
						onChange={e =>
							setPrice({ minimum: price.minimum, maximum: Number(e.target.value) })
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={10000}
					step={10}
					value={[price.minimum, price.maximum]}
					onValueChange={([minimum, maximum]) => setPrice({ minimum, maximum })}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Ингридиенты'
				className='mt-5'
				limit={6}
				visableCheckbox={visableCheckbox}
				checkbox={allCheckbox}
			/>
		</div>
	)
}
