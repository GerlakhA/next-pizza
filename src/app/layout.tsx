import { QueryClientApp } from '@/provider/QueryClientApp'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900']
})

export default function RootLayout({
	children,
	modal
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={nunito.className}>
				<QueryClientApp>{children}</QueryClientApp>
			</body>
		</html>
	)
}
