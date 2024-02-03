import {
	CategoriesTypes,
	LanguageData
} from '@/api/Types/queryReturnTypes/Categories'
import { GET_CATEGORIES } from '@/api/queries/Getters'
import { ADD_CATEGORIES } from '@/api/queries/Posts'
import Input from '@/components/ui/Input'
import { Button, buttonVariants } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table/Table'
import { SyntheticEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Categories.module.scss'

const Categories = () => {
	const [postData, setPostData] = useState<CategoriesTypes>({
		name: { tm: '', ru: '', en: '' }
	})

	const { data, refetch } = useQuery(['getCategories'], () => GET_CATEGORIES())

	const { mutate } = useMutation({
		mutationKey: ['create categories'],
		mutationFn: (data: any) => ADD_CATEGORIES({ data }),

		async onSuccess() {
			toast.success('Posted successfully!')
		}
	})

	const handleChange = (language: keyof LanguageData, value: string) => {
		setPostData(prevData => ({
			...prevData,
			name: {
				...prevData.name,
				[language]: value
			}
		}))
	}

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault()
		mutate({ ...postData })
	}

	const invoices = [
		{
			invoice: "INV001",
			paymentStatus: "Paid",
			totalAmount: "$250.00",
			paymentMethod: "Credit Card",
		},
		{
			invoice: "INV002",
			paymentStatus: "Pending",
			totalAmount: "$150.00",
			paymentMethod: "PayPal",
		},
		{
			invoice: "INV003",
			paymentStatus: "Unpaid",
			totalAmount: "$350.00",
			paymentMethod: "Bank Transfer",
		},
		{
			invoice: "INV004",
			paymentStatus: "Paid",
			totalAmount: "$450.00",
			paymentMethod: "Credit Card",
		},
		{
			invoice: "INV005",
			paymentStatus: "Paid",
			totalAmount: "$550.00",
			paymentMethod: "PayPal",
		},
		{
			invoice: "INV006",
			paymentStatus: "Pending",
			totalAmount: "$200.00",
			paymentMethod: "Bank Transfer",
		},
		{
			invoice: "INV007",
			paymentStatus: "Unpaid",
			totalAmount: "$300.00",
			paymentMethod: "Credit Card",
		},
	]

	return (
		<div className={styles.categories}>
			<Toaster position='top-center' />
			<form onSubmit={submitHandler}>
				<div className={styles.label}>
					<label>Name tm</label>
					<Input
						type='text'
						onChange={e => handleChange('tm', e.target.value)}
						id='fullName'
						value={postData.name.tm}
						placeholder='name'
					/>
				</div>
				<div className={styles.label}>
					<label htmlFor='fullName'>Name ru</label>
					<Input
						type='text'
						onChange={e => handleChange('ru', e.target.value)}
						id='fullName'
						value={postData.name.ru}
						placeholder='name'
					/>
				</div>
				<div className={styles.label}>
					<label htmlFor='phoneNumber'>Name en</label>
					<Input
						type='text'
						onChange={e => handleChange('en', e.target.value)}
						id='fullName'
						value={postData.name.en}
						placeholder='name'
					/>
				</div>
				<Button className={buttonVariants({ variant: 'default' })}>
					<IconComponent icon='send' />
					Post profile
				</Button>
			</form>
			<div>
				{data?.map((item, index) => (
					<div key={index}>{item.name.tm}</div>
				))}
				<Table>
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className='w-[100px]'>Invoice</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className='text-right'>Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map(invoice => (
							<TableRow key={invoice.invoice}>
								<TableCell className='font-medium'>{invoice.invoice}</TableCell>
								<TableCell>{invoice.paymentStatus}</TableCell>
								<TableCell>{invoice.paymentMethod}</TableCell>
								<TableCell className='text-right'>
									{invoice.totalAmount}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total</TableCell>
							<TableCell className='text-right'>$2,500.00</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</div>
	)
}

export default Categories
