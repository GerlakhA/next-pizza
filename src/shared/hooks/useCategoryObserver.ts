import { useCategoryStore } from '@/store/category'
import { title } from 'process'
import React from 'react'
import { useIntersection } from 'react-use'

export const useCategoryObserver = (ref: React.RefObject<HTMLElement>, categoryId: number) => {
	const setCategoryId = useCategoryStore(state => state.setCategoryId)

	const intersection = useIntersection(ref, {
		threshold: 0.6
	})

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, title])
}
