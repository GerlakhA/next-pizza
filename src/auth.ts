import authConfig from '@/config/auth.config'
import { prisma } from '@/prisma/prisma-client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'
import { getUserById } from './lib/user'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	callbacks: {
		async session({ session, token }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role
			}

			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.role = existingUser.role

			return token
		}
	},
	...authConfig
})
