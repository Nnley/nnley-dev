import { cn } from '@/lib/utils'
import { HomeIcon, MailIcon } from 'lucide-react'
import Link from 'next/link'
import React, { SVGProps } from 'react'
import {
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

export const SocialNetworksDock: React.FC<Props> = ({ className }) => {
	return (
		<TooltipProvider>
			<Dock direction='middle' className={className}>
				{DATA.navbar.map(item => (
					<DockIcon key={item.label}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={item.href}
									aria-label={item.label}
									className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'size-12 rounded-full')}
								>
									<item.icon className='size-4' />
								</Link>
							</TooltipTrigger>
							<TooltipContent>
								<p>{item.label}</p>
							</TooltipContent>
						</Tooltip>
					</DockIcon>
				))}
				<Separator orientation='vertical' className='h-full' />
				{Object.entries(DATA.contact.social).map(([name, social]) => (
					<DockIcon key={name}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href={social.url}
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
