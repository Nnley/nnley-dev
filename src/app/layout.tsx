import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from './providers'

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
})
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
})

export const metadata: Metadata = {
	title: '⠀',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<Providers attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					{children}
				</Providers>
				<footer className='fixed bottom-0 w-full text-center p-4'>
					<p className='text-zinc-500 dark:text-zinc-600 mt-4'>© {new Date().getFullYear()} Nnley</p>
				</footer>
			</body>
		</html>
	)
}
