import { GET_AUTHOR } from '@/api/queries/Getters'
import { DELETE_AUTHOR } from '@/api/queries/Posts'
import PopupConfirm from '@/components/popup/PopUpConfirm'
import PopupAuthor from '@/components/popup/PopupAuthor'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import Table from '@/components/ui/table/Table'
import tableStyles from '@/components/ui/table/Table.module.scss'
import { useNavigate } from '@tanstack/react-location'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Authors.module.scss'

const Authors = () => {
	const [uuid, setUuid] = useState('')
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const { data, status, refetch } = useQuery(['getAuthor'], () =>
		GET_AUTHOR({
			limit: limit,
			page: page
		})
	)

	const { mutate: mutateDeleteAuthor } = useMutation({
		mutationKey: ['delete author'],
		mutationFn: (data: any) => DELETE_AUTHOR({ data }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})

	const buttons = [
		{ title: 'Категории', isNotActive: true, to: '/admin/categories' },
		{ title: 'Суб-категории', isNotActive: true, to: '/admin/sub-categories' },
		{ title: 'Авторы', to: '/admin/authors' }
	]

	const navigate = useNavigate()
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [isPopupConfirm, setIsPopupConfirm] = useState(false)
	const [itemEdit, setItemEdit] = useState<any>(null)
	const popupConfirm = (uuid: any) => {
		setIsPopupConfirm(true)
		setUuid(uuid)
	}

	const deleteAuthor = (uuid: any) => {
		popupConfirm(uuid.UUID)
		setUuid(uuid)
		mutateDeleteAuthor({
			uuid: uuid
		})
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
			<PopupAuthor
				isOpen={isOpenPopup}
				handleClose={closePopup}
				itemProp={itemEdit}
			/>
			<PopupConfirm
				isOpen={isPopupConfirm}
				handleClose={() => setIsPopupConfirm(false)}
				message='Вы действительно хотите удалить?'
				handleSend={() => deleteAuthor(uuid)}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Авторы</h1>
				<Button onClick={() => setIsOpenPopup(true)}>
					<IconComponent icon='plus' />
					Добавить автора
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
					{data?.authors.length ? (
						<React.Fragment>
							{data?.authors?.map((item, i) => (
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

export default Authors
