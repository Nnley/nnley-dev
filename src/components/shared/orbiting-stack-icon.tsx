import { cn } from '@/lib'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui'
import OrbitingCircles from '../ui/orbiting-circles'

interface Props {
	icon: React.FC
	tooltipText: string
	duration: number
	delay: number
	radius: number
	className?: string
}

export const OrbitingStackIcon: React.FC<Props> = ({ icon: Icon, tooltipText, duration, delay, radius, className }) => {
	return (
		<OrbitingCircles
			className={cn('border-none bg-transparent dark:bg-transparent', className)}
			duration={duration}
			delay={delay}
			radius={radius}
		>
			<Tooltip delayDuration={10}>
				<TooltipTrigger asChild>
					<button>
						<Icon />
					</button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</OrbitingCircles>
	)
}
