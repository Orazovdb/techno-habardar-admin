import { BASE_IMG_URL } from '@/api/axiosInstance'
import { ADD_FILE } from '@/api/queries/Posts'
import classNames from 'classnames/bind'
import React, { ChangeEvent, useState } from 'react'
import IconComponent from '../icon/Icon'
import styles from './AvatarUploader.module.scss'

const cx = classNames.bind(styles)

interface AvatarProps {
	imgPath?: string
	label?: string
	insideIcon?: boolean
	onUploadFile?: (data: any) => void
	buttonStyle?: Boolean
}

const Avatar: React.FC<AvatarProps> = ({
	imgPath = '',
	label,
	onUploadFile,
	buttonStyle,
	insideIcon
}) => {
	const [img, setImg] = useState<string | null>(null)
	const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) return
		try {
			const response = await ADD_FILE({ data: { file: e.target.files[0] } })
			setImg(response)
			onUploadFile && onUploadFile(response)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div
			className={`${cx({
				avatarWrapper: true,
				buttonStyle: buttonStyle
			})}`}
		>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.avatar}>
				{insideIcon && (
					<div className={styles.insideIcon}>
						<IconComponent icon='imgUpload' />
					</div>
				)}
				{imgPath && (
					<div className={styles.avatar__image}>
						<img src={BASE_IMG_URL + imgPath.slice(7)} alt='' />
					</div>
				)}
				<div className={styles.avatar__input}>
					<div className={styles.avatar__inputBody}>
						<input
							onChange={changeFile}
							accept='.jpg, .png, .jpeg'
							type='file'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Avatar
