'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components'
import { ProductWithRelations } from '@/config/types'
import { cn } from '@/lib/utils'
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/modals'
import { useRouter } from 'next/navigation'

type TChooseProductModal = {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal = ({ product, className }: TChooseProductModal) => {
	const router = useRouter()
	const isPizzaType = Boolean(product.items[0].pizzaType)

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				<DialogTitle></DialogTitle>
				{isPizzaType ? (
					<ChoosePizzaForm product={product} />
				) : (
					<ChooseProductForm product={product} />
				)}
			</DialogContent>
		</Dialog>
	)
}
