import authConfig from '@/config/auth.config'
import { prisma } from '@/prisma/prisma-client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	callbacks: {
		// async signIn({ user }) {
		// 	if (user) {
		// 		toast.success('вы вошли в аккаунт')
		// 	}

		// 	return true
		// },
		// async session({ session, token, user }) {
		// 	if (session && token) {
		// 		session.user.id = token.id
		// 	}

		// 	return session
		// },

		async jwt({ token, user }) {
			console.log(token)
			return token
		}
	},
	...authConfig
})
