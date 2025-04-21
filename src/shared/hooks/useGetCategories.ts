import { ApiRoutes } from '@/config/constants'
import { AxiosInstance } from '@/services/instance'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const useGetCategories = () => {
	const options = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await AxiosInstance.get<Category[]>(ApiRoutes.CATEGORIES)
			return res.data
		}
	})

	return { ...options }
}
