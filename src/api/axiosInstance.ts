import axios from 'axios'
import AuthToken from './services/auth_token'

// const token = "Bearer " + AuthToken()
const token = AuthToken()

const BASE_URL = 'http://216.250.12.77/api/v2'
// const BASE_URL = 'http://10.192.5.65:1234/api/v2'
const BASE_IMG_URL = 'http://216.250.12.77/uploads'
// const BASE_IMG_URL = 'http://10.192.5.65:1234/uploads'
const axiosPrivateInstance = axios.create({
	baseURL: 'http://216.250.12.77/api/v2',
	// baseURL: 'http://10.192.5.65:1234/api/v2',
	headers: {
		Authorization: token
	}
})

const axiosInstance = axios.create({
	baseURL: 'http://216.250.12.77/api/v2'
	// baseURL: 'http://10.192.5.65:1234/api/v2'
})

export { BASE_IMG_URL, BASE_URL, axiosInstance, axiosPrivateInstance }
