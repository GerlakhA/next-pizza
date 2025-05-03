import { Login } from '@/features/auth/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Логин'
	// icons: '/lock.png'
}

const LoginPage = async () => {
	return <Login />
}

export default LoginPage
