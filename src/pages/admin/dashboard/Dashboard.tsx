import { CategoriesTypes } from '@/api/Types/queryReturnTypes/Categories'
import { GET_CATEGORIES } from '@/api/queries/Getters'
import {
	ADD_CATEGORIES,
	ADD_SUBCATEGORIES,
	DELETE_CATEGORIES
} from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import { Button, buttonVariants } from '@/components/ui/button/Button'
import ChangeLanguage from '@/components/ui/change-language/ChangeLanguage'
import IconComponent from '@/components/ui/icon/Icon'
import ListBox from '@/components/ui/listbox/ListBox'
import { ICategory, ISubCategory } from '@/types/types'
import { SyntheticEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
	const [activeLang, setActiveLang] = useState('tm')
	const [catId, setCatId] = useState('')
	const [name, setName] = useState('')
	const [uuid, setUuid] = useState('')
	const [postData, setPostData] = useState<CategoriesTypes>({
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})
	const { data, refetch } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const [selected, setSelected] = useState<ICategory>({
		UUID: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const { mutate: mutateCategory } = useMutation({
		mutationKey: ['create categories'],
		mutationFn: (data: any) => ADD_CATEGORIES({ data }),
		async onSuccess() {
			toast.success('Posted successfully!')
		}
	})

	const { mutate: mutateDeleteCategory } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (data: any) => DELETE_CATEGORIES({ data }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})

	const onSelected = (e: ICategory) => {
		setSelected(e)
		setCatId(e.UUID)
	}

	const { mutate: mutateSubCategory } = useMutation({
		mutationKey: ['create sub categories'],
		mutationFn: (data: ISubCategory) => ADD_SUBCATEGORIES({ data }),
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

	const handleCategoryInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(event.target.value)
	}

	const submitCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		if (!postData.name[activeLang]) {
			toast.error('Пополните поле!')
		} else {
			mutateCategory({ ...postData })
			setPostData({
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			setTimeout(() => {
				refetch()
			}, 200)
		}
	}

	const deleteCategory = (uuid: ICategory) => {
		setUuid(uuid.UUID)
		mutateDeleteCategory({ uuid })
		setTimeout(() => {
			refetch()
		}, 200)
	}

	const submitSubCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		if ([!catId, !name]) {
			toast.error('Выберите категорию или пополните поле!')
		} else {
			mutateSubCategory({ catId, name })
			setSelected({
				UUID: '',
				name: {
					tm: '',
					ru: '',
					en: ''
				}
			})
			setName('')
			setTimeout(() => {
				refetch()
			}, 200)
		}
	}

	const toggleLanguage = (key: string) => {
		setActiveLang(key)
	}

	return (
		<div className={styles.dashboard}>
			<Toaster position='top-center' />
			<form onSubmit={submitCategory}>
				<div className={styles.flexColumn}>
					<div className={styles.item}>
						<h1 className={styles.title}>Создать категорию</h1>
						<ChangeLanguage
							onSelectLanguage={toggleLanguage}
							activeLang={activeLang}
						/>
						<Input
							onChange={e => handleChange(e.target.value)}
							value={postData.name[activeLang]}
							placeholder='...'
							label='Имя категории'
						/>
					</div>
					<Button className={buttonVariants({ variant: 'default' })}>
						<IconComponent icon='send' />
						Post profile
					</Button>
				</div>
			</form>
			<form onSubmit={submitSubCategory}>
				<div className={styles.row}>
					<div>
						<h1 className={styles.title}>Создать саб-категорию</h1>
						{/* <ChangeLanguage
							onSelectLanguage={toggleLanguage}
							activeLang={activeLang}
						/> */}
						<Input
							onChange={handleCategoryInputChange}
							value={name}
							placeholder='...'
							label='Имя саб-категории'
						/>
					</div>
					<ListBox
						data={data}
						selected={selected}
						setSelected={onSelected}
						deleteItem={deleteCategory}
					/>
					<div></div>
					<Button className={buttonVariants({ variant: 'default' })}>
						<IconComponent icon='send' />
						Post profile
					</Button>
				</div>
			</form>

			{/* <div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className='text-right'>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.name.tm}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div> */}
		</div>
	)
}

export default Dashboard
