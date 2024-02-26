import { GET_SUBCATEGORIES } from '@/api/queries/Getters'
import { DELETE_SUBCATEGORIES } from '@/api/queries/Posts'
import PopupConfirm from '@/components/popup/PopUpConfirm'
import PopupSubCategory from '@/components/popup/PopupSubCategory'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import Table from '@/components/ui/table/Table'
import tableStyles from '@/components/ui/table/Table.module.scss'
import { useNavigate } from '@tanstack/react-location'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './SubCategories.module.scss'

const SubCategories = () => {
	const { data, refetch } = useQuery(['getSubCategories'], () =>
		GET_SUBCATEGORIES()
	)

	const [isPopupConfirm, setIsPopupConfirm] = useState(false)
	const [uuid, setUuid] = useState('')

	const { mutate: mutateDeleteSubCategory } = useMutation({
		mutationKey: ['delete sub-category'],
		mutationFn: (data: any) => DELETE_SUBCATEGORIES({ data }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})
	const popupConfirm = (uuid: any) => {
		setIsPopupConfirm(true)
		setUuid(uuid)
	}

	const deleteSubCategory = (uuid: any) => {
		popupConfirm(uuid.UUID)
		setUuid(uuid)
		mutateDeleteSubCategory({ uuid })
		setIsPopupConfirm(false)
		setTimeout(() => {
			refetch()
		}, 200)
	}

	const buttons = [
		{ title: 'Категории', isNotActive: true, to: '/admin/categories' },
		{ title: 'Под-категории', to: '/admin/sub-categories' },
		{ title: 'Авторы', isNotActive: true, to: '/admin/authors' },
		{ title: 'Теги', isNotActive: true, to: '/admin/tags' }
	]

	const navigate = useNavigate()
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [itemEdit, setItemEdit] = useState<any>(null)

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
			<PopupSubCategory
				isOpen={isOpenPopup}
				handleClose={closePopup}
				itemProp={itemEdit}
			/>
			<PopupConfirm
				isOpen={isPopupConfirm}
				handleClose={() => setIsPopupConfirm(false)}
				message='Вы действительно хотите удалить?'
				handleSend={() => deleteSubCategory(uuid)}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Под-категории</h1>
				<Button onClick={() => setIsOpenPopup(true)}>
					<IconComponent icon='plus' />
					Добавить под-категорию
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
						<th>Имя под-категории</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{data?.length ? (
						<React.Fragment>
							{data?.map((item, i) => (
								<tr key={i}>
									<td>{i + 1}</td>
									<td>{item?.name?.tm}</td>
									<td>
										<div className={tableStyles.actions}>
											<div
												onClick={() => edit(item)}
												className={tableStyles.edit}
											>
												<IconComponent icon='edit' />
											</div>
											<div
												onClick={() => popupConfirm(item?.UUID)}
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
								Пусто, добавьте что нибудь...
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default SubCategories
