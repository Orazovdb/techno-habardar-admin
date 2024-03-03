export interface IProfile {
	uuid: string
	fullName: string
	phoneNumber: string
	avatar: string
	role: string
	[key: string]: string
}

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
	catId?: string
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

export interface IPost {
	uuid?: string
	title_tm: string
	title_ru: string
	title_en: string
	description_tm: string
	description_ru: string
	description_en: string
	content_tm: string
	content_ru: string
	content_en: string
	category_id: string
	image_path: string
	tag_id: ITags[]
	sub_category_id: ICategory[]
	author_id: IAuthor[]
}
