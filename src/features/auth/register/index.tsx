'use client'

import { registerAction } from '@/app/actions/register'
import { Button, Dialog, DialogContent, DialogTitle, Input } from '@/components'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { DEFAULT_VALUES } from '../config/constants'
import { formSchema } from '../config/schema'

export const Register = () => {
	const [isPending, startTransition] = useTransition()
	const submitBtn = isPending ? 'Регестрируем аккаунт...' : 'Зарегестрироваться'

	const form = useForm<z.infer<typeof formSchema>>({
		defaultValues: DEFAULT_VALUES,
		mode: 'onChange',
		resolver: zodResolver(formSchema)
	})

	const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = data => {
		startTransition(() => {
			try {
				registerAction(data)
			} catch (error: any) {
				toast.error(error)
			}
		})
	}

	return (
		<Dialog open>
			<DialogContent className='p-8 w-[400px] min-h-[420px] bg-[#f7f6f5]'>
				<DialogTitle className='flex justify-center font-bold text-xl'>
					Регистрация
				</DialogTitle>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6'>
						<FormField
							name='fullname'
							control={form.control}
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel>Имя пользователя</FormLabel>
									<FormControl className='w-full'>
										<Input
											placeholder='Введите свое имя'
											{...field}
											className={cn(fieldState.error?.message && 'border-2 border-rose-500')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='email'
							control={form.control}
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='example@gmail.com'
											{...field}
											className={cn(fieldState.error?.message && 'border-2 border-rose-500')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name='password'
							control={form.control}
							render={({ field, fieldState }) => (
								<FormItem>
									<FormLabel>Пароль</FormLabel>
									<FormControl>
										<Input
											placeholder='Введите пароль'
											{...field}
											className={cn(fieldState.error?.message && 'border-2 border-rose-500')}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' disabled={isPending} className='w-full'>
							{submitBtn}
						</Button>

						<Link href={'/auth/login'}>
							<Button variant={'link'} className='w-full'>
								Уже есть аккаунт?
							</Button>
						</Link>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
