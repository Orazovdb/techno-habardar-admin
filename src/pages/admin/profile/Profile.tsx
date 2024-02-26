import { GET_PROFILE } from '@/api/queries/Getters'
import { ADD_PROFILE } from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import Avatar from '@/components/ui/avatar-uploader/AvatarUploader'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Profile.module.scss'

const Profile = () => {
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
		console.log(file)
	}

	const { mutate } = useMutation({
		mutationKey: ['create profile'],
		mutationFn: (data: any) => ADD_PROFILE({ data }),

		async onSuccess() {
			toast.success('Posted successfully!')
			refetch()
		}
	})

	// const handleChange = async (e: any) => {
	// 	console.log(e.target.files[0])
	// 	try {
	// 		const formData = new FormData()
	// 		formData.append('file', e.target.files[0])
	// 		const config = {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'multipart/form-data'
	// 			}
	// 		}
	// 		const res: any = await UPLOAD_FILE(formData, config)

	// 		if (res.status) {
	// 			setAvatar(res.data)
	// 			refetch()
	// 			console.log(avatar, 'avatar')
	// 		}
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		mutate({ fullName, avatar, phoneNumber, role, uuid })
	}

	return (
		<div className={styles.profile}>
			<Toaster position='top-center' />

			<form onSubmit={submitHandler}>
				<Avatar imgPath={avatar} onUploadFile={uploadFile} label='Avatar' />
				<Input
					type='text'
					onChange={e => setFullName(e.target.value)}
					value={fullName}
					placeholder='name'
					label='Full name'
				/>
				<Input
					type='text'
					onChange={e => setPhoneNumber(e.target.value)}
					value={phoneNumber}
					placeholder='phoneNumber'
					label='Phone number'
				/>
				<Input
					type='text'
					onChange={e => setRole(e.target.value)}
					value={role}
					placeholder='role'
					label='Role'
				/>
				<div></div>
				<Button>
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
	)
}

export default Profile
