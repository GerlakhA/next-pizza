import { Button } from '@/components'
import { TProductCard } from '@/enteties/product/config/constants'
import { Title } from '@/shared'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const ProductCard = ({ product, ingredients, price }: TProductCard) => {
	return (
		<div className='p-4'>
			<Link href={`/product/${product.id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<Image src={product.imageUrl} width={215} height={215} alt={product.name} />
				</div>
			</Link>

			<Title text={product.name} size='sm' className='mb-1 mt-3 font-bold' />
			<p className='text-sm text-gray-400'>
				Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок
			</p>

			<div className='flex justify-between items-center mt-4'>
				<span className='text-[20px]'>от {price} ₽</span>

				<Button variant={'secondary'} className='text-base font-bold'>
					<Plus size={20} className='mr-1' />
					Добавить
				</Button>
			</div>
		</div>
	)
}
