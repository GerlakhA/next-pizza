import { URL } from '@/config/constants'
import { Category } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetCategories = () => {
	const options = useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const res = await axios.get<Category[]>(`${URL}/categories`)
			return res.data
		}
	})

	return { ...options }
}
