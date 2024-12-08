import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useSet } from 'react-use'

export const useFilterFromSearchParams = () => {
	const searchParams = useSearchParams()

	const [ingredientsIds, { toggle: toggleIngredientsId }] = useSet(
		new Set<string>(
			searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []
		)
	)
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

	return {
		price,
		setPrice,
		typesIds,
		sizesIds,
		ingredientsIds,
		toggleSizesId,
		toggleTypeId,
		toggleIngredientsId
	}
}
