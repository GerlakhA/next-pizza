'use client'

import { useFiltersIngredients } from '@/hooks/useFiltersIngredients'
import { CheckboxFiltersGroup } from '@/shared/components/shared/checkbox-filters-group'
import { RangeSlider } from '@/shared/components/shared/range-slider'
import { Title } from '@/shared/components/shared/title'
import { Input } from '@/shared/components/ui/input'
import { useState } from 'react'
import { useSet } from 'react-use'

interface Props {
	className?: string
}

export const Filters = ({ className }: Props) => {
	const [price, setPrice] = useState({ minimum: 0, maximum: 10000 })
	const [sizesIds, { toggle: toggleSizesId }] = useSet(new Set<string>([]))
	const [typesIds, { toggle: toggleTypeId }] = useSet(new Set<string>([]))
	const {
		data: ingredients,
		isLoading,
		selectedIds,
		onChangeCheckboxId
	} = useFiltersIngredients()

	const visibleIngredients = ingredients?.map(ingredient => ({
		text: ingredient.name,
		value: String(ingredient.id)
	}))

	return (
		<div className={className}>
			<Title text='Фильтрация ' size='sm' className='mb-5 font-bold' />

			<div className='flex flex-col gap-4'>
				<CheckboxFiltersGroup
					title='Тип теста'
					name={'type'}
					className='mt-5'
					selectedIds={typesIds}
					onChange={toggleTypeId}
					isLoading={isLoading}
					visableCheckbox={[
						{ value: '1', text: 'Тонкое' },
						{ value: '2', text: 'Толстое' }
					]}
				/>

				<CheckboxFiltersGroup
					title='Размеры'
					name={'sizes'}
					className='mb-5'
					onChange={toggleSizesId}
					selectedIds={sizesIds}
					isLoading={isLoading}
					visableCheckbox={[
						{ text: '20 см', value: '20' },
						{ text: '30 см', value: '30' },
						{ text: '40 см', value: '40' }
					]}
				/>
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
				name={'ingredients'}
				className='mt-5'
				limit={6}
				selectedIds={selectedIds}
				onChange={onChangeCheckboxId}
				isLoading={isLoading}
				visableCheckbox={visibleIngredients?.slice(0, 6)}
				checkbox={visibleIngredients}
			/>
		</div>
	)
}
