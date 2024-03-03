import { GET_CATEGORIES } from '@/api/queries/Getters'
import { ADD_SUBCATEGORIES, DELETE_CATEGORIES } from '@/api/queries/Posts'
import PopupConfirm from '@/components/popup/PopUpConfirm'
import PopupCategory from '@/components/popup/PopupCategory'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import Table from '@/components/ui/table/Table'
import tableStyles from '@/components/ui/table/Table.module.scss'
import { ICategory } from '@/types/types'
import { useNavigate } from '@tanstack/react-location'
import React, { SyntheticEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Categories.module.scss'

const Dashboard = () => {
	const [activeSubLang, setActiveSubLang] = useState('tm')
	const [catId, setCatId] = useState('')
	const [nameSub, setNameSub] = useState<ICategory>({
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const [uuid, setUuid] = useState('')
	const { data, refetch } = useQuery(['getCategories'], () => GET_CATEGORIES())
	const [selected, setSelected] = useState<ICategory>({
		UUID: '',
		slug: '',
		name: {
			tm: '',
			ru: '',
			en: ''
		}
	})

	const { mutate: mutateDeleteCategory } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (data: any) => DELETE_CATEGORIES({ data }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})

	const { mutate: mutateSubCategory } = useMutation({
		mutationKey: ['create sub categories'],
		mutationFn: (data: any) => ADD_SUBCATEGORIES({ data }),
		async onSuccess() {
			toast.success('Posted sub-category successfully!')
		}
	})

	const handleCategoryInputChange = (value: string) => {
		setNameSub(prevData => ({
			...prevData,
			name: {
				...prevData.name,
				[activeSubLang]: value
			}
		}))
	}

	const submitSubCategory = (e: SyntheticEvent) => {
		e.preventDefault()
		if (!catId || !nameSub.name.tm || !nameSub.name.ru || !nameSub.name.en) {
			toast.error('Выберите категорию или пополните поле!')
		} else {
			mutateSubCategory({
				catId,
				...nameSub
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
			setNameSub({
				name: { tm: '', ru: '', en: '' }
			})
			setTimeout(() => {
				refetch()
			}, 200)
		}
	}

	const buttons = [
		{ title: 'Категории', to: '/admin/categories' },
		{ title: 'Под-категории', isNotActive: true, to: '/admin/sub-categories' },
		{ title: 'Авторы', isNotActive: true, to: '/admin/authors' },
		{ title: 'Теги', isNotActive: true, to: '/admin/tags' }
	]

	const navigate = useNavigate()
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [isPopupConfirm, setIsPopupConfirm] = useState(false)
	const [itemEdit, setItemEdit] = useState<any>(null)
	const popupConfirm = (uuid: any) => {
		setIsPopupConfirm(true)
		setUuid(uuid)
	}

	const deleteCategory = (uuid: any) => {
		popupConfirm(uuid.UUID)
		setUuid(uuid)
		mutateDeleteCategory({ uuid })
		setIsPopupConfirm(false)
		setTimeout(() => {
			refetch()
		}, 200)
	}
	const edit = (item: any) => {
		setIsOpenPopup(true)
		setItemEdit(item)
	}

	const closePopup = () => {
		setIsOpenPopup(false)
		setItemEdit(null)
	}

	return (
		<div className={styles.dashboard}>
			<Toaster position='top-center' />
			<PopupCategory
				isOpen={isOpenPopup}
				handleClose={closePopup}
				itemProp={itemEdit}
			/>
			<PopupConfirm
				isOpen={isPopupConfirm}
				handleClose={() => setIsPopupConfirm(false)}
				message='Вы действительно хотите удалить?'
				handleSend={() => deleteCategory(uuid)}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Категории</h1>
				<Button onClick={() => setIsOpenPopup(true)}>
					<IconComponent icon='plus' />
					Добавить категорию
				</Button>
			</div>
			<div className={styles.buttons}>
				{buttons.map((button, i) => (
					<Button
						onClick={() => navigate({ to: button.to })}
						notActive={button.isNotActive}
						key={i}
					>
						{button.title}
					</Button>
				))}
			</div>

			<Table>
				<thead>
					<tr>
						<th>№</th>
						<th>Имя категории</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{data?.length ? (
						<React.Fragment>
							{data?.map((item, i) => (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{item?.name.tm}</td>
									<td>
										<div className={tableStyles.actions}>
											<div
												onClick={() => edit(item)}
												className={tableStyles.edit}
											>
												<IconComponent icon='edit' />
											</div>
											<div
												onClick={() => popupConfirm(item.UUID)}
												className={tableStyles.crash}
											>
												<IconComponent icon='crash' />
											</div>
										</div>
									</td>
								</tr>
							))}
						</React.Fragment>
					) : (
						<tr>
							<td></td>
							<td className={tableStyles.empty}>
								Пусто, добавьте категорию...
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Dashboard
