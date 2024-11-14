'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui'

export const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
	const { setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<Button
			className={className}
			variant='ghost'
			size='icon'
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
		>
			{resolvedTheme === 'dark' ? <Sun className='size-4' /> : <Moon color='white' className='size-4' />}
		</Button>
	)
}
