import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { useTimeout } from 'react-use'
import BlurIn from '../ui/blur-in'
import { StackCircles } from './stack-circles'

export const MeetingBlock: React.FC = () => {
	const [firstLoad] = useTimeout(1500)
	const [secondLoad] = useTimeout(3000)
	const [isMouseEnter, setIsMouseEnter] = React.useState(false)

	return (
		<div className='absolute inset-0 flex items-center justify-center'>
			{isMouseEnter ? (
				<StackCircles setIsMouseEnter={setIsMouseEnter} />
			) : (
				<div className='flex flex-col items-center'>
					<div className='h-[50px]'>
						{firstLoad() && (
							<motion.div initial={{ y: 0 }} animate={{ y: secondLoad() ? -20 : 0 }} transition={{ duration: 0.5 }}>
								<BlurIn className='text-5xl font-bold text-white dark:text-white' word='Hi, I am Nnley' />
							</motion.div>
						)}
					</div>
					<div className='h-[50px] md:mt-5'>
						{secondLoad() && (
							<motion.div
								className='flex md:gap-10 gap-7'
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5 }}
							>
								<BlurIn
									className='font-bold text-white dark:text-white text-xl md:text-2xl'
									word={
										<button
											onMouseEnter={() => setIsMouseEnter(true)}
											onMouseLeave={() => setIsMouseEnter(false)}
											className='hover:underline underline-offset-4'
										>
											my tech stack
										</button>
									}
								/>
								<BlurIn
									className='font-bold text-white dark:text-white text-xl md:text-2xl'
									word={
										<Link
											className='hover:underline underline-offset-4'
											target='_blank'
											href='https://github.com/Nnley?tab=repositories'
										>
											my projects
										</Link>
									}
								/>
							</motion.div>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
