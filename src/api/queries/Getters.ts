import { IAuthorGet, ICategory, ISubCategory, ITagsGet } from '@/types/types'
import ProfileType from '../Types/queryReturnTypes/Profile'
import { get, postProfile } from '../services/auth_helper'
import { request } from '../services/auth_helper_vue'

export const GET_PROFILE = (): Promise<ProfileType> => {
	return postProfile<ProfileType>(`/admin/get-profile`)
}

export const GET_CATEGORIES = (): Promise<ICategory[]> => {
	return get<ICategory[]>(`/category/get-all`)
}

export const GET_SUBCATEGORIES = (): Promise<ISubCategory[]> => {
	return get<ISubCategory[]>(`/category/sub-get-all`)
}

export const GET_AUTHOR = ({ params }: any): Promise<IAuthorGet> =>
	request({ url: `/author`, method: 'get' })
// params: params

export const GET_TAGS = ({ params }: any): Promise<ITagsGet> =>
	request({ url: `/tag`, method: 'get', params: params })
