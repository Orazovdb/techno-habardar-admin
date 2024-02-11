export interface LanguageData {
	[key: string]: string
}

export interface IPopup {
	title?: string
	handleClose: () => void
	isOpen: Boolean
	children?: React.ReactNode
	message?: string
	handleSend?: (e: any) => void
	itemProp?: any
}

export interface ICategoryLng {
	tm: string
	ru: string
	en: string
}

export interface CategoriesTypes {
	UUID?: string
	name: LanguageData
}

export interface ICategory {
	UUID?: string
	name: LanguageData
	slug: string
}

export interface ISubCategory {
	catId?: string
	name: LanguageData
	slug: string
}

export interface IAuthor {
	UUID?: string
	slug: string
	name: LanguageData
}

export interface IAuthorGet {
	authors: IAuthor[]
}
