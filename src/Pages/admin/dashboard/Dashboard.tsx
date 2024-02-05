import { CategoriesTypes } from '@/api/Types/queryReturnTypes/Categories'
import { GET_CATEGORIES } from '@/api/queries/Getters'
import { ADD_CATEGORIES } from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import { Button, buttonVariants } from '@/components/ui/button/Button'
import ChangeLanguage from '@/components/ui/change-language/ChangeLanguage'
import IconComponent from '@/components/ui/icon/Icon'
import ListBox from '@/components/ui/listbox/ListBox'
import { SyntheticEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
	const [postData, setPostData] = useState<CategoriesTypes>({
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})
	const [activeLang, setActiveLang] = useState('tm')
	const { data, refetch } = useQuery(['getCategories'], () => GET_CATEGORIES())

	const { mutate } = useMutation({
		mutationKey: ['create categories'],
		mutationFn: (data: any) => ADD_CATEGORIES({ data }),

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

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		mutate({ ...postData })
		setTimeout(() => {
			refetch()
		}, 200)
		setPostData({
			name: {
				tm: '',
				ru: '',
				en: ''
			}
		})
	}

	const toggleLanguage = (key: string) => {
		setActiveLang(key)
	}

	return (
		<div className={styles.dashboard}>
			<Toaster position='top-center' />
			<form onSubmit={submitHandler}>
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
					{/* <ScrollArea names={data} /> */}
					{/* <List
						items={data}
						renderItem={(name: ICategory) => (
							<CategoryCard data={name} key={name.uuid} />
						)}
					/> */}
					<Button className={buttonVariants({ variant: 'default' })}>
						<IconComponent icon='send' />
						Post profile
					</Button>
				</div>
			</form>
			<form onSubmit={submitHandler}>
				<div className={styles.row}>
					<div>
						<h1 className={styles.title}>Создать саб-категорию</h1>
						<ChangeLanguage
							onSelectLanguage={toggleLanguage}
							activeLang={activeLang}
						/>
						<Input
							onChange={e => handleChange(e.target.value)}
							value={postData.name[activeLang]}
							placeholder='...'
							label='Имя саб-категории'
						/>
					</div>
					<ListBox data={data} />
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
