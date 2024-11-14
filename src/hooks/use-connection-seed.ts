import { useEffect, useState } from 'react'

export const useConnectionSpeed = () => {
	const [speed, setSpeed] = useState(0)

	useEffect(() => {
		const measureConnectionSpeed = async () => {
			const startTime = new Date().getTime()
			const response = await fetch('/500KB.bin')
			const blob = await response.blob()
			const endTime = new Date().getTime()
			const fileSize = blob.size
			const duration = (endTime - startTime) / 1000
			const speed = ((fileSize / duration) * 8) / 1024

			setSpeed(speed)
		}

		measureConnectionSpeed()
	}, [])

	return speed
}
