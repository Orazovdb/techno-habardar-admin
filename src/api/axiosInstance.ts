import axios from 'axios'
import AuthToken from './services/auth_token'

// const token = "Bearer " + AuthToken()
const token = AuthToken()

const BASE_URL = 'http://216.250.12.77/api/v2'
const BASE_IMG_URL = 'http://216.250.12.77/uploads'
const axiosPrivateInstance = axios.create({
	baseURL: 'http://216.250.12.77/api/v2',
	headers: {
		Authorization: token
	}
})

const axiosInstance = axios.create({
	baseURL: 'http://216.250.12.77/api/v2'
})

export { BASE_IMG_URL, BASE_URL, axiosInstance, axiosPrivateInstance }
