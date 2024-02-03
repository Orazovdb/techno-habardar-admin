import IconComponent from '@/components/ui/icon/Icon'
import { Link, useMatch, useNavigate } from '@tanstack/react-location'
import cn from 'clsx'
import styles from './Sidebar.module.scss'
import { MENU } from './sidebar.routes'

const Sidebar = () => {
	const match = useMatch()
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('Authorization')
		navigate({ to: '/admin/login', replace: true })
	}

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header}>
				<div className={styles.logo}></div>
				<h1>Techno habardar</h1>
			</div>
			<nav className={styles.menu}>
				<h1 className={styles.menuTitle}>Main menu</h1>
				<ul className={styles.list}>
					{MENU.map(item => (
						<Link
							to={item.url}
							key={item.url}
							className={cn({
								[styles.active]: match.pathname === item.url
							})}
						>
							<div className={styles.icon}>
								<IconComponent icon={item.icon} />
							</div>
							<h2>{item.title}</h2>
						</Link>
					))}
				</ul>
				<button onClick={logout}>
					<IconComponent icon='logout' />
					<h1>Logout</h1>
				</button>
			</nav>
		</aside>
	)
}

export default Sidebar
