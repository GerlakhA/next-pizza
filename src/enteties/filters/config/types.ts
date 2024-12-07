export interface FilterChecboxProps {
	text: string
	value: string
	endAdornment?: React.ReactNode
	onCheckedChange?: (checked: boolean) => void
	checked?: boolean
	name?: string
}

type Checkbox = FilterChecboxProps

export type TCheckboxFiltersGroup = {
	title: string
	className?: string
	checkbox?: Checkbox[]
	visableCheckbox?: Checkbox[]
	limit?: number
	selectedIds: Set<string>
	name: string
	isLoading: boolean
	inputPlaceholder?: string
	onChange: (value: string) => void
	defaultValue?: string[]
}
