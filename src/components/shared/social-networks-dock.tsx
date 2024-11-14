import { cn } from '@/lib/utils'
import { MailIcon, Pause, Play, Volume2Icon, VolumeOff } from 'lucide-react'
import Link from 'next/link'
import React, { SVGProps } from 'react'
import {
	Button,
	buttonVariants,
	Dock,
	DockIcon,
	Separator,
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui'
import { GitHubIcon } from './github-icon'
import { ThemeToggle } from './mode-toggle'
import { TelegramIcon } from './telegram-icon'

interface Props {
	handlePlayPause: () => void
	handleToggleSound: () => void
	playingVideo: boolean
	soundMuted: boolean
	className?: string
}

export type IconProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export const Icons = {
	email: (props: IconProps) => <MailIcon {...props} />,
	github: (props: IconProps) => <GitHubIcon {...props} />,
	telegram: (props: IconProps) => <TelegramIcon {...props} />,
}

const DATA = {
	contact: {
		social: {
			GitHub: {
				name: 'GitHub',
				url: 'https://github.com/Nnley',
				icon: Icons.github,
			},
			email: {
				name: 'Gmail',
				url: 'mailto:business@nnley.dev',
				icon: Icons.email,
			},
			telegram: {
				name: 'Telegram',
				url: 'https://t.me/myazof',
				icon: Icons.telegram,
			},
		},
	},
}

export const SocialNetworksDock: React.FC<Props> = ({
	handlePlayPause,
	handleToggleSound,
	playingVideo,
	soundMuted,
	className,
}) => {
	return (
		<TooltipProvider>
			<Dock direction='middle' className={className}>
				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							// TODO: Add volume change
							<Button variant='ghost' size='icon' className='size-12 rounded-full' onClick={handleToggleSound}>
								{soundMuted ? (
									<VolumeOff className='size-4 text-white dark:text-white/85' />
								) : (
									<Volume2Icon className='size-4 text-white dark:text-white/85' />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{soundMuted ? 'Unmute' : 'Mute'}</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant='ghost' size='icon' className='size-12 rounded-full' onClick={handlePlayPause}>
								{playingVideo ? (
									<Pause className='size-4 text-white dark:text-white/85' />
								) : (
									<Play className='size-4 text-white dark:text-white/85' />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>{playingVideo ? 'Pause' : 'Play'}</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
				<Separator orientation='vertical' className='h-full' />
				{Object.entries(DATA.contact.social).map(([name, social]) => (
					<DockIcon key={name}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={social.url}
									target='_blank'
									aria-label={social.name}
									className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12 rounded-full')}
								>
									<social.icon className='size-4 text-white dark:text-white/85' />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>{social.name}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}
				<Separator orientation='vertical' className='h-full py-2' />
				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<ThemeToggle className='size-12 rounded-full' />
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Theme</p>
						</TooltipContent>
					</Tooltip>
				</DockIcon>
			</Dock>
		</TooltipProvider>
	)
}
