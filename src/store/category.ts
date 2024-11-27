import { create } from 'zustand'

export type PropsStore = {
	categoryId: number
	setCategoryId: (id: number) => void
}

export const useCategoryStore = create<PropsStore>(set => ({
	categoryId: 0,
	setCategoryId: (categoryId: number) => set({ categoryId })
}))
