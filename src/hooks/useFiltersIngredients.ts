import { IngredientsService } from '@/services/Ingredients.service'
import { useQuery } from '@tanstack/react-query'
import { useSet } from 'react-use'

export const useFiltersIngredients = () => {
	const [selectedIds, { toggle }] = useSet(new Set<string>([]))
	const options = useQuery({
		queryKey: ['ingredients'],
		queryFn: async () => {
			try {
				return IngredientsService.getAll()
			} catch (error: any) {
				const { toast } = await import('react-hot-toast')
				toast.error(error)
			}
		}
	})

	return { ...options, selectedIds, onChangeCheckboxId: toggle }
}
