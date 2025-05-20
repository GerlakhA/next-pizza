import { Icon } from 'leaflet'

export const DEFAULT_VALUES = {
	email: '',
	firstName: '',
	lastName: '',
	phone: '',
	address: '',
	comment: '',
	promo: ''
}

export const MARKER_ICON = new Icon({
	iconUrl: '/marker-map.png',
	iconSize: [55, 60],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34]
})

export const MOSCOW_CENTER: [number, number] = [55.755864, 37.617698]
