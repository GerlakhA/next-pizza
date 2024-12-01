'use client'

import { useGetProducts } from '@/hooks/useGetProducts'
import { Skeleton } from '@/shared/components'
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
							{isLoading ? (
								<div className={'grid grid-cols-3 gap-[50px]'}>
									{Array(6)
										.fill(0)
										.map((_, i) => (
											<div key={i} className='p-4'>
												<div className='flex justify-center p-6 bg-[#F5F5F4]/30 rounded-lg h-[260px]'>
													<Skeleton className='w-[215px] h-[215px] rounded-full' />
												</div>
												<Skeleton className='mb-1 mt-3 rounded-md w-full' />
												<Skeleton className='rounded-md w-[100px]' />
												<div className='flex justify-between items-center'>
													<Skeleton className='w-[85px] h-[30px] rounded-md' />

													<Skeleton className='w-[125px] h-[45px] rounded-md' />
												</div>
											</div>
										))}
								</div>
							) : (
								<>
									<ProductsGroupList title='Пиццы' items={pizzas} categoryId={0} />
									<ProductsGroupList title='Завтрак' items={pizzas} categoryId={1} />
								</>
							)}
						</div>
					</div>
				</div>
			</Container>
		</main>
	)
}
