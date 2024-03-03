import {
	IAuthorGet,
	ICategory,
	IProfile,
	ISubCategory,
	ITagsGet
} from '@/types/types'
import { get, postProfile } from '../services/auth_helper'
import { request } from '../services/auth_helper_vue'

export const GET_PROFILE = (): Promise<IProfile> => {
	return postProfile<IProfile>(`/admin/get-profile`)
}

export const GET_CATEGORIES = (): Promise<ICategory[]> => {
	return get<ICategory[]>(`/category/get-all`)
}

export const GET_CAT_SUB = (): Promise<ICategory[]> => {
	return get<ICategory[]>(`/category/get-categories`)
}

export const GET_SUBCATEGORIES = (): Promise<ISubCategory[]> => {
	return get<ISubCategory[]>(`/category/sub-get-all`)
}

export const GET_AUTHOR = ({ params }: any): Promise<IAuthorGet> =>
	request({ url: `/author`, method: 'get' })

export const GET_TAGS = ({ params }: any): Promise<ITagsGet> =>
	request({ url: `/tag`, method: 'get', params: params })

export const GET_SEARCHED_CAT = ({ params }: any): Promise<any> =>
	request({
		url: `/post`,
		method: 'get',
		params: params
	})
