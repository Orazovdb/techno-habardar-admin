import { useNavigate } from '@tanstack/react-location'
import { Toaster } from 'react-hot-toast'
import styles from './Header.module.scss'

const Header = () => {
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('Authorization')
		navigate({ to: '/login', replace: true })
	}
	return (
		<header className={styles.header}>
			<Toaster position='top-right' reverseOrder={false} />
			<h1>ADMIN</h1>

			
			<button onClick={logout}>Logout</button>
		</header>
	)
}

export default Header
