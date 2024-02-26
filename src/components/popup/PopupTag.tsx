import { GET_TAGS } from '@/api/queries/Getters'
import { ADD_TAG } from '@/api/queries/Posts'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { IPopup, ITags } from '@/types/types'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Input from '../ui/Input'
import ChangeLanguage from '../ui/change-language/ChangeLanguage'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupTag = ({ handleClose, isOpen, itemProp }: IPopup) => {
	const [isError, setIsError] = useState(false)
	const [isShake, setIsShake] = useState(false)
	const [activeLang, setActiveLang] = useState('tm')
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	const [postData, setPostData] = useState<ITags>({
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const { refetch } = useQuery(['getTag'], () =>
		GET_TAGS({
			limit: limit,
			page: page
		})
	)

	const { mutate } = useMutation({
		mutationKey: ['create tags'],
		mutationFn: ({ data, url, method }: any) => ADD_TAG({ data, url, method }),
		async onSuccess() {
			toast.success('Posted successfully!')
		}
	})

	const handleChange = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			name: {
				...prevData.name,
				[activeLang]: value
			}
		}))
	}

	const changeSlug = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			slug: value
		}))
	}

	const submitAuthor = (e: SyntheticEvent) => {
		e.preventDefault()
		if (
			!postData.name.tm ||
			!postData.name.ru ||
			!postData.name.en ||
			!postData.slug
		) {
			toast.error('Пополните поле!')
			setIsError(true)
			setIsShake(true)
			setTimeout(() => {
				setIsShake(false)
			}, 300)
		} else {
			setIsError(false)
			setIsShake(false)
			mutate({
				url: postData.UUID ? `/tag/${postData.UUID}` : '/tag',
				method: postData.UUID ? 'put' : 'post',
				data: { ...postData }
			})
			setPostData({
				slug: '',
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			handleClose()
			setTimeout(() => {
				refetch()
			}, 200)
		}
	}

	const toggleLanguage = (key: string) => {
		setActiveLang(key)
	}

	useEffect(() => {
		if (itemProp) {
			setPostData({
				UUID: itemProp?.UUID,
				slug: itemProp?.slug,
				name: {
					tm: itemProp?.name?.tm,
					ru: itemProp?.name?.ru,
					en: itemProp?.name?.en
				}
			})
		}
	}, [itemProp])

	const handleClosePopUp = () => {
		setPostData({
			UUID: '',
			slug: '',
			name: {
				tm: '',
				ru: '',
				en: ''
			}
		})
		handleClose()
	}

	const setHandleSend = (e: SyntheticEvent) => {
		submitAuthor(e)
	}

	return (
		<Popup title='Добавить тега' isOpen={isOpen} handleClose={handleClosePopUp}>
			<div className={styles.item}>
				<ChangeLanguage
					onSelectLanguage={toggleLanguage}
					activeLang={activeLang}
				/>
				<Input
					onChange={e => handleChange(e.target.value)}
					value={postData.name[activeLang]}
					placeholder='...'
					label='Имя тега'
					isError={isError}
					isShake={isShake}
				/>
			</div>
			<Input
				onChange={e => changeSlug(e.target.value)}
				value={postData.slug}
				placeholder='...'
				label='Slug'
				isError={isError}
				isShake={isShake}
			/>
			<Button onClick={setHandleSend}>
				<IconComponent icon='send' />
				{itemProp?.name.tm || itemProp?.name.ru || itemProp?.name.en ? (
					<>Сохранить</>
				) : (
					<>Добавить</>
				)}
			</Button>
		</Popup>
	)
}

export default PopupTag
