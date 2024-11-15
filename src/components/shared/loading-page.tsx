import { videoQualities } from '@/config/video.config'
import { useConnectionSpeed } from '@/hooks'
import { cn } from '@/lib'
import { useDeviceInfoStore } from '@/store/device-info'
import { useVideoSourceStore } from '@/store/video-source'
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
}

export const LoadingPage: React.FC<Props> = ({ setIsLoadingPage }) => {
	const [isLong] = useTimeout(10000)
	const [isLoadedPageTimeout] = useTimeout(1000) // Just so the page doesn't blink

	const [isVideoContentLoaded, setIsVideoContentLoaded] = React.useState(false)

	const { videoSrc, isLoadingVideo, setIsLoadingVideo, setVideoSrc } = useVideoSourceStore(state => state)
	const videoRef = React.useRef<HTMLVideoElement>(null)
	const updateIsMobile = useDeviceInfoStore(state => state.updateIsMobile)

	const speed = useConnectionSpeed()

	React.useEffect(() => {
		updateIsMobile()
	}, [updateIsMobile])

	React.useEffect(() => {
		if (!speed) return

		if (speed > 6000) {
			setVideoSrc(videoQualities['1080p'])
		} else if (speed > 2000) {
			setVideoSrc(videoQualities['720p'])
		} else if (speed > 700) {
			setVideoSrc(videoQualities['480p'])
		} else {
			setVideoSrc('')
		}

		setIsLoadingVideo(false)
	}, [speed])

	const handleProgress = () => {
		if (videoRef.current) {
			console.log(videoRef.current)

			const buffered = videoRef.current.buffered

			if (buffered.length > 0) {
				const loaded = buffered.end(buffered.length - 1)

				console.log(loaded)

				if (loaded >= 5) {
					setIsVideoContentLoaded(true)
				}
			}
		}
	}

	React.useEffect(() => {
		if (videoRef.current) {
			if (videoRef.current.readyState === 4) {
				return setIsVideoContentLoaded(true)
			}

			videoRef.current.addEventListener('progress', handleProgress)
			videoRef.current.addEventListener('loadeddata', handleProgress)
		}

		return () => {
			if (videoRef.current) {
				videoRef.current.removeEventListener('progress', handleProgress)
				videoRef.current.removeEventListener('loadeddata', handleProgress)
			}
		}
	}, [videoSrc, videoRef.current])

	return (
		<main className='relative flex items-center justify-center w-screen h-screen overflow-hidden'>
			<Meteors number={30} />
			<div className='flex flex-col items-center'>
				{!isLoadingVideo && isLoadedPageTimeout() && isVideoContentLoaded ? (
					<BlurIn className='font-bold text-black dark:text-white' word='PAGE LOADED!' />
				) : (
					<HyperText className='text-4xl font-bold text-black dark:text-white' text='LOADING PAGE...' />
				)}

				{!isLoadingVideo && isLoadedPageTimeout() && isVideoContentLoaded && (
					<ShinyButton className='w-64 py-5 rounded-xl mt-7' onClick={() => setIsLoadingPage(false)}>
						<h2 className='text-xl font-bold text-black dark:text-white'>LET'S GOOOO</h2>
					</ShinyButton>
				)}

				{isLong() && isLoadingVideo && !isVideoContentLoaded && (
					<TypingAnimation
						className={cn('text-xl font-bold text-black dark:text-white')}
						text="What's taking so long?"
					/>
				)}

				{speed && speed < 700 && (
					<BlurIn
						className={cn('font-normal text-black/30 dark:text-white/30 mt-7 max-w-xs')}
						word={<p className='text-lg'>(I suggest coming back here when your internet connection gets better!)</p>}
					/>
				)}
			</div>

			{/* A little bit of video caching (secretly 🤫) */}
			{videoSrc && !isLoadingVideo && (
				<video ref={videoRef} muted autoPlay className='hidden'>
					<source src={videoSrc} type='video/webm' />
				</video>
			)}
		</main>
	)
}
