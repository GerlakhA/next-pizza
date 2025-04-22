import { $Enums } from '@prisma/client'
import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			role: $Enums.UserRole
			id: string
		} & DefaultSession['user']
	}
}

import 'next-auth/jwt'

declare module 'next-auth/jwt' {
	interface JWT {
		role: $Enums.UserRole
		id: string
	}
}
