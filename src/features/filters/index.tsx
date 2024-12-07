'use client'

import { Input } from '@/components'
import { checboxSizes, checboxTypes } from '@/enteties/filters/config/constants'
import { TFilters } from '@/enteties/filters/config/types'
import { CheckboxFiltersGroup } from '@/enteties/filters/ui'
import { useFiltersIngredients } from '@/hooks/useFiltersIngredients'
import { RangeSlider, Title } from '@/shared'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'

export const Filters = ({ className }: TFilters) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [price, setPrice] = useState({
		minPrice: Number(searchParams.get('minPrice')) || undefined,
		maxPrice: Number(searchParams.get('maxPrice')) || undefined
	})
	const [sizesIds, { toggle: toggleSizesId }] = useSet(
		new Set<string>(searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [])
	)
	const [typesIds, { toggle: toggleTypeId }] = useSet(
		new Set<string>(searchParams.get('type') ? searchParams.get('type')?.split(',') : [])
	)
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

	useEffect(() => {
		const filters = {
			...price,
			sizes: Array.from(sizesIds),
			type: Array.from(typesIds),
			ingredients: Array.from(selectedIds)
		}
		const queryString = qs.stringify(filters, {
			arrayFormat: 'comma'
		})

		router.push(`?${queryString}`, {
			scroll: false
		})
	}, [price, sizesIds, typesIds, selectedIds])

	console.log(searchParams)

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
				selectedIds={selectedIds}
				onChange={onChangeCheckboxId}
				isLoading={isLoading}
				visableCheckbox={visibleIngredients?.slice(0, 6)}
				checkbox={visibleIngredients}
			/>
		</div>
	)
}
