'use client'

import { Input } from '@/components'
import { checboxSizes, checboxTypes } from '@/enteties/filters/config/constants'
import { TFilters } from '@/enteties/filters/config/types'
import { CheckboxFiltersGroup } from '@/enteties/filters/ui'
import { useFilterFromSearchParams } from '@/hooks/useFilterFromSearchParams'
import { RangeSlider, Title } from '@/shared'

export const Filters = ({ className }: TFilters) => {
	const {
		ingredients,
		price,
		setPrice,
		isLoading,
		onChangeCheckboxId,
		ingredientsIds,
		typesIds,
		sizesIds,
		toggleSizesId,
		toggleTypeId
	} = useFilterFromSearchParams()

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
					visableCheckbox={checboxTypes}
				/>

				<CheckboxFiltersGroup
					title='Размеры'
					name={'sizes'}
					className='mb-5'
					onChange={toggleSizesId}
					selectedIds={sizesIds}
					isLoading={isLoading}
					visableCheckbox={checboxSizes}
				/>
			</div>

			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Цена от и до:</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						value={String(price.minPrice)}
						min={0}
						max={10000}
						onChange={e =>
							setPrice({ minPrice: Number(e.target.value), maxPrice: price.maxPrice })
						}
					/>
					<Input
						type='number'
						placeholder='10000'
						value={String(price.maxPrice)}
						min={0}
						max={10000}
						onChange={e =>
							setPrice({ minPrice: price.minPrice, maxPrice: Number(e.target.value) })
						}
					/>
				</div>

				<RangeSlider
					min={0}
					max={10000}
					step={10}
					value={[price.minPrice || 0, price.maxPrice || 10000]}
					onValueChange={([minPrice, maxPrice]) => setPrice({ minPrice, maxPrice })}
				/>
			</div>

			<CheckboxFiltersGroup
				title='Ингридиенты'
				name={'ingredients'}
				className='mt-5'
				limit={6}
				selectedIds={ingredientsIds}
				onChange={onChangeCheckboxId}
				isLoading={isLoading}
				visableCheckbox={visibleIngredients?.slice(0, 6)}
				checkbox={visibleIngredients}
			/>
		</div>
	)
}
