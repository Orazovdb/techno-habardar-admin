import axios, { AxiosRequestConfig } from 'axios'
import { BASE_URL } from '../axiosInstance'

const baseURL = BASE_URL

interface RequestOptions {
	url: string
	method?: 'get' | 'post' | 'put' | 'delete'
	headers?: Record<any, any>
	params?: Record<string, string | number>
	data?: Record<string, any>
	onUploadProgress?: any
	file?: boolean
}

export const request = async ({
	url,
	method = 'post',
	headers = {},
	params = {},
	data = {},
	onUploadProgress = {},
	file = false
}: RequestOptions): Promise<any> => {
	if (file) {
		headers['Accept'] = 'application/json'
		headers['Content-Type'] = 'multipart/form-data'
		const formData = new FormData()
		if (data?.files?.length) {
			for (let i = 0; i < data.files.length; i++) {
				formData.append('files', data.files[i])
			}
		}
		for (const [key, value] of Object.entries(data)) {
			if (key !== 'files') {
				formData.append(key, value)
			}
		}
		data = formData
	}

	if (localStorage.getItem('Authorization')) {
		headers['Authorization'] = localStorage.getItem('Authorization')
	}

	const config: AxiosRequestConfig = {
		url: `${baseURL}${url}`,
		method,
		headers,
		...onUploadProgress,
		params,
		data
	}

	const response = await axios(config)
	return response.data.data
}
