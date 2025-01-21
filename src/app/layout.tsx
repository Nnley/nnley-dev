import { Footer } from '@/components/shared/footer'
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
				<Footer className='flex fixed bottom-0 w-full text-center p-4 sm:gap-4 gap-3 justify-center items-center text-sm sm:text-base' />
			</body>
		</html>
	)
}
