import IconComponent from '@/components/ui/icon/Icon'
import { Link } from '@tanstack/react-location'
import cn from 'clsx'
import styles from './Sidebar.module.scss'
import { MENU } from './sidebar.routes'
const pathname = window.location.pathname

const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.logo}>
				<img src='/logo.svg' alt='' />
			</div>
			<nav className={styles.menu}>
				<ul className={styles.list}>
					{MENU.map(item => (
						<Link
							to={item.url}
							key={item.url}
							className={cn({
								[styles.active]: pathname === item.url
							})}
						>
							<IconComponent icon={item.icon} />
						</Link>
					))}
				</ul>
			</nav>
		</aside>
	)
}

export default Sidebar
