export interface LanguageData {
	[key: string]: string
}

export interface ICategoryLng {
	tm: string
	ru: string
	en: string
}

export interface IPopup {
	children?: React.ReactNode
	title?: string
	width?: string
	message?: string
	itemProp?: any
	isOpen: Boolean
	handleClose: () => void
	handleSend?: (e: any) => void
}

export interface ICategory {
	UUID?: string
	slug?: string
	name: LanguageData
	sub_categories?: ICategory[]
}

export interface ISubCategory {
	UUID?: string
	catId?: string
	slug?: string
	name: LanguageData
	catName?: LanguageData
}

export interface IAuthor {
	UUID?: string
	slug: string
	name: LanguageData
}

export interface IAuthorGet {
	authors: IAuthor[]
}

export interface ITags {
	UUID?: string
	slug: string
	name: LanguageData
}

export interface ITagsGet {
	tags: ITags[]
}
