import styles from './SidebarProfileShimmer.module.scss'

const SidebarProfileShimmer = () => {
	return (
		<div className={styles.profileShimmer}>
			<div className={styles.img}></div>
			<div className={styles.content}>
				<div></div>
				<div></div>
			</div>
			<div className={styles.icon}></div>
		</div>
	)
}

export default SidebarProfileShimmer
