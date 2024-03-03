import { GET_CAT_SUB } from '@/api/queries/Getters'
import { ADD_POST } from '@/api/queries/Posts'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { ICategory, IPopup, IPost } from '@/types/types'
import { SyntheticEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Input from '../ui/Input'
import Avatar from '../ui/avatar-uploader/AvatarUploader'
import ChangeLanguage from '../ui/change-language/ChangeLanguage'
import MultiSelect from '../ui/multiselect/MultiSelect'
import TipTap from '../ui/tiptap/TipTap'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupPost = ({ handleClose, isOpen, itemProp }: IPopup) => {
	const [isError, setIsError] = useState(false)
	const [isShake, setIsShake] = useState(false)
	const [activeLangTtl, setActiveLangTtl] = useState<'tm' | 'ru' | 'en'>('tm')
	const [activeLangDesc, setActiveLangDesc] = useState<'tm' | 'ru' | 'en'>('tm')
	const [activeLangCnt, setActiveLangCnt] = useState<'tm' | 'ru' | 'en'>('tm')
	const [avatar, setAvatar] = useState('')

	const [postData, setPostData] = useState<IPost>({
		title_tm: '',
		title_ru: '',
		title_en: '',
		description_tm: '',
		description_ru: '',
		description_en: '',
		image_path: '',
		author_id: [],
		sub_category_id: [],
		tag_id: [],
		content_tm: '',
		content_ru: '',
		content_en: '',
		category_id: '',
		uuid: ''
	})

	// const { data } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const { data: DataCatSub, refetch } = useQuery(['getCatSub'], () =>
		GET_CAT_SUB()
	)

	const { mutate: mutatePost } = useMutation({
		mutationKey: ['create posts'],
		mutationFn: (data: any) => ADD_POST({ data }),
		async onSuccess() {
			toast.success('Посты созданы успешно!')
		}
	})

	const handleChangeTitle = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			[`title_${activeLangTtl}`]: value
		}))
	}

	const handleChangeDescription = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			[`description_${activeLangDesc}`]: value
		}))
	}

	const handleChangeContent = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			[`content_${activeLangCnt}`]: value
		}))
	}

	const [selectedCat, setSelectedCat] = useState<any>([])

	const addItem = (item: ICategory) => {
		const newItems = [...selectedCat, item]
		setSelectedCat(newItems)
	}
	const selectCat = (item: ICategory) => {
		if (selectedCat > 0) {
			alert('U vaz uze Dobavlen')
		} else {
			addItem(item)
		}
	}

	const submitSubCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		// if (
		// 	!catId ||
		// 	!postData?.name?.tm ||
		// 	!postData?.name?.ru ||
		// 	!postData?.name?.en
		// ) {
		// toast.error('Пополните поле!')
		// setIsError(true)
		// setIsShake(true)
		// setTimeout(() => {
		// 	setIsShake(false)
		// }, 300)
		// } else {
		setIsError(false)
		setIsShake(false)
		mutatePost({
			...postData,
			sub_category_id: selectedCat,
			image_path: avatar
		})
		setPostData({
			title_tm: '',
			title_ru: '',
			title_en: '',
			description_tm: '',
			description_ru: '',
			description_en: '',
			image_path: '',
			author_id: [],
			sub_category_id: [],
			tag_id: [],
			content_tm: '',
			content_ru: '',
			content_en: '',
			category_id: '',
			uuid: ''
		})
		setTimeout(() => {
			refetch()
		}, 200)
		handleClose()
	}

	const toggleLanguageTitle = (key: 'tm' | 'ru' | 'en') => {
		setActiveLangTtl(key)
	}

	const toggleLanguageDesc = (key: 'tm' | 'ru' | 'en') => {
		setActiveLangDesc(key)
	}

	const toggleLanguageContent = (key: 'tm' | 'ru' | 'en') => {
		setActiveLangCnt(key)
	}

	useEffect(() => {
		// if (itemProp?.UUID) {
		// 	setPostData({
		// 		slug: itemProp?.slug,
		// 		name: {
		// 			tm: itemProp?.name?.tm,
		// 			ru: itemProp?.name?.ru,
		// 			en: itemProp?.name?.en
		// 		}
		// 	})
		// 	setSelected({
		// 		UUID: itemProp?.UUID,
		// 		name: {
		// 			tm: itemProp?.catName?.tm,
		// 			ru: itemProp?.catName?.ru,
		// 			en: itemProp?.catName?.en
		// 		}
		// 	})
		// }
	}, [])

	const handleClosePopUp = () => {
		setPostData({
			title_tm: '',
			title_ru: '',
			title_en: '',
			description_tm: '',
			description_ru: '',
			description_en: '',
			image_path: '',
			author_id: [],
			sub_category_id: [],
			tag_id: [],
			content_tm: '',
			content_ru: '',
			content_en: '',
			category_id: '',
			uuid: ''
		})
		handleClose()
	}

	const uploadFile = (file: any) => {
		setAvatar(file)
	}
	const deleteCategory = (category: any) => {
		setSelectedCat((prevCategories: any) =>
			prevCategories.filter((cat: any) => cat.UUID !== category.UUID)
		)
	}

	return (
		<Popup
			title='Добавить посты'
			isOpen={isOpen}
			handleClose={handleClosePopUp}
			width='40vw'
		>
			<div className={styles.grid}>
				<Avatar
					imgPath={avatar}
					onUploadFile={uploadFile}
					label='Картинка профиля'
					heightFull
				/>
				<div className={styles.item}>
					<ChangeLanguage
						onSelectLanguage={toggleLanguageTitle}
						activeLang={activeLangTtl}
					/>
					<Input
						onChange={e => handleChangeTitle(e.target.value)}
						value={postData[`title_${activeLangTtl}`]}
						placeholder='...'
						label='Название поста'
						isError={isError}
						isShake={isShake}
					/>
					<ChangeLanguage
						onSelectLanguage={toggleLanguageDesc}
						activeLang={activeLangDesc}
					/>
					<Input
						onChange={e => handleChangeDescription(e.target.value)}
						value={postData[`description_${activeLangDesc}`]}
						placeholder='...'
						label='Описание поста'
						isError={isError}
						isShake={isShake}
					/>
				</div>
			</div>
			<MultiSelect
				deleteCategory={deleteCategory}
				selectedCategories={selectedCat}
				categories={DataCatSub}
				selectCategory={selectCat}
			/>
			<div className={styles.item}>
				<ChangeLanguage
					onSelectLanguage={toggleLanguageContent}
					activeLang={activeLangCnt}
				/>
				<TipTap content={postData[`content_${activeLangCnt}`]} />
			</div>

			<div></div>
			<Button onClick={submitSubCategory}>
				<IconComponent icon='send' />
				{itemProp?.name.tm ? <>Сохранить</> : <>Добавить</>}
			</Button>
		</Popup>
	)
}

export default PopupPost
