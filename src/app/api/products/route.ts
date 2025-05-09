import { fetchProducts, GetSearchParams } from '@/lib/fetchProducts'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
	req: NextRequest,
	{ searchParams }: { searchParams: GetSearchParams }
) => {
	try {
		const data = await searchParams

		const products = await fetchProducts(data)

		return NextResponse.json(products)
	} catch (error) {
		console.log('[PRODUCTS_GET] Server error', error)
		return NextResponse.json({ message: 'Не удалось получить продукты' }, { status: 500 })
	}
}
