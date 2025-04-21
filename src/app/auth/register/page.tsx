import { Register } from '@/features/auth/register'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Регистрация'
	// icons: '/lock.png'
}

const RegisterPage = () => {
	return <Register />
}

export default RegisterPage
