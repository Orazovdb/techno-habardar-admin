import { GET_PROFILE } from '@/api/queries/Getters'
import { ADD_PROFILE } from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/avatar-uploader/AvatarUploader'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { IPopup } from '@/types/types'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupProfile = ({ handleClose, isOpen }: IPopup) => {
	const [fullName, setFullName] = useState('')
	const [role, setRole] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [uuid, setUuid] = useState('')
	const [avatar, setAvatar] = useState('')
	const { data, refetch, isLoading } = useQuery(['getProfile'], () =>
		GET_PROFILE()
	)

	useEffect(() => {
		setFullName(`${data?.fullName}`)
		setAvatar(`${data?.avatar}`)
		setRole(`${data?.role}`)
		setPhoneNumber(`${data?.phoneNumber}`)
		setUuid(`${data?.uuid}`)
	}, [data])

	const uploadFile = (file: any) => {
		setAvatar(file)
	}

	const { mutate } = useMutation({
		mutationKey: ['create profile'],
		mutationFn: (data: any) => ADD_PROFILE({ data }),

		async onSuccess() {
			toast.success('Posted successfully!')
			refetch()
		}
	})

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		if (!fullName || !avatar || !phoneNumber || !role) {
			toast.error('Пополните поле!')
		} else {
			mutate({ fullName, avatar, phoneNumber, role, uuid })
			handleClose()
		}
	}

	return (
		<Popup title='Изменить профиль' isOpen={isOpen} handleClose={handleClose}>
			<div className={styles.grid}>
				<Toaster position='top-center' />
				<Avatar
					imgPath={avatar}
					onUploadFile={uploadFile}
					label='Картинка профиля'
				/>
				<div className={styles.flexColumn}>
					<Input
						type='text'
						onChange={e => setFullName(e.target.value)}
						value={fullName}
						placeholder='name'
						label='Полное имя'
						className={styles.inputProfile}
					/>
					<Input
						type='text'
						onChange={e => setPhoneNumber(e.target.value)}
						value={phoneNumber}
						placeholder='phoneNumber'
						label='Номер телефона'
						className={styles.inputProfile}
					/>
					<Input
						type='text'
						onChange={e => setRole(e.target.value)}
						value={role}
						placeholder='role'
						label='Роль'
						className={styles.inputProfile}
					/>
				</div>
				<div></div>
				<Button onClick={submitHandler}>
					{isLoading ? (
						'Loading...'
					) : (
						<>
							<IconComponent icon='send' />
							Сохранить
						</>
					)}
				</Button>
			</div>
		</Popup>
	)
}

export default PopupProfile
