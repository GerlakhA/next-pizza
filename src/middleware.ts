import authConfig from '@/config/auth.config'
import NextAuth from 'next-auth'
import {
	apiAuthPrefix,
	authRoutes,
	DEFAULT_AUTH_REDIRECT,
	publicRoutes
} from './config/routes'

export const { auth } = NextAuth(authConfig)

export default auth(req => {
	const { nextUrl } = req

	const isLoggedIn = !!req.auth
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
	const isAuthRoute = authRoutes.includes(nextUrl.pathname)

	if (isApiAuthRoute) return null

	if (isAuthRoute) {
		if (isLoggedIn) {
			return Response.redirect(new URL(DEFAULT_AUTH_REDIRECT, nextUrl))
		}
		return null
	}

	if (!isLoggedIn && isPublicRoute) {
		return Response.redirect(new URL('/auth/login', nextUrl))
	}

	return null
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)'
	]
}
