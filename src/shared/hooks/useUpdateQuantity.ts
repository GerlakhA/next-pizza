import { TUpdateQuantity } from '@/config/types'
import { CartService } from '@/services/Cart.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useUpdateQuantity = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: TUpdateQuantity) => CartService.updateQuantity(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
		onError: () => {
			toast.error('Не удалось изменить количество товара')
		}
	})
}
