'use client'

import { useGetProducts } from '@/hooks/useGetProducts'
import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar
} from '@/shared/components/shared'
import { useCategoryStore } from '@/store/category'

export default function Home() {
	const { data: pizzas, isLoading } = useGetProducts()
	const categoryId = useCategoryStore(state => state.categoryId)

	// if (isLoading) {
	// 	return <p>Loading...</p>
	// }

	return (
		<main>
			<Container className='mt-10'>
				<Title text='Все пиццы' size='lg' className='font-extrabold' />
			</Container>
			<TopBar />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-[80px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							<ProductsGroupList title='Пиццы' items={pizzas} categoryId={0} />
							<ProductsGroupList title='Завтрак' items={pizzas} categoryId={1} />
						</div>
					</div>
				</div>
			</Container>
		</main>
	)
}
