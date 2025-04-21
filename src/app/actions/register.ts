'use server'

import { signIn } from '@/auth'
import { DEFAULT_AUTH_REDIRECT } from '@/config/routes'
import { formSchema } from '@/features/auth/config/schema'
import { prisma } from '@/prisma/prisma-client'
import { hash } from 'bcryptjs'
import { AuthError } from 'next-auth'
import { z } from 'zod'

export const registerAction = async (data: z.infer<typeof formSchema>) => {
	const validateData = await formSchema.parseAsync(data)
	const { email, password, fullname } = validateData

	const hashedPassword = await hash(password, 10)

	const existingUser = await prisma.user.findUnique({
		where: { email }
	})

	if (existingUser) {
		return { error: 'Пользователь уже существует' }
	}

	const user = await prisma.user.create({
		data: {
			fullname,
			email,
			password: hashedPassword
		}
	})

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
