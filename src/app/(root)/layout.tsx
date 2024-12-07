import { QueryClientApp } from '@/provider/QueryClientApp'
import { Header } from '@/shared'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import '../globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900']
})

export const metadata: Metadata = {
	title: 'Next Pizza | Главная',
	icons: '/logo.png'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<QueryClientApp>
					<main className='min-h-screen'>
						<Header />
						{children}
					</main>
				</QueryClientApp>
			</body>
		</html>
	)
}
