'use client'

import { SocialNetworksDock } from '@/components/shared'
import { useAnimatedTitle } from '@/hooks/use-animated-title'
import React from 'react'

export default function Home() {
	useAnimatedTitle()

	const [mounted, setMounted] = React.useState(false)
	const [isPlaying, setIsPlaying] = React.useState(true)
	const videoRef = React.useRef<HTMLVideoElement | null>(null)

	const enableSound = () => {
		if (videoRef.current) {
			videoRef.current.muted = false
			videoRef.current.volume = 0.1
		}

		document.removeEventListener('click', enableSound)
		document.removeEventListener('keydown', enableSound)
	}

	React.useEffect(() => {
		document.addEventListener('click', enableSound)
		document.addEventListener('keydown', enableSound)

		return () => {
			document.removeEventListener('click', enableSound)
			document.removeEventListener('keydown', enableSound)
		}
	}, [])

	React.useEffect(() => {
		setMounted(true)
	}, [])

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	if (!mounted) {
		return null
	}

	return (
		<main className='flex items-center justify-center bg-black'>
			<video
				ref={videoRef}
				autoPlay
				muted
				loop
				playsInline
				className='w-screen h-screen object-cover overflow-hidden opacity-20'
			>
				<source src='/videos/Von-dutch-1080p.webm' type='video/webm' />
			</video>
			<div className='fixed bottom-0 w-full text-center p-4 pb-14'>
				<SocialNetworksDock handlePlayPause={handlePlayPause} playingVideo={isPlaying} />
			</div>
		</main>
	)
}
