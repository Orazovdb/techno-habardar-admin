import { useNavigate } from '@tanstack/react-location'

const Dashboard = () => {
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('Authorization')
		navigate({ to: '/login', replace: true })
	}

	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	)
}

export default Dashboard
