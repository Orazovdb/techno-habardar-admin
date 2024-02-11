import { IAuthor, ICategory, ISubCategory } from '@/types/types'
import { request } from '../services/auth_helper_vue'

import ProfileAddTypes from '../Types/queryReturnTypes/UploadProfile'

export const ADD_FILE = ({ data }: any): Promise<any> =>
	request({ url: `/admin/file`, data, file: true })

export const ADD_PROFILE = ({ data }: any): Promise<ProfileAddTypes> =>
	request({ url: `/admin/update`, data })

export const ADD_CATEGORIES = ({ data }: any): Promise<ICategory> =>
	request({ url: `/category/add`, data })

export const DELETE_CATEGORIES = ({ data }: any): Promise<any> =>
	request({ url: `/category/delete`, data })

export const ADD_SUBCATEGORIES = ({ data }: any): Promise<ISubCategory> =>
	request({ url: `/category/sub-add`, data })

export const DELETE_SUBCATEGORIES = ({ data }: any): Promise<any> =>
	request({ url: `/category/sub-delete`, data })

export const ADD_AUTHOR = ({ data }: any): Promise<IAuthor> =>
	request({ url: `/author`, data })

export const DELETE_AUTHOR = ({ data }: any): Promise<any> =>
	request({ url: `/api/v2/author/${data.uuid}`, method: 'delete', data })
