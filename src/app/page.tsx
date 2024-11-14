'use client'

import { SocialNetworksDock } from '@/components/shared'
import { LoadingPage } from '@/components/shared/loading-page'
import { useAnimatedTitle } from '@/hooks/use-animated-title'
import { testSpeed } from '@/lib'
import React from 'react'

export default function Home() {
	useAnimatedTitle()

	const [mounted, setMounted] = React.useState(false)
	const [isPlaying, setIsPlaying] = React.useState(true)
	const [videoSrc, setVideoSrc] = React.useState('/videos/Von-dutch-480p.webm')
	const [isLoadingPage, setIsLoadingPage] = React.useState(true)
	const [loadingVideo, setLoadingVideo] = React.useState(true)
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
		setMounted(true)
	})

	React.useEffect(() => {
		document.addEventListener('click', enableSound)
		document.addEventListener('keydown', enableSound)

		return () => {
			document.removeEventListener('click', enableSound)
			document.removeEventListener('keydown', enableSound)
		}
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

	testSpeed({ setVideoSrc, setLoadingVideo })

	if (isLoadingPage) {
		return <LoadingPage setIsLoadingPage={setIsLoadingPage} isLoadedVideo={!loadingVideo} />
	}

	return (
		<main className='flex items-center justify-center bg-black'>
			{videoSrc && (
				<video
					ref={videoRef}
					autoPlay
					muted
					loop
					playsInline
					className='w-screen h-screen object-cover overflow-hidden opacity-20'
				>
					<source src={videoSrc} type='video/webm' />
				</video>
			)}
			<div className='fixed bottom-0 w-full text-center p-4 pb-14'>
				<SocialNetworksDock handlePlayPause={handlePlayPause} playingVideo={isPlaying} />
			</div>
		</main>
	)
}
