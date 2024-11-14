import { cn } from '@/lib'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTimeout } from 'react-use'
import { Meteors } from '../ui'
import BlurIn from '../ui/blur-in'
import ShinyButton from '../ui/shiny-button'
import TypingAnimation from '../ui/typing-animation'

const HyperText = dynamic(() => import('../ui/hyper-text'), {
	ssr: false,
	loading: () => <h1 className='text-4xl font-bold text-black dark:text-white'>LOADING PAGE...</h1>,
})

interface Props {
	setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean>>
	isLoadedVideo: boolean
}

export const LoadingPage: React.FC<Props> = ({ setIsLoadingPage, isLoadedVideo }) => {
	const [isLong] = useTimeout(5000)
	const [onLoad] = useTimeout(1000)

	return (
		<main className='relative flex items-center justify-center w-screen h-screen overflow-hidden'>
			<Meteors number={30} />
			<div className='flex flex-col items-center'>
				{isLoadedVideo && onLoad() ? (
					<BlurIn className='font-bold text-black dark:text-white' word='PAGE LOADED!' />
				) : (
					<HyperText className='text-4xl font-bold text-black dark:text-white' text='LOADING PAGE...' />
				)}

				{isLong() && !isLoadedVideo && (
					<TypingAnimation
						className={cn('text-xl font-bold text-black dark:text-white')}
						text="What's taking so long?"
					/>
				)}

				{isLoadedVideo && onLoad() && (
					<ShinyButton className='w-64 py-5 rounded-xl mt-7' onClick={() => setIsLoadingPage(false)}>
						<h2 className='text-xl font-bold text-black dark:text-white'>LET'S GOOOO</h2>
					</ShinyButton>
				)}
			</div>
		</main>
	)
}
