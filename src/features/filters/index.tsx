'use client'

import { Input } from '@/components'
import {
	checboxSizes,
	checboxTypes,
	LIMIT_VISIBLE_INGREDIENTS,
	MAX_PRICE,
	MIN_PRICE
} from '@/enteties/filters/config/constants'
import { TFilters } from '@/enteties/filters/config/types'
import { CheckboxFiltersGroup } from '@/enteties/filters/ui'
import { useFilterFromSearchParams } from '@/hooks/useFilterFromSearchParams'
import { useFiltersIngredients } from '@/hooks/useFiltersIngredients'
import { RangeSlider, Title } from '@/shared'
import { useRouter } from 'next/navigation'
import qs from 'qs'
import { useEffect } from 'react'

export const Filters = ({ className }: TFilters) => {
	const router = useRouter()
	const { data: ingredients, isLoading } = useFiltersIngredients()

	const {
		price,
		setPrice,
		toggleIngredientsId,
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

	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice({ minPrice: Number(e.target.value), maxPrice: price.maxPrice })
	}

	useEffect(() => {
		const filters = {
			...price,
			sizes: Array.from(sizesIds),
			type: Array.from(typesIds),
			ingredients: Array.from(ingredientsIds)
		}
		const queryString = qs.stringify(filters, {
			arrayFormat: 'comma'
		})

		router.push(`?${queryString}`, {
			scroll: false
		})
	}, [price, sizesIds, typesIds, ingredientsIds])

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
						placeholder={`${MIN_PRICE}`}
						value={String(price.minPrice)}
						min={MIN_PRICE}
						max={MAX_PRICE}
						onChange={e => handleChangePrice(e)}
					/>
					<Input
						type='number'
						placeholder={`${MAX_PRICE}`}
						value={String(price.maxPrice)}
						min={MIN_PRICE}
						max={MAX_PRICE}
						onChange={e => handleChangePrice(e)}
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
				limit={LIMIT_VISIBLE_INGREDIENTS}
				selectedIds={ingredientsIds}
				onChange={toggleIngredientsId}
				isLoading={isLoading}
				visableCheckbox={visibleIngredients?.slice(0, 6)}
				checkbox={visibleIngredients}
			/>
		</div>
	)
}
