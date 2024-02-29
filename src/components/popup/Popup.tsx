import { IPopup } from '@/types/types'
import classNames from 'classnames/bind'
import IconComponent from '../ui/icon/Icon'
import styles from './Popup.module.scss'
const cx = classNames.bind(styles)

const Popup = ({ title, handleClose, isOpen, children, width }: IPopup) => {
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
						<div
							style={{
								width: width
							}}
							onClick={e => e.stopPropagation()}
							className={styles.box}
						>
							<div className={styles.close}>
								<h1>{title}</h1>
								<IconComponent onClick={handleClose} icon='close' />
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
