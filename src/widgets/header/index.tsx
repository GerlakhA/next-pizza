import { logoutAction } from '@/app/actions/logout'
import { Button } from '@/components'
import { CartButton } from '@/features/cart-button/ui'
import { cn } from '@/lib/utils'
import { Container, SearchInput } from '@/shared/ui'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HeaderProps {
	className?: string
}

export const Header = async ({ className }: HeaderProps) => {
	return (
		<header className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href={'/'} className='flex items-center gap-4'>
					<Image src={'/logo.png'} width={35} height={35} alt='logo' />
					<div className='flex flex-col items-center justify-center'>
						<h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
						<p className='text-sm text-gray-400 leading-3'>вкуснее уже некуда</p>
					</div>
				</Link>

				<div className='mx-10 flex-1 relative'>
					<SearchInput />
				</div>

				<div className='flex items-center gap-3'>
					<CartButton />
					<Button
						onClick={logoutAction}
						variant={'outline'}
						className='flex items-center gap-1'
					>
						<LogOut size={16} />
						Выйти
					</Button>
				</div>
			</Container>
		</header>
	)
}
