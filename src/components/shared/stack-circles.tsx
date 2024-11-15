import { StackConfig } from '@/config/stack.config'
import { OrbitRadius } from '@/constants/stack.constants'
import { useDeviceInfoStore } from '@/store/device-info'
import { X } from 'lucide-react'
import { TooltipProvider } from '../ui'
import { OrbitingStackIcon } from './orbiting-stack-icon'

interface Props {
	setIsMouseEnter: React.Dispatch<React.SetStateAction<boolean>>
}

export const StackCircles: React.FC<Props> = ({ setIsMouseEnter }) => {
	const isMobile = useDeviceInfoStore(state => state.isMobile)

	return (
		<TooltipProvider>
			<div
				onMouseEnter={() => setIsMouseEnter(true)}
				onMouseLeave={() => setIsMouseEnter(false)}
				className='absolute flex h-[500px] md:w-[420px] w-[340px] flex-col items-center justify-center overflow-hidden rounded-lg z-10'
			>
				<button className='absolute right-0 top-16 cursor-pointer' onClick={() => setIsMouseEnter(false)}>
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
			</div>
		</TooltipProvider>
	)
}
