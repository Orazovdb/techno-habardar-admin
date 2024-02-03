import styles from './HeaderSkeleton.module.scss'

const HeaderSkeleton = () => {
	return (
		<div className={styles.bodySkeleton}>
			<div className={styles.img}></div>
			<div className={styles.content}>
				<div></div>
				<div></div>
			</div>
		</div>
	)
}

export default HeaderSkeleton
