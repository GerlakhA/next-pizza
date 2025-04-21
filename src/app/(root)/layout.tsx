import type { Metadata } from 'next'
import { Suspense } from 'react'
import '../globals.css'
import { Header } from '@/widgets/header'

export const metadata: Metadata = {
	title: 'Главная',
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
