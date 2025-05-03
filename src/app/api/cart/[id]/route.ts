import { findProductById } from '@/lib/findProductById'
import { updateCartTotalAmount } from '@/lib/updateCartTotalAmount'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: Awaited<{ params: { id: string } }>
) {
	try {
		const { id } = await params

		const data = (await req.json()) as { quantity: number }

		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await findProductById(Number(id))

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.update({
			where: {
				id: Number(id)
			},
			data: {
				quantity: data.quantity
			}
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json({ message: 'Не удалось обновить корзину' }, { status: 500 })
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: Awaited<{ params: { id: string } }>
) {
	try {
		const { id } = await params
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await findProductById(Number(id))

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.delete({
			where: {
				id: Number(id)
			}
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json({ message: 'Не удалось удалить корзину' }, { status: 500 })
	}
}
