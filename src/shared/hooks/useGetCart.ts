import { CartService } from '@/services/Cart.service'
import { useQuery } from '@tanstack/react-query'

export const useGetCart = () => {
	const options = useQuery({
		queryKey: ['cart'],
		queryFn: () => CartService.getAll()
	})

	return { ...options }
}
