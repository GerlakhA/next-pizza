import { $Enums } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			/** The user's postal address. */
			role: $Enums.UserRole
			id: string
		} & DefaultSession['user']
	}
}

import 'next-auth/jwt'

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		role: $Enums.UserRole
		id: string
	}
}
