import { formSchema } from '@/features/auth/config/schema'
import { compare } from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { getUserByEmail } from './data/user'

export default {
	providers: [
		GitHub,
		Credentials({
			credentials: {
				fullname: {},
				email: {},
				password: {}
			},
			authorize: async credentials => {
				const validatedCredentials = await formSchema.parseAsync(credentials)

				const user = await getUserByEmail(validatedCredentials.email)

				if (!user || !user.password || !user.fullname) {
					throw new Error('Вы заполнили не все данные')
				}

				const passwordMatch = await compare(validatedCredentials.password, user.password)

				if (passwordMatch) {
					return { name: user.fullname, ...user }
				}

				return null
			}
		})
	]
} satisfies NextAuthConfig
