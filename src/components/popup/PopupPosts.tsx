import { GET_SUBCATEGORIES } from '@/api/queries/Getters'
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
import MultiSelect from '../ui/multiselect/MultiSelect'
import Tiptap from '../ui/tiptap/TipTap'
import Popup from './Popup'
import styles from './Popup.module.scss'
import TipTap from '../ui/tiptap/TipTap'

const PopupPost = ({ handleClose, isOpen, itemProp }: IPopup) => {
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
		catId: '',
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	// const { data } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const data = [
		{
			UUID: '111',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '111',
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
			UUID: '111',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '111',
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
			UUID: '111',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '111',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				},
				{
					UUID: '111',
					name: {
						tm: 'bla',
						ru: 'bla',
						en: 'bla'
					},
					slug: 'slug'
				},
				{
					UUID: '111',
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
			UUID: '111',
			name: {
				tm: 'bla',
				ru: 'bla',
				en: 'bla'
			},
			slug: 'slug',
			sub_categories: [
				{
					UUID: '111',
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
		if (
			!catId ||
			!postData?.name?.tm ||
			!postData?.name?.ru ||
			!postData?.name?.en
		) {
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
		if (itemProp?.UUID) {
			setPostData({
				slug: itemProp?.slug,
				name: {
					tm: itemProp?.name?.tm,
					ru: itemProp?.name?.ru,
					en: itemProp?.name?.en
				}
			})
			setSelected({
				UUID: itemProp?.UUID,
				name: {
					tm: itemProp?.catName?.tm,
					ru: itemProp?.catName?.ru,
					en: itemProp?.catName?.en
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

	const fc = () => {}

	return (
		<Popup
			title='Добавить посты'
			isOpen={isOpen}
			handleClose={handleClosePopUp}
			width='50vw'
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
			<MultiSelect
				deleteCategory={fc}
				selectedCategories={data}
				categories={data}
				selectCategory={fc}
			/>
			<TipTap />

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
