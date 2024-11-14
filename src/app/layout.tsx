import { Separator } from '@/components/ui'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Link from 'next/link'
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
				<footer className='flex fixed bottom-0 w-full text-center p-4 gap-4 justify-center items-center'>
					<p className='text-zinc-500 dark:text-zinc-600 mt-4 opacity-60'>© {new Date().getFullYear()} Nnley</p>
					<Separator orientation='vertical' className='h-[24px] mt-4 opacity-90' />
					<Link
						href='https://youtu.be/cwZ1L_0QLjw?si=TMaue5aoI3xpj1m9'
						target='_blank'
						className='text-zinc-500 dark:text-zinc-600 mt-4 opacity-60 hover:opacity-100'
					>
						Charli XCX - Von Dutch
					</Link>
				</footer>
			</body>
		</html>
	)
}
