import { useEffect } from 'react'

interface Props {
	setVideoSrc: React.Dispatch<React.SetStateAction<string>>
	setLoadingVideo: React.Dispatch<React.SetStateAction<boolean>>
}

export const testSpeed = ({ setVideoSrc, setLoadingVideo }: Props) => {
	useEffect(() => {
		const measureConnectionSpeed = async () => {
			const startTime = new Date().getTime()
			const response = await fetch('/500KB.bin')
			const blob = await response.blob()
			const endTime = new Date().getTime()
			const fileSize = blob.size
			const duration = (endTime - startTime) / 1000
			const speed = ((fileSize / duration) * 8) / 1024

			if (speed > 8000) {
				setVideoSrc('/videos/Von-dutch-1080p.webm')
			} else if (speed > 3000) {
				setVideoSrc('/videos/Von-dutch-720p.webm')
			} else if (speed > 1000) {
				setVideoSrc('/videos/Von-dutch-480p.webm')
			} else {
				setVideoSrc('')
			}

			setLoadingVideo(false)
		}

		measureConnectionSpeed()
	}, [setVideoSrc, setLoadingVideo])
}
