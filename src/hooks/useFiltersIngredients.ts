import { IngredientsService } from '@/services/Ingredients.service'
import { useQuery } from '@tanstack/react-query'

export const useFiltersIngredients = () => {
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

	return { ...options }
}
