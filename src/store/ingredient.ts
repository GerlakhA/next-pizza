import { create } from 'zustand'

type TIngredientPrice = {
	prices: number[]
	setPrices: (prices: number[]) => void
}

export const useIngredientPrice = create<TIngredientPrice>(set => ({
	prices: [],
	setPrices: (prices: number[]) => set(prev => ({ ...prev, prices }))
}))
