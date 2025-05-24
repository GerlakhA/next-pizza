import { ApiRoutes } from '@/config/constants'
import { AxiosInstance } from '@/services/instance'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useDeleteOrder = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			const res = await AxiosInstance.delete(ApiRoutes.CART + `/${id}`)

			return res.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			toast.success('Корзина успешно удалена')
		},
		onError: () => {
			toast.error('Произошла ошибка при удалении корзины')
		}
	})
}
