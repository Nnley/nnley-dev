'use client'

import { SocialNetworksDock } from '@/components/shared'
import { LoadingPage } from '@/components/shared/loading-page'
import { videoQualities } from '@/config/video.config'
import { useAnimatedTitle, useConnectionSpeed } from '@/hooks'
import React from 'react'

export default function Home() {
	useAnimatedTitle()

	const [isPlaying, setIsPlaying] = React.useState(true)
	const [videoSrc, setVideoSrc] = React.useState('/videos/Von-dutch-480p.webm')
	const [isLoadingPage, setIsLoadingPage] = React.useState(true)
	const [loadingVideo, setLoadingVideo] = React.useState(true)
	const videoRef = React.useRef<HTMLVideoElement | null>(null)

	const speed = useConnectionSpeed()

	React.useEffect(() => {
		if (speed > 8000) {
			setVideoSrc(videoQualities['1080p'])
		} else if (speed > 3000) {
			setVideoSrc(videoQualities['720p'])
		} else if (speed > 1000) {
			setVideoSrc(videoQualities['480p'])
		} else {
			setVideoSrc('')
		}

		setLoadingVideo(false)
	}, [speed])

	React.useEffect(() => {
		const enableSound = () => {
			if (videoRef.current) {
				videoRef.current.muted = false
				videoRef.current.volume = 0.1
			}
		}

		enableSound()
	}, [isLoadingPage])

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
