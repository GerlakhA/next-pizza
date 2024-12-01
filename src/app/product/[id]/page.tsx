interface Props {
	params: {
		id: number
	}
}

const ProductPageById = ({ params }: Props) => {
	return <div>{params.id}</div>
}

export default ProductPageById
