import { useEffect, useState } from 'react'

export const useConnectionSpeed = () => {
	const [speed, setSpeed] = useState<number | null>(null)

	useEffect(() => {
		const measureConnectionSpeed = async () => {
			const startTime = new Date().getTime()
			const response = await fetch('/500KB.bin', { cache: 'no-store' })
			const blob = await response.blob()
			const endTime = new Date().getTime()
			const fileSize = blob.size
			const duration = (endTime - startTime) / 1000
			const calculatedSpeed = ((fileSize / duration) * 8) / 512

			setSpeed(calculatedSpeed)
		}

		measureConnectionSpeed()
	}, [])

	return speed
}
