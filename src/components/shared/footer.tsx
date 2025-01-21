'use client'

import { Separator } from '@/components/ui'
import Link from 'next/link'
import React from 'react'

interface Props {
	className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
	return (
		<footer className={className}>
			<p className='text-zinc-500 dark:text-zinc-600 opacity-60'>© {new Date().getFullYear()} Nnley</p>
			<Separator orientation='vertical' className='sm:h-[24px] h-[20px] opacity-90' />
			<Link
				href='https://youtu.be/cwZ1L_0QLjw?si=TMaue5aoI3xpj1m9'
				target='_blank'
				className='text-zinc-500 dark:text-zinc-600 opacity-60 hover:opacity-100'
			>
				Charli XCX - Von Dutch
			</Link>
		</footer>
	)
}
