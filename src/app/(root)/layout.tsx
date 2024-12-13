import { Header } from '@/shared'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import '../globals.css'

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
	icons: '/logo.png'
}

export default function HomeLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{modal}
		</main>
	)
}
