import { URL } from '@/config/constants'
import { ProductWithRelations } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useGetProducts = () => {
	const options = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const res = await axios.get<ProductWithRelations[]>(`${URL}/products/search`)
			return res.data
		}
	})

	return { ...options }
}
