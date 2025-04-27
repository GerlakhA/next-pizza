import { Header } from '@/widgets/header'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import '../globals.css'

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
			<Toaster />
			<Suspense>
				<Header />
			</Suspense>
			{children}
			{modal}
		</main>
	)
}
