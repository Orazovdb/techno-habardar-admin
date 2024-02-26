import { BASE_IMG_URL } from '@/api/axiosInstance'
import { GET_PROFILE } from '@/api/queries/Getters'
import PopupProfile from '@/components/popup/PopupProfile'
import IconComponent from '@/components/ui/icon/Icon'
import { Link, useMatch, useNavigate } from '@tanstack/react-location'
import cn from 'clsx'
import { useState } from 'react'
import { useQuery } from 'react-query'
import styles from './Sidebar.module.scss'
import SidebarProfileShimmer from './SidebarProfileShimmer'
import { MENU } from './sidebar.routes'
const Sidebar = () => {
	const match = useMatch()
	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('Authorization')
		navigate({ to: '/admin/login', replace: true })
	}
	const { data, isLoading } = useQuery(['getProfile'], () => GET_PROFILE())
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [isProfile, setIsProfile] = useState(false)
	const URL_NAME = ['/admin/sub-categories', '/admin/authors']
	if (match.pathname === 'Categories') {
		
	}
	return (
		<>
			<PopupProfile
				isOpen={isOpenPopup}
				handleClose={() => setIsOpenPopup(false)}
			/>
			<aside className={styles.sidebar}>
				<div className={styles.header}>
					<div className={styles.logo}></div>
					<h1>Techno habardar</h1>
				</div>
				<div className={styles.profile}>
					<h1 className={styles.title}>Profile</h1>
					{isLoading ? (
						<SidebarProfileShimmer />
					) : (
						<div onClick={() => setIsOpenPopup(true)} className={styles.row}>
							<div className={styles.img}>
								<img src={`${BASE_IMG_URL}${data?.avatar.slice(7)}`} alt='' />
							</div>
							<div className={styles.content}>
								<h1>{data?.fullName}</h1>
								<h1>{data?.role}</h1>
							</div>

							<div className={styles.icon}>
								<IconComponent icon='chevronUpDown' />
							</div>
						</div>
					)}
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
									// (item.title === 'Categories' && URL_NAME) ||
									// (item.title === 'Посты' && '/admin/posts')
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
		</>
	)
}

export default Sidebar
