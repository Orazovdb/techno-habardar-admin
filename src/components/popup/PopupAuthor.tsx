import { ADD_AUTHOR } from '@/api/queries/Posts'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { IAuthor, IPopup } from '@/types/types'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import Input from '../ui/Input'
import ChangeLanguage from '../ui/change-language/ChangeLanguage'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupAuthor = ({ handleClose, isOpen, itemProp }: IPopup) => {
	const [isErrorCategory, setIsErrorCategory] = useState(false)
	const [isShakeCategory, setIsShakeCategory] = useState(false)
	const [activeLang, setActiveLang] = useState('tm')

	const [postData, setPostData] = useState<IAuthor>({
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const { mutate: mutateCategory } = useMutation({
		mutationKey: ['create authors'],
		mutationFn: (data: any) => ADD_AUTHOR({ data }),
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

	const submitCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		if (
			!postData.name.tm ||
			!postData.name.ru ||
			!postData.name.en ||
			!postData.slug
		) {
			toast.error('Пополните поле!')
			setIsErrorCategory(true)
			setIsShakeCategory(true)
			setTimeout(() => {
				setIsShakeCategory(false)
			}, 300)
		} else {
			setIsErrorCategory(false)
			setIsShakeCategory(false)
			mutateCategory({ ...postData })
			setPostData({
				slug: '',
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			handleClose()
			// setTimeout(() => {
			// 	refetch()
			// }, 200)
		}
	}

	const toggleLanguage = (key: string) => {
		setActiveLang(key)
	}

	useEffect(() => {
		if (itemProp) {
			setPostData({
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
			slug: '',
			name: {
				tm: '',
				ru: '',
				en: ''
			}
		})
		handleClose()
	}

	return (
		<Popup
			title='Добавить автора'
			isOpen={isOpen}
			handleClose={handleClosePopUp}
		>
			<div className={styles.item}>
				<ChangeLanguage
					onSelectLanguage={toggleLanguage}
					activeLang={activeLang}
				/>
				<Input
					onChange={e => handleChange(e.target.value)}
					value={postData.name[activeLang]}
					placeholder='...'
					label='Имя категории'
					isError={isErrorCategory}
					isShake={isShakeCategory}
				/>
			</div>
			<Input
				onChange={e => changeSlug(e.target.value)}
				value={postData.slug}
				placeholder='...'
				label='Slug'
				isError={isErrorCategory}
				isShake={isShakeCategory}
			/>
			<Button onClick={submitCategory}>
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

export default PopupAuthor
