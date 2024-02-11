import { IPopup } from '@/types/types'
import classNames from 'classnames/bind'
import styles from './Popup.module.scss'
const cx = classNames.bind(styles)

const Popup = ({ title, handleClose, isOpen, children }: IPopup) => {
	return (
		<>
			{isOpen && (
				<div
					className={`${cx({
						popup: true,
						open: true
					})}`}
					onClick={handleClose}
				>
					<div className={styles.wrapper}>
						<div onClick={e => e.stopPropagation()} className={styles.box}>
							<div className={styles.close}>
								<h1>{title}</h1>
								<span onClick={handleClose}>X</span>
							</div>
							<div className={styles.body}>{children}</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Popup
