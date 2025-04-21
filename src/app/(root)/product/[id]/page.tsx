import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/ui'
import ProductForm from '@/shared/ui/product-form'
import { notFound } from 'next/navigation'

interface Props {
	params: {
		id: number
	}
	size: number
}

const ProductPageById = async ({ params, size }: Props) => {
	const productById = await prisma.product.findFirst({
		where: {
			id: Number(params.id)
		}
	})

	if (!productById) {
		return notFound()
	}

	return (
		<Container className='flex flex-col my-10'>
			<ProductForm product={productById} size={size} />
		</Container>
	)
}

export default ProductPageById
