import { Container } from '@/shared/ui'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'

export const metadata: Metadata = {
	title: 'Next Pizza | Оформление заказа',
	icons: '/logo.png'
}

export default function OrderLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<main className='min-h-screen bg-[#F4F1EE]'>
			<SessionProvider>
				<Container>{children}</Container>
			</SessionProvider>
		</main>
	)
}
