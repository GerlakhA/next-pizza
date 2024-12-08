import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { useFiltersIngredients } from './useFiltersIngredients'

export const useFilterFromSearchParams = () => {
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
		ingredientsIds,
		onChangeCheckboxId
	} = useFiltersIngredients()

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

	return {
		price,
		setPrice,
		typesIds,
		sizesIds,
		ingredientsIds,
		toggleSizesId,
		toggleTypeId,
		ingredients,
		isLoading,
		onChangeCheckboxId
	}
}
