'use client'

import { SocialNetworksDock } from '@/components/shared'
import { LoadingPage } from '@/components/shared/loading-page'
import { MeetingBlock } from '@/components/shared/meeting-block'
import { useAnimatedTitle } from '@/hooks'
import { cn } from '@/lib'
import { useDeviceInfoStore } from '@/store/device-info'
import { useVideoSourceStore } from '@/store/video-source'
import React from 'react'

// TODO: Create module files for all styles
export default function Home() {
	useAnimatedTitle()

	const [isLoadingPage, setIsLoadingPage] = React.useState(true)

	const [isPlaying, setIsPlaying] = React.useState(true)
	const [soundMuted, setSoundMuted] = React.useState(false)

	const videoRef = React.useRef<HTMLVideoElement | null>(null)
	const videoSrc = useVideoSourceStore(state => state.videoSrc)

	const isMobile = useDeviceInfoStore(state => state.isMobile)

	// TODO: Split the code refactor into files (optimize)
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

	const handleToggleSound = () => {
		if (videoRef.current) {
			if (soundMuted) {
				videoRef.current.muted = false
			} else {
				videoRef.current.muted = true
			}
			setSoundMuted(!soundMuted)
		}
	}

	if (isLoadingPage) {
		return <LoadingPage setIsLoadingPage={setIsLoadingPage} />
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
					className={cn('object-cover overflow-hidden opacity-20', isMobile ? 'w-dvh h-dvh' : 'w-screen h-screen')}
				>
					<source src={videoSrc} type='video/webm' />
				</video>
			)}

			<MeetingBlock />

			<div className='fixed bottom-0 w-full text-center p-4 pb-14'>
				<SocialNetworksDock
					handleToggleSound={handleToggleSound}
					handlePlayPause={handlePlayPause}
					playingVideo={isPlaying}
					soundMuted={soundMuted}
				/>
			</div>
		</main>
	)
}
