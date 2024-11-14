import { cn } from '@/lib/utils'
import { HomeIcon, MailIcon, Pause, Play } from 'lucide-react'
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
	playingVideo: boolean
	className?: string
}

export type IconProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export const Icons = {
	email: (props: IconProps) => <MailIcon color='white' {...props} />,
	github: (props: IconProps) => <GitHubIcon {...props} />,
	telegram: (props: IconProps) => <TelegramIcon {...props} />,
}

const DATA = {
	navbar: [{ href: '#', icon: HomeIcon, label: 'Home' }],
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

export const SocialNetworksDock: React.FC<Props> = ({ handlePlayPause, playingVideo, className }) => {
	return (
		<TooltipProvider>
			<Dock direction='middle' className={className}>
				{DATA.navbar.map(item => (
					<DockIcon key={item.label}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									target='_blank'
									aria-label={item.label}
									className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12 rounded-full')}
								>
									<item.icon color='white' className='size-4' />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}
				<DockIcon>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant='ghost' size='icon' className='size-12 rounded-full' onClick={handlePlayPause}>
								{playingVideo ? <Pause color='white' /> : <Play color='white' />}
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
									<social.icon className='size-4' />
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
