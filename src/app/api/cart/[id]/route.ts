import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
	params: {
		id: string
	}
}

export async function DELETE(req: NextRequest, { params }: Props) {
	if (!params || !params.id) {
		return NextResponse.json({ message: 'ID продукта не найден' }, { status: 400 })
	}

	try {
		let token = '11111'

		if (!token) {
			token = crypto.randomUUID()
		}

		const deleteCartItem = await prisma.cartItem.delete({
			where: {
				id: Number(params.id)
			}
		})

		const resp = NextResponse.json(params.id)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json(
			{ message: `Не удалось удалить товар из корзины id: ${params.id}` },
			{ status: 500 }
		)
	}
}
