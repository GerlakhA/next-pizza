import { ApiRoutes } from '@/config/constants'
import { ProductWithRelations } from '@/config/types'
import { AxiosInstance } from '@/services/instance'
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	const options = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await AxiosInstance.get<ProductWithRelations[]>(ApiRoutes.SEARCH_PRODUCTS)
			return res.data
		}
	})

	return { ...options }
}
