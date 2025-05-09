import { ApiRoutes } from '@/config/constants'
import { AxiosInstance } from '@/services/instance'
import { useQuery } from '@tanstack/react-query'

export const useGetProducts = () => {
	const options = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await AxiosInstance.get<any>(ApiRoutes.PRODUCTS)
			return res.data
		}
	})

	return { ...options }
}
