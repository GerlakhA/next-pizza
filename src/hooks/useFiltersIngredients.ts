import { IngredientsService } from '@/services/Ingredients.service'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useSet } from 'react-use'

export const useFiltersIngredients = () => {
	const searchParams = useSearchParams()
	const [ingredientsIds, { toggle }] = useSet(
		new Set<string>(
			searchParams.get('ingredients') ? searchParams.get('ingredients')?.split(',') : []
		)
	)
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

	return { ...options, ingredientsIds, onChangeCheckboxId: toggle }
}
