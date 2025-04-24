'use server'

import { signIn } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/config/routes'
import { formSchema } from '@/features/auth/config/schema'
import { getUserByEmail } from '@/lib/user'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export async function loginAction(data: z.infer<typeof formSchema>) {
	const validateData = await formSchema.parseAsync(data)

	const { email, password, fullname } = validateData

	const user = await getUserByEmail(email)

	if (!user || !user.password) {
		return { error: 'Такого пользователя не существует' }
	}

	try {
		await signIn('credentials', {
			fullname,
			email,
			password,
			redirectTo: DEFAULT_AUTH_REDIRECT
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Неверные данные' }
				default:
					return { error: 'Что то пошло не так' }
			}
		}

		throw error
	}
}
