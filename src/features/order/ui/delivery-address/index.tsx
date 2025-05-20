'use client'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { MARKER_ICON, MOSCOW_CENTER } from '@/enteties/order/config/constants'
import { ContentBlock } from '@/shared/ui'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { useFormContext } from 'react-hook-form'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

function MapUpdater({ center }: { center: [number, number] }) {
	const map = useMap()

	useEffect(() => {
		map.setView(center, 15)
	}, [center, map])

	return null
}

export const DeliveryAddress = () => {
	const { control, setValue } = useFormContext()
	const [coordinates, setCoordinates] = useState<[number, number]>(MOSCOW_CENTER)
	const [mapKey, setMapKey] = useState(0)

	const handleAddressSelect = (suggestion?: DaDataSuggestion<DaDataAddress>) => {
		if (suggestion && suggestion.data.geo_lat && suggestion.data.geo_lon) {
			const lat = Number.parseFloat(suggestion.data.geo_lat)
			const lon = Number.parseFloat(suggestion.data.geo_lon)
			setCoordinates([lat, lon])

			setMapKey(prev => prev + 1)
			setValue('address', suggestion.data)
		}
	}

	return (
		<ContentBlock title='3. Адрес доставки'>
			<div className='flex flex-col gap-5'>
				<div className='relative z-50'>
					<FormField
						name='address'
						control={control}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormControl>
									<AddressSuggestions
										token='9557a255ff82ccbf70023d630a31be7c92ac12aa'
										onChange={suggestion => {
											field.onChange(suggestion)
											handleAddressSelect(suggestion)
										}}
										inputProps={{
											placeholder: 'Введите адрес доставки',
											className:
												'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
										}}
										containerClassName='relative'
										suggestionsClassName='bg-white border z-100 rounded-md shadow-lg max-h-60 overflow-y-auto absolute w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className='h-[400px] w-full rounded-md overflow-hidden border mt-8 relative z-10'>
					<MapContainer
						key={mapKey}
						center={coordinates}
						zoom={15}
						scrollWheelZoom={true}
						style={{ height: '100%', width: '100%' }}
						attributionControl={false}
					>
						<TileLayer
							url='https://mt0.google.com/vt/lyrs=m&hl=ru&x={x}&y={y}&z={z}'
							attribution=''
						/>
						<Marker position={coordinates} icon={MARKER_ICON} />
						<MapUpdater center={coordinates} />
					</MapContainer>
				</div>

				<textarea
					name='comment'
					className='text-base p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='Комментарий к заказу'
					rows={5}
				/>
			</div>
		</ContentBlock>
	)
}
