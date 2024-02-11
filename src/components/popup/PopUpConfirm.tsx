import { IPopup } from '@/types/types'
import { Toaster } from 'react-hot-toast'
import { Button } from '../ui/button/Button'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupConfirm = ({ handleClose, isOpen, message, handleSend }: IPopup) => {
	return (
		<Popup title='Удалить' isOpen={isOpen} handleClose={handleClose}>
			<Toaster position='top-center' />
			{message}
			<div className={styles.grid3}>
				<div></div>
				<div></div>
				<Button deleteButton={true} onClick={handleSend}>
					Удалить
				</Button>
			</div>
		</Popup>
	)
}

export default PopupConfirm
