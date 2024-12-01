'use client'

import { cn } from '@/lib/utils'
import { ProductsService } from '@/services/Products.service'
import { Input } from '@/shared/components/ui'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
	className?: string
}

const SearchInput = ({ className }: Props) => {
	const [searchQuery, setSearchQuery] = useState('')
	const [products, setProducts] = useState<Product[]>([])
	const [focused, setFocused] = useState(false)

	const ref = useRef(null)

	useClickAway(ref, () => setFocused(false))

	const handleClick = () => {
		setFocused(false)
		setSearchQuery('')
	}

	useDebounce(
		() => {
			ProductsService.search(searchQuery).then(data => setProducts(data))
		},
		500,
		[searchQuery]
	)

	return (
		<>
			{focused && (
				<div className={cn('fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30')} />
			)}
			<div
				ref={ref}
				className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}
			>
				<Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<Input
					placeholder='Найти пиццу...'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					onClick={() => setFocused(true)}
					className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
				/>

				<div
					className={cn(
						'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-500 invisible opacity-0 z-30',
						focused && 'visible opacity-100 top-12'
					)}
				>
					{products?.length ? (
						products.map(product => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								onClick={handleClick}
								className='flex items-center gap-1 px-3 py-2 hover:bg-primary/10 cursor-pointer'
							>
								<Image src={product.imageUrl} width={40} height={40} alt={product.imageUrl} />
								<span>{product.name}</span>
							</Link>
						))
					) : (
						<p className='text-center text-neutral-500'>Извините, такого продукта нет</p>
					)}
				</div>
			</div>
		</>
	)
}

export default SearchInput
