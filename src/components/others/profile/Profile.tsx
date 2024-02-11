import { GET_PROFILE } from '@/api/queries/Getters'
import { ADD_PROFILE } from '@/api/queries/Posts'
import { FC, SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
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
		mutationFn: (data: any) => ADD_PROFILE({ data })

		// async onSuccess() {
		// 	toast.success('Posted successfully!')
		// 	refetch()
		// }
	})

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		mutate({ fullName, avatar, phoneNumber, role, uuid })
	}

	return (
		<>
			<div className={styles.profile} onClick={onClick}>
				<div className={styles.box} onClick={e => e.stopPropagation()}>
					<div onClick={onClick}>X</div>
				</div>
			</div>
		</>
	)
}

export default Profile
