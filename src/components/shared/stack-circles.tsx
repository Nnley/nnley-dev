import { StackConfig } from '@/config/stack.config'
import { OrbitRadius } from '@/constants/stack.constants'
import { cn } from '@/lib'
import { useDeviceInfoStore } from '@/store/device-info'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import React from 'react'
import { useDebounce } from 'react-use'
import { TooltipProvider } from '../ui'
import { OrbitingStackIcon } from './orbiting-stack-icon'

interface Props {
	setIsMouseEnter: React.Dispatch<React.SetStateAction<boolean>>
	className?: string
}

export const StackCircles: React.FC<Props> = ({ setIsMouseEnter, className }) => {
	const isMobile = useDeviceInfoStore(state => state.isMobile)
	const [isMouseOver, setIsMouseOver] = React.useState(true)

	const variants = {
		hidden: { scale: 0.8, opacity: 0 },
		visible: { scale: 1, opacity: 1 },
	}

	useDebounce(
		() => {
			if (!isMouseOver) {
				setIsMouseEnter(false)
			}
		},
		300,
		[isMouseOver]
	)

	return (
		<TooltipProvider>
			<motion.div
				initial='hidden'
				animate={isMouseOver ? 'visible' : 'hidden'}
				exit='hidden'
				variants={variants}
				transition={{ duration: 0.3 }}
				onMouseEnter={() => {
					setIsMouseEnter(true)
					setIsMouseOver(true)
				}}
				onMouseLeave={() => setIsMouseOver(false)}
				className={cn(
					'absolute flex h-[500px] md:w-[420px] w-[340px] flex-col items-center justify-center overflow-hidden rounded-lg z-10',
					className
				)}
			>
				<button className='absolute right-0 top-16 cursor-pointer' onClick={() => setIsMouseOver(false)}>
					<X color='gray' />
				</button>

				<span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-black bg-clip-text text-center md:text-8xl text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black'>
					Stack
				</span>

				{StackConfig.map((stack, idx) => (
					<OrbitingStackIcon
						key={idx}
						className={stack.orbitRadius === OrbitRadius.Small ? 'size-[30px]' : 'size-[46px]'}
						icon={stack.icon}
						tooltipText={stack.tooltipText}
						duration={20}
						delay={idx * 5}
						radius={isMobile ? stack.orbitRadius * 0.85 : stack.orbitRadius}
					/>
				))}
			</motion.div>
		</TooltipProvider>
	)
}
