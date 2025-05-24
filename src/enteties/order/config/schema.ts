import { promocodes } from '@/config/constants'
import { z } from 'zod'

export const orderFormSchema = z.object({
	firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
	lastName: z.string().optional(),
	email: z.string().email({ message: 'Введите корректную почту' }),
	phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
	address: z.string().min(5, { message: 'Введите корректный адрес' }),
	comment: z.string().optional(),
	promo: z
		.string()
		.refine(val => !val || promocodes.includes(val), {
			message: 'Неверный промокод или истек срок действия'
		})
		.optional()
})
