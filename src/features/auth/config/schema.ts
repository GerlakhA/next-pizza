import { z } from 'zod'

export const formSchema = z.object({
	fullname: z
		.string()
		.min(3, {
			message: 'Имя должно содержать минимум 3 символа'
		})
		.max(50, {
			message: 'Имя не должно превышать 50 символов'
		}),
	email: z.string().email(),
	password: z.string().min(6, {
		message: 'Пароль должен содержать минимум 6 символов'
	})
})
