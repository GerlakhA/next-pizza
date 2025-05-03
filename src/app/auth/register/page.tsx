import { Register } from '@/features/auth/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Регистрация'
	// icons: '/lock.png'
}

const RegisterPage = () => {
	return <Register />
}

export default RegisterPage
