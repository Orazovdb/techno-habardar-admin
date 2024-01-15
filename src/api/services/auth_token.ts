export default function authToken() {
	const data = (localStorage.getItem('Authorization') as string) || null

	if (data) {
		return data
	}
	return null
}