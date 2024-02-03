import { ICategory } from '@/types/types'
import ProfileType from '../Types/queryReturnTypes/Profile'
import { get, postProfile } from '../services/auth_helper'

export const GET_PROFILE = (): Promise<ProfileType> => {
	return postProfile<ProfileType>(`/admin/get-profile`)
}

export const GET_CATEGORIES = (): Promise<ICategory[]> => {
	return get<ICategory[]>(`/category/get-all`)
}
