export interface ICategoryLng {
	tm: string
	ru: string
	en: string
}

export interface ICategory {
	UUID: string
	name: ICategoryLng
}

export interface ISubCategory {
	catId: string
	name: string
}
