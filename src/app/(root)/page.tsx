'use client'

import { Skeleton } from '@/components'
import { Filters } from '@/features/filters'
import { ProductsGroupList } from '@/features/products-group-list'
import { useGetProducts } from '@/hooks/useGetProducts'
import { fakeArray } from '@/lib/helpers'
import { Container, Title, TopBar } from '@/shared'

export default function Home() {
	const { data: pizzas, isLoading } = useGetProducts()
	// const categoryId = useCategoryStore(state => state.categoryId)

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
									{fakeArray(6).map((_, i) => (
										<div key={i} className='p-4'>
											<div className='flex justify-center p-6 bg-[#F5F5F4]/30 rounded-lg h-[260px]'>
												<Skeleton className='w-[215px] h-[215px] rounded-full' />
											</div>
											<Skeleton className='rounded-[8px] w-[227px] h-[30px] mb-4 mt-4' />
											<div className='flex flex-col gap-2 mb-4'>
												<Skeleton className='rounded-[8px] w-[255px] h-[10px]' />
												<Skeleton className='rounded-[8px] w-[240px] h-[10px]' />
												<Skeleton className='rounded-[8px] w-[110px] h-[10px]' />
											</div>
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
