import { request } from '../services/auth_helper_vue'
import { CategoriesTypes } from '../Types/queryReturnTypes/Categories'

import ProfileAddTypes from '../Types/queryReturnTypes/UploadProfile'

export const ADD_FILE = ({ data }: any): Promise<any> =>
	request({ url: `/admin/file`, data, file: true })

export const ADD_PROFILE = ({ data }: any): Promise<ProfileAddTypes> =>
	request({ url: `/admin/update`, data })

export const ADD_CATEGORIES = ({ data }: any): Promise<CategoriesTypes> =>
	request({ url: `/category/add`, data })
