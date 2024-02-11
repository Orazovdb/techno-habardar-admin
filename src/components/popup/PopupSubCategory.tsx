import { GET_CATEGORIES, GET_SUBCATEGORIES } from '@/api/queries/Getters'
import { ADD_SUBCATEGORIES } from '@/api/queries/Posts'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { ICategory, IPopup, ISubCategory } from '@/types/types'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Input from '../ui/Input'
import ChangeLanguage from '../ui/change-language/ChangeLanguage'
import ListBox from '../ui/listbox/ListBox'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupSubCategory = ({ handleClose, isOpen, itemProp }: IPopup) => {
	const [isError, setIsError] = useState(false)
	const [isShake, setIsShake] = useState(false)
	const [activeLang, setActiveLang] = useState('tm')
	const [catId, setCatId] = useState('')
	const [selected, setSelected] = useState<ICategory>({
		UUID: '',
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})
	const [postData, setPostData] = useState<ISubCategory>({
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const { data } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const { refetch } = useQuery(['getSubCategories'], () =>
		GET_SUBCATEGORIES()
	)

	const { mutate: mutateSubCategory } = useMutation({
		mutationKey: ['create sub categories'],
		mutationFn: (data: any) => ADD_SUBCATEGORIES({ data }),
		async onSuccess() {
			toast.success('Posted sub-category successfully!')
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

	const onSelected = (e: any) => {
		setSelected(e)
		setCatId(e.UUID)
	}

	const changeSlug = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			slug: value
		}))
	}

	const submitSubCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		if (!catId || !postData.name.tm || !postData.name.ru || !postData.name.en) {
			toast.error('Выберите саб-категорию или пополните поле!')
			setIsError(true)
			setIsShake(true)
			setTimeout(() => {
				setIsShake(false)
			}, 300)
		} else {
			setIsError(false)
			setIsShake(false)
			mutateSubCategory({
				catId,
				...postData
			})
			setSelected({
				UUID: '',
				slug: '',
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			setPostData({
				slug: '',
				catId: '',
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			setTimeout(() => {
				refetch()
			}, 200)
			handleClose()
		}
	}
	const toggleLanguage = (key: string) => {
		setActiveLang(key)
	}
	useEffect(() => {
		if (itemProp) {
			setPostData({
				catId: itemProp?.catId,
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
			catId: '',
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
			title='Добавить саб-категорию'
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
					label='Имя саб-категории'
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
			<ListBox
				data={data}
				selected={selected}
				setSelected={onSelected}
				isError={isError}
				isShake={isShake}
			/>
			<div></div>
			<Button onClick={submitSubCategory}>
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

export default PopupSubCategory
