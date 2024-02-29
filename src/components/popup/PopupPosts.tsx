import { GET_SUBCATEGORIES } from '@/api/queries/Getters'
import { ADD_SUBCATEGORIES } from '@/api/queries/Posts'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { ICategory, IPopup, IPost } from '@/types/types'
import { SyntheticEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import Input from '../ui/Input'
import ChangeLanguage from '../ui/change-language/ChangeLanguage'
import MultiSelect from '../ui/multiselect/MultiSelect'
import TipTap from '../ui/tiptap/TipTap'
import Popup from './Popup'
import styles from './Popup.module.scss'

const PopupPost = ({ handleClose, isOpen, itemProp }: IPopup) => {
	const [isError, setIsError] = useState(false)
	const [isShake, setIsShake] = useState(false)
	const [activeLangTitle, setActiveLangTitle] = useState('tm')
	const [activeLangDesc, setActiveLangDesc] = useState('tm')
	const [activeLangContent, setActiveLangContent] = useState('tm')
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
	const [postData, setPostData] = useState<IPost>({
		title: {
			tm: '',
			ru: '',
			en: ''
		},
		description: {
			tm: '',
			ru: '',
			en: ''
		},
		imagePath: '',
		author: [],
		catSub: [],
		tag: [],
		content: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	// const { data } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const data = [
		{
			UUID: '',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				}
			]
		},
		{
			UUID: '',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				}
			]
		},
		{
			UUID: '',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				},
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				},
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				}
			]
		},
		{
			UUID: '',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				}
			]
		}
	]
	const { refetch } = useQuery(['getSubCategories'], () => GET_SUBCATEGORIES())

	const { mutate: mutateSubCategory } = useMutation({
		mutationKey: ['create sub categories'],
		mutationFn: (data: any) => ADD_SUBCATEGORIES({ data }),
		async onSuccess() {
			toast.success('Посты созданы успешно!')
		}
	})

	const handleChangeTitle = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			title: {
				...prevData.title,
				[activeLangTitle]: value
			}
		}))
	}

	const handleChangeDesc = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			description: {
				...prevData.description,
				[activeLangDesc]: value
			}
		}))
	}

	const handleChangeContent = (value: string) => {
		setPostData(prevData => ({
			...prevData,
			description: {
				...prevData.description,
				[activeLangContent]: value
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
		// if (
		// 	!catId ||
		// 	!postData?.name?.tm ||
		// 	!postData?.name?.ru ||
		// 	!postData?.name?.en
		// ) {
		toast.error('Выберите саб-категорию или пополните поле!')
		setIsError(true)
		setIsShake(true)
		setTimeout(() => {
			setIsShake(false)
		}, 300)
		// } else {
		setIsError(false)
		setIsShake(false)
		mutateSubCategory({
			catId: catId,
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
			title: {
				tm: '',
				ru: '',
				en: ''
			},
			description: {
				tm: '',
				ru: '',
				en: ''
			},
			imagePath: '',
			author: [],
			catSub: [],
			tag: [],
			content: {
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

	const toggleLanguageTitle = (key: string) => {
		setActiveLangTitle(key)
	}

	const toggleLanguageDesc = (key: string) => {
		setActiveLangDesc(key)
	}

	const toggleLanguageContent = (key: string) => {
		setActiveLangContent(key)
	}

	// useEffect(() => {
	// 	if (itemProp?.UUID) {
	// 		setPostData({
	// 			slug: itemProp?.slug,
	// 			name: {
	// 				tm: itemProp?.name?.tm,
	// 				ru: itemProp?.name?.ru,
	// 				en: itemProp?.name?.en
	// 			}
	// 		})
	// 		setSelected({
	// 			UUID: itemProp?.UUID,
	// 			name: {
	// 				tm: itemProp?.catName?.tm,
	// 				ru: itemProp?.catName?.ru,
	// 				en: itemProp?.catName?.en
	// 			}
	// 		})
	// 	}
	// }, [itemProp])

	const handleClosePopUp = () => {
		setPostData({
			title: {
				tm: '',
				ru: '',
				en: ''
			},
			description: {
				tm: '',
				ru: '',
				en: ''
			},
			imagePath: '',
			author: [],
			catSub: [],
			tag: [],
			content: {
				tm: '',
				ru: '',
				en: ''
			}
		})
		handleClose()
	}

	const fc = () => {}

	return (
		<Popup
			title='Добавить посты'
			isOpen={isOpen}
			handleClose={handleClosePopUp}
			width='40vw'
		>
			<div className={styles.grid}>
				<div className={styles.item}>
					<ChangeLanguage
						onSelectLanguage={toggleLanguageTitle}
						activeLang={activeLangTitle}
					/>
					<Input
						onChange={e => handleChangeTitle(e.target.value)}
						value={postData.title[activeLangTitle]}
						placeholder='...'
						label='Название поста'
						isError={isError}
						isShake={isShake}
					/>
				</div>
				<div className={styles.item}>
					<ChangeLanguage
						onSelectLanguage={toggleLanguageDesc}
						activeLang={activeLangDesc}
					/>
					<Input
						onChange={e => handleChangeDesc(e.target.value)}
						value={postData.description[activeLangDesc]}
						placeholder='...'
						label='Описание поста'
						isError={isError}
						isShake={isShake}
					/>
				</div>
				{/* <ListBox
					data={data}
					selected={selected}
					setSelected={onSelected}
					isError={isError}
					isShake={isShake}
				/> */}
				<MultiSelect
					deleteCategory={fc}
					selectedCategories={data}
					categories={data}
					selectCategory={fc}
				/>
			</div>
			<div className={styles.item}>
				<ChangeLanguage
					onSelectLanguage={toggleLanguageContent}
					activeLang={activeLangContent}
				/>
				<TipTap content={postData.content[activeLangContent]} />
			</div>

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

export default PopupPost
