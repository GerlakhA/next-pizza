import { Product } from '@prisma/client'
import Image from 'next/image'
import { Title } from '../title'

type Props = {
	product: Product
	size: number
}

const ProductForm = ({ product, size }: Props) => {
	return (
		<div className='flex flex-col gap-10'>
			<Image src={product.imageUrl} alt={product.name} width={350} height={350} />
			<Title text={product.name} />
		</div>
	)
}

export default ProductForm
