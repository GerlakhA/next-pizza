import { cn } from '@/lib/utils'
import React from 'react'
import { Title } from '../title'

interface Props {
	title?: string
	endAdornment?: React.ReactNode
	className?: string
	contentClassName?: string
}

export const ContentBlock: React.FC<React.PropsWithChildren<Props>> = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children
}) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<div className='flex items-center justify-between p-5 px-7 border-b border-gray-100'>
					<Title text={title} size='sm' className='font-bold' />
					{endAdornment}
				</div>
			)}

			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	)
}
