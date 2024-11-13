'use client'

import { SocialNetworksDock } from '@/components/shared'
import { useAnimatedTitle } from '@/hooks/use-animated-title'
import React from 'react'

export default function Home() {
	useAnimatedTitle()

	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<>
			<main className='flex items-center justify-center'></main>
			<footer className='fixed bottom-0 w-full text-center p-4'>
				<SocialNetworksDock />
				<p className='text-gray-300 dark:text-gray-500 mt-4'>© {new Date().getFullYear()} Nnley</p>
			</footer>
		</>
	)
}
