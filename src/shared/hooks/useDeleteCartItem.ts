import { CartService } from '@/services/Cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useDeleteCartItem = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => CartService.deleteCartItem(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			toast.success('Товар успешно удален')
		},
		onError: () => {
			toast.error('Произошла какая то ошибка, товар не удален')
		}
	})
}
