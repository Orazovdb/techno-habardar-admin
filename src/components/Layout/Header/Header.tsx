import { BASE_IMG_URL } from '@/api/axiosInstance'
import { GET_PROFILE } from '@/api/queries/Getters'
import Profile from '@/components/others/profile/Profile'
import IconComponent from '@/components/ui/icon/Icon'
import { useState } from 'react'
import { useQuery } from 'react-query'
import styles from './Header.module.scss'
import HeaderSkeleton from './HeaderSkeleton'

const Header = ({ title }: { title: string }) => {
	const [isOpenDropdown, setIsOpenDropdown] = useState(true)
	const [isProfile, setIsProfile] = useState(false)

	const { data, isLoading } = useQuery(['getProfile'], () => GET_PROFILE())

	function handleClick() {
		setIsOpenDropdown(prevState => !prevState)
	}
	return (
		<header className={styles.header}>
			<div className={styles.row}>
				{title && <h1 className={styles.title}>{title}</h1>}
				<div
					className={
						isOpenDropdown
							? styles.profile
							: styles.profile + ' ' + styles.openDropdown
					}
				>
					{isLoading ? (
						<HeaderSkeleton />
					) : (
						<div onClick={handleClick} className={styles.body}>
							<div className={styles.img}>
								<img src={`${BASE_IMG_URL}${data?.avatar.slice(7)}`} alt='' />
							</div>
							<div className={styles.content}>
								<h1>{data?.fullName}</h1>
								<h1>{data?.role}</h1>
							</div>
						</div>
					)}

					<div className={styles.dropdown}>
						<div className={styles.item}>
							<span>username: </span>
							<span>{data?.fullName}</span>
						</div>
						<div className={styles.item}>
							<span>phone number: </span>
							<span>{data?.phoneNumber}</span>
						</div>
						<div className={styles.item}>
							<span>role: </span>
							<span>{data?.role}</span>
						</div>
						<div className={styles.editWrapper}>
							<div onClick={() => setIsOpenDropdown(false)}>
								<div onClick={() => setIsProfile(true)}>
									<IconComponent icon='edit' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Profile isOpen={isProfile} onClick={() => setIsProfile(false)} />
		</header>
	)
}

export default Header
