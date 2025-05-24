'use client'

import { Input } from '@/components'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ContentBlock } from '@/shared/ui'
import { useMask } from '@react-input/mask'
import { useFormContext } from 'react-hook-form'

export const PersonalInfo = () => {
	const { control } = useFormContext()
	const inputRef = useMask({
		mask: '+7 (___) ___-__-__',
		replacement: { _: /\d/ }
	})

	return (
		<ContentBlock title='2. Персональная информация'>
			<div className='flex items-center gap-4'>
				<FormField
					name='firstName'
					control={control}
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Имя</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Имя' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='lastName'
					control={control}
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Фамилия</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Фамилия' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<div className='flex items-center gap-4 mt-6'>
				<FormField
					name='email'
					control={control}
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>E-mail</FormLabel>
							<FormControl>
								<Input {...field} placeholder='Email' />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name='phone'
					control={control}
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormLabel>Телефон</FormLabel>
							<FormControl>
								<Input {...field} placeholder='+7 (999) 999-99-99' ref={inputRef} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
		</ContentBlock>
	)
}
