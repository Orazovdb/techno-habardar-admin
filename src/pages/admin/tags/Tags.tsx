import { GET_TAGS } from '@/api/queries/Getters'
import { DELETE_AUTHOR, DELETE_TAG } from '@/api/queries/Posts'
import PopupConfirm from '@/components/popup/PopUpConfirm'
import PopupTag from '@/components/popup/PopupTag'
import { Button } from '@/components/ui/button/Button'
import IconComponent from '@/components/ui/icon/Icon'
import Table from '@/components/ui/table/Table'
import tableStyles from '@/components/ui/table/Table.module.scss'
import { useNavigate } from '@tanstack/react-location'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import styles from './Tags.module.scss'

const Tags = () => {
	const [uuid, setUuid] = useState('')
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const { data, refetch } = useQuery(['getTag'], () =>
		GET_TAGS({
			limit: limit,
			page: page
		})
	)

	const { mutate: mutateDeleteTag } = useMutation({
		mutationKey: ['delete author'],
		mutationFn: (data: any) => DELETE_TAG({ data: { uuid } }),
		async onSuccess() {
			toast.success('Deleted successfully!')
		}
	})

	const buttons = [
		{ title: 'Категории', isNotActive: true, to: '/admin/categories' },
		{ title: 'Под-категории', isNotActive: true, to: '/admin/sub-categories' },
		{ title: 'Авторы', isNotActive: true, to: '/admin/authors' },
		{ title: 'Теги', to: '/admin/tags' }
	]

	const navigate = useNavigate()
	const [isOpenPopup, setIsOpenPopup] = useState(false)
	const [isPopupConfirm, setIsPopupConfirm] = useState(false)
	const [itemEdit, setItemEdit] = useState<any>(null)
	const popupConfirm = (uuid: any) => {
		setIsPopupConfirm(true)
		setUuid(uuid)
	}

	const deleteTag = (uuid: any) => {
		popupConfirm(uuid)
		setUuid(uuid)
		mutateDeleteTag({ data })
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
			<PopupTag
				isOpen={isOpenPopup}
				handleClose={closePopup}
				itemProp={itemEdit}
			/>
			<PopupConfirm
				isOpen={isPopupConfirm}
				handleClose={() => setIsPopupConfirm(false)}
				message='Вы действительно хотите удалить?'
				handleSend={() => deleteTag(uuid)}
			/>
			<div className={styles.header}>
				<h1 className={styles.title}>Теги</h1>
				<Button onClick={() => setIsOpenPopup(true)}>
					<IconComponent icon='plus' />
					Добавить тега
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
						<th>Имя тега</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{data?.tags.length ? (
						<React.Fragment>
							{data?.tags?.map((item, i) => (
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
								Пусто, добавьте что нибудь...
							</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default Tags
