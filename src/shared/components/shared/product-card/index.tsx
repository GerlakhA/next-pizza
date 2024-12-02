import { Title } from '@/shared/components/shared'
import { Button } from '@/shared/components/ui/button'
import { ProductWithRelations } from '@/types'
import { Ingredient } from '@prisma/client'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
	product: ProductWithRelations
	ingredients: Ingredient[]
	price: number
}

export const ProductCard = ({ product, ingredients, price }: Props) => {
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

			<div className='flex justify-between items-center'>
				<span className='text-[20px]'>от {price} ₽</span>

				<Button variant={'secondary'} className='text-base font-bold'>
					<Plus size={20} className='mr-1' />
					Добавить
				</Button>
			</div>
		</div>
	)
}
