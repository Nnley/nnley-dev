import { X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'
import OrbitingCircles from '../ui/orbiting-circles'
import { StackIcons } from './stack-icons'

interface Props {
	setIsMouseEnter: React.Dispatch<React.SetStateAction<boolean>>
}

// TODO: Split the code refactor into files (optimize)
export const StackCircles: React.FC<Props> = ({ setIsMouseEnter }) => {
	return (
		<TooltipProvider>
			<div
				onMouseEnter={() => setIsMouseEnter(true)}
				onMouseLeave={() => setIsMouseEnter(false)}
				className='absolute flex h-[500px] w-[420px] flex-col items-center justify-center overflow-hidden rounded-lg z-10'
			>
				<button className='absolute right-4 top-14 cursor-pointer' onClick={() => setIsMouseEnter(false)}>
					<X color='gray' />
				</button>

				<span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-black bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black'>
					Stack
				</span>

				<OrbitingCircles
					className='size-[30px] border-none bg-transparent dark:bg-transparent'
					duration={20}
					delay={20}
					radius={80}
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.nestJs />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>NestJS</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[30px] border-none bg-transparent dark:bg-transparent'
					duration={20}
					delay={10}
					radius={80}
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.python />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Python</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[30px] border-none bg-transparent dark:bg-transparent'
					duration={20}
					delay={5}
					radius={80}
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.postgres />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Postgres</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[30px] border-none bg-transparent dark:bg-transparent'
					duration={20}
					delay={15}
					radius={80}
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.typescript />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Typescript</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>

				<OrbitingCircles
					className='size-[46px] border-none bg-transparent dark:bg-transparent'
					radius={180}
					duration={20}
					reverse
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.tailwind />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Tailwind</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[46px] border-none bg-transparent dark:bg-transparent'
					radius={180}
					duration={20}
					delay={20}
					reverse
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.reactJs />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>ReactJS</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[46px] border-none bg-transparent dark:bg-transparent'
					radius={180}
					duration={20}
					delay={15}
					reverse
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.prisma />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Prisma</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
				<OrbitingCircles
					className='size-[46px] border-none bg-transparent dark:bg-transparent'
					radius={180}
					duration={20}
					delay={5}
					reverse
				>
					<Tooltip delayDuration={10}>
						<TooltipTrigger asChild>
							<button>
								<StackIcons.nextJs />
							</button>
						</TooltipTrigger>
						<TooltipContent>
							<p>NextJS</p>
						</TooltipContent>
					</Tooltip>
				</OrbitingCircles>
			</div>
		</TooltipProvider>
	)
}
