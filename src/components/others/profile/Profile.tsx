import { GET_PROFILE } from '@/api/queries/Getters'
import { ADD_PROFILE } from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/avatar-uploader/AvatarUploader'
import { Button, buttonVariants } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Profile.module.scss'

interface IProfile {
	isOpen: Boolean
	onClick?: () => void
}

const Profile: FC<IProfile> = ({ isOpen, onClick }) => {
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
		mutate({ fullName, avatar, phoneNumber, role, uuid })
	}

	return (
		<>
			{isOpen && (
				<div className={styles.profile} onClick={onClick}>
					<div className={styles.box} onClick={e => e.stopPropagation()}>
						<div onClick={onClick}>X</div>

						<Toaster position='top-center' />

						<form onSubmit={submitHandler}>
							<Avatar
								imgPath={avatar}
								onUploadFile={uploadFile}
								label='Avatar'
							/>
							<Input
								type='text'
								onChange={e => setFullName(e.target.value)}
								value={fullName}
								placeholder='name'
								label='Full name'
								className={styles.inputProfile}
								flex={true}
							/>
							<Input
								type='text'
								onChange={e => setPhoneNumber(e.target.value)}
								value={phoneNumber}
								placeholder='phoneNumber'
								label='Phone number'
								className={styles.inputProfile}
							/>
							<Input
								type='text'
								onChange={e => setRole(e.target.value)}
								value={role}
								placeholder='role'
								label='Role'
								className={styles.inputProfile}
							/>
							<div></div>
							<Button className={buttonVariants({ variant: 'default' })}>
								{isLoading ? (
									'Loading...'
								) : (
									<div>
										<IconComponent icon='send' />
										Отправить
									</div>
								)}
							</Button>
						</form>
					</div>
				</div>
			)}
		</>
	)
}

export default Profile
