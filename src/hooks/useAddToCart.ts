import { CartService } from '@/services/Cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddToCart = () => {
	const client = useQueryClient()
	const options = useMutation({
		mutationKey: ['addToCart'],
		mutationFn: () => CartService.addProduct(),
		onSuccess: async () => {
			const { toast } = await import('react-hot-toast')
			toast.success('Товар добавлен в корзину')
			client.invalidateQueries({ queryKey: ['cart'] })
		}
	})
}
