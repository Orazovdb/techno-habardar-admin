import { IAuthor, ICategory, ISubCategory, ITags } from '@/types/types'
import { request } from '../services/auth_helper_vue'

import ProfileAddTypes from '../Types/queryReturnTypes/UploadProfile'

export const ADD_FILE = ({ data }: any): Promise<any> =>
	request({ url: `/admin/file`, data, file: true })

export const ADD_PROFILE = ({ data }: any): Promise<ProfileAddTypes> =>
	request({ url: `/admin/update`, data })

// ================= categories ===================
export const ADD_CATEGORIES = ({ data }: any): Promise<ICategory> =>
	request({ url: `/category/add`, data })
export const DELETE_CATEGORIES = ({ data }: any): Promise<any> =>
	request({ url: `/category/delete`, data })

// ================= sub-categories ===================
export const ADD_SUBCATEGORIES = ({ data }: any): Promise<ISubCategory> =>
	request({ url: `/category/sub-add`, data })
export const DELETE_SUBCATEGORIES = ({ data }: any): Promise<any> =>
	request({ url: `/category/sub-delete`, data })

// ================= author ===================
export const ADD_AUTHOR = ({ data, url, method }: any): Promise<IAuthor> =>
	request({ url: url, data: data, method: method })
export const DELETE_AUTHOR = ({ data }: any): Promise<any> =>
	request({ url: `/author/${data.uuid}`, method: 'delete', data })
export const PUT_AUTHOR = ({ data }: any): Promise<any> =>
	request({ url: `/author/${data.uuid}`, method: 'put', data })

// ================= tag ===================
export const ADD_TAG = ({data, url, method }: any): Promise<ITags> =>
	request({url: url, data: data, method: method })
export const DELETE_TAG = ({ data }: any): Promise<any> =>
	request({ url: `/tag/${data.uuid}`, method: 'delete', data })
export const PUT_TAG = ({ data }: any): Promise<any> =>
	request({ url: `/tag/${data.uuid}`, method: 'put', data })
