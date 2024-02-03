import { BASE_IMG_URL } from '@/api/axiosInstance'
import { ADD_FILE } from '@/api/queries/Posts'
import React, { ChangeEvent, useState } from 'react'
import styles from './AvatarUploader.module.scss'

interface AvatarProps {
	imgPath?: string
	label?: string
	onUploadFile?: (data: any) => void
}

const Avatar: React.FC<AvatarProps> = ({
	imgPath = '',
	label,
	onUploadFile
}) => {
	const [img, setImg] = useState<string | null>(null)
	const changeFile = async (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) return
		try {
			const response = await ADD_FILE({ data: { file: e.target.files[0] } })

			if (response.status) {
				setImg(response.data)
				onUploadFile && onUploadFile(response.data)
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className={styles.avatarWrapper}>
			{label && <label className={styles.label}>{label}</label>}
			<div className={styles.avatar}>
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
